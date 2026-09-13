import Link from "next/link";
import { SectionHeader, SectionShell } from "./SectionShell";

interface Item {
  title?: string;
  desc?: string;
  href?: string;
  linkLabel?: string;
  highlight?: boolean;
}

interface Data {
  badge?: string;
  heading?: string;
  subtitle?: string;
  columns?: string;
  items?: Item[];
  ctaHeading?: string;
  ctaText?: string;
  ctaLabel?: string;
  ctaHref?: string;
  background?: string;
}

const COLS: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
};

export default function ServicesGridBlock({ data }: { data: Data }) {
  const items = Array.isArray(data.items) ? data.items : [];
  const cols = COLS[data.columns ?? "3"] ?? COLS["3"];
  const hasCta = Boolean(data.ctaHeading || data.ctaText || data.ctaLabel);

  return (
    <SectionShell background={data.background}>
      <SectionHeader
        badge={data.badge}
        heading={data.heading}
        subtitle={data.subtitle}
      />

      {items.length > 0 && (
        <div className="rounded-2xl overflow-hidden border border-slate-200">
          <div className={`grid grid-cols-1 ${cols} gap-px bg-slate-200`}>
            {items.map((item, i) => (
              <div
                key={i}
                className={`group px-6 py-7 flex flex-col transition-colors duration-300 ${item.highlight ? "bg-blue-dark" : "bg-white hover:bg-slate-50/70"}`}
              >
                {item.title && (
                  <h3
                    className={`text-[17px] font-bold mb-2 ${item.highlight ? "text-white" : "text-blue-dark"}`}
                  >
                    {item.title}
                  </h3>
                )}
                {item.desc && (
                  <p
                    className={`text-sm leading-relaxed mb-4 ${item.highlight ? "text-white/70" : "text-slate-500"}`}
                  >
                    {item.desc}
                  </p>
                )}
                {item.href && (
                  <Link
                    href={item.href}
                    className={`mt-auto inline-flex items-center gap-1.5 self-start text-[13.5px] font-bold group-hover:gap-2.5 transition-all ${item.highlight ? "text-white" : "text-blue-light"}`}
                  >
                    {item.linkLabel || "বিস্তারিত"}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {hasCta && (
            <div className="bg-blue-dark px-6 py-7 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                {data.ctaHeading && (
                  <h3 className="text-[17px] font-bold text-white mb-1.5">
                    {data.ctaHeading}
                  </h3>
                )}
                {data.ctaText && (
                  <p className="text-sm text-white/70 leading-relaxed">
                    {data.ctaText}
                  </p>
                )}
              </div>
              {data.ctaLabel && data.ctaHref && (
                <Link
                  href={data.ctaHref}
                  className="inline-flex items-center gap-2 shrink-0 self-start sm:self-auto bg-white hover:bg-slate-100 text-blue-dark px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
                >
                  {data.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </SectionShell>
  );
}
