import { ChevronDown } from "lucide-react";
import { SectionHeader, SectionShell } from "./SectionShell";

interface Item {
  q?: string;
  a?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  items?: Item[];
  background?: string;
}

export default function FaqBlock({ data }: { data: Data }) {
  const items = (Array.isArray(data.items) ? data.items : []).filter((i) => i.q);

  return (
    <SectionShell background={data.background} narrow>
      <SectionHeader badge={data.badge} heading={data.heading} align="center" />
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-slate-100 bg-white open:shadow-md open:border-slate-200/80 transition-all"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-base font-bold text-blue-dark select-none [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 text-slate-600 leading-relaxed whitespace-pre-line">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
