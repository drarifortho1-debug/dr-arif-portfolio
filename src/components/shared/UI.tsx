import { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "amber" | "emerald" | "red" | "slate";

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  amber: "bg-accent/10 text-accent border-accent/20",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/50",
  red: "bg-red-50 text-red-700 border-red-200/50",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
};



export function SectionHeading({ badge, title, description, align = "center" }: { badge?: ReactNode; title: string; description?: string; align?: "center" | "left" }) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} mb-12 md:mb-16`}>
      {badge}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{title}</h2>
      {description && <p className="text-slate-600 mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{description}</p>}
    </div>
  );
}

export function SectionWrapper({ children, className = "", bg }: { children: ReactNode; className?: string; bg?: "white" | "slate" | "primary" | "none" }) {
  const bgMap = { white: "bg-white", slate: "bg-slate-50", primary: "bg-primary text-white", none: "" };
  return (
    <section className={`section-padding ${bgMap[bg || "none"]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function PrimaryButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const content = (
    <span className={`inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-xl text-sm font-bold transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 cursor-pointer ${className}`}>
      {children}
    </span>
  );

  if (isInternal) {
    return <Link href={href}>{content}</Link>;
  }
  return <a href={href}>{content}</a>;
}

export function OutlineButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const content = (
    <span className={`inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-10 py-4 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-slate-200/50 hover:shadow-slate-200/80 hover:-translate-y-1 active:scale-95 border border-slate-200 cursor-pointer ${className}`}>
      {children}
    </span>
  );

  if (isInternal) {
    return <Link href={href}>{content}</Link>;
  }
  return <a href={href}>{content}</a>;
}

export function ArrowRight() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const content = (
    <span className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all cursor-pointer group">
      {children}
      <span className="transform group-hover:translate-x-1 transition-transform">
        <ArrowRight />
      </span>
    </span>
  );

  if (isInternal) {
    return <Link href={href}>{content}</Link>;
  }
  return <a href={href}>{content}</a>;
}

export function StatsCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-premium card-hover cursor-pointer group">
      <p className="text-4xl md:text-5xl lg:text-6xl font-black text-primary group-hover:text-primary-light transition-colors">{value}</p>
      <p className="text-sm md:text-base font-bold text-slate-500 mt-4 uppercase tracking-widest">{label}</p>
    </div>
  );
}

export function SocialCircles() {
  const items = [
    { label: "FB", href: "#" },
    { label: "YT", href: "#" },
    { label: "WA", href: "#" },
    { label: "TK", href: "#" },
  ];
  return (
    <div className="flex gap-3">
      {items.map((s) => (
        <a key={s.label} href={s.href} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-primary hover:text-white flex items-center justify-center text-xs font-bold text-slate-500 transition-all duration-200 active:scale-90 cursor-pointer">{s.label}</a>
      ))}
    </div>
  );
}

export function IconPhone() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

export function IconLocation() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export function IconClock() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function IconEmail() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
