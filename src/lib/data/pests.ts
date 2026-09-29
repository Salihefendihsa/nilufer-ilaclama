export type PestIcon = "bug" | "rat" | "bug-off" | "bug-play" | "worm";

export type ProcessStep = {
  step: string;
  description: string;
};

export type PestItem = {
  slug: string;
  name: string;
  latinName: string;
  icon: PestIcon;
  description: string;
  details: string;
  harms: string[];
  ourProcess: ProcessStep[];
};

export const PESTS: PestItem[] = [
  {
    slug: "hamambocegi",
    name: "Hamamböceği",
    latinName: "Blattodea",
    icon: "bug",
    description: "Nemli ve sıcak ortamları sever, mutfak ve banyolarda sıkça görülür.",
    details:
      "Hamamböcekleri gece aktif olan, hızla üreyen ve hastalık taşıyan haşerelerdendir. Nemli, sıcak ve gıda kalıntısı bulunan alanlarda kolayca kolonileşirler. Kontrol için jel yem, kalıntı ilaçlama ve düzenli takip gerekebilir.",
    harms: [
      "Alerji ve astım tetikleyicisi salgı ve döküntüler bırakır",
      "Gıda ve yüzeylerde bakteri kontaminasyonu riski oluşturur",
      "Hızlı üreme döngüsüyle kısa sürede geniş alana yayılır",
      "Elektronik cihaz ve kablolarda hasara yol açabilir",
    ],
    ourProcess: [
      {
        step: "Tespit ve İnceleme",
        description:
          "Mutfak, banyo ve gizli boşluklar dahil kolonileşme noktaları detaylı şekilde taranır.",
      },
      {
        step: "Uygulama Yöntemi",
        description:
          "Jel yem sistemi ve kalıntılı ilaçlama birlikte uygulanarak hem mevcut hem gizli bireyler hedeflenir.",
      },
      {
        step: "Kullanılan Ürün/Ekipman",
        description:
          "Düşük kokulu jel yem ve sprey formülasyonlar, ULV sisleme cihazı ile desteklenir.",
      },
      {
        step: "Takip",
        description:
          "Uygulama sonrası 2-3 hafta içinde kontrol ziyareti yapılır, tekrar uygulama koşulları teklifte belirtilir.",
      },
    ],
  },
  {
    slug: "fare-ve-sican",
    name: "Fare ve Sıçan",
    latinName: "Rodentia",
    icon: "rat",
    description: "Elektrik kablolarına, gıda stoklarına zarar verir, hastalık taşıyabilir.",
    details:
      "Kemirgenler yapılarda ciddi maddi hasara ve hijyen sorunlarına yol açar. Giriş noktalarının kapatılması, yem istasyonları ve mekanik tuzaklarla entegre bir kontrol programı uygulanır.",
    harms: [
      "Elektrik kablolarını kemirerek yangın riski oluşturur",
      "Gıda stoklarını kirletir ve büyük kayıplara yol açar",
      "Hantavirüs, leptospiroz gibi hastalıkları taşıyabilir",
      "Yapı yalıtımı ve duvarlarda kalıcı hasar bırakır",
    ],
    ourProcess: [
      {
        step: "Tespit ve İnceleme",
        description:
          "Giriş noktaları, gübre izleri ve kemirme belirtileri incelenerek yoğunluk haritası çıkarılır.",
      },
      {
        step: "Uygulama Yöntemi",
        description:
          "Giriş noktaları kapatılır, çevre ve iç mekana mekanik tuzak ve yem istasyonları yerleştirilir.",
      },
      {
        step: "Kullanılan Ürün/Ekipman",
        description:
          "Kilitli yem istasyonları, mekanik tuzaklar ve gerekli durumlarda rodentisit kullanılır.",
      },
      {
        step: "Takip",
        description:
          "İstasyonlar periyodik olarak kontrol edilir, aktivite izlenir; takip planı teklifte belirtilir.",
      },
    ],
  },
  {
    slug: "tahtakurusu",
    name: "Tahtakurusu",
    latinName: "Cimex lectularius",
    icon: "bug-off",
    description: "Yataklarda ve döşemelerde gizlenir, geceleri kan emerek beslenir.",
    details:
      "Tahtakurusu istilaları hızla yayılır ve fark edilmesi zor olabilir. Isı uygulaması, kalıntılı ilaçlama ve detaylı inceleme ile birlikte yürütülen bir mücadele programı gerektirir.",
    harms: [
      "Ciltte kaşıntılı, alerjik ısırık izleri bırakır",
      "Uyku düzenini bozarak yaşam kalitesini düşürür",
      "Bavul ve eşyalar yoluyla hızla başka mekanlara taşınır",
      "Yoğun istilalarda tespit edilmesi ve önlenmesi zorlaşır",
    ],
    ourProcess: [
      {
        step: "Tespit ve İnceleme",
        description:
          "Yatak dikişleri, baza ve mobilya aralıkları UV destekli inceleme ile taranır.",
      },
      {
        step: "Uygulama Yöntemi",
        description:
          "Isı uygulaması (termal işlem) ve kalıntılı ilaçlama birlikte kullanılarak yumurta evresi de dahil tüm bireyler hedeflenir.",
      },
      {
        step: "Kullanılan Ürün/Ekipman",
        description:
          "Endüstriyel ısı jeneratörü ve kalıntı etkili, onaylı insektisit formülasyonları kullanılır.",
      },
      {
        step: "Takip",
        description:
          "10-14 gün sonra ikinci kontrol uygulaması yapılır, takip koşulları teklifte belirtilir.",
      },
    ],
  },
  {
    slug: "karinca",
    name: "Karınca",
    latinName: "Formicidae",
    icon: "bug-play",
    description: "Koloniler halinde yaşar, mutfak ve bahçe alanlarında yaygın görülür.",
    details:
      "Karıncalar geniş koloniler kurarak gıda kaynaklarına ulaşır. Yuva tespiti ve yem bazlı uygulamalarla kalıcı çözüm sağlanır, yüzey ilaçlaması tek başına yeterli olmaz.",
    harms: [
      "Gıda kaynaklarını kirletir ve israfa yol açar",
      "Bina temellerinde ve yalıtımda zayıflamaya sebep olabilir",
      "Bazı türler ısırarak alerjik reaksiyon oluşturabilir",
      "Yuva geniş koloniler halinde hızla çoğalır",
    ],
    ourProcess: [
      {
        step: "Tespit ve İnceleme",
        description:
          "Karınca yolları takip edilerek yuva konumu ve tür tespiti yapılır.",
      },
      {
        step: "Uygulama Yöntemi",
        description:
          "Yem bazlı kolonye taşınan formülasyonlar ile yuva içi bireyler dahil tüm koloni hedeflenir.",
      },
      {
        step: "Kullanılan Ürün/Ekipman",
        description:
          "Düşük toksisiteli yem istasyonları ve gerektiğinde bariyer ilaçlama uygulanır.",
      },
      {
        step: "Takip",
        description:
          "Uygulama sonrası aktivite azalması izlenir, gerekirse tekrar uygulama planlanır.",
      },
    ],
  },
  {
    slug: "sivrisinek",
    name: "Sivrisinek",
    latinName: "Culicidae",
    icon: "bug",
    description: "Durgun sularda ürer, hastalık taşıyabilir, dış mekanlarda rahatsızlık verir.",
    details:
      "Sivrisinek mücadelesinde üreme alanlarının (durgun su kaynakları) tespiti kritik önem taşır. Larva mücadelesi ve alan sisleme uygulamaları birlikte yürütülür.",
    harms: [
      "Sıtma, Zika gibi hastalıkları taşıyabilir",
      "Isırıklar kaşıntı ve alerjik reaksiyona yol açar",
      "Durgun su kaynaklarında hızla ve yoğun şekilde üreyebilir",
      "Dış mekan kullanımını ve konforu ciddi şekilde azaltır",
    ],
    ourProcess: [
      {
        step: "Tespit ve İnceleme",
        description:
          "Durgun su kaynakları ve olası üreme alanları detaylı şekilde haritalanır.",
      },
      {
        step: "Uygulama Yöntemi",
        description:
          "Larva evresine yönelik su yüzeyi uygulaması ve yetişkin bireyler için alan sisleme birlikte yapılır.",
      },
      {
        step: "Kullanılan Ürün/Ekipman",
        description:
          "ULV sisleme cihazları ve çevreye duyarlı larvasit formülasyonlar kullanılır.",
      },
      {
        step: "Takip",
        description:
          "Mevsimsel periyotlarla tekrar uygulama planlanır, yoğun dönemlerde takip sıklaştırılır.",
      },
    ],
  },
  {
    slug: "karasinek",
    name: "Karasinek",
    latinName: "Musca domestica",
    icon: "bug",
    description: "Gıda üzerinde bakteri taşır, mutfak ve çöp alanlarında yoğunlaşır.",
    details:
      "Karasinekler hastalık taşıyıcı olabilir ve hızla ürer. Kaynak kontrolü, sinek tuzakları ve alan ilaçlaması ile etkili şekilde kontrol altına alınır.",
    harms: [
      "Gıda üzerinde bakteri ve patojen taşıyarak kontaminasyona sebep olur",
      "Çöp ve atık alanlarında hızla ürer, yoğun popülasyon oluşturur",
      "İşletmelerde hijyen denetimlerinde ciddi risk oluşturur",
      "Kısa yaşam döngüsüyle sürekli yeni nesiller üretir",
    ],
    ourProcess: [
      {
        step: "Tespit ve İnceleme",
        description:
          "Üreme kaynakları (çöp alanı, atık noktaları) ve yoğunluk bölgeleri belirlenir.",
      },
      {
        step: "Uygulama Yöntemi",
        description:
          "Kaynak kontrolü ile birlikte UV tuzak sistemleri ve alan ilaçlaması uygulanır.",
      },
      {
        step: "Kullanılan Ürün/Ekipman",
        description:
          "Elektrikli UV sinek tuzakları ve kalıntı etkili, gıda alanlarına uygun onaylı ürünler kullanılır.",
      },
      {
        step: "Takip",
        description:
          "Özellikle gıda işletmelerinde periyodik kontrol programına dahil edilerek sürekli izlenir.",
      },
    ],
  },
  {
    slug: "guve",
    name: "Güve",
    latinName: "Lepidoptera",
    icon: "worm",
    description: "Tekstil, halı ve gıda ürünlerine zarar verir, dolap ve depolarda görülür.",
    details:
      "Güveler özellikle yün ve tekstil ürünlerinde delik ve hasara yol açar. Feromon tuzakları ve kalıntılı ilaçlama ile kontrol sağlanır.",
    harms: [
      "Yün ve tekstil ürünlerinde onarılamaz delikler açar",
      "Depolanan gıda ürünlerine bulaşarak israfa yol açar",
      "Dolap ve depo gibi kapalı alanlarda fark edilmeden yayılır",
      "Larva evresinde uzun süre gizli kalarak zarar vermeye devam eder",
    ],
    ourProcess: [
      {
        step: "Tespit ve İnceleme",
        description:
          "Dolap, depo ve tekstil alanlarında larva ve yumurta izleri incelenir.",
      },
      {
        step: "Uygulama Yöntemi",
        description:
          "Feromon tuzakları ile popülasyon izlenirken, kalıntılı ilaçlama ile larva ve yetişkin bireyler kontrol altına alınır.",
      },
      {
        step: "Kullanılan Ürün/Ekipman",
        description:
          "Feromon bazlı yapışkan tuzaklar ve tekstil dostu, kalıntı etkili formülasyonlar kullanılır.",
      },
      {
        step: "Takip",
        description:
          "Tuzak sonuçlarına göre aylık takip yapılır, yeniden bulaşma durumunda müdahale koşulları teklifte belirtilir.",
      },
    ],
  },
  {
    slug: "pire",
    name: "Pire",
    latinName: "Siphonaptera",
    icon: "bug",
    description: "Evcil hayvanlar üzerinden bulaşır, halı ve döşemelerde yaşar.",
    details:
      "Pire istilaları genellikle evcil hayvanlarla birlikte eve girer. Halı, döşeme ve hayvan yataklarının detaylı ilaçlanması gerekir; yaşam döngüsü nedeniyle takip uygulaması önerilir.",
    harms: [
      "Evcil hayvanlarda ve insanlarda kaşıntılı ısırıklara yol açar",
      "Halı ve döşemelerde uzun süre yumurta ve larva halinde saklanır",
      "Bazı türler tenya gibi parazitlerin taşıyıcısı olabilir",
      "Tek uygulamayla tamamen giderilmesi zor, yaşam döngüsü uzundur",
    ],
    ourProcess: [
      {
        step: "Tespit ve İnceleme",
        description:
          "Halı, döşeme ve evcil hayvan yatağı gibi yoğun aktivite alanları incelenir.",
      },
      {
        step: "Uygulama Yöntemi",
        description:
          "Kalıntılı ilaçlama ile birlikte gelişim engelleyici (IGR) uygulama yapılarak yaşam döngüsü kırılır.",
      },
      {
        step: "Kullanılan Ürün/Ekipman",
        description:
          "Evcil hayvan dostu, kalıntı etkili insektisit ve büyüme düzenleyici formülasyonlar kullanılır.",
      },
      {
        step: "Takip",
        description:
          "2-3 hafta sonra kontrol uygulaması yapılır, yaşam döngüsü boyunca takip planlanır.",
      },
    ],
  },
];

export function getPestBySlug(slug: string) {
  return PESTS.find((pest) => pest.slug === slug);
}
