export interface HeadingInfo {
  level: number;
  text: string;
}

export interface ImageInfo {
  src: string;
  alt: string;
}

export interface ContentAudit {
  headings: HeadingInfo[];
  images: ImageInfo[];
  missingAlt: number;
  headingCounts: Record<number, number>;
}

const IMG_TAG = /<img\b[^>]*>/gi;
const HEADING_TAG = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;

const attrPattern = (name: string) =>
  new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i");

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const readAttr = (tag: string, name: string): string | null => {
  const match = tag.match(attrPattern(name));
  if (!match) return null;
  return (match[1] ?? match[2] ?? "").trim();
};

export const stripHtml = (html: string): string =>
  html
    ? html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "";

export function ensureImageAlts(html: string, fallback: string): string {
  if (!html) return html;
  const safe = escapeAttr(fallback.trim() || "ছবি");
  return html.replace(IMG_TAG, (tag) => {
    const existing = readAttr(tag, "alt");
    if (existing) return tag;
    if (existing === null) return tag.replace(/<img/i, `<img alt="${safe}"`);
    return tag.replace(attrPattern("alt"), ` alt="${safe}"`);
  });
}

export function auditContent(html: string): ContentAudit {
  const headings: HeadingInfo[] = [];
  const images: ImageInfo[] = [];
  const headingCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  if (!html) return { headings, images, missingAlt: 0, headingCounts };

  for (const match of html.matchAll(HEADING_TAG)) {
    const level = Number(match[1]);
    headings.push({ level, text: stripHtml(match[2]) });
    headingCounts[level] += 1;
  }

  for (const match of html.matchAll(IMG_TAG)) {
    images.push({
      src: readAttr(match[0], "src") || "",
      alt: readAttr(match[0], "alt") || "",
    });
  }

  return {
    headings,
    images,
    missingAlt: images.filter((img) => !img.alt).length,
    headingCounts,
  };
}

export function excerpt(html: string, length = 160): string {
  const text = stripHtml(html);
  if (text.length <= length) return text;
  return `${text.slice(0, length).replace(/\s+\S*$/, "")}...`;
}
