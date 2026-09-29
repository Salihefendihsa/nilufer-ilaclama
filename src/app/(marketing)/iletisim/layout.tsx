import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Nilüfer İlaçlama",
  description:
    "Bursa Nilüfer'deki ofisimizden telefon, WhatsApp veya e-posta ile bize ulaşın ya da online keşif talebi oluşturun.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
