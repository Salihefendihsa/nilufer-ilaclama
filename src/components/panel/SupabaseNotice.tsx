export default function SupabaseNotice({ message }: { message?: string }) {
  return (
    <div className="rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red">
      {message ??
        "Supabase bağlantısı gerekli. Ortam değişkenlerini (.env.local) tanımlayın."}
    </div>
  );
}
