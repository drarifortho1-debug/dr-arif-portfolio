import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { getCustomPage, listCustomPages, loadSectionContext } from "@/lib/cms/server";

export const revalidate = 300;

export async function generateStaticParams() {
  const pages = await listCustomPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCustomPage(slug);
  if (!page) return { title: "পেজ পাওয়া যায়নি" };

  const title = page.seoTitle?.trim() || page.title;
  const description = page.seoDescription?.trim() || undefined;

  return {
    title,
    description,
    alternates: { canonical: `https://www.drarifortho.com/${slug}` },
    openGraph: { title, description },
    robots: page.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function CustomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getCustomPage(slug);
  if (!page) notFound();

  const ctx = await loadSectionContext(page.sections);

  return <SectionRenderer sections={page.sections} ctx={ctx} />;
}
