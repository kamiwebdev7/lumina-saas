"use client";

import { motion } from "framer-motion";

import { EmptyState } from "@/components/ui/EmptyState";

import {
  CalendarDays,
  Clock3,
  Moon,
  Droplets,
  Brain,
  Coffee,
  CheckCircle2,
  Sparkles,
  Footprints,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const schedule = [
  {
    time: "7:00 AM",

    title: "Morning Hydration",

    description:
      "Begin the morning with intentional hydration and a slower start to the day.",

    icon: Droplets,

    completed: true,
  },

  {
    time: "8:30 AM",

    title: "Morning Nourishment",

    description:
      "A grounding breakfast to begin the day with steadier energy and presence.",

    icon: Coffee,

    completed: true,
  },

  {
    time: "1:00 PM",

    title: "Midday Pause",

    description:
      "A short breathing ritual to slow down and reconnect during the afternoon.",

    icon: Brain,

    completed: false,
  },

  {
    time: "6:30 PM",

    title: "Evening Walk",

    description:
      "A gentle evening walk for reflection, movement, and calmer transitions.",

    icon: Footprints,

    completed: false,
  },

  {
    time: "10:00 PM",

    title: "Evening Wind-Down",

    description:
      "A quieter evening routine to support more restful sleep rhythms.",

    icon: Moon,

    completed: false,
  },
];

/* -------------------------------------------------------------------------- */
/*                                ANIMATION                                   */
/* -------------------------------------------------------------------------- */

const fadeIn = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 20,
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
/*                               PAGE                                         */
/* -------------------------------------------------------------------------- */

export default function SchedulePage() {
  const remaining = schedule.filter((item) => !item.completed).length;

  const hasSchedule = true;

  return (
    <div className="min-h-screen bg-[#F8F3EE] px-4 py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-5xl">
        {!hasSchedule ? (
          <EmptyState
            title="No wellness rituals scheduled"
            description="Supportive routines and calming daily rhythms will appear here over time."
          />
        ) : (
          <>
            {/* HEADER */}

            <motion.div {...fadeIn(0)} className="mb-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8DED5] bg-white px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#B89B84]" />

                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8D7768]">
                  Daily Rhythm
                </span>
              </div>

              <h1 className="font-serif text-4xl leading-tight text-[#3E2D24] lg:text-5xl">
                Your wellness
                <br />
                schedule
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#7D6B5D] lg:text-[15px]">
                Gentle daily rituals designed to support steadier energy,
                restful evenings, and more intentional wellness rhythms.
              </p>
            </motion.div>

            {/* DATE BAR */}

            <motion.div
              {...fadeIn(0.08)}
              className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-[#E8DED5] bg-white px-6 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm text-[#9A8472]">Today</p>

                <h2 className="mt-1 text-xl font-semibold text-[#4B3326]">
                  Thursday, May 15
                </h2>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#F6EFE8] px-4 py-2 text-[#6F4E37]">
                <Clock3 className="h-4 w-4" />

                <span className="text-sm font-medium">
                  {remaining} rituals remaining
                </span>
              </div>
            </motion.div>

            {/* TIMELINE */}

            <div className="space-y-5">
              {schedule.map((item, i) => (
                <motion.div
                  key={item.title}
                  {...fadeIn(0.12 + i * 0.06)}
                  className="group rounded-[2rem] border border-[#E8DED5] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-start gap-5">
                    {/* ICON */}

                    <div
                      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                        item.completed ? "bg-[#6F4E37]" : "bg-[#F3ECE5]"
                      }`}
                    >
                      <item.icon
                        className={`h-6 w-6 ${
                          item.completed ? "text-white" : "text-[#6F4E37]"
                        }`}
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="mb-1 text-sm text-[#A08B7B]">
                            {item.time}
                          </p>

                          <h3 className="text-xl font-semibold text-[#3E2D24]">
                            {item.title}
                          </h3>
                        </div>

                        {item.completed && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-[#F6EFE8] px-3 py-1.5 text-sm font-medium text-[#6F4E37]">
                            <CheckCircle2 className="h-4 w-4" />
                            Completed
                          </div>
                        )}
                      </div>

                      <p className="mt-4 max-w-xl leading-relaxed text-[#7C6A5D]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* REFLECTION */}

            <motion.div
              {...fadeIn(0.42)}
              className="mt-8 rounded-[2.5rem] border border-[#E8DED5] bg-gradient-to-br from-white to-[#FBF7F3] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
            >
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#9A7D61]" />

                <p className="text-xs uppercase tracking-[0.22em] text-[#A08C7B]">
                  Today’s Reflection
                </p>
              </div>

              <h3 className="font-serif text-3xl text-[#3E2D24]">
                Gentle consistency matters
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6B5B4D] lg:text-[15px]">
                Small intentional moments often create the most sustainable
                wellness shifts over time. Today is not about perfection — only
                supportive rhythms that feel calmer and more restorative.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
