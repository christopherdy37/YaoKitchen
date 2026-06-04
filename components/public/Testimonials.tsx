import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Maria Santos",
    location: "Quezon City",
    quote:
      "Yao's Kitchen made an incredibly difficult time just a little easier. The congee was warm, the dimsum was plentiful, and the staff treated our family with so much respect. Our guests kept complimenting the food.",
    stars: 5,
  },
  {
    name: "Roberto dela Cruz",
    location: "Parañaque",
    quote:
      "From setup to takedown, everything was handled professionally. We didn't have to worry about a single thing. The team arrived early and left the space spotless. I highly recommend them to any family in need.",
    stars: 5,
  },
  {
    name: "Lourdes Reyes",
    location: "Marikina",
    quote:
      "We hired Yao's Kitchen for my father's wake and it was the best decision we made. The food was fresh and replenished throughout the night. The setup looked beautiful and dignified. Thank you so much.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
            What Families Say
          </h2>
          <p className="mt-3 font-inter text-base text-charcoal/60">
            Words from the families we&apos;ve been honored to serve.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-sm"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 font-inter text-sm leading-relaxed text-charcoal/75">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-charcoal/10 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10">
                  <span className="font-inter text-sm font-bold text-forest">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-inter text-sm font-semibold text-charcoal">
                    {t.name}
                  </p>
                  <p className="font-inter text-xs text-charcoal/50">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
