"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Approach", href: "#approach" },
  { label: "Programs", href: "#programs" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
         scrolled
  ? "bg-[#F8F2EC]/85 backdrop-blur-2xl border-b border-[#E7DCCF] shadow-[0_10px_40px_rgba(111,78,55,0.08)]"
  : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-[72px]">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-full bg-[#6F4E37] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <Leaf className="w-3.5 h-3.5 text-white" />
              </div>

              <span className="font-serif text-[22px] tracking-wide text-[#5E4232]">
                Capacity Lab OS
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#6B5B4D] hover:text-[#3E2D24] transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* DESKTOP CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="rounded-full px-5 text-[#6B5B4D] hover:bg-[#F5EFEA]"
                >
                  Client Portal
                </Button>
              </Link>

              <Link href="#contact">
                <Button className="rounded-full px-6 bg-[#6F4E37] hover:bg-[#5E4232] text-white shadow-md hover:shadow-xl transition-all duration-300">
                  Book Consultation
                </Button>
              </Link>
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#7A553D] to-[#5E4232] text-white shadow-[0_6px_18px_rgba(111,78,55,0.18)] transition-all duration-300"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* PANEL */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="fixed top-3 left-3 right-3 z-50 rounded-[2rem] border border-[#E7DCCF] bg-[#FCF8F4]/95 backdrop-blur-2xl shadow-[0_30px_80px_rgba(62,45,36,0.18)] overflow-hidden lg:hidden"
            >
              {/* TOP BAR */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F3ECE5]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#6F4E37] flex items-center justify-center">
                    <Leaf className="w-3.5 h-3.5 text-white" />
                  </div>

                  <span className="font-serif text-lg text-[#5E4232]">
                    Capacity Lab OS
                  </span>
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#7A553D] to-[#5E4232] text-white shadow-[0_8px_24px_rgba(111,78,55,0.22)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* NAVIGATION */}
              <div className="px-5 py-4 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[15px] font-medium text-[#5E4B3C] py-4 border-b border-[#EFE4D8] transition-all duration-300 hover:text-[#2E211B] hover:pl-1"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* CTA */}
                <div className="flex flex-col gap-3 pt-5">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11 rounded-full border border-[#E7DCCF] bg-[#FAF6F2] text-[#6B5B4D] hover:bg-[#F3ECE5] shadow-sm"
                    >
                      Client Portal
                    </Button>
                  </Link>

                  <Link href="#contact" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full h-11 rounded-full bg-gradient-to-r from-[#7A553D] to-[#5E4232] hover:opacity-95 text-white shadow-[0_10px_24px_rgba(111,78,55,0.28)]">
                      Book Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}