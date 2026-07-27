"use client";

import ChambersSection from "@/components/home/ChambersSection";
import ContentLayout from "@/components/shared/ContentLayout";
import { Badge } from "@/components/shared/badge";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Phone,
  Stethoscope,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { TreatmentData } from "./treatment-data";

const whatsappNumber = "8801858405083";
const whatsappMessage = encodeURIComponent(
  "আসসালামু আলাইকুম। আমি ডক্টর আরিফ ভেলিয়ার অ্যাপয়েন্টমেন্টের জন্য যোগাযোগ করছি।",
);

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-slate-50 hover:bg-slate-100/60 transition-colors"
      >
        <span className="font-bold text-blue-dark text-sm md:text-base pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="p-4 md:p-5 text-slate-700 text-sm md:text-base leading-relaxed bg-white">
          {answer}
        </div>
      )}
    </div>
  );
}

function TableRenderer({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm md:text-base min-w-[500px]">
        <thead>
          <tr className="bg-blue-dark">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-bold text-white text-xs uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-slate-100 last:border-0 ${ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DoAndDontRenderer({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-green-200 rounded-2xl p-5 md:p-6 bg-green-50/50">
        <div className="flex items-center gap-2 mb-4">
          <Check className="w-5 h-5 text-green-600" />
          <h4 className="font-bold text-green-800 text-base">যা করবেন</h4>
        </div>
        <ul className="space-y-2.5">
          {dos.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-green-800 text-sm md:text-base"
            >
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-red-200 rounded-2xl p-5 md:p-6 bg-red-50/50">
        <div className="flex items-center gap-2 mb-4">
          <X className="w-5 h-5 text-red-600" />
          <h4 className="font-bold text-red-800 text-base">যা করবেন না</h4>
        </div>
        <ul className="space-y-2.5">
          {donts.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-red-800 text-sm md:text-base"
            >
              <X className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TreatmentDetail({ data }: { data: TreatmentData }) {
  return (
    <ContentLayout backHref="/our-treatments">
      <section className="py-12 md:py-16 border-b border-slate-100">
        <div className="max-container">
          <h1 className="text-3xl md:text-4xl  font-bold text-blue-dark tracking-tight leading-tight mb-4">
            {data.title}
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
            {data.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-container space-y-12">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-blue-dark mb-6">
              কারণসমূহ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.causes.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-light/20 hover:shadow-sm transition-all duration-300"
                >
                  <span className="mt-1 h-6 w-6 rounded-full bg-blue-light/10 text-blue-light text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-blue-dark">{item.title}</p>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-blue-dark mb-6">
              চিকিৎসার ধরন
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.treatments.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-light/20 hover:shadow-sm transition-all duration-300"
                >
                  <span className="mt-1 h-6 w-6 rounded-full bg-blue-light/10 text-blue-light text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-blue-dark ">{item.name}</p>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {data.table && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-blue-dark mb-6">
                {data.table.title}
              </h2>
              <TableRenderer
                headers={data.table.headers}
                rows={data.table.rows}
              />
            </div>
          )}

          {data.doAndDont && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-blue-dark mb-6">
                পরামর্শ ও নির্দেশনা
              </h2>
              <DoAndDontRenderer
                dos={data.doAndDont.dos}
                donts={data.doAndDont.donts}
              />
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-amber-800">
                উপসর্গ
              </h3>
            </div>
            <p className="text-amber-900/80 text-sm md:text-base leading-relaxed">
              {data.symptoms}
            </p>
          </div>

          <div className="bg-blue-light/5 border border-blue-light/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 h-10 w-10 rounded-full bg-blue-light/10 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-blue-light" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-blue-dark">
                কখন ডাক্তার দেখবেন
              </h3>
            </div>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              {data.doctorAdvice}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 ">
        <div className="max-container">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-dark mb-8">
            জিজ্ঞাসিত প্রশ্নাবলি
          </h2>
          <div className="space-y-3">
            {data.faq.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
      <ChambersSection />
      <section className="relative overflow-hidden bg-linear-to-br from-blue-light/10 via-slate-50 to-blue-dark/10 py-20 md:py-24 border-t border-b border-slate-100 mt-auto">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e0a_1px,transparent_1px),linear-gradient(to_bottom,#0f766e0a_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)] pointer-events-none" />
        <div className="max-container relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20">
            <div className="space-y-4 max-w-2xl text-left">
              <Badge text="সরাসরি যোগাযোগ" />
              <h2 className="text-3xl md:text-4xl font-bold text-blue-dark tracking-tight leading-tight">
                আজই অ্যাপয়েন্টমেন্ট নিন
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
                {data.ctaSubtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
              <a
                href="tel:+8801858405083"
                className="inline-flex items-center justify-center gap-2.5 bg-blue-light hover:bg-blue-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-blue-light/10 hover:shadow-lg hover:shadow-blue-light/20 active:scale-95 text-center font-google-sans"
              >
                <Phone className="w-4 h-4 fill-white/10" />
                +8801858405083
              </a>
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
                হোয়াটসঅ্যাপে বুক করুন
              </a>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
