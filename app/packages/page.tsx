import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Packages — Yao's Kitchen Wake Catering",
  description:
    "Explore our wake catering packages — Basic, Standard, and Premium. Complete setup, fresh congee, and dimsum for families across Metro Manila.",
  openGraph: {
    title: "Packages — Yao's Kitchen Wake Catering",
    description:
      "Three flexible packages for every gathering size. Contact us for pricing.",
    type: "website",
  },
};

const PACKAGES = [
  {
    seed: "pkg-basic",
    name: "Basic Package",
    capacity: "50–80 guests",
    tag: null,
    inclusions: [
      "Congee station (1 flavor)",
      "3 dimsum varieties",
      "Setup & takedown",
      "Serving utensils & warming equipment",
      "2 service staff",
      "3-hour service window",
    ],
  },
  {
    seed: "pkg-standard",
    name: "Standard Package",
    capacity: "80–120 guests",
    tag: "Most Booked",
    inclusions: [
      "Congee station (2 flavors)",
      "5 dimsum varieties",
      "Noodle station",
      "Setup & takedown",
      "Serving utensils & warming equipment",
      "4 service staff",
      "5-hour service window",
      "Complimentary table centerpiece",
    ],
  },
  {
    seed: "pkg-premium",
    name: "Premium Package",
    capacity: "120–200 guests",
    tag: "Full Service",
    inclusions: [
      "Congee station (3 flavors)",
      "7 dimsum varieties",
      "Noodle station",
      "Pastry & bread selection",
      "Setup & takedown",
      "Serving utensils & warming equipment",
      "6 service staff",
      "8-hour service window",
      "Complimentary table centerpiece",
      "Dedicated event coordinator",
    ],
  },
];

export default function PackagesPage() {
  return (
    <main>
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
            Our Packages
          </h1>
          <p className="mt-4 font-inter text-base leading-relaxed text-charcoal/65">
            Every package includes fresh congee, steamed dimsum, and complete
            event setup — so your family can focus on honoring your loved one.
          </p>
        </div>
      </section>

      <section className="bg-beige px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.seed}
                className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                {pkg.tag && (
                  <div className="absolute right-4 top-4 z-10 rounded-full bg-gold px-3 py-1 font-inter text-xs font-semibold text-white">
                    {pkg.tag}
                  </div>
                )}

                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${pkg.seed}/800/600`}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="font-inter text-xs font-semibold uppercase tracking-wider text-white/80">
                      {pkg.capacity}
                    </p>
                    <h2 className="font-playfair text-2xl font-bold text-white">
                      {pkg.name}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <ul className="flex-1 space-y-2.5">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                        <span className="font-inter text-sm text-charcoal/80">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl bg-beige p-4 text-center">
                    <p className="font-inter text-xs text-charcoal/60">
                      Pricing available upon inquiry
                    </p>
                    <p className="mt-0.5 font-playfair text-lg font-bold text-charcoal">
                      Contact us for pricing
                    </p>
                  </div>

                  <Link
                    href="/#availability"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Check Availability
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-playfair text-3xl font-bold text-charcoal">
            Not sure which package fits your needs?
          </h2>
          <p className="mt-3 font-inter text-base text-charcoal/65">
            Our team is happy to walk you through your options and customize a
            package around your event. Reach out — we respond quickly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center rounded-full bg-forest px-6 py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Book an Inquiry
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-forest px-6 py-2.5 font-inter text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
