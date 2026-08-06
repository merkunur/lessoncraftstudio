#!/usr/bin/env node
/* =====================================================================
   verify-mend-page-core.js — build-time gate for the "restore the
   meaning" cognition behind "Granny's Mending Basket" (CCSS RF.1.4.a).
   Loads the REAL mini tools/mend-page-core.js + the manifest descriptors
   and proves, MEASURED (exit 0 = all pass; 1 = any failure):

     THE ADVERSARIAL SOLVER BANK (the headline — analog of Game 5's
     counting-solver). For every option-menu page (cloze / contradiction /
     connect) four dumb non-reading solvers run + EACH MUST FAIL:
       keyword-only · POS-only · picture-only · frequency-sense (soup-catcher).
     A page any solver passes would be REJECTED.

   Plus structural: POS-uniformity (cloze/connect) · keystone upstream &
   not ±1 · picture-disjoint (answer in the torn region, no option drawn) ·
   ≥1 local-fit decoy & ≥1 frequency decoy · a picture-trap where expected ·
   decodability (approved-words-en + sight + allow) · minimal-pair coverage ·
   enumerated guess-rate ceilings · per-type checks · ≥7 distinct signatures.
   The broken-soup sentence is the gate's canonical REJECT self-test.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'mend-page-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MendPageCore;
if (!Core) { console.error('FAIL: mend-page-core.js did not define window.MendPageCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'mending-basket-activities.json'), 'utf8'));
const rounds = manifest[0].params.rounds;

/* decodability corpus: approved-words-en (the phonics-safe set) + sight words + a
   grade-1 comprehension allowlist (Granny reads aloud → decoding is supported;
   comprehension is the only bottleneck). Every content word must be covered. */
