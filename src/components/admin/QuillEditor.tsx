import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

type QuillInstance = InstanceType<typeof import("quill").default>;

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function QuillEditor({
  value,
  onChange,
  onImageUpload,
}: QuillEditorProps) {
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<QuillInstance | null>(null);
  const activeImage = useRef<HTMLImageElement | null>(null);
  const onChangeRef = useRef(onChange);
  const uploadRef = useRef(onImageUpload);

  useEffect(() => {
    onChangeRef.current = onChange;
    uploadRef.current = onImageUpload;
  });

  useEffect(() => {
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      const host = quillRef.current;
      if (!host || quillInstance.current) return;

      const insertImage = () => {
        const quill = quillInstance.current;
        const upload = uploadRef.current;
        if (!quill || !upload) return;

        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;

          const alt = window.prompt(
            "ছবির Alt টেক্সট লিখুন (SEO এর জন্য আবশ্যক)",
            "",
          );
          if (alt === null) return;
          if (!alt.trim()) {
            window.alert("Alt টেক্সট ছাড়া ছবি যুক্ত করা যাবে না।");
            return;
          }

          const range = quill.getSelection(true);
          const placeholder = "ছবি আপলোড হচ্ছে...";
          quill.insertText(range.index, placeholder, "user");
          try {
            const url = await upload(file);
            quill.deleteText(range.index, placeholder.length, "user");
            quill.insertEmbed(range.index, "image", url, "user");
            quill.formatText(range.index, 1, "alt", alt.trim(), "user");
            quill.setSelection(range.index + 1, 0);
            onChangeRef.current(quill.root.innerHTML);
          } catch {
            quill.deleteText(range.index, placeholder.length, "user");
            window.alert("ছবি আপলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
          }
        };
        input.click();
      };

      const editImageAlt = () => {
        const quill = quillInstance.current;
        if (!quill) return;
        const image = activeImage.current;
        if (!image) {
          window.alert("প্রথমে এডিটরের ভেতরে একটি ছবিতে ক্লিক করুন।");
          return;
        }
        const next = window.prompt(
          "ছবির Alt টেক্সট",
          image.getAttribute("alt") || "",
        );
        if (next === null) return;
        image.setAttribute("alt", next.trim());
        onChangeRef.current(quill.root.innerHTML);
      };

      const container: unknown[] = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        ["link", "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
      ];
      if (uploadRef.current) container.push(["image", "imagealt"]);
      container.push(["clean"]);

      const instance = new Quill(host, {
        theme: "snow",
        modules: {
          toolbar: {
            container,
            handlers: { image: insertImage, imagealt: editImageAlt },
          },
        },
      });
      quillInstance.current = instance;

      if (value) {
        instance.root.innerHTML = value;
      }

      instance.root.addEventListener("click", (e) => {
        const target = e.target as HTMLElement | null;
        activeImage.current =
          target && target.tagName === "IMG"
            ? (target as HTMLImageElement)
            : null;
      });

      instance.on("text-change", () => {
        onChangeRef.current(instance.root.innerHTML);
      });
    });
  }, []);

  useEffect(() => {
    const instance = quillInstance.current;
    if (instance && instance.root.innerHTML !== value) {
      instance.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div>
      <div ref={quillRef} className="h-96 bg-white" />
      <p className="text-[11px] text-slate-500 mt-14 mb-6 leading-relaxed">
        শিরোনামের জন্য ড্রপডাউন থেকে Heading 1–6 বেছে নিন। ব্লগ পেজে পোস্টের
        টাইটেল স্বয়ংক্রিয়ভাবে H1 হয়, তাই কন্টেন্টের ভেতরে H2 দিয়ে শুরু করাই
        SEO এর জন্য ভালো। ছবি যুক্ত করতে ছবি বাটন, আর আগের ছবির Alt বদলাতে
        ছবিতে ক্লিক করে ALT বাটন ব্যবহার করুন।
      </p>
    </div>
  );
}
