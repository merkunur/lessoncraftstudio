#!/bin/bash
# Translation Files Deployment Script
# Deploys translation files from REFERENCE TRANSLATIONS to frontend/public and standalone

set -e

echo "════════════════════════════════════════════════════════"
echo "📦 Translation Files Deployment"
echo "════════════════════════════════════════════════════════"
echo ""

REF_DIR="REFERENCE TRANSLATIONS"
PUB_DIR="frontend/public/worksheet-generators/js"
STANDALONE_DIR="frontend/.next/standalone/public/worksheet-generators/js"

if [ ! -d "$REF_DIR" ]; then
    echo "❌ ERROR: $REF_DIR not found!"
    exit 1
fi

FILE_COUNT=$(find "$REF_DIR" -name "translations-*.js" -type f | grep -v -E "(backup|original|test|broken)" | wc -l)
echo "📊 Found $FILE_COUNT translation files to deploy"
echo ""

echo "📁 Deploying to frontend/public..."
mkdir -p "$PUB_DIR"
find "$REF_DIR" -name "translations-*.js" -type f | grep -v -E "(backup|original|test|broken)" | while read file; do
    cp "$file" "$PUB_DIR/"
done
echo "   ✅ Deployed to $PUB_DIR"
echo ""

if [ -d "frontend/.next/standalone" ]; then
    echo "📁 Deploying to standalone..."
    mkdir -p "$STANDALONE_DIR"
    find "$REF_DIR" -name "translations-*.js" -type f | grep -v -E "(backup|original|test|broken)" | while read file; do
        cp "$file" "$STANDALONE_DIR/"
    done
    echo "   ✅ Deployed to $STANDALONE_DIR"
else
    echo "ℹ️  Standalone build not found (run npm run build first)"
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ Translation deployment complete!"
echo "════════════════════════════════════════════════════════"
