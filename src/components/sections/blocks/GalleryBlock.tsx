import Image from "@/components/shared/SafeImage";
import type { GalleryItem } from "@/lib/cms/server";
import { SectionHeader, SectionShell } from "./SectionShell";

interface Item {
  image?: string;
  alt?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  source?: string;
  count?: number;
  items?: Item[];
  columns?: string;
  background?: string;
}

const COLS: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-2 lg:grid-cols-4",
};

export default function GalleryBlock({
  data,
  gallery = [],
}: {
  data: Data;
  gallery?: GalleryItem[];
}) {
  const limit = Number(data.count) || 12;
  const images: Item[] =
    data.source === "manual"
      ? (Array.isArray(data.items) ? data.items : []).filter((i) => i.image)
      : gallery.map((g) => ({ image: g.imageUrl, alt: "" }));
  const list = images.slice(0, limit);

  if (list.length === 0) return null;

  return (
    <SectionShell background={data.background}>
      <SectionHeader badge={data.badge} heading={data.heading} />
      <div className={`grid grid-cols-1 ${COLS[data.columns ?? "4"] ?? COLS["4"]} gap-4`}>
        {list.map((img, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100 group"
          >
            <Image
              src={img.image!}
              alt={img.alt || `গ্যালারি ছবি ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 300px"
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
