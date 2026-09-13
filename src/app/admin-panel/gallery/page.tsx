"use client";

import { useAdmin } from "@/components/admin/AdminProvider";
import { Button, Card, EmptyState, PageHeader, Spinner } from "@/components/admin/ui";
import { revalidate, uploadMedia } from "@/lib/cms/client";
import { db } from "@/lib/firebase";
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
import { Images, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface GalleryImage {
  id: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const { toast } = useAdmin();
  const [items, setItems] = useState<GalleryImage[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(query(collection(db, "gallery"), orderBy("createdAt", "desc")));
      setItems(snap.docs.map((d) => ({ id: d.id, imageUrl: d.data().imageUrl })));
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getDocs(query(collection(db, "gallery"), orderBy("createdAt", "desc")))
      .then((snap) => {
        if (active) setItems(snap.docs.map((d) => ({ id: d.id, imageUrl: d.data().imageUrl })));
      })
      .catch((err) => {
        console.error(err);
        if (active) setItems([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const upload = async (files: FileList) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) return;
    setBusy(true);
    let ok = 0;
    for (let i = 0; i < list.length; i++) {
      setProgress(`${i + 1}/${list.length} আপলোড হচ্ছে...`);
      try {
        const media = await uploadMedia(list[i]);
        await addDoc(collection(db, "gallery"), {
          imageUrl: media.url,
          mediaId: media.id,
          createdAt: serverTimestamp(),
        });
        ok++;
      } catch (err) {
        console.error(err);
        toast(`${list[i].name} আপলোড ব্যর্থ`, "error");
      }
    }
    setProgress("");
    setBusy(false);
    if (ok > 0) {
      toast(`${ok}টি ছবি গ্যালারিতে যুক্ত হয়েছে`);
      await revalidate(["/about-us", "/"]);
      load();
    }
  };

  const remove = async (item: GalleryImage) => {
    if (!confirm("এই ছবিটি গ্যালারি থেকে সরাবেন?")) return;
    try {
      await deleteDoc(doc(db, "gallery", item.id));
      await revalidate(["/about-us", "/"]);
      setItems((l) => (l ? l.filter((x) => x.id !== item.id) : l));
      toast("ছবি সরানো হয়েছে");
    } catch (err) {
      console.error(err);
      toast("সরানো যায়নি", "error");
    }
  };

  return (
    <div>
      <PageHeader
        title="গ্যালারি"
        description="“আমার সম্পর্কে” পেজ ও গ্যালারি সেকশনে দেখানো ছবি"
        actions={
          <Button onClick={() => fileInput.current?.click()} loading={busy}>
            <UploadCloud className="w-4 h-4" />
            {progress || "ছবি আপলোড"}
          </Button>
        }
      />
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => e.target.files && upload(e.target.files)}
      />
      {items === null ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState
          icon={<Images className="w-10 h-10" />}
          title="গ্যালারিতে কোনো ছবি নেই"
          action={
            <Button onClick={() => fileInput.current?.click()}>
              <UploadCloud className="w-4 h-4" />
              ছবি আপলোড করুন
            </Button>
          }
        />
      ) : (
        <Card>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
              >
                <Image src={item.imageUrl} alt="" fill className="object-cover" sizes="200px" unoptimized />
                <button
                  type="button"
                  onClick={() => remove(item)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                  title="সরান"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
