import { adminDb } from "@/lib/firebase-admin";
import { blockDefaults, getBlock } from "./blocks";
import {
  DEFAULT_FOOTER,
  DEFAULT_HEADER,
  defaultPage,
  RESERVED_SLUGS,
} from "./defaults";
import { mergeTreatments, treatmentHref, type TreatmentDoc } from "./treatments";
import type {
  FooterSettings,
  HeaderSettings,
  PageDoc,
  SectionInstance,
} from "./types";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
}

function toBlogPost(id: string, data: FirebaseFirestore.DocumentData): BlogPost {
  return {
    id,
    slug: data.slug ?? "",
    title: data.title ?? "",
    content: data.content ?? "",
    category: data.category ?? "",
    readTime: data.readTime ?? "",
    date: data.date ?? "",
    imageUrl: data.imageUrl ?? "",
    imageAlt: data.imageAlt ?? "",
  };
}

export interface VideoItem {
  id: string;
  videoId: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
}

function toIso(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return null;
}

function normalizeSection(raw: SectionInstance): SectionInstance | null {
  if (!raw || !raw.type || !getBlock(raw.type)) return null;
  return {
    id: raw.id,
    type: raw.type,
    enabled: raw.enabled !== false,
    data: { ...blockDefaults(raw.type), ...(raw.data ?? {}) },
  };
}

export async function getPage(slug: string): Promise<PageDoc> {
  const fallback = defaultPage(slug);
  try {
    const snap = await adminDb.collection("pages").doc(slug).get();
    if (!snap.exists) return fallback;
    const data = snap.data() as Partial<PageDoc>;
    const sections = (data.sections ?? [])
      .map(normalizeSection)
      .filter((s): s is SectionInstance => s !== null);
    return {
      slug,
      title: data.title ?? fallback.title,
      sections,
      updatedAt: toIso(data.updatedAt),
    };
  } catch (err) {
    console.error(`[cms] getPage(${slug}) failed, using defaults`, err);
    return fallback;
  }
}

export async function getCustomPage(slug: string): Promise<PageDoc | null> {
  if (RESERVED_SLUGS.has(slug)) return null;
  try {
    const snap = await adminDb.collection("pages").doc(slug).get();
    if (!snap.exists) return null;
    const data = snap.data() as Partial<PageDoc>;
    if (!data.custom) return null;
    return {
      slug,
      title: data.title ?? slug,
      custom: true,
      seoTitle: data.seoTitle ?? "",
      seoDescription: data.seoDescription ?? "",
      noIndex: data.noIndex === true,
      sections: (data.sections ?? [])
        .map(normalizeSection)
        .filter((s): s is SectionInstance => s !== null),
      updatedAt: toIso(data.updatedAt),
    };
  } catch (err) {
    console.error(`[cms] getCustomPage(${slug}) failed`, err);
    return null;
  }
}

export async function listCustomPages(): Promise<PageDoc[]> {
  try {
    const snap = await adminDb.collection("pages").where("custom", "==", true).get();
    return snap.docs
      .map((d) => {
        const data = d.data() as Partial<PageDoc>;
        return {
          slug: d.id,
          title: data.title ?? d.id,
          custom: true,
          seoTitle: data.seoTitle ?? "",
          seoDescription: data.seoDescription ?? "",
          noIndex: data.noIndex === true,
          sections: [],
          updatedAt: toIso(data.updatedAt),
        } satisfies PageDoc;
      })
      .filter((p) => !RESERVED_SLUGS.has(p.slug));
  } catch (err) {
    console.error("[cms] listCustomPages failed", err);
    return [];
  }
}

export async function getTreatments(includeDisabled = false): Promise<TreatmentDoc[]> {
  let overrides: { slug: string; data: Record<string, unknown> }[] = [];
  try {
    const snap = await adminDb.collection("treatments").get();
    overrides = snap.docs.map((d) => ({ slug: d.id, data: d.data() }));
  } catch (err) {
    console.error("[cms] getTreatments failed, using defaults", err);
  }
  const all = mergeTreatments(overrides);
  return includeDisabled ? all : all.filter((t) => t.enabled);
}

export async function getTreatment(slug: string): Promise<TreatmentDoc | null> {
  const all = await getTreatments(true);
  return all.find((t) => t.slug === slug) ?? null;
}

async function withAutoChildren(header: HeaderSettings): Promise<HeaderSettings> {
  if (!header.navItems.some((i) => i.autoChildren)) return header;
  const treatments = await getTreatments();
  const children = treatments.map((t) => ({
    label: t.navLabel,
    desc: t.navDesc,
    href: treatmentHref(t.slug),
  }));
  return {
    ...header,
    navItems: header.navItems.map((i) => (i.autoChildren ? { ...i, children } : i)),
  };
}

