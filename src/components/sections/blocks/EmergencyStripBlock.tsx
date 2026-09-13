interface Data {
  message?: string;
  buttonLabel?: string;
  phone?: string;
}

export default function EmergencyStripBlock({ data }: { data: Data }) {
  if (!data.message && !data.buttonLabel) return null;

  return (
    <div className="w-full bg-rose-50 border-y border-rose-200/70">
      <div className="max-container py-3.5 flex flex-wrap items-center justify-between gap-3">
        {data.message && (
          <p className="text-[14.5px] font-semibold text-rose-700">{data.message}</p>
        )}
        {data.buttonLabel && data.phone && (
          <a
            href={`tel:${data.phone.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white px-5 py-2 rounded-full text-[13.5px] font-bold transition-colors"
          >
            {data.buttonLabel}
          </a>
        )}
      </div>
    </div>
  );
}
