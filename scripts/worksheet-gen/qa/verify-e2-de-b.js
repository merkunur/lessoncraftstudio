#!/usr/bin/env node
/**
 * verify-e2-de-b.js — the gate of Batch DE-B (Daily Teaching System Stage E-2, 2026-11-26): the German mathematics
 * pages of Klasse 3, G3-633 .. G3-646 (factory types/_shared/e2-math-b.js, drawings e2-math-b-art.js, bank
 * data/e2b/e2-math-b.js, the PDF helper qa/verify-e2-de-b-pdf.py).
 *
 *   node scripts/worksheet-gen/qa/verify-e2-de-b.js [--quick] [--seeds=400] [--no-render] [--no-pdf] [--only=G3-633,...]
 *
 *   1. BANK, by the gate's OWN tables, never the bank's word: the real lengths of the things drawn at real size, the
 *      everyday distances and the card each belongs to (nearest on a tenfold scale, both ends of the range), the shop
 *      prices, the pieces' German genders and plurals and their prices, the sports, the "kann man nicht ablesen" sentences
 *      (each names what no chart of favourite sports shows), the rules word for word, every colour the drawings write.
 *   2. BUILD, --seeds copies of every type at every level, each page read from its own html (cheerio): every box with a
 *      stamp has ONE value by the gate's own arithmetic (every number sentence re-solved), every closed choice is decided
 *      by the printed rule and the gate's own data, every open item carries its key, the level's own band, the
 *      instruction's own examples never come as a task; the three levels differ; another locale refuses.
 *   3. TELLS, pooled: where an answer sits (a statement's place, a list's place, the line to draw), what a surface says
 *      about an answer (the note on "Reicht das Geld?", the number of prices, the far and the near task's places).
 *   4. RENDER (the print pipeline), every type x level, 2 copies: verify() (the Batch K page check, the one-right-choice
 *      check and e2bVerifyInPage: real sizes in the render, room round every circle's centre, the Rechenstrich's room,
 *      bars at their values, roads in proportion) and qa/lints.js clean; the stack. Then the LAYOUT SWEEP: the generator's
 *      seeds 1..SEEDS, every DISTINCT page swapped into the rendered page and judged by its type's verify.
 *   5. REAL SIZE IN THE PDF (G3-638, G3-644): pages printed to PDF and measured with PyMuPDF: the 10-cm ruler's 101
 *      ticks (each within 0.2 mm of its millimetre), every line and every thing (whole millimetres, within 0.2 mm), every
 *      circle's radius, the model flower's centres (each on the middle circle, 60 degrees apart).
 *   6. POISONS: each check FAILS on a bank, a page, an instruction, a pooled set, a render or a PDF spoiled for it,
 *      counted only when it fails WITH ITS OWN MESSAGE; each has a control that passes (the real one, judged above).
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..');
const cheerio = require(require.resolve('cheerio', { paths: [WG] }));
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
const B = require(path.join(WG, 'data', 'e2b', 'e2-math-b.js'));
const ART = require(path.join(WG, 'types', '_shared', 'e2-math-b-art.js'));
const F = require(path.join(WG, 'types', '_shared', 'e2-math-b.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const NO_RENDER = process.argv.includes('--no-render');
const NO_PDF = process.argv.includes('--no-pdf');
const SEEDS = Number(arg('seeds', QUICK ? '60' : '400'));
const ALL_IDS = ['G3-633', 'G3-634', 'G3-635', 'G3-636', 'G3-637', 'G3-638', 'G3-639', 'G3-640', 'G3-641', 'G3-642', 'G3-643', 'G3-644', 'G3-645', 'G3-646'];
const IDS = arg('only', '') ? arg('only', '').split(',') : ALL_IDS;
const MODE = { 'G3-633': 'e2b-hz', 'G3-634': 'e2b-hsub', 'G3-635': 'e2b-mz', 'G3-636': 'e2b-hmul', 'G3-637': 'e2b-hdiv', 'G3-638': 'e2b-mm', 'G3-639': 'e2b-km', 'G3-640': 'e2b-komma', 'G3-641': 'e2b-ueber', 'G3-642': 'e2b-tab-preis', 'G3-643': 'e2b-tab-sach', 'G3-644': 'e2b-zirkel', 'G3-645': 'e2b-dia', 'G3-646': 'e2b-kombi' };
const clone = (x) => JSON.parse(JSON.stringify(x));
const MN = '−', MAL = '·';
const PX_MM = 96 / 25.4, PT_MM = 72 / 25.4;

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
/** the small things drawn at real size: the length range (mm) a teacher accepts for the real thing */
const MM_OWN = { klammer: [26, 33], radierer: [35, 50], schraube: [25, 45], bleistift: [45, 75] };
/** everyday distances (metres, the range a teacher accepts) */
const DIST_OWN = {
  fussballfeld: [90, 120], schulhof: [40, 150], viertelstunde: [900, 1300], zehnfelder: [900, 1200], runden: [1000, 1000],
  hamburg: [775000, 800000], berlin: [570000, 600000], urlaub: [1000000, 3500000],
};
/** the card nearest on a tenfold scale: 100 m, 1000 m, or far more (10 km and up) */
const cardOf = (m) => { const l = Math.log10(m); return l < 2.5 ? 'h' : l < 3.5 ? 'k' : 'v'; };
const CARD_TEXT_OWN = { h: 'etwa 100 m', k: 'etwa 1 km', v: 'viele Kilometer' };
/** shop prices in cent (German supermarkets 2025) */
const SHOP_OWN = {
  brot: [149, 449], milch: [89, 169], butter: [169, 299], kaese: [129, 499], aepfel: [149, 399], bananen: [99, 249], nudeln: [69, 249],
  saft: [99, 299], joghurt: [29, 129], eier: [179, 399], honig: [299, 699], muesli: [179, 449], schokolade: [79, 249], kekse: [99, 299],
  reis: [99, 299], tomaten: [129, 349], gurke: [49, 129], kakao: [199, 449], karotten: [79, 199], wasser: [29, 129],
  kaffee: [399, 899], blumen: [299, 999], waschmittel: [349, 899], olivenoel: [349, 899], lachs: [299, 799], pizza: [199, 599],
};
/** pieces: gender, singular, plural, a plausible price for one (whole euros) */
const PIECE_OWN = {
  brezel: ['f', 'Brezel', 'Brezeln', [1, 2]], malblock: ['m', 'Malblock', 'Malblöcke', [2, 3]], kugel: ['f', 'Kugel Eis', 'Kugeln Eis', [1, 2]],
  bleistift: ['m', 'Bleistift', 'Bleistifte', [1, 2]], ball: ['m', 'Ball', 'Bälle', [4, 15]], buch: ['n', 'Buch', 'Bücher', [5, 15]],
  kinokarte: ['f', 'Kinokarte', 'Kinokarten', [5, 12]], eintrittskarte: ['f', 'Eintrittskarte', 'Eintrittskarten', [3, 20]],
  malkasten: ['m', 'Malkasten', 'Malkästen', [4, 12]], puzzle: ['n', 'Puzzle', 'Puzzles', [4, 12]], tasse: ['f', 'Tasse', 'Tassen', [2, 10]],
  netz: ['n', 'Netz Äpfel', 'Netze Äpfel', [2, 3]],
  fahrrad: ['n', 'Fahrrad', 'Fahrräder', [120, 400]], zelt: ['n', 'Zelt', 'Zelte', [40, 250]], roller: ['m', 'Roller', 'Roller', [30, 150]],
  stuhl: ['m', 'Stuhl', 'Stühle', [20, 120]], tisch: ['m', 'Tisch', 'Tische', [60, 300]], helm: ['m', 'Fahrradhelm', 'Fahrradhelme', [15, 80]],
};
const SPORTS_OWN = new Set(['Fußball', 'Schwimmen', 'Turnen', 'Radfahren', 'Tanzen', 'Basketball', 'Reiten', 'Tennis']);
/** what no chart of favourite sports shows (a "kann man nicht ablesen" statement names one of these) */
const NOT_SHOWN = /Mädchen|Jungen|Lena|Verein|Läufer|Nächstes Jahr|jeden Tag/;
/** what a Klasse-3 child could answer from its OWN class ("Unser Lieblingssport"): never a cannot-read statement */
const OWN_CLASS = /Jahre alt|Klasse \d|unsere Klasse/;
/** the rules printed, word for word */
const RULES_OWN = {
  ueber: 'Runde jeden Preis auf ganze Euro: Ab 50 Cent rundest du auf, sonst rundest du ab. Rechne dann die gerundeten Preise zusammen.',
  receipt: 'Ist die Summe mehr als 2 € von deinem Überschlag entfernt, kann sie nicht stimmen.',
  km: '1 km = 1000 m', mm: '1 cm = 10 mm',
};
/** the page words of review round 1, word for word (REVIEW-de.tsv) */
const WORDS_OWN = {
  'mm.things': 'Miss, wie lang die Dinge sind.', 'komma.convert': 'Wandle um.', 'dia.title': 'Lieblingssport an unserer Schule',
  'kombi.paint': 'Male in jedem Feld das T-Shirt und die Hose in den passenden Farben an.', 'tab.eachTail': '€ mehr.',
  'tab.each.f': 'Für jede {sg} mehr bezahlst du', 'tab.each.m': 'Für jeden {sg} mehr bezahlst du', 'tab.each.n': 'Für jedes {sg} mehr bezahlst du',
  'zirkel.flowerHint': 'Stich die Zirkelspitze in einen Punkt auf dem Kreis ein. Der Radius bleibt gleich.',
};
const TEACHER_OWN = /^Drucke in tatsächlicher Größe \(100 %\), sonst stimmen die /;
/** the instruction phrases each type must hold, and each level's own */
const INSTR_OWN = {
  'G3-633': ['kleine Aufgabe', 'Ergänze'],
  'G3-634': ['Abziehen: Beginne bei der ersten Zahl', 'Ergänzen: Beginne bei der zweiten Zahl', 'Zeichne die Sprünge ein'],
  'G3-635': ['Einmaleinsaufgabe', 'Zehnerzahl'],
  'G3-636': ['Zerlege die zweite Zahl in Zehner und Einer', 'Multipliziere erst mit den Zehnern, dann mit den Einern', 'Addiere dann die beiden Ergebnisse'],
  'G3-637': ['zwei Zahlen, die du gut teilen kannst', 'Malaufgabe'],
  'G3-638': ['auf den Millimeter genau', 'Lege die 0', 'Beginne am Punkt'],
  'G3-639': ['Ortsplan', '1 km = 1000 m', 'Verbinde'],
  'G3-640': ['drei Arten', 'nach dem Komma immer zwei Ziffern', 'Wandle unten jede Angabe in die andere Schreibweise um'],
  'G3-641': ['Runde jeden Preis auf ganze Euro', 'Überschlag'],
  'G3-642': ['Jedes Stück kostet gleich viel', 'Preis für 1 Stück'],
  'G3-643': ['Jedes Stück kostet gleich viel', 'Pfeile', 'Antwortsatz'],
  'G3-644': ['Stich die Zirkelspitze genau in den Mittelpunkt M ein', 'am Lineal', 'Zeichne bei einem Kreis den Radius als Strecke von M bis zum Kreis ein und schreibe r daran'],
  'G3-645': ['stimmt, stimmt nicht oder kann man nicht ablesen'],
  'G3-646': ['geordnet', 'wie viele Möglichkeiten', 'Malaufgabe'],
};
const INSTR_LV_OWN = {
  'G3-633': { 1: 'bis zum nächsten Hunderter.', 2: 'und bis 1000', 3: 'in zwei Schritten' },
  'G3-634': { 1: 'Rechne Aufgabe 3 auf beiden Wegen', 2: 'Beide Wege sind richtig', 3: 'Beide Wege sind richtig' },
  'G3-635': { 2: '240 : 6 = 40', 3: 'vorne, in der Mitte oder hinten' },
  'G3-636': { 1: 'wie du zerlegst', 2: 'wie du zerlegst', 3: 'mehr hilft' },
  'G3-637': { 1: 'ersten vier', 2: 'Zahl aus dem Zehnereinmaleins', 3: 'ersten zwei' },
  'G3-638': { 2: 'die Dinge', 3: 'Unterschied' },
  'G3-639': { 3: 'Welcher Weg ist kürzer' },
  'G3-640': { 2: '4,05 €', 3: '4,05 €' },
  'G3-641': { 3: 'begründe' },
  'G3-642': { 2: 'Lücken', 3: 'in jeder Tabelle zuerst den Preis für 1 Stück' },
  'G3-643': { 3: 'Preis für 1 Stück' },
  'G3-644': { 1: 'Mine auf die Zahl', 2: 'stellst du den Zirkel auf die Hälfte ein', 3: 'halb so lang wie der Durchmesser' },
  'G3-645': { 1: 'Ein Bild bedeutet 5 Kinder', 2: 'dieselbe Umfrage', 3: 'zwischen zwei Linien' },
  'G3-646': { 3: 'Baumdiagramme fertig' },
};
const nbsp = (s) => String(s).replace(/ /g, ' ');

