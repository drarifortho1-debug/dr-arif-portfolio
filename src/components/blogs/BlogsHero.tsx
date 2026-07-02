import { Badge } from "@/components/shared/badge";

export default function BlogsHero() {
  return (
    <div className="mb-12 text-center max-container">
      <Badge text="স্বাস্থ্য টিপস " />
      <h1 className="text-4xl md:text-5xl font-bold text-blue-dark mb-3 mt-5">
        স্বাস্থ্য সেবা বিষয়ক টিপস 
      </h1>
      <p className="text-slate-600 text-lg">
        চিকিৎসা সংক্রান্ত গুরুত্বপূর্ণ ভিডিও ও বিশেষজ্ঞের পরামর্শসমূহ
      </p>
    </div>
  );
}
