import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateBookingRef } from "@/lib/utils";
import { sendInquiryConfirmation } from "@/lib/email";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  viber: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  eventDate: z.string().min(1, "Event date is required"),
  eventStartTime: z.string().min(1, "Event start time is required"),
  eventLocation: z.string().min(1, "Venue is required"),
  package: z.string().optional(),
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
        email: data.email,
        eventDate,
        eventStartTime: data.eventStartTime,
        eventLocation: data.eventLocation,
        package: data.package ?? "TBD",
        guestCount: data.guestCount,
        notes: data.notes || null,
        source: data.source ?? "website",
        partnerSlug: data.partnerSlug ?? null,
      },
      select: {
        bookingRef: true,
        fullName: true,
        mobile: true,
        email: true,
        eventDate: true,
        eventStartTime: true,
        eventLocation: true,
        guestCount: true,
        notes: true,
      },
    });

    // Non-blocking — email failure won't break the response
    sendInquiryConfirmation({
      bookingRef: inquiry.bookingRef,
      fullName: inquiry.fullName,
      mobile: inquiry.mobile,
      email: inquiry.email,
      eventDate: inquiry.eventDate,
      eventStartTime: inquiry.eventStartTime,
      eventLocation: inquiry.eventLocation,
      guestCount: inquiry.guestCount,
      notes: inquiry.notes,
    }).catch((err) => console.error("Email send failed:", err));

    return NextResponse.json({ bookingRef: inquiry.bookingRef }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 },
    );
  }
}
