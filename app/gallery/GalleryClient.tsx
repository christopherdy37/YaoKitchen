"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Category = "all" | "food" | "setup" | "service";

const ALL_IMAGES: { src: string; alt: string; category: Category }[] = [
  // Setup shots
  { src: "/images/event-full-setup-lamps.jpg",       alt: "Full catering station with arching lamps",        category: "setup" },
  { src: "/images/event-station-white-flowers.jpg",  alt: "Elegant station setup with white flowers",        category: "setup" },
  { src: "/images/full-station-lamps-red.jpg",       alt: "Full station with arching lamps on red backdrop", category: "setup" },
  { src: "/images/full-station-setup-red.jpg",       alt: "Full catering station on red backdrop",           category: "setup" },
  { src: "/images/elegant-station-flowers.jpg",      alt: "Elegant full station with flowers",               category: "setup" },
  { src: "/images/station-flowers-overhead.jpg",     alt: "Station setup with flowers and QR sign",          category: "setup" },
  { src: "/images/toppings-condiments-rack.jpg",     alt: "Toppings and condiments rack",                    category: "setup" },
  { src: "/images/dimsum-plus-counter-wide.jpg",     alt: "DimsumPlus counter wide shot",                    category: "setup" },
  { src: "/images/dimsum-congee-signs.jpg",          alt: "Dimsum and Congee Station signs on counter",      category: "setup" },
  // Food close-ups
  { src: "/images/overhead-congee-dimsum.jpg",       alt: "Overhead view of congee and dimsum",              category: "food" },
  { src: "/images/overhead-congee-bowl.jpg",         alt: "Overhead congee bowl with dimsum",                category: "food" },
  { src: "/images/two-congee-cups.jpg",              alt: "Two Yao's Kitchen branded congee cups",           category: "food" },
  { src: "/images/cup-dimsum-pedestal.jpg",          alt: "Branded cup and dimsum on pedestal",              category: "food" },
  { src: "/images/congee-cup-closeup.jpg",           alt: "Yao's Kitchen congee cup close-up",               category: "food" },
  { src: "/images/congee-sign-candle.jpg",           alt: "Congee Station sign with candlelight",            category: "food" },
  // Service in action
  { src: "/images/staff-smiling-station.jpg",        alt: "Staff smiling at the catering station",           category: "service" },
  { src: "/images/staff-serving-event.jpg",          alt: "Staff serving guests at event",                   category: "service" },
  { src: "/images/chef-serving-congee.jpg",          alt: "Chef serving congee at live station",             category: "service" },
  { src: "/images/signage-flowers-closeup.jpg",      alt: "Book your event signage with flowers",            category: "service" },
];

const FILTERS: { label: string; value: Category }[] = [
  { label: "All Photos", value: "all" },
  { label: "Station Setups", value: "setup" },
  { label: "Food Close-ups", value: "food" },
  { label: "Service in Action", value: "service" },
];

export default function GalleryClient() {
  const [active, setActive] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = active === "all" ? ALL_IMAGES : ALL_IMAGES.filter((img) => img.category === active);
  const slides = filtered.map((img) => ({ src: img.src, alt: img.alt }));

  return (
    <section className="bg-cream px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Filter pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`rounded-full px-5 py-2 font-inter text-sm font-semibold transition-colors ${
                active === f.value
                  ? "bg-forest text-white"
                  : "bg-white text-charcoal hover:bg-beige"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 font-normal ${active === f.value ? "text-white/70" : "text-charcoal/40"}`}>
                ({f.value === "all"
                  ? ALL_IMAGES.length
                  : ALL_IMAGES.filter((i) => i.category === f.value).length})
              </span>
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 lg:gap-4">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setLightboxIndex(i)}
              className="group mb-3 block w-full overflow-hidden rounded-xl lg:mb-4"
            >
              <div className="relative w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={800}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/25" />
              </div>
            </button>
          ))}
        </div>

        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={slides}
        />
      </div>
    </section>
  );
}
