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
      "Konut, işyeri ve endüstriyel tesislerde ruhsatlı ürünlerle haşere kontrolü ve genel dezenfeksiyon.",
    longDescription:
      "Hamamböceği, fare, karınca, sivrisinek ve daha birçok haşereye karşı Sağlık Bakanlığı onaylı ürünler ve ekipmanlarla uygulama yapıyoruz. Uygulama sonrası EK-1 raporu ile tüm süreç kayıt altına alınır.",
    icon: "spray-can",
    subServices: [
      {
        title: "Bahçe İlaçlama",
        icon: "trees",
        description:
          "Bahçe alanlarındaki zararlı böcek ve haşerelere karşı koruyucu uygulama yapıyoruz. Bitki örtüsüne zarar vermeyen, seçici etkili ürünler kullanılır.",
      },
      {
        title: "Ev-Bahçe İlaçlama",
        icon: "home",
        description:
          "Konut iç mekanı ile bahçeyi birlikte kapsayan bütünleşik bir program sunuyoruz. Aynı ziyarette hem içeride hem dışarıda kalıcı koruma sağlanır.",
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
      "Sağlık Bakanlığı ruhsatlı ekip ve onaylı biyosidal ürünler kullanıyoruz",
      "Her uygulama sonrası yasal EK-1 raporu ile süreci belgeliyoruz",
      "Evcil hayvan ve çocuklar için güvenli, düşük kokulu ürün seçenekleri sunuyoruz",
      "Uygulama sonrası garanti kapsamında ücretsiz takip sağlıyoruz",
    ],
    corporateDescription:
      "Fabrika, ofis ve site yönetimleri için toplu sözleşmeli, periyodik ilaçlama ve dezenfeksiyon programları hazırlıyoruz. Denetime hazır EK-1 raporlaması ve sabit bütçeli yıllık planlar sunuyoruz.",
    commercialDescription:
      "Restoran, mağaza ve küçük işletmeler için esnek randevulu, tek seferlik veya ihtiyaç bazlı ilaçlama hizmeti sunuyoruz. Hızlı müdahale ve uygun fiyatlı paketlerle işinizi aksatmadan çözüm sağlıyoruz.",
  },
  {
    slug: "fumigasyon",
    title: "Fümigasyon",
    description:
      "Depo, gemi, konteyner ve tahıl ürünlerinde gaz uygulamasıyla derinlemesine haşere imhası.",
    longDescription:
      "Kapalı hacimlerde gaz halindeki ilaçlarla yapılan fümigasyon uygulaması, diğer yöntemlerle ulaşılamayan gizli alanlardaki haşereleri de etkisiz hale getirir. Uzman ve sertifikalı ekibimizle güvenli şekilde uygulanır.",
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
          "Müze ve arşiv gibi hassas tarihi eserlerde malzemeye zarar vermeyen, kontrollü gaz uygulaması gerçekleştiriyoruz.",
      },
      {
        title: "Ambar/Depo Fümigasyonu",
        icon: "warehouse",
        description:
          "Büyük hacimli ambar ve depolarda derinlemesine, tüm gizli alanlara nüfuz eden fümigasyon uygulaması yapıyoruz.",
      },
    ],
    whyUs: [
      "Sertifikalı fümigasyon uzmanlarımızla mevzuata tam uyumlu uygulama yapıyoruz",
      "Gaz ölçüm cihazlarıyla güvenlik seviyesini sürekli kontrol ediyoruz",
      "İhracat süreçlerine uygun uluslararası sertifikalı raporlama sunuyoruz",
      "Ürün ve malzeme bütünlüğünü koruyan uygulama protokolleri kullanıyoruz",
    ],
    corporateDescription:
      "Lojistik firmaları, ihracatçılar ve kurumsal depo işletmeleri için gümrük/karantina şartlarına uygun, sertifikalı fümigasyon programları yürütüyoruz.",
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
      "Bitki türüne özel, seçici etkili ürünlerle çevreye duyarlı uygulama yapıyoruz",
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
      "Gıda, sağlık ve otelcilik sektöründeki işletmelere yönelik haşere risk analizi, HACCP uyumlu kontrol noktaları ve periyodik denetim planları hazırlıyoruz.",
    icon: "clipboard-list",
    subServices: [
      {
        title: "Zararlı Analiz Raporu",
        icon: "file-search",
        description:
          "Tesisinizdeki haşere risk noktalarını tespit eden detaylı analiz raporu hazırlıyoruz. Rapor denetimlerde ibraz edilebilir niteliktedir.",
      },
      {
        title: "Süreç Denetimi",
        icon: "clipboard-check",
        description:
          "Mevcut haşere kontrol süreçlerinizi HACCP standartlarına göre denetliyor, iyileştirme önerileri sunuyoruz.",
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
          "İşletmenizin haşere kontrolü mevzuatına tam uyumunu sağlayacak belgelendirme ve süreç desteği sunuyoruz.",
      },
    ],
    whyUs: [
      "Gıda, sağlık ve otelcilik sektöründe uzmanlaşmış danışman kadromuzla çalışıyoruz",
      "HACCP uyumlu, denetime hazır raporlama sistemi sunuyoruz",
      "Periyodik denetim planlarıyla sürekli uyumluluk sağlıyoruz",
      "İşletmenize özel risk profiline göre uygulama planı hazırlıyoruz",
    ],
    corporateDescription:
      "Zincir mağaza, otel ve fabrikalar için HACCP uyumlu risk analizi, düzenli denetim ve personel eğitim programları hazırlıyoruz.",
    commercialDescription:
      "Tek şubeli restoran ve küçük işletmeler için ihtiyaç odaklı, uygun maliyetli danışmanlık ve rapor hizmeti sunuyoruz.",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
