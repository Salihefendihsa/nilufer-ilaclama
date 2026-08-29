import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ücretsiz Keşif Talep Et | Nilüfer İlaçlama",
  description:
    "Bursa'da ev, işyeri veya fabrikanız için ücretsiz keşif ve teklif talep edin. Formu doldurun, ekibimiz en kısa sürede size ulaşsın.",
  alternates: { canonical: "/teklif" },
};

export default function TeklifLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
