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
    label: "Journey",
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
    <nav className="fixed inset-x-0 bottom-4 z-50 px-3 lg:hidden">
      <div className="mx-auto max-w-md">
        <div className="relative overflow-visible rounded-[2.2rem] border border-white/60 bg-white/80 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
          
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-gradient-to-t from-[#F5EDE6]/70 via-white/40 to-white/20" />

          {/* top shine */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-white/70" />

          <div className="relative flex items-end justify-between px-2 pt-2 pb-2">
            {items.map((item) => {
              const isActive = pathname === item.href;
              const isHome = item.label === "Home";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative flex min-w-[58px] flex-col items-center justify-center"
                >
                  {/* ACTIVE INDICATOR */}
                  {isActive && !isHome && (
                    <div className="absolute -top-1 h-1 w-6 rounded-full bg-[#7A553D]/70 blur-[0.5px]" />
                  )}

                  {/* BUTTON */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center transition-all duration-500 ease-out",

                      isHome
                        ? cn(
                            "h-[64px] w-[64px] -translate-y-6 rounded-[1.6rem]",
                            "bg-gradient-to-br from-[#7A553D] via-[#6B4A36] to-[#4B3326]",
                            "text-white shadow-[0_20px_40px_rgba(111,78,55,0.38)]",
                            "ring-[6px] ring-[#F8F3EE]",
                            "group-active:scale-95",
                          )
                        : isActive
                          ? cn(
                              "h-11 w-11 rounded-2xl",
                              "bg-[#F7EFE8]",
                              "text-[#6B4A36]",
                              "shadow-[0_8px_24px_rgba(111,78,55,0.10)]",
                            )
                          : cn(
                              "h-11 w-11 rounded-2xl",
                              "text-[#A38D7D]",
                              "hover:bg-[#F8F3EE]/80",
                              "hover:text-[#6B4A36]",
                            ),
                    )}
                  >
                    {/* glow */}
                    {isActive && (
                      <div
                        className={cn(
                          "absolute inset-0 rounded-2xl",
                          isHome
                            ? "bg-white/10"
                            : "bg-white/40 ring-4 ring-[#F8F3EE]",
                        )}
                      />
                    )}

                    <item.icon
                      className={cn(
                        "relative z-10 transition-all duration-300",
                        isHome
                          ? "h-[24px] w-[24px]"
                          : isActive
                            ? "h-[21px] w-[21px]"
                            : "h-[19px] w-[19px]",
                      )}
                    />
                  </div>

                  {/* LABEL */}
                  <span
                    className={cn(
                      "mt-1 text-[11px] font-medium tracking-[0.02em] transition-all duration-300",
                      isActive
                        ? "text-[#6B4A36]"
                        : "text-[#A38D7D]",
                      isHome && "-mt-2",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}