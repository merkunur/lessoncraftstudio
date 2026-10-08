#!/usr/bin/env node
/**
 * apply-hcp-review.js — the native + pedagogical review of the Hundreds Chart Puzzles Level Set (2026-10-09), applied
 * AFTER apply-hcp-instructions.js. Printed instructions and printed headings (printTitle — the SEO title is never
 * touched) in i18n/strings.<loc>.json; screen strings in BOTH i18n/interactive-instructions.json and
 * tools/level-set/hcp-instructions.js. Every edit names its OLD text: a string that no longer matches is refused
 * (idempotent). Rejected on checking: the fr heading "de 0 à 99" is right (fr's exemplar chart IS 0-99; the review saw
 * English samples only).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');

// [face, locale, field, old, new]
const PRINTED = [
  // nl: the compound is one word — or the plain genitive
  ['G1-310', 'nl', 'printTitle', 'Honderdveld puzzelstukken: vul de getallen in', 'Puzzelstukken van het honderdveld: vul de getallen in'],
  // fi: "ylle" = over / onto; the chart's positions are "yläpuolelle / alapuolelle"
  ['G1-310', 'fi', 'instruction', 'Jokaisessa palassa on yksi luku. Kirjoita puuttuvat luvut: oikealle 1 enemmän, vasemmalle 1 vähemmän, alle 10 enemmän, ylle 10 vähemmän.',
    'Jokaisessa palassa on yksi luku. Kirjoita puuttuvat luvut: oikealle 1 enemmän, vasemmalle 1 vähemmän, alapuolelle 10 enemmän, yläpuolelle 10 vähemmän.'],
  // sv: "ifrån" needs its object
  ['G2-323', 'sv', 'printTitle', 'Hur långt ifrån? Räkna hoppen i hundrarutan', 'Hur långt ifrån varandra? Räkna hoppen i hundrarutan'],
  // da: the arrows are definite; the chart is named
  ['G2-322', 'da', 'instruction', 'Følg begge pile. De peger på det samme felt på tavlen. Skriv det hemmelige tal.', 'Følg begge pilene. De peger på det samme felt på hundredtavlen. Skriv det hemmelige tal.'],
  // fr: an arrow MOVES up / down ("vers le haut"), "en haut" is where something is
  // (the printed string keeps its no-break space before the colon, French typography)
  ['G2-321', 'fr', 'instruction', 'Pars du nombre et suis les flèches : en haut 10 de moins, en bas 10 de plus, à droite 1 de plus, à gauche 1 de moins. Écris où tu arrives.',
    'Pars du nombre et suis les flèches : vers le haut 10 de moins, vers le bas 10 de plus, vers la droite 1 de plus, vers la gauche 1 de moins. Écris où tu arrives.'],
];
// [screen key, locale, old, new]
const SCREEN = [
  ['fill', 'fi', 'Jokaisessa palassa on yksi luku. Napauta lukua, joka kuuluu ?-ruutuun: oikealle 1 enemmän, vasemmalle 1 vähemmän, alle 10 enemmän, ylle 10 vähemmän.',
    'Jokaisessa palassa on yksi luku. Napauta lukua, joka kuuluu ?-ruutuun: oikealle 1 enemmän, vasemmalle 1 vähemmän, alapuolelle 10 enemmän, yläpuolelle 10 vähemmän.'],
  ['riddle', 'da', 'Følg begge pile. De peger på det samme felt på tavlen. Tryk på det hemmelige tal.', 'Følg begge pilene. De peger på det samme felt på hundredtavlen. Tryk på det hemmelige tal.'],
  ['jumps', 'da', 'Start ved tallet, og følg pilene: op er 10 mindre, ned er 10 mere, til venstre er 1 mindre, til højre er 1 mere. Tryk på tallet, hvor du lander.',
    'Start ved tallet, og følg pilene: op er 10 mindre, ned er 10 mere, til venstre er 1 mindre, til højre er 1 mere. Tryk på det tal, du lander på.'],
  ['jumps', 'fr', 'Pars du nombre et suis les flèches : en haut 10 de moins, en bas 10 de plus, à droite 1 de plus, à gauche 1 de moins. Touche le nombre où tu arrives.',
    'Pars du nombre et suis les flèches : vers le haut 10 de moins, vers le bas 10 de plus, vers la droite 1 de plus, vers la gauche 1 de moins. Touche le nombre où tu arrives.'],
  // the place screen shows ONE piece per question
  ['place', 'en', 'Read the numbers on each piece. Find its place on the chart. Tap the number that goes in the square with ?.', 'Read the numbers on the piece. Find its place on the chart. Tap the number that goes in the square with ?.'],
  ['place', 'de', 'Lies die Zahlen auf jedem Teil. Finde seinen Platz auf der Tafel. Tippe die Zahl an, die in das Feld mit ? gehört.', 'Lies die Zahlen auf dem Teil. Finde seinen Platz auf der Tafel. Tippe die Zahl an, die in das Feld mit ? gehört.'],
  ['place', 'es', 'Lee los números de cada pieza. Busca su lugar en la tabla. Toca el número que va en la casilla con ?.', 'Lee los números de la pieza. Busca su lugar en la tabla. Toca el número que va en la casilla con ?.'],
  ['place', 'fr', 'Lis les nombres de chaque morceau. Trouve sa place dans le tableau. Touche le nombre qui va dans la case avec ?.', 'Lis les nombres du morceau. Trouve sa place dans le tableau. Touche le nombre qui va dans la case avec ?.'],
  ['place', 'it', 'Leggi i numeri di ogni pezzo. Trova il suo posto nella tavola. Tocca il numero che va nella casella con ?.', 'Leggi i numeri del pezzo. Trova il suo posto nella tavola. Tocca il numero che va nella casella con ?.'],
  ['place', 'pt', 'Leia os números de cada peça. Ache o lugar dela no quadro. Toque no número que vai no quadradinho com ?.', 'Leia os números da peça. Ache o lugar dela no quadro. Toque no número que vai no quadradinho com ?.'],
  ['place', 'nl', 'Lees de getallen op elk stuk. Zoek zijn plek op het honderdveld. Tik op het getal dat in het hokje met ? hoort.', 'Lees de getallen op het stuk. Zoek zijn plek op het honderdveld. Tik op het getal dat in het hokje met ? hoort.'],
  ['place', 'sv', 'Läs talen på varje bit. Hitta dess plats i hundrarutan. Tryck på talet som ska stå i rutan med ?.', 'Läs talen på biten. Hitta dess plats i hundrarutan. Tryck på talet som ska stå i rutan med ?.'],
  ['place', 'da', 'Læs tallene på hver brik. Find dens plads på tavlen. Tryk på det tal, der skal stå i feltet med ?.', 'Læs tallene på brikken. Find dens plads på tavlen. Tryk på det tal, der skal stå i feltet med ?.'],
  ['place', 'no', 'Les tallene på hver bit. Finn plassen dens i hundrerruta. Trykk på tallet som skal stå i ruta med ?.', 'Les tallene på biten. Finn plassen dens i hundrerruta. Trykk på tallet som skal stå i ruta med ?.'],
];

const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = []; let n = 0;
for (const l of LOCS) {
  const f = path.join(ROOT, 'i18n', `strings.${l}.json`);
  const S = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [id, loc, field, oldT, newT] of PRINTED) {
    if (loc !== l) continue;
    const cur = field === 'printTitle' ? (S[id].printTitle || S[id].title) : S[id].instruction;
    if (cur === newT) continue;
    if (cur !== oldT) { bad.push(`${id} ${l} ${field}: is "${cur}"`); continue; }
    S[id][field] = newT; n++;
  }
  fs.writeFileSync(f, JSON.stringify(S, null, 2) + '\n');
}
const IF = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const I = JSON.parse(fs.readFileSync(IF, 'utf8'));
const GF = path.join(__dirname, 'hcp-instructions.js');
let G = fs.readFileSync(GF, 'utf8');
for (const [k, l, oldT, newT] of SCREEN) {
  const cur = I['hundreds-chart-puzzles'][k][l];
  if (cur !== newT) {
    if (cur !== oldT) { bad.push(`screen ${k} ${l}: is "${cur}"`); continue; }
    I['hundreds-chart-puzzles'][k][l] = newT; n++;
  }
  if (G.includes(oldT)) G = G.split(oldT).join(newT);
}
if (bad.length) { console.error('REFUSED:\n' + bad.join('\n')); process.exit(1); }
fs.writeFileSync(IF, JSON.stringify(I, null, 1) + '\n');
fs.writeFileSync(GF, G);
console.log(`applied ${n} edits (${PRINTED.length} printed + ${SCREEN.length} screen listed)`);
