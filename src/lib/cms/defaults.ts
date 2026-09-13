import { blockDefaults } from "./blocks";
import type {
  FooterSettings,
  HeaderSettings,
  PageDoc,
  SectionInstance,
} from "./types";

function section(id: string, type: string, enabled = true): SectionInstance {
  return { id, type, enabled, data: blockDefaults(type) };
}

export const PAGE_META: { slug: string; title: string; path: string }[] = [
  { slug: "home", title: "হোম পেজ", path: "/" },
  { slug: "about-us", title: "আমার সম্পর্কে", path: "/about-us" },
  { slug: "our-treatments", title: "চিকিৎসা সেবা", path: "/our-treatments" },
  { slug: "our-videos", title: "ভিডিও গ্যালারি", path: "/our-videos" },
  { slug: "our-blogs", title: "স্বাস্থ্য টিপস", path: "/our-blogs" },
];

export const RESERVED_SLUGS = new Set([
  ...PAGE_META.map((p) => p.slug),
  "home",
  "about-us",
  "our-treatments",
  "our-videos",
  "our-blogs",
  "privacy-policy",
  "terms-and-conditions",
  "disclaimer",
  "admin-panel",
  "api",
  "_next",
  "sitemap.xml",
  "robots.txt",
  "favicon.ico",
]);

export function slugError(slug: string): string | null {
  if (!slug) return "স্লাগ দিন";
  if (slug.length > 60) return "স্লাগ ৬০ অক্ষরের কম হতে হবে";
  if (RESERVED_SLUGS.has(slug)) return "এই স্লাগটি সংরক্ষিত — অন্য একটি দিন";
  if (!/^[a-z0-9ঀ-৿]+(?:-[a-z0-9ঀ-৿]+)*$/u.test(slug)) {
    return "শুধু ছোট হাতের অক্ষর, সংখ্যা ও হাইফেন ব্যবহার করুন";
  }
  return null;
}

export const DEFAULT_PAGES: Record<string, PageDoc> = {
  home: {
    slug: "home",
    title: "হোম পেজ",
    sections: [
      section("hero", "hero"),
      section("stats", "stats"),
      section("treatments", "treatments"),
      section("chambers", "chambers"),
      section("testimonials", "testimonials"),
      section("videos", "videos"),
      section("blogs", "blogs"),
      section("cta", "cta"),
    ],
  },
  "about-us": {
    slug: "about-us",
    title: "আমার সম্পর্কে",
    sections: [section("body", "page-body")],
  },
  "our-treatments": {
    slug: "our-treatments",
    title: "চিকিৎসা সেবা",
    sections: [section("body", "page-body")],
  },
  "our-videos": {
    slug: "our-videos",
    title: "ভিডিও গ্যালারি",
    sections: [section("body", "page-body")],
  },
  "our-blogs": {
    slug: "our-blogs",
    title: "স্বাস্থ্য টিপস",
    sections: [section("body", "page-body")],
  },
};

export const DEFAULT_HEADER: HeaderSettings = {
  logo: "/logo.png",
  logoAlt: "Doctor Logo",
  ctaLabel: "কল করুন",
  ctaPhone: "+8801858405083",
  showCta: true,
  navItems: [
    { label: "হোম", href: "/", enabled: true },
    { label: "আমার সম্পর্কে", href: "/about-us", enabled: true },
    {
      label: "চিকিৎসা সেবা",
      href: "/our-treatments",
      enabled: true,
      children: [],
      autoChildren: true,
    },
    { label: "ভিডিও গ্যালারি", href: "/our-videos", enabled: true },
    { label: "স্বাস্থ্য টিপস", href: "/our-blogs", enabled: true },
  ],
};

export const DEFAULT_FOOTER: FooterSettings = {
  logo: "/logo-white.png",
  name: "ডা. গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া)",
  tagline: "অর্থোপেডিক্স, ট্রমা, স্পোর্টস ও হ্যান্ড সার্জন",
  degrees: "এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী)",
  university: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU), ঢাকা",
  position:
    "সহকারী রেজিস্ট্রার — ক্যাজুয়ালটি বিভাগ, কুমিল্লা মেডিকেল কলেজ হাসপাতাল",
  socialLinks: [
    { label: "ফেসবুক", href: "#" },
    { label: "হোয়াটসঅ্যাপ", href: "https://wa.me/8801858405083" },
    {
      label: "ইউটিউব",
      href: "https://youtube.com/@dr.gaziarifvelia1?sub_confirmation=1",
    },
  ],
  quickLinksTitle: "গুরুত্বপূর্ণ লিংকস",
  quickLinks: [
    { label: "হোম", href: "/" },
    { label: "আমাদের সম্পর্কে", href: "/about-us" },
    { label: "চিকিৎসা সেবা", href: "/our-treatments" },
    { label: "ভিডিও গ্যালারি", href: "/our-videos" },
    { label: "স্বাস্থ্য টিপস", href: "/our-blogs" },
  ],
  legalTitle: "আইনি",
  legalLinks: [
    { label: "শর্তাবলী", href: "/terms-and-conditions" },
    { label: "গোপনীয়তা নীতি", href: "/privacy-policy" },
    { label: "দায়মুক্তি", href: "/disclaimer" },
  ],
  chambersTitle: "চেম্বারসমূহ",
  chambers: [
    {
      name: "কুমিল্লা ট্রমা সেন্টার",
      location:
        "রুম ৭০৬, ৭ম তলা (লিফট-৬), নতুন ভবন, রাণীর বাজার রোড, কান্দিরপাড়, কুমিল্লা",
      schedule: "শনিবার থেকে বুধবার (দুপুর ২:০০ — বিকেল ৫:০০)",
      phone: "+880 1612371696",
      phone2: "+880 1858405083",
    },
    {
      name: "পপূলার ডায়াগনস্টিক সেন্টার",
      location:
        "রুম ৫১২, ৫ম তলা (লিফট-৪), হাউজ নাম্বার ৫৭, লাকসাম রোড, রামঘাট, কান্দিরপাড়, কুমিল্লা",
      schedule: "শনিবার থেকে বুধবার (বিকেল ৫:০০ — রাত ৮:০০)",
      phone: "+880 1612371696",
      phone2: "+880 1858405083",
    },
    {
      name: "ডক্টর’স পয়েন্ট ডায়াগনস্টিক সেন্টার",
      location: "কালিকাপুর বাজার, বুড়িচং, কুমিল্লা",
      schedule: "শুধুমাত্র শুক্রবার (সকাল ৮:০০ — রাত ৮:০০)",
      phone: "+880 1612371696",
      phone2: "",
    },
  ],
  copyright: "© ২০২৬ ডা: আরিফ অর্থো। সর্বস্বত্ব সংরক্ষিত।",
};

export function defaultPage(slug: string): PageDoc {
  const page = DEFAULT_PAGES[slug];
  if (!page) {
    const meta = PAGE_META.find((p) => p.slug === slug);
    return { slug, title: meta?.title ?? slug, sections: [] };
  }
  return JSON.parse(JSON.stringify(page));
}
