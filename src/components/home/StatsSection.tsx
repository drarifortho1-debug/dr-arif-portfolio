import { Badge } from "../shared/badge";

export default function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      {/* ব্যাকগ্রাউন্ড ভিডিও কন্টেইনার */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          src="/intro-video.mp4"
          muted
          autoPlay
          loop
          playsInline
          className="h-full w-full object-cover" // object-cover এর কারণে ভিডিওটি স্ট্রেচ না হয়ে পুরো স্ক্রিন কভার করবে
        ></video>

        {/* ডার্ক ওভারলে (Overlay): এটি ভিডিওর ওপর একটি হালকা কালো আস্তরণ দেবে যেন টেক্সট সহজে পড়া যায় */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="relative z-10 py-20 md:py-50">
        <div className="max-container">
          {/* মেইন গ্রিড লেআউট */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* বাম পাশ (Left Anchor) */}
            <div className="space-y-4 lg:sticky lg:top-8 text-center lg:text-left">
           
              <Badge text="সেবার পরিসংখ্যান" />
              {/* ভিডিওর ওপর ফুটিয়ে তোলার জন্য টেক্সট কালার text-white করা হয়েছে */}
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                সংখ্যার অন্তরালে <br />
                একেকটি সুস্থতার গল্প
              </h2>
            </div>

            {/* ডান পাশ (Right Content) */}
            <div className="text-center lg:text-left">
              {/* ভিডিওর ওপর ফুটিয়ে তোলার জন্য মূল টেক্সট কালার text-slate-300 করা হয়েছে */}
              <p className="text-xl md:text-2xl font-semibold text-slate-300 leading-[2.2] tracking-wide">
                বিগত{" "}
                <span className="text-4xl font-black text-white inline-flex items-center justify-center px-1 border-b-2 border-teal-400/40 translate-y-0.75">
                  ৫+
                </span>{" "}
                বছরের নিবেদিত পথচলায় সফলভাবে সম্পন্ন হয়েছে{" "}
                <span className="text-4xl font-black text-teal-400 inline-flex items-center justify-center px-1 border-b-2 border-teal-400/40 translate-y-0.75">
                  ৫০০০+
                </span>{" "}
                জটিল অর্থোপেডিক সার্জারি। সড়ক দুর্ঘটনাকবলিত ও জরুরি রোগীদের
                জন্য অত্যন্ত সুনামের সাথে করা হয়েছে{" "}
                <span className="text-4xl font-black text-blue-light inline-flex items-center justify-center px-1 border-b-2 border-blue-light translate-y-0.75">
                  ১০০০+
                </span>{" "}
                ট্রমা অপারেশন। যার ফলশ্রুতিতে এ পর্যন্ত আধুনিক ও সঠিক পরামর্শ
                পেয়েছেন{" "}
                <span className="text-4xl font-black text-emerald-400 inline-flex items-center justify-center px-1 border-b-2 border-teal-400/40 translate-y-0.75">
                  ৫০,০০০+
                </span>{" "}
                এরও বেশি হাসিমুখ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
