"use client";

import { Card, PageHeader } from "@/components/admin/ui";
import { PAGE_META } from "@/lib/cms/defaults";
import { db } from "@/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import {
  ArrowRight,
  Images,
  LayoutPanelTop,
  Newspaper,
  PanelBottom,
  PanelTop,
  Stethoscope,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const QUICK = [
  { label: "পেজসমূহ", desc: "সেকশন লুকান, সাজান, যুক্ত করুন", href: "/admin-panel/pages", icon: LayoutPanelTop },
  { label: "চিকিৎসা পেজ", desc: "হাঁটু, কোমর, কাঁধ... প্রতিটি চিকিৎসার পেজ", href: "/admin-panel/treatments", icon: Stethoscope },
  { label: "পোস্ট (ব্লগ)", desc: "নতুন ব্লগ লিখুন বা সম্পাদনা করুন", href: "/admin-panel/posts", icon: Newspaper },
  { label: "হেডার", desc: "লোগো, মেনু, কল বাটন", href: "/admin-panel/header", icon: PanelTop },
  { label: "ফুটার", desc: "লিংক, চেম্বার, কপিরাইট", href: "/admin-panel/footer", icon: PanelBottom },
  { label: "গ্যালারি", desc: "আমার সম্পর্কে পেজের ছবি", href: "/admin-panel/gallery", icon: Images },
  { label: "ভিডিও", desc: "ইউটিউব ভিডিও লিংক", href: "/admin-panel/videos", icon: Video },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState<{ blogs?: number; videos?: number; gallery?: number; media?: number }>({});

  useEffect(() => {
    const run = async () => {
      const names = ["blogs", "videos", "gallery", "media"] as const;
      const out: Record<string, number> = {};
      await Promise.all(
        names.map(async (n) => {
          try {
            const snap = await getCountFromServer(collection(db, n));
            out[n] = snap.data().count;
          } catch {
            out[n] = 0;
          }
        }),
      );
      setCounts(out);
    };
    run();
  }, []);

  return (
    <div>
      <PageHeader title="ড্যাশবোর্ড" description="সাইটের সবকিছু এখান থেকে নিয়ন্ত্রণ করুন" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "পেজ", value: PAGE_META.length },
          { label: "ব্লগ পোস্ট", value: counts.blogs },
          { label: "ভিডিও", value: counts.videos },
          { label: "গ্যালারি ছবি", value: counts.gallery },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <p className="text-3xl font-black text-slate-900">{s.value ?? "—"}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <Card title="দ্রুত অ্যাক্সেস">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group flex items-start gap-3 rounded-xl border border-slate-200 p-4 hover:border-blue-light hover:shadow-md transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-light flex items-center justify-center shrink-0 group-hover:bg-blue-light group-hover:text-white transition-colors">
                <q.icon className="w-5 h-5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-bold text-slate-900">{q.label}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{q.desc}</span>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-light mt-1 transition-colors" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
