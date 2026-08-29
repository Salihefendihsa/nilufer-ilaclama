import type { Metadata } from "next";
import Hero from "@/components/marketing/Hero";
import CoverageSection from "@/components/marketing/CoverageSection";
import HowItWorks from "@/components/marketing/HowItWorks";
import ScienceSection from "@/components/marketing/ScienceSection";
import Services from "@/components/marketing/Services";
import TrustBadges from "@/components/marketing/TrustBadges";
import Testimonials from "@/components/marketing/Testimonials";
import TrustStats from "@/components/marketing/TrustStats";
import PricingSection from "@/components/marketing/PricingSection";
import PestGuide from "@/components/marketing/PestGuide";
import FinalCta from "@/components/marketing/FinalCta";

export const metadata: Metadata = {
  title: "Nilüfer İlaçlama | Bursa'da Profesyonel İlaçlama ve Dezenfeksiyon Hizmetleri",
  description:
    "Bursa genelinde konut, işyeri ve endüstriyel tesisler için ruhsatlı, güvenli ilaçlama, dezenfeksiyon ve fümigasyon hizmetleri. Ücretsiz keşif için hemen teklif alın.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <CoverageSection />
      <HowItWorks />
      <ScienceSection />
      <Services />
      <TrustBadges />
      <Testimonials />
      <TrustStats />
      <PricingSection />
      <PestGuide />
      <FinalCta />
    </>
  );
}
