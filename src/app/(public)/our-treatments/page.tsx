import type { Metadata } from "next";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getPage, getTreatments, loadSectionContext } from "@/lib/cms/server";
import { treatmentHref } from "@/lib/cms/treatments";
import TreatmentsContent from "./TreatmentsContent";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "চিকিৎসা সেবা",
  alternates: {
    canonical: "https://www.drarifortho.com/our-treatments",
  },
  description:
    "ডা. আরিফ অর্থোর চিকিৎসা সেবাসমূহ — ট্রমা সার্জারি, অর্থোপেডিক চিকিৎসা, পিআরপি থেরাপি, ওজোন থেরাপি, এমএসকে আল্ট্রাসাউন্ড ও স্পাইন ইন্টারভেনশন।",
  openGraph: {
    title: "চিকিৎসা সেবা — ডা. আরিফ অর্থো",
    description:
      "ট্রমা সার্জারি, অর্থোপেডিক চিকিৎসা, পিআরপি থেরাপি, ওজোন থেরাপি সহ সকল আধুনিক চিকিৎসা সেবা।",
  },
};

export default async function TreatmentsPage() {
  const page = await getPage("our-treatments");
  const [ctx, treatments] = await Promise.all([
    loadSectionContext(page.sections),
    getTreatments(),
  ]);
  const specialties = treatments.map((t) => ({
    label: t.navLabel,
    desc: t.navDesc,
    href: treatmentHref(t.slug),
  }));
  return (
    <SectionRenderer
      sections={page.sections}
      ctx={ctx}
      body={<TreatmentsContent specialties={specialties} />}
    />
  );
}
