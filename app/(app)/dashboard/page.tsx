"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  Moon,
  Zap,
  Droplets,
  Activity,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Flame,
  Heart,
  Clock,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { useAuth } from "@/context/AuthContext";
import { AuthLoadingScreen } from "@/components/ui/AuthLoadingScreen";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const energyData = [
  { day: "Mon", energy: 65, sleep: 72 },
  { day: "Tue", energy: 72, sleep: 78 },
  { day: "Wed", energy: 68, sleep: 75 },
  { day: "Thu", energy: 80, sleep: 85 },
  { day: "Fri", energy: 85, sleep: 88 },
  { day: "Sat", energy: 78, sleep: 82 },
  { day: "Sun", energy: 87, sleep: 91 },
];

const weeklyProgress = [
  { day: "M", score: 72 },
  { day: "T", score: 75 },
  { day: "W", score: 68 },
  { day: "T", score: 82 },
  { day: "F", score: 88 },
  { day: "S", score: 79 },
  { day: "S", score: 87 },
];

const initialChecklist = [
  {
    id: 1,
    label: "Morning hydration (500ml)",
    done: true,
    time: "7:00 AM",
  },
  {
    id: 2,
    label: "Protein-rich breakfast",
    done: true,
    time: "8:00 AM",
  },
  {
    id: 3,
    label: "Breathwork (5 minutes)",
    done: true,
    time: "8:30 AM",
  },
  {
    id: 4,
    label: "Morning walk (20 min)",
    done: false,
    time: "9:00 AM",
  },
  {
    id: 5,
    label: "Magnesium supplement",
    done: false,
    time: "12:00 PM",
  },
  {
    id: 6,
    label: "Evening wind-down",
    done: false,
    time: "9:00 PM",
  },
];

const scoreCards = [
  {
    icon: Moon,
    label: "Sleep Score",
    value: "92",
    unit: "%",
    change: "+4%",
    color: "text-[#7c6fa0]",
    bg: "bg-[#f0edf8]",
    borderColor: "border-[#e8e2f5]",
  },
  {
    icon: Zap,
    label: "Energy Level",
    value: "87",
    unit: "%",
    change: "+12%",
    color: "text-sand-600",
    bg: "bg-sand-100",
    borderColor: "border-sand-200",
  },
  {
    icon: Droplets,
    label: "Hydration",
    value: "2.1",
    unit: "L",
    change: "+0.4L",
    color: "text-[#5a9bbf]",
    bg: "bg-[#ebf4fb]",
    borderColor: "border-[#d8ecf7]",
  },
  {
    icon: Activity,
    label: "HRV",
    value: "68",
    unit: "ms",
    change: "+8ms",
    color: "text-sage-400",
    bg: "bg-sage-100",
    borderColor: "border-sage-200",
  },
];

/* -------------------------------------------------------------------------- */
/*                              CUSTOM TOOLTIP                                */
/* -------------------------------------------------------------------------- */

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-sand-200 rounded-xl px-3 py-2.5 shadow-card text-xs">
        <p className="font-medium text-sand-700 mb-1">{label}</p>

        {payload.map((p: any) => (
          <p
            key={p.name}
            style={{ color: p.color }}
            className="capitalize"
          >
            {p.name}: {p.value}%
          </p>
        ))}
      </div>
    );
  }

  return null;
};

/* -------------------------------------------------------------------------- */
/*                               DASHBOARD PAGE                               */
/* -------------------------------------------------------------------------- */

export default function DashboardPage() {
  const { user, loading } = useAuth();

  const [checklist, setChecklist] = useState(initialChecklist);

  if (loading) return <AuthLoadingScreen />;

  const firstName =
    user?.fullName?.split(" ")[0] || "Client";

  const toggle = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  };

  const completedCount = checklist.filter(
    (i) => i.done
  ).length;

  const completionPct = Math.round(
    (completedCount / checklist.length) * 100
  );

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-7">

      {/* HERO */}
     {/* HERO */}
<motion.div
  {...fadeIn(0)}
  className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#7A553D] via-[#654635] to-[#432D21] p-6 lg:p-8 text-white shadow-[0_20px_70px_rgba(91,63,43,0.22)]"
