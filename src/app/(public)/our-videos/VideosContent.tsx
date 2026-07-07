"use client";

import { Badge } from "@/components/shared/badge";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VideosContent() {
  const [videoIds, setVideoIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const list = querySnapshot.docs.map(
            (doc) => doc.data().videoId as string,
          );
          setVideoIds(list);
        } else {
          setVideoIds([]);
        }
      } catch (err) {
        setVideoIds([]);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section className="bg-white pt-15 pb-20 w-full overflow-hidden">
      <div className="max-container">
        <div className="mb-12 text-center">
          <Badge text="ভিডিওসমূহ " />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-dark mb-3 mt-5">
            আমাদের ভিডিও গ্যালারি
          </h1>
          <p className="text-slate-600 text-lg">
            চিকিৎসা সংক্রান্ত গুরুত্বপূর্ণ ভিডিও ও বিশেষজ্ঞের পরামর্শসমূহ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videoIds.map((id) => (
            <div
              key={id}
              className="bg-slate-50/50 rounded-2xl p-1.5 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
                  title="Video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            আরও ভিডিও পেতে আমাদের ইউটিউব চ্যানেলটি দেখুন
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            স্বাস্থ্য বিষয়ক নিয়মিত আপডেট এবং নতুন নতুন ভিডিওর জন্য আমাদের
            চ্যানেলে সাবস্ক্রাইব করুন।
          </p>
          <Link
            href="https://www.youtube.com/@Dr.GaziArifVelia1"
            target="_blank"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105"
          >
            ইউটিউবে দেখুন <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
