import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "চিকিৎসা সেবা", href: "/treatments" },
  { label: "ভিডিও গ্যালারি", href: "/videos" },
  // { label: "ব্লগ", href: "/blogs" },
  // { label: "চেম্বার ও যোগাযোগ", href: "/chambers" },
];

const socialLinks = [
  { label: "ফেসবুক", href: "#" },
  { label: "হোয়াটসঅ্যাপ", href: "https://wa.me/8801858405083" },
  { label: "ইউটিউব", href: "#" },
];
const chambers = [
  {
    name: "কুমিল্লা ট্রমা সেন্টার",
    location: "ল্যাবএইড ডায়াগনস্টিক সংলগ্ন, কান্দিরপাড়, কুমিল্লা",
  },
  {
    name: "মেডিকেল সেন্টার",
    location: "নতুন বাজার মোড়, দ্বিতীয় শাখা, কুমিল্লা",
  },
  {
    name: "লাইফ কেয়ার হাসপাতাল",
    location: "টাউন হল এলাকা, কুমিল্লা",
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white/60 w-full">
      <div className="max-container pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* ১. ডাক্তার পরিচিতি (ডার্ক স্টাইল) */}
          <div className="md:col-span-5 space-y-4 text-left">
            <h3 className="font-bold text-white text-lg tracking-tight">
              ডা: গাজী মোহাম্মদ আরিফুল ইসলাম
            </h3>
            <p className="text-sm -mt-2 mb-5 font-bold text-teal-400 uppercase tracking-widest">
              অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন
            </p>
            <p className="text-sm text-white/50 font-medium leading-relaxed max-w-sm">
              আধুনিক ও উন্নত অর্থোপেডিক চিকিৎসা এবং নিখুঁত ট্রমা সার্জারির
              মাধ্যমে আপনার গতিময় ও ব্যথামুক্ত জীবন ফিরিয়ে আনাই আমাদের লক্ষ্য।
            </p>
            {/* সোশ্যাল লিংকস - আইকন ছাড়া */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ArrowUpRight size={18} /> {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ২. কুইক লিংকস */}
          <div className="md:col-span-3 md:pl-8 text-left">
            <h4 className="font-bold text-white mb-6  uppercase tracking-widest">
              গুরুত্বপূর্ণ লিংকস
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ৩. যোগাযোগ */}
          <div className="md:col-span-4 text-left">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest">
              চেম্বারসমূহ
            </h4>
            <div className="space-y-6">
              {chambers.map((chamber, index) => (
                <ul
                  key={index}
                  className="space-y-0.5 text-sm font-medium text-white/50"
                >
                  <li className="text-white font-semibold">{chamber.name}</li>
                  <li className=" text-white/40">{chamber.location}</li>
                </ul>
              ))}

              <div className="pt-2 space-y-1">
                <li className="text-white font-bold hover:text-teal-400 transition-colors list-none">
                  <a href="tel:+8801858405083">+৮৮০ ১৮৫৮৪০৫০৮৩</a>
                </li>
                <li className="hover:text-white transition-colors text-sm text-white/50 list-none">
                  <a href="mailto:info@drarifortho.com">info@drarifortho.com</a>
                </li>
              </div>
            </div>
          </div>
        </div>

        {/* নিচের পার্ট (ডার্ক থিম) */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50 font-medium">
            &copy; ২০২৬ ডা: আরিফ অর্থো। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
