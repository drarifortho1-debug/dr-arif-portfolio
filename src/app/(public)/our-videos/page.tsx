import type { Metadata } from "next";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getPage, getVideos, loadSectionContext } from "@/lib/cms/server";
import VideosContent from "./VideosContent";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "ভিডিও গ্যালারি",
  alternates: {
    canonical: "https://www.drarifortho.com/our-videos",
  },
  description:
    "ডা. আরিফ অর্থোর চিকিৎসা সংক্রান্ত ভিডিও গ্যালারি — অর্থোপেডিক্স, ট্রমা সার্জারি, রোগীদের পরামর্শ ও বিশেষজ্ঞের মতামত।",
  openGraph: {
    title: "ভিডিও গ্যালারি — ডা. আরিফ অর্থো",
    description:
      "চিকিৎসা সংক্রান্ত গুরুত্বপূর্ণ ভিডিও ও বিশেষজ্ঞের পরামর্শসমূহ।",
  },
};

export default async function VideosPage() {
  const page = await getPage("our-videos");
  const [ctx, videos] = await Promise.all([
    loadSectionContext(page.sections),
    getVideos(),
  ]);
  return (
    <SectionRenderer
      sections={page.sections}
      ctx={ctx}
      body={<VideosContent videos={videos} />}
    />
  );
}
