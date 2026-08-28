"use client";

import { useEffect, useState } from "react";
import { ClipboardList, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/database.types";
import SupabaseNotice from "@/components/panel/SupabaseNotice";
import Modal from "@/components/panel/Modal";

type QuoteRequest = Database["public"]["Tables"]["quote_requests"]["Row"];

const STATUS_OPTIONS = [
  { value: "new", label: "Yeni" },
  { value: "contacted", label: "İletişime Geçildi" },
  { value: "converted", label: "Müşteriye Dönüştü" },
  { value: "closed", label: "Kapatıldı" },
];

const STATUS_STYLES: Record<string, string> = {
  new: "bg-amber-100 text-amber-700",
  contacted: "bg-blue-100 text-blue-700",
  converted: "bg-primary-green/10 text-primary-green",
  closed: "bg-ink/10 text-ink/60",
};

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
  const style = STATUS_STYLES[status] ?? "bg-ink/10 text-ink/60";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${style}`}>
      {label}
    </span>
  );
}

export default function TeklifTalepleriPage() {
  const configured = isSupabaseConfigured();

  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<QuoteRequest | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchRequests = async () => {
    if (!configured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setRequests(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Talepler alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("quote_requests")
        .update({ status })
        .eq("id", id);
      if (updateError) throw updateError;
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      setDetail((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Durum güncellenemedi.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleConvert = async (request: QuoteRequest) => {
    setConverting(true);
    setActionMessage(null);
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase.from("customers").insert({
        full_name: request.full_name,
        phone: request.phone,
        email: request.email,
        address: request.address,
        district: request.district,
      });
      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from("quote_requests")
        .update({ status: "converted" })
        .eq("id", request.id);
      if (updateError) throw updateError;

      setRequests((prev) =>
        prev.map((r) => (r.id === request.id ? { ...r, status: "converted" } : r))
      );
      setDetail(null);
      setActionMessage(`${request.full_name} müşteri listesine eklendi.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Müşteriye dönüştürülemedi.");
    } finally {
      setConverting(false);
    }
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-extrabold text-ink">Teklif Talepleri</h1>
        <p className="mt-1 text-sm text-ink/60">
          Web sitesi üzerinden gelen ücretsiz keşif taleplerini yönetin.
        </p>

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

        {actionMessage && (
          <div className="mt-6 rounded-xl border border-primary-green/30 bg-primary-green/5 p-4 text-sm text-primary-green">
            {actionMessage}
          </div>
        )}

        {configured && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
            {loading ? (
              <p className="p-8 text-center text-sm text-ink/50">Yükleniyor...</p>
            ) : requests.length === 0 ? (
              <div className="flex flex-col items-center gap-3 p-12 text-center">
                <ClipboardList size={28} className="text-ink/30" />
                <p className="text-sm font-semibold text-ink">Henüz teklif talebi yok</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-ink/[0.02] text-xs uppercase tracking-wide text-ink/50">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Ad Soyad</th>
                      <th className="px-5 py-3 font-semibold">Telefon</th>
                      <th className="px-5 py-3 font-semibold">Hizmet</th>
                      <th className="px-5 py-3 font-semibold">Mülk Tipi</th>
                      <th className="px-5 py-3 font-semibold">Durum</th>
                      <th className="px-5 py-3 font-semibold">Tarih</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {requests.map((request) => (
                      <tr
                        key={request.id}
                        onClick={() => setDetail(request)}
                        className="cursor-pointer transition-colors hover:bg-ink/[0.015]"
                      >
                        <td className="px-5 py-3.5 font-medium text-ink">
                          {request.full_name}
                        </td>
                        <td className="px-5 py-3.5 text-ink/70">{request.phone}</td>
                        <td className="px-5 py-3.5 text-ink/70">
                          {request.service_type ?? "—"}
                        </td>
                        <td className="px-5 py-3.5 text-ink/70">
                          {request.property_type ?? "—"}
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={request.status} />
                        </td>
                        <td className="px-5 py-3.5 text-ink/50">
                          {new Date(request.created_at).toLocaleDateString("tr-TR")}
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
        open={detail !== null}
        onClose={() => setDetail(null)}
        title={detail?.full_name ?? "Talep Detayı"}
      >
        {detail && (
          <div className="space-y-4">
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Telefon</dt>
                <dd className="font-medium text-ink">{detail.phone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">E-posta</dt>
                <dd className="font-medium text-ink">{detail.email ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Hizmet Türü</dt>
                <dd className="font-medium text-ink">{detail.service_type ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Mülk Tipi</dt>
                <dd className="font-medium text-ink">{detail.property_type ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">İlçe</dt>
                <dd className="font-medium text-ink">{detail.district ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/50">Adres</dt>
                <dd className="max-w-[60%] text-right font-medium text-ink">
                  {detail.address ?? "—"}
                </dd>
              </div>
            </dl>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Durum
              </label>
              <select
                value={detail.status}
                disabled={updatingId === detail.id}
                onChange={(e) => handleStatusChange(detail.id, e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-green"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {detail.status !== "converted" && (
              <button
                type="button"
                onClick={() => handleConvert(detail)}
                disabled={converting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-green px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <UserPlus size={16} />
                {converting ? "Dönüştürülüyor..." : "Müşteriye Dönüştür"}
              </button>
            )}
          </div>
        )}
      </Modal>
    </main>
  );
}
