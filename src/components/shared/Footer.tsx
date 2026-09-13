import { ArrowUpRight } from "lucide-react";
import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { DEFAULT_FOOTER } from "@/lib/cms/defaults";
import type { FooterSettings } from "@/lib/cms/types";

export default function Footer({ settings }: { settings?: FooterSettings }) {
  const f = settings ?? DEFAULT_FOOTER;
  const nameParts = f.name.split(" ");
  const mid = Math.ceil(nameParts.length / 2);
  const nameLine1 = nameParts.slice(0, mid).join(" ");
  const nameLine2 = nameParts.slice(mid).join(" ");

  return (
    <footer className="bg-primary-dark text-white/60 w-full">
      <div className="max-container pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4 space-y-4 text-left">
            {f.logo && (
              <Image
                src={f.logo}
                width={120}
                height={61}
                alt="LOGO"
                className="h-auto w-30"
              />
            )}
            <h3 className="font-bold text-white  text-3xl tracking-tight">
              {nameLine1} <br /> {nameLine2}
            </h3>
            {f.tagline && (
              <p className="text-sm font-bold text-blue-light uppercase tracking-widest">
                {f.tagline}
              </p>
            )}
            <div className="space-y-1 text-white/50 leading-relaxed">
              {f.degrees && (
                <p className="font-semibold text-white/70">{f.degrees}</p>
              )}
              {f.university && <p>{f.university}</p>}
              {f.position && <p>{f.position}</p>}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {f.socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight size={16} /> {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:pl-8 text-left">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              {f.quickLinksTitle}
            </h4>
            <ul className="space-y-3.5">
              {f.quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {f.legalLinks.length > 0 && (
              <>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs mt-8">
                  {f.legalTitle}
                </h4>
                <ul className="space-y-3.5">
                  {f.legalLinks.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="md:col-span-5 text-left">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              {f.chambersTitle}
            </h4>
            <div className="space-y-5">
              {f.chambers.map((chamber, index) => (
                <div
                  key={index}
                  className="space-y-0.5  font-medium text-white/50 border-l border-white/10 pl-3"
                >
                  <h5 className="text-white font-semibold">{chamber.name}</h5>
                  <p className=" w-8/12">{chamber.location}</p>
                  <p className="text-blue-light font-semibold">
                    {chamber.schedule}
                  </p>
                  <p className="text-white/70 font-bold">{chamber.phone}</p>
                  {chamber.phone2 && (
                    <p className="text-white/70 font-bold">{chamber.phone2}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 font-medium">{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
