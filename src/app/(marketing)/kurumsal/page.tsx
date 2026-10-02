import type { Metadata } from "next";
import { MapPin, ShieldCheck, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Kurumsal | Nilüfer İlaçlama",
  description:
    "Nilüfer İlaçlama'nın hikayesi, misyonu ve hizmet yaklaşımı hakkında bilgi alın.",
  alternates: { canonical: "/kurumsal" },
};

const VALUES = [
  {
    icon: MapPin,
    title: "Hizmet Bölgesi",
    description:
      "Bursa'da konut, işyeri ve endüstriyel tesislere yönelik ilaçlama ve haşere kontrol hizmeti veriyoruz.",
  },
  {
    icon: Target,
    title: "Misyonumuz",
    description:
      "İnsan ve çevre sağlığına ilişkin koşulları gözeterek ihtiyaca uygun yöntemleri ve hizmet kapsamını açıkça paylaşmak.",
  },
  {
    icon: ShieldCheck,
    title: "Şeffaf Süreç",
    description:
      "Keşif sonrası kapsam, uygulama yöntemi ve raporlama koşulları teklifte açıkça belirtilir.",
  },
];

export default function KurumsalPage() {
  return (
    <section className="bg-white px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">Kurumsal</h1>
          <p className="mt-3 text-ink/60">Hakkımızda</p>
        </div>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-ink/70">
          <p>
            Nilüfer İlaçlama, Bursa&apos;da konut, işyeri ve endüstriyel
            tesislere yönelik ilaçlama ve haşere kontrol hizmetleri
            sunmaktadır. Temel önceliğimiz; insan sağlığına ve çevreye
            özen gösteren, ihtiyaca uygun uygulama planları hazırlamaktır.
          </p>
          <p>
            Uygulama öncesinde mekânı inceler, kapsamı ve yöntemi sizinle
            paylaşırız. Ruhsat, sertifika ve raporlama bilgilerini talep
            ettiğinizde bizden öğrenebilirsiniz.
          </p>
          <p>
            Bursa&apos;nın Nilüfer, Osmangazi, Yıldırım, Mudanya, Gemlik ve
            Karacabey ilçelerinde hizmet veriyoruz.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-2xl border-l-4 border-primary-green bg-white p-6 shadow-md ring-1 ring-ink/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h2 className="mt-4 text-base font-bold text-ink">{value.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
