#!/usr/bin/env node
/**
 * verify-e2-de-a.js — the gate of Batch DE-A (Daily Teaching System Stage E-2, 2026-11-26): the German mathematics pages
 * G1-673, G1-674, G1-675, G2-634, G2-635, G2-636 (factory types/_shared/e2-math.js, drawings e2-math-art.js, bank
 * data/e2/e2-math.js).
 *
 *   node scripts/worksheet-gen/qa/verify-e2-de-a.js [--quick] [--seeds=400] [--no-render] [--only=G1-673,...]
 *
 *   1. BANK, by the gate's OWN tables, never the bank's word: the German forms of every story thing (singular, plural,
 *      gender, the verb that takes it away) and every sentence built from them; the names; every measured thing's real
 *      length and the count of hand spans, feet or steps a six-year-old gets for it (and that a Klasse-1 child can reach
 *      it); the reference lengths word for word; the length of every picture connected with "kürzer als 1 m / etwa
 *      1 m / länger als 1 m"; the pictures (in the library, colour, not a toy for a real-size claim); every colour the
 *      drawings write.
 *   2. BUILD, --seeds copies of every type at every level, each page read from its own html (cheerio): every stamp
 *      agrees with the gate's own arithmetic, every blank has ONE value (solved over every number a child could write),
 *      every story's pictures show what its sentences say, every way in a bubble and every worked chain is the way it
 *      claims to be (and only that way), every open item's key lists every way the gate knows, the record pages carry no
 *      key value, the level's own band; the three levels differ; another locale refuses.
 *   3. TELLS, pooled: the share of 0 answers and of tasks with a 0 (G1-673); where an answer sits (the line to draw,
 *      the wrong step, the card a picture goes to); every surface of a wrong step (digits, a final 0) against the right
 *      steps (G2-635); shortcuts a child could take.
 *   4. RENDER (the print pipeline), every type x level, 2 copies: verify() (the Batch K page check, the one-right-choice
 *      check and e2VerifyInPage) and qa/lints.js clean; the stack. Then the LAYOUT SWEEP: the generator's own seeds
 *      1..SEEDS, every DISTINCT page swapped into the rendered page and judged by its type's verify.
 *   5. POISONS: each check FAILS on a bank, a page, an instruction, a pooled set or a render spoiled for it, counted only
 *      when it fails WITH ITS OWN MESSAGE; each has a control that passes (the real bank, page, instruction, set, render).
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
const B = require(path.join(WG, 'data', 'e2', 'e2-math.js'));
const ART = require(path.join(WG, 'types', '_shared', 'e2-math-art.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const NO_RENDER = process.argv.includes('--no-render');
const SEEDS = Number(arg('seeds', QUICK ? '60' : '400'));
const ALL_IDS = ['G1-673', 'G1-674', 'G1-675', 'G2-634', 'G2-635', 'G2-636'];
const IDS = arg('only', '') ? arg('only', '').split(',') : ALL_IDS;
const MODE = { 'G1-673': 'null', 'G1-674': 'wege1', 'G1-675': 'koerper', 'G2-634': 'zehner', 'G2-635': 'wege2', 'G2-636': 'mcm' };
const clone = (x) => JSON.parse(JSON.stringify(x));
const MN = '−';

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
/** the story things: German singular, plural, gender, the place sentence, the verb that takes one / several away */
const NULL_OWN = {
  vogel: { kind: 'animal', g: 'm', sg: 'Vogel', pl: 'Vögel', place: 'Auf dem Ast sitzen', goSg: 'fliegt weg', goPl: 'fliegen weg' },
  schwan: { kind: 'animal', g: 'm', sg: 'Schwan', pl: 'Schwäne', place: 'Auf dem Teich schwimmen', goSg: 'schwimmt weg', goPl: 'schwimmen weg' },
  marienkaefer: { kind: 'animal', g: 'm', sg: 'Marienkäfer', pl: 'Marienkäfer', place: 'Auf dem Blatt sitzen', goSg: 'krabbelt weg', goPl: 'krabbeln weg' },
  frosch: { kind: 'animal', g: 'm', sg: 'Frosch', pl: 'Frösche', place: 'Auf dem Stein sitzen', goSg: 'hüpft weg', goPl: 'hüpfen weg' },
  hase: { kind: 'animal', g: 'm', sg: 'Hase', pl: 'Hasen', place: 'Auf der Wiese sitzen', goSg: 'hoppelt weg', goPl: 'hoppeln weg' },
  auto: { kind: 'animal', g: 'n', sg: 'Auto', pl: 'Autos', place: 'Auf dem Parkplatz stehen', goSg: 'fährt weg', goPl: 'fahren weg' },
  keks: { kind: 'food', g: 'm', sg: 'Keks', pl: 'Kekse', place: 'Auf dem Teller liegen' },
  apfel: { kind: 'food', g: 'm', sg: 'Apfel', pl: 'Äpfel', place: 'Im Korb liegen' },
  erdbeere: { kind: 'food', g: 'f', sg: 'Erdbeere', pl: 'Erdbeeren', place: 'In der Schale liegen' },
  muffin: { kind: 'food', g: 'm', sg: 'Muffin', pl: 'Muffins', place: 'Auf dem Tablett stehen' },
};
/** the two sentences of a story, built by the gate */
function captionOwn(id, kind) {
  const o = NULL_OWN[id]; const kein = o.g === 'f' ? 'keine' : 'kein', Kein = kein[0].toUpperCase() + kein.slice(1);
  const act = o.kind === 'animal'
    ? { plus0: `Es kommt ${kein} ${o.sg} dazu.`, plusK: `Es kommen noch ${o.pl} dazu.`, minus0: `${Kein} ${o.sg} ${o.goSg}.`, minusK: `Ein paar ${o.pl} ${o.goPl}.`, all: `Alle ${o.pl} ${o.goPl}.` }
    : { plus0: `Es wird ${kein} ${o.sg} dazugelegt.`, plusK: `Es werden noch ${o.pl} dazugelegt.`, minus0: `${Kein} ${o.sg} wird gegessen.`, minusK: `Ein paar ${o.pl} werden gegessen.`, all: `Alle ${o.pl} werden gegessen.` };
  return [`${o.place} ${o.pl}.`, act[kind]];
}
/** per level: the story numbers, the tasks' largest number, the forms (zero / ordinary, which part is blank) */
const NULL_LV_OWN = { 1: { n: [2, 5], max: 6, tmax: 6, blanks: { 3: 12 } }, 2: { n: [3, 7], max: 8, tmax: 10, blanks: { 3: 6, 2: 6 } }, 3: { n: [4, 8], max: 8, tmax: 10, blanks: { 0: 6, 2: 5, 3: 1 } } };
const NAMES_OWN = { f: new Set(['Lena', 'Mia', 'Emma', 'Hannah', 'Lea', 'Sophie', 'Marie', 'Emilia', 'Lina', 'Ida', 'Elif', 'Aylin', 'Clara', 'Nele', 'Zeynep', 'Leonie']), m: new Set(['Ben', 'Paul', 'Leon', 'Finn', 'Jonas', 'Noah', 'Elias', 'Luca', 'Emil', 'Felix', 'Anton', 'Milan', 'Can', 'Yusuf', 'Tim', 'Max']) };
/** body measures of a six-to-seven-year-old in cm (hand span, shoe length, a walking step) */
const UNIT_CM_OWN = { span: [12, 16], foot: [17, 21], step: [40, 55] };
/** real lengths in cm of the measured things (the side the arrow shows), and their height above the floor (reach) */
const THING_OWN = {
  tisch: [120, 130], tischhoehe: [59, 76], heft: [21, 30], mappe: [19, 24], tafel: [200, 400], tuer: [86, 101], tuerhoehe: [199, 211],
  fensterbank: [100, 800], fensterbank1: [80, 150], teppich: [200, 300], schrank: [180, 220], zimmer: [700, 1000], zimmerkurz: [600, 800], bank: [150, 200], platte: [274, 274], flur: [200, 400],
};
const OUT_OF_REACH = new Set(['tuerhoehe', 'schrank']);   // a Klasse-1 child cannot lay hand spans up 2 m
/** the reference lengths, word for word */
const REFS_OWN = { finger: 'Fingerbreite: etwa 1 cm', lineal: 'Lineal: 30 cm', tuer: 'Türbreite: etwa 1 m' };
/** the length of every picture compared with 1 m (cm, the long side as pictured) */
const LEN_OWN = { bleistift: 18, heft: 30, buch: 25, schere: 15, loeffel: 18, schluessel: 7, schuh: 28, apfel: 8, brotdose: 20, gitarre: 100, regenschirm: 70, schlitten: 100, auto: 400, bus: 1200, kanu: 450, bett: 200, sofa: 200, surfbrett: 220 };
const lenClass = (cm) => (cm <= 45 ? 'short' : cm >= 180 ? 'long' : cm >= 90 && cm <= 110 ? 'about' : 'unclear');
const CARD_OWN = { short: 'kürzer als 1 m', about: 'etwa 1 m', long: 'länger als 1 m' };
/** the instruction phrases each type and level must hold (the strategy and its start named; the zero rule) */
const INSTR_OWN = {
  'G1-673': ['Bildgeschichten', 'Aufgabe mit dem Ergebnis'],
  'G1-674': ['7 + 8', 'Rechne jeden Weg nach'],
  'G1-675': ['Schätze zuerst', 'Miss dann nach', 'Tisch'],
  'G2-634': ['nächsten Zehner', 'ziehe vom Zehner ab', 'verliebten Zahlen'],
  'G2-635': ['den Schritt mit dem Fehler', 'Hilfsaufgabe', 'eigenen Weg'],
  'G2-636': ['Schätze zuerst', 'Metern und Zentimetern', 'Verbinde'],
};
const INSTR_LV_OWN = { 'G1-674': { 1: ['Verbinde', 'zwei Aufgaben auf deinem Weg'], 2: 'Ein Kind bekommt zwei Linien', 3: 'Oft passen mehrere Wege' }, 'G1-675': { 1: 'deine Zahl für den Tisch mit der von einem anderen Kind', 2: 'Partnerkind', 3: ['Kreuze bei jedem Ding an', 'deine Zahl für den Tisch mit der von einem anderen Kind und erkläre'] }, 'G2-635': { 1: 'dieselbe Aufgabe', 2: 'plus oder minus', 3: 'und wie viel' }, 'G2-636': { 1: 'Vergleichsgrößen', 2: 'Partnerkind', 3: 'auseinanderliegen' }, 'G1-673': { 2: 'fehlenden Zahlen', 3: 'vorne, in der Mitte oder hinten' }, 'G2-634': { 1: 'Zahlenstrahl', 2: 'Mitte', 3: 'bis 100 in zwei Schritten' } };

