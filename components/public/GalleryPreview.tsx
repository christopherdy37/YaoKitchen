import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Best 5 for homepage preview — wide feature + 4 squares
const PREVIEW = [
  { src: "/images/event-full-setup-lamps.jpg",   alt: "Full catering station with arching lamps", label: "Full Setup",       feature: true },
  { src: "/images/overhead-congee-dimsum.jpg",   alt: "Overhead congee and dimsum",               label: "The Spread",      feature: false },
  { src: "/images/toppings-condiments-rack.jpg", alt: "Toppings and condiments bar",              label: "Toppings Bar",    feature: false },
  { src: "/images/staff-smiling-station.jpg",    alt: "Staff at the catering station",            label: "Our Team",        feature: false },
  { src: "/images/congee-sign-candle.jpg",       alt: "Congee Station sign with candlelight",     label: "Congee Station",  feature: false },
];

export default function GalleryPreview() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              Our Work
            </p>
            <h2 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
              See It in Action
            </h2>
            <p className="mt-2 font-inter text-base text-charcoal/60">
              A glimpse of the setups we&apos;ve delivered across Metro Manila.
            </p>
          </div>
          <Link
            href="/gallery"
            className="hidden items-center gap-1.5 font-inter text-sm font-semibold text-forest hover:underline sm:flex"
          >
            View all photos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bento: [feature wide] [square] / [square] [square] [square] */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
          {PREVIEW.map((img, i) => (
            <Link
              key={img.src}
              href="/gallery"
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 lg:col-span-2" : "col-span-1"
              }`}
            >
              <div className={`relative w-full overflow-hidden ${i === 0 ? "aspect-video" : "aspect-square"}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"}
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/35" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-inter text-xs font-semibold text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {img.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/gallery"
            className="flex items-center gap-1.5 font-inter text-sm font-semibold text-forest hover:underline"
          >
            View all photos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
