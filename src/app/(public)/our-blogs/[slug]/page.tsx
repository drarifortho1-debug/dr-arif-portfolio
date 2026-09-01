import type { Metadata } from "next";
import { adminDb } from "@/lib/firebase-admin";
import { excerpt } from "@/lib/blog-content";
import BlogDetailContent from "./BlogDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

interface BlogDoc {
  title: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  slug?: string;
}

async function findBlog(param: string) {
  const bySlug = await adminDb
    .collection("blogs")
    .where("slug", "==", param)
    .limit(1)
    .get();
  if (!bySlug.empty) {
    const doc = bySlug.docs[0];
    return { id: doc.id, ...(doc.data() as BlogDoc) };
  }

  const byId = await adminDb.collection("blogs").doc(param).get();
  if (byId.exists) {
    return { id: byId.id, ...(byId.data() as BlogDoc) };
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await findBlog(decodeURIComponent(slug));
    if (!blog) {
      return { title: "ব্লগ পাওয়া যায়নি" };
    }

    const canonicalPath = blog.slug || blog.id;
    const description = excerpt(blog.content || "");
    const imageAlt = blog.imageAlt || blog.title;

    return {
      title: blog.title,
      description: description || undefined,
      alternates: {
        canonical: `https://www.drarifortho.com/our-blogs/${canonicalPath}`,
      },
      openGraph: {
        title: blog.title,
        description: description || undefined,
        images: blog.imageUrl
          ? [
              {
                url: blog.imageUrl,
                width: 1200,
                height: 630,
                alt: imageAlt,
              },
            ]
          : undefined,
      },
    };
  } catch {
    return { title: "ব্লগ পাওয়া যায়নি" };
  }
}

export default function BlogDetailsPage() {
  return <BlogDetailContent />;
}
