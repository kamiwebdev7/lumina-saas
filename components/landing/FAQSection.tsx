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
    question: "What is Capacity Lab OS?",
    answer:
      "Capacity Lab OS is a premium wellness coaching experience designed to support structured recovery, accountability, lifestyle guidance, and long-term wellness education through one centralized platform.",
  },
  {
    question: "Is this a medical or healthcare platform?",
    answer:
      "No. The platform is intended for educational wellness support, guided lifestyle practices, and coaching experiences. It is not designed to diagnose, treat, or replace medical care.",
  },
  {
    question: "What does the platform include?",
    answer:
      "The experience includes onboarding flows, guided wellness check-ins, protocol organization, progress tracking, scheduling support, and personalized educational resources.",
  },
  {
    question: "Who is this designed for?",
    answer:
      "Capacity Lab OS is designed for individuals seeking a more structured, premium, and supportive wellness coaching experience focused on recovery, routines, and long-term consistency.",
  },
  {
    question: "How are wellness journeys personalized?",
    answer:
      "Programs are adapted around coaching goals, lifestyle preferences, routines, and client accountability needs to create a more guided and intentional experience.",
  },
  {
    question: "Is the platform currently public?",
    answer:
      "The platform is currently being refined through early access onboarding and limited beta-style rollout experiences.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-[#FCFAF8] via-[#F9F5F1] to-[#F5EFEA]"
    >
      {/* Background blur */}
      <div className="absolute top-20 left-[-120px] w-[300px] h-[300px] rounded-full bg-[#EFE6DD] blur-3xl opacity-60" />

      <div className="relative max-w-3xl mx-auto px-5 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="text-center mb-14 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.35em] text-[#B89B84] font-medium mb-5"
          >
            Frequently Asked
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-light text-[#3E2D24] leading-[1.15]"
          >
            Questions about the
            <br />
            <em className="font-light">platform experience</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-[#8C7566] text-[15px] lg:text-lg leading-relaxed max-w-2xl mx-auto mt-6"
          >
            A guided wellness experience focused on structure,
            accountability, recovery support, and elevated client journeys.
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-[1.5rem] border border-[#E8DED5] bg-white/85 backdrop-blur-md px-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 data-[state=open]:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <AccordionTrigger className="py-6 text-left text-[15px] lg:text-base font-medium text-[#4C3A30] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="pb-6 text-[14px] lg:text-[15px] text-[#8C7566] leading-relaxed">
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