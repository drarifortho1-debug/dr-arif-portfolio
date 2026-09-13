import {
  TREATMENTS,
  type TreatmentData,
} from "@/app/(public)/our-treatments/[slug]/treatment-data";
import { TREATMENT_LINKS } from "@/lib/treatments-nav";
import type { Field } from "./types";

export interface TreatmentDoc extends TreatmentData {
  navLabel: string;
  navDesc: string;
  enabled: boolean;
  order: number;
  isDefault: boolean;
}

export const DEFAULT_TREATMENTS: TreatmentDoc[] = TREATMENT_LINKS.map((link, i) => {
  const slug = link.href.replace("/our-treatments/", "");
  const data = TREATMENTS[slug];
  return {
    ...data,
    slug,
    navLabel: link.label,
    navDesc: link.desc,
    enabled: true,
    order: i,
    isDefault: true,
  };
});

export function treatmentHref(slug: string): string {
  return `/our-treatments/${slug}`;
}

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function list<T>(v: unknown, fallback: T[]): T[] {
  return Array.isArray(v) ? (v as T[]) : fallback;
}

export function emptyTreatment(slug = ""): TreatmentDoc {
  return {
    slug,
    title: "",
    subtitle: "",
    metaTitle: "",
    metaDescription: "",
    causes: [],
    treatments: [],
    symptoms: "",
    doctorAdvice: "",
    faq: [],
    ctaSubtitle: "",
    navLabel: "",
    navDesc: "",
    enabled: true,
    order: 999,
    isDefault: false,
  };
}

interface StoredTable {
  title: string;
  headers: string[];
  rows: ({ cells: string[] } | string[])[];
}

function readTable(raw: unknown): TreatmentData["table"] | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const t = raw as StoredTable;
  if (!Array.isArray(t.headers) || t.headers.length === 0) return undefined;
  const rows = (Array.isArray(t.rows) ? t.rows : []).map((r) =>
    Array.isArray(r) ? r : Array.isArray(r?.cells) ? r.cells : [],
  );
  return { title: t.title ?? "", headers: t.headers, rows };
}

export function storableTable(
  table: TreatmentData["table"] | undefined,
): StoredTable | null {
  if (!table) return null;
  return {
    title: table.title,
    headers: table.headers,
    rows: table.rows.map((cells) => ({ cells })),
  };
}

export function normalizeTreatment(
  slug: string,
  raw: Record<string, unknown>,
  base?: TreatmentDoc,
): TreatmentDoc {
  const b = base ?? emptyTreatment(slug);
  const table = readTable(raw.table);
  const doAndDont = raw.doAndDont as TreatmentData["doAndDont"] | undefined;
  return {
    slug,
    title: str(raw.title, b.title),
    subtitle: str(raw.subtitle, b.subtitle),
    metaTitle: str(raw.metaTitle, b.metaTitle),
    metaDescription: str(raw.metaDescription, b.metaDescription),
    causes: list(raw.causes, b.causes),
    treatments: list(raw.treatments, b.treatments),
    symptoms: str(raw.symptoms, b.symptoms),
    doctorAdvice: str(raw.doctorAdvice, b.doctorAdvice),
    faq: list(raw.faq, b.faq),
    ctaSubtitle: str(raw.ctaSubtitle, b.ctaSubtitle),
    table: "table" in raw ? table : b.table,
    doAndDont:
      "doAndDont" in raw
        ? doAndDont && (doAndDont.dos?.length || doAndDont.donts?.length)
          ? doAndDont
          : undefined
        : b.doAndDont,
    heroImage: str(raw.heroImage, b.heroImage ?? ""),
    heroImageAlt: str(raw.heroImageAlt, b.heroImageAlt ?? ""),
    navLabel: str(raw.navLabel, b.navLabel),
    navDesc: str(raw.navDesc, b.navDesc),
    enabled: typeof raw.enabled === "boolean" ? raw.enabled : b.enabled,
    order: typeof raw.order === "number" ? raw.order : b.order,
    isDefault: b.isDefault,
  };
}

