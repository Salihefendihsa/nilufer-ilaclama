"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, CheckCircle2, Factory, Home as HomeIcon, MoreHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { COMPANY } from "@/lib/data/company";
import { SERVICES } from "@/lib/data/services";

const PROPERTY_TYPES = [
  { value: "Ev", icon: HomeIcon },
  { value: "İşyeri", icon: Building2 },
  { value: "Fabrika", icon: Factory },
  { value: "Diğer", icon: MoreHorizontal },
];

const STEP_LABELS = ["Hizmet", "Mülk Tipi", "İletişim", "Özet"];

type FormState = {
  serviceType: string;
  propertyType: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  district: string;
};

const INITIAL_STATE: FormState = {
  serviceType: "",
  propertyType: "",
  fullName: "",
  phone: "",
  email: "",
  address: "",
  district: "",
};

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-xs font-medium text-ink/50 sm:text-sm">
        {STEP_LABELS.map((label, i) => (
          <span
            key={label}
            className={i + 1 <= step ? "text-primary-green" : undefined}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
        <motion.div
          className="h-full rounded-full bg-primary-green"
          animate={{ width: `${(step / STEP_LABELS.length) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export default function TeklifPage() {
  const stepStartRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitError) errorRef.current?.scrollIntoView({ behavior: "auto", block: "center" });
  }, [submitError]);

  useEffect(() => {
    if (submitted) successRef.current?.scrollIntoView({ behavior: "auto", block: "center" });
  }, [submitted]);

  const update = (patch: Partial<FormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const canGoNext =
    (step === 1 && form.serviceType !== "") ||
    (step === 2 && form.propertyType !== "") ||
    (step === 3 && form.fullName.trim() !== "" && form.phone.trim() !== "");

  const moveToStep = (next: number) => {
    setStep(next);
    stepStartRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
  };
  const handleNext = () => moveToStep(Math.min(step + 1, 4));
  const handleBack = () => moveToStep(Math.max(step - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (!isSupabaseConfigured()) {
        throw new Error(
          `Talep formu şu anda kullanılamıyor. Lütfen ${COMPANY.phoneDisplay} numarasını arayın veya WhatsApp'tan yazın.`
        );
      }
      const supabase = createClient();
      // No .select() here: anon can INSERT (RLS) but not SELECT quote_requests,
      // and .select() forces a RETURNING read-back that RLS would then reject.
      const { error } = await supabase.from("quote_requests").insert({
        full_name: form.fullName,
        phone: form.phone,
        email: form.email || null,
        property_type: form.propertyType || null,
        service_type: form.serviceType || null,
        address: form.address || null,
        district: form.district || null,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : `Talebiniz gönderilemedi. Lütfen tekrar deneyin veya ${COMPANY.phoneDisplay} numarasını arayın.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white px-4 py-24">
        <motion.div
          ref={successRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-md text-center"
        >
          <CheckCircle2
            size={56}
            strokeWidth={1.5}
            className="mx-auto text-primary-green"
          />
          <h1 role="status" className="mt-6 text-2xl font-extrabold text-ink">
            Talebiniz Alındı
          </h1>
          <p className="mt-3 text-ink/60">
            Ücretsiz keşif talebiniz için teşekkür ederiz. Ekibimiz en kısa
            sürede sizinle iletişime geçecektir.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex rounded-full bg-primary-green px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Anasayfaya Dön
          </a>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Ücretsiz Keşif Talep Et
          </h1>
          <p className="mt-3 text-ink/60">
            Birkaç adımda talebinizi iletin, size en kısa sürede dönüş
            yapalım.
          </p>
          <p className="mt-2 text-sm text-ink/50">
            Bu form yalnızca başvuru içindir; kullanıcı hesabı oluşturmaz.
          </p>
        </div>

        <div ref={stepStartRef} className="mt-10 scroll-mt-24">
          <ProgressBar step={step} />
        </div>

        <div className="relative mt-8 overflow-hidden sm:mt-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-bold text-ink">
                  Hangi hizmetle ilgileniyorsunuz?
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SERVICES.map((service) => (
                    <button
                      key={service.slug}
                      type="button"
                      onClick={() => update({ serviceType: service.title })}
                      aria-pressed={form.serviceType === service.title}
                      className={`min-h-12 rounded-xl border-2 p-4 text-left text-sm font-semibold transition-colors ${
                        form.serviceType === service.title
                          ? "border-primary-green bg-primary-green/10 text-primary-green"
                          : "border-ink/10 text-ink hover:border-primary-green/50"
                      }`}
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-bold text-ink">Mülk tipiniz nedir?</h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {PROPERTY_TYPES.map(({ value, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => update({ propertyType: value })}
                      aria-pressed={form.propertyType === value}
                      className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 text-sm font-semibold transition-colors sm:p-4 ${
                        form.propertyType === value
                          ? "border-primary-green bg-primary-green/10 text-primary-green"
                          : "border-ink/10 text-ink hover:border-primary-green/50"
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                      {value}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-bold text-ink">İletişim bilgileriniz</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    <span>Ad Soyad <span aria-hidden className="text-primary-red">*</span><span className="sr-only">zorunlu</span></span>
                    <input
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Adınız ve soyadınız"
                    value={form.fullName}
                    onChange={(e) => update({ fullName: e.target.value })}
                    className="min-h-12 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-base font-normal outline-none transition-colors focus:border-primary-green sm:text-sm"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    <span>Telefon <span aria-hidden className="text-primary-red">*</span><span className="sr-only">zorunlu</span></span>
                    <input
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="Telefon numaranız"
                    value={form.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    className="min-h-12 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-base font-normal outline-none transition-colors focus:border-primary-green sm:text-sm"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    <span>E-posta <span className="font-normal text-ink/50">(isteğe bağlı)</span></span>
                    <input
                    type="email"
                    autoComplete="email"
                    placeholder="E-posta adresiniz"
                    value={form.email}
                    onChange={(e) => update({ email: e.target.value })}
                    className="min-h-12 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-base font-normal outline-none transition-colors focus:border-primary-green sm:text-sm"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                    <span>İlçe <span className="font-normal text-ink/50">(isteğe bağlı)</span></span>
                    <input
                    type="text"
                    autoComplete="address-level2"
                    placeholder="İlçeniz"
                    value={form.district}
                    onChange={(e) => update({ district: e.target.value })}
                    className="min-h-12 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-base font-normal outline-none transition-colors focus:border-primary-green sm:text-sm"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-ink sm:col-span-2">
                    <span>Adres <span className="font-normal text-ink/50">(isteğe bağlı)</span></span>
                    <input
                    type="text"
                    autoComplete="street-address"
                    placeholder="Adresiniz"
                    value={form.address}
                    onChange={(e) => update({ address: e.target.value })}
                    className="min-h-12 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-base font-normal outline-none transition-colors focus:border-primary-green sm:text-sm"
                    />
                  </label>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-bold text-ink">Talebinizi kontrol edin</h2>
                <dl className="mt-5 divide-y divide-ink/10 rounded-xl border border-ink/10">
                  {[
                    ["Hizmet", form.serviceType],
                    ["Mülk Tipi", form.propertyType],
                    ["Ad Soyad", form.fullName],
                    ["Telefon", form.phone],
                    ["E-posta", form.email || "—"],
                    ["İlçe", form.district || "—"],
                    ["Adres", form.address || "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex min-w-0 justify-between gap-3 px-4 py-3 text-sm">
                      <dt className="text-ink/50">{label}</dt>
                      <dd className="max-w-[60%] min-w-0 break-words text-right font-medium text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {submitError && (
                  <p ref={errorRef} role="alert" className="mt-4 text-sm text-primary-red">{submitError}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink disabled:invisible"
          >
            Geri
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              className="rounded-full bg-primary-red px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-40"
            >
              Devam Et
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-full bg-primary-red px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Gönderiliyor..." : "Talebi Gönder"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
