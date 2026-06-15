import Image from "next/image";
import Link from "next/link";
import { UtensilsCrossed, ChefHat, Crown } from "lucide-react";

const PACKAGES = [
  {
    name: "Basic Package",
    subtitle: "Ideal for small gatherings",
    pax: "50 – 80 pax",
    icon: UtensilsCrossed,
    photo: "/images/two-congee-cups.jpg",
    mostBooked: false,
    inclusions: [
      "Congee station",
      "Selected dimsum",
      "Staff and setup",
      "Complete utensils",
    ],
  },
  {
    name: "Standard Package",
    subtitle: "Ideal for medium gatherings",
    pax: "80 – 120 pax",
    icon: ChefHat,
    photo: "/images/overhead-congee-bowl.jpg",
    mostBooked: true,
    inclusions: [
      "Full congee + dimsum selection",
      "Extended service time",
      "Additional staff",
      "Complete setup and utensils",
    ],
  },
  {
    name: "Premium Package",
    subtitle: "Ideal for large gatherings",
    pax: "120 – 200 pax",
    icon: Crown,
    photo: "/images/elegant-station-flowers.jpg",
    mostBooked: false,
    inclusions: [
      "Full menu selection",
      "Priority setup",
      "Maximum staff support",
      "Complete premium setup",
    ],
  },
];

export default function PackagesPreview() {
  return (
    <section id="packages" className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
            Our Packages
          </h2>
          <p className="mt-3 font-inter text-base text-charcoal/60">
            Three curated packages to suit different gathering sizes.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {pkg.mostBooked && (
                <div className="absolute left-0 top-5 z-10">
                  <span className="bg-forest px-4 py-1 font-inter text-[10px] font-bold uppercase tracking-widest text-white">
                    Most Booked
                  </span>
                </div>
              )}

              <div className="relative h-48 w-full">
                <Image
                  src={pkg.photo}
                  alt={pkg.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="relative -mt-6 mb-2 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest ring-4 ring-white">
                  <pkg.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-1">
                <h3 className="text-center font-playfair text-xl font-bold text-charcoal">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-center font-inter text-sm text-charcoal/60">
                  {pkg.subtitle}
                </p>

                <div className="mt-3 flex justify-center">
                  <span className="rounded-full bg-beige px-4 py-1 font-inter text-xs font-medium text-charcoal/70">
                    Good for: {pkg.pax}
                  </span>
                </div>

                <div className="mt-5 flex-1">
                  <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                    Inclusions:
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.inclusions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 font-inter text-sm text-charcoal/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#availability"
                  className="mt-6 block rounded-lg bg-forest py-3 text-center font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  CHECK AVAILABILITY
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-inter text-xs text-charcoal/50">
          Packages typically vary based on guest count and requirements.
        </p>
      </div>
    </section>
  );
}
