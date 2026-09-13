"use client";

import { createPage } from "@/lib/cms/client";
import { slugError } from "@/lib/cms/defaults";
import { slugify } from "@/lib/slug";
import { useState } from "react";
import { Button, Input, Label, Modal } from "./ui";

export default function NewPageModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (slug: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveSlug = touched ? slug : slugify(title);
  const validation = effectiveSlug ? slugError(effectiveSlug) : null;

  const reset = () => {
    setTitle("");
    setSlug("");
    setTouched(false);
    setError(null);
  };

  const submit = async () => {
    if (!title.trim()) {
      setError("পেজের নাম দিন");
      return;
    }
    const problem = slugError(effectiveSlug);
    if (problem) {
      setError(problem);
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await createPage(effectiveSlug, title.trim());
      reset();
      onCreated(effectiveSlug);
    } catch (err) {
      setError(err instanceof Error ? err.message : "পেজ তৈরি করা যায়নি");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="নতুন পেজ"
    >
      <div className="space-y-4">
        <div>
          <Label>পেজের নাম</Label>
          <Input
            value={title}
            placeholder="যেমন: আমাদের সেবা"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label help="এটিই পেজের ঠিকানা হবে">স্লাগ</Label>
          <Input
            value={effectiveSlug}
            placeholder="amader-seba"
            onChange={(e) => {
              setTouched(true);
              setSlug(slugify(e.target.value));
            }}
          />
          <p className="mt-1.5 text-xs text-slate-400 font-mono">
            /{effectiveSlug || "..."}
          </p>
          {validation && (
            <p className="mt-1.5 text-xs font-semibold text-amber-700">{validation}</p>
          )}
        </div>

        {error && (
          <p className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-2.5">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <Button
            variant="secondary"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            বাতিল
          </Button>
          <Button onClick={submit} disabled={saving || !title.trim() || !!validation}>
            {saving ? "তৈরি হচ্ছে…" : "তৈরি করুন"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
