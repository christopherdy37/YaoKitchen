import { notFound } from "next/navigation";
import { Metadata } from "next";
import InquiryFlow from "@/components/InquiryFlow";
import { UtensilsCrossed } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  active: boolean;
}

async function getPartner(slug: string): Promise<Partner | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/partners/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const partner = await getPartner(slug);
  if (!partner) return { title: "Not Found" };
  return {
    title: `Yao's Kitchen — Exclusive Service for ${partner.name} Families`,
    description: `Premium wake catering service for families of ${partner.name}. Complete setup, fresh congee, curated dimsum selection.`,
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = await getPartner(slug);

  if (!partner) notFound();

  return (
    <div className="min-h-screen bg-cream">
      {/* Partner hero banner */}
      <div className="border-b border-beige bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest">
              <UtensilsCrossed className="h-6 w-6 text-gold" />
            </div>
          </div>
          <p className="font-inter text-xs font-semibold uppercase tracking-widest text-forest/70 mb-2">
            Exclusive Partner Service
          </p>
          <h1 className="font-playfair text-3xl font-bold text-charcoal sm:text-4xl">
            Exclusive Service for{" "}
            <span className="text-forest">{partner.name}</span> Families
          </h1>
          <p className="mt-3 font-inter text-sm leading-relaxed text-charcoal/60 max-w-md mx-auto">
            Premium wake catering with complete setup, fresh congee, and a curated dimsum selection — arranged especially for {partner.name} families.
          </p>
          {partner.location && (
            <p className="mt-2 font-inter text-xs text-charcoal/40">{partner.location}</p>
          )}
        </div>
      </div>

      {/* Booking form */}
      <InquiryFlow source="partner" partnerSlug={slug} />
    </div>
  );
}
