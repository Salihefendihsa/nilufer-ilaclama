"use client";

import { useEffect, useState } from "react";
import { Plus, Wrench } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";
import { SERVICES } from "@/lib/data/services";
import SupabaseNotice from "@/components/panel/SupabaseNotice";
import Modal from "@/components/panel/Modal";

type Customer = Database["public"]["Tables"]["customers"]["Row"];
type StaffRow = Database["public"]["Tables"]["staff"]["Row"] & {
  profiles: { full_name: string | null } | null;
};
type JobRow = Database["public"]["Tables"]["jobs"]["Row"] & {
  customers: { full_name: string } | null;
  staff: { id: string; profiles: { full_name: string | null } | null } | null;
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Bekliyor" },
  { value: "scheduled", label: "Planlandı" },
  { value: "completed", label: "Tamamlandı" },
  { value: "cancelled", label: "İptal Edildi" },
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  scheduled: "bg-blue-100 text-blue-700",
  completed: "bg-primary-green/10 text-primary-green",
  cancelled: "bg-ink/10 text-ink/60",
};

type FormState = {
  customer_id: string;
  assigned_staff_id: string;
  service_type: string;
  scheduled_at: string;
  notes: string;
};

const EMPTY_FORM: FormState = {
  customer_id: "",
  assigned_staff_id: "",
  service_type: "",
  scheduled_at: "",
  notes: "",
};

export default function IslerPage() {
  const configured = isSupabaseConfigured();

  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [staff, setStaff] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!configured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const [jobsRes, customersRes, staffRes] = await Promise.all([
        supabase
          .from("jobs")
          .select("*, customers(full_name), staff:assigned_staff_id(id, profiles(full_name))")
          .order("scheduled_at", { ascending: true }),
        supabase.from("customers").select("*").order("full_name", { ascending: true }),
        supabase
          .from("staff")
          .select("*, profiles(full_name)")
          .order("created_at", { ascending: false }),
      ]);
      if (jobsRes.error) throw jobsRes.error;
      if (customersRes.error) throw customersRes.error;
      if (staffRes.error) throw staffRes.error;
      setJobs((jobsRes.data as JobRow[]) ?? []);
      setCustomers(customersRes.data ?? []);
      setStaff((staffRes.data as StaffRow[]) ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "İşler alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("jobs")
        .update({ status })
        .eq("id", id);
      if (updateError) throw updateError;
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Durum güncellenemedi.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSave = async () => {
    if (!form.customer_id || !form.service_type) {
      setFormError("Müşteri ve hizmet türü zorunludur.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from("jobs").insert({
        customer_id: form.customer_id,
        assigned_staff_id: form.assigned_staff_id || null,
        service_type: form.service_type,
        scheduled_at: form.scheduled_at || null,
        notes: form.notes || null,
      });
      if (insertError) throw insertError;
      setModalOpen(false);
      await fetchData();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">İşler</h1>
            <p className="mt-1 text-sm text-ink/60">
              Planlanan ve tamamlanan iş/randevuları yönetin.
            </p>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            disabled={!configured || customers.length === 0}
            className="inline-flex items-center gap-2 rounded-full bg-primary-red px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-50"
            title={customers.length === 0 ? "Önce bir müşteri ekleyin" : undefined}
          >
            <Plus size={16} />
            Yeni İş Oluştur
          </button>
        </div>

        {!configured && (
          <div className="mt-6">
            <SupabaseNotice />
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red">
            {error}
          </div>
        )}

        {configured && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
            {loading ? (
              <p className="p-8 text-center text-sm text-ink/50">Yükleniyor...</p>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center gap-3 p-12 text-center">
                <Wrench size={28} className="text-ink/30" />
                <p className="text-sm font-semibold text-ink">Henüz iş kaydı yok</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-ink/[0.02] text-xs uppercase tracking-wide text-ink/50">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Müşteri</th>
                      <th className="px-5 py-3 font-semibold">Hizmet</th>
                      <th className="px-5 py-3 font-semibold">Personel</th>
                      <th className="px-5 py-3 font-semibold">Tarih</th>
                      <th className="px-5 py-3 font-semibold">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {jobs.map((job) => (
                      <tr key={job.id} className="transition-colors hover:bg-ink/[0.015]">
                        <td className="px-5 py-3.5 font-medium text-ink">
                          {job.customers?.full_name ?? "—"}
                        </td>
                        <td className="px-5 py-3.5 text-ink/70">{job.service_type}</td>
                        <td className="px-5 py-3.5 text-ink/70">
                          {job.staff?.profiles?.full_name ?? "Atanmadı"}
                        </td>
                        <td className="px-5 py-3.5 text-ink/50">
                          {job.scheduled_at
                            ? new Date(job.scheduled_at).toLocaleString("tr-TR", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "—"}
                        </td>
                        <td className="px-5 py-3.5">
                          <select
                            value={job.status}
                            disabled={updatingId === job.id}
                            onChange={(e) => handleStatusChange(job.id, e.target.value)}
                            className={`rounded-full border-0 px-2.5 py-1 text-[11px] font-semibold outline-none ${
                              STATUS_STYLES[job.status] ?? "bg-ink/10 text-ink/60"
                            }`}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Yeni İş Oluştur">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Müşteri
            </label>
            <select
              value={form.customer_id}
              onChange={(e) => setForm((f) => ({ ...f, customer_id: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
            >
              <option value="">Müşteri seçin...</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Personel Ata
            </label>
            <select
              value={form.assigned_staff_id}
              onChange={(e) => setForm((f) => ({ ...f, assigned_staff_id: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
            >
              <option value="">Atanmadı</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.profiles?.full_name ?? s.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Hizmet Türü
            </label>
            <select
              value={form.service_type}
              onChange={(e) => setForm((f) => ({ ...f, service_type: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
            >
              <option value="">Hizmet seçin...</option>
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Planlanan Tarih
            </label>
            <input
              type="datetime-local"
              value={form.scheduled_at}
              onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Notlar"
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            className="w-full resize-none rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
          />

          {formError && <p className="text-sm text-primary-red">{formError}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-primary-green px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
