"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import FieldRenderer from "@/components/admin/FieldRenderer";
import { Button, Card, PageHeader, Spinner } from "@/components/admin/ui";
import { loadHeader, resetSiteDoc, saveHeader } from "@/lib/cms/client";
import type { Field, HeaderSettings } from "@/lib/cms/types";
import { RotateCcw, Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const BRAND_FIELDS: Field[] = [
  { key: "logo", label: "লোগো", type: "image" },
  { key: "logoAlt", label: "লোগোর বিকল্প টেক্সট", type: "text" },
];

const CTA_FIELDS: Field[] = [
  { key: "showCta", label: "কল বাটন দেখাবেন?", type: "boolean" },
  { key: "ctaLabel", label: "বাটন টেক্সট", type: "text" },
  { key: "ctaPhone", label: "ফোন নম্বর", type: "tel" },
];

const NAV_FIELDS: Field[] = [
  {
    key: "navItems",
    label: "মেনু আইটেম",
    type: "list",
    itemLabel: "মেনু",
    help: "ড্রপডাউন সাব-মেনু থাকলে নিচে সাব-লিংক যুক্ত করুন",
    fields: [
      { key: "label", label: "লেবেল", type: "text" },
      { key: "href", label: "লিংক", type: "text", placeholder: "/about-us" },
      { key: "enabled", label: "মেনুতে দেখাবেন?", type: "boolean" },
      {
        key: "autoChildren",
        label: "সাব-মেনু চিকিৎসা পেজ থেকে স্বয়ংক্রিয়ভাবে নিন",
        type: "boolean",
        help: "চালু থাকলে নিচের সাব-মেনু তালিকা উপেক্ষা করে সব সক্রিয় চিকিৎসা পেজ দেখাবে",
      },
      {
        key: "children",
        label: "সাব-মেনু (ড্রপডাউন)",
        type: "list",
        itemLabel: "সাব-লিংক",
        fields: [
          { key: "label", label: "লেবেল", type: "text" },
          { key: "desc", label: "ছোট বিবরণ", type: "text" },
          { key: "href", label: "লিংক", type: "text" },
        ],
      },
    ],
  },
];

export default function HeaderPage() {
  const { toast } = useAdmin();
  const [data, setData] = useState<HeaderSettings | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await loadHeader());
      setDirty(false);
    } catch (err) {
      console.error(err);
      toast("লোড করা যায়নি", "error");
    }
  }, [toast]);

  useEffect(() => {
    let active = true;
    loadHeader()
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
    setData((d) => ({ ...(d as HeaderSettings), ...next }));
    setDirty(true);
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await saveHeader(data);
      setDirty(false);
      toast("হেডার সেভ ও পাবলিশ হয়েছে");
    } catch (err) {
      console.error(err);
      toast("সেভ করা যায়নি", "error");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!confirm("হেডার ডিফল্টে ফিরিয়ে আনবেন?")) return;
    setSaving(true);
    try {
      await resetSiteDoc("header");
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
        title="হেডার"
        description="লোগো, নেভিগেশন মেনু ও কল বাটন"
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
          <Card title="ব্র্যান্ডিং">
            <FieldRenderer fields={BRAND_FIELDS} value={asRecord} onChange={update} />
          </Card>
          <Card title="কল বাটন">
            <FieldRenderer fields={CTA_FIELDS} value={asRecord} onChange={update} />
          </Card>
        </div>
        <Card title="নেভিগেশন মেনু" description="মেনু আইটেম সাজান, লুকান বা নতুন যুক্ত করুন">
          <FieldRenderer fields={NAV_FIELDS} value={asRecord} onChange={update} />
        </Card>
      </div>
    </div>
  );
}
