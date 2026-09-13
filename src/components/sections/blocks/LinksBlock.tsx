import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader, SectionShell } from "./SectionShell";

interface Item {
  label?: string;
  href?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  items?: Item[];
  background?: string;
}

export default function LinksBlock({ data }: { data: Data }) {
  const items = (Array.isArray(data.items) ? data.items : []).filter(
    (i) => i.label && i.href,
  );

  if (items.length === 0) return null;

  return (
    <SectionShell background={data.background}>
      <SectionHeader badge={data.badge} heading={data.heading} />
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => {
          const external = /^(https?:|tel:|mailto:)/.test(item.href!);
          const cls =
            "inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-blue-dark px-5 py-3 rounded-xl text-sm font-bold transition-all border border-slate-200/80 hover:border-blue-light/40 active:scale-98";
          return external ? (
            <a
              key={i}
              href={item.href}
              className={cls}
              target={item.href!.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {item.label}
              <ArrowUpRight className="w-4 h-4 text-blue-light" />
            </a>
          ) : (
            <Link key={i} href={item.href!} className={cls}>
              {item.label}
              <ArrowUpRight className="w-4 h-4 text-blue-light" />
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}
