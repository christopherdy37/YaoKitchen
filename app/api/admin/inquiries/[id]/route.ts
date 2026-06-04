import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session.adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { status, adminNotes } = body;

  const updated = await prisma.inquiry.update({
    where: { id },
    data: {
      ...(status !== undefined ? { status } : {}),
      ...(adminNotes !== undefined ? { adminNotes } : {}),
    },
  });

  return NextResponse.json(updated);
}
