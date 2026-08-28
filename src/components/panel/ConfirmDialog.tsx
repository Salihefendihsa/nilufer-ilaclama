"use client";

import Modal from "@/components/panel/Modal";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
};

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Sil",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-ink/60">{description}</p>
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
        >
          Vazgeç
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="rounded-full bg-primary-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-red/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "İşleniyor..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
