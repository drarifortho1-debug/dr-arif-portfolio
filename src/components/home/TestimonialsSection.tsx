"use client";

import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";

const testimonials = [
  {
    text: "অত্যন্ত অভিজ্ঞ এবং দক্ষ অর্থোপেডিক সার্জন। আমার হাঁটুর সমস্যা খুব দ্রুত সমাধান করেছেন। অত্যন্ত সেবাযত্ন সহকারে রোগীদের দেখেন।",
    name: "মো: রফিকুল ইসলাম",
    address: "কান্দিরপাড়, কুমিল্লা",
  },
  {
    text: "অনেক যত্ন সহকারে রোগীদের কথা শোনেন এবং বুঝিয়ে বলেন। চিকিৎসার মান অসাধারণ। সবার কাছে রেকমেন্ড করব।",
    name: "ফাতেমা বেগম",
    address: "শাসনগাছা, কুমিল্লা",
  },
  {
    text: "কোমর ব্যথার জন্য চিকিৎসা নিয়েছিলাম। খুব অল্প সময়েই ভাল ফল পেয়েছি। ডাক্তার স্যার অত্যন্ত আন্তরিক ও পেশাদার।",
    name: "জহিরুল হক",
    address: "বুড়িচং, কুমিল্লা",
  },
  {
    text: "আম্মার ফ্র্যাকচার অপারেশনের পর উনি এখন সম্পূর্ণ সুস্থ। স্যারের কাজের নিখুঁত দক্ষতা এবং সুন্দর ব্যবহার আমাদের মুগ্ধ করেছে।",
    name: "আহসান হাবিব",
    address: "বাগিচাগাও, কুমিল্লা",
  },
  {
    text: "হাঁটু প্রতিস্থাপন (Knee Replacement) অপারেশনের পর এখন আমি নিজে নিজেই হাঁটতে পারি। মহান আল্লাহর পর ডাক্তারের কাছে আমি কৃতজ্ঞ।",
    name: "সুফিয়া খাতুন",
    address: "চৌদ্দগ্রাম, কুমিল্লা",
  },
  {
    text: "দীর্ঘদিন ধরে স্পোর্টস ইনজুরিতে ভুগছিলাম। স্যারের পরামর্শ ও থেরাপিতে এখন আবার মাঠে ফিরতে পেরেছি। বেস্ট অর্থোপেডিক ডক্টর।",
    name: "শামীম আহমেদ",
    address: "ঝাউতলা, কুমিল্লা",
  },
  {
    text: "অন্য ডাক্তাররা অপারেশনের ভয় দেখিয়েছিল, কিন্তু স্যার সঠিক ওষুধের মাধ্যমে আমার ফ্রোজেন শোল্ডার একদম ঠিক করে দিয়েছেন।",
    name: "নুরজাহান বেগম",
    address: "লাকসাম, কুমিল্লা",
  },
  {
    text: "অত্যন্ত নম্র ও ভদ্র একজন মানুষ। প্রেসক্রিপশন দেওয়ার সময় প্রতিটা ওষুধের নিয়ম খুব সুন্দর করে বুঝিয়ে দেন।",
    name: "ডা. আরিফুর রহমান",
    address: "কুমিল্লা সদর",
  },
  {
    text: "হাতের কনুই ভাঙার পর এখানে অপারেশন করাই। প্লাস্টার কাটার পর এখন হাত আগের মতোই স্বাভাবিকভাবে নাড়াচড়া করতে পারছি।",
    name: "কামরুল হাসান",
    address: "বরুড়া, কুমিল্লা",
  },
  {
    text: "গেঁটে বাত বা আর্থ্রাইটিসের ব্যথায় রাতে ঘুমাতে পারতাম না। স্যারের চিকিৎসার পর এখন অনেক শান্তিতে ঘুমাতে পারি।",
    name: "হাজেরা আক্তার",
    address: "মুরাদনগর, কুমিল্লা",
  },
  {
    text: "অপারেশনের থিয়েটারে স্যার যেভাবে অভয় দিয়েছেন, আমার অর্ধেক ভয় ওখানেই কেটে গিয়েছিল। ওনার টিমও খুব হেল্পফুল।",
    name: "মো: সাহাব উদ্দিন",
    address: "চান্দিনা, কুমিল্লা",
  },
  {
    text: "বাচ্চার হাত মচকে যাওয়ার পর আপদকালীন সময়ে ওনাকে দেখাই। খুব দ্রুত ও যত্ন নিয়ে বাচ্চার চিকিৎসা করেছেন।",
    name: "রোকেয়া সুলতানা",
    address: "টমছম ব্রিজ, কুমিল্লা",
  },
  {
    text: "মেরুদণ্ডের ব্যথার জন্য অনেক জায়গায় দেখিয়েছি, কিন্তু এখানে এসে সঠিক ডায়াগনোসিস ও চিকিৎসা পেয়ে আমি এখন সুস্থ।",
    name: "আব্দুল মজিদ",
    address: "হোমনা, কুমিল্লা",
  },
  {
    text: "ফিজিওথেরাপি আর ওষুধের পারফেক্ট কম্বিনেশনে আমার সাইটিকার ব্যথা এখন আর নেই বললেই চলে। অনেক ধন্যবাদ স্যারকে।",
    name: "মনোয়ার হোসেন",
    address: "দাউদকান্দি, কুমিল্লা",
  },
  {
    text: "ডাক্তার দেখানোর পর ওনার ফলো-আপ গাইডলাইনগুলো দারুণ। রোগীকে সুস্থ না করা পর্যন্ত উনি খোঁজ নেন।",
    name: "সালমা বিনতে মাসুদ",
    address: "রেসকোর্স, কুমিল্লা",
  },
  {
    text: "পায়ের গোড়ালির লিগামেন্ট টিয়ার হয়েছিল। নিখুঁত আর্থ্রোস্কোপিক সার্জারির মাধ্যমে এখন আমি পুরোপুরি স্বাভাবিক।",
    name: "তারেক আজিজ",
    address: "দেবিদ্বার, কুমিল্লা",
  },
  {
    text: "কুমিল্লার মধ্যে অর্থোপেডিক চিকিৎসার জন্য ওনার চেয়ে আন্তরিক ও দক্ষ ডাক্তার দ্বিতীয় কেউ নেই। ওনার দীর্ঘায়ু কামনা করি।",
    name: "আলহাজ্ব মোস্তফা কামাল",
    address: "পদুয়ার বাজার, কুমিল্লা",
  },
  {
    text: "অহেতুক টেস্ট বা অপ্রয়োজনীয় ওষুধ দেন না। খুব সৎ এবং পেশাদার একজন রিলায়াবল চিকিৎসক।",
    name: "নাজমুল হুদা",
    address: "বাদুরতলা, কুমিল্লা",
  },
  {
    text: "ইউনিক চিকিৎসা পদ্ধতি। ওনার দেওয়া এক্সারসাইজগুলো নিয়মিত করার পর আমার পিঠের দীর্ঘদিনের পুরনো ব্যথা দূর হয়েছে।",
    name: "শাহানা পারভীন",
    address: "লাঙ্গলকোট, কুমিল্লা",
  },
  {
    text: "পেশেন্ট ডিলিং অসাধারণ। প্রথমবার দেখিয়েই মনে হয়েছে সঠিক জায়গায় এসেছি। প্রেসক্রিপশনও খুব সহজবোধ্য।",
    name: "ইমতিয়াজ আহমেদ",
    address: "কোতোয়ালী, কুমিল্লা",
  },
];

export default function TestimonialsSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  return (
    <section className="bg-white py-24 md:py-32 border-t border-slate-100 w-full overflow-hidden">
      <div className="max-container">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80 mb-16 text-left">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200  text-sm font-bold tracking-wider uppercase">
              রোগীর মতামত
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight">
              রোগীরা কী বলছেন
            </h2>
          </div>

          {/* Soft Custom Navigation Buttons */}
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

        {/* Swiper Slider Wrapper */}
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
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                {/* Ultra-Minimal Flat Card with Fixed Height */}
                <div className="flex flex-col justify-between bg-slate-50 rounded-2xl p-7 text-left min-h-70">
                  <div className="space-y-4 overflow-hidden">
                    {/* Stars Block */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text (with line-clamp to prevent overflow inside card) */}
                    <p className="text-slate-600  leading-relaxed font-medium line-clamp-4">
                      “{t.text}”
                    </p>
                  </div>

                  {/* Identity Footer */}
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
