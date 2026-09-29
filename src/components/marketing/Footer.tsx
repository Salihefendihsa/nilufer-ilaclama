import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/lib/data/company";
import { SERVICES } from "@/lib/data/services";

const QUICK_LINKS = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
  { label: "Paketlerimiz", href: "/paketler" },
  { label: "Haşere Rehberi", href: "/hasere-rehberi" },
  { label: "İletişim", href: "/iletisim" },
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "S.S.S", href: "/sss" },
  { label: "Şubelerimiz", href: "/subelerimiz" },
  { label: "Blog", href: "/blog" },
];

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M14 9h2.5V6H14c-1.933 0-3.5 1.567-3.5 3.5V12H8v3h2.5v6h3v-6H16l.5-3h-3v-2c0-.552.448-1 1-1Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-green/15 text-primary-green ring-1 ring-inset ring-primary-green/30">
                <ShieldCheck size={20} strokeWidth={1.8} />
              </span>
              <p className="text-lg font-extrabold leading-none tracking-tight">
                <span className="text-white">Nilüfer</span>{" "}
                <span className="text-primary-green">İlaçlama</span>
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Bursa&apos;da konut, işyeri ve endüstriyel tesisler için ilaçlama,
              dezenfeksiyon ve haşere kontrol hizmetleri sunuyoruz.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={COMPANY.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary-green"
              >
                <InstagramIcon width={16} height={16} />
              </a>
              <a
                href={COMPANY.facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary-green"
              >
                <FacebookIcon width={16} height={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Hızlı Erişim
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-primary-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Hizmetlerimiz
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/hizmetlerimiz#${service.slug}`}
                    className="text-sm text-white/80 transition-colors hover:text-primary-green"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              İletişim
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-primary-green" />
                <div className="flex flex-col">
                  <a href={`tel:${COMPANY.phoneHref}`} className="hover:text-primary-green">
                    {COMPANY.phoneDisplay}
                  </a>
                  <a
                    href={`tel:${COMPANY.phoneSecondaryHref}`}
                    className="hover:text-primary-green"
                  >
                    {COMPANY.phoneSecondaryDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-primary-green" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-primary-green">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary-green" />
                <span>
                  {COMPANY.addressLine1}
                  <br />
                  {COMPANY.addressLine2}
                </span>
              </li>
            </ul>

            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-green px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle size={16} />
              WhatsApp&apos;tan Yazın
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Ücretsiz keşif talep edin</h3>
            <p className="mt-1 text-xs text-white/50">
              Talebinizi iletin, ekibimiz sizi arasın.
            </p>
          </div>
          <Link
            href="/teklif"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-red px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
          >
            Teklif Al
          </Link>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {COMPANY.name}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
