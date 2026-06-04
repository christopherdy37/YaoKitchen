import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session.adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? undefined;
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const pkg = searchParams.get("package") ?? undefined;

  const inquiries = await prisma.inquiry.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(pkg ? { package: pkg } : {}),
      ...(dateFrom || dateTo
        ? {
            eventDate: {
              ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
              ...(dateTo ? { lte: new Date(dateTo) } : {}),
            },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(inquiries);
}
