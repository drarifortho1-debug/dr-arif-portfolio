export default function StatsSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28 border-y border-slate-100 overflow-hidden">
      <div className="max-container">
        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Anchor */}
          <div className=" space-y-4 lg:sticky lg:top-8">
            <div className="inline-flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 text-sm font-bold tracking-wider">
              সেবার পরিসংখ্যান
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              সংখ্যার অন্তরালে <br />
              একেকটি সুস্থতার গল্প
            </h2>
          </div>

          {/* Right Content: Fixed Baseline and Vertical Line Gaps */}
          <div className="">
            <p className="text-xl md:text-2xl font-semibold text-slate-500 leading-[2.2] tracking-wide text-left">
              বিগত{" "}
              <span className="text-4xl  font-black text-slate-900 inline-flex items-center justify-center px-1 border-b-2 border-teal-500/20 translate-y-0.75">
                ৫+
              </span>{" "}
              বছরের নিবেদিত পথচলায় সফলভাবে সম্পন্ন হয়েছে{" "}
              <span className="text-4xl font-black text-teal-600 inline-flex items-center justify-center px-1 border-b-2 border-teal-500/20 translate-y-0.75">
                ৫০০০+
              </span>{" "}
              জটিল অর্থোপেডিক সার্জারি। সড়ক দুর্ঘটনাকবলিত ও জরুরি রোগীদের জন্য
              অত্যন্ত সুনামের সাথে করা হয়েছে{" "}
              <span className="text-4xl font-black text-slate-900 inline-flex items-center justify-center px-1 border-b-2 border-teal-500/20 translate-y-0.75">
                ১০০০+
              </span>{" "}
              ট্রমা অপারেশন। যার ফলশ্রুতিতে এ পর্যন্ত আধুনিক ও সঠিক পরামর্শ
              পেয়েছেন{" "}
              <span className="text-4xl  font-black text-emerald-600 inline-flex items-center justify-center px-1 border-b-2 border-teal-500/20 translate-y-0.75">
                ৫০,০০০+
              </span>{" "}
              এরও বেশি হাসিমুখ।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
