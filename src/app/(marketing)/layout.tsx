import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import PageLoader from "@/components/marketing/PageLoader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageLoader />
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
