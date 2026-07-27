"use client";

import ContentLayout from "@/components/shared/ContentLayout";
import { Badge } from "@/components/shared/badge";
import type { ParsedContent } from "@/lib/content-parser";

export default function LegalContent({
  content,
  badge,
}: {
  content: ParsedContent;
  badge: string;
}) {
  const { blocks } = content;

  return (
    <ContentLayout>
      <article className="max-w-3xl mx-auto pt-2 md:pt-4">
        <div className="mb-8">
          <Badge text={badge} />
        </div>

        {blocks.map((block, i) => {
          if (block.type === "heading") {
            const isFirst = i === 0;
            return (
              <h1
                key={i}
                className={`font-bold text-blue-dark tracking-tight leading-tight mb-4 ${
                  isFirst
                    ? "text-3xl md:text-4xl"
                    : "text-xl md:text-2xl mt-12 mb-4"
                }`}
              >
                {block.text}
              </h1>
            );
          }
          if (block.type === "paragraph") {
            return (
              <p
                key={i}
                className="text-slate-600 text-base md:text-lg leading-[1.8] mb-5"
              >
                {block.text}
              </p>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="space-y-3 mb-8">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-slate-600 text-sm md:text-base leading-[1.8]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-light shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === "table") {
            return (
              <div
                key={i}
                className="overflow-x-auto mb-10 rounded-2xl border border-slate-200 shadow-sm"
              >
                <table className="w-full text-sm md:text-base min-w-[500px]">
                  <thead>
                    <tr className="bg-blue-dark">
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="px-5 py-3.5 text-left font-bold text-white text-xs uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className={`border-b border-slate-100 last:border-0 ${ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-5 py-3.5 text-slate-700"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          if (block.type === "paired-list") {
            return (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              >
                {block.items.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-3 p-5 bg-white border border-slate-100 rounded-xl"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-light shrink-0" />
                    <div>
                      <p className="font-bold text-blue-dark text-sm">
                        {item.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </article>
    </ContentLayout>
  );
}
