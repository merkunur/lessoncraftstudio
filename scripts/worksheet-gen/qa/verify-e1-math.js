#!/usr/bin/env node
/**
 * verify-e1-math.js — the gate of Batch E-1 (Daily Teaching System Stage E, 2026-11-25): the German and Swedish
 * mathematics pages G1-671, G1-672, G2-631, G2-632, G2-633, G3-630, G3-631, G3-632 (factory types/_shared/e1-math.js,
 * drawings e1-math-art.js, bank data/e1/e1-math.js).
 *
 *   node scripts/worksheet-gen/qa/verify-e1-math.js [--quick] [--seeds=400] [--no-render] [--only=G1-671,...]
 *
 *   1. BANK: every closed fact by the gate's OWN tables, never the bank's word: the price a stall or shop asks for each
 *      thing (euros 1-12, kronor 12-95), the mass of every thing on a scale (whole kilograms) and of every thing compared
 *      with 1 kg, the unit of every activity, the Swedish definite form and verb of every shelf thing, the position words;
 *      no activity names its unit; no drawing thing is a shelf thing; every picture a colour picture; the play money's
 *      values and the ORDER of its coin sizes; every colour the drawings write is in PAL_E1.
 *   2. BUILD, --seeds copies of every type at every level, each page read from its own html (cheerio): every stamp agrees
 *      with the gate's own arithmetic (sums, change, the one way to circle the money, the fewest coins and notes, the
 *      masses, the durations and the Swedish clock words, the steps of a halbschriftlich sum, the Überschlag rule and the
 *      error of every finished calculation, the places on the shelf); the level's own band (numbers, kinds, counts); the
 *      one-answer tests (the exact money one way; each shelf sentence one place; each missing position word one fit, and
 *      the word box one way to fill); NO TELL: where an answer sits, pooled, within a band of chance; every word, the
 *      first and last word and the length of a sentence, as a guesser, no better than 75 %; shortcuts that skip the maths
 *      (circle all but the last piece, all the notes ...) right no more than 75 %; the three levels differ; another
 *      locale refuses; the record page carries no answer.
 *   3. RENDER (the print pipeline), every type x level, 2 copies (1 with --quick): verify() (the Batch K page check, the
 *      one-right-choice check and e1VerifyInPage) and qa/lints.js clean; the stack. Then the LAYOUT SWEEP: the generator's
 *      own seeds 1..SEEDS, every DISTINCT page swapped into the rendered page and judged by its type's verify.
 *   4. POISONS: each check FAILS on a bank, a page or a set of pages spoiled for it; each page poison has a control that
 *      passes (the real page of the same type and level, judged above).
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const WG = path.join(__dirname, '..');
const cheerio = require(require.resolve('cheerio', { paths: [WG] }));
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
const B = require(path.join(WG, 'data', 'e1', 'e1-math.js'));
const ART = require(path.join(WG, 'types', '_shared', 'e1-math-art.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const NO_RENDER = process.argv.includes('--no-render');
const SEEDS = Number(arg('seeds', QUICK ? '60' : '400'));
const ALL_IDS = ['G1-671', 'G1-672', 'G2-631', 'G2-632', 'G2-633', 'G3-630', 'G3-631', 'G3-632'];
const IDS = arg('only', '') ? arg('only', '').split(',') : ALL_IDS;
const LOC = { 'G1-671': 'de', 'G3-630': 'de', 'G3-631': 'de', 'G1-672': 'sv', 'G2-631': 'sv', 'G2-632': 'sv', 'G2-633': 'sv', 'G3-632': 'sv' };
const MODE = { 'G1-671': 'markt', 'G1-672': 'lage', 'G2-631': 'vaxel', 'G2-632': 'kilo', 'G2-633': 'tid', 'G3-630': 'halb', 'G3-631': 'ueber', 'G3-632': 'und' };
const clone = (x) => JSON.parse(JSON.stringify(x));
const sum = (a) => a.reduce((s, x) => s + x, 0);

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
/** the prices a teacher accepts (whole euros at a Klasse-1 toy and school stall; kronor in a Swedish toy or stationery shop) */
const EUR_OWN = { ball: [4, 12], car: [2, 8], robot: [6, 12], train: [5, 12], dice: [1, 3], kite: [4, 12], boat: [3, 10], dinosaur: [3, 9], truck: [5, 12], rocket: [3, 9], teddy: [5, 12], crayons: [2, 6], cards: [2, 6], bucket: [2, 6], shovel: [1, 4], book: [3, 12], scissors: [2, 5], glue: [1, 3], ruler: [1, 3], lunchbox: [3, 9], cap: [4, 12], umbrella: [5, 12], sunglasses: [3, 12], scarf: [4, 12], beanie: [4, 10] };
const SEK_OWN = { ball: [39, 95], car: [19, 49], robot: [59, 95], train: [39, 95], dice: [12, 19], kite: [39, 95], boat: [29, 79], dinosaur: [29, 79], truck: [39, 95], rocket: [25, 69], teddy: [49, 95], crayons: [19, 45], cards: [19, 39], bucket: [15, 35], shovel: [12, 25], book: [39, 95], scissors: [15, 39], glue: [12, 25], ruler: [12, 25], notebook: [12, 29], lunchbox: [29, 79], cap: [49, 95], umbrella: [59, 95], sunglasses: [29, 95], scarf: [49, 95], beanie: [39, 95] };
/** whole kilograms a teacher accepts for the thing as pictured (sources in the bank's comment and the result file) */
const KG_OWN = { pineapple: [1, 1], guitar: [2, 3], backpack: [2, 5], pumpkin: [3, 7], chair: [4, 7] };   // review round 2: no bicycle (every one in the library is full-size, about 15 kg)   // review round 1: the pineapple is THE 1-kg thing
const BOWL_OWN = new Set(['pineapple', 'backpack', 'pumpkin']);   // what goes in a kitchen scale's bowl
/** masses in kilograms of the things compared with 1 kg (typical): all far from 1 kg */
const LIGHT_OWN = { apple: 0.15, banana: 0.12, key: 0.01, feather: 0.001, strawberry: 0.02, spoon: 0.05, toothbrush: 0.02, pencil: 0.005, mouse: 0.03, goldfish: 0.01, orange: 0.2, lemon: 0.1 };
const HEAVY_OWN = { bicycle: 15, chair: 5, television: 15, refrigerator: 60, couch: 40, cat: 4, pumpkin: 5 };
/** level 3's small balances: what goes DOWN against one 1-kg weight (fits a pan, never alive), kilograms (typical) */
const PAN_HEAVY_OWN = { pumpkin: 5, backpack: 3, skateboard: 3 };
/** every cat in the library is drawn as a kitten, which can weigh under 1 kg (review round 1): no cat on this page */
const KITTEN = /^cat(_\d+)?$/;
const ALIVE_OWN = new Set(['mouse', 'goldfish']);   // never put on a balance (level 3)
/** the unit of every activity (one order of magnitude each) */
const UNIT_OWN = { blink: 'sekunder', sneeze: 'sekunder', clap: 'sekunder', name: 'sekunder', button: 'sekunder', slide: 'sekunder', teeth: 'minuter', banana: 'minuter', shower: 'minuter', dress: 'minuter', story: 'minuter', walk: 'minuter', night: 'timmar', schoolday: 'timmar', train: 'timmar', plane: 'timmar', bus: 'timmar', beach: 'timmar' };
/** Swedish: the definite form and the verb a shelf thing takes (ligger / står / sitter) */
const DEF_OWN = { book: 'boken', ball: 'bollen', car: 'bilen', robot: 'roboten', train: 'tåget', dice: 'tärningen', globe: 'jordgloben', teddy: 'nallen', boat: 'båten', rocket: 'raketen', dinosaur: 'dinosaurien', cup: 'koppen' };
const VERB_OWN = { book: 'ligger', ball: 'ligger', car: 'står', robot: 'står', train: 'står', dice: 'ligger', globe: 'står', teddy: 'sitter', boat: 'står', rocket: 'står', dinosaur: 'står', cup: 'står' };
/** the figures with a head, whose head and shoulders over a box read as standing behind it */
const HEADED_OWN = new Set(['teddy', 'dinosaur', 'robot']);
const DRAW_OWN = { apple: 'ett äpple', star: 'en stjärna', heart: 'ett hjärta', flower: 'en blomma' };
const REL_OWN = { left: 'till vänster om', right: 'till höger om', next: 'bredvid', between: 'mellan', above: 'ovanför', below: 'nedanför', front: 'framför', behind: 'bakom' };
const SV_NUM = ['', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'];
/** the Swedish clock word: whole hour "klockan nio", half hour "halv" + the NEXT hour (halv tio = 9:30) */
const clockOwn = (h, m) => (m === 0 ? 'klockan ' + SV_NUM[h] : 'halv ' + SV_NUM[h === 12 ? 1 : h + 1]);
/** play money: the denominations this batch draws and the real coin diameters (mm; only their ORDER is drawn) */
const MONEY_OWN = { EUR: { notes: [5, 10, 20], coins: { 1: 23.25, 2: 25.75 } }, SEK: { notes: [20, 50, 100, 200], coins: { 1: 19.5, 2: 22.5, 5: 23.75, 10: 20.5 } } };
const UNIT_WORD = /sekund|minut|timm|timme/i;

/* ================================================================ 1. bank */
function bankFaults(b, artSrc, art = ART) {
  const f = [];
  const manifest = require(path.join(WG, 'image-cache', 'resolve.js')).manifest();
  const BW = /(^|\s)bw(\s|$)|\bbw \d/i;
  const picOk = (p, who) => { if (!manifest.themes[p[0]] || !manifest.themes[p[0]].nouns[p[1]]) f.push(`${who}: the picture ${p.join('/')} is not in the library`); if (BW.test(p[0])) f.push(`${who}: a black-and-white picture (${p[0]})`); };
  const seenPic = new Set();
  for (const g of b.DE_GOODS) {
    const own = EUR_OWN[g.id];
    if (!own) f.push(`de good ${g.id}: not in the gate's table`); else if (g.eur[0] < own[0] || g.eur[1] > own[1]) f.push(`de good ${g.id}: ${g.eur} € is outside ${own}`);
    if (g.eur[0] < 1 || g.eur[1] > 12) f.push(`de good ${g.id}: prices ${g.eur} not whole euros 1-12`);
    picOk(g.pic, 'de good ' + g.id); if (seenPic.has(g.pic.join('/'))) f.push(`de good ${g.id}: a picture used twice`); seenPic.add(g.pic.join('/'));
  }
  seenPic.clear();
  for (const g of b.SV_GOODS) {
    const own = SEK_OWN[g.id];
    if (!own) f.push(`sv good ${g.id}: not in the gate's table`); else if (g.kr[0] < own[0] || g.kr[1] > own[1]) f.push(`sv good ${g.id}: ${g.kr} kr is outside ${own}`);
    if (g.kr[0] < 12 || g.kr[1] > 95) f.push(`sv good ${g.id}: prices ${g.kr} not 12-95 kr`);
    picOk(g.pic, 'sv good ' + g.id); if (seenPic.has(g.pic.join('/'))) f.push(`sv good ${g.id}: a picture used twice`); seenPic.add(g.pic.join('/'));
  }
  for (const o of b.MASS_OBJECTS) {
    const own = KG_OWN[o.id];
    if (!own) f.push(`mass ${o.id}: not in the gate's table`); else if (o.kg[0] < own[0] || o.kg[1] > own[1]) f.push(`mass ${o.id}: ${o.kg} kg is outside ${own}`);
    if (o.kg[0] < 1 || o.kg[1] > 10) f.push(`mass ${o.id}: not whole kilograms 1-10`);
    if (o.scale && !BOWL_OWN.has(o.id)) f.push(`mass ${o.id}: put in a kitchen scale's bowl`);
    picOk(o.pic, 'mass ' + o.id);
  }
  for (const x of b.LIGHT_THINGS) { if (!(x.id in LIGHT_OWN)) f.push(`light ${x.id}: not light by the gate's table`); else if (LIGHT_OWN[x.id] > 0.3) f.push(`light ${x.id}: ${LIGHT_OWN[x.id]} kg is near 1 kg`); if (!!x.alive !== ALIVE_OWN.has(x.id)) f.push(`light ${x.id}: alive flag`); picOk(x.pic, 'light ' + x.id); }
  for (const x of b.HEAVY_THINGS) { if (!(x.id in HEAVY_OWN)) f.push(`heavy ${x.id}: not heavy by the gate's table`); else if (HEAVY_OWN[x.id] < 3) f.push(`heavy ${x.id}: ${HEAVY_OWN[x.id]} kg is near 1 kg`); picOk(x.pic, 'heavy ' + x.id); }
  if (b.ABOUT_ONE.map((x) => x.id).join() !== 'pineapple') f.push('about 1 kg: ' + b.ABOUT_ONE.map((x) => x.id));
  for (const x of b.PAN_HEAVY || []) { if (!(x.id in PAN_HEAVY_OWN)) f.push(`pan-heavy ${x.id}: not in the gate's table`); else if (PAN_HEAVY_OWN[x.id] < 2) f.push(`pan-heavy ${x.id}: near 1 kg`); if (ALIVE_OWN.has(x.id) || x.alive) f.push(`pan-heavy ${x.id}: alive`); picOk(x.pic, 'pan-heavy ' + x.id); }
  if ((b.PAN_HEAVY || []).length < 3) f.push('fewer than three things for the small balances');
  for (const x of [].concat(b.MASS_OBJECTS, b.LIGHT_THINGS, b.HEAVY_THINGS, b.PAN_HEAVY || [], b.ABOUT_ONE)) if (KITTEN.test(x.pic[1])) f.push(`${x.id}: a cat (every cat in the library is drawn as a kitten)`);
  // review round 1: the reviewers' wording, held word for word
  const TX = b.TEXT;
  if (!/Runde die beiden Zahlen der Aufgabe auf Hunderter/.test(TX.ueber.rule) || !/\(nicht runden!\)/.test(TX.ueber.rule)) f.push('the Überschlag rule does not round the two numbers of the task (and not the result)');
  if (!/Ergebnis minus zweite Zahl/.test(TX.ueber.probe) || !/Ergebnis plus zweite Zahl/.test(TX.ueber.probe)) f.push('the Probe sentence does not say which Umkehraufgabe');
  if (TX.ueber.right !== 'Richtig wäre:') f.push('the correction label is not "Richtig wäre:"');
  if (TX.ueber.after !== 'Nach dem Überschlag:') f.push('the chips are not led by "Nach dem Überschlag:"');
  if (TX.halb.labels.join('|') !== 'Hunderter dazu|Zehner dazu|Einer dazu') f.push('the step labels are not "Hunderter dazu / Zehner dazu / Einer dazu"');
  if (TX.halb.starters.join('|') !== 'Zuerst habe ich|Dann habe ich|Zum Schluss habe ich') f.push('not the three explanation starters');
  if (TX.vaxel.line !== 'Räkna uppåt på tallinjen:') f.push('the number line label is not "Räkna uppåt på tallinjen:"');
  if (TX.vaxel.money !== 'Mynt: 1 kr, 2 kr, 5 kr, 10 kr   Sedlar: 20 kr, 50 kr, 100 kr') f.push('the coins and notes line');
  if (TX.vaxel.drawFew !== 'Rita växeln:') f.push('the level-3 box label is not "Rita växeln:"');
  if (TX.kilo.scaleHead !== 'Köksvåg') f.push('the kitchen scale is not "Köksvåg"');
  if (TX.tid.halfHour !== 'En halvtimme = 30 minuter.') f.push('the half-hour line');
  // review round 2
  if (TX.undersokning.moreSteps !== 'Rita fler steg om det behövs.') f.push('the line under the chart is not "Rita fler steg om det behövs."');
  for (const o of b.MASS_OBJECTS) if (/bicycle|bike/.test(o.pic[1])) f.push(`mass ${o.id}: a bicycle on a measure card (every bicycle in the library is drawn full-size, about 15 kg)`);
  for (const [cur, v] of [['EUR', 5], ['EUR', 20], ['SEK', 20], ['SEK', 100]]) { const nt = art.note(cur, v, 40); if (!new RegExp('data-e1-mid="' + v + '\\s(kr|€)"').test(nt)) f.push(`the ${v} ${cur} note has no value in the middle`); }
  for (const a of b.UNIT_ACTIVITIES) {
    if (UNIT_OWN[a.id] !== a.unit) f.push(`activity ${a.id}: the bank says ${a.unit}, the gate ${UNIT_OWN[a.id]}`);
    if (UNIT_WORD.test(a.sv)) f.push(`activity ${a.id}: "${a.sv}" names a unit`);
  }
  for (const u of b.UNITS) if (b.UNIT_ACTIVITIES.filter((a) => a.unit === u).length < 4) f.push(`fewer than four activities in ${u}`);
  for (const x of b.SHELF_THINGS) {
    if (DEF_OWN[x.id] !== x.def) f.push(`shelf ${x.id}: the definite form "${x.def}" (the gate: ${DEF_OWN[x.id]})`);
    if (VERB_OWN[x.id] !== x.verb) f.push(`shelf ${x.id}: the verb "${x.verb}" (the gate: ${VERB_OWN[x.id]})`);
    picOk(x.pic, 'shelf ' + x.id);
  }
  // the definite forms against the attested Nordic table where it holds the noun
  try { const DN = require(path.join(WG, 'data', 'nouns-articles', 'definite-nordic.js')); const sv = (DN.DEFINITE || DN).sv || {}; for (const x of b.SHELF_THINGS) { const k = x.pic[1].replace(/_/g, ' '); if (sv[k] && !sv[k].includes(x.def) && !['jordgloben', 'nallen'].includes(x.def)) f.push(`shelf ${x.id}: "${x.def}" is not the attested definite form (${sv[k]})`); } } catch (e) { /* the table is optional */ }
  for (const id of b.BOX_FRONT.concat(b.BOX_BEHIND)) if (!DEF_OWN[id]) f.push(`box thing ${id} is not a shelf thing`);
  for (const id of b.BOX_BEHIND) if (!HEADED_OWN.has(id)) f.push(`${id} behind the box: only a figure with a head reads as behind (a round thing over the box reads as on it)`);
  if (JSON.stringify(b.BOX_FRONT.slice().sort()) !== JSON.stringify(b.BOX_BEHIND.slice().sort())) f.push('the things in front of the box and behind it differ: the thing would tell framför or bakom');
  for (const d of b.DRAW_THINGS) { if (DRAW_OWN[d.id] !== d.sv) f.push(`draw thing ${d.id}: "${d.sv}"`); if (b.SHELF_THINGS.some((x) => x.id === d.id || x.def.startsWith(d.sv.split(' ')[1]))) f.push(`draw thing ${d.id} is a shelf thing too`); }
  for (const [k, v] of Object.entries(REL_OWN)) if (b.SV_REL[k] !== v) f.push(`position word ${k}: "${b.SV_REL[k]}"`);
  if (!/mehr als 100/.test(b.TEXT.ueber.rule) || !/Hunderter/.test(b.TEXT.ueber.rule)) f.push('the Überschlag rule does not say "Hunderter" and "mehr als 100"');
  for (const a of b.UNIT_ACTIVITIES) if (/knappen/.test(a.sv)) f.push(`activity ${a.id}: "knappen" asks which button`);
  // play money
  for (const cur of ['EUR', 'SEK']) {
    const M = art.MONEY[cur], own = MONEY_OWN[cur];
    if (Object.keys(M.notes).map(Number).join() !== own.notes.join()) f.push(`${cur}: notes ${Object.keys(M.notes)}`);
    const vs = Object.keys(own.coins).map(Number);
    for (const a of vs) for (const c of vs) if ((M.coins[a] - M.coins[c]) * (own.coins[a] - own.coins[c]) < 0) f.push(`${cur}: the ${a} coin and the ${c} coin are drawn in the wrong size order`);
    for (const v of vs) { const s = art.coin(cur, v); const d = Number(/width="([\d.]+)"/.exec(s)[1]); if (d < 32) f.push(`${cur}: the ${v} coin is ${d} px (too small to read)`); }
  }
  // every colour the drawings write
  const pal = new Set([...art.PAL_E1].map((c) => c.toUpperCase()));
  for (const h of new Set((artSrc.match(/#[0-9A-Fa-f]{6}\b/g) || []).map((c) => c.toUpperCase()))) if (!pal.has(h)) f.push(`the drawings write ${h}, outside PAL_E1`);
  return f;
}

/** the phrases each type's printed instruction must hold (the reviewers' wording) */
const INSTR_OWN = {
  'G1-671': ['Schreibe die zwei Preise auf und rechne sie zusammen.', 'mit dem du passend bezahlen kannst'],
  'G1-672': ['Rita varje sak på rätt plats i hyllan.', 'Vänster och höger är som du ser hyllan.'],
  'G2-631': ['Räkna uppåt från priset till sedelns värde på tallinjen.'],
  'G2-632': ['ringa in rätt svar', 'Ringa sedan in rätt svar'],
  'G2-633': [],
  'G3-630': ['Rechne schrittweise: Beginne bei der ersten Zahl', 'Zeichne die Sprünge am Rechenstrich ein', 'Lass ein anderes Kind deinen Rechenweg nachrechnen.'],
  'G3-631': ['kreise ein, was der Überschlag zeigt: kann stimmen oder kann nicht stimmen.'],
  'G3-632': [],
};
function instrFaults(id, lv, text) {
  const f = [];
  const need = INSTR_OWN[id].filter((x) => !(id === 'G2-632' && x === (lv === 3 ? 'Ringa sedan in rätt svar' : 'ringa in rätt svar')));
  for (const x of need) if (!text.includes(x)) f.push(`${id} L${lv}: the instruction lacks "${x}"`);
  if (id === 'G2-633' && lv === 3 && !text.includes('Skriv klockslaget med ord')) f.push(`${id} L3: the instruction lacks "med ord"`);
  if (id === 'G1-672' && /Rita saken/.test(text)) f.push(`${id} L${lv}: "Rita saken" (several things are drawn)`);
  return f;
}

/* ================================================================ 2. build */
function buildPage(t, lv, seed) {
  const b = t.build({ theme: null, difficulty: lv, locale: LOC[t.id], unit: null }, { rng: makeRng(instanceSeed({ typeId: t.id, theme: null, difficulty: lv, seedEpoch: 1, variant: seed })), variant: seed, seedVariant: seed });
  return { html: b.bodyHtml, meta: b.meta };
}
const num = (x) => Number(x);
const intsOf = (s) => String(s).split(',').map(Number);
/** the subsets (by piece) of vals that make the target */
const waysOwn = (vals, target) => { let n = 0; for (let m = 1; m < (1 << vals.length); m++) { let s = 0; for (let i = 0; i < vals.length; i++) if (m & (1 << i)) s += vals[i]; if (s === target) n++; } return n; };
/** the fewest pieces making amount (count vectors of every fewest way) */
function fewestOwn(amount, vals) { let best = Infinity, ways = []; const rec = (i, left, c) => { if (left === 0) { const n = sum(c); if (n < best) { best = n; ways = [c.slice()]; } else if (n === best) ways.push(c.slice()); return; } if (i === vals.length) return; for (let k = Math.floor(left / vals[i]); k >= 0; k--) { c[i] = k; rec(i + 1, left - k * vals[i], c); } c[i] = 0; }; rec(0, amount, vals.map(() => 0)); return ways; }
/** round to the hundred, "ab 5 aufrunden" (no number of the page ends in 50) */
const roundOwn = (n) => { const r = n % 100; return n - r + (r >= 50 ? 100 : 0); };
/** the words of a write sentence, read from its row (the subject and verb before the line, the landmark after it) */
const writeRowText = ($, e) => $(e).parent().children('.e1-t').map((i, x) => $(x).text().trim()).get().join(' ');
function smallerFromLargerOwn(a, b) { const A = String(a).padStart(3, '0'), Bs = String(b).padStart(3, '0'); let s = ''; for (let i = 0; i < 3; i++) s += Math.abs(+A[i] - +Bs[i]); return Number(s); }
/** what a finished calculation with a named error prints (null: the error cannot happen here) */
function errorOwn(a, b, op, err) {
  const tru = op === 'plus' ? a + b : a - b, ae = a % 10, be = b % 10, az = Math.floor(a / 10) % 10, bz = Math.floor(b / 10) % 10;
  if (op === 'plus') {
    if (err === 'carry-ones') return ae + be >= 10 ? tru - 10 : null;
    if (err === 'carry-tens') return az + bz + (ae + be >= 10 ? 1 : 0) >= 10 ? tru - 100 : null;
    if (err === 'shift') return b < 100 ? a + 10 * b : null;
    return null;
  }
  const borrowOnes = ae < be;
  if (err === 'carry-ones') return borrowOnes ? tru + 10 : null;
  if (err === 'carry-tens') return az - (borrowOnes ? 1 : 0) < bz ? tru + 100 : null;
  if (err === 'smaller-from-larger') return borrowOnes || az - (borrowOnes ? 1 : 0) < bz ? smallerFromLargerOwn(a, b) : null;
  if (err === 'shift') return b < 100 ? a - 10 * b : null;
  return null;
}

/** the shelf of a G1-672 page, read from its drawing */
function shelfOf($) {
  const cells = {};
  const sh = $('[data-e1-art="shelf"]');
  const rows = num(sh.attr('data-e1-rows')), cols = num(sh.attr('data-e1-cols'));
  sh.find('[data-e1-empty]').each((i, e) => { cells[$(e).attr('data-e1-place')] = null; });
  sh.find('image[data-e1-key]').each((i, e) => { if (!$(e).attr('data-e1-rel')) cells[$(e).attr('data-e1-place')] = $(e).attr('data-e1-key'); });
  const box = sh.find('[data-e1-box]'); const [br, bc] = intsOf(box.attr('data-e1-box')); const span = num(box.attr('data-e1-span'));
  for (let k = 0; k < span; k++) cells[br + ',' + (bc + k)] = 'box';
  const behind = sh.find('[data-e1-rel="behind"]').attr('data-e1-key'), front = sh.find('[data-e1-rel="front"]').attr('data-e1-key');
  const at = {}; for (const [p, v] of Object.entries(cells)) if (v && v !== 'box') at[v] = intsOf(p);
  return { cells, rows, cols, at, behind, front, box: [br, bc, span] };
}
/** the empty places a relation names (the gate's own reading of each word on a shelf seen from the front) */
function placesOwn(S, rel, ref, ref2) {
  const [r, c] = S.at[ref] || [-9, -9];
  const empty = (rr, cc) => S.cells[rr + ',' + cc] === null;
  const out = [];
  for (const p of Object.keys(S.cells)) {
    if (S.cells[p] !== null) continue;
    const [rr, cc] = intsOf(p);
    // review round 1: read as widely as a child might (the whole shelf on that side and the diagonal neighbours; the whole
    // column above / below on every shelf and the diagonal neighbours)
    if (rel === 'left' && ((rr === r && cc < c) || (Math.abs(rr - r) === 1 && cc === c - 1))) out.push(p);
    if (rel === 'right' && ((rr === r && cc > c) || (Math.abs(rr - r) === 1 && cc === c + 1))) out.push(p);
    if (rel === 'next' && rr === r && Math.abs(cc - c) === 1) out.push(p);
    if (rel === 'above' && ((cc === c && rr < r) || (rr === r - 1 && Math.abs(cc - c) === 1))) out.push(p);
    if (rel === 'below' && ((cc === c && rr > r) || (rr === r + 1 && Math.abs(cc - c) === 1))) out.push(p);
    if (rel === 'between') { const [r2, c2] = S.at[ref2] || [-9, -9]; if (rr === r && rr === r2 && Math.min(c, c2) < cc && cc < Math.max(c, c2) && Math.abs(c - c2) === 2) out.push(p); }
  }
  void empty;
  return out;
}
/** does a position word fit a write sentence (subj, refs) on this shelf? (the gate's own reading) */
function fitsOwn(S, word, item) {
  const refs = item.ref.split(',');
  if (refs[0] === 'box') return (word === 'framför' && item.subj === S.front) || (word === 'bakom' && item.subj === S.behind);
  const [r, c] = S.at[item.subj] || [-9, -9];
  if (refs.length === 2) { const [r1, c1] = S.at[refs[0]], [r2, c2] = S.at[refs[1]]; return word === 'mellan' && r === r1 && r === r2 && Math.min(c1, c2) < c && c < Math.max(c1, c2); }
  const [r1, c1] = S.at[refs[0]] || [-9, -9];
  if (word === 'till vänster om') return r === r1 && c < c1;
  if (word === 'till höger om') return r === r1 && c > c1;
  if (word === 'bredvid') return r === r1 && Math.abs(c - c1) === 1;
  if (word === 'ovanför') return c === c1 && r < r1;
  if (word === 'nedanför') return c === c1 && r > r1;
  return false;
}
const matchCountOwn = (sets, words) => { let n = 0; const used = new Set(); const walk = (i) => { if (i === sets.length) { n++; return; } for (const w of words) if (sets[i].has(w) && !used.has(w)) { used.add(w); walk(i + 1); used.delete(w); } }; walk(0); return n; };
const textOf = ($, sel) => $(sel).text().replace(/\s+/g, ' ').trim();

/** the checks of one page (its own html), the gate's arithmetic */
function pageFaults(id, lv, html) {
  const f = [], $ = cheerio.load(html);
  const mode = MODE[id];
  const root = $('[data-dk]');
  if (!root.length) return ['no root'];
  if (num(root.attr('data-e1-level')) !== lv) f.push('the level stamp');
  if (mode === 'markt') {
    const goods = $('[data-e1-good]').map((i, e) => ({ k: num($(e).attr('data-e1-good')), price: num($(e).attr('data-e1-price')), id: $(e).attr('data-e1-goodid'), tag: num($(e).find('[data-lcs-prim="price-tag"]').attr('data-lcs-price')), tagText: $(e).find('[data-lcs-prim="price-tag"] text').text().replace(/ /g, ' '), src: $(e).find('img').attr('src') })).get();
    if (goods.length !== 6) f.push(`${goods.length} goods on the stall`);
    const prices = goods.map((g) => g.price);
    if (new Set(prices).size !== prices.length) f.push('two goods with one price');
    goods.forEach((g) => { if (g.tag !== g.price || g.tagText !== g.price + ' €') f.push(`${g.id}: the tag reads "${g.tagText}"`); const own = EUR_OWN[g.id]; if (!own || g.price < own[0] || g.price > own[1]) f.push(`${g.id}: ${g.price} € is not a price for it`); });
    if (lv === 1 && prices.some((p) => p > 8)) f.push('a level-1 price over 8 €');
    if (lv === 2 && (prices.filter((p) => p >= 10).length !== 3 || prices.filter((p) => p <= 8).length !== 3)) f.push('level 2: not three prices of 10-12 € and three of 1-8 €');
    if (lv === 3 && prices.some((p) => p < 3 || p > 9)) f.push('level 3: a price outside 3-9 €');
    const cards = $('[data-e1-card]').map((i, e) => e).get();
    const nCards = lv === 1 ? 4 : 6, nChange = lv === 1 ? 2 : 3, note = lv === 1 ? 10 : 20;
    if (cards.length !== nCards) f.push(`${cards.length} cards`);
    const totals = new Set();
    cards.forEach((e, k) => {
      const c = $(e), kind = c.attr('data-e1-kind'), [i, j] = intsOf(c.attr('data-e1-items'));
      if (kind !== (k >= nCards - nChange ? 'change' : 'exact')) f.push(`card ${k + 1}: a ${kind} card in the wrong place`);
      const refs = c.find('[data-e1-ref]').map((x, im) => num($(im).attr('data-e1-ref'))).get();
      if (refs.join() !== [i, j].join() || i === j) f.push(`card ${k + 1}: its pictures`);
      c.find('[data-e1-ref]').each((x, im) => { const g = goods.find((y) => y.k === num($(im).attr('data-e1-ref'))); if (!g || g.src !== $(im).attr('src')) f.push(`card ${k + 1}: a picture not on the stall`); });
      const a = prices[i], b = prices[j], total = a + b;
      if (totals.has(total)) f.push(`card ${k + 1}: a total asked twice`); totals.add(total);
      if (num(c.find('[data-e1-total]').attr('data-e1-answer')) !== total) f.push(`card ${k + 1}: the total stamp is not ${total}`);
      const pbx = c.find('[data-e1-pricebox]').map((x, e2) => num($(e2).attr('data-e1-answer'))).get();
      if (pbx.join() !== [a, b].join()) f.push(`card ${k + 1}: the price boxes are ${pbx}, the prices ${a} and ${b}`);
      if (lv === 1 && !(total >= 3 && total <= 10)) f.push(`card ${k + 1}: level 1 total ${total}`);
      if (lv === 2 && !(total >= 11 && total <= 19 && (a % 10) + (b % 10) < 10)) f.push(`card ${k + 1}: level 2 ${a} + ${b} (11-19 without crossing the ten)`);
      if (lv === 3 && !(a <= 9 && b <= 9 && total >= 11 && total <= 18)) f.push(`card ${k + 1}: level 3 ${a} + ${b} (over the ten)`);
      if (kind === 'exact') {
        const pieces = c.find('[data-e1-piece]').map((x, p) => ({ v: num($(p).attr('data-e1-piece')), right: $(p).attr('data-e1-right') === '1', drawn: num($(p).find('[data-e1-value]').attr('data-e1-value')), money: $(p).find('[data-e1-money]').attr('data-e1-money') })).get();
        const vals = pieces.map((p) => p.v);
        if (pieces.some((p) => p.v !== p.drawn)) f.push(`card ${k + 1}: a piece is not the money it says`);
        if (pieces.some((p) => ![1, 2, 5, 10].includes(p.v) || (p.money === 'note') !== (p.v >= 5))) f.push(`card ${k + 1}: a piece that is not a 1-€ or 2-€ coin or a 5-€ or 10-€ note`);
        if (vals.filter((v) => v >= 5).length > 2) f.push(`card ${k + 1}: more than two notes`);
        if (vals.length > 5) f.push(`card ${k + 1}: ${vals.length} pieces in the purse (no more than five, one row)`);
        const w = waysOwn(vals, total);
        if (w !== 1) f.push(`card ${k + 1}: ${w} ways to circle ${total} €`);
        const right = pieces.filter((p) => p.right);
        if (sum(right.map((p) => p.v)) !== total) f.push(`card ${k + 1}: the stamped money is not ${total} €`);
        if (right.length < 2 || right.length === pieces.length) f.push(`card ${k + 1}: the money to circle is ${right.length} of ${pieces.length} pieces`);
        if (sum(vals) <= total) f.push(`card ${k + 1}: the purse holds no more than the total`);
      } else {
        const paid = num(c.find('[data-e1-paid]').attr('data-e1-paid'));
        if (paid !== note || num(c.find('[data-e1-paid] [data-e1-money="note"]').attr('data-e1-value')) !== note) f.push(`card ${k + 1}: paid with ${paid} €, the level pays with ${note} €`);
        if (num(c.find('[data-e1-change]').attr('data-e1-answer')) !== note - total || note - total < 1) f.push(`card ${k + 1}: the change is not ${note} − ${total}`);
      }
    });
  }
  if (mode === 'vaxel' || mode === 'markt') $('svg[data-e1-money="note"]').each((i, e) => { const v = $(e).attr('data-e1-value'), mid = $(e).find('[data-e1-mid]').text().replace(/\s/g, ' ').trim(); if (mid !== v + ' kr' && mid !== v + ' €') f.push(`a ${v} note without its value in the middle ("${mid}")`); });
  if (mode === 'vaxel') {
    const ref = $('[data-e1-moneyref]');
    if (lv === 1 ? ref.length : ref.text().trim() !== 'Mynt: 1 kr, 2 kr, 5 kr, 10 kr   Sedlar: 20 kr, 50 kr, 100 kr') f.push(`the coins and notes line at level ${lv}`);
    const cards = $('[data-e1-card]').map((i, e) => e).get();
    if (cards.length !== 4) f.push(`${cards.length} cards`);
    const goods = new Set(), changes = new Set();
    cards.forEach((e, k) => {
      const c = $(e), price = num(c.attr('data-e1-price')), note = num(c.attr('data-e1-note')), ch = note - price;
      const pic = c.find('[data-e1-pic]').attr('data-e1-pic'), g = B.SV_GOODS.find((x) => x.pic.join('/') === pic);
      const gid = g && g.id, own = SEK_OWN[gid];
      if (!own || price < own[0] || price > own[1]) f.push(`card ${k + 1}: ${price} kr is not a price for ${pic}`);
      if (goods.has(gid)) f.push(`card ${k + 1}: a thing sold twice`); goods.add(gid);
      if (changes.has(ch)) f.push(`card ${k + 1}: a change asked twice`); changes.add(ch);
      const tag = c.find('[data-lcs-prim="price-tag"]');
      if (num(tag.attr('data-lcs-price')) !== price || tag.find('text').text().replace(/ /g, ' ') !== price + ' kr') f.push(`card ${k + 1}: the tag`);
      if (num(c.find('[data-e1-paid] [data-e1-money="note"]').attr('data-e1-value')) !== note) f.push(`card ${k + 1}: the note drawn`);
      if (num(c.find('[data-e1-change]').attr('data-e1-answer')) !== ch) f.push(`card ${k + 1}: the change stamp is not ${ch}`);
      if (price < 12 || price > 95) f.push(`card ${k + 1}: ${price} kr outside 12-95`);
      if (lv === 1 && !([20, 50].includes(note) && ch >= 1 && ch <= 9)) f.push(`card ${k + 1}: level 1 ${note} − ${price}`);
      if (lv === 2 && !([50, 100].includes(note) && ch >= 11 && ch <= 48 && price % 10 !== 0)) f.push(`card ${k + 1}: level 2 ${note} − ${price}`);
      if (lv === 3 && !([50, 100].includes(note) && ch >= 5 && price % 5 !== 0)) f.push(`card ${k + 1}: level 3 ${note} − ${price}`);
      const ends = c.find('[data-e1-endlabel]').map((i2, x) => $(x).attr('data-e1-endlabel')).get();
      if (lv === 1 ? ends.join() !== price + ',' + note : ends.length) f.push(`card ${k + 1}: the line's end labels`);
      if (lv === 3) {
        const vals = [100, 50, 20, 10, 5, 2, 1].filter((v) => v < note), ways = fewestOwn(ch, vals);
        if (ways.length !== 1) f.push(`card ${k + 1}: ${ways.length} fewest ways to give ${ch} kr`);
        const want = vals.map((v, i) => (ways[0][i] ? ways[0][i] + 'x' + v : '')).filter(Boolean).join(' ');
        if (c.find('[data-e1-draw]').attr('data-e1-fewest') !== want) f.push(`card ${k + 1}: the fewest stamp is not "${want}"`);
      }
    });
  }
  if (mode === 'kilo') {
    const meas = $('[data-e1-meas]').map((i, e) => e).get();
    const want = lv === 1 ? ['balance', 'balance'] : ['balance', 'scale', 'scale'];
    if (meas.map((e) => $(e).attr('data-e1-kind')).join() !== want.join()) f.push('the measures: ' + meas.map((e) => $(e).attr('data-e1-kind')));
    const ns = new Set(), things = new Set();
    meas.forEach((e, k) => {
      const m = $(e), n = num(m.attr('data-e1-n')), th = m.attr('data-e1-thing'), kind = m.attr('data-e1-kind');
      const own = KG_OWN[th];
      if (!own || n < own[0] || n > own[1]) f.push(`measure ${k + 1}: ${th} at ${n} kg`);
      if (lv === 1 && n > 5) f.push(`measure ${k + 1}: ${n} kg at level 1`);
      if (ns.has(n) || things.has(th)) f.push(`measure ${k + 1}: a mass or a thing twice`); ns.add(n); things.add(th);
      if (num(m.find('[data-e1-kg]').attr('data-e1-answer')) !== n) f.push(`measure ${k + 1}: the box is not ${n}`);
      if (kind === 'balance') { if (m.find('[data-e1-weight]').length !== n) f.push(`measure ${k + 1}: ${m.find('[data-e1-weight]').length} weights for ${n} kg`); if (m.find('[data-e1-art="balance"]').attr('data-e1-tilt') !== '0') f.push(`measure ${k + 1}: the balance is not level`); }
      else {
        if (!BOWL_OWN.has(th)) f.push(`measure ${k + 1}: ${th} in a kitchen scale`);
        const sc = m.find('[data-e1-art="kitchen-scale"]');
        if (num(sc.attr('data-e1-n')) !== n || num(sc.find('[data-e1-needle]').attr('data-e1-needle')) !== n) f.push(`measure ${k + 1}: the pointer`);
        if (num(sc.attr('data-e1-every')) !== (lv === 3 ? 2 : 1)) f.push(`measure ${k + 1}: the dial's numerals every ${sc.attr('data-e1-every')}`);
      }
    });
    if (lv > 1 && ![...ns].some((n) => n >= 6)) f.push('no measure of 6 kg or more');
    if ([...things].some((th) => KITTEN.test(th))) f.push('a cat on a measure card (a kitten picture)');
    if (things.has('bicycle')) f.push('a bicycle on a measure card (the picture is a full-size bike, about 15 kg)');
    if (lv === 3 && !meas.some((e) => $(e).attr('data-e1-kind') === 'scale' && num($(e).attr('data-e1-n')) % 2 === 1)) f.push('level 3: no scale between two numerals');
    const cmp = $('[data-e1-cmp]').map((i, e) => e).get();
    if (cmp.length !== (lv === 3 ? 4 : 6)) f.push(`${cmp.length} things to compare`);
    cmp.forEach((e, k) => {
      const c = $(e), th = c.attr('data-e1-thing');
      const truth = th in LIGHT_OWN && !(lv === 3 && th === 'pineapple') ? 'less' : (lv === 3 ? th in PAN_HEAVY_OWN : th in HEAVY_OWN) ? 'more' : th === 'pineapple' && lv === 3 ? 'about' : '?';
      if (KITTEN.test(th)) f.push(`compare ${k + 1}: a cat (a kitten picture)`);
      if (c.attr('data-e1-truth') !== truth) f.push(`compare ${k + 1}: ${th} stamped ${c.attr('data-e1-truth')}, the gate says ${truth}`);
      const words = { more: 'mer än 1 kg', less: 'mindre än 1 kg', about: 'ungefär 1 kg' };
      const opts = c.find('[data-e1-pick]').map((i2, x) => $(x).attr('data-e1-pick')).get();
      if (opts.join('|') !== (lv === 3 ? 'mer än 1 kg|mindre än 1 kg|ungefär 1 kg' : 'mer än 1 kg|mindre än 1 kg')) f.push(`compare ${k + 1}: the choices ${opts}`);
      const right = c.find('[data-dk-answer="right"]').map((i2, x) => $(x).attr('data-e1-pick')).get();
      if (right.join() !== words[truth]) f.push(`compare ${k + 1}: the right choice is not "${words[truth]}"`);
      if (lv === 3) { const t = c.find('[data-e1-art="balance"]').attr('data-e1-tilt'); if (t !== { more: '1', less: '-1', about: '0' }[truth]) f.push(`compare ${k + 1}: the balance tips ${t} for ${truth}`); if (ALIVE_OWN.has(th)) f.push(`compare ${k + 1}: a live animal on a balance`); }
    });
  }
  if (mode === 'tid') {
    const pairs = $('[data-e1-pair]').map((i, e) => e).get();
    if (pairs.length !== 3) f.push(`${pairs.length} clock pairs`);
    const durs = [];
    pairs.forEach((e, k) => {
      const p = $(e), cl = p.find('svg[data-e1-clock]').map((i2, x) => [[num($(x).attr('data-lcs-h')), num($(x).attr('data-lcs-m'))]]).get();
      if (cl.length !== 2) { f.push(`pair ${k + 1}: ${cl.length} clocks`); return; }
      const [[h1, m1], [h2, m2]] = cl;
      if (![0, 30].includes(m1) || ![0, 30].includes(m2)) f.push(`pair ${k + 1}: a time not on a whole or half hour`);
      const t1 = (h1 % 12) * 60 + m1; let t2 = (h2 % 12) * 60 + m2; const cross = t2 <= t1; if (cross) t2 += 720;
      const d = t2 - t1; durs.push(d);
      if (num(p.attr('data-e1-dur')) !== d) f.push(`pair ${k + 1}: the stamp says ${p.attr('data-e1-dur')} minutes, the clocks ${d}`);
      if (num(p.find('[data-e1-hours]').attr('data-e1-answer')) !== Math.floor(d / 60) || num(p.find('[data-e1-minutes]').attr('data-e1-answer')) !== d % 60) f.push(`pair ${k + 1}: the answer boxes`);
      if (lv === 1 && m1 !== 0) f.push(`pair ${k + 1}: level 1 starts on a half hour`);
      if (lv === 1 && d > 180) f.push(`pair ${k + 1}: level 1 over 3 hours`);
      if (lv < 3 && cross) f.push(`pair ${k + 1}: level ${lv} passes 12 o'clock`);
      if (lv === 3 && !cross) f.push(`pair ${k + 1}: level 3 does not pass 12 o'clock`);
      const words = p.find('[data-e1-clockword]').map((i2, x) => $(x).text().trim()).get();
      if (lv === 1 && words.join('|') !== clockOwn(h1, m1) + '|' + clockOwn(h2, m2)) f.push(`pair ${k + 1}: the clock words "${words}" (the gate: ${clockOwn(h1, m1)} | ${clockOwn(h2, m2)})`);
      if (lv !== 1 && words.length) f.push(`pair ${k + 1}: clock words printed at level ${lv}`);
      const wr = p.find('[data-e1-writeclock]').map((i2, x) => $(x).attr('data-e1-answer')).get();
      const after = (h, m) => clockOwn(h, m).replace(/^klockan /, '');   // "Klockan:" is printed: the child writes "fem" or "halv elva"
      if (lv === 3 ? wr.join('|') !== after(h1, m1) + '|' + after(h2, m2) : wr.length) f.push(`pair ${k + 1}: the clock words to write ${wr}`);
      const hh = p.find('[data-e1-halfhour]').text().trim();
      if (lv === 1 ? hh !== 'En halvtimme = 30 minuter.' : hh) f.push(`pair ${k + 1}: the half-hour line at level ${lv}`);
    });
    if (new Set(durs).size !== durs.length) f.push('a duration asked twice');
    if (durs.filter((d) => d % 60 === 30).length !== 2) f.push(`not two half-hour durations (${durs})`);
    const acts = $('[data-e1-units] [data-g1-one]').map((i, e) => e).get();
    if (acts.length !== 6) f.push(`${acts.length} activities`);
    const per = {};
    acts.forEach((e) => {
      const g = $(e), id = g.attr('data-dk-item'), u = UNIT_OWN[id];
      per[u] = (per[u] || 0) + 1;
      const opts = g.find('[data-e1-pick]').map((i2, x) => $(x).attr('data-e1-pick')).get();
      if (opts.join() !== 'sekunder,minuter,timmar') f.push(`${id}: the choices ${opts}`);
      const right = g.find('[data-dk-answer="right"]').attr('data-e1-pick');
      if (right !== u) f.push(`${id}: the right unit is ${u}, the page says ${right}`);
      const txt = $(`[data-e1-act="${id}"]`).text().trim(), a = B.UNIT_ACTIVITIES.find((x) => x.id === id);
      if (!a || txt !== a.sv || UNIT_WORD.test(txt)) f.push(`${id}: the activity text "${txt}"`);
    });
    if (['sekunder', 'minuter', 'timmar'].some((u) => per[u] !== 2)) f.push('not two activities of each unit: ' + JSON.stringify(per));
  }
  if (mode === 'halb') {
    const tasks = $('[data-e1-task]').map((i, e) => e).get();
    if (tasks.length !== 4) f.push(`${tasks.length} tasks`);
    const sums = new Set();
    tasks.forEach((e, k) => {
      const q = $(e), a = num(q.attr('data-e1-a')), b = num(q.attr('data-e1-b')), s = a + b;
      const [h, z, ee] = [Math.floor(b / 100), Math.floor(b / 10) % 10, b % 10];
      if (a < 100 || a > 999 || b < 100 || b > 999 || !h || !z || !ee) f.push(`task ${k + 1}: ${a} + ${b} is not three-digit plus three-digit with three steps`);
      if (s > 1000) f.push(`task ${k + 1}: the sum ${s} is over 1000`);
      if (a <= b) f.push(`task ${k + 1}: the smaller number first (${a} + ${b})`);
      // review round 2: the ones step passing a ten AND a hundred at once (798 + 7 = 805) is level 3 only
      const s2 = a + 100 * h + 10 * z;
      if (lv === 2 && (s2 % 100) + ee >= 100) f.push(`task ${k + 1}: ${s2} + ${ee} passes a hundred in the ones step (level 3 only)`);
      if (sums.has(s)) f.push(`task ${k + 1}: a sum twice`); sums.add(s);
      const steps = [[a, 100 * h, a + 100 * h], [a + 100 * h, 10 * z, a + 100 * h + 10 * z], [a + 100 * h + 10 * z, ee, s]];
      steps.forEach((st, i) => st.forEach((v, j) => { if (num(q.find(`[data-e1-step="${i + 1}${'abc'[j]}"]`).attr('data-e1-answer')) !== v) f.push(`task ${k + 1}: step ${i + 1} is not ${st[0]} + ${st[1]} = ${st[2]}`); }));
      if (num(q.find('[data-e1-sum]').attr('data-e1-answer')) !== s) f.push(`task ${k + 1}: the sum stamp`);
      const crossOwn = ((Math.floor(a / 10) % 10) + z >= 10 ? 1 : 0) + ((a % 10) + ee >= 10 ? 1 : 0);
      if (s === 1000 ? lv !== 3 : crossOwn !== lv - 1) f.push(`task ${k + 1}: ${a} + ${b} crosses ${crossOwn} times at level ${lv}`);
      const txt = q.find('.e1-t, .e1-big').text().replace(`${a} + ${b} =`, ' ');
      for (const v of [steps[0][2], steps[1][2], s]) if (new RegExp('(^|\\D)' + v + '(\\D|$)').test(txt)) f.push(`task ${k + 1}: ${v} printed`);
      if (!q.find('[data-e1-strich]').length) f.push(`task ${k + 1}: no Rechenstrich`);
    });
    if ($('[data-e1-explain] [data-dk-writerow]').length !== 4) f.push('not three explanation lines and a checker line');
    if (/(Hunderter dazu|Zehner dazu|Einer dazu)/.test(textOf($, '[data-e1-task]')) !== (lv === 1)) f.push('the step labels (Hunderter dazu, Zehner dazu, Einer dazu) are on level 1 only');
  }
  if (mode === 'ueber') {
    const items = $('[data-e1-item]').map((i, e) => e).get();
    const comp = { 1: { ok: 2, small: 0, big: 2, probe: { ok: 1, small: 0, big: 1 } }, 2: { ok: 3, small: 1, big: 2, probe: { ok: 1, small: 1, big: 1 } }, 3: { ok: 2, small: 2, big: 2, probe: { ok: 1, small: 2, big: 1 } } }[lv];
    if (items.length !== comp.ok + comp.small + comp.big) f.push(`${items.length} calculations`);
    const kinds = { ok: 0, small: 0, big: 0 }, probes = { ok: 0, small: 0, big: 0 }, ops = new Set(), printeds = new Set();
    items.forEach((e, k) => {
      const it = $(e), L = it.attr('data-e1-item'), calc = it.find('[data-e1-art="column"]');
      const a = num(calc.attr('data-e1-top')), b = num(calc.attr('data-e1-bottom')), op = calc.attr('data-e1-op'), printed = num(calc.attr('data-e1-printed')), shift = num(calc.attr('data-e1-shift'));
      ops.add(op);
      const tru = op === 'plus' ? a + b : a - b, E = op === 'plus' ? roundOwn(a) + roundOwn(b) : roundOwn(a) - roundOwn(b), dist = Math.abs(printed - E);
      if ([a, b].some((n) => n % 100 === 50 || n > 999) || printed > 999 || printed < 0) f.push(`${L}: a number ends in 50 or leaves 0-999`);
      if (dist > 70 && dist < 151) f.push(`${L}: the result is ${dist} from the Überschlag, too near the rule's 100`);
      if (E < 100) f.push(`${L}: an Überschlag of ${E}`);
      if (b < 100 && roundOwn(b) !== 100) f.push(`${L}: a two-digit number that rounds to 0`);
      if (shift) f.push(`${L}: a column drawn misaligned (the layout would tell the box)`);
      const lead = it.find('[data-e1-ticks]').parent().children('.e1-t').first().text().trim();
      if (lead !== 'Nach dem Überschlag:') f.push(`${L}: the chips are not led by "Nach dem Überschlag:" (${lead})`);
      const can = dist <= 100;
      const own = printed === tru ? 'ok' : can ? 'small' : 'big';
      if (it.attr('data-e1-kind') !== own) f.push(`${L}: stamped ${it.attr('data-e1-kind')}, the gate reads ${own}`);
      kinds[own]++;
      const err = it.attr('data-e1-err');
      if (own === 'ok' ? err !== 'none' : errorOwn(a, b, op, err) !== printed) f.push(`${L}: the error ${err} does not print ${printed} for ${a} ${op} ${b}`);
      if (err === 'shift') f.push(`${L}: the shifted-place error (its misaligned column tells the box)`);
      const right = it.find('[data-e1-ticks] [data-dk-answer="right"]').attr('data-e1-pick');
      if (right !== (can ? 'kann stimmen' : 'kann nicht stimmen')) f.push(`${L}: by the rule the box is ${can ? 'kann stimmen' : 'kann nicht stimmen'}`);
      if (num(it.find('[data-e1-ra]').attr('data-e1-answer')) !== roundOwn(a) || num(it.find('[data-e1-rb]').attr('data-e1-answer')) !== roundOwn(b) || num(it.find('[data-e1-est]').attr('data-e1-answer')) !== E) f.push(`${L}: the Überschlag stamps`);
      if (num(it.find('[data-e1-fix]').attr('data-e1-answer')) !== tru) f.push(`${L}: the right result is not ${tru}`);
      const digits = [0, 1, 2].map((r) => calc.find(`[data-e1-digit="${r}"]`).map((i2, x) => $(x).text()).get().join(''));
      if (num(digits[0]) !== a || num(digits[1]) !== b || num(digits[2]) !== printed) f.push(`${L}: the column shows ${digits}`);
      const pr = it.attr('data-e1-probe') === '1', card = $(`[data-e1-probefor="${L}"]`);
      if (pr !== !!card.length) f.push(`${L}: the Probe card`);
      if (pr) { probes[own]++; if (card.attr('data-e1-probeok') !== (printed === tru ? '1' : '0')) f.push(`${L}: the Probe's outcome stamp`); }
      if (own === 'small' && !pr) f.push(`${L}: an error the Überschlag cannot see has no Probe`);
      if (printeds.has(printed)) f.push(`${L}: a result printed twice`); printeds.add(printed);
    });
    for (const k of ['ok', 'small', 'big']) { if (kinds[k] !== comp[k]) f.push(`${kinds[k]} ${k} calculations (the level: ${comp[k]})`); if (probes[k] !== comp.probe[k]) f.push(`${probes[k]} Probes on ${k} calculations (the level: ${comp.probe[k]})`); }
    if (lv === 1 ? [...ops].join() !== 'plus' : ops.size !== 2) f.push('the operations: ' + [...ops]);
    if (!/mehr als 100/.test(textOf($, '[data-e1-rule]'))) f.push('the rule is not printed');
  }
  if (mode === 'und') {
    if ($('[data-dk-answer], [data-e1-answer]').length) f.push('a record page carries an answer');
    const fields = $('[data-e1-field]').map((i, e) => $(e).attr('data-e1-field')).get();
    if (fields.join() !== 'question,table,chart,conclusions') f.push('the fields: ' + fields);
    const alts = $('[data-e1-row]').length;
    if (alts !== lv + 2) f.push(`${alts} answer choices in the table (level ${lv}: ${lv + 2})`);
    if (num($('[data-e1-art="survey-chart"]').attr('data-e1-bars')) !== lv + 2 || num($('[data-e1-art="survey-chart"]').attr('data-e1-steps')) !== 12) f.push('the chart (12 steps: to 24)');
    if ($('[data-e1-moresteps]').text().trim() !== 'Rita fler steg om det behövs.') f.push('no "Rita fler steg om det behövs." under the chart');
    if ($('[data-e1-field="conclusions"] [data-dk-writerow]').length !== 3) f.push('not three conclusion lines');
    if (!/Ett steg på axeln är 2/.test(textOf($, '[data-e1-field="chart"]'))) f.push('the scale step is not printed');
  }
  if (mode === 'lage') {
    const S = shelfOf($);
    const keys = Object.values(S.cells).filter((v) => v && v !== 'box');
    if (new Set(keys).size !== keys.length || keys.includes(S.front) || keys.includes(S.behind) || !S.front || !S.behind || S.front === S.behind) f.push('a thing twice on the shelf');
    if (Object.keys(S.cells).length !== S.rows * S.cols) f.push(`${Object.keys(S.cells).length} places read on the shelf`);
    const draws = $('[data-e1-draw]').map((i, e) => e).get();
    if (draws.length !== (lv === 1 ? 3 : 4)) f.push(`${draws.length} draw sentences`);
    const rels = draws.map((e) => $(e).attr('data-e1-rel')).map((r) => (lv > 1 && (r === 'left' || r === 'right') ? 'side' : r)).sort().join();
    if (rels !== { 1: 'left,next,right', 2: 'above,between,next,side', 3: 'above,below,next,side' }[lv]) f.push(`the draw relations at level ${lv}: ${rels}`);
    const targets = new Set();
    draws.forEach((e, k) => {
      const d = $(e), rel = d.attr('data-e1-rel'), refs = d.attr('data-e1-ref').split(','), tgt = d.attr('data-e1-draw');
      const places = placesOwn(S, rel, refs[0], refs[1]);
      if (places.length !== 1 || places[0] !== tgt) f.push(`draw ${k + 1} (${rel} ${refs}): the places that fit are ${places.join(' ') || 'none'}, the stamp ${tgt}`);
      const [tr, tc] = intsOf(tgt), [fr0, fc0] = S.at[refs[0]] || [-9, -9];
      const beside = { left: tr === fr0 && tc === fc0 - 1, right: tr === fr0 && tc === fc0 + 1, above: tc === fc0 && tr === fr0 - 1, below: tc === fc0 && tr === fr0 + 1, next: tr === fr0 && Math.abs(tc - fc0) === 1, between: true }[rel];
      if (!beside) f.push(`draw ${k + 1} (${rel} ${refs[0]}): the place is not right beside the thing named (a thing between)`);
      if (targets.has(tgt)) f.push(`draw ${k + 1}: a place drawn twice`); targets.add(tgt);
      if (refs.some((r) => !S.at[r])) f.push(`draw ${k + 1}: a reference not on the shelf`);
      const want = `Rita ${DRAW_OWN[d.attr('data-e1-thing')]} ${REL_OWN[rel]} ${DEF_OWN[refs[0]]}${refs[1] ? ' och ' + DEF_OWN[refs[1]] : ''}.`;
      if (d.text().trim() !== want) f.push(`draw ${k + 1}: "${d.text().trim()}" (the gate: "${want}")`);
    });
    const empties = Object.values(S.cells).filter((v) => v === null).length;
    if (empties - draws.length < 2) f.push('fewer than two empty places left after the drawings');
    const words = $('[data-e1-word]').map((i, e) => $(e).attr('data-e1-word')).get();
    const writes = $('[data-e1-write]').map((i, e) => ({ rel: $(e).attr('data-e1-write'), subj: $(e).attr('data-e1-subj'), ref: $(e).attr('data-e1-ref'), answer: $(e).attr('data-e1-answer'), row: writeRowText($, e) })).get();
    if (writes.length !== 3) f.push(`${writes.length} write sentences`);
    if (words.length !== 3 + (lv - 1)) f.push(`${words.length} words in the box (level ${lv}: ${3 + lv - 1})`);
    if (new Set(words).size !== words.length) f.push('a word twice in the box');
    const sets = writes.map((w, k) => {
      if (w.answer !== REL_OWN[w.rel]) f.push(`write ${k + 1}: the answer ${w.answer} for ${w.rel}`);
      const fit = new Set(words.filter((x) => fitsOwn(S, x, w)));
      if (fit.size !== 1 || !fit.has(w.answer)) f.push(`write ${k + 1} (${w.subj} ${w.rel} ${w.ref}): the words that fit are ${[...fit].join(', ') || 'none'}`);
      const refs = w.ref.split(',');
      const want = `${DEF_OWN[w.subj].charAt(0).toUpperCase() + DEF_OWN[w.subj].slice(1)} ${VERB_OWN[w.subj]} ${refs.map((r) => (r === 'box' ? 'lådan' : DEF_OWN[r])).join(' och ')}.`;
      if (w.row !== want) f.push(`write ${k + 1}: "${w.row}" (the gate: "${want}")`);
      if (w.rel === 'left' || w.rel === 'right') { if (fitsOwn(S, 'bredvid', w)) f.push(`write ${k + 1}: "bredvid" fits where the answer is ${w.answer}`); }
      return fit;
    });
    if (matchCountOwn(sets, words) !== 1) f.push(`${matchCountOwn(sets, words)} ways to fill the word box`);
    for (const x of words) if (!writes.some((w) => w.answer === x) && writes.some((w) => fitsOwn(S, x, w))) f.push(`the extra word "${x}" fits a sentence`);
  }
  return f;
}

/** the pooled data of a set of pages for the tell measures */
function collect(id, lv, html, acc) {
  const $ = cheerio.load(html), mode = MODE[id];
  if (mode === 'markt') {
    $('[data-e1-card][data-e1-kind="exact"]').each((i, e) => { const ps = $(e).find('[data-e1-piece]').map((j, p) => ({ v: num($(p).attr('data-e1-piece')), right: $(p).attr('data-e1-right') === '1' })).get(); (acc.purses = acc.purses || []).push(ps); });
    $('[data-e1-card]').each((i, e) => { const c = $(e); const ans = num(c.find('[data-e1-change]').attr('data-e1-answer') || c.find('[data-e1-total]').attr('data-e1-answer')); (acc.answers = acc.answers || []).push([i, ans]); });
  }
  if (mode === 'kilo') $('[data-e1-cmp]').each((i, e) => { (acc.pos = acc.pos || []).push([i, $(e).attr('data-e1-truth')]); });
  if (mode === 'tid') { $('[data-e1-units] [data-g1-one]').each((i, e) => { const id2 = $(e).attr('data-dk-item'), a = B.UNIT_ACTIVITIES.find((x) => x.id === id2); (acc.items = acc.items || []).push({ words: a ? a.sv.toLowerCase().split(/\s+/) : [], ans: UNIT_OWN[id2] }); (acc.pos = acc.pos || []).push([i, UNIT_OWN[id2]]); }); $('[data-e1-pair]').each((i, e) => { (acc.mins = acc.mins || []).push(num($(e).attr('data-e1-dur')) % 60); }); }
  if (mode === 'ueber') $('[data-e1-item]').each((i, e) => { const it = $(e); const can = it.find('[data-e1-ticks] [data-dk-answer="right"]').attr('data-e1-pick') === 'kann stimmen'; const cl = it.find('[data-e1-art="column"]'); (acc.items = acc.items || []).push({ pos: i, can, probe: it.attr('data-e1-probe') === '1', wrong: it.attr('data-e1-kind') !== 'ok', op: cl.attr('data-e1-op'), two: num(cl.attr('data-e1-bottom')) < 100, end0: num(cl.attr('data-e1-printed')) % 10 === 0, shift: num(cl.attr('data-e1-shift')) === 1 }); });
  if (mode === 'halb') $('[data-e1-task]').each((i, e) => { const a = num($(e).attr('data-e1-a')), b = num($(e).attr('data-e1-b')); (acc.thousand = acc.thousand || []).push(a + b === 1000); (acc.onesHundred = acc.onesHundred || []).push(((a + 100 * Math.floor(b / 100) + 10 * (Math.floor(b / 10) % 10)) % 100) + (b % 10) >= 100); });
  if (mode === 'lage') {
    $('[data-e1-write]').each((i, e) => { const w = $(e); const row = writeRowText($, e).toLowerCase(); (acc.items = acc.items || []).push({ words: row.replace(/[.]/g, '').split(' '), ans: w.attr('data-e1-answer') }); (acc.pos = acc.pos || []).push([i, w.attr('data-e1-answer')]); });
    $('[data-e1-draw]').each((i, e) => { (acc.targets = acc.targets || []).push($(e).attr('data-e1-draw')); (acc.drawPos = acc.drawPos || []).push([i, $(e).attr('data-e1-rel')]); });
    const box = $('[data-e1-box]').attr('data-e1-box'); (acc.box = acc.box || []).push(box);
    const words = $('[data-e1-word]').map((i, x) => $(x).attr('data-e1-word')).get(), answers = $('[data-e1-write]').map((i, x) => $(x).attr('data-e1-answer')).get();
    (acc.boxOrder = acc.boxOrder || []).push(words.filter((w) => answers.includes(w)).join('|') === answers.join('|'));
  }
}
/** the best single-cue guesser: for each cue, guess the answer most common with / without it (accuracy over the items) */
function guessFaults(what, items, limit = 0.75, slots = false) {
  const f = [];
  if (!items || items.length < 20) return [`${what}: the guess measure found ${items ? items.length : 0} items (nothing to judge)`];
  const cues = new Set();
  items.forEach((it) => { new Set(it.words).forEach((w) => cues.add('w:' + w)); cues.add('first:' + it.words[0]); cues.add('last:' + it.words[it.words.length - 1]); for (let L = 1; L <= 8; L++) cues.add('len>=' + L); });
  const has = (it, c) => (c.startsWith('w:') ? it.words.includes(c.slice(2)) : c.startsWith('first:') ? it.words[0] === c.slice(6) : c.startsWith('last:') ? it.words[it.words.length - 1] === c.slice(5) : it.words.length >= Number(c.slice(5)));
  let worst = ['', 0];
  // slots: a word PLACE as one cue with many values (the subject, the verb, the landmark): guess the answer most common
  // with each value (the shelf sentences, whose subject and landmark come from a shared pool of things)
  if (slots) for (const [name, at] of [['first word', (w) => w[0]], ['second word', (w) => w[1]], ['last word', (w) => w[w.length - 1]], ['length', (w) => w.length]]) {
    const by = {}; items.forEach((it) => { const v = at(it.words); (by[v] = by[v] || {}); by[v][it.ans] = (by[v][it.ans] || 0) + 1; });
    const acc = sum(Object.values(by).map((m) => Math.max(...Object.values(m)))) / items.length;
    if (acc > worst[1]) worst = ['slot:' + name, acc];
  }
  for (const c of cues) {
    let right = 0;
    for (const side of [true, false]) { const grp = items.filter((it) => has(it, c) === side); if (!grp.length) continue; const cnt = {}; grp.forEach((it) => { cnt[it.ans] = (cnt[it.ans] || 0) + 1; }); right += Math.max(...Object.values(cnt)); }
    const acc = right / items.length;
    if (acc > worst[1]) worst = [c, acc];
  }
  if (worst[1] > limit + 1e-9) f.push(`${what}: the cue "${worst[0]}" guesses ${(100 * worst[1]).toFixed(1)}% right`);
  return { f, worst };
}
/** where an answer sits, pooled: each place holds each answer within a band of chance */
function bandFaults(what, pos, minTol = 0.08) {
  const f = [];
  if (!pos || pos.length < 20) return [`${what}: the position measure found nothing to judge`];
  const answers = [...new Set(pos.map((p) => p[1]))], places = [...new Set(pos.map((p) => p[0]))];
  const share = (a) => pos.filter((p) => p[1] === a).length / pos.length;
  for (const pl of places) { const at = pos.filter((p) => p[0] === pl); for (const a of answers) { const s = at.filter((p) => p[1] === a).length / at.length, e = share(a), tol = Math.max(minTol, 3 * Math.sqrt(e * (1 - e) / at.length)); if (Math.abs(s - e) > tol) f.push(`${what}: place ${pl + 1} holds "${a}" ${(100 * s).toFixed(1)}% of the time (all places: ${(100 * e).toFixed(1)}%)`); } }
  return f;
}
/** balanced accuracy of a yes/no cue for a yes/no answer */
const baOf = (items, cue, ans) => { const P = items.filter(ans), N = items.filter((x) => !ans(x)); if (!P.length || !N.length) return 1; const tpr = P.filter(cue).length / P.length, tnr = N.filter((x) => !cue(x)).length / N.length; return Math.max((tpr + tnr) / 2, (2 - tpr - tnr) / 2); };
/** the tells of a type at a level, from the pooled data */
function tellFaults(id, lv, acc) {
  const f = [], M = {}, mode = MODE[id];
  if (mode === 'markt') {
    const P = acc.purses || [];
    if (P.length < 20) return { f: ['markt: no purses to judge'], M };
    // shortcuts that skip the adding: each right on no more than 75 % of the purses
    const rules = {
      'all but the last piece': (ps) => ps.map((p, i) => i < ps.length - 1),
      'all but the first piece': (ps) => ps.map((p, i) => i > 0),
      'every note': (ps) => ps.map((p) => p.v >= 5),
      'every coin': (ps) => ps.map((p) => p.v < 5),
      'the first two pieces': (ps) => ps.map((p, i) => i < 2),
      'all but the smallest piece': (ps) => { const m = ps.findIndex((p) => p.v === Math.min(...ps.map((q) => q.v))); return ps.map((p, i) => i !== m); },
    };
    for (const [name, r] of Object.entries(rules)) { const hit = P.filter((ps) => r(ps).every((x, i) => x === ps[i].right)).length / P.length; M['shortcut: ' + name] = hit; if (hit > 0.75) f.push(`markt L${lv}: "${name}" circles the right money on ${(100 * hit).toFixed(1)}% of the purses`); }
  }
  if (mode === 'kilo') { f.push(...bandFaults(`kilo L${lv} compare`, acc.pos)); const share = {}; (acc.pos || []).forEach((p) => { share[p[1]] = (share[p[1]] || 0) + 1; }); const top = Math.max(...Object.values(share)) / (acc.pos || [1]).length; M['most common answer'] = top; if (top > 0.75) f.push(`kilo L${lv}: one answer on ${(100 * top).toFixed(1)}% of the things`); }
  if (mode === 'tid') {
    const g = guessFaults(`tid L${lv} activities`, acc.items); if (Array.isArray(g)) f.push(...g); else { f.push(...g.f); M['best activity cue'] = g.worst; }
    f.push(...bandFaults(`tid L${lv} units`, acc.pos));
    const mins = acc.mins || []; const thirty = mins.filter((m) => m === 30).length / Math.max(1, mins.length); M['minutes 30'] = thirty; if (thirty > 0.75 || thirty < 0.25) f.push(`tid L${lv}: 30 minutes on ${(100 * thirty).toFixed(1)}% of the pairs`);
  }
  if (mode === 'ueber') {
    const I = acc.items || [];
    if (I.length < 20) return { f: ['ueber: nothing to judge'], M };
    f.push(...bandFaults(`ueber L${lv} kann stimmen`, I.map((x) => [x.pos, x.can ? 'can' : 'cannot'])));
    const b1 = baOf(I, (x) => x.probe, (x) => x.can), b2 = baOf(I, (x) => x.probe, (x) => x.wrong), b3 = lv > 1 ? baOf(I, (x) => x.op === 'plus', (x) => x.can) : 0.5;
    const always = Math.max(I.filter((x) => x.can).length, I.filter((x) => !x.can).length) / I.length;
    M['Probe -> kann stimmen'] = b1; M['Probe -> wrong'] = b2; M['plus -> kann stimmen'] = b3; M['always one box'] = always;
    if (b1 > 0.75) f.push(`ueber L${lv}: a Probe card tells "kann stimmen" (${(100 * b1).toFixed(1)}%)`);
    if (b2 > 0.75) f.push(`ueber L${lv}: a Probe card tells a wrong calculation (${(100 * b2).toFixed(1)}%)`);
    if (b3 > 0.75) f.push(`ueber L${lv}: the operation tells the box (${(100 * b3).toFixed(1)}%)`);
    if (always > 0.75) f.push(`ueber L${lv}: one box is right ${(100 * always).toFixed(1)}% of the time`);
    const share = (xs) => (xs.length ? xs.filter((x) => !x.can).length / xs.length : NaN);
    // review round 1: no surface of the calculation may tell the box. Reported: the share of "kann nicht stimmen" with and
    // without each cue. Judged: the two-digit second number (the reviewer's finding) by its shares, which must stay within 8
    // points of each other; every cue by what a guesser gains from it (the answer most common with each cue value, against
    // the answer most common overall: no more than 4 points, about twice the noise of 400 pages) and by its balanced accuracy
    // (no more than 60 %). The item letter is judged by its band of chance (bandFaults above); its guesser gain is reported
    const gainOf = (cue) => { const by = {}; I.forEach((x) => { const v = String(cue(x)); by[v] = by[v] || { c: 0, n: 0 }; by[v][x.can ? 'c' : 'n']++; }); return Object.values(by).reduce((a, m) => a + Math.max(m.c, m.n), 0) / I.length - always; };
    for (const [name, cue, need, maxDiff] of [['two-digit second number', (x) => x.two, 40, 0.08], ['result ending in 0', (x) => x.end0, 40, 1]]) {
      const yes = I.filter(cue), no = I.filter((x) => !cue(x)), sy = share(yes), sn = share(no), ba = baOf(I, cue, (x) => !x.can), gain = gainOf(cue);
      M['"kann nicht stimmen" with / without ' + name] = [(100 * sy).toFixed(1) + '% / ' + (100 * sn).toFixed(1) + '%; a guesser gains ' + (100 * gain).toFixed(1) + ' points; balanced accuracy', ba];
      if (yes.length < need) { f.push(`ueber L${lv}: ${name}: only ${yes.length} items (nothing to judge)`); continue; }
      if (Math.abs(sy - sn) > maxDiff || gain > 0.04 || ba > 0.6) f.push(`ueber L${lv}: a ${name} tells the box (${(100 * sy).toFixed(1)}% "kann nicht stimmen" with it, ${(100 * sn).toFixed(1)}% without; a guesser gains ${(100 * gain).toFixed(1)} points; balanced accuracy ${(100 * ba).toFixed(1)}%)`);
    }
    M['a guesser gains from the item letter'] = gainOf((x) => x.pos);
    const sh = I.filter((x) => x.shift).length; M['columns drawn misaligned'] = sh / I.length; if (sh) f.push(`ueber L${lv}: ${sh} columns drawn misaligned`);
  }
  if (mode === 'halb' && lv > 1) { const O = acc.onesHundred || []; M['tasks whose ones step passes a hundred'] = O.filter(Boolean).length / Math.max(1, O.length); if (lv === 2 && O.some(Boolean)) f.push('halb L2: a ones step passes a hundred'); }
  if (mode === 'halb' && lv === 3) { const T = acc.thousand || []; const pages = T.length / 4, k = T.filter(Boolean).length / Math.max(1, pages); M['pages with a sum of 1000'] = k; if (k < 0.35 || k > 0.65) f.push(`halb L3: a sum of 1000 on ${(100 * k).toFixed(1)}% of the pages`); }
  if (mode === 'lage') {
    const g = guessFaults(`lage L${lv} write sentences`, acc.items, 0.75, true); if (Array.isArray(g)) f.push(...g); else { f.push(...g.f); M['best sentence cue'] = g.worst; }
    f.push(...bandFaults(`lage L${lv} write`, acc.pos));
    f.push(...bandFaults(`lage L${lv} draw`, acc.drawPos));
    const left = (acc.box || []).filter((b) => b.endsWith(',0')).length / Math.max(1, (acc.box || []).length); M['box at the left end'] = left; if (left < 0.35 || left > 0.65) f.push(`lage L${lv}: the box at the left end on ${(100 * left).toFixed(1)}% of the pages`);
    const same = (acc.boxOrder || []).filter(Boolean).length / Math.max(1, (acc.boxOrder || []).length); M['word box in the sentences\' order'] = same; if (same > 0.4) f.push(`lage L${lv}: the word box lists the answers in the sentences' order on ${(100 * same).toFixed(1)}% of the pages`);
    const tg = {}; (acc.targets || []).forEach((t) => { tg[t] = (tg[t] || 0) + 1; }); const topT = Math.max(...Object.values(tg)) / Math.max(1, (acc.targets || []).length); M['most common drawing place'] = topT; if (topT > 0.25) f.push(`lage L${lv}: one place is the drawing place ${(100 * topT).toFixed(1)}% of the time`);
  }
  return { f, M };
}
const crossingsOf = (html) => { const $ = cheerio.load(html); return $('[data-e1-task]').map((i, e) => { const a = num($(e).attr('data-e1-a')), b = num($(e).attr('data-e1-b')); return ((Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) >= 10 ? 1 : 0) + ((a % 10) + (b % 10) >= 10 ? 1 : 0); }).get().sort().join(''); };
const levelSig = (html) => { const c = {}; for (const m of html.matchAll(/data-e1-([a-z]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; const words = cheerio.load(html)('[data-dk]').text().replace(/[0-9]+/g, '#').replace(/\s+/g, ' '); return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])) + '|' + crypto.createHash('sha1').update(words).digest('hex').slice(0, 8); };

async function main() {
  const t0 = Date.now();
  const artSrc = fs.readFileSync(path.join(WG, 'types', '_shared', 'e1-math-art.js'), 'utf8');
  // ---- 1. bank
  const bf = bankFaults(B, artSrc);
  ok(!bf.length, 'bank: ' + bf.slice(0, 12).join(' | '));
  const P = (name, mut, re, src = artSrc, art = ART) => { const b = clone(B); mut(b); judge(name, bankFaults(b, src, art), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 a German good priced 15 €', (b) => { find(b.DE_GOODS, 'ball').eur = [4, 15]; }, /ball: .*(outside|not whole euros)/);
  P('PB2 a Swedish good at 5-10 kr', (b) => { find(b.SV_GOODS, 'dice').kr = [5, 10]; }, /dice: .*(outside|not 12-95)/);
  P('PB3 the guitar weighs 9 kg', (b) => { find(b.MASS_OBJECTS, 'guitar').kg = [2, 9]; }, /mass guitar: .* outside/);
  P('PB17 a cat (a kitten picture) back on the measure cards', (b) => { b.MASS_OBJECTS.push({ id: 'cat', pic: ['pets', 'cat'], sv: 'en katt', kg: [3, 6], scale: true }); }, /a cat \(every cat/);
  P('PB18 the pineapple at 2 kg', (b) => { find(b.MASS_OBJECTS, 'pineapple').kg = [1, 2]; }, /mass pineapple: .* outside/);
  P('PB19 the Überschlag rule rounding the result too', (b) => { b.TEXT.ueber.rule = b.TEXT.ueber.rule.replace(' (nicht runden!)', ''); }, /round the two numbers of the task/);
  P('PB20 the chips without "Nach dem Überschlag:"', (b) => { b.TEXT.ueber.after = 'Kreise ein:'; }, /not led by "Nach dem Überschlag:"/);
  P('PB21 two explanation starters', (b) => { b.TEXT.halb.starters = ['Zuerst habe ich', 'Dann habe ich']; }, /three explanation starters/);
  P('PB22 "trycka på knappen"', (b) => { find(b.UNIT_ACTIVITIES, 'button').sv = 'trycka på knappen'; }, /knappen/);
  P('PB23 a live mouse among the small balances\' heavy things', (b) => { b.PAN_HEAVY.push({ id: 'mouse', pic: ['pets', 'mouse'], sv: 'en mus' }); }, /pan-heavy mouse/);
  P('PB4 a bicycle among the light things', (b) => { b.LIGHT_THINGS.push({ id: 'bicycle', pic: ['toys', 'bicycle'], sv: 'en cykel' }); }, /light bicycle: not light/);
  P('PB5 "sova en natt" takes minutes', (b) => { find(b.UNIT_ACTIVITIES, 'night').unit = 'minuter'; }, /night: the bank says minuter/);
  P('PB6 an activity that names its unit', (b) => { find(b.UNIT_ACTIVITIES, 'blink').sv = 'blinka i en sekund'; }, /blink: .* names a unit/);
  P('PB7 "bolln" for bollen', (b) => { find(b.SHELF_THINGS, 'ball').def = 'bolln'; }, /shelf ball: the definite form/);
  P('PB8 nallen "ligger"', (b) => { find(b.SHELF_THINGS, 'teddy').verb = 'ligger'; }, /shelf teddy: the verb/);
  P('PB9 a draw thing that stands on the shelf', (b) => { b.DRAW_THINGS.push({ id: 'ball', sv: 'en boll' }); }, /draw thing ball/);
  P('PB10 a black-and-white picture', (b) => { find(b.MASS_OBJECTS, 'pumpkin').pic = ['vegetables bw', 'pumpkin']; }, /black-and-white picture|not in the library/);
  P('PB11 the rule without "mehr als 100"', (b) => { b.TEXT.ueber.rule = 'Runde beide Zahlen auf Hunderter. Ist das Ergebnis weit weg, kann es nicht stimmen.'; }, /mehr als 100/);
  P('PB12 an off-palette colour in the drawings', () => {}, /outside PAL_E1/, artSrc + '\nconst X = "#123456";');
  { const art2 = { ...ART, MONEY: clone(ART.MONEY) }; art2.MONEY.SEK.coins[10] = 30; P('PB13 the 10-kronor coin drawn larger than the 5-kronor coin', () => {}, /10 coin and the 5 coin|5 coin and the 10 coin/, artSrc, art2); }
  P('PB24 a bicycle back on the measure cards', (b) => { b.MASS_OBJECTS.push({ id: 'bicycle', pic: ['toys', 'bicycle'], sv: 'en barncykel', kg: [8, 10], scale: false }); }, /a bicycle on a measure card/);
  P('PB25 no "Rita fler steg om det behövs." line', (b) => { b.TEXT.undersokning.moreSteps = 'Rita fler steg.'; }, /Rita fler steg om det behövs/);
  { const art2 = { ...ART, note: (cur, v, h) => ART.note(cur, v, h).replace(/ data-e1-mid="[^"]*"/, '') }; P('PB26 a play note without its value in the middle', () => {}, /has no value in the middle/, artSrc, art2); }
  P('PB16 a ball only ever in front of the box', (b) => { b.BOX_FRONT.push('ball'); }, /in front of the box and behind it differ/);
  P('PB15 a ball behind the box (it reads as lying on it)', (b) => { b.BOX_BEHIND.push('ball'); }, /ball behind the box/);
  P('PB14 "mellan" written as "emellan"', (b) => { b.SV_REL.between = 'emellan'; }, /position word between/);

  // ---- 2. build sweep
  const pools = {}, sigs = {};
  let built = 0;
  for (const id of IDS) {
    const t = loadType(id);
    ok(JSON.stringify(t.onlyLocales) === JSON.stringify([LOC[id]]), `${id}: onlyLocales ${JSON.stringify(t.onlyLocales)}`);
    for (const other of ['en', LOC[id] === 'de' ? 'sv' : 'de', 'fr']) { let refused = false; try { t.build({ theme: null, difficulty: 2, locale: other, unit: null }, { rng: makeRng('x'), variant: 1 }); } catch (e) { refused = true; } ok(refused, `${id}: builds a ${other} page`); }
    const str = withLevelInstruction(resolveStrings(id, LOC[id], t), id, 1, LOC[id]);
    ok(str.source === 'locale', `${id}: no ${LOC[id]} title and instruction (strings.${LOC[id]}.json)`);
    for (const lv of [1, 2, 3]) { const fi = instrFaults(id, lv, withLevelInstruction(resolveStrings(id, LOC[id], t), id, lv, LOC[id]).instruction); ok(!fi.length, fi.join(' | ')); }
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
        // a level's signature: its page's structure and words, and its printed instruction (digits left out)
        if (s === 1) { sigs[id + lv] = levelSig(pg.html) + (MODE[id] === 'halb' ? '|' + crossingsOf(pg.html) : '') + '|' + withLevelInstruction(resolveStrings(id, LOC[id], t), id, lv, LOC[id]).instruction.replace(/[0-9]+/g, '#'); pools[id + lv] = pg; }
      }
      const tf = tellFaults(id, lv, acc);
      ok(!tf.f.length, `${id} L${lv} tells: ${tf.f.slice(0, 4).join(' | ')}`);
      pools[id + lv + 'M'] = tf.M;
      if (MODE[id] === 'und') ok(seen.size === 1, `${id} L${lv}: a record page differs between copies (${seen.size})`);
      else ok(seen.size >= Math.min(SEEDS, 50), `${id} L${lv}: only ${seen.size} distinct pages in ${SEEDS}`);
    }
    ok(new Set([1, 2, 3].map((lv) => sigs[id + lv])).size === 3, `${id}: the three levels do not differ (${[1, 2, 3].map((lv) => sigs[id + lv].slice(0, 60)).join(' / ')})`);
    process.stdout.write(id + ' ');
  }
  console.log(`\nbuild sweep: ${built} pages (${SEEDS} seeds a level), ${((Date.now() - t0) / 1000).toFixed(0)} s`);

  // ---- page poisons (each against the real page of the same type and level, judged above)
  const pa = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; const html = spoil(pools[id + lv].html); if (html === pools[id + lv].html) { judge(name, ['the spoil changed nothing'], /^$/); return; } judge(name, pageFaults(id, lv, html), re); };
  pa('PA1 a price tag that is not its price', 'G1-671', 2, (h) => h.replace(/(data-lcs-prim="price-tag" data-lcs-price=")(\d+)/, (m, a, p) => a + (+p + 1)), /the tag reads|tag/);
  pa('PA2 a purse with a second way to pay', 'G1-671', 1, (h) => { const $ = cheerio.load(h); const c = $('[data-e1-card][data-e1-kind="exact"]').first(); const p = c.find('[data-e1-piece]').filter((i, e) => $(e).attr('data-e1-right') === '1').last(); c.find('[data-e1-purse]').append($.html(p).replace(' data-e1-right="1"', '')); return $.html(); }, /ways to circle/);
  pa('PA3 the change stamp off by one', 'G1-671', 3, (h) => h.replace(/(data-e1-change="1"|data-e1-answer="(\d+)" data-e1-change="1")/, (m) => m).replace(/data-dk-numbox data-e1-answer="(\d+)" data-e1-change="1"/, (m, v) => `data-dk-numbox data-e1-answer="${+v + 1}" data-e1-change="1"`), /the change is not/);
  pa('PA4 a total stamp off by ten', 'G1-671', 2, (h) => h.replace(/data-dk-numbox data-e1-answer="(\d+)" data-e1-total="1"/, (m, v) => `data-dk-numbox data-e1-answer="${+v + 10}" data-e1-total="1"`), /the total stamp/);
  pa('PA5 the change for a note stamped wrong', 'G2-631', 2, (h) => h.replace(/data-dk-numbox data-e1-answer="(\d+)" data-e1-change="1"/, (m, v) => `data-dk-numbox data-e1-answer="${+v - 1}" data-e1-change="1"`), /the change stamp/);
  pa('PA6 the fewest coins and notes stamped wrong', 'G2-631', 3, (h) => h.replace(/data-e1-fewest="([^"]*)"/, 'data-e1-fewest="9x1"'), /the fewest stamp/);
  pa('PA7 a balance with one weight missing', 'G2-632', 1, (h) => h.replace(/<g data-e1-weight="1">[\s\S]*?<\/g>/, ''), /weights for/);
  pa('PA8 an apple said to weigh more than 1 kg', 'G2-632', 2, (h) => { const $ = cheerio.load(h); const c = $('[data-e1-cmp][data-e1-truth="less"]').first(); c.attr('data-e1-truth', 'more'); return $.html(); }, /stamped more, the gate says less/);
  pa('PA9 the hours box wrong', 'G2-633', 2, (h) => h.replace(/data-dk-numbox data-e1-answer="(\d+)" data-e1-hours="1"/, (m, v) => `data-dk-numbox data-e1-answer="${+v + 1}" data-e1-hours="1"`), /the answer boxes/);
  pa('PA10 a clock word that is not the clock\'s time', 'G2-633', 1, (h) => { const $ = cheerio.load(h); const w = $('[data-e1-clockword]').first(); const nx = (x) => SV_NUM[(SV_NUM.indexOf(x) % 12) + 1]; w.text(w.text().replace(/(halv|klockan) (\S+)/, (m, k, x) => k + ' ' + nx(x))); return $.html(); }, /the clock words/);
  pa('PA11 the tens step before the hundreds step', 'G3-630', 2, (h) => h.replace(/data-dk-numbox data-e1-answer="(\d+)" data-e1-step="1b"/, 'data-dk-numbox data-e1-answer="30" data-e1-step="1b"'), /step 1 is not/);
  pa('PA12 "kann stimmen" ringed against the rule', 'G3-631', 2, (h) => { const $ = cheerio.load(h); const g = $('[data-e1-item][data-e1-kind="big"] [data-e1-ticks]').first(); g.find('[data-e1-pick]').each((i, e) => { $(e).attr('data-dk-answer', $(e).attr('data-e1-pick') === 'kann stimmen' ? 'right' : 'no'); }); return $.html(); }, /by the rule the box is/);
  pa('PA13 an error the Überschlag cannot see, without its Probe', 'G3-631', 3, (h) => { const $ = cheerio.load(h); const it = $('[data-e1-item][data-e1-kind="small"]').first(); $(`[data-e1-probefor="${it.attr('data-e1-item')}"]`).remove(); it.attr('data-e1-probe', '0'); return $.html(); }, /has no Probe/);
  pa('PA14 a result 100 from the Überschlag (the rule cannot decide it cleanly)', 'G3-631', 1, (h) => { const $ = cheerio.load(h); const it = $('[data-e1-item]').first(), calc = it.find('[data-e1-art="column"]'); const a = num(calc.attr('data-e1-top')), b = num(calc.attr('data-e1-bottom')); const E = roundOwn(a) + roundOwn(b); calc.attr('data-e1-printed', String(E + 120)); return $.html(); }, /too near the rule's 100/);
  pa('PA15 an answer stamp on the record page', 'G3-632', 2, (h) => h.replace('data-e1-field="table"', 'data-e1-field="table" data-dk-answer="right"'), /carries an answer/);
  {
    // PA16: a thing on the far side of a "till vänster / höger om" landmark taken off the shelf (its place left empty): the
    // sentence now names two empty places (the real copy is the control, judged in the sweep)
    const t672 = loadType('G1-672'); let spoiled = null;
    for (let sd = 1; sd <= 200 && !spoiled && IDS.includes('G1-672'); sd++) {
      const $ = cheerio.load(buildPage(t672, 2, sd).html), S = shelfOf($);
      $('[data-e1-draw][data-e1-rel="left"], [data-e1-draw][data-e1-rel="right"]').each((i, e) => {
        if (spoiled) return;
        const rel = $(e).attr('data-e1-rel'), ref = $(e).attr('data-e1-ref'), [r, c] = S.at[ref];
        const th = Object.entries(S.at).find(([k, q]) => k !== ref && q[0] === r && (rel === 'left' ? q[1] < c : q[1] > c));
        if (!th) return;
        $('[data-e1-art="shelf"] image[data-e1-key="' + th[0] + '"]').replaceWith('<rect data-e1-place="' + th[1].join(',') + '" data-e1-empty="1"/>');
        spoiled = pageFaults('G1-672', 2, $.html());
      });
    }
    if (IDS.includes('G1-672')) judge('PA16 a shelf sentence with two places', spoiled || ['no page found to spoil'], /the places that fit are \S+ \S+/);
  }
  {
    // PA17: the landmark of a "till vänster / höger om" sentence moved to the empty place right beside its subject (the
    // word box given "bredvid"): "bredvid" now fits that sentence too (the real copy is the control, judged in the sweep)
    const t672 = loadType('G1-672'); let spoiled = null;
    for (let sd = 1; sd <= 200 && !spoiled && IDS.includes('G1-672'); sd++) {
      const $ = cheerio.load(buildPage(t672, 3, sd).html), w = $('[data-e1-write="left"], [data-e1-write="right"]').first();
      if (!w.length) continue;
      const S = shelfOf($), subj = w.attr('data-e1-subj'), ref = w.attr('data-e1-ref'), [r, c] = S.at[subj];
      const side = w.attr('data-e1-write') === 'left' ? 1 : -1, near = r + ',' + (c + side);
      if (S.cells[near] !== null) continue;
      const from = S.at[ref].join(',');
      $('[data-e1-art="shelf"] [data-e1-empty][data-e1-place="' + near + '"]').attr('data-e1-place', from);
      $('[data-e1-art="shelf"] image[data-e1-key="' + ref + '"]').attr('data-e1-place', near);
      if (!$('[data-e1-word="bredvid"]').length) $('[data-e1-wordbox] .dk-row').append('<span class="g1-chip" data-e1-word="bredvid">bredvid</span>');
      spoiled = pageFaults('G1-672', 3, $.html());
    }
    if (IDS.includes('G1-672')) judge('PA17 "bredvid" fits a "till vänster / höger om" sentence', spoiled || ['no page found to spoil'], /"bredvid" fits where the answer is/);
  }
  pa('PA18 a misspelt definite form in a sentence', 'G1-672', 1, (h) => { const $ = cheerio.load(h); const sp = $('[data-e1-write]').first().parent().children('.e1-t').first(); sp.text(sp.text().replace(/^(\S+?)e([nt]) /, '$1$2 ')); return $.html(); }, /the gate: /);
  pa('PA19 a level-2 halbschriftlich sum with no crossing', 'G3-630', 2, (h) => { const $ = cheerio.load(h); const q = $('[data-e1-task]').first(); q.attr('data-e1-a', '111').attr('data-e1-b', '222'); return $.html(); }, /crosses 0 times at level 2|step|sum stamp/);
  pa('PA21 a shifted place drawn misaligned (its layout tells the box)', 'G3-631', 2, (h) => h.replace(/data-e1-shift="0"/, 'data-e1-shift="1"'), /drawn misaligned/);
  pa('PA22 an Überschlag of 0', 'G3-631', 2, (h) => { const $ = cheerio.load(h); const calc = $('[data-e1-item]').first().find('[data-e1-art="column"]'); calc.attr('data-e1-top', '543').attr('data-e1-bottom', '494').attr('data-e1-op', 'minus'); return $.html(); }, /an Überschlag of 0/);
  pa('PA23 the chips without the Überschlag\'s lead', 'G3-631', 3, (h) => { const $ = cheerio.load(h); $('[data-e1-ticks]').first().parent().children('.e1-t').first().text('Kreise ein:'); return $.html(); }, /not led by "Nach dem Überschlag:"/);
  pa('PA24 the smaller number first', 'G3-630', 1, (h) => { const $ = cheerio.load(h); const q = $('[data-e1-task]').first(); const a = q.attr('data-e1-a'); q.attr('data-e1-a', q.attr('data-e1-b')).attr('data-e1-b', a); return $.html(); }, /the smaller number first/);
  pa('PA25 "klockan fem" stamped after the printed "Klockan:"', 'G2-633', 3, (h) => h.replace(/data-e1-answer="([a-zåäö]+)" data-e1-writeclock/, 'data-e1-answer="klockan $1" data-e1-writeclock'), /the clock words to write/);
  pa('PA26 a price box stamped with the other price', 'G1-671', 2, (h) => h.replace(/data-dk-numbox data-e1-answer="(\d+)" data-e1-pricebox="1"/, (m, v) => `data-dk-numbox data-e1-answer="${+v + 1}" data-e1-pricebox="1"`), /the price boxes are/);
  pa('PA27 the coins and notes line missing at level 3', 'G2-631', 3, (h) => h.replace('data-e1-moneyref="1"', 'data-x="1"'), /coins and notes line/);
  pa('PA28 a cat on a compare card', 'G2-632', 2, (h) => h.replace(/(data-e1-cmp="1" data-e1-thing=")[a-z]+(")/, '$1cat$2'), /a cat \(a kitten picture\)/);
  pa('PA29 the half-hour line missing at level 1', 'G2-633', 1, (h) => h.replace(/data-e1-halfhour="1"/, 'data-x="1"'), /the half-hour line/);
  {
    // PA30: an "ovanför" / "nedanför" whose thing has a SECOND empty place two shelves away in its column (the thing on
    // the middle shelf of that column taken off would not do: take off the thing two shelves away) — the whole-column
    // reading now names two places (the real copy is the control, judged in the sweep)
    const t672 = loadType('G1-672'); let spoiled = null;
    for (let sd = 1; sd <= 300 && !spoiled && IDS.includes('G1-672'); sd++) for (const lvx of [2, 3]) {
      if (spoiled) break;
      const $ = cheerio.load(buildPage(t672, lvx, sd).html), S = shelfOf($);
      $('[data-e1-draw][data-e1-rel="above"], [data-e1-draw][data-e1-rel="below"]').each((i, e) => {
        if (spoiled) return;
        const rel = $(e).attr('data-e1-rel'), [r, c] = S.at[$(e).attr('data-e1-ref')], far = (rel === 'above' ? r - 2 : r + 2) + ',' + c, th = S.cells[far];
        if (!th || th === 'box') return;
        $('[data-e1-art="shelf"] image[data-e1-key="' + th + '"]').replaceWith('<rect data-e1-place="' + far + '" data-e1-empty="1"/>');
        spoiled = pageFaults('G1-672', lvx, $.html());
      });
    }
    if (IDS.includes('G1-672')) judge('PA30 an "ovanför" with a second empty place two shelves away', spoiled || ['no page found to spoil'], /the places that fit are \S+ \S+/);
  }
  {
    // PA31: a "till vänster / höger om" sentence that names a thing one place further away (a thing between it and the
    // place): the sentence still has one place, but its thing is not beside it
    const t672 = loadType('G1-672'); let spoiled = null;
    for (let sd = 1; sd <= 300 && !spoiled && IDS.includes('G1-672'); sd++) {
      const $ = cheerio.load(buildPage(t672, 1, sd).html), S = shelfOf($);
      $('[data-e1-draw][data-e1-rel="left"], [data-e1-draw][data-e1-rel="right"]').each((i, e) => {
        if (spoiled) return;
        const rel = $(e).attr('data-e1-rel'), [r, c] = S.at[$(e).attr('data-e1-ref')], further = r + ',' + (rel === 'left' ? c + 1 : c - 1), th = S.cells[further];
        if (!th || th === 'box') return;
        $(e).attr('data-e1-ref', th);
        spoiled = pageFaults('G1-672', 1, $.html());
      });
    }
    if (IDS.includes('G1-672')) judge('PA31 a left / right sentence naming a thing with a thing between', spoiled || ['no page found to spoil'], /is not right beside the thing named/);
  }
  pa('PA32 a level-2 task whose ones step passes a hundred (468 + 337)', 'G3-630', 2, (h) => { const $ = cheerio.load(h); $('[data-e1-task]').first().attr('data-e1-a', '468').attr('data-e1-b', '337'); return $.html(); }, /passes a hundred in the ones step/);
  pa('PA33 a bicycle on a measure card', 'G2-632', 3, (h) => h.replace(/(data-e1-meas="1" data-e1-kind="balance" data-e1-n=")(\d+)(" data-e1-thing=")[a-z]+(")/, (m, a, n, b, c) => a + '8' + b + 'bicycle' + c), /a bicycle on a measure card/);
  pa('PA34 a play note without its value in the middle', 'G2-631', 2, (h) => h.replace(/(data-e1-mid="[^"]*">)[^<]*(<)/, (m, a, b) => a + b), /without its value in the middle/);
  pa('PA35 the chart without its line under it', 'G3-632', 1, (h) => h.replace('data-e1-moresteps="1"', 'data-x="1"'), /Rita fler steg om det behövs/);
  pa('PA20 a kitchen scale pointing past its stamp', 'G2-632', 3, (h) => h.replace(/data-e1-needle="(\d+)"/, (m, v) => `data-e1-needle="${(+v % 10) + 1}"`), /the pointer/);

  // ---- instruction poisons (each against the real printed instruction of the same type and level, judged in the sweep)
  const pi = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; const real = withLevelInstruction(resolveStrings(id, LOC[id], loadType(id)), id, lv, LOC[id]).instruction; const bad = spoil(real); judge(name, bad === real ? ['the spoil changed nothing'] : instrFaults(id, lv, bad), re); };
  pi('PI1 "Rechne in Schritten: erst die Hunderter …" (no starting number)', 'G3-630', 1, (s) => s.replace('Rechne schrittweise: Beginne bei der ersten Zahl und rechne erst', 'Rechne in Schritten: erst'), /lacks "Rechne schrittweise: Beginne bei der ersten Zahl"/);
  pi('PI2 "Zeichne die Sprünge am Rechenstrich" (without "ein")', 'G3-630', 2, (s) => s.replace('am Rechenstrich ein und', 'am Rechenstrich und'), /lacks "Zeichne die Sprünge am Rechenstrich ein"/);
  pi('PI3 no partner check in the instruction', 'G3-630', 3, (s) => s.replace(' Lass ein anderes Kind deinen Rechenweg nachrechnen.', ''), /Lass ein anderes Kind/);
  pi('PI4 the chips not tied to the Überschlag in the instruction', 'G3-631', 2, (s) => s.replace('kreise ein, was der Überschlag zeigt:', 'kreise ein:'), /was der Überschlag zeigt/);
  pi('PI5 "Rita saken" and no left / right sentence', 'G1-672', 2, (s) => s.replace('Rita varje sak', 'Rita saken').replace(' Vänster och höger är som du ser hyllan.', ''), /Vänster och höger|Rita saken/);
  pi('PI6 "Räkna upp … till sedeln"', 'G2-631', 3, (s) => s.replace('Räkna uppåt från priset till sedelns värde', 'Räkna upp från priset till sedeln'), /Räkna uppåt/);
  pi('PI7 "klockslaget" without "med ord"', 'G2-633', 3, (s) => s.replace('Skriv klockslaget med ord', 'Skriv klockslaget'), /med ord/);

  // ---- tell poisons (synthetic pooled sets; each with the real set as its control, judged above)
  const tp = (name, f, re) => judge(name, f, re);
  tp('PT1 every purse answered by "all but the last piece"', tellFaults('G1-671', 1, { purses: Array.from({ length: 40 }, () => [{ v: 5, right: true }, { v: 2, right: true }, { v: 1, right: false }]) }).f, /all but the last piece/);
  tp('PT2 a Probe card on every "kann stimmen"', tellFaults('G3-631', 3, { items: Array.from({ length: 60 }, (_, i) => ({ pos: i % 6, can: i % 2 === 0, probe: i % 2 === 0, wrong: i % 3 === 0, op: i % 2 ? 'plus' : 'minus' })) }).f, /Probe card tells "kann stimmen"/);
  tp('PT3 the subject tells the position word', tellFaults('G1-672', 1, { drawPos: Array.from({ length: 60 }, (_, i) => [i % 3, ['left', 'right', 'between'][Math.floor(i / 3) % 3]]), items: Array.from({ length: 60 }, (_, i) => ({ words: [['bollen', 'ligger', 'lådan'], ['nallen', 'sitter', 'lådan'], ['bilen', 'står', 'boken', 'och', 'båten']][i % 3], ans: ['framför', 'bakom', 'mellan'][i % 3] })), pos: Array.from({ length: 60 }, (_, i) => [i % 3, 'x']), box: Array(20).fill('2,0').concat(Array(20).fill('2,3')), boxOrder: [false], targets: Array.from({ length: 60 }, (_, i) => String(i % 9)) }).f, /cue "(slot:first word|slot:second word|w:bollen|w:nallen|w:ligger|w:sitter)"/);
  tp('PT4 "kann stimmen" always in place A', tellFaults('G3-631', 2, { items: Array.from({ length: 60 }, (_, i) => ({ pos: i % 6, can: i % 6 === 0 || (i % 6 > 2 && i % 2 === 0), probe: i % 3 === 0, wrong: i % 2 === 1, op: i % 2 ? 'plus' : 'minus' })) }).f, /place 1 holds/);
  tp('PT5 a measure with nothing to judge fails', tellFaults('G2-633', 1, { items: [], pos: [], mins: [] }).f, /nothing to judge|found 0 items/);
  tp('PT7 a two-digit second number only ever on a wrong calculation', tellFaults('G3-631', 2, { items: Array.from({ length: 240 }, (_, i) => ({ pos: i % 6, can: i % 3 !== 0, probe: i % 2 === 0, wrong: i % 3 === 0, op: i % 2 ? 'plus' : 'minus', two: i % 3 === 0, end0: i % 10 === 0, shift: false })) }).f, /a two-digit second number tells the box/);
  tp('PT8 a result ending in 0 only on right calculations', tellFaults('G3-631', 3, { items: Array.from({ length: 240 }, (_, i) => ({ pos: i % 6, can: i % 3 !== 0, probe: i % 2 === 0, wrong: i % 3 === 0, op: i % 2 ? 'plus' : 'minus', two: i % 4 === 0, end0: i % 3 !== 0 && i % 2 === 0, shift: false })) }).f, /a result ending in 0 tells the box/);
  tp('PT6 the minutes always 30', tellFaults('G2-633', 2, { items: B.UNIT_ACTIVITIES.concat(B.UNIT_ACTIVITIES).map((a) => ({ words: a.sv.split(' '), ans: a.unit })), pos: Array.from({ length: 36 }, (_, i) => [i % 6, ['sekunder', 'minuter', 'timmar'][Math.floor(i / 2) % 3]]), mins: Array(30).fill(30) }).f, /30 minutes on 100/);

  // ---- 3. render
  const stacks = [];
  let swept = 0;
  if (!NO_RENDER) {
    const puppeteer = require('puppeteer');
    const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
    const OUTD = path.join(require('os').tmpdir(), 'verify-e1-math');
    fs.mkdirSync(OUTD, { recursive: true });
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const render = async (type, lv, v, base) => {
      const strings = withLevelInstruction(resolveStrings(type.id, LOC[type.id], type), type.id, lv, LOC[type.id]);
      const r = await renderInstance({ type, theme: null, difficulty: lv, locale: LOC[type.id], strings, variant: v, page, outDir: OUTD, baseName: base });
      for (const x of ['.pdf', '.png', '.html']) try { fs.unlinkSync(path.join(OUTD, base + x)); } catch (e) {}
      return r;
    };
    const layoutSweep = async (t, lv, n) => {
      const seen = new Set(), faults = [];
      for (let v = 1; v <= n; v++) {
        const b = buildPage(t, lv, v);
        const h = crypto.createHash('sha1').update(b.html).digest('hex'); if (seen.has(h)) continue; seen.add(h);
        await page.evaluate((html) => { document.querySelector('main.ws-body').innerHTML = html; }, b.html);
        await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; })))));
        for (const x of await t.verify(page)) faults.push(`copy ${v}: ${x}`);
      }
      return { n: seen.size, faults };
    };
    try {
      for (const id of IDS) {
        const t = loadType(id);
        for (const lv of [1, 2, 3]) for (let v = 1; v <= (QUICK ? 1 : 2); v++) {
          const r = await render(t, lv, v, `${id}-L${lv}-v${v}`);
          const bad = [].concat(r.qa.lints || [], r.qa.verify || []);
          ok(!bad.length, `${id} L${lv} v${v}: ${bad.slice(0, 3).join(' | ')}`);
          if (v === 1) { const stk = await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom); return Math.round(Math.max(...ink) - rt.top); }); stacks.push(`${id.slice(0, 2)}${id.slice(3)} L${lv} ${stk}`); }
          if (v === (QUICK ? 1 : 2)) { const sw = await layoutSweep(t, lv, QUICK ? 30 : SEEDS); swept += sw.n; ok(!sw.faults.length, `${id} L${lv} layout sweep (${sw.n} distinct of ${QUICK ? 30 : SEEDS} generator seeds): ${sw.faults.slice(0, 4).join(' | ')}`); }
        }
        process.stdout.write(id + ' ');
      }
      console.log(`\nrender done (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
      const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); const h = fn(r.bodyHtml); if (h === r.bodyHtml) throw new Error('the spoil changed nothing'); return { ...r, bodyHtml: h }; } }; };
      const pr = async (name, id, lv, fn, re) => { if (!IDS.includes(id)) return; let f; try { const r = await render(spoilType(id, fn), lv, 1, 'poison'); f = [].concat(r.qa.verify || [], r.qa.lints || []); } catch (e) { f = ['render threw: ' + e.message]; } judge(name, f, re); };
      // each render poison's control is the real page of the same type and level, rendered above (ok() on its verify)
      await pr('PR1 the page shrunk (a blank band at the bottom)', 'G2-631', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is|empty band/);
      await pr('PR2 a piece of money pushed out of the purse', 'G1-671', 2, (h) => h.replace(/(<span data-dk-box data-e1-piece="\d+"(?: data-e1-right="1")? style=")/, '$1position:relative;top:70px;'), /outside the purse|collide|out of its card/);
      await pr('PR3 two pieces of money touching (no room to circle one)', 'G1-671', 1, (h) => h.replace(/(<span data-dk-box data-e1-piece="\d+"(?: data-e1-right="1")? style=")/, '$1margin-right:-30px;'), /apart \(no room to circle one\)|collide/);
      // (the tip turned about 30 degrees round the dial's centre, across the needle — a shift along the needle would leave its
      // direction unchanged, which is how this poison once went silent on a page whose pointer happened to lie along it)
      await pr('PR4 a kitchen scale pointer off its mark', 'G2-632', 2, (h) => h.replace(/<line x1="([0-9.]+)" y1="([0-9.]+)" x2="([0-9.]+)" y2="([0-9.]+)"( stroke="#F2784B" stroke-width="3.5" stroke-linecap="round" data-e1-needle)/, (m, x1, y1, x2, y2, c) => `<line x1="${x1}" y1="${y1}" x2="${(+x2 - (y2 - y1) * 0.6).toFixed(1)}" y2="${(+y2 + (x2 - x1) * 0.6).toFixed(1)}"${c}`), /does not point at/);
      await pr('PR5 a balance with a weight fewer than its stamp', 'G2-632', 1, (h) => h.replace(/<g data-e1-weight="1">[\s\S]*?<\/g>/, ''), /weights drawn for/);
      await pr('PR6 a balance tipping the wrong way', 'G2-632', 3, (h) => h.replace(/(data-e1-cmp="\d" data-e1-thing="[a-z]+" data-e1-truth=")(more|less)(")/, (m, a, t, c) => a + (t === 'more' ? 'less' : 'more') + c), /the balance shows|right choice is not/);
      await pr('PR7 a clock whose hands are not its time', 'G2-633', 2, (h) => h.replace(/data-lcs-h="(\d+)"/, (m, v) => `data-lcs-h="${(+v % 12) + 1}"`), /hands are not at|minutes apart/);
      await pr('PR8 the step results printed on the page', 'G3-630', 1, (h) => { const m = /data-e1-answer="(\d+)" data-e1-sum="1"/.exec(h); return h.replace(/(<span class="e1-big" data-dk-box>)([^<]*=)/, `$1$2 ${m[1]}`); }, /printed/);
      await pr('PR9 a column that does not show its numbers', 'G3-631', 2, (h) => h.replace(/(data-e1-digit="2">)(\d)/, (m, a, d) => a + ((+d + 1) % 10)), /the column shows/);
      await pr('PR10 the estimate rule left off', 'G3-631', 3, (h) => h.replace(/mehr als 100/g, 'weit'), /rule is not printed/);
      await pr('PR11 the survey with two conclusion lines', 'G3-632', 3, (h) => h.replace(/(data-e1-field="conclusions"[\s\S]*?)<div data-dk-box data-dk-blank="1"[^>]*><svg data-dk-writerow="1"[\s\S]*?<\/svg><\/div>/, '$1'), /not three conclusion lines/);
      await pr('PR12 a shelf sentence pointing at a thing, not an empty place', 'G1-672', 2, (h) => { const m = /data-e1-place="(\d,\d)" data-e1-key="[a-z]+"\/?>/.exec(h); return h.replace(/data-e1-draw="\d,\d"/, `data-e1-draw="${m[1]}"`); }, /its place is not an empty place/);
      await pr('PR13 the thing in front of the box moved beside it', 'G1-672', 1, (h) => h.replace(/(<image href="[^"]+" x=")([0-9.]+)("[^>]*data-e1-rel="front")/, (m, a, x, b) => a + (+x - 70) + b), /not in front of the box/);
      await pr('PR14 an answer box too small to write in', 'G2-631', 1, (h) => h.replace(/(class="ws-blankbox" data-dk-box data-dk-numbox data-e1-answer="\d+" data-e1-change="1" style="flex-shrink:0;width:)\d+px;height:\d+px/, '$140px;height:20px'), /an answer box/);
      await pr('PR15 a Probe card without its squares', 'G3-631', 1, (h) => h.replace(/(data-e1-probefor="[A-F]"[\s\S]*?)data-e1-art="kaestchen"/, '$1data-x="1"'), /no squares/);
      await pr('PR17 the thing in front of the box shrunk to a sticker', 'G1-672', 2, (h) => h.replace(/(<image href="[^"]+" x="[0-9.]+" y="[0-9.]+" width=")([0-9.]+)(" height=")([0-9.]+)("[^>]*data-e1-rel="front")/, (m, a, w, b, hh, c) => a + (+w * 0.5) + b + (+hh * 0.5) + c), /smaller than the other things|does not stand on the board/);
      await pr('PR18 the chips moved above the Überschlag', 'G3-631', 2, (h) => { const $ = cheerio.load(h, null, false); const tr = $('[data-e1-ticks]').first().parent(), er = $('[data-e1-est]').first().parent(); er.before(tr); return $.html(); }, /not on the Überschlag's line/);
      await pr('PR19 a write line too short for "till vänster om"', 'G1-672', 3, (h) => h.replace(/(data-e1-write="[a-z]+"[^>]*><svg data-dk-writerow="1" xmlns="http:\/\/www.w3.org\/2000\/svg" width=")340(")/, '$1250$2'), /a write line 250 px/);
      await pr('PR20 the Rechenstrich squeezed (no room under the line)', 'G3-630', 2, (h) => h.replace(/height="77" viewBox="0 0 ([0-9.]+) 77"/g, (m, w) => `height="56" viewBox="0 0 ${w} 56"`), /px under the Rechenstrich|px over the Rechenstrich/);
      await pr('PR21 a two-thing reference wrapped above the write line', 'G1-672', 1, (h) => h.split('data-e1-reftext="1" style="font-size:16px;white-space:nowrap"').join('data-e1-reftext="1" style="font-size:16px;white-space:normal;width:70px"'), /end wraps or leaves the line/);
      await pr('PR22 the figure in front moved to the box\'s end', 'G1-672', 2, (h) => h.replace(/(<image href="[^"]+" x=")([0-9.]+)("[^>]*data-e1-rel="front")/, (m, a, x, b) => a + (+x - 32) + b), /box beside it/);
      await pr('PR23 a play note with its middle value left out', 'G2-631', 1, (h) => h.split(/data-e1-mid="[^"]*">[^<]*</).join('data-e1-x="1"><'), /without its value large in the middle/);
      await pr('PR24 a corner numeral on the note\'s frame', 'G1-671', 1, (h) => h.replace(/<text x="10"( y="[0-9.]+"[^>]*data-e1-corner="1")/, (m, a) => '<text x="3"' + a), /a corner numeral touches its frame/);
      await pr('PR25 the chart squeezed to 3.5-mm steps', 'G3-632', 2, (h) => h.replace(/height="278" viewBox="0 0 ([0-9.]+) 278"/, (m, w) => `height="200" viewBox="0 0 ${w} 278"`), /a scale step/);
      await pr('PR16 the left / right labels missing', 'G1-672', 3, (h) => h.replace('data-e1-side="left"', 'data-x="1"'), /left \/ right labels/);
    } finally { await browser.close(); }
    console.log('stacks (level 1-3, copy 1, measured on what is drawn): ' + stacks.join(', '));
    console.log(`layout sweep: ${swept} distinct pages of the generator's seeds 1..${QUICK ? 30 : SEEDS} judged by each type's own verify`);
  }
  console.log('measures (pooled, ' + SEEDS + ' copies a level):');
  for (const id of IDS) for (const lv of [1, 2, 3]) { const M = pools[id + lv + 'M']; if (M && Object.keys(M).length) console.log(`  ${id} L${lv}: ` + Object.entries(M).map(([k, v]) => `${k} ${Array.isArray(v) ? v[0] + ' ' + (100 * v[1]).toFixed(1) + '%' : (100 * v).toFixed(1) + '%'}`).join('; ')); }
  console.log(plog.join('\n'));
  console.log(`poisons ${killed}/${poisons} killed`);
  ok(killed === poisons, `${poisons - killed} poisons not killed`);
  if (fails.length) { console.log('FAIL (' + fails.length + '):\n  ' + fails.slice(0, 60).join('\n  ')); process.exit(1); }
  console.log(`PASS (${assertions} assertions, ${SEEDS} seeds a level; ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, pageFaults, tellFaults, buildPage, IDS: ALL_IDS };
