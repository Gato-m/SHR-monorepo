#!/usr/bin/env bash
set -e

echo "🩺 Verifying monorepo health..."

# Check dependency mismatches
npx syncpack list-mismatches

# Optional: check unused/missing deps
# npx depcheck

# Try building the whole workspace
pnpm -w build

echo "✅ Monorepo fully recovered."
