"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What areas do you serve?",
    a: "We cater within Metro Manila and nearby areas. Transportation fees may apply depending on the venue location.",
  },
  {
    q: "How much lead time is required?",
    a: "We require a minimum of 36 hours advance notice for all bookings.",
    bold: "36 hours advance notice",
  },
  {
    q: "Is a reservation fee required?",
    a: "Yes. A reservation fee is required to secure your booking date and time slot.",
  },
  {
    q: "Is there a minimum number of guests required?",
    a: "No minimum guest count is required. However, bookings must meet our minimum event value to ensure the station setup is viable.",
  },
  {
    q: "How long is the station service?",
    a: "The Congee & Dimsum Station is available for up to 4 hours during your event.",
    bold: "up to 4 hours",
  },
  {
    q: "What is included in the package?",
    a: "The package includes the station setup, service staff, freshly prepared congee, signature pork meatballs, assorted dimsum, toppings, condiments, and basic serving equipment.",
  },
  {
    q: "Can bookings be accommodated with less than 36 hours' notice?",
    a: "We may accommodate last-minute requests depending on kitchen capacity, staff availability, and ingredient stocks.",
  },
  {
    q: "Why is advance booking required?",
    a: "Our congee is slow-cooked for several hours and our dimsum is prepared fresh to ensure the highest quality. Advance booking allows us to properly source ingredients and prepare for your event.",
  },
  {
    q: "What events do you cater to?",
    a: "We cater birthdays, family gatherings, corporate events, product launches, store openings, and other special occasions.",
  },
];

function highlightBold(text: string, bold?: string) {
  if (!bold) return <>{text}</>;
  const parts = text.split(bold);
  return (
    <>
      {parts[0]}
      <strong className="font-semibold text-charcoal">{bold}</strong>
      {parts[1]}
    </>
  );
}

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faqs" className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 font-inter text-base text-charcoal/60">
            Everything you need to know before booking.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-beige bg-white"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-inter text-sm font-semibold text-charcoal sm:text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-forest transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="border-t border-beige px-6 py-4">
                  <p className="font-inter text-sm leading-relaxed text-charcoal/70">
                    {highlightBold(faq.a, faq.bold)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
