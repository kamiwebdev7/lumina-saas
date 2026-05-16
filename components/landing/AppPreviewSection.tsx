"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Moon, Zap, Droplets, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const mockMetrics = [
  {
    icon: Moon,
    label: "Sleep Score",
    value: "92",
    unit: "%",
    color: "text-[#7c6fa0]",
    bg: "bg-[#f0edf8]",
  },
  {
    icon: Zap,
    label: "Energy",
    value: "87",
    unit: "%",
    color: "text-sand-600",
    bg: "bg-sand-100",
  },
  {
    icon: Droplets,
    label: "Hydration",
    value: "2.1",
    unit: "L",
    color: "text-[#5a9bbf]",
    bg: "bg-[#ebf4fb]",
  },
  {
    icon: Activity,
    label: "HRV",
    value: "68",
    unit: "ms",
    color: "text-sage-400",
    bg: "bg-sage-100",
  },
];

export default function AppPreviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="programs"
      className="py-10 lg:py-24 bg-gradient-to-br from-[#3F2A20] via-[#4B3326] to-[#2B1D16] overflow-hidden relative"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#B89B84]/10 blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-[#D7C2B2]/10 blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-widest text-[#D7C2B2] font-medium mb-4"
            >
              Your Personal Dashboard
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl lg:text-6xl leading-[1.05] text-white mb-6 text-balance"
            >
              Everything that matters,
              <br />
              <em>beautifully visible</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-[#D7C2B2] leading-relaxed mb-8"
            >
              Your wellness data synthesized into an elegant daily view. Track
              sleep, energy, hydration, HRV, and protocol adherence — all in one
              beautifully designed space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {mockMetrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center mb-2.5`}
                  >
                    <m.icon className={`w-4 h-4 ${m.color}`} />
                  </div>
                  <p className="text-xs text-white/60 mb-1">{m.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-xl font-light text-white">
                      {m.value}
                    </span>
                    <span className="text-xs text-sand-500">{m.unit}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/dashboard">
                <Button className="bg-white hover:bg-[#F8F3EE] text-[#4B3326] rounded-full px-7 py-3.5 h-auto text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5">
                  Explore Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right — mock dashboard card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[#2F211A]/90 backdrop-blur-xl rounded-[2rem] p-7 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-[#D7C2B2]">Good morning</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] text-white/50">
                      Live wellness sync active
                    </span>
                  </div>
                  <p className="font-serif text-xl text-white">Sophia</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#D7C2B2]">Wellness Score</p>
                  <p className="font-serif text-2xl text-white">
                    87 <span className="text-sm text-[#D7C2B2]">/100</span>
                  </p>
                </div>
              </div>

              {/* Score bar */}
              <div className="h-2 bg-sand-700 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-sand-400 rounded-full"
                  style={{ width: "87%" }}
                />
              </div>

              {/* Mini chart */}
              <div className="mb-5">
                <p className="text-xs text-[#D7C2B2] mb-3">
                  Energy Trend — This Week
                </p>
                <div className="flex items-end gap-1.5 h-16">
                  {[65, 72, 68, 80, 85, 78, 87].map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-sand-600"
                      style={{
                        height: `${(v / 100) * 100}%`,
                        opacity: i === 6 ? 1 : 0.5 + i * 0.05,
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span
                      key={i}
                      className="flex-1 text-center text-[10px] text-sand-500"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Protocol progress */}
              <div className="bg-sand-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-sand-200">
                    Today&apos;s Protocol
                  </p>
                  <span className="text-xs text-sage-300">4/6 complete</span>
                </div>
                {[
                  "Morning hydration",
                  "Breathwork (5 min)",
                  "Protein target",
                  "Evening walk",
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 py-1.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${i < 4 ? "bg-sage-300 border-sage-300" : "border-sand-500"}`}
                    >
                      {i < 4 && (
                        <span className="text-[10px] text-sand-900">✓</span>
                      )}
                    </div>
                    <span
                      className={`text-xs ${i < 4 ? "text-sand-300 line-through" : "text-sand-300"}`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
