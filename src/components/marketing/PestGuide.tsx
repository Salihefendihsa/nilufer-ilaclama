"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bug, BugOff, BugPlay, Rat, Worm, type LucideIcon } from "lucide-react";
import { PESTS, type PestIcon } from "@/lib/data/pests";

const ICONS: Record<PestIcon, LucideIcon> = {
  bug: Bug,
  rat: Rat,
  "bug-off": BugOff,
  "bug-play": BugPlay,
  worm: Worm,
};

export default function PestGuide() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Hangi Haşere ile Karşı Karşıyasınız?
          </h2>
          <p className="mt-4 text-base text-ink/60 sm:text-lg">
            En sık karşılaşılan haşere türlerini tanıyın, doğru mücadele
            yöntemini öğrenin.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {PESTS.map((pest, i) => {
            const Icon = ICONS[pest.icon];
            return (
              <motion.div
                key={pest.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/hasere-rehberi/${pest.slug}`}
                  className="group flex flex-col items-center rounded-2xl border border-ink/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-green hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-red/10 text-primary-red transition-colors duration-300 group-hover:bg-primary-red group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-ink sm:text-base">
                    {pest.name}
                  </h3>
                  <p className="mt-1 text-xs italic text-ink/45">
                    {pest.latinName}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
