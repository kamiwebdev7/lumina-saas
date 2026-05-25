'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Private Wellness Client',
    role: 'Executive Wellness Program',
    quote:
      'The platform structure immediately made the experience feel more premium and intentional. Having guided check-ins, recovery tracking, and educational support in one place created much more consistency.',
    metric: 'Structured wellness tracking',
  },
  {
    name: 'Founding Beta Client',
    role: 'Longevity Coaching Experience',
    quote:
      'What stood out most was how calm and organized the journey felt. Instead of scattered PDFs and messages, everything felt centralized, supportive, and easy to follow day-to-day.',
    metric: 'Higher client engagement',
  },
  {
    name: 'Early Access Member',
    role: 'Guided Recovery Program',
    quote:
      'The dashboard concept adds a level of professionalism that typical coaching experiences usually lack. It feels more like a high-end wellness membership than standard online coaching.',
    metric: 'Premium client experience',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      id="results"
      className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-[#F5EFEA] via-[#F8F4F0] to-[#FCFAF8]"
    >
      {/* Background blur */}
      <div className="absolute top-10 right-[-120px] w-[320px] h-[320px] rounded-full bg-[#F0E7DE] blur-3xl opacity-70" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.35em] text-[#B89B84] font-medium mb-5"
          >
            Experience Design
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-light text-[#3E2D24] leading-[1.15]"
          >
            Designed to elevate
            <br />
            <em className="font-light">modern wellness coaching</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-6 text-[15px] lg:text-lg text-[#8C7566] max-w-2xl mx-auto leading-relaxed"
          >
            A premium client experience combining educational wellness support,
            guided accountability, and structured recovery tracking.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-[#E8DED5] bg-white/85 backdrop-blur-md p-8 shadow-[0_6px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] flex flex-col"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,rgba(111,78,55,0.05),transparent_65%)]" />

              <Quote className="relative w-8 h-8 text-[#D7C2B1] mb-6" />

              <p className="relative text-[#6B5B4D] leading-relaxed text-[17px] italic mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="relative flex items-center justify-between pt-5 border-t border-[#EFE7DF]">
                <div>
                  <p className="font-medium text-[#3E2D24] text-lg">
                    {t.name}
                  </p>

                  <p className="text-[#A58A76] text-sm mt-1">
                    {t.role}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[#7D927D] text-sm font-medium">
                    {t.metric}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}