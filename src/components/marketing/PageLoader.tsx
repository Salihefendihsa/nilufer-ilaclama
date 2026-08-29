"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const MESSAGES = [
  "Bursa'nın güvenilir ilaçlama firması hazırlanıyor...",
  "Ruhsatlı ekip, onaylı ürünler...",
  "Memnuniyet odaklı kalıcı çözümler...",
  "Neredeyse hazır...",
];

const LOAD_DURATION_MS = 2300;
const MESSAGE_INTERVAL_MS = 600;
const FADE_OUT_MS = 500;
const STORAGE_KEY = "hasSeenLoader";

export default function PageLoader() {
  const [show, setShow] = useState(false);
  const [percent, setPercent] = useState(0);
  const [fading, setFading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const startRef = useRef<number | null>(null);

  // İlk ziyaret kontrolü — sessionStorage'a sadece client tarafında
  // erişilebildiği için server render'la eşleşmesi için başlangıç
  // durumu her zaman "gizli" tutulur, burada gerekirse açılır.
  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    let frameId: number;

    const tick = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const next = Math.min(100, Math.floor((elapsed / LOAD_DURATION_MS) * 100));
      setPercent(next);

      if (next < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(STORAGE_KEY, "true");
        setFading(true);
        window.setTimeout(() => setShow(false), FADE_OUT_MS);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [show]);

  useEffect(() => {
    if (!show || fading) return;
    const interval = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [show, fading]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-primary-red via-ink to-primary-green px-4 transition-opacity ease-in-out"
      style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE_OUT_MS}ms` }}
      aria-hidden={fading}
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
        <Image
          src="/logo.png"
          alt="Nilüfer İlaçlama"
          width={72}
          height={72}
          priority
          className="h-auto w-full"
        />
      </div>

      <p className="text-6xl font-black tabular-nums text-white">{percent}%</p>

      <div className="flex h-10 w-full max-w-sm items-start justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-white/80"
          >
            {MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-primary-green transition-[width] duration-150 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
