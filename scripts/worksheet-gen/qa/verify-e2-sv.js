#!/usr/bin/env node
/**
 * verify-e2-sv.js — the gate of Batch SV (Daily Teaching System Stage E-2, 2026-11-26): the Swedish mathematics pages
 * K-727, G1-676, G1-677, G2-637, G3-647, G3-648, G3-649, G3-650, G3-651, G3-652 (factory types/_shared/e2-math-sv.js with
 * its drawings e2-math-sv-art.js and bank data/e2sv/e2-math-sv.js; G2-637 and G3-650 are the Swedish sets of the DE-A
 * measuring-table mode in e2-math.js, bank data/e2/e2-math.js). With its PDF half qa/verify-e2-sv-pdf.py.
 *
 *   node scripts/worksheet-gen/qa/verify-e2-sv.js [--quick] [--seeds=400] [--no-render] [--no-pdf] [--only=K-727,...]
 *
 *   1. BANK, by the gate's OWN tables, never the bank's word: what every container holds and its Swedish word and picture;
 *      the units of G1-676 and their sizes; the Egyptian signs and the Roman numerals; the reasonable answer of every
 *      everyday question and how far off its two others are (at least ten times); the price items and the recipes (whole
 *      halves); every measured thing's real length and whether a whole-centimetre or a whole-metre answer fits it; the old
 *      Swedish lengths (tum, fot, aln, famn) and how they go together; every picture whose unit is cm or m; every colour the
 *      drawings write.
 *   2. INSTRUCTIONS: every type and level's printed instruction holds the strategy, its start and the level's own words.
 *   3. BUILD, --seeds copies of every type at every level, each page read from its own html (cheerio): every stamp agrees
 *      with the gate's own arithmetic, every blank has ONE value (solved over every number a child could write), every
 *      pair and row of containers is ordered by the gate's capacities, every measuring strip is a whole number of each of
 *      its units, every Egyptian and Roman number is read by the gate's own reader, every överslag decides ONE chip by the
 *      printed rule, every part of a mellanled is the gate's own, every table blank follows from the table's own given
 *      pair, every pencil's length and every cross of the line plot; record boxes carry no key value; the level's band;
 *      the three levels differ; another locale refuses.
 *   4. TELLS, pooled: where the right answer sits and every surface of an item (its digits, a final 0, its side, its row,
 *      the length of its word) against its answer.
 *   5. RENDER (the print pipeline), every type x level, 2 copies: verify() (the Batch K page check, the one-answer check and
 *      the type's own page check) and qa/lints.js clean; the stack. Then the LAYOUT SWEEP: the generator's own seeds
 *      1..SEEDS, every DISTINCT page swapped into the rendered page and judged by its type's verify.
 *   6. PDF (real size): G2-637's 1 cm and 10 cm, every G3-652 pencil (rubber end to lead tip) and every G1-676 measuring
 *      strip (the thing's ends and each unit row's ends, the unit's pitch) measured in the printed PDF.
 *   7. POISONS: each check FAILS on a bank, a page, an instruction, a pooled set, a render or a PDF spoiled for it, counted
 *      only when it fails WITH ITS OWN MESSAGE; each has a control that passes (the real bank, page, instruction, set,
 *      render, PDF), and controls that change a page in a way that is still right must NOT fire.
 * Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..');
const cheerio = require(require.resolve('cheerio', { paths: [WG] }));
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
const BS = require(path.join(WG, 'data', 'e2sv', 'e2-math-sv.js'));
const BE = require(path.join(WG, 'data', 'e2', 'e2-math.js'));
const ARTSV = require(path.join(WG, 'types', '_shared', 'e2-math-sv-art.js'));
const ARTE2 = require(path.join(WG, 'types', '_shared', 'e2-math-art.js'));

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const QUICK = process.argv.includes('--quick');
const NO_RENDER = process.argv.includes('--no-render');
const NO_PDF = process.argv.includes('--no-pdf');
const SEEDS = Number(arg('seeds', QUICK ? '60' : '400'));
const ALL_IDS = ['K-727', 'G1-676', 'G1-677', 'G2-637', 'G3-647', 'G3-648', 'G3-649', 'G3-650', 'G3-651', 'G3-652'];
const IDS = arg('only', '') ? arg('only', '').split(',') : ALL_IDS;
const MODE = { 'K-727': 'rymmer', 'G1-676': 'enheter', 'G1-677': 'skillnad', 'G2-637': 'cmsv', 'G3-647': 'symboler', 'G3-648': 'rimligt', 'G3-649': 'mellanled', 'G3-650': 'aldre', 'G3-651': 'proportion', 'G3-652': 'halvcm' };
const clone = (x) => JSON.parse(JSON.stringify(x));
const MN = '−';

let assertions = 0; const fails = [];
const ok = (c, msg) => { assertions++; if (!c) fails.push(msg); };
const plog = []; let poisons = 0, killed = 0;
const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

/* ================================================================ the gate's own tables */
/** K-727: what each container typically holds (litres) and the Swedish word printed under it; the picture it is */
const round100 = (n) => Math.round(n / 100) * 100;
const CAP_OWN = { kopp: 0.2, glas: 0.25, mugg: 0.3, tekanna: 1, kanna: 1.5, vattenkanna: 8, hink: 2, badkar: 180, pool: 20000 };
/** review round 1: what a child could take each PICTURE to hold, least and most (litres): the bucket picture is a sandhink
 * (1-2 l) that a child may also read as a big bucket; two containers meet only when the larger one's least is at least
 * twice the smaller one's most */
const SEEN_OWN = { kopp: [0.15, 0.3], glas: [0.2, 0.35], mugg: [0.25, 0.4], tekanna: [0.8, 1.5], kanna: [1, 2], vattenkanna: [5, 10], hink: [1, 10], badkar: [100, 250], pool: [5000, 50000] };
const seenApartOwn = (a, b) => { const [sm, bg] = CAP_OWN[a] < CAP_OWN[b] ? [a, b] : [b, a]; return SEEN_OWN[bg][0] / SEEN_OWN[sm][1] >= 2; };
/** review round 1: the titles as a Swedish class writes them */
const TITLE_OWN = { 'G1-677': 'Subtraktion som skillnad: räkna uppåt' };
/** G3-648, review round 1: the printed rule's number, and how far a right / wrong answer may lie from its överslag */
const RIM_RULE_OWN = 100, RIM_RIGHT_OWN = 70, RIM_WRONG_OWN = 150;
/** the largest distance between a right answer and its överslag over EVERY sum and difference of two three-digit numbers
 * within 1 000 (rounding to the nearest hundred, 50 rounded up): the printed rule must not call any right answer orimligt */
const RIM_MAX_RIGHT = (() => {
  let mx = 0, ex = '';
  for (let a = 100; a <= 999; a++) for (let b = 100; b <= 999; b++) {
    if (a + b <= 999) { const d = Math.abs(a + b - (round100(a) + round100(b))); if (d > mx) { mx = d; ex = a + ' + ' + b + ' = ' + (a + b) + ', överslag ' + (round100(a) + round100(b)); } }
    if (a > b) { const d = Math.abs(a - b - (round100(a) - round100(b))); if (d > mx) { mx = d; ex = a + ' − ' + b + ' = ' + (a - b) + ', överslag ' + (round100(a) - round100(b)); } }
  }
  return { mx, ex };
})();
const CONT_WORD_OWN = { kopp: 'kopp', glas: 'glas', mugg: 'mugg', tekanna: 'tekanna', kanna: 'kanna', vattenkanna: 'vattenkanna', hink: 'hink', badkar: 'badkar', pool: 'pool' };
const CONT_PIC_OWN = { kopp: 'around the house/cup', glas: 'kitchen tools/glass', mugg: 'kitchen tools/mug', tekanna: 'kitchen tools/teapot', kanna: 'kitchen tools/jug', vattenkanna: 'around the house/watering_can', hink: 'summer/bucket', badkar: 'around the house/bathtub', pool: 'summer/pool' };
const RYM_OWN = { 1: { most: 3, least: 0, ratio: 20, order: 3 }, 2: { most: 4, least: 0, ratio: 4, order: 3 }, 3: { most: 2, least: 2, ratio: 4, order: 4 } };
const ratioOwn = (a, b) => Math.max(CAP_OWN[a], CAP_OWN[b]) / Math.min(CAP_OWN[a], CAP_OWN[b]);
/** G1-676: the units' sizes per level (px) and their Swedish plural; the pairs each level may use */
const UNIT_PX_OWN = { 1: { kloss: 84, gem: 42 }, 2: { kloss: 42, gem: 28, pinne: 84 }, 3: { kloss: 42, gem: 28, pinne: 84 } };
const UNIT_PL_OWN = { kloss: 'klossar', gem: 'gem', pinne: 'glasspinnar' };   // review round 1: glasspinnar
const ENH_OWN = { 1: { cards: 3, maxSmall: 10, pairs: ['kloss-gem'] }, 2: { cards: 4, maxSmall: 18, pairs: ['kloss-gem', 'pinne-kloss'] }, 3: { cards: 4, maxSmall: 18, pairs: ['kloss-gem', 'pinne-kloss', 'pinne-gem'] } };
const THING_DRAW_OWN = { penna: 'pencil', pensel: 'brush', krita: 'crayon', bok: 'book', sked: 'spoon', tandborste: 'toothbrush' };
/** G1-677 per level: the number of tasks, the difference range, how many pass 10, the labels printed, marks, the jump */
const SKI_OWN = { 1: { tasks: 4, d: [2, 4], cross: 2, labels: 'all', marks: true, arc: true }, 2: { tasks: 5, d: [2, 5], cross: 3, labels: 'fives', marks: true, arc: true }, 3: { tasks: 5, d: [2, 5], cross: 3, labels: 'ends', marks: false, arc: false } };
/** G3-647: the Egyptian sign of each value, and the Roman numerals */
const EGYPT_OWN = { stroke: 1, heel: 10, coil: 100, lotus: 1000 };
const SYM_OWN = { 1: { egypt: 5, roman: 5, sub: false, writeE: 1, toRoman: 0, maxE: 399, lotus: false }, 2: { egypt: 5, roman: 5, sub: true, writeE: 1, toRoman: 0, maxE: 1000, lotus: true }, 3: { egypt: 4, roman: 3, sub: true, writeE: 2, toRoman: 2, maxE: 1000, lotus: true } };
function romanOwn(n) { const T = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]; let s = '', r = n; for (const [v, c] of T) while (r >= v) { s += c; r -= v; } return s; }
/** read a Roman numeral as a child is taught: I V X, a smaller before a larger is taken away */
function readRoman(s) { const V = { I: 1, V: 5, X: 10 }; let n = 0; for (let i = 0; i < s.length; i++) { const v = V[s[i]], w = V[s[i + 1]] || 0; if (!v) return NaN; n += v < w ? -v : v; } return n; }
/** G3-648: the reasonable answer of every everyday question (value in base units) */
const UNIT_OWN = { mm: 1, cm: 10, dm: 100, m: 1000, km: 1e6, g: 1, hg: 100, kg: 1000, ml: 1, dl: 100, liter: 1000, sekunder: 1, minuter: 60, timmar: 3600, dagar: 86400, veckor: 604800, månader: 2.6e6, år: 3.15e7 };
const EVERYDAY_OWN = { skolvaska: '3 kg', buss: '12 m', penna: '18 cm', apple: '150 g', somn: '10 timmar', badkar: '150 liter', dorr: '2 m', tander: '2 minuter', vuxen: '70 kg', mjolk: '1 liter', fotboll: '100 m', lektion: '45 minuter', promenad: '15 minuter', klassrum: '8 m', cykel: '15 kg', bok: '300 g', hus: '7 m', sommarlov: '10 veckor' };
const valOf = (s) => { const m = /^([\d ]+) (\S+)$/.exec(s); if (!m || !UNIT_OWN[m[2]]) return NaN; return Number(m[1].replace(/ /g, '')) * UNIT_OWN[m[2]]; };
const RIM_OWN = { 1: { n: 6, plus: 6, minus: 0, rightBox: false }, 2: { n: 6, plus: 3, minus: 3, rightBox: false }, 3: { n: 6, plus: 3, minus: 3, rightBox: true } };
/** G3-649: the kinds per level */
const MEL_OWN = { 1: { form: 'printed', kinds: { '+0': 3, '-0': 3 } }, 2: { form: 'labelled', kinds: { '+0': 1, '+e': 2, '+t': 1, '-0': 2 } }, 3: { form: 'short', kinds: { '+e': 3, '+t': 2, '-0': 3 } } };
/** G3-651: the price items' Swedish forms; the recipes for 4 */
const PRICE_OWN = { glass: ['glass', 'glassar'], bulle: ['bulle', 'bullar'], penna: ['penna', 'pennor'], apple: ['äpple', 'äpplen'], sudd: ['sudd', 'suddar'], vassare: ['pennvässare', 'pennvässare'] };   // review round 1: no comic at 15-25 kr
const PRO_OWN = { 1: { given: 1, recipe: [4, 8], sentences: 1, write: false }, 2: { given: 2, recipe: [2, 4, 8], sentences: 2, write: false }, 3: { given: 3, recipe: [2, 4, 8, 12], sentences: 0, write: true } };
/** G3-652 per level */
const HALV_OWN = { 1: { n: 7, span: 3, labels: 'all', qs: 0 }, 2: { n: 8, span: 4, labels: 'whole', qs: 1 }, 3: { n: 8, span: 5, labels: 'whole', qs: 3 } };
/** G2-637 / G3-650: every Swedish measured thing's real length (cm, the side the arrow shows) */
const THING_SV_OWN = { sv_bankhojd: [59, 76], sv_penna: [13, 19], sv_sudd: [4, 7], sv_bokhojd: [20, 30], sv_fodral: [19, 24], sv_dorrhojd: [199, 211], sv_tavla: [200, 400], sv_rumlangd: [700, 1000], sv_rumbredd: [600, 800], sv_matta: [200, 300], sv_bankbredd: [60, 130], sv_dorrbredd: [86, 101], sv_bokbredd: [15, 21] };
const THING_SV_WORD_OWN = { sv_bankhojd: 'bänkens höjd', sv_penna: 'pennans längd', sv_sudd: 'suddets längd', sv_bokhojd: 'bokens höjd', sv_fodral: 'pennfodralets längd', sv_dorrhojd: 'dörrens höjd', sv_tavla: 'tavlans bredd', sv_rumlangd: 'klassrummets längd', sv_rumbredd: 'klassrummets bredd', sv_matta: 'mattans längd', sv_bankbredd: 'bänkens bredd', sv_dorrbredd: 'dörrens bredd', sv_bokbredd: 'bokens bredd' };
/** a nine-year-old's own body measures (cm) and the old Swedish lengths (the 1665 order: 1 famn = 3 alnar, 1 aln = 2 fot, 1 fot = 12 tum; 1 fot = 29,69 cm) */
const BODY_CM_OWN = { tum: [1.4, 2], fot: [19, 24], aln: [32, 40], famn: [120, 145] };
const OLD_OWN = { tum: { cm: 29.69 / 12, sv: '1 tum ≈ 2,5 cm', body: 'tummens bredd' }, fot: { cm: 29.69, sv: '1 fot ≈ 30 cm', body: 'från hälen till tårna' }, aln: { cm: 2 * 29.69, sv: '1 aln ≈ 60 cm', body: 'från armbågen till fingertopparna' }, famn: { cm: 6 * 29.69, sv: '1 famn ≈ 1,8 m', body: 'från fingertopp till fingertopp' } };
const UNIT_WORD_OWN = { tum: ['tum', 'tum'], fot: ['fot', 'fot'], aln: ['aln', 'alnar'], famn: ['famn', 'famnar'] };
/** the pictures whose unit is cm or m: length (cm) */
const UNIT_PIC_OWN = { penna: 18, bok: 25, sax: 15, nyckel: 7, apple: 8, krita: 9, sudd: 5, bil: 420, buss: 1200, kanot: 450, lastbil: 800, flygplan: 4000, fartyg: 10000 };
const unitClass = (cm) => (cm <= 45 ? 'cm' : cm >= 400 ? 'm' : 'unclear');
const CMSV_OWN = { 1: { rows: 4, short: 2, unitGiven: true, pics: 6, cols: 'thing,est,meas', conv: [] }, 2: { rows: 6, short: 3, unitGiven: false, pics: 8, cols: 'thing,est,meas', conv: [] }, 3: { rows: 6, short: 3, unitGiven: false, pics: 8, cols: 'thing,est,meas,diff', conv: [['1 m', 100], ['3 m', 300], ['200 cm', 2]] } };
const ALDRE_OWN = { 1: { rows: 4, cols: 'thing,with,body,mcm', choose: false, why: 1, conv: false }, 2: { rows: 5, cols: 'thing,with,body,partner,mcm', choose: false, why: 2, conv: false }, 3: { rows: 5, cols: 'thing,with,body,mcm', choose: true, why: 1, conv: true } };
const ALDRE_PAIRS_OWN = { sv_bokbredd: 'tum', sv_penna: 'tum', sv_dorrbredd: 'fot', sv_matta: 'fot', sv_bankbredd: 'aln', sv_tavla: 'aln', sv_rumbredd: 'famn' };
/** the instruction phrases each type and level must hold (the strategy named and where it starts; the level's own) */
const INSTR_OWN = {
  'K-727': ['rymmer mest', 'rymmer minst', 'klassens burk'],
  'G1-676': ['mätt', 'Räkna och skriv', 'flest'],
  'G1-677': ['Räkna uppåt', 'från det mindre talet', 'additionen som hör till'],
  'G2-637': ['Uppskatta först', 'hela centimeter eller hela meter', 'den enhet som passar bäst'],
  'G3-647': ['nyckeln', 'egyptiska', 'romerska', 'med våra siffror'],
  'G3-648': ['överslag', 'Ringa in rimligt eller orimligt enligt överslaget'],
  'G3-649': ['talsorterna var för sig', 'börja med hundratalen', 'sist entalen'],
  'G3-650': ['Förr mätte man med kroppen', 'linjal eller måttband', 'meter och centimeter', 'kamrat'],
  'G3-651': ['I varje tabell kostar alla saker lika mycket', 'Fyll i tabellerna', 'receptet'],
  'G3-652': ['närmaste halva centimeter', 'linjalens nolla', 'raka ände', 'kryss'],
};
const INSTR_LV_OWN = {
  'K-727': { 1: '1, 2 och 3', 2: '1, 2 och 3', 3: ['1, 2, 3 och 4', 'i de sista'] },
  'G1-676': { 1: ['klossar', 'gem'], 2: 'två olika enheter', 3: ['två olika enheter', 'meningen längst ner'] },
  'G1-677': { 1: 'markerade', 2: 'markerade', 3: ['Markera båda talen', 'rita hoppet'] },
  'G2-637': { 1: '1 cm och 10 cm', 2: 'enheten, cm eller m', 3: ['enheten, cm eller m', 'skiljer', 'fyll i rutorna'] },
  'G3-647': { 2: 'står I före V eller X tar man bort 1', 3: ['står I före V eller X tar man bort 1', 'romerska siffror'] },
  'G3-648': { 3: 'Räkna ut rätt svar' },
  'G3-649': { 2: 'Skriv talen i rutorna', 3: 'i den ordningen' },
  'G3-650': { 1: 'Mät varje sak med måttet i tabellen. Använd din egen kropp', 2: ['Mät varje sak med måttet i tabellen. Använd din egen kropp', 'varför talen kan bli olika'], 3: ['Välj ett mått', 'hur de gamla måtten hänger ihop'] },
  'G3-651': { 1: '8 personer', 2: '2 och för 8 personer', 3: ['antalet som fattas', '2, 8 och 12 personer', 'Skriv med ord'] },
  'G3-652': { 2: 'svara på frågan', 3: 'svara på frågorna' },
};

