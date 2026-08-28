import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import SupabaseNotice from "@/components/panel/SupabaseNotice";
import { ClipboardList, Users, Wrench, Briefcase } from "lucide-react";

type Counts = {
  customers: number;
  newQuotes: number;
  activeJobs: number;
  staff: number;
};

async function getCounts(): Promise<{ counts: Counts | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { counts: null, error: null };
  }

  try {
    const supabase = createClient();

    const [customersRes, newQuotesRes, activeJobsRes, staffRes] = await Promise.all([
      supabase.from("customers").select("*", { count: "exact", head: true }),
      supabase
        .from("quote_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .in("status", ["pending", "scheduled"]),
      supabase.from("staff").select("*", { count: "exact", head: true }),
    ]);

    if (customersRes.error) throw customersRes.error;
    if (newQuotesRes.error) throw newQuotesRes.error;
    if (activeJobsRes.error) throw activeJobsRes.error;
    if (staffRes.error) throw staffRes.error;

    return {
      counts: {
        customers: customersRes.count ?? 0,
        newQuotes: newQuotesRes.count ?? 0,
        activeJobs: activeJobsRes.count ?? 0,
        staff: staffRes.count ?? 0,
      },
      error: null,
    };
  } catch (err) {
    return {
      counts: null,
      error: err instanceof Error ? err.message : "Veriler alınırken bir hata oluştu.",
    };
  }
}

export default async function FirmaPanelPage() {
  const { counts, error } = await getCounts();

  const cards = [
    { label: "Toplam Müşteri", value: counts?.customers ?? 0, icon: Users },
    { label: "Yeni Teklif Talebi", value: counts?.newQuotes ?? 0, icon: ClipboardList },
    { label: "Aktif İş", value: counts?.activeJobs ?? 0, icon: Wrench },
    { label: "Personel", value: counts?.staff ?? 0, icon: Briefcase },
  ];

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/60">
          Müşteriler, teklif talepleri, işler ve personele genel bakış.
        </p>

        {!isSupabaseConfigured() ? (
          <div className="mt-6">
            <SupabaseNotice />
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <p className="mt-4 text-3xl font-extrabold text-ink">{card.value}</p>
                <p className="mt-1 text-sm text-ink/60">{card.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