/* ================================================================ 1. bank */
function bankFaults(b, artSrc, cant = F.CANT) {
  const f = [];
  for (const th of b.MM_THINGS) { const o = MM_OWN[th.id]; if (!o) { f.push(`real-size thing ${th.id}: not in the gate's table`); continue; } if (th.mm[0] < o[0] || th.mm[1] > o[1]) f.push(`real-size thing ${th.id}: ${th.mm} mm outside the gate's ${o}`); if (!th.src) f.push(`real-size thing ${th.id}: no source`); }
  if (b.MM_THINGS.length < 4) f.push('fewer than four real-size things');
  for (const x of b.DISTANCES) {
    const o = DIST_OWN[x.id];
    if (!o) { f.push(`distance ${x.id}: not in the gate's table`); continue; }
    if (x.m[0] < o[0] || x.m[1] > o[1]) f.push(`distance ${x.id}: ${x.m} m outside the gate's ${o}`);
    // both ends of the range on ONE card (nothing a careful child could put on two cards)
    if (cardOf(o[0]) !== cardOf(o[1])) f.push(`distance ${x.id}: its range spans two cards`);
    if (x.card !== cardOf(o[0])) f.push(`distance ${x.id}: the bank says ${x.card}, the gate ${cardOf(o[0])}`);
    if (!x.src) f.push(`distance ${x.id}: no source`);
    if (/\d+\s?(m|km)\b/.test(x.de) && !/400-m/.test(x.de)) f.push(`distance ${x.id}: its words name a length`);
  }
  for (const c of ['h', 'k', 'v']) if (b.DISTANCES.filter((x) => x.card === c).length < 2) f.push(`fewer than two distances for the card ${c}`);
  for (const it of b.SHOP) { const o = SHOP_OWN[it.id]; if (!o) { f.push(`shop ${it.id}: not in the gate's table`); continue; } if (it.ct[0] < o[0] || it.ct[1] > o[1]) f.push(`shop ${it.id}: ${it.ct} ct outside the gate's ${o}`); }
  for (const it of b.PIECES.concat(b.BIG_PIECES)) {
    const o = PIECE_OWN[it.id]; if (!o) { f.push(`piece ${it.id}: not in the gate's table`); continue; }
    if (it.g !== o[0] || it.sg !== o[1] || it.pl !== o[2]) f.push(`piece ${it.id}: ${it.g} ${it.sg} / ${it.pl} (the gate: ${o.slice(0, 3).join(' ')})`);
    if (it.eur[0] < o[3][0] || it.eur[1] > o[3][1]) f.push(`piece ${it.id}: ${it.eur} € outside the gate's ${o[3]}`);
  }
  for (const s of b.SPORTS) if (!SPORTS_OWN.has(s)) f.push(`sport ${s}: not in the gate's list`);
  for (const s of cant) { if (!NOT_SHOWN.test(s)) f.push(`"${s}": names nothing a chart of favourite sports leaves out`); if (OWN_CLASS.test(s)) f.push(`"${s}": a child can answer it from its own class`); }
  const X = b.TEXT;
  if (X.ueber.rule !== RULES_OWN.ueber) f.push('the rounding rule is not the gate\'s wording');
  if (X.ueber.receiptRule !== RULES_OWN.receipt) f.push('the receipt rule is not the gate\'s wording');
  if (X.km.rule !== RULES_OWN.km || X.mm.rule !== RULES_OWN.mm) f.push('a unit rule is not the gate\'s wording');
  if (Object.entries(X.km.cards).some(([k, v]) => CARD_TEXT_OWN[k] !== v)) f.push('a distance card is not the gate\'s wording');
  for (const [k, w] of Object.entries(WORDS_OWN)) { const v = k.split('.').reduce((o, x) => (o ? o[x] : undefined), b.TEXT); if (v !== w) f.push(`the page words ${k} read "${v}"`); }
  for (const k of ['mm', 'zirkel']) if (!TEACHER_OWN.test(b.TEXT[k].teacher || '')) f.push(`the teacher's note for ${k} reads "${b.TEXT[k].teacher}"`);
  for (const t of b.TREES) if (t.levels.length !== 3 || t.levels.some((l) => l.length !== 2) || t.short.some((l, i) => l.length !== 2)) f.push(`tree ${t.id}: not 2 x 2 x 2`);
  for (const k of b.ROW_KIDS) if (k.length !== 3 || new Set(k).size !== 3) f.push('a row of children not three different names');
  // the comma only for money and m/cm (the Klasse-3 Lehrplan): no "km" or "kg" with a comma anywhere in the bank's words
  const words = JSON.stringify(b.TEXT) + JSON.stringify(b.DISTANCES);
  if (/\d,\d+\s?(km|kg|g|l)\b/.test(words)) f.push('a comma number with km, kg, g or l');
  // no exclamation, no praise anywhere a child reads
  if (/!/.test(JSON.stringify(b.TEXT))) f.push('an exclamation in the page words');
  // every colour the drawings write
  for (const m of artSrc.matchAll(/#[0-9A-Fa-f]{6}\b/g)) if (!ART.PAL_E2B.has(m[0].toUpperCase())) f.push(`colour ${m[0]} outside PAL_E2B`);
  return f;
}
function instrFaults(id, lv, text) {
  const f = [], s = nbsp(text);
  for (const x of INSTR_OWN[id]) if (!s.includes(x)) f.push(`${id} L${lv}: the instruction lacks "${x}"`);
  const lx = INSTR_LV_OWN[id] && INSTR_LV_OWN[id][lv];
  if (lx && !s.includes(lx)) f.push(`${id} L${lv}: the level's instruction lacks "${lx}"`);
  if (/!/.test(s)) f.push(`${id} L${lv}: an exclamation in the instruction`);
  if (/der (richtige|beste|einzige) Weg/.test(s)) f.push(`${id} L${lv}: the instruction names one right way`);
  if (/(?<!halb)schriftlich/i.test(s)) f.push(`${id} L${lv}: the instruction names the written algorithm`);
  // the formulas never break inside: a no-break space in every printed example
  for (const m of String(text).matchAll(/\d [+−·:=] \d/g)) f.push(`${id} L${lv}: "${m[0]}" can break across a line`);
  return f;
}

/* ================================================================ 2. build */
function buildPage(t, lv, seed) {
  const b = t.build({ theme: null, difficulty: lv, locale: 'de', unit: null }, { rng: makeRng(instanceSeed({ typeId: t.id, theme: null, difficulty: lv, seedEpoch: 1, variant: seed })), variant: seed, seedVariant: seed });
  return { html: b.bodyHtml, meta: b.meta };
}
const txt = ($, e) => nbsp($(e).text()).replace(/\s+/g, ' ').trim();
/** the tokens of a number sentence: numbers (a comma number kept as text), words, operators, boxes */
function tokens($, rowEl) {
  const out = [];
  $(rowEl).children().each((i, c) => {
    const cls = $(c).attr('class') || '';
    if (/ws-blankbox/.test(cls)) out.push({ box: c.attribs['data-e2b-answer'], free: 'data-e2b-free' in c.attribs, sign: 'data-e2b-sign' in c.attribs, alt: c.attribs['data-e2b-alt'] });
    else if (/e2b-op/.test(cls)) out.push(txt($, c));
    else if (/e2b-big/.test(cls)) out.push(txt($, c));
  });
  return out;
}
const isBox = (x) => x && typeof x === 'object';
/** the value of one side: numbers and operators, · and : before + and − (the box takes v) */
function sideValue(side, v) {
  const terms = [];   // [sign, product]
  let sign = 1, prod = null, mop = null;
  const flush = () => { if (prod !== null) terms.push(sign * prod); prod = null; mop = null; };
  for (const x of side) {
    if (x === '+' || x === MN) { flush(); sign = x === '+' ? 1 : -1; continue; }
    if (x === MAL || x === ':') { mop = x; continue; }
    const n = isBox(x) ? v : Number(x);
    if (Number.isNaN(n)) return NaN;
    if (prod === null) prod = n; else if (mop === MAL) prod *= n; else if (mop === ':') { if (n === 0 || prod % n) return NaN; prod /= n; } else return NaN;
  }
  flush();
  return terms.reduce((s, t) => s + t, 0);
}
/** an equation with ONE stamped box (the others printed): the values 0..2000 that make it true */
function solveOne(tk) {
  const eq = tk.indexOf('='); if (eq < 0) return { err: 'no =' };
  const boxes = tk.filter(isBox);
  if (boxes.length !== 1) return { err: `${boxes.length} boxes` };
  const L = tk.slice(0, eq), R = tk.slice(eq + 1), sols = [];
  for (let v = 0; v <= 2000; v++) { const a = sideValue(L, v), b = sideValue(R, v); if (!Number.isNaN(a) && a === b) sols.push(v); }
  return { sols, stamp: boxes[0].box };
}
/** an equation whose every box is stamped: does it hold with the stamps (and, for an either-order pair, swapped) */
function holdsStamped(tk) {
  const eq = tk.indexOf('='); if (eq < 0) return false;
  const val = (side) => sideValue(side.map((x) => (isBox(x) ? String(x.box) : x)), 0);
  return val(tk.slice(0, eq)) === val(tk.slice(eq + 1));
}
const eqTokens = ($, sel) => $(sel).toArray().map((e) => ({ el: e, tk: tokens($, e) }));
const numOf = (s) => Number(String(s).replace(',', '.'));
const commaOwn = (n) => `${Math.floor(n / 100)},${String(n % 100).padStart(2, '0')}`;

/** every page's faults, by mode */
function pageFaults(id, lv, html) {
  const f = [];
  const $ = cheerio.load(html);
  const R = $('[data-dk]');
  if (!R.length) return ['no page root'];
  const mode = R.attr('data-e2b-mode');
  if (mode !== MODE[id]) f.push(`the mode is ${mode}`);
  if (R.attr('data-e2b-locale') !== 'de') f.push('not a German page');
  // every stamped box that stands alone in its sentence: ONE value, = the stamp
  const solveAll = (sel, label) => {
    let n = 0;
    for (const { el, tk } of eqTokens($, sel)) {
      const bx = tk.filter(isBox);
      if (bx.length === 1 && !bx[0].free && !bx[0].sign && tk.every((x) => isBox(x) || /^[\d]+$/.test(x) || ['+', MN, MAL, ':', '='].includes(x))) {
        n++;
        const r = solveOne(tk);
        if (r.err) f.push(`${label}: ${r.err}`);
        else if (r.sols.length !== 1 || String(r.sols[0]) !== String(r.stamp)) f.push(`${label} "${tk.map((x) => (isBox(x) ? '☐' : x)).join(' ')}": ${r.sols.length} values fit (${r.sols.slice(0, 3)}), the stamp ${r.stamp}`);
      }
    }
    return n;
  };
  const instrHas = (s) => html.includes(s);
  void instrHas;
  if (mode === 'e2b-hz') {
    const LV = F.HZ_LV[lv];
    const pairs = R.find('[data-e2b-pair]').toArray();
    if (LV.mixed ? pairs.length : !pairs.length) f.push(`${pairs.length} pairs at level ${lv}`);
    const seen = new Set();
    for (const p of pairs) {
      const s = tokens($, $(p).find('[data-e2b-small]')[0]), bg = tokens($, $(p).find('[data-e2b-bigtask]')[0]);
      const [a, o, b2] = s, [A2, O, B2] = bg;
      if (o !== O) f.push(`a pair with two operations (${o}, ${O})`);
      const k = Number(A2) / Number(a);
      if (!((k === 100 && Number(B2) === 100 * Number(b2)) || (k === 10 && Number(B2) === 10 * Number(b2)))) f.push(`the big task ${A2} ${O} ${B2} is not the small task ${a} ${o} ${b2} times 10 or 100`);
      if (Number(s[4].box) * k !== Number(bg[4].box)) f.push(`the big result is not the small result times ${k}`);
      const key = `${A2}${O}${B2}`; if (seen.has(key)) f.push(`the pair ${key} twice`); seen.add(key);
      if ([a, b2].sort().join() === '3,4' && o === '+') f.push('the instruction\'s own example 3 + 4 as a task');
    }
    const blocks = R.find('[data-e2b-block]').toArray().map((e) => $(e).attr('data-e2b-block'));
    const want = LV.mixed ? ['mixed', 'D3'] : LV.blocks.map((x) => x[0]).concat('D');
    if (blocks.join() !== want.join()) f.push(`the blocks ${blocks} (the level: ${want})`);
    // block C crosses the hundred, block B never does
    R.find('[data-e2b-block="B"] [data-e2b-bigtask], [data-e2b-block="C"] [data-e2b-bigtask], [data-e2b-bigtask][data-e2b-kind]').each((i, e) => {
      const tk = tokens($, e), x = Number(tk[0]), y = Number(tk[2]), z = Number(tk[4].box);
      const kind = $(e).attr('data-e2b-kind') || $(e).closest('[data-e2b-block]').attr('data-e2b-block');
      if (kind === 'A') return;
      const cross = Math.floor(x / 100) !== Math.floor(z / 100);
      if (kind === 'B' && cross) f.push(`a Zehnerzahl task ${x} ${tk[1]} ${y} crosses a hundred`);
      if (kind === 'C' && !cross) f.push(`a task over the hundred ${x} ${tk[1]} ${y} does not cross one`);
      if (z % 100 === 0) f.push(`a result on a hundred (${z}) in block ${kind}`);
    });
    if (solveAll('[data-e2b-eq]', 'hz') < 10) f.push('fewer than ten sentences to solve');
    R.find('[data-e2b-fill="next"]').each((i, e) => { const tk = tokens($, e); if (Number(tk[4]) !== Math.ceil(Number(tk[0]) / 100) * 100) f.push(`"${tk[0]} + ☐ = ${tk[4]}" is not the next hundred`); });
    const twos = R.find('[data-e2b-two]').toArray();
    if (LV.mixed && twos.length !== 3 * LV.twoStep) f.push(`${twos.length} two-step rows`);
    R.find('[data-e2b-eq] .ws-blankbox').each((i, e) => { const v = Number(e.attribs['data-e2b-answer']); if (!(v >= 1 && v <= 1000)) f.push(`an answer ${v} outside 1..1000`); });
  }
  if (mode === 'e2b-hsub') {
    const LV = F.HSUB_LV[lv];
    const cards = R.find('[data-e2b-card]').toArray();
    if (cards.length !== 2) f.push(`${cards.length} task cards`);
    const kinds = [];
    const checkTask = (el, label) => {
      const tk = tokens($, el), a = Number(tk[0]), b = Number(tk[2]), r = Number(tk[4].box);
      if (a - b !== r) f.push(`${label}: ${a} − ${b} stamped ${r}`);
      const kind = $(el).attr('data-e2b-kind'); kinds.push(kind);
      const near = a - b <= LV.nearMax && Math.floor(a / 100) !== Math.floor(b / 100);
      if (kind === 'near' ? !near : a - b < 150) f.push(`${label}: ${a} − ${b} is not ${kind}`);
      if (kind === 'far' && F.subCross(a, b) !== LV.cross) f.push(`${label}: ${a} − ${b} crosses ${F.subCross(a, b)} times (the level: ${LV.cross})`);
      if (a > 1000 || b < 100) f.push(`${label}: not three-digit numbers to 1000`);
      return { a, b };
    };
    cards.forEach((c, k) => {
      const q = checkTask($(c).find('[data-e2b-task]')[0], `card ${k + 1}`);
      // the key names BOTH ways with their right steps
      const key = nbsp($(c).attr('data-e2b-key') || '');
      const sub = F.subSteps(q.a, q.b).map((s) => `${s[0]} ${MN} ${s[2]} = ${s[3]}`), add = F.addSteps(q.a, q.b).map((s) => `${s[0]} + ${s[2]} = ${s[3]}`);
      if (!/Beide Wege sind richtig/.test(key) || sub.some((s) => !key.includes(s)) || add.some((s) => !key.includes(s))) f.push(`card ${k + 1}: the key does not give both ways`);
      if (sub.reduce((x, s) => x, 0) !== 0 || F.subSteps(q.a, q.b).slice(-1)[0][3] !== q.a - q.b || F.addSteps(q.a, q.b).reduce((s, x) => s + x[2], 0) !== q.a - q.b) f.push(`card ${k + 1}: the steps do not reach ${q.a - q.b}`);
      const way = $(c).find('[data-e2b-way]').attr('data-e2b-way');
      if (LV.given) {
        if (!way) f.push(`card ${k + 1}: no way named at level 1`);
        // level 1 models the lesson's choice: the near task ergänzt, the far task abgezogen
        const kd = $(c).find('[data-e2b-task]').attr('data-e2b-kind');
        if (way && (kd === 'near') !== (way === 'add')) f.push(`card ${k + 1}: a ${kd} task named "${way === 'add' ? 'Ergänze' : 'Ziehe schrittweise ab'}"`);
        else { const st = way === 'sub' ? F.subSteps(q.a, q.b)[0] : F.addSteps(q.a, q.b)[0]; const m = tokens($, $(c).find('[data-e2b-model]')[0]); if (m.join(' ') !== `${st[0]} ${st[1]} ${st[2]} = ${st[3]}`) f.push(`card ${k + 1}: the printed first step ${m.join(' ')}`); }
      } else if (way || !$(c).find('[data-e2b-open]').length) f.push(`card ${k + 1}: the way is not the child's choice`);
      // the step boxes are the child's (no stamp): every way with right steps is right
      if ($(c).find('[data-e2b-steprow] [data-e2b-answer]').length) f.push(`card ${k + 1}: a step box carries a stamp`);
    });
    if (LV.given) { const ws = cards.map((c) => $(c).find('[data-e2b-way]').attr('data-e2b-way')).sort().join(); if (ws !== 'add,sub') f.push(`the named ways ${ws}`); }
    if (kinds.slice(0, 2).sort().join() !== 'far,near') f.push(`the two cards are ${kinds}`);
    R.find('[data-e2b-steps]').each((i, e) => { const way = $(e).attr('data-e2b-steps'), rows = $(e).find('[data-e2b-steprow], [data-e2b-model]').length; if (rows !== (way === 'sub' ? 3 : 4)) f.push(`${rows} step rows for ${way === 'sub' ? 'abziehen' : way === 'add' ? 'ergänzen' : 'the child\'s own way'}`); });
    if (R.find('[data-e2b-steps]').length !== 4) f.push(`${R.find('[data-e2b-steps]').length} step places`);
    R.find('[data-e2b-task]').each((i, e) => { const tk = tokens($, e), a = Number(tk[0]), b = Number(tk[2]); if (F.addSteps(a, b).length > 4 || F.subSteps(a, b).length > 3) f.push(`${a} − ${b}: the key's way needs more rows than the page has`); });
    const both = R.find('[data-e2b-both]');
    if (!both.length) f.push('no card on both ways');
    else { checkTask(both.find('[data-e2b-task]')[0], 'both ways'); if (both.find('[data-e2b-task]').attr('data-e2b-kind') !== LV.both) f.push('the both-ways task is not ' + LV.both); }
    // the comparison and every choice OPEN (no box stamped right)
    if (R.find('[data-e2b-open] [data-dk-answer]').length) f.push('an open choice carries a right answer');
    R.find('[data-e2b-open]').each((i, e) => { if (!/richtig/.test(nbsp($(e).attr('data-e2b-key') || ''))) f.push('an open choice whose key does not say both are right'); });
    if (!!R.find('[data-e2b-both] [data-g1-frame]').length !== LV.why) f.push(`the "Warum?" line ${LV.why ? 'missing' : 'on a level without it'}`);
    const quick = R.find('[data-e2b-quick]').toArray();
    if (quick.length !== LV.quick) f.push(`${quick.length} tasks to decide (the level: ${LV.quick})`);
  }
  if (mode === 'e2b-mz') {
    const LV = F.MZ_LV[lv];
    const smalls = R.find('[data-e2b-small]').toArray();
    if (smalls.length !== LV.pics + LV.plain) f.push(`${smalls.length} pairs`);
    let divs = 0, nonEnd = 0;
    for (const s of smalls) {
      const k = $(s).attr('data-e2b-small'), bg = R.find(`[data-e2b-bigtask="${k}"]`)[0];
      const ts = tokens($, s), tb = tokens($, bg);
      const vals = (tk) => tk.filter((x) => isBox(x) || /^\d+$/.test(x)).map((x) => (isBox(x) ? Number(x.box) : Number(x)));
      const [a, b, c] = vals(ts), [A2, B2, C2] = vals(tb);
      const op0 = ts.find((x) => x === MAL || x === ':');
      if (op0 === ':') divs++;
      const okPair = op0 === MAL ? (a * b === c && A2 === a && B2 === 10 * b && C2 === 10 * c) : (a === b * c && A2 === 10 * a && B2 === b && C2 === 10 * c);
      if (!okPair) f.push(`pair ${k}: ${ts.map((x) => (isBox(x) ? x.box : x)).join(' ')} and ${tb.map((x) => (isBox(x) ? x.box : x)).join(' ')} are not a task and its tenfold`);
      if (C2 > 1000 || A2 > 1000) f.push(`pair ${k}: past 1000`);
      if (op0 === MAL && a * b === 12 && Math.abs(a - b) === 1) f.push('the instruction\'s own example 3 · 4 as a task');
      if (op0 === ':' && b === 6 && c === 4) f.push('the instruction\'s own example 24 : 6 as a task');
      if (isBox(ts[ts.length - 1]) === false) nonEnd++;
      const pic = $(bg).closest('[data-e2b-paircard]');
      if (pic.length) {
        const g = Number(pic.find('[data-e2b-groups]').attr('data-e2b-groups')), r = Number(pic.find('[data-e2b-rods]').attr('data-e2b-rods'));
        // the picture: a · 10b as a groups of b rods; 10ab : a as the same rods shared into a groups
        const want = op0 === MAL ? [a, b] : [b, c];
        if (g !== want[0] || r !== want[1]) f.push(`pair ${k}: the picture shows ${g} groups of ${r} rods for ${tb.map((x) => (isBox(x) ? x.box : x)).join(' ')}`);
        if (!isBox(tb[tb.length - 1])) f.push(`pair ${k}: a picture pair with a missing factor (the picture would show it)`);
      }
    }
    // no task prints another task's answer: a product (a times result, a division's first number) that is the box of
    // one task is never printed in another ("80 : 4" beside "4 · 20 = ☐")
    const prodAns = new Map(), prodShown = new Map();
    R.find('[data-e2b-small], [data-e2b-bigtask]').each((i, e) => {
      const tk = tokens($, e), nums = tk.filter((x) => isBox(x) || /^\d+$/.test(x)), op = tk.find((x) => x === MAL || x === ':');
      const at = op === MAL ? 2 : 0, P = isBox(nums[at]) ? Number(nums[at].box) : Number(nums[at]), id = ($(e).attr('data-e2b-small') || $(e).attr('data-e2b-bigtask')) + ($(e).is('[data-e2b-small]') ? 's' : 'b');
      (isBox(nums[at]) ? prodAns : prodShown).set(P, (isBox(nums[at]) ? prodAns : prodShown).get(P) || id);
    });
    for (const [P, id] of prodAns) if (prodShown.has(P)) f.push(`the answer ${P} of task ${id} is printed in task ${prodShown.get(P)}`);
    if (!LV.div && divs) f.push('a division at level 1');
    if (LV.div && !divs) f.push('no division');
    if (LV.missing ? !nonEnd : nonEnd) f.push(`${nonEnd} pairs with the missing number not at the end (level ${lv})`);
    solveAll('[data-e2b-eq]', 'mz');
  }
  if (mode === 'e2b-hmul') {
    const LV = F.HMUL_LV[lv];
    const cards = R.find('[data-e2b-mul]').toArray();
    if (cards.length !== LV.tasks) f.push(`${cards.length} tasks`);
    for (const c of cards) {
      const a = Number($(c).attr('data-e2b-a')), b = Number($(c).attr('data-e2b-b')), z = b - (b % 10), e = b % 10;
      const lab = `${a} · ${b}`;
      if (a < LV.a[0] || a > LV.a[1] || b < LV.b[0] || b > LV.b[1] || e < 2 || a * b > 1000) f.push(`${lab}: outside the level`);
      if (b === 37) f.push('the title\'s own task 37');
      const st = (sel) => $(c).find(sel).attr('data-e2b-answer');
      if (Number(tokens($, $(c).find('[data-e2b-task]')[0])[4].box) !== a * b) f.push(`${lab}: the result box`);
      if (LV.field) {
        if (Number(st('[data-e2b-part="z"]')) !== z || Number(st('[data-e2b-part="e"]')) !== e) f.push(`${lab}: the parts over the Punktefeld`);
        const fld = $(c).find('[data-e2b-art="dot-field"]');
        if (Number(fld.attr('data-e2b-rows')) !== a || Number(fld.attr('data-e2b-cols')) !== b || Number(fld.attr('data-e2b-z')) !== z) f.push(`${lab}: the Punktefeld is not ${a} x ${b} split at ${z}`);
        if (fld.find('circle').length !== a * b) f.push(`${lab}: ${fld.find('circle').length} dots`);
        for (const w of ['z', 'e']) { const g = $(c).find(`[data-e2b-partgroup="${w}"]`); if (!g.length || txt($, g.find('[data-e2b-partlabel]')[0]) !== `${a} ${MAL}` || !g.find(`[data-e2b-part="${w}"]`).length) f.push(`${lab}: the ${w === 'z' ? 'tens' : 'ones'} box over the Punktefeld without "${a} ${MAL}" before it`); }
      } else if ($(c).find('[data-e2b-art="dot-field"]').length) f.push(`${lab}: a Punktefeld at level 3`);
      const heads = LV.heads ? [$(c).find('[data-e2b-head="z"]').text(), $(c).find('[data-e2b-head="e"]').text()].map(Number) : [Number(st('[data-e2b-kopf="z"]')), Number(st('[data-e2b-kopf="e"]'))];
      if (heads[0] !== z || heads[1] !== e) f.push(`${lab}: the Malkreuz heads ${heads}`);
      if (Number($(c).find('[data-e2b-rowhead]').text()) !== a) f.push(`${lab}: the Malkreuz row head`);
      if (Number(st('[data-e2b-teil="z"]')) !== a * z || Number(st('[data-e2b-teil="e"]')) !== a * e) f.push(`${lab}: the Malkreuz products`);
      const s1 = tokens($, $(c).find('[data-e2b-step="1"]')[0]), s2 = tokens($, $(c).find('[data-e2b-step="2"]')[0]), s3 = tokens($, $(c).find('[data-e2b-step="3"]')[0]);
      // the one-digit factor printed first in both step rows (30 · 4 is never a second fill); the tens first
      if (s1[0] !== String(a) || s2[0] !== String(a)) f.push(`${lab}: a step row does not start with ${a}`);
      const v = (tk) => tk.map((x) => (isBox(x) ? x.box : x));
      if (v(s1).join(' ') !== `${a} ${MAL} ${z} = ${a * z}` || v(s2).join(' ') !== `${a} ${MAL} ${e} = ${a * e}` || v(s3).join(' ') !== `${a * z} + ${a * e} = ${a * b}`) f.push(`${lab}: the steps ${v(s1).join(' ')} | ${v(s2).join(' ')} | ${v(s3).join(' ')}`);
      if (s3[0].alt !== String(a * e) || s3[2].alt !== String(a * z)) f.push(`${lab}: the sum's two parts do not take either order`);
    }
    // two options say "mehr", three say "am meisten"
    const nOpts = R.find('[data-e2b-open="helps"] .e2b-tick').length, rt = txt($, R.find('[data-e2b-reflect]')[0] || R.find('[data-e2b-open="helps"]').parent()[0]);
    if (nOpts !== (LV.field ? 3 : 2) || (nOpts === 2 ? /am meisten/.test(rt) || !/mehr/.test(rt) : !/am meisten/.test(rt))) f.push(`the reflection offers ${nOpts} and reads "${rt.slice(0, 60)}"`);
    const refl = R.find('[data-e2b-reflect] [data-e2b-open]');
    if (!refl.length || refl.find('[data-dk-answer]').length) f.push('the reflection is not open');
  }
  if (mode === 'e2b-hdiv') {
    const LV = F.HDIV_LV[lv];
    const cards = R.find('[data-e2b-div]').toArray();
    const given = cards.filter((c) => $(c).attr('data-e2b-given') === '1'), own = cards.filter((c) => $(c).attr('data-e2b-given') === '0');
    if (given.length !== LV.given || own.length !== LV.own) f.push(`${given.length} given and ${own.length} own tasks`);
    const qs = new Set();
    for (const c of cards) {
      const n = Number($(c).attr('data-e2b-n')), d = Number($(c).attr('data-e2b-d')), q = n / d, lab = `${n} : ${d}`;
      if (n % d) f.push(`${lab}: a remainder`);
      if (q < 11) f.push(`${lab}: a one-digit result`);
      if (LV.kind === 'big' ? n < 100 || n > 200 : n > 99) f.push(`${lab}: outside the level's numbers`);
      if (qs.has(q)) f.push(`the result ${q} twice`); qs.add(q);
      if (qs.has('n' + n)) f.push(`the number ${n} to divide twice`); qs.add('n' + n);
      if (Number(tokens($, $(c).find('[data-e2b-task]')[0])[4].box) !== q) f.push(`${lab}: the result box`);
      const placeOk = Math.floor(n / 10) % d === 0 && (n % 10) % d === 0;
      if (LV.kind === 'place' && !placeOk) f.push(`${lab}: the tens and ones do not both divide (level 1)`);
      if (LV.kind === 'times' && Math.floor(n / 10) % d === 0) f.push(`${lab}: the tens divide (level 2 needs a split from the Einmaleins)`);
      const bl = $(c).find('[data-e2b-art="blocks"]');
      if (bl.length) { const v = 100 * bl.find('[data-e2b-plate]').length + 10 * bl.find('[data-e2b-rod]').length + bl.find('[data-e2b-cube]').length; if (v !== n) f.push(`${lab}: the blocks show ${v}`); }
      else if ($(c).attr('data-e2b-given') === '1' || LV.ownPic) f.push(`${lab}: no blocks`);
      const last = tokens($, $(c).find('[data-e2b-part="3"]')[0]);
      if (Number(last[last.length - 1].box) !== q) f.push(`${lab}: the last box is not ${q}`);
      if ($(c).attr('data-e2b-given') === '1') {
        const sp = tokens($, $(c).find('[data-e2b-split="given"]')[0]).map((x) => (isBox(x) ? x.box : x));
        const L = Number(sp[2]), Rr = Number(sp[4]);
        if (sp[0] !== String(n) || L + Rr !== n || L % d || Rr % d || L % 10) f.push(`${lab}: the printed split ${sp.join(' ')}`);
        if (L !== F.hdivSplit(n, d, LV.kind)) f.push(`${lab}: the split is not the largest Zehnerzahl that divides`);
        if (Number(bl.attr('data-e2b-split')) !== L) f.push(`${lab}: the blocks are not split at ${L}`);
        const p1 = tokens($, $(c).find('[data-e2b-part="1"]')[0]), p2 = tokens($, $(c).find('[data-e2b-part="2"]')[0]);
        if (Number(p1[4].box) !== L / d || Number(p2[4].box) !== Rr / d) f.push(`${lab}: the part results`);
        if (last[0].alt !== String(Rr / d) || last[2].alt !== String(L / d)) f.push(`${lab}: the sum's parts do not take either order`);
      } else {
        // the child's own split: every box its own, but the result; the key says every right split is right
        if ($(c).find('[data-e2b-split="own"] [data-e2b-answer], [data-e2b-part="1"] [data-e2b-answer], [data-e2b-part="2"] [data-e2b-answer]').length) f.push(`${lab}: a stamped box in the child's own split`);
        if (!/Jede Zerlegung/.test(nbsp($(c).attr('data-e2b-key') || ''))) f.push(`${lab}: the open split without its key`);
      }
    }
    const allN = cards.map((c) => Number($(c).attr('data-e2b-n'))), allQ = cards.map((c) => Number($(c).attr('data-e2b-n')) / Number($(c).attr('data-e2b-d')));
    for (const q of allQ) if (allN.includes(q)) f.push(`the result ${q} is another task's number to divide`);
    const probes = R.find('[data-e2b-probe]').toArray();
    if (probes.length !== 2) f.push(`${probes.length} Proben`);
    for (const p of probes) {
      const k = Number($(p).attr('data-e2b-probe')), c = cards[k - 1], tk = tokens($, p);
      if (!c || $(c).attr('data-e2b-given') !== '0') { f.push(`the Probe ${k} is not on an own task`); continue; }
      const n = Number($(c).attr('data-e2b-n')), d = Number($(c).attr('data-e2b-d'));
      if (Number(tk[0].box) !== n / d || tk[2] !== String(d) || Number(tk[4].box) !== n) f.push(`the Probe ${k}: ${tk.map((x) => (isBox(x) ? x.box : x)).join(' ')}`);
    }
  }
  if (mode === 'e2b-mm') {
    const LV = F.MM_LV[lv];
    const lines = R.find('[data-e2b-art="mm-line"]').toArray().map((e) => Number($(e).attr('data-e2b-mm')));
    const things = R.find('[data-e2b-art="real-thing"]').toArray().map((e) => [$(e).attr('data-e2b-thing'), Number($(e).attr('data-e2b-mm'))]);
    const draws = R.find('[data-e2b-draw]').toArray().map((e) => Number($(e).attr('data-e2b-len')));
    if (lines.length !== LV.lines || things.length !== LV.things || draws.length !== LV.draw.length) f.push(`${lines.length} lines, ${things.length} things, ${draws.length} to draw`);
    const all = lines.concat(things.map((x) => x[1]), draws);
    for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) if (Math.abs(all[i] - all[j]) < 3) f.push(`two lengths ${all[i]} and ${all[j]} mm less than 3 mm apart`);
    for (const v of all) { if (v % 10 === 0) f.push(`a whole ${v / 10} cm`); if (v === 47) f.push('the instruction\'s own 47 mm'); if (!Number.isInteger(v)) f.push(`${v} mm is not whole`); }
    for (const v of lines) if (v < 31 || v > 96) f.push(`a line of ${v} mm`);
    for (const [id, v] of things) if (!MM_OWN[id] || v < MM_OWN[id][0] || v > MM_OWN[id][1]) f.push(`the ${id} at ${v} mm`);
    for (const v of draws) if (v < 31 || v > (LV.long ? 129 : 96)) f.push(`a line to draw of ${v} mm`);
    if (LV.long && !draws.some((v) => v > 100)) f.push('no line longer than 10 cm to draw at level 3');
    // the frames: "☐ cm ☐ mm = ☐ mm"
    R.find('[data-e2b-frame]').each((i, e) => { const w = $(e).attr('data-e2b-frame'); const mm = lines.concat(things.map((x) => x[1]))[i]; const tk = tokens($, e).filter(isBox).map((x) => Number(x.box)); if (tk.join() !== [Math.floor(mm / 10), mm % 10, mm].join()) f.push(`the frame ${w}: ${tk}`); });
    // the draw labels say the length (as cm and mm, or as mm)
    R.find('[data-e2b-drawlabel]').each((i, e) => { const s = txt($, e), v = draws[i]; if (!(s.endsWith(`${v} mm`) && !/cm/.test(s)) && !s.endsWith(`${Math.floor(v / 10)} cm ${v % 10} mm`)) f.push(`the draw label "${s}" for ${v} mm`); });
    const diff = R.find('[data-e2b-diff]');
    if (LV.diff !== !!diff.length) f.push('the difference task');
    if (diff.length && Number(tokens($, diff[0])[0].box) !== Math.max(...lines) - Math.min(...lines)) f.push('the difference box');
    if (!R.find('[data-e2b-art="mm-ruler"]').length) f.push('no ruler');
  }
  if (mode === 'e2b-km') {
    const LV = F.KM_LV[lv];
    const roads = R.find('[data-e2b-road]').toArray().map((e) => ({ id: $(e).attr('data-e2b-road'), m: Number($(e).attr('data-e2b-m')), len: Math.hypot(Number(e.attribs.x2) - Number(e.attribs.x1), Number(e.attribs.y2) - Number(e.attribs.y1)) }));
    if (roads.length !== 6) f.push(`${roads.length} roads`);
    const roadM = (a, b) => { const r = roads.find((x) => x.id === `${a}-${b}` || x.id === `${b}-${a}`); return r ? r.m : null; };
    // the lengths in proportion to the drawn roads (rounded): a longer road never carries a clearly smaller length
    for (const x of roads) for (const y of roads) if (x.len > y.len * 1.15 && x.m < y.m) f.push(`the road ${x.id} drawn longer than ${y.id} but shorter in metres`);
    for (const x of roads) if (x.m % LV.round) f.push(`a road of ${x.m} m (the level rounds to ${LV.round})`);
    const routes = R.find('[data-e2b-route]').toArray();
    if (routes.length !== LV.routes) f.push(`${routes.length} routes`);
    const sums = [];
    routes.forEach((r, k) => {
      const ids = $(r).attr('data-e2b-route').split(',');
      if (ids.length !== LV.legs + 1 || new Set(ids).size !== ids.length) f.push(`route ${k + 1}: ${ids.length - 1} roads`);
      const legs = ids.slice(1).map((v, i) => roadM(ids[i], v));
      if (legs.some((x) => x == null)) { f.push(`route ${k + 1}: two places with no road between them`); return; }
      const tk = tokens($, R.find(`[data-e2b-routeeq="${k + 1}"]`)[0]).filter(isBox).map((x) => Number(x.box));
      const s = legs.reduce((a, b) => a + b, 0); sums.push(s);
      if (tk.join() !== legs.concat(s).join()) f.push(`route ${k + 1}: the boxes ${tk}, the roads ${legs} = ${s}`);
      if (s > 1000) f.push(`route ${k + 1}: ${s} m`);
    });
    const fillXs = [];
    R.find('[data-e2b-fill]').each((i, e) => { const tk = tokens($, e), x = Number(tk[0]); fillXs.push(x); if (x + Number(tk[3].box) !== 1000) f.push(`"${tk[0]} m + ☐ m = 1 km" stamped ${tk[3].box}`); if (LV.fillKind === 'h' ? x % 50 : x % 100 === 0) f.push(`a completion from ${tk[0]} at level ${lv}`); });
    if (fillXs.length !== LV.fills) f.push(`${fillXs.length} completions to 1 km`);
    // nothing printed gives another task's answer away: a completion's number is never a route's total, what a route
    // lacks to 1 km, or another completion's answer
    for (const x of fillXs) { if (sums.includes(x) || sums.includes(1000 - x)) f.push(`the completion from ${x} m gives a route's answer away`); if (fillXs.includes(1000 - x) && x !== 500) f.push(`the completions from ${x} and ${1000 - x} give each other's answer away`); }
    R.find('[data-e2b-missing]').each((i, e) => { const k = Number($(e).attr('data-e2b-missing')); if (Number(tokens($, e)[0].box) !== 1000 - sums[k - 1]) f.push(`what route ${k} lacks to 1 km`); });
    if (LV.missing !== R.find('[data-e2b-missing]').length) f.push('the "fehlen bis 1 km" tasks');
    const cmp = R.find('[data-g1-one][data-dk-item="shorter"]');
    if (LV.shorter !== !!cmp.length) f.push('the "kürzer" question');
    if (cmp.length) {
      // the gate's own reading: from A to B "über X" is the shortest way through X; one answer, 30 m apart
      const names = Object.fromEntries(R.find('[data-e2b-place]').toArray().map((e) => [$(e).attr('data-e2b-place'), $(e).find('[data-e2b-placename]').attr('data-e2b-placename')]));
      const head = txt($, R.find('[data-e2b-cmp]')[0]);
      const dat = { 'der Schule': 'schule', 'der Bäckerei': 'baeckerei', 'dem Spielplatz': 'spielplatz', 'dem Schwimmbad': 'schwimmbad', 'dem Bahnhof': 'bahnhof' };
      const to = { 'zur Schule': 'schule', 'zur Bäckerei': 'baeckerei', 'zum Spielplatz': 'spielplatz', 'zum Schwimmbad': 'schwimmbad', 'zum Bahnhof': 'bahnhof' };
      const m0 = /^Von (der \S+|dem \S+) (zur \S+|zum \S+):/.exec(head);
      const acc = { 'die Schule': 'schule', 'die Bäckerei': 'baeckerei', 'den Spielplatz': 'spielplatz', 'das Schwimmbad': 'schwimmbad', 'den Bahnhof': 'bahnhof' };
      if (!m0) f.push(`the "kürzer" question reads "${head}"`);
      else {
        const A0 = dat[m0[1]], B0 = to[m0[2]];
        const places = Object.keys(names);
        const minVia = (v) => { let best = Infinity; const rec = (path, s) => { const cur = path[path.length - 1]; if (cur === B0) { if (path.includes(v)) best = Math.min(best, s); return; } for (const nx of places) if (!path.includes(nx)) { const m = roadM(cur, nx); if (m != null) rec(path.concat(nx), s + m); } }; rec([A0], 0); return best; };
        const opts = cmp.find('[data-e2b-pick]').toArray().map((e) => ({ v: acc[txt($, e).replace(/^über /, '')], right: $(e).attr('data-dk-answer') === 'right' }));
        const mv = opts.map((o) => minVia(o.v));
        if (opts.length !== 2 || mv.some((x) => !Number.isFinite(x))) f.push('the "kürzer" options are not two ways');
        else {
          if (Math.abs(mv[0] - mv[1]) < 30) f.push(`the two ways ${mv} less than 30 m apart`);
          const want = mv[0] < mv[1] ? 0 : 1;
          if (!opts[want].right || opts[1 - want].right) f.push(`the "kürzer" stamp is not the shorter way (${mv})`);
        }
        // each way's frame: the two roads through its stop and their sum (review round 1)
        opts.forEach((o, k) => { const fr = R.find(`[data-e2b-viaeq="${k + 1}"]`); const bx = fr.length ? tokens($, fr[0]).filter(isBox).map((x) => Number(x.box)) : []; const via = acc[txt($, cmp.find('[data-e2b-pick]')[k]).replace(/^über /, '')]; const legs = [roadM(A0, via), roadM(via, B0)]; if (bx.length !== 3 || bx[0] + bx[1] !== bx[2] || bx[2] !== mv[k] || bx.slice(0, 2).sort().join() !== legs.slice().sort().join()) f.push(`the way ${k + 1}'s frame "${bx.join(' + ')}" is not ${legs.join(' + ')} = ${mv[k]}`); });
      }
    }
    const items = R.find('[data-e2b-match]').toArray();
    if (items.length !== 6) f.push(`${items.length} distances to connect`);
    for (const it of items) { const id = $(it).attr('data-e2b-dist'), c = $(it).attr('data-e2b-match'); const o = DIST_OWN[id]; if (!o) f.push(`the distance ${id} not in the gate's table`); else if (cardOf(o[0]) !== c) f.push(`${id} stamped ${c}, the gate ${cardOf(o[0])}`); }
    for (const c of ['h', 'k', 'v']) if (items.filter((it) => $(it).attr('data-e2b-match') === c).length !== 2) f.push(`not two distances for ${c}`);
    if (!html.includes(RULES_OWN.km)) f.push('"1 km = 1000 m" not printed');
  }
  if (mode === 'e2b-komma') {
    const LV = F.KOMMA_LV[lv];
    const rowsM = R.find('[data-e2b-row="money"]').toArray(), rowsL = R.find('[data-e2b-row="len"]').toArray();
    if (rowsM.length !== LV.money || rowsL.length !== LV.len) f.push(`${rowsM.length} amounts and ${rowsL.length} lengths`);
    const zeroRows = { money: 0, len: 0 };
    for (const r of rowsM.concat(rowsL)) {
      const v = Number($(r).attr('data-e2b-v')), isM = $(r).attr('data-e2b-row') === 'money';
      if (v % 100 < 10) zeroRows[$(r).attr('data-e2b-row')]++;
      if (v === 405) f.push('the instruction\'s own 4,05 as a task');
      if (v < 101 || v > 999) f.push(`${v} outside 1 to 10`);
      if (isM) {
        const pieces = $(r).find('[data-e2b-piece]').toArray().map((e) => Number($(e).attr('data-e2b-piece')));
        if (pieces.reduce((a, b) => a + b, 0) !== v) f.push(`the money shows ${pieces.reduce((a, b) => a + b, 0)} ct for ${v}`);
        if (LV.tens && v % 10) f.push(`level 1 money ${v} not in tens of cents`);
      } else {
        const tp = $(r).find('[data-e2b-art="tape"]');
        if (Number(tp.attr('data-e2b-v')) !== v) f.push(`the tape shows ${tp.attr('data-e2b-v')} for ${v}`);
        if (v % 5 === 0) f.push(`the tape's arrow on a numbered mark (${v})`);
        const c0 = Number(tp.attr('data-e2b-c0')), c1 = Number(tp.attr('data-e2b-c1'));
        if (c1 - c0 !== 15 || c0 < 0 || c1 > 1000 || v - c0 < 2 || c1 - v < 1) f.push(`the tape ${c0}..${c1} for ${v} cm`);
      }
      const st = (form) => tokens($, $(r).find(`[data-e2b-form="${form}"]`)[0]).filter(isBox).map((x) => x.box);
      if (st('split').join() !== [Math.floor(v / 100), v % 100].join() || st('small').join() !== String(v) || st('comma').join() !== commaOwn(v)) f.push(`row ${v}: ${st('split')} | ${st('small')} | ${st('comma')}`);
    }
    if (zeroRows.money !== LV.zeroRows || zeroRows.len !== LV.zeroRows) f.push(`${zeroRows.money} amounts and ${zeroRows.len} lengths with a 0 after the comma (the level: ${LV.zeroRows} each)`);
    const conv = R.find('[data-e2b-conv]').toArray();
    if (conv.length !== LV.conv) f.push(`${conv.length} conversions`);
    let zc = 0;
    for (const c of conv) {
      const form = $(c).attr('data-e2b-conv'), v = Number($(c).attr('data-e2b-v')), tk = tokens($, c);
      if (v % 100 < 10) zc++;
      if (v === 405) f.push('the instruction\'s own 4,05 as a conversion');
      const shown = tk.map((x) => (isBox(x) ? '[' + x.box + ']' : x)).join(' ');
      const cur = ['c2ct', 'ct2c', 'mix2c', 'c2mix'].includes(form), U = cur ? '€' : 'm', u = cur ? 'ct' : 'cm';
      const want = { c2ct: `${commaOwn(v)} ${U} = [${v}] ${u}`, m2cm: `${commaOwn(v)} ${U} = [${v}] ${u}`, ct2c: `${v} ${u} = [${commaOwn(v)}] ${U}`, cm2m: `${v} ${u} = [${commaOwn(v)}] ${U}`, mix2c: `${Math.floor(v / 100)} ${U} ${v % 100} ${u} = [${commaOwn(v)}] ${U}`, mixm2c: `${Math.floor(v / 100)} ${U} ${v % 100} ${u} = [${commaOwn(v)}] ${U}`, c2mix: `${commaOwn(v)} ${U} = [${Math.floor(v / 100)}] ${U} [${v % 100}] ${u}` }[form];
      if (shown !== want) f.push(`the conversion "${shown}" (the gate: "${want}")`);
      if (!LV.forms.includes(form)) f.push(`a ${form} conversion at level ${lv}`);
    }
    if (zc !== LV.zeroConv) f.push(`${zc} conversions with a 0 after the comma (the level: ${LV.zeroConv})`);
    // the comma written the German way only (never 3.50), and only with € and m
    if (/\d\.\d\d/.test(R.text())) f.push('a decimal point');
  }
  if (mode === 'e2b-ueber') {
    const LV = F.UEBER_LV[lv];
    const lists = R.find('[data-e2b-shop]').toArray();
    if (lists.length !== LV.lists) f.push(`${lists.length} lists`);
    for (const l of lists) {
      const note = Number($(l).attr('data-e2b-note')), its = $(l).find('[data-e2b-item]').toArray();
      if (!LV.notes.includes(note)) f.push(`a ${note}-euro note at level ${lv}`);
      if (its.length < LV.prices[0] || its.length > LV.prices[1]) f.push(`a list of ${its.length} prices`);
      const cs = its.map((e) => Number($(e).attr('data-e2b-ct')));
      its.forEach((e, i) => { const id = $(e).attr('data-e2b-item'), c = cs[i]; if (!SHOP_OWN[id] || c < SHOP_OWN[id][0] || c > SHOP_OWN[id][1]) f.push(`${id} at ${c} ct`); if (c % 100 === 50 || c % 100 === 0) f.push(`a price ${commaOwn(c)} € the rule cannot round one way`); const printed = txt($, $(e).find('.e2b-t')[1]); if (printed !== commaOwn(c) + ' €') f.push(`the price printed "${printed}"`); if (Number($(e).find('[data-e2b-rounded]').attr('data-e2b-answer')) !== Math.floor((c + 50) / 100)) f.push(`${commaOwn(c)} € rounded wrong`); });
      const E = cs.reduce((s, c) => s + Math.floor((c + 50) / 100), 0), up = cs.reduce((s, c) => s + Math.ceil(c / 100), 0), down = cs.reduce((s, c) => s + Math.floor(c / 100), 0);
      const est = tokens($, $(l).find('[data-e2b-est]')[0]).filter(isBox).map((x) => Number(x.box));
      if (est[est.length - 1] !== E || est.slice(0, -1).join() !== cs.map((c) => Math.floor((c + 50) / 100)).join()) f.push(`the Überschlag ${est} (the gate: ${E})`);
      // decided by the rule, and the same for every way of rounding: never a list the Überschlag cannot decide
      const right = txt($, $(l).find('[data-dk-answer="right"]')[0]);
      const enough = up <= note - 1 && E <= note - 1, notEnough = down >= note + 1;
      if (!enough && !notEnough) f.push(`a list the Überschlag cannot decide (${cs.join('+')} with ${note} €)`);
      if (right !== (enough ? B.TEXT.ueber.enough : B.TEXT.ueber.notEnough)) f.push(`the list ${cs.join('+')} with ${note} € stamped "${right}"`);
    }
    const recs = R.find('[data-e2b-rec]').toArray();
    if (recs.length !== LV.receipts) f.push(`${recs.length} receipts`);
    for (const r of recs) {
      const paper = $(r).find('[data-e2b-receipt]'), printed = Number(paper.attr('data-e2b-printed'));
      const prices = paper.find('.dk-row').toArray().map((e) => txt($, $(e).children().last())).filter((s) => /€$/.test(s)).map((s) => Math.round(numOf(s.replace(' €', '')) * 100));
      const items = prices.slice(0, -1), total = prices[prices.length - 1], sum = items.reduce((a, b) => a + b, 0);
      if (total !== printed) f.push(`a receipt prints ${total} for ${printed}`);
      const E = items.reduce((s, c) => s + Math.floor((c + 50) / 100), 0);
      if (Number($(r).find('[data-e2b-recest] [data-e2b-answer]').attr('data-e2b-answer')) !== E) f.push('the receipt\'s Überschlag box');
      const dist = Math.abs(printed - 100 * E), can = dist <= 200;
      if (dist > 150 && dist < 300) f.push(`a receipt ${dist} ct from its Überschlag (too near the rule's 2 €)`);
      if ((printed === sum) !== ($(r).attr('data-e2b-right') === '1')) f.push('the receipt\'s right / wrong stamp');
      if (printed !== sum && !items.some((c) => printed === sum - c || printed === sum + c)) f.push(`a wrong receipt whose slip is not a price forgotten or counted twice (${printed} for ${sum})`);
      if (printed !== sum && can) f.push('a wrong receipt the Überschlag cannot see');
      const right = txt($, $(r).find('[data-dk-answer="right"]')[0]);
      if (right !== (can ? B.TEXT.ueber.can : B.TEXT.ueber.cannot)) f.push(`the receipt ${printed} (Überschlag ${E}) stamped "${right}"`);
      if (LV.because !== !!$(r).find('[data-g1-frame]').length) f.push('the "Begründe" line');
    }
    if (!txt($, R.find('[data-e2b-rule]')[0]).includes(RULES_OWN.ueber)) f.push('the rounding rule not printed');
    if (!txt($, R.find('[data-e2b-recrule]')[0]).includes(RULES_OWN.receipt)) f.push('the receipt rule not printed');
  }
  if (mode === 'e2b-tab-preis') {
    const LV = F.TAB_LV.preis[lv];
    const tabs = R.find('[data-e2b-pricetable]').toArray();
    if (tabs.length !== LV.tables) f.push(`${tabs.length} tables`);
    tabs.forEach((tb, k) => {
      const id = $(tb).attr('data-e2b-item'), own = PIECE_OWN[id], table = $(tb).find('[data-e2b-table]');
      const u = Number(table.attr('data-e2b-unit')), given = table.attr('data-e2b-given').split(',').map(Number), last = $(tb).attr('data-e2b-last') === '1';
      if (!own || u < own[3][0] || u > own[3][1] || u < LV.unit[0] || u > LV.unit[1]) f.push(`table ${k + 1}: ${id} at ${u} €`);
      for (let n = 1; n <= 10; n++) {
        const cv = table.find(`[data-e2b-cellval="p${n - 1}"]`), cb = table.find(`[data-e2b-cellbox="p${n - 1}"]`);
        if (given.includes(n) ? Number(cv.text()) !== n * u || cb.length : Number(cb.attr('data-e2b-answer')) !== n * u || cv.length) f.push(`table ${k + 1}: the price of ${n}`);
        if (Number(table.find(`[data-e2b-cellval="n${n - 1}"]`).text()) !== n) f.push(`table ${k + 1}: the Anzahl ${n}`);
      }
      if (n10(u) > 100) f.push(`table ${k + 1}: past 100 €`);
      if (last ? given.length !== 1 || !LV.lastN.includes(given[0]) : (LV.given === 'first3' ? given.join() !== '1,2,3' : LV.given === 'one-mid' ? given[0] !== 1 : given.includes(1))) f.push(`table ${k + 1}: given ${given}`);
      if (last !== (k === tabs.length - 1)) f.push('the one-price table is not the last');
      if (last && Number($(tb).find('[data-e2b-one]').attr('data-e2b-answer')) !== u) f.push('the price of one');
      if (Number($(tb).find('[data-e2b-each]').attr('data-e2b-answer')) !== u) f.push(`table ${k + 1}: the sentence's box`);
      // the sentence agrees with the noun's gender (the gate's own table)
      const s = txt($, $(tb).find('[data-e2b-each]').parent());
      const wantLead = { f: 'Für jede', m: 'Für jeden', n: 'Für jedes' }[own ? own[0] : 'f'];
      if (!s.startsWith(`${wantLead} ${own ? own[1] : ''} mehr bezahlst du`) || !s.endsWith('€ mehr.')) f.push(`table ${k + 1}: "${s}"`);
    });
  }
  if (mode === 'e2b-tab-sach') {
    const LV = F.TAB_LV.sach[lv];
    const probs = R.find('[data-e2b-problem]').toArray();
    if (probs.length !== LV.kinds.length) f.push(`${probs.length} problems`);
    const kinds = [];
    for (const p of probs) {
      const text = txt($, $(p).find('[data-e2b-text]')[0]);
      // the gate reads the problem itself: "n Stück kosten P €." then each question
      const m0 = /^(\d+) (.+?) (kostet|kosten) (\d+) €\. (.+)$/.exec(text);
      if (!m0) { f.push(`a problem the gate cannot read: "${text}"`); continue; }
      const n = Number(m0[1]), P = Number(m0[4]), u = P / n, asks = [...m0[5].matchAll(/Wie viel (?:kostet|kosten) (\d+) /g)].map((x) => Number(x[1]));
      if (!Number.isInteger(u)) f.push(`"${text}": one costs ${u}`);
      const nounOk = Object.values(PIECE_OWN).some((o) => m0[2] === (n === 1 ? o[1] : o[2]));
      if (!nounOk) f.push(`"${text}": the noun "${m0[2]}"`);
      const at = $(p).find('[data-e2b-arrowtable]'), kind = at.attr('data-e2b-kind'); kinds.push(kind);
      const cols = [n].concat(asks);
      const cnt = cols.map((c, i) => Number(at.find(`[data-e2b-cellval="n${i}"]`).text()));
      if (cnt.join() !== cols.join()) f.push(`"${text}": the Anzahl row ${cnt}`);
      cols.forEach((c, i) => {
        const pv = at.find(`[data-e2b-cellval="p${i}"]`), pb = at.find(`[data-e2b-cellbox="p${i}"]`);
        const got = pv.length ? Number(pv.text()) : Number(pb.attr('data-e2b-answer'));
        if (got !== c * u) f.push(`"${text}": the price of ${c}`);
        if (i === 0 && (lv === 1) !== !!pv.length) f.push(`"${text}": the given price ${pv.length ? 'printed' : 'to write'} at level ${lv}`);
        if (c * u > 1000) f.push(`"${text}": past 1000 €`);
      });
      // every arrow's operator, by the gate: from the given column (or, for the price of one, on from 1)
      const ops = at.find('[data-e2b-op]').toArray().map((e) => [$(e).attr('data-e2b-op'), e.attribs['data-e2b-answer']]);
      if (!ops.length) f.push(`"${text}": no arrows`);
      for (const [key, opv] of ops) {
        const [i, j] = key.split('-').map(Number), a = cols[i], b = cols[j];
        const want = b > a ? `${MAL} ${b / a}` : `: ${a / b}`;
        if (!Number.isInteger(b > a ? b / a : a / b)) f.push(`"${text}": an arrow from ${a} to ${b} with no whole operator`);
        if (nbsp(opv) !== want) f.push(`"${text}": the arrow ${a} to ${b} stamped "${opv}", the gate "${want}"`);
        if (i !== 0 && !(cols[i] === 1 && kind === 'unit')) f.push(`"${text}": an arrow that does not start at the given column`);
      }
      const key = nbsp($(p).attr('data-e2b-key') || '');
      const nl = $(p).find('[data-e2b-ansline]').length; if (nl !== asks.length) f.push(`"${text}": ${nl} answer lines for ${asks.length} questions`);
      for (const c of asks) if (!key.includes(`${c * u} €`)) f.push(`"${text}": the answer sentence's key lacks ${c * u} €`);
    }
    if (kinds.slice().sort().join() !== LV.kinds.slice().sort().join()) f.push(`the problems ${kinds} (the level: ${LV.kinds})`);
  }
  if (mode === 'e2b-zirkel') {
    const LV = F.ZIRKEL_LV[lv];
    const set = (R.find('[data-e2b-art="circles"]').attr('data-e2b-set') || '').split(',');
    if (set.slice().sort().join() !== LV.set.map(([k, v]) => k + v).sort().join()) f.push(`the circles ${set} (the level: ${LV.set.map((x) => x.join(''))})`);
    R.find('[data-e2b-size]').each((i, e) => { const s = txt($, e), k = $(e).attr('data-e2b-size'); if (s !== `${k[0] === 'r' ? 'Radius' : 'Durchmesser'} ${k.slice(1)} cm`) f.push(`the label "${s}"`); });
    const labels = R.find('[data-e2b-size]').toArray().map((e) => $(e).attr('data-e2b-size'));
    if (labels.join() !== set.join()) f.push(`the circles are labelled ${labels}, drawn as ${set}`);
    if (set.some((s) => { const r = s[0] === 'd' ? Number(s.slice(1)) / 2 : Number(s.slice(1)); return !Number.isInteger(r) || r < 2 || r > 3; })) f.push('a radius that is not 2 or 3 cm');
    const flower = R.find('[data-e2b-art="flower"]');
    if (Number(flower.attr('data-e2b-drawn')) !== LV.flowerDrawn || flower.find('[data-e2b-flower]').length !== LV.flowerDrawn) f.push(`${flower.find('[data-e2b-flower]').length} flower circles drawn (the level: ${LV.flowerDrawn})`);
    if (flower.find('[data-e2b-flowermark]').length !== (LV.marks ? 6 : 1)) f.push('the flower\'s marks');
    if (R.find('[data-e2b-model]').length !== 7) f.push('the model has not 7 circles');
    if (LV.targetStart !== !!R.find('[data-e2b-targetstart]').length) f.push('the target\'s first circle');
    if (R.find('[data-e2b-answer], [data-dk-answer]').length) f.push('a drawing page carries an answer');
    if (!html.includes('Radien: 2 cm, 3 cm und 4 cm')) f.push('the target\'s radii not printed');
  }
  if (mode === 'e2b-dia') {
    const LV = F.DIA_LV[lv];
    const bars = R.find('[data-e2b-bar]').toArray(), faces = R.find('[data-e2b-art="picture-chart"]');
    let data = {};
    if (LV.charts === 'picture') {
      if (!faces.length || bars.length) f.push('level 1 without its picture chart');
      if (faces.attr('data-e2b-per') !== '5' || !html.includes('Ein Bild bedeutet 5 Kinder.')) f.push('the picture chart\'s key');
      R.find('[data-e2b-read]').each((i, e) => { data[$(R.find('[data-e2b-cat]')[i]).attr('data-e2b-cat')] = Number(e.attribs['data-e2b-answer']); });
      // the faces drawn are the numbers read (half a face for 5 of 10: never at level 1, 5 per face)
      R.find('[data-e2b-cat]').each((i, e) => { const row = Object.values(data)[i]; void row; });
    } else {
      const charts = R.find('[data-e2b-art="bar-chart"]').toArray();
      if (charts.length !== 2) f.push(`${charts.length} bar charts`);
      const per = charts.map((c) => Object.fromEntries($(c).find('[data-e2b-bar]').toArray().map((b) => [$(b).attr('data-e2b-bar'), Number($(b).attr('data-e2b-val'))])));
      if (JSON.stringify(per[0]) !== JSON.stringify(per[1])) f.push('the two charts do not show the same data');
      data = per[0] || {};
      if (charts.length === 2) {
        const [c1, c2] = charts;
        if (Number($(c1).attr('data-e2b-y0')) !== 0 || Number($(c1).attr('data-e2b-step')) !== LV.stepA) f.push('chart 1\'s scale');
        if (Number($(c2).attr('data-e2b-y0')) !== LV.y0b || Number($(c2).attr('data-e2b-step')) !== LV.stepB) f.push('chart 2\'s scale');
        if (Object.values(data).some((v) => v <= LV.y0b)) f.push('a bar at or under chart 2\'s start (it would not show)');
      }
    }
    const cats = Object.keys(data), vals = Object.values(data);
    if (cats.length !== LV.cats || new Set(vals).size !== vals.length) f.push(`the data ${JSON.stringify(data)} (distinct values, ${LV.cats} sports)`);
    if (vals.some((v) => v % 5 || v < LV.vals[0] || v > LV.vals[1])) f.push(`a value outside ${LV.vals}`);
    if (lv === 3 && vals.filter((v) => v % 10).length < 2) f.push('level 3 without bars between two lines');
    const st = R.find('[data-e2b-statement]').toArray();
    const truth = { yes: 0, no: 0, cant: 0 }, kinds = new Set();
    for (const s of st) {
      const text = txt($, s), kind = $(s).attr('data-e2b-statement');
      const own = statementTruth(text, data);
      const right = txt($, $(s).parent().find('[data-dk-answer="right"]')[0]);
      const wantRight = own === 'cant' ? B.TEXT.dia.cant : own ? B.TEXT.dia.yes : B.TEXT.dia.no;
      if (own === null) f.push(`a statement the gate cannot read: "${text}"`);
      else if (right !== wantRight) f.push(`"${text}" stamped "${right}", the gate "${wantRight}"`);
      truth[own === 'cant' ? 'cant' : own ? 'yes' : 'no']++;
      if (kind !== 'cant') { if (kinds.has(kind)) f.push(`two statements of the kind ${kind}`); kinds.add(kind); }
    }
    if (st.length !== 6 || truth.yes !== 2 || truth.no !== 2 || truth.cant !== 2) f.push(`the statements: ${JSON.stringify(truth)}`);
    if (LV.why !== !!R.find('[data-e2b-why]').length) f.push('the "warum" lines');
  }
  if (mode === 'e2b-kombi') {
    const LV = F.KOMBI_LV[lv];
    const tb = R.find('[data-e2b-ctable]');
    const rows = Number(tb.attr('data-e2b-rows')), cols = Number(tb.attr('data-e2b-cols'));
    if (rows !== LV.shirts || cols !== LV.pants || tb.find('[data-e2b-combo]').length !== rows * cols) f.push(`a table ${rows} x ${cols} with ${tb.find('[data-e2b-combo]').length} cells`);
    const cnt = (k) => Number(R.find(`[data-e2b-count="${k}"]`).attr('data-e2b-answer'));
    if (cnt(1) !== rows * cols) f.push(`task 1 counts ${cnt(1)}`);
    const mal = tokens($, R.find('[data-e2b-mal]')[0]);
    if (Number(mal[4].box) !== rows * cols || [mal[0].box, mal[2].box].sort().join() !== [rows, cols].map(String).sort().join() || mal[0].alt !== mal[2].box || mal[2].alt !== mal[0].box) f.push('the Malaufgabe (its factors in either order)');
    const tasks = R.find('[data-e2b-task]').toArray().map((e) => $(e).attr('data-e2b-kind'));
    const want = { 1: 'table,words,tree', 2: 'table,list,tree', 3: 'table,tree,row' }[lv];
    if (tasks.join() !== want) f.push(`the tasks ${tasks} (the level: ${want})`);
    const counts = { words: 6, list: 6, tree: 8, row: 6 };
    tasks.forEach((k, i) => { if (i && cnt(i + 1) !== counts[k]) f.push(`task ${i + 1} (${k}) counts ${cnt(i + 1)}`); });
    // the example cell coloured with its row's T-shirt and its column's trousers
    const ex = tb.find('[data-e2b-combo="0-0"] path').toArray().map((e) => e.attribs.fill);
    if (LV.example ? ex.some((c) => c === '#FFFFFF') : ex.some((c) => c !== '#FFFFFF')) f.push('the example cell');
    const heads = tb.find('.e2b-th path').toArray().map((e) => e.attribs.fill);
    if (new Set(heads.slice(0, cols)).size !== cols || new Set(heads.slice(cols)).size !== rows) f.push('two pieces of clothing in one colour');
    R.find('[data-e2b-art="tree"]').each((i, e) => { const mode2 = $(e).attr('data-e2b-mode'), nodes = $(e).find('[data-e2b-node]').length; if (mode2 === 'full' ? nodes !== 14 : nodes !== 6) f.push(`a ${mode2} tree with ${nodes} nodes`); if (Number($(e).attr('data-e2b-leaves')) !== 8) f.push('a 2 x 2 x 2 tree without 8 leaves'); });
    if (/\ber\b|\bsie\b/i.test(txt($, R.find('[data-e2b-tasktext="1"]')[0]))) f.push('task 1 names the child with a pronoun');
    if (!R.find('[data-e2b-art="tree"]').length) f.push('no tree diagram');
    R.find('[data-e2b-art="tree"][data-e2b-mode="branch"]').each((i, e) => { const lv0 = $(e).find('[data-e2b-node]').toArray().filter((n) => n.attribs['data-e2b-node'].length === 3).length, dots = $(e).find('[data-e2b-leafdot]').length; if (lv0 + dots !== 8) f.push(`a tree to finish shows ${lv0 + dots} of its 8 leaf places`); });
    if (!txt($, R.find('[data-e2b-tasktext="1"]')[0]).includes(B.TEXT.kombi.paint)) f.push('task 1 without the colouring sentence');
    // the pictures say what the words say: T-shirts down the side, trousers along the top
    const hs = tb.find('.e2b-th [data-e2b-art="tshirt"]').length, ht = tb.find('.e2b-th [data-e2b-art="trousers"]').length;
    if (hs !== rows || ht !== cols) f.push(`${hs} T-shirts and ${ht} trousers drawn round a table of ${rows} x ${cols}`);
    tb.find('[data-e2b-combo]').each((i, e) => { if ($(e).find('[data-e2b-art="tshirt"]').length !== 1 || $(e).find('[data-e2b-art="trousers"]').length !== 1) f.push('a cell without one T-shirt and one pair of trousers'); });
  }
  if (mode === 'e2b-dia' && R.find('[data-e2b-art="picture-chart"]').length) {
    // the faces drawn in each row are the number read, at 5 children a face
    let cur = null; const faces = {};
    R.find('[data-e2b-art="picture-chart"]').find('[data-e2b-cat], [data-e2b-face]').each((i, e) => { if (e.attribs['data-e2b-cat']) { cur = e.attribs['data-e2b-cat']; faces[cur] = 0; } else if (cur) faces[cur] += e.attribs['data-e2b-face'] === 'half' ? 0.5 : 1; });
    const read = R.find('[data-e2b-read]').toArray().map((e) => Number(e.attribs['data-e2b-answer']));
    Object.values(faces).forEach((n, i) => { if (5 * n !== read[i]) f.push(`row ${i + 1} draws ${n} faces for ${read[i]} children`); });
    if (Object.keys(faces).length !== read.length || !read.length) f.push('the picture chart and the reading boxes do not match');
  }
  if (mode === 'e2b-hsub') {
    // "Rechne Aufgabe 3 auf beiden Wegen": the both-ways card IS task 3
    const both = R.find('[data-e2b-both]');
    if (both.length && txt($, both.find('.e2b-badge')[0]) !== '3') f.push(`the both-ways card is numbered "${txt($, both.find('.e2b-badge')[0])}", the instruction says Aufgabe 3`);
  }
  // ---- no number sentence gives another's answer away: two sentences of one fact family (the same three numbers, an
  // inverse or turned-round task) where one prints the other's answer (the Probe is its own task's check, by design)
  {
    const rows = R.find('[data-e2b-eq]').toArray().filter((e) => !$(e).is('[data-e2b-probe]')).map((e) => {
      const nums = $(e).find('.e2b-big, [data-e2b-answer]').toArray().map((b) => (b.attribs['data-e2b-answer'] != null ? b.attribs['data-e2b-answer'] : $(b).text().trim())).filter((v) => /^\d+$/.test(v));
      return { fam: nums.slice().sort().join('|'), ans: $(e).find('[data-e2b-answer]').toArray().map((b) => b.attribs['data-e2b-answer']).filter((v) => /^\d{2,}$/.test(v)), shown: $(e).find('.e2b-big').toArray().map((b) => $(b).text().trim()), txt: txt($, e) };
    });
    for (const r of rows) for (const a of r.ans) { const o = rows.find((x) => x !== r && x.fam === r.fam && x.shown.includes(a)); if (o) f.push(`"${o.txt}" gives the answer ${a} of "${r.txt}" away`); }
  }
  // ---- every page: one value, every choice decided, every open item keyed, numbers to 1000
  R.find('[data-e2b-open]').each((i, e) => { const k = nbsp($(e).attr('data-e2b-key') || ''); if (k.length < 12) f.push(`an open item without its key ("${k}")`); });
  R.find('[data-g1-one]').each((i, e) => { if ($(e).closest('[data-e2b-open]').length) return; const n = $(e).find('[data-dk-answer="right"]').length; if (n !== 1) f.push(`a choice with ${n} right answers`); });
  R.find('.ws-blankbox').each((i, e) => { const a = e.attribs; if (!('data-e2b-answer' in a) && !('data-e2b-free' in a) && !('data-e2b-sign' in a) && !$(e).closest('[data-e2b-open]').length && !('data-e2b-op' in a)) f.push('a box with no value and no key'); });
  R.find('[data-e2b-answer]').each((i, e) => { const v = e.attribs['data-e2b-answer']; if (/^\d+$/.test(v) && Number(v) > 1000) f.push(`an answer ${v} past 1000`); if (v === '') f.push('an empty stamp'); });
  const $t = cheerio.load(html.replace(/</g, ' <')); $t('style, script, title').remove();
  const pageText = nbsp($t.root().text()).replace(/\s+/g, ' ');
  for (const m of pageText.matchAll(/\d+(?:\.\d{3})*/g)) if (Number(m[0].replace(/\./g, '')) > 1000) f.push(`the number ${m[0]} on the page (numbers to 1000)`);
  if (/!/.test(pageText)) f.push('an exclamation on the page');
  if (/[≈→←]/.test(pageText)) f.push('a sign outside the page fonts');
  if (/(?<!halb)schriftlich/i.test(pageText)) f.push('the written algorithm named');
  if (/<img|<image/.test(html)) f.push('a library picture (every picture of this batch is drawn)');
  if (/100 %|tatsächlicher Größe/.test(pageText)) f.push("the teacher's note on the child page");
  return f;
}
const n10 = (u) => 10 * u;
/** the gate's own reading of a chart statement: true, false, 'cant', or null (unreadable) */
function statementTruth(s, data) {
  const cats = Object.keys(data), v = (c) => data[c];
  const max = Math.max(...Object.values(data)), min = Math.min(...Object.values(data));
  let m;
  if (NOT_SHOWN.test(s)) return 'cant';
  if ((m = /^Die meisten Kinder mögen (.+)\.$/.exec(s))) return cats.includes(m[1]) ? v(m[1]) === max : null;
  if ((m = /^Die wenigsten Kinder mögen (.+)\.$/.exec(s))) return cats.includes(m[1]) ? v(m[1]) === min : null;
  if ((m = /^Genau (\d+) Kinder mögen (.+)\.$/.exec(s))) return cats.includes(m[2]) ? v(m[2]) === Number(m[1]) : null;
  if ((m = /^Mehr Kinder mögen (.+) als (.+)\.$/.exec(s))) return cats.includes(m[1]) && cats.includes(m[2]) && v(m[1]) !== v(m[2]) ? v(m[1]) > v(m[2]) : null;
  if ((m = /^Doppelt so viele Kinder mögen (.+) wie (.+)\.$/.exec(s))) { if (!cats.includes(m[1]) || !cats.includes(m[2])) return null; const a = v(m[1]), b = v(m[2]); if (a === 2 * b) return true; return Math.abs(a - 2 * b) >= 5 ? false : null; }
  if ((m = /^(.+) mögen (\d+) Kinder mehr als (.+)\.$/.exec(s))) return cats.includes(m[1]) && cats.includes(m[3]) ? v(m[1]) - v(m[3]) === Number(m[2]) : null;
  return null;
}

/* ================================================================ 3. tells (pooled) */
function collect(id, lv, html, acc) {
  const $ = cheerio.load(html), R = $('[data-dk]'), M = MODE[id];
  const push = (k, x) => (acc[k] = acc[k] || []).push(x);
  if (M === 'e2b-hsub') {
    const cards = R.find('[data-e2b-card]').toArray();
    push('cards', { first: $(cards[0]).find('[data-e2b-task]').attr('data-e2b-kind'), way: $(cards[0]).find('[data-e2b-way]').attr('data-e2b-way') || null });
  }
  if (M === 'e2b-mz') {
    R.find('[data-e2b-bigtask]').each((i, e) => { if ($(e).closest('[data-e2b-paircard]').length) return; const tk = tokens($, e).filter((x) => isBox(x) || /^\d+$/.test(x)); push('missing', tk.findIndex(isBox)); });
  }
  if (M === 'e2b-mm') {
    const lines = R.find('[data-e2b-art="mm-line"]').toArray().map((e) => Number($(e).attr('data-e2b-mm')));
    const draws = R.find('[data-e2b-draw]').toArray().map((e) => Number($(e).attr('data-e2b-len')));
    const asc = (a) => a.every((v, i) => !i || a[i - 1] < v), desc = (a) => a.every((v, i) => !i || a[i - 1] > v);
    push('order', { lines: asc(lines) || desc(lines), draws: asc(draws) || desc(draws), nl: lines.length, nd: draws.length });
  }
  if (M === 'e2b-km') {
    const cards = ['h', 'k', 'v'];
    R.find('[data-e2b-match]').each((i, e) => push('match', { row: i, card: $(e).attr('data-e2b-match'), straight: cards.indexOf($(e).attr('data-e2b-match')) === Math.floor(i / 2) }));
    const cmp = R.find('[data-g1-one][data-dk-item="shorter"] [data-e2b-pick]').toArray();
    if (cmp.length) push('shorter', $(cmp[0]).attr('data-dk-answer') === 'right');
  }
  if (M === 'e2b-ueber') {
    R.find('[data-e2b-shop]').each((i, l) => push('lists', { pos: i, note: Number($(l).attr('data-e2b-note')), n: $(l).find('[data-e2b-item]').length, enough: txt($, $(l).find('[data-dk-answer="right"]')[0]) === B.TEXT.ueber.enough }));
    R.find('[data-e2b-rec]').each((i, r) => { const paper = $(r).find('[data-e2b-receipt]'); push('recs', { pos: i, right: $(r).attr('data-e2b-right') === '1', n: paper.find('.dk-row').length, can: txt($, $(r).find('[data-dk-answer="right"]')[0]) === B.TEXT.ueber.can }); });
  }
  if (M === 'e2b-tab-preis') {
    R.find('[data-e2b-pricetable]').each((i, tb) => push('given', { pos: i, given: $(tb).find('[data-e2b-table]').attr('data-e2b-given') }));
  }
  if (M === 'e2b-tab-sach') {
    R.find('[data-e2b-problem]').each((i, p) => push('kinds', { pos: i, kind: $(p).find('[data-e2b-arrowtable]').attr('data-e2b-kind') }));
  }
  if (M === 'e2b-dia') {
    let data = {};
    if (R.find('[data-e2b-art="picture-chart"]').length) R.find('[data-e2b-read]').each((i, e) => { data[$(R.find('[data-e2b-cat]')[i]).attr('data-e2b-cat')] = Number(e.attribs['data-e2b-answer']); });
    else data = Object.fromEntries($(R.find('[data-e2b-art="bar-chart"]')[0]).find('[data-e2b-bar]').toArray().map((b) => [$(b).attr('data-e2b-bar'), Number($(b).attr('data-e2b-val'))]));
    R.find('[data-e2b-statement]').each((i, s) => { const own = statementTruth(txt($, s), data); push('st', { pos: i, kind: $(s).attr('data-e2b-statement'), ans: own === 'cant' ? 'cant' : own ? 'yes' : 'no' }); });
  }
}
/** the tells, pooled over the seeds of one type and level: {f: faults, M: measures} */
function tellFaults(id, lv, acc) {
  const f = [], M = {}, share = (a, p) => (a.length ? a.filter(p).length / a.length : NaN);
  const M0 = MODE[id];
  const need = (k, n0) => { const n = Math.ceil((n0 * SEEDS) / 400); if (!acc[k] || acc[k].length < n) { f.push(`nothing to judge (${k}: ${acc[k] ? acc[k].length : 0})`); return false; } return true; };
  if (M0 === 'e2b-hsub' && need('cards', 50)) {
    M.nearFirst = share(acc.cards, (c) => c.first === 'near');
    if (!(M.nearFirst >= 0.35 && M.nearFirst <= 0.65)) f.push(`the near task sits on card 1 in ${(100 * M.nearFirst).toFixed(0)}% of the pages`);
    if (lv === 1) { M.subFirst = share(acc.cards, (c) => c.way === 'sub'); if (!(M.subFirst >= 0.35 && M.subFirst <= 0.65)) f.push(`card 1 takes Abziehen in ${(100 * M.subFirst).toFixed(0)}% of the pages`); }
  }
  if (M0 === 'e2b-mz' && lv === 3 && need('missing', 300)) {
    for (const [k, name] of [[0, 'vorne'], [1, 'in der Mitte'], [2, 'hinten']]) { const sh = share(acc.missing, (x) => x === k); M['missing ' + name] = sh; if (!(sh >= 0.18)) f.push(`the missing number sits ${name} in ${(100 * sh).toFixed(0)}% of the tasks`); }
  }
  if (M0 === 'e2b-mm' && need('order', 50)) {
    // sorted up or down by chance: 2 / n! of the pages
    const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1)), chance = (n) => Math.min(1, 2 / fact(n));
    M.linesSorted = share(acc.order, (o) => o.lines); M.drawsSorted = share(acc.order, (o) => o.draws);
    const cl = chance(acc.order[0].nl), cd = chance(acc.order[0].nd);
    if (M.linesSorted > cl + 0.12) f.push(`the lines come sorted by length on ${(100 * M.linesSorted).toFixed(0)}% of the pages (by chance ${(100 * cl).toFixed(0)}%)`);
    if (M.drawsSorted > cd + 0.12) f.push(`the lines to draw come sorted by length on ${(100 * M.drawsSorted).toFixed(0)}% of the pages (by chance ${(100 * cd).toFixed(0)}%)`);
  }
  if (M0 === 'e2b-km' && need('match', 300)) {
    M.straight = share(acc.match, (m) => m.straight);
    if (M.straight > 0.45) f.push(`a distance's card lies straight across in ${(100 * M.straight).toFixed(0)}% of the rows`);
    for (let r = 0; r < 6; r++) { const rows = acc.match.filter((m) => m.row === r); for (const c of ['h', 'k', 'v']) { const sh = share(rows, (m) => m.card === c); if (sh > 0.6) f.push(`row ${r + 1} takes the card ${c} in ${(100 * sh).toFixed(0)}% of the pages`); } }
    if (acc.shorter && acc.shorter.length >= 50) { M.shorterFirst = share(acc.shorter, (x) => x); if (!(M.shorterFirst >= 0.35 && M.shorterFirst <= 0.65)) f.push(`the shorter way is option 1 in ${(100 * M.shorterFirst).toFixed(0)}% of the pages`); }
  }
  if (M0 === 'e2b-ueber' && need('lists', 300)) {
    const L = acc.lists;
    M.enough = share(L, (x) => x.enough);
    if (!(M.enough >= 0.4 && M.enough <= 0.6)) f.push(`"Das Geld reicht" is right for ${(100 * M.enough).toFixed(0)}% of the lists`);
    for (const nt of [...new Set(L.map((x) => x.note))]) { const sh = share(L.filter((x) => x.note === nt), (x) => x.enough); M['enough with ' + nt + ' €'] = sh; if (!(sh >= 0.35 && sh <= 0.65)) f.push(`with a ${nt}-euro note the money is enough for ${(100 * sh).toFixed(0)}% of the lists`); }
    for (const n of [...new Set(L.map((x) => x.n))]) { const sub = L.filter((x) => x.n === n); if (sub.length < 60) continue; const sh = share(sub, (x) => x.enough); M['enough with ' + n + ' prices'] = sh; if (!(sh >= 0.3 && sh <= 0.7)) f.push(`a list of ${n} prices has enough money in ${(100 * sh).toFixed(0)}% of the lists`); }
    for (let p = 0; p < 4; p++) { const sh = share(L.filter((x) => x.pos === p), (x) => x.enough); if (!(sh >= 0.3 && sh <= 0.7)) f.push(`list ${p + 1} has enough money in ${(100 * sh).toFixed(0)}% of the pages`); }
    if (need('recs', 100)) {
      M.receiptRight = share(acc.recs, (x) => x.right);
      if (!(M.receiptRight >= 0.3 && M.receiptRight <= 0.7)) f.push(`the receipt is right in ${(100 * M.receiptRight).toFixed(0)}% of the cases`);
      const nr = (r) => acc.recs.filter((x) => x.right === r).reduce((s, x) => s + x.n, 0) / Math.max(1, acc.recs.filter((x) => x.right === r).length);
      M.receiptRowsRight = nr(true); M.receiptRowsWrong = nr(false);
      if (Math.abs(M.receiptRowsRight - M.receiptRowsWrong) > 0.5) f.push(`a right receipt has ${M.receiptRowsRight.toFixed(1)} rows, a wrong one ${M.receiptRowsWrong.toFixed(1)}`);
    }
  }
  if (M0 === 'e2b-tab-preis' && need('given', 300)) {
    for (let p = 0; p < 5; p++) { const g = acc.given.filter((x) => x.pos === p).map((x) => x.given); const top = Math.max(...Object.values(g.reduce((o, x) => ((o[x] = (o[x] || 0) + 1), o), {}))) / g.length; if (lv > 1 && p < 4 && top > 0.5) f.push(`table ${p + 1} prints the same given prices on ${(100 * top).toFixed(0)}% of the pages`); }
  }
  if (M0 === 'e2b-tab-sach' && need('kinds', 300)) {
    const kinds = [...new Set(acc.kinds.map((x) => x.kind))];
    for (let p = 0; p < 4; p++) for (const k of kinds) { const sh = share(acc.kinds.filter((x) => x.pos === p), (x) => x.kind === k); if (sh > 0.75) f.push(`problem ${p + 1} is a ${k} problem on ${(100 * sh).toFixed(0)}% of the pages`); }
  }
  if (M0 === 'e2b-dia' && need('st', 600)) {
    for (let p = 0; p < 6; p++) { const at = acc.st.filter((x) => x.pos === p); for (const a of ['yes', 'no', 'cant']) { const sh = share(at, (x) => x.ans === a); if (sh > 0.6) f.push(`statement ${p + 1} is "${a}" on ${(100 * sh).toFixed(0)}% of the pages`); } }
    for (const k of [...new Set(acc.st.map((x) => x.kind))].filter((k) => k !== 'cant')) { const at = acc.st.filter((x) => x.kind === k); if (at.length < 40) continue; const sh = share(at, (x) => x.ans === 'yes'); M['true ' + k] = sh; if (!(sh >= 0.3 && sh <= 0.7)) f.push(`a statement of the kind ${k} is true in ${(100 * sh).toFixed(0)}% of the pages`); }
  }
  return { f, M };
}

