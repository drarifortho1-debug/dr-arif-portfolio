import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";

const blogs = [
  { title: "হাঁটু ব্যথার কারণ ও আধুনিক চিকিৎসা ব্যবস্থা", excerpt: "হাঁটু ব্যথার বিভিন্ন কারণ ও তার আধুনিক চিকিৎসা পদ্ধতি সম্পর্কে বিস্তারিত আলোচনা...", date: "১৫ জুন, ২০২৬" },
  { title: "কোমর ব্যথার ঘরোয়া প্রতিকার এবং কখন ডাক্তার দেখাবেন", excerpt: "কোমর ব্যথা থেকে মুক্তির উপায় এবং কখন বিশেষজ্ঞের পরামর্শ নেয়া জরুরি...", date: "৮ জুন, ২০২৬" },
  { title: "হাড় ক্ষয় রোধে করণীয় ও সঠিক খাদ্য তালিকা", excerpt: "অস্টিওপোরোসিস প্রতিরোধে খাদ্যাভ্যাস ও জীবনযাত্রায় প্রয়োজনীয় পরিবর্তন...", date: "১ জুন, ২০২৬" },
];

export default function BlogsPreview() {
  return (
    <section className="section-padding bg-surface-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-primary/10 mb-5">স্বাস্থ্য টিপস</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">সর্বশেষ চিকিৎসা বিষয়ক পরামর্শ</h2>
        </div>
        <div className="space-y-6">
          {blogs.map((b, i) => (
            <div key={i} className="group bg-surface rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                <div className={`md:w-56 lg:w-72 h-48 md:h-auto shrink-0 relative overflow-hidden ${i === 0 ? "bg-gradient-to-br from-primary/5 to-accent/5" : i === 1 ? "bg-gradient-to-br from-accent/5 to-primary/5" : "bg-gradient-to-br from-primary/5 to-primary/10"}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-primary/20" />
                  </div>
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{b.date}</span>
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">{b.title}</h3>
                  <p className="text-sm text-muted mt-2 line-clamp-2">{b.excerpt}</p>
                  <div className="mt-4">
                    <Link href="/blogs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                      বিস্তারিত পড়ুন
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
