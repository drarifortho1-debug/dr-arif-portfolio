"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Clock, ArrowRight } from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

interface Blog {
  id?: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl?: string;
}

const stripHtml = (html: string) => {
  return html ? html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
};

export default function BlogsPreview() {
  const [blogsList, setBlogsList] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const list = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Blog[];
          setBlogsList(list);
        } else {
          setBlogsList([]);
        }
      } catch (err) {
        console.error(err);
        setBlogsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBlogs();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-light mx-auto"></div>
        </div>
      </section>
    );
  }

  if (blogsList.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-slate-50/50">
      <div className="max-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-light/5 text-blue-light text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-blue-light/10 mb-5">
            স্বাস্থ্য টিপস
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-dark tracking-tight">
            সর্বশেষ চিকিৎসা বিষয়ক পরামর্শ
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogsList.slice(0,3).map((b, i) => {
            const previewText = stripHtml(b.content);
            return (
              <Link key={b.id || i} href={`/blogs/${b.id}`} className="block group">
                <article className=" h-full rounded-xl border border-slate-100 overflow-hidden bg-white shadow hover:shadow-premium transition-all duration-300 flex flex-col">
                  <div className="h-56 bg-slate-50 relative overflow-hidden shrink-0">
                    {b.imageUrl ? (
                      <Image
                        src={b.imageUrl}
                        alt={b.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-md) 100vw, 400px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-slate-300" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-light text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-blue-light/10 z-10">
                      {b.category}
                    </span>
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                        <span className="font-semibold">{b.date}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {b.readTime}
                        </span>
                      </div>
                      <h2 className="font-bold text-slate-900 text-lg mb-3 leading-snug group-hover:text-blue-light transition-colors line-clamp-2">
                        {b.title}
                      </h2>
                      <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                        {previewText || "বিস্তারিত জানতে পুরো ব্লগটি পড়ুন..."}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-blue-light text-sm font-bold group-hover:gap-3 transition-all mt-auto self-start">
                      বিস্তারিত পড়ুন
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
