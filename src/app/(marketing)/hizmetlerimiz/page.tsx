import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, SprayCan, Trees, Wind, type LucideIcon } from "lucide-react";
import { SERVICES, type ServiceIcon } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Nilüfer İlaçlama",
  description:
    "İlaçlama ve dezenfeksiyon, fümigasyon, peyzaj ve bahçe, danışmanlık hizmetlerimiz.",
};

const ICONS: Record<ServiceIcon, LucideIcon> = {
  "spray-can": SprayCan,
  wind: Wind,
  trees: Trees,
  "clipboard-list": ClipboardList,
};

export default function HizmetlerimizPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Hizmetlerimiz
          </h1>
          <p className="mt-3 text-ink/60">
            Konut, işyeri ve endüstriyel tesisler için sunduğumuz temel
            hizmet kategorileri.
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <div
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 flex flex-col gap-5 rounded-2xl border border-ink/10 p-6 sm:flex-row sm:items-start sm:p-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green">
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {service.longDescription}
                  </p>
                  <Link
                    href="/teklif"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-green hover:text-primary-red"
                  >
                    Bu hizmet için teklif al
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
