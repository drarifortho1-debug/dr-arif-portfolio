import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const steps = [
  { year: "এমবিবিএস", title: "চিকিৎসা বিজ্ঞানে স্নাতক", desc: "মেডিকেল কলেজ থেকে এমবিবিএস ডিগ্রি অর্জন", color: "bg-primary/10 text-primary border-primary/20" },
  { year: "বিসিএস", title: "৩৫ তম বিসিএস (স্বাস্থ্য ক্যাডার)", desc: "বাংলাদেশ সিভিল সার্ভিসে যোগদান", color: "bg-accent/10 text-accent border-accent/20" },
  { year: "এমএস", title: "অর্থোপেডিক্স ও ট্রমা সার্জারি", desc: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় থেকে সর্বোচ্চ ডিগ্রি", color: "bg-primary/10 text-primary border-primary/20" },
];

export default function AboutIntro() {
  return (
    <section className="bg-surface-muted section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-primary/10 mb-5">
              পেশাগত যাত্রা
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
              একজন নিবেদিত প্রাণ<br />অর্থোপেডিক্স বিশেষজ্ঞ
            </h2>
            <p className="text-muted leading-relaxed text-base mb-6">
              ডা. গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া একজন নিবেদিতপ্রাণ অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন।
              তিনি ২০২৪ সালে বাংলাদেশের স্বনামধন্য বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় থেকে
              অর্থোপেডিক ও ট্রমা সার্জারির উপর দেশের সর্বোচ্চ সম্মান সূচক মাস্টার ডিগ্রী অর্জন করেন।
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-foreground hover:bg-black text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              আরও পড়ুন
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-3 relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
            <div className="space-y-8 md:space-y-12">
              {steps.map((s, i) => (
                <div key={i} className="relative flex gap-6 md:gap-8 items-start group">
                  <div className="relative z-10 shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-surface border-2 border-slate-200 flex items-center justify-center text-xs md:text-sm font-black text-foreground shadow-sm transition-all group-hover:border-accent/30 group-hover:shadow-warm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-1">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${s.color} mb-2`}>
                      {s.year}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
