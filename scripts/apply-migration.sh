#!/bin/bash

# Apply database migration for WebAuthn and OSINT caching
# Usage: ./scripts/apply-migration.sh

echo "🗄️  Applying database migration..."
echo ""
echo "This will add:"
echo "  - Authenticator table (WebAuthn hardware authentication)"
echo "  - OSINTFeed table (feed metadata and status)"
echo "  - OSINTIndicator table (cached threat intelligence)"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL environment variable is not set"
  echo "Please set DATABASE_URL in your .env file"
  exit 1
fi

# Apply migration directly using psql
echo "Applying migration SQL..."
psql "$DATABASE_URL" -f prisma/migrations/20251106_add_webauthn_and_osint_caching/migration.sql

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Migration applied successfully!"
  echo ""
  echo "Generating Prisma Client..."
  npx prisma generate || PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate

  echo ""
  echo "✅ Database is ready!"
else
  echo ""
  echo "❌ Migration failed. Please check the error above."
  exit 1
fi
