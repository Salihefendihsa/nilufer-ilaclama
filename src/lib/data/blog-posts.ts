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
      "Mutfak ve banyolarda sık görülen hamamböceği sorununa karşı kalıcı çözüm önerileri.",
    category: "İpuçları",
    date: "12 Ağustos 2026",
    author: "Nilüfer İlaçlama Ekibi",
    content: [
      "Hamamböceği, Türkiye'deki konut ve işyerlerinde en sık karşılaşılan haşere türlerinin başında gelir. Nemli, sıcak ve gıda kalıntısı bulunan ortamları tercih eden bu haşereler, geceleri aktif oldukları için çoğu zaman fark edilmeden kolonileşir ve kısa sürede kontrolden çıkabilir. İyi haber şu ki, doğru önlemlerle hem istilayı önlemek hem de mevcut bir sorunu kalıcı olarak çözmek mümkün.",
      "İlk ve en önemli adım kaynak kontrolüdür. Mutfak tezgahlarının her kullanım sonrası temizlenmesi, açık gıda kaplarının kapatılması ve bulaşıkların gece boyunca lavaboda bekletilmemesi hamamböceklerinin besin kaynağına erişimini büyük ölçüde kısıtlar. Aynı şekilde musluk ve boru sistemlerindeki küçük sızıntıların onarılması, haşerelerin ihtiyaç duyduğu nem kaynağını ortadan kaldırır.",
      "İkinci adım giriş noktalarının kapatılmasıdır. Hamamböcekleri, kapı altlarındaki boşluklardan, pencere kenarlarından ve tesisat geçişlerindeki çatlaklardan içeri girebilir. Bu noktaların silikon veya uygun dolgu malzemesiyle kapatılması, dışarıdan yeni bireylerin girişini engeller.",
      "Üçüncü olarak, piyasada satılan genel amaçlı spreyler yerine profesyonel jel yem sistemleri çok daha etkilidir. Jel yemler, hamamböceğinin yuvaya taşıyıp diğer bireylere de bulaştırdığı yavaş etkili bir formülasyon içerir; bu sayede görünmeyen yuvalardaki bireyler de kontrol altına alınır.",
      "Dördüncü adım düzenli takip ve kontroldür. Tek seferlik bir uygulama, özellikle yoğun istilalarda yeterli olmayabilir; yumurta evresindeki bireyler ilk uygulamadan etkilenmeyebilir ve birkaç hafta sonra yeniden aktivite görülebilir. Bu yüzden 2-3 haftalık aralıklarla kontrol uygulaması yapılması önerilir.",
      "Son olarak, yoğun veya tekrarlayan istilalarda profesyonel destek almak en güvenilir çözümdür. Profesyonel bir ilaçlama firması, doğru ürünü doğru dozda uygular ve süreci belgeler. Nilüfer İlaçlama olarak, hamamböceği sorunları için ücretsiz keşif talebi alıyoruz.",
    ],
  },
  {
    slug: "tahtakurusu-belirtileri",
    title: "Tahtakurusu Belirtileri Nasıl Anlaşılır?",
    summary:
      "Erken teşhis için dikkat edilmesi gereken işaretler ve mücadele yöntemleri.",
    category: "Rehber",
    date: "5 Ağustos 2026",
    author: "Nilüfer İlaçlama Ekibi",
    content: [
      "Tahtakurusu istilaları, fark edilmesi en zor haşere sorunlarından biridir. Bu küçük, kahverengi böcekler gündüzleri yatak dikişleri, baza aralıkları ve mobilya çatlakları gibi gizli alanlarda saklanır, geceleri ise kan emerek beslenmek için ortaya çıkar. Erken teşhis, hem istilanın yayılmasını önlemek hem de tedavi maliyetini düşürmek açısından kritik önem taşır.",
      "İlk belirti genellikle ciltte oluşan kaşıntılı, kırmızı ısırık izleridir. Bu izler çoğunlukla düz bir çizgi veya küme halinde, kollar, bacaklar ve boyun gibi uyku sırasında açıkta kalan bölgelerde görülür. Ancak bazı kişilerde ısırıklara karşı görünür bir reaksiyon oluşmayabilir, bu yüzden tek başına bu belirtiye güvenmek yeterli değildir.",
      "İkinci önemli işaret, yatak çarşafları ve şilte dikişlerinde görülen küçük, koyu renkli lekelerdir. Bunlar tahtakurusunun sindirim atıklarıdır ve genellikle şiltenin kenarlarında, dikiş hatlarında ve baza ile şilte arasındaki birleşim noktalarında yoğunlaşır. Açık renkli bir şiltede bu lekeler oldukça belirgin şekilde fark edilebilir.",
      "Üçüncü belirti, böceklerin döküntü kabuklarıdır. Tahtakurusu gelişim sürecinde birkaç kez deri değiştirir ve geride bıraktığı ince, açık renkli kabuklar mobilya aralıklarında birikir. Bu kabukların varlığı, istilanın bir süredir devam ettiğinin işaretidir.",
      "Dördüncü olarak, hafif ama karakteristik bir koku dikkat çekebilir; yoğun istilalarda tatlımsı, küflü bir koku hissedilebilir. Bu belirti genellikle ileri düzey istilalarda ortaya çıkar ve profesyonel müdahalenin gecikmeden yapılması gerektiğine işaret eder.",
      "Şüphelenilen durumlarda en doğru adım, yatak dikişleri ve mobilya aralıklarının UV destekli ışık altında detaylı incelenmesidir. Nilüfer İlaçlama ekibi olarak, tespit aşamasından ısı uygulaması ve kalıntılı ilaçlamayı içeren tedavi sürecine kadar hizmet planlıyor; gerekli durumlarda 10-14 gün sonra ikinci bir kontrol ziyareti öneriyoruz.",
    ],
  },
  {
    slug: "isletmelerde-periyodik-kontrol",
    title: "İşletmeler İçin Periyodik Haşere Kontrolünün Önemi",
    summary:
      "Gıda ve otelcilik sektöründe HACCP uyumlu haşere yönetimi neden gereklidir?",
    category: "Sektör Haberleri",
    date: "28 Temmuz 2026",
    author: "Nilüfer İlaçlama Ekibi",
    content: [
      "Gıda üretimi, restoran işletmeciliği ve otelcilik gibi sektörlerde haşere kontrolü, yalnızca konfor meselesi değil, doğrudan yasal bir zorunluluktur. HACCP (Tehlike Analizi ve Kritik Kontrol Noktaları) standartları, işletmelerin haşere risklerini sistematik olarak yönetmesini ve bu süreci belgelemesini şart koşar. Denetimlerde bu belgelerin eksik olması, ciddi para cezalarına hatta faaliyet durdurmaya kadar uzanabilecek sonuçlar doğurabilir.",
      "Periyodik kontrolün en büyük avantajı, sorunları büyümeden tespit etmesidir. Tek seferlik bir ilaçlama, o anki görünür sorunu çözebilir; ancak haşereler mevsimsel olarak yeniden ortaya çıkabilir veya tedarik zinciri yoluyla dışarıdan tekrar bulaşabilir. Aylık veya iki haftada bir yapılan planlı ziyaretler, bu riskleri erken aşamada yakalayarak büyük çaplı istilaların önüne geçer.",
      "İkinci önemli nokta, EK-1 raporlama sürecidir. Her uygulama sonrası düzenlenen bu rapor; kullanılan ürünü, uygulama tarihini, hedeflenen haşere türünü ve tespit edilen risk noktalarını kayıt altına alır. Denetim sırasında bu raporlar, işletmenin mevzuata uyumunu kanıtlayan en güçlü belgedir ve aynı zamanda işletme yönetimine haşere risklerinin zaman içindeki değişimini izleme imkânı sunar.",
      "Üçüncü olarak, periyodik kontrol markanın itibarını korur. Gıda ve konaklama sektöründe bir haşere şikayeti, sosyal medyada hızla yayılabilecek bir itibar krizine dönüşebilir. Düzenli, belgelenmiş bir kontrol programı, hem böyle bir riski en aza indirir hem de bir şikayet durumunda işletmenin gerekli özeni gösterdiğini kanıtlar.",
      "Dördüncü olarak, periyodik sözleşmeler uzun vadede daha ekonomiktir. Acil, plansız bir istila durumunda yapılan yoğun müdahaleler, düzenli bakımdan çok daha yüksek maliyetli olabilir. Sabit bütçeli bir bakım paketi, hem maliyet öngörülebilirliği sağlar hem de işletmenin operasyonel sürekliliğini korur.",
      "Nilüfer İlaçlama olarak, gıda ve otelcilik sektöründeki işletmelere özel risk analizi, HACCP gerekliliklerini dikkate alan kontrol noktaları ve düzenli denetim planları hazırlıyoruz; İşyeri ve Kurumsal bakım paketlerimiz hakkında bilgi için bize ulaşabilirsiniz.",
    ],
  },
  {
    slug: "evcil-hayvan-guvenli-ilaclama",
    title: "Evcil Hayvan Sahipleri İçin Güvenli İlaçlama Rehberi",
    summary:
      "Evcil hayvanınıza zarar vermeden etkili haşere kontrolü nasıl yapılır?",
    category: "Rehber",
    date: "19 Temmuz 2026",
    author: "Nilüfer İlaçlama Ekibi",
    content: [
      "Evcil hayvan sahipleri, haşere kontrolü söz konusu olduğunda haklı bir endişe taşır: kullanılan ürünlerin kedi, köpek veya diğer ev hayvanlarına zarar verip vermeyeceği. Doğru ürün seçimi ve uygulama protokolüyle, evinizi haşerelerden etkili şekilde korurken evcil hayvanınızın sağlığını da güvence altına almak tamamen mümkündür.",
      "İlk adım, ürün seçimidir. Profesyonel ilaçlama firmaları, kuruduktan sonra kalıntı toksisitesi düşük olan, Sağlık Bakanlığı onaylı formülasyonlar kullanır. Bu ürünler, uygulama sonrası belirtilen kuruma süresi tamamlandığında evcil hayvanlar için güvenli hale gelir. Uygulama öncesinde firmanıza evinizde evcil hayvan bulunduğunu mutlaka belirtmeniz, size özel bir ürün ve protokol seçilmesini sağlar.",
      "İkinci adım, uygulama sırasında evcil hayvanın ortamdan uzaklaştırılmasıdır. İlaçlama süresince kedi ve köpeklerin başka bir odada veya güvenli bir dış mekanda tutulması, hem hayvanın stres yaşamasını önler hem de henüz kurumamış yüzeylerle temasını engeller. Akvaryum ve kafes gibi kapalı sistemlerin ise uygulama öncesinde sıkıca kapatılması gerekir.",
      "Üçüncü adım, doğru bekleme süresine uyulmasıdır. Kullanılan ürüne bağlı olarak genellikle 2-4 saatlik bir kuruma süresi yeterli olsa da, evcil hayvanı olan evlerde bu sürenin biraz uzatılması ve alanın iyice havalandırılması önerilir. Özellikle yerde gezinen, yüzeyleri yalayabilen hayvanlar için bu ekstra dikkat önemlidir.",
      "Dördüncü olarak, pire ve kene gibi doğrudan evcil hayvan üzerinden bulaşan haşerelerde, ev içi ilaçlamayla birlikte hayvanın veteriner onaylı bir pire/kene tedavisi görmesi gerekir. Sadece evin ilaçlanması, hayvanın üzerindeki popülasyonu tamamen ortadan kaldırmayacağı için sorun kısa sürede tekrarlayabilir.",
      "Nilüfer İlaçlama olarak, evcil hayvanı olan hanelerde uygulama öncesi detaylı bilgilendirme yapıyor, düşük toksisiteli ürünlerle güvenli bir uygulama süreci sunuyoruz. Evinizde dört ayaklı bir dostunuz varsa, keşif talebinizde bu bilgiyi paylaşmanız yeterli.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
