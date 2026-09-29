import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { DISTRICTS } from "@/lib/data/districts";
import { COMPANY } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Hizmet Bölgelerimiz | Nilüfer İlaçlama",
  description: "Bursa genelindeki hizmet bölgelerimiz ve aktif ekiplerimiz.",
  alternates: { canonical: "/subelerimiz" },
};

export default function SubelerimizPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Hizmet Bölgelerimiz
          </h1>
          <p className="mt-3 text-ink/60">
            Nilüfer&apos;deki merkezimizden Bursa&apos;nın aşağıdaki ilçelerine
            hizmet veriyoruz. Diğer ilçeler için bize ulaşın.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DISTRICTS.map((district) => (
            <div
              key={district.name}
              className="flex flex-col rounded-2xl border-l-4 border-primary-green bg-white p-6 shadow-md ring-1 ring-ink/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green">
                <MapPin size={22} strokeWidth={1.8} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-ink">
                {district.name}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                {district.description}
              </p>
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="mt-4 text-sm font-semibold text-primary-green hover:text-primary-red"
              >
                Bu bölge için randevu al →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
