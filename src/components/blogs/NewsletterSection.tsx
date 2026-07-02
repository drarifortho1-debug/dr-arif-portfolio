import { ArrowUpRight } from "lucide-react";
import Link from "next/link";




export default function NewsletterSection() {
  return (
    <div className="max-container">
      <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          আরও তথ্য পেতে আমাদের ইউটিউব চ্যানেলটি দেখুন
        </h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          স্বাস্থ্য বিষয়ক নিয়মিত আপডেট এবং নতুন নতুন ভিডিওর জন্য আমাদের চ্যানেলে
          সাবস্ক্রাইব করুন।
        </p>
        <Link
          href="https://www.youtube.com/@Dr.GaziArifVelia1"
          target="_blank"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105"
        >
          ইউটিউবে দেখুন <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
