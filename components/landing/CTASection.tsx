"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-[#FCFAF8] to-[#F5EFEA]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.8rem] bg-gradient-to-br from-[#6F4E37] via-[#5E4232] to-[#3F2A20] px-6 sm:px-10 lg:px-16 py-14 lg:py-24 text-center shadow-[0_24px_90px_rgba(0,0,0,0.18)]"
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#B89B84]/20 blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Label */}
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#D7C2B2] font-medium mb-5">
              Early Access Experience
            </p>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] text-white mb-7">
              A more elevated
              <br />
              <em className="font-light">wellness journey</em>
            </h2>

            {/* Description */}
            <p className="text-[15px] lg:text-lg text-[#E6D7CA] max-w-2xl mx-auto leading-relaxed mb-10">
              Capacity Lab OS is being refined as a premium wellness coaching
              experience focused on guided recovery, accountability, routines,
              and long-term lifestyle support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="#book">
                <Button className="px-7 py-3 rounded-full bg-white text-[#4B3326] font-medium text-sm hover:bg-[#F8F3EE] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]">
                  Apply for Founding Round
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="px-7 py-3 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white hover:text-[#4B3326] font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-xl hover:shadow-2xl"
                >
                  Join Capacity Reset Circle
                </Button>
              </Link>
            </div>

            {/* Trust tags */}
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4 pt-10">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-[#E8DACE] backdrop-blur-md">
                Guided Wellness Support
              </div>

              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-[#E8DACE] backdrop-blur-md">
                Early Access Experience
              </div>

              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-[#E8DACE] backdrop-blur-md">
                Structured Client Journey
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}