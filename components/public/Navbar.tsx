"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Calendar, UtensilsCrossed } from "lucide-react";

const NAV_LINKS = [
  { label: "Packages", href: "#packages" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "border-b border-beige"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest">
              <UtensilsCrossed className="h-5 w-5 text-gold" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-playfair text-lg font-bold tracking-wide text-charcoal">
                YAO&apos;S KITCHEN
              </span>
              <span className="font-inter text-[9px] font-semibold uppercase tracking-[0.2em] text-forest">
                Premium Wake Catering
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-inter text-sm font-medium text-charcoal hover:text-forest transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-forest transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex">
            <Link
              href="#availability"
              className="flex items-center gap-2 rounded-lg bg-forest px-5 py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Calendar className="h-4 w-4" />
              CHECK AVAILABILITY
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-beige bg-white px-4 pb-6 pt-4">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-inter text-sm font-medium text-charcoal hover:text-forest transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="#availability"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 font-inter text-sm font-semibold text-white"
          >
            <Calendar className="h-4 w-4" />
            CHECK AVAILABILITY
          </Link>
        </div>
      )}
    </header>
  );
}
