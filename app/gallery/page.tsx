import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery — Yao's Kitchen Wake Catering",
  description:
    "Browse photos of our wake catering setups — congee stations, dimsum selections, and full event arrangements across Metro Manila.",
  openGraph: {
    title: "Gallery — Yao's Kitchen Wake Catering",
    description:
      "See our setups in action: congee stations, dimsum spreads, and elegant event arrangements.",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <main>
      <section className="bg-cream px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
            Our Work
          </h1>
          <p className="mt-4 font-inter text-base leading-relaxed text-charcoal/65">
            A glimpse of the setups and spreads we&apos;ve delivered for
            families across Metro Manila.
          </p>
        </div>
      </section>
      <GalleryClient />
    </main>
  );
}