/* ================================================================ 1. bank */
function bankFaults(b, artSrc) {
  const f = [];
  const manifest = require(path.join(WG, 'image-cache', 'resolve.js')).manifest();
  const BW = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s|$)|\bbw \d/i;
  const picOk = (p, who) => { if (!manifest.themes[p[0]] || !manifest.themes[p[0]].nouns[p[1]]) f.push(`${who}: the picture ${p.join('/')} is not in the library`); if (BW.test(p[0])) f.push(`${who}: a black-and-white picture (${p[0]})`); };
  for (const t of b.NULL_THINGS) {
    const o = NULL_OWN[t.id];
    if (!o) { f.push(`story thing ${t.id}: not in the gate's table`); continue; }
    for (const k of ['kind', 'g', 'sg', 'pl', 'place', 'goSg', 'goPl']) if ((o[k] || null) !== (t[k] || null)) f.push(`story thing ${t.id}: ${k} "${t[k]}" (the gate: "${o[k]}")`);
    picOk(t.pic, 'story thing ' + t.id);
    if (!['branch', 'pond', 'leaf', 'stone', 'meadow', 'parking', 'plate', 'basket', 'bowl', 'tray'].includes(t.scene)) f.push(`story thing ${t.id}: no drawn place "${t.scene}"`);
  }
  if (b.NULL_THINGS.length < 6) f.push('fewer than six story things');
  for (const sx of ['f', 'm']) { for (const n of b.NAMES[sx]) if (!NAMES_OWN[sx].has(n)) f.push(`name ${n}: not in the gate's list of ${sx === 'f' ? 'girls\'' : 'boys\''} names`); if (new Set(b.NAMES[sx]).size !== b.NAMES[sx].length) f.push('a name twice'); }
  // the measured things
  const S1 = b.SETS.koerper, S2 = b.SETS.mcm;
  for (const [id, u] of Object.entries(S1.pairs)) {
    const own = THING_OWN[id], th = b.THINGS[id];
    if (!own || !th) { f.push(`measured ${id}: not in the gate's table`); continue; }
    if (th.cm[0] < own[0] || th.cm[1] > own[1]) f.push(`measured ${id}: ${th.cm} cm outside the gate's ${own}`);
    if (OUT_OF_REACH.has(id)) f.push(`measured ${id}: a Klasse-1 child cannot reach it with ${u}`);
    const U = UNIT_CM_OWN[u]; if (!U) { f.push(`measured ${id}: no unit ${u}`); continue; }
    const most = own[1] / U[0], least = own[0] / U[1], typical = (own[0] + own[1]) / (U[0] + U[1]);
    // the objective: up to about 20 hand spans, feet or steps; a thing whose TYPICAL count passes 16 has a class where many
    // children count past 20
    if (most > 25 || typical > 16) f.push(`measured ${id} in ${u}: up to ${Math.round(most)}, typically ${Math.round(typical)} (more than about 20)`);
    if (least < 1) f.push(`measured ${id} in ${u}: under one ${u}`);
  }
  for (const u of S1.units) if (!Object.values(S1.pairs).includes(u)) f.push(`the unit ${u} measures nothing`);
  if (!S1.compare || S1.compare.thing !== 'tisch' || S1.compare.unit !== 'span' || !(S1.must || []).includes('tisch')) f.push('the comparison is not the table in hand spans');
  for (const id of S2.things) {
    const own = THING_OWN[id], th = b.THINGS[id];
    if (!own || !th) { f.push(`metric ${id}: not in the gate's table`); continue; }
    if (th.cm[0] < own[0] || th.cm[1] > own[1]) f.push(`metric ${id}: ${th.cm} cm outside the gate's ${own}`);
    if (own[1] > 1000) f.push(`metric ${id}: longer than 10 m`);
    if (!!th.short !== own[1] < 100) f.push(`metric ${id}: the cm-only flag is ${!!th.short}, the gate says ${own[1] < 100}`);
    if (id === 'tuer') f.push('metric tuer: the door width is a reference length (Vergleichsgröße), not a thing to estimate');
  }
  for (const [k, txt] of Object.entries(REFS_OWN)) { if (!b.REFS[k] || b.REFS[k].de !== txt) f.push(`reference ${k}: "${b.REFS[k] && b.REFS[k].de}" (the gate: "${txt}")`); if (!b.REFS[k] || !b.REFS[k].src || b.REFS[k].src.length < 20) f.push(`reference ${k}: no source`); }
  for (const p of b.LENGTH_PICS) {
    const cm = LEN_OWN[p.id];
    if (cm == null) { f.push(`length picture ${p.id}: not in the gate's table`); continue; }
    if (lenClass(cm) !== p.ans) f.push(`length picture ${p.id}: the bank says ${p.ans}, the gate ${lenClass(cm)} (${cm} cm)`);
    if (p.pic[0] === 'toys' && p.ans !== 'short') f.push(`length picture ${p.id}: a toy picture claims a real length`);
    picOk(p.pic, 'length picture ' + p.id);
  }
  if (b.LENGTH_PICS.filter((p) => p.ans === 'short').length < 7 || b.LENGTH_PICS.filter((p) => p.ans === 'long').length < 5) f.push('too few short or long pictures');
  // the words the reviewers will read
  const X = b.TEXT;
  if (!/denselben Tisch/.test(X.mess.de.cmpHead)) f.push('the comparison does not say both children measure the SAME table');
  if (X.mess.de.whoseChoices.length !== 3 || X.mess.de.whoseChoices[2] !== 'beide etwa gleich groß') f.push('the comparison choices: mine, the other child\'s, "beide etwa gleich groß" (a body measure gives no more than "about")');
  if (X.mess.de.cardEmpty !== 'Eine Karte kann leer bleiben.') f.push(`the card line reads "${X.mess.de.cardEmpty}"`);
  if (X.zehner.headMix !== 'Ergänze zum Zehner und ziehe vom Zehner ab.') f.push(`the Zehner heading reads "${X.zehner.headMix}"`);
  if (X.wege2.headB2 !== 'In welchem Schritt steckt der Fehler? Kreuze ihn an.') f.push(`the mistake question reads "${X.wege2.headB2}"`);
  if (/falschen Schritt/.test(X.wege2.headB)) f.push('the mistake heading asks for "den falschen Schritt" (a step after the mistake is right arithmetic on a wrong number)');
  if (b.LENGTH_PICS.filter((p) => p.ans === 'about').length < 2) f.push('fewer than two pictures of about 1 m');
  if (X.wege1.headC !== '3. Rechne auf deinem Weg. Schreibe die Schritte auf.') f.push(`the own-way heading reads "${X.wege1.headC}" (it asks for the steps on every level)`);
  for (const [k, v] of Object.entries(CARD_OWN)) if (X.mess.de.cards[k] !== v) f.push(`the card ${k} reads "${X.mess.de.cards[k]}"`);
  if (X.wege2.ways.hilfs.join(' ') !== 'Ich rechne mit der Hilfsaufgabe:' || X.wege2.ways.schritt.join(' ') !== 'Ich rechne schrittweise:' || X.wege2.ways.stellen.join(' ') !== 'Ich rechne Zehner und Einer extra:') f.push('the three Klasse-2 ways are not named schrittweise / Zehner und Einer extra / Hilfsaufgabe');
  if (X.wege1.ways.zehn.chain.join('+') !== '7+3+5' || X.wege1.ways.doppel.chain.join('+') !== '7+7+1' || X.wege1.ways.tausch.chain.join('+') !== '8+2+5') f.push('the three ways for 7 + 8 are not 7 + 3 + 5, 7 + 7 + 1 and 8 + 2 + 5');
  if (!/bis zur 10/.test(X.wege1.ways.zehn.line.join(' ')) || !/verdopple/.test(X.wege1.ways.doppel.line.join(' ')) || !/tausche/.test(X.wege1.ways.tausch.line.join(' '))) f.push('a way\'s bubble does not name the way');
  // no prose celebrates zero
  const all = JSON.stringify(X);
  if (/super|toll|prima|juhu|klasse!|null ist|!/i.test(all.replace(/"[a-zA-Z]+":/g, ''))) f.push('a page string celebrates (an exclamation or praise)');
  // every colour the drawings write
  const pal = ART.PAL_E2;
  for (const m of artSrc.matchAll(/#[0-9A-Fa-f]{6}\b/g)) if (!pal.has(m[0].toUpperCase())) f.push(`a drawing colour ${m[0]} outside PAL_E2`);
  return f;
}
function instrFaults(id, lv, text) {
  const f = [];
  for (const x of INSTR_OWN[id]) if (!text.includes(x)) f.push(`${id} L${lv}: the instruction lacks "${x}"`);
  for (const lx of [].concat((INSTR_LV_OWN[id] && INSTR_LV_OWN[id][lv]) || [])) if (!text.includes(lx)) f.push(`${id} L${lv}: the level's instruction lacks "${lx}"`);
  // review round 1: the words a German teacher does not write ("rechne vom Zehner weg"; a table compared with a child)
  if (/vom Zehner weg|deinen Tisch mit einem/.test(text)) f.push(`${id} L${lv}: "${(/vom Zehner weg|deinen Tisch mit einem/.exec(text) || [''])[0]}" in the instruction`);
  if (id === 'G1-674' && lv === 1 && /eine Aufgabe auf deinem Weg/.test(text)) f.push(`${id} L1: "eine Aufgabe" while the page prints two`);
  if (/!/.test(text)) f.push(`${id} L${lv}: an exclamation in the instruction`);
  return f;
}

/* ================================================================ 2. build */
function buildPage(t, lv, seed) {
  const b = t.build({ theme: null, difficulty: lv, locale: 'de', unit: null }, { rng: makeRng(instanceSeed({ typeId: t.id, theme: null, difficulty: lv, seedEpoch: 1, variant: seed })), variant: seed, seedVariant: seed });
  return { html: b.bodyHtml, meta: b.meta };
}
const num = (x) => Number(x);
const txt = ($, e) => $(e).text().replace(/\u00ad/g, '').replace(/\s+/g, ' ').trim();
/** the tokens of a printed number sentence row: numbers, operators and boxes in order (box = { box: stamp }) */
function tokens($, rowEl) {
  const out = [];
  $(rowEl).children().each((i, c) => {
    const cls = $(c).attr('class') || '';
    if (/ws-blankbox/.test(cls)) out.push({ box: $(c).attr('data-e2-answer'), attrs: c.attribs });
    else if (/e2-op/.test(cls)) out.push(txt($, c));
    else if (/e2-big/.test(cls)) for (const w of txt($, c).split(' ')) out.push(w);
  });
  return out;
}
/** solve a sentence [x op y = z] with ONE box over every whole number 0..200: the values that make it true */
function solve(tk) {
  const isBox = (x) => x && typeof x === 'object';
  const boxes = tk.filter(isBox);
  if (boxes.length !== 1) return { err: `${boxes.length} boxes` };
  const eq = tk.indexOf('=');
  const val = (side, v) => { let acc = null, op = '+'; for (const x of side) { if (x === '+' || x === MN || x === '-') { op = x; continue; } const n = isBox(x) ? v : Number(x); if (Number.isNaN(n)) return NaN; acc = acc === null ? n : op === '+' ? acc + n : acc - n; } return acc; };
  const sols = [];
  for (let v = 0; v <= 200; v++) { const L = val(tk.slice(0, eq), v), R = val(tk.slice(eq + 1), v); if (L === R && !Number.isNaN(L)) sols.push(v); }
  return { sols, stamp: boxes[0].box };
}
/** the chain of a way: "a + b = x + y + z" -> parts */
const chainOf = (s) => { const m = /^(\d+) \+ (\d+) = (\d+) \+ (\d+) \+ (\d+)$/.exec(s); return m ? m.slice(1).map(Number) : null; };
/** which of the three ways a worked chain of a + b is, by the gate's own reading (all that apply) */
function waysOfChain(a, b, x, y, z) {
  const w = [];
  if (x + y + z !== a + b) return ['wrong-sum'];
  if (x === a && x + y === 10) w.push('zehn');
  if (x === b && b > a && x + y === 10) w.push('tausch');
  if (x === y && x === Math.min(a, b)) w.push('doppel');
  return w;
}
/** every way the gate knows for a + b (Klasse 1, within 20): the chains a key must list */
function waysOwn1(a, b) {
  const s = a + b, out = [];
  if (a !== 5) out.push(`${a} + ${10 - a} + ${s - 10}`);
  if (b !== 5) out.push(`${b} + ${10 - b} + ${s - 10}`);
  const m = Math.min(a, b), M = Math.max(a, b), d = M - m;
  // a Klasse-1 teacher's "verdoppeln" is the near double (1 or 2 apart), from the smaller or the larger number
  if (d === 1 || d === 2) { out.push(`${m} + ${m} + ${d}`); out.push(`${M} + ${M} ${MN} ${d}`); }
  if (a === 9) out.push(`10 + ${b} ${MN} 1`);
  if (b === 9) out.push(`${a} + 10 ${MN} 1`);
  if (a >= 5 && b >= 5) out.push(`5 + 5 + ${a - 5} + ${b - 5}`);
  return out;
}
/** a key that credits a way the lesson never taught: "verdoppeln" where the two numbers are more than 2 apart */
function keyCredits(a, b, key) {
  return Math.abs(a - b) > 2 && /verdoppeln/.test(key) ? [`${a} + ${b}: the key credits "verdoppeln" for numbers ${Math.abs(a - b)} apart`] : [];
}
/** the steps of a Klasse-2 way for a + b, right */
function stepsOwn(way, a, b) {
  const Za = a - a % 10, Ea = a % 10, Zb = b - b % 10, Eb = b % 10;
  if (way === 'schritt') return [[a, '+', Zb, a + Zb], [a + Zb, '+', Eb, a + b]];
  if (way === 'stellen') return [[Za, '+', Zb, Za + Zb], [Ea, '+', Eb, Ea + Eb], [Za + Zb, '+', Ea + Eb, a + b]];
  return [[a + 1, '+', b, a + 1 + b], [a + 1 + b, MN, 1, a + b]];
}
const ev = (x, o, y) => (o === '+' ? x + y : x - y);

/* ================================================================ the gate's own geometry (review round 2) */
/** the ink box of every library picture (the shared data file, read by the gate itself) */
const INK_OWN = require(path.join(WG, 'data', 'hm', 'ink-boxes.json'));
/** an SVG path (absolute M, L, H, V, Q, C, Z) as points, every curve sampled */
function pathPoints(d) {
  const tk = String(d).match(/[A-Za-z]|-?[0-9]*\.?[0-9]+(?:e-?[0-9]+)?/g) || [];
  const pts = []; let i = 0, cmd = null, cur = [0, 0];
  const n = () => { const v = Number(tk[i++]); if (!Number.isFinite(v)) throw new Error('path number'); return v; };
  while (i < tk.length) {
    if (/^[A-Za-z]$/.test(tk[i])) cmd = tk[i++];
    if (cmd === 'Z') { continue; }
    if (cmd === 'M' || cmd === 'L') { cur = [n(), n()]; pts.push(cur); }
    else if (cmd === 'H') { cur = [n(), cur[1]]; pts.push(cur); }
    else if (cmd === 'V') { cur = [cur[0], n()]; pts.push(cur); }
    else if (cmd === 'Q') { const c = [n(), n()], e = [n(), n()]; for (let k = 1; k <= 32; k++) { const t = k / 32, u = 1 - t; pts.push([u * u * cur[0] + 2 * t * u * c[0] + t * t * e[0], u * u * cur[1] + 2 * t * u * c[1] + t * t * e[1]]); } cur = e; }
    else if (cmd === 'C') { const c1 = [n(), n()], c2 = [n(), n()], e = [n(), n()]; for (let k = 1; k <= 32; k++) { const t = k / 32, u = 1 - t; pts.push([u ** 3 * cur[0] + 3 * t * u * u * c1[0] + 3 * t * t * u * c2[0] + t ** 3 * e[0], u ** 3 * cur[1] + 3 * t * u * u * c1[1] + 3 * t * t * u * c2[1] + t ** 3 * e[1]]); } cur = e; }
    else throw new Error(`path command "${cmd}" the gate does not read`);
  }
  return pts;
}
const inPoly = (pt, poly) => { let c = false; for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) { const [xa, ya] = poly[a], [xb, yb] = poly[b]; if ((ya > pt[1]) !== (yb > pt[1]) && pt[0] < ((xb - xa) * (pt[1] - ya)) / (yb - ya) + xa) c = !c; } return c; };
const segDist = (pt, poly) => { let m = Infinity; for (let a = 1; a < poly.length; a++) { const [x1, y1] = poly[a - 1], [x2, y2] = poly[a], dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy, t = L2 ? Math.max(0, Math.min(1, ((pt[0] - x1) * dx + (pt[1] - y1) * dy) / L2)) : 0; m = Math.min(m, Math.hypot(pt[0] - x1 - t * dx, pt[1] - y1 - t * dy)); } return m; };
/** the surfaces of a story picture a thing can stand on: [{ kind: 'fill'|'stroke', poly, sw }] */
function groundOf($, panel) {
  const out = [];
  panel.find('[data-e2-ground]').each((i, e) => {
    const tag = e.tagName.toLowerCase(), A = (k) => Number($(e).attr(k)), kind = $(e).attr('data-e2-ground');
    if (tag === 'rect') out.push({ kind, poly: [[A('x'), A('y')], [A('x') + A('width'), A('y')], [A('x') + A('width'), A('y') + A('height')], [A('x'), A('y') + A('height')]] });
    else if (tag === 'ellipse') out.push({ kind, poly: Array.from({ length: 96 }, (_, k) => [A('cx') + A('rx') * Math.cos((2 * Math.PI * k) / 96), A('cy') + A('ry') * Math.sin((2 * Math.PI * k) / 96)]) });
    else if (tag === 'path') out.push({ kind, poly: pathPoints($(e).attr('d')), sw: A('stroke-width') || 0 });
  });
  return out;
}
/**
 * every thing of a story picture stands ON its place: the middle of its foot (the bottom of the drawing's ink) just
 * above a surface (1.5 px under the foot lies inside it), or on a branch (within the branch's half width and 2.5 px).
 * A thing with nothing under it hangs in the air, which is how a thing that comes is drawn.
 */
