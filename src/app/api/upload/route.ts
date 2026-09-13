import { adminAuth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(req: Request) {
  const key = process.env.IMGBB_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "IMGBB_API_KEY is not configured on the server" },
      { status: 500 },
    );
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await adminAuth.verifyIdToken(token);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  let file: File | null = null;
  try {
    const form = await req.formData();
    const entry = form.get("file");
    if (entry instanceof File) file = entry;
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only images are allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 413 });
  }

  const upstream = new FormData();
  upstream.append("image", file, file.name || "image");
  if (file.name) {
    upstream.append("name", file.name.replace(/\.[^.]+$/, "").slice(0, 100));
  }

  let json: {
    success?: boolean;
    data?: {
      url?: string;
      display_url?: string;
      delete_url?: string;
      size?: number | string;
      image?: { mime?: string; name?: string };
    };
    error?: { message?: string };
  };
  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, {
      method: "POST",
      body: upstream,
    });
    json = await res.json();
    if (!res.ok || !json.success || !json.data?.url) {
      return NextResponse.json(
        { error: json.error?.message ?? "ImgBB upload failed" },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[upload] imgbb request failed", err);
    return NextResponse.json({ error: "ImgBB unreachable" }, { status: 502 });
  }

  return NextResponse.json({
    url: json.data.url,
    deleteUrl: json.data.delete_url ?? "",
    size: Number(json.data.size) || file.size,
    contentType: json.data.image?.mime || file.type,
    name: file.name || json.data.image?.name || "image",
  });
}
