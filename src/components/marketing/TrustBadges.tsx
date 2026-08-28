"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  FileCheck,
  FlaskConical,
  Lock,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Badge = {
  title: string;
  icon: LucideIcon;
};

const BADGES: Badge[] = [
  { title: "Ruhsatlı ve Sertifikalı Ekip", icon: BadgeCheck },
  { title: "Onaylı Biyosidal Ürünler", icon: FlaskConical },
  { title: "Sigortalı Hizmet", icon: ShieldCheck },
  { title: "KVKK Uyumlu", icon: Lock },
  { title: "EK-1 Yasal Raporlama", icon: FileCheck },
  { title: "Uçtan Uca Takip", icon: ScrollText },
];

export default function TrustBadges() {
  return (
    <section className="bg-gradient-to-br from-ink via-ink to-primary-green/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Güveniniz Önceliğimiz
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Yasal mevzuata tam uyumlu, izlenebilir ve sigortalı hizmet
            standartlarıyla çalışıyoruz.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-green/20 text-primary-green">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <p className="text-sm font-semibold text-white sm:text-base">
                  {badge.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
