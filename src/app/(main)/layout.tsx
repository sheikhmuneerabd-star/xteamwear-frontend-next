import NavContact from "@/components/layout/NavContact";
import Navbar from "@/components/layout/Navbar";
import CategoryBar from "@/components/layout/CategoryBar";
import WhatsApp from "@/components/layout/WhatsApp";
import FooterSearch from "@/components/layout/FooterSearch";
import FooterContact from "@/components/layout/FooterContact";
import CopyRightFooter from "@/components/layout/CopyRightFooter";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavContact />
      <Navbar />
      <CategoryBar />
      {children}
      <WhatsApp />
      <FooterSearch />
      <FooterContact />
      <CopyRightFooter />
    </>
  );
}