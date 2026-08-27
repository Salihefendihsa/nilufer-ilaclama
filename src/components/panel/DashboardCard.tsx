export default function DashboardCard({
  title,
  isEmpty,
  emptyText,
  children,
}: {
  title: string;
  isEmpty: boolean;
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/50">
        {title}
      </h2>
      {isEmpty ? (
        <p className="mt-4 text-sm text-ink/40">{emptyText}</p>
      ) : (
        <ul className="mt-3 divide-y divide-ink/5">{children}</ul>
      )}
    </div>
  );
}
