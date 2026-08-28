"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "İlaçlama sonrası eve ne zaman girebilirim?",
    answer:
      "Uygulanan ürüne ve alanın havalandırmasına bağlı olarak genellikle 2-4 saat sonra, alan iyice havalandırıldıktan sonra eve girebilirsiniz. Ekibimiz uygulama sonunda size net bir süre bildirir.",
  },
  {
    question: "Evcil hayvanlarım için güvenli mi?",
    answer:
      "Kullandığımız tüm ürünler Sağlık Bakanlığı onaylı biyosidal ürünlerdir. Uygulama sırasında evcil hayvanların ortamdan uzaklaştırılmasını, kuruma süresi tamamlanana kadar temas ettirilmemesini öneririz.",
  },
  {
    question: "Uygulama öncesi nasıl hazırlık yapmalıyım?",
    answer:
      "Mutfak tezgahlarının temizlenmesi, açık gıda ürünlerinin kapatılması, dolap ve çekmecelerin biraz aralık bırakılması uygulamanın etkinliğini artırır. Randevu onayında ekibimiz size detaylı bir hazırlık listesi iletir.",
  },
  {
    question: "İlaçlamanın etkisi ne kadar sürer?",
    answer:
      "Kullanılan yönteme göre değişmekle birlikte kalıntılı ilaçlama uygulamaları genellikle 3-6 ay etkisini korur. Yoğun istila durumlarında periyodik kontrol programı önerilir.",
  },
  {
    question: "Kaç uygulama sonrası sonuç alırım?",
    answer:
      "Hafif düzeydeki haşere sorunlarında tek uygulama yeterli olabilirken, yoğun istilalarda 2-3 uygulamalık bir takip programı önerilir. Uzmanlarımız keşif sırasında size özel bir plan sunar.",
  },
  {
    question: "Gebe veya bebekli evlerde ilaçlama yapılabilir mi?",
    answer:
      "Evet, ancak uygulama sonrası havalandırma ve eve giriş sürelerine daha dikkat edilmesini öneririz. Talep etmeniz halinde ekibimiz özellikle hassas gruplar için daha uzun bekleme süresi planlar.",
  },
  {
    question: "Uygulama sonrası koku kalır mı?",
    answer:
      "Kullandığımız modern ürünlerin çoğu düşük kokuludur ve havalandırma sonrası koku büyük ölçüde dağılır. Hassasiyeti olan müşterilerimiz için kokusuz alternatif ürün seçenekleri de sunuyoruz.",
  },
  {
    question: "Fiyatlandırma nasıl belirleniyor?",
    answer:
      "Fiyat; alanın metrekaresi, haşere yoğunluğu ve uygulanacak yönteme göre belirlenir. İlk keşif tamamen ücretsizdir ve size özel şeffaf bir teklif sunulur.",
  },
  {
    question: "Garanti süreniz ne kadar?",
    answer:
      "Uygulama sonrası belirli bir süre için garanti kapsamı sunuyoruz; garanti süresi içinde tekrar sorun yaşanması halinde ek ücret talep etmeden yeniden uygulama yapıyoruz.",
  },
  {
    question: "Acil durumlar için 7/24 hizmet veriyor musunuz?",
    answer:
      "Evet, acil haşere sorunları için çağrı merkezimiz üzerinden 7/24 destek sağlıyoruz. Yoğunluğa göre en kısa sürede ekibimiz size ulaşır.",
  },
];

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="overflow-hidden rounded-2xl border border-ink/10"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-ink sm:text-base">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-primary-green"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-ink/60">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SssPage() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Sık Sorulan Sorular
          </h1>
          <p className="mt-3 text-ink/60">
            Merak ettiğiniz konulara hızlı yanıtlar.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