export function mergeTreatments(
  overrides: { slug: string; data: Record<string, unknown> }[],
): TreatmentDoc[] {
  const map = new Map<string, TreatmentDoc>();
  for (const d of DEFAULT_TREATMENTS) map.set(d.slug, d);
  for (const o of overrides) {
    const base = map.get(o.slug);
    map.set(o.slug, normalizeTreatment(o.slug, o.data, base));
  }
  return [...map.values()].sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export interface TreatmentForm {
  navLabel: string;
  navDesc: string;
  enabled: boolean;
  heroImage: string;
  heroImageAlt: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  causes: { title: string; description: string }[];
  treatments: { name: string; description: string }[];
  symptoms: string;
  doctorAdvice: string;
  faq: { question: string; answer: string }[];
  ctaSubtitle: string;
  tableTitle: string;
  tableHeaders: string[];
  tableRows: string[];
  dos: string[];
  donts: string[];
}

export function toForm(doc: TreatmentDoc): TreatmentForm {
  return {
    navLabel: doc.navLabel,
    navDesc: doc.navDesc,
    enabled: doc.enabled,
    heroImage: doc.heroImage ?? "",
    heroImageAlt: doc.heroImageAlt ?? "",
    title: doc.title,
    subtitle: doc.subtitle,
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    causes: doc.causes,
    treatments: doc.treatments,
    symptoms: doc.symptoms,
    doctorAdvice: doc.doctorAdvice,
    faq: doc.faq,
    ctaSubtitle: doc.ctaSubtitle,
    tableTitle: doc.table?.title ?? "",
    tableHeaders: doc.table?.headers ?? [],
    tableRows: (doc.table?.rows ?? []).map((r) => r.join(" | ")),
    dos: doc.doAndDont?.dos ?? [],
    donts: doc.doAndDont?.donts ?? [],
  };
}

const clean = (lines: string[]) => lines.map((l) => l.trim()).filter(Boolean);

export function fromForm(slug: string, f: TreatmentForm, order: number): Omit<TreatmentDoc, "isDefault"> {
  const headers = clean(f.tableHeaders);
  const rows = clean(f.tableRows).map((r) => r.split("|").map((c) => c.trim()));
  const dos = clean(f.dos);
  const donts = clean(f.donts);
  return {
    slug,
    navLabel: f.navLabel.trim(),
    navDesc: f.navDesc.trim(),
    enabled: f.enabled,
    order,
    heroImage: f.heroImage.trim(),
    heroImageAlt: f.heroImageAlt.trim(),
    title: f.title.trim(),
    subtitle: f.subtitle.trim(),
    metaTitle: f.metaTitle.trim(),
    metaDescription: f.metaDescription.trim(),
    causes: f.causes.filter((c) => c.title?.trim()),
    treatments: f.treatments.filter((t) => t.name?.trim()),
    symptoms: f.symptoms.trim(),
    doctorAdvice: f.doctorAdvice.trim(),
    faq: f.faq.filter((q) => q.question?.trim()),
    ctaSubtitle: f.ctaSubtitle.trim(),
    table: headers.length > 0 ? { title: f.tableTitle.trim(), headers, rows } : undefined,
    doAndDont: dos.length || donts.length ? { dos, donts } : undefined,
  };
}

export const TREATMENT_FIELDS: {
  nav: Field[];
  hero: Field[];
  seo: Field[];
  causes: Field[];
  treatments: Field[];
  text: Field[];
  faq: Field[];
  table: Field[];
  doAndDont: Field[];
} = {
  nav: [
    { key: "navLabel", label: "নাম (মেনু ও কার্ডে দেখাবে)", type: "text", placeholder: "যেমন: হাঁটু ব্যথা" },
    { key: "navDesc", label: "ছোট বিবরণ (মেনু ও কার্ডে দেখাবে)", type: "text", placeholder: "যেমন: আর্থ্রাইটিস, লিগামেন্ট ইনজুরি" },
    { key: "enabled", label: "সাইটে দেখাবেন?", type: "boolean", help: "বন্ধ করলে পেজ, মেনু ও কার্ড — সব জায়গা থেকে লুকিয়ে যাবে" },
  ],
  hero: [
    { key: "heroImage", label: "ব্যানার ছবি", type: "image", help: "পেজের একদম উপরে দেখাবে। ১৯২০×৮০০ মাপের ছবি ভালো দেখায়। খালি রাখলে ব্যানার দেখাবে না" },
    { key: "heroImageAlt", label: "ব্যানার ছবির Alt টেক্সট", type: "text", help: "গুগলের জন্য — ছবিতে কী আছে এক লাইনে" },
    { key: "title", label: "পেজের শিরোনাম (H1)", type: "text" },
    { key: "subtitle", label: "ভূমিকা", type: "textarea" },
  ],
  seo: [
    { key: "metaTitle", label: "মেটা টাইটেল (গুগলে দেখাবে)", type: "text", help: "৬০ অক্ষরের মধ্যে রাখুন" },
    { key: "metaDescription", label: "মেটা বিবরণ (গুগলে দেখাবে)", type: "textarea", help: "১৬০ অক্ষরের মধ্যে রাখুন" },
  ],
  causes: [
    {
      key: "causes",
      label: "কারণসমূহ",
      type: "list",
      itemLabel: "কারণ",
      fields: [
        { key: "title", label: "শিরোনাম", type: "text" },
        { key: "description", label: "বিবরণ", type: "text" },
      ],
    },
  ],
  treatments: [
    {
      key: "treatments",
      label: "চিকিৎসার ধরন",
      type: "list",
      itemLabel: "চিকিৎসা",
      fields: [
        { key: "name", label: "নাম", type: "text" },
        { key: "description", label: "বিবরণ", type: "text" },
      ],
    },
  ],
  text: [
    { key: "symptoms", label: "লক্ষণ ও কখন ডাক্তার দেখাবেন", type: "textarea" },
    { key: "doctorAdvice", label: "ডাক্তারের পরামর্শ", type: "textarea" },
    { key: "ctaSubtitle", label: "নিচের কল-টু-অ্যাকশন বার্তা", type: "textarea" },
  ],
  faq: [
    {
      key: "faq",
      label: "প্রশ্ন ও উত্তর",
      type: "list",
      itemLabel: "প্রশ্ন",
      fields: [
        { key: "question", label: "প্রশ্ন", type: "text" },
        { key: "answer", label: "উত্তর", type: "textarea" },
      ],
    },
  ],
  table: [
    { key: "tableTitle", label: "টেবিলের শিরোনাম", type: "text" },
    { key: "tableHeaders", label: "কলামের নাম", type: "lines", help: "প্রতি লাইনে একটি কলাম। খালি রাখলে টেবিল দেখাবে না" },
    { key: "tableRows", label: "সারিসমূহ", type: "lines", help: "প্রতি লাইনে একটি সারি; কলামগুলো | দিয়ে আলাদা করুন। যেমন: কাঁধ | ফ্রোজেন শোল্ডার | ৪০ ঊর্ধ্বে" },
  ],
  doAndDont: [
    { key: "dos", label: "করণীয়", type: "lines", help: "প্রতি লাইনে একটি" },
    { key: "donts", label: "বর্জনীয়", type: "lines", help: "প্রতি লাইনে একটি" },
  ],
};
