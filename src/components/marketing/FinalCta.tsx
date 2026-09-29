"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data/company";

const MARQUEE_TEXT = "NİLÜFER İLAÇLAMA · GÜVEN · KALİTE · BURSA · ";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="relative py-20 sm:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-primary-green/25"
        />

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
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-red px-7 py-3 text-base font-semibold text-white shadow-lg shadow-primary-red/30 transition-colors duration-300 hover:bg-primary-green"
            >
              Hemen Başla
            </Link>
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-base font-semibold text-white transition-colors duration-300 hover:border-primary-green hover:bg-primary-green"
            >
              <Phone size={18} aria-hidden />
              Hemen Ara
            </a>
            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-base font-semibold text-white transition-colors duration-300 hover:border-primary-green hover:bg-primary-green"
            >
              <MessageCircle size={18} aria-hidden />
              WhatsApp
            </a>
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
