"use client";

import { useEffect, useRef } from "react";
import type Quill from "quill";
import "quill/dist/quill.snow.css";

export default function QuillEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  const lastEmitted = useRef<string>(value);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    import("quill").then((mod) => {
      if (cancelled || !container || quillRef.current) return;
      const QuillCtor = mod.default;
      const editorEl = document.createElement("div");
      container.appendChild(editorEl);
      const q = new QuillCtor(editorEl, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["link", "blockquote"],
            ["clean"],
          ],
        },
      });
      quillRef.current = q;
      if (value) {
        q.clipboard.dangerouslyPasteHTML(value, "silent");
      }
      q.on("text-change", () => {
        const html = q.root.innerHTML;
        lastEmitted.current = html;
        onChangeRef.current(html);
      });
    });
    return () => {
      cancelled = true;
      if (container) container.innerHTML = "";
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const q = quillRef.current;
    if (!q) return;
    if (value !== lastEmitted.current && value !== q.root.innerHTML) {
      lastEmitted.current = value;
      q.clipboard.dangerouslyPasteHTML(value || "", "silent");
    }
  }, [value]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-slate-200 [&_.ql-container]:border-0 [&_.ql-editor]:min-h-64 [&_.ql-editor]:max-h-[70vh] [&_.ql-editor]:font-bangla [&_.ql-editor]:text-sm">
      <div ref={containerRef} />
    </div>
  );
}
