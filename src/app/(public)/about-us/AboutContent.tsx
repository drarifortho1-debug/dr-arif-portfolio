"use client";

import { useState, useEffect } from "react";
import { Award, HeartHandshake, Stethoscope, Users } from "lucide-react";
import Image from "next/image";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface GalleryItem {
  id?: string;
  imageUrl: string;
}

export default function AboutContent() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const list = querySnapshot.docs.map(doc => ({
            id: doc.id,
            imageUrl: doc.data().imageUrl
          }));
          setGalleryList(list);
        } else {
          setGalleryList([]);
        }
      } catch (err) {
        setGalleryList([]);
      }
    };
    fetchGallery();
  }, []);

  const stats = [
    { label: "অভিজ্ঞতা", value: "৫+ বছর", icon: Award },
    { label: "অর্থোপেডিক সার্জারি", value: "৫০০০+", icon: Stethoscope },
    { label: "ট্রমা সার্জারি", value: "১০০০+", icon: HeartHandshake },
    { label: "পরামর্শ", value: "৫০,০০০+", icon: Users },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="py-20 md:py-28 border-b border-slate-100">
        <div className="max-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ডা: গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া
          </h1>
          <div className="space-y-1 text-slate-600 text-lg">
            <p className="font-semibold text-slate-800">
              এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী)
            </p>
            <p>বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়, ঢাকা।</p>
            <p>
              সহকারী রেজিষ্ট্রার – ক্যাজুয়ালটি বিভাগ, কুমিল্লা মেডিকেল কলেজ
              হাসপাতাল
            </p>
            <p className="text-blue-light font-bold pt-2">
              অর্থোপেডিক্স, ট্রমা, স্পোর্টস ও হ্যান্ড সার্জন
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="max-container grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
            >
              <s.icon className="w-6 h-6 mx-auto text-blue-light mb-2" />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-6 space-y-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">
            একজন নিবেদিত প্রাণ অর্থোপেডিক্স বিশেষজ্ঞ
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            ডা. গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া একজন নিবেদিতপ্রাণ
            অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন। তিনি ২০২৪ সালে বঙ্গবন্ধু শেখ
            মুজিব মেডিকেল বিশ্ববিদ্যালয় থেকে অর্থোপেডিক ও ট্রমা সার্জারিতে এমএস
            ডিগ্রি অর্জন করেন। ইতিপূর্বে শহীদ সোহরাওয়ার্দী মেডিকেল কলেজ থেকে
            এমবিবিএস (২০১৪) ও ইন্টার্নশিপ (২০১৫) সম্পন্ন করেছেন। ৩৫তম বিসিএস
            স্বাস্থ্য ক্যাডারের এই সদস্য বর্তমানে কুমিল্লা মেডিকেল কলেজ
            হাসপাতালে ক্যাজুয়ালটি বিভাগের সহকারী রেজিস্ট্রার হিসেবে দায়িত্ব
            পালন করছেন এবং প্রতিনিয়ত অসংখ্য ইমারজেন্সি রোগীর জীবন রক্ষায় কাজ
            করছেন।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl">
            <h3 className="font-bold mb-4">শিক্ষা জীবন</h3>
            <p className=" text-slate-600 leading-relaxed">
              কুমিল্লা জেলার বুড়িচং থানার জঙ্গলবাড়ি গ্রামের কৃতি সন্তান ডা.
              ভিলীয়া ২০০৫ সালে শ্রীমন্তপুর এম. এ. সাত্তার উচ্চ বিদ্যালয় হতে
              এসএসসি এবং ২০০৭ সালে কালিকাপুর আব্দুল মতিন খসরু সরকারি কলেজ হতে
              এইচএসসি উত্তীর্ণ হন।
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl">
            <h3 className="font-bold mb-4">সমাজসেবা ও মানবিক উদ্যোগ</h3>
            <p className=" text-slate-600 leading-relaxed">
              ছুটির দিনে নিজ গ্রামে অসহায়দের বিনামূল্যে চিকিৎসা সেবা প্রদান
              করেন। এছাড়া এতিমখানা, মাদ্রাসা ও মসজিদে নিয়মিত অনুদান প্রদান করেন।
              ভবিষ্যতে একটি স্বল্পমূল্যের চিকিৎসা সেবামূলক হাসপাতাল গড়ার লক্ষ্য
              রয়েছে তার।
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-blue-dark mb-4">কৃতজ্ঞতা</h3>
          <p className="text-slate-700 leading-relaxed italic">
            শিক্ষাজীবনে প্রেরণার জন্য ডা. ভিলীয়া কৃতজ্ঞতা প্রকাশ করেছেন তার
            মরহুম দাদা, শ্রীমন্তপুর এম. এ. ছাত্তার উচ্চ বিদ্যালয়ের প্রতিষ্ঠাতা
            আলহাজ্ব আব্দুস সাত্তার খানের প্রতি।
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-container text-center">
          <div className="flex flex-col items-center mb-12">
            <span className="text-blue-light font-bold tracking-widest uppercase text-xs mb-2">
              গ্যালারি
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              অভিজ্ঞতার কিছু মুহূর্ত
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {galleryList.map((item, i) => (
              <div
                key={i}
                className="aspect-square bg-slate-200 rounded-lg overflow-hidden"
              >
                <img
                  src={item.imageUrl}
                  alt={`Gallery Image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
