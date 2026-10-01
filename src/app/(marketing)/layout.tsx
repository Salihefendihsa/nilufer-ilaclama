import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import MotionPreferences from "@/components/marketing/MotionPreferences";
import BackToTop from "@/components/marketing/BackToTop";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionPreferences>
      <div id="page-top-marker" aria-hidden="true" className="absolute left-0 top-0 h-px w-px" />
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </MotionPreferences>
  );
}
