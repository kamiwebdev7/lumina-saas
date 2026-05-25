"use client";

import { motion } from "framer-motion";

import {
  Bell,
  Moon,
  Shield,
  User,
  ChevronRight,
  LogOut,
  Sparkles,
  Heart,
} from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const settings = [
  {
    icon: User,

    title: "Profile Information",

    subtitle:
      "Update your personal information and account details.",
  },

  {
    icon: Bell,

    title: "Notifications",

    subtitle:
      "Manage reminders, gentle prompts, and session updates.",
  },

  {
    icon: Moon,

    title: "Evening & Routine Preferences",

    subtitle:
      "Customize calming routines and supportive daily wellness preferences.",
  },

  {
    icon: Heart,

    title: "Wellness Preferences",

    subtitle:
      "Adjust your experience, reflection prompts, and daily rhythm settings.",
  },

  {
    icon: Shield,

    title: "Privacy & Security",

    subtitle:
      "Manage account protection and session security settings.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                ANIMATION                                   */
/* -------------------------------------------------------------------------- */

const fadeIn = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 18,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  transition: {
    duration: 0.55,
    delay,
  },
});

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function SettingsPage() {
  const supabase = createClient();

  const { user } = useUser();

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/";
  }

  const fullName =
    user?.fullName ??
    user?.email?.split("@")[0] ??
    "Member";

  const initials =
    fullName
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#F8F3EE] pb-32">
      <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8">
        {/* HEADER */}

        <motion.div
          {...fadeIn(0)}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8D8CA] bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#9A7558]">
            <Sparkles className="h-3.5 w-3.5" />

            Personal Preferences
          </div>

          <h1 className="mt-5 font-serif text-[2.8rem] leading-[1.02] text-[#3E2D24] lg:text-[4rem]">
            Preferences &
            <br />
            Settings
          </h1>

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#7C6A5D]">
            Customize your experience,
            reminders, preferences,
            and supportive daily
            wellness routines.
          </p>
        </motion.div>

        {/* PROFILE CARD */}

        <motion.div
          {...fadeIn(0.08)}
          className="relative overflow-hidden rounded-[2.8rem] bg-gradient-to-br from-[#7A553D] via-[#684736] to-[#4B3326] p-8 shadow-[0_30px_80px_rgba(91,63,43,0.22)] lg:p-10"
        >
          {/* Glow */}

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}

            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 text-2xl font-semibold text-white shadow-inner backdrop-blur-xl">
                {initials}
              </div>

              <div>
                <h2 className="text-[2rem] font-semibold leading-tight text-white">
                  {fullName}
                </h2>

                <p className="mt-1 text-[#E7D6C9]">
                  Wellness Journey
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/90">
                    Daily Rhythms
                  </div>

                  <div className="rounded-full border border-[#E9D0BC]/10 bg-[#E9D0BC]/10 px-4 py-2 text-sm text-[#F3DDD0]">
                    Intentional Wellness
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT QUOTE */}

            <div className="max-w-sm rounded-[2rem] border border-white/10 bg-white/10 px-6 py-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Reflection
              </p>

              <p className="mt-4 font-serif text-2xl leading-relaxed text-white">
                Small intentional
                routines create the
                foundation for
                sustainable wellbeing.
              </p>

              <p className="mt-5 text-sm text-[#E8D8CC]">
                Gentle consistency over
                perfection.
              </p>
            </div>
          </div>
        </motion.div>

        {/* SETTINGS GRID */}

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {settings.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeIn(0.12 + i * 0.05)}
              className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-[#E8DED5] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              {/* Hover overlay */}

              <div className="absolute inset-0 bg-gradient-to-br from-[#FAF5F1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F4ECE5]">
                  <item.icon className="h-5 w-5 text-[#6F4E37]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.05rem] font-semibold text-[#3E2D24]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#8D7768]">
                    {item.subtitle}
                  </p>
                </div>

                <ChevronRight className="h-5 w-5 shrink-0 text-[#B39A87] transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOGOUT */}

        <motion.div
          {...fadeIn(0.38)}
          className="mt-8 rounded-[2.2rem] border border-[#E8D8CB] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] lg:p-7"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#4B3326]">
                End Session
              </h3>

              <p className="mt-2 max-w-lg leading-relaxed text-[#8D7768]">
                Securely logout from
                your account on this
                device at any time.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7A553D] to-[#5B3F2B] px-7 py-4 text-sm font-medium text-white shadow-[0_14px_35px_rgba(111,78,55,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(111,78,55,0.34)] active:scale-[0.98]"
            >
              <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />

              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}