import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { moderateTopic } from "@/lib/moderation";
import { oneInterestingFact } from "@/lib/gemini";
import { z } from "zod";

const Body = z.object({ topic: z.string() });

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json().catch(() => ({}));
    const parse = Body.safeParse(json);
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const topic = parse.data.topic.trim();

    // Step 1: Moderate the input
    const mod = moderateTopic(topic);
    if (!mod.allowed) {
      const message = `⚠️ Warning: ${mod.reason}`;

      // Log inappropriate input to database
      await prisma.requestLog.create({
        data: {
          userId,
          topic,
          responseText: message,
          isWarning: true,
          warningReason: mod.reason
        },
      });

      return NextResponse.json({ message }, { status: 200 });
    }

    // Step 2: Get a fact from Gemini API
    try {
      const fact = await oneInterestingFact(topic);
      const message = fact || "No fact could be generated at this time.";

      // Log successful response to database
      await prisma.requestLog.create({
        data: {
          userId,
          topic,
          responseText: message,
          isWarning: false
        },
      });

      return NextResponse.json({ message }, { status: 200 });

    } catch (error) {
      console.error("Error generating fact:", error);

      const message = "⚠️ Warning: Could not generate a fact right now. Please try again later.";

      // Log the error to database
      await prisma.requestLog.create({
        data: {
          userId,
          topic,
          responseText: message,
          isWarning: true,
          warningReason: "Gemini API error"
        },
      });

      return NextResponse.json({ message }, { status: 200 });
    }

  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
