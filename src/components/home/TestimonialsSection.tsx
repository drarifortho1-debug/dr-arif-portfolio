"use client";

import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { blockDefaults } from "@/lib/cms/blocks";

import "swiper/css";

export interface TestimonialItem {
  text: string;
  name: string;
  address: string;
}

export interface TestimonialsData {
  badge: string;
  heading: string;
  items: TestimonialItem[];
}

export default function TestimonialsSection({
  data,
}: {
  data?: Partial<TestimonialsData>;
}) {
  const d = { ...blockDefaults<TestimonialsData>("testimonials"), ...data };
  const items = Array.isArray(d.items) ? d.items : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-24 md:py-32 border-t border-slate-100 w-full overflow-hidden">
      <div className="max-container">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 mb-16 text-left">
          <div className="space-y-4 max-w-xl">
            {d.badge && (
              <div className="inline-flex items-center gap-2 text-blue-light bg-blue-light/10 px-3 py-1 rounded-full border border-blue-light/20  text-sm font-bold tracking-wider uppercase">
                {d.badge}
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight">
              {d.heading}
            </h2>
          </div>

          <div className="flex gap-2.5 shrink-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="size-10 rounded-md border border-black/5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="size-10 rounded-md border border-black/5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden px-0.5">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full overflow-clip! sm:overflow-visible! py-2"
          >
            {items.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="flex flex-col justify-between bg-slate-50 rounded-2xl p-7 text-left min-h-70">
                  <div className="space-y-4 overflow-hidden">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-slate-600  leading-relaxed font-medium line-clamp-4">
                      “{t.text}”
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/50 mt-auto">
                    <h4 className="text-sm font-semibold text-slate-800">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {t.address}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
