import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import DashboardCard from "@/components/panel/DashboardCard";
import LogoutButton from "@/components/panel/LogoutButton";

type Job = Database["public"]["Tables"]["jobs"]["Row"];
type Contract = Database["public"]["Tables"]["contracts"]["Row"];

async function getDashboardData() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      jobs: [] as Job[],
      contracts: [] as Contract[],
      error: "Supabase ortam değişkenleri henüz tanımlanmadı.",
    };
  }

  try {
    const supabase = createClient();

    // RLS already scopes these rows to the signed-in customer via
    // current_customer_id(), so no manual filter is needed here.
    const [jobsRes, contractsRes] = await Promise.all([
      supabase
        .from("jobs")
        .select("*")
        .order("scheduled_at", { ascending: true }),
      supabase
        .from("contracts")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (jobsRes.error) throw jobsRes.error;
    if (contractsRes.error) throw contractsRes.error;

    return {
      jobs: jobsRes.data ?? [],
      contracts: contractsRes.data ?? [],
      error: null as string | null,
    };
  } catch (err) {
    return {
      jobs: [] as Job[],
      contracts: [] as Contract[],
      error:
        err instanceof Error
          ? err.message
          : "Veriler alınırken bir hata oluştu.",
    };
  }
}

export default async function MusteriPanelPage() {
  const { jobs, contracts, error } = await getDashboardData();

  return (
    <main className="min-h-screen bg-ink/[0.02] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Müşteri Paneli</h1>
            <p className="mt-1 text-sm text-ink/60">
              İşleriniz ve sözleşmeleriniz hakkında bilgi.
            </p>
          </div>
          <LogoutButton />
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red">
            {error}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DashboardCard
            title="İşlerim"
            isEmpty={jobs.length === 0}
            emptyText="Henüz planlanmış bir işiniz yok."
          >
            {jobs.map((job) => (
              <li key={job.id} className="py-2.5 text-sm">
                <p className="font-medium text-ink">{job.service_type}</p>
                <p className="text-xs text-ink/50">{job.status}</p>
              </li>
            ))}
          </DashboardCard>

          <DashboardCard
            title="Sözleşmelerim"
            isEmpty={contracts.length === 0}
            emptyText="Kayıtlı sözleşmeniz bulunmuyor."
          >
            {contracts.map((contract) => (
              <li key={contract.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-ink">
                  {contract.duration_months
                    ? `${contract.duration_months} aylık sözleşme`
                    : "Sözleşme"}
                </span>
                <span className="text-xs text-ink/50">{contract.status}</span>
              </li>
            ))}
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}
