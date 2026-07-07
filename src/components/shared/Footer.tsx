import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/about-us" },
  { label: "চিকিৎসা সেবা", href: "/our-treatments" },
  { label: "ভিডিও গ্যালারি", href: "/our-videos" },
  { label: "স্বাস্থ্য টিপস", href: "/our-blogs" },
];

const socialLinks = [
  { label: "ফেসবুক", href: "#" },
  { label: "হোয়াটসঅ্যাপ", href: "https://wa.me/8801858405083" },
  { label: "ইউটিউব", href: "https://www.youtube.com/@Dr.GaziArifVelia1" },
];

const chambers = [
  {
    name: "কুমিল্লা ট্রমা সেন্টার",
    location:
      "রুম ৭০৬, ৭ম তলা (লিফট-৬), নতুন ভবন, রাণীর বাজার রোড, কান্দিরপাড়, কুমিল্লা",
    schedule: "শনিবার থেকে বুধবার (দুপুর ২:০০ — বিকেল ৫:০০)",
    phone: "+880 1612371696",
    phone2: "+880 1858405083",
  },
  {
    name: "পপূলার ডায়াগনস্টিক সেন্টার",
    location:
      "রুম ৫১২, ৫ম তলা (লিফট-৪), হাউজ নাম্বার ৫৭, লাকসাম রোড, রামঘাট, কান্দিরপাড়, কুমিল্লা",
    schedule: "শনিবার থেকে বুধবার (বিকেল ৫:০০ — রাত ৮:০০)",
    phone: "+880 1612371696",
    phone2: "+880 1858405083",
  },
  {
    name: "ডক্টর’স পয়েন্ট ডায়াগনস্টিক সেন্টার",
    location: "কালিকাপুর বাজার, বুড়িচং, কুমিল্লা",
    schedule: "শুধুমাত্র শুক্রবার (সকাল ৮:০০ — রাত ৮:০০)",
    phone: "+880 1612371696",
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/60 w-full">
      <div className="max-container pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4 space-y-4 text-left">
            <Image src="/logo-white.png" width={120} height={100} alt="LOGO"/>
            <h3 className="font-bold text-white  text-3xl tracking-tight">
              ডা. গাজী মোহাম্মদ <br /> আরিফুল ইসলাম (ভিলীয়া)
            </h3>
            <p className="text-sm font-bold text-blue-light uppercase tracking-widest">
              অর্থোপেডিক্স, ট্রমা, স্পোর্টস ও হ্যান্ড সার্জন
            </p>
            <div className="space-y-1 text-white/50 leading-relaxed">
              <p className="font-semibold text-white/70">
                এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী)
              </p>
              <p>বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU), ঢাকা</p>
              <p>সহকারী রেজিস্ট্রার — ক্যাজুয়ালটি বিভাগ, কুমিল্লা মেডিকেল কলেজ হাসপাতাল</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight size={16} /> {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:pl-8 text-left">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
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

          <div className="md:col-span-5 text-left">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
              চেম্বারসমূহ
            </h4>
            <div className="space-y-5">
              {chambers.map((chamber, index) => (
                <div
                  key={index}
                  className="space-y-0.5  font-medium text-white/50 border-l border-white/10 pl-3"
                >
                  <h5 className="text-white font-semibold">{chamber.name}</h5>
                  <p className=" w-8/12">{chamber.location}</p>
                  <p className="text-blue-light font-semibold">{chamber.schedule}</p>
                  <p className="text-white/70 font-bold">{chamber.phone}</p>
                  {chamber.phone2 && <p className="text-white/70 font-bold">{chamber.phone2}</p>}
                </div>
              ))}

           
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 font-medium">
            &copy; ২০২৬ ডা: আরিফ অর্থো। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
