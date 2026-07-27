"use client";

import { Badge } from "@/components/shared/badge";
import {
  AlertTriangle,
  CalendarCheck,
  FileText,
  Globe,
  Info,
  Link,
  RefreshCcw,
  Shield,
  UserCheck,
} from "lucide-react";

export default function TermsAndConditions() {
  const policies = [
    {
      title: "ওয়েবসাইটের তথ্য",
      icon: Info,
      content:
        "এই ওয়েবসাইটে প্রকাশিত তথ্য শুধুমাত্র সাধারণ স্বাস্থ্যসচেতনতা, শিক্ষা এবং তথ্য প্রদানের উদ্দেশ্যে প্রকাশ করা হয়েছে। ওয়েবসাইটের কোনো তথ্য ব্যক্তিগত চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প নয়।",
    },
    {
      title: "ওয়েবসাইট ব্যবহার",
      icon: Globe,
      content:
        "আপনি এই ওয়েবসাইট শুধুমাত্র বৈধ ও ব্যক্তিগত উদ্দেশ্যে ব্যবহার করতে পারবেন। ওয়েবসাইটের নিরাপত্তা, কার্যকারিতা বা অন্য ব্যবহারকারীদের অভিজ্ঞতা ক্ষতিগ্রস্ত করতে পারে এমন কোনো কার্যকলাপ করা যাবে গঠন। নিষিদ্ধ কার্যক্রমের মধ্যে রয়েছে:",
      list: [
        "ভুয়া বা বিভ্রান্তিকর তথ্য প্রদান",
        "অননুমোদিত প্রবেশের চেষ্টা",
        "ক্ষতিকর সফটওয়্যার, ভাইরাস বা স্প্যাম ছড়ানো",
        "ওয়েবসাইটের কার্যক্রমে বিঘ্ন সৃষ্টি করা",
        "অন্যের ব্যক্তিগত তথ্য অনুমতি ছাড়া প্রকাশ করা",
      ],
    },
    {
      title: "অ্যাপয়েন্টমেন্ট ও যোগাযোগ",
      icon: CalendarCheck,
      content:
        "ওয়েবসাইটে প্রদত্ত যোগাযোগের তথ্য বা অ্যাপয়েন্টমেন্ট সুবিধা শুধুমাত্র রোগীদের সুবিধার জন্য প্রদান করা হয়েছে। অ্যাপয়েন্টমেন্টের অনুরোধ পাঠানো মানেই সিরিয়াল নিশ্চিত হওয়া নয়। প্রয়োজন অনুযায়ী সময়সূচি বা চেম্বারের তথ্য পরিবর্তিত হতে পারে।",
    },
    {
      title: "ব্যবহারকারীর জমাকৃত তথ্য",
      icon: UserCheck,
      content:
        "আপনি যদি যোগাযোগ ফর্ম, মন্তব্য বা অন্য কোনো মাধ্যমে তথ্য প্রদান করেন, তবে সেই তথ্য সঠিক, বৈধ এবং আপনার নিজের হওয়ার বিষয়টি নিশ্চিত করার দায়িত্ব আপনার। অশালীন, মিথ্যা, বিভ্রান্তিকর, আপত্তিকর বা আইনবিরোধী কোনো তথ্য প্রকাশ বা প্রেরণ করা যাবে না।",
    },
    {
      title: "বুদ্ধিবৃত্তিক সম্পত্তি",
      icon: Shield,
      content:
        "এই ওয়েবসাইটের সকল লেখা, ছবি, গ্রাফিক্স, লোগো, ভিডিও এবং অন্যান্য কনটেন্ট ডা. গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া)-এর ওয়েবসাইটের সম্পত্তি অথবা বৈধভাবে ব্যবহৃত উপাদান। পূর্বানুমতি ছাড়া কোনো কনটেন্ট কপি, পুনঃপ্রকাশ, বিতরণ বা বাণিজ্যিকভাবে ব্যবহার করা যাবে না।",
    },
    {
      title: "তৃতীয় পক্ষের লিংক",
      icon: Link,
      content:
        "ওয়েবসাইটে অন্যান্য ওয়েবসাইট বা সামাজিক যোগাযোগমাধ্যমের লিংক থাকতে পারে। এসব বাহ্যিক ওয়েবসাইটের তথ্য, সেবা বা গোপনীয়তা নীতির জন্য আমরা দায়ী নই।",
    },
    {
      title: "দায়সীমা",
      icon: AlertTriangle,
      content:
        "ওয়েবসাইটে সঠিক ও হালনাগাদ তথ্য প্রদানের সর্বোচ্চ চেষ্টা করা হয়। তবে তথ্যের সম্পূর্ণ নির্ভুলতা, প্রাপ্যতা বা নির্দিষ্ট ফলাফল সম্পর্কে কোনো নিশ্চয়তা প্রদান করা হয় না। ওয়েবসাইটে থাকা তথ্যের ওপর নির্ভর করে নেওয়া কোনো সিদ্ধান্ত বা এর ব্যবহারজনিত প্রত্যক্ষ বা পরোক্ষ ক্ষতির জন্য ডা. গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) বা ওয়েবসাইট কর্তৃপক্ষ দায়ী থাকবেন না।",
    },
    {
      title: "শর্তাবলীর পরিবর্তন",
      icon: RefreshCcw,
      content:
        "প্রয়োজন অনুযায়ী এই শর্তাবলী যেকোনো সময় পরিবর্তন, সংশোধন বা হালনাগাদ করা হতে পারে। পরিবর্তিত সংস্করণ এই পৃষ্ঠায় প্রকাশের পর থেকেই কার্যকর বলে গণ্য হবে।",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pt-10 pb-20">
      {/* Header Section */}
      <section className="py-12 px-4 text-center">
        <div className="max-container">
          <div className="mb-4">
            <Badge text="লিগ্যাল ইনফরমেশন" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-dark">
            শর্তাবলী (Terms & Conditions)
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            ডা. গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া -এর অফিসিয়াল ওয়েবসাইটে
            আপনাকে স্বাগতম। এই ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি নিচে বর্ণিত
            শর্তাবলীর সাথে সম্মত হচ্ছেন। যদি আপনি এই শর্তাবলীর কোনো অংশের সাথে
            একমত না হন, তাহলে অনুগ্রহ করে ওয়েবসাইটটি ব্যবহার করা থেকে বিরত
            থাকুন।
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-6">
        {policies.map((policy, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-light/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-light shrink-0">
                <policy.icon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-blue-dark">
                {policy.title}
              </h2>
            </div>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
              {policy.content}
            </p>

            {/* Render List if available (e.g. for Prohibited Actions) */}
            {policy.list && (
              <ul className="mt-4 space-y-2">
                {policy.list.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                    <span className="text-slate-600 text-sm md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Contact Information Box (Updated to Light Theme) */}
        <div className="mt-12 bg-white border border-blue-100 p-6 md:p-10 rounded-2xl shadow-sm relative overflow-hidden">
          {/* Background Icon */}

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-blue-dark">
              <FileText className="w-6 h-6 text-blue-light" />
              যোগাযোগ
            </h2>
            <p className="text-slate-600 mb-6 text-sm md:text-base">
              এই শর্তাবলী সম্পর্কে কোনো প্রশ্ন থাকলে যোগাযোগ করতে পারেন:
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
                  চেম্বারসমূহ
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-light shrink-0" />
                    কুমিল্লা ট্রমা সেন্টার, কুমিল্লা
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-light shrink-0" />
                    পপুলার ডায়াগনস্টিক সেন্টার, কুমিল্লা
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-light shrink-0" />
                    ডক্টর’স পয়েন্ট ডায়াগনস্টিক সেন্টার, বুড়িচং, কুমিল্লা
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
