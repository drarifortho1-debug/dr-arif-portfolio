import { SectionHeader, SectionShell } from "./SectionShell";

interface Item {
  value?: string;
  label?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  items?: Item[];
  background?: string;
}

export default function CountersBlock({ data }: { data: Data }) {
  const items = (Array.isArray(data.items) ? data.items : []).filter((i) => i.value);
  const dark = data.background === "dark";

  if (items.length === 0) return null;

  return (
    <SectionShell background={data.background}>
      <SectionHeader
        badge={data.badge}
        heading={data.heading}
        dark={dark}
        align="center"
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl p-7 text-center border ${dark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}
          >
            <p className="text-4xl md:text-5xl font-black text-blue-light tracking-tight">
              {item.value}
            </p>
            {item.label && (
              <p
                className={`mt-2 text-sm font-semibold ${dark ? "text-white/70" : "text-slate-500"}`}
              >
                {item.label}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
