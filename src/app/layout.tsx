import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { COMPANY, SITE_URL } from "@/lib/data/company";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Nilüfer İlaçlama | Bursa'da Profesyonel İlaçlama ve Dezenfeksiyon Hizmetleri",
  description:
    "Bursa genelinde konut, işyeri ve endüstriyel tesisler için güvenli ilaçlama, dezenfeksiyon ve fümigasyon hizmetleri.",
  openGraph: {
    siteName: COMPANY.name,
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
