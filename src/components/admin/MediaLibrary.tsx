"use client";

import { deleteMedia, listMedia, uploadMedia } from "@/lib/cms/client";
import type { MediaItem } from "@/lib/cms/types";
import { isLikelyImageUrl } from "@/lib/image";
import { Check, Copy, ImageIcon, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAdmin } from "./AdminProvider";
import { Button, EmptyState, Input, Spinner } from "./ui";

const LOCAL_ASSETS = [
  "/doctor-img.png",
  "/logo.png",
  "/logo-white.png",
  "/knee.jpg",
  "/low-back-pain.jpg",
  "/shoulder.webp",
  "/sports.jpg",
  "/spine.jpg",
  "/wrist.jpg",
  "/cumilla-logo.png",
  "/popular-logo.png",
  "/doctorspoint-logo.png",
  "/whatsapp.png",
];

function formatSize(bytes: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibrary({
  onSelect,
  selectable,
}: {
  onSelect?: (url: string) => void;
  selectable?: boolean;
}) {
  const { toast } = useAdmin();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<{ name: string; pct: number }[]>([]);
  const [tab, setTab] = useState<"uploaded" | "local">("uploaded");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const refresh = useCallback(async () => {
    try {
      setItems(await listMedia());
    } catch (err) {
      console.error(err);
      toast("মিডিয়া লোড করা যায়নি", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    let active = true;
    listMedia()
      .then((list) => {
        if (active) setItems(list);
      })
      .catch((err) => {
        console.error(err);
        toast("মিডিয়া লোড করা যায়নি", "error");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [toast]);

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) {
      toast("শুধুমাত্র ছবি আপলোড করা যাবে", "error");
      return;
    }
    setUploading(list.map((f) => ({ name: f.name, pct: 0 })));
    let ok = 0;
    for (const file of list) {
      try {
        await uploadMedia(file, (pct) =>
          setUploading((u) => u.map((x) => (x.name === file.name ? { ...x, pct } : x))),
        );
        ok++;
      } catch (err) {
        console.error(err);
        toast(
          `${file.name} আপলোড ব্যর্থ — ${err instanceof Error ? err.message : "আবার চেষ্টা করুন"}`,
          "error",
        );
      }
    }
    setUploading([]);
    if (ok > 0) {
      toast(`${ok}টি ছবি আপলোড হয়েছে`);
      refresh();
    }
  };

  const remove = async (item: MediaItem) => {
    if (!confirm(`"${item.name}" লাইব্রেরি থেকে সরাবেন? (যেখানে আগে থেকে ব্যবহৃত হয়েছে সেখানে ছবি থেকে যাবে)`)) return;
    try {
      await deleteMedia(item);
      setItems((l) => l.filter((x) => x.id !== item.id));
      toast("ছবি মুছে ফেলা হয়েছে");
    } catch (err) {
      console.error(err);
      toast("মুছে ফেলা যায়নি", "error");
    }
  };

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      toast("কপি করা যায়নি", "error");
    }
  };

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInput.current?.click()}
        className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${dragOver ? "border-blue-light bg-blue-50" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"}`}
      >
        <UploadCloud className="w-8 h-8 mx-auto text-blue-light mb-2" />
        <p className="text-sm font-bold text-slate-700">ছবি এখানে টেনে আনুন বা ক্লিক করে বাছাই করুন</p>
        <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP — একসাথে একাধিক ছবি দেওয়া যাবে। বড় ছবি স্বয়ংক্রিয়ভাবে ছোট করে আপলোড হবে</p>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {uploading.length > 0 && (
        <div className="space-y-2">
          {uploading.map((u) => (
            <div key={u.name} className="text-xs">
              <div className="flex justify-between text-slate-600 mb-1">
                <span className="truncate">{u.name}</span>
                <span>{u.pct}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-light rounded-full transition-all"
                  style={{ width: `${u.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setTab("uploaded")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${tab === "uploaded" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            আপলোড করা ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("local")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${tab === "local" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            সাইটের ছবি
          </button>
        </div>
        {tab === "uploaded" && (
          <Input
            placeholder="নাম দিয়ে খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
        )}
      </div>

      {tab === "local" ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {LOCAL_ASSETS.map((src) => (
            <MediaTile
              key={src}
              url={src}
              name={src.slice(1)}
              selectable={selectable}
              onSelect={onSelect}
              onCopy={copy}
              copied={copied === src}
            />
          ))}
        </div>
      ) : loading ? (
        <Spinner />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="w-10 h-10" />}
          title={search ? "কিছু পাওয়া যায়নি" : "এখনো কোনো ছবি আপলোড করা হয়নি"}
          description="উপরের বক্সে ছবি টেনে আনুন"
        />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((item) => (
            <MediaTile
              key={item.id}
              url={item.url}
              name={item.name}
              meta={formatSize(item.size)}
              selectable={selectable}
              onSelect={onSelect}
              onCopy={copy}
              onDelete={() => remove(item)}
              copied={copied === item.url}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MediaTile({
  url,
  name,
  meta,
  selectable,
  onSelect,
  onCopy,
  onDelete,
  copied,
}: {
  url: string;
  name: string;
  meta?: string;
  selectable?: boolean;
  onSelect?: (url: string) => void;
  onCopy: (url: string) => void;
  onDelete?: () => void;
  copied: boolean;
}) {
  return (
    <div className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => selectable && onSelect?.(url)}
        className={`block w-full aspect-square relative bg-slate-100 ${selectable ? "cursor-pointer" : "cursor-default"}`}
      >
        <Image src={url} alt={name} fill className="object-cover" sizes="200px" unoptimized />
        {selectable && (
          <span className="absolute inset-0 bg-blue-light/0 group-hover:bg-blue-light/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white text-blue-dark text-xs font-bold px-3 py-1.5 rounded-full shadow transition-opacity">
              বাছাই করুন
            </span>
          </span>
        )}
      </button>
      <div className="px-2 py-1.5 flex items-center justify-between gap-1">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-slate-700 truncate">{name}</p>
          {meta && <p className="text-[10px] text-slate-400">{meta}</p>}
        </div>
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onCopy(url)}
            className="p-1.5 rounded-md text-slate-400 hover:text-blue-light hover:bg-slate-50 cursor-pointer"
            title="লিংক কপি"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
              title="মুছে ফেলুন"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-start gap-3">
      <div className="w-20 h-20 shrink-0 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden relative">
        {value ? (
          <Image src={value} alt="" fill className="object-cover" sizes="80px" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <ImageIcon className="w-6 h-6" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/image.jpg অথবা https://..."
        />
        {value && !isLikelyImageUrl(value) && (
          <p className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
            এটি সরাসরি ছবির লিংক নয় — এমন লিংক দিন যা .jpg / .png / .webp দিয়ে শেষ হয়। ImgBB-তে ছবির উপর রাইট-ক্লিক → “Copy image address” ব্যবহার করুন।
          </p>
        )}
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            মিডিয়া থেকে বাছাই
          </Button>
          {value && (
            <Button variant="ghost" size="sm" onClick={() => onChange("")}>
              সরান
            </Button>
          )}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">ছবি বাছাই করুন</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xl leading-none cursor-pointer px-2"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-6">
              <MediaLibrary
                selectable
                onSelect={(url) => {
                  onChange(url);
                  setOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
