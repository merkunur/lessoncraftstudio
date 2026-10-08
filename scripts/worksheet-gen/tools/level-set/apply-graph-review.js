#!/usr/bin/env node
/**
 * apply-graph-review.js — the native + pedagogical review of the Graphs and Data Level Set (2026-10-08), applied AFTER
 * apply-graph-instructions.js. Printed instructions and printed headings (printTitle — the SEO title is never touched)
 * in i18n/strings.<loc>.json; screen strings in BOTH i18n/interactive-instructions.json and
 * tools/level-set/graph-instructions.js. Every edit names its OLD text: a string that no longer matches is refused
 * (idempotent: an already-applied edit passes).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');

// [face, locale, field, old, new]   field: instruction | printTitle (old = the SEO title when no printTitle yet)
const PRINTED = [
  // es-MX (SEP): la gráfica; "encierra", not "rodea"
  ['G1-143', 'es', 'printTitle', 'Lee el gráfico de barras', 'Lee la gráfica de barras'],
  ['G2-237', 'es', 'printTitle', 'Detective de gráficos', 'Detective de gráficas'],
  ['G3-334', 'es', 'printTitle', 'Construye el gráfico', 'Construye la gráfica'],
  ['G1-142', 'es', 'instruction', 'Mira el gráfico. Rodea el que tiene MÁS.', 'Mira la gráfica. Encierra el que tiene MÁS.'],
  ['G1-144', 'es', 'instruction', 'Mira las barras. Rodea la que tiene más.', 'Mira las barras. Encierra la que tiene más.'],
  ['G1-147', 'es', 'instruction', 'Lee los conteos. Colorea un cuadro en el gráfico por cada uno.', 'Lee los conteos. Colorea un cuadro en la gráfica por cada uno.'],
  ['G2-237', 'es', 'instruction', 'Usa el gráfico para resolver las dos preguntas con dibujos.', 'Usa la gráfica para resolver las dos preguntas con dibujos.'],
  // da typo
  ['G1-146', 'da', 'instruction', 'Tæl hver slags i stribben. Skriv det samlede antal i tabellen.', 'Tæl hver slags i striben. Skriv det samlede antal i tabellen.'],
  // nl: a "lijngrafiek" is a line graph (joined points); the page is a plot of crosses
  ['G2-240', 'nl', 'printTitle', 'Lees de lijngrafiek', 'Lees de kruisjesgrafiek'],
  // fi: the school word for a tally chart is "tukkimiehen kirjanpito"
  ['G2-239', 'fi', 'printTitle', 'Tukkimiehistä kuvaajaksi', 'Tukkimiehen kirjanpidosta pylväsdiagrammiksi'],
  ['G2-239', 'fi', 'instruction', 'Lue tukkitaulukko. Väritä yksi pylväs jokaista määrää kohti.', 'Lue tukkimiehen kirjanpito. Väritä yksi pylväs jokaista määrää kohti.'],
  // fr: the heading names the bar graph; an unfinished "combien"
  ['G1-143', 'fr', 'printTitle', 'Lire le graphique', 'Lire le diagramme en barres'],
  ['G2-240', 'fr', 'instruction', 'Compte les croix au-dessus de chaque nombre. Écris combien.', 'Compte les croix au-dessus de chaque nombre. Écris combien il y en a.'],
  ['G3-335', 'fr', 'instruction', 'Compte les croix au-dessus de chaque nombre. Écris combien.', 'Compte les croix au-dessus de chaque nombre. Écris combien il y en a.'],
  // no: "sitt" is reflexive (the child's own number); "virkelige" is unnatural here
  ['G1-143', 'no', 'instruction', 'Les hver søyle. Skriv tallet sitt.', 'Les hver søyle. Skriv tallet til søylen.'],
  ['G2-238', 'no', 'instruction', 'Hvert bilde står for 2! Skriv det virkelige antallet for hver rad.', 'Hvert bilde står for 2! Skriv det riktige antallet for hver rad.'],
  ['G3-333', 'no', 'instruction', 'Hvert bilde står for 5! Skriv det virkelige antallet for hver rad.', 'Hvert bilde står for 5! Skriv det riktige antallet for hver rad.'],
  // de / nl: nothing is counted INSIDE a bar — name the picture with the highest bar
  ['G1-144', 'de', 'instruction', 'Schau dir die Säulen an. Kreise die Säule mit den meisten ein.', 'Schau dir die Säulen an. Kreise das Bild mit der höchsten Säule ein.'],
  ['G1-144', 'nl', 'instruction', 'Kijk naar de staven. Omcirkel degene met de meeste.', 'Kijk naar de staven. Omcirkel het plaatje met de hoogste staaf.'],
  // G3-332: the bars are not big — the SCALE counts by 5
  ['G3-332', 'en', 'printTitle', 'Big Scale Bars', 'Bars That Count by 5'],
  ['G3-332', 'es', 'printTitle', 'Barras a gran escala', 'Barras de 5 en 5'],
  ['G3-332', 'fr', 'printTitle', 'Barres à grande échelle', 'Barres de 5 en 5'],
  ['G3-332', 'it', 'printTitle', 'Barre a grande scala', 'Barre di 5 in 5'],
  ['G3-332', 'pt', 'printTitle', 'Barras de escala grande', 'Barras de 5 em 5'],
  ['G3-332', 'nl', 'printTitle', 'Grote schaalstaven', 'Staven in sprongen van 5'],
  ['G3-332', 'sv', 'printTitle', 'Staplar i stor skala', 'Staplar i femsteg'],
  ['G3-332', 'da', 'printTitle', 'Store skalasøjler', 'Søjler i femmerspring'],
  ['G3-332', 'no', 'printTitle', 'Store søyler', 'Søyler i femmersteg'],
  ['G3-332', 'fi', 'printTitle', 'Isojen pylväiden asteikko', 'Pylväät viiden välein'],
  ['G3-332', 'it', 'instruction', 'Attento: la scala conta di 5! Scrivi il valore di ogni barra.', 'Attenzione: la scala va di 5 in 5! Scrivi il valore di ogni barra.'],
  ['G3-332', 'nl', 'instruction', 'Let op — de schaal telt met 5! Schrijf de waarde van elke staaf op.', 'Let op — de schaal gaat met sprongen van 5! Schrijf de waarde van elke staaf op.'],
  ['G3-332', 'sv', 'instruction', 'Se upp — skalan räknar med 5! Skriv värdet på varje stapel.', 'Se upp — skalan går i steg om 5! Skriv värdet på varje stapel.'],
  ['G3-332', 'da', 'instruction', 'Pas på — skalaen tæller med 5! Skriv værdien af hver søjle.', 'Pas på — skalaen går i spring på 5! Skriv værdien af hver søjle.'],
  ['G3-332', 'no', 'instruction', 'Pass på — skalaen teller med 5! Skriv verdien til hver søyle.', 'Pass på — skalaen går i steg på 5! Skriv verdien til hver søyle.'],
  // G3-335: the page is about HALVES on a line plot ("halfway marks" was copied word for word)
  ['G3-335', 'es', 'printTitle', 'Marcas a medio camino', 'Medios en el diagrama de puntos'],
  ['G3-335', 'fr', 'printTitle', 'Marques de mi-chemin', 'Les demis'],
  ['G3-335', 'it', 'printTitle', 'Segni a metà strada', 'Le metà'],
  ['G3-335', 'pt', 'printTitle', 'Marcas da metade', 'Metades'],
  ['G3-335', 'nl', 'printTitle', 'Halverwegemarkeringen', 'Halven'],
  ['G3-335', 'sv', 'printTitle', 'Halvvägsmärken', 'Halvor'],
  ['G3-335', 'da', 'printTitle', 'Halvvejsmærker', 'Halve'],
  ['G3-335', 'no', 'printTitle', 'Halvveismerker', 'Halve'],
  ['G3-335', 'fi', 'printTitle', 'Puolivälimerkit', 'Puolikkaat'],
  // sv / da: "för varje en" / "for hver" end with nothing counted
  ['G1-147', 'sv', 'instruction', 'Läs antalen. Måla en ruta i diagrammet för varje en.', 'Läs antalen. Måla lika många rutor i diagrammet som antalet.'],
  ['G1-147', 'da', 'instruction', 'Læs antallene. Farv en rude i diagrammet for hver.', 'Læs antallene. Farv lige så mange ruder i diagrammet, som antallet viser.'],
  // pt: "perguntas com figuras"
  ['G2-237', 'pt', 'instruction', 'Use o gráfico para resolver as duas perguntas das figuras.', 'Use o gráfico para resolver as duas perguntas com figuras.'],
];
// [screen key, locale, old, new]
const SCREEN = [
  ['most', 'es', 'Mira el gráfico. Toca el que tiene MÁS.', 'Mira la gráfica. Toca el que tiene MÁS.'],
  ['twoStep', 'es', 'Usa el gráfico. Toca la respuesta de cada pregunta con dibujos.', 'Usa la gráfica. Toca la respuesta de cada pregunta con dibujos.'],
  ['twoStep', 'pt', 'Use o gráfico. Toque na resposta de cada pergunta das figuras.', 'Use o gráfico. Toque na resposta de cada pergunta com figuras.'],
  ['buildTally', 'fi', 'Lue tukkitaulukko. Napauta yksi ruutu jokaista merkkiä kohti ja rakenna pylväät.', 'Lue tukkimiehen kirjanpito. Napauta yksi ruutu jokaista merkkiä kohti ja rakenna pylväät.'],
  ['readBar', 'no', 'Les hver søyle. Trykk på tallet dens.', 'Les hver søyle. Trykk på tallet til søylen.'],
  ['readPict2', 'no', 'Hvert bilde står for 2! Trykk på det virkelige antallet for hver rad.', 'Hvert bilde står for 2! Trykk på det riktige antallet for hver rad.'],
  ['readPict5', 'no', 'Hvert bilde står for 5! Trykk på det virkelige antallet for hver rad.', 'Hvert bilde står for 5! Trykk på det riktige antallet for hver rad.'],
  ['tallest', 'de', 'Schau dir die Säulen an. Tippe die Säule mit den meisten an.', 'Schau dir die Säulen an. Tippe das Bild mit der höchsten Säule an.'],
  ['tallest', 'nl', 'Kijk naar de staven. Tik op degene met de meeste.', 'Kijk naar de staven. Tik op het plaatje met de hoogste staaf.'],
  ['readBar5', 'it', 'Attento: la scala conta di 5! Tocca il valore di ogni barra.', 'Attenzione: la scala va di 5 in 5! Tocca il valore di ogni barra.'],
  ['readBar5', 'nl', 'Let op — de schaal telt met 5! Tik op de waarde van elke staaf.', 'Let op — de schaal gaat met sprongen van 5! Tik op de waarde van elke staaf.'],
  ['readBar5', 'sv', 'Se upp — skalan räknar med 5! Tryck på värdet för varje stapel.', 'Se upp — skalan går i steg om 5! Tryck på värdet för varje stapel.'],
  ['readBar5', 'da', 'Pas på — skalaen tæller med 5! Tryk på værdien af hver søjle.', 'Pas på — skalaen går i spring på 5! Tryk på værdien af hver søjle.'],
  ['readBar5', 'no', 'Pass på — skalaen teller med 5! Trykk på verdien til hver søyle.', 'Pass på — skalaen går i steg på 5! Trykk på verdien til hver søyle.'],
  ['buildPict', 'sv', 'Läs antalen. Tryck på en ruta i raden för varje en.', 'Läs antalen. Tryck på lika många rutor i raden som antalet.'],
  ['buildBar', 'sv', 'Använd tabellen. Tryck på en ruta för varje en och bygg varje stapel.', 'Använd tabellen. Tryck på lika många rutor som talet och bygg varje stapel.'],
  ['buildPict', 'da', 'Læs antallene. Tryk på en rude i rækken for hver.', 'Læs antallene. Tryk på lige så mange ruder i rækken, som antallet viser.'],
  ['buildBar', 'da', 'Brug tabellen. Tryk på en rude for hver og byg hver søjle.', 'Brug tabellen. Tryk på lige så mange ruder, som tallet viser, og byg hver søjle.'],
  ['buildPict', 'pt', 'Leia as contagens. Toque uma caixa da fileira para cada um.', 'Leia as contagens. Toque em uma caixa da fileira para cada um.'],
  ['buildBar', 'pt', 'Use a tabela. Toque uma caixa para cada um e monte cada barra.', 'Use a tabela. Toque em uma caixa para cada um e monte cada barra.'],
  ['buildTally', 'pt', 'Leia o quadro de tracinhos. Toque uma caixa para cada tracinho e monte cada barra.', 'Leia o quadro de tracinhos. Toque em uma caixa para cada tracinho e monte cada barra.'],
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
const GF = path.join(__dirname, 'graph-instructions.js');
let G = fs.readFileSync(GF, 'utf8');
for (const [k, l, oldT, newT] of SCREEN) {
  const cur = I['graphing-data'][k][l];
  if (cur !== newT) {
    if (cur !== oldT) { bad.push(`screen ${k} ${l}: is "${cur}"`); continue; }
    I['graphing-data'][k][l] = newT; n++;
  }
  if (G.includes(oldT)) G = G.split(oldT).join(newT);
}
if (bad.length) { console.error('REFUSED:\n' + bad.join('\n')); process.exit(1); }
fs.writeFileSync(IF, JSON.stringify(I, null, 1) + '\n');
fs.writeFileSync(GF, G);
console.log(`applied ${n} edits (${PRINTED.length} printed + ${SCREEN.length} screen listed)`);
