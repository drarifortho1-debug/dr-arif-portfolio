import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }: { value: string; onChange: (content: string) => void }) {
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);

  useEffect(() => {
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      if (quillRef.current && !quillInstance.current) {
        quillInstance.current = new Quill(quillRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link', 'blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
          },
        });

        if (value) {
          quillInstance.current.root.innerHTML = value;
        }

        quillInstance.current.on('text-change', () => {
          onChange(quillInstance.current?.root.innerHTML || "");
        });
      }
    });
  }, []);

  useEffect(() => {
    if (quillInstance.current && quillInstance.current.root.innerHTML !== value) {
      quillInstance.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={quillRef} className="h-96 mb-12 bg-white" />;
}
