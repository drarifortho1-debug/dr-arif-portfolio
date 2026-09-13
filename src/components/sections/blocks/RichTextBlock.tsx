import { SectionHeader, SectionShell } from "./SectionShell";

interface Data {
  badge?: string;
  heading?: string;
  html?: string;
  background?: string;
  width?: string;
}

export default function RichTextBlock({ data }: { data: Data }) {
  return (
    <SectionShell background={data.background} narrow={data.width !== "full"}>
      <SectionHeader badge={data.badge} heading={data.heading} />
      <div
        className="blog-rich-text text-slate-600 leading-relaxed text-base md:text-lg"
        dangerouslySetInnerHTML={{ __html: data.html ?? "" }}
      />
    </SectionShell>
  );
}
