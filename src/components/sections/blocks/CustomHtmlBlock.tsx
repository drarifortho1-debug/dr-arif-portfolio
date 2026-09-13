import { SCOPE_ATTR, sanitizeHtml, scopeCss } from "@/lib/cms/scoped-css";
import { sectionBg } from "./SectionShell";

const CONTAINER: Record<string, string> = {
  default: "max-container",
  narrow: "max-w-3xl mx-auto px-5",
  full: "w-full",
};

export default function CustomHtmlBlock({
  data,
  id,
}: {
  data: {
    html?: string;
    css?: string;
    container?: string;
    background?: string;
  };
  id: string;
}) {
  const html = sanitizeHtml(data.html ?? "");
  if (!html) return null;

  const css = scopeCss(data.css ?? "", id);
  const container = CONTAINER[data.container ?? "default"] ?? CONTAINER.default;

  return (
    <section
      className={`section-padding w-full overflow-hidden ${sectionBg(data.background)}`}
      {...{ [SCOPE_ATTR]: id }}
    >
      {css && (
        <style href={`sec-${id}`} precedence="medium">
          {css}
        </style>
      )}
      <div className={container} dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
