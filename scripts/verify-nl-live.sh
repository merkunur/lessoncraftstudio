#!/bin/bash
SLUGS=(
  "klaslokaal-technologie-naadloze-digitale-integratie-met-printbare-werkbladen"
  "van-concrete-materialen-naar-abstracte-symbolen-de-cra-methode-voor-rekenonderwijs"
  "klassenmanagement-werkbladen-inzetten-voor-overgangen-snelle-leerlingen-gedragsondersteuning"
  "slimme-verdeling-in-werkbladen-waarom-willekeurige-plaatsing-betere-zoekplaatjes-oplevert"
  "fijne-motoriek-kleuters-lijnen-trekken-patroontrein-en-knipoefeningen"
  "maatjesleren-en-peer-tutoring-werkbladen-inzetten-voor-leerling-gestuurde-instructie"
  "printen-of-digitaal-de-juiste-werkbladstrategie-voor-jouw-klas"
  "leerachterstand-voorkomen-tijdens-de-zomervakantie-werkbladpakketten-voor-thuis"
  "visuele-leermiddelen-voor-het-speciaal-onderwijs"
  "data-analyse-voor-instructiebeslissingen-werkbladresultaten-inzetten-voor-beter-onderwijs"
)

OK=0
FAIL=0
for slug in "${SLUGS[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/nl/blog/$slug")
  title=$(curl -s "http://localhost:3000/nl/blog/$slug" | grep -oP '(?<=<title>)[^<]+' | head -1)
  if echo "$title" | grep -qiE 'Gratis Afdrukbaar|Gratis Printbaar|Download Free|Free Printable'; then
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
