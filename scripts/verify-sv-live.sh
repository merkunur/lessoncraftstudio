#!/bin/bash
SLUGS=(
  "klassrumsoevergaangar-och-rutiner-effektivt-floede-med-arbetsbladsbaserade-rutiner"
  "kreativa-bedoemningsmetoder-alternativ-till-traditionella-prov-med-arbetsblad"
  "kompetensutveckling-foer-laerare-praktisk-laerarfortbildning-med-digitala-verktyg"
  "laexor-kontra-klassarbete-hitta-den-balanserade-strategin-med-oevningsblad"
  "aarsskiftesreflektion-strategier-foer-att-fira-elevernas-utveckling-och-laerande"
  "finmotorisk-utveckling-genom-arbetsblad-benbows-sex-grundstreck-foer-skrivberedskap"
  "visuella-laeromedel-foer-specialpedagogik-8-forskningsbaserade-generatorer"
  "visuell-diskriminering-och-perception-frostigs-5-grundlaeggande-faerdigheter-foer-barn"
  "bildsudoku-foer-barn-4-8-aar-komplett-guide-foer-laerare"
  "maximera-undervisningstiden-effektivitetsstrategier-foer-klassrummet"
)

OK=0
FAIL=0
for slug in "${SLUGS[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/sv/blog/$slug")
  title=$(curl -s "http://localhost:3000/sv/blog/$slug" | grep -oP '(?<=<title>)[^<]+' | head -1)
  if echo "$title" | grep -qiE 'Gratis Utskrivbar|Gratis Utskrift|Free Printable|Download Free'; then
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
