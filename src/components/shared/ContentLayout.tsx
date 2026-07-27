"use client";

import { ReactNode } from "react";

export default function ContentLayout({
  children,
}: {
  children: ReactNode;
  backLabel?: string;
  backHref?: string;
}) {
  return (
    <main className="flex flex-col min-h-screen bg-white ">
      <div className="flex-1 flex flex-col  animate-fade-up">
        {children}
      </div>
    </main>
  );
}
