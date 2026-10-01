import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import MotionPreferences from "@/components/marketing/MotionPreferences";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionPreferences>
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
    </MotionPreferences>
  );
}
