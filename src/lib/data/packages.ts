export type PackageItem = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  featured: boolean;
  features: string[];
  ctaLabel: string;
};

export const PACKAGES: PackageItem[] = [
  {
    slug: "ev-paketi",
    name: "Ev Paketi",
    tagline: "Konutlar için temel koruma",
    price: "₺450",
    period: "/ay",
    featured: false,
    features: [
      "Aylık 1 ziyaret",
      "Temel haşere kontrolü (hamamböceği, karınca, fare)",
      "Sözleşme süresi teklifte belirlenir",
      "Ürün seçimi keşifte belirlenir",
      "Uygulama sonrası takip",
      "Telefon desteği",
    ],
    ctaLabel: "Paketi Seç",
  },
  {
    slug: "isyeri-paketi",
    name: "İşyeri Paketi",
    tagline: "İşletmeler için kapsamlı çözüm",
    price: "₺950",
    period: "/ay",
    featured: true,
    features: [
      "Aylık 2 ziyaret",
      "Genel ilaçlama + dezenfeksiyon",
      "Raporlama kapsamı sözleşmede belirlenir",
      "Belgelendirme ihtiyacına göre planlama",
      "Öncelikli randevu ve hızlı müdahale",
      "Öncelikli destek (kapsam sözleşmede belirlenir)",
    ],
    ctaLabel: "Paketi Seç",
  },
  {
    slug: "kurumsal-paket",
    name: "Kurumsal Paket",
    tagline: "Büyük ölçekli tesisler için özel SLA",
    price: "Teklif Alın",
    period: "",
    featured: false,
    features: [
      "Haftalık ziyaret",
      "İlaçlama + fümigasyon + danışmanlık dahil",
      "Özel hizmet seviyesi koşulları teklifte belirlenir",
      "Saha bazlı risk analizi ve raporlama",
      "Personel eğitimi",
      "Özel hesap yöneticisi",
    ],
    ctaLabel: "Teklif Alın",
  },
];

export function getPackageBySlug(slug: string) {
  return PACKAGES.find((pkg) => pkg.slug === slug);
}
