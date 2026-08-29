// TODO: Gerçek saha/ekip fotoğrafı ile değiştirilecek

/**
 * Hizmet detay görselleri.
 * Yerel görseller public/images/ altında; henüz gerçek fotoğrafı
 * olmayan hizmetler için Unsplash placeholder kullanılır. Gerçek
 * fotoğraf eklendiğinde ilgili sabiti "/images/..." yoluyla güncelleyin.
 */

export const ILACLAMA_DEZENFEKSIYON_IMAGE = "/images/dezenfeksiyon-ofis-ic-mekan.png";

export const FUMIGASYON_IMAGE =
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80";

export const PEYZAJ_BAHCE_IMAGE = "/images/peyzaj-agac-ilaclama.png";

export const DANISMANLIK_IMAGE = "/images/danismanlik-ofis-gorusme.png";

export const SERVICE_IMAGES: Record<string, string> = {
  "ilaclama-ve-dezenfeksiyon": ILACLAMA_DEZENFEKSIYON_IMAGE,
  fumigasyon: FUMIGASYON_IMAGE,
  "peyzaj-ve-bahce": PEYZAJ_BAHCE_IMAGE,
  danismanlik: DANISMANLIK_IMAGE,
};
