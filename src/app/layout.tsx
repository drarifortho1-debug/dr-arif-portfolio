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
  metadataBase: new URL("https://drarifortho.com"),
  title: {
    default:
      "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) - অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন",
    template: "%s | ডা. আরিফ অর্থো",
  },
  description:
    "অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) এর অফিসিয়াল ওয়েবসাইট। হাঁটু, কোমর, কাঁধ, মেরুদন্ডের সমস্যার চিকিৎসা।",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "ডা. আরিফ অর্থো",
    title:
      "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) - অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন",
    description:
      "অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) এর অফিসিয়াল ওয়েবসাইট।",
    images: [
      {
        url: "/doctor-img.png",
        width: 1200,
        height: 630,
        alt: "ডা. গাজী মোহাম্মদ আরিফুল ইসলাম",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) - অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন",
    description:
      "অর্থোপেডিক্স বিশেষজ্ঞ ও ট্রমা সার্জন ডা: গাজী মোহাম্মদ আরিফুল ইসলাম (ভিলীয়া) এর অফিসিয়াল ওয়েবসাইট।",
    images: ["/doctor-img.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "G1upGbkiUe9wSzpzeUJvu8ni7pfoRf7ZX6PjAiUDiwg",
  },
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
        {children}
      </body>
    </html>
  );
}
