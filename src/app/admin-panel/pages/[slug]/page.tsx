"use client";

import SectionEditor from "@/components/admin/SectionEditor";
import { EmptyState, Spinner } from "@/components/admin/ui";
import { PAGE_META } from "@/lib/cms/defaults";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const builtIn = PAGE_META.some((p) => p.slug === slug);
  const [exists, setExists] = useState<boolean | null>(builtIn ? true : null);

  useEffect(() => {
    if (builtIn) return;
    getDoc(doc(db, "pages", slug))
      .then((snap) => setExists(snap.exists() && snap.data()?.custom === true))
      .catch(() => setExists(false));
  }, [builtIn, slug]);

  if (exists === null) return <Spinner />;

  if (!exists) {
    return (
      <EmptyState
        title="পেজ পাওয়া যায়নি"
        action={
          <Link href="/admin-panel/pages" className="text-sm font-bold text-blue-light">
            ← পেজ তালিকায় ফিরুন
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <Link
        href="/admin-panel/pages"
        className="inline-block text-xs font-bold text-slate-500 hover:text-blue-light mb-4"
      >
        ← সব পেজ
      </Link>
      <SectionEditor slug={slug} />
    </div>
  );
}
