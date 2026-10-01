"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "İlaçlama sonrası eve ne zaman girebilirim?",
    answer:
      "Bekleme süresi kullanılan ürüne, alana ve havalandırmaya göre değişir; genel bilgi olarak birkaç saat civarında olabilir. Sizin evinizde geçerli süre, ürün etiketi ve uygulamayı yapan ekibin bildirimiyle netleşir; uygulama öncesinde sormanızı öneririz.",
  },
  {
    question: "Evcil hayvanlarım için güvenli mi?",
    answer:
      "Güvenlik; kullanılan ürüne, uygulama yöntemine ve hayvanın türüne göre değişir, bu yüzden kesin bir güvence veremeyiz. Genel öneri, uygulama sırasında evcil hayvanları ortamdan uzaklaştırmak ve kuruma süresi bitene kadar temas ettirmemektir. Evinizde evcil hayvan varsa talebinizde belirtin; ürün, ruhsat/onay bilgisi ve önlemler keşifte ve teklifte netleştirilir.",
  },
  {
    question: "Uygulama öncesi nasıl hazırlık yapmalıyım?",
    answer:
      "Mutfak tezgahlarının temizlenmesi, açık gıda ürünlerinin kapatılması, dolap ve çekmecelerin biraz aralık bırakılması uygulamanın etkinliğini artırır. Alana özel hazırlık adımları keşifte netleştirilir.",
  },
  {
    question: "İlaçlamanın etkisi ne kadar sürer?",
    answer:
      "Etki süresi yönteme, ürüne, alana ve istila durumuna göre değişir; sabit bir süre söylemek doğru olmaz. Yoğun istilalarda periyodik kontrol gerekebilir. Beklenen süre ve takip planı keşifte ve teklifte netleştirilir.",
  },
  {
    question: "Kaç uygulama sonrası sonuç alırım?",
    answer:
      "Uygulama sayısı haşere türüne ve istila yoğunluğuna göre değişir; hafif sorunlarda tek uygulama yeterli olabilirken yoğun istilalarda birden fazla uygulama gerekebilir. Kapsam ve uygulama sayısı keşifte belirlenip teklifte yazılı olarak netleştirilir.",
  },
  {
    question: "Gebe veya bebekli evlerde ilaçlama yapılabilir mi?",
    answer:
      "Gebe, bebek veya sağlık sorunu olan kişiler için özellikle dikkatli olunmalıdır. Uygulama öncesinde durumu bize bildirin; ürün seçimi, bekleme ve havalandırma süresi keşifte netleştirilir. Emin olamadığınız durumlarda doktorunuza danışmanızı öneririz.",
  },
  {
    question: "Uygulama sonrası koku kalır mı?",
    answer:
      "Koku, kullanılan ürüne ve ortama göre değişir. Kokuya hassasiyetiniz varsa talebinizde belirtin; uygun ürün seçenekleri keşifte değerlendirilir.",
  },
  {
    question: "Fiyatlandırma nasıl belirleniyor?",
    answer:
      "Fiyat; alanın metrekaresi, haşere yoğunluğu ve uygulanacak yönteme göre belirlenir. Hizmet kapsamı ve fiyat, keşif sonrası hazırlanan teklifte netleştirilir.",
  },
  {
    question: "Uygulama sonrası takip nasıl yapılıyor?",
    answer:
      "Takip ve tekrar uygulama koşulları hizmete göre değişir ve teklifte yazılı olarak belirtilir. Ayrıntı için keşif sırasında sorabilirsiniz.",
  },
  {
    question: "Acil durumlarda nasıl ulaşabilirim?",
    answer:
      "Telefon veya WhatsApp üzerinden bize ulaşabilirsiniz. Dönüş ve randevu süresi yoğunluğa göre değişir.",
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
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
        aria-hidden={!open}
      >
        <p className="px-5 pb-4 text-sm leading-relaxed text-ink/60">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function SssPage() {
  return (
    <section className="bg-white px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
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
