"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Lock, ShieldCheck } from "lucide-react";

const TAGS = [
  { label: "KVKK Uyumlu", icon: Lock },
  { label: "Sigortalı Hizmet", icon: ShieldCheck },
  { label: "7/24 Destek", icon: Clock },
];

const MARQUEE_TEXT = "NİLÜFER İLAÇLAMA · GÜVEN · KALİTE · BURSA · ";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="relative py-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Modern ve temiz ev dış cephesi"
            fill
            sizes="100vw"
            className="object-cover opacity-30 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Bugün Ücretsiz Keşif Talep Edin
          </h2>
          <p className="mt-5 text-base text-white/70 sm:text-lg">
            Uzman ekibimiz yerinde inceleme yaparak size özel, şeffaf bir
            çözüm planı sunsun. İlk adım tamamen ücretsiz.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/teklif"
              className="rounded-full bg-primary-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-red/30 transition-colors duration-300 hover:bg-primary-green sm:text-base"
            >
              Hemen Başla
            </Link>
            <Link
              href="/hizmetlerimiz"
              className="rounded-full border-2 border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-primary-green hover:bg-primary-green sm:text-base"
            >
              Nasıl Çalışır?
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {TAGS.map((tag) => {
              const Icon = tag.icon;
              return (
                <span
                  key={tag.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70"
                >
                  <Icon size={13} />
                  {tag.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10 bg-primary-green py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          <span className="px-4 text-sm font-bold uppercase tracking-widest text-white">
            {MARQUEE_TEXT.repeat(8)}
          </span>
          <span className="px-4 text-sm font-bold uppercase tracking-widest text-white" aria-hidden>
            {MARQUEE_TEXT.repeat(8)}
          </span>
        </div>
      </div>
    </section>
  );
}
