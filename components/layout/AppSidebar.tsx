"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Bell,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

const navItems = [
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
    label: "Progress",
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

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const supabase = createClient();

  const { user } = useAuth();

  const firstName =
    user?.fullName?.split(" ")[0] || "Wellness";

  const fullName =
    user?.fullName || "Wellness Client";

  const email =
    user?.email || "client@Capacity Lab OS.com";

  const initials =
    fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "WL";

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  }

  return (
    <motion.aside
      animate={{
        width: collapsed ? 78 : 265,
      }}
      transition={{
        duration: 0.24,
        ease: [0.22, 1, 0.36, 1] as const
      }}
      className="hidden lg:flex flex-col h-screen sticky top-0 overflow-hidden flex-shrink-0 border-r border-[#E9DED2] bg-[#FBF8F5]"
    >
      {/* HEADER */}
      <div
        className={cn(
          "relative flex items-center h-[74px] px-5 border-b border-[#EEE4DA]",
          collapsed
            ? "justify-center"
            : "justify-between"
        )}
      >
        {!collapsed ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#7A553D] to-[#5B3F31] flex items-center justify-center shadow-[0_6px_20px_rgba(91,63,43,0.22)]">
              <Leaf className="w-4 h-4 text-white" />
            </div>

            <span className="font-serif text-[1.45rem] text-[#4B3326]">
              Capacity Lab OS
            </span>
          </Link>
        ) : (
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#7A553D] to-[#5B3F31] flex items-center justify-center shadow-[0_6px_20px_rgba(91,63,43,0.22)]">
            <Leaf className="w-4 h-4 text-white" />
          </div>
        )}

        {/* TOGGLE */}
        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className={cn(
            "w-7 h-7 rounded-full bg-[#F2EAE3] hover:bg-[#E8DDD3] flex items-center justify-center transition-all duration-200",
            collapsed &&
              "absolute right-0 translate-x-1/2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-[#6B4A36]" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-[#6B4A36]" />
          )}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">

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
                "group relative flex items-center gap-3 rounded-2xl transition-all duration-300",
                collapsed
                  ? "justify-center h-14"
                  : "px-4 py-3",
                isActive
                  ? "bg-gradient-to-r from-[#7A553D] to-[#5B3F31] text-white shadow-[0_10px_25px_rgba(91,63,43,0.18)]"
                  : "text-[#7B6859] hover:bg-[#F3ECE5] hover:text-[#4B3326]"
              )}
            >

              {/* ACTIVE GLOW */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-2xl"
                  transition={{
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.5,
                  }}
                />
              )}

              <item.icon
                className={cn(
                  "relative z-10 flex-shrink-0",
                  collapsed
                    ? "w-5 h-5"
                    : "w-[18px] h-[18px]"
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

      {/* FOOTER */}
      <div className="px-3 py-4 border-t border-[#EEE4DA]">

        <button
          onClick={handleLogout}
          title={
            collapsed
              ? "Sign Out"
              : undefined
          }
          className={cn(
            "w-full flex items-center gap-3 rounded-2xl transition-all duration-300",
            collapsed
              ? "justify-center h-14"
              : "px-4 py-3",
            "text-[#8B7665] hover:bg-[#F3ECE5] hover:text-[#4B3326]"
          )}
        >
          <LogOut
            className={cn(
              collapsed
                ? "w-5 h-5"
                : "w-[18px] h-[18px]"
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