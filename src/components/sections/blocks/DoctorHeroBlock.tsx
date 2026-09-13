import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { sectionBg } from "./SectionShell";

interface Stat {
  value?: string;
  label?: string;
}

interface Data {
  breadcrumbLabel?: string;
  breadcrumbHref?: string;
  breadcrumbCurrent?: string;
  credentials?: string;
  heading?: string;
  headingEn?: boolean;
  name?: string;
  position?: string;
  stats?: Stat[];
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  photo?: string;
  photoAlt?: string;
  background?: string;
}

export default function DoctorHeroBlock({ data }: { data: Data }) {
  const stats = Array.isArray(data.stats) ? data.stats.filter((s) => s.value || s.label) : [];

  return (
    <section className={`w-full ${sectionBg(data.background)}`}>
      <div className="max-container pt-5 pb-14 md:pb-16">
        {data.breadcrumbCurrent && (
          <nav aria-label="breadcrumb" className="text-[13px] text-slate-500 mb-8">
            <Link
              href={data.breadcrumbHref || "/"}
              className="font-semibold text-blue-light hover:text-blue-dark transition-colors"
            >
              {data.breadcrumbLabel || "হোম"}
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span>{data.breadcrumbCurrent}</span>
          </nav>
        )}

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            {data.credentials && (
              <p className="text-[13.5px] font-semibold text-blue-light tracking-wide mb-3.5">
                {data.credentials}
              </p>
            )}

            {data.heading && (
              <h1
                className={`text-4xl sm:text-5xl font-extrabold text-blue-dark tracking-tight leading-[1.15] mb-4 ${data.headingEn ? "font-google-sans" : ""}`}
              >
                {data.heading}
              </h1>
            )}

            {data.name && (
              <p className="text-lg md:text-xl font-bold text-slate-800 mb-2.5">
                {data.name}
              </p>
            )}

            {data.position && (
              <p className="text-[15px] text-slate-500 leading-relaxed mb-7">
                {data.position}
              </p>
            )}

            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden mb-7">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white px-3 py-4 text-center">
                    <span className="block text-[22px] font-extrabold text-blue-dark">
                      {stat.value}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {data.primaryLabel && data.primaryHref && (
                <a href={data.primaryHref} className="primary-btn">
                  {data.primaryLabel}
                </a>
              )}
              {data.secondaryLabel && data.secondaryHref && (
                <a
                  href={data.secondaryHref}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-full text-sm font-bold border border-slate-200 transition-colors"
                >
                  {data.secondaryLabel}
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full aspect-4/5 rounded-2xl border border-slate-200 bg-white p-2.5 overflow-hidden">
              {data.photo ? (
                <Image
                  src={data.photo}
                  alt={data.photoAlt || data.name || ""}
                  fill
                  className="object-cover object-bottom rounded-xl p-2.5"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
              ) : (
                <div className="w-full h-full rounded-xl border border-slate-200 flex items-center justify-center text-center text-[13px] text-slate-400 px-6">
                  ডাক্তারের ছবি যোগ করুন
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
