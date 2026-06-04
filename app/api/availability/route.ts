import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rows = await prisma.blockedDate.findMany({
      select: { blockedDate: true },
      orderBy: { blockedDate: "asc" },
    });
    return NextResponse.json(rows.map((r) => r.blockedDate.toISOString()));
  } catch {
    return NextResponse.json(
      { error: "Failed to load availability" },
      { status: 500 },
    );
  }
}