/* ================================================================ 5. real size, measured in the PDF */
const PDF_PY = path.join(__dirname, 'verify-e2-de-b-pdf.py');
const INKS = Object.values(ART.REAL_INK);
function readPdf(pdfPath) {
  const r = spawnSync('python', ['-I', PDF_PY, pdfPath, INKS.join(',')], { encoding: 'utf8', maxBuffer: 64 << 20 });
  if (r.status !== 0) throw new Error('the PDF helper failed: ' + (r.stderr || '').slice(0, 300));
  return JSON.parse(r.stdout);
}
const mmOf = (pt) => pt / PT_MM;
/** the faults of one rendered page's PDF against what its html says */
function pdfFaults(id, lv, pdf, html) {
  const f = [], $ = cheerio.load(html), R = $('[data-dk]');
  const D = pdf.drawings, ink = (k) => D.filter((d) => d.ink === ART.REAL_INK[k].toUpperCase());
  if (Math.abs(mmOf(pdf.page[0]) - 210) > 1 || Math.abs(mmOf(pdf.page[1]) - 297) > 1) f.push(`the PDF page is ${mmOf(pdf.page[0]).toFixed(1)} x ${mmOf(pdf.page[1]).toFixed(1)} mm`);
  const TOL = 0.2;
  if (MODE[id] === 'e2b-mm') {
    // the ruler: 101 ticks, tick i exactly i mm from tick 0
    const xs = ink('tick').filter((d) => d.segs.length === 1 && Math.abs(d.segs[0][0] - d.segs[0][2]) < 0.01).map((d) => d.segs[0][0]).sort((a, b) => a - b);
    if (xs.length !== 101) f.push(`the ruler prints ${xs.length} ticks (101)`);
    else for (let i = 0; i <= 100; i++) { const off = mmOf(xs[i] - xs[0]) - i; if (Math.abs(off) > TOL) { f.push(`ruler tick ${i} prints ${(mmOf(xs[i] - xs[0])).toFixed(2)} mm from 0`); break; } }
    // the lines: each main line its length, an end mark at each end
    const segs = ink('line').filter((d) => d.segs.length === 1);
    const mains = segs.filter((d) => Math.abs(d.segs[0][1] - d.segs[0][3]) < 0.01 && d.width > 1.1), marks = segs.filter((d) => Math.abs(d.segs[0][0] - d.segs[0][2]) < 0.01);
    const want = R.find('[data-e2b-art="mm-line"]').toArray().map((e) => Number($(e).attr('data-e2b-mm'))).sort((a, b) => a - b);
    const got = mains.map((d) => mmOf(Math.abs(d.segs[0][2] - d.segs[0][0]))).sort((a, b) => a - b);
    if (got.length !== want.length) f.push(`${got.length} lines printed for ${want.length}`);
    else want.forEach((w, i) => { if (Math.abs(got[i] - w) > TOL) f.push(`a ${w}-mm line prints ${got[i].toFixed(2)} mm`); });
    for (const m of mains) { const [x1, y, x2] = m.segs[0]; for (const x of [x1, x2]) if (!marks.some((k) => Math.abs(k.segs[0][0] - x) < TOL * PT_MM && Math.min(k.segs[0][1], k.segs[0][3]) < y && Math.max(k.segs[0][1], k.segs[0][3]) > y)) f.push(`a line's end mark is not at its end (${mmOf(x).toFixed(1)} mm)`); }
    // the things: every drawing of a thing (strokes reach half their width past the path), grouped by row
    const parts = ink('thing').map((d) => { const h = d.kind === 'stroke' ? d.width / 2 : 0; return { x0: d.rect[0] - h, x1: d.rect[2] + h, y0: d.rect[1], y1: d.rect[3] }; });
    const rows = [];
    for (const p of parts.sort((a, b) => a.y0 - b.y0)) { const r = rows.find((q) => p.y0 < q.y1 && p.y1 > q.y0); if (r) { r.x0 = Math.min(r.x0, p.x0); r.x1 = Math.max(r.x1, p.x1); r.y0 = Math.min(r.y0, p.y0); r.y1 = Math.max(r.y1, p.y1); } else rows.push({ ...p }); }
    const wantT = R.find('[data-e2b-art="real-thing"]').toArray().map((e) => [$(e).attr('data-e2b-thing'), Number($(e).attr('data-e2b-mm'))]);
    const gotT = rows.sort((a, b) => a.y0 - b.y0).map((r) => mmOf(r.x1 - r.x0));
    if (gotT.length !== wantT.length) f.push(`${gotT.length} things printed for ${wantT.length}`);
    else wantT.forEach(([th, w], i) => { if (Math.abs(gotT[i] - w) > TOL) f.push(`the ${th} prints ${gotT[i].toFixed(2)} mm, the page says ${w} mm`); });
    const starts = ink('centre').filter((d) => d.kind === 'fill');
    if (starts.length !== R.find('[data-e2b-draw]').length) f.push(`${starts.length} start points printed for ${R.find('[data-e2b-draw]').length} lines to draw`);
  }
  if (MODE[id] === 'e2b-zirkel') {
    const LV = F.ZIRKEL_LV[lv];
    const circ = (k) => ink(k).filter((d) => d.curves >= 4).map((d) => ({ cx: (d.rect[0] + d.rect[2]) / 2, cy: (d.rect[1] + d.rect[3]) / 2, r: mmOf((d.rect[2] - d.rect[0]) / 2), rh: mmOf((d.rect[3] - d.rect[1]) / 2) }));
    const cs = circ('circle'), ms = circ('model');
    for (const c of cs.concat(ms)) if (Math.abs(c.r - c.rh) > TOL) f.push(`a circle prints ${c.r.toFixed(2)} by ${c.rh.toFixed(2)} mm (not round)`);
    const fl = cs.filter((c) => Math.abs(c.r - F.FLOWER_R) <= 1.5), tg = cs.filter((c) => Math.abs(c.r - 20) <= 1.5);
    if (fl.length + tg.length !== cs.length) f.push(`a circle of ${cs.find((c) => !fl.includes(c) && !tg.includes(c)).r.toFixed(2)} mm radius`);
    for (const c of fl) if (Math.abs(c.r - F.FLOWER_R) > TOL) f.push(`a flower circle prints ${c.r.toFixed(2)} mm radius (${F.FLOWER_R})`);
    for (const c of tg) if (Math.abs(c.r - 20) > TOL) f.push(`the target's first circle prints ${c.r.toFixed(2)} mm radius (20)`);
    if (fl.length !== LV.flowerDrawn) f.push(`${fl.length} flower circles printed (the level: ${LV.flowerDrawn})`);
    if (tg.length !== (LV.targetStart ? 1 : 0)) f.push(`${tg.length} target circles printed`);
    // the model: 7 circles of 5 mm, six of them 5 mm from the middle one at 60 degrees
    const ring = (pts, mid, rad, label) => {
      for (const p of pts) {
        const d = mmOf(Math.hypot(p.cx - mid.cx, p.cy - mid.cy));
        if (d < TOL) continue;
        if (Math.abs(d - rad) > TOL) { f.push(`a ${label} centre prints ${d.toFixed(2)} mm from the middle (${rad})`); continue; }
        const ang = (Math.atan2(p.cy - mid.cy, p.cx - mid.cx) * 180) / Math.PI, off = Math.abs(((ang % 60) + 60) % 60);
        if (Math.min(off, 60 - off) > 1.5) f.push(`a ${label} centre at ${ang.toFixed(1)} degrees (not a 60-degree place)`);
      }
    };
    if (ms.length !== 7) f.push(`the model prints ${ms.length} circles (7)`);
    else {
      for (const c of ms) if (Math.abs(c.r - F.MODEL_R) > TOL) f.push(`a model circle prints ${c.r.toFixed(2)} mm radius (${F.MODEL_R})`);
      const mid = ms.find((c) => ms.every((o) => o === c || Math.abs(mmOf(Math.hypot(o.cx - c.cx, o.cy - c.cy)) - F.MODEL_R) <= 2 * TOL));
      if (!mid) f.push('the model has no middle circle with six around it at its radius'); else ring(ms, mid, F.MODEL_R, 'model');
    }
    // the flower: the middle circle, the marks and every drawn circle on the 60-degree places of the middle circle
    const dots = ink('centre').filter((d) => d.kind === 'fill' && d.rect[2] - d.rect[0] < 6).map((d) => ({ cx: (d.rect[0] + d.rect[2]) / 2, cy: (d.rect[1] + d.rect[3]) / 2 }));
    const mid = fl.find((c) => dots.some((d) => mmOf(Math.hypot(d.cx - c.cx, d.cy - c.cy)) < TOL) && dots.every((d) => { const r = mmOf(Math.hypot(d.cx - c.cx, d.cy - c.cy)); return r < TOL || Math.abs(r - F.FLOWER_R) <= 2 * TOL; }));
    if (!mid) f.push('no flower circle with its marks on it');
    else { ring(dots, mid, F.FLOWER_R, 'flower mark'); ring(fl, mid, F.FLOWER_R, 'flower circle'); }
    const wantDots = (LV.marks ? 6 : 1) + 1;
    if (dots.length !== wantDots) f.push(`${dots.length} flower dots printed (${wantDots})`);
  }
  return f;
}

