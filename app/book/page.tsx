import { Metadata } from "next";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book an Inquiry — Yao's Kitchen Wake Catering",
  description:
    "Check availability and submit a wake catering inquiry. Select your event date, fill in your details, and receive a booking reference instantly.",
  openGraph: {
    title: "Book an Inquiry — Yao's Kitchen Wake Catering",
    description:
      "Select a date, fill in your details, and get a booking reference in minutes.",
    type: "website",
  },
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="border-b border-charcoal/10 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-playfair text-3xl font-bold text-charcoal lg:text-4xl">
            Book an Inquiry
          </h1>
          <p className="mt-2 font-inter text-sm text-charcoal/60">
            Select a date, share your details, and we&apos;ll confirm via Viber.
          </p>
        </div>
      </div>
      <BookingFlow />
    </main>
  );
}