function restFaults($, panel) {
  const f = [], ground = groundOf($, panel);
  if (!ground.length) return ['no place to stand on (nothing marked data-e2-ground)'];
  panel.find('image[data-e2-thing]').each((i, e) => {
    const s = Number($(e).attr('width')), ink = INK_OWN[$(e).attr('data-e2-pic')];
    if (!ink) { f.push(`no ink box for ${$(e).attr('data-e2-pic')}`); return; }
    const fx = Number($(e).attr('x')) + (ink.l + ink.w / 2) * s, fy = Number($(e).attr('y')) + (ink.t + ink.h) * s;
    const held = ground.some((g) => (g.kind === 'stroke' ? segDist([fx, fy], g.poly) <= g.sw / 2 + 2.5 : inPoly([fx, fy + 1.5], g.poly)));
    if (!held) f.push(`a ${$(e).attr('data-e2-thing')} thing at ${fx.toFixed(0)},${fy.toFixed(0)} rests on nothing`);
  });
  // a tray is flat: its top narrower at the back than at the front (a top wider at the back reads as a box)
  if (panel.find('[data-e2-scene]').attr('data-e2-scene') === 'tray') {
    const g = ground.find((x) => x.kind === 'fill');
    if (g) { const ys = g.poly.map((q) => q[1]), top = Math.min(...ys), bot = Math.max(...ys), wAt = (y) => { const xs = g.poly.filter((q) => Math.abs(q[1] - y) < 0.01).map((q) => q[0]); return Math.max(...xs) - Math.min(...xs); }; if (!(wAt(top) < wAt(bot))) f.push('a tray drawn as a box (its top as wide at the back as at the front)'); }
  }
  return f;
}

