#!/bin/bash
# Check what elements have opacity:0 in SSR HTML

echo "=== OPACITY:0 CHECK ==="
echo ""

echo "--- HOMEPAGE ---"
curl -s "http://localhost:3000/en" | grep -oP '[^<]*opacity:\s*0[^.][^>]*>' | head -5
echo ""

echo "--- PRODUCT PAGE ---"
curl -s "http://localhost:3000/en/apps/word-search-worksheets" | grep -oP 'style="[^"]*opacity:\s*0[^"]*"' | head -10
echo ""

echo "--- Check if images are in opacity:0 containers ---"
curl -s "http://localhost:3000/en/apps/word-search-worksheets" | grep -B1 'opacity: 0' | grep -oP '<(img|picture|figure|div)[^>]*' | head -10
echo ""

echo "--- Blog post ---"
path=$(curl -s "http://localhost:3000/en/blog" | grep -oP 'href="/en/blog/[a-z][a-z0-9-]+' | sed 's/href="//' | sort -u | head -1)
curl -s "http://localhost:3000${path}" | grep -oP 'style="[^"]*opacity:\s*0[^"]*"' | head -5
echo ""
