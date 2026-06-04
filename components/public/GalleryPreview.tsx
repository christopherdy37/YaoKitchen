import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PREVIEW_IMAGES = [
  { seed: "gallery1", label: "Congee Station" },
  { seed: "gallery2", label: "Dimsum Selection" },
  { seed: "gallery3", label: "Event Setup" },
  { seed: "gallery4", label: "Table Arrangement" },
];

export default function GalleryPreview() {
  return (
    <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
              Our Work
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

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {PREVIEW_IMAGES.map((img) => (
            <Link
              key={img.seed}
              href="/gallery"
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${img.seed}/600/600`}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/30" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-inter text-xs font-semibold text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
