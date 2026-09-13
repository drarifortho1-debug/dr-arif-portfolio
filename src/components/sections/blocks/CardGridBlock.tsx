import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { SectionHeader, SectionShell } from "./SectionShell";

interface Item {
  title?: string;
  desc?: string;
  image?: string;
  href?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  subtitle?: string;
  columns?: string;
  showImages?: boolean;
  items?: Item[];
  background?: string;
}

const COLS: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

export default function CardGridBlock({ data }: { data: Data }) {
  const items = Array.isArray(data.items) ? data.items : [];
  const cols = COLS[data.columns ?? "3"] ?? COLS["3"];

  return (
    <SectionShell background={data.background}>
      <SectionHeader
        badge={data.badge}
        heading={data.heading}
        subtitle={data.subtitle}
      />
      <div className={`grid grid-cols-1 ${cols} gap-5`}>
        {items.map((item, i) => {
          const inner = (
            <>
              {data.showImages !== false && item.image && (
                <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 mb-3">
                  <Image
                    src={item.image}
                    alt={item.title ?? ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              )}
              <div className="space-y-1.5 px-1.5 pb-1">
                {item.title && (
                  <h3 className="text-lg font-bold text-blue-dark">{item.title}</h3>
                )}
                {item.desc && (
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            </>
          );
          const cls =
            "group flex flex-col items-start bg-white rounded-xl border border-slate-100 p-2 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-slate-200/80 transition-all duration-300 text-left";
          return item.href ? (
            <Link key={i} href={item.href} className={cls}>
              {inner}
            </Link>
          ) : (
            <div key={i} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
