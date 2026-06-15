"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Info } from "lucide-react";

export default function AvailabilityBar() {
  const router = useRouter();
  const [date, setDate] = useState("");

  function handleCheck() {
    if (date) {
      router.push(`/book?date=${date}`);
    } else {
      router.push("/book");
    }
  }

  return (
    <section id="availability" className="bg-forest px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Check Availability
        </p>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-4">
          {/* Event Date */}
          <div className="flex-1">
            <label className="mb-1.5 block font-inter text-xs font-medium text-white/80">
              Event Date
            </label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/50" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg bg-white py-3 pl-10 pr-4 font-inter text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>

          {/* Number of Guests */}
          <div className="flex-1">
            <label className="mb-1.5 block font-inter text-xs font-medium text-white/80">
              Number of Guests
            </label>
            <div className="relative">
              <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/50" />
              <select className="w-full appearance-none rounded-lg bg-white py-3 pl-10 pr-4 font-inter text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold">
                <option value="">Select guests</option>
                <option>50 – 80 guests</option>
                <option>80 – 120 guests</option>
                <option>120 – 200 guests</option>
              </select>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleCheck}
            className="shrink-0 rounded-lg bg-gold px-8 py-3 font-inter text-sm font-bold text-white transition-opacity hover:opacity-90 lg:self-end"
          >
            CHECK AVAILABILITY
          </button>
        </div>

        <p className="mt-4 flex items-center gap-1.5 font-inter text-xs text-white/60">
          <Info className="h-3.5 w-3.5 shrink-0" />
          We require at least 24 hours lead time for all bookings.
        </p>
      </div>
    </section>
  );
}
