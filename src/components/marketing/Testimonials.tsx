"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  comment: string;
  monthsAgo: number;
  applications: number;
  color: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ayşe Kaya",
    role: "Site Yöneticisi",
    comment:
      "Sitemizdeki hamamböceği sorununu kalıcı olarak çözdüler. Ekip çok titiz ve zamanında geldi.",
    monthsAgo: 2,
    applications: 4,
    color: "bg-primary-green",
  },
  {
    name: "Mehmet Demir",
    role: "Restoran İşletmecisi",
    comment:
      "Gıda güvenliği denetimleri için EK-1 raporları çok işimize yaradı. Profesyonel bir ekip.",
    monthsAgo: 1,
    applications: 8,
    color: "bg-primary-red",
  },
  {
    name: "Fatma Şahin",
    role: "Ev Sahibi",
    comment:
      "Karınca istilasından bir uygulamada kurtulduk. Ürünler kokusuz, evcil hayvanımıza zararı olmadı.",
    monthsAgo: 3,
    applications: 2,
    color: "bg-ink",
  },
  {
    name: "Ahmet Yıldız",
    role: "Fabrika Müdürü",
    comment:
      "Periyodik kontrol planıyla üretim alanımızı sürekli güvence altında tutuyorlar. Çok memnunuz.",
    monthsAgo: 4,
    applications: 12,
    color: "bg-primary-green",
  },
  {
    name: "Zeynep Arslan",
    role: "Otel İşletmecisi",
    comment:
      "Tahtakurusu sorununu ısı uygulamasıyla tek seferde çözdüler. Misafirlerimizden şikayet gelmiyor artık.",
    monthsAgo: 1,
    applications: 5,
    color: "bg-primary-red",
  },
  {
    name: "Hüseyin Çelik",
    role: "Depo Sorumlusu",
    comment:
      "Fümigasyon uygulaması sonrası ürünlerimizde herhangi bir zarar oluşmadı, çok memnun kaldık.",
    monthsAgo: 5,
    applications: 3,
    color: "bg-ink",
  },
  {
    name: "Elif Yılmaz",
    role: "Site Yöneticisi",
    comment:
      "Randevu süreci çok pratikti, ekip dakikasında geldi ve alanı temiz bıraktı. Kesinlikle tavsiye ederim.",
    monthsAgo: 2,
    applications: 6,
    color: "bg-primary-green",
  },
  {
    name: "Burak Özdemir",
    role: "Ev Sahibi",
    comment:
      "Fare sorunumuzu kalıcı olarak çözdüler, giriş noktalarını da kapattılar. Tekrar sorun yaşamadık.",
    monthsAgo: 6,
    applications: 1,
    color: "bg-primary-red",
  },
];

const SUMMARY = [
  { value: "4.9", label: "Ortalama Puan" },
  { value: "500+", label: "Mutlu Müşteri" },
  { value: "460+", label: "Olumlu Yorum" },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="mt-4 text-base text-ink/60 sm:text-lg">
            Bursa genelinde binlerce müşterimizin memnuniyetiyle
            çalışıyoruz.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${t.color}`}
                >
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-ink/50">{t.role}</p>
                </div>
              </div>

              <div className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary-green/10 px-2.5 py-1 text-[11px] font-semibold text-primary-green">
                <BadgeCheck size={13} />
                Doğrulanmış Müşteri
              </div>

              <div className="mt-3 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="fill-primary-red text-primary-red" />
                ))}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                &ldquo;{t.comment}&rdquo;
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-xs text-ink/45">
                <span>{t.monthsAgo} ay önce</span>
                <span>{t.applications} uygulama tamamlandı</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mt-14 grid grid-cols-1 gap-6 rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 text-center sm:grid-cols-3"
        >
          {SUMMARY.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-ink sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-ink/60">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