/* ================================================================ main */
async function main() {
  const t0 = Date.now();
  const artSrc = fs.readFileSync(path.join(WG, 'types', '_shared', 'e2-math-b-art.js'), 'utf8');
  // ---- 1. bank
  const bf = bankFaults(B, artSrc);
  ok(!bf.length, 'bank: ' + bf.slice(0, 12).join(' | '));
  const P = (name, mut, re, src = artSrc, cant = F.CANT) => { const b = clone(B); const c = cant.slice(); mut(b, c); judge(name, bankFaults(b, src, c), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 the paper clip up to 40 mm long', (b) => { find(b.MM_THINGS, 'klammer').mm = [26, 40]; }, /real-size thing klammer: .* outside/);
  P('PB2 a real-size thing without its source', (b) => { find(b.MM_THINGS, 'schraube').src = ''; }, /real-size thing schraube: no source/);
  P('PB3 the schoolyard put on the 1-km card', (b) => { find(b.DISTANCES, 'schulhof').card = 'k'; }, /schulhof: the bank says k/);
  P('PB4 a distance whose range spans two cards (300 to 1300 m)', (b) => { find(b.DISTANCES, 'viertelstunde').m = [300, 1300]; }, /viertelstunde: .*outside|spans two cards/);
  P('PB5 a distance whose words name the length', (b) => { find(b.DISTANCES, 'fussballfeld').de = 'ein Fußballfeld, 100 m lang'; }, /its words name a length/);
  P('PB6 bread at 49 cent', (b) => { find(b.SHOP, 'brot').ct = [49, 449]; }, /shop brot/);
  P('PB7 "die Malblock" (the gender)', (b) => { find(b.PIECES, 'malblock').g = 'f'; }, /piece malblock/);
  P('PB8 "Balle" for Bälle', (b) => { find(b.PIECES, 'ball').pl = 'Balle'; }, /piece ball/);
  P('PB9 a bicycle at 30 euros', (b) => { find(b.BIG_PIECES, 'fahrrad').eur = [30, 400]; }, /piece fahrrad: .* outside/);
  P('PB10 the rounding rule "ab 50 Cent rundest du ab"', (b) => { b.TEXT.ueber.rule = b.TEXT.ueber.rule.replace('rundest du auf, sonst rundest du ab', 'rundest du ab, sonst rundest du auf'); }, /rounding rule/);
  P('PB11 the receipt rule at 3 euros', (b) => { b.TEXT.ueber.receiptRule = b.TEXT.ueber.receiptRule.replace('2 €', '3 €'); }, /receipt rule/);
  P('PB12 the card "etwa 10 km"', (b) => { b.TEXT.km.cards.v = 'etwa 10 km'; }, /distance card/);
  P('PB13 a "kann man nicht ablesen" sentence a chart answers', () => {}, /names nothing a chart/, artSrc, F.CANT.concat(['Fußball ist beliebt.']));
  P('PB14 an off-palette colour in the drawings', () => {}, /outside PAL_E2B/, artSrc + '\nconst X = "#123456";');
  P('PB15 "Super!" in a heading', (b) => { b.TEXT.hz.blocks.Dk = 'Super! ' + b.TEXT.hz.blocks.Dk; }, /exclamation/);
  P('PB16 "2,5 km" in the page words', (b) => { b.TEXT.km.rule = '1 km = 1000 m, also 2,5 km = 2500 m'; }, /comma number with km|unit rule/);
  P('PB17 a tree of 3 x 2 x 2', (b) => { b.TREES[0].levels[0] = b.TREES[0].levels[0].concat(['x']); }, /not 2 x 2 x 2/);
  P('PB18 a row of children with one name twice', (b) => { b.ROW_KIDS[0] = [b.ROW_KIDS[0][0], b.ROW_KIDS[0][0], b.ROW_KIDS[0][2]]; }, /three different names/);
  P('PB19 a sport the gate does not know', (b) => { b.SPORTS.push('Schach'); }, /sport Schach/);
  P('PB20 fewer than two distances of about 1 km', (b) => { b.DISTANCES = b.DISTANCES.filter((x) => x.card !== 'k' || x.id === 'runden'); }, /fewer than two distances for the card k/);
  P('PB22 "Für jede Brezel mehr kommen 1 € dazu" back (wrong for 1)', (b) => { b.TEXT.tab.each.f = 'Für jede {sg} mehr kommen'; b.TEXT.tab.eachTail = '€ dazu.'; }, /the page words tab\.each\.f/);
  P('PB23 the teacher\'s note gone', (b) => { b.TEXT.mm.teacher = ''; }, /the teacher's note for mm/);
  P('PB24 a Heft at 2 euros again', (b) => { b.PIECES.push({ id: 'heft', g: 'n', sg: 'Heft', pl: 'Hefte', eur: [1, 3] }); }, /piece heft: not in the gate's table/);
  P('PB25 "Unser Lieblingssport" (80-165 children are no class)', (b) => { b.TEXT.dia.title = 'Unser Lieblingssport'; }, /the page words dia\.title/);
  P('PB21 "kann man nicht ablesen" about the children\'s age (a child answers it from its own class)', () => {}, /from its own class/, artSrc, F.CANT.concat(['Die Kinder, die {A} mögen, sind neun Jahre alt.']));

  // ---- 2. build sweep
  const pools = {}, sigs = {};
  let built = 0;
  for (const id of IDS) {
    const t = loadType(id);
    ok(JSON.stringify(t.onlyLocales) === JSON.stringify(['de']), `${id}: onlyLocales ${JSON.stringify(t.onlyLocales)}`);
    for (const other of ['en', 'sv', 'fr']) { let refused = false; try { t.build({ theme: null, difficulty: 2, locale: other, unit: null }, { rng: makeRng('x'), variant: 1 }); } catch (e) { refused = true; } ok(refused, `${id}: builds a ${other} page`); }
    const str = withLevelInstruction(resolveStrings(id, 'de', t), id, 1, 'de');
    ok(str.source === 'locale', `${id}: no German title and instruction (strings.de.json)`);
    ok(str.title.length <= 60, `${id}: the title has ${str.title.length} characters (60 at most)`);
    { const want = ['G3-638', 'G3-644'].includes(id); const tn = t.teacherNote && t.teacherNote.de; ok(want ? TEACHER_OWN.test(tn || '') : !tn, `${id}: the teacher's note is "${tn}"`); }
    for (const lv of [1, 2, 3]) { const fi = instrFaults(id, lv, withLevelInstruction(resolveStrings(id, 'de', t), id, lv, 'de').instruction); ok(!fi.length, fi.join(' | ')); }
    for (const lv of [1, 2, 3]) {
      const acc = {}; const seen = new Set();
      for (let s = 1; s <= SEEDS; s++) {
        let pg;
        try { pg = buildPage(t, lv, s); } catch (e) { ok(false, `${id} L${lv} seed ${s}: ${e.message}`); continue; }
        built++;
        const pf = pageFaults(id, lv, pg.html);
        ok(!pf.length, `${id} L${lv} seed ${s}: ${pf.slice(0, 4).join(' | ')}`);
        collect(id, lv, pg.html, acc);
        seen.add(crypto.createHash('sha1').update(pg.html).digest('hex'));
        if (s === 1) { sigs[id + lv] = levelSig(pg.html) + '|' + withLevelInstruction(resolveStrings(id, 'de', t), id, lv, 'de').instruction.replace(/[0-9]+/g, '#'); pools[id + lv] = pg; }
      }
      const tf = tellFaults(id, lv, acc);
      ok(!tf.f.filter((x) => !/nothing to judge/.test(x) || TELL_NEEDED[MODE[id]] === true || (TELL_NEEDED[MODE[id]] || []).includes(lv)).length, `${id} L${lv} tells: ${tf.f.slice(0, 4).join(' | ')}`);
      pools[id + lv + 'M'] = tf.M;
      // a compass page varies only in the order of its circles and where the flower starts (the sizes are the level's)
      const dmin = MODE[id] === 'e2b-zirkel' ? Math.min(SEEDS, 15) : Math.min(SEEDS, 50);
      ok(seen.size >= dmin, `${id} L${lv}: only ${seen.size} distinct pages in ${SEEDS}`);
    }
    ok(new Set([1, 2, 3].map((lv) => sigs[id + lv])).size === 3, `${id}: the three levels do not differ`);
    process.stdout.write(id + ' ');
  }
  console.log(`\nbuild sweep: ${built} pages (${SEEDS} seeds a level), ${((Date.now() - t0) / 1000).toFixed(0)} s`);

  // ---- page poisons (each against the real page of the same type and level, judged above)
  const $do = (h, fn) => { const $ = cheerio.load(h, null, false); fn($); return $.html(); };
  const pa = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; const h0 = $do(pools[id + lv].html, () => {}), hs = spoil(pools[id + lv].html); judge(name, hs === h0 || hs === pools[id + lv].html ? ['the spoil changed nothing'] : pageFaults(id, lv, hs), re); };
  const pd = (name, id, lv, fn, re) => pa(name, id, lv, (h) => $do(h, fn), re);
  // a page poison on the first seed whose page holds the thing spoiled (that clean page is judged in the sweep above)
  const pax = (name, id, lv, sel, fn, re) => { if (!IDS.includes(id)) return; const t = loadType(id); for (let s = 1; s <= SEEDS; s++) { const h = buildPage(t, lv, s).html; if (cheerio.load(h)(sel).length) { const hs = $do(h, fn); judge(name + ' (copy ' + s + ')', hs === $do(h, () => {}) ? ['the spoil changed nothing'] : pageFaults(id, lv, hs), re); return; } } judge(name, ['no page holds ' + sel], /^$/); };
  const setBig = ($, row, i, v) => { $($(row).children('.e2b-big, .e2b-op, .ws-blankbox').toArray()[i]).text(String(v)); };
  const stamp = ($, el, v) => $(el).attr('data-e2b-answer', String(v));
  // hz
  pd('PA1 a big result stamped 100 too many', 'G3-633', 1, ($) => { const bx = $('[data-e2b-bigtask] [data-e2b-answer]').first(); stamp($, bx, Number(bx.attr('data-e2b-answer')) + 100); }, /the big result|values fit/);
  pd('PA2 a big task that is not the small task times 10 or 100', 'G3-633', 1, ($) => { const r = $('[data-e2b-bigtask]').first(); setBig($, r, 0, Number($(r).children('.e2b-big').first().text()) + 10); }, /is not the small task/);
  pd('PA3 the instruction\'s own example 3 + 4 as a task', 'G3-633', 1, ($) => { const p = $('[data-e2b-pair]').filter((i, e) => $(e).find('[data-e2b-small] .e2b-op').first().text() === '+').first(); const s0 = p.find('[data-e2b-small]'), b0 = p.find('[data-e2b-bigtask]'); setBig($, s0, 0, 3); setBig($, s0, 2, 4); stamp($, s0.find('[data-e2b-answer]'), 7); const k = Number(b0.children('.e2b-big').first().text()) >= 100 * Number(s0.children('.e2b-big').first().text()) ? 100 : 10; setBig($, b0, 0, 3 * k); setBig($, b0, 2, 4 * k); stamp($, b0.find('[data-e2b-answer]'), 7 * k); }, /instruction's own example 3 \+ 4/);
  pd('PA4 "Ergänze bis zum nächsten Hunderter" aimed at the wrong hundred', 'G3-633', 1, ($) => { const r = $('[data-e2b-fill="next"]').first(); const ch = r.children('.e2b-big').toArray(); $(ch[ch.length - 1]).text(String(Number($(ch[ch.length - 1]).text()) + 100)); stamp($, r.find('[data-e2b-answer]'), Number(r.find('[data-e2b-answer]').attr('data-e2b-answer')) + 100); }, /is not the next hundred/);
  pd('PA77 the inverse of a hundreds task on the same page (500 + 100 and 600 − 100)', 'G3-633', 2, ($) => { const bs = $('[data-e2b-block="A"] [data-e2b-bigtask]').toArray(); const p = bs.find((e) => $(e).children('.e2b-op').first().text().trim() === '+'), m = bs.find((e) => e !== p); const a = $(p).children('.e2b-big').toArray().map((x) => $(x).text()), c = $(p).find('[data-e2b-answer]').attr('data-e2b-answer'); const mb = $(m).children('.e2b-big').toArray(); $(mb[0]).text(c); $($(m).children('.e2b-op').toArray()[0]).text(MN); $(mb[1]).text(a[1]); stamp($, $(m).find('[data-e2b-answer]'), a[0]); }, /gives the answer \d+ of/);
  pd('PA78 a result that is another task\'s number to divide (88 : 2 = 44 beside 44 : 4)', 'G3-637', 1, ($) => { const cs = $('[data-e2b-div]').toArray(); const q = Number($(cs[0]).attr('data-e2b-n')) / Number($(cs[0]).attr('data-e2b-d')); $(cs[1]).attr('data-e2b-n', String(q)); }, /is another task's number to divide/);
  // hsub
  pd('PA5 a card key that names one way only', 'G3-634', 2, ($) => { const c = $('[data-e2b-card]').first(); c.attr('data-e2b-key', c.attr('data-e2b-key').replace(/ Ergänzen:.*$/, '')); }, /does not give both ways/);
  pd('PA79 level 1 names "Ziehe schrittweise ab" for the near task', 'G3-634', 1, ($) => { $('[data-e2b-task][data-e2b-kind="near"]').closest('[data-e2b-card]').find('[data-e2b-way]').attr('data-e2b-way', 'sub'); }, /a near task named "Ziehe schrittweise ab"/);
  pd('PA82 three rows for ergänzen (925 − 549 takes four)', 'G3-634', 2, ($) => { $('[data-e2b-steps="open"]').first().find('[data-e2b-steprow]').last().remove(); }, /3 step rows for the child's own way/);
  pd('PA6 the printed first step wrong', 'G3-634', 1, ($) => { const m = $('[data-e2b-model]').first(); const b = m.children('.e2b-big').toArray(); $(b[b.length - 1]).text(String(Number($(b[b.length - 1]).text()) + 10)); }, /the printed first step/);
  pd('PA7 the comparison "geschickter" stamped with one right way', 'G3-634', 2, ($) => { $('[data-e2b-open] .e2b-tick').first().attr('data-dk-answer', 'right'); }, /an open choice carries a right answer/);
  pd('PA8 a step box with a stamp (the child\'s own way judged)', 'G3-634', 2, ($) => { $('[data-e2b-steprow] .ws-blankbox').first().attr('data-e2b-answer', '100'); }, /a step box carries a stamp/);
  pd('PA9 the both-ways card numbered 4', 'G3-634', 1, ($) => { $('[data-e2b-both] .e2b-badge').first().text('4'); }, /Aufgabe 3/);
  pd('PA10 the near task not near (a far pair on the near card)', 'G3-634', 2, ($) => { const t = $('[data-e2b-task][data-e2b-kind="near"]').first(); setBig($, t, 2, 120); stamp($, t.find('[data-e2b-answer]'), Number(t.children('.e2b-big').first().text()) - 120); }, /is not near/);
  // mz
  pd('PA11 a picture of the wrong number of groups', 'G3-635', 1, ($) => { const g = $('[data-e2b-groups]').first(); g.attr('data-e2b-groups', String(Number(g.attr('data-e2b-groups')) + 1)); }, /the picture shows/);
  pd('PA12 a big task that is not the tenfold', 'G3-635', 1, ($) => { const b = $('[data-e2b-bigtask]').last(); const ans = b.find('[data-e2b-answer]'); stamp($, ans, Number(ans.attr('data-e2b-answer')) + 10); }, /are not a task and its tenfold|values fit/);
  pd('PA13 a task with every value right (0 · ☐ = 0)', 'G3-635', 3, ($) => { const b = $('[data-e2b-bigtask]').filter((i, e) => !$(e).closest('[data-e2b-paircard]').length && $(e).children().last().is('.e2b-big') && $(e).children().first().is('.e2b-big')).first(); setBig($, b, 0, 0); const ch = b.children('.e2b-big').toArray(); $(ch[ch.length - 1]).text('0'); }, /values fit/);
  pd('PA14 a picture pair asking for a factor the picture shows', 'G3-635', 1, ($) => { const b = $('[data-e2b-paircard] [data-e2b-bigtask]').first(); const kids = b.children().toArray(); const box = b.find('.ws-blankbox'); const v = box.attr('data-e2b-answer'); box.replaceWith(`<span class="e2b-big">${v}</span>`); $(kids[0]).replaceWith(`<span class="ws-blankbox" data-dk-box data-e2b-answer="${$(kids[0]).text()}"></span>`); }, /a picture pair with a missing factor/);
  pd('PA76 a division that prints the answer of a times task ("80 : 4" beside "4 · 20 = ☐")', 'G3-635', 2, ($) => { const m = $('[data-e2b-small]').filter((i, e) => $(e).find('.e2b-op').first().text().trim() === MAL).first(); const P = m.find('[data-e2b-answer]').attr('data-e2b-answer'); const d = $('[data-e2b-small]').filter((i, e) => $(e).find('.e2b-op').first().text().trim() === ':').first(); $(d.children('.e2b-big').first()).text(P); }, /is printed in task/);
  // hmul
  pd('PA15 a Malkreuz product stamped wrong', 'G3-636', 1, ($) => { const t = $('[data-e2b-teil="e"]').first(); stamp($, t, Number(t.attr('data-e2b-answer')) + 1); }, /the Malkreuz products/);
  pd('PA16 the sum of the parts in one order only', 'G3-636', 2, ($) => { $('[data-e2b-step="3"] [data-e2b-alt]').first().removeAttr('data-e2b-alt'); }, /either order/);
  pd('PA17 a Punktefeld one dot short', 'G3-636', 1, ($) => { $('[data-e2b-art="dot-field"] circle').first().remove(); }, /dots/);
  pd('PA18 a step row that starts with the tens', 'G3-636', 2, ($) => { const s = $('[data-e2b-step="1"]').first(); const b = s.children('.e2b-big').toArray(); const a0 = $(b[0]).text(), z0 = $(b[1]).text(); $(b[0]).text(z0); $(b[1]).text(a0); }, /does not start with/);
  pd('PA19 the title\'s own 4 · 37 as a task', 'G3-636', 1, ($) => { $('[data-e2b-mul]').first().attr('data-e2b-b', '37'); }, /the title's own task 37|outside the level|Punktefeld|parts/);
  pd('PA80 "Was hilft dir am meisten?" over two options', 'G3-636', 3, ($) => { $('[data-e2b-reflect] .e2b-head').first().text('Was hilft dir am meisten? Kreuze an.'); }, /the reflection offers 2/);
  pd('PA81 the tens box over the Punktefeld without "2 ·" (dots or columns: two readings)', 'G3-636', 1, ($) => { $('[data-e2b-partlabel="z"]').first().remove(); }, /tens box over the Punktefeld without/);
  // hdiv
  pd('PA20 a given split that is not the largest Zehnerzahl', 'G3-637', 1, ($) => { const c = $('[data-e2b-div][data-e2b-given="1"]').first(); const d = Number(c.attr('data-e2b-d')); const sp = c.find('[data-e2b-split="given"]'); const b = sp.children('.e2b-big').toArray(); $(b[1]).text(String(Number($(b[1]).text()) - 10 * d)); $(b[2]).text(String(Number($(b[2]).text()) + 10 * d)); }, /not the largest Zehnerzahl/);
  pd('PA21 a stamp in the child\'s own split', 'G3-637', 2, ($) => { $('[data-e2b-div][data-e2b-given="0"] [data-e2b-split="own"] .ws-blankbox').first().attr('data-e2b-answer', '40'); }, /stamped box in the child's own split/);
  pd('PA22 the blocks one rod short', 'G3-637', 1, ($) => { $('[data-e2b-div] [data-e2b-rod]').first().remove(); }, /the blocks show/);
  pd('PA23 a task with a remainder', 'G3-637', 2, ($) => { const c = $('[data-e2b-div]').first(); c.attr('data-e2b-n', String(Number(c.attr('data-e2b-n')) + 1)); }, /a remainder/);
  pd('PA24 a Probe stamped wrong', 'G3-637', 2, ($) => { const b = $('[data-e2b-probe] [data-e2b-answer]').last(); stamp($, b, Number(b.attr('data-e2b-answer')) + 1); }, /the Probe/);
  // mm
  pd('PA25 a line of a whole 6 cm', 'G3-638', 1, ($) => { $('[data-e2b-art="mm-line"]').first().attr('data-e2b-mm', '60'); }, /a whole 6 cm/);
  pd('PA26 two lengths 2 mm apart', 'G3-638', 2, ($) => { const l = $('[data-e2b-art="mm-line"]').toArray(); $(l[1]).attr('data-e2b-mm', String(Number($(l[0]).attr('data-e2b-mm')) + 2)); }, /less than 3 mm apart/);
  pd('PA27 the paper clip at 40 mm', 'G3-638', 2, ($) => { $('[data-e2b-thing="klammer"]').attr('data-e2b-mm', '40'); }, /the klammer at 40 mm/);
  pd('PA28 a draw label that says another length', 'G3-638', 1, ($) => { const l = $('[data-e2b-drawlabel]').first(); l.text(l.text().replace(/\d+ mm$/, '99 mm')); }, /the draw label/);
  pd('PA29 the instruction\'s own 47 mm as a line', 'G3-638', 1, ($) => { $('[data-e2b-art="mm-line"]').first().attr('data-e2b-mm', '47'); }, /instruction's own 47/);
  pd('PA30 a frame stamped with the cm and mm swapped', 'G3-638', 1, ($) => { const b = $('[data-e2b-frame]').first().find('[data-e2b-answer]').toArray(); const a0 = $(b[0]).attr('data-e2b-answer'); $(b[0]).attr('data-e2b-answer', $(b[1]).attr('data-e2b-answer')); $(b[1]).attr('data-e2b-answer', a0); }, /the frame/);
  // km
  pd('PA31 a route\'s sum stamped 10 m out', 'G3-639', 1, ($) => { const b = $('[data-e2b-routeeq="1"] [data-e2b-answer]').last(); stamp($, b, Number(b.attr('data-e2b-answer')) + 10); }, /route 1: the boxes|values fit/);
  pd('PA32 the longer way stamped "kürzer"', 'G3-639', 3, ($) => { $('[data-dk-item="shorter"] [data-e2b-pick]').each((i, e) => { $(e).attr('data-dk-answer', $(e).attr('data-dk-answer') === 'right' ? 'wrong' : 'right'); }); }, /not the shorter way/);
  pd('PA83 a way\'s frame summed wrong', 'G3-639', 3, ($) => { const b = $('[data-e2b-viaeq="1"] [data-e2b-answer]').last(); stamp($, b, Number(b.attr('data-e2b-answer')) + 10); }, /the way 1's frame/);
  pd('PA33 the football field on the 1-km card', 'G3-639', 1, ($) => { const m = $('[data-e2b-match="h"]').first(); m.attr('data-e2b-match', 'k'); }, /stamped k, the gate h|not two distances/);
  pd('PA34 a road drawn long and labelled short', 'G3-639', 1, ($) => { const rs = $('[data-e2b-road]').toArray().map((e) => ({ e, len: Math.hypot(e.attribs.x2 - e.attribs.x1, e.attribs.y2 - e.attribs.y1) })).sort((a, b) => a.len - b.len); const lo = rs[0].e.attribs['data-e2b-m'], hi = rs[rs.length - 1].e.attribs['data-e2b-m']; $(rs[0].e).attr('data-e2b-m', hi); $(rs[rs.length - 1].e).attr('data-e2b-m', lo); }, /drawn longer than/);
  pd('PA35 "1 km = 1000 m" not printed', 'G3-639', 1, ($) => { $('*').contents().filter((i, n) => n.type === 'text' && n.data.includes('1 km = 1000 m')).each((i, n) => { n.data = n.data.replace(/1 km = 1000 m/g, '1 km'); }); }, /"1 km = 1000 m" not printed/);
  pd('PA75 a completion that prints what route 1 lacks to 1 km', 'G3-639', 2, ($) => { const s = Number($('[data-e2b-routeeq="1"] [data-e2b-answer]').last().attr('data-e2b-answer')); const r = $('[data-e2b-fill]').first(); $(r.children('.e2b-big').first()).text(String(1000 - s)); stamp($, r.find('[data-e2b-answer]'), s); }, /gives a route's answer away/);
  // komma
  pd('PA36 the money one coin short', 'G3-640', 2, ($) => { $('[data-e2b-row="money"] [data-e2b-piece]').last().remove(); }, /the money shows/);
  pd('PA37 the comma stamped "3,5" for 3,50', 'G3-640', 2, ($) => { const b = $('[data-e2b-form="comma"] [data-e2b-answer]').first(); stamp($, b, b.attr('data-e2b-answer').replace(/0$/, '').replace(/(\d),(\d)\d$/, '$1,$2')); }, /^row \d+:/);
  pd('PA38 a decimal point on the page', 'G3-640', 1, ($) => { const b = $('[data-e2b-conv] .e2b-big').filter((i, e) => /,/.test($(e).text())).first(); b.text(b.text().replace(',', '.')); }, /decimal point|the conversion/);
  pd('PA39 the tape past 1000', 'G3-640', 1, ($) => { const t = $('[data-e2b-art="tape"]').first(); t.attr('data-e2b-c1', '1005'); }, /the tape \d+\.\.1005/);
  pd('PA40 a 0 after the comma missing on a level that needs it', 'G3-640', 3, ($) => { const r = $('[data-e2b-row="len"]').filter((i, e) => Number($(e).attr('data-e2b-v')) % 100 < 10).first(); r.attr('data-e2b-v', String(Number(r.attr('data-e2b-v')) + 30)); }, /with a 0 after the comma/);
  // ueber
  pd('PA41 a list decided the other way', 'G3-641', 1, ($) => { $('[data-e2b-shop]').first().find('[data-e2b-pick]').each((i, e) => { $(e).attr('data-dk-answer', $(e).attr('data-dk-answer') === 'right' ? 'wrong' : 'right'); }); }, /stamped "/);
  pd('PA42 a price of 2,50 € (the rule cannot round it one way)', 'G3-641', 2, ($) => { const it = $('[data-e2b-item]').first(); const c = Number(it.attr('data-e2b-ct')); const v = 100 * Math.floor(c / 100) + 50; it.attr('data-e2b-ct', String(v)); $(it.find('.e2b-t')[1]).text(commaOwn(v) + ' €'); }, /cannot round one way/);
  pd('PA43 a list the Überschlag cannot decide (the note made the estimate)', 'G3-641', 1, ($) => { const l = $('[data-e2b-shop]').first(); const E = Number(l.find('[data-e2b-est] [data-e2b-answer]').last().attr('data-e2b-answer')); l.attr('data-e2b-note', String(E)); }, /cannot decide/);
  pd('PA44 a wrong receipt 1 euro from the Überschlag', 'G3-641', 2, ($) => { const r = $('[data-e2b-rec]').first(); const paper = r.find('[data-e2b-receipt]'); const est = Number(r.find('[data-e2b-recest] [data-e2b-answer]').attr('data-e2b-answer')); const v = 100 * est + 100 + 7; paper.attr('data-e2b-printed', String(v)); $(paper.find('.dk-row').last().children().last()).text(commaOwn(v) + ' €'); r.attr('data-e2b-right', '0'); }, /cannot see|too near|not a price forgotten/);
  pd('PA45 the rounding rule not printed', 'G3-641', 1, ($) => { $('[data-e2b-rule]').first().text('Runde die Preise.'); }, /rounding rule not printed/);
  // tab-preis
  pd('PA46 a printed price that is not n times the price of one', 'G3-642', 1, ($) => { const c = $('[data-e2b-cellval="p1"]').first(); c.text(String(Number(c.text()) + 1)); }, /the price of 2/);
  pd('PA47 "Für jeden Heft" (the gender)', 'G3-642', 1, ($) => { $('[data-e2b-each]').each((i, e) => { $(e).parent().contents().filter((k, n) => n.type === 'text').each((k, n) => { n.data = n.data.replace(/Für jede[sn]? /, 'Für jedex '); }); $(e).parent().find('*').contents().filter((k, n) => n.type === 'text').each((k, n) => { n.data = n.data.replace(/Für jede[sn]? /, 'Für jedex '); }); }); }, /table \d+: "/);
  pd('PA48 a level-3 table that prints the price of 1', 'G3-642', 3, ($) => { $('[data-e2b-table]').first().attr('data-e2b-given', '1,6'); }, /given 1,6|the price of/);
  // tab-sach
  pd('PA49 an arrow stamped "· 3" for its own operator', 'G3-643', 2, ($) => { const o = $('[data-e2b-op]').first(); o.attr('data-e2b-answer', nbsp(o.attr('data-e2b-answer')).startsWith('·') ? '· 7' : ': 7'); }, /stamped "/);
  pd('PA50 a problem whose one piece costs a part of a euro', 'G3-643', 2, ($) => { const t = $('[data-e2b-text]').first(); t.find('*').addBack().contents().filter((i, n) => n.type === 'text').each((i, n) => { n.data = n.data.replace(/kosten(\s)(\d+)(\s)€/, (m, a, p, b) => `kosten${a}${Number(p) + 1}${b}€`); }); }, /one costs|the price of|the answer sentence/);
  pd('PA51 an answer sentence\'s key that lacks the answer', 'G3-643', 1, ($) => { $('[data-e2b-problem]').first().attr('data-e2b-key', 'Antwort: ...'); }, /answer sentence's key lacks/);
  pd('PA84 one answer line for two questions', 'G3-643', 3, ($) => { $('[data-e2b-problem]').filter((i, e) => $(e).find('[data-e2b-ansline]').length > 1).first().find('[data-e2b-ansline="2"]').remove(); }, /1 answer lines for 2 questions/);
  pd('PA52 the Anzahl row out of its order', 'G3-643', 3, ($) => { const at = $('[data-e2b-arrowtable]').first(); const a = at.find('[data-e2b-cellval="n0"]'), b = at.find('[data-e2b-cellval="n1"]'); const x = a.text(); a.text(b.text()); b.text(x); }, /the Anzahl row/);
  // zirkel
  pd('PA53 a label "Radius 4 cm" in the first part', 'G3-644', 1, ($) => { const l = $('[data-e2b-size]').first(); l.attr('data-e2b-size', 'r4'); l.text('Radius 4 cm'); }, /the circles|not 2 or 3 cm/);
  pd('PA54 the model with six circles', 'G3-644', 2, ($) => { $('[data-e2b-model]').last().remove(); }, /model has not 7/);
  pd('PA55 a drawing page with a stamp', 'G3-644', 1, ($) => { $('[data-e2b-size]').first().attr('data-e2b-answer', '2'); }, /carries an answer/);
  pd('PA56 the target\'s radii not printed', 'G3-644', 3, ($) => { $('*').contents().filter((i, n) => n.type === 'text' && n.data.includes('Radien:')).each((i, n) => { n.data = 'Zeichne Kreise.'; }); }, /radii not printed/);
  // dia
  pd('PA57 a statement stamped the other way', 'G3-645', 2, ($) => { const s = $('[data-e2b-statement]').filter((i, e) => $(e).attr('data-e2b-statement') !== 'cant').first(); const g = s.parent(); const right = g.find('[data-dk-answer="right"]'); const other = g.find('[data-dk-answer="wrong"]').first(); right.attr('data-dk-answer', 'wrong'); other.attr('data-dk-answer', 'right'); }, /stamped "/);
  pd('PA58 chart 2 started above a bar', 'G3-645', 2, ($) => { $('[data-e2b-art="bar-chart"]').last().attr('data-e2b-y0', '30'); }, /chart 2's scale/);
  pd('PA59 two statements of one kind', 'G3-645', 3, ($) => { const s = $('[data-e2b-statement]').filter((i, e) => $(e).attr('data-e2b-statement') !== 'cant').toArray(); $(s[1]).attr('data-e2b-statement', $(s[0]).attr('data-e2b-statement')); }, /two statements of the kind/);
  pd('PA60 a picture row one face short', 'G3-645', 1, ($) => { $('[data-e2b-face]').last().remove(); }, /draws \d+(\.5)? faces/);
  pd('PA61 a "kann man nicht ablesen" statement the chart answers', 'G3-645', 2, ($) => { const s = $('[data-e2b-statement="cant"]').first(); const sp = $('[data-e2b-bar]').first().attr('data-e2b-bar'); s.text(`Die meisten Kinder mögen ${sp}.`); }, /stamped "|statements:/);
  // kombi
  pd('PA62 task 1 counted one short', 'G3-646', 1, ($) => { const c = $('[data-e2b-count="1"]'); stamp($, c, Number(c.attr('data-e2b-answer')) - 1); }, /task 1 counts/);
  pd('PA63 a tree one branch short', 'G3-646', 2, ($) => { $('[data-e2b-art="tree"] [data-e2b-node]').last().remove(); }, /tree with \d+ nodes/);
  pd('PA64 the Malaufgabe in one order only', 'G3-646', 3, ($) => { $('[data-e2b-mal] [data-e2b-alt]').first().removeAttr('data-e2b-alt'); }, /Malaufgabe/);
  pd('PA65 "er" in task 1', 'G3-646', 1, ($) => { const t = $('[data-e2b-tasktext="1"]'); t.text(t.text() + ' Er zieht sich an.'); }, /pronoun/);
  pd('PA85 a tree to finish that hides where its leaves end', 'G3-646', 3, ($) => { $('[data-e2b-leafdot]').slice(0, 3).remove(); }, /shows 5 of its 8 leaf places/);
  pd('PA86 the teacher\'s print note on the child page', 'G3-638', 1, ($) => { $('[data-dk]').append('<div class="e2b-t">Drucke in tatsächlicher Größe (100 %).</div>'); }, /teacher's note on the child page/);
  pd('PA66 two T-shirts of one colour', 'G3-646', 2, ($) => { const p = $('[data-e2b-ctable] .e2b-th path').toArray(); const cols = Number($('[data-e2b-ctable]').attr('data-e2b-cols')); $(p[cols + 1]).attr('fill', $(p[cols]).attr('fill')); }, /one colour/);
  // every page
  pd('PA67 an open item without its key', 'G3-634', 2, ($) => { $('[data-e2b-open]').first().attr('data-e2b-key', ''); }, /without its key/);
  pd('PA68 a choice with two right answers', 'G3-641', 1, ($) => { $('[data-g1-one]').first().find('[data-dk-answer]').attr('data-dk-answer', 'right'); }, /2 right answers/);
  pd('PA69 a box with no value', 'G3-633', 2, ($) => { $('[data-e2b-answer]').first().removeAttr('data-e2b-answer'); }, /no value and no key|boxes/);
  pd('PA70 an exclamation on the page', 'G3-645', 1, ($) => { $('[data-dk]').append('<div class="e2b-t">Super!</div>'); }, /exclamation on the page/);
  pd('PA71 an arrow glyph (outside the fonts)', 'G3-643', 1, ($) => { $('[data-dk]').append('<div class="e2b-t">5 → 10</div>'); }, /outside the page fonts/);
  pd('PA72 "schriftlich" on the page', 'G3-636', 3, ($) => { $('[data-dk]').append('<div class="e2b-t">Rechne schriftlich.</div>'); }, /written algorithm/);
  pd('PA73 a library picture', 'G3-642', 1, ($) => { $('[data-dk]').append('<img src="/x/apple.webp">'); }, /library picture/);
  pd('PA74 a number past 1000 on the page', 'G3-633', 3, ($) => { $('[data-dk]').append('<div class="e2b-t">1200</div>'); }, /numbers to 1000/);

  // ---- instruction poisons (each against the real printed instruction of the same type and level, judged in the sweep)
  const realInstr = (id, lv) => withLevelInstruction(resolveStrings(id, 'de', loadType(id)), id, lv, 'de').instruction;
  const pi = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; const s0 = realInstr(id, lv), s1 = spoil(s0); judge(name, s1 === s0 ? ['the spoil changed nothing'] : instrFaults(id, lv, s1), re); };
  pi('PI1 G3-634 without "Beide Wege sind richtig"', 'G3-634', 2, (s) => s.replace('Beide Wege sind richtig', 'Rechne'), /Beide Wege sind richtig/);
  pi('PI2 G3-634 names one right way', 'G3-634', 3, (s) => s + ' Ergänzen ist der richtige Weg.', /names one right way/);
  pi('PI3 G3-636 without the Zerlegung', 'G3-636', 1, (s) => s.replace('Zerlege die zweite Zahl in Zehner und Einer', 'Rechne'), /Zerlege die zweite Zahl/);
  pi('PI4 G3-641 without the rounding rule', 'G3-641', 2, (s) => s.replace('Runde jeden Preis auf ganze Euro', 'Schätze'), /Runde jeden Preis/);
  pi('PI5 an exclamation', 'G3-633', 1, (s) => s + ' Los geht\'s!', /exclamation/);
  pi('PI6 a formula that can break across a line', 'G3-635', 2, (s) => s.replace(/240 : 6 = 40/, '240 : 6 = 40'), /can break across a line/);
  pi('PI7 G3-637 level 1 without "die ersten vier"', 'G3-637', 1, (s) => s.replace('ersten vier', 'Aufgaben'), /ersten vier/);
  pi('PI8 G3-645 without "kann man nicht ablesen"', 'G3-645', 2, (s) => s.replace('stimmt, stimmt nicht oder kann man nicht ablesen', 'stimmt oder stimmt nicht'), /kann man nicht ablesen/);
  pi('PI9 "schriftlich dividieren" in G3-637', 'G3-637', 2, (s) => s + ' Du kannst auch schriftlich dividieren.', /written algorithm/);
  pi('PI10 G3-644 level 2 without "auf die Hälfte" (the diameter as an action)', 'G3-644', 2, (s) => s.replace('stellst du den Zirkel auf die Hälfte ein', 'ist er doppelt so lang'), /auf die Hälfte ein/);
  pi('PI12 G3-644 "Schreibe bei einem Kreis M und r dazu" back', 'G3-644', 1, (s) => s.replace('Zeichne bei einem Kreis den Radius als Strecke von M bis zum Kreis ein und schreibe r daran.', 'Schreibe bei einem Kreis M und r dazu.'), /schreibe r daran/);
  pi('PI13 G3-636 "Rechne erst die Zehner mal" back', 'G3-636', 1, (s) => s.replace('Multipliziere erst mit den Zehnern, dann mit den Einern.', 'Rechne erst die Zehner mal, dann die Einer mal.'), /Multipliziere erst mit den Zehnern/);
  pi('PI14 G3-640 "Schreibe unten anders" back', 'G3-640', 1, (s) => s.replace('Wandle unten jede Angabe in die andere Schreibweise um.', 'Schreibe unten anders.'), /Wandle unten jede Angabe/);
  pi('PI11 G3-638 without "Lege die 0"', 'G3-638', 1, (s) => s.replace('Lege die 0', 'Lege das Lineal'), /Lege die 0/);

  // ---- tell poisons (synthetic pooled sets; each with the real set as its control, judged above)
  const tp = (name, f, re) => judge(name, f, re);
  const rep = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));
  tp('PT1 the near task always on card 1', tellFaults('G3-634', 2, { cards: rep(400, () => ({ first: 'near' })) }).f, /the near task sits on card 1/);
  tp('PT2 level 1\'s card 1 always Abziehen', tellFaults('G3-634', 1, { cards: rep(400, (i) => ({ first: i % 2 ? 'near' : 'far', way: 'sub' })) }).f, /card 1 takes Abziehen/);
  tp('PT3 the missing number always at the end', tellFaults('G3-635', 3, { missing: rep(1000, (i) => (i % 10 ? 2 : 0)) }).f, /sits in der Mitte/);
  tp('PT4 the lines sorted by length', tellFaults('G3-638', 2, { order: rep(400, () => ({ lines: true, draws: false, nl: 4, nd: 4 })) }).f, /lines come sorted/);
  tp('PT5 every card straight across', tellFaults('G3-639', 1, { match: rep(2400, (i) => ({ row: i % 6, card: ['h', 'k', 'v'][Math.floor((i % 6) / 2)], straight: true })) }).f, /straight across/);
  tp('PT6 the shorter way always first', tellFaults('G3-639', 3, { match: rep(2400, (i) => ({ row: i % 6, card: ['h', 'k', 'v'][i % 3], straight: false })), shorter: rep(400, () => true) }).f, /shorter way is option 1/);
  tp('PT7 the 20-euro note always enough', tellFaults('G3-641', 2, { lists: rep(1600, (i) => ({ pos: i % 4, note: i % 2 ? 20 : 10, n: 3 + (i % 2), enough: i % 2 === 1 })), recs: rep(800, (i) => ({ pos: i % 2, right: i % 2 === 0, n: 4, can: i % 2 === 0 })) }).f, /with a 20-euro note|a list of \d prices/);
  tp('PT8 a wrong receipt one row longer', tellFaults('G3-641', 2, { lists: rep(1600, (i) => ({ pos: i % 4, note: [10, 20][Math.floor(i / 4) % 2], n: 3 + (Math.floor(i / 8) % 2), enough: Math.floor(i / 2) % 2 === 0 })), recs: rep(800, (i) => ({ pos: i % 2, right: i % 2 === 0, n: i % 2 ? 5 : 4, can: i % 2 === 0 })) }).f, /a right receipt has/);
  tp('PT9 statement 1 always true', tellFaults('G3-645', 2, { st: rep(2400, (i) => ({ pos: i % 6, kind: 'k' + (i % 6), ans: i % 6 === 0 ? 'yes' : ['yes', 'no', 'cant'][Math.floor(i / 6) % 3] })) }).f, /statement 1 is "yes"/);
  tp('PT10 a kind of statement always false', tellFaults('G3-645', 3, { st: rep(2400, (i) => ({ pos: i % 6, kind: i % 6 === 0 ? 'double' : 'k' + (i % 3), ans: i % 6 === 0 ? 'no' : ['yes', 'no', 'cant'][Math.floor(i / 6) % 3] })) }).f, /kind double is true in 0%/);
  tp('PT11 the unit-price problem always last', tellFaults('G3-643', 3, { kinds: rep(1600, (i) => ({ pos: i % 4, kind: i % 4 === 3 ? 'unit' : ['two', 'third', 'double'][Math.floor(i / 4) % 3] })) }).f, /problem 4 is a unit problem/);
  tp('PT12 a measure with nothing to judge fails', tellFaults('G3-641', 1, {}).f, /nothing to judge/);

  // ---- 4. render, 5. PDF
  const stacks = [];
  let swept = 0, pdfs = 0;
  if (!NO_RENDER) {
    const puppeteer = require(require.resolve('puppeteer', { paths: [WG] }));
    const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
    const OUTD = path.join(require('os').tmpdir(), 'verify-e2-de-b');
    fs.mkdirSync(OUTD, { recursive: true });
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const render = async (type, lv, v, base, keepPdf) => {
      const strings = withLevelInstruction(resolveStrings(type.id, 'de', type), type.id, lv, 'de');
      const r = await renderInstance({ type, theme: null, difficulty: lv, locale: 'de', strings, variant: v, page, outDir: OUTD, baseName: base });
      if (keepPdf) { try { r.pdf = readPdf(r.pdfPath); } catch (e) { r.pdfError = e.message; } }
      for (const x of ['.pdf', '.png', '.html', '.key.pdf']) try { fs.unlinkSync(path.join(OUTD, base + x)); } catch (e) {}
      return r;
    };
    const REAL = ['G3-638', 'G3-644'];
    const layoutSweep = async (t, lv, n) => {
      const seen = new Set(), faults = [];
      for (let v = 1; v <= n; v++) {
        const b = buildPage(t, lv, v);
        const h = crypto.createHash('sha1').update(b.html).digest('hex'); if (seen.has(h)) continue; seen.add(h);
        await page.evaluate((html) => { document.querySelector('main.ws-body').innerHTML = html; }, b.html);
        for (const x of await t.verify(page)) faults.push(`copy ${v}: ${x}`);
      }
      return { n: seen.size, faults };
    };
    try {
      for (const id of IDS) {
        const t = loadType(id);
        for (const lv of [1, 2, 3]) for (let v = 1; v <= (QUICK ? 1 : 2); v++) {
          const real = REAL.includes(id) && !NO_PDF;
          const r = await render(t, lv, v, `${id}-L${lv}-v${v}`, real);
          const bad = [].concat(r.qa.lints || [], r.qa.verify || []);
          ok(!bad.length, `${id} L${lv} v${v}: ${bad.slice(0, 3).join(' | ')}`);
          if (real) { pdfs++; const pf = r.pdfError ? [r.pdfError] : pdfFaults(id, lv, r.pdf, r.html); ok(!pf.length, `${id} L${lv} v${v} PDF: ${pf.slice(0, 4).join(' | ')}`); }
          if (v === 1) { const stk = await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom); return Math.round(Math.max(...ink) - rt.top); }); stacks.push(`${id} L${lv} ${stk}`); }
          if (v === (QUICK ? 1 : 2)) { const sw = await layoutSweep(t, lv, QUICK ? 30 : SEEDS); swept += sw.n; ok(!sw.faults.length, `${id} L${lv} layout sweep (${sw.n} distinct of ${QUICK ? 30 : SEEDS} generator seeds): ${sw.faults.slice(0, 4).join(' | ')}`); }
        }
        process.stdout.write(id + ' ');
      }
      console.log(`\nrender done (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
      // the real sizes of EVERY length a thing can have: each drawn alone in the browser, its ink measured
      const probeThings = async (draw) => {
        const items = [];
        for (const th of B.MM_THINGS) for (let len = th.mm[0]; len <= th.mm[1]; len++) items.push({ id: th.id, len, svg: draw(th.id, len) });
        await page.evaluate((html) => { document.querySelector('main.ws-body').innerHTML = html; }, items.map((x, i) => `<div id="e2bt${i}">${x.svg}</div>`).join(''));
        const got = await page.evaluate((n) => Array.from({ length: n }, (_, i) => { const s = document.querySelector(`#e2bt${i} svg`), o = s.querySelector('[data-e2b-outline]'), bb = o.getBBox(); return { w: bb.width, sw: Number(s.dataset.e2bSw), rw: s.getBoundingClientRect().width, vb: s.viewBox.baseVal.width }; }), items.length);
        const f = [];
        // the ink as the browser draws it: the outline's box plus its stroke, at the drawing's rendered scale
        got.forEach((g, i) => { const inkMm = ((g.w + g.sw) * (g.rw / g.vb)) / PX_MM, boxMm = g.rw / PX_MM; if (Math.abs(inkMm - items[i].len) > 0.2 || Math.abs(boxMm - items[i].len) > 0.2) f.push(`the ${items[i].id} drawn at ${items[i].len} mm has ${inkMm.toFixed(2)} mm of ink in a ${boxMm.toFixed(2)}-mm drawing`); });
        return { n: items.length, f };
      };
      if (IDS.includes('G3-638')) {
        const pt = await probeThings(ART.realThing);
        ok(!pt.f.length, `real things: ${pt.f.length} of ${pt.n} lengths off: ${pt.f.slice(0, 3).join(' | ')}`);
        console.log(`real things: every length of every thing drawn and measured (${pt.n} drawings, ${pt.f.length} off)`);
        judge('PP0 every thing drawn 0.4 mm short', (await probeThings((id, len) => ART.realThing(id, len - 0.4))).f, /mm of ink in a/);
      }
      const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); const h = fn(r.bodyHtml); if (h === r.bodyHtml) throw new Error('the spoil changed nothing'); return { ...r, bodyHtml: h }; } }; };
      const pr = async (name, id, lv, fn, re) => { if (!IDS.includes(id)) return; let f; try { const r = await render(spoilType(id, fn), lv, 1, 'poison'); f = [].concat(r.qa.verify || [], r.qa.lints || []); } catch (e) { f = ['render threw: ' + e.message]; } judge(name, f, re); };
      const pp = async (name, id, lv, fn, re) => { if (!IDS.includes(id) || NO_PDF) return; let f; try { const r = await render(spoilType(id, fn), lv, 1, 'poison', true); f = r.pdfError ? [r.pdfError] : pdfFaults(id, lv, r.pdf, r.html); } catch (e) { f = ['render threw: ' + e.message]; } judge(name, f, re); };
      const $h = (fn) => (h) => { const $ = cheerio.load(h, null, false); fn($); return $.html(); };
      // each render poison's control is the real page of the same type and level, rendered above (ok() on its verify)
      await pr('PR1 the page shrunk (a blank band at the bottom)', 'G3-642', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is|empty band/);
      await pr('PR2 a box too small to write in', 'G3-633', 1, $h(($) => { const b = $('[data-e2b-answer]').first(); b.attr('style', (b.attr('style') || '') + ';width:18px;height:18px'); }), /a box \d+x\d+ px/);
      await pr('PR3 a ruler tick moved 1 px', 'G3-638', 1, (h) => h.replace(/(data-e2b-tick="50"[^>]*)|(<line x1=")([0-9.]+)(" y1="2" x2=")([0-9.]+)("[^>]*data-e2b-tick="50")/, (m, a, b1, x1, b2, x2, c) => (b1 ? b1 + (Number(x1) + 1) + b2 + (Number(x2) + 1) + c : m)), /ruler tick 50 lies/);
      await pr('PR4 a line\'s end 1 mm short', 'G3-638', 2, $h(($) => { const s = $('[data-e2b-endmark="1"]').first(); s.attr('x1', String(Number(s.attr('x1')) - 3.8)); s.attr('x2', String(Number(s.attr('x2')) - 3.8)); }), /-mm line is/);
      await pr('PR5 a thing\'s drawing squeezed', 'G3-638', 2, $h(($) => { const s = $('[data-e2b-art="real-thing"]').first(); s.attr('width', String(Number(s.attr('width')) * 0.95)); }), /drawing is .* mm wide|prints|is \d+\.\d+ mm, the page says/);
      await pr('PR6 a start point with no room for its line', 'G3-638', 3, $h(($) => { const s = $('[data-e2b-art="start-point"]').first(); s.attr('data-e2b-room', '160'); }), /a start point with/);
      await pr('PR7 the Rechenstrich crowded (the jumps get no room)', 'G3-634', 2, $h(($) => { const sv = $('[data-e1-strich]').first().closest('svg'); sv.attr('style', sv.attr('style') + ';margin-top:-40px'); }), /px over a Rechenstrich/);
      await pr('PR8 a bar ending above its value', 'G3-645', 2, $h(($) => { const b = $('[data-e2b-bar]').first(); b.attr('y', String(Number(b.attr('y')) - 12)); b.attr('height', String(Number(b.attr('height')) + 12)); }), /bar does not end at/);
      await pr('PR9 a flower circle turned 12 degrees off its place', 'G3-644', 1, $h(($) => { const m = $('[data-e2b-flower="0"]'), c = $('[data-e2b-flower]').filter((i, e) => e.attribs['data-e2b-flower'] !== '0').first(); const mx = Number(m.attr('cx')), my = Number(m.attr('cy')), dx = Number(c.attr('cx')) - mx, dy = Number(c.attr('cy')) - my, a = (12 * Math.PI) / 180; c.attr('cx', String(mx + dx * Math.cos(a) - dy * Math.sin(a))); c.attr('cy', String(my + dx * Math.sin(a) + dy * Math.cos(a))); }), /flower circle is not at its 60-degree place/);
      await pr('PR10 a centre with no room for its circle', 'G3-644', 2, $h(($) => { const r = $('[data-e2b-region]').first(); r.attr('style', (r.attr('style') || '') + ';width:60px'); }), /has no room in its place|outside|exceeds|collide/);
      await pr('PR11 the roads out of proportion', 'G3-639', 1, $h(($) => { const r = $('[data-e2b-road]').first(); r.attr('x2', String((Number(r.attr('x1')) + Number(r.attr('x2'))) / 2 + 0.1 * (Number(r.attr('x2')) - Number(r.attr('x1'))))); r.attr('y2', String((Number(r.attr('y1')) + Number(r.attr('y2'))) / 2)); }), /out of proportion/);
      await pr('PR12 the tape\'s arrow off its value', 'G3-640', 1, $h(($) => { const a = $('[data-e2b-tapearrow]').first(); a.attr('transform', 'translate(14 0)'); }), /tape's arrow is not at/);
      await pr('PR14 an answer line too short for the answer sentence', 'G3-643', 2, $h(($) => { $('[data-e2b-ansline="1"] [data-dk-writerow]').first().attr('width', '200').attr('style', 'width:200px'); }), /an answer line of \d+ mm for a/);
      await pr('PR13 an arrow box on the table', 'G3-643', 2, $h(($) => { const b = $('[data-e2b-op]').first(); b.attr('style', (b.attr('style') || '') + ';margin-top:60px'); }), /arrow box|collide|out of/);
      // PDF poisons: each spoils the page, prints it and measures the PDF (the controls: the real pages measured above)
      await pp('PP1 a ruler tick moved 1 px', 'G3-638', 1, (h) => h.replace(/(<line x1=")([0-9.]+)(" y1="2" x2=")([0-9.]+)("[^>]*data-e2b-tick="37")/, (m, a, x1, b, x2, c) => a + (Number(x1) + 1) + b + (Number(x2) + 1) + c), /ruler tick 37 prints/);
      await pp('PP2 the whole ruler printed 2% small', 'G3-638', 2, $h(($) => { const s = $('[data-e2b-art="mm-ruler"]').first(); s.attr('width', String(Number(s.attr('width')) * 0.98)); s.attr('height', String(Number(s.attr('height')) * 0.98)); }), /ruler tick \d+ prints/);
      await pp('PP3 a line printed 0.5 mm short', 'G3-638', 2, $h(($) => { const s = $('[data-e2b-seg]').first(); s.attr('x2', String(Number(s.attr('x2')) - 1.9)); }), /-mm line prints/);
      await pp('PP4 a line\'s end mark moved off its end', 'G3-638', 1, $h(($) => { const s = $('[data-e2b-endmark="1"]').first(); s.attr('x1', String(Number(s.attr('x1')) + 4)); s.attr('x2', String(Number(s.attr('x2')) + 4)); }), /end mark is not at its end/);
      await pp('PP5 a thing printed 3% small', 'G3-638', 2, $h(($) => { const s = $('[data-e2b-art="real-thing"]').last(); s.attr('width', String(Number(s.attr('width')) * 0.97)); s.attr('height', String(Number(s.attr('height')) * 0.97)); }), /prints \d+\.\d+ mm, the page says/);
      await pp('PP6 the whole page printed at 98%', 'G3-638', 3, (h) => h.replace('class="dk-root"', 'class="dk-root" style="zoom:0.98"'), /prints/);
      await pp('PP7 a flower circle 1 px too big', 'G3-644', 1, $h(($) => { const c = $('[data-e2b-flower="0"]'); c.attr('r', String(Number(c.attr('r')) + 1)); }), /flower circle prints|no flower circle/);
      await pp('PP8 a model circle moved 2 px', 'G3-644', 2, $h(($) => { const c = $('[data-e2b-model="3"]'); c.attr('cx', String(Number(c.attr('cx')) + 2)); }), /model centre|model has no middle/);
      await pp('PP9 a flower mark moved 2 px', 'G3-644', 1, $h(($) => { const c = $('[data-e2b-flowermark="2"]'); c.attr('cx', String(Number(c.attr('cx')) + 2)); }), /flower mark|no flower circle/);
      await pp('PP10 the target circle drawn at 19 mm', 'G3-644', 1, $h(($) => { const c = $('[data-e2b-targetstart]'); c.attr('r', String(19 * PX_MM)); }), /target's first circle prints/);
    } finally { await browser.close(); }
    console.log('stacks (copy 1, measured on what is drawn): ' + stacks.join(', '));
    console.log(`layout sweep: ${swept} distinct pages of the generator's seeds 1..${QUICK ? 30 : SEEDS} judged by each type's own verify; ${pdfs} PDFs measured`);
  }
  console.log('measures (pooled, ' + SEEDS + ' copies a level):');
  for (const id of IDS) for (const lv of [1, 2, 3]) { const M = pools[id + lv + 'M']; if (M && Object.keys(M).length) console.log(`  ${id} L${lv}: ` + Object.entries(M).map(([k, v]) => (/^receiptRows/.test(k) ? `${k} ${v.toFixed(2)}` : `${k} ${(100 * v).toFixed(1)}%`)).join('; ')); }
  console.log(plog.join('\n'));
  console.log(`poisons ${killed}/${poisons} killed`);
  ok(killed === poisons, `${poisons - killed} poisons not killed`);
  if (fails.length) {
    const byKind = {};
    for (const x of fails) { const k = x.replace(/seed \d+/, 'seed N'); byKind[k] = (byKind[k] || 0) + 1; }
    console.log('FAIL (' + fails.length + '):\n  ' + Object.entries(byKind).slice(0, 60).map(([k, n]) => (n > 1 ? n + 'x ' : '') + k).join('\n  '));
    process.exit(1);
  }
  console.log(`PASS (${assertions} assertions, ${SEEDS} seeds a level; ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
/** the shape of a level's page (what sections and how many of each), its numbers left out */
function levelSig(html) {
  const $ = cheerio.load(html);
  const parts = [];
  $('[data-dk] *').each((i, e) => { for (const [k, v] of Object.entries(e.attribs || {})) if (/^data-e2b-(sec|kind|block|form|conv|given|task|art|mode|draw|both|quick|missing|why|statement|kopf|head|steps)$/.test(k)) parts.push(k.slice(9) + '=' + String(v).replace(/[0-9]+/g, '#')); });
  return parts.join(',');
}
/** which modes must have something to judge at which levels (the others measure where they can) */
const TELL_NEEDED = { 'e2b-hsub': true, 'e2b-mz': [3], 'e2b-mm': true, 'e2b-km': true, 'e2b-ueber': true, 'e2b-tab-preis': true, 'e2b-tab-sach': true, 'e2b-dia': true };
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, pageFaults, tellFaults, pdfFaults, buildPage, statementTruth, IDS: ALL_IDS, __pageFaults: pageFaults, __bankFaults: () => bankFaults(B, fs.readFileSync(path.join(WG, 'types', '_shared', 'e2-math-b-art.js'), 'utf8')) };
