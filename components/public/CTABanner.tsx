import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-forest px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-playfair text-4xl font-bold text-white lg:text-5xl">
          Ready to Plan Your Gathering?
        </h2>
        <p className="mt-4 font-inter text-base leading-relaxed text-white/75">
          Let us take care of the food and setup so your family can focus on
          what truly matters. Reach out today — we respond quickly and serve
          with care.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book an Inquiry <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center rounded-full border border-white/40 px-8 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
