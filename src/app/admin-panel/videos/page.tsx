"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { Button, Card, EmptyState, Input, PageHeader, Spinner } from "@/components/admin/ui";
import { revalidate } from "@/lib/cms/client";
import { db } from "@/lib/firebase";
import { getYouTubeId } from "@/lib/youtube";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { Plus, Trash2, Video } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface VideoDoc {
  id: string;
  videoId: string;
}

export default function VideosPage() {
  const { toast } = useAdmin();
  const [items, setItems] = useState<VideoDoc[] | null>(null);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(query(collection(db, "videos"), orderBy("createdAt", "desc")));
      setItems(snap.docs.map((d) => ({ id: d.id, videoId: d.data().videoId })));
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getDocs(query(collection(db, "videos"), orderBy("createdAt", "desc")))
      .then((snap) => {
        if (active) setItems(snap.docs.map((d) => ({ id: d.id, videoId: d.data().videoId })));
      })
      .catch((err) => {
        console.error(err);
        if (active) setItems([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = getYouTubeId(url);
    if (!videoId) {
      toast("সঠিক ইউটিউব লিংক দিন", "error");
      return;
    }
    if (items?.some((v) => v.videoId === videoId)) {
      toast("এই ভিডিওটি আগেই যুক্ত আছে", "error");
      return;
    }
    setBusy(true);
    try {
      await addDoc(collection(db, "videos"), { videoId, createdAt: serverTimestamp() });
      await revalidate(["/", "/our-videos"]);
      toast("ভিডিও যুক্ত হয়েছে");
      setUrl("");
      load();
    } catch (err) {
      console.error(err);
      toast("যুক্ত করা যায়নি", "error");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (v: VideoDoc) => {
    if (!confirm("এই ভিডিওটি সরাবেন?")) return;
    try {
      await deleteDoc(doc(db, "videos", v.id));
      await revalidate(["/", "/our-videos"]);
      setItems((l) => (l ? l.filter((x) => x.id !== v.id) : l));
      toast("ভিডিও সরানো হয়েছে");
    } catch (err) {
      console.error(err);
      toast("সরানো যায়নি", "error");
    }
  };

  return (
    <div>
      <PageHeader title="ভিডিও" description="ইউটিউব ভিডিও — হোম ও ভিডিও গ্যালারি পেজে দেখাবে" />
      <Card title="নতুন ভিডিও যুক্ত করুন" className="mb-5">
        <form onSubmit={add} className="flex flex-col sm:flex-row gap-3">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
          <Button type="submit" loading={busy} className="shrink-0">
            <Plus className="w-4 h-4" />
            যুক্ত করুন
          </Button>
        </form>
      </Card>
      {items === null ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState icon={<Video className="w-10 h-10" />} title="কোনো ভিডিও নেই" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((v) => (
            <div
              key={v.id}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden"
            >
              <div className="relative aspect-video bg-slate-900">
                <Image
                  src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <a
                  href={`https://youtube.com/watch?v=${v.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-slate-500 hover:text-blue-light truncate"
                >
                  {v.videoId}
                </a>
                <button
                  type="button"
                  onClick={() => remove(v)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                  title="সরান"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
