import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getFooter, getHeader } from "@/lib/cms/server";

export const revalidate = 300;

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()]);
  return (
    <>
      <Navbar settings={header} />
      <main>{children}</main>
      <Footer settings={footer} />
    </>
  );
}
