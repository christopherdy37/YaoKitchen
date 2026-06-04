import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const partner = await prisma.partner.findUnique({ where: { slug } });

  if (!partner || !partner.active) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(partner);
}
