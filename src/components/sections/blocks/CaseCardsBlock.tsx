import { SectionHeader, SectionShell } from "./SectionShell";

interface Item {
  tag?: string;
  title?: string;
  body?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  subtitle?: string;
  items?: Item[];
  background?: string;
}

export default function CaseCardsBlock({ data }: { data: Data }) {
  const items = Array.isArray(data.items) ? data.items : [];

  return (
    <SectionShell background={data.background}>
      <SectionHeader
        badge={data.badge}
        heading={data.heading}
        subtitle={data.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <article
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-light/30 hover:shadow-sm transition-all duration-300"
          >
            {item.tag && (
              <span className="block text-xs font-bold text-blue-light tracking-wider uppercase mb-2.5">
                {item.tag}
              </span>
            )}
            {item.title && (
              <h3 className="text-[17px] font-bold text-blue-dark mb-2.5">
                {item.title}
              </h3>
            )}
            {item.body && (
              <p className="text-[14.5px] text-slate-500 leading-relaxed">{item.body}</p>
            )}
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
