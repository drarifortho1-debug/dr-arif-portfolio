"use client";

import { ArrowUpRight, Film, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <section className="bg-white pt-15 pb-20 w-full">
      <div className="max-container">
        {/* সেকশন হেডার */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            <Film className="w-4 h-4" /> ভিডিও গ্যালারি
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            আমাদের ভিডিও গ্যালারি
          </h1>
          <p className="text-slate-600 text-lg">
            চিকিৎসা সংক্রান্ত গুরুত্বপূর্ণ ভিডিও ও বিশেষজ্ঞের পরামর্শসমূহ
          </p>
        </div>

        {/* ভিডিও গ্রিড */}
        <div className="grid grid-cols-2 gap-4">
          {videoIds.map((id) => (
            <div key={id} className="group ">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900">
                {activeVideo === id ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => setActiveVideo(id)}
                    className="w-full h-full cursor-pointer relative group"
                  >
                    <Image
                      fill
                      src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                      alt="YouTube Video Thumbnail"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* প্লে বাটন ওভারলে */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/5">
                      <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform transition group-hover:scale-110">
                        <Play className="w-6 h-6 text-teal-600 fill-teal-600 ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* ইউটিউব চ্যানেলের জন্য CTA */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            আরও ভিডিও পেতে আমাদের ইউটিউব চ্যানেলটি দেখুন
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            স্বাস্থ্য বিষয়ক নিয়মিত আপডেট এবং নতুন নতুন ভিডিওর জন্য আমাদের
            চ্যানেলে সাবস্ক্রাইব করুন।
          </p>
          <Link
            href="https://youtube.com/@your-channel-handle" // এখানে আপনার চ্যানেলের লিংক দিন
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