>
  {/* Glow */}
  <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
  <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#D7B89E]/10 blur-3xl" />

  <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

    {/* LEFT */}
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-xl mb-5">
        <div className="w-2 h-2 rounded-full bg-[#E7C7A7] animate-pulse" />

        <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
          Wellness Intelligence
        </span>
      </div>

      <h1 className="font-serif text-4xl lg:text-6xl leading-[1.02] tracking-tight">
        Recovery improved{" "}
        <span className="text-[#E7C7A7]">18%</span>
        <br />
        this week, {firstName}.
      </h1>

      <p className="mt-5 max-w-xl text-sm lg:text-[15px] leading-relaxed text-white/72">
        Your sleep consistency and stress recovery patterns are
        trending positively. Your protocol has been updated for
        deeper overnight restoration.
      </p>

      {/* MINI STATS */}
      <div className="mt-6 flex flex-wrap gap-3">

        <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-3 min-w-[110px]">
          <p className="text-[10px] uppercase tracking-wide text-white/45">
            Sleep
          </p>

          <p className="mt-1 font-serif text-2xl">
            92%
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-3 min-w-[110px]">
          <p className="text-[10px] uppercase tracking-wide text-white/45">
            Recovery
          </p>

          <p className="mt-1 font-serif text-2xl text-[#E7C7A7]">
            +18%
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-3 min-w-[110px]">
          <p className="text-[10px] uppercase tracking-wide text-white/45">
            Stress
          </p>

          <p className="mt-1 font-serif text-2xl">
            Moderate
          </p>
        </div>

      </div>
    </div>

    {/* RIGHT SCORE */}
    <div className="self-start lg:self-end">
      <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl px-6 py-5 min-w-[180px]">

        <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-3">
          Recovery Score
        </p>

        <div className="flex items-end gap-1">
          <span className="font-serif text-6xl leading-none">
            87
          </span>

          <span className="text-white/50 mb-2 text-sm">
            /100
          </span>
        </div>

        <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-[#E7C7A7] to-[#D9B89B]" />
        </div>

        <p className="mt-3 text-sm text-white/65">
          Excellent recovery trajectory
        </p>
      </div>
    </div>
  </div>
</motion.div>

      {/* SCORE CARDS */}
      <motion.div
        {...fadeIn(0.08)}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {scoreCards.map((card) => (
          <div
            key={card.label}
            className={`bg-card rounded-2xl p-4 border ${card.borderColor} shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5`}
          >
            <div
              className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}
            >
              <card.icon
                className={`w-[18px] h-[18px] ${card.color}`}
              />
            </div>

            <p className="text-xs text-sand-500 mb-1">
              {card.label}
            </p>

            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-light text-sand-800">
                {card.value}
              </span>

              <span className="text-xs text-sand-500">
                {card.unit}
              </span>
            </div>

            <p className="text-xs text-sage-400 font-medium mt-1">
              {card.change} this week
            </p>
          </div>
        ))}
      </motion.div>

      {/* QUICK ACTIONS */}
      <motion.div
        {...fadeIn(0.12)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            icon: ClipboardList,
            label: "Protocols",
            desc: "View your active protocols",
            href: "/protocols",
          },
          {
            icon: TrendingUp,
            label: "Progress",
            desc: "Track your wellness journey",
            href: "/progress",
          },
          {
            icon: Calendar,
            label: "Schedule",
            desc: "Upcoming coaching sessions",
            href: "/schedule",
          },
        ].map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="group bg-white border border-[#E8DED5] rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7A553D] to-[#4B3326] flex items-center justify-center shadow-md">
                <item.icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-[#3E2D24]">
                  {item.label}
                </h3>

                <p className="text-sm text-[#8D7768] mt-1">
                  {item.desc}
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-[#B39A87] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </motion.div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* ENERGY */}
        <motion.div
          {...fadeIn(0.18)}
          className="lg:col-span-3 bg-card rounded-[2rem] p-5 border border-sand-200 shadow-soft"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-medium text-sand-800 text-sm">
                Energy & Sleep Trend
              </h3>

              <p className="text-xs text-sand-500 mt-0.5">
                Last 7 days
              </p>
            </div>

            <Badge className="bg-sage-100 text-sage-500 border-0">
              Improving
            </Badge>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={energyData}>
              <defs>
                <linearGradient
                  id="energyGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#b89d82"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="100%"
                    stopColor="#b89d82"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ede4d8"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[50, 100]}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="energy"
                stroke="#9a7d61"
                strokeWidth={2}
                fill="url(#energyGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* CHECKLIST */}
        <motion.div
          {...fadeIn(0.24)}
          className="lg:col-span-2 bg-card rounded-[2rem] p-5 border border-sand-200 shadow-soft"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-medium text-sand-800 text-sm">
                Daily Checklist
              </h3>

              <p className="text-xs text-sand-500 mt-0.5">
                {completedCount} of {checklist.length} complete
              </p>
            </div>

            <span className="text-xs font-medium text-sand-700">
              {completionPct}%
            </span>
          </div>

          <Progress
            value={completionPct}
            className="h-1.5 mb-5"
          />

          <div className="space-y-2">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-sand-50 transition-colors text-left"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.done
                      ? "bg-sand-700"
                      : "border-2 border-sand-300"
                  }`}
                >
                  {item.done && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  )}
                </div>

                <span
                  className={`text-sm flex-1 ${
                    item.done
                      ? "line-through text-sand-500"
                      : "text-sand-700"
                  }`}
                >
                  {item.label}
                </span>

                <span className="text-xs text-sand-500">
                  {item.time}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}