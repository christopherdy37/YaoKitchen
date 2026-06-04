import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateBookingRef } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  viber: z.string().optional(),
  email: z.string().optional(),
  eventDate: z.string().min(1, "Event date is required"),
  eventLocation: z.string().min(1, "Event location is required"),
  package: z.string().min(1, "Package selection is required"),
  guestCount: z.coerce.number().int().min(1, "Guest count must be at least 1"),
  notes: z.string().optional(),
  source: z.string().optional(),
  partnerSlug: z.string().nullable().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 },
      );
    }

    const data = result.data;
    const eventDate = new Date(data.eventDate);

    if (isNaN(eventDate.getTime())) {
      return NextResponse.json({ error: "Invalid event date" }, { status: 400 });
    }

    const bookingRef = generateBookingRef(eventDate);

    const inquiry = await prisma.inquiry.create({
      data: {
        bookingRef,
        fullName: data.fullName,
        mobile: data.mobile,
        viber: data.viber || null,
        email: data.email || null,
        eventDate,
        eventLocation: data.eventLocation,
        package: data.package,
        guestCount: data.guestCount,
        notes: data.notes || null,
        source: data.source ?? "website",
        partnerSlug: data.partnerSlug ?? null,
      },
      select: { bookingRef: true },
    });

    return NextResponse.json({ bookingRef: inquiry.bookingRef }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 },
    );
  }
}
