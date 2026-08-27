"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, SprayCan, Trees, Wind, type LucideIcon } from "lucide-react";
import { SERVICES, type ServiceIcon } from "@/lib/data/services";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  "spray-can": SprayCan,
  wind: Wind,
  trees: Trees,
  "clipboard-list": ClipboardList,
};

export default function Services() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-base text-ink/60 sm:text-lg">
            İhtiyacınıza uygun, ruhsatlı ve kalıcı çözümler sunan hizmet
            kategorilerimiz.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-2xl border-2 border-transparent bg-white p-6 shadow-md ring-1 ring-ink/5 transition-colors duration-300 hover:border-primary-green hover:shadow-primary-green/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green transition-colors duration-300 group-hover:bg-primary-green group-hover:text-white">
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                  {service.description}
                </p>
                <Link
                  href={`/hizmetlerimiz#${service.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-green transition-colors hover:text-primary-red"
                >
                  Detaylı Bilgi
                  <span aria-hidden>→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
