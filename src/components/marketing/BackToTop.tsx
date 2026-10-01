"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const marker = document.getElementById("page-top-marker");
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Sayfanın başına dön"
      onClick={() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
      }}
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ink text-white shadow-md transition-colors hover:bg-primary-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green lg:bottom-24 lg:right-7"
    >
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  );
}
