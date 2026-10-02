"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { COMPANY } from "@/lib/data/company";
import { HOME_SECTIONS } from "@/lib/data/homeSections";

const NAV_LINKS = [
  { label: "Anasayfa", href: "/" },
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
  { label: "Paketlerimiz", href: "/paketler" },
  { label: "Haşere Rehberi", href: "/hasere-rehberi" },
  { label: "Şubelerimiz", href: "/subelerimiz" },
  { label: "S.S.S", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-ink/10 shadow-md" : "border-ink/5 shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Nilüfer İlaçlama"
            width={180}
            height={60}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink transition-colors hover:text-primary-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/teklif"
            className="rounded-full bg-primary-red px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
          >
            Ücretsiz Keşif
          </Link>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
        <a
          href={`tel:${COMPANY.phoneHref}`}
          aria-label={`Ara: ${COMPANY.phoneDisplay}`}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-green text-white"
        >
          <Phone size={20} aria-hidden />
        </a>
        <button
          type="button"
          aria-label="Menüyü aç/kapat"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 rounded-full bg-ink"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 w-6 rounded-full bg-ink"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6 rounded-full bg-ink"
          />
        </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-ink/10 bg-white/95 backdrop-blur-md xl:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-primary-green/10 hover:text-primary-green"
                >
                  {link.label}
                </Link>
              ))}

              {pathname === "/" && (
                <div className="mt-2 border-t border-ink/10 pt-3">
                  <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wide text-ink/60">
                    Sayfa bölümleri
                  </p>
                  {HOME_SECTIONS.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setMenuOpen(false);
                        window.history.pushState(null, "", `#${id}`);
                        window.setTimeout(() => {
                          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                          document.getElementById(id)?.scrollIntoView({
                            behavior: reduceMotion ? "instant" : "smooth",
                            block: "start",
                          });
                        }, 300);
                      }}
                      className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-primary-green/10 hover:text-primary-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-green"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}

              <Link
                href="/teklif"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-primary-red px-5 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
              >
                Ücretsiz Keşif
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
