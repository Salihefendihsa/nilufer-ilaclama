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
    price: "Keşif sonrası teklif",
    period: "",
    featured: false,
    features: [
      "Aylık 1 ziyaret",
      "Temel haşere kontrolü (hamamböceği, karınca, fare)",
      "Sözleşme süresi teklifte belirlenir",
      "Ürün seçimi keşifte belirlenir",
      "Uygulama sonrası takip",
      "Telefon desteği",
    ],
    ctaLabel: "Keşif Talep Et",
  },
  {
    slug: "isyeri-paketi",
    name: "İşyeri Paketi",
    tagline: "İşletmeler için kapsamlı çözüm",
    price: "Keşif sonrası teklif",
    period: "",
    featured: true,
    features: [
      "Aylık 2 ziyaret",
      "Genel ilaçlama + dezenfeksiyon",
      "Raporlama kapsamı sözleşmede belirlenir",
      "Belgelendirme ihtiyacına göre planlama",
      "Öncelikli randevu ve hızlı müdahale",
      "Öncelikli destek (kapsam sözleşmede belirlenir)",
    ],
    ctaLabel: "Keşif Talep Et",
  },
  {
    slug: "kurumsal-paket",
    name: "Kurumsal Paket",
    tagline: "Büyük ölçekli tesisler için özel SLA",
    price: "Keşif sonrası teklif",
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
    ctaLabel: "Keşif Talep Et",
  },
];

export function getPackageBySlug(slug: string) {
  return PACKAGES.find((pkg) => pkg.slug === slug);
}
