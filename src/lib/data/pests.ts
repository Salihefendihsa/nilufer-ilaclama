export type PestIcon = "bug" | "rat" | "bug-off" | "bug-play" | "worm";

export type PestItem = {
  slug: string;
  name: string;
  latinName: string;
  icon: PestIcon;
  description: string;
  details: string;
};

export const PESTS: PestItem[] = [
  {
    slug: "hamambocegi",
    name: "Hamamböceği",
    latinName: "Blattodea",
    icon: "bug",
    description: "Nemli ve sıcak ortamları sever, mutfak ve banyolarda sıkça görülür.",
    details:
      "Hamamböcekleri gece aktif olan, hızla üreyen ve hastalık taşıyan haşerelerdendir. Nemli, sıcak ve gıda kalıntısı bulunan alanlarda kolayca kolonileşirler. Etkili kontrol için jel yem, kalıntı ilaçlama ve düzenli takip gerekir.",
  },
  {
    slug: "fare-ve-sican",
    name: "Fare ve Sıçan",
    latinName: "Rodentia",
    icon: "rat",
    description: "Elektrik kablolarına, gıda stoklarına zarar verir, hastalık taşıyabilir.",
    details:
      "Kemirgenler yapılarda ciddi maddi hasara ve hijyen sorunlarına yol açar. Giriş noktalarının kapatılması, yem istasyonları ve mekanik tuzaklarla entegre bir kontrol programı uygulanır.",
  },
  {
    slug: "tahtakurusu",
    name: "Tahtakurusu",
    latinName: "Cimex lectularius",
    icon: "bug-off",
    description: "Yataklarda ve döşemelerde gizlenir, geceleri kan emerek beslenir.",
    details:
      "Tahtakurusu istilaları hızla yayılır ve fark edilmesi zor olabilir. Isı uygulaması, kalıntılı ilaçlama ve detaylı inceleme ile birlikte yürütülen bir mücadele programı gerektirir.",
  },
  {
    slug: "karinca",
    name: "Karınca",
    latinName: "Formicidae",
    icon: "bug-play",
    description: "Koloniler halinde yaşar, mutfak ve bahçe alanlarında yaygın görülür.",
    details:
      "Karıncalar geniş koloniler kurarak gıda kaynaklarına ulaşır. Yuva tespiti ve yem bazlı uygulamalarla kalıcı çözüm sağlanır, yüzey ilaçlaması tek başına yeterli olmaz.",
  },
  {
    slug: "sivrisinek",
    name: "Sivrisinek",
    latinName: "Culicidae",
    icon: "bug",
    description: "Durgun sularda ürer, hastalık taşıyabilir, dış mekanlarda rahatsızlık verir.",
    details:
      "Sivrisinek mücadelesinde üreme alanlarının (durgun su kaynakları) tespiti kritik önem taşır. Larva mücadelesi ve alan sisleme uygulamaları birlikte yürütülür.",
  },
  {
    slug: "karasinek",
    name: "Karasinek",
    latinName: "Musca domestica",
    icon: "bug",
    description: "Gıda üzerinde bakteri taşır, mutfak ve çöp alanlarında yoğunlaşır.",
    details:
      "Karasinekler hastalık taşıyıcı olabilir ve hızla ürer. Kaynak kontrolü, sinek tuzakları ve alan ilaçlaması ile etkili şekilde kontrol altına alınır.",
  },
  {
    slug: "guve",
    name: "Güve",
    latinName: "Lepidoptera",
    icon: "worm",
    description: "Tekstil, halı ve gıda ürünlerine zarar verir, dolap ve depolarda görülür.",
    details:
      "Güveler özellikle yün ve tekstil ürünlerinde delik ve hasara yol açar. Feromon tuzakları ve kalıntılı ilaçlama ile kontrol sağlanır.",
  },
  {
    slug: "pire",
    name: "Pire",
    latinName: "Siphonaptera",
    icon: "bug",
    description: "Evcil hayvanlar üzerinden bulaşır, halı ve döşemelerde yaşar.",
    details:
      "Pire istilaları genellikle evcil hayvanlarla birlikte eve girer. Halı, döşeme ve hayvan yataklarının detaylı ilaçlanması gerekir; yaşam döngüsü nedeniyle takip uygulaması önerilir.",
  },
];

export function getPestBySlug(slug: string) {
  return PESTS.find((pest) => pest.slug === slug);
}
