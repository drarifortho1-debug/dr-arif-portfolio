import type { MetadataRoute } from "next";
import { getBlogs, getTreatments, listCustomPages } from "@/lib/cms/server";
import { blogHref } from "@/lib/blog";
import { treatmentHref } from "@/lib/cms/treatments";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.drarifortho.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-treatments`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/our-videos`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/our-blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const [treatments, blogs, custom] = await Promise.all([
    getTreatments(),
    getBlogs(),
    listCustomPages(),
  ]);

  const customPages: MetadataRoute.Sitemap = custom
    .filter((p) => !p.noIndex)
    .map((p) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const treatmentPages: MetadataRoute.Sitemap = treatments.map((t) => ({
    url: `${baseUrl}${treatmentHref(t.slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}${encodeURI(blogHref(b))}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...customPages, ...treatmentPages, ...blogPages];
}
