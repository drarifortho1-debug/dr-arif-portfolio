"use client";

import NewPageModal from "@/components/admin/NewPageModal";
import { Button, EmptyState, PageHeader, Spinner } from "@/components/admin/ui";
import { deletePage } from "@/lib/cms/client";
import { PAGE_META } from "@/lib/cms/defaults";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowRight, ExternalLink, FileEdit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface Info {
  customized: boolean;
  sectionCount: number;
  enabledCount: number;
  updatedAt: string;
}

interface CustomPage {
  slug: string;
  title: string;
}

function PageCard({
  title,
  path,
  slug,
  info,
  onDelete,
}: {
  title: string;
  path: string;
  slug: string;
  info?: Info;
  onDelete?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-900 truncate">{title}</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{path}</p>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${info?.customized ? "bg-blue-50 text-blue-light" : "bg-slate-100 text-slate-500"}`}
        >
          {info?.customized ? "কাস্টমাইজড" : "ডিফল্ট"}
        </span>
      </div>

      {info?.customized && (
        <p className="text-xs text-slate-500">
          {info.enabledCount}/{info.sectionCount} সেকশন সক্রিয়
          {info.updatedAt && <> · সর্বশেষ: {info.updatedAt}</>}
        </p>
      )}

      <div className="flex items-center gap-2 mt-auto">
        <Link
          href={`/admin-panel/pages/${slug}`}
          className="inline-flex items-center gap-2 bg-blue-light hover:bg-blue-dark text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
        >
          <FileEdit className="w-3.5 h-3.5" />
          সম্পাদনা
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-light px-2"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          দেখুন
        </a>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-600 px-2 ml-auto cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            মুছুন
          </button>
        )}
      </div>
    </div>
  );
}

export default function PagesListPage() {
  const [info, setInfo] = useState<Record<string, Info> | null>(null);
  const [custom, setCustom] = useState<CustomPage[]>([]);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    const out: Record<string, Info> = {};
    const pages: CustomPage[] = [];
    try {
      const snap = await getDocs(collection(db, "pages"));
      snap.forEach((d) => {
        const data = d.data();
        const sections = Array.isArray(data.sections) ? data.sections : [];
        const updated = data.updatedAt?.toDate?.() as Date | undefined;
        out[d.id] = {
          customized: true,
          sectionCount: sections.length,
          enabledCount: sections.filter(
            (s: { enabled?: boolean }) => s.enabled !== false,
          ).length,
          updatedAt: updated ? updated.toLocaleString("bn-BD") : "",
        };
        if (data.custom) {
          pages.push({ slug: d.id, title: (data.title as string) ?? d.id });
        }
      });
    } catch (err) {
      console.error(err);
    }
    pages.sort((a, b) => a.title.localeCompare(b.title, "bn"));
    setInfo(out);
    setCustom(pages);
  }, []);

  useEffect(() => {
    const run = async () => {
      await load();
    };
    run();
  }, [load]);

  const remove = async (slug: string, title: string) => {
    if (!confirm(`“${title}” পেজটি মুছে ফেলবেন? এটি ফেরানো যাবে না।`)) return;
    try {
      await deletePage(slug);
      await load();
    } catch (err) {
      console.error(err);
      alert("পেজ মুছতে সমস্যা হয়েছে");
    }
  };

  return (
    <div>
      <PageHeader
        title="পেজসমূহ"
        description="যে পেজটি সম্পাদনা করতে চান সেটি বাছাই করুন"
        actions={
          <Button onClick={() => setCreating(true)}>
            <Plus className="w-4 h-4" />
            নতুন পেজ
          </Button>
        }
      />

      {info === null ? (
        <Spinner />
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              সাইটের পেজ
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {PAGE_META.map((p) => (
                <PageCard
                  key={p.slug}
                  title={p.title}
                  path={p.path}
                  slug={p.slug}
                  info={info[p.slug]}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              নিজের তৈরি পেজ
            </h2>
            {custom.length === 0 ? (
              <EmptyState
                title="এখনো কোনো পেজ তৈরি করা হয়নি"
                action={
                  <Button onClick={() => setCreating(true)}>
                    <Plus className="w-4 h-4" />
                    নতুন পেজ
                  </Button>
                }
              />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {custom.map((p) => (
                  <PageCard
                    key={p.slug}
                    title={p.title}
                    path={`/${p.slug}`}
                    slug={p.slug}
                    info={info[p.slug]}
                    onDelete={() => remove(p.slug, p.title)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <NewPageModal
        open={creating}
        onClose={() => setCreating(false)}
        onCreated={(slug) => {
          setCreating(false);
          window.location.href = `/admin-panel/pages/${slug}`;
        }}
      />
    </div>
  );
}
