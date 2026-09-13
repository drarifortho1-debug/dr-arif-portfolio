"use client";

import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import {
  DEFAULT_FOOTER,
  DEFAULT_HEADER,
  defaultPage,
  PAGE_META,
  slugError,
} from "./defaults";
import {
  mergeTreatments,
  storableTable,
  treatmentHref,
  type TreatmentDoc,
} from "./treatments";
import type {
  FooterSettings,
  HeaderSettings,
  MediaItem,
  PageDoc,
} from "./types";

export async function revalidate(paths: string[]): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const token = await user.getIdToken();
    await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paths }),
    });
  } catch (err) {
    console.error("revalidate failed", err);
  }
}

export function pagePath(slug: string): string {
  return PAGE_META.find((p) => p.slug === slug)?.path ?? `/${slug}`;
}

export async function loadPage(slug: string): Promise<PageDoc> {
  const fallback = defaultPage(slug);
  const snap = await getDoc(doc(db, "pages", slug));
  if (!snap.exists()) return fallback;
  const data = snap.data() as Partial<PageDoc>;
  return {
    slug,
    title: data.title ?? fallback.title,
    sections: Array.isArray(data.sections) ? data.sections : fallback.sections,
  };
}

export async function savePage(page: PageDoc): Promise<void> {
  const existing = await getDoc(doc(db, "pages", page.slug));
  const prev = existing.exists() ? (existing.data() as Partial<PageDoc>) : {};

  await setDoc(doc(db, "pages", page.slug), {
    ...prev,
    slug: page.slug,
    title: page.title,
    sections: page.sections,
    custom: page.custom ?? prev.custom ?? false,
    seoTitle: page.seoTitle ?? prev.seoTitle ?? "",
    seoDescription: page.seoDescription ?? prev.seoDescription ?? "",
    noIndex: page.noIndex ?? prev.noIndex ?? false,
    updatedAt: serverTimestamp(),
  });
  await revalidate([pagePath(page.slug)]);
}

export async function createPage(slug: string, title: string): Promise<void> {
  const error = slugError(slug);
  if (error) throw new Error(error);

  const existing = await getDoc(doc(db, "pages", slug));
  if (existing.exists()) throw new Error("এই স্লাগে একটি পেজ আগে থেকেই আছে");

  await setDoc(doc(db, "pages", slug), {
    slug,
    title,
    sections: [],
    custom: true,
    seoTitle: "",
    seoDescription: "",
    updatedAt: serverTimestamp(),
  });
  await revalidate([`/${slug}`, "/sitemap.xml"]);
}

export async function deletePage(slug: string): Promise<void> {
  await deleteDoc(doc(db, "pages", slug));
  await revalidate([`/${slug}`, "/sitemap.xml"]);
}

export async function listCustomPages(): Promise<PageDoc[]> {
  const snap = await getDocs(query(collection(db, "pages"), where("custom", "==", true)));
  return snap.docs.map((d) => {
    const data = d.data() as Partial<PageDoc>;
    return {
      slug: d.id,
      title: data.title ?? d.id,
      custom: true,
      seoTitle: data.seoTitle ?? "",
      seoDescription: data.seoDescription ?? "",
      sections: Array.isArray(data.sections) ? data.sections : [],
    } satisfies PageDoc;
  });
}

export async function resetPage(slug: string): Promise<void> {
  await deleteDoc(doc(db, "pages", slug));
  await revalidate([pagePath(slug)]);
}

export async function loadHeader(): Promise<HeaderSettings> {
  const snap = await getDoc(doc(db, "site", "header"));
  if (!snap.exists()) return JSON.parse(JSON.stringify(DEFAULT_HEADER));
  return { ...DEFAULT_HEADER, ...(snap.data() as Partial<HeaderSettings>) };
}

export async function saveHeader(settings: HeaderSettings): Promise<void> {
  await setDoc(doc(db, "site", "header"), {
    ...settings,
    updatedAt: serverTimestamp(),
  });
  await revalidate(["/"]);
}

export async function loadFooter(): Promise<FooterSettings> {
  const snap = await getDoc(doc(db, "site", "footer"));
  if (!snap.exists()) return JSON.parse(JSON.stringify(DEFAULT_FOOTER));
  return { ...DEFAULT_FOOTER, ...(snap.data() as Partial<FooterSettings>) };
}

