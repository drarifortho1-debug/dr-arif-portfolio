import type { MetadataRoute } from "next";
import { adminDb } from "@/lib/firebase-admin";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.drarifortho.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-treatments`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/our-videos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/our-blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  try {
    const snapshot = await adminDb.collection("blogs").get();
    const blogRoutes: MetadataRoute.Sitemap = snapshot.docs.map((doc) => {
      const data = doc.data() as { slug?: string; createdAt?: { toDate?: () => Date } };
      const createdAt = data.createdAt?.toDate?.();
      return {
        url: `${baseUrl}/our-blogs/${data.slug || doc.id}`,
        lastModified: createdAt instanceof Date ? createdAt : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });
    return [...staticRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
