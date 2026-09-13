import Link from "next/link";
import { FileText, Clock, ArrowRight } from "lucide-react";
import Image from "@/components/shared/SafeImage";
import type { BlogPost } from "@/lib/cms/server";
import { blogHref } from "@/lib/blog";

const stripHtml = (html: string) => {
  return html ? html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
};

export default function BlogList({ blogs = [] }: { blogs?: BlogPost[] }) {
  if (blogs.length === 0) {
    return (
      <section className="section-padding">
        <div className="w-full text-center">
          <p className="text-base text-slate-500 py-10 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
            কোনো ব্লগ পাওয়া যায়নি।
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-32">
      <div className="max-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((b) => {
            const previewText = stripHtml(b.content);
            return (
              <Link key={b.id} href={blogHref(b)} className="block group">
                <article className="bg-white h-full rounded-lg border border-slate-100 overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col">
                  <div className="h-56 bg-slate-50 relative overflow-hidden shrink-0">
                    {b.imageUrl ? (
                      <Image
                        src={b.imageUrl}
                        alt={b.imageAlt || b.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-slate-300" />
                      </div>
                    )}
                    {b.category && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-light text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-blue-light/10 z-10">
                        {b.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                        <span className="font-semibold">{b.date}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {b.readTime}
                        </span>
                      </div>
                      <h2 className="font-bold text-slate-900 text-lg mb-3 leading-snug group-hover:text-blue-light transition-colors line-clamp-2">
                        {b.title}
                      </h2>
                      <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                        {previewText || "বিস্তারিত জানতে পুরো ব্লগটি পড়ুন..."}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-blue-light text-sm font-bold group-hover:gap-3 transition-all mt-auto self-start">
                      বিস্তারিত পড়ুন
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
