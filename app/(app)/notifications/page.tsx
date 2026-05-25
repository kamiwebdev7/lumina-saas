"use client";

import { motion } from "framer-motion";

import {
  Bell,
  Moon,
  Droplets,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { EmptyState } from "@/components/ui/EmptyState";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const notifications = [
  {
    id: 1,

    title: "Evening Wind-Down",

    message:
      "A calmer evening rhythm often begins with slower transitions and quieter routines.",

    time: "10 min ago",

    unread: true,

    icon: Moon,

    color: "text-[#7C6FA0]",

    bg: "bg-[#F2EEF9]",
  },

  {
    id: 2,

    title: "Hydration Ritual Complete",

    message:
      "Your morning hydration ritual was completed earlier today.",

    time: "2 hours ago",

    unread: false,

    icon: Droplets,

    color: "text-[#5A9BBF]",

    bg: "bg-[#EBF4FB]",
  },

  {
    id: 3,

    title: "Today’s Reflection",

    message:
      "Consistency matters more than perfection today.",

    time: "Yesterday",

    unread: false,

    icon: Sparkles,

    color: "text-[#B08968]",

    bg: "bg-[#F8F1EA]",
  },

  {
    id: 4,

    title: "Supportive Reminder",

    message:
      "Small intentional wellness rituals often create the most sustainable rhythms.",

    time: "Yesterday",

    unread: false,

    icon: CheckCircle2,

    color: "text-[#7C9B83]",

    bg: "bg-[#EEF5EF]",
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
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function NotificationsPage() {
  const hasNotifications =
    notifications.length > 0;

  return (
    <div className="min-h-screen bg-[#F8F3EE] pb-32">
      <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8">
        {/* HEADER */}

        <motion.div
          {...fadeIn(0)}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8D8CA] bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#9A7558]">
            <Bell className="h-3.5 w-3.5" />

            Gentle Updates
          </div>

          <h1 className="mt-5 font-serif text-[2.8rem] leading-[1.02] text-[#3E2D24] lg:text-[4rem]">
            Notifications &
            <br />
            Reflections
          </h1>

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#7C6A5D]">
            Supportive reminders,
            calming reflections, and
            gentle wellness updates
            throughout your journey.
          </p>
        </motion.div>

        {/* EMPTY STATE */}

        {!hasNotifications ? (
          <EmptyState
            title="No new updates"
            description="Supportive reminders and gentle wellness reflections will appear here over time."
          />
        ) : (
          <div className="space-y-4">
            {notifications.map(
              (item, i) => (
                <motion.div
                  key={item.id}
                  {...fadeIn(
                    0.08 + i * 0.05,
                  )}
                  className="group relative overflow-hidden rounded-[2rem] border border-[#E8DED5] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
                >
                  {/* Hover overlay */}

                  <div className="absolute inset-0 bg-gradient-to-br from-[#FAF5F1] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-4">
                    {/* ICON */}

                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                        item.bg,
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          item.color,
                        )}
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-[1rem] font-semibold text-[#3E2D24]">
                              {item.title}
                            </h3>

                            {item.unread && (
                              <div className="h-2 w-2 rounded-full bg-[#7A553D]" />
                            )}
                          </div>

                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#7D6B5D]">
                            {item.message}
                          </p>
                        </div>

                        <span className="shrink-0 text-xs text-[#A08C7B]">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}