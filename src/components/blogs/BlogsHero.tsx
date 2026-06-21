import { Badge } from "@/components/shared/UI";

export default function BlogsHero() {
  return (
    <section className="relative overflow-hidden bg-surface section-padding">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="animate-fade-up">
          <Badge variant="primary">স্বাস্থ্য টিপস</Badge>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4 animate-fade-up delay-1">
          সর্বশেষ চিকিৎসা বিষয়ক পরামর্শ ও ব্লগ
        </h1>
        <p className="text-muted max-w-2xl mx-auto text-base animate-fade-up delay-2">
          অর্থোপেডিক স্বাস্থ্য সম্পর্কিত গুরুত্বপূর্ণ তথ্য ও চিকিৎসা বিষয়ক পরামর্শ
        </p>
      </div>
    </section>
  );
}
