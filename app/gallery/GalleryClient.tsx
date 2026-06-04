"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Category = "all" | "congee" | "dimsum" | "event";

const GALLERY_IMAGES = [
  { seed: "g-congee1", alt: "Congee station setup", category: "congee" as const },
  { seed: "g-dimsum1", alt: "Steamed dimsum selection", category: "dimsum" as const },
  { seed: "g-event1", alt: "Full event arrangement", category: "event" as const },
  { seed: "g-congee2", alt: "Congee being served", category: "congee" as const },
  { seed: "g-dimsum2", alt: "Fried dimsum platter", category: "dimsum" as const },
  { seed: "g-event2", alt: "Table centerpiece setup", category: "event" as const },
  { seed: "g-congee3", alt: "Premium congee station", category: "congee" as const },
  { seed: "g-dimsum3", alt: "Bamboo steamer baskets", category: "dimsum" as const },
  { seed: "g-event3", alt: "Nighttime wake setup", category: "event" as const },
  { seed: "g-congee4", alt: "Congee toppings bar", category: "congee" as const },
  { seed: "g-dimsum4", alt: "Mixed dimsum spread", category: "dimsum" as const },
  { seed: "g-event4", alt: "Banquet hall arrangement", category: "event" as const },
];

const FILTERS: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Congee Station", value: "congee" },
  { label: "Dimsum", value: "dimsum" },
  { label: "Event Setups", value: "event" },
];

export default function GalleryClient() {
  const [active, setActive] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered =
    active === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === active);

  const slides = filtered.map((img) => ({
    src: `https://picsum.photos/seed/${img.seed}/1200/900`,
  }));

  return (
    <section className="bg-cream px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
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
            </button>
          ))}
        </div>

        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 lg:gap-4">
          {filtered.map((img, i) => (
            <button
              key={img.seed}
              onClick={() => setLightboxIndex(i)}
              className="group mb-3 block w-full overflow-hidden rounded-xl lg:mb-4"
            >
              <div className="relative w-full overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${img.seed}/600/800`}
                  alt={img.alt}
                  width={600}
                  height={800}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
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
