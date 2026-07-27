import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "শর্তাবলী",
  alternates: {
    canonical: "https://www.drarifortho.com/terms-and-conditions",
  },
  description:
    "ডা. গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া -এর অফিসিয়াল ওয়েবসাইটের শর্তাবলী।",
};

import { Badge } from "@/components/shared/badge";
import {
  Cookie,
  Database,
  EyeOff,
  FileText,
  Lock,
  RefreshCcw,
  Share2,
} from "lucide-react";

export default function PrivacyPolicy() {
  const privacyPolicies = [
    {
      title: "আমরা কী ধরনের তথ্য সংগ্রহ করি",
      icon: Database,
      content:
        "আমাদের ওয়েবসাইট ভিজিট করা বা অ্যাপয়েন্টমেন্ট নেওয়ার সময় আমরা আপনার কিছু প্রাথমিক তথ্য সংগ্রহ করতে পারি। এর মধ্যে রয়েছে:",
      list: [
        "আপনার নাম ও যোগাযোগের নম্বর",
        "ইমেইল ঠিকানা (যদি প্রদান করা হয়)",
        "বয়স এবং সাধারণ স্বাস্থ্যগত সমস্যার সংক্ষিপ্ত বিবরণ (অ্যাপয়েন্টমেন্টের সুবিধার্থে)",
        "ওয়েবসাইট ব্যবহারের সাধারণ অ্যানালিটিক্স ডেটা",
      ],
    },
    {
      title: "তথ্য ব্যবহারের উদ্দেশ্য",
      icon: FileText,
      content:
        "আপনার প্রদান করা তথ্যগুলো আমরা মূলত নিম্নলিখিত কাজগুলোতে ব্যবহার করে থাকি:",
      list: [
        "আপনার সিরিয়াল বা অ্যাপয়েন্টমেন্ট নিশ্চিত করা",
        "প্রয়োজনে আপনার সাথে যোগাযোগ করা",
        "আমাদের সেবার মান এবং ওয়েবসাইটের ইউজার এক্সপেরিয়েন্স উন্নত করা",
      ],
    },
    {
      title: "তথ্যের গোপনীয়তা ও শেয়ারিং",
      icon: EyeOff,
      content:
        "আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করা আমাদের অন্যতম প্রধান অগ্রাধিকার। আমরা কোনো অবস্থাতেই আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি, ভাড়া বা বাণিজ্যিকভাবে শেয়ার করি না। শুধুমাত্র আপনার চিকিৎসা সংক্রান্ত প্রয়োজনে সংশ্লিষ্ট হাসপাতাল বা ক্লিনিকের স্টাফদের সাথে প্রয়োজনীয় তথ্য শেয়ার করা হতে পারে।",
    },
    {
      title: "তথ্যের নিরাপত্তা",
      icon: Lock,
      content:
        "আপনার তথ্যের সুরক্ষা নিশ্চিত করতে আমরা যথাযথ প্রযুক্তিগত এবং প্রশাসনিক ব্যবস্থা গ্রহণ করে থাকি। তবে ইন্টারনেট বা ইলেকট্রনিক স্টোরেজের মাধ্যমে তথ্য আদান-প্রদান ১০০% নিরাপদ নয়, তাই আমরা সর্বোচ্চ নিরাপত্তার চেষ্টা করলেও সম্পূর্ণ নিশ্চয়তা দেওয়া সম্ভব নয়।",
    },
    {
      title: "কুকিজ (Cookies) ব্যবহার",
      icon: Cookie,
      content:
        "ওয়েবসাইটের কার্যকারিতা বাড়াতে এবং ব্যবহারকারীদের অভিজ্ঞতা উন্নত করতে আমরা কুকিজ ব্যবহার করতে পারি। আপনি চাইলে আপনার ব্রাউজারের সেটিংস থেকে কুকিজ বন্ধ করে রাখতে পারেন, তবে এতে ওয়েবসাইটের কিছু ফিচার কাজ না-ও করতে পারে।",
    },
    {
      title: "তৃতীয় পক্ষের লিংক",
      icon: Share2,
      content:
        "আমাদের ওয়েবসাইটে বিভিন্ন হাসপাতাল, ডায়াগনস্টিক সেন্টার বা অন্য কোনো প্রয়োজনীয় ওয়েবসাইটের লিংক থাকতে পারে। এসব ওয়েবসাইটের নিজস্ব গোপনীয়তা নীতি রয়েছে, যার জন্য আমরা দায়ী নই। কোনো লিংক ভিজিট করার আগে তাদের নীতিমালা পড়ে নেওয়ার অনুরোধ করা হলো।",
    },
    {
      title: "নীতিমালার পরিবর্তন",
      icon: RefreshCcw,
      content:
        "প্রয়োজন অনুযায়ী যেকোনো সময় এই গোপনীয়তা নীতি পরিবর্তন বা হালনাগাদ করার অধিকার আমরা সংরক্ষণ করি। কোনো পরিবর্তন করা হলে তা এই পৃষ্ঠায় আপডেট করা হবে এবং প্রকাশের পর থেকেই তা কার্যকর বলে গণ্য হবে।",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pt-10 pb-20">
      {/* Header Section */}
      <section className="py-12 px-4 text-center">
        <div className="max-container">
          <div className="mb-4">
            <Badge text="প্রাইভেসি পলিসি" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-dark">
            গোপনীয়তা নীতি (Privacy Policy)
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            ডা. গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া)-এর ওয়েবসাইটে আপনার
            ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষায় আমরা প্রতিশ্রুতিবদ্ধ। এই
            নীতিমালায় আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি
            তা বর্ণনা করা হয়েছে।
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full space-y-6">
        {privacyPolicies.map((policy, i) => (
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

            {/* Render List if available */}
            {policy.list && (
              <ul className="mt-4 space-y-2">
                {policy.list.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-light shrink-0" />
                    <span className="text-slate-600 text-sm md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
              এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন বা মতামত থাকলে
              যোগাযোগ করতে পারেন:
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
