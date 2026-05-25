"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Moon,
  Zap,
  Activity,
  Wind,
  Brain,
  HeartPulse,
} from "lucide-react";

const features = [
  {
    icon: Moon,
    title: "Sleep Restoration",
    description:
      "Structured evening recovery guidance and circadian-focused routines designed to support deeper, more restorative sleep patterns.",
    color: "bg-[#EFE9F8]",
    iconColor: "text-[#7B68A6]",
  },
  {
    icon: Zap,
    title: "Energy & Recovery",
    description:
      "Track lifestyle rhythms, daily energy patterns, and recovery consistency through guided wellness check-ins.",
    color: "bg-[#F5EFE6]",
    iconColor: "text-[#8B6648]",
  },
  {
    icon: Activity,
    title: "Metabolic Wellness",
    description:
      "Educational wellness support centered around movement, nutrition awareness, and sustainable lifestyle optimization.",
    color: "bg-[#F8ECE8]",
    iconColor: "text-[#B77C72]",
  },
  {
    icon: Brain,
    title: "Stress Regulation",
    description:
      "Nervous-system-conscious wellness routines focused on mindfulness, pacing, and resilience-building habits.",
    color: "bg-[#EAF3EF]",
    iconColor: "text-[#6F8E7E]",
  },
  {
    icon: HeartPulse,
    title: "Guided Habit Building",
    description:
      "Supportive accountability systems designed to help clients build consistent wellness routines over time.",
    color: "bg-[#F2EDE8]",
    iconColor: "text-[#8C7566]",
  },
  {
    icon: Wind,
    title: "Breathwork & Recovery",
    description:
      "Daily guided breathing exercises and calming recovery flows integrated into your personalized wellness journey.",
    color: "bg-[#EDF3F1]",
    iconColor: "text-[#729183]",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-[#E8DED5] bg-white/85 backdrop-blur-md p-8 shadow-[0_6px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
    >
      {/* glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,rgba(111,78,55,0.06),transparent_65%)]" />

      <div
        className={`relative w-14 h-14 rounded-2xl ${feature.color} border border-[#E8DED5] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#6F4E37]`}
      >
        <feature.icon
          className={`w-6 h-6 ${feature.iconColor} transition-colors duration-500 group-hover:text-white`}
        />
      </div>

      <h3 className="relative font-serif text-[1.65rem] leading-tight text-[#3E2D24] mb-4">
        {feature.title}
      </h3>

      <p className="relative text-[#8C7566] leading-relaxed text-[15px]">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="approach"
      className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#FCFAF8] via-[#FAF6F2] to-[#F5EFEA]"
    >
      {/* Background blur */}
      <div className="absolute top-20 left-[-120px] w-[320px] h-[320px] rounded-full bg-[#EFE7DE] blur-3xl opacity-60" />

      <div className="absolute bottom-0 right-[-120px] w-[320px] h-[320px] rounded-full bg-[#F4ECE6] blur-3xl opacity-70" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.35em] text-[#8C7566] font-medium mb-5"
          >
            Capacity Lab Framework
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-light text-[#3E2D24] leading-[1.15] mb-6"
          >
            A guided system for
            <br />
            <em className="font-light">wellness & recovery</em>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}