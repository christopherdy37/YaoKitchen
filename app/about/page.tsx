import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Shield, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Yao's Kitchen Wake Catering",
  description:
    "Learn the story behind Yao's Kitchen — a family-run wake catering service built on compassion, quality food, and dignified service across Metro Manila.",
  openGraph: {
    title: "About Us — Yao's Kitchen Wake Catering",
    description:
      "Family-run wake catering built on compassion and quality. Serving Metro Manila families since day one.",
    type: "website",
  },
};

const VALUES = [
  {
    icon: Heart,
    title: "Compassion First",
    desc: "We understand that our clients are grieving. Every interaction — from inquiry to takedown — is handled with patience, sensitivity, and genuine care.",
  },
  {
    icon: Shield,
    title: "Uncompromising Quality",
    desc: "We use only fresh ingredients prepared on-site. No shortcuts. Your guests deserve food that honors your loved one.",
  },
  {
    icon: Clock,
    title: "Always Punctual",
    desc: "We arrive well before guests do, set up completely, and stay until the last serving is done. You will never have to chase us down.",
  },
  {
    icon: Users,
    title: "Family-Run Service",
    desc: "Yao's Kitchen is a small, tight-knit team. You work directly with the people who will serve your family — not a faceless operation.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-charcoal px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://picsum.photos/seed/about-hero/1400/600"
            alt="Yao's Kitchen team at work"
            fill
            className="object-cover opacity-20"
            unoptimized
          />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-inter text-sm font-semibold uppercase tracking-widest text-gold">
            Our Story
          </p>
          <h1 className="mt-3 font-playfair text-4xl font-bold text-white lg:text-5xl">
            Food as an Act of Love
          </h1>
          <p className="mt-5 font-inter text-base leading-relaxed text-white/75">
            Yao&apos;s Kitchen was born from a simple belief: that even in the
            hardest moments, a warm bowl of congee and a table full of food can
            bring people together. We started serving wake gatherings across
            Metro Manila with one mission — to let families grieve without
            worrying about what to feed their guests.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-charcoal lg:text-4xl">
                How We Started
              </h2>
              <div className="mt-5 space-y-4 font-inter text-base leading-relaxed text-charcoal/70">
                <p>
                  It started with a neighbor&apos;s wake. The family was
                  overwhelmed — relatives flying in, children to look after,
                  logistics to manage. No one had time to think about food, and
                  yet food is what keeps people around, keeps conversation
                  going, keeps the room warm when grief makes it cold.
                </p>
                <p>
                  Yao stepped in with pots of congee and trays of dimsum. By
                  the end of the night, the family thanked her not just for the
                  food — but for the relief of not having to think about it.
                  That was the moment Yao&apos;s Kitchen was born.
                </p>
                <p>
                  Today we serve families all across Metro Manila — Quezon City,
                  Marikina, Parañaque, Pasig, and beyond. Our team has grown,
                  but our approach has stayed the same: show up early, cook
                  fresh, serve with heart, and leave the space better than we
                  found it.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://picsum.photos/seed/about-story/800/600"
                alt="Fresh congee being prepared"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-beige px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
              What We Stand For
            </h2>
            <p className="mt-3 font-inter text-base text-charcoal/60">
              The principles that guide every event we serve.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10">
                  <v.icon className="h-6 w-6 text-forest" />
                </div>
                <h3 className="mt-4 font-playfair text-lg font-bold text-charcoal">
                  {v.title}
                </h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-charcoal/65">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://picsum.photos/seed/about-why/800/600"
                alt="Event setup by Yao's Kitchen"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h2 className="font-playfair text-3xl font-bold text-charcoal lg:text-4xl">
                Why Families Choose Us
              </h2>
              <div className="mt-5 space-y-4 font-inter text-base leading-relaxed text-charcoal/70">
                <p>
                  Unlike restaurant catering or generic food packages, we
                  specialize exclusively in wake gatherings. We understand the
                  rhythm of a wake — the late arrivals, the extended hours, the
                  quiet moments between visitors. Our service is built around
                  that rhythm.
                </p>
                <p>
                  Our congee is slow-cooked on-site, not pre-packed and
                  reheated. Our dimsum is steamed fresh in batches so it&apos;s
                  never sitting out too long. Our staff is trained to blend into
                  the background — helpful when needed, respectful always.
                </p>
                <p>
                  We also handle everything: tables, warming equipment, serving
                  utensils, and cleanup. You don&apos;t rent anything, source
                  anything, or coordinate anything. One call, and it&apos;s
                  taken care of.
                </p>
              </div>
              <Link
                href="/packages"
                className="mt-8 inline-flex items-center rounded-full bg-forest px-6 py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                View Our Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-beige px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
              Meet the Team
            </h2>
            <p className="mt-3 font-inter text-base text-charcoal/60">
              The people behind every setup, every serving, every warm bowl.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { seed: "team1", name: "Yao", role: "Founder & Head Cook" },
              { seed: "team2", name: "Carlo", role: "Operations Lead" },
              { seed: "team3", name: "Grace", role: "Client Relations" },
            ].map((member) => (
              <div
                key={member.seed}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${member.seed}/400/400`}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-playfair text-xl font-bold text-charcoal">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-inter text-sm text-charcoal/60">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
