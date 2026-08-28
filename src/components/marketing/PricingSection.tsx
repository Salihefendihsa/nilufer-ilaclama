"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PACKAGES } from "@/lib/data/packages";

export default function PricingSection() {
  return (
    <section className="bg-gradient-to-br from-ink via-ink to-primary-green/15 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Bakım Paketlerimiz
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            İhtiyacınıza uygun periyodik bakım paketiyle sürekli koruma
            altında kalın.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={
                pkg.featured
                  ? "relative rounded-3xl border-2 border-primary-green bg-white p-8 shadow-2xl shadow-primary-green/20 lg:scale-105"
                  : "relative rounded-3xl border border-white/10 bg-white/95 p-8 shadow-lg"
              }
            >
              {pkg.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary-green px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                  En Popüler
                </span>
              )}

              <h3 className="text-xl font-extrabold text-ink">{pkg.name}</h3>
              <p className="mt-1 text-sm text-ink/50">{pkg.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-ink">
                  {pkg.price}
                </span>
                {pkg.period && (
                  <span className="text-sm font-medium text-ink/50">
                    {pkg.period}
                  </span>
                )}
              </div>

              <ul className="mt-6 space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/70"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-primary-green"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/teklif?paket=${pkg.slug}`}
                className={
                  pkg.featured
                    ? "mt-8 block rounded-full bg-primary-red px-6 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
                    : "mt-8 block rounded-full border-2 border-primary-green px-6 py-3 text-center text-sm font-semibold text-primary-green transition-colors duration-300 hover:bg-primary-green hover:text-white"
                }
              >
                {pkg.ctaLabel}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
