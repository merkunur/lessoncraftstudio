#!/bin/bash

# LessonCraftStudio Deployment Script
# This script handles the complete deployment process for Next.js standalone mode
#
# CRITICAL: Next.js standalone mode requires manual copying of static files!
# After building, we MUST copy:
# 1. .next/static → .next/standalone/.next/static (CSS, JS, fonts, etc.)
# 2. public → .next/standalone/public (images, static files)
#
# Without these copies, the website will have NO CSS/JavaScript!

set -e  # Exit on any error

echo "=========================================="
echo "LessonCraftStudio Deployment Script"
echo "=========================================="
echo ""

# Navigate to project root
cd /opt/lessoncraftstudio

# 1. Pull latest code
echo "📥 Pulling latest code from repository..."
git pull

# 2. Navigate to frontend
cd frontend

# 3. Build the application
echo ""
echo "🔨 Building Next.js application..."
npm run build

# 4. CRITICAL: Copy static files to standalone directory
echo ""
echo "📂 Copying static files to standalone directory..."
echo "   → Copying .next/static to .next/standalone/.next/static"
cp -r .next/static .next/standalone/.next/static

echo "   → Copying public to .next/standalone/public"
cp -r public .next/standalone/public

# 5. Restart PM2 application
echo ""
echo "🔄 Restarting PM2 application..."
pm2 restart lessoncraftstudio

# 6. Verify application is running
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Application status:"
pm2 status lessoncraftstudio

echo ""
echo "🌐 Website should now be accessible with all CSS/JavaScript working!"
echo ""
