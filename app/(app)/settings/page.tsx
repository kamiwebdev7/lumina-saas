"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Moon,
  Shield,
  User,
  HeartPulse,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";

const settings = [
  {
    icon: User,
    title: "Profile Information",
    subtitle: "Manage personal account details and wellness identity",
  },
  {
    icon: Bell,
    title: "Notifications",
    subtitle: "Protocol reminders, coach updates and check-ins",
  },
  {
    icon: Moon,
    title: "Recovery Preferences",
    subtitle: "Sleep, evening routines and recovery optimization",
  },
  {
    icon: HeartPulse,
    title: "Health Integrations",
    subtitle: "Connect Apple Health, Oura, Whoop and wearables",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    subtitle: "Manage account protection and session security",
  },
];

export default function SettingsPage() {
  const supabase = createClient();
  const { user } = useUser();

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const fullName = user?.fullName ?? user?.email?.split("@")[0] ?? "Wellness Client";

  const initials =
    fullName
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#F8F3EE] pb-32">
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E8D8CA] bg-white text-[#9A7558] text-xs tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Client Preferences
          </div>

          <h1 className="mt-5 font-serif text-[2.7rem] leading-[1.05] text-[#3E2D24]">
            Settings & Preferences
          </h1>

          <p className="mt-4 text-[#7C6A5D] max-w-2xl leading-relaxed text-[15px]">
            Manage your wellness experience, connected health data,
            notifications and personalized recovery settings.
          </p>
        </motion.div>

        {/* PREMIUM PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.8rem] bg-gradient-to-br from-[#7A553D] via-[#684736] to-[#4B3326] p-8 lg:p-10 shadow-[0_30px_80px_rgba(91,63,43,0.22)]"
        >
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* LEFT */}
            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-[2rem] bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center text-2xl font-semibold text-white shadow-inner">
                {initials}
              </div>

              <div>
                <h2 className="text-[2rem] font-semibold text-white leading-tight">
                  {fullName}
                </h2>

                <p className="text-[#E7D6C9] mt-1">
                  Premium Wellness Client
                </p>

                <div className="flex flex-wrap gap-2 mt-5">

                  <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/90">
                    Active Program
                  </div>

                  <div className="px-4 py-2 rounded-full bg-[#E9D0BC]/10 border border-[#E9D0BC]/10 text-sm text-[#F3DDD0]">
                    Recovery Optimizing
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT METRIC */}
            <div className="rounded-[2rem] bg-white/10 border border-white/10 backdrop-blur-xl px-7 py-6 min-w-[220px]">

              <p className="text-white/60 text-sm">
                Wellness Consistency
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-5xl font-semibold text-white">
                  87
                </span>

                <span className="text-[#EAD8CB] mb-1">
                  /100
                </span>
              </div>

              <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-[#E9D0BC] to-white" />
              </div>

              <p className="mt-3 text-xs text-[#E8D8CC]">
                Strong momentum this week
              </p>
            </div>
          </div>
        </motion.div>

        {/* SETTINGS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">

          {settings.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-[2rem] border border-[#E8DED5] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#FAF5F1] to-transparent" />

              <div className="relative flex items-start gap-5">

                <div className="w-14 h-14 rounded-2xl bg-[#F4ECE5] flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#6F4E37]" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[1.05rem] font-semibold text-[#3E2D24]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#8D7768] mt-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-[#B39A87] group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOGOUT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-[2.2rem] border border-[#E8D8CB] bg-white p-6 lg:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <h3 className="text-xl font-semibold text-[#4B3326]">
                End Session
              </h3>

              <p className="mt-2 text-[#8D7768] leading-relaxed max-w-lg">
                Securely logout from your personalized wellness dashboard
                across all active sessions on this device.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7A553D] to-[#5B3F2B] px-7 py-4 text-sm font-medium text-white shadow-[0_14px_35px_rgba(111,78,55,0.24)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(111,78,55,0.34)] transition-all duration-300 active:scale-[0.98]"
            >
              <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />

              Logout
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}