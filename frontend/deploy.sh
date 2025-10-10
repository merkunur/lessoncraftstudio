#!/bin/bash
# Production deployment script for LessonCraftStudio

set -e  # Exit on error

echo "🚀 Starting deployment to production..."

# Navigate to project directory
cd /opt/lessoncraftstudio/frontend

# Pull latest code
echo "📥 Pulling latest code..."
git pull

# Clear Next.js cache
echo "🧹 Clearing build cache..."
rm -rf .next

# Install dependencies (in case package.json changed)
echo "📦 Installing dependencies..."
npm install

# Run Prisma generate
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️  Building application..."
npm run build

# Restart the service
echo "🔄 Restarting service..."
systemctl restart lessoncraftstudio

# Check service status
echo "✅ Checking service status..."
systemctl status lessoncraftstudio --no-pager

echo "🎉 Deployment complete!"
