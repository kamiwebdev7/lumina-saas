import Link from "next/link";
import {
  Leaf,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

const footerLinks = {
  Framework: [
    {
      label: "Recovery Support",
      href: "#",
    },
    {
      label: "Sleep & Routines",
      href: "#",
    },
    {
      label: "Stress Regulation",
      href: "#",
    },
    {
      label: "Wellness Education",
      href: "#",
    },
  ],

  Experience: [
    {
      label: "Client Journey",
      href: "#",
    },
    {
      label: "Progress Tracking",
      href: "#",
    },
    {
      label: "Guided Accountability",
      href: "#",
    },
    {
      label: "Early Access",
      href: "#",
    },
  ],

  Support: [
    {
      label: "Capacity State Check",
      href: "/dashboard",
    },
    {
      label: "Apply for Founding Round",
      href: "#contact",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#2B1D16] text-sand-300">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-8">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-5"
            >
              <div className="w-8 h-8 rounded-full bg-[#6F4E37] flex items-center justify-center shadow-md">
                <Leaf className="w-4 h-4 text-sand-50" />
              </div>

              <span className="font-serif text-xl font-medium text-sand-100 tracking-wide">
                Capacity Lab OS
              </span>
            </Link>

            <p className="text-sm text-sand-400 leading-relaxed max-w-sm mb-6">
              A premium wellness coaching experience designed around guided
              recovery, accountability, routines, and structured client
              journeys.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#3A2A22] hover:bg-[#4B3326] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#3A2A22] hover:bg-[#4B3326] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#3A2A22] hover:bg-[#4B3326] flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(
            ([category, links]) => (
              <div key={category}>
                <h4 className="text-sand-200 font-medium text-xs mb-4 tracking-[0.2em] uppercase">
                  {category}
                </h4>

                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-sand-400 hover:text-sand-200 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>

        {/* DISCLAIMER */}
        <div className="border-t border-[#3A2A22] pt-6 pb-6">
          <p className="text-xs text-sand-500 leading-relaxed max-w-3xl">
            Capacity Lab OS provides educational wellness support and guided
            lifestyle experiences only. This platform is not intended for
            medical diagnosis, treatment, healthcare services, or clinical
            advice.
          </p>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#3A2A22] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-sand-500">
            &copy; {new Date().getFullYear()} Capacity Lab OS. All rights
            reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="#"
              className="text-xs text-sand-500 hover:text-sand-300 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="text-xs text-sand-500 hover:text-sand-300 transition-colors"
            >
              Terms
            </Link>

            <Link
              href="#"
              className="text-xs text-sand-500 hover:text-sand-300 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}