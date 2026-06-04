import { Settings, UtensilsCrossed, Star, Heart } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Settings,
    title: "Premium Setup",
    desc: "We arrive early, set up every detail, and leave nothing to chance — so your family can focus on what matters.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fresh Congee",
    desc: "Rich, slow-cooked congee prepared fresh on-site with premium ingredients, served warm throughout the event.",
  },
  {
    icon: Star,
    title: "Dimsum Station",
    desc: "A curated selection of steamed and fried dimsum, replenished continuously to keep guests satisfied.",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    desc: "Our team treats every family with compassion and respect, adapting to your needs throughout the gathering.",
  },
];

export default function ServiceHighlights() {
  return (
    <section className="bg-beige px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
            What We Bring to Every Wake
          </h2>
          <p className="mt-3 font-inter text-base text-charcoal/60">
            Complete catering that lets your family grieve with comfort.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10">
                <item.icon className="h-6 w-6 text-forest" />
              </div>
              <h3 className="mt-4 font-playfair text-lg font-bold text-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-charcoal/65">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
