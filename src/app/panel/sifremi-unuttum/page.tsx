"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import SupabaseNotice from "@/components/panel/SupabaseNotice";

export default function SifremiUnuttumPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${window.location.origin}/panel/sifre-guncelle` }
      );
      if (resetError) throw resetError;
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sıfırlama bağlantısı gönderilirken bir hata oluştu."
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
          Şifremi Unuttum
        </h1>

        {sent ? (
          <div className="mt-6 text-center">
            <CheckCircle2
              size={44}
              strokeWidth={1.5}
              className="mx-auto text-primary-green"
            />
            <p className="mt-4 text-sm font-semibold text-ink">
              E-postanızı kontrol edin
            </p>
            <p className="mt-2 text-sm text-ink/60">
              {email} adresine bir şifre sıfırlama bağlantısı gönderdik.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <p className="text-sm text-ink/60">
              Hesabınıza kayıtlı e-posta adresini girin, size bir şifre
              sıfırlama bağlantısı gönderelim.
            </p>
            <input
              type="email"
              required
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
            />

            {error && <p className="text-sm text-primary-red">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-ink/60">
          <Link
            href="/panel/login"
            className="font-semibold text-primary-green hover:text-primary-red"
          >
            ← Giriş sayfasına dön
          </Link>
        </p>
      </div>
    </main>
  );
}
