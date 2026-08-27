import type { Metadata } from "next";
import Link from "next/link";
import { Bug, BugOff, BugPlay, Rat, Worm, type LucideIcon } from "lucide-react";
import { PESTS, type PestIcon } from "@/lib/data/pests";

export const metadata: Metadata = {
  title: "Haşere Rehberi | Nilüfer İlaçlama",
  description:
    "En sık karşılaşılan haşere türleri ve mücadele yöntemleri hakkında bilgi alın.",
};

const ICONS: Record<PestIcon, LucideIcon> = {
  bug: Bug,
  rat: Rat,
  "bug-off": BugOff,
  "bug-play": BugPlay,
  worm: Worm,
};

export default function HasereRehberiPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Haşere Rehberi
          </h1>
          <p className="mt-3 text-ink/60">
            En sık karşılaşılan haşere türlerini tanıyın, doğru mücadele
            yöntemini öğrenin.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {PESTS.map((pest) => {
            const Icon = ICONS[pest.icon];
            return (
              <Link
                key={pest.slug}
                href={`/hasere-rehberi/${pest.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-ink/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-green hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-red/10 text-primary-red transition-colors duration-300 group-hover:bg-primary-red group-hover:text-white">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h2 className="mt-4 text-sm font-bold text-ink sm:text-base">
                  {pest.name}
                </h2>
                <p className="mt-1 text-xs italic text-ink/45">{pest.latinName}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/55">
                  {pest.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
