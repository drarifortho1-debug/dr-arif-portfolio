"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { ImagePicker } from "@/components/admin/MediaLibrary";
import {
  Button,
  Card,
  EmptyState,
  Input,
  Label,
  PageHeader,
  Spinner,
} from "@/components/admin/ui";
import { blogHref } from "@/lib/blog";
import { revalidate } from "@/lib/cms/client";
import { db } from "@/lib/firebase";
import { slugify } from "@/lib/slug";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { ExternalLink, FileText, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const QuillEditor = dynamic(() => import("@/components/admin/QuillEditor"), { ssr: false });

interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
}

const EMPTY: Omit<Blog, "id"> = {
  slug: "",
  title: "",
  content: "",
  category: "",
  readTime: "",
  date: "",
  imageUrl: "",
  imageAlt: "",
};

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function normalizeBlog(id: string, data: Record<string, unknown>): Blog {
  return {
    id,
    slug: str(data.slug),
    title: str(data.title),
    content: str(data.content),
    category: str(data.category),
    readTime: str(data.readTime),
    date: str(data.date),
    imageUrl: str(data.imageUrl),
    imageAlt: str(data.imageAlt),
  };
}

export default function PostsPage() {
  const { toast } = useAdmin();
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [form, setForm] = useState<Omit<Blog, "id">>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")));
      setBlogs(snap.docs.map((d) => normalizeBlog(d.id, d.data())));
    } catch (err) {
      console.error(err);
      toast("ব্লগ লোড করা যায়নি", "error");
      setBlogs([]);
    }
  }, [toast]);

  useEffect(() => {
    let active = true;
    getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")))
      .then((snap) => {
        if (active) {
          setBlogs(snap.docs.map((d) => normalizeBlog(d.id, d.data())));
        }
      })
      .catch((err) => {
        console.error(err);
        toast("ব্লগ লোড করা যায়নি", "error");
        if (active) setBlogs([]);
      });
    return () => {
      active = false;
    };
  }, [toast]);

  const startNew = () => {
    setForm(EMPTY);
    setEditingId(null);
    setSlugTouched(false);
    setMode("edit");
  };

  const setTitle = (title: string) =>
    setForm((f) => ({ ...f, title, slug: slugTouched ? f.slug : slugify(title) }));

  const setSlug = (slug: string) => {
    setSlugTouched(true);
    setForm((f) => ({ ...f, slug }));
  };

  const regenerateSlug = () => {
    setSlugTouched(false);
    setForm((f) => ({ ...f, slug: slugify(f.title) }));
  };

  const slugTaken = async (slug: string): Promise<boolean> => {
    const snap = await getDocs(
      query(collection(db, "blogs"), where("slug", "==", slug), limit(2)),
    );
    return snap.docs.some((d) => d.id !== editingId);
  };

  const startEdit = (b: Blog) => {
    setForm({
      slug: b.slug || slugify(b.title),
      title: b.title,
      content: b.content,
      category: b.category,
      readTime: b.readTime,
      date: b.date,
      imageUrl: b.imageUrl,
      imageAlt: b.imageAlt,
    });
    setEditingId(b.id);
    setSlugTouched(Boolean(b.slug));
    setMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast("শিরোনাম দিন", "error");
      return;
    }
    const slug = slugify(form.slug || form.title);
    if (!slug) {
      toast("সঠিক URL স্লাগ দিন", "error");
      return;
    }
    if (form.imageUrl && !form.imageAlt.trim()) {
      toast("ছবির Alt টেক্সট দিন (SEO-এর জন্য জরুরি)", "error");
      return;
    }
    setSaving(true);
    try {
      if (await slugTaken(slug)) {
        toast("এই URL স্লাগ অন্য একটি ব্লগে ব্যবহৃত হয়েছে — অন্যটি দিন", "error");
        setSaving(false);
        return;
      }
      const previous = editingId ? blogs?.find((b) => b.id === editingId) : undefined;
      const payload = {
        ...form,
        slug,
        imageAlt: form.imageAlt.trim(),
        readTime: form.readTime || "৫ মিনিট",
        date: form.date || new Date().toLocaleDateString("bn-BD"),
      };
      if (editingId) {
        await updateDoc(doc(db, "blogs", editingId), payload);
        toast("ব্লগ আপডেট হয়েছে");
      } else {
        await addDoc(collection(db, "blogs"), { ...payload, createdAt: serverTimestamp() });
        toast("ব্লগ প্রকাশিত হয়েছে");
      }
      const paths = ["/", "/our-blogs", `/our-blogs/${slug}`];
      if (previous) paths.push(blogHref(previous));
      await revalidate(paths);
      setMode("list");
      setForm(EMPTY);
      setEditingId(null);
      load();
    } catch (err) {
      console.error(err);
      toast("সেভ করা যায়নি", "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (b: Blog) => {
    if (!confirm(`"${b.title}" মুছে ফেলবেন?`)) return;
    try {
      await deleteDoc(doc(db, "blogs", b.id));
      await revalidate(["/", "/our-blogs"]);
      toast("ব্লগ মুছে ফেলা হয়েছে");
      load();
    } catch (err) {
      console.error(err);
      toast("মুছে ফেলা যায়নি", "error");
    }
  };

  if (mode === "edit") {
    return (
      <div>
        <PageHeader
          title={editingId ? "ব্লগ সম্পাদনা" : "নতুন ব্লগ"}
          actions={
            <Button variant="secondary" onClick={() => setMode("list")}>
              বাতিল
            </Button>
          }
        />
        <form onSubmit={save} className="space-y-5">
          <Card>
            <div className="space-y-5">
              <div>
                <Label>শিরোনাম</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ব্লগের শিরোনাম"
                  required
                />
              </div>
              <div>
                <Label help="ব্লগের ঠিকানা — শিরোনাম থেকে স্বয়ংক্রিয়ভাবে তৈরি হয়, চাইলে বদলাতে পারেন">
                  URL স্লাগ
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center rounded-xl border border-slate-200 bg-white focus-within:border-blue-light focus-within:ring-2 focus-within:ring-blue-light/15 overflow-hidden">
                    <span className="pl-3.5 text-xs text-slate-400 font-mono shrink-0 select-none">/our-blogs/</span>
                    <input
                      value={form.slug}
                      onChange={(e) => setSlug(e.target.value)}
                      onBlur={() => setForm((f) => ({ ...f, slug: slugify(f.slug) }))}
                      placeholder="url-slug"
                      className="flex-1 min-w-0 px-2 py-2.5 text-sm text-slate-900 focus:outline-none bg-transparent"
                    />
                  </div>
                  <Button variant="secondary" onClick={regenerateSlug} title="শিরোনাম থেকে আবার তৈরি করুন">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                {form.slug && (
                  <p className="text-[11px] text-slate-400 mt-1.5 break-all">
                    লিংক হবে: <span className="font-mono text-slate-600">/our-blogs/{slugify(form.slug)}</span>
                  </p>
                )}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label>ক্যাটাগরি</Label>
                  <Input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="যেমন: হাঁটু ব্যথা"
                  />
                </div>
                <div>
                  <Label>পড়ার সময়</Label>
                  <Input
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="৫ মিনিট"
                  />
                </div>
                <div>
                  <Label>তারিখ</Label>
                  <Input
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="খালি রাখলে আজকের তারিখ"
                  />
                </div>
              </div>
              <div>
                <Label>কভার ছবি</Label>
                <ImagePicker
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                />
              </div>
              <div>
                <Label help="ছবিতে কী আছে তা এক লাইনে লিখুন — গুগল ও স্ক্রিন-রিডারের জন্য">
                  ছবির Alt টেক্সট
                </Label>
                <Input
                  value={form.imageAlt}
                  onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                  placeholder="যেমন: হাঁটুর এক্স-রে দেখছেন ডা. আরিফ"
                />
              </div>
              <div>
                <Label>কন্টেন্ট</Label>
                <QuillEditor
                  value={form.content}
                  onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                />
              </div>
            </div>
          </Card>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setMode("list")}>
              বাতিল
            </Button>
            <Button type="submit" loading={saving}>
              {editingId ? "আপডেট করুন" : "প্রকাশ করুন"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="পোস্ট (ব্লগ)"
        description="স্বাস্থ্য টিপস ও ব্লগ পোস্ট"
        actions={
          <Button onClick={startNew}>
            <Plus className="w-4 h-4" />
            নতুন ব্লগ
          </Button>
        }
      />
      {blogs === null ? (
        <Spinner />
      ) : blogs.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-10 h-10" />}
          title="এখনো কোনো ব্লগ নেই"
          action={
            <Button onClick={startNew}>
              <Plus className="w-4 h-4" />
              প্রথম ব্লগ লিখুন
            </Button>
          }
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100">
          {blogs.map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4">
              <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden relative shrink-0">
                {b.imageUrl ? (
                  <Image src={b.imageUrl} alt="" fill className="object-cover" sizes="64px" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <FileText className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{b.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {b.category && <span className="text-blue-light font-semibold">{b.category} · </span>}
                  {b.date} · {b.readTime}
                </p>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                  {b.slug ? `/our-blogs/${b.slug}` : "⚠ স্লাগ নেই — সম্পাদনা করে সেভ করুন"}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={blogHref(b)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-light hover:bg-slate-50"
                  title="দেখুন"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => startEdit(b)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                  title="সম্পাদনা"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(b)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                  title="মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
