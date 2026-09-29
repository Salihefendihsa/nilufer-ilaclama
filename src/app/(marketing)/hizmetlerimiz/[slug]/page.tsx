import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bug,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Container,
  FileSearch,
  Home,
  Landmark,
  Scale,
  SprayCan,
  Sprout,
  Trees,
  Users,
  Warehouse,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, getServiceBySlug, type ServiceIcon, type SubServiceIcon } from "@/lib/data/services";

const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  "spray-can": SprayCan,
  wind: Wind,
  trees: Trees,
  "clipboard-list": ClipboardList,
};

const SUB_SERVICE_ICONS: Record<SubServiceIcon, LucideIcon> = {
  trees: Trees,
  home: Home,
  bug: Bug,
  "building-2": Building2,
  container: Container,
  landmark: Landmark,
  warehouse: Warehouse,
  sprout: Sprout,
  "clipboard-check": ClipboardCheck,
  "file-search": FileSearch,
  users: Users,
  scale: Scale,
};

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | Nilüfer İlaçlama`,
    description: service.description,
    alternates: { canonical: `/hizmetlerimiz/${service.slug}` },
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = SERVICE_ICONS[service.icon];

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-primary-green/30"
        />

        <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
          <Link
            href="/hizmetlerimiz"
            className="text-sm font-medium text-white/60 transition-colors hover:text-primary-green"
          >
            ← Hizmetlerimiz
          </Link>

          <div className="mt-6 flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-green/15 text-primary-green">
              <Icon size={30} strokeWidth={1.8} />
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              {service.title}
            </h1>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {service.longDescription}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
            Alt Hizmetlerimiz
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {service.subServices.map((sub) => {
              const SubIcon = SUB_SERVICE_ICONS[sub.icon];
              return (
                <div
                  key={sub.title}
                  className="rounded-2xl border-l-4 border-primary-green bg-white p-6 shadow-md ring-1 ring-ink/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green">
                    <SubIcon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink">
                    {sub.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {sub.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 rounded-2xl border border-ink/10 bg-ink/[0.02] p-8">
            <h2 className="text-xl font-bold text-ink">
              Neden Bizi Tercih Etmelisiniz
            </h2>
            <ul className="mt-5 space-y-3">
              {service.whyUs.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary-green" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-primary-green/5 p-8 text-center">
            <h2 className="text-xl font-bold text-ink">
              {service.title} için Ücretsiz Keşif Talep Edin
            </h2>
            <p className="max-w-md text-sm text-ink/60">
              Uzman ekibimiz yerinde inceleme yaparak size özel bir çözüm
              planı sunsun.
            </p>
            <Link
              href="/teklif"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-red/20 transition-colors duration-300 hover:bg-primary-green sm:text-base"
            >
              Ücretsiz Keşif Talep Et
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
