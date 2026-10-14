#!/usr/bin/env node
/**
 * apply-rnd-review.js — the native + pedagogy review of the rounding family (Level Set walk #63, 2026-10-14), applied
 * at the source. Every printed instruction it corrects is replaced as an EXACT string value in all three places a b4
 * string lives (data/b4/locales/rounding.<loc>.json, i18n/.draft-b4-<loc>.json, i18n/strings.<loc>.json — the gate
 * tools/check-b4-string-parity.js keeps them equal). Corrected printed HEADINGS go in as `printTitle` (strings file
 * only): the search title (`title`) is metadata and stays. Idempotent; refuses to write a file whose JSON does not
 * round-trip byte-for-byte, and refuses when an old string is found nowhere (a stale fix list).
 *   node tools/level-set/apply-rnd-review.js [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const DRY = process.argv.includes('--dry-run');

/** [locale]: [[old instruction, new instruction], …] */
const INSTR = {
  de: [
    ['Kreise jede Zahl ein, die auf den Zehner oben gerundet wird. Schau auf die Einerstelle jeder Zahl.', 'Kreise jede Zahl ein, die auf die Zehnerzahl oben gerundet wird. Schau auf die Einerziffer jeder Zahl.'],
    ['Wird jede Zahl zum nächsten Zehner aufgerundet oder abgerundet? Schreibe sie in den richtigen Kasten.', 'Wird die Zahl auf den Zehner aufgerundet oder abgerundet? Schreibe jede Zahl in den richtigen Kasten.'],
  ],
  es: [
    ['Rodea todos los números que se redondean a la decena que aparece arriba. Fíjate en la cifra de las unidades de cada número.', 'Encierra en un círculo todos los números que se redondean a la decena que aparece arriba. Fíjate en la cifra de las unidades de cada número.'],
    ['¿Cada número se redondea hacia arriba o hacia abajo a la decena? Escríbelo en la caja que le corresponde.', '¿El número se redondea hacia arriba o hacia abajo a la decena más cercana? Escribe cada número en la caja que le corresponde.'],
  ],
  fr: [
    ['Arrondis chaque nombre à la dizaine la plus proche et écris-le dans la case. Si le chiffre des unités est 5 ou davantage, arrondis au-dessus.', 'Arrondis chaque nombre à la dizaine la plus proche et écris-le dans la case. Si le chiffre des unités est 5 ou plus, arrondis à la dizaine supérieure.'],
    ["Chaque nombre s'arrondit-il au-dessus ou en dessous à la dizaine\u00a0? Écris-le dans la bonne boîte.", "Chaque nombre s'arrondit-il à la dizaine inférieure ou à la dizaine supérieure\u00a0? Écris-le dans la bonne boîte."],
  ],
  pt: [
    ['Arredonde cada número à dezena mais próxima e escreva na caixa. Se o algarismo das unidades for 5 ou mais, arredonde para cima.', 'Arredonde cada número à dezena mais próxima e escreva-o no quadrinho. Se o algarismo das unidades for 5 ou mais, arredonde para cima.'],
    ['Arredonde cada número à centena mais próxima e escreva na caixa. Olhe o algarismo das dezenas.', 'Arredonde cada número à centena mais próxima e escreva-o no quadrinho. Olhe o algarismo das dezenas.'],
    ['Arredonde os dois números à dezena mais próxima e escreva nas caixas. Depois some os números arredondados.', 'Arredonde os dois números à dezena mais próxima e escreva-os nos quadrinhos. Depois some os números arredondados.'],
    ['Arredonde cada número duas vezes: à dezena na primeira caixa e à centena na segunda.', 'Arredonde cada número duas vezes: à dezena no primeiro quadrinho e à centena no segundo.'],
    ['Cada número é arredondado para cima ou para baixo na dezena? Escreva-o na caixa certa.', 'Cada número é arredondado para cima ou para baixo, para a dezena mais próxima? Escreva-o na caixa certa.'],
    ['Circule todos os números que arredondam para a dezena mostrada no alto. Olhe o algarismo das unidades.', 'Circule todos os números que são arredondados para a dezena mostrada no alto. Olhe o algarismo das unidades.'],
  ],
  nl: [
    ['Rond elk getal af op het tiental en schrijf het in het vakje. Is het laatste cijfer 5 of meer, rond dan naar boven.', 'Rond elk getal af op het tiental en schrijf het in het vakje. Is het laatste cijfer 5 of meer, rond dan af naar boven.'],
    ['Gaat elk getal naar boven of naar beneden op het tiental? Schrijf het in de juiste bak.', 'Rond je elk getal af naar boven of naar beneden op het tiental? Schrijf het in de juiste bak.'],
    ['Omcirkel elk getal dat op het tiental bovenaan uitkomt. Kijk naar het laatste cijfer van elk getal.', 'Omcirkel elk getal dat je afrondt op het getal bovenaan. Kijk naar het laatste cijfer van elk getal.'],
  ],
  sv: [
    ['Avrunda varje tal till närmaste tiotal och skriv det i rutan. Är entalet 5 eller mer, avrundar du uppåt.', 'Avrunda varje tal till närmaste tiotal och skriv det i rutan. Är entalssiffran 5 eller mer, avrundar du uppåt.'],
    ['Avrunda varje tal till närmaste hundratal och skriv det i rutan. Titta på entalet och tiotalet.', 'Avrunda varje tal till närmaste hundratal och skriv det i rutan. Titta på tiotalssiffran.'],
    ['Ringa in varje tal som avrundas till talet högst upp. Titta på entalet i varje tal.', 'Ringa in varje tal som avrundas till talet högst upp. Titta på entalssiffran i varje tal.'],
  ],
  da: [
    ['Runder hvert tal op eller ned til nærmeste tier? Skriv tallet i den rigtige kasse.', 'Skal hvert tal rundes op eller ned til nærmeste tier? Skriv tallet i den rigtige kasse.'],
    ['Sæt ring om hvert tal, der bliver til tieren øverst. Se på cifret på enerpladsen.', 'Sæt ring om hvert tal, der afrundes til tallet øverst. Se på cifret på enerpladsen.'],
  ],
  no: [
    ['Rund av hvert tall til nærmeste tier og skriv det i ruta. Er eneren 5 eller mer, runder du opp.', 'Rund av hvert tall til nærmeste tier og skriv det i ruta. Er einersifferet 5 eller mer, runder du opp.'],
    ['Sett ring rundt hvert tall som blir tieren øverst på arket. Se på eneren i hvert tall.', 'Sett ring rundt hvert tall som rundes av til tallet øverst på arket. Se på einersifferet i hvert tall.'],
  ],
  fi: [
    ['Ympyröi jokainen luku, joka pyöristyy ylhäällä näkyvään kymmeneen. Katso kunkin luvun ykkösnumeroa.', 'Ympyröi jokainen luku, joka pyöristyy ylhäällä näkyvään lukuun. Katso kunkin luvun ykkösnumeroa.'],
  ],
};
/** the printed headings ([locale][type id] -> printTitle); the "50" of G3-390 is swapped per copy by the builder */
const PRINT_TITLE = {
  de: { 'G3-390': 'Welche Zahlen werden auf 50 gerundet?' },
  fr: { 'G3-387': 'Dizaine inférieure ou supérieure\u00a0? Range les nombres' },
  pt: { 'G3-390': 'Quais números são arredondados para 50?' },
  nl: { 'G3-390': 'Welke getallen rond je af op 50?' },
  sv: { 'G3-390': 'Vilka tal avrundas till 50?' },
  da: { 'G3-390': 'Hvilke tal afrundes til 50?' },
  no: { 'G3-390': 'Hvilke tall rundes av til 50?' },
};

