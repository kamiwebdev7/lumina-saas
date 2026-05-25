"use client";

import { useState } from "react";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { motion } from "framer-motion";

import {
  LayoutDashboard,
  ClipboardList,
  TrendingUp,
  Calendar,
  Settings,
  Leaf,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Home,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { useAuth } from "@/context/AuthContext";

import { createClient } from "@/lib/supabase/client";

/* -------------------------------------------------------------------------- */
/*                               NAVIGATION                                   */
/* -------------------------------------------------------------------------- */

const navItems = [
  {
    label: "Sanctuary",
    href: "/",
    icon: Home,
  },

  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Protocols",
    href: "/protocols",
    icon: ClipboardList,
  },

  {
    label: "Journey",
    href: "/progress",
    icon: TrendingUp,
  },

  {
    label: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },

  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function AppSidebar() {
  const [collapsed, setCollapsed] =
    useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const supabase = createClient();

  const { user, loading } =
    useAuth();

  const fullName =
    user?.fullName ||
    "Capacity Member";

  const initials =
    fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CM";

  /* ---------------------------------------------------------------------- */
  /*                               LOGOUT                                   */
  /* ---------------------------------------------------------------------- */

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/");

    router.refresh();
  }

  /* ---------------------------------------------------------------------- */
  /*                                UI                                      */
  /* ---------------------------------------------------------------------- */

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
        width: collapsed
          ? 82
          : 280,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative hidden h-screen flex-shrink-0 flex-col overflow-hidden border-r border-[#E9DED2]/70 bg-[rgba(251,248,245,0.82)] backdrop-blur-2xl lg:flex"
    >
      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[240px] w-[240px] rounded-full bg-[#EADFD4]/40 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[220px] w-[220px] rounded-full bg-[#F3EAE2]/40 blur-3xl" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div
        className={cn(
          "relative flex h-[78px] items-center border-b border-[#EEE4DA]/70 px-5",
          collapsed
            ? "justify-center"
            : "justify-between",
        )}
      >
        {!collapsed ? (
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7A553D] via-[#6B4A36] to-[#53392B] shadow-[0_12px_32px_rgba(91,63,43,0.22)] transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
              <Leaf className="h-4 w-4 text-white" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-serif text-[1.25rem] text-[#4B3326]">
                Capacity Lab
              </span>

              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#A08978]">
                Wellness OS
              </span>
            </div>
          </Link>
        ) : (
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7A553D] via-[#6B4A36] to-[#53392B] shadow-[0_12px_32px_rgba(91,63,43,0.22)]"
          >
            <Leaf className="h-4 w-4 text-white" />
          </Link>
        )}

        {/* TOGGLE */}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full bg-[#F3ECE5] shadow-sm transition-all duration-300 hover:bg-[#E8DDD3]",
            collapsed &&
              "absolute right-0 translate-x-1/2",
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5 text-[#6B4A36]" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5 text-[#6B4A36]" />
          )}
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MEMBER CARD                                                        */}
      {/* ------------------------------------------------------------------ */}

      {!collapsed &&
        (loading ? (
          <div className="px-4 pt-5">
            <div className="rounded-[1.7rem] border border-[#EADFD4] bg-white/80 p-4 shadow-[0_18px_50px_rgba(91,63,43,0.06)]">
              <div className="flex items-center gap-3">
                <div className="shimmer h-11 w-11 rounded-2xl" />

                <div className="flex-1">
                  <div className="shimmer mb-2 h-4 w-28 rounded" />

                  <div className="shimmer h-3 w-20 rounded" />
                </div>
              </div>

              <div className="shimmer mt-4 h-16 rounded-2xl" />
            </div>
          </div>
        ) : (
          <div className="px-4 pt-5">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#EADFD4]/80 bg-white/80 p-4 shadow-[0_18px_50px_rgba(91,63,43,0.08)] backdrop-blur-xl">
              {/* Glow */}

              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#F6EEE7] opacity-70 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7A553D] via-[#6B4A36] to-[#53392B] text-sm font-semibold text-white shadow-md">
                  {initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#4B3326]">
                    {fullName}
                  </p>

                  <p className="truncate text-xs text-[#9A8475]">
                    Founding Wellness Member
                  </p>
                </div>
              </div>

              {/* Wellness Progress */}

              <div className="relative mt-4 rounded-2xl border border-[#EEE4DA]/60 bg-[#F8F3EE]/90 px-3 py-3">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#B08B6A]" />

                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A8475]">
                    Wellness Rhythm
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B4A36]">
                    Weekly consistency
                  </span>

                  <span className="text-xs font-medium text-[#6B4A36]">
                    72%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E6DBD0]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: "72%",
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-[#7A553D] to-[#B08B6A]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* ------------------------------------------------------------------ */}
      {/* NAVIGATION                                                         */}
      {/* ------------------------------------------------------------------ */}

      <nav className="relative flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={
                collapsed
                  ? item.label
                  : undefined
              }
              className={cn(
                "group relative flex items-center gap-3 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                collapsed
                  ? "h-14 justify-center"
                  : "px-4 py-3",
                isActive
                  ? "bg-gradient-to-br from-[#7A553D] via-[#6B4A36] to-[#53392B] text-white shadow-[0_14px_35px_rgba(91,63,43,0.22)]"
                  : "text-[#7B6859] hover:bg-[#F3ECE5]/80 hover:text-[#4B3326]",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-2xl"
                  transition={{
                    type: "spring",
                    bounce: 0.14,
                    duration: 0.5,
                  }}
                />
              )}

              <item.icon
                className={cn(
                  "relative z-10 flex-shrink-0 transition-all duration-500",
                  collapsed
                    ? "h-5 w-5"
                    : "h-[18px] w-[18px]",
                )}
              />

              {!collapsed && (
                <span className="relative z-10 text-sm font-medium">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative border-t border-[#EEE4DA]/70 px-3 py-4">
        <button
          onClick={handleLogout}
          title={
            collapsed
              ? "Sign Out"
              : undefined
          }
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl text-[#8B7665] transition-all duration-300 hover:bg-[#F7F2ED] hover:text-[#4B3326]",
            collapsed
              ? "h-14 justify-center"
              : "px-4 py-3",
          )}
        >
          <LogOut
            className={cn(
              collapsed
                ? "h-5 w-5"
                : "h-[18px] w-[18px]",
            )}
          />

          {!collapsed && (
            <span className="text-sm font-medium">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}