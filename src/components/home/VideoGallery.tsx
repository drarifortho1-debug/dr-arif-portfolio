"use client";

import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// প্রথম ৪টি ভিডিও হোমপেজে দেখানোর জন্য
const videoIds = [
  "peJmnluzEOM",
  "V8KqUgKvz7w",
  "Ck2vI6l65wA",
  "dc0kCylK2RY",
  "S7oFrwWe61Q",
  "rUwbTU0Jv_8",
  "DXZXd6cd-T8",
  "qFtjHJJOAJI",
  "JcyQSUToUTM",
  "0P-nnwwXKCU",
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // প্রথম ৪টি ভিডিও স্লাইস করে নেওয়া হলো
  const homeVideos = videoIds.slice(0, 4);

  return (
    <section className="bg-white py-24 md:py-32 border-t border-slate-100 w-full overflow-hidden">
      <div className="max-container">
        {/* হেডার ব্লক */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 mb-16 text-left">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1 rounded-md text-sm font-bold tracking-wider uppercase">
              ভিডিও গ্যালারি
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight">
              চিকিৎসা বিষয়ক ভিডিও
            </h2>
          </div>

          <Link
            href="/gallery"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors group"
          >
            সব ভিডিও দেখুন
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 🛠️ ফিক্সড ৪-কলাম গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {homeVideos.map((id) => (
            <div
              key={id}
              className="flex flex-col bg-slate-50/50 rounded-xl p-2 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              {/* 💡 থাম্বনেইল রাউন্ডনেস `rounded-lg` এ ফিক্সড করা হয়েছে */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900 group">
                {activeVideo === id ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => setActiveVideo(id)}
                    className="w-full h-full cursor-pointer"
                  >
                    <Image
                      width={700}
                      height={700}
                      src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                      alt="YouTube Video Thumbnail"
                      className="w-full h-full object-cover opacity-95 group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* হালকা ওভারলে শ্যাডো */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />

                    {/* 🛠️ ছোট, স্লিক এবং ট্রান্সপারেন্ট প্লে বাটন */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm text-teal-600 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:text-teal-700 group-hover:scale-105 active:scale-95 transition-all duration-300">
                        <Play className="w-4 h-4 fill-teal-600 ml-0.5 opacity-90" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* মোবাইল ডিভাইসের জন্য নিচের বাটন */}
        <div className="text-center mt-12 md:hidden">
          <Link
            href="/gallery"
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
