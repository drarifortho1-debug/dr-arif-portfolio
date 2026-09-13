"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { Button, PageHeader, Spinner } from "@/components/admin/ui";
import {
  loadTreatments,
  patchTreatment,
  removeTreatmentDoc,
} from "@/lib/cms/client";
import { treatmentHref, type TreatmentDoc } from "@/lib/cms/treatments";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TreatmentsListPage() {
  const { toast } = useAdmin();
  const [items, setItems] = useState<TreatmentDoc[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadTreatments()
      .then((list) => {
        if (active) setItems(list);
      })
      .catch((err) => {
        console.error(err);
        toast("চিকিৎসা পেজ লোড করা যায়নি", "error");
        if (active) setItems([]);
      });
    return () => {
      active = false;
    };
  }, [toast]);

  const reload = async () => {
    try {
      setItems(await loadTreatments());
    } catch (err) {
      console.error(err);
    }
  };

  const toggle = async (t: TreatmentDoc) => {
    setBusy(t.slug);
    try {
      await patchTreatment(t.slug, { enabled: !t.enabled });
      toast(t.enabled ? "পেজ লুকানো হয়েছে" : "পেজ দেখানো হচ্ছে");
      await reload();
    } catch (err) {
      console.error(err);
      toast("পরিবর্তন করা যায়নি", "error");
    } finally {
      setBusy(null);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    if (!items) return;
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const reordered = [...items];
    [reordered[index], reordered[j]] = [reordered[j], reordered[index]];
    setItems(reordered);
    setBusy("order");
    try {
      await Promise.all(
        reordered.map((t, i) => (t.order !== i ? patchTreatment(t.slug, { order: i }) : null)),
      );
      await reload();
    } catch (err) {
      console.error(err);
      toast("সাজানো যায়নি", "error");
    } finally {
      setBusy(null);
    }
  };

  const remove = async (t: TreatmentDoc) => {
    const msg = t.isDefault
      ? `"${t.navLabel}" পেজের সব পরিবর্তন মুছে ডিফল্টে ফিরিয়ে আনবেন?`
      : `"${t.navLabel}" পেজটি স্থায়ীভাবে মুছে ফেলবেন?`;
    if (!confirm(msg)) return;
    setBusy(t.slug);
    try {
      await removeTreatmentDoc(t.slug);
      toast(t.isDefault ? "ডিফল্টে ফিরিয়ে আনা হয়েছে" : "পেজ মুছে ফেলা হয়েছে");
      await reload();
    } catch (err) {
      console.error(err);
      toast("মুছে ফেলা যায়নি", "error");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="চিকিৎসা পেজ"
        description="প্রতিটি চিকিৎসার আলাদা পেজ — মেনুর ড্রপডাউন ও চিকিৎসা সেবা পেজের কার্ড এখান থেকেই আসে"
        actions={
          <Link
            href="/admin-panel/treatments/new"
            className="inline-flex items-center gap-2 bg-blue-light hover:bg-blue-dark text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            নতুন চিকিৎসা পেজ
          </Link>
        }
      />

      {items === null ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100">
          {items.map((t, i) => (
            <div
              key={t.slug}
              className={`flex items-center gap-3 px-4 py-3 ${!t.enabled ? "opacity-60" : ""}`}
            >
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-xs font-bold text-slate-500 flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-slate-900">{t.navLabel || t.slug}</p>
                  {!t.isDefault && (
                    <span className="text-[10px] font-bold text-blue-light bg-blue-50 px-2 py-0.5 rounded-full">
                      নতুন
                    </span>
                  )}
                  {!t.enabled && (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      লুকানো
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate">{t.navDesc}</p>
                <p className="text-[11px] font-mono text-slate-400 truncate">{treatmentHref(t.slug)}</p>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0 || busy !== null}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hidden sm:block"
                  title="উপরে"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1 || busy !== null}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hidden sm:block"
                  title="নিচে"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggle(t)}
                  disabled={busy !== null}
                  className={`p-2 rounded-lg cursor-pointer transition-colors disabled:opacity-50 ${t.enabled ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-100"}`}
                  title={t.enabled ? "লুকান" : "দেখান"}
                >
                  {t.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <a
                  href={treatmentHref(t.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-light hover:bg-slate-50"
                  title="দেখুন"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href={`/admin-panel/treatments/${t.slug}`}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                  title="সম্পাদনা"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(t)}
                  disabled={busy !== null}
                  className={t.isDefault ? "text-slate-400 hover:text-amber-600" : "text-slate-400 hover:text-red-500"}
                  title={t.isDefault ? "ডিফল্টে ফিরিয়ে আনুন" : "মুছুন"}
                >
                  {t.isDefault ? <RotateCcw className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
