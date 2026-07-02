import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";

type ChamberCardProps = {
  logo: string;
  name: string;
  address: string;
  days: string;
  time: string;
  offDays: string;
  mapUrl: string;
  phone1?: string;
  phone2?: string;

  className?: string;
  logoClassName?: string;
  titleClassName?: string;
  scheduleClassName?: string;
  addressClassName?: string;
  buttonClassName?: string;
};

export default function ChamberCard({
  logo,
  name,
  address,
  days,
  time,
  offDays,
  mapUrl,
  phone1 = "",
  phone2 = "",
  className = "",
  logoClassName = "",
  titleClassName = "",
  scheduleClassName = "",
  addressClassName = "",
  buttonClassName = "",
}: ChamberCardProps) {
  return (
    <div
      className={`flex flex-col justify-between rounded-3xl p-7 min-h-95 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.06)] transition-all duration-300 hover:shadow-[0_12px_30px_-6px_rgba(13,148,136,0.08)] ${className}`}
    >
      <div className="space-y-7">
        <div className="flex flex-col items-center gap-1.5">
          <Image
            src={logo}
            alt={name}
            width={200}
            height={200}
            className={`h-22 w-auto ${logoClassName}`}
          />

          <h3
            className={`text-xl font-semibold text-blue-dark ${titleClassName}`}
          >
            {name}
          </h3>
        </div>

        <div className={`rounded-2xl bg-slate-50 p-5 ${scheduleClassName}`}>
          <div>
            <p className="text-xs font-medium mb-0.5 text-slate-600">
              রোগী দেখার দিনসমূহ
            </p>
            <h5 className="text-base font-semibold text-blue-dark">{days}</h5>
          </div>

          <div className="mt-3">
            <p className="text-xs mb-0.5 font-medium text-slate-600">
              রোগী দেখার সময়
            </p>
            <p className="text-base text-blue-dark font-semibold">{time}</p>
          </div>

          <div className="mt-3 ">
            <p className="text-xs font-medium mb-0.5 text-slate-600">
              সাপ্তাহিক বন্ধ
            </p>
            <p className="font-medium text-rose-600">{offDays}</p>
          </div>

          <div className="mt-3 border-t pt-5 border-slate-200">
            <p className="mb-2 text-xs font-medium text-slate-600">
              সিরিয়ালের জন্য যোগাযোগ
            </p>

            <a
              href={`tel:${phone1}`}
              className="block font-semibold font-google-sans text-blue-dark hover:text-blue-600"
            >
              {phone1}
            </a>

            {phone2 && (
              <a
                href={`tel:${phone2}`}
                className=" block font-semibold font-google-sans text-blue-dark hover:text-blue-600"
              >
                {phone2}
              </a>
            )}
          </div>
        </div>
        <div className={`flex gap-3 pt-2 ${addressClassName}`}>
          <MapPin className="w-4 h-4 mt-1" />
          <p>{address}</p>
        </div>
      </div>
      <div className="mt-7">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full  rounded-xl py-3 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${buttonClassName}`}
        >
          <span>গুগল ম্যাপে লোকেশন দেখুন</span>
          <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  );
}