let APPROVED = new Set();
try {
  const aw = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-en.json'), 'utf8'));
  (aw.entries || []).forEach((e) => APPROVED.add(String(e.word).toLowerCase()));
} catch (e) { /* non-fatal: allowlist + sight carry it */ }
const SIGHT = new Set('a an the and or but so to of in on at it its is was were be been are am he she it they we you i him her them his their our my your this that these those then there here with for from by up down out off over under into too not no yes can could would should will had has have did do does went go get got let put see saw look find found made make her him them some all one two three any each every who what when where why how is are'.split(/\s+/));
const ALLOW = new Set('granny puppy tiny grass carefully quickly loudly words glasses lamp broom candle reached soup hot cold cool warm soft raining opened umbrella wet stay very thin coat fire felt looked blurry dog chased ball brought back mouse cheese ran hole little shy cat hiding quilt bow door old sat red park white paw big tall good planted seed watered day flower grew sky dark rain began fall hands keeps sweet bite head bright sun high moon stars birds sing green trees soon'.split(/\s+/));

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const clean = (w) => String(w).toLowerCase().replace(/[^a-z']/g, '');

/* ---- structural / coverage ---- */
check(rounds.length >= 7, `only ${rounds.length} rounds`);
check(new Set(rounds.map((r) => r.id)).size === rounds.length, 'round ids not distinct');
const sigs = new Set(rounds.map((r) => Core.signature(r)));
check(sigs.size >= 7, `only ${sigs.size} distinct type signatures (< 7): ${[...sigs].join(',')}`);

const SOLVERS_BY_TYPE = {
  cloze: ['keyword', 'pos', 'picture', 'frequency'],
  connect: ['keyword', 'pos', 'picture', 'frequency'],
  contradiction: ['keyword', 'picture', 'frequency']   // no fill-slot → POS-only is N/A
};

/* ---- per round ---- */
rounds.forEach((r) => {
  const L = `round[${r.id}/${r.type}]`;

  // decodability of every content token + piece/strip/item text
  const words = [];
  (r.tokens || []).forEach((t) => { if (t.t) words.push(t.t); });
  (r.pieces || []).forEach((p) => String(p.text).split(/\s+/).forEach((w) => words.push(w)));
  (r.strips || []).forEach((s) => s.text.split(/\s+/).forEach((w) => words.push(w)));
  (r.items || []).forEach((it) => it.text.split(/\s+/).forEach((w) => words.push(w)));
  words.map(clean).filter(Boolean).forEach((w) => {
    check(APPROVED.has(w) || SIGHT.has(w) || ALLOW.has(w), `${L}: word "${w}" not decodable (add to approved/sight/allow)`);
  });

  // the adversarial solver bank
  const solvers = SOLVERS_BY_TYPE[r.type];
  if (solvers) {
    solvers.forEach((name) => {
      const guess = Core.SOLVERS[name](r);
      check(guess !== r.answer, `${L}: ${name}-solver PASSED (returned the answer "${r.answer}") — page would be REJECTED`);
    });
    check(Core.keystoneOK(r), `${L}: keystone not upstream-and-not-±1 (keystone ${r.keystoneIndex} / gap ${r.gapIndex})`);
    check(Core.pictureDisjoint(r), `${L}: picture not disjoint from options (the picture must not be the answer-key)`);
    check(Core.hasLocalFitDecoy(r), `${L}: no local-fit decoy (keyword-solver must NOT pick the answer)`);
    check(Core.hasFrequencyDecoy(r), `${L}: no frequency decoy (a more-frequent option must exist)`);
    if (r.type === 'cloze' || r.type === 'connect') check(Core.posUniform(r), `${L}: options not POS-uniform`);
    if (Core.picsTrapRequired(r)) check(Core.hasPicsTrap(r), `${L}: picsTrapExpected but no piece flagged picsTrap`);
  }

  // per-type
  if (r.type === 'contradiction') {
    check(r.extras && typeof r.extras.contradictionIndex === 'number', `${L}: no contradictionIndex`);
    check(r.tokens[r.extras.contradictionIndex] && r.tokens[r.extras.contradictionIndex].t === r.answer, `${L}: contradiction token ≠ answer`);
  }
  if (r.type === 'placement') {
    const z = (r.extras && r.extras.zones) || [];
    check(z.length >= 3, `${L}: placement needs ≥3 zones (has ${z.length})`);
    check(z.indexOf(r.answer) >= 0, `${L}: answer "${r.answer}" not among zones`);
    check(Core.guessRate(r) <= 0.20 + 1e-9, `${L}: placement guess-rate ${Core.guessRate(r).toFixed(3)} > 0.20`);
  }
  if (r.type === 'match') {
    check(r.extras && r.extras.matchPair && typeof r.extras.farWordIndex === 'number', `${L}: twin-scene needs matchPair + farWordIndex`);
    check(r.answer === 0 || r.answer === 1, `${L}: match answer not a picture index`);
  }
  if (r.type === 'sequence') {
    const ord = (r.extras && r.extras.sequenceOrder) || [];
    check((r.strips || []).length === ord.length && ord.length === 3, `${L}: sequence needs 3 strips + a 3-order`);
    check(r.extras && r.extras.connective, `${L}: sequence needs a load-bearing connective`);
    check(Core.guessRate(r) <= 0.167 + 1e-9, `${L}: sequence guess-rate ${Core.guessRate(r).toFixed(3)} > 0.167`);
  }
  if (r.type === 'sort') {
    const bins = (r.extras && r.extras.sortBins) || [], map = (r.extras && r.extras.sortMap) || {};
    check(bins.length >= 2, `${L}: sort needs ≥2 bins`);
    check(Object.keys(map).length === (r.items || []).length && (r.items || []).length > 0, `${L}: sortMap must cover every item`);
    Object.keys(map).forEach((k) => check(bins.indexOf(map[k]) >= 0, `${L}: sortMap bin "${map[k]}" not in sortBins`));
    check(Core.guessRate(r) <= 0.20 + 1e-9, `${L}: sort guess-rate ${Core.guessRate(r).toFixed(3)} > 0.20`);
  }
});

/* ---- minimal-pair coverage (≥1 valid pair) ---- */
let mpFound = 0;
for (let i = 0; i < rounds.length; i++) for (let j = i + 1; j < rounds.length; j++) {
  if (Core.minimalPairValid(rounds[i], rounds[j])) mpFound++;
}
check(mpFound >= 1, 'no valid minimal pair (share referents, differ by one meaning-token, different answers)');

/* ---- the broken-soup REJECT self-test (proves the frequency-sense solver works) ---- */
const brokenSoup = {
  type: 'cloze', answer: 'hot',
  pieces: [
    { value: 'hot', text: 'hot', pos: 'ADJ', freqRank: 1, localAssocScore: 3, picsTrap: false },   // the idiomatic completion = the (wrong) answer
    { value: 'cold', text: 'cold', pos: 'ADJ', freqRank: 2, localAssocScore: 1, picsTrap: false },
    { value: 'old', text: 'old', pos: 'ADJ', freqRank: 3, localAssocScore: 2, picsTrap: false }
  ],
  picture: { visibleObjects: [], answerDetailInTornRegion: true }
};
check(Core.SOLVERS.frequency(brokenSoup) === brokenSoup.answer, 'self-test: frequency-sense solver did NOT catch the broken-soup page (the gate is not working)');

if (failures.length) {
  console.error(`FAIL — ${failures.length} mend-page violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} rounds / ${sigs.size} distinct types: the 4-solver adversarial bank fails every cloze/contradiction/connect page; ` +
  `keystone-upstream + picture-disjoint + POS-uniform + decoys verified; ${mpFound} minimal pair(s); guess-rate ceilings met; ` +
  `decodable; broken-soup REJECT self-test catches the frequency-sense cheat.`);
process.exit(0);
