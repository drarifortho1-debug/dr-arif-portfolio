"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "../shared/badge";

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
  // প্রথম ৪টি ভিডিও স্লাইস করে নেওয়া হলো
  const homeVideos = videoIds.slice(0, 4);

  return (
    <section className="bg-white py-24 md:py-32 border-t border-slate-100 w-full overflow-hidden">
      <div className="max-container">
        {/* হেডার ব্লক */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80 mb-12 text-left">
          <div className="space-y-3 max-w-xl">
            
            <Badge text="ভিডিও গ্যালারি" />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight">
              চিকিৎসা বিষয়ক ভিডিও
            </h2>
          </div>

          <Link
            href="/gallery"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-blue-light hover:text-teal-700 transition-colors group"
          >
            সব ভিডিও দেখুন
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ৪-কলাম গ্রিড লেআউট (স্টাইল অপরিবর্তিত) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {homeVideos.map((id) => (
            <div
              key={id}
              className="flex flex-col bg-slate-50/50 rounded-xl p-2 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              {/* ডিফল্ট প্লেয়ার ইন্টিগ্রেশন */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy" // পারফরম্যান্স বুস্ট করার জন্য লেজি লোড ব্যবহার করা হয়েছে
                />
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
