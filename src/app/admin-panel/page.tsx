"use client";

import { auth, db } from "@/lib/firebase";
import { getYouTubeId } from "@/lib/youtube";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isValidSlug, slugify, uniqueSlug } from "@/lib/slug";
import { auditContent, ensureImageAlts } from "@/lib/blog-content";

const QuillEditor = dynamic(() => import("@/components/admin/QuillEditor"), {
  ssr: false,
});

interface Blog {
  id: string;
  title: string;
  slug?: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
  imageAlt?: string;
}

interface GalleryImage {
  id: string;
  imageUrl: string;
  alt?: string;
}

interface Video {
  id: string;
  videoId: string;
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"blogs" | "gallery" | "videos">(
    "blogs",
  );

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [blogImageAlt, setBlogImageAlt] = useState("");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
  const [galleryAlt, setGalleryAlt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const fetchData = async () => {
    try {
      const blogsQuery = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc"),
      );
      const blogsSnapshot = await getDocs(blogsQuery);
      const blogsList = blogsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];
      setBlogs(blogsList);

      const galleryQuery = query(
        collection(db, "gallery"),
        orderBy("createdAt", "desc"),
      );
      const gallerySnapshot = await getDocs(galleryQuery);
      const galleryList = gallerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GalleryImage[];
      setGallery(galleryList);

      const videosQuery = query(
        collection(db, "videos"),
        orderBy("createdAt", "desc"),
      );
      const videosSnapshot = await getDocs(videosQuery);
      const videosList = videosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];
      setVideos(videosList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.email === "drarifortho1@gmail.com") {
          setUser(currentUser);
          fetchData();
        } else {
          signOut(auth);
          setLoginError("Unauthorized access.");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("edit");
    if (editId) {
      const loadBlog = async () => {
        try {
          const docSnap = await getDoc(doc(db, "blogs", editId));
          if (docSnap.exists()) {
            const data = docSnap.data() as Blog;
            setBlogTitle(data.title);
            setBlogSlug(data.slug || slugify(data.title));
            setSlugTouched(true);
            setBlogContent(data.content);
            setBlogCategory(data.category);
            setBlogReadTime(data.readTime);
            setBlogDate(data.date);
            setBlogImageAlt(data.imageAlt || "");
            setEditingBlogId(editId);
            setActiveTab("blogs");
          }
        } catch (err) {
          console.error(err);
        }
      };
      loadBlog();
    }
  }, []);

  const trackEditBlog = (b: Blog) => {
    setBlogTitle(b.title);
    setBlogSlug(b.slug || slugify(b.title));
    setSlugTouched(true);
    setBlogContent(b.content);
    setBlogCategory(b.category);
    setBlogReadTime(b.readTime);
    setBlogDate(b.date);
    setBlogImageAlt(b.imageAlt || "");
    setEditingBlogId(b.id);
    setActiveTab("blogs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetBlogForm = () => {
    setBlogTitle("");
    setBlogSlug("");
    setSlugTouched(false);
    setBlogContent("");
    setBlogCategory("");
    setBlogReadTime("");
    setBlogDate("");
    setBlogImage(null);
    setBlogImageAlt("");
    setEditingBlogId(null);
  };

  const handleTitleChange = (nextTitle: string) => {
    setBlogTitle(nextTitle);
    if (!slugTouched) setBlogSlug(slugify(nextTitle));
  };

  const takenSlugs = useMemo(
    () =>
      blogs
        .filter((b) => b.id !== editingBlogId)
        .map((b) => b.slug)
        .filter((s): s is string => Boolean(s)),
    [blogs, editingBlogId],
  );

  const contentAudit = useMemo(
    () => auditContent(blogContent),
    [blogContent],
  );

  const slugConflict = blogSlug.length > 0 && takenSlugs.includes(blogSlug);
  const slugInvalid = blogSlug.length > 0 && !isValidSlug(blogSlug);
  const blogsMissingSlug = blogs.filter((b) => !b.slug).length;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (email !== "drarifortho1@gmail.com") {
      setLoginError("Unauthorized email address.");
      return;
    }
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Failed to log in.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const uploadToImgbb = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=c1592c50fcf0a113d2555385ca8e58ac",
      {
        method: "POST",
        body: formData,
      },
    );
    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return data.data.url;
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogImage && !editingBlogId) {
      setMessage({ text: "অনুগ্রহ করে একটি ছবি নির্বাচন করুন", type: "error" });
      return;
    }
    if (!blogImageAlt.trim()) {
      setMessage({
        text: "কভার ছবির Alt টেক্সট লিখুন — SEO এর জন্য এটি আবশ্যক",
        type: "error",
      });
      return;
    }

    const finalSlug = slugify(blogSlug || blogTitle);
    if (!finalSlug) {
      setMessage({ text: "একটি সঠিক URL স্লাগ লিখুন", type: "error" });
      return;
    }
    if (takenSlugs.includes(finalSlug)) {
      setMessage({
        text: `"${finalSlug}" স্লাগটি আগে থেকেই ব্যবহৃত হয়েছে, অন্য একটি লিখুন`,
        type: "error",
      });
      return;
    }

    setActionLoading(true);
    setMessage(null);
    try {
      let imageUrl = "";
      if (blogImage) {
        imageUrl = await uploadToImgbb(blogImage);
      } else {
        const existingBlog = blogs.find((b) => b.id === editingBlogId);
        imageUrl = existingBlog?.imageUrl || "";
      }

      const blogData = {
        title: blogTitle,
        slug: finalSlug,
        content: ensureImageAlts(blogContent, blogImageAlt.trim() || blogTitle),
        category: blogCategory,
        readTime: blogReadTime || "৫ মিনিট",
        date: blogDate || new Date().toLocaleDateString("bn-BD"),
        imageUrl,
        imageAlt: blogImageAlt.trim(),
        createdAt: new Date(),
      };

      if (editingBlogId) {
        await updateDoc(doc(db, "blogs", editingBlogId), blogData);
        setMessage({ text: "ব্লগ সফলভাবে আপডেট হয়েছে!", type: "success" });
      } else {
        await addDoc(collection(db, "blogs"), blogData);
        setMessage({ text: "ব্লগ সফলভাবে যুক্ত হয়েছে!", type: "success" });
      }

      resetBlogForm();
      fetchData();
    } catch (err) {
      console.error("Blog save error:", err);
      setMessage({ text: "ব্লগ সেভ করতে সমস্যা হয়েছে", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleBackfillSlugs = async () => {
    const pending = blogs.filter((b) => !b.slug);
    if (pending.length === 0) return;
    setActionLoading(true);
    setMessage(null);
    try {
      const used = blogs
        .map((b) => b.slug)
        .filter((s): s is string => Boolean(s));
      for (const b of pending) {
        const generated = uniqueSlug(b.title, used);
        used.push(generated);
        await updateDoc(doc(db, "blogs", b.id), {
          slug: generated,
          imageAlt: b.imageAlt || b.title,
          content: ensureImageAlts(b.content || "", b.imageAlt || b.title),
        });
      }
      setMessage({
        text: `${pending.length} টি পুরোনো ব্লগে URL স্লাগ যুক্ত হয়েছে`,
        type: "success",
      });
      fetchData();
    } catch (err) {
      console.error("Slug backfill error:", err);
      setMessage({ text: "স্লাগ তৈরি করতে সমস্যা হয়েছে", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই ব্লগটি মুছে ফেলতে চান?")) return;
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, "blogs", id));
      setMessage({ text: "ব্লগ মুছে ফেলা হয়েছে", type: "success" });
      fetchData();
    } catch (err) {
      setMessage({ text: "মুছে ফেলতে ব্যর্থ হয়েছে", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryImages || galleryImages.length === 0) {
      setMessage({ text: "অনুগ্রহ করে ছবি নির্বাচন করুন", type: "error" });
      return;
    }
    if (!galleryAlt.trim()) {
      setMessage({
        text: "ছবির Alt টেক্সট লিখুন — SEO এর জন্য এটি আবশ্যক",
        type: "error",
      });
      return;
    }
    setActionLoading(true);
    setMessage(null);
    try {
      const files = Array.from(galleryImages);
      const baseAlt = galleryAlt.trim();
      const uploadPromises = files.map(async (file, index) => {
        const imageUrl = await uploadToImgbb(file);
        await addDoc(collection(db, "gallery"), {
          imageUrl,
          alt: files.length > 1 ? `${baseAlt} — ${index + 1}` : baseAlt,
          createdAt: new Date(),
        });
      });
      await Promise.all(uploadPromises);
      setGalleryAlt("");
      setMessage({
        text: "ছবিগুলো গ্যালারিতে সফলভাবে যুক্ত হয়েছে!",
        type: "success",
      });
      setGalleryImages(null);
      fetchData();
    } catch (err) {
      console.error("Gallery upload error:", err);
      setMessage({ text: "ছবি আপলোড করতে ব্যর্থ হয়েছে", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই ছবিটি মুছে ফেলতে চান?")) return;
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, "gallery", id));
      setMessage({ text: "ছবি মুছে ফেলা হয়েছে", type: "success" });
      fetchData();
    } catch (err) {
      setMessage({ text: "মুছে ফেলতে ব্যর্থ হয়েছে", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = getYouTubeId(videoUrl);
    if (!videoId) {
      setMessage({ text: "সঠিক ইউটিউব ভিডিও লিংক প্রদান করুন", type: "error" });
      return;
    }
    setActionLoading(true);
    setMessage(null);
    try {
      await addDoc(collection(db, "videos"), {
        videoId,
        createdAt: new Date(),
      });
      setMessage({ text: "ভিডিও লিংক সফলভাবে যুক্ত হয়েছে!", type: "success" });
      setVideoUrl("");
      fetchData();
    } catch (err) {
      console.error("Video add error:", err);
      setMessage({ text: "ভিডিও যুক্ত করতে ব্যর্থ হয়েছে", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই ভিডিওটি মুছে ফেলতে চান?")) return;
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, "videos", id));
      setMessage({ text: "ভিডিও মুছে ফেলা হয়েছে", type: "success" });
      fetchData();
    } catch (err) {
      setMessage({ text: "মুছে ফেলতে ব্যর্থ হয়েছে", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-light"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-premium border border-slate-100 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              ডাক্তার আরিফ অর্থো
            </h1>
            <p className="text-sm text-slate-500 mt-1">অ্যাডমিন প্যানেল লগইন</p>
          </div>
          {loginError && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-blue-light hover:bg-blue-dark disabled:bg-blue-light/50 text-white py-3.5 rounded-xl font-bold transition-all text-sm active:scale-98 shadow-md flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  লগইন হচ্ছে...
                </>
              ) : (
                "লগইন করুন"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-950">
            অ্যাডমিন কন্ট্রোল প্যানেল
          </h1>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-bold text-slate-500 hover:text-blue-light transition-colors"
          >
            মূল সাইট
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
          >
            লগআউট
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm border flex items-center justify-between ${message.type === "success" ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"}`}
          >
            <span>{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="font-bold text-xs opacity-60 hover:opacity-100"
            >
              X
            </button>
          </div>
        )}

        <div className="flex border-b border-slate-200 mb-8 bg-white p-2 rounded-xl shadow-sm gap-2">
          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === "blogs" ? "bg-blue-light text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
          >
            ব্লগ পোস্ট সমূহ
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === "gallery" ? "bg-blue-light text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
          >
            গ্যালারি ইমেজ
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === "videos" ? "bg-blue-light text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
          >
            ভিডিও লিংক
          </button>
        </div>

        {activeTab === "blogs" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-premium">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-md font-bold text-slate-900">
                  {editingBlogId
                    ? "ব্লগ এডিট করুন"
                    : "নতুন ব্লগ পোস্ট যুক্ত করুন"}
                </h2>
                {editingBlogId && (
                  <button
                    type="button"
                    onClick={resetBlogForm}
                    className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
                  >
                    বাতিল করুন
                  </button>
                )}
              </div>
              <form onSubmit={handleAddBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    ব্লগ শিরোনাম (পেজে এটিই H1 হবে)
                  </label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                    placeholder="হাঁটু ব্যথার চিকিৎসা"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    URL স্লাগ
                  </label>
                  <div className="flex items-stretch rounded-xl border border-slate-200 overflow-hidden focus-within:border-blue-light">
                    <span className="hidden sm:flex items-center bg-slate-50 text-slate-400 text-[11px] px-3 border-r border-slate-200 whitespace-nowrap">
                      /our-blogs/
                    </span>
                    <input
                      type="text"
                      required
                      value={blogSlug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setBlogSlug(e.target.value);
                      }}
                      onBlur={(e) => setBlogSlug(slugify(e.target.value))}
                      className="flex-1 min-w-0 px-4 py-2.5 focus:outline-none text-sm"
                      placeholder="hatu-bethar-chikitsa"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSlugTouched(true);
                        setBlogSlug(uniqueSlug(blogTitle, takenSlugs));
                      }}
                      className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-bold px-3 border-l border-slate-200 transition-colors whitespace-nowrap"
                    >
                      টাইটেল থেকে
                    </button>
                  </div>
                  {slugInvalid && (
                    <p className="text-[11px] text-red-600 mt-1.5">
                      স্লাগে শুধু ছোট হাতের ইংরেজি অক্ষর, সংখ্যা, বাংলা অক্ষর ও
                      হাইফেন (-) ব্যবহার করুন।
                    </p>
                  )}
                  {slugConflict && (
                    <p className="text-[11px] text-red-600 mt-1.5">
                      এই স্লাগটি অন্য একটি ব্লগে ব্যবহৃত হয়েছে।
                    </p>
                  )}
                  {!slugInvalid && !slugConflict && blogSlug && (
                    <p className="text-[11px] text-slate-400 mt-1.5 break-all">
                      https://www.drarifortho.com/our-blogs/{blogSlug}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    ক্যাটাগরি
                  </label>
                  <input
                    type="text"
                    required
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm bg-white"
                    placeholder="ব্লগ ক্যাটাগরি লিখুন"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                      পড়ার সময়
                    </label>
                    <input
                      type="text"
                      required
                      value={blogReadTime}
                      onChange={(e) => setBlogReadTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                      placeholder="৫ মিনিট"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                      তারিখ
                    </label>
                    <input
                      type="text"
                      required
                      value={blogDate}
                      onChange={(e) => setBlogDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                      placeholder="১৫ জুন, ২০২৬"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    বিস্তারিত কন্টেন্ট
                  </label>
                  <QuillEditor
                    value={blogContent}
                    onChange={setBlogContent}
                    onImageUpload={uploadToImgbb}
                  />
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-700">SEO চেক</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[11px] bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-lg">
                      H1 (টাইটেল): ১
                    </span>
                    {[1, 2, 3, 4, 5, 6].map((level) => (
                      <span
                        key={level}
                        className={`text-[11px] px-2 py-1 rounded-lg border ${
                          level === 1 && contentAudit.headingCounts[1] > 0
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-white border-slate-200 text-slate-600"
                        }`}
                      >
                        H{level}: {contentAudit.headingCounts[level]}
                      </span>
                    ))}
                  </div>
                  {contentAudit.headingCounts[1] > 0 && (
                    <p className="text-[11px] text-amber-700">
                      কন্টেন্টের ভেতরে H1 আছে। পেজের টাইটেল আগে থেকেই H1, তাই
                      এগুলো H2 করে দিন।
                    </p>
                  )}
                  <p
                    className={`text-[11px] ${contentAudit.missingAlt > 0 ? "text-red-600" : "text-slate-500"}`}
                  >
                    কন্টেন্টের ছবি: {contentAudit.images.length} টি,{" "}
                    {contentAudit.missingAlt > 0
                      ? `${contentAudit.missingAlt} টিতে Alt নেই`
                      : "সবগুলোতে Alt আছে"}
                  </p>
                  {contentAudit.headings.length > 0 && (
                    <ul className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                      {contentAudit.headings.slice(0, 10).map((h, i) => (
                        <li key={i} className="truncate">
                          <span className="font-bold text-slate-400">
                            H{h.level}
                          </span>{" "}
                          {h.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    ব্লগ কভার ছবি
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBlogImage(e.target.files?.[0] || null)}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-light/10 file:text-blue-light hover:file:bg-blue-light/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    কভার ছবির Alt টেক্সট
                  </label>
                  <input
                    type="text"
                    required
                    value={blogImageAlt}
                    onChange={(e) => setBlogImageAlt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                    placeholder="হাঁটু ব্যথার রোগীকে পরীক্ষা করছেন ডা. আরিফ"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    ছবিতে কী দেখা যাচ্ছে তা সংক্ষেপে লিখুন। এটি Google ও স্ক্রিন
                    রিডারের জন্য ব্যবহৃত হয়।
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={actionLoading || slugInvalid || slugConflict}
                  className="w-full bg-blue-light hover:bg-blue-dark disabled:bg-slate-300 text-white py-3 rounded-xl font-bold text-sm transition-all mt-4"
                >
                  {actionLoading
                    ? "আপলোড হচ্ছে..."
                    : editingBlogId
                      ? "আপডেট করুন"
                      : "যুক্ত করুন"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2 gap-4">
                <h2 className="text-md font-bold text-slate-900">
                  বর্তমান ব্লগ পোস্ট সমূহ ({blogs.length})
                </h2>
                {blogsMissingSlug > 0 && (
                  <button
                    onClick={handleBackfillSlugs}
                    disabled={actionLoading}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {blogsMissingSlug} টি ব্লগে স্লাগ তৈরি করুন
                  </button>
                )}
              </div>
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 items-center"
                >
                  {b.imageUrl && (
                    <img
                      src={b.imageUrl}
                      alt={b.imageAlt || b.title}
                      className="w-20 h-20 object-cover rounded-lg bg-slate-100 shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {b.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1 truncate">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {b.readTime}
                    </p>
                    <p
                      className={`text-[11px] truncate mt-0.5 ${b.slug ? "text-slate-400" : "text-red-600 font-bold"}`}
                    >
                      {b.slug ? `/our-blogs/${b.slug}` : "URL স্লাগ নেই"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => trackEditBlog(b)}
                      disabled={actionLoading}
                      className="bg-blue-light/10 hover:bg-blue-light/20 text-blue-light p-2.5 rounded-lg text-xs font-bold transition-colors shrink-0"
                    >
                      এডিট
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      disabled={actionLoading}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-lg text-xs font-bold transition-colors shrink-0"
                    >
                      মুছে ফেলুন
                    </button>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-10 bg-white rounded-xl border border-slate-200">
                  কোনো ব্লগ পাওয়া যায়নি।
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-premium">
              <h2 className="text-md font-bold text-slate-900 mb-6">
                নতুন ছবি আপলোড করুন
              </h2>
              <form onSubmit={handleAddGalleryImage} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    ছবি নির্বাচন করুন
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    required
                    onChange={(e) => setGalleryImages(e.target.files)}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-light/10 file:text-blue-light hover:file:bg-blue-light/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    ছবির Alt টেক্সট
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryAlt}
                    onChange={(e) => setGalleryAlt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                    placeholder="চেম্বারে রোগী দেখছেন ডা. আরিফ"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    একাধিক ছবি দিলে প্রতিটির Alt এর শেষে সিরিয়াল নম্বর যুক্ত
                    হবে।
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-blue-light hover:bg-blue-dark disabled:bg-slate-300 text-white py-3 rounded-xl font-bold text-sm transition-all mt-4"
                >
                  {actionLoading ? "আপলোড হচ্ছে..." : "আপলোড করুন"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-8">
              <h2 className="text-md font-bold text-slate-900 mb-6">
                বর্তমান গ্যালারি ইমেজ ({gallery.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.map((g) => (
                  <div
                    key={g.id}
                    className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
                  >
                    <img
                      src={g.imageUrl}
                      alt={g.alt || "গ্যালারি ছবি"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteGalleryImage(g.id)}
                        disabled={actionLoading}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-transform hover:scale-105"
                      >
                        মুছে ফেলুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {gallery.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-10 bg-white rounded-xl border border-slate-200">
                  কোনো ছবি পাওয়া যায়নি।
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "videos" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-premium">
              <h2 className="text-md font-bold text-slate-900 mb-6">
                নতুন ভিডিও লিংক যুক্ত করুন
              </h2>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    ইউটিউব ভিডিও লিংক
                  </label>
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                    placeholder="https://www.youtube.com/watch?v=peJmnluzEOM"
                  />
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-blue-light hover:bg-blue-dark disabled:bg-slate-300 text-white py-3 rounded-xl font-bold text-sm transition-all mt-4"
                >
                  যুক্ত করুন
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-md font-bold text-slate-900 mb-2">
                বর্তমান ভিডিও লিংক সমূহ ({videos.length})
              </h2>
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-10 bg-slate-950 rounded overflow-hidden shrink-0 relative">
                      <img
                        src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 truncate">{`ID: ${v.videoId}`}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteVideo(v.id)}
                    disabled={actionLoading}
                    className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-lg text-xs font-bold transition-colors shrink-0"
                  >
                    মুছে ফেলুন
                  </button>
                </div>
              ))}
              {videos.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-10 bg-white rounded-xl border border-slate-200">
                  কোনো ভিডিও পাওয়া যায়নি।
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
