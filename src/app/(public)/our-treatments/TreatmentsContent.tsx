"use client";

import ChambersSection from "@/components/home/ChambersSection";
import CTABanner from "@/components/home/CTABanner";
import {
  Activity,
  CheckCircle2,
  ChevronsRight,
  Droplets,
  Microscope,
  Scan,
  Stethoscope,
  Syringe,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TreatmentsContent() {
  const specialties = [
    {
      label: "হাঁটু ব্যথা",
      desc: "আর্থ্রাইটিস, লিগামেন্ট ইনজুরি, মেনিস্কাস সমস্যা",
      href: "/our-treatments/knee-pain",
    },
    {
      label: "কোমর ও মেরুদণ্ড",
      desc: "ডিস্ক প্রোলাপ্স, সাইটিকা, স্পাইনাল স্টেনোসিস",
      href: "/our-treatments/back-and-spine-pain",
    },
    {
      label: "কাঁধ ও জয়েন্টের সমস্যা",
      desc: "ফ্রোজেন শোল্ডার, রোটেটর কাফ ইনজুরি",
      href: "/our-treatments/shoulder-and-joint-pain",
    },
    {
      label: "স্পোর্টস ইনজুরি",
      desc: "ACL, লিগামেন্ট, মেনিস্কাস ইনজুরি",
      href: "/our-treatments/sports-injury",
    },
    {
      label: "মেরুদণ্ডের ট্রমা",
      desc: "স্পাইন ফ্র্যাকচার, স্পাইনাল কর্ড ইনজুরি",
      href: "/our-treatments/spine-trauma",
    },
    {
      label: "হাতের কব্জি ও পায়ের পাতা",
      desc: "কব্জির ব্যথা, গোড়ালির আঘাত",
      href: "/our-treatments/wrist-and-foot",
    },
    {
      label: "বাত ও আর্থ্রাইটিস",
      desc: "অস্টিওআর্থ্রাইটিস, রিউমাটয়েড আর্থ্রাইটিস",
      href: "/our-treatments/rheumatism-and-arthritis",
    },
    {
      label: "ফ্র্যাকচার ও জরুরি ট্রমা",
      desc: "হাড় ভাঙা, ডিসলোকেশন, দুর্ঘটনার আঘাত",
      href: "/our-treatments/fracture-and-emergency",
    },
    {
      label: "হাতের স্নায়ু ও টেন্ডন",
      desc: "কার্পাল টানেল, ট্রিগার ফিঙ্গার",
      href: "/our-treatments/hand-nerve-and-tendon",
    },
    {
      label: "ঘাড় ব্যথা",
      desc: "সার্ভাইক্যাল স্পন্ডাইলোসিস, ডিস্ক সমস্যা",
      href: "/our-treatments/neck-pain",
    },
  ];

  const procedures = [
    {
      title: "মেরুদন্ডের ইঞ্জেকশন (C-arm guided spine intervention)",
      icon: Syringe,
      text: "Fluoroscopy বা C-arm হচ্ছে এক ধরনের low radiation x-ray machine। এই কম্পিউটারাইজড এক্সরে মেশিনের সাহায্যে রোগীর মেরুদন্ডের সুনির্দিষ্ট জায়গায় ইনজেকশন প্রদান করা হয়ে থাকে। মেরুদন্ডের ডিস্ক প্রোলাপ্স (PLID) ও স্পাইনাল স্টেনোসিস সহ অন্যান্য সমস্যায় সার্জারির বিকল্প হিসেবে এই প্রক্রিয়াটি অত্যন্ত কার্যকর।",
    },
    {
      title: "মাসকুলো-স্কেলেটাল আল্ট্রাসাউন্ড (MSK USG)",
      icon: Scan,
      text: "এক্সরের মাধ্যমে শুধুমাত্র হাড্ডি ও জয়েন্ট দেখা গেলেও, মাংসপেশী, টেন্ডন, লিগামেন্ট ও রক্তনালীর মতো সফট টিস্যু দেখার জন্য এমএসকে আলট্রাসাউন্ড সবচেয়ে কার্যকরী ব্যবস্থা। এটি সম্পূর্ণ ব্যথামুক্ত এবং চেম্বারেই দ্রুত সম্পন্ন করা যায়।",
    },
    {
      title: "আল্ট্রাসাউন্ড দ্বারা ইনজেকশন (USGI)",
      icon: Microscope,
      text: "আন্দাজ বা অনুমানের ওপর ভর করে শরীরের আক্রান্ত স্থানে ইনজেকশন দিলে তার সঠিকতা নিখুঁত হয় না। আধুনিক চিকিৎসা বিজ্ঞানে আলট্রাসাউন্ডের লাইভ ছবি দেখে সরাসরি সঠিক স্থানে ইনজেকশন প্রদান নিশ্চিত করা হয়।",
    },
    {
      title: "পিআরপি থেরাপি (PRP therapy)",
      icon: Droplets,
      text: "রোগীর নিজের রক্ত থেকে প্লাজমা সংগ্রহ করে ইনজেকশন হিসেবে ব্যবহার করার আধুনিক পদ্ধতি। হাঁটু, কাঁধ, কনুই বা অন্যান্য জয়েন্টের ব্যথা এবং অ্যাথলেটদের পেশি ও লিগামেন্ট পুনর্গঠনে এটি দারুণ ফল দেয়।",
    },
    {
      title: "ওজোন থেরাপি (Ozone therapy)",
      icon: Wind,
      text: "প্রাকৃতিক নিরাময় প্রক্রিয়া ত্বরান্বিত করতে এবং শরীরে অক্সিজেন সরবরাহ বাড়াতে ওজোন (O₃) গ্যাস প্রয়োগ করা হয়। আর্থ্রাইটিস, জয়েন্ট পেইন এবং প্রদাহ কমাতে এটি অত্যন্ত উপযোগী।",
    },
  ];

  const traumaSurgeries = [
    "Clavicle fracture fixation",
    "Humerus fracture & dislocation treatment",
    "Elbow fracture & dislocation Treatment",
    "Radius & Ulna Fracture fixation",
    "Wrist fracture & dislocation treatment",
    "Metacarpal & Phalanx fracture fixation",
    "Femoral Neck Fracture treatment",
    "Femoral Trochanteric fracture fixation",
    "Femoral Shaft fracture fixation",
    "Distal Femoral condyle fracture fixation",
    "Tibial plateau fracture fixation",
    "Tibial Shaft fracture fixation",
    "Ankle fracture fixation",
  ];

  const orthopedicTreatments = [
    "ঘাড়, কোমর, হাঁটু ও পায়ের গোড়ালি ব্যথা",
    "হাড় ক্ষয় (Osteoporosis) ও বাত ব্যথা",
    "ফ্রোজেন শোল্ডার (Adhesive Capsulitis)",
    "টেনিস এলবো ও গলফার এলবো",
    "ডি কুয়েরভেন'স টেনোসাইনোভাইটিস",
    "কার্পাল টানেল সিনড্রোম (CTS) ও ট্রিগার ফিঙ্গার",
    "রিউমাটয়েড আর্থ্রাইটিস ও অস্টিও-আর্থ্রাইটিস",
    "হ্যান্ড ইনফেকশন, টেন্ডন, লিগামেন্ট ও নার্ভ ইনজুরি",
    "জয়েন্ট আর্থ্রোপ্লাস্টি ও আধুনিক সার্জারি",
  ];

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Banner Section */}
      <section className="pt-8 mb-16">
        <div className="max-container">
          <div className="overflow-hidden rounded-2xl shadow-sm border border-slate-100">
            <Image
              src="/treatment-banner.jpg"
              width={1920}
              height={800}
              alt="Treatment Banner"
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Specialties Clean Cards */}
      <section className="mb-24">
        <div className="max-container">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-dark mt-3">
              অর্থোপেডিক বিশেষত্বসমূহ
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              আপনার প্রয়োজন অনুযায়ী নির্দিষ্ট সমস্যার বিস্তারিত বিবরণ দেখে
              নিন।
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-5">
            {specialties.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group  rounded-lg border border-slate-100 hover:border-blue-light/30 hover:shadow-lg hover:shadow-blue-light/5 transition-all duration-300 bg-white flex justify-between p-4 items-start"
              >
                <div>
                  <h3 className="font-bold text-lg text-blue-dark group-hover:text-blue-light transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-slate-500 mt-1 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <ChevronsRight className="w-4 h-4 ml-1 text-slate-500 group-hover:translate-x-1.5 group-hover:text-blue-light transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Procedures Detailed Reading List */}
      <section className="mb-24 bg-slate-50/60 py-16 border-y border-slate-100">
        <div className="max-container">
          <div className=" mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-dark mt-3">
              চিকিৎসার আধুনিক প্রসিডিওর
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              ব্যথামুক্ত ও আধুনিক ইন্টারভেনশনাল চিকিৎসা পদ্ধতিগুলোর বিস্তারিত
              বিবরণ।
            </p>
          </div>

          <div className="space-y-6 ">
            {procedures.map((p, i) => (
              <div
                key={i}
                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/70 shadow-xs"
              >
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-light rounded-xl shrink-0 mt-1">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-dark mb-3">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List (Trauma & Orthopedic) */}
      <section className="mb-24">
        <div className="max-container">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-dark mt-3">
              ট্রমা সার্জারি ও অর্থোপেডিক চিকিৎসা
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Trauma Surgery Box */}
            <div className="bg-red-50/30 border border-red-100 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 text-red-700 flex items-center gap-3">
                <Stethoscope className="w-6 h-6" /> ট্রমা সার্জারি চিকিৎসা
              </h3>
              <ul className="space-y-3.5">
                {traumaSurgeries.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-700 text-base"
                  >
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* General Orthopedic Box */}
            <div className="bg-blue-50/20 border border-blue-100/70 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 text-blue-dark flex items-center gap-3">
                <Activity className="w-6 h-6 text-blue-light" /> অর্থোপেডিক
                চিকিৎসা ও সেবা
              </h3>
              <ul className="space-y-3.5">
                {orthopedicTreatments.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-700 text-base"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-light shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="mb-24">
        <div className="max-container">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-dark mt-3">
              কেন ডা. গাজী মোহাম্মদ আরিফুল ইসলাম?
            </h2>
          </div>
          <div className="grid gap-2">
            {[
              "BSMMU প্রশিক্ষিত অর্থোপেডিক সার্জন (এমএস - অর্থোপেডিক্স সার্জারি)",
              "৩৫তম বিসিএস স্বাস্থ্য ক্যাডার চিকিৎসক",
              "কুমিল্লা মেডিকেল কলেজ হাসপাতালের সহকারী রেজিস্ট্রার, ক্যাজুয়ালটি বিভাগ",
              "৫+ বছরের চিকিৎসা অভিজ্ঞতা, ৫০০০+ অর্থোপেডিক সার্জারি ও ১০০০+ ট্রমা সার্জারি",
              "৫০,০০০+ রোগীকে সফলভাবে চিকিৎসা পরামর্শ প্রদান",
              "স্পোর্টস ইনজুরি, ট্রমা ও হ্যান্ড সার্জারিতে বিশেষ দক্ষতা",
            ].map((item, i) => (
              <div key={i} className=" border-b border-slate-200 flex items-start gap-4">
                <div className="h-3 w-3 rounded-full bg-blue-light shrink-0 mt-2" />
                <p className="text-slate-700 text-base leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}

      <ChambersSection />
      <CTABanner />
    </main>
  );
}
