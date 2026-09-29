import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular | Nilüfer İlaçlama",
  description:
    "İlaçlama süreci, güvenlik, fiyatlandırma ve takip hakkında en çok merak edilen soruların yanıtlarını Nilüfer İlaçlama SSS sayfasında bulun.",
  alternates: { canonical: "/sss" },
};

export default function SssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
