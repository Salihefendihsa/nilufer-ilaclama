export type ServiceIcon = "spray-can" | "wind" | "trees" | "clipboard-list";

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: ServiceIcon;
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "ilaclama-ve-dezenfeksiyon",
    title: "İlaçlama ve Dezenfeksiyon",
    description:
      "Konut, işyeri ve endüstriyel tesislerde ruhsatlı ürünlerle haşere kontrolü ve genel dezenfeksiyon.",
    longDescription:
      "Hamamböceği, fare, karınca, sivrisinek ve daha birçok haşereye karşı Sağlık Bakanlığı onaylı ürünler ve ekipmanlarla uygulama yapıyoruz. Uygulama sonrası EK-1 raporu ile tüm süreç kayıt altına alınır.",
    icon: "spray-can",
  },
  {
    slug: "fumigasyon",
    title: "Fümigasyon",
    description:
      "Depo, gemi, konteyner ve tahıl ürünlerinde gaz uygulamasıyla derinlemesine haşere imhası.",
    longDescription:
      "Kapalı hacimlerde gaz halindeki ilaçlarla yapılan fümigasyon uygulaması, diğer yöntemlerle ulaşılamayan gizli alanlardaki haşereleri de etkisiz hale getirir. Uzman ve sertifikalı ekibimizle güvenli şekilde uygulanır.",
    icon: "wind",
  },
  {
    slug: "peyzaj-ve-bahce",
    title: "Peyzaj ve Bahçe",
    description:
      "Bahçe ve yeşil alanlarda zararlı böcek ve bitki hastalıklarına karşı koruyucu uygulamalar.",
    longDescription:
      "Bahçeniz ve peyzaj alanlarınızdaki bitkileri zararlı böceklere ve mantar hastalıklarına karşı koruyoruz. Mevsimsel bakım programlarıyla yeşil alanlarınızın sağlığını sürdürülebilir şekilde koruruz.",
    icon: "trees",
  },
  {
    slug: "danismanlik",
    title: "Danışmanlık",
    description:
      "İşletmeniz için haşere risk analizi, periyodik kontrol planı ve mevzuata uyum danışmanlığı.",
    longDescription:
      "Gıda, sağlık ve otelcilik sektöründeki işletmelere yönelik haşere risk analizi, HACCP uyumlu kontrol noktaları ve periyodik denetim planları hazırlıyoruz.",
    icon: "clipboard-list",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
