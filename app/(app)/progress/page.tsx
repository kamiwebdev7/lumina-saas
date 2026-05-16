"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  Award,
  Calendar,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const weightData = [
  { week: "Wk 1", weight: 68.2 },
  { week: "Wk 2", weight: 67.8 },
  { week: "Wk 3", weight: 67.5 },
  { week: "Wk 4", weight: 67.1 },
  { week: "Wk 5", weight: 66.8 },
  { week: "Wk 6", weight: 66.4 },
];

const energyData = [
  { week: "Wk 1", energy: 52 },
  { week: "Wk 2", energy: 58 },
  { week: "Wk 3", energy: 62 },
  { week: "Wk 4", energy: 71 },
  { week: "Wk 5", energy: 78 },
  { week: "Wk 6", energy: 87 },
];

const habitData = [
  {
    day: "Mon",
    hydration: 100,
    protein: 80,
    breathwork: 100,
    steps: 90,
    sleep: 95,
  },
  {
    day: "Tue",
    hydration: 100,
    protein: 100,
    breathwork: 60,
    steps: 70,
    sleep: 88,
  },
  {
    day: "Wed",
    hydration: 80,
    protein: 90,
    breathwork: 100,
    steps: 85,
    sleep: 92,
  },
  {
    day: "Thu",
    hydration: 100,
    protein: 100,
    breathwork: 100,
    steps: 60,
    sleep: 90,
  },
  {
    day: "Fri",
    hydration: 100,
    protein: 80,
    breathwork: 80,
    steps: 100,
    sleep: 94,
  },
  {
    day: "Sat",
    hydration: 60,
    protein: 70,
    breathwork: 40,
    steps: 100,
    sleep: 88,
  },
  {
    day: "Sun",
    hydration: 100,
    protein: 90,
    breathwork: 100,
    steps: 80,
    sleep: 96,
  },
];

const radarData = [
  { subject: "Sleep", current: 92, baseline: 55 },
  { subject: "Energy", current: 87, baseline: 48 },
  { subject: "Stress", current: 78, baseline: 35 },
  { subject: "Nutrition", current: 83, baseline: 60 },
  { subject: "Movement", current: 75, baseline: 55 },
  { subject: "Recovery", current: 88, baseline: 42 },
];

const milestones = [
  {
    date: "Week 1",
    title: "Program Start",
    desc: "Baseline assessment & protocol design",
    type: "start",
  },
  {
    date: "Week 2",
    title: "Sleep Improved",
    desc: "Average sleep extended to 7.8h (+1.4h)",
    type: "win",
  },
  {
    date: "Week 3",
    title: "Energy Breakthrough",
    desc: "First week with zero afternoon crashes",
    type: "win",
  },
  {
    date: "Week 4",
    title: "Metabolic Shift",
    desc: "Fasting glucose normalized to optimal range",
    type: "win",
  },
  {
    date: "Week 5",
    title: "Habit Mastery",
    desc: "95% protocol adherence — personal best",
    type: "win",
  },
  {
    date: "Week 6",
    title: "Now",
    desc: "Sustained transformation across all markers",
    type: "now",
  },
];

const analyticsCards = [
  {
    label: "Weight Change",
    value: "-1.8 kg",
    sub: "Over 6 weeks",
    icon: TrendingDown,
    positive: true,
    color: "text-sage-400",
  },
  {
    label: "Energy Score",
    value: "+67%",
    sub: "Baseline to now",
    icon: TrendingUp,
    positive: true,
    color: "text-sand-600",
  },
  {
    label: "Protocol Streak",
    value: "14 days",
    sub: "Current streak",
    icon: Award,
    positive: true,
    color: "text-blush-400",
  },
  {
    label: "Avg Sleep",
    value: "8.4h",
    sub: "This week",
    icon: Activity,
    positive: true,
    color: "text-[#7c6fa0]",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-sand-200 rounded-xl px-3 py-2.5 shadow-card text-xs">
        <p className="font-medium text-sand-700 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color ?? "#9a7d61" }}>
            {p.name}: {p.value}
            {typeof p.value === "number" && p.value < 200 && p.value > 50
              ? p.name === "weight"
                ? " kg"
                : "%"
              : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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
    duration: 0.6,
    delay,
  },
});

