"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { COMPANY, mapEmbedUrl } from "@/lib/data/company";

export default function IletisimPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">İletişim</h1>
          <p className="mt-3 text-ink/60">
            Sorularınız için bize ulaşın, en kısa sürede dönüş yapalım.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2">
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

          <div>
            {sent ? (
              <div className="rounded-2xl border border-primary-green/30 bg-primary-green/5 p-8 text-center">
                <p className="text-lg font-bold text-ink">Mesajınız Alındı</p>
                <p className="mt-2 text-sm text-ink/60">
                  En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Ad Soyad *"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                <input
                  type="tel"
                  required
                  placeholder="Telefon *"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Mesajınız *"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-none rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                <button
                  type="submit"
                  className="rounded-full bg-primary-red px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
                >
                  Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
