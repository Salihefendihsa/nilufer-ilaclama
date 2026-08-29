import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Nilüfer İlaçlama",
  description:
    "Bursa Nilüfer'deki ofisimizden telefon, e-posta veya iletişim formuyla bize ulaşın; sorularınızı en kısa sürede yanıtlayalım.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
