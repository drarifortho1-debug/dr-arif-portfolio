import type { Metadata } from "next";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getPage, loadSectionContext } from "@/lib/cms/server";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.drarifortho.com",
  },
  description:
    "অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) — হাঁটু, কোমর, কাঁধ ও মেরুদন্ডের চিকিৎসা। কুমিল্লা মেডিকেল কলেজ হাসপাতালের সহকারী রেজিষ্ট্রার।",
  openGraph: {
    title: "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) - অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন",
    description:
      "অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন — হাঁটু, কোমর, কাঁধ ও মেরুদন্ডের চিকিৎসা।",
  },
};

export default async function HomePage() {
  const page = await getPage("home");
  const ctx = await loadSectionContext(page.sections);
  return <SectionRenderer sections={page.sections} ctx={ctx} />;
}
