import FirmaSidebar from "@/components/panel/FirmaSidebar";

export default function FirmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink/[0.02] lg:flex">
      <FirmaSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
