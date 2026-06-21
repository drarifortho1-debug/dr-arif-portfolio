"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Stethoscope, PhoneCall } from "lucide-react";

const navItems = [
  { label: "হোম", href: "/" },
  { label: "আমার সম্পর্কে", href: "/about" },
  { label: "চিকিৎসা সেবা", href: "/treatments" },
  { label: "ভিডিও গ্যালারি", href: "/videos" },
  // { label: "চেম্বার", href: "/chambers" },
  // { label: "স্বাস্থ্য টিপস", href: "/blogs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-100">
      {/* Centered Modern Container (Non-fixed / Scrolls with page) */}
      <div className="max-container">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Minimal Doctor Icon */}
          <Link
            href="/"
            className="flex items-center justify-center w-11 h-11 bg-teal-50 border border-teal-100 rounded-xl text-teal-700 transition-transform hover:scale-105"
            aria-label="হোমপেজ"
          >
            <Stethoscope className="w-5 h-5" />
          </Link>

          {/* Center Side: Main Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 rounded-xl hover:bg-slate-50 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side: CTA Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <a href="tel:+8801858405083" className="primary-btn">
                <PhoneCall className="w-4 h-4" />
                <span className="pt-0.5">কল করুন</span>
              </a>
            </div>

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
            onClick={() => setOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative bg-white ml-auto h-full w-full max-w-sm shadow-2xl flex flex-col p-6 transition-transform duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <span className="text-base font-bold text-slate-900">মেনু</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto py-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3.5 text-base font-medium text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-xl transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href="tel:+8801858405083"
                className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700 text-white px-5 py-4 rounded-xl text-base font-semibold shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>কল করুন</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
