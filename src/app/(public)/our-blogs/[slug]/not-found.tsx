import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center bg-surface p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md">
        <h1 className="text-xl font-bold text-blue-dark mb-2">ব্লগটি পাওয়া যায়নি</h1>
        <p className="text-sm text-muted mb-6">
          হয়তো পোস্টটি মুছে ফেলা হয়েছে অথবা লিংকটি ভুল।
        </p>
        <Link
          href="/our-blogs"
          className="inline-flex items-center gap-2 text-sm font-semibold bg-blue-light/10 text-blue-light px-4 py-2 rounded-xl hover:bg-blue-light/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> ব্লগে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
