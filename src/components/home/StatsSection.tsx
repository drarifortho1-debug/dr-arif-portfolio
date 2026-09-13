import { Badge } from "../shared/badge";
import { blockDefaults } from "@/lib/cms/blocks";

export interface StatsData {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  video: string;
  years: string;
  surgeries: string;
  trauma: string;
  patients: string;
}

function Num({ value }: { value: string }) {
  return (
    <span className="text-4xl font-black text-blue-light inline-flex items-center justify-center px-1 border-b-2 border-blue-light translate-y-0.75">
      {value}
    </span>
  );
}

export default function StatsSection({ data }: { data?: Partial<StatsData> }) {
  const d = { ...blockDefaults<StatsData>("stats"), ...data };

  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          src={d.video || "/intro-video.mp4"}
          muted
          autoPlay
          loop
          playsInline
          className="h-full w-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 py-20 md:py-50">
        <div className="max-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-4 lg:sticky lg:top-8 text-center lg:text-left">
              {d.badge && <Badge text={d.badge} />}
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                {d.headingLine1} <br />
                {d.headingLine2}
              </h2>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-xl md:text-2xl font-semibold text-slate-300 leading-[2.2] tracking-wide">
                বিগত <Num value={d.years} /> বছরের নিবেদিত পথচলায় সফলভাবে
                সম্পন্ন হয়েছে <Num value={d.surgeries} /> জটিল অর্থোপেডিক
                সার্জারি। সড়ক দুর্ঘটনাকবলিত ও জরুরি রোগীদের জন্য অত্যন্ত
                সুনামের সাথে করা হয়েছে <Num value={d.trauma} /> ট্রমা অপারেশন।
                যার ফলশ্রুতিতে এ পর্যন্ত আধুনিক ও সঠিক পরামর্শ পেয়েছেন{" "}
                <Num value={d.patients} /> এরও বেশি হাসিমুখ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