/* ================================================================ 1. bank */
function bankFaults(bs, be, artSrc, art2Src) {
  const f = [];
  const manifest = require(path.join(WG, 'image-cache', 'resolve.js')).manifest();
  const BW = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s|$)|\bbw \d/i;
  const picOk = (p, who) => { if (!manifest.themes[p[0]] || !manifest.themes[p[0]].nouns[p[1]]) f.push(`${who}: the picture ${p.join('/')} is not in the library`); if (BW.test(p[0])) f.push(`${who}: a black-and-white picture (${p[0]})`); };
  // K-727
  for (const c of bs.CONTAINERS) {
    if (CAP_OWN[c.id] == null) { f.push(`container ${c.id}: not in the gate's table`); continue; }
    if (Math.abs(c.litres - CAP_OWN[c.id]) > 1e-9) f.push(`container ${c.id}: ${c.litres} l (the gate: ${CAP_OWN[c.id]} l)`);
    if (c.sv !== CONT_WORD_OWN[c.id]) f.push(`container ${c.id}: the word "${c.sv}" (the gate: "${CONT_WORD_OWN[c.id]}")`);
    if (c.pic.join('/') !== CONT_PIC_OWN[c.id]) f.push(`container ${c.id}: the picture ${c.pic.join('/')} (the gate: ${CONT_PIC_OWN[c.id]})`);
    if (!c.seen || c.seen[0] !== SEEN_OWN[c.id][0] || c.seen[1] !== SEEN_OWN[c.id][1]) f.push(`container ${c.id}: by its picture ${c.seen} l (the gate: ${SEEN_OWN[c.id]})`);
    else if (c.litres < c.seen[0] || c.litres > c.seen[1]) f.push(`container ${c.id}: ${c.litres} l outside what its picture shows (${c.seen})`);
    if (c.id === 'pool' && (!c.prop || c.prop.join('/') !== 'summer/beach_ball')) f.push('the pool without the beach ball that shows its size');
    if (c.prop) picOk(c.prop, 'the pool\'s ball');
    picOk(c.pic, 'container ' + c.id);
  }
  if (bs.CONTAINERS.some((c) => /flaska|bottle/.test(c.id + c.pic[1]))) f.push('a bottle among the containers (0,33-0,5 l: too close to a mug to compare at a glance)');
  // two containers of one size class (less than 4 times apart) must never be the only ones of their kind: enough classes
  const sorted = bs.CONTAINERS.map((c) => c.id).filter((id) => CAP_OWN[id] != null).sort((a, b) => CAP_OWN[a] - CAP_OWN[b]);
  let classes = 1; for (let i = 1; i < sorted.length; i++) if (CAP_OWN[sorted[i]] / CAP_OWN[sorted[i - 1]] >= 4) classes++;
  if (classes < 4) f.push(`only ${classes} size classes among the containers (a row of four needs four)`);
  picOk(bs.JAR.pic, 'the jar'); picOk(bs.MUG.pic, 'the mug');
  // G1-676
  for (const [u, pl] of Object.entries(UNIT_PL_OWN)) if (!bs.UNITS_SV[u] || bs.UNITS_SV[u].many !== pl) f.push(`unit ${u}: the plural "${bs.UNITS_SV[u] && bs.UNITS_SV[u].many}" (the gate: "${pl}")`);
  for (const t of bs.MEASURE_THINGS) { if (THING_DRAW_OWN[t.id] !== t.draw) f.push(`measured thing ${t.id}: drawn as ${t.draw}`); if (!/n$/.test(t.sv)) f.push(`measured thing ${t.id}: "${t.sv}" is not the definite form`); }
  // G3-647
  for (const e of bs.EGYPT) if (EGYPT_OWN[e.draw] !== e.v) f.push(`Egyptian sign ${e.draw}: ${e.v} (the gate: ${EGYPT_OWN[e.draw]})`);
  for (const [s, v] of bs.ROMAN) if (readRoman(s) !== v) f.push(`Roman ${s}: ${v} (the gate reads ${readRoman(s)})`);
  if (bs.NUMERAL_SOURCES.length < 2 || bs.NUMERAL_SOURCES.some((x) => x.length < 60)) f.push('the numeral facts without their sources');
  // G3-648: every everyday question: ONE reasonable answer (the gate's), the two others at least ten times off; one unit or
  // one number for all three (no answer stands out by its look); printed smallest first
  for (const e of bs.EVERYDAY) {
    const own = EVERYDAY_OWN[e.id];
    if (!own) { f.push(`everyday ${e.id}: not in the gate's table`); continue; }
    if (e.opts[e.right] !== own) f.push(`everyday ${e.id}: the right answer "${e.opts[e.right]}" (the gate: "${own}")`);
    const v0 = valOf(own);
    e.opts.forEach((o, i) => { const v = valOf(o); if (Number.isNaN(v)) f.push(`everyday ${e.id}: "${o}" unread`); else if (i !== e.right && Math.max(v, v0) / Math.min(v, v0) < 10) f.push(`everyday ${e.id}: "${o}" is less than ten times off "${own}"`); });
    const vals = e.opts.map(valOf); if (vals.some((v, i) => i && v <= vals[i - 1])) f.push(`everyday ${e.id}: the answers not smallest first`);
    const units = new Set(e.opts.map((o) => o.split(' ').pop())), nums = new Set(e.opts.map((o) => o.replace(/ \S+$/, '')));
    if (units.size !== 1 && nums.size !== 1) f.push(`everyday ${e.id}: neither one unit nor one number (an answer stands out by its look)`);
    // one unit: the three numbers are one number times 1, 10, 100 (1 / 10 / 150 would make the odd-shaped one stand out)
    if (units.size === 1 && nums.size !== 1 && new Set([...nums].map((n) => n.replace(/ /g, '').replace(/0+$/, ''))).size !== 1) f.push(`everyday ${e.id}: the numbers ${[...nums].join(' / ')} are not one number times ten (an answer stands out by its look)`);
  }
  const ranks = [0, 1, 2].map((r) => bs.EVERYDAY.filter((e) => e.right === r).length / bs.EVERYDAY.length);
  if (ranks.some((r) => r < 0.22)) f.push(`everyday: the reasonable answer sits ${ranks.map((r) => (100 * r).toFixed(0) + '%').join(' / ')} smallest / middle / largest`);
  // G3-651
  for (const it of bs.PRICE_ITEMS) { const o = PRICE_OWN[it.id]; if (!o || o[0] !== it.sg || o[1] !== it.pl) f.push(`price item ${it.id}: "${it.sg} / ${it.pl}" (the gate: "${o && o.join(' / ')}")`); }
  for (const r of bs.RECIPES) for (const [ing, amt] of r.rows) if (amt % 2 || amt < 1) f.push(`recipe ${r.id}: ${amt} ${ing} has no whole half`);
  // G2-637 / G3-650 (the DE-A measuring bank's Swedish keys)
  for (const id of Object.keys(THING_SV_OWN)) {
    const th = be.THINGS[id];
    if (!th) { f.push(`Swedish thing ${id}: missing`); continue; }
    const own = THING_SV_OWN[id];
    if (th.cm[0] < own[0] || th.cm[1] > own[1]) f.push(`Swedish thing ${id}: ${th.cm} cm outside the gate's ${own}`);
    if (th.sv.replace(/­/g, '') !== THING_SV_WORD_OWN[id]) f.push(`Swedish thing ${id}: "${th.sv}" (the gate: "${THING_SV_WORD_OWN[id]}")`);
    if (!!th.short !== own[1] < 100) f.push(`Swedish thing ${id}: the short flag ${!!th.short} (the gate: ${own[1] < 100})`);
  }
  for (const id of be.SETS.cmsv.things) { const own = THING_SV_OWN[id]; if (!own) continue; if (own[1] >= 80 && own[0] < 180) f.push(`metric thing ${id}: ${own[0]}-${own[1]} cm (between 80 and 180 cm both cm and m are natural)`); }
  // review round 1: nothing an åk 2 child (about 1,25 m) cannot reach to measure: no height over 1,5 m
  for (const id of be.SETS.cmsv.things) { const own = THING_SV_OWN[id]; if (own && /höjd/.test(THING_SV_WORD_OWN[id]) && own[1] > 150) f.push(`metric thing ${id}: ${THING_SV_WORD_OWN[id]} up to ${own[1]} cm (an åk 2 child cannot reach it)`); }
  if (!be.SETS.cmsv.printNote) f.push('G2-637: the real-size drawings without "Utskrift: verklig storlek (100 %)"');
  for (const [id, u] of Object.entries(be.SETS.aldre.pairs)) {
    if (ALDRE_PAIRS_OWN[id] !== u) f.push(`old-measure pair ${id}: ${u} (the gate: ${ALDRE_PAIRS_OWN[id]})`);
    const own = THING_SV_OWN[id], U = BODY_CM_OWN[u]; if (!own || !U) continue;
    const most = own[1] / U[0], least = own[0] / U[1];
    if (most > 22 || least < 1.4) f.push(`old-measure ${id} in ${u}: ${least.toFixed(1)}-${most.toFixed(1)} (a nine-year-old counts 2 to about 20)`);
  }
  for (const u of be.SETS.aldre.units) {
    const U = be.UNITS[u];
    if (!U || !U.sv || U.sv.one !== UNIT_WORD_OWN[u][0] || U.sv.many !== UNIT_WORD_OWN[u][1]) f.push(`old measure ${u}: the words "${U && U.sv && U.sv.one} / ${U && U.sv && U.sv.many}"`);
    if (!U || U.approxCm[0] < BODY_CM_OWN[u][0] - 0.01 || U.approxCm[1] > BODY_CM_OWN[u][1] + 0.01) f.push(`old measure ${u}: a child's ${U && U.approxCm} cm (the gate: ${BODY_CM_OWN[u]})`);
    const O = be.OLD_UNITS[u];
    if (!O || O.sv !== OLD_OWN[u].sv || O.body !== OLD_OWN[u].body || Math.abs(O.cm - OLD_OWN[u].cm) > 0.05) f.push(`the old length of ${u}: "${O && O.sv}" (${O && O.cm} cm; the gate: "${OLD_OWN[u].sv}", ${OLD_OWN[u].cm.toFixed(2)} cm, ${OLD_OWN[u].body})`);
    // the rounded value printed is the old length rounded as a class writes it
    if (O) { const m = /≈ ([\d,]+) (cm|m)$/.exec(O.sv); const v = m ? Number(m[1].replace(',', '.')) * (m[2] === 'm' ? 100 : 1) : NaN; if (!(Math.abs(v - O.cm) / O.cm < 0.05)) f.push(`the old length of ${u}: "${O.sv}" is not about ${O.cm} cm`); }
  }
  // how the old measures go together (level 3's conversions)
  const conv = (be.SETS.aldre.levels[3].conv || []).map(([l, v, u]) => `${l} ${v} ${u}`).join(' | ');
  if (conv !== '1 aln = 2 fot | 1 famn = 3 alnar | 1 fot ≈ 30 cm') f.push(`the old measures' conversions "${conv}"`);
  for (const p of be.UNIT_PICS) { const cm = UNIT_PIC_OWN[p.id]; if (cm == null) { f.push(`unit picture ${p.id}: not in the gate's table`); continue; } if (unitClass(cm) !== p.ans) f.push(`unit picture ${p.id}: the bank says ${p.ans}, the gate ${unitClass(cm)} (${cm} cm)`); picOk(p.pic, 'unit picture ' + p.id); if (p.pic[0] === 'toys') f.push(`unit picture ${p.id}: a toy for a real length`); }
  if (be.UNIT_PICS.filter((p) => p.ans === 'cm').length < 4 || be.UNIT_PICS.filter((p) => p.ans === 'm').length < 4) f.push('too few cm or m pictures');
  const X = be.TEXT.mess.sv;
  if (X.whoseChoices.join(' / ') !== 'min / kamratens / ungefär lika långa') f.push(`the comparison's choices "${X.whoseChoices.join(' / ')}"`);
  if (!/dörrens bredd/.test(X.cmpHead) || !/fötter/.test(X.cmpHead)) f.push('the comparison does not name the door\'s width and the feet');
  if (X.ref100 !== '1 m = 100 cm') f.push(`"${X.ref100}"`);
  // no exclamation, no praise anywhere a page prints
  const words = JSON.stringify(bs.TEXT) + JSON.stringify(X);
  if (/!|bra jobbat|super|toppen/i.test(words.replace(/"[a-zA-Z0-9]+":/g, ''))) f.push('a page string celebrates (an exclamation or praise)');
  if (/räkna upp[^åp]/i.test(words)) f.push('"räkna upp" in a page string (a Swedish class writes "räkna uppåt")');
  // every colour the drawings write
  for (const m of artSrc.matchAll(/#[0-9A-Fa-f]{6}\b/g)) if (!ARTSV.PAL_SV.has(m[0].toUpperCase())) f.push(`a drawing colour ${m[0]} outside PAL_SV`);
  for (const m of art2Src.matchAll(/#[0-9A-Fa-f]{6}\b/g)) if (!ARTE2.PAL_E2.has(m[0].toUpperCase())) f.push(`a measuring drawing colour ${m[0]} outside PAL_E2`);
  return f;
}
function instrFaults(id, lv, text) {
  const f = [];
  const own = INSTR_OWN[id].filter((x) => !(id === 'K-727' && x === 'rymmer minst' && false));
  for (const x of own) if (!text.includes(x)) f.push(`${id} L${lv}: the instruction lacks "${x}"`);
  for (const lx of [].concat((INSTR_LV_OWN[id] && INSTR_LV_OWN[id][lv]) || [])) if (!text.includes(lx)) f.push(`${id} L${lv}: the level's instruction lacks "${lx}"`);
  if (/!/.test(text)) f.push(`${id} L${lv}: an exclamation in the instruction`);
  if (/räkna upp(?!åt)/i.test(text)) f.push(`${id} L${lv}: "räkna upp" (a Swedish class writes "räkna uppåt")`);
  if (/stegvis|uppställning/i.test(text) && id === 'G3-649') f.push(`${id} L${lv}: the instruction names another strategy`);
  if (/Ringa in om /.test(text)) f.push(`${id} L${lv}: "Ringa in om …" (a Swedish sheet names what to ring)`);
  if (/kostar varje sak/.test(text)) f.push(`${id} L${lv}: "kostar varje sak" (a teacher writes "kostar alla saker")`);
  if (/ditt eget mått på bilden/.test(text)) f.push(`${id} L${lv}: "ditt eget mått på bilden" (the measure is named in the table)`);
  return f;
}
/** review round 1: the Swedish title */
function titleFaults(id, title) {
  const f = [];
  if (TITLE_OWN[id] && title !== TITLE_OWN[id]) f.push(`${id}: the title "${title}" (the gate: "${TITLE_OWN[id]}")`);
  if (/räkna upp(?!åt)/i.test(title)) f.push(`${id}: the title says "räkna upp" (to list): "räkna uppåt"`);
  return f;
}

/* ================================================================ 2. build */
function buildPage(t, lv, seed) {
  const b = t.build({ theme: null, difficulty: lv, locale: 'sv', unit: null }, { rng: makeRng(instanceSeed({ typeId: t.id, theme: null, difficulty: lv, seedEpoch: 1, variant: seed })), variant: seed, seedVariant: seed });
  return { html: b.bodyHtml, meta: b.meta };
}
const num = (x) => Number(String(x).replace(/ /g, '').replace(',', '.'));
const txt = ($, e) => $(e).text().replace(/­/g, '').replace(/\s+/g, ' ').trim();
const stamp = (e) => (e.attribs['data-sv-answer'] != null ? e.attribs['data-sv-answer'] : e.attribs['data-e2-answer']);
/** the tokens of a printed number sentence row: numbers, operators and boxes in order (box = { box: stamp }) */
function tokens($, rowEl) {
  const out = [];
  $(rowEl).children().each((i, c) => {
    const cls = $(c).attr('class') || '';
    if (/ws-blankbox/.test(cls)) out.push({ box: stamp(c) });
    else if (/sv-op|e2-op/.test(cls)) out.push(txt($, c));
    else if (/sv-big|e2-big/.test(cls)) for (const w of txt($, c).split(' ')) out.push(w);
  });
  return out;
}
/** solve a sentence with ONE box over every whole number 0..1000: the values that make it true */
function solve(tk) {
  const isBox = (x) => x && typeof x === 'object';
  const boxes = tk.filter(isBox);
  if (boxes.length !== 1) return { err: `${boxes.length} boxes` };
  const eq = tk.indexOf('=');
  const val = (side, v) => { let acc = null, op = '+'; for (const x of side) { if (x === '+' || x === MN) { op = x; continue; } const n = isBox(x) ? v : Number(x); if (Number.isNaN(n)) return NaN; acc = acc === null ? n : op === '+' ? acc + n : acc - n; } return acc; };
  const sols = [];
  for (let v = 0; v <= 1000; v++) { const L = val(tk.slice(0, eq), v), R = val(tk.slice(eq + 1), v); if (L === R && !Number.isNaN(L)) sols.push(v); }
  return { sols, stamp: boxes[0].box };
}
/** the x extremes of an svg path's numbers (absolute M L H V A commands: the gate's own reading, the arc's end points and,
 *  for a half circle, its far side) */
function pathXs(d) {
  const xs = []; const tk = String(d).match(/[A-Za-z]|-?[0-9]*\.?[0-9]+/g) || []; let i = 0, cmd = null, x = 0, y = 0;
  while (i < tk.length) {
    if (/[A-Za-z]/.test(tk[i])) { cmd = tk[i++]; if (cmd === 'Z' || cmd === 'z') continue; }
    if (cmd === 'M' || cmd === 'L') { x = +tk[i++]; y = +tk[i++]; xs.push(x); }
    else if (cmd === 'H') { x = +tk[i++]; xs.push(x); }
    else if (cmd === 'V') { y = +tk[i++]; }
    else if (cmd === 'Q') { i += 2; x = +tk[i++]; y = +tk[i++]; xs.push(x); }
    else if (cmd === 'A') { const r = +tk[i]; i += 5; const x2 = +tk[i++], y2 = +tk[i++]; const half = Math.abs(Math.hypot(x2 - x, y2 - y) - 2 * r) < 0.05; if (half) { const cx = (x + x2) / 2; xs.push(cx - r, cx + r); } x = x2; y = y2; xs.push(x); }
    else i++;
  }
  return xs;
}

function pathYs(d) {
  const ys = []; const tk = String(d).match(/[A-Za-z]|-?[0-9]*\.?[0-9]+/g) || []; let i = 0, cmd = null;
  while (i < tk.length) {
    if (/[A-Za-z]/.test(tk[i])) { cmd = tk[i++]; if (cmd === 'Z' || cmd === 'z') continue; }
    if (cmd === 'M' || cmd === 'L') { i++; ys.push(+tk[i++]); } else if (cmd === 'V') ys.push(+tk[i++]); else i++;
  }
  return ys;
}
function pageFaults(id, lv, html) {
  const f = [];
  const $ = cheerio.load(html);
  const R = $('[data-dk]');
  const loc = R.attr('data-sv-locale') || R.attr('data-e2-locale');
  if (loc !== 'sv') f.push('not a Swedish page');
  if (+(R.attr('data-sv-level') || R.attr('data-e2-level')) !== lv) f.push('the level stamp');
  if ($('[data-sv-record][data-sv-answer]').length) f.push('a record box carries a key value');
  const M = MODE[id];
  if (M === 'rymmer') {
    const L = RYM_OWN[lv];
    const pairs = $('[data-sv-pair]');
    if (pairs.length !== L.most + L.least) f.push(`${pairs.length} pairs (the level: ${L.most + L.least})`);
    const seen = [];
    pairs.each((i, p) => {
      const kind = $(p).attr('data-sv-kind'), l = $(p).attr('data-sv-l'), r = $(p).attr('data-sv-r');
      if (CAP_OWN[l] == null || CAP_OWN[r] == null) { f.push(`pair ${i + 1}: ${l} / ${r} not in the gate's table`); return; }
      if ((kind === 'most') !== (i < L.most)) f.push(`pair ${i + 1}: ${kind} (the level: ${L.most} most, then ${L.least} least)`);
      if (ratioOwn(l, r) < L.ratio) f.push(`pair ${l} / ${r}: ${ratioOwn(l, r).toFixed(1)} times apart (the level: at least ${L.ratio})`);
      if (!seenApartOwn(l, r)) f.push(`pair ${l} / ${r}: by their pictures one could hold as much as the other (two right answers)`);
      const want = kind === 'most' ? (CAP_OWN[l] > CAP_OWN[r] ? l : r) : (CAP_OWN[l] < CAP_OWN[r] ? l : r);
      const right = $(p).find('[data-dk-answer="right"]').map((j, e) => $(e).attr('data-sv-pick')).get();
      if (right.length !== 1 || right[0] !== want) f.push(`pair ${l} / ${r} (${kind}): the stamp ${right} (the gate: ${want})`);
      $(p).find('[data-sv-pick]').each((j, e) => { const c = $(e).attr('data-sv-pick'); if (txt($, $(e).find('[data-sv-word]')) !== CONT_WORD_OWN[c]) f.push(`${c}: the word "${txt($, $(e).find('[data-sv-word]'))}"`); if ($(e).find('[data-sv-pic]').attr('data-sv-pic') !== CONT_PIC_OWN[c]) f.push(`${c}: the picture ${$(e).find('[data-sv-pic]').attr('data-sv-pic')}`); });
      seen.push(l, r);
    });
    if (new Set(seen).size !== seen.length) f.push('a container twice in the pairs');
    const order = ($('[data-sv-order]').attr('data-sv-order') || '').split(',').filter(Boolean);
    if (order.length !== L.order) f.push(`a row of ${order.length} to number (the level: ${L.order})`);
    const byCap = order.slice().sort((a, b) => CAP_OWN[a] - CAP_OWN[b]);
    byCap.forEach((c, i) => { if (i && CAP_OWN[c] / CAP_OWN[byCap[i - 1]] < 4) f.push(`the row: ${byCap[i - 1]} and ${c} are less than 4 times apart`); if (i && !seenApartOwn(byCap[i - 1], c)) f.push(`the row: by their pictures ${byCap[i - 1]} could hold as much as ${c}`); });
    $('[data-sv-pick="pool"], [data-sv-order] [data-sv-word="pool"]').each((i, e) => { const tile = $(e).is('[data-sv-pick]') ? $(e) : $(e).parent(); if (tile.find('[data-sv-cpic="pool"] [data-sv-prop="summer/beach_ball"]').length !== 1) f.push('a pool drawn without its beach ball (its size does not show)'); });
    $('[data-sv-rank]').each((i, e) => { const c = $(e).attr('data-sv-rank'); if (+stamp(e) !== byCap.indexOf(c) + 1) f.push(`the row: ${c} stamped ${stamp(e)} (the gate: ${byCap.indexOf(c) + 1})`); });
    if ($('[data-sv-rank]').length !== L.order) f.push('the row\'s boxes');
    if (!$('[data-sv-jardraw]').length || $('[data-sv-jarcount]').attr('data-sv-answer') != null || !$('[data-sv-jarcount][data-sv-record]').length) f.push('the jar: a box to draw in and a record box (no key value)');
  }
  if (M === 'enheter') {
    const L = ENH_OWN[lv], PX = UNIT_PX_OWN[lv];
    const cards = $('[data-sv-card]');
    if (cards.length !== L.cards) f.push(`${cards.length} things (the level: ${L.cards})`);
    const pairsUsed = new Set();
    cards.each((i, c) => {
      const big = $(c).attr('data-sv-big'), small = $(c).attr('data-sv-small'), Lpx = +$(c).attr('data-sv-len');
      if (PX[big] <= PX[small]) f.push(`thing ${i + 1}: the "big" unit ${big} is not longer than ${small}`);
      pairsUsed.add(big + '-' + small);
      if (!L.pairs.includes(big + '-' + small)) f.push(`thing ${i + 1}: the pair ${big}-${small} on level ${lv}`);
      const strip = $(c).find('[data-sv-art="strip"]');
      if (+strip.attr('data-sv-len') !== Lpx) f.push(`thing ${i + 1}: the strip's length`);
      const g = strip.find('[data-sv-thing]'), x0 = +g.attr('data-sv-x0');
      if (THING_DRAW_OWN[$(c).attr('data-sv-thing')] !== g.attr('data-sv-thing')) f.push(`thing ${i + 1}: drawn as ${g.attr('data-sv-thing')}`);
      if (g.attr('data-sv-thing') === 'book') { const ys = []; strip.find('path[data-sv-thing-outline]').each((j, o) => ys.push(...pathYs($(o).attr('d')))); const bh = Math.max(...ys) - Math.min(...ys); if (!(bh >= 44) || Lpx / bh > 5) f.push(`thing ${i + 1}: the book ${Math.round(Lpx)} x ${Math.round(bh)} px (edge-on it reads as a ruler: from above, at least 44 px, at most 5 times as long)`); }
      // the thing's outline: its path and ellipse extremes are x0 and x0 + L (read by the gate)
      const xs = []; strip.find('[data-sv-thing-outline]').each((j, o) => { if (o.name === 'ellipse') xs.push(+$(o).attr('cx') - +$(o).attr('rx'), +$(o).attr('cx') + +$(o).attr('rx')); else xs.push(...pathXs($(o).attr('d'))); });
      if (!xs.length || xs.some((x) => !Number.isFinite(x)) || Math.abs(Math.min(...xs) - x0) > 0.05 || Math.abs(Math.max(...xs) - (x0 + Lpx)) > 0.05) f.push(`thing ${i + 1}: its outline runs ${Math.min(...xs)}-${Math.max(...xs)}, its length ${x0}-${x0 + Lpx}`);
      const rows = strip.find('[data-sv-row]');
      if (rows.length !== 2) f.push(`thing ${i + 1}: ${rows.length} rows of units`);
      const counts = {};
      rows.each((j, r) => {
        const u = $(r).attr('data-sv-rowunit'), n = +$(r).attr('data-sv-rown'), px = +$(r).attr('data-sv-rowpx');
        counts[u] = n;
        if (px !== PX[u]) f.push(`thing ${i + 1}: a ${u} ${px} px (the level: ${PX[u]})`);
        if (Math.abs(n * PX[u] - Lpx) > 0.01) f.push(`thing ${i + 1}: ${n} ${u} of ${PX[u]} px do not make its ${Lpx} px (a count at a blurred edge)`);
        const units = $(r).find('[data-sv-unit]');
        if (units.length !== n) f.push(`thing ${i + 1}: ${units.length} ${u} drawn for ${n}`);
        // every unit sits in its own slot: the k-th from x0 + k·px (its own rect or path, read by the gate)
        units.each((k, un) => { const e = $(un).children().first(); const ux = e.is('rect') ? +e.attr('x') : Math.min(...pathXs(e.attr('d'))); if (Math.abs(ux - (x0 + k * PX[u])) > 0.05) f.push(`thing ${i + 1}: ${u} ${k + 1} starts at ${ux} (its slot ${x0 + k * PX[u]})`); });
        if (n < 2 || n > 20) f.push(`thing ${i + 1}: ${n} ${u} (2 to 20)`);
      });
      if (counts[small] > L.maxSmall) f.push(`thing ${i + 1}: ${counts[small]} ${small} (the level: at most ${L.maxSmall})`);
      $(c).find('[data-sv-count]').each((j, b) => { const u = $(b).attr('data-sv-count'); if (+stamp(b) !== counts[u]) f.push(`thing ${i + 1}: the ${u} box stamped ${stamp(b)} (the gate: ${counts[u]})`); });
      const most = $(c).find('[data-dk-item^="most"] [data-dk-answer="right"]');
      if (txt($, most) !== UNIT_PL_OWN[small]) f.push(`thing ${i + 1}: "Det gick åt flest" stamped "${txt($, most)}" (the gate: ${UNIT_PL_OWN[small]})`);
      const opts = $(c).find('[data-dk-item^="most"] [data-dk-answer]').map((j, e) => txt($, e)).get().sort().join();
      if (opts !== [UNIT_PL_OWN[big], UNIT_PL_OWN[small]].sort().join()) f.push(`thing ${i + 1}: the choices ${opts}`);
    });
    for (const p of L.pairs) if (!pairsUsed.has(p) && L.cards >= L.pairs.length) f.push(`no thing measured with ${p}`);
    const why = $('[data-sv-why]');
    if ((lv === 3) !== !!why.length) f.push(`the rule sentence on level ${lv}`);
    if (why.length && txt($, why.find('[data-dk-answer="right"]')) !== 'fler') f.push('the rule sentence: "Ju kortare enheten är, desto fler går det åt" is the right one');
  }
  if (M === 'skillnad') {
    const L = SKI_OWN[lv];
    const cards = $('[data-sv-task-card]');
    if (cards.length !== L.tasks) f.push(`${cards.length} tasks (the level: ${L.tasks})`);
    let cross = 0; const as = [], bs = [];
    cards.each((i, c) => {
      const a = +$(c).attr('data-sv-a'), b = +$(c).attr('data-sv-b'), d = b - a;
      if (!(b <= 20 && a >= 1 && d >= L.d[0] && d <= L.d[1])) f.push(`task ${b} − ${a}: outside 0-20 or a difference of ${d} (the level: ${L.d.join('-')})`);
      if (a === 10 || b === 10) f.push(`task ${b} − ${a}: a ten at an end`);
      if (a < 10 && b > 10) cross++;
      as.push(a); bs.push(b);
      const blanks = { jump: null, sub: null, add: null };
      $(c).find('[data-sv-blank]').each((j, e) => { blanks[$(e).attr('data-sv-blank')] = e; });
      if (!blanks.jump || +stamp(blanks.jump) !== d) f.push(`task ${b} − ${a}: the jump stamped ${blanks.jump && stamp(blanks.jump)} (the gate: ${d})`);
      for (const k of ['sub', 'add']) {
        if (!blanks[k]) { f.push(`task ${b} − ${a}: no ${k} frame`); continue; }
        const tk = tokens($, $(blanks[k]).parent()), sv = solve(tk);
        if (sv.err || sv.sols.length !== 1 || sv.sols[0] !== +sv.stamp) f.push(`task ${b} − ${a}: the ${k} frame ${tk.map((x) => (typeof x === 'object' ? '☐' : x)).join(' ')} solves to ${sv.sols} (stamp ${sv.stamp})`);
        const nums = tk.filter((x) => typeof x !== 'object' && /^\d+$/.test(x)).map(Number);
        if (k === 'sub' && nums.join() !== `${b},${a}`) f.push(`task ${b} − ${a}: the subtraction prints ${nums}`);
        if (k === 'add' && nums.join() !== `${a},${b}`) f.push(`task ${b} − ${a}: the addition prints ${nums}`);
      }
      const line = $(c).find('[data-sv-art="line20"]');
      if (line.attr('data-sv-labels') !== L.labels) f.push(`task ${b} − ${a}: labels ${line.attr('data-sv-labels')} (the level: ${L.labels})`);
      const labels = line.find('[data-sv-ticklabel]').map((j, e) => +$(e).attr('data-sv-ticklabel')).get().join();
      const wantLabels = { all: Array.from({ length: 21 }, (_, k) => k).join(), fives: '0,5,10,15,20', ends: '0,10,20' }[L.labels];
      if (labels !== wantLabels) f.push(`task ${b} − ${a}: the line labels ${labels}`);
      if (line.find('[data-sv-tick]').length !== 21) f.push(`task ${b} − ${a}: ${line.find('[data-sv-tick]').length} ticks`);
      const marks = line.find('[data-sv-mark]').map((j, e) => +$(e).attr('data-sv-mark')).get().sort((x, y) => x - y).join();
      if (L.marks ? marks !== `${a},${b}` : marks !== '') f.push(`task ${b} − ${a}: the marks ${marks || 'none'} on level ${lv}`);
      const arc = line.find('[data-sv-arc]').attr('data-sv-arc');
      if (L.arc ? arc !== `${a}-${b}` : arc) f.push(`task ${b} − ${a}: the jump drawn ${arc || 'nowhere'} on level ${lv}`);
    });
    if (cross !== L.cross) f.push(`${cross} tasks pass 10 (the level: ${L.cross})`);
    if (new Set(as).size !== as.length || new Set(bs).size !== bs.length) f.push('two tasks start or end on one number');
  }
  if (M === 'symboler') {
    const L = SYM_OWN[lv];
    const eg = $('[data-sv-egitem]');
    if (eg.length !== L.egypt) f.push(`${eg.length} Egyptian numbers (the level: ${L.egypt})`);
    let withZero = 0, small = 0;
    eg.each((i, e) => {
      // the gate reads the number from the drawn signs (each sign's value counted)
      let v = 0; $(e).find('[data-sv-glyph]').each((j, gl) => { v += EGYPT_OWN[$(gl).attr('data-sv-glyph')] || NaN; });
      const st = +stamp($(e).find('[data-sv-read="egypt"]')[0]);
      if (v !== st || v !== +$(e).attr('data-sv-val')) f.push(`Egyptian ${i + 1}: the signs read ${v}, stamped ${st}`);
      if (v > L.maxE) f.push(`Egyptian ${v} over ${L.maxE}`);
      if (!L.lotus && $(e).find('[data-sv-glyph="lotus"]').length) f.push('a lotus on level 1');
      const ds = String(v).split('').map(Number); if (v !== 1000 && ds.some((x) => x > 7)) f.push(`Egyptian ${v}: more than seven of one sign`);
      if (v >= 100 && v < 1000 && /0/.test(String(v).slice(1))) withZero++;
      if (v < 100) small++;
      // a group of five or more signs stands in two rows, the upper the larger half
      $(e).find('[data-sv-group]').each((j, gr) => { const k = +$(gr).attr('data-sv-count'); if (k > 9) f.push(`a group of ${k} signs`); });
    });
    if (!withZero) f.push('no Egyptian number with a 0 inside (what the zero question is about)');
    if (!small) f.push('no Egyptian number under 100');
    const ro = $('[data-sv-romanval]');
    if (ro.length !== L.roman) f.push(`${ro.length} Roman numbers (the level: ${L.roman})`);
    let sub = 0;
    ro.each((i, e) => { const s = txt($, e), n = readRoman(s), st = +stamp($(e).parent().find('[data-sv-read="roman"]')[0]); if (n !== st) f.push(`Roman ${s}: the gate reads ${n}, stamped ${st}`); if (romanOwn(n) !== s) f.push(`Roman ${s}: not the standard form of ${n}`); if (n > 30 || n < 1) f.push(`Roman ${s}: over 30`); if (/IV|IX/.test(s)) sub++; });
    if (L.sub ? sub < Math.min(2, L.roman - 1) : sub) f.push(`${sub} Roman numbers with IV or IX on level ${lv}`);
    const toE = $('[data-sv-egdraw]');
    if (toE.length !== L.writeE) f.push(`${toE.length} numbers to write in Egyptian signs`);
    toE.each((i, e) => { const n = +$(e).attr('data-sv-egdraw'), key = $(e).attr('data-sv-key'); const parts = [[1000, 'lotusblomm'], [100, 'rep'], [10, 'båg'], [1, 'streck']]; let r = n; for (const [v, w] of parts) { const k = Math.floor(r / v); r -= k * v; if (k && !new RegExp(`${k} ${w}`).test(key)) f.push(`write ${n}: the key lacks ${k} ${w}`); } if (!/inget tecken för 0/.test(key)) f.push(`write ${n}: the key does not say there is no sign for 0`); });
    if (lv === 3 && !toE.filter((i, e) => /0/.test($(e).attr('data-sv-egdraw').slice(1))).length) f.push('level 3: no number with a 0 to write in Egyptian signs');
    const toR = $('[data-sv-toroman]');
    if (toR.length !== L.toRoman) f.push(`${toR.length} numbers to write in Roman numerals`);
    toR.each((i, e) => { const n = +$(e).attr('data-sv-toroman'), k = $(e).parent().find('[data-sv-romankey]').attr('data-sv-romankey'); if (k !== romanOwn(n)) f.push(`write ${n} in Roman: the key ${k} (the gate: ${romanOwn(n)})`); });
    if (txt($, $('[data-sv-key] [data-sv-keyhead]')) !== 'Nyckel') f.push('the key box is not named "Nyckel" (the instruction says "Titta på nyckeln")');
    if (lv === 1 && !/Egyptierna behövde ingen nolla eftersom/.test(txt($, $.root()))) f.push('the zero question\'s starter is not "Egyptierna behövde ingen nolla eftersom"');
    const keyVals = $('[data-sv-keyval]').map((i, e) => +$(e).attr('data-sv-keyval')).get().join();
    if (keyVals !== (L.lotus ? '1,10,100,1000' : '1,10,100')) f.push(`the key's signs ${keyVals}`);
    if (L.sub !== !!$('[data-sv-keysub]').length) f.push('the key\'s line "I före V eller X: ta bort 1" on the wrong level');
    const open = $('[data-sv-open]');
    if (open.length !== 1 || !/plats/.test(open.attr('data-sv-key')) || !/eget värde/.test(open.attr('data-sv-key'))) f.push('the zero question without its key (each sign its own value; the place in our system)');
  }
  if (M === 'rimligt') {
    const L = RIM_OWN[lv];
    const items = $('[data-sv-item]');
    if (items.length !== L.n) f.push(`${items.length} calculations (the level: ${L.n})`);
    let wrong = 0, plus = 0;
    const rule = txt($, $('[data-sv-rulebox]'));
    if (!/Avrunda båda talen till närmaste hundratal och räkna/.test(rule) || !/Skiljer svaret mer än 100 från överslaget, är svaret orimligt/.test(rule)) f.push('the rule is not printed word for word');
    // review round 1: the printed number must be at least the largest distance any RIGHT answer can lie from its
    // överslag (over every sum and difference of two three-digit numbers), or the rule calls a right answer orimligt
    const ruleN = +((/mer än (\d+) från överslaget/.exec(rule) || [])[1]);
    if (!(ruleN >= RIM_MAX_RIGHT.mx)) f.push(`the printed rule is false: a right answer can lie ${RIM_MAX_RIGHT.mx} from its överslag (${RIM_MAX_RIGHT.ex}), more than ${ruleN}`);
    items.each((i, it) => {
      const m = /^([\d ]+) ([+−]) ([\d ]+) = ([\d ]+)$/.exec(txt($, $(it).find('[data-sv-calc]')));
      if (!m) { f.push(`calculation ${i + 1} unread`); return; }
      const a = num(m[1]), o = m[2], b = num(m[3]), shown = num(m[4]);
      const tru = o === '+' ? a + b : a - b;
      if (o === '+') plus++;
      if (a % 100 === 50 || b % 100 === 50) f.push(`${a} ${o} ${b}: a number ending in 50 (rounding has two answers)`);
      const est = o === '+' ? round100(a) + round100(b) : round100(a) - round100(b);
      const off = Math.abs(shown - est), byRule = off > RIM_RULE_OWN ? 'orimligt' : 'rimligt';
      const chip = txt($, $(it).find('[data-dk-answer="right"]'));
      if (chip !== byRule) f.push(`${a} ${o} ${b} = ${shown}: the stamp ${chip}, the rule ${byRule} (${off} from ${est})`);
      if ((shown === tru) !== (byRule === 'rimligt')) f.push(`${a} ${o} ${b} = ${shown}: ${shown === tru ? 'right' : 'wrong'} but ${byRule} by the rule (a child who works it out disagrees with the estimate)`);
      if (shown === tru ? off > RIM_RIGHT_OWN : off < RIM_WRONG_OWN) f.push(`${a} ${o} ${b} = ${shown}: ${off} from the överslag, too close to the rule's 100 (right at most ${RIM_RIGHT_OWN}, wrong at least ${RIM_WRONG_OWN})`);
      if (shown !== tru) { wrong++; if (Math.abs(shown - tru) !== 100) f.push(`${a} ${o} ${b} = ${shown}: not a forgotten carry or exchange (100 off)`); }
      if (shown % 100 === 0) f.push(`${a} ${o} ${b} = ${shown}: an answer ending in 00 (only a right answer can, so it tells)`);
      if (String(shown).length !== 3 || String(a).length !== 3 || String(b).length !== 3) f.push(`${a} ${o} ${b} = ${shown}: not three digits everywhere`);
      if (o === '+' ? (a % 100) + (b % 100) < 100 : (a % 100) >= (b % 100)) f.push(`${a} ${o} ${b}: no ${o === '+' ? 'carry into' : 'exchange from'} the hundreds`);
      const ov = {}; $(it).find('[data-sv-over]').each((j, e) => { ov[$(e).attr('data-sv-over')] = +stamp(e); });
      if (ov.a !== round100(a) || ov.b !== round100(b) || ov.est !== est) f.push(`${a} ${o} ${b}: the överslag boxes ${ov.a}, ${ov.b}, ${ov.est} (the gate: ${round100(a)}, ${round100(b)}, ${est})`);
      if (!/Enligt överslaget är svaret/.test(txt($, it))) f.push(`${a} ${o} ${b}: the chips not tied to the estimate in words`);
      const rb = $(it).find('[data-sv-rightans]');
      if (L.rightBox ? +stamp(rb[0]) !== tru : rb.length) f.push(`${a} ${o} ${b}: the right-answer box on level ${lv}`);
    });
    if (wrong !== L.n / 2) f.push(`${wrong} wrong of ${L.n} (half)`);
    if (plus !== L.plus) f.push(`${plus} additions (the level: ${L.plus})`);
    const ev = $('[data-dk-item^="ev-"]');
    if (ev.length !== 3) f.push(`${ev.length} everyday questions`);
    ev.each((i, g) => { const id = $(g).attr('data-dk-item').slice(3); const right = txt($, $(g).find('[data-dk-answer="right"]')); if (right !== EVERYDAY_OWN[id]) f.push(`everyday ${id}: the stamp "${right}" (the gate: "${EVERYDAY_OWN[id]}")`); });
  }
  if (M === 'mellanled') {
    const L = MEL_OWN[lv];
    const cards = $('[data-sv-mcard]');
    const kinds = {};
    cards.each((i, c) => {
      const m = /^(\d+) ([+−]) (\d+)/.exec(txt($, $(c).find('[data-sv-task]')));
      if (!m) { f.push(`task ${i + 1} unread`); return; }
      const a = +m[1], o = m[2], b = +m[3];
      const da = [Math.floor(a / 100), Math.floor(a / 10) % 10, a % 10], db = [Math.floor(b / 100), Math.floor(b / 10) % 10, b % 10];
      const parts = [100, 10, 1].map((p, k) => [da[k] * p, db[k] * p, o === '+' ? (da[k] + db[k]) * p : (da[k] - db[k]) * p]);
      const res = o === '+' ? a + b : a - b;
      let kind;
      if (o === '+') { const eo = da[2] + db[2] >= 10, to = da[1] + db[1] >= 10; kind = eo && to ? 'two' : eo ? '+e' : to ? '+t' : '+0'; if (eo && da[1] + db[1] + 1 >= 10) kind = 'two'; }
      else kind = da[0] > db[0] && da[1] > db[1] && da[2] > db[2] ? '-0' : 'exchange';
      kinds[kind] = (kinds[kind] || 0) + 1;
      if (kind === 'two' || kind === 'exchange') f.push(`${a} ${o} ${b}: ${kind === 'two' ? 'two växlingar' : 'a subtraction needing a växling (a part below zero)'}`);
      if (res > 999 || res < 1) f.push(`${a} ${o} ${b}: outside 0-1000`);
      if (parts.some((p) => p[0] === 0 || p[1] === 0 || p[2] === 0)) f.push(`${a} ${o} ${b}: a part is 0`);
      if (o === MN && parts.some((p) => p[2] < 0)) f.push(`${a} ${o} ${b}: a negative part`);
      const st = (sel) => { const e = $(c).find(sel); return e.length === 1 ? +stamp(e[0]) : NaN; };
      if (L.form === 'short') {
        const v = ['h', 't', 'e'].map((k) => st(`[data-sv-part="${k}"]`));
        if (v.join() !== parts.map((p) => p[2]).join()) f.push(`${a} ${o} ${b}: the parts ${v} (the gate: ${parts.map((p) => p[2])}, hundreds first)`);
        if (st('[data-sv-res]') !== res) f.push(`${a} ${o} ${b}: the answer`);
      } else {
        ['h', 't', 'e'].forEach((k, j) => {
          if (st(`[data-sv-part="${k}"]`) !== parts[j][2]) f.push(`${a} ${o} ${b}: the ${k} part`);
          const labelRow = $(c).find(`[data-sv-label="${k}"]`).parent();
          if (L.form === 'printed') { const nums = tokens($, labelRow.children().last()).filter((x) => typeof x !== 'object' && /^\d+$/.test(x)).map(Number); if (nums.join() !== `${parts[j][0]},${parts[j][1]}`) f.push(`${a} ${o} ${b}: the ${k} row prints ${nums}`); }
          else { if (st(`[data-sv-part="${k}x"]`) !== parts[j][0] || st(`[data-sv-part="${k}y"]`) !== parts[j][1]) f.push(`${a} ${o} ${b}: the ${k} row's boxes`); const alt = $(c).find(`[data-sv-part="${k}x"]`).attr('data-sv-alt'); if (o === '+' ? alt !== `${parts[j][1]} + ${parts[j][0]} = ${parts[j][2]}` : alt) f.push(`${a} ${o} ${b}: the ${k} row's swap ${o === '+' ? 'not accepted' : 'accepted for a subtraction'}`); }
        });
        if (['h', 't', 'e'].map((k) => st(`[data-sv-sum="${k}"]`)).join() !== parts.map((p) => p[2]).join() || st('[data-sv-sum="s"]') !== res) f.push(`${a} ${o} ${b}: the svar row`);
        if (txt($, $(c).find('[data-sv-label]')).replace(/\s/g, '') !== 'hundrataltiotalentalsvar') f.push(`${a} ${o} ${b}: the rows are not hundratal, tiotal, ental, svar`);
      }
    });
    for (const [k, n] of Object.entries(L.kinds)) if ((kinds[k] || 0) !== n) f.push(`${kinds[k] || 0} tasks of kind ${k} (the level: ${n})`);
  }
  if (M === 'proportion') {
    const L = PRO_OWN[lv];
    const tables = $('[data-sv-table]');
    if (tables.length !== 2) f.push(`${tables.length} price tables`);
    const ids = [], units = [];
    tables.each((ti, tb) => {
      const card = $(tb).closest('[data-sv-pricecard]'), id = card.attr('data-sv-item'); ids.push(id);
      const head = txt($, card.find('.sv-head').first());
      if (!PRICE_OWN[id] || head !== `Alla ${PRICE_OWN[id][1]} kostar lika mycket.`) f.push(`table ${ti + 1}: the heading "${head}"`);
      const rows = $(tb).children('div');
      const cellsOf = (r) => $(r).children().slice(1).map((j, c) => { const b = $(c).find('.ws-blankbox'); return b.length ? { box: +stamp(b[0]) } : { v: num(txt($, c)) }; }).get();
      const counts = cellsOf(rows[0]), prices = cellsOf(rows[1]);
      // the given pair(s): a column where both the count and the price are printed
      const given = counts.map((c, j) => (c.v != null && prices[j].v != null ? j : -1)).filter((j) => j >= 0);
      if (given.length !== 1) { f.push(`table ${ti + 1}: ${given.length} columns given (one)`); return; }
      const g = given[0], unit = prices[g].v / counts[g].v; units.push(unit);
      if (counts[g].v !== L.given) f.push(`table ${ti + 1}: the given number ${counts[g].v} (the level: ${L.given})`);
      if (!Number.isInteger(unit)) f.push(`table ${ti + 1}: a piece costs ${unit} kr`);
      counts.forEach((c, j) => {
        const p = prices[j];
        if (c.box != null && p.box != null) f.push(`table ${ti + 1}: a column with two blanks`);
        if (c.box != null) { if (c.box * unit !== p.v) f.push(`table ${ti + 1}: the count stamped ${c.box} for ${p.v} kr (the gate: ${p.v / unit})`); if (!L.write || ti !== 1) f.push(`table ${ti + 1}: a missing count on level ${lv}`); }
        if (p.box != null && p.box !== c.v * unit) f.push(`table ${ti + 1}: ${c.v} cost ${p.box} kr stamped (the gate: ${c.v * unit})`);
        if ((p.box || p.v || 0) > 200) f.push(`table ${ti + 1}: a price over 200`);
      });
    });
    if (new Set(ids).size !== ids.length) f.push('one item in both tables');
    if (new Set(units).size !== units.length) f.push(`both tables at ${units[0]} kr a piece (two tables, two prices)`);
    const rc = $('[data-sv-recipe]'), r = BS.RECIPES.find((x) => x.id === rc.attr('data-sv-recipe'));
    const pers = rc.find('[data-sv-persons]').filter((i, e) => /sv-th/.test($(e).attr('class') || '')).map((i, e) => +$(e).attr('data-sv-persons')).get();
    if (pers.join() !== L.recipe.join()) f.push(`the recipe for ${pers} personer (the level: ${L.recipe})`);
    if (r) rc.find('.ws-blankbox[data-sv-cell="recipe"]').each((i, e) => { const n = +$(e).attr('data-sv-persons'); const ing = txt($, $(e).closest('div[style*="border-top"]').children().first()); const row = r.rows.find((x) => x[0] === ing); if (!row || +stamp(e) !== row[1] * n / 4) f.push(`the recipe: ${ing} for ${n} stamped ${stamp(e)} (the gate: ${row && row[1] * n / 4})`); });
    const sents = $('[data-dk-item^="sentence"]');
    if (sents.length !== L.sentences) f.push(`${sents.length} sentences (the level: ${L.sentences})`);
    sents.each((i, g) => { const s = txt($, $(g).parent()); const want = /dubbelt så många/.test(s) ? 'dubbelt så mycket' : /hälften så många/.test(s) ? 'hälften så mycket' : '?'; if (txt($, $(g).find('[data-dk-answer="right"]')) !== want) f.push(`the sentence "${s.slice(0, 40)}": the stamp`); });
    const open = $('[data-sv-open]');
    if (L.write !== !!open.length || (open.length && !/tre gånger så/.test(open.attr('data-sv-key')))) f.push(`the line to write in words on level ${lv}`);
  }
  if (M === 'halvcm') {
    const L = HALV_OWN[lv];
    const pens = $('[data-sv-pencil]');
    if (pens.length !== L.n) f.push(`${pens.length} pencils (the level: ${L.n})`);
    if (txt($, $('[data-sv-printnote]')) !== 'Utskrift: verklig storlek (100 %)') f.push('the pencils without "Utskrift: verklig storlek (100 %)"');
    const plot = $('[data-sv-art="lineplot"]'), lo = +plot.attr('data-sv-lo'), hi = +plot.attr('data-sv-hi');
    if (hi - lo !== L.span) f.push(`the scale ${lo}-${hi} (the level: ${L.span} cm)`);
    const lens = [];
    pens.each((i, p) => {
      const len = +$(p).attr('data-sv-len'), mm = +$(p).find('[data-sv-art="real-pencil"]').attr('data-sv-mm');
      lens.push(len);
      if (Math.abs(mm - len * 10) > 1e-9) f.push(`pencil ${i + 1}: drawn ${mm} mm for ${len} cm`);
      if (Math.abs(len * 2 - Math.round(len * 2)) > 1e-9) f.push(`pencil ${i + 1}: ${len} cm is not a whole or half centimetre`);
      if (len < lo || len > hi) f.push(`pencil ${i + 1}: ${len} cm off the scale`);
      const st = stamp($(p).parent().find('[data-sv-measure]')[0]);
      if (num(st) !== len) f.push(`pencil ${i + 1}: stamped ${st} (the gate: ${len})`);
      if (!Number.isInteger(len) && !/,5$/.test(st)) f.push(`pencil ${i + 1}: the stamp "${st}" is not written with a comma`);
    });
    const counts = {}; lens.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
    const crosses = JSON.parse($('[data-sv-plotcard]').attr('data-sv-crosses') || '{}');
    if (JSON.stringify(Object.keys(crosses).sort()) !== JSON.stringify(Object.keys(counts).map(String).sort()) || Object.entries(counts).some(([k, n]) => crosses[k] !== n)) f.push('the crosses stamped are not the pencils\' lengths');
    if (Math.max(...Object.values(counts)) > 5) f.push('more crosses over one length than the plot has room for');
    const labels = plot.find('[data-sv-plabel]').map((i, e) => +$(e).attr('data-sv-plabel')).get();
    const want = []; for (let v = lo; v <= hi + 1e-9; v += 0.5) if (L.labels === 'all' || Number.isInteger(v)) want.push(v);
    if (labels.join() !== want.join()) f.push(`the scale's numbers ${labels} (the level: ${L.labels})`);
    if (plot.find('[data-sv-ptick]').length !== (hi - lo) * 2 + 1) f.push('a tick missing on the scale');
    if (!plot.find('[data-sv-plottitle]').length || txt($, plot.find('[data-sv-plottitle]')) !== 'Hur långa är pennorna?' || txt($, plot.find('[data-sv-plotaxisword]')) !== 'Längd i cm') f.push('the plot\'s title or its axis word');
    const qs = $('[data-sv-q]');
    if (qs.length !== L.qs) f.push(`${qs.length} questions (the level: ${L.qs})`);
    qs.each((i, q) => {
      const key = $(q).attr('data-sv-q'), st = stamp(q), qt = txt($, $(q).parent());
      if (key === 'mode') { const top = Math.max(...Object.values(counts)), modes = Object.keys(counts).filter((k) => counts[k] === top); if (modes.length !== 1) f.push(`the most common length: ${modes.length} lengths`); else if (num(st.replace(' cm', '')) !== +modes[0]) f.push(`the most common length stamped ${st} (the gate: ${modes[0]})`); }
      else { const m = /(längre|kortare) än (\d+) cm/.exec(qt); if (!m) { f.push(`question "${qt}" unread`); return; } const x = +m[2], n = lens.filter((l) => (m[1] === 'längre' ? l > x : l < x)).length; if (+st !== n) f.push(`"${m[0]}": stamped ${st} (the gate: ${n})`); if (lens.includes(x)) f.push(`"${m[0]}": a pencil is exactly ${x} cm (is it longer or not?)`); }
    });
  }
  if (M === 'cmsv' || M === 'aldre') {
    const S = BE.SETS[M], LV = M === 'cmsv' ? CMSV_OWN[lv] : ALDRE_OWN[lv];
    const rows = $('[data-e2-row]');
    if (rows.length !== LV.rows + 1) f.push(`${rows.length} rows (${LV.rows} and one to choose)`);
    if (!$('[data-e2-row="own"]').length) f.push('no row for a thing the child chooses');
    const cols = $('[data-e2-col]').map((i, e) => $(e).attr('data-e2-col')).get().join();
    if (cols !== LV.cols) f.push(`the columns ${cols}`);
    if ($('[data-e2-table] [data-e2-answer]').length || $('[data-e2-table] [data-dk-answer]').length) f.push('the table carries a key value');
    const ids = rows.map((i, e) => $(e).attr('data-e2-row')).get().filter((x) => x !== 'own');
    if (new Set(ids).size !== ids.length) f.push('a thing twice');
    rows.each((i, r) => { const id = $(r).attr('data-e2-row'); if (id === 'own') return; const w = txt($, $(r).find('[data-e2-thingword]')); if (w !== THING_SV_WORD_OWN[id]) f.push(`row ${id}: the word "${w}"`); });
    if (M === 'cmsv') {
      for (const id of ids) if (!S.things.includes(id)) f.push(`${id}: not a thing of the set`);
      const shortN = ids.filter((id) => THING_SV_OWN[id] && THING_SV_OWN[id][1] < 100).length;
      if (shortN !== LV.short) f.push(`${shortN} things under 1 m (the level: ${LV.short})`);
      rows.each((i, r) => {
        const id = $(r).attr('data-e2-row'); const given = $(r).find('[data-e2-unitgiven]').map((j, e) => $(e).attr('data-e2-unitgiven')).get();
        if (LV.unitGiven && id !== 'own') { const want = THING_SV_OWN[id][1] < 100 ? 'cm' : 'm'; if (given.length !== 2 || given.some((u) => u !== want)) f.push(`row ${id}: the unit printed ${given} (the gate: ${want})`); }
        else if (given.length) f.push(`row ${id}: a unit printed on level ${lv}`);
        if (!LV.unitGiven && $(r).find('[data-e2-unitline]').length !== LV.cols.split(',').length - 1) f.push(`row ${id}: no line for the unit`);
      });
      if (txt($, $('[data-e2-printnote]')) !== 'Utskrift: verklig storlek (100 %)') f.push('the 1-cm and 10-cm drawings without "Utskrift: verklig storlek (100 %)"');
      const refBar = $('[data-e2-art="real-bar"]'), ruler = $('[data-e2-art="real-ruler"]');
      if (+refBar.attr('data-e2-mm') !== 10 || +ruler.attr('data-e2-cm') !== 10) f.push('the real-size references are not 1 cm and 10 cm');
      if (ruler.find('[data-e2-rulercm]').length !== 11 || ruler.find('[data-e2-rulerlabel]').map((i, e) => $(e).attr('data-e2-rulerlabel')).get().join() !== '0,1,2,3,4,5,6,7,8,9,10') f.push('the ruler\'s centimetres');
      const xs = ruler.find('[data-e2-rulercm]').map((i, e) => +$(e).attr('x1')).get(); xs.forEach((x, i) => { if (i && Math.abs(x - xs[i - 1] - 96 / 2.54) > 0.01) f.push(`the ruler: ${(x - xs[i - 1]).toFixed(2)} px for 1 cm`); });
      const pics = $('[data-e2-unitpic]');
      if (pics.length !== LV.pics) f.push(`${pics.length} pictures (the level: ${LV.pics})`);
      const ans = { cm: 0, m: 0 };
      pics.each((i, p) => { const id = $(p).attr('data-e2-picid'), cm = UNIT_PIC_OWN[id]; const right = $(p).find('[data-dk-answer="right"]').attr('data-e2-unitpick'); if (cm == null || right !== unitClass(cm)) f.push(`picture ${id}: the stamp ${right} (the gate: ${cm == null ? '?' : unitClass(cm)})`); ans[right] = (ans[right] || 0) + 1; if (ids.includes('sv_' + id)) f.push(`picture ${id}: also a thing of the table`); });
      if (ans.cm !== LV.pics / 2) f.push(`${ans.cm} cm pictures of ${LV.pics} (half)`);
      const conv = $('[data-e2-conv]').map((i, e) => { const tk = tokens($, $(e).parent()); return tk.map((x) => (typeof x === 'object' ? '[' + x.box + ']' : x)).join(' '); }).get();
      const wantConv = LV.conv.map(([l, v]) => `${l} = [${v}]`);
      if (conv.join('|') !== wantConv.join('|')) f.push(`the conversions ${conv.join(' | ')}`);
    } else {
      for (const id of ids) if (!ALDRE_PAIRS_OWN[id]) f.push(`${id}: not a thing of the set`);
      if (!ids.includes('sv_dorrbredd')) f.push('no door width row (the comparison is about the door)');
      if (!LV.choose) {
        rows.each((i, r) => { const id = $(r).attr('data-e2-row'); if (id === 'own') return; const u = $(r).attr('data-e2-rowunit'); if (u !== ALDRE_PAIRS_OWN[id]) f.push(`${id}: measured in ${u} (the gate: ${ALDRE_PAIRS_OWN[id]})`); });
        for (const u of S.units) if (!rows.filter((i, e) => $(e).attr('data-e2-rowunit') === u).length) f.push(`no row measured in ${u}`);
      } else { if ($('[data-e2-rowunit]').length) f.push('level 3 prescribes a unit'); rows.each((i, r) => { if ($(r).find('[data-e2-choose]').length !== 4) f.push(`row ${$(r).attr('data-e2-row')}: ${$(r).find('[data-e2-choose]').length} measures to tick`); }); }
      rows.each((i, r) => { const mcm = $(r).find('[data-e2-record="mcm"]'); if (mcm.length !== 2) f.push(`row ${$(r).attr('data-e2-row')}: the metre-and-centimetre frame`); });
      const old = $('[data-e2-old]').map((i, e) => $(e).attr('data-e2-old')).get().join();
      if (old !== 'tum,fot,aln,famn') f.push(`the old measures on top: ${old}`);
      $('[data-e2-old]').each((i, e) => { const u = $(e).attr('data-e2-old'); if (txt($, $(e).find('[data-e2-oldval]')) !== OLD_OWN[u].sv || txt($, $(e).find('[data-e2-oldbody]')) !== OLD_OWN[u].body) f.push(`the old ${u}: "${txt($, e)}"`); });
      const whose = $('[data-e2-whose]').map((i, e) => txt($, $(e).next())).get().join(' / ');
      if (whose !== 'min / kamratens / ungefär lika långa') f.push(`the comparison's choices "${whose}"`);
      if (!/Mät dörrens bredd med dina fötter/.test(txt($, $('[data-e2-bottom="compare"]')))) f.push('the comparison is not the door\'s width in feet');
      if (!/Talen kan bli olika eftersom/.test(txt($, $('[data-e2-bottom="compare"]')))) f.push('the why\'s starter is not "Talen kan bli olika eftersom"');
      const whyLines = $('[data-e2-bottom="compare"] [data-dk-writerow]').length - 1;   // the classmate's name line is one
      if (whyLines !== LV.why) f.push(`${whyLines} lines for the why (the level: ${LV.why})`);
      const conv = $('[data-e2-conv]').map((i, e) => +stamp(e)).get().join();
      if (conv !== (LV.conv ? '2,3,30' : '')) f.push(`the old measures' conversions ${conv}`);
      if ($('[data-dk-answer]').length) f.push('a record page with a stamped choice');
    }
  }
  return f;
}

/* ================================================================ 3. tells (pooled) */
function collect(id, lv, html, acc) {
  const $ = cheerio.load(html), M = MODE[id];
  if (M === 'rymmer') $('[data-sv-pair]').each((i, p) => { const r = $(p).find('[data-dk-answer="right"]').attr('data-sv-pick'), l = $(p).attr('data-sv-l'), rr = $(p).attr('data-sv-r'); (acc.pairs = acc.pairs || []).push({ left: r === l, longer: CONT_WORD_OWN[r].length > CONT_WORD_OWN[r === l ? rr : l].length, shorter: CONT_WORD_OWN[r].length < CONT_WORD_OWN[r === l ? rr : l].length, pos: i }); });
  if (M === 'rymmer') $('[data-sv-rank]').each((i, e) => (acc.ranks = acc.ranks || []).push({ pos: i, rank: +stamp(e) }));
  if (M === 'enheter') $('[data-sv-card]').each((i, c) => { const right = txt($, $(c).find('[data-dk-item^="most"] [data-dk-answer="right"]')); const first = txt($, $(c).find('[data-dk-item^="most"] [data-dk-answer]').first()); const top = $(c).find('[data-sv-row="0"]').attr('data-sv-rowunit'); (acc.cards = acc.cards || []).push({ firstRight: right === first, right, topSmall: top === $(c).attr('data-sv-small') }); });
  if (M === 'skillnad') $('[data-sv-task-card]').each((i, c) => (acc.tasks = acc.tasks || []).push({ d: +$(c).attr('data-sv-b') - +$(c).attr('data-sv-a'), pos: i, cross: +$(c).attr('data-sv-a') < 10 && +$(c).attr('data-sv-b') > 10 }));
  if (M === 'rimligt') {
    $('[data-sv-item]').each((i, it) => { const m = /^([\d ]+) ([+−]) ([\d ]+) = ([\d ]+)$/.exec(txt($, $(it).find('[data-sv-calc]'))); if (!m) return; const shown = num(m[4]); (acc.items = acc.items || []).push({ wrong: $(it).attr('data-sv-kind') === 'wrong', pos: i, plus: m[2] === '+', end0: shown % 10 === 0, end00: shown % 100 === 0, below: shown < (m[2] === '+' ? round100(num(m[1])) + round100(num(m[3])) : round100(num(m[1])) - round100(num(m[3]))) }); });
    $('[data-dk-item^="ev-"]').each((i, g) => { const opts = $(g).find('[data-dk-answer]'); (acc.ev = acc.ev || []).push({ at: opts.index(opts.filter('[data-dk-answer="right"]')) }); });
  }
  if (M === 'mellanled') $('[data-sv-mcard]').each((i, c) => (acc.m = acc.m || []).push({ pos: i, kind: $(c).attr('data-sv-kind') }));
  if (M === 'proportion') $('[data-dk-item^="sentence"]').each((i, g) => { const o = $(g).find('[data-dk-answer]'); (acc.sent = acc.sent || []).push({ at: o.index(o.filter('[data-dk-answer="right"]')) }); });
  if (M === 'halvcm') { const lens = []; $('[data-sv-pencil]').each((i, p) => lens.push(+$(p).attr('data-sv-len'))); (acc.lens = acc.lens || []).push(lens); }
  if (M === 'cmsv') $('[data-e2-unitpic]').each((i, p) => (acc.pics = acc.pics || []).push({ pos: i, ans: $(p).attr('data-e2-ans') }));
}
function tellFaults(id, lv, acc) {
  const f = [], M = {};
  const share = (arr, fn) => (arr.length ? arr.filter(fn).length / arr.length : NaN);
  const MID = MODE[id];
  if (MID === 'rymmer') {
    const P = acc.pairs || []; if (!P.length) return { f: ['nothing to judge: found 0 pairs'], M };
    M['right on the left'] = share(P, (x) => x.left);
    if (Math.abs(M['right on the left'] - 0.5) > 0.08) f.push(`the right container is on the left ${(100 * M['right on the left']).toFixed(1)}%`);
    M['right has the longer word'] = share(P, (x) => x.longer); M['right has the shorter word'] = share(P, (x) => x.shorter);
    const R = acc.ranks || [], k = lv === 3 ? 4 : 3; for (let p = 0; p < k; p++) { const at = R.filter((x) => x.pos === p); if (at.length < 100) continue; const s = share(at, (x) => x.rank === 1); M[`place ${p + 1} holds the smallest`] = s; if (Math.abs(s - 1 / k) > 0.1) f.push(`place ${p + 1} in the row holds the smallest ${(100 * s).toFixed(1)}%`); }
  }
  if (MID === 'enheter') {
    const C = acc.cards || []; if (!C.length) return { f: ['nothing to judge: found 0 things'], M };
    M['the right unit is the first choice'] = share(C, (x) => x.firstRight);
    M['the top row is the shorter unit'] = share(C, (x) => x.topSmall);
    if (Math.abs(M['the right unit is the first choice'] - 0.5) > 0.08) f.push(`the right unit is the first choice ${(100 * M['the right unit is the first choice']).toFixed(1)}%`);
    if (Math.abs(M['the top row is the shorter unit'] - 0.5) > 0.08) f.push(`the shorter unit's row lies on top ${(100 * M['the top row is the shorter unit']).toFixed(1)}%`);
    if (lv > 1) { M['the answer is "gem"'] = share(C, (x) => x.right === 'gem'); if (M['the answer is "gem"'] > 0.75) f.push(`"gem" is the answer ${(100 * M['the answer is "gem"']).toFixed(1)}% (the shorter unit, not one word)`); }
  }
  if (MID === 'skillnad') {
    const T = acc.tasks || []; if (!T.length) return { f: ['nothing to judge: found 0 tasks'], M };
    for (let d = 2; d <= 6; d++) { const s = share(T, (x) => x.d === d); if (s) M[`difference ${d}`] = s; if (s > 0.5) f.push(`the difference is ${d} in ${(100 * s).toFixed(1)}% of the tasks`); }
  }
  if (MID === 'rimligt') {
    const I = acc.items || []; if (!I.length) return { f: ['nothing to judge: found 0 calculations'], M };
    M['orimligt'] = share(I, (x) => x.wrong);
    for (const [name, fn] of [['a final 0', (x) => x.end0], ['a final 00', (x) => x.end00], ['an addition', (x) => x.plus]]) {
      const pw = share(I.filter((x) => x.wrong), fn), pr = share(I.filter((x) => !x.wrong), fn);
      M[`${name}: orimligt / rimligt`] = [`${(100 * pw).toFixed(1)}% /`, pr];
      if (Math.abs(pw - pr) > 0.15) f.push(`${name}: on ${(100 * pw).toFixed(1)}% of the wrong and ${(100 * pr).toFixed(1)}% of the right answers`);
    }
    for (let p = 0; p < 6; p++) { const at = I.filter((x) => x.pos === p); if (at.length < 100) continue; const s = share(at, (x) => x.wrong); if (Math.abs(s - 0.5) > 0.12) f.push(`place ${String.fromCharCode(65 + p)} is orimligt ${(100 * s).toFixed(1)}%`); }
    M['answer under the estimate: orimligt / rimligt (needs the estimate)'] = [`${(100 * share(I.filter((x) => x.wrong), (x) => x.below)).toFixed(1)}% /`, share(I.filter((x) => !x.wrong), (x) => x.below)];
    const E = acc.ev || []; for (let k = 0; k < 3; k++) { const s = share(E, (x) => x.at === k); M[`everyday answer at place ${k + 1}`] = s; if (s > 0.55) f.push(`the reasonable everyday answer is at place ${k + 1} ${(100 * s).toFixed(1)}%`); }
  }
  if (MID === 'mellanled') { const Mm = acc.m || []; for (let p = 0; p < 8; p++) { const at = Mm.filter((x) => x.pos === p); if (at.length < 100) continue; const s = share(at, (x) => x.kind[0] === '-'), all = share(Mm, (x) => x.kind[0] === '-'); if (Math.abs(s - all) > 0.15) f.push(`place ${p + 1} holds a subtraction ${(100 * s).toFixed(1)}% (all: ${(100 * all).toFixed(1)}%)`); } }
  if (MID === 'proportion' && lv < 3) { const S = acc.sent || []; if (!S.length) return { f: ['nothing to judge: found 0 sentences'], M }; for (let k = 0; k < 3; k++) { const s = share(S, (x) => x.at === k); M[`the right words at place ${k + 1}`] = s; if (s > 0.45) f.push(`the right words sit at place ${k + 1} ${(100 * s).toFixed(1)}%`); } }
  if (MID === 'halvcm') { const Ls = acc.lens || []; if (!Ls.length) return { f: ['nothing to judge: found 0 pages'], M }; const all = Ls.flat(); M['half lengths'] = share(all, (v) => !Number.isInteger(v)); if (M['half lengths'] < 0.3) f.push(`only ${(100 * M['half lengths']).toFixed(1)}% half lengths`); }
  if (MID === 'cmsv') { const P = acc.pics || []; for (let p = 0; p < 8; p++) { const at = P.filter((x) => x.pos === p); if (at.length < 100) continue; const s = share(at, (x) => x.ans === 'cm'); if (Math.abs(s - 0.5) > 0.12) f.push(`picture ${p + 1} is a cm thing ${(100 * s).toFixed(1)}%`); } }
  return { f, M };
}
const levelSig = (html) => { const c = {}; for (const m of html.matchAll(/data-(?:sv|e2)-([a-z]+)(?=[=\s>])/g)) c[m[1]] = (c[m[1]] || 0) + 1; const words = cheerio.load(html)('[data-dk]').text().replace(/[0-9]+/g, '#').replace(/\s+/g, ' '); return JSON.stringify(Object.keys(c).sort().map((k) => k + c[k])) + '|' + crypto.createHash('sha1').update(words).digest('hex').slice(0, 8); };

/* ================================================================ 6. the PDF (real size) */
const PDF_PY = path.join(__dirname, 'verify-e2-sv-pdf.py');
const PT_MM = 72 / 25.4;
function pdfDrawings(pdfPath, inks) {
  const r = spawnSync('python', ['-I', PDF_PY, pdfPath, inks.join(',')], { encoding: 'utf8', maxBuffer: 64 << 20 });
  if (r.status !== 0) throw new Error('the PDF reader failed: ' + (r.stderr || '').slice(0, 300));
  return JSON.parse(r.stdout).drawings;
}
/** the measurements a printed page must have: lens = the pencils (cm, top to bottom); strips = the measuring strips */
function pdfFaults(id, pdfPath, meta) {
  const f = [];
  const C = ARTSV.C, E = ARTE2.C;
  if (id === 'G3-652') {
    const D = pdfDrawings(pdfPath, [C.REAL_RUBBER, C.REAL_LEAD]);
    const rub = D.filter((d) => d.ink === C.REAL_RUBBER.toUpperCase()).sort((a, b) => a.ext[1] - b.ext[1]), lead = D.filter((d) => d.ink === C.REAL_LEAD.toUpperCase());
    if (rub.length !== meta.lens.length) return [`PDF: ${rub.length} pencils printed for ${meta.lens.length}`];
    rub.forEach((r, i) => { const yc = (r.ext[1] + r.ext[3]) / 2; const L = lead.find((x) => Math.abs((x.ext[1] + x.ext[3]) / 2 - yc) < 4); if (!L) { f.push(`PDF: pencil ${i + 1} has no lead tip`); return; } const mm = (L.ext[2] - r.ext[0]) / PT_MM; if (Math.abs(mm - meta.lens[i] * 10) > 0.1) f.push(`PDF: pencil ${i + 1} prints ${mm.toFixed(2)} mm (its length ${meta.lens[i] * 10} mm)`); });
  }
  if (id === 'G2-637') {
    const D = pdfDrawings(pdfPath, [E.REAL_BAR, E.REAL_RULER_TICK]);
    const bar = D.filter((d) => d.ink === E.REAL_BAR.toUpperCase() && d.width > 2);
    if (bar.length !== 1) f.push(`PDF: ${bar.length} 1-cm bars`); else { const mm = (bar[0].ext[2] - bar[0].ext[0]) / PT_MM; if (Math.abs(mm - 10) > 0.1) f.push(`PDF: the 1-cm bar prints ${mm.toFixed(2)} mm`); }
    const ticks = D.filter((d) => d.ink === E.REAL_RULER_TICK.toUpperCase()).map((d) => d.ext[0]).sort((a, b) => a - b);
    if (ticks.length !== 21) f.push(`PDF: ${ticks.length} ruler ticks (21)`);
    else { ticks.forEach((x, i) => { if (i && Math.abs((x - ticks[i - 1]) / PT_MM - 5) > 0.05) f.push(`PDF: ruler ticks ${((x - ticks[i - 1]) / PT_MM).toFixed(2)} mm apart (5)`); }); const tot = (ticks[20] - ticks[0]) / PT_MM; if (Math.abs(tot - 100) > 0.1) f.push(`PDF: the ruler's 10 cm print ${tot.toFixed(2)} mm`); }
  }
  if (id === 'G1-676') {
    const D = pdfDrawings(pdfPath, [C.THING, C.KLOSS, C.GEM, C.PINNE]);
    const things = D.filter((d) => d.ink === C.THING.toUpperCase());
    // a thing's outline may be several drawings (a spoon: the handle and the bowl): group by height
    const groups = []; things.sort((a, b) => a.ext[1] - b.ext[1]).forEach((d) => { const g = groups.find((x) => Math.abs(x.y - d.ext[1]) < 22 && d.ext[0] < x.x1 + 2 && d.ext[2] > x.x0 - 2); if (g) { g.x0 = Math.min(g.x0, d.ext[0]); g.x1 = Math.max(g.x1, d.ext[2]); g.y = Math.min(g.y, d.ext[1]); g.y1 = Math.max(g.y1, d.ext[3]); } else groups.push({ x0: d.ext[0], x1: d.ext[2], y: d.ext[1], y1: d.ext[3] }); });
    groups.sort((a, b) => a.y - b.y);
    if (groups.length !== meta.cards.length) return [`PDF: ${groups.length} things printed for ${meta.cards.length}`];
    groups.forEach((g, i) => {
      const yEnd = i + 1 < groups.length ? groups[i + 1].y - 4 : Infinity;
      const [, Lpx, rest] = /:(\d+):(.*)$/.exec(meta.cards[i]);
      const want = rest.split('/').map((s) => s.trim().split(' ')).map(([n, u]) => ({ n: +n, u }));
      const ink = { kloss: C.KLOSS, gem: C.GEM, pinne: C.PINNE };
      for (const { n, u } of want) {
        const us = D.filter((d) => d.ink === ink[u].toUpperCase() && d.ext[1] > g.y1 && d.ext[1] < yEnd).sort((a, b) => a.ext[0] - b.ext[0]);
        if (us.length !== n) { f.push(`PDF: thing ${i + 1}: ${us.length} ${u} printed for ${n}`); continue; }
        const u0 = us[0].ext[0], u1 = us[us.length - 1].ext[2];
        // the thing's ink and the row's ink start and end together (each half a stroke outside its path)
        if (Math.abs(u0 - g.x0) > 0.35 || Math.abs(u1 - g.x1) > 0.35) f.push(`PDF: thing ${i + 1}: the ${u} row prints ${(u0 / PT_MM).toFixed(2)}-${(u1 / PT_MM).toFixed(2)} mm, the thing ${(g.x0 / PT_MM).toFixed(2)}-${(g.x1 / PT_MM).toFixed(2)} mm`);
        const pitch = (u1 - u0) / n; us.forEach((d, k) => { if (Math.abs(d.ext[0] - (u0 + k * pitch)) > 0.35) f.push(`PDF: thing ${i + 1}: ${u} ${k + 1} out of its slot`); });
      }
      void Lpx;
    });
  }
  return f;
}

async function main() {
  const t0 = Date.now();
  const artSrc = fs.readFileSync(path.join(WG, 'types', '_shared', 'e2-math-sv-art.js'), 'utf8');
  const art2Src = fs.readFileSync(path.join(WG, 'types', '_shared', 'e2-math-art.js'), 'utf8');
  // ---- 1. bank
  const bf = bankFaults(BS, BE, artSrc, art2Src);
  ok(!bf.length, 'bank: ' + bf.slice(0, 12).join(' | '));
  const P = (name, mut, re, src = artSrc) => { const bs = clone(BS), be = clone(BE); mut(bs, be); judge(name, bankFaults(bs, be, src, art2Src), re); };
  const find = (arr, id) => arr.find((x) => x.id === id);
  P('PB1 a bottle back among the containers', (bs) => { bs.CONTAINERS.push({ id: 'flaska', sv: 'flaska', pic: ['kitchen tools', 'bottle'], litres: 0.5 }); }, /a bottle among the containers|flaska: not in the gate/);
  P('PB2 the mug holding 2 l', (bs) => { find(bs.CONTAINERS, 'mugg').litres = 2; }, /container mugg: 2 l/);
  P('PB27 the bathtub answers 1 / 10 / 150 liter (the right one the only odd-shaped number)', (bs) => { const e = bs.EVERYDAY.find((x) => x.id === 'badkar'); e.opts = ['1 liter', '10 liter', '150 liter']; e.right = 2; }, /not one number times ten/);
  P('PB3 the pool called "badkar"', (bs) => { find(bs.CONTAINERS, 'pool').sv = 'badkar'; }, /container pool: the word/);
  P('PB4 a black-and-white bucket', (bs) => { find(bs.CONTAINERS, 'hink').pic = ['summer bw', 'bucket']; }, /hink: the picture|black-and-white|not in the library/);
  P('PB5 "klossar" spelt "klosser"', (bs) => { bs.UNITS_SV.kloss.many = 'klosser'; }, /unit kloss: the plural/);
  P('PB6 the lotus worth 100', (bs) => { bs.EGYPT.find((e) => e.v === 1000).v = 100; }, /Egyptian sign lotus: 100/);
  P('PB7 the Roman "IV" read as 6', (bs) => { bs.ROMAN.find((r) => r[0] === 'IV')[1] = 6; }, /Roman IV: 6/);
  P('PB8 the numeral facts without sources', (bs) => { bs.NUMERAL_SOURCES = ['see a book']; }, /without their sources/);
  P('PB9 a school bag of 30 kg as the reasonable answer', (bs) => { find(bs.EVERYDAY, 'skolvaska').right = 1; }, /skolvaska: the right answer/);
  P('PB10 a distractor only 7 times off (10 dagar for the summer holiday)', (bs) => { find(bs.EVERYDAY, 'sommarlov').opts = ['10 dagar', '10 veckor', '10 år']; }, /less than ten times off/);
  P('PB11 an answer that stands out by its look (an odd unit)', (bs) => { find(bs.EVERYDAY, 'buss').opts = ['12 cm', '120 cm', '12 m']; }, /neither one unit nor one number/);
  P('PB12 the reasonable answer nearly always in the middle', (bs) => { bs.EVERYDAY.forEach((e) => { e.right = 1; }); }, /the reasonable answer sits|the right answer/);
  P('PB13 "glass / glasar"', (bs) => { find(bs.PRICE_ITEMS, 'glass').pl = 'glasar'; }, /price item glass/);
  P('PB14 a recipe with 3 eggs (no whole half)', (bs) => { bs.RECIPES[0].rows[2][1] = 3; }, /has no whole half/);
  P('PB15 the door height at 120 cm', (bs, be) => { be.THINGS.sv_dorrhojd.cm = [120, 130]; }, /sv_dorrhojd: 120,130 cm outside/);
  P('PB28 the door height back in the cm/m table (an åk 2 child cannot reach 2,1 m)', (bs, be) => { be.SETS.cmsv.things.push('sv_dorrhojd'); }, /cannot reach it/);
  P('PB29 the bucket at 10 l (a städhink the sandhink picture does not show)', (bs) => { find(bs.CONTAINERS, 'hink').litres = 10; }, /container hink: 10 l/);
  P('PB30 the bucket taken to hold 1-2 l only (a child may read it as a big bucket)', (bs) => { find(bs.CONTAINERS, 'hink').seen = [1, 2]; }, /container hink: by its picture/);
  P('PB31 the pool without its beach ball', (bs) => { delete find(bs.CONTAINERS, 'pool').prop; }, /pool without the beach ball/);
  P('PB32 "pinnar" for glasspinnar', (bs) => { bs.UNITS_SV.pinne.many = 'pinnar'; }, /unit pinne: the plural "pinnar"/);
  P('PB33 a comic at 15 kr back among the price items', (bs) => { bs.PRICE_ITEMS.push({ id: 'tidning', sg: 'serietidning', pl: 'serietidningar', unit: [15, 20, 25] }); }, /price item tidning/);
  P('PB34 G2-637 without the print note', (bs, be) => { delete be.SETS.cmsv.printNote; }, /without "Utskrift: verklig storlek/);
  P('PB16 a desk width (60-130 cm) in the whole-cm-or-m table', (bs, be) => { be.SETS.cmsv.things.push('sv_bankbredd'); }, /between 80 and 180 cm both cm and m are natural/);
  P('PB17 the classroom in tum', (bs, be) => { be.SETS.aldre.pairs.sv_rumbredd = 'tum'; }, /old-measure pair sv_rumbredd|old-measure sv_rumbredd in tum/);
  P('PB18 "1 fot ≈ 20 cm"', (bs, be) => { be.OLD_UNITS.fot.sv = '1 fot ≈ 20 cm'; }, /the old length of fot/);
  P('PB19 "1 famn = 2 alnar"', (bs, be) => { be.SETS.aldre.levels[3].conv[1][1] = 2; }, /the old measures' conversions/);
  P('PB20 a car to measure in cm', (bs, be) => { find(be.UNIT_PICS, 'bil').ans = 'cm'; }, /unit picture bil: the bank says cm/);
  P('PB21 a bed (2 m, also natural in cm) among the unit pictures', (bs, be) => { be.UNIT_PICS.push({ id: 'bed', pic: ['furniture', 'bed'], sv: 'säng', cm: 200, ans: 'm' }); }, /unit picture bed: not in the gate's table/);
  P('PB22 the comparison\'s choice "lika långa" (a body gives no more than "ungefär")', (bs, be) => { be.TEXT.mess.sv.whoseChoices[2] = 'lika långa'; }, /the comparison's choices/);
  P('PB23 "Räkna upp" in a page string', (bs) => { bs.TEXT.skillnad.jump = 'Räkna upp: hoppet är'; }, /"räkna upp" in a page string/);
  P('PB24 "Bra jobbat!" in a heading', (bs) => { bs.TEXT.rymmer.pairsHead = 'Bra jobbat! Ringa in.'; }, /celebrates/);
  P('PB25 an off-palette colour in the drawings', () => {}, /outside PAL_SV/, artSrc + '\nconst X = "#123456";');
  P('PB26 a child\'s fot of 30 cm (a grown-up\'s)', (bs, be) => { be.UNITS.fot.approxCm = [28, 31]; }, /old measure fot: a child's/);

  // ---- 2. build sweep
  const pools = {}, sigs = {};
  let built = 0;
  for (const id of IDS) {
    const t = loadType(id);
    ok(JSON.stringify(t.onlyLocales) === JSON.stringify(['sv']), `${id}: onlyLocales ${JSON.stringify(t.onlyLocales)}`);
    for (const other of ['en', 'de', 'fi']) { let refused = false; try { t.build({ theme: null, difficulty: 2, locale: other, unit: null }, { rng: makeRng('x'), variant: 1 }); } catch (e) { refused = /printed in sv only/.test(e.message); } ok(refused, `${id}: builds a ${other} page`); }
    const str = withLevelInstruction(resolveStrings(id, 'sv', t), id, 1, 'sv');
    ok(str.source === 'locale', `${id}: no Swedish title and instruction (strings.sv.json)`);
    ok(str.title.length <= 60, `${id}: the title has ${str.title.length} characters (60 at most)`);
    { const tf0 = titleFaults(id, str.title); ok(!tf0.length, tf0.join(' | ')); }
    for (const lv of [1, 2, 3]) { const fi = instrFaults(id, lv, withLevelInstruction(resolveStrings(id, 'sv', t), id, lv, 'sv').instruction); ok(!fi.length, fi.join(' | ')); }
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
        if (s === 1) { sigs[id + lv] = levelSig(pg.html) + '|' + withLevelInstruction(resolveStrings(id, 'sv', t), id, lv, 'sv').instruction.replace(/[0-9]+/g, '#'); pools[id + lv] = pg; }
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

  // ---- page poisons (each against the real page of the same type and level, judged above) and controls
  const $do = (h, fn) => { const $ = cheerio.load(h, null, false); fn($); return $.html(); };
  const pa = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; const h0 = pools[id + lv].html, h = spoil(h0); if (h === h0) { judge(name, ['the spoil changed nothing'], /^$/); return; } judge(name, pageFaults(id, lv, h), re); };
  const pax = (name, id, lv, sel, spoil, re) => { if (!IDS.includes(id)) return; const t = loadType(id); for (let s = 1; s <= SEEDS; s++) { const h = buildPage(t, lv, s).html; if (cheerio.load(h)(sel).length) { const hs = spoil(h); judge(name + ' (copy ' + s + ')', hs === h ? ['the spoil changed nothing'] : pageFaults(id, lv, hs), re); return; } } judge(name, ['no page holds ' + sel], /^$/); };
  const pc = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; const h0 = pools[id + lv].html, h = spoil(h0); const fx = pageFaults(id, lv, h).filter((x) => re.test(x)); ok(h !== h0 && !fx.length, `control ${name}: ${h === h0 ? 'the change changed nothing' : fx.join(' | ')}`); plog.push(`  ${name}: ${h !== h0 && !fx.length ? 'PASSES (control)' : 'FIRED ON A CORRECT PAGE'}`); };
  // K-727
  pa('PA1 the bigger container stamped in a "most" pair swapped', 'K-727', 1, (h) => $do(h, ($) => { const p = $('[data-sv-kind="most"]').first(); p.find('[data-dk-answer]').each((i, e) => { $(e).attr('data-dk-answer', $(e).attr('data-dk-answer') === 'right' ? 'no' : 'right'); }); }), /\(most\): the stamp/);
  pa('PA53 the sandhink paired with the watering can (8 and 2 l: four times apart, but by their pictures both could hold 10 l)', 'K-727', 2, (h) => h.replace(/data-sv-l="[a-z]+" data-sv-r="[a-z]+"/, 'data-sv-l="hink" data-sv-r="vattenkanna"'), /by their pictures one could hold as much/);
  pa('PA54 the sandhink beside the watering can in the row', 'K-727', 2, (h) => h.replace(/data-sv-order="[a-z,]+"/, 'data-sv-order="glas,hink,vattenkanna"'), /by their pictures hink could hold as much as vattenkanna/);
  pa('PA55 the pool drawn without its ball', 'K-727', 1, (h) => h.split('data-sv-prop="summer/beach_ball"').join('data-x="1"'), /pool drawn without its beach ball/);
  pa('PA56 the book drawn edge-on (26 px high, as before review round 1)', 'G1-676', 1, (h) => $do(h, ($) => { const st = $('[data-sv-kind="book"]').first(); if (!st.length) return; st.find('path[data-sv-thing-outline]').each((j, o) => { $(o).attr('d', $(o).attr('d').replace(/(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)/g, (m0, x, y) => `${x} ${(+y > 30 ? 30 : +y).toFixed(1)}`)); }); }), /the book .*edge-on/);
  pa('PA57 the key box without its name "Nyckel"', 'G3-647', 2, (h) => h.replace(/>Nyckel</, '><'), /not named "Nyckel"/);
  pa('PA58 "för att" for "eftersom" in the zero question', 'G3-647', 1, (h) => h.split('ingen nolla eftersom').join('ingen nolla, för att'), /not "Egyptierna behövde ingen nolla eftersom"/);
  pa('PA59 "för att" for "eftersom" in the old measures\' why', 'G3-650', 2, (h) => h.split('olika eftersom').join('olika för att'), /not "Talen kan bli olika eftersom"/);
  pa('PA60 the boxed rule back at "mer än 50" (false: 349 + 349 = 698 is right and 98 from 600)', 'G3-648', 2, (h) => h.split('mer än 100 från överslaget').join('mer än 50 från överslaget'), /the printed rule is false/);
  pa('PA61 a right answer 90 from its överslag (decided by the rule, but too close to it)', 'G3-648', 1, (h) => $do(h, ($) => { const it = $('[data-sv-kind="right"]').filter((i, e) => $(e).attr('data-sv-op') === 'plus').first(); it.find('[data-sv-calc]').text('345 + 345 = 690'); it.find('[data-sv-over="a"]').attr('data-sv-answer', '300'); it.find('[data-sv-over="b"]').attr('data-sv-answer', '300'); it.find('[data-sv-over="est"]').attr('data-sv-answer', '600'); }), /690: 90 from the överslag, too close/);
  pa('PA62 a wrong answer 120 from its överslag (orimligt by the rule, but too close to it)', 'G3-648', 1, (h) => $do(h, ($) => { const it = $('[data-sv-kind="wrong"]').filter((i, e) => $(e).attr('data-sv-op') === 'plus').first(); it.find('[data-sv-calc]').text('210 + 290 = 380'); it.find('[data-sv-over="a"]').attr('data-sv-answer', '200'); it.find('[data-sv-over="b"]').attr('data-sv-answer', '300'); it.find('[data-sv-over="est"]').attr('data-sv-answer', '500'); }), /380: 120 from the överslag, too close/);
  pa('PA63 the pencils without the print note', 'G3-652', 1, (h) => h.replace(/data-sv-printnote="1"/, 'data-x="1"'), /pencils without "Utskrift/);
  pa('PA64 the 1-cm and 10-cm drawings without the print note', 'G2-637', 1, (h) => h.replace(/data-e2-printnote="1"/, 'data-x="1"'), /drawings without "Utskrift/);
  pa('PA2 a cup and a mug compared (1,5 times apart)', 'K-727', 2, (h) => h.replace(/data-sv-l="[a-z]+" data-sv-r="[a-z]+"/, 'data-sv-l="kopp" data-sv-r="mugg"'), /times apart/);
  pa('PA3 the row numbered wrong (a 1 under the bathtub)', 'K-727', 1, (h) => { const $ = cheerio.load(h, null, false); const b = $('[data-sv-rank]'); const a = b.eq(0).attr('data-sv-answer'), c = b.eq(1).attr('data-sv-answer'); b.eq(0).attr('data-sv-answer', c); b.eq(1).attr('data-sv-answer', a); return $.html(); }, /the row: .* stamped/);
  pa('PA4 a stamped number for the class jar (it is the class\'s own count)', 'K-727', 2, (h) => h.replace('data-sv-jarcount="1"', 'data-sv-jarcount="1" data-sv-answer="5"'), /record box carries a key value|the jar/);
  pa('PA5 one container in two pairs', 'K-727', 3, (h) => { const m = /data-sv-l="([a-z]+)"/.exec(h); return h.replace(/(data-sv-pair="2"[^>]*data-sv-l=")[a-z]+/, '$1' + m[1]); }, /a container twice in the pairs|pair/);
  pa('PA6 the "least" pairs asking for the most', 'K-727', 3, (h) => h.replace(/data-sv-kind="least"/g, 'data-sv-kind="most"'), /\(most\): the stamp|pair \d: most/);
  // G1-676
  pa('PA7 a row of 7 gem under a thing 6 gem long (a count at a blurred edge)', 'G1-676', 2, (h) => h.replace(/data-sv-rowunit="gem" data-sv-rown="(\d+)"/, (m, n) => `data-sv-rowunit="gem" data-sv-rown="${+n + 1}"`), /do not make its|gem drawn for/);
  pa('PA8 a unit shifted off its slot', 'G1-676', 1, (h) => h.replace(/(<g data-sv-unit="kloss"><rect x=")([0-9.]+)/, (m, a, x) => a + (+x + 9)), /starts at .* \(its slot/);
  pa('PA9 "Det gick åt flest" stamped on the longer unit', 'G1-676', 3, (h) => $do(h, ($) => { const g = $('[data-dk-item^="most"]').first(); g.find('[data-dk-answer]').each((i, e) => { $(e).attr('data-dk-answer', $(e).attr('data-dk-answer') === 'right' ? 'no' : 'right'); }); }), /"Det gick åt flest" stamped/);
  pa('PA10 the thing drawn 20 px longer than its rows', 'G1-676', 2, (h) => $do(h, ($) => { const g = $('[data-sv-art="strip"] [data-sv-thing]').first(), x1 = +g.attr('data-sv-x0') + +g.attr('data-sv-len'); const o = g.find('path[data-sv-thing-outline]').first(); o.attr('d', o.attr('d') + ` M${x1 + 20} 10 L${x1 + 20} 11`); }), /its outline runs/);
  pa('PA11 the rule sentence stamped "färre"', 'G1-676', 3, (h) => $do(h, ($) => { $('[data-dk-item="why"] [data-dk-answer]').each((i, e) => { $(e).attr('data-dk-answer', $(e).attr('data-dk-answer') === 'right' ? 'no' : 'right'); }); }), /the rule sentence/);
  pa('PA12 a count box stamped one more', 'G1-676', 1, (h) => h.replace(/data-sv-answer="(\d+)" data-sv-count="kloss"/, (m, n) => `data-sv-answer="${+n + 1}" data-sv-count="kloss"`), /the kloss box stamped/);
  // G1-677
  pa('PA13 the subtraction frame printed the wrong way (b − d = ☐: two right fills)', 'G1-677', 1, (h) => h.replace(/(<span class="sv-big" data-dk-box style="font-size:20px;line-height:24px">)(\d+)(<\/span><span class="sv-op" data-dk-box style="font-size:20px;line-height:24px">−<\/span><span class="sv-big" data-dk-box style="font-size:20px;line-height:24px">)(\d+)/, (m, a, b, c, x) => a + b + c + (+b - +x)), /the subtraction prints|solves to/);
  pa('PA14 the jump stamped one too many', 'G1-677', 2, (h) => h.replace(/data-sv-answer="(\d+)" data-sv-blank="jump"/, (m, n) => `data-sv-answer="${+n + 1}" data-sv-blank="jump"`), /the jump stamped/);
  pa('PA15 the jump drawn on level 3 (the child draws it)', 'G1-677', 3, (h) => h.replace(/(data-sv-art="line20" data-sv-labels="ends")/, '$1><path data-sv-arc="9-12"/><g'), /the jump drawn/);
  pa('PA16 every number labelled on level 2', 'G1-677', 2, (h) => h.replace(/data-sv-labels="fives"/, 'data-sv-labels="all"'), /labels all/);
  pax('PA17 a task from 10 (no counting up to the ten)', 'G1-677', 1, '[data-sv-task-card]', (h) => h.replace(/data-sv-a="(\d+)" data-sv-b="(\d+)"/, (m, a, b) => `data-sv-a="10" data-sv-b="${10 + (+b - +a)}"`), /a ten at an end|the jump stamped|frame/);
  // G3-647
  pa('PA18 an Egyptian number stamped one hundred off', 'G3-647', 2, (h) => h.replace(/data-sv-answer="(\d+)" data-sv-read="egypt"/, (m, n) => `data-sv-answer="${+n + 100}" data-sv-read="egypt"`), /the signs read/);
  pax('PA19 a coil drawn for a heel in a number to read (the signs read another number)', 'G3-647', 1, '[data-sv-egitem] [data-sv-glyph="heel"]', (h) => $do(h, ($) => { $('[data-sv-egitem] [data-sv-glyph="heel"]').first().attr('data-sv-glyph', 'coil'); }), /the signs read/);
  pa('PA20 "IIII" for 4 (not the standard form)', 'G3-647', 2, (h) => h.replace(/(data-sv-romanval="\d+"[^>]*>)([IVX]+)</, (m, a) => a.replace(/data-sv-romanval="\d+"/, 'data-sv-romanval="4"') + 'IIII<').replace(/(data-sv-romanval="4"[\s\S]*?data-sv-answer=")\d+/, '$14'), /not the standard form/);
  pa('PA21 IX on level 1 (only adding)', 'G3-647', 1, (h) => h.replace(/(data-sv-romanval=")\d+("[^>]*>)[IVX]+</, '$19$2IX<').replace(/(data-sv-romanval="9"[\s\S]*?data-sv-answer=")\d+/, '$19'), /Roman numbers with IV or IX on level 1/);
  pa('PA22 the zero question without its key', 'G3-647', 3, (h) => h.replace(/data-sv-open="1" data-sv-key="[^"]*"/, 'data-sv-open="1" data-sv-key="?"'), /the zero question/);
  pa('PA23 the key for 405 without "inget tecken för 0"', 'G3-647', 3, (h) => h.replace(/ \(i valfri ordning; inget tecken för 0\)/, ''), /no sign for 0/);
  // G3-648
  pa('PA24 a wrong answer stamped "rimligt"', 'G3-648', 2, (h) => $do(h, ($) => { const it = $('[data-sv-kind="wrong"]').first(); it.find('[data-dk-answer]').each((i, e) => { $(e).attr('data-dk-answer', $(e).attr('data-dk-answer') === 'right' ? 'no' : 'right'); }); }), /the stamp rimligt, the rule orimligt/);
  pa('PA25 a wrong answer only 10 off (an error the estimate cannot see)', 'G3-648', 1, (h) => $do(h, ($) => { const it = $('[data-sv-kind="wrong"]').first(), c = it.find('[data-sv-calc]'); const m = /^(.*) = (\d+)$/.exec(c.text()); const [a, o, b] = m[1].split(' '); const tru = o === '+' ? +a + +b : +a - +b; c.text(`${m[1]} = ${tru + 10}`); }), /right but|wrong but|from the estimate|not a forgotten carry/);
  pa('PA26 a number ending in 50 (rounding has two answers)', 'G3-648', 2, (h) => $do(h, ($) => { const c = $('[data-sv-calc]').first(); c.text(c.text().replace(/^(\d)(\d\d)/, '$150')); }), /ending in 50|the stamp|the överslag boxes|right but|wrong but|estimate/);
  pa('PA27 the chips not tied to the estimate', 'G3-648', 3, (h) => h.split('Enligt överslaget är svaret').join('Svaret är'), /not tied to the estimate/);
  pa('PA28 an everyday answer stamped 30 kg for a school bag', 'G3-648', 1, (h) => $do(h, ($) => { const g = $('[data-dk-item^="ev-"]').first(); const o = g.find('[data-dk-answer]'); o.attr('data-dk-answer', 'no'); o.eq(o.index(o.filter('[data-sv-pick]')) === 0 ? 1 : 0).attr('data-dk-answer', 'right'); }), /everyday .*: the stamp/);
  // G3-649
  pa('PA29 the hundreds part stamped as the tens', 'G3-649', 2, (h) => h.replace(/data-sv-answer="(\d+)" data-sv-part="h"/, (m, n) => `data-sv-answer="${+n / 10}" data-sv-part="h"`), /the h part|the parts/);
  pa('PA30 the parts in another order on level 3 (ones first)', 'G3-649', 3, (h) => h.replace(/data-sv-part="h"/, 'data-sv-part="X"').replace(/data-sv-part="e"/, 'data-sv-part="h"').replace(/data-sv-part="X"/, 'data-sv-part="e"'), /hundreds first/);
  pa('PA31 a subtraction needing a växling (a part below zero)', 'G3-649', 1, (h) => $do(h, ($) => { const c = $('[data-sv-kind="-0"]').first().find('[data-sv-task]'); const m = /^(\d+) − (\d+)/.exec(c.text()); c.text(`${m[1].slice(0, 2)}1 − ${m[2].slice(0, 2)}9`); }), /a växling|a negative part|row prints|part/);
  pa('PA32 a subtraction step accepting a swap', 'G3-649', 2, (h) => h.replace(/data-sv-part="hx"(?! data-sv-alt)/, 'data-sv-part="hx" data-sv-alt="200 − 500 = 300"'), /swap accepted for a subtraction|swap/);
  // G3-651
  pa('PA33 a price blank stamped one krona off', 'G3-651', 1, (h) => h.replace(/data-sv-answer="(\d+)" data-sv-cell="price"/, (m, n) => `data-sv-answer="${+n + 1}" data-sv-cell="price"`), /cost .* kr stamped/);
  pa('PA34 a column with both blanks (many values)', 'G3-651', 2, (h) => $do(h, ($) => { const tb = $('[data-sv-table]').first(); const rows = tb.children('div'); const cell = rows.eq(0).children().eq(3); cell.html('<div class="ws-blankbox" data-dk-box data-sv-answer="4"></div>'); }), /two blanks|columns given/);
  pa('PA35 the recipe for 8 stamped as for 4', 'G3-651', 2, (h) => h.replace(/data-sv-answer="(\d+)" data-sv-cell="recipe" data-sv-persons="8"/, (m, n) => `data-sv-answer="${+n / 2}" data-sv-cell="recipe" data-sv-persons="8"`), /the recipe: .* stamped/);
  pa('PA52 both price tables at one price', 'G3-651', 1, (h) => $do(h, ($) => { const t = $('[data-sv-table]'); const p1 = +t.eq(0).attr('data-sv-unitprice'), p2 = +t.eq(1).attr('data-sv-unitprice'); t.eq(1).find('[data-sv-given="price"]').text(String(p1)); t.eq(1).find('[data-sv-cell="price"]').each((i, e) => { $(e).attr('data-sv-answer', String(+$(e).attr('data-sv-answer') / p2 * p1)); }); }), /two tables, two prices/);
  pa('PA36 "dubbelt så många ... kostar det lika mycket" stamped', 'G3-651', 1, (h) => $do(h, ($) => { const g = $('[data-dk-item="sentence1"]'); g.find('[data-dk-answer]').each((i, e) => { $(e).attr('data-dk-answer', $(e).text() === 'lika mycket' ? 'right' : 'no'); }); }), /the stamp/);
  // G3-652
  pa('PA37 a pencil drawn 3 mm short of its length', 'G3-652', 2, (h) => h.replace(/data-sv-mm="(\d+)"/, (m, n) => `data-sv-mm="${+n - 3}"`), /drawn .* mm for/);
  pa('PA38 a pencil of 6,3 cm (between the half-centimetre marks)', 'G3-652', 1, (h) => h.replace(/data-sv-len="([\d.]+)"/, 'data-sv-len="6.3"'), /not a whole or half centimetre|drawn|stamped|crosses/);
  pa('PA39 the most common length stamped wrong', 'G3-652', 3, (h) => h.replace(/data-sv-answer="([\d,]+) cm" data-sv-q="mode"/, 'data-sv-answer="99 cm" data-sv-q="mode"'), /the most common length stamped/);
  pa('PA40 the plot without its title', 'G3-652', 2, (h) => h.replace(/data-sv-plottitle="1"/, 'data-x="1"'), /title or its axis word/);
  pa('PA41 a length stamped with a point (7.5)', 'G3-652', 1, (h) => h.replace(/data-sv-answer="(\d),5" data-sv-measure/, 'data-sv-answer="$1.5" data-sv-measure'), /not written with a comma/);
  // G2-637
  pa('PA42 a key value in the measuring table', 'G2-637', 2, (h) => h.replace(/data-dk-numbox data-e2-record="est"/, 'data-dk-numbox data-e2-record="est" data-e2-answer="70"'), /the table carries a key value/);
  pa('PA43 "m" printed for the pencil on level 1', 'G2-637', 1, (h) => h.replace(/data-e2-unitgiven="cm"/, 'data-e2-unitgiven="m"'), /the unit printed/);
  pa('PA44 the bus to measure in cm', 'G2-637', 2, (h) => $do(h, ($) => { const p = $('[data-e2-ans="m"]').first(); p.find('[data-dk-answer]').each((i, e) => { $(e).attr('data-dk-answer', $(e).attr('data-dk-answer') === 'right' ? 'no' : 'right'); }); }), /picture .*: the stamp cm/);
  pa('PA45 the ruler drawn as 9 cm', 'G2-637', 1, (h) => h.replace(/data-e2-art="real-ruler" data-e2-cm="10"/, 'data-e2-art="real-ruler" data-e2-cm="9"'), /real-size references/);
  pa('PA46 "3 m = 30 cm"', 'G2-637', 3, (h) => h.replace(/data-e2-answer="300" data-e2-conv="1"/, 'data-e2-answer="30" data-e2-conv="1"'), /the conversions/);
  // G3-650
  pa('PA47 the door in alnar on level 1', 'G3-650', 1, (h) => h.replace(/data-e2-row="sv_dorrbredd" data-e2-rowunit="fot"/, 'data-e2-row="sv_dorrbredd" data-e2-rowunit="aln"'), /measured in aln|no row measured in fot/);
  pa('PA48 "1 aln ≈ 50 cm" on top', 'G3-650', 2, (h) => h.replace('1 aln ≈ 60 cm', '1 aln ≈ 50 cm'), /the old aln/);
  pa('PA49 a stamped choice in the comparison', 'G3-650', 1, (h) => h.replace(/data-e2-whose="0"/, 'data-e2-whose="0" data-dk-answer="right"'), /a record page with a stamped choice/);
  pa('PA50 "1 famn = 2 alnar" in the key', 'G3-650', 3, (h) => h.replace(/data-e2-answer="3" data-e2-conv="1"/, 'data-e2-answer="2" data-e2-conv="1"'), /conversions/);
  pa('PA51 no line for the why on level 1', 'G3-650', 1, (h) => $do(h, ($) => { $('[data-e2-bottom="compare"] [data-g1-frame]').remove(); }), /lines for the why/);
  // controls: a correct page changed in a way that is still right must NOT fire
  pc('PC1 a pair\'s two containers swapped left and right (still the same pair, the same answer)', 'K-727', 2, (h) => $do(h, ($) => { const p = $('[data-sv-pair]').first(); const l = p.attr('data-sv-l'), r = p.attr('data-sv-r'); p.attr('data-sv-l', r).attr('data-sv-r', l); const row = p.find('[data-g1-one]'); const kids = row.children(); row.append(kids.first()); }), /the stamp|times apart|twice/);
  pc('PC2 the two chips of every överslag in the other order (orimligt first: still one right chip, the same)', 'G3-648', 2, (h) => $do(h, ($) => { $('[data-dk-item^="rim"]').each((i, g) => { const k = $(g).children(); $(g).append(k.first()); }); }), /the stamp|the rule|not tied/);
  pc('PC3 the two rows of units under every thing in the other order (still both rows of the thing)', 'G1-676', 2, (h) => h.replace(/data-sv-row="0"/g, 'data-sv-row="X"').replace(/data-sv-row="1"/g, 'data-sv-row="0"').replace(/data-sv-row="X"/g, 'data-sv-row="1"'), /do not make|drawn for|slot|rows of units|box stamped|flest/);
  pc('PC4 two columns of a price table swapped (still a proportional table, one given column)', 'G3-651', 2, (h) => $do(h, ($) => { $('[data-sv-table]').first().children('div').each((i, r) => { const k = $(r).children(); k.eq(4).after(k.eq(3)); }); }), /given|stamped|two blanks|a price over/);

  // ---- instruction poisons (each against the real printed instruction of the same type and level, judged above)
  const realInstr = (id, lv) => withLevelInstruction(resolveStrings(id, 'sv', loadType(id)), id, lv, 'sv').instruction;
  const pi = (name, id, lv, spoil, re) => { if (!IDS.includes(id)) return; judge(name, instrFaults(id, lv, spoil(realInstr(id, lv))), re); };
  pi('PI1 G1-677 "räkna upp" (enumerate) for "räkna uppåt"', 'G1-677', 1, (s) => s.replace('Räkna uppåt', 'Räkna upp'), /"räkna upp"|Räkna uppåt/);
  pi('PI2 G3-649 without where it starts', 'G3-649', 2, (s) => s.replace('börja med hundratalen, ', ''), /börja med hundratalen/);
  pi('PI3 G3-649 naming "stegvis" too', 'G3-649', 1, (s) => s + ' Du kan också räkna stegvis.', /names another strategy/);
  pi('PI4 G3-648 without "enligt överslaget"', 'G3-648', 1, (s) => s.replace('enligt överslaget', ''), /enligt överslaget/);
  pi('PI9 G3-648 "Ringa in om svaret är …"', 'G3-648', 2, (s) => s.replace('Ringa in rimligt eller orimligt', 'Ringa in om svaret är rimligt eller orimligt'), /"Ringa in om …"/);
  pi('PI10 G3-651 "kostar varje sak"', 'G3-651', 1, (s) => s.replace('kostar alla saker', 'kostar varje sak'), /kostar varje sak/);
  pi('PI11 G3-650 "ditt eget mått på bilden"', 'G3-650', 1, (s) => s.replace('med måttet i tabellen. Använd din egen kropp och', 'med ditt eget mått på bilden och'), /ditt eget mått på bilden/);
  { const name = 'PI12 G1-677 titled "räkna upp" (to list)'; judge(name, titleFaults('G1-677', 'Subtraktion som skillnad: räkna upp'), /the title says "räkna upp"/); }
  { const tf5 = titleFaults('G1-677', TITLE_OWN['G1-677']); ok(!tf5.length, 'control PC5: ' + tf5.join(' | ')); plog.push(`  PC5 G1-677 titled as the gate wants: ${tf5.length ? 'FIRED ON A CORRECT TITLE' : 'PASSES (control)'}`); }
  pi('PI5 G3-652 without the ruler\'s zero', 'G3-652', 2, (s) => s.replace('Lägg linjalens nolla vid pennans raka ände. ', ''), /linjalens nolla/);
  pi('PI6 K-727 level 3 without "minst"', 'K-727', 3, (s) => s.replace('och det som rymmer minst i de sista', ''), /i de sista|rymmer minst/);
  pi('PI7 an exclamation', 'G2-637', 1, (s) => s + ' Lycka till!', /exclamation/);
  pi('PI8 G3-650 level 3 without "Välj ett mått"', 'G3-650', 3, (s) => s.replace('Välj ett mått för varje sak och kryssa i det. ', ''), /Välj ett mått/);

  // ---- tell poisons (synthetic pooled sets; each with the real set as its control, judged above)
  const tp = (name, f, re) => judge(name, f, re);
  tp('PT1 the bigger container always on the right', tellFaults('K-727', 1, { pairs: Array.from({ length: 300 }, () => ({ left: false })), ranks: [] }).f, /on the left/);
  tp('PT2 "gem" always the answer on level 2', tellFaults('G1-676', 2, { cards: Array.from({ length: 400 }, (_, i) => ({ firstRight: i % 2 === 0, topSmall: i % 2 === 1, right: 'gem' })) }).f, /"gem" is the answer/);
  tp('PT3 the right unit always the first choice', tellFaults('G1-676', 1, { cards: Array.from({ length: 400 }, (_, i) => ({ firstRight: true, topSmall: i % 2 === 0, right: 'gem' })) }).f, /first choice/);
  tp('PT4 the difference always 3', tellFaults('G1-677', 1, { tasks: Array.from({ length: 400 }, (_, i) => ({ d: 3, pos: i % 4 })) }).f, /the difference is 3/);
  tp('PT5 a final 0 only on the wrong answers', tellFaults('G3-648', 2, { items: Array.from({ length: 600 }, (_, i) => ({ wrong: i % 2 === 0, pos: i % 6, plus: i % 3 === 0, end0: i % 2 === 0, end00: false })), ev: [{ at: 0 }, { at: 1 }, { at: 2 }] }).f, /a final 0/);
  tp('PT6 the reasonable everyday answer always in the middle', tellFaults('G3-648', 1, { items: Array.from({ length: 40 }, (_, i) => ({ wrong: i % 2 === 0, pos: i % 4, plus: true, end0: false, end00: false })), ev: Array.from({ length: 300 }, () => ({ at: 1 })) }).f, /everyday answer is at place 2/);
  tp('PT7 the right words always first', tellFaults('G3-651', 1, { sent: Array.from({ length: 300 }, () => ({ at: 0 })) }).f, /the right words sit at place 1/);
  tp('PT8 a measure with nothing to judge fails', tellFaults('G1-677', 1, {}).f, /nothing to judge/);
  tp('PT9 a cm picture always first', tellFaults('G2-637', 2, { pics: Array.from({ length: 1600 }, (_, i) => ({ pos: i % 8, ans: i % 8 === 0 ? 'cm' : ['m', 'cm'][i % 2] })) }).f, /picture 1 is a cm thing/);

  // ---- 3. render, 6. PDF
  const stacks = [];
  let swept = 0, pdfs = 0;
  if (!NO_RENDER) {
    const puppeteer = require(require.resolve('puppeteer', { paths: [WG] }));
    const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
    const OUTD = path.join(os.tmpdir(), 'verify-e2-sv');
    fs.mkdirSync(OUTD, { recursive: true });
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const render = async (type, lv, v, base, keepPdf = false) => {
      const strings = withLevelInstruction(resolveStrings(type.id, 'sv', type), type.id, lv, 'sv');
      const r = await renderInstance({ type, theme: null, difficulty: lv, locale: 'sv', strings, variant: v, page, outDir: OUTD, baseName: base });
      for (const x of (keepPdf ? ['.png', '.html'] : ['.pdf', '.png', '.html'])) try { fs.unlinkSync(path.join(OUTD, base + x)); } catch (e) {}
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
    const PDF_IDS = ['G1-676', 'G2-637', 'G3-652'];
    try {
      for (const id of IDS) {
        const t = loadType(id);
        for (const lv of [1, 2, 3]) for (let v = 1; v <= (QUICK ? 1 : 2); v++) {
          const r = await render(t, lv, v, `${id}-L${lv}-v${v}`, PDF_IDS.includes(id) && !NO_PDF);
          const bad = [].concat(r.qa.lints || [], r.qa.verify || []);
          ok(!bad.length, `${id} L${lv} v${v}: ${bad.slice(0, 3).join(' | ')}`);
          if (v === 1) { const stk = await page.evaluate(() => { const R = document.querySelector('[data-dk]'); const rt = R.getBoundingClientRect(); const ink = [...R.querySelectorAll('[data-dk-box], svg, img')].filter((e) => !(e.parentElement && e.parentElement.closest('svg'))).map((e) => e.getBoundingClientRect().bottom); return Math.round(Math.max(...ink) - rt.top); }); stacks.push(`${id} L${lv} ${stk}`); }
          if (PDF_IDS.includes(id) && !NO_PDF) { const pf = pdfFaults(id, r.pdfPath, r.meta); pdfs++; ok(!pf.length, `${id} L${lv} v${v} PDF: ${pf.slice(0, 3).join(' | ')}`); try { fs.unlinkSync(r.pdfPath); } catch (e) {} }
          if (v === (QUICK ? 1 : 2)) { const sw = await layoutSweep(t, lv, QUICK ? 30 : SEEDS); swept += sw.n; ok(!sw.faults.length, `${id} L${lv} layout sweep (${sw.n} distinct of ${QUICK ? 30 : SEEDS} generator seeds): ${sw.faults.slice(0, 4).join(' | ')}`); }
        }
        process.stdout.write(id + ' ');
      }
      // more PDFs: every level of the three real-size types at 5 more copies (the sizes differ by copy)
      if (!NO_PDF) for (const id of PDF_IDS) { if (!IDS.includes(id)) continue; const t = loadType(id); for (const lv of [1, 2, 3]) for (let v = 3; v <= (QUICK ? 3 : 7); v++) { const r = await render(t, lv, v, `${id}-L${lv}-v${v}`, true); const pf = pdfFaults(id, r.pdfPath, r.meta); pdfs++; ok(!pf.length, `${id} L${lv} v${v} PDF: ${pf.slice(0, 3).join(' | ')}`); try { fs.unlinkSync(r.pdfPath); } catch (e) {} } }
      console.log(`\nrender done (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
      const spoilType = (id, fn) => { const t = loadType(id); return { ...t, build(a, c) { const r = t.build(a, c); const h = fn(r.bodyHtml); if (h === r.bodyHtml) throw new Error('the spoil changed nothing'); return { ...r, bodyHtml: h }; } }; };
      const pr = async (name, id, lv, fn, re) => { if (!IDS.includes(id)) return; let f; try { const r = await render(spoilType(id, fn), lv, 1, 'poison'); f = [].concat(r.qa.verify || [], r.qa.lints || []); } catch (e) { f = ['render threw: ' + e.message]; } judge(name, f, re); };
      // each render poison's control is the real page of the same type and level, rendered above (ok() on its verify)
      await pr('PR1 the page shrunk (a blank band at the bottom)', 'G3-649', 2, (h) => h.replace('class="dk-root"', 'class="dk-root" style="transform:scale(0.6);transform-origin:top center"'), /the stack is|empty band/);
      await pr('PR2 a container picture shrunk to 50 px', 'K-727', 1, (h) => h.replace(/(data-sv-pair="1"[\s\S]*?style="width:)\d+px;height:\d+px/, '$150px;height:50px'), /container picture \d+ px/);
      await pr('PR3 a measuring row of gem 3 px long of its thing (in the page\'s pixels)', 'G1-676', 2, (h) => h.replace(/(<g data-sv-row="\d" data-sv-rowunit="gem"[^>]*>)/, '$1<g transform="translate(3 0)">').replace(/(<g data-sv-row="\d" data-sv-rowunit="gem"[\s\S]*?)(<\/g><\/g>)/, '$1</g>$2'), /a row of gem runs/);
      await pr('PR4 an Egyptian sign shrunk below what a child reads at print size', 'G3-647', 1, (h) => h.replace(/(<rect x="[0-9.]+" y="[0-9.]+" width=")([0-9.]+)(" height=")([0-9.]+)("[^>]*data-sv-glyph="stroke")/g, (m, a, w, b, hh, c) => a + (+w * 0.4) + b + (+hh * 0.4) + c), /an Egyptian sign \d+x\d+ px/);
      await pr('PR5 a pencil drawn at 98 % (the printed length is not the length)', 'G3-652', 2, (h) => h.replace(/<svg ([^>]*data-sv-art="real-pencil"[^>]*)>/, (m, a) => `<svg ${a}><g transform="scale(0.98 1)">`).replace(/(data-sv-real="lead"\/>)(<\/svg>)/, '$1</g>$2'), /a pencil drawn [\d.]+ mm/);
      await pr('PR6 a box too small to write in', 'G3-651', 1, (h) => h.replace(/(class="ws-blankbox" data-dk-box data-dk-numbox data-sv-answer="\d+" data-sv-cell="price" style="flex-shrink:0;width:)\d+px;height:\d+px/, '$120px;height:20px'), /a box \d+x\d+ px/);
      await pr('PR7 the line plot without its title', 'G3-652', 1, (h) => h.replace(/data-sv-plottitle="1"/, 'data-x="1"'), /without its title/);
      await pr('PR8 a table cell too narrow for its box', 'G3-651', 1, (h) => h.replace(/(<div class="sv-cell" data-dk-box style="width:)\d+px(;height:44px">)(<div class="ws-blankbox")/, '$118px$2$3'), /table cell|out of its card|collide|runs out/);
      await pr('PR9 a container word wider than its card', 'K-727', 2, (h) => h.replace(/(data-sv-word="[a-z]+"[^>]*>)[^<]+/, '$1vattenkannaskrivbord'), /wider than its picture card|out of its card|runs out/);
      await pr('PR10 the measuring table without the row to choose', 'G2-637', 1, (h) => h.replace('data-e2-row="own"', 'data-e2-row="x"'), /no row for a thing the child chooses/);
      // the PDF poisons: a real-size page printed wrong must fail the PDF check (the real page passed it above)
      if (!NO_PDF) {
        const ppdf = async (name, id, lv, fn, re) => { if (!IDS.includes(id)) return; let f; try { const r = await render(spoilType(id, fn), lv, 1, 'poisonpdf', true); f = pdfFaults(id, r.pdfPath, r.meta); try { fs.unlinkSync(r.pdfPath); } catch (e) {} } catch (e) { f = ['render threw: ' + e.message]; } judge(name, f, re); };
        await ppdf('PP1 the pencils printed at 97 % (a printer\'s "fit to page")', 'G3-652', 1, (h) => h.replace('class="dk-root"', 'class="dk-root" style="zoom:0.97"'), /PDF: pencil \d prints/);
        await ppdf('PP2 the 1-cm bar printed 10,5 mm long', 'G2-637', 1, (h) => h.replace(/(data-e2-realbar="1")/, '$1').replace(/<line x1="([0-9.]+)" y1="11" x2="([0-9.]+)" y2="11" stroke="#173B5C" stroke-width="4"/, (m, a, b) => `<line x1="${a}" y1="11" x2="${+b + 1.9}" y2="11" stroke="#173B5C" stroke-width="4"`), /PDF: the 1-cm bar prints/);
        await ppdf('PP3 the ruler\'s ticks 5.2 mm apart', 'G2-637', 2, (h) => h.replace(/<svg ([^>]*data-e2-art="real-ruler"[^>]*)>/, (m, a) => `<svg ${a}><g transform="scale(1.04 1)">`).replace(/(data-e2-rulerlabel="10"[^<]*<\/text>)(<\/svg>)/, '$1</g>$2'), /PDF: ruler ticks|PDF: the ruler/);
        await ppdf('PP4 a unit row printed 2 px past its thing', 'G1-676', 1, (h) => h.replace(/(<g data-sv-row="1"[^>]*>)/, '$1<g transform="translate(2 0)">').replace(/(<g data-sv-row="1"[\s\S]*?)(<\/g><\/g>)/, '$1</g>$2'), /PDF: thing \d: the \w+ row prints/);
      }
    } finally { await browser.close(); }
    console.log('stacks (copy 1, measured on what is drawn): ' + stacks.join(', '));
    console.log(`layout sweep: ${swept} distinct pages of the generator's seeds 1..${QUICK ? 30 : SEEDS} judged by each type's own verify; ${pdfs} PDFs measured`);
  }
  console.log('measures (pooled, ' + SEEDS + ' copies a level):');
  for (const id of IDS) for (const lv of [1, 2, 3]) { const M = pools[id + lv + 'M']; if (M && Object.keys(M).length) console.log(`  ${id} L${lv}: ` + Object.entries(M).map(([k, v]) => `${k} ${Array.isArray(v) ? v[0] + ' ' + (100 * v[1]).toFixed(1) + '%' : (100 * v).toFixed(1) + '%'}`).join('; ')); }
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
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { bankFaults, pageFaults, tellFaults, pdfFaults, buildPage, IDS: ALL_IDS };
