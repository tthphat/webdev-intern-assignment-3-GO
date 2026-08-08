#!/bin/sh
set -e

cd /app/apps/api

echo "Running migrations..."
/app/apps/api/node_modules/.bin/prisma migrate deploy

echo "Seeding database..."
/app/apps/api/node_modules/.bin/tsx prisma/seed.ts

echo "Starting API..."
exec node dist/apps/api/src/main.js