import {
  CalendarCheck,
  ChevronsRight,
  GraduationCap,
  Hospital,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../shared/badge";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-14 md:pt-20 pb-28">
      <div className="max-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-4 items-center">
          <div className="lg:col-span-7 space-y-8 text-center md:text-left">
            <Badge text="অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন" />

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-[56px]  font-extrabold text-blue-dark tracking-tight leading-[1.15]">
                ডা. গাজী মোহাম্মদ <br />
                <span className="text-blue-light">আরিফুল ইসলাম (ভিলীয়া)</span>
              </h1>
              <p className="text-lg md:text-xl font-bold text-slate-700"></p>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start justify-center md:justify-start gap-3">
                <GraduationCap className="w-5 h-5 text-blue-light shrink-0 mt-0.5 hidden md:block" />
                <div className="text-sm md:text-base space-y-0.5">
                  <p className="font-bold text-blue-dark">
                    এমবিবিএস, বিসিএস, এমএস (অর্থোপেডিক্স সার্জারী)
                  </p>
                  <p className="text-slate-600">
                    বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU), ঢাকা
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-center md:justify-start gap-3 text-slate-600">
                <Hospital className="w-5 h-5 text-blue-light shrink-0 mt-0.5 hidden md:block" />
                <div className="text-sm md:text-base space-y-0.5">
                  <p className="text-blue-dark font-bold">
                    সহকারী রেজিস্ট্রার — ক্যাজুয়ালটি বিভাগ
                  </p>
                  <p className="text-slate-600">
                    কুমিল্লা মেডিকেল কলেজ হাসপাতাল
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <a href="tel:+8801858405083" className="primary-btn">
                <CalendarCheck className="w-4 h-4" />
                <span className="pt-0.5">অ্যাপয়েন্টমেন্ট নিন</span>
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-500 px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border border-slate-200/80 active:scale-98"
              >
                <span className="pt-0.5">আরও জানুন</span>
                <ChevronsRight size={18} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end relative ">
            <div className="relative w-full max-w-[94%]  mr-auto md:mx-auto md:max-w-100 aspect-3/4 group">
              <div className="absolute inset-0 bg-blue-light rounded-4xl transform -translate-x-2 translate-y-2 -rotate-3 group-hover:rotate-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out" />

              <div className="absolute inset-0 bg-slate-100  rounded-4xl overflow-hidden border-4 border-white p-4 shadow-xl shadow-slate-950/10">
                <Image
                  width={500}
                  height={500}
                  src="/doctor-img.png"
                  alt="ডা. গাজী মোহাম্মদ আরিফুল ইসলাম"
                  className="w-full relative -bottom-4 h-full object-cover object-bottom filter contrast-[1.02] saturate-[1.02]  transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
              </div>

              <div className="absolute -bottom-8 -right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 px-5 py-4 rounded-2xl shadow-2xl  shadow-slate-blue-light flex items-center gap-4 max-w-52.5 group/badge hover:border-teal-200 transition-colors duration-300">
                <div className="space-y-0.5">
                  <p className="text-sm font-black text-slate-900 leading-tight tracking-wide">
                    তিনটি চেম্বারে
                  </p>
                  <p className="text-sm font-bold text-slate-500 leading-tight">
                    নিয়মিত রোগী দেখছেন
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
