import type { Metadata } from "next";
import VideosContent from "./VideosContent";

export const metadata: Metadata = {
  title: "ভিডিও গ্যালারি",
  description:
    "ডা. আরিফ অর্থোর চিকিৎসা সংক্রান্ত ভিডিও গ্যালারি — অর্থোপেডিক্স, ট্রমা সার্জারি, রোগীদের পরামর্শ ও বিশেষজ্ঞের মতামত।",
  openGraph: {
    title: "ভিডিও গ্যালারি — ডা. আরিফ অর্থো",
    description:
      "চিকিৎসা সংক্রান্ত গুরুত্বপূর্ণ ভিডিও ও বিশেষজ্ঞের পরামর্শসমূহ।",
  },
};

export default function VideosPage() {
  return <VideosContent />;
}
