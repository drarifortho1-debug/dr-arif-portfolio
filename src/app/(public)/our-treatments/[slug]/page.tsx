import type { Metadata } from "next";
import { TREATMENTS } from "./treatment-data";
import TreatmentDetail from "./TreatmentDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(TREATMENTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = TREATMENTS[slug];
  if (!data) return { title: "চিকিৎসা পাওয়া যায়নি" };

  return {
    title: data.metaTitle,
    alternates: {
      canonical: `https://www.drarifortho.com/our-treatments/${slug}`,
    },
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const data = TREATMENTS[slug];

  if (!data) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-dark mb-4">
            চিকিৎসা পাওয়া যায়নি
          </h1>
          <p className="text-slate-500">এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।</p>
        </div>
      </main>
    );
  }

  return <TreatmentDetail data={data} />;
}
