#!/bin/bash
# Verify keyword→product auto-links are contextually relevant

echo "=== KEYWORD → PRODUCT LINK QUALITY ==="
echo ""

# Check several blog posts for auto-linked keywords
POSTS=(
  "/en/blog/addition-worksheets-from-counting-to-carrying-a-complete-k-3-progression-guide"
  "/en/blog/word-search-puzzles-more-than-just-fun-the-cognitive-science-behind-letter-scanning"
  "/en/blog/coloring-activities-that-teach-color-theory-fine-motor-skills-and-pattern-recognition"
  "/de/blog/33-editierbare-arbeitsblatt-generatoren-fuer-die-grundschule"
  "/fr/blog/33-generateurs-de-fiches-pedagogiques-modifiables-pour-enseignants"
)

for path in "${POSTS[@]}"; do
  html=$(curl -s "http://localhost:3000${path}")
  slug=$(echo "$path" | rev | cut -d/ -f1 | rev)
  locale=$(echo "$path" | cut -d/ -f2)

  # Extract auto-linked product references
  auto_links=$(echo "$html" | grep -oP "<a[^>]+href=\"/${locale}/apps/([^\"]+)\"[^>]*>([^<]+)" | head -5)

  echo "[$locale] ${slug:0:50}..."
  if [ -z "$auto_links" ]; then
    echo "  No inline auto-links found"
  else
    echo "$auto_links" | while read -r link; do
      app=$(echo "$link" | grep -oP "apps/[a-z0-9-]+" | sed 's/apps\///')
      text=$(echo "$link" | grep -oP '>[^<]+$' | sed 's/>//')
      echo "  → $app (anchor: \"$text\")"
    done
  fi
  echo ""
done
