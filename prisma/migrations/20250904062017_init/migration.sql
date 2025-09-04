-- CreateTable
CREATE TABLE "public"."RequestLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "responseText" TEXT NOT NULL,
    "isWarning" BOOLEAN NOT NULL DEFAULT false,
    "warningReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RequestLog_userId_createdAt_idx" ON "public"."RequestLog"("userId", "createdAt");
