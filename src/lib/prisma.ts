import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["warn", "error"],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Test database connection
export async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

// Initialize connection on startup
testDatabaseConnection();
