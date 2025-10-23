#!/bin/bash

# Kill any existing Next.js processes
pkill -f "next dev" 2>/dev/null || true

# Clear Next.js cache
rm -rf .next

# Set development optimizations
export NEXT_TELEMETRY_DISABLED=1
export NEXT_PRIVATE_DEBUG_CACHE=0
export NEXT_PRIVATE_SKIP_SIZE_LIMITS=1
export NEXT_PRIVATE_TURBO=1
export NEXT_PRIVATE_OPTIMIZE_PACKAGE_IMPORTS=1
export NODE_OPTIONS="--max-old-space-size=4096"

# Start development server with optimizations
echo "🚀 Starting optimized Next.js development server..."
npm run dev:fast
