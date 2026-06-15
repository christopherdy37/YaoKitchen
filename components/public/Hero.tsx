import Image from "next/image";
import { UtensilsCrossed, Users, Shield } from "lucide-react";

const TRUST_BADGES = [
  { icon: UtensilsCrossed, title: "Quality Food", sub: "Made with care" },
  { icon: Users, title: "Complete Setup", sub: "We handle everything" },
  { icon: Shield, title: "Trusted by Families", sub: "Across Metro Manila" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[460px] overflow-hidden bg-cream lg:min-h-[580px]">

      {/* Left image panel */}
      <div className="absolute inset-y-0 left-0 hidden w-[36%] lg:block">
        <Image
          src="/images/congee-cup-closeup.jpg"
          alt="Yao's Kitchen branded congee cup"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/50 to-cream" />
      </div>

      {/* Right image panel */}
      <div className="absolute inset-y-0 right-0 hidden w-[36%] lg:block">
        <Image
          src="/images/full-station-lamps-red.jpg"
          alt="Yao's Kitchen catering station"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cream/50 to-cream" />
      </div>

      {/* Center text content */}
      <div className="relative z-10 mx-auto flex min-h-[460px] w-full max-w-2xl flex-col items-center justify-center px-6 py-10 text-center lg:min-h-[580px]">
        <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Premium Wake Catering
        </p>
        <h1 className="font-playfair text-4xl font-bold leading-tight text-charcoal sm:text-5xl lg:text-[52px]">
          Thoughtful Food.
          <br />
          Handled with Care.
        </h1>
        <p className="mt-5 max-w-md font-inter text-base leading-relaxed text-charcoal/70">
          Premium wake catering services with complete setup, attentive service,
          and dishes your guests will appreciate.
        </p>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige">
                <badge.icon className="h-5 w-5 text-forest" />
              </div>
              <div className="flex flex-col leading-snug text-left">
                <span className="font-inter text-sm font-semibold text-charcoal">
                  {badge.title}
                </span>
                <span className="font-inter text-xs text-charcoal/60">
                  {badge.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
