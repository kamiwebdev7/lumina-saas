"use client";

// components/ui/UserMenu.tsx
// Avatar button that opens a dropdown with user info + navigation + logout.
// Used in both desktop DashboardTopbar and mobile MobileTopbar.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/UserAvatar";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
  Bell,
} from "lucide-react";

interface UserMenuProps {
  align?: "left" | "right";
}

export function UserMenu({ align = "right" }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!user) return null;

  const menuItems = [
    {
      icon: User,
      label: "Profile",
      href: "/settings",
      description: "Manage your account",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/settings?tab=notifications",
      description: "Alerts & reminders",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      description: "Preferences & billing",
    },
  ];

  return (
    <div ref={menuRef} className="relative">
      {/* ── Trigger Button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="group flex items-center gap-2.5 rounded-2xl border border-[#E8DED5] bg-white/70 px-3 py-1.5 transition-all duration-200 hover:border-[#C9B09A] hover:bg-white hover:shadow-sm"
      >
        <Avatar
          initials={user.initials}
          avatarUrl={user.avatarUrl}
          size="sm"
        />
        <div className="hidden flex-col items-start sm:flex">
          <span className="text-xs font-semibold leading-tight text-[#4B3326]">
            {user.fullName}
          </span>
          <span className="text-[10px] leading-tight text-[#9A8475]">
            Premium Client
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`hidden text-[#9A8475] transition-transform duration-200 sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ── Dropdown Panel ── */}
      {open && (
        <div
          className={`absolute top-full z-50 mt-2 w-64 origin-top-right animate-in fade-in slide-in-from-top-1 rounded-2xl border border-[#E8DED5] bg-white/95 shadow-[0_20px_60px_rgba(91,63,43,0.15)] backdrop-blur-xl duration-150 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {/* User info header */}
          <div className="border-b border-[#F0E8E0] px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar
                initials={user.initials}
                avatarUrl={user.avatarUrl}
                size="md"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#4B3326]">
                  {user.fullName}
                </p>
                <p className="truncate text-xs text-[#9A8475]">{user.email}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#F8F1EA] px-3 py-1.5">
              <Shield size={11} className="text-[#7A553D]" />
              <span className="text-[10px] font-medium text-[#7A553D]">
                Premium Wellness Member
              </span>
            </div>
          </div>

          {/* Menu items */}
          <div className="p-2">
            {menuItems.map(({ icon: Icon, label, href, description }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F8F1EA]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F0E8E0] group-hover:bg-[#E8DED5] transition-colors">
                  <Icon size={14} className="text-[#7A553D]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#4B3326]">{label}</p>
                  <p className="text-xs text-[#9A8475]">{description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-[#F0E8E0] p-2">
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-red-50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F0E8E0] group-hover:bg-red-100 transition-colors">
                <LogOut size={14} className="text-[#7A553D] group-hover:text-red-600 transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#4B3326] group-hover:text-red-600 transition-colors">
                  Sign Out
                </p>
                <p className="text-xs text-[#9A8475]">End your session</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}