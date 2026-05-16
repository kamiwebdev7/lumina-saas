"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease:  "easeOut", delay },
});

const stats = [
  { value: "340+", label: "Clients Transformed" },
  { value: "94%", label: "Report Improved Energy" },
  { value: "8.2h", label: "Average Sleep Restored" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-16 pb-0">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-blush-100 opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-sand-200 opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blush-50 opacity-30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-10 lg:pt-28 lg:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left content */}
        <div>
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 bg-sand-100 border border-sand-200 text-sand-700 text-xs font-medium px-3.5 py-1.5 rounded-full mb-8"
          >
            <Sparkles className="w-3 h-3" />
            <span>Evidence-Based Longevity Science</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="font-serif text-[2.7rem] sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#3E2D24] leading-[1.12] tracking-[-0.015em] mb-6"
          >
            Personalized
            <br />
            <em className="font-light">Longevity</em> &<br />
            Wellness Coaching
          </motion.h1>

          <motion.p
            {...fadeUp(0.35)}
            className="text-base lg:text-xl text-[#7A6759] leading-relaxed mb-8 max-w-xl"
          >
            Precision protocols for metabolism, energy, sleep, and stress
            regulation — tailored to your unique physiology. Sustainable health
            that deepens with time.
          </motion.p>

          <motion.div
            {...fadeUp(0.45)}
            className="flex flex-row flex-wrap gap-3 mb-8 items-center"
          >
            <Link href="/dashboard">
              <Button className="bg-[#6F4E37] hover:bg-[#5E4232] text-white rounded-full px-4 py-2.5 h-auto text-sm font-medium shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
                Client Portal
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                variant="outline"
                className="border border-[#D8CBBF] text-[#6B5B4D] hover:bg-white rounded-full px-4 py-2.5 h-auto text-sm font-medium transition-all duration-300"
              >
                Book Consultation
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.55)}
            className="grid grid-cols-2 gap-y-6 gap-x-10 pt-2"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-light text-[#3E2D24]">
                  {stat.value}
                </p>
                <p className="text-sm text-[#8C7566] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <img
              src="https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Wellness coaching"
              className="w-full h-[420px] sm:h-[520px] lg:h-[620px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-900/30 via-transparent to-transparent" />
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -left-6 top-1/3 glass rounded-2xl px-4 py-3 shadow-card"
          >
            <p className="text-xs text-sand-500 mb-1">
              Recovery Readiness
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-light text-sand-800">
                92
              </span>
              <span className="text-xs text-sage-400 font-medium">Optimal</span>
            </div>
            <div className="mt-2 h-1.5 bg-sand-200 rounded-full overflow-hidden w-24">
              <div
                className="h-full bg-sand-600 rounded-full"
                style={{ width: "87%" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -right-4 bottom-16 glass rounded-2xl px-4 py-3 shadow-card"
          >
            <p className="text-xs text-sand-500 mb-1">Circadian Alignment</p>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-light text-sand-800">
                96%
              </span>
            </div>
            <p className="text-xs text-sage-400 font-medium mt-0.5">
              HRV stabilized this week
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-sand-400 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-sand-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
