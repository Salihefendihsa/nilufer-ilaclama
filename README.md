This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Veritabanı Şeması (Supabase)

Şema tanımı: `supabase/migrations/001_init.sql`
Bu dosyayla birebir eşleşen TypeScript tipleri: `src/lib/supabase/database.types.ts`

CLI bağlıysa tipleri şemadan yeniden üretmek için:

```bash
npm run db:types
```

CLI henüz bağlı değilse `database.types.ts` elle güncellenmeli ve migration'daki
tablo/kolon isimleriyle birebir tutarlı kalmalıdır.

### Tablolar

| Tablo | Amaç |
| --- | --- |
| `profiles` | `auth.users` ile 1:1, uygulama rolünü taşır (`owner` \| `staff` \| `customer`) |
| `customers` | Müşteri CRM kaydı (adres, ilçe, iletişim) |
| `staff` | Personel kaydı, bir `profiles` satırına bağlı |
| `jobs` | Planlanan/tamamlanan ilaçlama işi, müşteri ve atanan personele bağlı |
| `job_reports` | İş için doldurulan EK-1 uygulama raporu (kullanılan ürün, doz, imza/PDF) |
| `contracts` | Müşteriye bağlı hizmet sözleşmesi |
| `payments` | Müşteriye bağlı ödeme/tahsilat kaydı |
| `quote_requests` | Herkese açık "Ücretsiz Keşif" form kayıtları |

### Rol bazlı erişim (RLS) özeti

- **owner**: tüm tablolarda tam okuma/yazma yetkisi
- **staff**: yalnızca kendisine atanmış `jobs` ve `job_reports` kayıtlarını okur/yazar, kendi `staff` kaydını okur
- **customer**: yalnızca kendi `customer_id`'sine bağlı `jobs`, `contracts`, `payments` kayıtlarını okur; kendi `profiles` ve `customers` satırını okur/günceller
- **quote_requests**: herkes (giriş yapmamış ziyaretçiler dahil) `INSERT` edebilir, yalnızca `owner` okur/yönetir

Rol kontrolleri `current_user_role()`, `current_staff_id()` ve `current_customer_id()`
adlı `SECURITY DEFINER` yardımcı fonksiyonları üzerinden yapılır (RLS içinde
`profiles`/`staff`/`customers` tablolarına özyinelemeli sorgu sorunu yaşanmaması için).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
