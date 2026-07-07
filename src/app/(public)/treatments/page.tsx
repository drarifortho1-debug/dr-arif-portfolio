import type { Metadata } from "next";
import TreatmentsContent from "./TreatmentsContent";

export const metadata: Metadata = {
  title: "চিকিৎসা সেবা",
  description:
    "ডা. আরিফ অর্থোর চিকিৎসা সেবাসমূহ — ট্রমা সার্জারি, অর্থোপেডিক চিকিৎসা, পিআরপি থেরাপি, ওজোন থেরাপি, এমএসকে আল্ট্রাসাউন্ড ও স্পাইন ইন্টারভেনশন।",
  openGraph: {
    title: "চিকিৎসা সেবা — ডা. আরিফ অর্থো",
    description:
      "ট্রমা সার্জারি, অর্থোপেডিক চিকিৎসা, পিআরপি থেরাপি, ওজোন থেরাপি সহ সকল আধুনিক চিকিৎসা সেবা।",
  },
};

export default function TreatmentsPage() {
  return <TreatmentsContent />;
}
