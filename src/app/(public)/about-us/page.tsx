import type { Metadata } from "next";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getGallery, getPage, loadSectionContext } from "@/lib/cms/server";
import AboutContent from "./AboutContent";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "আমার সম্পর্কে",
  alternates: {
    canonical: "https://www.drarifortho.com/about-us",
  },
  description:
    "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) — এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী)। বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়, ঢাকা। অর্থোপেডিক্স, ট্রমা, স্পোর্টস ও হ্যান্ড সার্জন।",
  openGraph: {
    title: "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া — অর্থোপেডিক্স বিশেষজ্ঞ",
    description:
      "এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী) — বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়, ঢাকা।",
  },
};

export default async function AboutPage() {
  const page = await getPage("about-us");
  const [ctx, gallery] = await Promise.all([
    loadSectionContext(page.sections),
    getGallery(),
  ]);
  return (
    <SectionRenderer
      sections={page.sections}
      ctx={ctx}
      body={<AboutContent gallery={gallery} />}
    />
  );
}
