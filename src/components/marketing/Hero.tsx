"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

function HeroVisual() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative h-[360px] sm:h-[440px] lg:h-[520px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary-green/25 opacity-70 blur-3xl"
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative h-full w-full"
      >
        <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-primary-green/40">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Modern ve temiz bir ev iç mekanı"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-primary-green/30" />
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(40px)" }}
          className="absolute -bottom-6 left-4 w-56 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-xl backdrop-blur-md sm:left-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-green/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5DA130"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="12" cy="12" r="0.75" fill="#5DA130" />
                <path d="M12 3v2.5" />
                <path d="M12 18.5V21" />
                <path d="M3 12h2.5" />
                <path d="M18.5 12H21" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-ink">
                10+ Yıl Tecrübe
              </p>
              <p className="text-xs leading-tight text-ink/60">
                Ruhsatlı, güvenilir uygulama
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="text-center lg:text-left">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl"
          >
            İlaçlama <span className="text-primary-green">Garantisi</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="mt-4 text-xl font-semibold text-primary-red sm:text-2xl"
          >
            Memnuniyet odaklı kalıcı çözümler
          </motion.p>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base text-ink/70 sm:text-lg lg:mx-0"
          >
            Konut, işyeri ve endüstriyel tesisler için ruhsatlı ekip ve
            onaylı ürünlerle uygulanan, uzun ömürlü ve güvenli haşere
            kontrol hizmetleri sunuyoruz.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="/teklif"
              className="rounded-full bg-primary-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-red/20 transition-colors duration-300 hover:bg-primary-green sm:text-base"
            >
              Ücretsiz Keşif Talep Et
            </a>
            <a
              href="/hizmetlerimiz"
              className="rounded-full border-2 border-primary-green px-7 py-3.5 text-sm font-semibold text-primary-green transition-colors duration-300 hover:bg-primary-green hover:text-white sm:text-base"
            >
              Hizmetlerimizi İncele
            </a>
          </motion.div>
        </div>

        <HeroVisual />
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink/40"
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
