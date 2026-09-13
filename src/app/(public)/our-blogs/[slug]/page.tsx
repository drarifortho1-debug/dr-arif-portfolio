import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getBlogBySlugOrId } from "@/lib/cms/server";
import { blogHref } from "@/lib/blog";
import BlogDetailContent from "./BlogDetailContent";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlugOrId(slug);
  if (!post) return { title: "ব্লগ পাওয়া যায়নি" };

  const description = stripHtml(post.content).slice(0, 160);
  const canonical = `https://www.drarifortho.com${blogHref(post)}`;

  return {
    title: post.title,
    description: description || undefined,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description: description || undefined,
      url: canonical,
      images: post.imageUrl
        ? [
            {
              url: post.imageUrl,
              width: 1200,
              height: 630,
              alt: post.imageAlt || post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlugOrId(slug);
  if (!post) notFound();

  let requested = slug;
  try {
    requested = decodeURIComponent(slug);
  } catch {
    requested = slug;
  }
  if (post.slug && requested !== post.slug) {
    permanentRedirect(encodeURI(blogHref(post)));
  }

  return <BlogDetailContent post={post} />;
}
