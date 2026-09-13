import BlogsPreview from "@/components/home/BlogsPreview";
import ChambersSection from "@/components/home/ChambersSection";
import CTABanner from "@/components/home/CTABanner";
import HeroBanner from "@/components/home/HeroBanner";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TreatmentsPreview from "@/components/home/TreatmentsPreview";
import VideoGallery from "@/components/home/VideoGallery";
import type { SectionContext } from "@/lib/cms/server";
import type { SectionInstance } from "@/lib/cms/types";
import CardGridBlock from "./blocks/CardGridBlock";
import CaseCardsBlock from "./blocks/CaseCardsBlock";
import ChambersInfoBlock from "./blocks/ChambersInfoBlock";
import CountersBlock from "./blocks/CountersBlock";
import CustomCtaBlock from "./blocks/CustomCtaBlock";
import CustomHtmlBlock from "./blocks/CustomHtmlBlock";
import DoctorHeroBlock from "./blocks/DoctorHeroBlock";
import EmergencyStripBlock from "./blocks/EmergencyStripBlock";
import FaqBlock from "./blocks/FaqBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import ImageTextBlock from "./blocks/ImageTextBlock";
import LinksBlock from "./blocks/LinksBlock";
import ReviewsPanelBlock from "./blocks/ReviewsPanelBlock";
import RichTextBlock from "./blocks/RichTextBlock";
import ServicesGridBlock from "./blocks/ServicesGridBlock";
import VideoEmbedBlock from "./blocks/VideoEmbedBlock";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

export function renderSection(section: SectionInstance, ctx: SectionContext) {
  const data = section.data as AnyData;
  switch (section.type) {
    case "hero":
      return <HeroBanner data={data} />;
    case "stats":
      return <StatsSection data={data} />;
    case "treatments":
      return <TreatmentsPreview data={data} />;
    case "chambers":
      return <ChambersSection data={data} />;
    case "testimonials":
      return <TestimonialsSection data={data} />;
    case "videos":
      return <VideoGallery data={data} videos={ctx.videos} />;
    case "blogs":
      return <BlogsPreview data={data} blogs={ctx.blogs} />;
    case "cta":
      return <CTABanner data={data} />;
    case "custom-richtext":
      return <RichTextBlock data={data} />;
    case "custom-imagetext":
      return <ImageTextBlock data={data} />;
    case "custom-cardgrid":
      return <CardGridBlock data={data} />;
    case "custom-faq":
      return <FaqBlock data={data} />;
    case "custom-cta":
      return <CustomCtaBlock data={data} />;
    case "custom-gallery":
      return <GalleryBlock data={data} gallery={ctx.gallery} />;
    case "custom-video":
      return <VideoEmbedBlock data={data} />;
    case "custom-counters":
      return <CountersBlock data={data} />;
    case "custom-links":
      return <LinksBlock data={data} />;
    case "custom-html":
      return <CustomHtmlBlock data={data} id={section.id} />;
    case "custom-services":
      return <ServicesGridBlock data={data} />;
    case "custom-doctor-hero":
      return <DoctorHeroBlock data={data} />;
    case "custom-emergency":
      return <EmergencyStripBlock data={data} />;
    case "custom-cases":
      return <CaseCardsBlock data={data} />;
    case "custom-reviews":
      return <ReviewsPanelBlock data={data} />;
    case "custom-chambers":
      return <ChambersInfoBlock data={data} />;
    default:
      return null;
  }
}

export default function SectionRenderer({
  sections,
  ctx,
  body,
}: {
  sections: SectionInstance[];
  ctx: SectionContext;
  body?: React.ReactNode;
}) {
  return (
    <>
      {sections
        .filter((s) => s.enabled)
        .map((s) => (
          <div key={s.id} id={`section-${s.id}`}>
            {s.type === "page-body" ? body : renderSection(s, ctx)}
          </div>
        ))}
    </>
  );
}
