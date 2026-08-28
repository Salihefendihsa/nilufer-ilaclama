import type { Metadata } from "next";
import Image from "next/image";
import { Award, ShieldCheck, Target } from "lucide-react";
import { DANISMANLIK_IMAGE } from "@/lib/data/service-images";

export const metadata: Metadata = {
  title: "Kurumsal | Nilüfer İlaçlama",
  description:
    "Nilüfer İlaçlama'nın hikayesi, misyonu ve ruhsat/sertifika standartları hakkında bilgi alın.",
};

const VALUES = [
  {
    icon: Award,
    title: "10+ Yıllık Tecrübe",
    description:
      "Bursa'da 10 yılı aşkın süredir konut, işyeri ve endüstriyel tesislerde haşere kontrol hizmeti veriyoruz.",
  },
  {
    icon: Target,
    title: "Misyonumuz",
    description:
      "Her müşterimize, insan ve çevre sağlığını önceleyen, kalıcı ve şeffaf çözümler sunarak yaşam alanlarını güvenli kılmak.",
  },
  {
    icon: ShieldCheck,
    title: "Ruhsat ve Sertifika",
    description:
      "Sağlık Bakanlığı ruhsatlı ekibimiz, onaylı biyosidal ürünlerle mevzuata tam uyumlu şekilde çalışır.",
  },
];

export default function KurumsalPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">Kurumsal</h1>
          <p className="mt-3 text-ink/60">Hakkımızda</p>
        </div>

        <div className="relative mt-10 h-64 w-full overflow-hidden rounded-3xl shadow-lg sm:h-80">
          <Image
            src={DANISMANLIK_IMAGE}
            alt="Nilüfer İlaçlama ekibi kurumsal danışmanlık görüşmesinde"
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-ink/70">
          <p>
            Nilüfer İlaçlama, 10 yılı aşkın süredir Bursa genelinde konut,
            işyeri ve endüstriyel tesislere yönelik profesyonel haşere
            kontrol hizmetleri sunmaktadır. Kurulduğumuz günden bu yana
            temel önceliğimiz; insan sağlığına ve çevreye zarar vermeyen,
            kalıcı ve güvenilir çözümler üretmek olmuştur.
          </p>
          <p>
            Ruhsatlı ve sertifikalı ekibimiz, Sağlık Bakanlığı onaylı
            biyosidal ürünlerle çalışır; her uygulama sonrası EK-1 raporu
            ile süreci kayıt altına alarak müşterilerimize tam şeffaflık
            sağlar. Sigortalı hizmet anlayışımız ve KVKK uyumlu veri
            süreçlerimizle, hem bireysel hem de kurumsal müşterilerimizin
            güvenini kazanmayı sürdürüyoruz.
          </p>
          <p>
            Bugün Bursa&apos;nın Nilüfer, Osmangazi, Yıldırım, Mudanya,
            Gemlik ve Karacabey ilçelerinde aktif ekiplerimizle hizmet
            veriyor; her geçen gün büyüyen müşteri portföyümüze memnuniyet
            odaklı, kalıcı çözümler sunmaya devam ediyoruz.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
