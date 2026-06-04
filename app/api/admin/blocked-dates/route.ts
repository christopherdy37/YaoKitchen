import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const dates = await prisma.blockedDate.findMany({
    orderBy: { blockedDate: "asc" },
  });

  return NextResponse.json(dates);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { date, reason } = await req.json();
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });

  const blocked = await prisma.blockedDate.create({
    data: {
      blockedDate: new Date(date),
      reason: reason ?? null,
    },
  });

  return NextResponse.json(blocked, { status: 201 });
}
