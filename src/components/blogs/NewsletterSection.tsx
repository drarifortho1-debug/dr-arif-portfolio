"use client";

import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-surface-muted rounded-3xl md:rounded-4xl p-8 md:p-12 border border-slate-200/60">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">স্বাস্থ্য টিপস পেতে সাবস্ক্রাইব করুন</h2>
          <p className="text-muted text-base mb-6 max-w-md mx-auto">
            প্রতিনিয়ত স্বাস্থ্য সচেতনতা মূলক তথ্য ও চিকিৎসা বিষয়ক পরামর্শ পেতে আমাদের নিউজলেটারে যোগ দিন
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface"
            />
            <button
              type="submit"
              className="bg-foreground hover:bg-black text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-md cursor-pointer"
            >
              সাবস্ক্রাইব
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
