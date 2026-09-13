import { ArrowUpRight } from "lucide-react";
import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { Badge } from "../shared/badge";
import { blockDefaults } from "@/lib/cms/blocks";

export interface TreatmentItem {
  label: string;
  desc: string;
  image: string;
  href: string;
}

export interface TreatmentsData {
  badge: string;
  heading: string;
  buttonLabel: string;
  buttonHref: string;
  items: TreatmentItem[];
}

export default function TreatmentsPreview({
  data,
}: {
  data?: Partial<TreatmentsData>;
}) {
  const d = { ...blockDefaults<TreatmentsData>("treatments"), ...data };
  const items = Array.isArray(d.items) ? d.items : [];

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-container">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-slate-100 mb-10">
          <div className="space-y-3 max-w-xl">
            {d.badge && <Badge text={d.badge} />}
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight">
              {d.heading}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {items.map((t, i) => (
            <Link
              key={i}
              href={t.href || "/our-treatments"}
              className="group flex flex-col items-start bg-white rounded-xl border border-slate-100 p-2 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-slate-200/80 transition-all duration-300 text-left"
            >
              <div className="w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-100 mb-3 relative">
                {t.image && (
                  <Image
                    src={t.image}
                    alt={t.label}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center transition-transform duration-500 scale-101 group-hover:scale-115"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="space-y-1.5 px-1.5">
                <h3 className="text-lg font-bold text-blue-dark">{t.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        {d.buttonLabel && (
          <div className="text-center mt-16">
            <Link href={d.buttonHref || "/our-treatments"} className="primary-btn">
              <span>{d.buttonLabel}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-200" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
