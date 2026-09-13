import { ArrowUpRight } from "lucide-react";
import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { Badge } from "@/components/shared/badge";
import { SectionShell } from "./SectionShell";

interface Data {
  badge?: string;
  heading?: string;
  html?: string;
  image?: string;
  imagePosition?: string;
  buttonLabel?: string;
  buttonHref?: string;
  background?: string;
}

export default function ImageTextBlock({ data }: { data: Data }) {
  const imageLeft = data.imagePosition === "left";
  const isExternal = data.buttonHref?.startsWith("http") || data.buttonHref?.startsWith("tel:");

  return (
    <SectionShell background={data.background}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className={`space-y-5 text-left ${imageLeft ? "lg:order-2" : ""}`}>
          {data.badge && <Badge text={data.badge} />}
          {data.heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight">
              {data.heading}
            </h2>
          )}
          <div
            className="blog-rich-text text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.html ?? "" }}
          />
          {data.buttonLabel && data.buttonHref && (
            <div className="pt-2">
              {isExternal ? (
                <a href={data.buttonHref} className="primary-btn">
                  <span>{data.buttonLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <Link href={data.buttonHref} className="primary-btn">
                  <span>{data.buttonLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </div>
        {data.image && (
          <div className={`relative ${imageLeft ? "lg:order-1" : ""}`}>
            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 shadow-xl shadow-slate-950/5">
              <Image
                src={data.image}
                alt={data.heading ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
