"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { COMPANY } from "@/lib/data/company";

type Option = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

const OPTIONS: Option[] = [
  {
    title: "Online Talep",
    description: "Formu doldurun, ekibimiz sizinle iletişime geçsin.",
    cta: "Teklif Formuna Git",
    href: "/teklif",
    icon: ClipboardList,
  },
  {
    title: "Telefon",
    description: "Sorularınız için doğrudan arayabilirsiniz.",
    cta: COMPANY.phoneDisplay,
    href: `tel:${COMPANY.phoneHref}`,
    icon: Phone,
  },
  {
    title: "WhatsApp",
    description: "Fotoğraf ve kısa bir açıklama ile yazabilirsiniz.",
    cta: "WhatsApp'tan Yaz",
    href: COMPANY.whatsappHref,
    icon: MessageCircle,
    external: true,
  },
];

export default function ContactOptions() {
  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Size Uygun Yoldan Ulaşın
          </h2>
          <p className="mt-4 text-base text-ink/60 sm:text-lg">
            Talebinizi online iletebilir, arayabilir veya WhatsApp&apos;tan
            yazabilirsiniz.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3 md:gap-5">
          {OPTIONS.map((option, i) => {
            const Icon = option.icon;
            const className =
              "mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-primary-red px-6 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green";
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{option.title}</h3>
                <p className="mb-5 mt-2 text-sm leading-relaxed text-ink/60">
                  {option.description}
                </p>
                {option.external ? (
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {option.cta}
                  </a>
                ) : option.href.startsWith("/") ? (
                  <Link href={option.href} className={className}>
                    {option.cta}
                  </Link>
                ) : (
                  <a href={option.href} className={className}>
                    {option.cta}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
