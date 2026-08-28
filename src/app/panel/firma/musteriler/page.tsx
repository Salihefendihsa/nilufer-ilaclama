"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";
import SupabaseNotice from "@/components/panel/SupabaseNotice";
import Modal from "@/components/panel/Modal";
import ConfirmDialog from "@/components/panel/ConfirmDialog";

type Customer = Database["public"]["Tables"]["customers"]["Row"];

type CustomerFormState = {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  district: string;
};

const EMPTY_FORM: CustomerFormState = {
  full_name: "",
  phone: "",
  email: "",
  address: "",
  district: "",
};

export default function MusterilerPage() {
  const configured = isSupabaseConfigured();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CustomerFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCustomers = async () => {
    if (!configured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setCustomers(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Müşteriler alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.full_name.toLowerCase().includes(q) ||
        (c.phone ?? "").toLowerCase().includes(q)
    );
  }, [customers, query]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setEditingId(customer.id);
    setForm({
      full_name: customer.full_name,
      phone: customer.phone ?? "",
      email: customer.email ?? "",
      address: customer.address ?? "",
      district: customer.district ?? "",
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (form.full_name.trim() === "") {
      setFormError("Ad Soyad zorunludur.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const supabase = createClient();
      if (editingId) {
        const { error: updateError } = await supabase
          .from("customers")
          .update({
            full_name: form.full_name,
            phone: form.phone || null,
            email: form.email || null,
            address: form.address || null,
            district: form.district || null,
          })
          .eq("id", editingId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("customers").insert({
          full_name: form.full_name,
          phone: form.phone || null,
          email: form.email || null,
          address: form.address || null,
          district: form.district || null,
        });
        if (insertError) throw insertError;
      }
      setModalOpen(false);
      await fetchCustomers();
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
        .from("customers")
        .delete()
        .eq("id", deleteTarget.id);
      if (deleteError) throw deleteError;
      setDeleteTarget(null);
      await fetchCustomers();
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
            <h1 className="text-2xl font-extrabold text-ink">Müşteriler</h1>
            <p className="mt-1 text-sm text-ink/60">
              Kayıtlı müşterilerinizi görüntüleyin ve yönetin.
            </p>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            disabled={!configured}
            className="inline-flex items-center gap-2 rounded-full bg-primary-red px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            Yeni Müşteri Ekle
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
          <>
            <div className="mt-6 relative max-w-sm">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40"
              />
              <input
                type="text"
                placeholder="İsim veya telefon ile ara..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full border border-ink/15 py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary-green"
              />
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
              {loading ? (
                <p className="p-8 text-center text-sm text-ink/50">Yükleniyor...</p>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-3 p-12 text-center">
                  <Users size={28} className="text-ink/30" />
                  <p className="text-sm font-semibold text-ink">
                    {customers.length === 0
                      ? "Henüz müşteri yok"
                      : "Aramanızla eşleşen müşteri bulunamadı"}
                  </p>
                  {customers.length === 0 && (
                    <button
                      type="button"
                      onClick={openAddModal}
                      className="mt-2 rounded-full bg-primary-green px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      İlk Müşteriyi Ekle
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-ink/10 bg-ink/[0.02] text-xs uppercase tracking-wide text-ink/50">
                      <tr>
                        <th className="px-5 py-3 font-semibold">Ad Soyad</th>
                        <th className="px-5 py-3 font-semibold">Telefon</th>
                        <th className="px-5 py-3 font-semibold">E-posta</th>
                        <th className="px-5 py-3 font-semibold">Adres / İlçe</th>
                        <th className="px-5 py-3 font-semibold">Kayıt Tarihi</th>
                        <th className="px-5 py-3 font-semibold text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/5">
                      {filtered.map((customer) => (
                        <tr key={customer.id} className="transition-colors hover:bg-ink/[0.015]">
                          <td className="px-5 py-3.5 font-medium text-ink">
                            {customer.full_name}
                          </td>
                          <td className="px-5 py-3.5 text-ink/70">
                            {customer.phone ?? "—"}
                          </td>
                          <td className="px-5 py-3.5 text-ink/70">
                            {customer.email ?? "—"}
                          </td>
                          <td className="px-5 py-3.5 text-ink/70">
                            {[customer.address, customer.district]
                              .filter(Boolean)
                              .join(", ") || "—"}
                          </td>
                          <td className="px-5 py-3.5 text-ink/50">
                            {new Date(customer.created_at).toLocaleDateString("tr-TR")}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => openEditModal(customer)}
                                aria-label="Düzenle"
                                className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-primary-green/10 hover:text-primary-green"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteTarget(customer)}
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
          </>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Müşteriyi Düzenle" : "Yeni Müşteri Ekle"}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Ad Soyad *"
            value={form.full_name}
            onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
          />
          <input
            type="tel"
            placeholder="Telefon"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
          />
          <input
            type="email"
            placeholder="E-posta"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
          />
          <input
            type="text"
            placeholder="İlçe"
            value={form.district}
            onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))}
            className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
          />
          <textarea
            rows={3}
            placeholder="Adres"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
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

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Müşteriyi Sil"
        description={`"${deleteTarget?.full_name ?? ""}" adlı müşteriyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
      />
    </main>
  );
}
