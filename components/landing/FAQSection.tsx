"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is Lumina different from other wellness programs?",
    answer:
      "Lumina is built on precision health science, not generic advice. Every protocol is tailored to your biomarkers, lifestyle, and goals. You work 1:1 with a specialist coach, and your plan evolves as your health does.",
  },
  {
    question: "What results can I expect, and how quickly?",
    answer:
      "Most clients notice improved sleep quality and energy within 2–3 weeks. Significant metabolic changes and body composition shifts typically emerge within 6–8 weeks of consistent protocol adherence.",
  },
  {
    question: "Do I need to do lab work or have biomarkers tested?",
    answer:
      "We recommend foundational bloodwork for the most personalized results, but it is not required to start. We can build an effective initial protocol from your health history, lifestyle data, and symptom patterns.",
  },
  {
    question: "How much time does the program require daily?",
    answer:
      "Our protocols are designed for busy, high-performing women. Most daily practices take 20–45 minutes total, woven intelligently into your existing routine — not added on top of it.",
  },
  {
    question: "Is this suitable if I have existing health conditions?",
    answer:
      "Yes. All coaches hold advanced certifications in functional medicine and work within appropriate scope. We collaborate with your medical team when relevant and always prioritize safety.",
  },
  {
    question: "What does the client portal include?",
    answer:
      "Your portal includes your personalized protocol library, daily wellness tracking, energy and sleep analytics, direct messaging with your coach, consultation scheduling, and detailed progress reports.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="faq"
      className="py-10 lg:py-24 bg-gradient-to-b from-[#FCFAF8] to-[#F5EFEA]"
    >
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[#B89B84] font-medium mb-4"
          >
            Frequently Asked
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl font-light text-[#3E2D24] text-balance"
          >
            Your questions,
            <br />
            <em>answered honestly</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8C7566] text-lg leading-relaxed max-w-2xl mx-auto mt-6"
          >
            Most clients begin noticing measurable improvements in energy, sleep
            quality, and recovery consistency within the first 2–3 weeks.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-sand-200 rounded-2xl px-6 shadow-soft data-[state=open]:shadow-card transition-shadow"
              >
                <AccordionTrigger className="text-left text-sm font-medium text-sand-800 hover:no-underline py-5 hover:text-sand-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#B89B84] leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
