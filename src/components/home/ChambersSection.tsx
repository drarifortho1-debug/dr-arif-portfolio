import { ArrowUpRight, MapPin, Phone } from "lucide-react";

const chambers = [
  {
    name: "কুমিল্লা ট্রমা সেন্টার",
    address:
      "রুম ৭০৬, ৭ম তলা (লিফট-৬), নতুন ভবন, রাণীর বাজার রোড, কান্দিরপাড়, কুমিল্লা",
    time: "দুপুর ২:০০ — বিকেল ৫:০০",
    days: "শনিবার থেকে বুধবার",
    offDays: "বৃহস্পতি ও শুক্রবার বন্ধ",
    mapUrl: "#", // এখানে ট্রমা সেন্টারের গুগল ম্যাপ লিংক বসবে
  },
  {
    name: "পপূলার ডায়াগনস্টিক সেন্টার",
    address:
      "রুম ৫১২, হাউজ নাম্বার ৫৭, লাকসাম রোড, রামঘাট, কান্দিরপাড়, কুমিল্লা",
    time: "বিকেল ৫:০০ — রাত ৮:০০",
    days: "শনিবার থেকে বুধবার",
    offDays: "বৃহস্পতি ও শুক্রবার বন্ধ",
    mapUrl: "#", // এখানে পপুলারের গুগল ম্যাপ লিংক বসবে
  },
  {
    name: "ডক্টর’স পয়েন্ট ডায়াগনস্টিক সেন্টার",
    address: "কালিকাপুর বাজার, বুড়িচং, কুমিল্লা",
    time: "সকাল ৮:০০ — রাত ৮:০০",
    days: "শুধুমাত্র শুক্রবার খোলা",
    offDays: "সাপ্তাহিক বিশেষ চেম্বার",
    mapUrl: "#", // এখানে ডক্টর'স পয়েন্টের গুগল ম্যাপ লিংক বসবে
  },
];

export default function ChambersSection() {
  const mainPhone = "+8801612371696";
  const altPhone = "+8801858405083";

  return (
    <section className="bg-slate-50/50 py-24 md:py-32 border-t border-slate-100">
      <div className="max-container">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 mb-16 text-left">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 text-sm font-bold tracking-wider uppercase ">
              চেম্বার ও সময়সূচি
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              সরাসরি সাক্ষাৎ ও সিরিয়াল
            </h2>
          </div>
          <p className="text-base font-medium text-slate-500 max-w-xs md:text-right leading-relaxed text-left">
            রোগীদের সুবিধার্থে ৩টি ভিন্ন লোকেশনে এবং সুনির্দিষ্ট সময়ে চেম্বার
            পরিচালনা করা হচ্ছে।
          </p>
        </div>

        {/* 3-Column Premium Cards with Layout Fixes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {chambers.map((c, i) => (
            <div
              key={i}
              className="flex flex-col justify-between bg-white rounded-3xl border border-slate-200/60 p-7 min-h-95 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.06)] hover:shadow-[0_12px_30px_-6px_rgba(13,148,136,0.08)] hover:border-teal-500/20 transition-all duration-300 text-left"
            >
              <div className="space-y-7">
                {/* Chamber Name - Clean & Soft Bold */}
                <h3 className="text-xl  border-b pb-4 border-black/5 font-semibold text-slate-800 tracking-tight leading-snug">
                  {c.name}
                </h3>

                {/* Schedule Box - Minimalist Layout */}
                <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100/80 ">
                  <h5 className="font-semibold text-base text-slate-800">
                    {c.days}
                  </h5>
                  <p className=" text-slate-600">{c.time}</p>
                  <p className=" font-medium text-rose-600/90">{c.offDays}</p>
                </div>

                {/* Address - Subtle & Readable */}
                <div className="flex items-start gap-3 text-slate-500 font-medium pt-1">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {c.address}
                  </p>
                </div>
              </div>
              {/* Individual Map Button Inside Each Card */}
              <div className="pt-6 border-t border-slate-100 mt-8">
                <a
                  href={c.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60 rounded-xl py-3 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <span>গুগল ম্যাপে লোকেশন দেখুন</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Lower Fixed Section: Clean Number Buttons */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-[0_4px_20px_-4px_rgba(148,163,184,0.04)]">
          <div className="space-y-1 w-full md:w-auto">
            <h4 className="text-lg md:text-xl font-black text-slate-950 tracking-tight">
              সিরিয়াল ও বুকিং হটলাইন
            </h4>
            <p className="text-sm font-medium text-slate-500">
              সব চেম্বারের সিরিয়ালের জন্য নিচের যেকোনো নম্বরে ক্লিক করে কল করুন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <a
              href={`tel:${mainPhone}`}
              className="flex-1 sm:flex-initial bg-slate-900 hover:bg-teal-600 text-white text-center px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-200"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span className="font-sans">{mainPhone}</span>
            </a>
            <a
              href={`tel:${altPhone}`}
              className="flex-1 sm:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-900 text-center px-7 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 border border-slate-200/40"
            >
              <Phone className="w-4 h-4" />
              <span className="font-sans">{altPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