function pageFaults(id, lv, html) {
  const f = [];
  const $ = cheerio.load(html);
  const R = $('[data-dk]');
  if (R.attr('data-e2-locale') !== 'de') f.push('not a German page');
  if (+R.attr('data-e2-level') !== lv) f.push('the level stamp');
  const M = MODE[id];
  if (M === 'null') {
    const L = NULL_LV_OWN[lv];
    const cards = $('[data-e2-storycard]');
    if (cards.length !== 4) f.push(`${cards.length} stories`);
    const kinds = cards.map((i, c) => $(c).attr('data-e2-kind')).get();
    for (const k of ['plus0', 'minus0', 'all']) if (kinds.filter((x) => x === k).length !== 1) f.push(`the zero story ${k} ${kinds.filter((x) => x === k).length} times`);
    if (kinds.filter((x) => x === 'plusK' || x === 'minusK').length !== 1) f.push('not one ordinary story');
    const things = cards.map((i, c) => $(c).attr('data-e2-thing')).get();
    if (new Set(things).size !== things.length) f.push('a story thing twice');
    cards.each((i, c) => {
      const kind = $(c).attr('data-e2-kind'), th = $(c).attr('data-e2-thing'), plus = kind.startsWith('plus');
      const p1 = $(c).find('[data-e2-panel="1"]'), p2 = $(c).find('[data-e2-panel="2"]');
      const cnt = (p, s) => p.find(`[data-e2-thing="${s}"]`).length;
      const n = cnt(p1, 'stays');
      if (cnt(p1, 'crossed') || cnt(p1, 'arrives')) f.push(`story ${i + 1}: the first picture shows a change`);
      const k = plus ? cnt(p2, 'arrives') : cnt(p2, 'crossed');
      if (plus ? cnt(p2, 'stays') !== n || cnt(p2, 'crossed') : cnt(p2, 'stays') + cnt(p2, 'crossed') !== n || cnt(p2, 'arrives')) f.push(`story ${i + 1}: the second picture does not keep the first picture's ${n}`);
      if ({ plus0: k !== 0, minus0: k !== 0, all: k !== n, plusK: k < 2, minusK: k < 2 || k >= n }[kind]) f.push(`story ${i + 1}: ${kind} shows ${k} ${plus ? 'coming' : 'crossed out'}`);
      if (!!p2.find('[data-e2-comes]').length !== (plus && k > 0)) f.push(`story ${i + 1}: the arrow for the things that come`);
      if (plus && $(c).attr('data-e2-alt') !== `${k} + ${n} = ${n + k}`) f.push(`story ${i + 1}: the key does not accept the Tauschaufgabe`);
      if (p1.find(`[data-e2-pic]`).filter((j, e) => !$(e).attr('data-e2-pic').endsWith('/' + B.NULL_THINGS.find((x) => x.id === th).pic[1])).length) f.push(`story ${i + 1}: a picture not of its thing`);
      const z = plus ? n + k : n - k;
      [p1, p2].forEach((p, q) => {
        const ims = p.find('image[data-e2-thing]').map((j, e) => ({ x: +$(e).attr('x'), y: +$(e).attr('y'), s: +$(e).attr('width') })).get();
        if (ims.length > 8) f.push(`story ${i + 1}: ${ims.length} things in picture ${q + 1} (eight at most)`);
        // review round 2: every thing stands ON its place (its foot inside a surface, or on a branch), never in the air
        for (const m of restFaults($, p)) f.push(`story ${i + 1}, picture ${q + 1}: ${m}`);
        // review round 1: never overlap rows (each picture in its own place: a child counts and crosses out each one)
        ims.forEach((A, u) => ims.forEach((C, v) => { if (v > u && Math.min(A.x + A.s, C.x + C.s) - Math.max(A.x, C.x) > 0.5 && Math.min(A.y + A.s, C.y + C.s) - Math.max(A.y, C.y) > 0.5) f.push(`story ${i + 1}: two pictures overlap in picture ${q + 1}`); }));
      });
      // review round 2: picture 2 shows the first group exactly where picture 1 has it (same row, same places, same size),
      // the newcomers apart on the right, and the same place under them
      const at = (p, sel) => p.find(sel).map((j, e) => [+$(e).attr('x'), +$(e).attr('y'), +$(e).attr('width')].map((v) => v.toFixed(1)).join(',')).get().sort().join(' ');
      if (at(p1, 'image[data-e2-thing]') !== at(p2, 'image[data-e2-thing="stays"], image[data-e2-thing="crossed"]')) f.push(`story ${i + 1}: the first group in picture 2 is not where it stood in picture 1`);
      const gr = (p) => p.find('[data-e2-ground]').map((j, e) => $.html(e)).get().join('');
      if (gr(p1) !== gr(p2)) f.push(`story ${i + 1}: the place under the things differs between the two pictures`);
      if (plus && k > 0) { const right = Math.max(...p2.find('image[data-e2-thing="stays"]').map((j, e) => +$(e).attr('x') + +$(e).attr('width')).get()), first = Math.min(...p2.find('image[data-e2-thing="arrives"]').map((j, e) => +$(e).attr('x')).get()); if (first < right + 10) f.push(`story ${i + 1}: the newcomers stand among the first group`); }
      if (n < L.n[0] || n > L.n[1] || z > L.max) f.push(`story ${i + 1}: ${n} ${plus ? '+' : MN} ${k} outside the level`);
      const v = ['n', 'k', 'z'].map((x) => num($(c).find(`[data-e2-story="${x}"]`).attr('data-e2-answer')));
      if (v[0] !== n || v[1] !== k || v[2] !== z) f.push(`story ${i + 1}: the boxes ${v} (the gate: ${n}, ${k}, ${z})`);
      const ops = $(c).find('.e2-op').map((j, e) => txt($, e)).get().join('');
      if (ops !== (plus ? '+=' : MN + '=')) f.push(`story ${i + 1}: the operator printed "${ops}"`);
      const caps = [1, 2].map((q) => txt($, $(c).find(`[data-e2-caption="${q}"]`)));
      const want = captionOwn(th, kind);
      if (caps[0] !== want[0] || caps[1] !== want[1]) f.push(`story ${i + 1}: the sentences "${caps.join(' ')}" (the gate: "${want.join(' ')}")`);
      if (/\d/.test(caps.join(' '))) f.push(`story ${i + 1}: a number in the sentences (the child counts the pictures)`);
    });
    // the tasks
    const tasks = $('[data-e2-task]');
    if (tasks.length !== 12) f.push(`${tasks.length} tasks`);
    const blanks = {}; let zeroTasks = 0;
    const seen = new Set();
    tasks.each((i, bx) => {
      const tk = tokens($, $(bx).parent());
      const sv = solve(tk);
      if (sv.err) { f.push(`task ${i + 1}: ${sv.err}`); return; }
      if (sv.sols.length !== 1) f.push(`task ${i + 1}: ${sv.sols.length} values fit (${sv.sols.slice(0, 4)})`);
      else if (sv.sols[0] !== num(sv.stamp)) f.push(`task ${i + 1}: the stamp ${sv.stamp}, the gate ${sv.sols[0]}`);
      const pos = tk.findIndex((x) => x && typeof x === 'object');
      const nums = tk.map((x) => (x && typeof x === 'object' ? sv.sols[0] : x)).filter((x) => /^\d+$/.test(String(x))).map(Number);
      if (nums.some((x) => x > L.tmax)) f.push(`task ${i + 1}: a number over ${L.tmax}`);
      const blank = { 0: 0, 2: 2, 4: 3 }[pos];
      blanks[blank] = (blanks[blank] || 0) + 1;
      if (nums.includes(0)) zeroTasks++;
      const key = tk.map((x) => (x && typeof x === 'object' ? sv.sols[0] : x)).join(' ');
      if (seen.has(key)) f.push(`task ${i + 1}: twice on the page`); seen.add(key);
      if (tk[1] === MN && nums[0] - nums[1] < 0) f.push(`task ${i + 1}: a minus below zero`);
    });
    for (const [b2, n2] of Object.entries(L.blanks)) if ((blanks[b2] || 0) !== n2) f.push(`the blanks at part ${b2}: ${blanks[b2] || 0} (the level: ${n2})`);
    if (zeroTasks !== 8) f.push(`${zeroTasks} tasks with a 0 (eight)`);
  }
  if (M === 'wege1') {
    const wayCards = $('[data-e2-way]');
    if (wayCards.length !== 3) f.push(`${wayCards.length} ways`);
    const who = {};
    wayCards.each((i, c) => {
      const w = $(c).attr('data-e2-way'); who[w] = $(c).attr('data-e2-who');
      const ch = txt($, $(c).find(`[data-e2-waychain="${w}"]`));
      if (ch !== { zehn: '7 + 3 + 5', doppel: '7 + 7 + 1', tausch: '8 + 2 + 5' }[w]) f.push(`the ${w} child's way reads "${ch}"`);
      const ws = waysOfChain(7, 8, ...ch.split(' + ').map(Number));
      if (ws.length !== 1 || ws[0] !== w) f.push(`the ${w} way is read as ${ws}`);
      $(c).find('[data-e2-re]').each((j, bx) => { const k = $(bx).attr('data-e2-re'), v = num($(bx).attr('data-e2-answer')); const [x, y] = ch.split(' + ').map(Number); const want = /1$/.test(k) && k.length > w.length ? x + y : /2a$/.test(k) ? x + y : 15; if (v !== want) f.push(`the ${w} recompute box ${k} = ${v} (the gate: ${want})`); });
      if (!NAMES_OWN.f.has(who[w]) && !NAMES_OWN.m.has(who[w])) f.push(`a name the gate does not know: ${who[w]}`);
    });
    if (new Set(Object.values(who)).size !== 3) f.push('two children with one name');
    const skins = $('[data-e2-art="child"]').map((i, e) => $(e).attr('data-e2-skin')).get();
    if (new Set(skins).size !== skins.length) f.push('two children with the same skin tone');
    if (lv < 3) {
      const items = $('[data-e2-chainitem]');
      if (items.length !== (lv === 1 ? 3 : 4)) f.push(`${items.length} chains to connect`);
      const got = items.map((i, e) => $(e).attr('data-e2-match')).get();
      for (const w of ['zehn', 'doppel', 'tausch']) if (!got.includes(w)) f.push(`no chain for the ${w} child`);
      items.each((i, e) => {
        const c = chainOf(txt($, e)); if (!c) { f.push(`chain ${i + 1}: "${txt($, e)}"`); return; }
        const [a, b2, x, y, z] = c;
        const ws = waysOfChain(a, b2, x, y, z);
        if (ws.length !== 1) f.push(`chain ${a} + ${b2}: ${ws.length ? ws.join(' and ') : 'no way'} (exactly one way)`);
        else if (ws[0] !== $(e).attr('data-e2-match')) f.push(`chain ${a} + ${b2}: the stamp ${$(e).attr('data-e2-match')}, the gate ${ws[0]}`);
        if (a + b2 < 11 || a + b2 > 18) f.push(`chain ${a} + ${b2}: not over the 10 within 20`);
        if ((a === 7 && b2 === 8) || (a === 8 && b2 === 7)) f.push('a chain for 7 + 8 itself');
      });
      const tasks2 = items.map((i, e) => (chainOf(txt($, e)) || []).slice(0, 2).sort().join()).get();
      if (new Set(tasks2).size !== tasks2.length) f.push('two chains for one task');
      const tg = $('[data-e2-target]').map((i, e) => `${$(e).attr('data-e2-target')}:${txt($, e)}`).get();
      for (const w of Object.keys(who)) if (!tg.includes(`${w}:${who[w]}`)) f.push(`the target for ${w} is not ${who[w]}`);
    } else {
      const items = $('[data-e2-openitem]');
      if (items.length !== 4) f.push(`${items.length} open tasks`);
      if (items.find('[data-e2-answer]').length) f.push('an open task carries a stamp');
      items.each((i, e) => {
        const m = /^(\d+) \+ (\d+)$/.exec(txt($, $(e).find('.e2-big').first())); if (!m) { f.push(`open task ${i + 1}: unread`); return; }
        const a = +m[1], b2 = +m[2], key = $(e).attr('data-e2-key');
        for (const w of waysOwn1(a, b2)) if (!key.includes(w)) f.push(`open task ${a} + ${b2}: the key lacks ${w}`);
        f.push(...keyCredits(a, b2, key));
        if (!key.includes(`= ${a + b2}.`)) f.push(`open task ${a} + ${b2}: the key's sum`);
      });
    }
    const own = $('[data-e2-owntask]');
    if (own.length !== 2) f.push(`${own.length} tasks on the child's own way`);
    if (!/Schreibe die Schritte auf\./.test(txt($, $('[data-e2-part="C"]').parent()))) f.push('the own-way heading does not ask for the steps');
    own.each((i, e) => { const [a, b2] = $(e).attr('data-e2-owntask').split('+').map(Number); for (const w of waysOwn1(a, b2)) if (!$(e).attr('data-e2-key').includes(w)) f.push(`own task ${a} + ${b2}: the key lacks ${w}`); f.push(...keyCredits(a, b2, $(e).attr('data-e2-key')));
      // review round 1: the own way on a writing line (a printed "☐ + ☐ + ☐ = ☐" shuts out 10 + 3 − 1, 9 + 9 − 1 and Kraft der Fünf)
      if ($(e).find('.ws-blankbox').length || $(e).find('.e2-op').length || !$(e).find('[data-dk-blank]').length) f.push(`own task ${a} + ${b2}: a fixed frame instead of a writing line`); if (a + b2 < 11 || a + b2 > 18) f.push(`own task ${a} + ${b2}: not over the 10`); if ($(e).find('[data-e2-answer]').length) f.push('an own-way task carries a stamp'); });
  }
  if (M === 'koerper' || M === 'mcm') {
    const S = B.SETS[M], LV = S.levels[lv];
    const rows = $('[data-e2-row]');
    if (rows.length !== LV.rows + 1) f.push(`${rows.length} rows (${LV.rows} and one to choose)`);
    if (!$('[data-e2-row="own"]').length) f.push('no row for a thing the child chooses');
    const cols = $('[data-e2-col]').map((i, e) => $(e).attr('data-e2-col')).get();
    if (cols.join() !== LV.cols.join()) f.push(`the columns ${cols}`);
    if ($('[data-e2-table] [data-e2-answer]').length || $('[data-e2-table] [data-dk-answer]').length) f.push('the table carries a key value');
    if ($('[data-e2-record]').filter((i, e) => e.attribs['data-e2-answer'] !== undefined).length) f.push('a measurement box carries an answer');
    const ids = rows.map((i, e) => $(e).attr('data-e2-row')).get().filter((x) => x !== 'own');
    if (new Set(ids).size !== ids.length) f.push('a thing twice');
    if (M === 'koerper') {
      if (!ids.includes('tisch')) f.push('no table row (the comparison is about the table)');
      for (const id2 of ids) { if (!S.pairs[id2]) f.push(`${id2}: not a thing of the set`); if (OUT_OF_REACH.has(id2)) f.push(`${id2}: out of a child's reach`); }
      if (!LV.choose) {
        rows.each((i, e) => { const u = $(e).attr('data-e2-rowunit'), id2 = $(e).attr('data-e2-row'); if (id2 !== 'own' && u !== S.pairs[id2]) f.push(`${id2}: measured in ${u} (the set: ${S.pairs[id2]})`); });
        for (const u of S.units) if (!rows.filter((i, e) => $(e).attr('data-e2-rowunit') === u).length) f.push(`no row measured in ${u}`);
      } else if ($('[data-e2-rowunit]').length) f.push('level 3 prescribes a unit');
      const whose = $('[data-e2-whose]').length;
      if (whose !== 3) f.push(`${whose} boxes for whose hand span`);
      const whyLines = $('[data-e2-bottom="compare"] [data-dk-writerow]').length;
      if (whyLines !== 1 + (lv === 1 ? 0 : lv === 2 ? 1 : 2)) f.push(`${whyLines} writing lines under the table`);
      if (!/denselben Tisch/.test(txt($, $('[data-e2-bottom="compare"]')))) f.push('the comparison does not say the same table');
      if ($('[data-dk-answer]').length) f.push('a record page with a stamped choice');
      const whoseTxt = $('[data-e2-whose]').map((i, e) => txt($, $(e).next())).get();
      if (whoseTxt[2] !== 'beide etwa gleich groß') f.push(`the third choice reads "${whoseTxt[2]}"`);
      if (ids.includes('fensterbank')) f.push('the whole Fensterbank in hand spans (a window front is 5-8 m)');
    } else {
      for (const id2 of ids) { if (!S.things.includes(id2)) f.push(`${id2}: not a thing of the set`); if (id2 === 'tuer') f.push('the door width in the table (it is a reference length)'); }
      const refs = $('[data-e2-ref]').map((i, e) => $(e).attr('data-e2-ref')).get();
      if (refs.join() !== LV.refs.join()) f.push(`the references ${refs}`);
      $('[data-e2-ref]').each((i, e) => { if (txt($, e) !== REFS_OWN[$(e).attr('data-e2-ref')]) f.push(`the reference reads "${txt($, e)}"`); });
      // the conversions
      const conv = $('[data-e2-conv]').map((i, e) => { const tk = tokens($, $(e).parent()); return tk.map((x) => (x && typeof x === 'object' ? '[' + x.box + ']' : x)).join(' '); }).get();
      const want = { 1: ['1 m = [100]'], 2: ['1 m = [100]', '2 m = [200]'], 3: ['1 m = [100]', '1 m 50 cm = [150]', '300 cm = [3]'] }[lv];
      if (conv.join('|') !== want.join('|')) f.push(`the conversions ${conv.join(' | ')}`);
      // the pictures to connect
      const pics = $('[data-e2-sortpic]');
      if (pics.length !== (lv === 1 ? 6 : 8)) f.push(`${pics.length} pictures to connect`);
      const cards = $('[data-e2-target]').map((i, e) => $(e).attr('data-e2-target')).get();
      if (cards.join() !== (lv === 1 ? 'short,long' : 'short,about,long')) f.push(`the cards ${cards}`);
      $('[data-e2-target]').each((i, e) => { if (txt($, e) !== CARD_OWN[$(e).attr('data-e2-target')]) f.push(`a card reads "${txt($, e)}"`); });
      const got = [];
      pics.each((i, e) => { const pid = $(e).attr('data-e2-picid'), cm = LEN_OWN[pid], m2 = $(e).attr('data-e2-match'); got.push(pid); if (cm == null) f.push(`picture ${pid}: not in the gate's table`); else if (lenClass(cm) !== m2) f.push(`picture ${pid}: the stamp ${m2}, the gate ${lenClass(cm)}`); if (!cards.includes(m2)) f.push(`picture ${pid}: its card is not on the page`); });
      if (new Set(got).size !== got.length) f.push('a picture twice');
      if (pics.filter((i, e) => $(e).attr('data-e2-match') === 'about').length > 2) f.push('three pictures of about 1 m');
      const empty = $('[data-e2-cardempty]');
      if (lv === 1 ? empty.length : empty.length !== 1 || txt($, empty) !== 'Eine Karte kann leer bleiben.') f.push(`the line that a card may stay empty: ${empty.length ? '"' + txt($, empty) + '"' : 'missing'} on level ${lv}`);
      // review round 1: every estimate the same frame "☐ m ☐ cm" (a "☐ cm" frame tells the child the thing is under 1 m)
      rows.each((i, e) => { for (const c of ['est', 'meas', 'partner']) { const bx = $(e).find(`[data-e2-record="${c}"]`); if (!LV.cols.includes(c)) continue; if (bx.length !== 2 || !/^m$/.test(txt($, bx.first().next())) || txt($, bx.last().next()) !== 'cm') f.push(`row ${$(e).attr('data-e2-row')}: the ${c} frame is not "☐ m ☐ cm"`); } });
      for (const s of ['short', 'long']) if (!pics.filter((i, e) => $(e).attr('data-e2-match') === s).length) f.push(`no picture ${s} than 1 m`);
      if (got.some((p) => ids.includes(p))) f.push('a sort picture is a thing of the table');
    }
  }
  if (M === 'zehner') {
    if (/vom Zehner weg/.test(txt($, $.root()))) f.push('"rechne vom Zehner weg" on the page');
    if (!txt($, $.root()).includes('Ergänze zum Zehner und ziehe vom Zehner ab.')) f.push('the heading is not "Ergänze zum Zehner und ziehe vom Zehner ab."');
    const want = { 1: { E: 4, A: 4, A2: 0 }, 2: { E: 4, A: 3, A2: 3 }, 3: { E: 2, A: 2, A2: 2 } }[lv];
    const cards = $('[data-e2-zcard]');
    const kinds = {}; cards.each((i, c) => { kinds[$(c).attr('data-e2-zkind')] = (kinds[$(c).attr('data-e2-zkind')] || 0) + 1; });
    for (const [k, n] of Object.entries(want)) if ((kinds[k] || 0) !== n) f.push(`${kinds[k] || 0} tasks of kind ${k} (${n})`);
    const digits = {};
    cards.each((i, c) => {
      const kind = $(c).attr('data-e2-zkind');
      const main = $(c).find('[data-e2-z="main"]'), help = $(c).find('[data-e2-z="helper"]');
      if (main.length !== 1 || help.length !== 1) { f.push(`task ${i + 1}: ${main.length} main and ${help.length} heart boxes`); return; }
      const tk = tokens($, main.parent()), sv = solve(tk);
      if (sv.err || sv.sols.length !== 1 || sv.sols[0] !== num(sv.stamp)) f.push(`task ${i + 1}: the box ${sv.stamp}, the gate ${sv.sols}`);
      const ht = tokens($, help.parent()), hs = solve(ht);
      if (hs.err || hs.sols.length !== 1 || hs.sols[0] !== num(hs.stamp)) f.push(`task ${i + 1}: the heart box ${hs.stamp}, the gate ${hs.sols}`);
      const vals = tk.map((x) => (x && typeof x === 'object' ? sv.sols[0] : x));
      const [x, o, y, , z] = vals.map((v) => (/^\d+$/.test(String(v)) ? Number(v) : v));
      const hv = ht.map((x2) => (x2 && typeof x2 === 'object' ? hs.sols[0] : x2)).map((v) => (/^\d+$/.test(String(v)) ? Number(v) : v));
      if (kind === 'E') {
        if (o !== '+' || x % 10 === 0 || z !== Math.ceil(x / 10) * 10 || tk.findIndex((q) => q && typeof q === 'object') !== 2) f.push(`task ${i + 1}: not "a + _ = the next ten" (${vals.join(' ')})`);
        if (hv.join(' ') !== `${x % 10} + ${y} = 10`) f.push(`task ${i + 1}: the heart task ${hv.join(' ')} (the gate: ${x % 10} + ${y} = 10)`);
        digits[kind + (x % 10)] = (digits[kind + (x % 10)] || 0) + 1;
      } else {
        if (o !== MN || x % 10 !== 0 || x < 20 || x > 100 || y < 1 || y > 9) f.push(`task ${i + 1}: not a ten minus a one-digit number (${vals.join(' ')})`);
        if (kind === 'A' && tk.findIndex((q) => q && typeof q === 'object') !== 4) f.push(`task ${i + 1}: the blank is not the result`);
        if (kind === 'A2' && tk.findIndex((q) => q && typeof q === 'object') !== 2) f.push(`task ${i + 1}: the blank is not the middle`);
        if (hv.join(' ') !== `10 ${MN} ${y} = ${10 - y}`) f.push(`task ${i + 1}: the heart task ${hv.join(' ')} (the gate: 10 ${MN} ${y} = ${10 - y})`);
        digits[kind + y] = (digits[kind + y] || 0) + 1;
      }
      if ([x, y, z].some((v) => typeof v === 'number' && v > 100)) f.push(`task ${i + 1}: over 100`);
      const ln = $(c).find('[data-e2-art="tens-line"]');
      if (lv === 1) {
        if (!ln.length) f.push(`task ${i + 1}: no number line on level 1`);
        else {
          const from = +ln.attr('data-e2-from'), mark = +ln.find('[data-e2-mark]').attr('data-e2-mark');
          const ten = kind === 'E' ? z : x;
          if (from !== ten - 10) f.push(`task ${i + 1}: the number line from ${from} (the gate: ${ten - 10})`);
          if (mark !== (kind === 'E' ? x : x)) f.push(`task ${i + 1}: the number line marks ${mark}`);
          const labels = ln.find('[data-e2-tenlabel]').map((j, e) => +$(e).attr('data-e2-tenlabel')).get().join();
          if (labels !== `${ten - 10},${ten}`) f.push(`task ${i + 1}: the tens printed ${labels}`);
          if (ln.find('[data-e2-tick]').length !== 11) f.push(`task ${i + 1}: ${ln.find('[data-e2-tick]').length} ticks`);
        }
      } else if (ln.length) f.push(`task ${i + 1}: a number line on level ${lv}`);
    });
    if (Object.values(digits).some((n) => n > 1)) f.push('two tasks of one kind with the same one-digit number');
    const tensOf = cards.map((i, c) => $(c).attr('data-e2-zkind') + ':' + $(c).attr('data-e2-zt')).get();
    if (new Set(tensOf).size !== tensOf.length) f.push('two tasks of one kind on the same ten');
    const hc = $('[data-e2-hundred]');
    if (hc.length !== (lv === 3 ? 2 : 0)) f.push(`${hc.length} two-step tasks to 100`);
    hc.each((i, c) => {
      const a = +$(c).attr('data-e2-ha'), T10 = Math.ceil(a / 10) * 10;
      const v = [1, 2, 3].map((k) => num($(c).find(`[data-e2-h="${k}"]`).attr('data-e2-answer')));
      if (v.join() !== [T10 - a, 100 - T10, 100 - a].join()) f.push(`two-step ${a}: the boxes ${v} (the gate: ${T10 - a}, ${100 - T10}, ${100 - a})`);
      [1, 2, 3].forEach((k) => { const sv = solve(tokens($, $(c).find(`[data-e2-h="${k}"]`).parent())); if (sv.sols.length !== 1) f.push(`two-step ${a} line ${k}: ${sv.sols.length} values`); });
      if (a % 10 === 0 || T10 === 100) f.push(`two-step ${a}: not below a ten under 100`);
    });
  }
  if (M === 'wege2') {
    const m = /^(\d+) \+ (\d+)$/.exec(txt($, $('[data-e2-anchor]')));
    if (!m) { f.push('no anchor task'); return f; }
    const a = +m[1], b2 = +m[2];
    if (a % 10 !== 9 || b2 % 10 < 3 || b2 % 10 > 6 || b2 < 13 || a + b2 > 99) f.push(`the anchor ${a} + ${b2} is not "x9 + a number with 3-6 ones" within 100`);
    const wayCards = $('[data-e2-way]');
    if (wayCards.length !== 3) f.push(`${wayCards.length} ways`);
    wayCards.each((i, c) => {
      const w = $(c).attr('data-e2-way');
      const ch = $(c).find('.e2-chain').map((j, e) => txt($, e)).get().join(' ');
      const want = { schritt: `${a} + ${b2 - b2 % 10} + ${b2 % 10}`, stellen: `${a - a % 10} + ${b2 - b2 % 10} und ${a % 10} + ${b2 % 10}`, hilfs: `${a + 1} + ${b2} ${MN} 1` }[w];
      if (ch !== want) f.push(`the ${w} child's way reads "${ch}" (the gate: "${want}")`);
      const own = stepsOwn(w, a, b2);
      $(c).find('[data-e2-re]').each((j, bx) => {
        const k = $(bx).attr('data-e2-re').slice(w.length), v = num($(bx).attr('data-e2-answer'));
        let wantV;
        if (k === '') wantV = a + b2;
        else { const st = own[+k[0] - 1]; wantV = k.length === 1 ? st[3] : k[1] === 'a' || k[1] === 'x' ? st[0] : st[2]; }
        if (v !== wantV) f.push(`the ${w} recompute box ${k || 'sum'} = ${v} (the gate: ${wantV})`);
      });
    });
    // level 3 (review round 1): each child's way step by step, every number left out (the Hilfsaufgabe's "− 1" printed)
    if (lv === 3) wayCards.each((i, c) => {
      const w = $(c).attr('data-e2-way'), bx = $(c).find('[data-e2-re]');
      const want = { schritt: 6, stellen: 9, hilfs: 5 }[w];
      if (bx.length !== want) f.push(`the ${w} child's steps: ${bx.length} boxes (${want}: every number left out)`);
      if (w === 'hilfs' && !/−\s?1\s?=/.test(txt($, bx.last().parent()))) f.push('the Hilfsaufgabe\'s step back does not print "− 1"');
      // review round 2: a "+" step written as its Tauschaufgabe is right too; a "−" step has no Tauschaufgabe
      stepsOwn(w, a, b2).forEach(([x, o, y, z], k) => { const fb = $(c).find(`[data-e2-re="${w}${k + 1}x"]`), alt = fb.attr('data-e2-alt'); if (o === '+' ? alt !== `${y} + ${x} = ${z}` : alt !== undefined) f.push(`the ${w} child's step ${k + 1}: the key ${o === '+' ? 'does not accept ' + y + ' + ' + x + ' = ' + z : 'accepts a swapped subtraction'}`); });
    });
    else if (lv < 3 && $('[data-e2-re$="x"]').length) f.push(`blank steps on level ${lv}`);
    // the way with the mistake
    const E = $('[data-e2-errway]');
    if (E.length !== 1) { f.push('no way with a mistake'); return f; }
    if (txt($, $('[data-e2-errquestion]')) !== 'In welchem Schritt steckt der Fehler? Kreuze ihn an.') f.push(`the mistake question reads "${txt($, $('[data-e2-errquestion]'))}"`);
    if (/falschen Schritt/.test(txt($, $.root()))) f.push('the page asks for "den falschen Schritt"');
    const ew = E.attr('data-e2-errway'), fa = +E.attr('data-e2-fa'), fb = +E.attr('data-e2-fb');
    if (lv === 1 ? fa !== a || fb !== b2 : fa === a && fb === b2) f.push(`the mistake task ${fa} + ${fb} (level ${lv} ${lv === 1 ? 'repeats' : 'differs from'} the anchor)`);
    const steps = E.find('[data-e2-errstep]').map((i, e) => { const s = txt($, $(e).next()); const q = /^(\d+) ([+−]) (\d+) = (\d+)$/.exec(s); return q ? { x: +q[1], o: q[2], y: +q[3], z: +q[4], stamp: $(e).attr('data-dk-answer') } : { bad: s }; }).get();
    if (steps.some((s) => s.bad)) f.push(`an unread step "${steps.find((s) => s.bad).bad}"`);
    else {
      const own = stepsOwn(ew, fa, fb);
      if (steps.length !== own.length) f.push(`${steps.length} steps for ${ew}`);
      // the wrong steps by the gate's reading: a false equation, or (Hilfsaufgabe) the correction the wrong way
      const wrong = steps.map((s, k) => (ev(s.x, s.o, s.y) !== s.z) || (ew === 'hilfs' && k === 1 && s.o === '+'));
      if (wrong.filter(Boolean).length !== 1) f.push(`${wrong.filter(Boolean).length} wrong steps (exactly one)`);
      const at = wrong.indexOf(true);
      steps.forEach((s, k) => { if ((s.stamp === 'right') !== (k === at)) f.push(`step ${k + 1}: the stamp ${s.stamp}`); });
      // the rest is computed right FROM the wrong step: each step after it starts with what came before
      if (ew === 'schritt' && steps[1] && steps[1].x !== steps[0].z) f.push('the second step does not start with the first result');
      if (ew === 'hilfs' && steps[1] && steps[1].x !== steps[0].z) f.push('the correction does not start with the Hilfsaufgabe\'s result');
      if (ew === 'stellen' && steps[2] && (steps[2].x !== steps[0].z || steps[2].y !== steps[1].z)) f.push('the last step does not add the two results');
      if (ew === 'stellen' && (steps[0].x !== fa - fa % 10 || steps[0].y !== fb - fb % 10 || steps[1].x !== fa % 10 || steps[1].y !== fb % 10)) f.push('the Zehner-und-Einer steps are not the tens and the ones');
      if (ew === 'schritt' && (steps[0].x !== fa || steps[0].y !== fb - fb % 10 || steps[1].y !== fb % 10)) f.push('the schrittweise steps are not the tens then the ones');
      if (ew === 'hilfs' && (steps[0].x !== fa + 1 || steps[0].y !== fb || steps[1].y !== 1)) f.push('the Hilfsaufgabe is not one more and one back');
      // a typical mistake: a ten lost, the correction the wrong way, or the middle step um eins verzählt
      if (at >= 0) {
        const s = steps[at], tru = ev(s.x, s.o, s.y);
        const kind = ew === 'hilfs' && at === 1 ? (s.o === '+' ? 'direction' : 'x') : s.z === tru - 10 ? 'ten-lost' : Math.abs(s.z - tru) === 1 && ew === 'stellen' && at === 1 ? 'off-by-one' : 'other';
        if (!['ten-lost', 'direction', 'off-by-one'].includes(kind)) f.push(`the mistake ${s.x} ${s.o} ${s.y} = ${s.z} is not a typical one`);
        const fx = E.attr('data-e2-fix'), right = own[at];
        if (fx !== `${right[0]} ${right[1]} ${right[2]} = ${right[3]}`) f.push(`the correction "${fx}" (the gate: ${right.join(' ')})`);
      }
      if (num(E.find('[data-e2-fixresult]').attr('data-e2-answer')) !== fa + fb) f.push('the right result of the mistake task');
    }
    // the Hilfsaufgabe tasks
    const H = $('[data-e2-hilfs]');
    if (H.length !== 2) f.push(`${H.length} Hilfsaufgabe tasks`);
    const ops = H.map((i, c) => $(c).attr('data-e2-ho')).get().sort().join();
    if (ops !== (lv === 1 ? 'plus,plus' : 'minus,plus')) f.push(`the Hilfsaufgabe tasks are ${ops}`);
    if (new Set(H.map((i, c) => $(c).attr('data-e2-hy')).get()).size !== H.length) f.push('two Hilfsaufgabe tasks with the same second number');
    H.each((i, c) => {
      const x = +$(c).attr('data-e2-hx'), o = $(c).attr('data-e2-ho') === 'plus' ? '+' : MN, y = +$(c).attr('data-e2-hy');
      const up = Math.ceil(y / 10) * 10, dn = up - y, r1 = ev(x, o, up), res = ev(x, o, y), back = o === '+' ? MN : '+';
      if (lv < 3 ? y % 10 !== 9 : y % 10 < 8) f.push(`Hilfsaufgabe ${x} ${o} ${y}: the second number does not end in ${lv < 3 ? 9 : '8 or 9'}`);
      if (o === '+' ? (x % 10) + (y % 10) < 10 || res > 99 : (x % 10) >= (y % 10) || res < 1) f.push(`Hilfsaufgabe ${x} ${o} ${y}: no ten to cross, or out of range`);
      const box = (k) => $(c).find(`[data-e2-hs="${k}"]`);
      const v = (k) => box(k).attr('data-e2-answer');
      if (num(v('res')) !== res || num(v('1')) !== r1 || num(v('2a')) !== r1 || num(v('2')) !== res) f.push(`Hilfsaufgabe ${x} ${o} ${y}: the boxes ${['res', '1', '2a', '2'].map(v)} (the gate: ${res}, ${r1}, ${r1}, ${res})`);
      const printedUp = tokens($, box('1').parent()).filter((q) => /^\d+$/.test(q)).map(Number);
      if (printedUp.join() !== `${x},${up}`) f.push(`Hilfsaufgabe ${x} ${o} ${y}: the helper task prints ${printedUp}`);
      if (lv >= 2) { if (v('sign') !== back) f.push(`Hilfsaufgabe ${x} ${o} ${y}: the sign box ${v('sign')} (the gate: ${back})`); } else if (box('sign').length) f.push('a sign box on level 1');
      if (lv === 3) { if (num(v('amount')) !== dn) f.push(`Hilfsaufgabe ${x} ${o} ${y}: the amount ${v('amount')} (the gate: ${dn})`); } else if (box('amount').length) f.push(`an amount box on level ${lv}`);
      // the Tauschaufgabe of a "+" correction is right too: the key says so
      if (o === MN && $(c).attr('data-e2-alt') !== `${dn} + ${r1} = ${res}`) f.push(`Hilfsaufgabe ${x} − ${y}: the key does not accept ${dn} + ${r1} = ${res}`);
    });
    const own = $('[data-e2-owntask]');
    if (own.length !== (lv === 1 ? 1 : 2)) f.push(`${own.length} own-way tasks`);
    own.each((i, e) => { const q = /^(\d+)([+-])(\d+)$/.exec($(e).attr('data-e2-owntask')); const r = q[2] === '+' ? +q[1] + +q[3] : +q[1] - +q[3]; if (!$(e).attr('data-e2-key').includes(`= ${r}.`)) f.push(`own task ${q[0]}: the key's result`); if (r < 1 || r > 99) f.push(`own task ${q[0]}: out of range`); });
  }
  return f;
}