function fmtOf(raw) { return { crlf: raw.includes('\r\n'), indent: (/\n( +)"/.exec(raw) || [, '  '])[1].length, tail: /\r?\n$/.test(raw) ? (raw.endsWith('\r\n') ? '\r\n' : '\n') : '' }; }
function dump(obj, f) { let s = JSON.stringify(obj, null, f.indent); if (f.crlf) s = s.replace(/\n/g, '\r\n'); return s + f.tail; }
function edit(file, fn) {
  const raw = fs.readFileSync(file, 'utf8'), f = fmtOf(raw), obj = JSON.parse(raw);
  if (dump(obj, f) !== raw) throw new Error(`${file}: does not round-trip byte-for-byte — refuse to rewrite it`);
  const n = fn(obj);
  if (n && !DRY) fs.writeFileSync(file, dump(obj, f));
  return n;
}
function replaceValues(node, from, to) {
  let n = 0;
  if (Array.isArray(node)) node.forEach((v, i) => { if (v === from) { node[i] = to; n++; } else if (v && typeof v === 'object') n += replaceValues(v, from, to); });
  else if (node && typeof node === 'object') for (const k of Object.keys(node)) { if (node[k] === from) { node[k] = to; n++; } else if (node[k] && typeof node[k] === 'object') n += replaceValues(node[k], from, to); }
  return n;
}
let bad = 0;
for (const [loc, pairs] of Object.entries(INSTR)) {
  const files = [`data/b4/locales/rounding.${loc}.json`, `i18n/.draft-b4-${loc}.json`, `i18n/strings.${loc}.json`].map((f) => path.join(ROOT, f));
  for (const [from, to] of pairs) {
    // exact escaped-literal text replacement (the drafts do not round-trip through JSON.stringify): never reformats a file
    const counts = files.map((file) => {
      const raw = fs.readFileSync(file, 'utf8'), lit = (x) => JSON.stringify(x).slice(1, -1);
      const n = raw.split('"' + lit(from) + '"').length - 1;
      if (!n) return 0;
      const out = raw.split('"' + lit(from) + '"').join('"' + lit(to) + '"');
      JSON.parse(out);
      if (!DRY) fs.writeFileSync(file, out);
      return n;
    });
    const already = files.map((file) => fs.readFileSync(file, 'utf8').includes(JSON.stringify(to).slice(1, -1)));
    const tag = counts.every((c) => c > 0) ? 'fixed' : already.every(Boolean) ? 'already' : 'PARTIAL';
    if (tag === 'PARTIAL') bad++;
    console.log(`${loc} ${tag} [${counts.join('/')}] ${to.slice(0, 70)}`);
  }
}
for (const [loc, m] of Object.entries(PRINT_TITLE)) {
  const n = edit(path.join(ROOT, `i18n/strings.${loc}.json`), (o) => { let c = 0; for (const [id, t] of Object.entries(m)) if (o[id] && o[id].printTitle !== t) { o[id].printTitle = t; c++; } return c; });
  console.log(`${loc} printTitle ${n ? 'set' : 'already'} ${Object.keys(m).join(',')}`);
}
if (bad) { console.error(`${bad} fixes found in only some of the three files`); process.exit(1); }
