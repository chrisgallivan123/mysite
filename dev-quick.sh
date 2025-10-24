#!/bin/bash

echo "🚀 Quick dev server restart..."

# Kill existing processes
pkill -f "next dev" 2>/dev/null

# Clean cache
rm -rf .next

# Start with minimal overhead
export NEXT_TELEMETRY_DISABLED=1
export NEXT_PRIVATE_DEBUG_CACHE=0

# Start dev server
npm run dev:fast
