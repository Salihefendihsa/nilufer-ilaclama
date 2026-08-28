import type { Metadata } from "next";
import PricingSection from "@/components/marketing/PricingSection";

export const metadata: Metadata = {
  title: "Paketlerimiz | Nilüfer İlaçlama",
  description:
    "Ev, işyeri ve kurumsal tesisler için periyodik bakım paketlerimizi inceleyin.",
};

export default function PaketlerPage() {
  return (
    <>
      <div className="bg-white px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Bakım Paketlerimiz
          </h1>
          <p className="mt-3 text-ink/60">
            Konut, işyeri ve kurumsal tesisler için periyodik, sürekli
            koruma sağlayan bakım paketlerimizi inceleyin.
          </p>
        </div>
      </div>
      <PricingSection />
    </>
  );
}
