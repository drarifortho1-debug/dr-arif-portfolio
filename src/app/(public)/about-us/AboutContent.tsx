"use client";

import { Badge } from "@/components/shared/badge";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  Activity,
  Award,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  Quote,
  Stethoscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryItem {
  id?: string;
  imageUrl: string;
  alt?: string;
}

export default function AboutContent() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const list = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            imageUrl: doc.data().imageUrl,
            alt: doc.data().alt,
          }));
          setGalleryList(list);
        } else {
          setGalleryList([]);
        }
      } catch {
        setGalleryList([]);
      }
    };
    fetchGallery();
  }, []);

  const stats = [
    { label: "অভিজ্ঞতা", value: "৫+ বছর", icon: Award },
    { label: "অর্থোপেডিক সার্জারি", value: "৫,০০০+", icon: Stethoscope },
    { label: "ট্রমা সার্জারি", value: "১,০০০+", icon: HeartHandshake },
    { label: "পরামর্শ", value: "৫০,০০০+", icon: Users },
  ];

  const education = [
    {
      degree: "এমএস (অর্থোপেডিক্স সার্জারি)",
      institution: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU)",
    },
    { degree: "এমবিবিএস", institution: "শহীদ সোহরাওয়ার্দী মেডিকেল কলেজ" },
    {
      degree: "এইচএসসি",
      institution: "কালিকাপুর আব্দুল মতিন খসরু ডিগ্রি কলেজ",
    },
    {
      degree: "এসএসসি",
      institution: "শ্রীমন্তপুর এম. এ. সাত্তার উচ্চ বিদ্যালয়",
    },
  ];

  const specialties = [
    {
      category: "হাড় ও জয়েন্টের সমস্যা",
      items: [
        "হাঁটু ব্যথা",
        "কোমর ব্যথা",
        "ঘাড় ব্যথা",
        "মেরুদণ্ডের ব্যথা",
        "কাঁধের ব্যথা",
        "ফ্রোজেন শোল্ডার",
        "বাত ব্যথা",
        "জয়েন্টের ব্যথা",
        "অস্টিওআর্থ্রাইটিস",
        "রিউমাটয়েড আর্থ্রাইটিস",
      ],
    },
    {
      category: "ফ্র্যাকচার ও দুর্ঘটনাজনিত আঘাত",
      items: [
        "হাড় ভাঙা",
        "সড়ক দুর্ঘটনার আঘাত",
        "ডিসলোকেশন",
        "জটিল ফ্র্যাকচার",
        "জরুরি ট্রমা চিকিৎসা",
      ],
    },
    {
      category: "হাতের বিভিন্ন সমস্যা",
      items: [
        "কার্পাল টানেল সিনড্রোম",
        "ট্রিগার ফিঙ্গার",
        "টেন্ডন ইনজুরি",
        "নার্ভ ইনজুরি",
        "হাতের সংক্রমণ",
      ],
    },
    {
      category: "খেলাধুলাজনিত আঘাত",
      items: [
        "লিগামেন্ট ইনজুরি",
        "মেনিস্কাস ইনজুরি",
        "স্পোর্টস ইনজুরি",
        "জয়েন্ট ইনজুরি",
      ],
    },
  ];

  const treatments = [
    {
      name: "PRP Therapy",
      desc: "হাঁটুর ক্ষয়, টেন্ডন ও লিগামেন্ট ইনজুরিতে ব্যবহৃত",
    },
    {
      name: "Ultrasound Guided Injection",
      desc: "নির্ভুল স্থানে ইনজেকশন প্রদানের পদ্ধতি",
    },
    {
      name: "Musculoskeletal Ultrasound (MSK USG)",
      desc: "পেশি, টেন্ডন ও জয়েন্টের সমস্যা নির্ণয়ে",
    },
    {
      name: "C-arm Guided Spine Intervention",
      desc: "মেরুদণ্ডের ব্যথা ও সায়াটিকার চিকিৎসায়",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {/* Hero Section with Soft Gradient */}
      <section className="relative py-24 md:py-32  border-b border-slate-100 overflow-hidden">
        <div className="max-container relative text-center z-10">
          <div className="mb-8 flex justify-center">
            <Badge text="আমার সম্পর্কে" />
          </div>
          <h1 className="text-4xl md:text-5xl  font-extrabold mb-6 text-slate-900 tracking-tight">
            ডা: গাজী মোহাম্মদ আরিফুল ইসলাম{" "}
            <span className="text-blue-light">(ভিলীয়া)</span>
          </h1>
          <div className="space-y-3 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto">
            <p className="font-bold text-slate-800">
              এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী)
            </p>
            <p>বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়, ঢাকা।</p>
            <p className="text-base">
              সহকারী রেজিষ্ট্রার – ক্যাজুয়ালটি বিভাগ, কুমিল্লা মেডিকেল কলেজ
              হাসপাতাল
            </p>
            <div className="inline-block mt-4 px-6 py-2 bg-blue-50/50 text-blue-light font-bold rounded-full border border-blue-100 ">
              অর্থোপেডিক্স, ট্রমা, স্পোর্টস ও হ্যান্ড সার্জন
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white -mt-8 relative z-20">
        <div className="max-container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group text-center bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-light group-hover:text-white transition-colors duration-300 text-blue-light">
                <s.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-800 mb-1">
                {s.value}
              </div>
              <div className="text-[11px] md:text-xs uppercase font-bold tracking-wider text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Areas */}
      <section className="py-20 max-w-5xl mx-auto px-6 space-y-24">
        {/* About Info */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
       
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              একজন নিবেদিত প্রাণ অর্থোপেডিক্স বিশেষজ্ঞ
            </h2>
            <p className="text-slate-600 leading-loose text-lg ">
              ডা. গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) একজন অর্থোপেডিক, ট্রমা,
              স্পোর্টস এন্ড হ্যান্ড সার্জন, এমবিবিএস, বিসিএস (স্বাস্থ্য) এবং
              এমএস (অর্থোপেডিক্স সার্জারি) সম্পন্ন করেছেন বঙ্গবন্ধু শেখ মুজিব
              মেডিকেল বিশ্ববিদ্যালয় (BSMMU) থেকে। বর্তমানে কুমিল্লা মেডিকেল
              কলেজ হাসপাতালের ক্যাজুয়ালটি বিভাগে সহকারী রেজিস্ট্রার হিসেবে
              কর্মরত, যেখানে প্রতিদিনের ট্রমা ও অর্থোপেডিক রোগী দেখার অভিজ্ঞতা
              থেকে তিনি ফ্র্যাকচার, হাঁটু-কোমর-ঘাড় ব্যথা, স্পোর্টস ইনজুরি ও
              হাতের সমস্যার চিকিৎসায় দক্ষতা অর্জন করেছেন। তিনি কুমিল্লা শহরের
              একাধিক চেম্বারে নিয়মিত রোগী দেখেন। রোগীর কথা মনোযোগ দিয়ে শোনা
              এবং সহজ ভাষায় চিকিৎসা বুঝিয়ে দেওয়া তার চিকিৎসা সেবার অন্যতম
              বৈশিষ্ট্য।
            </p>
          </div>
        </div>

        {/* Education & Profession */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center md:text-left">
            শিক্ষা ও পেশাগত পরিচয়
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-white rounded-lg shadow-sm text-blue-light">
                  <GraduationCap size={18} />
                </div>
                <h3 className="text-xl font-bold text-blue-light">শিক্ষা</h3>
              </div>
              <div className="space-y-5">
                {education.map((e, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-light shrink-0" />
                    <div>
                      <p className="font-bold text-blue-dark">{e.degree}</p>
                      <p className="text-slate-500 text-sm mt-1">
                        {e.institution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-white rounded-lg shadow-sm text-blue-light">
                  <Briefcase size={18} />
                </div>
                <h3 className="text-xl font-bold text-blue-light">
                  পেশাগত পরিচয়
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "বিসিএস (স্বাস্থ্য) ক্যাডার কর্মকর্তা",
                  "অর্থোপেডিক্স বিশেষজ্ঞ",
                  "ট্রমা সার্জন",
                  "স্পোর্টস ইনজুরি বিশেষজ্ঞ",
                  "হ্যান্ড সার্জন",
                  "সহকারী রেজিস্ট্রার, কুমিল্লা মেডিকেল কলেজ হাসপাতাল",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3  rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-light shrink-0" />
                    <span className="text-blue-dark font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div>
          <div className="text-center md:text-left mb-10">
            <h2 className="text-3xl font-bold text-blue-dark mb-4">
              যেসব সমস্যার চিকিৎসা করা হয়
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {specialties.map((group, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 p-6 rounded-xl"
              >
                <h3 className="text-lg font-bold text-blue-light mb-5 border-b border-slate-100 pb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-sm font-medium text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 px-4 py-2 rounded-full transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treatments */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center md:text-left">
            বিশেষ সেবা
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed max-w-3xl text-center md:text-left">
            বর্তমান সময়ে অনেক অর্থোপেডিক সমস্যার চিকিৎসায় আধুনিক প্রযুক্তি
            ব্যবহার করা হয়। রোগীর প্রয়োজন অনুযায়ী বিভিন্ন উন্নত চিকিৎসা
            পদ্ধতি প্রদান করা হয়:
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {treatments.map((t, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 p-5 bg-white border border-slate-200 hover:border-blue-300 rounded-2xl hover:shadow-md transition-all duration-300"
              >
                <div className="p-2.5 bg-blue-50 text-blue-light rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-blue-dark text-lg mb-1">
                    {t.name}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gratitude */}
        <div className="relative overflow-hidden bg-linear-to-r from-blue-light to-blue-800 p-8 md:p-10 rounded-3xl text-white shadow-xl shadow-blue-900/10">
          <Quote className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10" />
          <h3 className="font-bold text-blue-100 mb-4 text-lg">কৃতজ্ঞতা</h3>
          <p className="text-lg md:text-xl leading-relaxed italic font-medium relative z-10">
            &quot;শিক্ষাজীবনে প্রেরণার জন্য আমি গভীরভাবে কৃতজ্ঞতা প্রকাশ করছি আমার
            মরহুম দাদা, শ্রীমন্তপুর এম. এ. ছাত্তার উচ্চ বিদ্যালয়ের প্রতিষ্ঠাতা
            আলহাজ্ব আব্দুস সাত্তার খানের প্রতি।&quot;
          </p>
        </div>

        {/* FAQ */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              সচরাচর জিজ্ঞাসিত প্রশ্ন
            </h2>
            <p className="text-slate-500">আপনার সাধারণ কিছু প্রশ্নের উত্তর</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                q: "সিরিয়াল কীভাবে নেব?",
                a: "উপরের যেকোনো নম্বরে কল করে আপনার পছন্দের চেম্বার ও দিন অনুযায়ী সিরিয়াল নিতে পারবেন।",
              },
              {
                q: "প্রথম ভিজিটে কী নিয়ে যেতে হবে?",
                a: "পূর্বের কোনো রিপোর্ট, এক্স-রে বা প্রেসক্রিপশন থাকলে সঙ্গে নিয়ে আসুন। না থাকলেও সমস্যা নেই।",
              },
              {
                q: "জরুরি ট্রমা বা দুর্ঘটনার রোগী দেখা হয় কি?",
                a: "হ্যাঁ, দুর্ঘটনাজনিত আঘাত ও জরুরি ট্রমা রোগীর চিকিৎসা প্রদান করা হয়।",
              },
              {
                q: "অনলাইনে বা ফোনে পরামর্শ নেওয়া যায় কি?",
                a: "হ্যাঁ, নির্দিষ্ট ক্ষেত্রে অনলাইনে বা ফোনে পরামর্শ নেওয়ার সুযোগ রয়েছে। বিস্তারিত তথ্য এবং অ্যাপয়েন্টমেন্টের জন্য প্রদত্ত নম্বরে যোগাযোগ করুন।",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-100 rounded-2xl p-6 transition-all"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 mb-2">{faq.q}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-container text-center ">
          <div className="flex flex-col items-center space-y-5 mb-14">
            <Badge text="গ্যালারি" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-dark">
              অভিজ্ঞতার কিছু মুহূর্ত
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryList.length > 0 ? (
              galleryList.map((item, i) => (
                <div
                  key={i}
                  className="group aspect-square bg-slate-200 rounded-2xl overflow-hidden relative shadow-sm"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt || `ডা. আরিফ অর্থো গ্যালারি ছবি ${i + 1}`}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300" />
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-slate-400">
                গ্যালারিতে কোনো ছবি পাওয়া যায়নি।
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
