export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  author: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hamambocegi-onlem-yontemleri",
    title: "Hamamböceği İstilasına Karşı 5 Etkili Yöntem",
    summary:
      "Mutfak ve banyolarda sık görülen hamamböceği sorununa karşı genel önlem önerileri.",
    category: "İpuçları",
    date: "12 Ağustos 2026",
    author: "Nilüfer İlaçlama Ekibi",
    content: [
      "Hamamböceği, Türkiye'deki konut ve işyerlerinde en sık karşılaşılan haşere türlerinin başında gelir. Nemli, sıcak ve gıda kalıntısı bulunan ortamları tercih eden bu haşereler, geceleri aktif oldukları için çoğu zaman fark edilmeden kolonileşir ve kısa sürede kontrolden çıkabilir. Doğru önlemler istilanın önlenmesine ve mevcut sorunun kontrol altına alınmasına yardımcı olabilir; sonuç ortama ve istila düzeyine göre değişir.",
      "İlk ve en önemli adım kaynak kontrolüdür. Mutfak tezgahlarının her kullanım sonrası temizlenmesi, açık gıda kaplarının kapatılması ve bulaşıkların gece boyunca lavaboda bekletilmemesi hamamböceklerinin besin kaynağına erişimini azaltmaya yardımcı olur. Aynı şekilde musluk ve boru sistemlerindeki küçük sızıntıların onarılması, haşerelerin ihtiyaç duyduğu nemi azaltmaya yardımcı olur.",
      "İkinci adım giriş noktalarının kapatılmasıdır. Hamamböcekleri, kapı altlarındaki boşluklardan, pencere kenarlarından ve tesisat geçişlerindeki çatlaklardan içeri girebilir. Bu noktaların silikon veya uygun dolgu malzemesiyle kapatılması, dışarıdan yeni bireylerin girişini azaltabilir.",
      "Üçüncü olarak, genel amaçlı spreyler yerine jel yem sistemleri çoğu durumda tercih edilen bir yöntemdir. Jel yemler, hamamböceğinin yuvaya taşıyıp diğer bireylere de bulaştırabildiği yavaş etkili bir formülasyon içerir; bu sayede görünmeyen yuvalardaki bireylere de etki edebilir.",
      "Dördüncü adım düzenli takip ve kontroldür. Tek seferlik bir uygulama, özellikle yoğun istilalarda yeterli olmayabilir; yumurta evresindeki bireyler ilk uygulamadan etkilenmeyebilir ve birkaç hafta sonra yeniden aktivite görülebilir. Bu yüzden durumun izlenmesi ve gerekirse yeniden kontrol yapılması önerilir; uygun aralık uzmanın değerlendirmesine göre değişir.",
      "Son olarak, yoğun veya tekrarlayan istilalarda profesyonel destek almak faydalı olabilir. Nilüfer İlaçlama olarak hamamböceği sorunları için keşif talebi alıyoruz; uygulama kapsamı, yöntem ve raporlama keşif sonrası teklifte netleştirilir.",
    ],
  },
  {
    slug: "tahtakurusu-belirtileri",
    title: "Tahtakurusu Belirtileri Nasıl Anlaşılır?",
    summary:
      "Erken teşhis için dikkat edilmesi gereken işaretler ve mücadele yöntemleri hakkında genel bilgi.",
    category: "Rehber",
    date: "5 Ağustos 2026",
    author: "Nilüfer İlaçlama Ekibi",
    content: [
      "Tahtakurusu istilaları, fark edilmesi en zor haşere sorunlarından biridir. Bu küçük, kahverengi böcekler gündüzleri yatak dikişleri, baza aralıkları ve mobilya çatlakları gibi gizli alanlarda saklanır, geceleri ise kan emerek beslenmek için ortaya çıkar. Erken teşhis, istilanın yayılmasını sınırlamaya ve maliyeti azaltmaya yardımcı olabilir.",
      "İlk belirti genellikle ciltte oluşan kaşıntılı, kırmızı ısırık izleridir. Bu izler çoğunlukla düz bir çizgi veya küme halinde, kollar, bacaklar ve boyun gibi uyku sırasında açıkta kalan bölgelerde görülür. Ancak bazı kişilerde ısırıklara karşı görünür bir reaksiyon oluşmayabilir, bu yüzden tek başına bu belirtiye güvenmek yeterli değildir.",
      "İkinci önemli işaret, yatak çarşafları ve şilte dikişlerinde görülen küçük, koyu renkli lekelerdir. Bunlar genellikle tahtakurusunun sindirim atıklarıdır ve genellikle şiltenin kenarlarında, dikiş hatlarında ve baza ile şilte arasındaki birleşim noktalarında yoğunlaşır. Açık renkli bir şiltede bu lekeler oldukça belirgin şekilde fark edilebilir.",
      "Üçüncü belirti, böceklerin döküntü kabuklarıdır. Tahtakurusu gelişim sürecinde birkaç kez deri değiştirir ve geride bıraktığı ince, açık renkli kabuklar mobilya aralıklarında birikir. Bu kabukların varlığı, istilanın bir süredir devam ettiğine işaret edebilir.",
      "Dördüncü olarak, hafif ama karakteristik bir koku dikkat çekebilir; yoğun istilalarda tatlımsı, küflü bir koku hissedilebilir. Bu belirti genellikle ileri düzey istilalarda görülür; böyle bir durumda profesyonel destek almanız önerilir.",
      "Şüphelenilen durumlarda yatak dikişleri ve mobilya aralıklarının dikkatle incelenmesi iyi bir ilk adımdır. Nilüfer İlaçlama olarak keşif talebi alıyoruz; inceleme yöntemi, uygulama türü ve gerekirse tekrar kontrol planı keşif sonrası teklifte netleştirilir.",
    ],
  },
  {
    slug: "isletmelerde-periyodik-kontrol",
    title: "İşletmeler İçin Periyodik Haşere Kontrolünün Önemi",
    summary:
      "Gıda ve otelcilik sektöründe planlı haşere yönetiminin önemi.",
    category: "Sektör Haberleri",
    date: "28 Temmuz 2026",
    author: "Nilüfer İlaçlama Ekibi",
    content: [
      "Gıda üretimi, restoran işletmeciliği ve otelcilik gibi sektörlerde haşere kontrolü yalnızca konfor değil, mevzuat ve gıda güvenliği sistemleri kapsamında da önem taşır. HACCP (Tehlike Analizi ve Kritik Kontrol Noktaları) gibi sistemler haşere risklerinin yönetilmesini ve kayıt altına alınmasını gerektirebilir. Yükümlülükler işletme türüne göre değişir; kesin gereklilikler için ilgili mevzuata ve yetkili kurumlara başvurulmalıdır.",
      "Periyodik kontrolün en büyük avantajı, sorunları büyümeden tespit etmesidir. Tek seferlik bir ilaçlama, o anki görünür sorunu çözebilir; ancak haşereler mevsimsel olarak yeniden ortaya çıkabilir veya tedarik zinciri yoluyla dışarıdan tekrar bulaşabilir. Planlı ziyaretler, bu riskleri erken aşamada fark etmeye yardımcı olabilir; ziyaret sıklığı işletmeye göre belirlenir.",
      "İkinci önemli nokta, uygulamaların kayıt altına alınmasıdır. Uygulama raporları genel olarak kullanılan ürünü, tarihi, hedef haşereyi ve risk noktalarını içerebilir; hangi raporun ne kapsamda düzenleneceği hizmet sağlayıcıya ve mevzuata göre değişir. Bu kayıtlar denetimlerde işletmenin özenini göstermeye yardımcı olabilir ve risklerin zaman içindeki değişimini izlemeyi kolaylaştırır.",
      "Üçüncü olarak, periyodik kontrol markanın itibarını korur. Gıda ve konaklama sektöründe bir haşere şikayeti, sosyal medyada hızla yayılabilecek bir itibar krizine dönüşebilir. Düzenli ve kayıt altına alınmış bir kontrol programı, böyle bir riski azaltmaya ve gerekli özenin gösterildiğini ortaya koymaya yardımcı olabilir.",
      "Dördüncü olarak, periyodik sözleşmeler bazı işletmeler için daha öngörülebilir bir maliyet sağlayabilir. Acil ve plansız müdahaleler daha yüksek maliyetli olabilir; hangisinin uygun olduğu işletmeye göre değişir.",
      "Nilüfer İlaçlama olarak, işletmeler için risk analizi ve periyodik kontrol planı taleplerini değerlendiriyoruz. Hizmet kapsamı, raporlama ve paket koşulları keşif sonrası teklifte netleştirilir.",
    ],
  },
  {
    slug: "evcil-hayvan-guvenli-ilaclama",
    title: "Evcil Hayvan Sahipleri İçin Güvenli İlaçlama Rehberi",
    summary:
      "Evcil hayvan olan evlerde ilaçlama öncesi dikkat edilecek genel noktalar.",
    category: "Rehber",
    date: "19 Temmuz 2026",
    author: "Nilüfer İlaçlama Ekibi",
    content: [
      "Evcil hayvan sahipleri, haşere kontrolü söz konusu olduğunda haklı bir endişe taşır: kullanılan ürünlerin kedi, köpek veya diğer ev hayvanlarına zarar verip vermeyeceği. Doğru ürün seçimi ve uygulama önlemleriyle riskler azaltılabilir; ancak hiçbir uygulama için mutlak güvenlik garantisi verilemez.",
      "İlk adım, ürün seçimidir. Ürün seçimi kritiktir; kalıntı riski daha düşük ve ruhsat/onay bilgisi net olan ürünlerin tercih edilmesi, ürün etiketindeki kuruma süresine uyulması önemlidir. Hayvanın türü ve sağlığı da etkilidir. Uygulama öncesinde evinizde evcil hayvan bulunduğunu belirtmeniz, ürün ve önlemlerin buna göre değerlendirilmesine yardımcı olur; şüphe halinde veterinerinize danışın.",
      "İkinci adım, uygulama sırasında evcil hayvanın ortamdan uzaklaştırılmasıdır. İlaçlama süresince kedi ve köpeklerin başka bir odada veya güvenli bir dış mekanda tutulması, hem hayvanın stres yaşamasını önler hem de henüz kurumamış yüzeylerle temasını engeller. Akvaryum ve kafes gibi kapalı sistemlerin ise uygulama öncesinde sıkıca kapatılması gerekir.",
      "Üçüncü adım, doğru bekleme süresine uyulmasıdır. Kuruma süresi ürüne ve ortama göre değişir; kesin süre için ürün etiketine ve uygulayıcının bildirimine uyulmalıdır. Evcil hayvanı olan evlerde ek bekleme ve iyi havalandırma genellikle önerilir. Özellikle yerde gezinen, yüzeyleri yalayabilen hayvanlar için bu ekstra dikkat önemlidir.",
      "Dördüncü olarak, pire ve kene gibi doğrudan evcil hayvan üzerinden bulaşan haşerelerde, ev içi ilaçlamayla birlikte hayvanın veteriner önerisiyle uygun bir pire/kene tedavisi görmesi gerekebilir. Sadece evin ilaçlanması hayvanın üzerindeki popülasyonu ortadan kaldırmayabileceği için sorun tekrarlayabilir.",
      "Evinizde evcil hayvan varsa keşif talebinizde bunu belirtin. Ürün, yöntem ve önlemler keşif sonrası teklifte netleştirilir; bu yazı genel bilgilendirme amaçlıdır ve bir güvenlik garantisi değildir.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
