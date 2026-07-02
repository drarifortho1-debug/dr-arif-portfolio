import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import type { Metadata } from "next";
import { Google_Sans, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-bangla",
});

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-google-sans",
});

export const metadata: Metadata = {
  title:
    "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) - অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন",
  description:
    "অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) এর অফিসিয়াল ওয়েবসাইট। হাঁটু, কোমর, কাঁধ, মেরুদন্ডের সমস্যার চিকিৎসা।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSansBengali.variable} ${googleSans.variable} scroll-smooth`}
    >
      <body className="min-h-dvh flex flex-col font-bangla">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
