import BlogList from "@/components/blogs/BlogList";
import BlogsHero from "@/components/blogs/BlogsHero";
import NewsletterSection from "@/components/blogs/NewsletterSection";

export default function BlogsPage() {
  return (
    <div className="pt-15 pb-20 bg-white overflow-hidden">
      <BlogsHero />
      <BlogList />
      <NewsletterSection />
    </div>
  );
}