export default function ProgressPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-7">
      {/* Header */}
      <motion.div {...fadeIn(0)}>
        <p className="text-xs text-sand-500 uppercase tracking-widest font-medium mb-1">
          Your Journey
        </p>
        <h1 className="font-serif text-3xl lg:text-4xl font-light text-sand-900 mb-2">
          6 Weeks of <em>Transformation</em>
        </h1>
        <p className="text-sm text-sand-600">
          Program start: April 1, 2026 · Week 6 of 12
        </p>
      </motion.div>

      {/* Analytics cards */}
      <motion.div
        {...fadeIn(0.08)}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {analyticsCards.map((card) => (
          <div
            key={card.label}
            className="bg-card rounded-2xl p-4 border border-sand-200 shadow-soft"
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`w-4 h-4 ${card.color}`} />
              <Badge className="bg-sage-100 text-sage-400 border-0 text-[10px]">
                {card.positive ? "On Track" : "Review"}
              </Badge>
            </div>
            <p className="font-serif text-2xl font-light text-sand-800 mb-0.5">
              {card.value}
            </p>
            <p className="text-xs text-sand-500">{card.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weight trend */}
        <motion.div
          {...fadeIn(0.12)}
          className="bg-card rounded-2xl p-5 border border-sand-200 shadow-soft"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-medium text-sand-800 text-sm">
                Weight Trend
              </h3>
              <p className="text-xs text-sand-500 mt-0.5">
                Gradual, sustainable reduction
              </p>
            </div>
            <Badge className="bg-sage-100 text-sage-400 border-0 text-xs">
              -1.8 kg
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart
              data={weightData}
              margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ede4d8"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#b89d82" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#b89d82" }}
                domain={[65, 70]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="weight"
                name="weight"
                stroke="#9a7d61"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#9a7d61", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#9a7d61" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Energy improvement */}
        <motion.div
          {...fadeIn(0.16)}
          className="bg-card rounded-2xl p-5 border border-sand-200 shadow-soft"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-medium text-sand-800 text-sm">
                Energy Improvement
              </h3>
              <p className="text-xs text-sand-500 mt-0.5">Score out of 100</p>
            </div>
            <Badge className="bg-sage-100 text-sage-400 border-0 text-xs">
              +67%
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={energyData}
              margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="energyGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c49590" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#c49590" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ede4d8"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#b89d82" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#b89d82" }}
                domain={[40, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="energy"
                name="energy"
                stroke="#c49590"
                strokeWidth={2.5}
                fill="url(#energyGrad2)"
                dot={{ r: 4, fill: "#c49590", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Habit consistency + radar */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Habit consistency bars */}
        <motion.div
          {...fadeIn(0.2)}
          className="lg:col-span-3 bg-card rounded-2xl p-5 border border-sand-200 shadow-soft"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-medium text-sand-800 text-sm">
                Habit Consistency
              </h3>
              <p className="text-xs text-sand-500 mt-0.5">
                This week (% completion)
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={habitData}
              margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
              barSize={8}
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ede4d8"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#b89d82" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#b89d82" }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(184,157,130,0.06)" }}
              />
              <Bar
                dataKey="hydration"
                name="Hydration"
                fill="#5a9bbf"
                radius={[4, 4, 0, 0]}
                opacity={0.85}
              />
              <Bar
                dataKey="protein"
                name="Protein"
                fill="#9a7d61"
                radius={[4, 4, 0, 0]}
                opacity={0.85}
              />
              <Bar
                dataKey="breathwork"
                name="Breathwork"
                fill="#8aa083"
                radius={[4, 4, 0, 0]}
                opacity={0.85}
              />
              <Bar
                dataKey="sleep"
                name="Sleep"
                fill="#7c6fa0"
                radius={[4, 4, 0, 0]}
                opacity={0.85}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Radar */}
        <motion.div
          {...fadeIn(0.24)}
          className="lg:col-span-2 bg-card rounded-2xl p-5 border border-sand-200 shadow-soft"
        >
          <div className="mb-4">
            <h3 className="font-medium text-sand-800 text-sm">
              Wellness Radar
            </h3>
            <p className="text-xs text-sand-500 mt-0.5">Current vs. Baseline</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart
              data={radarData}
              margin={{ top: 5, right: 15, bottom: 5, left: 15 }}
            >
              <PolarGrid stroke="#ede4d8" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 10, fill: "#b89d82" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Baseline"
                dataKey="baseline"
                stroke="#dfd0bf"
                fill="#dfd0bf"
                fillOpacity={0.3}
              />
              <Radar
                name="Current"
                dataKey="current"
                stroke="#9a7d61"
                fill="#9a7d61"
                fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#dfd0bf]" />
              <span className="text-xs text-sand-500">Baseline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#9a7d61]" />
              <span className="text-xs text-sand-500">Current</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wellness timeline */}
      <motion.div
        {...fadeIn(0.28)}
        className="bg-card rounded-2xl p-5 border border-sand-200 shadow-soft"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-4 h-4 text-sand-600" />
          <h3 className="font-medium text-sand-800 text-sm">
            Wellness Timeline
          </h3>
        </div>
        <div className="relative">
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-sand-200" />
          <div className="space-y-5">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 + i * 0.06 }}
                className="flex items-start gap-5"
              >
                <span className="text-xs text-sand-500 w-16 text-right flex-shrink-0 pt-0.5 font-medium">
                  {m.date}
                </span>
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 z-10 border-2 ${
                    m.type === "now"
                      ? "bg-sand-700 border-sand-700"
                      : m.type === "start"
                        ? "bg-sand-300 border-sand-300"
                        : "bg-sage-300 border-sage-300"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-sand-800">{m.title}</p>
                  <p className="text-xs text-sand-500 mt-0.5">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
