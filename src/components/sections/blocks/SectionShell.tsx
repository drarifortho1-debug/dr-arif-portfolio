import type { ReactNode } from "react";
import { Badge } from "@/components/shared/badge";

const BG: Record<string, string> = {
  white: "bg-white",
  slate: "bg-slate-50/50 border-y border-slate-100",
  dark: "bg-blue-dark text-white",
  gradient:
    "bg-linear-to-br from-blue-light/10 via-slate-50 to-blue-dark/10 border-y border-slate-100",
};

export function sectionBg(background?: string) {
  return BG[background ?? "white"] ?? BG.white;
}

export function SectionHeader({
  badge,
  heading,
  subtitle,
  dark,
  align = "left",
}: {
  badge?: string;
  heading?: string;
  subtitle?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  if (!badge && !heading && !subtitle) return null;
  return (
    <div
      className={`space-y-3 max-w-2xl mb-12 ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {badge && <Badge text={badge} />}
      {heading && (
        <h2
          className={`text-3xl md:text-4xl font-bold tracking-tight ${dark ? "text-white" : "text-blue-dark"}`}
        >
          {heading}
        </h2>
      )}
      {subtitle && (
        <p
          className={`text-base leading-relaxed ${dark ? "text-white/70" : "text-slate-500"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function SectionShell({
  background,
  children,
  narrow,
}: {
  background?: string;
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <section className={`section-padding w-full overflow-hidden ${sectionBg(background)}`}>
      <div className={narrow ? "max-w-3xl mx-auto px-5" : "max-container"}>
        {children}
      </div>
    </section>
  );
}
