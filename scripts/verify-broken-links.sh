#!/bin/bash
# Broader broken link check — sample links from multiple page types

echo "=== BROKEN LINK CHECK ==="
echo ""

OK=0
BROKEN=0
BROKEN_LIST=""

# Collect links from various pages
PAGES=(
  "http://localhost:3000/en"
  "http://localhost:3000/en/blog"
  "http://localhost:3000/en/apps"
  "http://localhost:3000/en/pricing"
  "http://localhost:3000/de"
  "http://localhost:3000/fr/blog"
)

for page in "${PAGES[@]}"; do
  links=$(curl -s "$page" | grep -oP 'href="(/[a-z]{2}/[^"#?]+)' | sed 's/href="//' | sort -u)
  for link in $links; do
    # Skip external links, anchors, static assets
    if echo "$link" | grep -qP '\.(js|css|png|jpg|webp|svg|ico)$'; then continue; fi
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${link}")
    if [ "$code" = "200" ] || [ "$code" = "304" ]; then
      OK=$((OK+1))
    elif [ "$code" = "301" ] || [ "$code" = "307" ] || [ "$code" = "308" ]; then
      # Redirects are OK for SEO
      OK=$((OK+1))
    else
      BROKEN=$((BROKEN+1))
      BROKEN_LIST="${BROKEN_LIST}\n  ${code}: ${link} (from ${page})"
    fi
  done
done

TOTAL=$((OK+BROKEN))
echo "Checked: $TOTAL links"
echo "OK: $OK"
echo "Broken: $BROKEN"
if [ -n "$BROKEN_LIST" ]; then
  echo -e "\nBroken links:${BROKEN_LIST}"
fi
