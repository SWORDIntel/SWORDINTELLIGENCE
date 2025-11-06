-- CreateTable: Authenticator (WebAuthn/FIDO2 Hardware Authentication)
CREATE TABLE "Authenticator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "credentialID" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "credentialDeviceType" TEXT,
    "credentialBackedUp" BOOLEAN NOT NULL DEFAULT false,
    "transports" TEXT[],
    "authenticatorType" TEXT NOT NULL,
    "name" TEXT,
    "aaguid" TEXT,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("id")
);

-- CreateTable: OSINTFeed (OSINT Feed Metadata & Status)
CREATE TABLE "OSINTFeed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "lastFetchedAt" TIMESTAMP(3),
    "lastSuccessAt" TIMESTAMP(3),
    "lastErrorAt" TIMESTAMP(3),
    "lastErrorMessage" TEXT,
    "fetchCount" INTEGER NOT NULL DEFAULT 0,
    "indicatorCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OSINTFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable: OSINTIndicator (Cached Threat Intelligence Indicators)
CREATE TABLE "OSINTIndicator" (
    "id" TEXT NOT NULL,
    "feedId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "confidence" INTEGER NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "metadata" JSONB,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "OSINTIndicator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: Authenticator
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");
CREATE INDEX "Authenticator_userId_idx" ON "Authenticator"("userId");
CREATE INDEX "Authenticator_credentialID_idx" ON "Authenticator"("credentialID");
CREATE INDEX "Authenticator_authenticatorType_idx" ON "Authenticator"("authenticatorType");

-- CreateIndex: OSINTFeed
CREATE INDEX "OSINTFeed_category_idx" ON "OSINTFeed"("category");
CREATE INDEX "OSINTFeed_enabled_idx" ON "OSINTFeed"("enabled");
CREATE INDEX "OSINTFeed_lastFetchedAt_idx" ON "OSINTFeed"("lastFetchedAt");

-- CreateIndex: OSINTIndicator
CREATE UNIQUE INDEX "OSINTIndicator_feedId_type_value_key" ON "OSINTIndicator"("feedId", "type", "value");
CREATE INDEX "OSINTIndicator_feedId_idx" ON "OSINTIndicator"("feedId");
CREATE INDEX "OSINTIndicator_type_idx" ON "OSINTIndicator"("type");
CREATE INDEX "OSINTIndicator_value_idx" ON "OSINTIndicator"("value");
CREATE INDEX "OSINTIndicator_severity_idx" ON "OSINTIndicator"("severity");
CREATE INDEX "OSINTIndicator_confidence_idx" ON "OSINTIndicator"("confidence");
CREATE INDEX "OSINTIndicator_lastSeenAt_idx" ON "OSINTIndicator"("lastSeenAt");
CREATE INDEX "OSINTIndicator_expiresAt_idx" ON "OSINTIndicator"("expiresAt");

-- AddForeignKey: Authenticator -> User
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: OSINTIndicator -> OSINTFeed
ALTER TABLE "OSINTIndicator" ADD CONSTRAINT "OSINTIndicator_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "OSINTFeed"("id") ON DELETE CASCADE ON UPDATE CASCADE;
