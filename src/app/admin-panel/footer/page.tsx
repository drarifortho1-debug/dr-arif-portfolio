"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import FieldRenderer from "@/components/admin/FieldRenderer";
import { Button, Card, PageHeader, Spinner } from "@/components/admin/ui";
import { loadFooter, resetSiteDoc, saveFooter } from "@/lib/cms/client";
import type { Field, FooterSettings } from "@/lib/cms/types";
import { RotateCcw, Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const linkFields: Field[] = [
  { key: "label", label: "লেবেল", type: "text" },
  { key: "href", label: "লিংক", type: "text" },
];

const BRAND_FIELDS: Field[] = [
  { key: "logo", label: "লোগো (সাদা)", type: "image" },
  { key: "name", label: "নাম", type: "text" },
  { key: "tagline", label: "ট্যাগলাইন", type: "text" },
  { key: "degrees", label: "ডিগ্রি", type: "text" },
  { key: "university", label: "বিশ্ববিদ্যালয়", type: "text" },
  { key: "position", label: "পদবি", type: "text" },
  { key: "copyright", label: "কপিরাইট টেক্সট", type: "text" },
];

const SOCIAL_FIELDS: Field[] = [
  { key: "socialLinks", label: "সোশ্যাল লিংক", type: "list", itemLabel: "লিংক", fields: linkFields },
];

const LINKS_FIELDS: Field[] = [
  { key: "quickLinksTitle", label: "কুইক লিংক শিরোনাম", type: "text" },
  { key: "quickLinks", label: "কুইক লিংক", type: "list", itemLabel: "লিংক", fields: linkFields },
  { key: "legalTitle", label: "আইনি শিরোনাম", type: "text" },
  { key: "legalLinks", label: "আইনি লিংক", type: "list", itemLabel: "লিংক", fields: linkFields },
];

const CHAMBER_FIELDS: Field[] = [
  { key: "chambersTitle", label: "চেম্বার শিরোনাম", type: "text" },
  {
    key: "chambers",
    label: "চেম্বার তালিকা",
    type: "list",
    itemLabel: "চেম্বার",
    fields: [
      { key: "name", label: "নাম", type: "text" },
      { key: "location", label: "ঠিকানা", type: "textarea" },
      { key: "schedule", label: "সময়সূচি", type: "text" },
      { key: "phone", label: "ফোন", type: "tel" },
      { key: "phone2", label: "দ্বিতীয় ফোন (ঐচ্ছিক)", type: "tel" },
    ],
  },
];

export default function FooterPage() {
  const { toast } = useAdmin();
  const [data, setData] = useState<FooterSettings | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await loadFooter());
      setDirty(false);
    } catch (err) {
      console.error(err);
      toast("লোড করা যায়নি", "error");
    }
  }, [toast]);

  useEffect(() => {
    let active = true;
    loadFooter()
      .then((d) => {
        if (active) {
          setData(d);
          setDirty(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast("লোড করা যায়নি", "error");
      });
    return () => {
      active = false;
    };
  }, [toast]);

  const update = (next: Record<string, unknown>) => {
    setData((d) => ({ ...(d as FooterSettings), ...next }));
    setDirty(true);
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await saveFooter(data);
      setDirty(false);
      toast("ফুটার সেভ ও পাবলিশ হয়েছে");
    } catch (err) {
      console.error(err);
      toast("সেভ করা যায়নি", "error");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!confirm("ফুটার ডিফল্টে ফিরিয়ে আনবেন?")) return;
    setSaving(true);
    try {
      await resetSiteDoc("footer");
      await load();
      toast("ডিফল্টে ফিরিয়ে আনা হয়েছে");
    } catch (err) {
      console.error(err);
      toast("রিসেট করা যায়নি", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <Spinner />;

  const asRecord = data as unknown as Record<string, unknown>;

  return (
    <div>
      <PageHeader
        title="ফুটার"
        description="পরিচিতি, লিংক, চেম্বার ও কপিরাইট"
        actions={
          <>
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
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="space-y-5">
          <Card title="পরিচিতি">
            <FieldRenderer fields={BRAND_FIELDS} value={asRecord} onChange={update} />
          </Card>
          <Card title="সোশ্যাল লিংক">
            <FieldRenderer fields={SOCIAL_FIELDS} value={asRecord} onChange={update} />
          </Card>
        </div>
        <div className="space-y-5">
          <Card title="লিংকসমূহ">
            <FieldRenderer fields={LINKS_FIELDS} value={asRecord} onChange={update} />
          </Card>
          <Card title="চেম্বারসমূহ">
            <FieldRenderer fields={CHAMBER_FIELDS} value={asRecord} onChange={update} />
          </Card>
        </div>
      </div>
    </div>
  );
}