export async function saveFooter(settings: FooterSettings): Promise<void> {
  await setDoc(doc(db, "site", "footer"), {
    ...settings,
    updatedAt: serverTimestamp(),
  });
  await revalidate(["/"]);
}

export async function resetSiteDoc(id: "header" | "footer"): Promise<void> {
  await deleteDoc(doc(db, "site", id));
  await revalidate(["/"]);
}

export async function loadTreatments(): Promise<TreatmentDoc[]> {
  const snap = await getDocs(collection(db, "treatments"));
  return mergeTreatments(snap.docs.map((d) => ({ slug: d.id, data: d.data() })));
}

function treatmentPaths(slug: string): string[] {
  return ["/", "/our-treatments", treatmentHref(slug)];
}

export async function saveTreatment(
  data: Omit<TreatmentDoc, "isDefault">,
): Promise<void> {
  const { slug, ...rest } = data;
  const payload: Record<string, unknown> = {
    ...rest,
    table: storableTable(rest.table),
    doAndDont: rest.doAndDont ?? null,
    updatedAt: serverTimestamp(),
  };
  await setDoc(doc(db, "treatments", slug), payload);
  await revalidate(treatmentPaths(slug));
}

export async function patchTreatment(
  slug: string,
  fields: Record<string, unknown>,
): Promise<void> {
  await setDoc(
    doc(db, "treatments", slug),
    { ...fields, updatedAt: serverTimestamp() },
    { merge: true },
  );
  await revalidate(treatmentPaths(slug));
}

export async function removeTreatmentDoc(slug: string): Promise<void> {
  await deleteDoc(doc(db, "treatments", slug));
  await revalidate(treatmentPaths(slug));
}

const MAX_EDGE = 1920;
const RESIZE_ABOVE_BYTES = 1.5 * 1024 * 1024;

async function optimizeImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || /gif|svg/.test(file.type)) return file;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }
  const { width, height } = bitmap;
  const tooBig = width > MAX_EDGE || height > MAX_EDGE;
  if (!tooBig && file.size <= RESIZE_ABOVE_BYTES) {
    bitmap.close();
    return file;
  }
  const scale = tooBig ? Math.min(MAX_EDGE / width, MAX_EDGE / height) : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const keepPng = file.type === "image/png" && file.size <= RESIZE_ABOVE_BYTES;
  const type = keepPng ? "image/png" : "image/webp";
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, 0.86),
  );
  if (!blob || blob.size >= file.size) return file;
  const base = (file.name || "image").replace(/\.[^.]+$/, "");
  return new File([blob], `${base}.${keepPng ? "png" : "webp"}`, { type });
}

export async function uploadMedia(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<MediaItem> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");
  onProgress?.(5);
  const optimized = await optimizeImage(file);
  onProgress?.(15);
  const token = await user.getIdToken();

  const form = new FormData();
  form.append("file", optimized, optimized.name);

  const result = await new Promise<{
    url: string;
    deleteUrl: string;
    size: number;
    contentType: string;
    name: string;
  }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(15 + Math.round((e.loaded / e.total) * 80));
      }
    };
    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300 && body.url) resolve(body);
        else reject(new Error(body.error || `Upload failed (${xhr.status})`));
      } catch {
        reject(new Error(`Upload failed (${xhr.status})`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(form);
  });

  const record = {
    url: result.url,
    name: file.name || result.name,
    path: result.deleteUrl,
    size: result.size,
    contentType: result.contentType,
    provider: "imgbb",
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, "media"), record);
  onProgress?.(100);
  return { id: docRef.id, ...record, createdAt: new Date().toISOString() };
}

export async function listMedia(): Promise<MediaItem[]> {
  const snap = await getDocs(
    query(collection(db, "media"), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((d) => {
    const data = d.data();
    const created = data.createdAt?.toDate?.() as Date | undefined;
    return {
      id: d.id,
      url: data.url,
      name: data.name,
      path: data.path,
      size: data.size ?? 0,
      contentType: data.contentType ?? "",
      createdAt: created ? created.toISOString() : "",
    };
  });
}

export async function deleteMedia(item: MediaItem): Promise<void> {
  await deleteDoc(doc(db, "media", item.id));
}
