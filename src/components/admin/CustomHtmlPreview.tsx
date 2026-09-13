"use client";

import { SCOPE_ATTR, sanitizeHtml, scopeCss } from "@/lib/cms/scoped-css";
import { Eye } from "lucide-react";
import { useDeferredValue, useMemo } from "react";

const BG: Record<string, string> = {
  white: "bg-white",
  slate: "bg-slate-50",
  dark: "bg-blue-dark text-white",
  gradient: "bg-linear-to-br from-blue-light/10 via-slate-50 to-blue-dark/10",
};

export default function CustomHtmlPreview({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown>;
}) {
  const rawHtml = typeof data.html === "string" ? data.html : "";
  const rawCss = typeof data.css === "string" ? data.css : "";
  const background = typeof data.background === "string" ? data.background : "white";

  const deferredHtml = useDeferredValue(rawHtml);
  const deferredCss = useDeferredValue(rawCss);

  const previewId = `${id}_preview`;
  const html = useMemo(() => sanitizeHtml(deferredHtml), [deferredHtml]);
  const css = useMemo(() => scopeCss(deferredCss, previewId), [deferredCss, previewId]);

  const removedCount = useMemo(() => {
    if (!deferredHtml.trim()) return 0;
    const before = (deferredHtml.match(/<(script|iframe|form|object|embed)\b/gi) ?? []).length;
    const after = (html.match(/<(script|iframe|form|object|embed)\b/gi) ?? []).length;
    return Math.max(0, before - after);
  }, [deferredHtml, html]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <Eye className="w-3.5 h-3.5" />
          লাইভ প্রিভিউ
        </span>
        {removedCount > 0 && (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
            {removedCount}টি ট্যাগ নিরাপত্তার কারণে বাদ দেওয়া হয়েছে
          </span>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        {html ? (
          <div className={`p-5 ${BG[background] ?? BG.white}`} {...{ [SCOPE_ATTR]: previewId }}>
            {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        ) : (
          <p className="p-8 text-center text-xs text-slate-400">
            HTML লিখলে এখানে প্রিভিউ দেখা যাবে
          </p>
        )}
      </div>

      <p className="mt-2 text-[11px] text-slate-400">
        প্রিভিউ সাইটের গ্লোবাল স্টাইল ব্যবহার করে, তাই আসল পেজে সামান্য ভিন্ন দেখাতে পারে।
      </p>
    </div>
  );
}
