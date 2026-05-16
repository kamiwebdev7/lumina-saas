"use client";

// components/layout/DashboardTopbar.tsx
// Desktop topbar. Gets user data from AuthContext — no props needed.
// Shown on md+ screens inside the dashboard layout.

import { useAuth } from "@/context/AuthContext";
import { UserMenu } from "@/components/ui/UserMenu";
import { Bell, Search } from "lucide-react";
import { useState } from "react";

interface DashboardTopbarProps {
  /** Optional page title override. Defaults to time-based greeting. */
  title?: string;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardTopbar({ title }: DashboardTopbarProps) {
  const { user, loading } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const firstName = user?.fullName.split(" ")[0] ?? "";
  const greeting = title ?? `${getGreeting()}, ${firstName}`;

  return (
    <header className="sticky top-0 z-40 hidden md:flex items-center justify-between gap-4 border-b border-[#EDE5DC] bg-white/80 px-6 py-3.5 backdrop-blur-xl">
      {/* ── Left: Greeting ── */}
      <div className="min-w-0">
        {loading ? (
          <div className="h-5 w-48 animate-pulse rounded-lg bg-[#EDE5DC]" />
        ) : (
          <h1 className="truncate text-base font-semibold text-[#4B3326]">
            {greeting}
          </h1>
        )}
        <p className="text-xs text-[#9A8475]">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex shrink-0 items-center gap-2">
        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8DED5] bg-white/70 text-[#9A8475] transition hover:border-[#C9B09A] hover:text-[#6B4A36]"
          aria-label="Search"
        >
          <Search size={16} />
        </button>

        {/* Notification bell */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8DED5] bg-white/70 text-[#9A8475] transition hover:border-[#C9B09A] hover:text-[#6B4A36]"
          aria-label="Notifications"
        >
          <Bell size={16} />
          {/* Unread dot */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#7A553D]" />
        </button>

        {/* User dropdown */}
        <UserMenu align="right" />
      </div>
    </header>
  );
}