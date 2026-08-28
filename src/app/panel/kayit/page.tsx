"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import SupabaseNotice from "@/components/panel/SupabaseNotice";

const STEP_LABELS = ["Bilgileriniz", "Adres", "Şifre"];

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  password: string;
  passwordConfirm: string;
  kvkkAccepted: boolean;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  district: "",
  password: "",
  passwordConfirm: "",
  kvkkAccepted: false,
};

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

function ProgressBar({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-ink/50">
        {STEP_LABELS.map((label, i) => (
          <span key={label} className={i + 1 <= step ? "text-primary-green" : undefined}>
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

export default function KayitPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<FormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const canGoNext =
    (step === 1 &&
      form.fullName.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.email.trim() !== "") ||
    (step === 2 && form.address.trim() !== "" && form.district.trim() !== "");

  const canSubmit =
    form.password.length >= 6 &&
    form.password === form.passwordConfirm &&
    form.kvkkAccepted;

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error("Kayıt işlemi başlatılamadı.");

      const userId = signUpData.user.id;

      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        full_name: form.fullName,
        phone: form.phone,
        role: "customer",
      });

      if (profileError) throw profileError;

      const { error: customerError } = await supabase.from("customers").insert({
        profile_id: userId,
        full_name: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        district: form.district,
      });

      if (customerError) throw customerError;

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kayıt olurken bir hata oluştu."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink/[0.02] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
          <SupabaseNotice />
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink/[0.02] px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-sm"
        >
          <CheckCircle2 size={48} strokeWidth={1.5} className="mx-auto text-primary-green" />
          <h1 className="mt-4 text-lg font-bold text-ink">Kaydınız Alındı</h1>
          <p className="mt-2 text-sm text-ink/60">
            Hesabınız oluşturuldu. E-posta adresinizi onayladıktan sonra giriş
            yapabilirsiniz.
          </p>
          <Link
            href="/panel/login?role=customer"
            className="mt-6 inline-flex rounded-full bg-primary-green px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Giriş Yap
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink/[0.02] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Nilüfer İlaçlama"
            width={160}
            height={53}
            className="h-10 w-auto"
          />
        </div>

        <h1 className="mt-6 text-center text-lg font-bold text-ink">
          Müşteri Kaydı
        </h1>

        <div className="mt-6">
          <ProgressBar step={step} />
        </div>

        <div className="relative mt-6 min-h-[240px] overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <input
                  type="text"
                  required
                  placeholder="Ad Soyad *"
                  value={form.fullName}
                  onChange={(e) => update({ fullName: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                <input
                  type="tel"
                  required
                  placeholder="Telefon *"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                <input
                  type="email"
                  required
                  placeholder="E-posta *"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
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
                className="space-y-4"
              >
                <input
                  type="text"
                  required
                  placeholder="İlçe *"
                  value={form.district}
                  onChange={(e) => update({ district: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Adres *"
                  value={form.address}
                  onChange={(e) => update({ address: e.target.value })}
                  className="w-full resize-none rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
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
                <input
                  type="password"
                  required
                  placeholder="Şifre * (en az 6 karakter)"
                  value={form.password}
                  onChange={(e) => update({ password: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                <input
                  type="password"
                  required
                  placeholder="Şifre Tekrar *"
                  value={form.passwordConfirm}
                  onChange={(e) => update({ passwordConfirm: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
                />
                {form.password &&
                  form.passwordConfirm &&
                  form.password !== form.passwordConfirm && (
                    <p className="text-xs text-primary-red">Şifreler eşleşmiyor.</p>
                  )}

                <label className="flex items-start gap-2.5 text-xs text-ink/60">
                  <input
                    type="checkbox"
                    checked={form.kvkkAccepted}
                    onChange={(e) => update({ kvkkAccepted: e.target.checked })}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/30 text-primary-green focus:ring-primary-green"
                  />
                  Kişisel verilerimin KVKK kapsamında işlenmesini kabul
                  ediyorum. *
                </label>

                {error && <p className="text-sm text-primary-red">{error}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink disabled:invisible"
          >
            Geri
          </button>

          {step < 3 ? (
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
              disabled={!canSubmit || submitting}
              className="rounded-full bg-primary-red px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Kaydediliyor..." : "Kayıt Ol"}
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-ink/60">
          Zaten hesabınız var mı?{" "}
          <Link
            href="/panel/login?role=customer"
            className="font-semibold text-primary-green hover:text-primary-red"
          >
            Giriş Yapın
          </Link>
        </p>
      </div>
    </main>
  );
}
