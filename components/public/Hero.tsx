import Image from "next/image";
import { UtensilsCrossed, Users, Shield } from "lucide-react";

const TRUST_BADGES = [
  { icon: UtensilsCrossed, title: "Quality Food", sub: "Made with care" },
  { icon: Users, title: "Complete Setup", sub: "We handle everything" },
  { icon: Shield, title: "Trusted by Families", sub: "Across Metro Manila" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[460px] overflow-hidden bg-cream lg:min-h-[560px]">
      {/* Full-bleed background image — lg+ only */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/MEGA_MAY _26_BARTER_YAO_S KITCHEN-L12.jpg"
          alt="Yao's Kitchen catering spread"
          fill
          className="object-cover object-right"
          priority
        />
        {/* Cream gradient fading left → transparent, revealing image on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream from-[40%] via-cream/80 to-transparent" />
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex min-h-[460px] max-w-lg flex-col justify-center py-10 lg:min-h-[560px]">
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
        <div className="mt-10 flex flex-wrap gap-6">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige">
                <badge.icon className="h-5 w-5 text-forest" />
              </div>
              <div className="flex flex-col leading-snug">
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
      </div>
    </section>
  );
}
