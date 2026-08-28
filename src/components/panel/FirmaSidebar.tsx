"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ClipboardList,
  LayoutDashboard,
  Users,
  Wrench,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import LogoutButton from "@/components/panel/LogoutButton";
import { COMPANY } from "@/lib/data/company";

const NAV_ITEMS = [
  { href: "/panel/firma", label: "Dashboard", icon: LayoutDashboard },
  { href: "/panel/firma/musteriler", label: "Müşteriler", icon: Users },
  {
    href: "/panel/firma/teklif-talepleri",
    label: "Teklif Talepleri",
    icon: ClipboardList,
    badgeKey: "newQuotes" as const,
  },
  { href: "/panel/firma/personel", label: "Personel", icon: Briefcase },
  { href: "/panel/firma/isler", label: "İşler", icon: Wrench },
];

export default function FirmaSidebar() {
  const pathname = usePathname();
  const [newQuotes, setNewQuotes] = useState(0);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const supabase = createClient();
    supabase
      .from("quote_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "new")
      .then(({ count }) => setNewQuotes(count ?? 0));
  }, []);

  return (
    <aside className="flex h-full w-full flex-col border-r border-ink/10 bg-white lg:w-64">
      <div className="border-b border-ink/10 px-5 py-5">
        <p className="text-sm font-bold text-ink">{COMPANY.name}</p>
        <p className="text-xs text-ink/50">Firma Paneli</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/panel/firma"
              ? pathname === "/panel/firma"
              : pathname?.startsWith(item.href);
          const badge = item.badgeKey === "newQuotes" ? newQuotes : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-green/10 text-primary-green"
                  : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={17} strokeWidth={1.8} />
                {item.label}
              </span>
              {badge > 0 && (
                <span className="rounded-full bg-primary-red px-2 py-0.5 text-[11px] font-bold text-white">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ink/10 p-3">
        <LogoutButton />
      </div>
    </aside>
  );
}
