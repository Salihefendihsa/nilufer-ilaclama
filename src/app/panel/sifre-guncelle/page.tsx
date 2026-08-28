"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import SupabaseNotice from "@/components/panel/SupabaseNotice";

export default function SifreGuncellePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const canSubmit = password.length >= 6 && password === passwordConfirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setDone(true);
      setTimeout(() => {
        router.push("/panel/login");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Şifre güncellenirken bir hata oluştu."
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink/[0.02] px-4">
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
          Şifreyi Güncelle
        </h1>

        {done ? (
          <div className="mt-6 text-center">
            <CheckCircle2
              size={44}
              strokeWidth={1.5}
              className="mx-auto text-primary-green"
            />
            <p className="mt-4 text-sm font-semibold text-ink">
              Şifreniz güncellendi
            </p>
            <p className="mt-2 text-sm text-ink/60">
              Giriş sayfasına yönlendiriliyorsunuz...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="password"
              required
              placeholder="Yeni Şifre (en az 6 karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
            />
            <input
              type="password"
              required
              placeholder="Yeni Şifre (Tekrar)"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
            />
            {password && passwordConfirm && password !== passwordConfirm && (
              <p className="text-xs text-primary-red">Şifreler eşleşmiyor.</p>
            )}

            {error && <p className="text-sm text-primary-red">{error}</p>}

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="w-full rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Güncelleniyor..." : "Şifreyi Güncelle"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
