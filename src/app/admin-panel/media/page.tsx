"use client";

import MediaLibrary from "@/components/admin/MediaLibrary";
import { PageHeader } from "@/components/admin/ui";

export default function MediaPage() {
  return (
    <div>
      <PageHeader
        title="মিডিয়া লাইব্রেরি"
        description="ছবি আপলোড করুন, লিংক কপি করুন বা মুছে ফেলুন — সব সেকশন থেকে এখান থেকে ছবি বাছাই করা যাবে"
      />
      <MediaLibrary />
    </div>
  );
}
