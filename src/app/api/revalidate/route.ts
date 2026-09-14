import { adminAuth, adminConfigError } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const ALLOWED_PREFIXES = ["/", "/about-us", "/our-treatments", "/our-videos", "/our-blogs"];

export async function POST(req: Request) {
  if (adminConfigError) {
    return NextResponse.json({ error: adminConfigError }, { status: 500 });
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

  let paths: string[] = [];
  try {
    const body = (await req.json()) as { paths?: string[] };
    paths = Array.isArray(body.paths) ? body.paths : [];
  } catch {
    paths = [];
  }

  const safe = paths.filter(
    (p) =>
      typeof p === "string" &&
      p.startsWith("/") &&
      ALLOWED_PREFIXES.some((prefix) => p === prefix || p.startsWith(prefix + "/")),
  );

  if (safe.length === 0) safe.push("/");

  for (const p of safe) {
    revalidatePath(p, "layout");
  }

  return NextResponse.json({ revalidated: safe });
}
