import { SectionHeader, SectionShell } from "./SectionShell";

interface Review {
  quote?: string;
  author?: string;
}

interface Stat {
  value?: string;
  label?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  subtitle?: string;
  items?: Review[];
  columns?: string;
  fbHeading?: string;
  fbText?: string;
  fbStats?: Stat[];
  fbLabel?: string;
  fbHref?: string;
  background?: string;
}

const COLS: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
};

export default function ReviewsPanelBlock({ data }: { data: Data }) {
  const items = Array.isArray(data.items) ? data.items : [];
  const stats = Array.isArray(data.fbStats) ? data.fbStats.filter((s) => s.value || s.label) : [];
  const cols = COLS[data.columns ?? "3"] ?? COLS["3"];
  const hasPanel = Boolean(data.fbHeading || data.fbText || data.fbLabel);

  return (
    <SectionShell background={data.background}>
      <SectionHeader
        badge={data.badge}
        heading={data.heading}
        subtitle={data.subtitle}
      />

      {items.length > 0 && (
        <div className={`grid grid-cols-1 ${cols} gap-5 mb-12`}>
          {items.map((item, i) => (
            <figure
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col"
            >
              {item.quote && (
                <blockquote className="text-[14.5px] text-slate-700 leading-relaxed mb-4">
                  {item.quote}
                </blockquote>
              )}
              {item.author && (
                <figcaption className="mt-auto text-[13px] font-bold text-slate-500">
                  {item.author}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {hasPanel && (
        <div className="bg-blue-dark rounded-2xl p-8 md:p-10">
          <div className="max-w-2xl">
            {data.fbHeading && (
              <h3 className="text-xl font-bold text-white mb-2">{data.fbHeading}</h3>
            )}
            {data.fbText && (
              <p className="text-sm text-white/70 leading-relaxed">{data.fbText}</p>
            )}

            {stats.length > 0 && (
              <div className="flex gap-8 mt-6">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <span className="block text-[26px] font-extrabold text-white leading-none">
                      {stat.value}
                    </span>
                    <span className="block text-xs text-white/60 mt-1.5">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            {data.fbLabel && data.fbHref && (
              <a
                href={data.fbHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-blue-dark px-5 py-2.5 rounded-full text-sm font-bold transition-colors mt-7"
              >
                {data.fbLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
