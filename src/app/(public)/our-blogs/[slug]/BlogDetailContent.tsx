import Image from "@/components/shared/SafeImage";
import { Calendar, Tag, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/cms/server";
import BackButton from "./BackButton";

export default function BlogDetailContent({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen pb-20 max-container">
      <div className=" border-b pb-4 border-slate-200   flex items-center justify-between mx-auto  pt-8 md:pt-12 mb-6">
        <BackButton />

        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 ">
          {post.date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{post.date}</span>
            </div>
          )}
          {post.readTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>
      </div>

      <article>
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-dark tracking-tight leading-tight md:leading-tight">
            {post.title}
          </h1>
        </div>

        {post.imageUrl && (
          <div className="w-full h-[280px] sm:h-[400px] md:h-[480px] relative rounded-md overflow-hidden shadow-md mb-10 group">
            {post.category && (
              <span className="inline-flex items-center gap-1.5 bg-blue-light text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full  absolute z-10 top-2 right-2">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
            )}
            <Image
              fill
              src={post.imageUrl}
              alt={post.imageAlt || post.title}
              priority
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        <div
          className="blog-rich-text text-slate-700 text-base md:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
