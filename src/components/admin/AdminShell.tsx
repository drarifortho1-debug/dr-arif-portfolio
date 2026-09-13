"use client";

import {
  ExternalLink,
  FileText,
  Images,
  LayoutDashboard,
  LayoutPanelTop,
  LogOut,
  Menu,
  Newspaper,
  PanelBottom,
  PanelTop,
  Stethoscope,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useAdmin } from "./AdminProvider";
import { Button, Input, Label } from "./ui";

const NAV = [
  {
    group: "",
    items: [{ label: "ড্যাশবোর্ড", href: "/admin-panel", icon: LayoutDashboard, exact: true }],
  },
  {
    group: "কন্টেন্ট",
    items: [
      { label: "পেজসমূহ", href: "/admin-panel/pages", icon: LayoutPanelTop },
      { label: "চিকিৎসা পেজ", href: "/admin-panel/treatments", icon: Stethoscope },
      { label: "পোস্ট (ব্লগ)", href: "/admin-panel/posts", icon: Newspaper },
    ],
  },
  {
    group: "মেইন",
    items: [
      { label: "হেডার", href: "/admin-panel/header", icon: PanelTop },
      { label: "ফুটার", href: "/admin-panel/footer", icon: PanelBottom },
    ],
  },
  {
    group: "মিডিয়া",
    items: [
      { label: "মিডিয়া লাইব্রেরি", href: "/admin-panel/media", icon: FileText },
      { label: "গ্যালারি", href: "/admin-panel/gallery", icon: Images },
      { label: "ভিডিও", href: "/admin-panel/videos", icon: Video },
    ],
  },
];

function LoginScreen() {
  const { login } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "লগইন ব্যর্থ হয়েছে");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-premium border border-slate-100 p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900">ডা. আরিফ অর্থো</h1>
          <p className="text-sm text-slate-500 mt-1">অ্যাডমিন প্যানেল লগইন</p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label>ইমেইল ঠিকানা</Label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <Label>পাসওয়ার্ড</Label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" loading={busy} className="w-full py-3.5">
            লগইন করুন
          </Button>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAdmin();

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-800">
        <p className="text-white font-black text-lg tracking-tight">ডা. আরিফ অর্থো</p>
        <p className="text-slate-400 text-xs mt-0.5">অ্যাডমিন প্যানেল</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV.map((g) => (
          <div key={g.group || "root"}>
            {g.group && (
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {g.group}
              </p>
            )}
            <div className="space-y-0.5">
              {g.items.map((item) => {
                const active =
                  "exact" in item && item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${active ? "bg-blue-light text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          সাইট দেখুন
        </Link>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          লগআউট
        </button>
        {user?.email && (
          <p className="px-3 pt-2 text-[11px] text-slate-500 truncate">{user.email}</p>
        )}
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAdmin();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-light" />
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden lg:flex w-64 shrink-0 bg-slate-900 sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
          <aside className="relative w-72 max-w-[85%] h-full bg-slate-900 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="মেনু"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <span className="font-bold text-slate-900 text-sm">অ্যাডমিন প্যানেল</span>
          <span className="w-9" />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
