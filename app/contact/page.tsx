import { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Yao's Kitchen Wake Catering",
  description:
    "Get in touch with Yao's Kitchen. Chat on Viber, call, or email us to inquire about wake catering availability across Metro Manila.",
  openGraph: {
    title: "Contact Us — Yao's Kitchen Wake Catering",
    description:
      "Reach out via Viber, phone, or email. We respond quickly and serve with care.",
    type: "website",
  },
};

export default function ContactPage() {
  const viberNumber = process.env.NEXT_PUBLIC_VIBER_NUMBER ?? "";
  const viberClean = viberNumber.replace(/\D/g, "");

  return (
    <main>
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-playfair text-4xl font-bold text-charcoal lg:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 font-inter text-base leading-relaxed text-charcoal/65">
            We respond quickly — usually within a few hours. Reach out through
            any of the channels below and we&apos;ll get back to you right away.
          </p>
        </div>
      </section>

      <section className="bg-beige px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left — contact info */}
            <div className="flex flex-col gap-6">
              {/* Viber CTA */}
              <div className="rounded-2xl bg-[#7360F2] p-8 text-white">
                <MessageCircle className="h-8 w-8" />
                <h2 className="mt-3 font-playfair text-2xl font-bold">
                  Chat on Viber
                </h2>
                <p className="mt-2 font-inter text-sm leading-relaxed text-white/80">
                  The fastest way to reach us. Send us a message on Viber and
                  we&apos;ll reply promptly — even late evenings.
                </p>
                <Link
                  href={`https://viber.me/${viberClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-inter text-sm font-semibold text-[#7360F2] transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Open Viber
                </Link>
              </div>

              {/* Phone & Email */}
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="font-playfair text-xl font-bold text-charcoal">
                  Other Ways to Reach Us
                </h2>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10">
                      <Phone className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                        Phone / Viber
                      </p>
                      <p className="mt-0.5 font-inter text-base font-semibold text-charcoal">
                        {viberNumber || "+63 912 345 6789"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10">
                      <Mail className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                        Email
                      </p>
                      <a
                        href="mailto:hello@yaoskitchen.com"
                        className="mt-0.5 block font-inter text-base font-semibold text-charcoal hover:underline"
                      >
                        hello@yaoskitchen.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10">
                      <MapPin className="h-5 w-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                        Service Area
                      </p>
                      <p className="mt-0.5 font-inter text-base font-semibold text-charcoal">
                        Metro Manila &amp; nearby areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="font-playfair text-xl font-bold text-charcoal">
                  Follow Us
                </h2>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="https://facebook.com/yaoskitchen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 font-inter text-sm font-semibold text-charcoal transition-colors hover:bg-beige"
                  >
                    <svg
                      className="h-4 w-4 fill-[#1877F2]"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                    Facebook
                  </Link>
                  <Link
                    href="https://instagram.com/yaoskitchen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 font-inter text-sm font-semibold text-charcoal transition-colors hover:bg-beige"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <rect width="24" height="24" rx="5" fill="url(#ig-grad)" />
                      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="white" />
                    </svg>
                    Instagram
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — Map + book CTA */}
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="p-6">
                  <h2 className="font-playfair text-xl font-bold text-charcoal">
                    Where We Operate
                  </h2>
                  <p className="mt-1 font-inter text-sm text-charcoal/60">
                    We serve families across Metro Manila and nearby provinces.
                  </p>
                </div>
                <div className="relative h-96 w-full overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247374.75396764!2d120.87908485!3d14.5547285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca03571ec38b%3A0x69d1d9185a3b35ab!2sMetro%20Manila!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Yao's Kitchen service area — Metro Manila"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-forest p-8 text-white">
                <h2 className="font-playfair text-2xl font-bold">
                  Ready to Book?
                </h2>
                <p className="mt-2 font-inter text-sm leading-relaxed text-white/75">
                  Fill out a quick inquiry form and we&apos;ll confirm your
                  availability within the day.
                </p>
                <Link
                  href="/book"
                  className="mt-5 inline-flex items-center rounded-full bg-gold px-6 py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Book an Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
