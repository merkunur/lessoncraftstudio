#!/usr/bin/env node
/**
 * apply-geo-review.js — the native + pedagogical review of the Geometry Level Set (2026-10-08), applied AFTER
 * apply-geo-instructions.js. Printed instructions and printed headings (printTitle — the SEO title is never touched)
 * in i18n/strings.<loc>.json, the G3-340/G3-341 en source in the type files untouched, and the screen strings in BOTH
 * i18n/interactive-instructions.json and tools/level-set/geo-instructions.js (so a re-run of the first script keeps
 * them). Every edit names its OLD text: a string that no longer matches is refused (idempotent: already-applied passes).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');

// [face, locale, field, old, new]   field: instruction | printTitle (old = the SEO title when no printTitle yet)
const PRINTED = [
  // fi: "muoto" is not the school word for a plane figure (kuvio); "Lajittele sivuilla" = "sort on pages"
  ['K-075', 'fi', 'instruction', 'Laske jokaisen muodon sivut. Kirjoita luku.', 'Laske jokaisen kuvion sivut. Kirjoita luku.'],
  ['K-076', 'fi', 'instruction', 'Piirrä viiva jokaisesta muodosta sen sivujen lukumäärään.', 'Piirrä viiva jokaisesta kuviosta sen sivujen lukumäärään.'],
  ['G2-241', 'fi', 'instruction', 'Piirrä viiva jokaisesta muodosta sen sivujen lukumäärään.', 'Piirrä viiva jokaisesta kuviosta sen sivujen lukumäärään.'],
  ['K-076', 'fi', 'printTitle', 'Lajittele sivuilla', 'Lajittele sivujen määrän mukaan'],
  ['K-076', 'pt', 'printTitle', 'Separe pelos lados', 'Separe pelo número de lados'],
  ['K-076', 'fr', 'printTitle', 'Trier par côtés', 'Trier selon le nombre de côtés'],
  // it: "ordina" = put in order, the page groups
  ['K-076', 'it', 'printTitle', 'Ordina per lati', 'Raggruppa per numero di lati'],
  ['G2-241', 'it', 'printTitle', 'Ordina le forme', 'Raggruppa le forme'],
  // faces: the school term, and FLAT faces (a cylinder has 2, a sphere 0)
  ['G2-242', 'fr', 'instruction', 'Écris combien de faces plates a chaque solide.', 'Écris combien de faces planes a chaque solide.'],
  ['G2-242', 'sv', 'instruction', 'Skriv hur många plana sidor varje kropp har.', 'Skriv hur många plana ytor varje kropp har.'],
  ['G2-242', 'sv', 'printTitle', 'Räkna sidoytorna', 'Räkna de plana ytorna'],
  ['G2-242', 'no', 'instruction', 'Skriv hvor mange flater hvert romlegeme har.', 'Skriv hvor mange plane flater hvert romlegeme har.'],
  ['G2-242', 'no', 'printTitle', 'Tell flatene', 'Tell de plane flatene'],
  ['G2-242', 'fi', 'instruction', 'Kirjoita, montako tasaista tahkoa kullakin kappaleella on.', 'Kirjoita, montako tasaista pintaa kullakin kappaleella on.'],
  ['G2-242', 'fi', 'printTitle', 'Laske tahkot', 'Laske tasaiset pinnat'],
  // solid ↔ object: "the object with the same shape"
  ['G2-243', 'en', 'instruction', 'Draw a line from each solid to the object with its shape.', 'Draw a line from each solid to the object with the same shape.'],
  ['G2-243', 'es', 'instruction', 'Une con una línea cada cuerpo al objeto con su forma.', 'Une con una línea cada cuerpo con el objeto que tiene la misma forma.'],
  ['G2-243', 'fr', 'instruction', "Trace un trait de chaque solide vers l'objet de sa forme.", "Trace un trait de chaque solide vers l'objet qui a la même forme."],
  ['G2-243', 'it', 'instruction', "Traccia una linea da ogni solido all'oggetto con la sua forma.", "Traccia una linea da ogni solido all'oggetto con la stessa forma."],
  ['G2-243', 'pt', 'instruction', 'Ligue cada sólido ao objeto com a forma dele.', 'Ligue cada sólido ao objeto que tem a mesma forma.'],
  ['G2-243', 'sv', 'instruction', 'Dra ett streck från varje kropp till saken med dess form.', 'Dra ett streck från varje kropp till saken som har samma form.'],
  ['G2-243', 'da', 'instruction', 'Tegn en streg fra hver rumfigur til tingen med dens form.', 'Tegn en streg fra hver rumfigur til tingen med samme form.'],
  // flat or solid
  ['G2-244', 'sv', 'instruction', 'Dra ett streck till rätt låda: plana figurer vänster, kroppar höger.', 'Dra ett streck från varje figur till rätt låda: plana figurer till vänster, kroppar till höger.'],
  ['G2-244', 'no', 'instruction', 'Tegn en strek fra hver figur til kurven sin: flate figurer venstre, romlige høyre.', 'Tegn en strek fra hver figur til kurven sin: flate figurer til venstre, romfigurer til høyre.'],
  ['G2-244', 'it', 'instruction', 'Traccia una linea da ogni forma al gruppo: piatte a sinistra, solidi a destra.', 'Traccia una linea da ogni forma al suo gruppo: figure piane a sinistra, solidi a destra.'],
  ['G2-244', 'fr', 'instruction', 'Trace un trait de chaque forme vers son bac : formes plates à gauche, solides à droite.', 'Trace un trait de chaque forme vers son bac : figures planes à gauche, solides à droite.'],
  // mirror line yes/no: es-MX palomita/tache; it spunta; sv/fi a tick marks a WRONG answer → the chips are words;
  // pt BNCC "eixo de simetria"; sv/da/no the school term symmetrilinje / symmetriakse
  ['G2-247', 'es', 'instruction', '¿La línea punteada es un eje de simetría? Rodea el visto o la cruz.', '¿La línea punteada es un eje de simetría? Encierra la palomita o el tache.'],
  ['G2-247', 'it', 'instruction', 'La linea tratteggiata è un asse di simmetria? Cerchia il segno giusto o la croce.', 'La linea tratteggiata è un asse di simmetria? Cerchia la spunta o la croce.'],
  ['G2-247', 'fi', 'instruction', 'Onko katkoviiva symmetria-akseli? Ympyröi rasti tai oikein-merkki.', 'Onko katkoviiva symmetria-akseli? Ympyröi kyllä tai ei.'],
  ['G2-247', 'sv', 'instruction', 'Är den streckade linjen en spegellinje? Ringa in bocken eller krysset.', 'Är den streckade linjen en symmetrilinje? Ringa in ja eller nej.'],
  ['G2-247', 'sv', 'printTitle', 'Spegellinje?', 'Symmetrilinje?'],
  ['G2-247', 'pt', 'instruction', 'A linha tracejada é uma linha de espelho? Circule o certo ou o errado.', 'A linha tracejada é um eixo de simetria? Circule o certo ou o errado.'],
  ['G2-247', 'pt', 'printTitle', 'Linha de espelho?', 'Eixo de simetria?'],
  ['G2-247', 'da', 'instruction', 'Er den stiplede linje en spejllinje? Indkreds fluebenet eller krydset.', 'Er den stiplede linje en symmetriakse? Indkreds fluebenet eller krydset.'],
  ['G2-247', 'da', 'printTitle', 'Spejllinje?', 'Symmetriakse?'],
  ['G2-247', 'no', 'instruction', 'Er den stiplede linja en speillinje? Sett ring rundt haken eller krysset.', 'Er den stiplede linja en symmetrilinje? Sett ring rundt haken eller krysset.'],
  ['G2-247', 'no', 'printTitle', 'Speillinje?', 'Symmetrilinje?'],
  // "mirror picture" = a reflection of something else; the page asks for the symmetric picture
  ['G2-248', 'en', 'printTitle', 'Find the Mirror Picture', 'Find the Symmetric Picture'],
  ['G2-248', 'de', 'printTitle', 'Das Spiegelbild finden', 'Das symmetrische Bild finden'],
  ['G2-248', 'sv', 'printTitle', 'Hitta spegelbilden', 'Hitta den symmetriska bilden'],
  ['G2-248', 'da', 'printTitle', 'Find spejlbilledet', 'Find det symmetriske billede'],
  ['G2-248', 'no', 'printTitle', 'Finn speilbildet', 'Finn det symmetriske bildet'],
  ['G2-248', 'fi', 'printTitle', 'Etsi peilikuva', 'Etsi symmetrinen kuva'],
  ['G2-248', 'nl', 'printTitle', 'Vind het spiegelplaatje', 'Vind het symmetrische plaatje'],
  // how many mirror lines
  ['G3-342', 'fi', 'printTitle', 'Montako akselia?', 'Montako symmetria-akselia?'],
  ['G3-342', 'pt', 'instruction', 'Escreva quantas linhas de espelho cada forma tem.', 'Escreva quantos eixos de simetria cada forma tem.'],
  ['G3-342', 'pt', 'printTitle', 'Quantas linhas de espelho?', 'Quantos eixos de simetria?'],
  ['G3-342', 'sv', 'instruction', 'Skriv hur många spegellinjer varje figur har.', 'Skriv hur många symmetrilinjer varje figur har.'],
  ['G3-342', 'sv', 'printTitle', 'Hur många spegellinjer?', 'Hur många symmetrilinjer?'],
  ['G3-342', 'da', 'instruction', 'Skriv hvor mange spejllinjer hver figur har.', 'Skriv hvor mange symmetriakser hver figur har.'],
  ['G3-342', 'da', 'printTitle', 'Hvor mange spejllinjer?', 'Hvor mange symmetriakser?'],
  ['G3-342', 'no', 'instruction', 'Skriv hvor mange speillinjer hver figur har.', 'Skriv hvor mange symmetrilinjer hver figur har.'],
  ['G3-342', 'no', 'printTitle', 'Hvor mange speillinjer?', 'Hvor mange symmetrilinjer?'],
  // perimeter: "unit sides" are the sides of the little squares; fi särmä is a 3D edge
  ['G3-337', 'it', 'instruction', 'Conta i lati unitari attorno a ogni rettangolo. Scrivi il perimetro.', 'Conta i lati dei quadretti attorno a ogni rettangolo. Scrivi il perimetro.'],
  ['G3-337', 'pt', 'instruction', 'Conte as bordas unitárias ao redor de cada retângulo. Escreva o perímetro.', 'Conte os lados dos quadradinhos ao redor de cada retângulo. Escreva o perímetro.'],
  ['G3-337', 'fi', 'instruction', 'Laske yksikkösärmät jokaisen suorakulmion ympäri. Kirjoita piiri.', 'Laske ruutujen sivut jokaisen suorakulmion ympäri. Kirjoita piiri.'],
  // same area
  ['G3-338', 'nl', 'instruction', 'Omcirkel de rechthoek die DEZELFDE hoeveelheid hokjes bedekt.', 'Omcirkel de rechthoek die EVENVEEL hokjes bedekt.'],
  ['G3-338', 'es', 'instruction', 'Rodea el rectángulo que cubre el MISMO número de cuadros.', 'Encierra el rectángulo que cubre el MISMO número de cuadritos.'],
  ['G3-338', 'da', 'instruction', 'Indkreds rektanglet, der dækker det SAMME antal kvadrater.', 'Indkreds rektanglet, der dækker det SAMME antal tern.'],
  ['G3-338', 'fi', 'instruction', 'Ympyröi suorakulmio, joka peittää SAMAN määrän neliöitä.', 'Ympyröi suorakulmio, joka peittää SAMAN määrän ruutuja.'],
];
// [screen key, locale, old, new]
const SCREEN = [
  ['faces', 'de', 'Tippe an, wie viele Flächen der Körper hat.', 'Tippe an, wie viele ebene Flächen der Körper hat.'],
  ['faces', 'fi', 'Napauta, montako tasoa kappaleella on.', 'Napauta, montako tasaista pintaa kappaleella on.'],
  ['faces', 'no', 'Trykk på hvor mange flate sideflater figuren har.', 'Trykk på hvor mange plane flater figuren har.'],
  ['faces', 'sv', 'Tryck på hur många platta sidor kroppen har.', 'Tryck på hur många plana ytor kroppen har.'],
  ['perimeter', 'sv', 'Tryck på omkretsen: hela vägen runt.', 'Tryck på omkretsen: sträckan hela vägen runt.'],
  ['perimeter', 'da', 'Tryk på omkredsen: hele vejen rundt.', 'Tryk på omkredsen: afstanden hele vejen rundt.'],
  ['perimeter', 'no', 'Trykk på omkretsen: hele veien rundt.', 'Trykk på omkretsen: avstanden hele veien rundt.'],
  // one school term per locale, printed = screen (nl keeps its printed spiegellijn)
  ['symn', 'nl', 'Tik op hoeveel spiegelassen de vorm heeft.', 'Tik op hoeveel spiegellijnen de vorm heeft.'],
  ['mirrorLine', 'nl', 'Tik op elk plaatje waar de stippellijn een spiegelas is.', 'Tik op elk plaatje waar de stippellijn een spiegellijn is.'],
  ['sameArea', 'es', 'Toca el rectángulo que cubre el mismo número de cuadrados.', 'Toca el rectángulo que cubre el mismo número de cuadritos.'],
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
const GF = path.join(__dirname, 'geo-instructions.js');
let G = fs.readFileSync(GF, 'utf8');
for (const [k, l, oldT, newT] of SCREEN) {
  const cur = I.geometry[k][l];
  if (cur !== newT) {
    if (cur !== oldT) { bad.push(`screen ${k} ${l}: is "${cur}"`); continue; }
    I.geometry[k][l] = newT; n++;
  }
  if (G.includes(oldT)) G = G.split(oldT).join(newT);
}
if (bad.length) { console.error('REFUSED:\n' + bad.join('\n')); process.exit(1); }
fs.writeFileSync(IF, JSON.stringify(I, null, 1) + '\n');
fs.writeFileSync(GF, G);
console.log(`applied ${n} edits (${PRINTED.length} printed + ${SCREEN.length} screen listed)`);
