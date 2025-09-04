import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { moderateTopic } from "@/lib/moderation";
import { oneInterestingFact } from "@/lib/gemini";
import { z } from "zod";

const Body = z.object({ topic: z.string() });

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => ({}));
  const parse = Body.safeParse(json);
  if (!parse.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const topic = parse.data.topic;

  const mod = moderateTopic(topic);
  if (!mod.allowed) {
    const message = `⚠️ Warning: ${mod.reason}`;
    await prisma.requestLog.create({
      data: {
        userId, topic,
        responseText: message,
        isWarning: true,
        warningReason: mod.reason
      },
    });
    return NextResponse.json({ message }, { status: 200 });
  }

  try {
    const fact = await oneInterestingFact(topic);
    const message = fact || "No fact returned.";
    await prisma.requestLog.create({
      data: { userId, topic, responseText: message, isWarning: false },
    });
    return NextResponse.json({ message }, { status: 200 });
  } catch (e) {
    const message = "⚠️ Warning: Could not fetch a fact right now.";
    await prisma.requestLog.create({
      data: {
        userId, topic,
        responseText: message, isWarning: true, warningReason: "Gemini error"
      },
    });
    return NextResponse.json({ message }, { status: 200 });
  }
}
