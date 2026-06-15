import Link from "next/link";
import { UtensilsCrossed, Phone, Mail, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Packages", href: "#packages" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const viberNumber = process.env.NEXT_PUBLIC_VIBER_NUMBER ?? "09XX XXX XXXX";
  const viberClean = viberNumber.replace(/\D/g, "");

  return (
    <footer className="border-t border-white/15 bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <UtensilsCrossed className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-playfair text-base font-bold tracking-wide">
                  YAO&apos;S KITCHEN
                </span>
                <span className="font-inter text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Premium Wake Catering
                </span>
              </div>
            </div>
            <p className="mt-4 font-inter text-sm leading-relaxed text-white/60">
              Thoughtful food. Handled with care.
            </p>
          </div>

          {/* Col 2 — Contact */}
          <div>
            <h4 className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-white/50">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 font-inter text-sm text-white/80">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                Viber: {viberNumber}
              </li>
              <li className="flex items-center gap-2.5 font-inter text-sm text-white/80">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                yaoskitchenph@gmail.com
              </li>
              <li className="flex items-center gap-2.5 font-inter text-sm text-white/80">
                <MapPin className="h-4 w-4 shrink-0 text-gold" />
                Quezon City, Metro Manila
              </li>
            </ul>
          </div>

          {/* Col 3 — Quick Links */}
          <div>
            <h4 className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-white/50">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Follow Us */}
          <div>
            <h4 className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-white/50">
              Follow Us
            </h4>
            <Link
              href="#"
              className="flex items-center gap-2 font-inter text-sm text-white/80 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Link>
            <Link
              href={`https://viber.me/${viberClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7360F2] transition-opacity hover:opacity-90"
              aria-label="Message us on Viber"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                <path d="M11.4 0C6.37.06 2.12 2.6.63 7.2c-.67 2.06-.63 4.22-.63 6.34 0 1.98-.07 5.34 1.86 7.82 1.27 1.63 3.16 2.65 5.13 2.92v2.22c0 .38.44.57.72.32l2.88-2.54h.82c2.53.01 5.07-.58 6.93-2.36 2.1-2 2.62-4.87 2.62-7.37v-.12C20.96 7.96 19.2 2.44 13.82.3 13.08.04 12.25-.01 11.4 0zm-.1 1.54h.1c4.47.03 7.68 3.44 8.44 7.77.1.51.14 1.04.14 1.57v.1c0 2.3-.48 4.67-2.2 6.2-1.52 1.38-3.65 1.89-5.72 1.9h-1.04c-.2 0-.4.08-.54.22l-2.24 1.97v-1.69c0-.38-.28-.68-.66-.72-1.8-.22-3.5-1.1-4.57-2.47-1.63-2.1-1.58-5.1-1.58-7.04v-.3c0-1.96-.05-3.97.5-5.82 1.22-3.87 4.62-5.69 9.37-5.69zm2.4 3.85c-.25 0-.5.1-.7.28-.3.27-.36.72-.08.96l.47.41c.56.5.75.5.75 2.33 0 .43.35.8.78.8s.78-.37.78-.8c0-2.43-.48-3.22-1.06-3.72a1.2 1.2 0 0 0-.94-.26zm-4.78.86c-.97 0-1.94.39-2.58 1.15-.48.57-.65 1.33-.62 2.1.05 1.54.78 3.17 1.87 4.28.43.44.9.88 1.42 1.25.95.68 1.96 1.16 3.04 1.32.35.05.72.03 1.02-.15.28-.17.47-.46.5-.77l.16-1.2c.06-.43-.2-.85-.6-.97l-1.55-.47c-.37-.11-.75.04-.95.38l-.36.6-.04.02c-.7-.3-1.27-.82-1.7-1.41-.36-.5-.63-1.05-.75-1.65l.03-.03.6-.36c.33-.2.47-.6.35-.96l-.45-1.55c-.12-.4-.5-.66-.92-.66h-.47zm4.74.85c-.43 0-.78.35-.78.8 0 .43.35.78.78.78.47 0 .86.4.86.86 0 .43.35.78.78.78s.78-.35.78-.78c0-1.34-1.08-2.44-2.42-2.44z" />
              </svg>
            </Link>
            <p className="mt-3 font-inter text-xs text-white/50">
              We respond within 5–10 minutes via Viber.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-center font-inter text-xs text-white/40">
          © 2024 Yao&apos;s Kitchen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
