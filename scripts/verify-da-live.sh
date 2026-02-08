#!/bin/bash
SLUGS=(
  "avanceret-differentiering-saadan-haandterer-du-klasser-med-elever-paa-mange-forskellige-niveauer"
  "kreative-evalueringsmetoder-alternativer-til-traditionelle-proever-med-arbejdsark"
  "naermeste-udviklingszone-i-praksis-saadan-tilpasser-du-arbejdsark-til-hver-elevs-niveau"
  "symbolsk-algebra-til-boern-garanteret-loesbare-matematik-gaader-med-unik-validerings-algoritme"
  "begavede-boern-8-udfordrende-opgavegeneratorer"
  "ophavsret-i-undervisningen-lovlig-brug-af-arbejdsark-og-undervisningsmaterialer"
  "dataanalyse-til-undervisningsbeslutninger-brug-opgaveark-resultater-til-at-styre-undervisningen"
  "samundervisning-ressourcerum-effektive-strategier-til-arbejdsarkplanlaegning"
  "overgange-og-procedurer-saadan-opretholder-du-flow-i-klassevaerelset-med-arbejdsark"
  "social-emotionel-laering-saadan-integrerer-du-elevtrivsel-i-faglige-arbejdsark"
)

OK=0
FAIL=0
for slug in "${SLUGS[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/da/blog/$slug")
  title=$(curl -s "http://localhost:3000/da/blog/$slug" | grep -oP '(?<=<title>)[^<]+' | head -1)
  if echo "$title" | grep -qiE 'Gratis Printbar|Gratis Udskrivbar|Free Printable|Download Free'; then
    status="GARBAGE"
    FAIL=$((FAIL+1))
  else
    status="FRESH"
    OK=$((OK+1))
  fi
  echo "$code | $status | ${slug:0:55}... | $title"
done
echo ""
echo "RESULT: $OK/10 FRESH, $FAIL GARBAGE"
