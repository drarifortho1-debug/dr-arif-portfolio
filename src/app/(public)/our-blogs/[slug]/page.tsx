import type { Metadata } from "next";
import { adminDb } from "@/lib/firebase-admin";
import BlogDetailContent from "./BlogDetailContent";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const docSnap = await adminDb.collection("blogs").doc(id).get();
    if (!docSnap.exists) {
      return { title: "ব্লগ পাওয়া যায়নি" };
    }
    const blog = docSnap.data() as {
      title: string;
      imageUrl?: string;
    };

    return {
      title: blog.title,
      alternates: {
        canonical: `https://www.drarifortho.com/our-blogs/${id}`,
      },
      openGraph: blog.imageUrl
        ? {
            images: [
              {
                url: blog.imageUrl,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ],
          }
        : undefined,
    };
  } catch {
    return { title: "ব্লগ পাওয়া যায়নি" };
  }
}

export default function BlogDetailsPage() {
  return <BlogDetailContent />;
}
