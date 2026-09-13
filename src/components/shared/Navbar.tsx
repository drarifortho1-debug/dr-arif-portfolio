"use client";

import { DEFAULT_HEADER } from "@/lib/cms/defaults";
import type { HeaderSettings } from "@/lib/cms/types";
import { ChevronDown, Menu, Phone, PhoneCall, X } from "lucide-react";
import Image from "@/components/shared/SafeImage";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({
  settings,
}: {
  settings?: HeaderSettings;
}) {
  const h = settings ?? DEFAULT_HEADER;
  const navItems = h.navItems.filter((i) => i.enabled !== false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  // Close the desktop dropdown on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
    setOpenMobileMenu(null);
  };

  return (
    <header className="relative z-40 w-full bg-white border-b border-slate-100">
      {/* Centered Modern Container (Non-fixed / Scrolls with page) */}
      <div className="max-container">
        <div className="flex items-center justify-between h-22">
          {/* Left Side: Minimal Doctor Icon */}
          <Link href="/" className="" aria-label="হোমপেজ">
            <Image
              className="w-auto h-14"
              src={h.logo || "/logo.png"}
              width={130}
              height={100}
              alt={h.logoAlt || "Logo"}
            />
          </Link>

          {/* Center Side: Main Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children && item.children.length > 0 ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.href)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(openMenu === item.href ? null : item.href)
                    }
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.href}
                    className="flex items-center gap-1 px-3 py-2 text-[15px] font-semibold text-blue-dark hover:text-blue-light rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                  >
                    {item.label}
                    <ChevronDown
                      className={
                        "w-4 h-4 transition-transform duration-200 " +
                        (openMenu === item.href ? "rotate-180" : "")
                      }
                    />
                  </button>

                  {openMenu === item.href && (
                    <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                      <div className="w-[620px] rounded-2xl border border-slate-100 bg-white p-3 shadow-xl shadow-slate-200/60">
                        <div className="grid grid-cols-2 gap-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeAll}
                              className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                            >
                              <span className="block text-[14px] font-semibold text-blue-dark group-hover:text-blue-light">
                                {child.label}
                              </span>
                              <span className="mt-0.5 block text-[12px] leading-snug text-slate-500">
                                {child.desc}
                              </span>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-2 border-t border-slate-100 pt-2">
                          <Link
                            href={item.href}
                            onClick={closeAll}
                            className="block rounded-xl px-3 py-2.5 text-[14px] font-semibold text-blue-light transition-colors hover:bg-slate-50"
                          >
                            সব চিকিৎসা সেবা দেখুন
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-[15px]  font-semibold text-blue-dark hover:text-blue-light rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Side: CTA Button */}
          <div className="flex items-center gap-2">
            {h.showCta && (
              <div className="hidden lg:flex items-center">
                <a href={`tel:${h.ctaPhone}`} className="primary-btn">
                  <PhoneCall className="w-4 h-4" />
                  <span className="pt-0.5">{h.ctaLabel}</span>
                </a>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
              aria-label="মেনু খুলুন"
            >
              <Menu className=" text-slate-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Modern Slide-over Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity duration-300"
            onClick={closeAll}
          />

          {/* Drawer Sheet */}
          <div className="relative bg-white ml-auto h-full w-full max-w-sm shadow-2xl flex flex-col p-6 transition-transform duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <span className="text-base font-bold text-slate-900">মেনু</span>
              <button
                onClick={closeAll}
                className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto py-6 space-y-1">
              {navItems.map((item) =>
                item.children && item.children.length > 0 ? (
                  <div key={item.href}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileMenu(
                          openMobileMenu === item.href ? null : item.href
                        )
                      }
                      aria-expanded={openMobileMenu === item.href}
                      className="flex w-full items-center justify-between px-4 py-3.5 text-base font-medium text-slate-600 hover:text-blue-light hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                    >
                      {item.label}
                      <ChevronDown
                        className={
                          "w-4 h-4 transition-transform duration-200 " +
                          (openMobileMenu === item.href ? "rotate-180" : "")
                        }
                      />
                    </button>

                    {openMobileMenu === item.href && (
                      <div className="mt-1 ml-3 space-y-0.5 border-l border-slate-100 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeAll}
                            className="block rounded-xl px-4 py-2.5 text-[15px] text-slate-600 hover:text-blue-light hover:bg-slate-50 transition-all"
                          >
                            {child.label}
                          </Link>
                        ))}
                        <Link
                          href={item.href}
                          onClick={closeAll}
                          className="block rounded-xl px-4 py-2.5 text-[15px] font-semibold text-blue-light hover:bg-slate-50 transition-all"
                        >
                          সব চিকিৎসা সেবা দেখুন
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className="block px-4 py-3.5 text-base font-medium text-slate-600 hover:text-blue-light hover:bg-slate-50 rounded-xl transition-all"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Mobile CTA */}
            {h.showCta && (
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`tel:${h.ctaPhone}`}
                  className="primary-btn w-full justify-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>{h.ctaLabel}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
