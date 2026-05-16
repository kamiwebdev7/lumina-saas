"use client";

// components/layout/MobileTopbar.tsx
// Single topbar — renders once. Uses AuthContext for real user data.
// Shows on all screen sizes here; AppSidebar handles the desktop header separately.

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { UserMenu } from "@/components/ui/UserMenu";
import { Bell, Search } from "lucide-react";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function MobileTopbar() {
  const { user, loading } = useAuth();
  const firstName = user?.fullName.split(" ")[0] ?? "";

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-[#EDE5DC] bg-white/80 px-4 py-3 backdrop-blur-xl lg:px-6">

      {/* ── Left: Logo (mobile) / Greeting (desktop) ── */}
      <div className="flex items-center gap-3">
        {/* Logo — visible on mobile only */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#7A553D] to-[#4B3326] shadow-sm">
            <span className="font-serif text-sm text-white">L</span>
          </div>
          <span className="font-serif text-base text-[#4B3326]">Lumina</span>
        </Link>

        {/* Greeting — visible on desktop only */}
        <div className="hidden lg:block">
          {loading ? (
            <div className="h-5 w-48 animate-pulse rounded-lg bg-[#EDE5DC]" />
          ) : (
            <>
              <p className="text-sm font-semibold text-[#4B3326]">
                {getGreeting()}{firstName ? `, ${firstName}` : ""}
              </p>
              <p className="text-xs text-[#9A8475]">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Right: Actions + User Menu ── */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#E8DED5] bg-white/70 text-[#9A8475] transition hover:border-[#C9B09A] hover:text-[#6B4A36]"
          aria-label="Search"
        >
          <Search size={15} />
        </button>

        {/* Notifications */}
        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-[#E8DED5] bg-white/70 text-[#9A8475] transition hover:border-[#C9B09A] hover:text-[#6B4A36]"
          aria-label="Notifications"
        >
          <Bell size={15} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#7A553D]" />
        </button>

        {/* Avatar dropdown — real user name + initials + logout */}
        <UserMenu align="right" />
      </div>
    </header>
  );
}