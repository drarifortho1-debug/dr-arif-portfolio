import type { Metadata } from "next";
import BlogList from "@/components/blogs/BlogList";
import BlogsHero from "@/components/blogs/BlogsHero";
import NewsletterSection from "@/components/blogs/NewsletterSection";

export const metadata: Metadata = {
  title: "ব্লগ",
  description:
    "ডা. আরিফ অর্থোর ব্লগ — হাঁটু, কোমর, কাঁধ ও মেরুদন্ডের সমস্যা নিয়ে বিশেষজ্ঞের পরামর্শ, চিকিৎসা সংক্রান্ত তথ্য ও স্বাস্থ্য টিপস।",
  openGraph: {
    title: "ব্লগ — ডা. আরিফ অর্থো",
    description:
      "অর্থোপেডিক্স বিশেষজ্ঞের পরামর্শ, চিকিৎসা সংক্রান্ত তথ্য ও স্বাস্থ্য টিপস।",
  },
};

export default function BlogsPage() {
  return (
    <div className="pt-15 pb-20 bg-white overflow-hidden">
      <BlogsHero />
      <BlogList />
      <NewsletterSection />
    </div>
  );
}
