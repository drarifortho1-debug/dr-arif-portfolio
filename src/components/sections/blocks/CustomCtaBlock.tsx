import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/shared/badge";
import { sectionBg } from "./SectionShell";

interface Data {
  badge?: string;
  heading?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  background?: string;
}

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  return external ? (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function CustomCtaBlock({ data }: { data: Data }) {
  const dark = data.background === "dark";

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 w-full ${sectionBg(data.background)}`}>
      {!dark && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e0a_1px,transparent_1px),linear-gradient(to_bottom,#0f766e0a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none" />
      )}
      <div className="max-container relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20">
          <div className="space-y-4 max-w-2xl text-left">
            {data.badge && <Badge text={data.badge} />}
            {data.heading && (
              <h2
                className={`text-3xl md:text-4xl font-bold tracking-tight leading-tight ${dark ? "text-white" : "text-blue-dark"}`}
              >
                {data.heading}
              </h2>
            )}
            {data.body && (
              <p
                className={`font-medium text-sm md:text-base leading-relaxed ${dark ? "text-white/70" : "text-slate-500"}`}
              >
                {data.body}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
            {data.primaryLabel && data.primaryHref && (
              <SmartLink
                href={data.primaryHref}
                className="inline-flex items-center justify-center gap-2.5 bg-blue-light hover:bg-blue-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md active:scale-95"
              >
                {data.primaryLabel}
                <ArrowUpRight className="w-4 h-4" />
              </SmartLink>
            )}
            {data.secondaryLabel && data.secondaryHref && (
              <SmartLink
                href={data.secondaryHref}
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border active:scale-95 ${dark ? "bg-white/10 border-white/20 text-white hover:bg-white/20" : "bg-white border-slate-200 text-blue-dark hover:bg-slate-50"}`}
              >
                {data.secondaryLabel}
              </SmartLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
