"use client";

import { useEffect, useMemo, useState } from "react";
import { Briefcase, Info, Pencil, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";
import SupabaseNotice from "@/components/panel/SupabaseNotice";
import Modal from "@/components/panel/Modal";
import ConfirmDialog from "@/components/panel/ConfirmDialog";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type StaffRow = Database["public"]["Tables"]["staff"]["Row"] & {
  profiles: Pick<Profile, "full_name" | "phone" | "created_at"> | null;
};

type FormState = {
  profile_id: string;
  position: string;
  salary_base: string;
};

const EMPTY_FORM: FormState = { profile_id: "", position: "", salary_base: "" };

export default function PersonelPage() {
  const configured = isSupabaseConfigured();

  const [staffRows, setStaffRows] = useState<StaffRow[]>([]);
  const [staffProfiles, setStaffProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<StaffRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    if (!configured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const [staffRes, profilesRes] = await Promise.all([
        supabase
          .from("staff")
          .select("*, profiles(full_name, phone, created_at)")
          .order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").eq("role", "staff"),
      ]);
      if (staffRes.error) throw staffRes.error;
      if (profilesRes.error) throw profilesRes.error;
      setStaffRows((staffRes.data as StaffRow[]) ?? []);
      setStaffProfiles(profilesRes.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Personel verileri alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const availableProfiles = useMemo(() => {
    const usedIds = new Set(staffRows.map((s) => s.profile_id));
    return staffProfiles.filter((p) => !usedIds.has(p.id));
  }, [staffRows, staffProfiles]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (row: StaffRow) => {
    setEditingId(row.id);
    setForm({
      profile_id: row.profile_id,
      position: row.position ?? "",
      salary_base: row.salary_base != null ? String(row.salary_base) : "",
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingId && !form.profile_id) {
      setFormError("Bir personel profili seçmelisiniz.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const supabase = createClient();
      const payload = {
        position: form.position || null,
        salary_base: form.salary_base ? Number(form.salary_base) : null,
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("staff")
          .update(payload)
          .eq("id", editingId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("staff").insert({
          profile_id: form.profile_id,
          ...payload,
        });
        if (insertError) throw insertError;
      }
      setModalOpen(false);
      await fetchData();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase
        .from("staff")
        .delete()
        .eq("id", deleteTarget.id);
      if (deleteError) throw deleteError;
      setDeleteTarget(null);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Silinemedi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Personel</h1>
            <p className="mt-1 text-sm text-ink/60">
              Ekibinizin pozisyon ve maaş bilgilerini yönetin.
            </p>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            disabled={!configured}
            className="inline-flex items-center gap-2 rounded-full bg-primary-red px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Personel Ekle
          </button>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary-green/20 bg-primary-green/5 p-4 text-sm text-ink/70">
          <Info size={18} className="mt-0.5 shrink-0 text-primary-green" />
          <p>
            <strong className="text-ink">Personel daveti:</strong> Yeni bir auth
            hesabı oluşturmak (e-posta/şifre ile) sunucu tarafında
            <code className="mx-1 rounded bg-ink/5 px-1.5 py-0.5 text-xs">
              service_role
            </code>
            anahtarı gerektirdiğinden istemci tarafından güvenli şekilde
            yapılamaz. Bu ekran yalnızca <code className="mx-1 rounded bg-ink/5 px-1.5 py-0.5 text-xs">role=&apos;staff&apos;</code>
            olan mevcut bir profili personel kaydına ekler/düzenler. Gerçek
            davet akışı bir sonraki fazda bir Supabase Edge Function ile
            uygulanacaktır.
          </p>
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
            ) : staffRows.length === 0 ? (
              <div className="flex flex-col items-center gap-3 p-12 text-center">
                <Briefcase size={28} className="text-ink/30" />
                <p className="text-sm font-semibold text-ink">Henüz personel yok</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-ink/[0.02] text-xs uppercase tracking-wide text-ink/50">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Ad Soyad</th>
                      <th className="px-5 py-3 font-semibold">Pozisyon</th>
                      <th className="px-5 py-3 font-semibold">Telefon</th>
                      <th className="px-5 py-3 font-semibold">Kayıt Tarihi</th>
                      <th className="px-5 py-3 font-semibold text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {staffRows.map((row) => (
                      <tr key={row.id} className="transition-colors hover:bg-ink/[0.015]">
                        <td className="px-5 py-3.5 font-medium text-ink">
                          {row.profiles?.full_name ?? "İsimsiz"}
                        </td>
                        <td className="px-5 py-3.5 text-ink/70">
                          {row.position ?? "—"}
                        </td>
                        <td className="px-5 py-3.5 text-ink/70">
                          {row.profiles?.phone ?? "—"}
                        </td>
                        <td className="px-5 py-3.5 text-ink/50">
                          {new Date(row.created_at).toLocaleDateString("tr-TR")}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => openEditModal(row)}
                              aria-label="Düzenle"
                              className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-primary-green/10 hover:text-primary-green"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(row)}
                              aria-label="Sil"
                              className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-primary-red/10 hover:text-primary-red"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Personeli Düzenle" : "Personel Ekle"}
      >
        <div className="space-y-4">
          {!editingId && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Profil
              </label>
              <select
                value={form.profile_id}
                onChange={(e) => setForm((f) => ({ ...f, profile_id: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
              >
                <option value="">Personel profili seçin...</option>
                {availableProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name ?? p.id}
                  </option>
                ))}
              </select>
              {availableProfiles.length === 0 && (
                <p className="mt-1.5 text-xs text-ink/50">
                  Eklenebilecek (role=&apos;staff&apos;, henüz personel kaydı olmayan)
                  bir profil bulunamadı.
                </p>
              )}
            </div>
          )}

          <input
            type="text"
            placeholder="Pozisyon (örn. Saha Teknisyeni)"
            value={form.position}
            onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
          />
          <input
            type="number"
            placeholder="Taban Maaş (₺)"
            value={form.salary_base}
            onChange={(e) => setForm((f) => ({ ...f, salary_base: e.target.value }))}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
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

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Personeli Sil"
        description={`"${deleteTarget?.profiles?.full_name ?? ""}" personel kaydını silmek istediğinize emin misiniz? Kullanıcının giriş hesabı silinmez, yalnızca personel kaydı kaldırılır.`}
      />
    </main>
  );
}
