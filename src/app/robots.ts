import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin-panel/",
    },
    sitemap: "https://drarifortho.com/sitemap.xml",
  };
}
