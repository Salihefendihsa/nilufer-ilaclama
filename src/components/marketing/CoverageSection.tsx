"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DISTRICTS } from "@/lib/data/districts";

type StatCard = {
  value: string;
  label: string;
};

const STAT_CARDS: StatCard[] = [
  { value: "Bursa", label: "Hizmet Bölgesi" },
  { value: String(DISTRICTS.length), label: "Haritada Gösterilen İlçe" },
  { value: "Nilüfer", label: "Merkez Ofis" },
];

/**
 * Basitleştirilmiş Bursa ili dış sınır konturu — kuzeyde Marmara kıyısı,
 * Mudanya yarımadası (kuzeybatı) ve Gemlik körfezi girintisi ile
 * güneye doğru genişleyen ana kara parçasını temsil eder.
 */
const BURSA_OUTLINE =
  "M50,52 L88,33 L128,24 L158,44 L185,74 L213,48 L248,28 L298,46 L320,82 L306,128 L292,168 L262,204 L212,224 L162,230 L112,214 L72,196 L36,160 L26,110 Z";

export default function CoverageSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredDistrict = DISTRICTS.find((d) => d.name === hovered);

  return (
    <section id="hizmet-bolgeleri" className="scroll-mt-20 bg-ink py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Bursa&apos;da Hizmet Bölgelerimiz
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Nilüfer, Osmangazi, Yıldırım, Mudanya, Gemlik ve Karacabey&apos;de
            hizmet veriyoruz. Diğer ilçeler için talebinizde belirtin.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <svg
              viewBox="0 0 340 240"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="Bursa ilçeleri hizmet haritası"
            >
              <path
                d={BURSA_OUTLINE}
                fill="rgba(93,161,48,0.07)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {DISTRICTS.map((d, i) => (
                <g
                  key={d.name}
                  onMouseEnter={() => setHovered(d.name)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  <circle cx={d.x} cy={d.y} r="14" fill="transparent" />
                  <motion.circle
                    cx={d.x}
                    cy={d.y}
                    r="6"
                    fill="#5DA130"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  />
                  <text
                    x={d.x}
                    y={d.y - 14}
                    textAnchor="middle"
                    fontSize="11"
                    fill="rgba(255,255,255,0.85)"
                    fontWeight={600}
                  >
                    {d.name}
                  </text>
                </g>
              ))}
            </svg>

            {hoveredDistrict && (
              <div
                className="pointer-events-none absolute z-10 w-48 -translate-x-1/2 -translate-y-full rounded-xl border border-white/10 bg-ink px-3.5 py-2.5 text-xs leading-relaxed text-white/80 shadow-xl"
                style={{
                  left: `${(hoveredDistrict.x / 340) * 100}%`,
                  top: `${(hoveredDistrict.y / 240) * 100 - 4}%`,
                }}
              >
                <p className="font-semibold text-primary-green">
                  {hoveredDistrict.name}
                </p>
                <p className="mt-0.5">{hoveredDistrict.description}</p>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {STAT_CARDS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-3xl font-extrabold text-primary-green sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-white/70 sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
