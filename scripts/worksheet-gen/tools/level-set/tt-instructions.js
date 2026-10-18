/**
 * tt-instructions.js — Multiplication Tables Level Set (2026-10-13): the PRINTED level instructions and the on-screen
 * instruction. Applied by tools/level-set/apply-tt-instructions.js into i18n/level-instructions.json (per face, per
 * level) and i18n/interactive-instructions.json "multiplication-tables".
 *  - anchors (level 1 of a table face): ×1, ×5, ×10 are already worked — "write each product" alone would be false
 *  - missing (level 3 of every face): the box holds a factor on some cards — the published "write each product" is false
 *  - screen: every level (a level-1 screen shows the worked facts as rows; the child taps the others)
 */
'use strict';
const TABLE_FACES = ['G3-364', 'G3-365', 'G3-366', 'G3-367', 'G3-368', 'G3-402', 'G3-403', 'G3-404', 'G3-405'];
module.exports = {
  TABLE_FACES,
  anchors: {
    en: 'Some products are already written. Multiply and write the other products in the boxes.',
    de: 'Einige Ergebnisse stehen schon da. Rechne die anderen Malaufgaben und schreibe die Ergebnisse in die Kästchen.',
    es: 'Algunos resultados ya están escritos. Resuelve las demás multiplicaciones y escribe los resultados en los recuadros.',
    fr: 'Certains résultats sont déjà écrits. Calcule les autres multiplications et écris les résultats dans les cases.',
    it: 'Alcuni risultati sono già scritti. Risolvi le altre moltiplicazioni e scrivi i risultati nei riquadri.',
    pt: 'Alguns resultados já estão escritos. Faça as outras multiplicações e escreva os resultados nos quadradinhos.',
    nl: 'Een paar antwoorden staan er al. Reken de andere keersommen uit en schrijf de antwoorden in de vakjes.',
    sv: 'Några produkter är redan ifyllda. Räkna ut de andra uppgifterna och skriv produkterna i rutorna.',
    da: 'Nogle resultater er allerede skrevet. Regn de andre gangestykker ud, og skriv resultaterne i kasserne.',
    no: 'Noen svar står der allerede. Regn ut de andre gangestykkene, og skriv svarene i rutene.',
    fi: 'Osa vastauksista on jo valmiina. Laske muut kertolaskut ja kirjoita vastaukset laatikoihin.',
  },
  missing: {
    en: 'Which number is missing? Work out each multiplication and write the missing number in the box.',
    de: 'Welche Zahl fehlt? Rechne jede Malaufgabe und schreibe die fehlende Zahl in das Kästchen.',
    es: '¿Qué número falta? Resuelve cada multiplicación y escribe el número que falta en el recuadro.',
    fr: 'Quel nombre manque ? Calcule chaque multiplication et écris le nombre manquant dans la case.',
    it: 'Quale numero manca? Risolvi ogni moltiplicazione e scrivi il numero mancante nel riquadro.',
    pt: 'Que número está faltando? Resolva cada multiplicação e escreva o número que falta no quadradinho.',
    nl: 'Welk getal ontbreekt? Reken elke keersom uit en schrijf het ontbrekende getal in het vakje.',
    sv: 'Vilket tal saknas? Räkna ut varje uppgift och skriv talet som saknas i rutan.',
    da: 'Hvilket tal mangler? Regn hvert gangestykke ud, og skriv det manglende tal i kassen.',
    no: 'Hvilket tall mangler? Regn ut hvert gangestykke, og skriv tallet som mangler i ruten.',
    fi: 'Mikä luku puuttuu? Laske jokainen kertolasku ja kirjoita puuttuva luku laatikkoon.',
  },
  screen: {
    screen: {
      en: 'Multiply. Tap the missing number.',
      de: 'Rechne jede Malaufgabe. Tippe die fehlende Zahl an.',
      es: 'Resuelve cada multiplicación. Toca el número que falta.',
      fr: 'Calcule chaque multiplication. Touche le nombre manquant.',
      it: 'Risolvi ogni moltiplicazione e tocca il numero mancante.',
      pt: 'Resolva cada multiplicação e toque no número que falta.',
      nl: 'Reken elke keersom uit. Tik op het getal dat ontbreekt.',
      sv: 'Räkna ut varje uppgift. Tryck på talet som saknas.',
      da: 'Regn hvert gangestykke ud, og tryk på det manglende tal.',
      no: 'Regn ut hvert gangestykke. Trykk på tallet som mangler.',
      fi: 'Laske jokainen kertolasku ja napauta puuttuvaa lukua.',
    },
  },
};
