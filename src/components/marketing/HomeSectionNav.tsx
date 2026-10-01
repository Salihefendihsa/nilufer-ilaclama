"use client";

import { useEffect, useState } from "react";
import { HOME_SECTIONS } from "@/lib/data/homeSections";

const DARK_SECTIONS = new Set(["giris", "hizmet-bolgeleri", "bakim-paketleri"]);

export default function HomeSectionNav() {
  const [activeId, setActiveId] = useState<string>(HOME_SECTIONS[0].id);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveId(current.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    HOME_SECTIONS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    const footer = document.querySelector("footer");
    const footerObserver = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "-40% 0px -40% 0px" },
    );
    if (footer) footerObserver.observe(footer);

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  const onDark = footerVisible || DARK_SECTIONS.has(activeId);

  return (
    <nav
      aria-label="Ana sayfa bölümleri"
      className="fixed right-1 top-1/2 z-40 hidden -translate-y-1/2 xl:block [@media(max-height:600px)]:hidden"
    >
      <ul className="flex flex-col">
        {HOME_SECTIONS.map(({ id, label }) => (
          <li key={id} className="group relative flex h-7 items-center">
            <a
              href={`#${id}`}
              aria-label={label}
              aria-current={activeId === id ? "location" : undefined}
              className="flex h-7 w-12 items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green"
            >
              <span
                aria-hidden="true"
                className={`block h-px rounded-full group-hover:w-6 group-hover:bg-primary-green group-focus-within:w-6 group-focus-within:bg-primary-green ${
                  activeId === id
                    ? "w-6 bg-primary-green"
                    : `w-4 ${activeId === "giris" ? "bg-white/65" : onDark ? "bg-white/50" : "bg-ink/40"}`
                }`}
              />
              <span className="pointer-events-none absolute right-full top-1/2 mr-1.5 w-max max-w-28 -translate-y-1/2 rounded bg-ink px-2 py-1 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