/* ================================================================ 3. tells (pooled) */
function collect(id, lv, html, acc) {
  const $ = cheerio.load(html), M = MODE[id];
  if (M === 'null') {
    $('[data-e2-task]').each((i, bx) => { const tk = tokens($, $(bx).parent()); const ans = num($(bx).attr('data-e2-answer')); const hasZero = tk.some((x) => x === '0'); const vals = tk.map((x) => (x && typeof x === 'object' ? String(ans) : x)); (acc.tasks = acc.tasks || []).push({ pos: i, ans, hasZero, res0: vals[vals.length - 1] === '0', blank: tk.findIndex((x) => x && typeof x === 'object') }); });
    $('[data-e2-storycard]').each((i, c) => (acc.stories = acc.stories || []).push({ pos: i, kind: $(c).attr('data-e2-kind') }));
  }
  if (M === 'wege1') {
    const names = $('[data-e2-target]').map((i, e) => $(e).attr('data-e2-target')).get();
    $('[data-e2-chainitem]').each((i, e) => (acc.lines = acc.lines || []).push({ row: i, target: names.indexOf($(e).attr('data-e2-match')), way: $(e).attr('data-e2-match'), a: +(chainOf(txt($, e)) || [0])[0], b: +(chainOf(txt($, e)) || [0, 0])[1], last: +(chainOf(txt($, e)) || [0, 0, 0, 0, 0])[4] }));
  }
  if (M === 'wege2') {
    const E = $('[data-e2-errway]');
    const steps = E.find('[data-e2-errstep]').map((i, e) => { const q = /^(\d+) ([+−]) (\d+) = (\d+)$/.exec(txt($, $(e).next())); return { wrong: $(e).attr('data-dk-answer') === 'right', z: q ? +q[4] : 0, x: q ? +q[1] : 0 }; }).get();
    (acc.err = acc.err || []).push({ n: steps.length, at: steps.findIndex((s) => s.wrong), way: E.attr('data-e2-errway') });
    for (const s of steps) (acc.steps = acc.steps || []).push(s);
  }
  if (M === 'mcm') $('[data-e2-sortpic]').each((i, e) => (acc.sort = acc.sort || []).push({ pos: i, ans: $(e).attr('data-e2-match') }));
  if (M === 'zehner') $('[data-e2-zcard]').each((i, c) => (acc.z = acc.z || []).push({ pos: i, kind: $(c).attr('data-e2-zkind') }));
}
function tellFaults(id, lv, acc) {
  const f = [], M = {};
  const share = (arr, fn) => (arr.length ? arr.filter(fn).length / arr.length : NaN);
  const MODEID = MODE[id];
  if (MODEID === 'null') {
    const T = acc.tasks || [];
    if (!T.length) return { f: ['nothing to judge: found 0 tasks'], M };
    M['answers that are 0'] = share(T, (x) => x.ans === 0);
    M['tasks with a 0'] = share(T, (x) => x.hasZero || x.ans === 0);
    M['results (after =) that are 0'] = share(T, (x) => x.res0);
    { const S0 = acc.stories || []; M['stories with a 0'] = share(S0, (x) => ['plus0', 'minus0', 'all'].includes(x.kind)); M['story results that are 0'] = share(S0, (x) => x.kind === 'all'); }
    M['"write 0 when the task has a 0" right'] = share(T.filter((x) => x.hasZero), (x) => x.ans === 0);
    M['"write the other number when the task has a 0" right'] = share(T.filter((x) => x.hasZero), (x) => x.ans !== 0);
    const want0 = { 1: [0.12, 0.22], 2: [0.2, 0.3], 3: [0.28, 0.38] }[lv];
    if (!(M['answers that are 0'] >= want0[0] && M['answers that are 0'] <= want0[1])) f.push(`answers that are 0: ${(100 * M['answers that are 0']).toFixed(1)}% (the level's ${want0.map((x) => x * 100)}%)`);
    if (M['"write 0 when the task has a 0" right'] > 0.5) f.push('"write 0 when the task has a 0" is right more than half the time');
    // a 0 answer sits anywhere: per position of the twelve
    for (let p = 0; p < 12; p++) { const at = T.filter((x) => x.pos === p); const s = share(at, (x) => x.ans === 0); if (at.length >= 100 && Math.abs(s - M['answers that are 0']) > 0.12) f.push(`place ${p + 1} holds a 0 answer ${(100 * s).toFixed(1)}%`); }
    const S = acc.stories || [];
    for (let p = 0; p < 4; p++) { const at = S.filter((x) => x.pos === p); const s = share(at, (x) => x.kind === 'plusK' || x.kind === 'minusK'); if (at.length >= 100 && Math.abs(s - 0.25) > 0.1) f.push(`story ${p + 1} is the ordinary one ${(100 * s).toFixed(1)}%`); }
  }
  if (MODEID === 'wege1' && lv < 3) {
    const L = acc.lines || [];
    if (!L.length) return { f: ['nothing to judge: found 0 lines'], M };
    M['line straight across'] = share(L, (x) => x.row === x.target);
    if (M['line straight across'] > 0.45) f.push(`the line goes straight across ${(100 * M['line straight across']).toFixed(1)}%`);
    for (let r = 0; r < 4; r++) for (const w of ['zehn', 'doppel', 'tausch']) { const at = L.filter((x) => x.row === r); if (at.length < 100) continue; const s = share(at, (x) => x.way === w); if (s > 0.55) f.push(`row ${r + 1} holds the ${w} chain ${(100 * s).toFixed(1)}%`); }
    // a guesser without the ways: "the larger number first -> erst bis zur 10"
    M['"larger first -> Lena" right'] = share(L.filter((x) => x.a > x.b), (x) => x.way === 'zehn');
    M['"smaller first -> not Lena" right'] = share(L.filter((x) => x.a < x.b), (x) => x.way !== 'zehn');
    // the doubling chain always ends in 1 or 2 (its two numbers are neighbours or one apart): reported, not judged, since
    // its two equal numbers show the way as plainly
    { const P = L.filter((x) => x.way === 'doppel'), N = L.filter((x) => x.way !== 'doppel'); M['cue "ends in 1 or 2 -> doubling": balanced accuracy'] = (share(P, (x) => x.last <= 2) + share(N, (x) => x.last > 2)) / 2; }
    // balanced accuracy of the cue "the larger number first -> erst bis zur 10" (a child who does not read the chain)
    { const P = L.filter((x) => x.way === 'zehn'), N = L.filter((x) => x.way !== 'zehn'); const ba = (share(P, (x) => x.a > x.b) + share(N, (x) => x.a < x.b)) / 2; M['cue "larger first -> Lena": balanced accuracy'] = ba; if (ba > 0.6) f.push(`the order of the task's numbers names the child: balanced accuracy ${(100 * ba).toFixed(1)}%`); }
  }
  if (MODEID === 'wege2') {
    const E = acc.err || [];
    if (!E.length) return { f: ['nothing to judge: found 0 ways with a mistake'], M };
    M['wrong step first'] = share(E, (x) => x.at === 0);
    M['wrong step last'] = share(E, (x) => x.at === x.n - 1);
    M['wrong step in the middle'] = share(E, (x) => x.at > 0 && x.at < x.n - 1);
    if (M['wrong step first'] > 0.55 || M['wrong step last'] > 0.55) f.push(`the wrong step sits ${M['wrong step first'] > 0.55 ? 'first' : 'last'} ${(100 * Math.max(M['wrong step first'], M['wrong step last'])).toFixed(1)}%`);
    const three = E.filter((x) => x.n === 3);
    if (three.length >= 50) { for (let k = 0; k < 3; k++) { const s = share(three, (x) => x.at === k); if (s < 0.2 || s > 0.48) f.push(`in a three-step way the wrong step is step ${k + 1} ${(100 * s).toFixed(1)}%`); } }
    const S = acc.steps || [];
    const dig = (z) => String(z).length;
    const wr = S.filter((s) => s.wrong), rt = S.filter((s) => !s.wrong);
    for (const [name, fn] of [['a one-digit result', (s) => dig(s.z) === 1], ['a result ending in 0', (s) => s.z % 10 === 0], ['a three-digit result', (s) => dig(s.z) === 3]]) {
      const pw = share(wr, fn), pr = share(rt, fn);
      M[name + ' on a wrong / a right step'] = [`${(100 * pw).toFixed(1)}% /`, pr];
      if (pw > 0 && pr === 0) f.push(`${name} only on wrong steps (${(100 * pw).toFixed(1)}%)`);
      if (pw - pr > 0.25) f.push(`${name}: wrong ${(100 * pw).toFixed(1)}%, right ${(100 * pr).toFixed(1)}%`);
    }
  }
  if (MODEID === 'mcm') {
    const S = acc.sort || [];
    if (!S.length) return { f: ['nothing to judge: found 0 pictures'], M };
    M['most common card'] = Math.max(...['short', 'about', 'long'].map((c) => share(S, (x) => x.ans === c)));
    for (let p = 0; p < 8; p++) { const at = S.filter((x) => x.pos === p); if (at.length < 100) continue; for (const c of ['short', 'long']) { const s = share(at, (x) => x.ans === c), all = share(S, (x) => x.ans === c); if (Math.abs(s - all) > 0.12) f.push(`picture ${p + 1} goes to ${c} ${(100 * s).toFixed(1)}% (all: ${(100 * all).toFixed(1)}%)`); } }
  }
  if (MODEID === 'zehner') {
    const Z = acc.z || [];
    for (let p = 0; p < 10; p++) { const at = Z.filter((x) => x.pos === p); if (at.length < 100) continue; const s = share(at, (x) => x.kind === 'E'), all = share(Z, (x) => x.kind === 'E'); if (Math.abs(s - all) > 0.12) f.push(`place ${p + 1} holds an ergänzen task ${(100 * s).toFixed(1)}%`); }
  }
  return { f, M };
}
const levelSig = (html) => { const c = {}; for (const m of html.matchAll(/data-e2-([a-z]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; const words = cheerio.load(html)('[data-dk]').text().replace(/[0-9]+/g, '#').replace(/\s+/g, ' '); return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])) + '|' + crypto.createHash('sha1').update(words).digest('hex').slice(0, 8); };

