export type ServiceIcon = "spray-can" | "wind" | "trees" | "clipboard-list";

export type SubServiceIcon =
  | "trees"
  | "home"
  | "bug"
  | "building-2"
  | "container"
  | "landmark"
  | "warehouse"
  | "sprout"
  | "clipboard-check"
  | "file-search"
  | "users"
  | "scale";

export type SubService = {
  title: string;
  icon: SubServiceIcon;
  description: string;
};

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: ServiceIcon;
  subServices: SubService[];
  whyUs: string[];
  corporateDescription: string;
  commercialDescription: string;
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "ilaclama-ve-dezenfeksiyon",
    title: "İlaçlama ve Dezenfeksiyon",
    description:
      "Konut, işyeri ve endüstriyel tesislerde haşere kontrolü ve genel dezenfeksiyon.",
    longDescription:
      "Hamamböceği, fare, karınca, sivrisinek ve daha birçok haşereye karşı uygun ürün ve ekipmanlarla uygulama yapıyoruz. Raporlama kapsamı ve koşulları keşif sonrası teklifte netleştirilir.",
    icon: "spray-can",
    subServices: [
      {
        title: "Bahçe İlaçlama",
        icon: "trees",
        description:
          "Bahçe alanındaki zararlılar ve bitki örtüsü birlikte değerlendirilir. Uygun ürün ve yöntem, bitki türü ile alan koşullarına göre seçilir.",
      },
      {
        title: "Ev-Bahçe İlaçlama",
        icon: "home",
        description:
          "Konut iç mekânı ve bahçe birlikte değerlendirilir. İç ve dış alan için uygun yöntem ile ziyaret kapsamı keşifte belirlenir.",
      },
      {
        title: "Haşere İlaçlama",
        icon: "bug",
        description:
          "Hamamböceği, karınca, tahtakurusu gibi yaygın haşerelere yönelik hedefe özel uygulama yapılır. Tür bazlı doğru ürün seçimiyle etkinlik artırılır.",
      },
      {
        title: "Genel İlaçlama",
        icon: "building-2",
        description:
          "İşyeri, apartman ve site gibi geniş alanlarda periyodik genel ilaçlama programı uyguluyoruz. Ortak alanlar dahil tüm riskli noktalar kapsanır.",
      },
    ],
    whyUs: [
      "Ürün ve yöntem seçimini keşifte belirlenen ihtiyaca göre yapıyoruz",
      "Raporlama kapsamını teklif aşamasında sizinle netleştiriyoruz",
      "Evcil hayvan ve çocukların bulunduğu alanların koşullarını ürün seçiminde değerlendiriyoruz",
      "Uygulama sonrası takip ve tekrar uygulama koşullarını teklifte belirtiyoruz",
    ],
    corporateDescription:
      "Fabrika, ofis ve site yönetimleri için toplu sözleşmeli, periyodik ilaçlama ve dezenfeksiyon programları hazırlıyoruz. Raporlama ve yıllık plan koşulları teklifte netleştirilir.",
    commercialDescription:
      "Restoran, mağaza ve küçük işletmeler için esnek randevulu, tek seferlik veya ihtiyaç bazlı ilaçlama hizmeti sunuyoruz. Hızlı müdahale ve uygun fiyatlı paketlerle işinizi aksatmadan çözüm sağlıyoruz.",
  },
  {
    slug: "fumigasyon",
    title: "Fümigasyon",
    description:
      "Depo, gemi, konteyner ve tahıl ürünlerinde gaz uygulamasıyla derinlemesine haşere imhası.",
    longDescription:
      "Fümigasyon, kapalı hacimlerdeki zararlı riskleri için değerlendirilebilen bir yöntemdir. Uygunluğu, yöntem ve güvenlik koşulları keşifte belirlenir.",
    icon: "wind",
    subServices: [
      {
        title: "Silo Fümigasyon",
        icon: "container",
        description:
          "Tahıl silolarında depolama zararlılarına karşı gaz fümigasyonu uyguluyoruz. Ürün kalitesi korunarak tam nüfuziyet sağlanır.",
      },
      {
        title: "Konteyner Fümigasyon",
        icon: "container",
        description:
          "İhracat ve ithalat konteynerlerinde uluslararası standartlara uygun fümigasyon yapıyoruz. Gümrük ve karantina şartlarına tam uyumludur.",
      },
      {
        title: "Tarihi Eser Fümigasyonu",
        icon: "landmark",
        description:
          "Müze ve arşiv gibi hassas alanlarda malzeme türü ve riskler değerlendirilerek uygun yöntem planlanır.",
      },
      {
        title: "Ambar/Depo Fümigasyonu",
        icon: "warehouse",
        description:
          "Büyük hacimli ambar ve depolarda derinlemesine, tüm gizli alanlara nüfuz eden fümigasyon uygulaması yapıyoruz.",
      },
    ],
    whyUs: [
      "Fümigasyonu mevzuat gerekliliklerini dikkate alarak planlıyoruz",
      "Uygulama sırasında ve sonrasında güvenlik kontrollerini planlıyoruz",
      "İhracat süreçleri için gereken raporlama ihtiyacını keşifte konuşuyoruz",
      "Ürün ve malzeme bütünlüğünü koruyan uygulama protokolleri kullanıyoruz",
    ],
    corporateDescription:
      "Lojistik firmaları, ihracatçılar ve kurumsal depo işletmeleri için gümrük/karantina şartlarını dikkate alan fümigasyon programları planlıyoruz.",
    commercialDescription:
      "Küçük ölçekli depo ve konteyner sahipleri için ihtiyaç anında planlanabilen, tek seferlik fümigasyon hizmeti sunuyoruz.",
  },
  {
    slug: "peyzaj-ve-bahce",
    title: "Peyzaj ve Bahçe",
    description:
      "Bahçe ve yeşil alanlarda zararlı böcek ve bitki hastalıklarına karşı koruyucu uygulamalar.",
    longDescription:
      "Bahçeniz ve peyzaj alanlarınızdaki bitkileri zararlı böceklere ve mantar hastalıklarına karşı koruyoruz. Mevsimsel bakım programlarıyla yeşil alanlarınızın sağlığını sürdürülebilir şekilde koruruz.",
    icon: "trees",
    subServices: [
      {
        title: "Bahçe Bakımı",
        icon: "sprout",
        description:
          "Yeşil alanlarınız için mevsimsel bakım ve koruyucu ilaçlama programı sunuyoruz. Toprak ve bitki sağlığı birlikte gözetilir.",
      },
      {
        title: "Ağaç İlaçlama",
        icon: "trees",
        description:
          "Ağaçlarda görülen zararlı böcek ve mantar hastalıklarına karşı hedefe özel ilaçlama uyguluyoruz. Ağaç türüne uygun doz ve yöntem seçilir.",
      },
      {
        title: "Çim Alan Koruma",
        icon: "sprout",
        description:
          "Çim alanlarda zararlı böcek ve mantar oluşumuna karşı koruyucu uygulama yapıyoruz. Yeşil alan estetiği ve sağlığı korunur.",
      },
      {
        title: "Peyzaj Danışmanlığı",
        icon: "clipboard-check",
        description:
          "Peyzaj projeleriniz için bitki seçimi ve koruma planlaması konusunda danışmanlık veriyoruz. Uzun vadeli sürdürülebilir çözümler öneriyoruz.",
      },
    ],
    whyUs: [
      "Bitki türüne ve çevresel koşullara göre uygulama yöntemini değerlendiriyoruz",
      "Mevsimsel bakım takvimi ile önleyici koruma sağlıyoruz",
      "Peyzaj mimarları ve bahçıvanlarla koordineli çalışıyoruz",
      "Uzun vadeli sözleşmelerde indirimli periyodik bakım sunuyoruz",
    ],
    corporateDescription:
      "Site yönetimleri ve kurumsal kampüsler için yıllık peyzaj bakım sözleşmeleri ve sabit periyotlu koruyucu uygulama planları sunuyoruz.",
    commercialDescription:
      "Küçük işletme bahçeleri ve bireysel müşteriler için tek seferlik veya mevsimsel bakım hizmeti sunuyoruz.",
  },
  {
    slug: "danismanlik",
    title: "Danışmanlık",
    description:
      "İşletmeniz için haşere risk analizi, periyodik kontrol planı ve mevzuata uyum danışmanlığı.",
    longDescription:
      "Gıda, sağlık ve otelcilik sektörlerinde haşere riskleri ile kayıt ve kontrol ihtiyaçları işletmeye göre değişir. HACCP kapsamındaki gereklilikler ve sunulabilecek raporlama hizmeti keşifte değerlendirilir, teklifte netleştirilir.",
    icon: "clipboard-list",
    subServices: [
      {
        title: "Zararlı Analiz Raporu",
        icon: "file-search",
        description:
          "Tesisinizdeki haşere risk noktalarını tespit eden detaylı analiz raporu hazırlıyoruz. Raporun kapsamı ihtiyaca göre belirlenir.",
      },
      {
        title: "Süreç Denetimi",
        icon: "clipboard-check",
        description:
          "Mevcut haşere kontrol süreçlerinizi gözden geçiriyor, iyileştirme önerileri sunuyoruz.",
      },
      {
        title: "Personel Eğitimi",
        icon: "users",
        description:
          "Çalışanlarınıza temel haşere farkındalığı ve önleyici hijyen uygulamaları konusunda eğitim veriyoruz.",
      },
      {
        title: "Yasal Uyumluluk",
        icon: "scale",
        description:
          "İşletmenizin haşere kontrolü mevzuat gerekliliklerine yönelik belgelendirme ve süreç desteği sunuyoruz.",
      },
    ],
    whyUs: [
      "Gıda, sağlık ve otelcilik gibi hassas sektörler için danışmanlık planlıyoruz",
      "Denetim ihtiyacına göre raporlama düzeni kuruyoruz",
      "Periyodik denetim planı hazırlıyoruz",
      "İşletmenize özel risk profiline göre uygulama planı hazırlıyoruz",
    ],
    corporateDescription:
      "Zincir mağaza, otel ve fabrikalar için risk analizi, düzenli denetim ve personel eğitim programları hazırlıyoruz.",
    commercialDescription:
      "Tek şubeli restoran ve küçük işletmeler için ihtiyaç odaklı, uygun maliyetli danışmanlık ve rapor hizmeti sunuyoruz.",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
