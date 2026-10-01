"use client";

import { useEffect, useState } from "react";
import { HOME_SECTIONS } from "@/lib/data/homeSections";

const DARK_SECTIONS = new Set(["giris", "hizmet-bolgeleri", "bakim-paketleri"]);

export default function HomeSectionNav() {
  const [activeId, setActiveId] = useState<string>(HOME_SECTIONS[0].id);

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
    return () => observer.disconnect();
  }, []);

  const onDark = DARK_SECTIONS.has(activeId);

  return (
    <nav
      aria-label="Ana sayfa bölümleri"
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-1">
        {HOME_SECTIONS.map(({ id, label }) => (
          <li key={id} className="group relative flex h-9 items-center">
            <a
              href={`#${id}`}
              aria-label={label}
              aria-current={activeId === id ? "location" : undefined}
              className="flex h-9 w-12 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-green"
            >
              <span
                aria-hidden="true"
                className={`block h-[3px] rounded-full transition-[width,background-color] duration-200 ${
                  activeId === id
                    ? "w-11 bg-primary-green"
                    : `w-7 ${onDark ? "bg-white/70" : "bg-ink/50"}`
                }`}
              />
              <span className="pointer-events-none absolute bottom-full left-0 mb-0.5 w-max max-w-24 rounded bg-ink px-2 py-1 text-xs font-semibold text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
