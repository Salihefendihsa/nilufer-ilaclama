import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import DashboardCard from "@/components/panel/DashboardCard";
import LogoutButton from "@/components/panel/LogoutButton";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Job = Database["public"]["Tables"]["jobs"]["Row"];
type Payment = Database["public"]["Tables"]["payments"]["Row"];

async function getDashboardData() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      profiles: [] as Profile[],
      jobs: [] as Job[],
      payments: [] as Payment[],
      error: "Supabase ortam değişkenleri henüz tanımlanmadı.",
    };
  }

  try {
    const supabase = createClient();

    const [profilesRes, jobsRes, paymentsRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    if (profilesRes.error) throw profilesRes.error;
    if (jobsRes.error) throw jobsRes.error;
    if (paymentsRes.error) throw paymentsRes.error;

    return {
      profiles: profilesRes.data ?? [],
      jobs: jobsRes.data ?? [],
      payments: paymentsRes.data ?? [],
      error: null as string | null,
    };
  } catch (err) {
    return {
      profiles: [] as Profile[],
      jobs: [] as Job[],
      payments: [] as Payment[],
      error:
        err instanceof Error
          ? err.message
          : "Veriler alınırken bir hata oluştu.",
    };
  }
}

export default async function FirmaPanelPage() {
  const { profiles, jobs, payments, error } = await getDashboardData();

  return (
    <main className="min-h-screen bg-ink/[0.02] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Firma Paneli</h1>
            <p className="mt-1 text-sm text-ink/60">
              Kullanıcılar, işler ve ödemelere genel bakış.
            </p>
          </div>
          <LogoutButton />
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red">
            {error}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <DashboardCard
            title="Son Kullanıcılar"
            isEmpty={profiles.length === 0}
            emptyText="Henüz kayıtlı kullanıcı yok."
          >
            {profiles.map((profile) => (
              <li key={profile.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-medium text-ink">
                  {profile.full_name ?? "İsimsiz kullanıcı"}
                </span>
                <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-ink/50">
                  {profile.role}
                </span>
              </li>
            ))}
          </DashboardCard>

          <DashboardCard
            title="Son İşler"
            isEmpty={jobs.length === 0}
            emptyText="Henüz iş kaydı yok."
          >
            {jobs.map((job) => (
              <li key={job.id} className="py-2.5 text-sm">
                <p className="font-medium text-ink">{job.service_type}</p>
                <p className="text-xs text-ink/50">{job.status}</p>
              </li>
            ))}
          </DashboardCard>

          <DashboardCard
            title="Son Ödemeler"
            isEmpty={payments.length === 0}
            emptyText="Henüz ödeme kaydı yok."
          >
            {payments.map((payment) => (
              <li key={payment.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-ink">{payment.payment_type ?? "Ödeme"}</span>
                <span className="font-semibold text-primary-green">
                  {payment.amount.toLocaleString("tr-TR")} ₺
                </span>
              </li>
            ))}
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}
