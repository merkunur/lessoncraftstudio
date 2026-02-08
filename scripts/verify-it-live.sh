#!/bin/bash
SLUGS=(
  "grafomotricita-e-motricita-fine-nella-scuola-dellinfanzia-pregrafismo-ritaglio-e-colorazione"
  "didattica-digitale-integrata-come-unire-tecnologia-e-schede-didattiche-stampabili"
  "didattica-mista-e-integrazione-tecnologica-combinare-schede-digitali-e-cartacee-in-classe"
  "fondamenti-di-matematica-per-la-scuola-dellinfanzia-addizione-sottrazione-sequenze-e-sudoku"
  "pensiero-critico-in-seconda-elementare-cruciverba-crittogrammi-e-puzzle-logici"
  "co-docenza-e-inclusione-strategie-per-creare-materiali-didattici-condivisi"
  "supplenze-scolastiche-come-preparare-piani-di-emergenza-con-schede-didattiche-pronte"
  "la-prima-settimana-di-scuola-costruire-routine-e-aspettative-con-schede-didattiche-efficaci"
  "sudoku-con-immagini-per-bambini-4-8-anni-guida-completa-per-insegnanti"
  "valutazione-formativa-e-monitoraggio-dei-progressi-le-schede-didattiche-per-una-didattica-basata-sui-dati"
)

OK=0
FAIL=0
for slug in "${SLUGS[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/it/blog/$slug")
  title=$(curl -s "http://localhost:3000/it/blog/$slug" | grep -oP '(?<=<title>)[^<]+' | head -1)
  if echo "$title" | grep -qiE 'Gratuito Stampabile|Gratuita Stampabile|Scarica Gratis|Download Free|Free Printable'; then
    status="GARBAGE"
    FAIL=$((FAIL+1))
  else
    status="FRESH"
    OK=$((OK+1))
  fi
  echo "$code | $status | ${slug:0:50}... | $title"
done
echo ""
echo "RESULT: $OK/10 FRESH, $FAIL GARBAGE"
