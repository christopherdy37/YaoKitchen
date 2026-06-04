import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { inquiries: true } } },
  });

  return NextResponse.json(partners);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug, location } = await req.json();

  if (!name || !slug) {
    return NextResponse.json({ error: "name and slug required" }, { status: 400 });
  }

  const partner = await prisma.partner.create({
    data: { name, slug, location: location ?? null },
  });

  return NextResponse.json(partner, { status: 201 });
}
