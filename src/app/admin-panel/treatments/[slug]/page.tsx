"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import FieldRenderer from "@/components/admin/FieldRenderer";
import { Button, Card, Label, PageHeader, Spinner } from "@/components/admin/ui";
import { loadTreatments, saveTreatment } from "@/lib/cms/client";
import {
  emptyTreatment,
  fromForm,
  toForm,
  TREATMENT_FIELDS,
  treatmentHref,
  type TreatmentDoc,
  type TreatmentForm,
} from "@/lib/cms/treatments";
import { slugify } from "@/lib/slug";
import { ExternalLink, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

function latinSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export default function TreatmentEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: routeSlug } = use(params);
  const isNew = routeSlug === "new";
  const router = useRouter();
  const { toast } = useAdmin();

  const [all, setAll] = useState<TreatmentDoc[] | null>(null);
  const [form, setForm] = useState<TreatmentForm | null>(null);
  const [slug, setSlug] = useState("");
  const [existing, setExisting] = useState<TreatmentDoc | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    loadTreatments()
      .then((list) => {
        if (!active) return;
        setAll(list);
        if (isNew) {
          setForm(toForm(emptyTreatment()));
          return;
        }
        const found = list.find((t) => t.slug === routeSlug) ?? null;
        setExisting(found);
        if (found) {
          setForm(toForm(found));
          setSlug(found.slug);
        }
      })
      .catch((err) => {
        console.error(err);
        toast("লোড করা যায়নি", "error");
        if (active) setAll([]);
      });
    return () => {
      active = false;
    };
  }, [routeSlug, isNew, toast]);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const update = (next: Record<string, unknown>) => {
    setForm((f) => ({ ...(f as TreatmentForm), ...next }));
    setDirty(true);
  };

  const save = async () => {
    if (!form) return;
    const finalSlug = isNew ? latinSlug(slug) || latinSlug(slugify(form.navLabel)) : slug;
    if (!form.navLabel.trim()) {
      toast("নাম দিন", "error");
      return;
    }
    if (!form.title.trim()) {
      toast("পেজের শিরোনাম দিন", "error");
      return;
    }
    if (!finalSlug) {
      toast("URL স্লাগ দিন (ইংরেজি অক্ষরে, যেমন: elbow-pain)", "error");
      return;
    }
    if (isNew && all?.some((t) => t.slug === finalSlug)) {
      toast("এই URL স্লাগ আগেই ব্যবহৃত হয়েছে", "error");
      return;
    }
    setSaving(true);
    try {
      const order = existing?.order ?? (all?.length ?? 0);
      await saveTreatment(fromForm(finalSlug, form, order));
      setDirty(false);
      toast("চিকিৎসা পেজ সেভ ও পাবলিশ হয়েছে");
      if (isNew) router.replace(`/admin-panel/treatments/${finalSlug}`);
    } catch (err) {
      console.error(err);
      toast("সেভ করা যায়নি", "error");
    } finally {
      setSaving(false);
    }
  };

  if (all === null || (!isNew && form === null && existing === null && all.length === 0)) {
    return <Spinner />;
  }

  if (!isNew && !existing) {
    return (
      <div className="text-center py-16">
        <p className="font-bold text-slate-700">চিকিৎসা পেজ পাওয়া যায়নি</p>
        <Link href="/admin-panel/treatments" className="text-sm font-bold text-blue-light mt-3 inline-block">
          ← তালিকায় ফিরুন
        </Link>
      </div>
    );
  }

  if (!form) return <Spinner />;

  const asRecord = form as unknown as Record<string, unknown>;

  return (
    <div>
      <Link
        href="/admin-panel/treatments"
        className="inline-block text-xs font-bold text-slate-500 hover:text-blue-light mb-4"
      >
        ← সব চিকিৎসা পেজ
      </Link>
      <PageHeader
        title={isNew ? "নতুন চিকিৎসা পেজ" : form.navLabel || slug}
        description={isNew ? "নতুন একটি চিকিৎসার পেজ তৈরি করুন" : treatmentHref(slug)}
        actions={
          <>
            {!isNew && (
              <a
                href={treatmentHref(slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-light px-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                দেখুন
              </a>
            )}
            <Button onClick={save} loading={saving} disabled={!dirty && !isNew}>
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

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="space-y-5">
          <Card title="মেনু ও কার্ড" description="ড্রপডাউন মেনু ও চিকিৎসা সেবা পেজের কার্ডে যা দেখাবে">
            {isNew && (
              <div className="mb-5">
                <Label help="ইংরেজি ছোট হাতের অক্ষর ও হাইফেন — যেমন: elbow-pain। পরে বদলানো যাবে না">
                  URL স্লাগ
                </Label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-white focus-within:border-blue-light focus-within:ring-2 focus-within:ring-blue-light/15 overflow-hidden">
                  <span className="pl-3.5 text-xs text-slate-400 font-mono shrink-0 select-none">/our-treatments/</span>
                  <input
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setDirty(true);
                    }}
                    onBlur={() => setSlug((s) => latinSlug(s))}
                    placeholder="elbow-pain"
                    className="flex-1 min-w-0 px-2 py-2.5 text-sm text-slate-900 focus:outline-none bg-transparent font-mono"
                  />
                </div>
              </div>
            )}
            <FieldRenderer fields={TREATMENT_FIELDS.nav} value={asRecord} onChange={update} />
          </Card>
          <Card title="পেজের শীর্ষভাগ">
            <FieldRenderer fields={TREATMENT_FIELDS.hero} value={asRecord} onChange={update} />
          </Card>
          <Card title="গুগল / SEO">
            <FieldRenderer fields={TREATMENT_FIELDS.seo} value={asRecord} onChange={update} />
          </Card>
          <Card title="লক্ষণ, পরামর্শ ও কল-টু-অ্যাকশন">
            <FieldRenderer fields={TREATMENT_FIELDS.text} value={asRecord} onChange={update} />
          </Card>
        </div>
        <div className="space-y-5">
          <Card title="কারণসমূহ">
            <FieldRenderer fields={TREATMENT_FIELDS.causes} value={asRecord} onChange={update} />
          </Card>
          <Card title="চিকিৎসার ধরন">
            <FieldRenderer fields={TREATMENT_FIELDS.treatments} value={asRecord} onChange={update} />
          </Card>
          <Card title="প্রশ্ন ও উত্তর">
            <FieldRenderer fields={TREATMENT_FIELDS.faq} value={asRecord} onChange={update} />
          </Card>
          <Card title="তুলনামূলক টেবিল (ঐচ্ছিক)">
            <FieldRenderer fields={TREATMENT_FIELDS.table} value={asRecord} onChange={update} />
          </Card>
          <Card title="করণীয় ও বর্জনীয় (ঐচ্ছিক)">
            <FieldRenderer fields={TREATMENT_FIELDS.doAndDont} value={asRecord} onChange={update} />
          </Card>
        </div>
      </div>

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
