import { getYouTubeId } from "@/lib/youtube";
import { SectionHeader, SectionShell } from "./SectionShell";

interface Item {
  url?: string;
  title?: string;
}

interface Data {
  badge?: string;
  heading?: string;
  items?: Item[];
  columns?: string;
  background?: string;
}

const COLS: Record<string, string> = {
  "1": "max-w-4xl mx-auto",
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
};

export default function VideoEmbedBlock({ data }: { data: Data }) {
  const items = (Array.isArray(data.items) ? data.items : [])
    .map((i) => ({ ...i, id: getYouTubeId(i.url ?? "") }))
    .filter((i) => i.id);

  if (items.length === 0) return null;

  return (
    <SectionShell background={data.background}>
      <SectionHeader badge={data.badge} heading={data.heading} />
      <div className={`grid grid-cols-1 ${COLS[data.columns ?? "2"] ?? COLS["2"]} gap-5`}>
        {items.map((v, i) => (
          <div
            key={i}
            className="flex flex-col bg-white rounded-xl p-2 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900">
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.title || "YouTube video player"}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {v.title && (
              <p className="px-2 pt-3 pb-1 text-sm font-semibold text-blue-dark">
                {v.title}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
