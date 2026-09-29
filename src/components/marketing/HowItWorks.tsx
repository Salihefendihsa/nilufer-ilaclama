"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ClipboardCheck,
  FileCheck2,
  Search,
  SprayCan,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Talep Oluştur",
    description: "Web sitemiz, telefon veya WhatsApp üzerinden birkaç saniyede talebinizi iletin.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Uzman İnceleme",
    description: "Ekibimiz talebinizi değerlendirir, ihtiyacınıza uygun çözümü belirler.",
    icon: Search,
  },
  {
    number: "03",
    title: "Keşif ve Teklif",
    description: "Yerinde ücretsiz keşif yapılır, size özel şeffaf bir teklif sunulur.",
    icon: FileCheck2,
  },
  {
    number: "04",
    title: "Randevu Onayı",
    description: "Size en uygun tarih ve saatte randevu netleştirilir.",
    icon: CalendarCheck,
  },
  {
    number: "05",
    title: "Uygulama",
    description: "Ekibimiz, keşifte belirlenen plana göre uygulamayı gerçekleştirir.",
    icon: SprayCan,
  },
  {
    number: "06",
    title: "Rapor ve Takip",
    description: "Uygulama sonrası bilgilendirme yapılır; raporlama ve takip koşulları teklifte netleştirilir.",
    icon: UserCheck,
  },
];

export default function HowItWorks() {
  return (
    <section id="nasil-calisir" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Hizmet Almak Hiç Bu Kadar Kolay Olmamıştı
          </h2>
          <p className="mt-4 text-base text-ink/60 sm:text-lg">
            Talebinizden uygulama sonrası takibe kadar süreç altı adımda
            ilerler.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-extrabold text-primary-green/25">
                    {step.number}
                  </span>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.4, delay: 0.15 },
                      },
                    }}
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green"
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </motion.div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
