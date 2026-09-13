import { Badge } from "../shared/badge";
import ChamberCard from "../shared/chambar-card";
import { blockDefaults } from "@/lib/cms/blocks";

export interface ChamberItem {
  name: string;
  logo: string;
  address: string;
  days: string;
  time: string;
  offDays: string;
  mapUrl: string;
  theme: "red" | "green" | "blue";
  showAltPhone: boolean;
}

export interface ChambersData {
  badge: string;
  heading: string;
  subtitle: string;
  mainPhone: string;
  altPhone: string;
  items: ChamberItem[];
}

const THEMES = {
  red: {
    className: "bg-red-600/15",
    logoClassName: "-ml-3.5",
    scheduleClassName: "bg-red-50",
    buttonClassName: "bg-red-400 text-white",
  },
  green: {
    className: "bg-green-600/15",
    logoClassName: "-ml-0.5",
    scheduleClassName: "bg-green-50",
    buttonClassName: "bg-green-700 text-white",
  },
  blue: {
    className: "bg-blue-light/15",
    logoClassName: "",
    scheduleClassName: "bg-blue-50",
    buttonClassName: "bg-blue-light text-white",
  },
};

export default function ChambersSection({
  data,
}: {
  data?: Partial<ChambersData>;
}) {
  const d = { ...blockDefaults<ChambersData>("chambers"), ...data };
  const items = Array.isArray(d.items) ? d.items : [];

  return (
    <section className="bg-slate-50/50 py-24 md:py-32 border-t border-slate-100">
      <div className="max-container">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 mb-16 text-left">
          <div className="space-y-4 max-w-xl">
            {d.badge && <Badge text={d.badge} />}
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight">
              {d.heading}
            </h2>
          </div>
          {d.subtitle && (
            <p className="text-base font-medium text-slate-600 max-w-xs md:text-right leading-relaxed text-left">
              {d.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {items.map((c, i) => {
            const theme = THEMES[c.theme] ?? THEMES.blue;
            return (
              <ChamberCard
                key={i}
                name={c.name}
                logo={c.logo}
                address={c.address}
                days={c.days}
                time={c.time}
                offDays={c.offDays}
                mapUrl={c.mapUrl}
                phone1={d.mainPhone}
                phone2={c.showAltPhone ? d.altPhone : ""}
                {...theme}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
