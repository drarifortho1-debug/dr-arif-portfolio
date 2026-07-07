"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Tag, ArrowLeft, Clock } from "lucide-react";

interface Blog {
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export default function BlogDetailContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data() as Blog);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-muted flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-light"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center bg-surface p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md">
          <h2 className="text-xl font-bold text-blue-dark mb-2">
            ব্লগটি পাওয়া যায়নি
          </h2>
          <p className="text-sm text-muted mb-6">
            হয়তো পোস্টটি মুছে ফেলা হয়েছে অথবা লিংকটি ভুল।
          </p>
          <button
            onClick={() => router.push("/our-blogs")}
            className="inline-flex items-center gap-2 text-sm font-semibold bg-blue-light/10 text-blue-light px-4 py-2 rounded-xl hover:bg-blue-light/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ব্লগে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20 max-container">
      <div className=" border-b pb-4 border-slate-200   flex items-center justify-between mx-auto  pt-8 md:pt-12 mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-light transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          পেছনে যান
        </button>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 ">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>৩ মিনিট পড়া</span>
          </div>
        </div>
      </div>

      <article className="">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-dark tracking-tight leading-tight md:leading-tight">
            {blog.title}
          </h1>
        </div>

        {blog.imageUrl && (
          <div className="w-full h-[280px] sm:h-[400px] md:h-[480px] relative rounded-md overflow-hidden shadow-md mb-10 group">
            <span className="inline-flex items-center gap-1.5 bg-blue-light text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full  absolute z-10 top-2 right-2">
              <Tag className="w-3 h-3" />
              {blog.category}
            </span>
            <Image
              fill
              src={blog.imageUrl}
              alt={blog.title}
              priority
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              sizes="(max-w-4xl) 100vw, 896px"
            />
          </div>
        )}

        <div>
          <div
            className="blog-rich-text prose prose-slate max-w-none 
              text-slate-700 text-base md:text-lg leading-relaxed 
              prose-headings:text-blue-dark prose-headings:font-bold
              prose-p:mb-5 prose-p:leading-relaxed
              prose-strong:text-blue-dark prose-strong:font-bold
              prose-ul:list-disc prose-ul:pl-5 prose-li:mb-2
              focus:outline-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>
    </main>
  );
}
