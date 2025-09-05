import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const logs = await prisma.requestLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id: true, topic: true, responseText: true, isWarning: true, createdAt: true },
  });

  return NextResponse.json({ logs });
}