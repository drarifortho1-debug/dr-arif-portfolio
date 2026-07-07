import type { Metadata } from "next";
import ChambersSection from "@/components/home/ChambersSection";
import CTABanner from "@/components/home/CTABanner";
import HeroBanner from "@/components/home/HeroBanner";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TreatmentsPreview from "@/components/home/TreatmentsPreview";
import VideoGallery from "@/components/home/VideoGallery";
import BlogsPreview from "@/components/home/BlogsPreview";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.drarifortho.com",
  },
  description:
    "অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) — হাঁটু, কোমর, কাঁধ ও মেরুদন্ডের চিকিৎসা। কুমিল্লা মেডিকেল কলেজ হাসপাতালের সহকারী রেজিষ্ট্রার।",
  openGraph: {
    title: "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) - অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন",
    description:
      "অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন — হাঁটু, কোমর, কাঁধ ও মেরুদন্ডের চিকিৎসা।",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsSection />
      <TreatmentsPreview />
      <ChambersSection />
      <TestimonialsSection />
      <VideoGallery />
      <BlogsPreview />
      <CTABanner />
    </>
  );
}
