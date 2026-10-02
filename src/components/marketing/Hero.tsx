"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data/company";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

const SERVICE_TAGS = ["Konut", "İşyeri", "Endüstriyel tesis"];

export default function Hero() {
  return (
    <section id="giris" className="relative isolate scroll-mt-20 bg-ink lg:flex lg:min-h-[calc(100svh-64px)] lg:items-center">
      <div className="relative lg:absolute lg:inset-0">
        <picture className="block lg:h-full">
          <source media="(max-width: 1023px)" srcSet="/images/hero-ai-mobile.webp" />
          {/* The two local WebP crops are already optimized. picture fetches only the active crop. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-ai-desktop.webp"
            alt="Yapay zekâ ile oluşturulmuş, bina çevresinde uygulama yapan temsili kişi"
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full object-contain lg:absolute lg:inset-0 lg:h-full lg:object-cover lg:object-center"
          />
        </picture>
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/75 via-ink/25 to-transparent lg:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-24 xl:pl-14 2xl:max-w-[1600px] 2xl:pl-12">
        <div className="max-w-3xl lg:max-w-[640px] 2xl:max-w-[720px]">
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-green" />
            Bursa&apos;da ilaçlama ve dezenfeksiyon
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="mt-5 max-w-2xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:mt-6 sm:text-4xl lg:text-5xl 2xl:text-6xl"
          >
            Bursa&apos;da profesyonel{" "}
            <span className="text-primary-green">ilaçlama</span> ve haşere
            kontrolü
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:max-w-xl"
          >
            Ev, işyeri ve tesisler için ücretsiz keşif talep edin. Ekibimiz
            sizi arasın, ihtiyacınıza uygun uygulamayı birlikte planlayalım.
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="visible"
            custom={0.25}
            variants={fadeUp}
            className="mt-5 hidden flex-wrap gap-2 lg:flex"
          >
            {SERVICE_TAGS.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80 sm:text-sm"
              >
                {tag}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link
              href="/teklif"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-red px-7 py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
            >
              Ücretsiz Keşif Talep Et
            </Link>
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 text-base font-semibold text-white transition-colors duration-300 hover:border-primary-green hover:bg-primary-green"
            >
              <Phone size={18} aria-hidden />
              Hemen Ara: {COMPANY.phoneDisplay}
            </a>
            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 text-base font-semibold text-white transition-colors duration-300 hover:border-primary-green hover:bg-primary-green lg:hidden"
            >
              <MessageCircle size={18} aria-hidden />
              WhatsApp
            </a>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="mt-6 text-sm text-white/70"
          >
            <a
              href="#nasil-calisir"
              className="font-semibold text-white underline decoration-primary-green decoration-2 underline-offset-4 hover:text-primary-green"
            >
              Süreç nasıl işliyor?
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
