#!/bin/bash
SLUGS=(
  "your-complete-yearly-planning-guide-12-month-worksheet-strategy"
  "peer-tutoring-student-teaching-leveraging-worksheets-for-student-led-learning"
  "visual-spatial-skills-development-7-worksheets-for-stem-foundation"
  "smart-cell-detection-in-grid-drawing-how-pixel-analysis-prevents-blank-clue-cells"
  "33-editable-worksheet-generators-every-elementary-teacher-needs"
)

for slug in "${SLUGS[@]}"; do
  url="https://www.lessoncraftstudio.com/en/blog/${slug}"
  echo "=== ${slug} ==="
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "  HTTP Status: ${status}"
  # Get canonical and lang from HTML
  html=$(curl -s "$url" | head -100)
  canonical=$(echo "$html" | grep -oP 'rel="canonical"[^>]*href="[^"]*"' | head -1)
  lang=$(echo "$html" | grep -oP '<html[^>]*lang="[^"]*"' | head -1)
  echo "  ${lang}"
  echo "  ${canonical}"
  echo
done
