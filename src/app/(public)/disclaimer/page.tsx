import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "দায়মুক্তি",
  alternates: {
    canonical: "https://www.drarifortho.com/disclaimer",
  },
  description:
    "ডা. গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া -এর অফিসিয়াল ওয়েবসাইটের দায়মুক্তি নীতি।",
};

import { Badge } from "@/components/shared/badge";
import {
  AlertCircle,
  FileText,
  Link,
  ShieldAlert,
  Stethoscope,
  UserX,
} from "lucide-react";

export default function Disclaimer() {
  const disclaimers = [
    {
      title: "শিক্ষামূলক উদ্দেশ্য",
      icon: FileText,
      content:
        "ডা. গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া -এর এই ওয়েবসাইটে প্রকাশিত তথ্য শুধুমাত্র সাধারণ স্বাস্থ্যসচেতনতা ও শিক্ষামূলক উদ্দেশ্যে প্রদান করা হয়েছে। এখানে থাকা কোনো তথ্যকে ব্যক্তিগত চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প হিসেবে বিবেচনা করা উচিত নয়।",
    },
    {
      title: "পরামর্শ ও রোগ নির্ণয়",
      icon: Stethoscope,
      content:
        "প্রতিটি রোগীর শারীরিক অবস্থা ও চিকিৎসাগত প্রয়োজন ভিন্ন। তাই কোনো স্বাস্থ্য সমস্যা, ব্যথা, আঘাত বা রোগের ক্ষেত্রে অবশ্যই সরাসরি একজন যোগ্য চিকিৎসকের পরামর্শ গ্রহণ করুন।",
    },
    {
      title: "চিকিৎসক-রোগী সম্পর্ক",
      icon: UserX,
      content:
        "এই ওয়েবসাইট ব্যবহার, স্বাস্থ্যবিষয়ক নিবন্ধ পড়া বা যোগাযোগ ফর্ম পূরণের মাধ্যমে কোনো চিকিৎসক-রোগী (Doctor-Patient) সম্পর্ক প্রতিষ্ঠিত হয় না। চিকিৎসক-রোগী সম্পর্ক কেবল সরাসরি পরামর্শ ও চিকিৎসা গ্রহণের মাধ্যমে প্রতিষ্ঠিত হয়।",
    },
    {
      title: "জরুরি চিকিৎসা সেবা",
      icon: ShieldAlert,
      content:
        "এই ওয়েবসাইট জরুরি চিকিৎসা সেবার জন্য নয়। দুর্ঘটনা, গুরুতর আঘাত, ফ্র্যাকচার বা অন্য কোনো জরুরি স্বাস্থ্য সমস্যার ক্ষেত্রে দ্রুত নিকটস্থ হাসপাতাল বা জরুরি চিকিৎসা কেন্দ্রে যোগাযোগ করুন।",
    },
    {
      title: "তথ্যের নির্ভুলতা ও ফলাফল",
      icon: AlertCircle,
      content:
        "ওয়েবসাইটে থাকা তথ্য নিয়মিত হালনাগাদ করার চেষ্টা করা হলেও এর সম্পূর্ণ নির্ভুলতা বা নির্দিষ্ট কোনো ফলাফল নিশ্চিত করা হয় না। চিকিৎসার ফলাফল ব্যক্তি ভেদে ভিন্ন হতে পারে।",
    },
    {
      title: "তৃতীয় পক্ষের লিংক",
      icon: Link,
      content:
        "এই ওয়েবসাইটে থাকা কোনো বাহ্যিক লিংকের তথ্য বা কার্যক্রমের জন্য আমরা দায়ী নই।",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pt-10 pb-20">
      {/* Header Section */}
      <section className="py-12 px-4 text-center">
        <div className="max-container">
          <div className="mb-4">
            <Badge text="আইনি তথ্য" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-dark">
            দায়স্বীকার (Disclaimer)
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            ওয়েবসাইট ব্যবহার করার পূর্বে নিচের গুরুত্বপূর্ণ দায়স্বীকার ও
            শর্তাবলি ভালোভাবে পড়ে নেওয়ার অনুরোধ করা হলো।
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-6">
        {disclaimers.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-light/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-light shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-blue-dark">{item.title}</h2>
            </div>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
              {item.content}
            </p>
          </div>
        ))}

        {/* Contact Information Box (Light Theme) */}
        <div className="mt-12 bg-white border border-blue-100 p-6 md:p-10 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-blue-dark">
              <FileText className="w-6 h-6 text-blue-light" />
              যোগাযোগ
            </h2>
            <p className="text-slate-600 mb-6 text-sm md:text-base">
              ওয়েবসাইট বা এর বিষয়বস্তু সম্পর্কে কোনো প্রশ্ন থাকলে প্রদত্ত
              যোগাযোগের মাধ্যমে আমাদের সাথে যোগাযোগ করতে পারেন:
            </p>

            <div className="grid  gap-8">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">
                  ডা. গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া)
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  অর্থোপেডিক্স, ট্রমা, স্পোর্টস ও হ্যান্ড সার্জন
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="bg-blue-50 text-blue-light text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-blue-100">
                      ফোন
                    </span>
                    +880 1612-371696, +880 1858-405083
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 text-blue-dark border-b border-slate-100 pb-2">
                  অ্যাপয়েন্টমেন্ট ও যোগাযোগ
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  যেকোনো প্রয়োজনে বা সিরিয়ালের জন্য সরাসরি উপরের নাম্বারে
                  যোগাযোগ করতে পারেন। জরুরি ট্রমা বা দুর্ঘটনার ক্ষেত্রে দ্রুত
                  নিকটস্থ হাসপাতালে যোগাযোগ করুন।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
