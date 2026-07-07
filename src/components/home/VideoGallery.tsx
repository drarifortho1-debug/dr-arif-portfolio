"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../shared/badge";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultVideoIds: string[] = [];

export default function VideoGallery() {
  const [videoIds, setVideoIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(collection(db, "videos"), orderBy("createdAt", "desc"), limit(4));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const list = querySnapshot.docs.map(doc => doc.data().videoId as string);
          setVideoIds(list);
        } else {
          setVideoIds(defaultVideoIds.slice(0, 4));
        }
      } catch (err) {
        setVideoIds(defaultVideoIds.slice(0, 4));
      }
    };
    fetchVideos();
  }, []);

  return (
    <section className=" py-24 bg-slate-50 md:py-32 border-y border-slate-100 w-full overflow-hidden">
      <div className="max-container">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80 mb-12 text-left">
          <div className="space-y-3 max-w-xl">
            <Badge text="ভিডিও গ্যালারি" />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight">
              চিকিৎসা বিষয়ক ভিডিও
            </h2>
          </div>

          <Link
            href="/our-videos"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-blue-light hover:text-blue-dark transition-colors group"
          >
           সকল ভিডিওসমূহ 
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {videoIds.map((id) => (
            <div
              key={id}
              className="flex flex-col bg-slate-50/50 rounded-xl p-2 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link
            href="/our-videos"
            className="inline-flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-slate-100 text-slate-700 px-6 py-3.5 rounded-xl text-sm font-bold border border-slate-200 transition-all active:scale-95"
          >
            সব ভিডিও দেখুন
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
