import Link from 'next/link';
import { Leaf, Instagram, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  Programs: [
    { label: 'Metabolic Reset', href: '#' },
    { label: 'Sleep Optimization', href: '#' },
    { label: 'Stress Recovery', href: '#' },
    { label: 'Longevity Protocol', href: '#' },
  ],
  Company: [
    { label: 'Our Approach', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Research', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Support: [
    { label: 'Client Portal', href: '/dashboard' },
    { label: 'Book Consultation', href: '#' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-sand-900 text-sand-300">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full bg-sand-600 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-sand-50" />
              </div>
              <span className="font-serif text-xl font-medium text-sand-100 tracking-wide">
                Lumina
              </span>
            </Link>
            <p className="text-sm text-sand-400 leading-relaxed max-w-xs mb-6">
              Precision wellness coaching rooted in longevity science. Designed for women who demand excellence in their metabolic and vitality outcomes.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-sand-800 hover:bg-sand-700 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-sand-800 hover:bg-sand-700 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-sand-800 hover:bg-sand-700 flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sand-200 font-medium text-sm mb-4 tracking-wider uppercase text-xs">
                {category}
              </h4>
              <ul className="space-y-2.5">
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
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-sand-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-sand-500">
            &copy; {new Date().getFullYear()} Lumina Wellness. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-xs text-sand-500 hover:text-sand-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-sand-500 hover:text-sand-300 transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-sand-500 hover:text-sand-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
