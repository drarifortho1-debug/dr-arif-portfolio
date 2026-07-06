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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const QuillEditor = dynamic(() => import("@/components/admin/QuillEditor"), {
  ssr: false,
});

interface Blog {
  id: string;
  title: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
}

interface GalleryImage {
  id: string;
  imageUrl: string;
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
  const [activeTab, setActiveTab] = useState<"blogs" | "gallery" | "videos">(
    "blogs",
  );

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);
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
            setBlogContent(data.content);
            setBlogCategory(data.category);
            setBlogReadTime(data.readTime);
            setBlogDate(data.date);
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
    setBlogContent(b.content);
    setBlogCategory(b.category);
    setBlogReadTime(b.readTime);
    setBlogDate(b.date);
    setEditingBlogId(b.id);
    setActiveTab("blogs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (email !== "drarifortho1@gmail.com") {
      setLoginError("Unauthorized email address.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Failed to log in.");
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
        content: blogContent,
        category: blogCategory,
        readTime: blogReadTime || "৫ মিনিট",
        date: blogDate || new Date().toLocaleDateString("bn-BD"),
        imageUrl,
        createdAt: new Date(),
      };

      if (editingBlogId) {
        await updateDoc(doc(db, "blogs", editingBlogId), blogData);
        setMessage({ text: "ব্লগ সফলভাবে আপডেট হয়েছে!", type: "success" });
      } else {
        await addDoc(collection(db, "blogs"), blogData);
        setMessage({ text: "ব্লগ সফলভাবে যুক্ত হয়েছে!", type: "success" });
      }

      setBlogTitle("");
      setBlogContent("");
      setBlogCategory("");
      setBlogReadTime("");
      setBlogDate("");
      setBlogImage(null);
      setEditingBlogId(null);
      fetchData();
    } catch (err) {
      console.error("Blog save error:", err);
      setMessage({ text: "ব্লগ সেভ করতে সমস্যা হয়েছে", type: "error" });
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
    setActionLoading(true);
    setMessage(null);
    try {
      const uploadPromises = Array.from(galleryImages).map(async (file) => {
        const imageUrl = await uploadToImgbb(file);
        await addDoc(collection(db, "gallery"), {
          imageUrl,
          createdAt: new Date(),
        });
      });
      await Promise.all(uploadPromises);
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
              className="w-full bg-blue-light hover:bg-blue-dark text-white py-3.5 rounded-xl font-bold transition-all text-sm active:scale-98 shadow-md"
            >
              লগইন করুন
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
              <h2 className="text-md font-bold text-slate-900 mb-6">
                {editingBlogId
                  ? "ব্লগ এডিট করুন"
                  : "নতুন ব্লগ পোস্ট যুক্ত করুন"}
              </h2>
              <form onSubmit={handleAddBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    ব্লগ শিরোনাম
                  </label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-light text-sm"
                    placeholder="হাঁটু ব্যথার চিকিৎসা"
                  />
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
                      পড়ার সময়
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
                  <QuillEditor value={blogContent} onChange={setBlogContent} />
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
                <button
                  type="submit"
                  disabled={actionLoading}
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
              <h2 className="text-md font-bold text-slate-900 mb-2">
                বর্তমান ব্লগ পোস্ট সমূহ ({blogs.length})
              </h2>
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 items-center"
                >
                  {b.imageUrl && (
                    <img
                      src={b.imageUrl}
                      alt={b.title}
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
                  কোনো ব্লগ পাওয়া যায়নি।
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
                      alt="Gallery"
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
