import { SectionHeader, SectionShell } from "./SectionShell";

interface Chamber {
  name?: string;
  address?: string;
  hours?: string;
  phone?: string;
  mapUrl?: string;
  buttonLabel?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  subtitle?: string;
  addressLabel?: string;
  hoursLabel?: string;
  phoneLabel?: string;
  items?: Chamber[];
  background?: string;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-[13.5px] text-slate-500 mb-1.5">
      <strong className="min-w-15 shrink-0 text-xs font-semibold text-slate-700 pt-0.5">
        {label}
      </strong>
      <span className="leading-relaxed">{value}</span>
    </div>
  );
}

export default function ChambersInfoBlock({ data }: { data: Data }) {
  const items = Array.isArray(data.items) ? data.items : [];

  return (
    <SectionShell background={data.background}>
      <SectionHeader
        badge={data.badge}
        heading={data.heading}
        subtitle={data.subtitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((chamber, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="aspect-16/10 bg-slate-100 border-b border-slate-200">
              {chamber.mapUrl ? (
                <iframe
                  src={chamber.mapUrl}
                  title={chamber.name ?? "Map"}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 px-4 text-center">
                  ম্যাপ লিংক যোগ করুন
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              {chamber.name && (
                <h3 className="text-[16.5px] font-bold text-blue-dark mb-3">
                  {chamber.name}
                </h3>
              )}

              {chamber.address && (
                <Row label={data.addressLabel || "ঠিকানা"} value={chamber.address} />
              )}
              {chamber.hours && (
                <Row label={data.hoursLabel || "সময়"} value={chamber.hours} />
              )}
              {chamber.phone && (
                <Row label={data.phoneLabel || "ফোন"} value={chamber.phone} />
              )}

              {chamber.phone && (
                <div className="mt-auto pt-5">
                  <a
                    href={`tel:${chamber.phone.replace(/[^0-9+]/g, "")}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-light hover:bg-blue-dark text-white px-4 py-2.5 rounded-full text-[13.5px] font-bold transition-colors"
                  >
                    {chamber.buttonLabel || "কল করুন"}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
