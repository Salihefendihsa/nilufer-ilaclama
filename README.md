# Nilüfer İlaçlama

## Dockersız geliştirme

Node.js ve npm kurulu olmalıdır. Uygulama için Docker veya yerel Supabase gerekmez.

```bash
npm ci
```

Proje kökündeki git tarafından izlenmeyen `.env.local` dosyasına **yalnızca geliştirme/test** Supabase projesinin Project URL ve publishable/anon anahtarını ekleyin:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<gelistirme-projesi>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<gelistirme-projesinin-publishable-veya-anon-anahtari>
```

Bu iki değer Supabase proje panelindeki API ayarlarından alınır. `service_role`/secret anahtarını `NEXT_PUBLIC_` değişkenine koymayın: bu değişkenler tarayıcıya gönderilir. `.env.local` dosyasını Git'e eklemeyin. Değerleri değiştirdikten sonra geliştirme sunucusunu yeniden başlatın.

```bash
npm run dev
```

Siteyi [http://localhost:3000](http://localhost:3000) adresinde açın. Supabase değerleri boşsa genel site açılır; `/teklif` gönderimi başarı göstermeden telefon/WhatsApp yönlendirmesi içeren hata verir. Uzak projeye bağlanmak için `127.0.0.1:54321` kullanmayın: bu adres yalnızca Docker ile çalışan yerel Supabase API'sine aittir.

Uzak veritabanına migration uygulamadan önce hedef proje adını/ref'ini ve URL'sini panelde kontrol ederek bunun üretim değil geliştirme/test projesi olduğunu doğrulayın. `supabase/.temp/linked-project.json` dosyasında bağlı proje bulunması tek başına bu doğrulama için yeterli değildir. `supabase/migrations/001_init.sql` uygulandığında `pgcrypto` uzantısı; profil, müşteri, personel, iş, iş raporu, sözleşme, ödeme ve teklif talebi tabloları; indeksler, rol yardımcı fonksiyonları ve RLS politikaları oluşturulur. Hedefte mevcut şemayı ve olası çakışmaları incelemeden migration çalıştırmayın. Anonim `/teklif` gönderimi için `quote_requests` tablosu ile `public_insert_quote_requests` politikası gerekir.

## Veritabanı Şeması (Supabase)

Şema tanımı: `supabase/migrations/001_init.sql`
Bu dosyayla birebir eşleşen TypeScript tipleri: `src/lib/supabase/database.types.ts`

`npm run db:types` betiği `--local` kullandığından Dockersız akışta çalıştırılmaz.
Şema değişirse hedefi doğrulanmış geliştirme/test projesinden tipleri yeniden üretin
veya `database.types.ts` dosyasını migration ile tutarlı biçimde güncelleyin.

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
