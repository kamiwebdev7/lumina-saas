"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  TrendingUp,
  Calendar,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
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
    label: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
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

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-50">
      <div className="relative overflow-visible rounded-[2rem] border border-white/50 bg-white/85 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        {/* subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F3EE]/60 to-white/40 pointer-events-none" />

        <div className="relative flex items-end justify-between px-2 pt-2 pb-1.5">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center transition-all duration-300",
                )}
              >
                {/* ACTIVE BUTTON */}
                <div
                  className={cn(
                    "relative flex items-center justify-center transition-all duration-300",
                    item.label === "Home"
                      ? "w-[60px] h-[60px] rounded-[1.4rem] bg-gradient-to-br from-[#7A553D] via-[#6B4A36] to-[#53392B] text-white shadow-[0_16px_34px_rgba(111,78,55,0.34)] -translate-y-6 ring-4 ring-[#F8F3EE]"
                      : isActive
                        ? "w-11 h-11 rounded-2xl bg-[#F6EFE8] text-[#6B4A36]"
                        : "w-11 h-11 rounded-2xl text-sand-500 hover:bg-[#F8F3EE]/70",
                  )}
                >
                  {/* active glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-white/10 ring-4 ring-[#F8F3EE]" />
                  )}

                  <item.icon
                    className={cn(
                      "relative z-10 transition-all duration-300",
                      isActive ? "w-[22px] h-[22px]" : "w-[19px] h-[19px]",
                    )}
                  />
                </div>

                {/* LABEL */}
                <span
                  className={cn(
                    "text-[11px] font-medium tracking-wide transition-all duration-300 mt-1",
                    cn(
                      isActive ? "text-[#6B4A36]" : "text-sand-500",
                      item.label === "Home" && "-mt-3",
                    ),
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
