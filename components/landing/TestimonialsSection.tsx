'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Isabelle Mortimer',
    role: 'Founder & CEO, London',
    quote: 'Within 6 weeks, my sleep transformed completely. I wake up without an alarm, think more clearly, and my metabolic markers improved beyond what my doctor expected. Lumina changed everything.',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    metric: '8.6h avg sleep restored',
  },
  {
    name: 'Camille Durand',
    role: 'Surgeon, Paris',
    quote: "The protocols feel luxurious, not punishing. I've tried every wellness program — nothing has been this effective, this sustainable, or this beautifully designed. My energy is extraordinary.",
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    metric: '40% cortisol reduction',
  },
  {
    name: 'Valentina Ricci',
    role: 'Creative Director, Milan',
    quote: "I was skeptical of wellness coaching but my coach's depth of knowledge is extraordinary. Three months in, I've lost 11 pounds, my skin is glowing, and I feel 10 years younger.",
    avatar: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=200',
    metric: '11 lbs metabolic reset',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="results" className="py-10 lg:py-24 overflow-hidden bg-gradient-to-b from-[#F5EFEA] to-[#FCFAF8]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[#B89B84] font-medium mb-4"
          >
            Client Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl font-light text-[#3E2D24] text-balance"
          >
            Transformations that<br />
            <em>speak for themselves</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease:  "easeOut"}}
              className="group bg-white/80 backdrop-blur-sm border border-[#E8DED5] rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              <Quote className="w-7 h-7 text-[#D8C2B2] mb-6" />
              <p className="text-[#6B5B4D] leading-relaxed text-lg italic mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#E8DED5]"
                />
                <div>
                  <p className="font-medium text-[#3E2D24] text-lg">{t.name}</p>
                  <p className="text-[#A58A76] text-sm">{t.role}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[#8DA287] text-sm font-medium">{t.metric}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
