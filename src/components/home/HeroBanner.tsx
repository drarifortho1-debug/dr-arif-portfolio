import {
  CalendarCheck,
  ChevronsRight,
  GraduationCap,
  Hospital,
} from "lucide-react";
import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { Badge } from "../shared/badge";
import { blockDefaults } from "@/lib/cms/blocks";

export interface HeroData {
  badge: string;
  nameLine1: string;
  nameLine2: string;
  degrees: string;
  university: string;
  position: string;
  hospital: string;
  primaryLabel: string;
  primaryPhone: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: string;
  showFloating: boolean;
  floatingTitle: string;
  floatingSubtitle: string;
}

export default function HeroBanner({ data }: { data?: Partial<HeroData> }) {
  const d = { ...blockDefaults<HeroData>("hero"), ...data };

  return (
    <section className="relative w-full bg-white overflow-hidden pt-14 md:pt-20 pb-28">
      <div className="max-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-4 items-center">
          <div className="lg:col-span-7 space-y-8 text-center md:text-left">
            {d.badge && <Badge text={d.badge} />}

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-[56px]  font-extrabold text-blue-dark tracking-tight leading-[1.15]">
                {d.nameLine1} <br />
                <span className="text-blue-light">{d.nameLine2}</span>
              </h1>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start justify-center md:justify-start gap-3">
                <GraduationCap className="w-5 h-5 text-blue-light shrink-0 mt-0.5 hidden md:block" />
                <div className="text-sm md:text-base space-y-0.5">
                  <p className="font-bold text-blue-dark">{d.degrees}</p>
                  <p className="text-slate-600">{d.university}</p>
                </div>
              </div>

              <div className="flex items-start justify-center md:justify-start gap-3 text-slate-600">
                <Hospital className="w-5 h-5 text-blue-light shrink-0 mt-0.5 hidden md:block" />
                <div className="text-sm md:text-base space-y-0.5">
                  <p className="text-blue-dark font-bold">{d.position}</p>
                  <p className="text-slate-600">{d.hospital}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              {d.primaryLabel && (
                <a href={`tel:${d.primaryPhone}`} className="primary-btn">
                  <CalendarCheck className="w-4 h-4" />
                  <span className="pt-0.5">{d.primaryLabel}</span>
                </a>
              )}
              {d.secondaryLabel && (
                <Link
                  href={d.secondaryHref || "/about-us"}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-500 px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border border-slate-200/80 active:scale-98"
                >
                  <span className="pt-0.5">{d.secondaryLabel}</span>
                  <ChevronsRight size={18} />
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end relative ">
            <div className="relative w-full max-w-[94%]  mr-auto md:mx-auto md:max-w-100 aspect-3/4 group">
              <div className="absolute inset-0 bg-blue-light rounded-4xl transform -translate-x-2 translate-y-2 -rotate-3 group-hover:rotate-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out" />

              <div className="absolute inset-0 bg-slate-100  rounded-4xl overflow-hidden border-4 border-white p-4 shadow-xl shadow-slate-950/10">
                <Image
                  width={500}
                  height={500}
                  src={d.image || "/doctor-img.png"}
                  alt={`${d.nameLine1} ${d.nameLine2}`}
                  className="w-full relative -bottom-4 h-full object-cover object-bottom filter contrast-[1.02] saturate-[1.02]  transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
              </div>

              {d.showFloating && (
                <div className="absolute -bottom-8 -right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 px-5 py-4 rounded-2xl shadow-2xl  shadow-slate-blue-light flex items-center gap-4 max-w-52.5 group/badge hover:border-blue-light transition-colors duration-300">
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-slate-900 leading-tight tracking-wide">
                      {d.floatingTitle}
                    </p>
                    <p className="text-sm font-bold text-slate-500 leading-tight">
                      {d.floatingSubtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
