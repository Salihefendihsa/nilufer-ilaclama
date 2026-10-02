import Link from "next/link";
import { ClipboardList, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { COMPANY, mapEmbedUrl } from "@/lib/data/company";

export default function IletisimPage() {
  return (
    <section className="bg-white px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">İletişim</h1>
          <p className="mt-3 text-ink/60">
            Sorularınız için bize ulaşın, en kısa sürede dönüş yapalım.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-green/10 text-primary-green">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Telefon</p>
                  <a
                    href={`tel:${COMPANY.phoneHref}`}
                    className="block text-sm text-ink/60 hover:text-primary-green"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                  <a
                    href={`tel:${COMPANY.phoneSecondaryHref}`}
                    className="block text-sm text-ink/60 hover:text-primary-green"
                  >
                    {COMPANY.phoneSecondaryDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-green/10 text-primary-green">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">E-posta</p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-sm text-ink/60 hover:text-primary-green"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-green/10 text-primary-green">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Adres</p>
                  <p className="text-sm text-ink/60">
                    {COMPANY.addressLine1}
                    <br />
                    {COMPANY.addressLine2}
                  </p>
                </div>
              </li>
            </ul>

            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-green px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle size={16} />
              WhatsApp&apos;tan Yazın
            </a>

            <div className="mt-8 h-64 overflow-hidden rounded-2xl border border-ink/10">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="Nilüfer İlaçlama konum haritası"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-ink">Hemen ulaşın</h2>
            <p className="text-sm text-ink/60">
              Aşağıdaki yollardan birini seçin. Online talep için teklif
              formunu kullanabilirsiniz.
            </p>
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-ink/10 px-5 py-3 text-ink transition-colors hover:border-primary-green"
            >
              <Phone size={20} className="shrink-0 text-primary-green" aria-hidden />
              <span className="text-sm font-semibold">Ara: {COMPANY.phoneDisplay}</span>
            </a>
            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-ink/10 px-5 py-3 text-ink transition-colors hover:border-primary-green"
            >
              <MessageCircle size={20} className="shrink-0 text-primary-green" aria-hidden />
              <span className="text-sm font-semibold">WhatsApp&apos;tan yazın</span>
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-ink/10 px-5 py-3 text-ink transition-colors hover:border-primary-green"
            >
              <Mail size={20} className="shrink-0 text-primary-green" aria-hidden />
              <span className="min-w-0 break-words text-sm font-semibold">
                E-posta: {COMPANY.email}
              </span>
            </a>
            <Link
              href="/teklif"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary-red px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
            >
              <ClipboardList size={18} aria-hidden />
              Ücretsiz Keşif Talep Et
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
