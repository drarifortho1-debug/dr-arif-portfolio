import { Phone } from "lucide-react";
import Image from "next/image";
import { Badge } from "../shared/badge";
import { blockDefaults } from "@/lib/cms/blocks";

export interface CtaData {
  badge: string;
  heading: string;
  body: string;
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappLabel: string;
}

export default function CTABanner({ data }: { data?: Partial<CtaData> }) {
  const d = { ...blockDefaults<CtaData>("cta"), ...data };
  const whatsappHref = `https://wa.me/${d.whatsappNumber}?text=${encodeURIComponent(d.whatsappMessage)}`;

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-light/10 via-slate-50 to-blue-dark/10 py-20 md:py-24 border-t border-b border-slate-100 w-full">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e0a_1px,transparent_1px),linear-gradient(to_bottom,#0f766e0a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none" />

      <div className="max-container relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20">
          <div className="space-y-4 max-w-2xl text-left">
            {d.badge && <Badge text={d.badge} />}
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight leading-tight">
              {d.heading}
            </h2>
            {d.body && (
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
                {d.body}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
            {d.phone && (
              <a
                href={`tel:${d.phone}`}
                className="inline-flex items-center justify-center gap-2.5 bg-blue-light hover:bg-blue-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-blue-light/10 hover:shadow-lg hover:shadow-blue-light/20 active:scale-95 text-center font-google-sans"
              >
                <Phone className="w-4 h-4 fill-white/10" />
                {d.phone}
              </a>
            )}

            {d.whatsappNumber && d.whatsappLabel && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 text-white hover:bg-blue-dark bg-blue-dark px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border border-blue-light/20 shadow-sm active:scale-95 text-center"
              >
                <Image
                  src="/whatsapp.png"
                  width={50}
                  height={50}
                  alt="Whatsapp Icon "
                  className="size-6"
                />
                {d.whatsappLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
