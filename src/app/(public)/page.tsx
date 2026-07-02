import ChambersSection from "@/components/home/ChambersSection";
import CTABanner from "@/components/home/CTABanner";
import HeroBanner from "@/components/home/HeroBanner";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TreatmentsPreview from "@/components/home/TreatmentsPreview";
import VideoGallery from "@/components/home/VideoGallery";
import BlogsPreview from "@/components/home/BlogsPreview";

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
