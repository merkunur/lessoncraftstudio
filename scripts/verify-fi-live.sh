#!/bin/bash
SLUGS=(
  "nolla-paeaellekkaeisyys-algoritmi-ammattimaisten-etsi-ja-loeydae-tehtaevien-luominen"
  "oppiaineiden-integrointi-aihekokonaisuudet-ja-monialaiset-oppimiskokonaisuudet"
  "lukukauden-paeaetoes-merkityksellisesti-tyoearkit-oppimisen-arviointiin-ja-kasvun-juhlistamiseen"
  "s2-opetus-visuaaliset-strategiat-ja-kuvat-kielenoppimisen-tukena"
  "toimintaterapian-tavoitteet-8-hienomotoriikan-harjoitusta"
  "miten-sanansekoitustehtaevaet-nopeuttavat-oikeinkirjoituksen-oppimista"
  "kuvakryptogrammi-innovatiivinen-visuaalinen-salakirjoitus-esikouluikaeisille"
  "luonnontieteiden-sanasto-8-tehtaevaetyyppiae-kaesitteiden-oppimiseen"
  "kaksi-harjoitusmuotoa-yhdessae-prepositiot-taeydennettaevinae-ja-monivalintana"
  "varhaiskasvatus-ja-esiopetus-ikaetasoiset-tehtaevaet-3-6-vuotiaille"
)

OK=0
FAIL=0
for slug in "${SLUGS[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000/fi/blog/$slug")
  title=$(curl -s "http://localhost:3000/fi/blog/$slug" | grep -oP '(?<=<title>)[^<]+' | head -1)
  if echo "$title" | grep -qiE 'Ilmainen Tulostettava|Free Printable|Download Free|Lataa Ilmaiset'; then
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
