"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Briefcase, User, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const ROLE_REDIRECTS: Record<string, string> = {
  owner: "/panel/firma",
  staff: "/panel/personel",
  customer: "/panel/musteri",
};

type RoleTab = "owner" | "staff" | "customer";

const ROLE_TABS: { value: RoleTab; label: string; icon: typeof Briefcase }[] = [
  { value: "owner", label: "Firma Girişi", icon: Briefcase },
  { value: "staff", label: "Personel Girişi", icon: Users },
  { value: "customer", label: "Müşteri Girişi", icon: User },
];

function isRoleTab(value: string | null): value is RoleTab {
  return value === "owner" || value === "staff" || value === "customer";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role");

  const [activeTab, setActiveTab] = useState<RoleTab>(
    isRoleTab(initialRole) ? initialRole : "owner"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });

      if (signInError) throw signInError;
      if (!signInData.user) throw new Error("Giriş başarısız oldu.");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", signInData.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error("Kullanıcı profili bulunamadı.");
      }

      const target = ROLE_REDIRECTS[profile.role] ?? "/panel/login";
      router.push(target);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Giriş yapılırken bir hata oluştu."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
          Panel Girişi
        </h1>

        <div className="mt-6 grid grid-cols-3 gap-1 rounded-full border border-ink/10 bg-ink/[0.03] p-1">
          {ROLE_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex flex-col items-center gap-1 rounded-full px-2 py-2 text-[11px] font-semibold transition-colors duration-300 ${
                  activeTab === tab.value
                    ? "bg-primary-green text-white"
                    : "text-ink/50 hover:text-ink/80"
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
          />
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-ink/50">Şifre</span>
              <Link
                href="/panel/sifremi-unuttum"
                className="text-xs font-semibold text-primary-green hover:text-primary-red"
              >
                Şifremi Unuttum
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
            />
          </div>

          {error && <p className="text-sm text-primary-red">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {activeTab === "customer" && (
          <p className="mt-4 text-center text-sm text-ink/60">
            Hesabınız yok mu?{" "}
            <Link
              href="/panel/kayit"
              className="font-semibold text-primary-green hover:text-primary-red"
            >
              Kayıt Olun
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}

export default function PanelLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
