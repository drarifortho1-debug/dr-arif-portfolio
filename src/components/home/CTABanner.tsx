import { Phone } from "lucide-react";
import Image from "next/image";
import { Badge } from "../shared/badge";

export default function CTABanner() {
  // হোয়াটসঅ্যাপের জন্য ডাইরেক্ট মেসেজ লিঙ্ক
  const whatsappNumber = "8801858405083";
  const whatsappMessage = encodeURIComponent(
    "আসসালামু আলাইকুম। আমি ডক্টর আরিফ ভেলিয়ার অ্যাপয়েন্টমেন্টের জন্য যোগাযোগ করছি।",
  );

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-light/10 via-slate-50 to-blue-dark/10 py-20 md:py-24 border-t border-b border-slate-100 w-full">
      {/* 💡 মডার্ন ব্যাকগ্রাউন্ড ডট-গ্রিড প্যাটার্ন (ডিজাইনকে প্রিমিয়াম লুক দেবে) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e0a_1px,transparent_1px),linear-gradient(to_bottom,#0f766e0a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none" />

      <div className="max-container relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20">
          {/* টেক্সট ব্লক */}
          <div className="space-y-4 max-w-2xl text-left">
            <Badge text="সরাসরি যোগাযোগ" />
            <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight leading-tight">
              আপনার সুস্থতাই আমাদের একমাত্র লক্ষ্য
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              হাড়, জোড়া বা মেরুদণ্ডের যেকোনো সমস্যায় আর কষ্ট না পেয়ে আজই দেশের
              অভিজ্ঞ অর্থোপেডিক বিশেষজ্ঞের সিরিয়াল বুক করুন।
            </p>
          </div>

          {/* অ্যাকশন বাটন গ্রুপ */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
            {/* ডাইরেক্ট কল বাটন */}
            <a
              href="tel:+8801858405083"
              className="inline-flex items-center justify-center gap-2.5 bg-blue-light hover:bg-blue-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-blue-light/10 hover:shadow-lg hover:shadow-blue-light/20 active:scale-95 text-center font-google-sans"
            >
              <Phone className="w-4 h-4 fill-white/10" />
              +8801858405083
            </a>

            {/* রিয়েল হোয়াটসঅ্যাপ কানেক্টর বাটন */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 text-white hover:bg-blue-dark bg-blue-dark px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 border border-blue-light/20 shadow-sm active:scale-95 text-center"
            >
              <Image
                src="/whatsapp.png"
                width={50}
                height={50}
                alt="Whatsapp Icon "
                className="size-6"
              />
              হোয়াটসঅ্যাপে বুক করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
