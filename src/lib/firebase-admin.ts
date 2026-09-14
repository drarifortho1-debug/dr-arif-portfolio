import { createRequire } from "node:module";
import path from "node:path";
import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

const REQUIRED = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"] as const;

const nodeRequire = createRequire(path.join(process.cwd(), "index.js"));

function initialize(): { app: App; error: null } | { app: null; error: string } {
  const missing = REQUIRED.filter((name) => !process.env[name]?.trim());
  if (missing.length > 0) {
    return {
      app: null,
      error: `Firebase Admin is not configured: ${missing.join(", ")} ${missing.length === 1 ? "is" : "are"} not set in this environment`,
    };
  }

  try {
    const { cert, getApps, initializeApp } = nodeRequire(
      "firebase-admin/app",
    ) as typeof import("firebase-admin/app");

    const existing = getApps()[0];
    if (existing) return { app: existing, error: null };

    const app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      }),
    });
    return { app, error: null };
  } catch (err) {
    const reason = (err instanceof Error ? err.message : String(err)).replace(/\.\s*$/, "");
    return {
      app: null,
      error: `Firebase Admin failed to initialise: ${reason}. Check FIREBASE_PRIVATE_KEY is the full key without surrounding quotes.`,
    };
  }
}

const state = initialize();

export const adminConfigError: string | null = state.error;

function unavailable<T extends object>(): T {
  return new Proxy({} as T, {
    get(_target, prop) {
      if (typeof prop === "symbol" || prop === "then") return undefined;
      throw new Error(adminConfigError ?? "Firebase Admin is unavailable");
    },
  });
}

function load<T extends object>(subpath: string, get: (mod: never) => T): T {
  if (!state.app) return unavailable<T>();
  try {
    return get(nodeRequire(`firebase-admin/${subpath}`) as never);
  } catch {
    return unavailable<T>();
  }
}

export const adminDb: Firestore = load<Firestore>("firestore", (mod) =>
  (mod as unknown as typeof import("firebase-admin/firestore")).getFirestore(state.app!),
);

export const adminAuth: Auth = load<Auth>("auth", (mod) =>
  (mod as unknown as typeof import("firebase-admin/auth")).getAuth(state.app!),
);

if (adminConfigError) {
  console.error(`[firebase-admin] ${adminConfigError}`);
}
