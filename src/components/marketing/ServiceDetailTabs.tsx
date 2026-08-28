"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bug,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Container,
  FileSearch,
  Home,
  Landmark,
  Scale,
  SprayCan,
  Sprout,
  Trees,
  Users,
  Warehouse,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type ServiceIcon, type SubServiceIcon } from "@/lib/data/services";
import { SERVICE_IMAGES } from "@/lib/data/service-images";

const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  "spray-can": SprayCan,
  wind: Wind,
  trees: Trees,
  "clipboard-list": ClipboardList,
};

const SUB_SERVICE_ICONS: Record<SubServiceIcon, LucideIcon> = {
  trees: Trees,
  home: Home,
  bug: Bug,
  "building-2": Building2,
  container: Container,
  landmark: Landmark,
  warehouse: Warehouse,
  sprout: Sprout,
  "clipboard-check": ClipboardCheck,
  "file-search": FileSearch,
  users: Users,
  scale: Scale,
};

type SolutionTab = "kurumsal" | "ticari";

const SOLUTION_TABS: { key: SolutionTab; label: string }[] = [
  { key: "kurumsal", label: "Kurumsal Çözüm" },
  { key: "ticari", label: "Ticari Çözüm" },
];

export default function ServiceDetailTabs() {
  const [solutionTab, setSolutionTab] = useState<SolutionTab>("kurumsal");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = SERVICES[activeIndex];
  const ActiveIcon = SERVICE_ICONS[activeService.icon];
  const activeImage = SERVICE_IMAGES[activeService.slug];
  const activeDescription =
    solutionTab === "kurumsal"
      ? activeService.corporateDescription
      : activeService.commercialDescription;

  const goTo = (index: number) => {
    setActiveIndex((index + SERVICES.length) % SERVICES.length);
  };

  return (
    <section className="bg-ink/[0.02] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Hizmetlerimizi Yakından İnceleyin
          </h2>
          <p className="mt-4 text-base text-ink/60 sm:text-lg">
            Kurumsal ve ticari alanlara özel çözümlerimizin detaylarına göz
            atın.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-ink/10 bg-white p-1 shadow-sm">
            {SOLUTION_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSolutionTab(tab.key)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  solutionTab === tab.key
                    ? "bg-primary-green text-white"
                    : "text-ink/40 hover:text-ink/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon];
            return (
              <button
                key={service.slug}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                  activeIndex === i
                    ? "border-primary-green bg-primary-green/10 text-primary-green"
                    : "border-ink/10 text-ink/50 hover:border-primary-green/40 hover:text-ink/80"
                }`}
              >
                <Icon size={15} strokeWidth={1.8} />
                {service.title}
              </button>
            );
          })}
        </div>

        <div className="relative mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeService.slug}-${solutionTab}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
            >
              <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-xl sm:h-96">
                <Image
                  src={activeImage}
                  alt={activeService.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-primary-green backdrop-blur-sm">
                  <ActiveIcon size={22} strokeWidth={1.8} />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-extrabold text-ink sm:text-3xl">
                    {activeService.title}
                  </h3>
                  <Link
                    href={`/hizmetlerimiz/${activeService.slug}`}
                    className="text-sm font-semibold text-primary-green transition-colors hover:text-primary-red"
                  >
                    Detaylı İncele →
                  </Link>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
                  {activeService.longDescription}
                </p>

                <div className="mt-4 rounded-xl border border-primary-green/20 bg-primary-green/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-green">
                    {solutionTab === "kurumsal" ? "Kurumsal Çözüm" : "Ticari Çözüm"}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    {activeDescription}
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  {activeService.subServices.map((sub) => {
                    const SubIcon = SUB_SERVICE_ICONS[sub.icon];
                    return (
                      <div
                        key={sub.title}
                        className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white p-3.5"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-green/10 text-primary-green">
                          <SubIcon size={17} strokeWidth={1.8} />
                        </span>
                        <span className="text-xs font-semibold text-ink sm:text-sm">
                          {sub.title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="/teklif"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-red/20 transition-colors duration-300 hover:bg-primary-green sm:text-base"
                >
                  Şimdi Hizmet Al
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Önceki hizmet"
            onClick={() => goTo(activeIndex - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-colors hover:border-primary-green hover:text-primary-green"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Sonraki hizmet"
            onClick={() => goTo(activeIndex + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-colors hover:border-primary-green hover:text-primary-green"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
