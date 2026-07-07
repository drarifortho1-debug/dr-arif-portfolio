import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "আমার সম্পর্কে",
  alternates: {
    canonical: "https://www.drarifortho.com/about-us",
  },
  description:
    "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) — এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী)। বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়, ঢাকা। অর্থোপেডিক্স, ট্রমা, স্পোর্টস ও হ্যান্ড সার্জন।",
  openGraph: {
    title: "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম ভিলীয়া — অর্থোপেডিক্স বিশেষজ্ঞ",
    description:
      "এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী) — বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়, ঢাকা।",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