async function main() {
  const t0 = Date.now();
  const artSrc = fs.readFileSync(path.join(WG, 'types', '_shared', 'e2-math-art.js'), 'utf8');
  // ---- 1. bank
  const bf = bankFaults(B, artSrc);
  ok(!bf.length, 'bank: ' + bf.slice(0, 12).join(' | '));
  const P = (name, mut, re, src = artSrc) => { const b = clone(B); mut(b); judge(name, bankFaults(b, src), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 "keine Erdbeere" made "kein Erdbeere" (the gender)', (b) => { find(b.NULL_THINGS, 'erdbeere').g = 'm'; }, /story thing erdbeere: g/);
  P('PB2 "Frosche" for Frösche', (b) => { find(b.NULL_THINGS, 'frosch').pl = 'Frosche'; }, /story thing frosch: pl/);
  P('PB3 a hare that "hüpft"', (b) => { find(b.NULL_THINGS, 'hase').goSg = 'hüpft weg'; }, /story thing hase: goSg/);
  P('PB4 a story thing drawn from a black-and-white theme', (b) => { find(b.NULL_THINGS, 'keks').pic = ['bakery bw', 'cookie']; }, /black-and-white|not in the library/);
  P('PB5 a name the gate does not know', (b) => { b.NAMES.f.push('Kevinia'); }, /name Kevinia/);
  P('PB6 the door height measured in hand spans (out of reach)', (b) => { b.SETS.koerper.pairs.tuerhoehe = 'span'; }, /cannot reach/);
  P('PB7 the classroom in hand spans (far more than 20)', (b) => { b.SETS.koerper.pairs.zimmerkurz = 'span'; }, /more than about 20/);
  P('PB20 the classroom\'s long side in steps (up to 25)', (b) => { b.SETS.koerper.pairs.zimmer = 'step'; }, /measured zimmer in step: up to 25/);
  P('PB8 the Heft at 50 cm', (b) => { b.THINGS.heft.cm = [21, 50]; }, /heft: 21,50 cm outside/);
  P('PB9 the door width as a thing to estimate', (b) => { b.SETS.mcm.things.push('tuer'); }, /door width is a reference/);
  P('PB10 the reference "Lineal: 20 cm"', (b) => { b.REFS.lineal.de = 'Lineal: 20 cm'; }, /reference lineal/);
  P('PB11 a reference without its source', (b) => { b.REFS.tuer.src = ''; }, /reference tuer: no source/);
  P('PB12 the guitar called "kürzer als 1 m"', (b) => { find(b.LENGTH_PICS, 'gitarre').ans = 'short'; }, /gitarre: the bank says short/);
  P('PB13 a toy car for "länger als 1 m"', (b) => { find(b.LENGTH_PICS, 'auto').pic = ['toys', 'car']; }, /a toy picture claims a real length/);
  P('PB14 the comparison on two different tables', (b) => { b.TEXT.mess.de.cmpHead = 'Vergleiche mit einem anderen Kind.'; }, /the SAME table/);
  P('PB15 "Super!" in a heading', (b) => { b.TEXT.null.tasksHead = 'Super! Rechne.'; }, /celebrates/);
  P('PB16 the Hilfsaufgabe way unnamed', (b) => { b.TEXT.wege2.ways.hilfs = ['Ich rechne', 'anders:']; }, /not named schrittweise/);
  P('PB17 an off-palette colour in the drawings', () => {}, /outside PAL_E2/, artSrc + '\nconst X = "#123456";');
  P('PB18 Tauschaufgabe bubble with 8 + 3 + 4', (b) => { b.TEXT.wege1.ways.tausch.chain = ['8', '3', '4']; }, /are not 7 \+ 3 \+ 5/);
  P('PB21 the whole Fensterbank back in hand spans', (b) => { b.SETS.koerper.pairs.fensterbank = 'span'; }, /measured fensterbank in span: up to/);
  P('PB22 "beide gleich groß" (a precision the body measure cannot give)', (b) => { b.TEXT.mess.de.whoseChoices[2] = 'beide gleich groß'; }, /beide etwa gleich groß/);
  P('PB23 the guitar the only picture of about 1 m', (b) => { b.LENGTH_PICS = b.LENGTH_PICS.filter((p) => p.ans !== 'about' || p.id === 'gitarre'); }, /fewer than two pictures of about 1 m/);
  P('PB24 the umbrella back as "etwa 1 m" (a Kinderschirm is 65-75 cm)', (b) => { b.LENGTH_PICS.push({ id: 'regenschirm', pic: ['weather', 'umbrella'], de: 'der Regenschirm', cm: 95, ans: 'about' }); }, /regenschirm: the bank says about, the gate unclear/);
  P('PB28 the own-way heading without the steps', (b) => { b.TEXT.wege1.headC = '3. Rechne auf deinem Weg.'; }, /own-way heading reads/);
  P('PB25 the Zehner heading "rechne vom Zehner weg"', (b) => { b.TEXT.zehner.headMix = 'Ergänze zum Zehner und rechne vom Zehner weg.'; }, /the Zehner heading reads/);
  P('PB26 "Kreuze den falschen Schritt an"', (b) => { b.TEXT.wege2.headB = '2. Bei {name} steckt ein Fehler im Rechenweg. Kreuze den falschen Schritt an.'; }, /den falschen Schritt/);
  P('PB27 no line that a card may stay empty', (b) => { b.TEXT.mess.de.cardEmpty = ''; }, /the card line reads/);
  P('PB19 a unit that measures nothing', (b) => { b.SETS.koerper.pairs.teppich = 'span'; b.SETS.koerper.pairs.tuer = 'span'; }, /the unit foot measures nothing/);

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
      ok(!tf.f.length, `${id} L${lv} tells: ${tf.f.slice(0, 4).join(' | ')}`);
      pools[id + lv + 'M'] = tf.M;
      ok(seen.size >= Math.min(SEEDS, 50), `${id} L${lv}: only ${seen.size} distinct pages in ${SEEDS}`);
    }
    ok(new Set([1, 2, 3].map((lv) => sigs[id + lv])).size === 3, `${id}: the three levels do not differ`);
    process.stdout.write(id + ' ');
  }
  console.log(`\nbuild sweep: ${built} pages (${SEEDS} seeds a level), ${((Date.now() - t0) / 1000).toFixed(0)} s`);

  // ---- page poisons (each against the real page of the same type and level, judged above)
  const pa = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; const html = spoil(pools[id + lv].html); if (html === pools[id + lv].html) { judge(name, ['the spoil changed nothing'], /^$/); return; } judge(name, pageFaults(id, lv, html), re); };
  const $do = (h, fn) => { const $ = cheerio.load(h, null, false); fn($); return $.html(); };
  // a page poison on the first seed whose page holds the thing spoiled (that clean page is judged in the sweep above)
  const pax = (name, id, lv, sel, spoil, re) => { if (!IDS.includes(id)) return; const t = loadType(id); for (let s = 1; s <= SEEDS; s++) { const h = buildPage(t, lv, s).html; if (cheerio.load(h)(sel).length) { const hs = spoil(h); judge(name + ' (copy ' + s + ')', hs === h ? ['the spoil changed nothing'] : pageFaults(id, lv, hs), re); return; } } judge(name, ['no page holds ' + sel], /^$/); };
  pa('PA1 a zero story stamped with a 1', 'G1-673', 1, (h) => h.replace(/(data-e2-kind="plus0"[\s\S]*?data-e2-answer=")0(" data-e2-story="k")/, '$11$2'), /the boxes/);
  pa('PA2 an empty second picture (the child counts nothing)', 'G1-673', 2, (h) => $do(h, ($) => { $('[data-e2-kind="minus0"] [data-e2-panel="2"] image').remove(); }), /does not keep the first picture/);
  pa('PA3 a number in a story sentence', 'G1-673', 1, (h) => h.replace(/(data-e2-caption="1"[^>]*>)([^<]+)/, (m, a, s) => a + s.replace(/ (\S+)\.$/, ' 4 $1.')), /a number in the sentences|the sentences/);
  pa('PA4 "kein" for "keine" (or back) in a zero story', 'G1-673', 3, (h) => h.replace(/(data-e2-caption="2"[^>]*>(?:Es kommt |Es wird )?)(keine|kein|Keine|Kein) /, (m, a, k) => a + ({ keine: 'kein', kein: 'keine', Keine: 'Kein', Kein: 'Keine' })[k] + ' '), /the sentences/);
  pa('PA5 a task stamped wrong', 'G1-673', 2, (h) => h.replace(/data-e2-answer="(\d+)" data-e2-task="1"/, (m, v) => `data-e2-answer="${+v + 1}" data-e2-task="1"`), /the stamp|values fit/);
  pa('PA6 a task with two blanks (many values)', 'G1-673', 3, (h) => $do(h, ($) => { const r = $('[data-e2-task="2"]').parent(); const big = r.children('.e2-big').first(); big.replaceWith('<div class="ws-blankbox" data-dk-box data-dk-numbox data-e2-answer="1"></div>'); }), /2 boxes|values fit/);
  pa('PA7 the minus operator on a plus story', 'G1-673', 1, (h) => h.replace(/(data-e2-kind="plus0"[\s\S]*?<span class="e2-op"[^>]*>)\+/, `$1${MN}`), /the operator printed/);
  pa('PA29 a plus story whose key refuses the Tauschaufgabe', 'G1-673', 2, (h) => h.replace(/ data-e2-alt="[^"]*"/, ''), /does not accept the Tauschaufgabe/);
  pa('PA30 the coming arrow on a story where nothing comes', 'G1-673', 1, (h) => h.replace(/(data-e2-kind="minus0"[\s\S]*?data-e2-panel="2"[^>]*><svg[^>]*>)/, '$1<g data-e2-comes="1"></g>'), /the arrow for the things that come/);
  pa('PA8 nine tasks without a zero (the zero lesson thinned)', 'G1-673', 1, (h) => { let n = 0; return h.replace(/(<span class="e2-big" data-dk-box>)0(<\/span>)/g, (m, a, b2) => (n++ < 3 ? a + '1' + b2 : m)); }, /tasks with a 0|values fit|the stamp/);
  pa('PA9 a Lena chain that is also a double (5 + 5 + 3)', 'G1-674', 1, (h) => h.replace(/(data-e2-match="zehn" data-e2-task=")[^"]+("[^>]*>\s*<span class="e2-chain"[^>]*>)[^<]+/, '$15+8$25 + 8 = 5 + 5 + 3'), /zehn and doppel|exactly one way/);
  pa('PA10 a chain stamped with the wrong child', 'G1-674', 2, (h) => h.replace(/data-e2-match="tausch"/, 'data-e2-match="zehn"'), /the stamp zehn, the gate tausch/);
  pa('PA11 Lena\'s bubble with 7 + 2 + 6', 'G1-674', 1, (h) => h.replace(/(data-e2-waychain="zehn"[^>]*>)7 \+ 3 \+ 5/, '$17 + 2 + 6'), /zehn child's way reads|read as/);
  pa('PA12 an open task whose key forgets the doubling way', 'G1-674', 3, (h) => h.replace(/ · verdoppeln[^:]*: [^·.]*/, ''), /the key lacks/);
  pa('PA13 a stamped answer in the measuring table', 'G1-675', 1, (h) => h.replace(/data-dk-numbox data-e2-record="est"/, 'data-dk-numbox data-e2-record="est" data-e2-answer="7"'), /carries a key value|carries an answer/);
  pa('PA14 the classroom measured in hand spans', 'G1-675', 2, (h) => h.replace(/data-e2-rowunit="step"/, 'data-e2-rowunit="span"'), /measured in span|no row measured in step/);
  pa('PA15 no table row (the comparison has no table)', 'G1-675', 1, (h) => h.replace(/data-e2-row="tisch"/, 'data-e2-row="heft"'), /no table row|a thing twice/);
  pa('PA16 the door width in the metric table', 'G2-636', 2, (h) => h.replace(/data-e2-row="(?!own)[a-z]+"/, 'data-e2-row="tuer"'), /door width in the table/);
  pa('PA17 a sofa sent to "kürzer als 1 m"', 'G2-636', 2, (h) => h.replace(/data-e2-match="long"/, 'data-e2-match="short"'), /the stamp short, the gate long/);
  pa('PA18 "1 m = 10 cm"', 'G2-636', 1, (h) => h.replace(/data-e2-answer="100" data-e2-conv="1"/, 'data-e2-answer="10" data-e2-conv="1"'), /the conversions/);
  pa('PA19 a heart task that is not the verliebte Zahlen', 'G2-634', 2, (h) => h.replace(/(data-e2-zkind="E"[\s\S]*?<span class="e2-big" data-dk-box style="font-size:20px;line-height:24px">)(\d)(<\/span>)/, (m, a, d, c) => a + ((+d % 9) + 1) + c), /the heart (task|box)/);
  pa('PA20 an ergänzen task to the wrong ten', 'G2-634', 1, (h) => h.replace(/(data-e2-zkind="E"[\s\S]*?data-e2-z="main"[^>]*><\/div><span class="e2-op"[^>]*>=<\/span><span class="e2-big"[^>]*>)(\d+)/, (m, a, z) => a + (+z + 10)), /next ten|the box/);
  pa('PA21 the number line from the wrong ten', 'G2-634', 1, (h) => h.replace(/data-e2-from="(\d+)"/, (m, v) => `data-e2-from="${+v + 10}"`), /the number line from/);
  pa('PA22 a number line on level 2', 'G2-634', 2, (h) => h.replace('data-e2-zkind="E"', 'data-e2-zkind="E"><svg data-e2-art="tens-line" data-e2-from="0"></svg><span hidden'), /a number line on level 2/);
  pa('PA23 two wrong steps', 'G2-635', 2, (h) => $do(h, ($) => { const st = $('[data-e2-errstep][data-dk-answer="no"]').first().next(); st.text(st.text().replace(/= (\d+)$/, (m, z) => '= ' + (+z + 10))); }), /wrong steps \(exactly one\)/);
  pa('PA24 the Hilfsaufgabe correction stamped "+" for a minus task', 'G2-635', 3, (h) => h.replace(/data-e2-answer="\+" data-e2-hs="sign"/, `data-e2-answer="${MN}" data-e2-hs="sign"`), /the sign box/);
  pa('PA25 the wrong step stamped on another step', 'G2-635', 1, (h) => h.replace(/data-dk-answer="right"/, 'data-dk-answer="x"').replace(/data-dk-answer="no"/, 'data-dk-answer="right"').replace(/data-dk-answer="x"/, 'data-dk-answer="no"'), /step \d: the stamp/);
  pa('PA26 an untypical mistake (a hundred lost)', 'G2-635', 2, (h) => $do(h, ($) => { const st = $('[data-e2-errstep][data-dk-answer="right"]').next(); st.text(st.text().replace(/= (\d+)$/, (m, z) => '= ' + (+z + 5))); }), /not a typical one|wrong steps/);
  pa('PA27 the mistake task repeats the anchor on level 2', 'G2-635', 2, (h) => { const m = /data-e2-anchor="1"[^>]*>(\d+) \+ (\d+)</.exec(h); return h.replace(/data-e2-fa="\d+" data-e2-fb="\d+"/, `data-e2-fa="${m[1]}" data-e2-fb="${m[2]}"`); }, /level 2 differs from the anchor/);
  pa('PA31 nine things in a story picture', 'G1-673', 3, (h) => h.replace(/(data-e2-panel="1"[^>]*><svg[^>]*>[\s\S]*?)(<image [^>]*data-e2-thing="stays"[^>]*\/>)/, (m, a, im) => a + im + im.replace(/ x="[0-9.]+"/, ' x="1"').replace(/ y="[0-9.]+"/, ' y="1"').repeat(8)), /things in picture 1 \(eight at most\)/);
  pa('PA32 two story pictures overlapping (a back row on the front row)', 'G1-673', 2, (h) => h.replace(/(<image [^>]*x=")([0-9.]+)(" y="[0-9.]+" width="([0-9.]+)"[^>]*data-e2-thing="stays"[^>]*\/>)(<image [^>]*x=")([0-9.]+)(" y=")([0-9.]+)/, (m, a, x1, b2, wd, c, x2, d, y2) => a + x1 + b2 + c + (+x1 + 0.5 * wd) + d + y2), /two pictures overlap/);
  // the other direction: a correct page changed in a way that is still right must NOT fire the new checks
  const pcx = (name, id, lv, sel, spoil, re) => { if (!IDS.includes(id)) return; const t = loadType(id); for (let s = 1; s <= SEEDS; s++) { const h = buildPage(t, lv, s).html; if (cheerio.load(h)(sel).length) { const hs = spoil(h), f = pageFaults(id, lv, hs).filter((x) => re.test(x)); ok(hs !== h && !f.length, `control ${name} (copy ${s}): ${hs === h ? 'the change changed nothing' : f.join(' | ')}`); plog.push(`  ${name} (copy ${s}): ${hs !== h && !f.length ? 'PASSES (control)' : 'FIRED ON A CORRECT PAGE'}`); return; } } ok(false, `control ${name}: no page holds ${sel}`); };
  const LENS = '[data-e2-scene="leaf"], [data-e2-scene="pond"], [data-e2-scene="stone"], [data-e2-scene="plate"]';
  pcx('PC1 a thing set 1 px deeper onto its leaf, pond, stone or plate (in both pictures alike)', 'G1-673', 1, LENS, (h) => $do(h, ($) => { const c = $(LENS).first().closest('[data-e2-storycard]'); for (const q of [1, 2]) { const im = c.find(`[data-e2-panel="${q}"] image[data-e2-thing]`).first(); im.attr('y', String(+im.attr('y') + 1)); } }), /rests on nothing|not where it stood/);
  pcx('PC2 the whole first group 1 px to the right in both pictures (still the same places)', 'G1-673', 2, '[data-e2-kind="minus0"]', (h) => $do(h, ($) => { $('[data-e2-kind="minus0"] image[data-e2-thing]').each((i, e) => { $(e).attr('x', String(+$(e).attr('x') + 1)); }); }), /not where it stood|rests on nothing|place under the things differs/);
  pcx('PC3 the newcomers 2 px further from the first group (still apart, still on their place)', 'G1-673', 3, '[data-e2-kind="plusK"]', (h) => $do(h, ($) => { $('[data-e2-kind="plusK"] image[data-e2-thing="arrives"]').each((i, e) => { $(e).attr('x', String(+$(e).attr('x') + 2)); }); }), /newcomers stand among|not where it stood/);
  pcx('PC4 a level-3 step\'s Tauschaufgabe accepted (the key as built)', 'G2-635', 3, '[data-e2-alt]', (h) => h.replace(/(data-e2-re="schritt1x" data-e2-alt="[^"]*")/, '$1 data-x="1"'), /does not accept|swapped subtraction/);
  // the geometry on its own, both ways (a point inside / outside a square; on / beside a branch)
  { const sq = [[0, 0], [10, 0], [10, 10], [0, 10]]; ok(inPoly([5, 5], sq) && !inPoly([5, 12], sq) && !inPoly([-1, 5], sq), 'geometry: point in polygon'); const br = pathPoints('M0 50 Q50 46 100 51'); ok(segDist([50, 48], br) < 1 && segDist([50, 40], br) > 6, 'geometry: distance to a branch'); ok(pathPoints('M0 0 L10 0 L10 10 Z').length === 3, 'geometry: a path read'); }
  // the round-1 defects re-created in the drawing module itself, then put back (the clean pages are judged in the sweep)
  const pmod = (name, id, lv, mutate, restore, pick, re) => { if (!IDS.includes(id)) return; const t = loadType(id); mutate(); try { for (let s = 1; s <= SEEDS; s++) { const h = buildPage(t, lv, s).html; if (pick(cheerio.load(h))) { judge(name + ' (copy ' + s + ')', pageFaults(id, lv, h), re); return; } } judge(name, ['no page shows it'], /^$/); } finally { restore(); } };
  const ROWS0 = { ...ART.SCENE_ROWS };
  pmod('PA54 a back row on a leaf, pond, stone or plate (the round-1 layout: the place\'s curved edge drops away under it)', 'G1-673', 3, () => { for (const k of ['leaf', 'pond', 'stone', 'plate']) ART.SCENE_ROWS[k] = 2; }, () => Object.assign(ART.SCENE_ROWS, ROWS0),
    ($) => $('[data-e2-scene="leaf"], [data-e2-scene="pond"], [data-e2-scene="stone"], [data-e2-scene="plate"]').filter((i, e) => new Set($(e).find('image[data-e2-thing]').map((j, m) => $(m).attr('y')).get()).size > 1).length > 0, /rests on nothing/);
  const PANEL0 = ART.storyPanel;
  pmod('PA55 picture 1 laid out on its own (round 1: the first group moves when the newcomers come)', 'G1-673', 2, () => { ART.storyPanel = (o) => PANEL0({ ...o, come: null }); }, () => { ART.storyPanel = PANEL0; }, ($) => $('[data-e2-kind="plusK"]').length > 0, /not where it stood in picture 1/);
  pax('PA45 a basket or bowl with two rows and no back wall (the back row in the air)', 'G1-673', 3, '[data-e2-backwall]', (h) => h.replace(/<path [^>]*data-e2-backwall="1"[^>]*\/>/g, ''), /rests on nothing/);
  pax('PA46 a thing of the first group lifted into the air (in both pictures alike)', 'G1-673', 1, '[data-e2-scene="leaf"], [data-e2-scene="pond"], [data-e2-scene="stone"], [data-e2-scene="plate"]', (h) => $do(h, ($) => { const c = $('[data-e2-scene="leaf"], [data-e2-scene="pond"], [data-e2-scene="stone"], [data-e2-scene="plate"]').first().closest('[data-e2-storycard]'); for (const q of [1, 2]) { const im = c.find(`[data-e2-panel="${q}"] image[data-e2-thing]`).first(); im.attr('y', String(+im.attr('y') - 22)); } }), /rests on nothing/);
  pa('PA47 picture 2 moves one thing of the first group (the round-1 ladybug)', 'G1-673', 2, (h) => $do(h, ($) => { const im = $('[data-e2-storycard]').first().find('[data-e2-panel="2"] image[data-e2-thing="stays"], [data-e2-panel="2"] image[data-e2-thing="crossed"]').first(); im.attr('x', String(+im.attr('x') + 3)); }), /not where it stood in picture 1/);
  pax('PA48 a newcomer standing among the first group', 'G1-673', 3, '[data-e2-kind="plusK"]', (h) => $do(h, ($) => { const c = $('[data-e2-storycard][data-e2-kind="plusK"]'); const im = c.find('image[data-e2-thing="arrives"]').first(); im.attr('x', c.find('[data-e2-panel="2"] image[data-e2-thing="stays"]').first().attr('x')); }), /newcomers stand among the first group/);
  pa('PA49 the place drawn deeper in picture 2 than in picture 1', 'G1-673', 1, (h) => $do(h, ($) => { const g = $('[data-e2-storycard]').eq(1).find('[data-e2-panel="2"] [data-e2-ground]').first(); g.attr('data-e2-poison', '1'); }), /place under the things differs/);
  pax('PA50 a muffin tray drawn as a box again (wider at the back)', 'G1-673', 3, '[data-e2-scene="tray"]', (h) => h.replace(/(data-e2-scene="tray"[\s\S]*?<path d=")M16 ([0-9.]+) L([0-9.]+) ([0-9.]+) L([0-9.]+) ([0-9.]+) L5 ([0-9.]+) Z/, (m, a, t1, x2, t2, x3, b1, b2) => `${a}M5 ${t1} L181 ${t2} L173 ${b1} L13 ${b2} Z`), /a tray drawn as a box/);
  pa('PA51 a Tauschaufgabe refused in a level-3 step', 'G2-635', 3, (h) => h.replace(/(data-e2-re="[a-z]+\d+x") data-e2-alt="[^"]*"/, '$1'), /does not accept/);
  pa('PA52 a swapped subtraction accepted (the Hilfsaufgabe\'s step back)', 'G2-635', 3, (h) => h.replace(/data-e2-re="hilfs2x"/, 'data-e2-re="hilfs2x" data-e2-alt="1 − 36 = 35"'), /accepts a swapped subtraction/);
  pa('PA53 the own-way heading without the steps', 'G1-674', 1, (h) => h.replace('3. Rechne auf deinem Weg. Schreibe die Schritte auf.', '3. Rechne auf deinem Weg.'), /does not ask for the steps/);
  pa('PA33 the doubling way credited for 9 + 3 (3 + 3 + 6)', 'G1-674', 1, (h) => h.replace(/(data-e2-owntask="(\d)\+(\d)")/, (m) => m).replace(/data-e2-key="(\d+) \+ (\d+) = (\d+)\. Jeder Weg mit richtigen Schritten ist richtig: ([^"]*)"([^>]*data-e2-owntask="\d\+\d")/, (m, a, b2, s2, ws, rest) => `data-e2-key="9 + 3 = 12. Jeder Weg mit richtigen Schritten ist richtig: erst bis zur 10: 9 + 1 + 2 · Tauschaufgabe: 3 + 7 + 2 · mit der 10: 10 + 3 − 1 · verdoppeln: 3 + 3 + 6."` + rest.replace(/data-e2-owntask="\d\+\d"/, 'data-e2-owntask="9+3"')), /credits "verdoppeln" for numbers 6 apart/);
  pa('PA34 a key without "plus 10 minus 1" for a task with a 9', 'G1-674', 3, (h) => h.replace(/data-e2-key="(\d+) \+ (\d+) = (\d+)\. Jeder Weg mit richtigen Schritten ist richtig: ([^"]*)"([^>]*data-e2-owntask=")\d\+\d"/, 'data-e2-key="9 + 6 = 15. Jeder Weg mit richtigen Schritten ist richtig: erst bis zur 10: 9 + 1 + 5 · Tauschaufgabe: 6 + 4 + 5 · Kraft der Fünf: 5 + 5 + 4 + 1."$59+6"'), /the key lacks 9 \+ 10 − 1|the key lacks 10 \+ 6 − 1/);
  pa('PA35 the old fixed frame "☐ + ☐ + ☐ = ☐" for the own way', 'G1-674', 2, (h) => h.replace(/(data-e2-owntask="[^"]*"[^>]*>[\s\S]*?)<div data-dk-box data-dk-blank="1"/, '$1<span class="e2-op">+</span><div class="ws-blankbox" data-dk-box></div><div data-dk-box data-dk-blank="1"'), /a fixed frame instead of a writing line/);
  pa('PA36 "beide gleich groß" on the page', 'G1-675', 2, (h) => h.replace('>beide etwa gleich groß<', '>beide gleich groß<'), /the third choice reads/);
  pa('PA37 the whole Fensterbank in the hand-span table', 'G1-675', 1, (h) => h.replace(/data-e2-row="(?!tisch"|own")[a-z0-9]+"/, 'data-e2-row="fensterbank"'), /the whole Fensterbank|not a thing of the set/);
  pa('PA38 the heading "rechne vom Zehner weg"', 'G2-634', 1, (h) => h.replace('ziehe vom Zehner ab.', 'rechne vom Zehner weg.'), /rechne vom Zehner weg|the heading is not/);
  pa('PA39 the mistake question "Kreuze den falschen Schritt an"', 'G2-635', 2, (h) => h.replace('In welchem Schritt steckt der Fehler? Kreuze ihn an.', 'Kreuze den falschen Schritt an.'), /the mistake question reads|den falschen Schritt/);
  pa('PA40 level 3 back to one sum box per child', 'G2-635', 3, (h) => $do(h, ($) => { $('[data-e2-way="stellen"] [data-e2-re]').slice(1).remove(); }), /the stellen child's steps: 1 boxes/);
  pa('PA41 the Hilfsaufgabe step back with the 1 left out', 'G2-635', 3, (h) => $do(h, ($) => { const st = $('[data-e2-way="hilfs"] [data-e2-re="hilfs2"]').parent(); st.html(st.html().replace(/>1</, '><')); }), /does not print "− 1"/);
  pa('PA42 a "☐ cm" estimate frame (the Tischhöhe told under 1 m)', 'G2-636', 2, (h) => $do(h, ($) => { const b = $('[data-e2-row]:not([data-e2-row="own"]) [data-e2-record="est"]').first(); b.next().remove(); b.remove(); }), /the est frame is not/);
  pa('PA43 no line that a card may stay empty', 'G2-636', 3, (h) => $do(h, ($) => { $('[data-e2-cardempty]').remove(); }), /a card may stay empty: missing/);
  pa('PA44 the card line on level 1 (two cards, both used)', 'G2-636', 1, (h) => h.replace('data-e2-bottom="sort"', 'data-e2-bottom="sort"><span data-e2-cardempty="1">Eine Karte kann leer bleiben.</span><span hidden'), /a card may stay empty: "Eine Karte kann leer bleiben." on level 1/);
  pa('PA28 a minus Hilfsaufgabe whose key refuses the Tauschaufgabe', 'G2-635', 2, (h) => h.replace(/ data-e2-alt="[^"]*"/, ''), /does not accept/);

  // ---- instruction poisons (each against the real printed instruction of the same type and level, judged in the sweep)
  const realInstr = (id, lv) => withLevelInstruction(resolveStrings(id, 'de', loadType(id)), id, lv, 'de').instruction;
  const pi = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; judge(name, instrFaults(id, lv, spoil(realInstr(id, lv))), re); };
  pi('PI1 level 3 of G1-674 claims one right way', 'G1-674', 3, (s) => s.replace(' Oft passen mehrere Wege.', ''), /Oft passen mehrere Wege/);
  pi('PI2 G2-635 level 2 without plus or minus', 'G2-635', 2, (s) => s.replace('Überlege, ob du am Ende plus oder minus rechnest.', ''), /plus oder minus/);
  pi('PI3 G1-675 without "Schätze zuerst"', 'G1-675', 1, (s) => s.replace('Schätze zuerst', 'Miss'), /Schätze zuerst/);
  pi('PI4 an exclamation', 'G1-673', 1, (s) => s + ' Super!', /exclamation/);
  pi('PI6 G1-674 level 1 says "eine Aufgabe"', 'G1-674', 1, (s) => s.replace('zwei Aufgaben auf deinem Weg', 'eine Aufgabe auf deinem Weg'), /"eine Aufgabe" while the page prints two/);
  pi('PI7 G2-634 "rechne vom Zehner weg"', 'G2-634', 2, (s) => s.replace('ziehe vom Zehner ab', 'rechne vom Zehner weg'), /vom Zehner weg/);
  pi('PI8 G1-675 compares a table with a child', 'G1-675', 3, (s) => s.replace('deine Zahl für den Tisch mit der von einem anderen Kind und erkläre', 'deinen Tisch mit einem anderen Kind und erkläre'), /deinen Tisch mit einem/);
  pi('PI9 G2-635 "Kreuze den falschen Schritt an"', 'G2-635', 1, (s) => s.replace('Kreuze den Schritt mit dem Fehler an', 'Kreuze den falschen Schritt an'), /den Schritt mit dem Fehler/);
  pi('PI5 G2-634 without the verliebte Zahlen', 'G2-634', 3, (s) => s.replace(/verliebten Zahlen/g, 'Zahlen'), /verliebten Zahlen/);

  // ---- tell poisons (synthetic pooled sets; each with the real set as its control, judged above)
  const tp = (name, f, re) => judge(name, f, re);
  tp('PT1 zero always the answer when a 0 is in the task', tellFaults('G1-673', 2, { tasks: Array.from({ length: 1200 }, (_, i) => ({ pos: i % 12, hasZero: i % 3 !== 0, ans: i % 3 !== 0 ? 0 : 5 })) }).f, /answers that are 0|"write 0 when the task has a 0"/);
  tp('PT2 the ordinary story always first', tellFaults('G1-673', 1, { tasks: Array.from({ length: 120 }, (_, i) => ({ pos: i % 12, hasZero: i % 12 < 8, ans: i % 12 < 2 ? 0 : 3 })), stories: Array.from({ length: 400 }, (_, i) => ({ pos: i % 4, kind: i % 4 === 0 ? 'plusK' : 'all' })) }).f, /story 1 is the ordinary one/);
  tp('PT3 the line always straight across', tellFaults('G1-674', 1, { lines: Array.from({ length: 300 }, (_, i) => ({ row: i % 3, target: i % 3, way: ['zehn', 'doppel', 'tausch'][i % 3], a: 9, b: 4 })) }).f, /straight across/);
  tp('PT4 the wrong step always last', tellFaults('G2-635', 2, { err: Array.from({ length: 300 }, (_, i) => ({ n: 2 + (i % 2), at: 1 + (i % 2), way: 'x' })), steps: [{ wrong: true, z: 55 }, { wrong: false, z: 64 }] }).f, /wrong step sits last/);
  tp('PT5 a one-digit result only on wrong steps', tellFaults('G2-635', 3, { err: Array.from({ length: 300 }, (_, i) => ({ n: 3, at: i % 3, way: 'stellen' })), steps: Array.from({ length: 300 }, (_, i) => ({ wrong: i % 3 === 0, z: i % 3 === 0 ? 4 : 64 })) }).f, /a one-digit result only on wrong steps/);
  tp('PT6 picture 1 always short', tellFaults('G2-636', 2, { sort: Array.from({ length: 1600 }, (_, i) => ({ pos: i % 8, ans: i % 8 === 0 ? 'short' : ['long', 'short'][i % 2] })) }).f, /picture 1 goes to/);
  tp('PT7 a measure with nothing to judge fails', tellFaults('G2-635', 1, {}).f, /nothing to judge/);

  // ---- 3. render
  const stacks = [];
  let swept = 0;
  if (!NO_RENDER) {
    const puppeteer = require('puppeteer');
    const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
    const OUTD = path.join(require('os').tmpdir(), 'verify-e2-de-a');
    fs.mkdirSync(OUTD, { recursive: true });
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const render = async (type, lv, v, base) => {
      const strings = withLevelInstruction(resolveStrings(type.id, 'de', type), type.id, lv, 'de');
      const r = await renderInstance({ type, theme: null, difficulty: lv, locale: 'de', strings, variant: v, page, outDir: OUTD, baseName: base });
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
          if (v === 1) { const stk = await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom); return Math.round(Math.max(...ink) - rt.top); }); stacks.push(`${id} L${lv} ${stk}`); }
          if (v === (QUICK ? 1 : 2)) { const sw = await layoutSweep(t, lv, QUICK ? 30 : SEEDS); swept += sw.n; ok(!sw.faults.length, `${id} L${lv} layout sweep (${sw.n} distinct of ${QUICK ? 30 : SEEDS} generator seeds): ${sw.faults.slice(0, 4).join(' | ')}`); }
        }
        process.stdout.write(id + ' ');
      }
      console.log(`\nrender done (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
      const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); const h = fn(r.bodyHtml); if (h === r.bodyHtml) throw new Error('the spoil changed nothing'); return { ...r, bodyHtml: h }; } }; };
      const pr = async (name, id, lv, fn, re) => { if (!IDS.includes(id)) return; let f; try { const r = await render(spoilType(id, fn), lv, 1, 'poison'); f = [].concat(r.qa.verify || [], r.qa.lints || []); } catch (e) { f = ['render threw: ' + e.message]; } judge(name, f, re); };
      // each render poison's control is the real page of the same type and level, rendered above (ok() on its verify)
      await pr('PR1 the page shrunk (a blank band at the bottom)', 'G1-673', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is|empty band/);
      await pr('PR2 a story picture shrunk below 18 px', 'G1-673', 1, (h) => h.replace(/(<image href="[^"]+" x="[0-9.]+" y="[0-9.]+" width=")([0-9.]+)(" height=")([0-9.]+)("[^>]*data-e2-thing)/, (m, a, w, b2, hh, c) => a + (+w * 0.4) + b2 + (+hh * 0.4) + c), /a picture \d+ px/);
      await pr('PR3 two story pictures on top of each other', 'G1-673', 3, (h) => { let k = 0; return h.replace(/(<image href="[^"]+" x=")([0-9.]+)("[^>]*data-e2-thing="stays")/g, (m, a, x, c) => (k++ === 1 ? a + (+x - 20) + c : m)); }, /cover each other/);
      await pr('PR4 a box too small to write in', 'G2-634', 1, (h) => h.replace(/(class="ws-blankbox" data-dk-box data-dk-numbox data-e2-answer="\d+" data-e2-z="main" style="flex-shrink:0;width:)\d+px;height:\d+px/, '$120px;height:20px'), /a box \d+x\d+ px/);
      await pr('PR5 a bubble pushed over its child', 'G1-674', 1, (h) => h.replace(/(<div class="e2-bubble" data-dk-box data-e2-bubble="[^"]+" style=")/, '$1margin-left:-60px;'), /bubble covers the child|collide/);
      await pr('PR6 the measuring table without the row to choose', 'G2-636', 1, (h) => h.replace('data-e2-row="own"', 'data-e2-row="x"'), /no row for a thing the child chooses/);
      await pr('PR7 a measuring box too narrow for "10"', 'G2-636', 2, (h) => h.replace(/(class="ws-blankbox" data-dk-box data-dk-numbox data-e2-record="est" style="flex-shrink:0;width:)34px/, '$126px'), /a measuring box \d+ px wide/);
      await pr('PR8 a table column out of line', 'G1-675', 2, (h) => h.replace(/(data-e2-row="tisch"[^>]*><div class="e2-cell" style="width:)(\d+)px/, (m, a, w) => a + (+w + 30) + 'px'), /a column out of line|out of its card|exceeds/);
      await pr('PR9 an open item without its key', 'G2-635', 2, (h) => h.replace(/data-e2-key="[^"]*"/, 'data-e2-key="?"'), /an open item without its key/);
      // (the short card: every page has short pictures; a page may have no picture of about 1 m, review round 1)
      await pr('PR10 a line to draw without its target', 'G2-636', 3, (h) => h.replace(/data-e2-target="short"/, 'data-e2-target="x"'), /has no target/);
      await pr('PR11 the mistake card short of a step', 'G2-635', 1, (h) => h.replace(/data-e2-errstep="1"/, 'data-x="1"'), /lacks a step/);
      await pr('PR13 the coming arrow moved away from the things that come', 'G1-673', 2, (h) => h.replace(/<g data-e2-comes="1">/, '<g data-e2-comes="1" transform="translate(-150 0)">'), /does not point at the things that come/);
      await pr('PR14 a thing\'s name too long for its cell', 'G2-636', 3, (h) => h.replace(/(data-e2-thingword="[a-z0-9]+"[^>]*>)([^<]+)/, '$1Tischtennisplattenkante'), /runs out of its cell/);
      await pr('PR12 two children with one look', 'G1-674', 2, (h) => h.replace(/data-e2-skin="(s\d)"/g, 'data-e2-skin="s3"'), /all look alike/);
    } finally { await browser.close(); }
    console.log('stacks (copy 1, measured on what is drawn): ' + stacks.join(', '));
    console.log(`layout sweep: ${swept} distinct pages of the generator's seeds 1..${QUICK ? 30 : SEEDS} judged by each type's own verify`);
  }
  console.log('measures (pooled, ' + SEEDS + ' copies a level):');
  for (const id of IDS) for (const lv of [1, 2, 3]) { const M = pools[id + lv + 'M']; if (M && Object.keys(M).length) console.log(`  ${id} L${lv}: ` + Object.entries(M).map(([k, v]) => `${k} ${Array.isArray(v) ? v[0] + ' ' + (100 * v[1]).toFixed(1) + '%' : (100 * v).toFixed(1) + '%'}`).join('; ')); }
  console.log(plog.join('\n'));
  console.log(`poisons ${killed}/${poisons} killed`);
  ok(killed === poisons, `${poisons - killed} poisons not killed`);
  if (fails.length) {
    // one line per kind of failure (the seed left out), with how many times it came
    const byKind = {};
    for (const x of fails) { const k = x.replace(/seed \d+/, 'seed N'); byKind[k] = (byKind[k] || 0) + 1; }
    console.log('FAIL (' + fails.length + '):\n  ' + Object.entries(byKind).slice(0, 60).map(([k, n]) => (n > 1 ? n + 'x ' : '') + k).join('\n  '));
    process.exit(1);
  }
  console.log(`PASS (${assertions} assertions, ${SEEDS} seeds a level; ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, pageFaults, tellFaults, buildPage, IDS: ALL_IDS };
