import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bug, BugOff, BugPlay, Rat, Worm, type LucideIcon } from "lucide-react";
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
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-red/10 text-primary-red">
            <Icon size={32} strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-ink">{pest.name}</h1>
            <p className="mt-1 text-sm italic text-ink/45">{pest.latinName}</p>
          </div>
        </div>

        <p className="mt-8 text-base leading-relaxed text-ink/70">
          {pest.details}
        </p>

        <div className="mt-10 rounded-2xl border border-primary-green/30 bg-primary-green/5 p-6">
          <p className="text-sm font-semibold text-ink">
            {pest.name} ile mi mücadele ediyorsunuz?
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
