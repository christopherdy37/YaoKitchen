import { Metadata } from "next";
import Hero from "@/components/public/Hero";
import AvailabilityBar from "@/components/public/AvailabilityBar";
import PackagesPreview from "@/components/public/PackagesPreview";
import HowItWorks from "@/components/public/HowItWorks";
import GalleryPreview from "@/components/public/GalleryPreview";
import FAQs from "@/components/public/FAQs";

export const metadata: Metadata = {
  title: "Yao's Kitchen — Wake Catering in Metro Manila",
  description:
    "Premium wake catering with complete setup, fresh congee, and a curated dimsum selection. Serving families across Metro Manila with dignity and warmth.",
  openGraph: {
    title: "Yao's Kitchen — Wake Catering in Metro Manila",
    description:
      "Complete wake catering — congee station, dimsum selection, full setup. Trusted by families across Metro Manila.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AvailabilityBar />
      <PackagesPreview />
      <HowItWorks />
      <GalleryPreview />
      <FAQs />
    </>
  );
}