export async function getHeader(): Promise<HeaderSettings> {
  try {
    const snap = await adminDb.collection("site").doc("header").get();
    const merged = snap.exists
      ? { ...DEFAULT_HEADER, ...(snap.data() as Partial<HeaderSettings>) }
      : DEFAULT_HEADER;
    return await withAutoChildren(merged);
  } catch (err) {
    console.error("[cms] getHeader failed, using defaults", err);
    return withAutoChildren(DEFAULT_HEADER);
  }
}

export async function getFooter(): Promise<FooterSettings> {
  try {
    const snap = await adminDb.collection("site").doc("footer").get();
    if (!snap.exists) return DEFAULT_FOOTER;
    return { ...DEFAULT_FOOTER, ...(snap.data() as Partial<FooterSettings>) };
  } catch (err) {
    console.error("[cms] getFooter failed, using defaults", err);
    return DEFAULT_FOOTER;
  }
}

export async function getBlogs(limit?: number): Promise<BlogPost[]> {
  try {
    let q = adminDb.collection("blogs").orderBy("createdAt", "desc");
    if (limit) q = q.limit(limit);
    const snap = await q.get();
    return snap.docs.map((d) => toBlogPost(d.id, d.data()));
  } catch (err) {
    console.error("[cms] getBlogs failed", err);
    return [];
  }
}

export async function getBlogBySlugOrId(param: string): Promise<BlogPost | null> {
  let key = param;
  try {
    key = decodeURIComponent(param);
  } catch {
    key = param;
  }
  try {
    const bySlug = await adminDb
      .collection("blogs")
      .where("slug", "==", key)
      .limit(1)
      .get();
    if (!bySlug.empty) {
      const d = bySlug.docs[0];
      return toBlogPost(d.id, d.data());
    }
    const byId = await adminDb.collection("blogs").doc(key).get();
    if (byId.exists) return toBlogPost(byId.id, byId.data()!);
    return null;
  } catch (err) {
    console.error("[cms] getBlogBySlugOrId failed", err);
    return null;
  }
}

export async function getVideos(limit?: number): Promise<VideoItem[]> {
  try {
    let q = adminDb.collection("videos").orderBy("createdAt", "desc");
    if (limit) q = q.limit(limit);
    const snap = await q.get();
    return snap.docs.map((d) => ({
      id: d.id,
      videoId: (d.data().videoId as string) ?? "",
    }));
  } catch (err) {
    console.error("[cms] getVideos failed", err);
    return [];
  }
}

export async function getGallery(limit?: number): Promise<GalleryItem[]> {
  try {
    let q = adminDb.collection("gallery").orderBy("createdAt", "desc");
    if (limit) q = q.limit(limit);
    const snap = await q.get();
    return snap.docs.map((d) => ({
      id: d.id,
      imageUrl: (d.data().imageUrl as string) ?? "",
    }));
  } catch (err) {
    console.error("[cms] getGallery failed", err);
    return [];
  }
}

export interface SectionContext {
  blogs: BlogPost[];
  videos: VideoItem[];
  gallery: GalleryItem[];
}

export async function loadSectionContext(
  sections: SectionInstance[],
): Promise<SectionContext> {
  const enabled = sections.filter((s) => s.enabled);
  const needsBlogs = enabled.some((s) => s.type === "blogs");
  const needsVideos = enabled.some((s) => s.type === "videos");
  const needsGallery = enabled.some(
    (s) => s.type === "custom-gallery" && s.data.source === "gallery",
  );

  const blogLimit = Math.max(
    0,
    ...enabled.filter((s) => s.type === "blogs").map((s) => Number(s.data.count) || 3),
  );
  const videoLimit = Math.max(
    0,
    ...enabled.filter((s) => s.type === "videos").map((s) => Number(s.data.count) || 4),
  );
  const galleryLimit = Math.max(
    0,
    ...enabled
      .filter((s) => s.type === "custom-gallery")
      .map((s) => Number(s.data.count) || 12),
  );

  const [blogs, videos, gallery] = await Promise.all([
    needsBlogs ? getBlogs(blogLimit || 3) : Promise.resolve([]),
    needsVideos ? getVideos(videoLimit || 4) : Promise.resolve([]),
    needsGallery ? getGallery(galleryLimit || 12) : Promise.resolve([]),
  ]);

  return { blogs, videos, gallery };
}
