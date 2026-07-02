import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../shared/badge";

const treatments = [
  {
    label: "হাঁটু ব্যথা",
    desc: "হাঁটুর লিগামেন্ট, কার্টিলেজ ও বিভিন্ন জটিলতার আধুনিক চিকিৎসা",
    image: "/knee.jpg",
  },
  {
    label: "কোমর ও মেরুদণ্ড",
    desc: "ডিস্ক প্রোল্যাপ্স, সাইটিকা ও মেরুদণ্ডের তীব্র ব্যথা ব্যবস্থাপনা",
    image: "/low-back-pain.jpg",
  },
  {
    label: "কাঁধ ও জয়েন্টের সমস্যা",
    desc: "ফ্রোজেন শোল্ডার, কাঁধের জয়েন্ট ও পেশির দীর্ঘমেয়াদী সমস্যার সমাধান",
    image: "/shoulder.webp",
  },
  {
    label: "স্পোর্টস ইনজুরি",
    desc: "খেলোয়াড়দের পেশি ও লিগামেন্ট ইনজুরির বিশেষায়িত আধুনিক চিকিৎসা",
    image: "/sports.jpg",
  },
  {
    label: "মেরুদণ্ডের সমস্যা ও ট্রমা",
    desc: "দুর্ঘটনাজনিত হাড় ভাঙা, স্থানচ্যুতি ও জটিল ট্রমা সার্জারি পরবর্তী সেবা",
    image: "/spine.jpg",
  },
  {
    label: "হাতের কব্জি ও পায়ের পাতা",
    desc: "কব্জি, পায়ের গোড়ালি ও রগ বা পেশির নানান রোগের সমাধান",
    image: "/wrist.jpg",
  },
];

export default function TreatmentsPreview() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-container">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
          <div className="space-y-3 max-w-xl">
           
            <Badge text="বিশেষায়িত সেবা" />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight">
              আমাদের চিকিৎসা সেবাসমূহ
            </h2>
          </div>
        </div>

        {/* Clean Vertical Stack Grid (Image on Top, Text on Bottom) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {treatments.map((t, i) => (
            <div
              key={i}
              className="group flex flex-col items-start bg-white rounded-xl border border-slate-100 p-2 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-slate-200/80 transition-all duration-300 text-left"
            >
              {/* Top Image: Fixed Aspect Ratio for Uniformity */}
              <div className="w-full  rounded-lg overflow-hidden bg-slate-50 border border-slate-100 mb-3 relative">
                <Image
                  src={t.image}
                  alt={t.label}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center transition-transform duration-500 scale-101 group-hover:scale-115"
                  loading="lazy"
                />
              </div>

              {/* Bottom Text Content */}
              <div className="space-y-2 px-1.5 ">
                <h3 className="text-lg font-bold text-blue-dark">{t.label}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/treatments" className="primary-btn">
            <span>সকল চিকিৎসার বিবরণ দেখুন</span>
            <ArrowUpRight className="w-4 h-4 text-slate-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
