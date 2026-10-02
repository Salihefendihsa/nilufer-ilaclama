import type { Metadata } from "next";
import Hero from "@/components/marketing/Hero";
import CoverageSection from "@/components/marketing/CoverageSection";
import HowItWorks from "@/components/marketing/HowItWorks";
import ScienceSection from "@/components/marketing/ScienceSection";
import Services from "@/components/marketing/Services";
import ContactOptions from "@/components/marketing/ContactOptions";
import PricingSection from "@/components/marketing/PricingSection";
import PestGuide from "@/components/marketing/PestGuide";
import HomeSectionNav from "@/components/marketing/HomeSectionNav";

export const metadata: Metadata = {
  title: "Nilüfer İlaçlama | Bursa'da Profesyonel İlaçlama ve Dezenfeksiyon Hizmetleri",
  description:
    "Bursa genelinde konut, işyeri ve endüstriyel tesisler için güvenli ilaçlama, dezenfeksiyon ve fümigasyon hizmetleri. Ücretsiz keşif için hemen teklif alın.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeSectionNav />
      <Hero />
      <CoverageSection />
      <HowItWorks />
      <ScienceSection />
      <Services />
      <ContactOptions />
      <PricingSection />
      <PestGuide />
    </>
  );
}
