"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Moon, Zap, Activity, Wind, CheckCircle2, Brain } from "lucide-react";

const features = [
  {
    icon: Moon,
    title: "Sleep Optimization",
    description:
      "Deep sleep architecture analysis with targeted circadian rhythm protocols. Restore restorative sleep within weeks.",
    color: "bg-[#e8e4f0]",
    iconColor: "text-[#7c6fa0]",
  },
  {
    icon: Zap,
    title: "Energy Tracking",
    description:
      "Real-time energy mapping throughout your day. Identify peak performance windows and eliminate afternoon crashes.",
    color: "bg-[#f5f0e8]",
    iconColor: "text-sand-700",
  },
  {
    icon: Activity,
    title: "Metabolic Protocols",
    description:
      "Personalized metabolic optimization based on your biomarkers, lifestyle, and goals. Science meets intuition.",
    color: "bg-blush-100",
    iconColor: "text-blush-400",
  },
  {
    icon: Brain,
    title: "Stress Recovery",
    description:
      "HRV-informed recovery protocols that adapt to your nervous system state. Balance cortisol and build resilience.",
    color: "bg-sage-100",
    iconColor: "text-sage-400",
  },
  {
    icon: CheckCircle2,
    title: "Habit Compliance",
    description:
      "Behavioral science-backed habit stacking. 94% completion rate through progressive micro-commitments.",
    color: "bg-[#f0ede8]",
    iconColor: "text-sand-600",
  },
  {
    icon: Wind,
    title: "Breathwork",
    description:
      "Curated breathwork sequences for energy, focus, and calm. Integrated into your daily protocol for compound benefits.",
    color: "bg-[#eaf0ee]",
    iconColor: "text-sage-400",
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className="group bg-white/80 backdrop-blur-sm border border-[#E8DED5] rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
    >
      <div
        className={`w-14 h-14 rounded-2xl ${feature.color} border border-[#E8DED5] flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#6F4E37]`}
      >
        <feature.icon className={`w-6 h-6 ${feature.iconColor} transition-colors duration-500 group-hover:text-white`} />
      </div>
      <h3 className="font-serif text-2xl text-[#3E2D24] mb-4">
        {feature.title}
      </h3>
      <p className="text-[#8C7566] leading-relaxed text-base">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-10 lg:py-24 bg-gradient-to-b from-[#FCFAF8] to-[#F5EFEA]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[#8C7566] font-medium mb-4"
          >
            The Lumina Method
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl font-light text-[#3E2D24] mb-5 text-balance"
          >
            Six pillars of
            <br />
            <em>sustainable vitality</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-[#8C7566] max-w-xl mx-auto leading-relaxed"
          >
            Each protocol is rooted in the latest longevity research and
            tailored to your unique biology. No generic plans — only precision
            wellness.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
