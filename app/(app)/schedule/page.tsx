"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Moon,
  Droplets,
  Brain,
  Coffee,
  CheckCircle2,
} from "lucide-react";

const schedule = [
  {
    time: "7:00 AM",
    title: "Morning Hydration",
    description: "500ml mineral water + electrolytes",
    icon: Droplets,
    completed: true,
  },
  {
    time: "8:30 AM",
    title: "Protein Breakfast",
    description: "High-protein metabolic meal",
    icon: Coffee,
    completed: true,
  },
  {
    time: "1:00 PM",
    title: "Breathwork Reset",
    description: "5-minute nervous system regulation",
    icon: Brain,
    completed: false,
  },
  {
    time: "6:30 PM",
    title: "Evening Walk",
    description: "20-minute glucose recovery walk",
    icon: CalendarDays,
    completed: false,
  },
  {
    time: "10:00 PM",
    title: "Sleep Protocol",
    description: "Magnesium + screen-free wind down",
    icon: Moon,
    completed: false,
  },
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-[#F8F3EE] p-5 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#B08968] mb-3">
            Daily Rhythm
          </p>

          <h1 className="font-serif text-4xl lg:text-5xl text-[#3E2D24] leading-tight">
            Your wellness
            <br />
            schedule
          </h1>

          <p className="text-[#7C6A5D] mt-4 max-w-xl leading-relaxed">
            Personalized rituals intelligently designed around your biology,
            energy levels, and recovery needs.
          </p>
        </motion.div>

        {/* DATE BAR */}
        <div className="flex items-center justify-between bg-white border border-[#E8DED5] rounded-[2rem] px-6 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8">
          <div>
            <p className="text-sm text-[#9A8472]">Today</p>
            <h2 className="text-xl font-semibold text-[#4B3326]">
              Thursday, May 15
            </h2>
          </div>

          <div className="flex items-center gap-2 text-[#6F4E37]">
            <Clock3 className="w-5 h-5" />
            <span className="font-medium">3 rituals remaining</span>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="space-y-5">
          {schedule.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white border border-[#E8DED5] rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                {/* ICON */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    item.completed
                      ? "bg-[#6F4E37]"
                      : "bg-[#F3ECE5]"
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${
                      item.completed
                        ? "text-white"
                        : "text-[#6F4E37]"
                    }`}
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#A08B7B] mb-1">
                        {item.time}
                      </p>

                      <h3 className="text-xl font-semibold text-[#3E2D24]">
                        {item.title}
                      </h3>
                    </div>

                    {item.completed && (
                      <div className="flex items-center gap-2 text-[#6F4E37] text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed
                      </div>
                    )}
                  </div>

                  <p className="text-[#7C6A5D] mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}