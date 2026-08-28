"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const HERO_POSTER_IMAGE = "/images/bahce-cit-ilaclama-uygulama.png";

const HeroVideo = dynamic(() => import("./HeroVideo"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

const AVATAR_COLORS = ["bg-primary-green", "bg-primary-red", "bg-ink", "bg-white/30"];

export default function Hero() {
  return (
    <section className="relative z-0 flex min-h-screen w-full items-center overflow-hidden bg-ink">
      <div className="absolute inset-0 z-0">
        {/* Mobilde performans/veri tasarrufu için statik poster, video yerine gösterilir. */}
        <Image
          src={HERO_POSTER_IMAGE}
          alt="Profesyonel ilaçlama teknisyeni uygulama yaparken"
          fill
          priority
          sizes="100vw"
          className="object-cover sm:hidden"
        />
        <HeroVideo posterSrc={HERO_POSTER_IMAGE} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/40 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-green" />
            <span className="text-xs font-semibold tracking-wide text-white/90 sm:text-sm">
              BURSA&apos;NIN GÜVENİLİR İLAÇLAMA FİRMASI
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className="block text-white">Eviniz</span>
            <span className="block text-white/50">GÜVENDE,</span>
            <span className="block">
              Yaşamınız <span className="text-primary-green">Rahat.</span>
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="mt-6 text-lg font-semibold text-white/80 sm:text-xl"
          >
            Memnuniyet Odaklı Kalıcı Çözümler.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/teklif"
              className="rounded-full bg-primary-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-red/30 transition-colors duration-300 hover:bg-primary-green sm:text-base"
            >
              Ücretsiz Keşif Talep Et
            </Link>
            <Link
              href="/hizmetlerimiz"
              className="rounded-full border-2 border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-primary-green hover:bg-primary-green sm:text-base"
            >
              Nasıl Çalışır?
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="mt-14 inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATAR_COLORS.map((color, i) => (
                  <span
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink text-[10px] font-bold text-white ${color}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                ))}
              </div>
              <div className="text-sm text-white/85">
                <span className="font-bold text-white">500+</span> memnun müşteri{" "}
                <span className="inline-flex items-center gap-0.5 align-middle">
                  <Star size={13} className="fill-primary-green text-primary-green" />
                  <span className="font-semibold text-white">4.9</span>
                </span>
              </div>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="text-sm text-white/85">
              <span className="font-bold text-white">12+</span> aktif ekip
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        aria-hidden
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
