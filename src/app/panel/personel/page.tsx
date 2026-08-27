import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import DashboardCard from "@/components/panel/DashboardCard";
import LogoutButton from "@/components/panel/LogoutButton";

type Job = Database["public"]["Tables"]["jobs"]["Row"];
type JobReport = Database["public"]["Tables"]["job_reports"]["Row"];

async function getDashboardData() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      jobs: [] as Job[],
      reports: [] as JobReport[],
      error: "Supabase ortam değişkenleri henüz tanımlanmadı.",
    };
  }

  try {
    const supabase = createClient();

    // RLS already scopes these rows to the signed-in staff member via
    // current_staff_id(), so no manual filter is needed here.
    const [jobsRes, reportsRes] = await Promise.all([
      supabase
        .from("jobs")
        .select("*")
        .order("scheduled_at", { ascending: true }),
      supabase
        .from("job_reports")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    if (jobsRes.error) throw jobsRes.error;
    if (reportsRes.error) throw reportsRes.error;

    return {
      jobs: jobsRes.data ?? [],
      reports: reportsRes.data ?? [],
      error: null as string | null,
    };
  } catch (err) {
    return {
      jobs: [] as Job[],
      reports: [] as JobReport[],
      error:
        err instanceof Error
          ? err.message
          : "Veriler alınırken bir hata oluştu.",
    };
  }
}

export default async function PersonelPanelPage() {
  const { jobs, reports, error } = await getDashboardData();

  return (
    <main className="min-h-screen bg-ink/[0.02] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Personel Paneli</h1>
            <p className="mt-1 text-sm text-ink/60">
              Size atanan işler ve doldurduğunuz uygulama raporları.
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
            title="Bana Atanan İşler"
            isEmpty={jobs.length === 0}
            emptyText="Şu anda atanmış bir işiniz yok."
          >
            {jobs.map((job) => (
              <li key={job.id} className="py-2.5 text-sm">
                <p className="font-medium text-ink">{job.service_type}</p>
                <p className="text-xs text-ink/50">{job.status}</p>
              </li>
            ))}
          </DashboardCard>

          <DashboardCard
            title="Son Uygulama Raporları (EK-1)"
            isEmpty={reports.length === 0}
            emptyText="Henüz rapor girilmemiş."
          >
            {reports.map((report) => (
              <li key={report.id} className="py-2.5 text-sm">
                <p className="font-medium text-ink">
                  {report.products_used ?? "Ürün belirtilmedi"}
                </p>
                <p className="text-xs text-ink/50">{report.dosage ?? "Doz belirtilmedi"}</p>
              </li>
            ))}
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}
