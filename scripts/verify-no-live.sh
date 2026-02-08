#!/bin/bash
SLUGS=(
  "fra-konkret-til-abstrakt-slik-laerer-barn-matematikk"
  "hvordan-moenstergjenkjenning-bygger-matematisk-tenkning"
  "topp-10-oppgavegeneratorer-for-laerere-i-1-klasse-6-7-aar"
  "vitenskapen-bak-stavemysterier-hvordan-bokstavmikking-akselererer-staveferdigheter-med-32-ganger"
  "dysleksivennlige-oppgaver-7-verktoey-med-bildestoette-og-fonologisk-trening"
  "selvstendig-arbeidstid-utvikle-elevautonomi-med-arbeidsark"
  "mattegaater-med-symboler-garantert-loesbare-oppgaver-med-unik-valideringsalgoritme"
  "adhd-vennlige-oppgaveark-9-generatorer-som-reduserer-kognitiv-belastning"
  "arbeidsminne-tilpasninger-7-oppgaveark-med-visuell-stoette-for-elever-med-laerevansker"
  "kreative-vurderingsformer-vurdering-uten-tradisjonelle-proever-med-arbeidsark"
)

OK=0
FAIL=0
for slug in "${SLUGS[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/no/blog/$slug")
  title=$(curl -s "http://localhost:3000/no/blog/$slug" | grep -oP '(?<=<title>)[^<]+' | head -1)
  if echo "$title" | grep -qiE 'Gratis Utskriftbar|Gratis Utskrivbar|Free Printable|Download Free'; then
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
