"use client";

import {
  ChevronDown,
  Droplets,
  HeartPulse,
  Microscope,
  Scan,
  Stethoscope,
  Syringe,
  Wind,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TreatmentsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const procedures = [
    {
      title: "মেরুদন্ডের ইঞ্জেকশন (C-arm guided spine intervention)",
      icon: Syringe,
      content:
        "Fluoroscopy বা C-arm হচ্ছে এক ধরনের low radiation x-ray machine। এই কম্পিউটারাইজড এক্সরে মেশিনের সাহায্যে রোগীর মেরুদন্ডের সুনির্দিষ্ট জায়গায় ইনজেকশন প্রদান করা হয়ে থাকে। প্রথমত কম্পিউটারাইজড ক্যামেরার সাহায্যে রোগীর মেরুদন্ডের নির্দিষ্ট সমস্যাযুক্ত জায়গাটি আইডেন্টিফাই করা হয় তারপর সেখানে এক ধরনের dye দিয়ে C-arm মেশিনের মাধ্যমে তা দেখে পুনরায় এর অবস্থান সুনিশ্চিত করা হয়। এরপর সরাসরি দেখে নির্ভুলভাবে উক্ত আক্রান্ত স্থানে যেমন, স্পাইনাল নার্ভ রুট, ফেসেট জয়েন্ট, ইপিডুরাল স্পেস ইত্যাদি জায়গায় ইনজেকশন এর মাধ্যমে ঔষধ প্রয়োগ করা হয়। মেরুদন্ডের ডিস্ক প্রোলাপ্স(PLID) ও স্পাইনাল স্টেনোসিস সহ অন্যান্য সমস্যায় সার্জারির বিকল্প হিসেবে এই প্রক্রিয়াটি অত্যন্ত কার্যকর।",
    },
    {
      title: "মাসকুলো-স্কেলেটাল আল্ট্রাসাউন্ড (MSK USG)",
      icon: Scan,
      content: (
        <div className="space-y-2">
          <p>
            <strong>এমএসকে আলট্রাসাউন্ড কি?</strong>
            <br />
            বিভিন্ন অর্থোপেডিক সমস্যায় রোগ নির্নয়ের ক্ষেত্রে, এক্সরের বহুল
            ব্যবহার থাকলেও, এক্সরের মাধ্যমে শুধুমাত্র হাড্ডি ও জয়েন্ট ছাড়া
            হাড্ডির সাথে সংশ্লিষ্ট মাংসপেশী, টেন্ডন, লিগামেন্ট, রক্তনালী সহ
            অন্যান্য সফট টিস্যুর কিছুই দেখা যায় না। তাই বিভিন্ন অর্থোপেডিক
            সমস্যায় আমাদের হাড় এর আশে পাশের মাংশপেশি, রগ বা টেন্ডন-লিগামেন্ট,
            জয়েন্ট সহ অন্যান্য নরম অংশের (soft tissue) ছবি দেখার জন্য আলট্রাসোন
            হলো সবচেয়ে কার্যকরী ব্যবস্থা। আমাদের হাড় জয়েন্ট তথা কংকালতন্ত্রের
            (Musculoskeletal System) এই আল্ট্রাসনোগ্রাম এর নাম-ই হচ্ছে
            Muscukoskeletal Ultrasonography সংক্ষেপে MSK USG
          </p>
          <p>
            <strong>এমএসকে আলট্রাসাউন্ড এর সুবিধাঃ</strong>
            <br />
            ১. MSK-USG হল একটি Bed Side Investigation যা অতিসহজে ও দ্রুততম
            সময়ের মধ্যে চেম্বারে বসেই করা যায়।
            <br />
            ২. এটি Soft Tissue Problem এর জন্য অন্যান্য পরীক্ষা যেমন-এমআরআই(MRI)
            থেকে বেশ অর্থ-সাশ্রয়ী।
            <br />
            ৩. এটি সম্পুর্ণ ব্যাথামুক্ত ও পার্শ্বপ্রতিক্রিয়া বিহীন একটি
            ইনভেস্টিগেশন।
            <br />
            ৪. এই পরীক্ষাটি সার্জন বা চিকিৎসক সরাসরি নিজেই করে থাকেন বিধায় রোগ
            নির্ণয়ে ব্যাপক ভূমিকা রাখে।
            <br />
            ৫. রোগী নিজে তার সমস্যা সরাসরি (Real time imaging) মনিটরে দেখতে
            পায়।
            <br />
            ৬. রোগ নির্নয় কিংবা চিকিৎসার স্বার্থে আক্রান্ত স্থানে আল্ট্রাসাউন্ড
            এর Live ছবি দেখে সম্পূর্ণ সঠিক স্থানে ইঞ্জেকশন দেয়া যায়(Ultrasound
            guided injection)।
          </p>
          <p>
            <strong>যে সকল ক্ষেত্রে কার্যকর:</strong> SHOULDER (Rotator cuff
            tear/tendinitis, Bursitis, Biceps tendinitis), ELBOW (Tennis Elbow,
            Golfer’s Elbow), WRIST (CTS, Tenosynovitis, Ganglion Cyst), HIP
            (Effusion, Psoas abscess), KNEE (Osteoarthritis, Baker’s Cyst),
            ANKLE & FOOT (Achilles tendinitis, Plantar fasciitis)।
          </p>
        </div>
      ),
    },
    {
      title: "আল্ট্রাসাউন্ড দ্বারা ইনজেকশন (USGI)",
      icon: Microscope,
      content:
        "চোখ বাধা অবস্থায় যেমন একজন ভালো খেলোয়ারও ভাল খেলতে পারেন না, ঠিক তেমনি আন্দাজ কিংবা অনুমানের উপর ভর করে একজন চিকিৎসক শরীরের আক্রান্ত স্থানে যে ইঞ্জেকশন দেন তার সঠিকতাও (Accuracy) ভাল হবে না, এটাই স্বাভাবিক। গবেষণায় দেখা গেছে এমনকি এক্সপার্ট হাতেও ৩০% ক্ষেত্রেই ভুল জায়গায় ইনজেকশন দেয়া হয়। আর এই জন্যেই এখন, আধুনিক চিকিৎসা বিজ্ঞান চিকিৎসকদেরকে আলট্রাসাউন্ড এর সাহায্যে ইঞ্জেকশন দিতে উৎসাহ ও পরামর্শ প্রদান করেছেন।",
    },
    {
      title: "পিআরপি থেরাপি (PRP therapy)",
      icon: Droplets,
      content:
        "পি আর পি (PRP) থেরাপি হল প্লেটলেট-রিচ প্লাজমা (Platelet-Rich Plasma) থেরাপি, যা একটি আধুনিক চিকিৎসা পদ্ধতি। এতে রোগীর নিজের রক্ত থেকে প্লাজমা সংগ্রহ করে ইনজেকশন হিসেবে ব্যবহার করা হয়, যা শরীরের নিরাময় প্রক্রিয়া দ্রুততর করতে সাহায্য করে। অর্থোপেডিক সমস্যায়, হাঁটু, কাঁধ, কনুই, কোমর বা অন্যান্য জয়েন্টের ব্যথা ও আঘাতজনিত সমস্যায় এবং অ্যাথলেটদের পেশি ও লিগামেন্ট পুনর্গঠনে এটি ব্যবহৃত হয়।",
    },
    {
      title: "ওজোন থেরাপি (Ozone therapy)",
      icon: Wind,
      content:
        "ওজোন থেরাপি হল একটি চিকিৎসা পদ্ধতি যেখানে ওজোন (O₃) গ্যাস চিকিৎসার জন্য শরীরে প্রয়োগ করা হয়। এটি প্রাকৃতিক নিরাময় প্রক্রিয়াকে ত্বরান্বিত করতে এবং শরীরের অক্সিজেন সরবরাহ বাড়াতে ব্যবহৃত হয়। ব্যথা এবং প্রদাহ কমাতে (আর্থ্রাইটিস, জয়েন্ট পেইন, ফ্রোজেন শোল্ডার) এবং সংক্রমণ প্রতিরোধে এটি কার্যকর। এটি রক্তের মাধ্যমে (Autohemotherapy) অথবা সরাসরি ইনজেকশন হিসেবে প্রয়োগ করা হয়।",
    },
  ];

  return (
    <main className="min-h-screen bg-white pb-32 ">
      <div className="max-container">
     <Image src='/treatment-banner.jpg' width={1920} height={800} alt="treatment BAnner" className=" mt-10 mb-24 rounded-md"/>
        {/* Procedures */}
        <section className="mb-28">
          <h2 className="text-2xl font-semibold mb-6">চিকিৎসার প্রসিডিওর</h2>
          <div className="space-y-4">
            {procedures.map((p, i) => (
              <div key={i} className="border border-black/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 font-bold"
                >
                  <div className="flex items-center text-left gap-3">
                    <p.icon className="text-teal-600" /> {p.title}
                  </div>
                  <ChevronDown
                    className={`transition ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="p-4 bg-white text-gray-700 leading-relaxed">
                    {p.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Lists */}
        <h2 className="text-2xl font-semibold mb-9 border-b border-black/10 pb-6 ">চিকিৎসা সেবাসমূহ</h2>
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-4 text-red-700">
              <Stethoscope className="inline" /> ট্রমা সার্জারি চিকিৎসা
            </h2>
            <ul className=" space-y-1 bg-red-50 p-4 rounded">
              {[
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
                "TIbial Shaft fracture fixation",
                "Ankle fracture fixation",
              ].map((item) => (
                <li key={item}>👉 {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 text-teal-700">
              <HeartPulse className="inline" /> অর্থোপেডিক চিকিৎসা
            </h2>
            <ul className=" space-y-1 bg-teal-50 p-4 rounded">
              {[
                "ঘাড় ব্যথা (Neck pain)",
                "কোমর ব্যথা (Back pain)",
                "হাঁটু ব্যথা (Knee pain)",
                "পায়ের গোড়ালি ব্যথা( Ankle pain)",
                "হাড় ক্ষয় (Osteoporosis)",
                "বাত ব্যথা (Ankylosing Spondylitis & Reactive Arthritis)",
                "ফ্রোজেন শোল্ডার (Adhesive Capsulitis)",
                "টেনিস এলবো (Tennis Elbow)",
                "গলফার এলবো (Golfer’s Elbow)",
                "ডি কুয়েরভেন’স টেনোসাইনোভাইটিস",
                "কার্পাল টানেল সিনড্রোম (CTS)",
                "ডুপুইট্রেনস কন্ট্রাকচার",
                "ট্রিগার ফিঙ্গার / থাম্ভ",
                "এমসিপি আর্থাইটিস",
                "রিমাট্রয়েড আর্থাইটিস",
                "ডিআইপি অষ্টোয়ো-আর্থাইটিস",
                "হ্যান্ড ইনফেকশন",
                "টেন্ডন ইনজুরি",
                "লিগামেন্ট ইনজুরি",
                "নার্ভ ইনজুরি",
                "ভাস্কুলার ইনজুরি",
                "জয়েন্ট ইনজুরি",
                "জয়েন্ট আরথ্রোপ্লাস্টি",
              ].map((item) => (
                <li key={item}>👉 {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
