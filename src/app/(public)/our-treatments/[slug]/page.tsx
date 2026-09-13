import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTreatment } from "@/lib/cms/server";
import { DEFAULT_TREATMENTS } from "@/lib/cms/treatments";
import TreatmentDetail from "./TreatmentDetail";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DEFAULT_TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTreatment(slug);
  if (!data || !data.enabled) return { title: "চিকিৎসা পাওয়া যায়নি" };

  return {
    title: data.metaTitle || data.title,
    alternates: {
      canonical: `https://www.drarifortho.com/our-treatments/${slug}`,
    },
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle || data.title,
      description: data.metaDescription,
    },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const data = await getTreatment(slug);
  if (!data || !data.enabled) notFound();

  return <TreatmentDetail data={data} />;
}
