"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
     className="relative z-10 overflow-hidden py-10 lg:py-24 bg-gradient-to-b from-[#FCFAF8] to-[#F5EFEA]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#6F4E37] via-[#5E4232] to-[#3F2A20] px-5 sm:px-8 lg:px-16 py-10 sm:py-10 lg:py-24 text-center shadow-[0_20px_80px_rgba(0,0,0,0.18)]"
        >
          {/* Background texture */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#B89B84]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-[#D7C2B2] font-medium mb-4">
              Begin Your Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl xl:text-7xl leading-[1.05] text-white mb-6 text-balance">
              Your most vibrant self
              <br />
              <em>is within reach</em>
            </h2>
            <p className="text-base text-[#D7C2B2] max-w-xl mx-auto leading-relaxed mb-10">
              Join over 340 women who have transformed their sleep, metabolism,
              and energy through Capacity Lab OS&apos;s precision wellness coaching.
              Limited spaces available.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link href="#book">
                <Button className="px-6 py-3 rounded-full bg-white text-[#4B3326] font-medium text-sm hover:bg-[#F8F3EE] transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]">
                  Book Your Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white hover:text-[#4B3326] font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-lg hover:shadow-2xl"
                >
                  View Client Portal
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-6 sm:gap-10 pt-10 text-center">
              <div>
                <p className="text-2xl font-serif text-white">340+</p>
                <p className="text-sm text-[#D7C2B2] mt-1">Active Clients</p>
              </div>

              <div>
                <p className="text-2xl font-serif text-white">94%</p>
                <p className="text-sm text-[#D7C2B2] mt-1">
                  Better Sleep Scores
                </p>
              </div>

              <div>
                <p className="text-2xl font-serif text-white">8.2h</p>
                <p className="text-sm text-[#D7C2B2] mt-1">Average Recovery</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
