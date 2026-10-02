"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Biohazard,
  Bug,
  Microscope,
  ShieldAlert,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type OrbitItem = {
  label: string;
  icon: LucideIcon;
  angle: number;
};

const ORBIT_ITEMS: OrbitItem[] = [
  { label: "Mikroplar", icon: Sparkles, angle: -90 },
  { label: "Virüs & Bakteriler", icon: Microscope, angle: 0 },
  { label: "Zararlı Alerjenler", icon: ShieldAlert, angle: 90 },
  { label: "Haşereler", icon: Bug, angle: 180 },
];

const SEGMENTS = [
  "Okullar",
  "Sağlık Ofisleri",
  "AVM",
  "Depo",
  "Dini Merkezler",
  "Ofisler",
  "Kreşler",
  "Perakende",
  "Spor Salonları",
];

const RADIUS = 150;

function OrbitDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 420 420"
        aria-hidden
      >
        <circle
          cx="210"
          cy="210"
          r="180"
          fill="none"
          stroke="rgba(93,161,48,0.15)"
          strokeWidth="1"
          strokeDasharray="3 9"
        />

        {ORBIT_ITEMS.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = 210 + RADIUS * Math.cos(rad);
          const y = 210 + RADIUS * Math.sin(rad);
          return (
            <g key={item.label}>
              <line
                x1="210"
                y1="210"
                x2={x}
                y2={y}
                stroke="rgba(93,161,48,0.35)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-primary-red">
          <div
            className="flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-inset ring-white/30"
          >
            <Biohazard size={40} className="text-white" strokeWidth={1.6} />
          </div>
        </div>
      </div>

      {ORBIT_ITEMS.map((item) => {
        const rad = (item.angle * Math.PI) / 180;
        const x = 210 + RADIUS * Math.cos(rad);
        const y = 210 + RADIUS * Math.sin(rad);
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            style={{
              left: `${(x / 420) * 100}%`,
              top: `${(y / 420) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute flex w-[22%] min-w-[72px] cursor-default flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white p-2 text-center sm:p-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-green/10 text-primary-green">
              <Icon size={18} strokeWidth={1.8} />
            </div>
            <p className="text-[11px] font-semibold leading-tight text-ink">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function ScienceSection() {
  return (
    <section id="mekana-ozel-planlama" className="scroll-mt-20 overflow-hidden bg-white py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-green/30 bg-primary-green/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-green" />
              <span className="text-xs font-semibold tracking-wide text-primary-green sm:text-sm">
                MEKÂNA ÖZEL PLANLAMA
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Mekâna Göre Planlanan Uygulama.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-ink/60 sm:text-lg">
              Uygulamayı genel bir şablonla değil, mekâna göre planlarız.
              Keşifte zararlı türünü, yoğunluğu ve risk noktalarını
              inceler, uygulamayı bu tespitlere göre belirleriz.
            </p>

            <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
              Okullar, sağlık ofisleri, AVM&apos;ler, depolar, dini
              merkezler, ofisler, kreşler, perakende mağazaları ve spor
              salonları gibi hassasiyet gerektiren mekânlar için de
              teklif hazırlıyoruz.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SEGMENTS.map((segment) => (
                <span
                  key={segment}
                  className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1.5 text-xs font-medium text-ink/60"
                >
                  {segment}
                </span>
              ))}
            </div>

            <p className="mt-4 text-xs text-ink/45">
              Kapsam ve raporlama koşulları, keşif sonrası teklifte netleştirilir.
            </p>

            <Link
              href="/teklif"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-red/20 transition-colors duration-300 hover:bg-primary-green sm:text-base"
            >
              Ücretsiz Keşif Talep Et
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {ORBIT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-ink/10 p-4 text-center">
                    <Icon size={22} className="text-primary-green" aria-hidden />
                    <span className="text-sm font-semibold text-ink">{item.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="hidden lg:block"><OrbitDiagram /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
