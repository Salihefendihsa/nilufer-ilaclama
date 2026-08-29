import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Bug, BugOff, BugPlay, Rat, ShieldCheck, Worm, type LucideIcon } from "lucide-react";
import { PESTS, getPestBySlug, type PestIcon } from "@/lib/data/pests";

const ICONS: Record<PestIcon, LucideIcon> = {
  bug: Bug,
  rat: Rat,
  "bug-off": BugOff,
  "bug-play": BugPlay,
  worm: Worm,
};

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return PESTS.map((pest) => ({ slug: pest.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pest = getPestBySlug(params.slug);
  if (!pest) return {};
  return {
    title: `${pest.name} | Haşere Rehberi | Nilüfer İlaçlama`,
    description: pest.description,
    alternates: { canonical: `/hasere-rehberi/${pest.slug}` },
  };
}

export default function PestDetailPage({ params }: PageProps) {
  const pest = getPestBySlug(params.slug);
  if (!pest) notFound();

  const Icon = ICONS[pest.icon];

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/hasere-rehberi"
          className="text-sm font-medium text-ink/50 transition-colors hover:text-primary-green"
        >
          ← Haşere Rehberi
        </Link>

        <div className="mt-6 flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-red to-primary-green text-white shadow-lg">
            <Icon size={40} strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-ink">{pest.name}</h1>
            <p className="mt-1 text-sm italic text-ink/45">{pest.latinName}</p>
            <p className="mt-2 text-sm text-ink/60">
              {pest.name} — Belirtileri, Zararları ve Çözüm Yöntemleri
            </p>
          </div>
        </div>

        <p className="mt-8 text-base leading-relaxed text-ink/70">
          {pest.details}
        </p>

        <div className="mt-14">
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
            <AlertTriangle size={20} className="text-primary-red" />
            Neden Tehlikeli?
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pest.harms.map((harm) => (
              <div
                key={harm}
                className="rounded-xl border-l-4 border-primary-red bg-primary-red/5 p-4 text-sm leading-relaxed text-ink/70"
              >
                {harm}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
            <ShieldCheck size={20} className="text-primary-green" />
            Çözüm Sürecimiz
          </h2>
          <div className="mt-5 space-y-4">
            {pest.ourProcess.map((process, i) => (
              <div key={process.step} className="flex gap-4 rounded-xl border border-ink/10 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-green/10 text-sm font-bold text-primary-green">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{process.step}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">
                    {process.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-primary-green/30 bg-primary-green/5 p-6">
          <p className="text-sm font-semibold text-ink">
            Bu Sorunla mı Karşılaştınız?
          </p>
          <p className="mt-1 text-sm text-ink/60">
            Uzman ekibimiz ücretsiz keşif ile durumu yerinde değerlendirsin.
          </p>
          <Link
            href="/teklif"
            className="mt-4 inline-flex rounded-full bg-primary-red px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
          >
            Ücretsiz Keşif Talep Et
          </Link>
        </div>
      </div>
    </section>
  );
}
