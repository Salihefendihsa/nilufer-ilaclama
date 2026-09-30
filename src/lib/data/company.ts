// Canlı site adresi — sitemap.ts ve robots.ts buradan besleniyor.
// Özel domain bağlandığında (örn. niluferilaclama.com.tr) tek satırda güncelleyin.
export const SITE_URL = "https://nilufer-ilaclama.altinisikhilmisalih.workers.dev";

export const COMPANY = {
  name: "Nilüfer İlaçlama",
  phoneDisplay: "0850 550 16 16",
  phoneHref: "08505501616",
  phoneSecondaryDisplay: "0224 452 16 34",
  phoneSecondaryHref: "02244521634",
  email: "info@niluferilaclama.com.tr",
  addressLine1: "Çamlıca Mah. Gizem Sk. No:5 C/N",
  addressLine2: "Nilüfer / Bursa",
  whatsappHref: "https://wa.me/905523031634",
};

// Google Maps embed URL — API anahtarı gerektirmez, adres COMPANY'den
// otomatik türetilir. Adres değişirse yalnızca yukarıdaki alanları güncelleyin.
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${COMPANY.addressLine1}, ${COMPANY.addressLine2}`
)}&output=embed`;
