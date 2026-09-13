"use client";

import { blockDefaults, CUSTOM_BLOCKS, getBlock, PAGE_BLOCKS } from "@/lib/cms/blocks";
import { loadPage, pagePath, resetPage, savePage } from "@/lib/cms/client";
import type { PageDoc, SectionInstance } from "@/lib/cms/types";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  GripVertical,
  Lock,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAdmin } from "./AdminProvider";
import CustomHtmlPreview from "./CustomHtmlPreview";
import FieldRenderer from "./FieldRenderer";
import { Button, Modal, PageHeader, Spinner } from "./ui";

function newId(): string {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function AddSectionModal({
  open,
  onClose,
  onPick,
  existingTypes,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (type: string) => void;
  existingTypes: Set<string>;
}) {
  const [tab, setTab] = useState<"custom" | "page">("custom");
  const list = tab === "custom" ? CUSTOM_BLOCKS : PAGE_BLOCKS;

  return (
    <Modal open={open} onClose={onClose} title="নতুন সেকশন যুক্ত করুন" wide>
      <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 mb-5">
        <button
          type="button"
          onClick={() => setTab("custom")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${tab === "custom" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
        >
          কাস্টম সেকশন
        </button>
        <button
          type="button"
          onClick={() => setTab("page")}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${tab === "page" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
        >
          বিল্ট-ইন সেকশন
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((b) => {
          const used = existingTypes.has(b.type);
          return (
            <button
              key={b.type}
              type="button"
              onClick={() => onPick(b.type)}
              className="text-left rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-light hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-light">{b.label}</p>
                {used && (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                    আছে
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{b.description}</p>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

export default function SectionEditor({ slug }: { slug: string }) {
  const { toast } = useAdmin();
  const [page, setPage] = useState<PageDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const dragIdx = useRef<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setPage(await loadPage(slug));
      setDirty(false);
    } catch (err) {
      console.error(err);
      toast("পেজ লোড করা যায়নি", "error");
    } finally {
      setLoading(false);
    }
  }, [slug, toast]);

  useEffect(() => {
    let active = true;
    loadPage(slug)
      .then((p) => {
        if (active) {
          setPage(p);
          setDirty(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast("পেজ লোড করা যায়নি", "error");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug, toast]);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const mutate = (fn: (sections: SectionInstance[]) => SectionInstance[]) => {
    setPage((p) => (p ? { ...p, sections: fn(p.sections) } : p));
    setDirty(true);
  };

  const toggle = (id: string) =>
    mutate((s) => s.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));

  const remove = (id: string) => {
    const sec = page?.sections.find((s) => s.id === id);
    const label = getBlock(sec?.type ?? "")?.label ?? "সেকশন";
    if (!confirm(`"${label}" সেকশনটি মুছে ফেলবেন?`)) return;
    mutate((s) => s.filter((x) => x.id !== id));
    if (editing === id) setEditing(null);
  };

  const duplicate = (id: string) =>
    mutate((s) => {
      const i = s.findIndex((x) => x.id === id);
      if (i < 0) return s;
      const copy: SectionInstance = {
        ...s[i],
        id: newId(),
        data: JSON.parse(JSON.stringify(s[i].data)),
      };
      return [...s.slice(0, i + 1), copy, ...s.slice(i + 1)];
    });

  const move = (from: number, to: number) => {
    if (to < 0 || !page || to >= page.sections.length || from === to) return;
    mutate((s) => {
      const copy = [...s];
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy;
    });
  };

  const updateData = (id: string, data: Record<string, unknown>) =>
    mutate((s) => s.map((x) => (x.id === id ? { ...x, data } : x)));

  const add = (type: string) => {
    const id = newId();
    mutate((s) => [...s, { id, type, enabled: true, data: blockDefaults(type) }]);
    setAdding(false);
    setEditing(id);
  };

  const save = async () => {
    if (!page) return;
    setSaving(true);
    try {
      await savePage(page);
      setDirty(false);
      toast("পেজ সেভ ও পাবলিশ হয়েছে");
    } catch (err) {
      console.error(err);
      toast("সেভ করা যায়নি", "error");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!confirm("এই পেজের সব পরিবর্তন মুছে ডিফল্ট অবস্থায় ফিরিয়ে আনবেন? এটি বাতিল করা যাবে না।")) return;
    setSaving(true);
    try {
      await resetPage(slug);
      await load();
      toast("ডিফল্টে ফিরিয়ে আনা হয়েছে");
    } catch (err) {
      console.error(err);
      toast("রিসেট করা যায়নি", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !page) return <Spinner />;

  const existingTypes = new Set(page.sections.map((s) => s.type));

  return (
    <div>
      <PageHeader
        title={page.title}
        description={`${pagePath(slug)} — সেকশন লুকান, সাজান, সম্পাদনা করুন বা নতুন যুক্ত করুন`}
        actions={
          <>
            <a
              href={pagePath(slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-light px-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              দেখুন
            </a>
            <Button variant="secondary" onClick={reset} disabled={saving}>
              <RotateCcw className="w-4 h-4" />
              রিসেট
            </Button>
            <Button onClick={save} loading={saving} disabled={!dirty}>
              <Save className="w-4 h-4" />
              সেভ ও পাবলিশ
            </Button>
          </>
        }
      />

      {dirty && (
        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2.5">
          অসংরক্ষিত পরিবর্তন আছে — “সেভ ও পাবলিশ” চাপুন
        </div>
      )}

      <div className="space-y-3">
        {page.sections.map((sec, i) => {
          const def = getBlock(sec.type);
          const isEditing = editing === sec.id;
          const canEdit = (def?.fields.length ?? 0) > 0;
          return (
            <div
              key={sec.id}
              draggable
              onDragStart={() => {
                dragIdx.current = i;
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setOverIdx(i);
              }}
              onDragLeave={() => setOverIdx(null)}
              onDrop={() => {
                if (dragIdx.current !== null) move(dragIdx.current, i);
                dragIdx.current = null;
                setOverIdx(null);
              }}
              onDragEnd={() => {
                dragIdx.current = null;
                setOverIdx(null);
              }}
              className={`rounded-2xl border bg-white transition-all ${overIdx === i ? "border-blue-light ring-2 ring-blue-light/20" : "border-slate-200"} ${!sec.enabled ? "opacity-70" : ""}`}
            >
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3">
                <span className="text-slate-300 cursor-grab active:cursor-grabbing hidden sm:block" title="টেনে সাজান">
                  <GripVertical className="w-5 h-5" />
                </span>
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-xs font-bold text-slate-500 flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {def?.label ?? sec.type}
                    </p>
                    {def?.fixed && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                    {def?.group === "custom" && (
                      <span className="text-[10px] font-bold text-blue-light bg-blue-50 px-2 py-0.5 rounded-full">
                        কাস্টম
                      </span>
                    )}
                    {!sec.enabled && (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        লুকানো
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate hidden sm:block">
                    {typeof sec.data.heading === "string" && sec.data.heading
                      ? sec.data.heading
                      : def?.description}
                  </p>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggle(sec.id)}
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${sec.enabled ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-100"}`}
                    title={sec.enabled ? "লুকান" : "দেখান"}
                  >
                    {sec.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => setEditing(isEditing ? null : sec.id)}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${isEditing ? "bg-blue-light text-white" : "text-slate-500 hover:bg-slate-100"}`}
                      title="সম্পাদনা"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}
                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="উপরে"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, i + 1)}
                    disabled={i === page.sections.length - 1}
                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="নিচে"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {!def?.fixed && (
                    <>
                      <button
                        type="button"
                        onClick={() => duplicate(sec.id)}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer hidden sm:block"
                        title="কপি"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(sec.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing && def && (
                <div className="border-t border-slate-100 px-4 sm:px-6 py-5 bg-slate-50/40 rounded-b-2xl">
                  <FieldRenderer
                    fields={def.fields}
                    value={sec.data}
                    onChange={(data) => updateData(sec.id, data)}
                  />
                  {sec.type === "custom-html" && (
                    <CustomHtmlPreview id={sec.id} data={sec.data} />
                  )}
                  <div className="flex justify-end mt-5">
                    <Button variant="secondary" size="sm" onClick={() => setEditing(null)}>
                      বন্ধ করুন
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => setAdding(true)}
          className="w-full rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-light hover:bg-blue-50/30 py-5 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-light transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          নতুন সেকশন যুক্ত করুন
        </button>
      </div>

      <AddSectionModal
        open={adding}
        onClose={() => setAdding(false)}
        onPick={add}
        existingTypes={existingTypes}
      />

      {dirty && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:left-[calc(50%+8rem)]">
          <Button onClick={save} loading={saving} className="shadow-2xl px-6 py-3">
            <Save className="w-4 h-4" />
            সেভ ও পাবলিশ
          </Button>
        </div>
      )}
    </div>
  );
}

