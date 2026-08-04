#!/usr/bin/env node
/* =====================================================================
   build-place-value-lab-sets.js — generates mini tools/place-value-lab-sets.json

   The tool's repertoire was `SHOW_POOL: [24,47,61,35,83,52,76,91,68,39,17,45]`
   — twelve hard-coded numbers against a house bar of 200+, and measured
   against what this instrument is FOR they covered almost nothing:
   0 decades, 1 teen, 0 single digits, 0 three-digit numbers, and 0 of the
   teen-vs-decade confusable pairs (13/30, 14/40) that are the single most
   common number-word error in en/de/nl/da/sv/no.

   ⚠ FEATURES ARE COMPUTED HERE AND RE-COMPUTED INDEPENDENTLY BY THE GATE.
   This file writes what it believes; verify-place-value-lab.js derives the
   same facts from the integer alone and from PV_WORD_SPANS, and fails on
   any disagreement. Neither reads the other's answer — that is the
   marks-its-own-homework rule, and a repertoire is exactly where it would
   otherwise bite, because the data looks authoritative.

   ZERO AUTHORED LANGUAGE. Every entry is integers and closed enums, so the
   library fans out to eleven locales at no cost — which is why it can be
   200+ where wodb-grids.json is stuck at 21.

   Run: node scripts/build-place-value-lab-sets.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..');
const TOOL = path.join(REPO, 'mini tools', 'place-value-lab.js');
const OUT = path.join(REPO, 'mini tools', 'place-value-lab-sets.json');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* load the tool so `inversion` can be read off the real span ORDER rather
   than from a list of "languages that invert", which would be a claim
   about linguistics instead of a fact about this composer */
const sb = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '' }, localStorage: { getItem: () => null, setItem: () => {} } };
sb.global = sb; vm.createContext(sb); vm.runInContext(fs.readFileSync(TOOL, 'utf8'), sb);
const T = sb.PlaceValueLab;

const digits = (n) => ({ h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, o: n % 10 });

/* the feature set, each computed from the integer (or, for `inversion`,
   from the composer's own span order) */
function featuresOf(n) {
  const d = digits(n), f = [];
  const sub = n % 100;
  if (sub >= 11 && sub <= 19) f.push('teen');
  if (n >= 10 && sub % 10 === 0 && sub !== 0) f.push('decade');
  if (n >= 100 && d.t === 0) f.push('zero-placeholder');
  if (d.t !== 0 && d.o !== 0 && d.t !== d.o) f.push('reversal');
  /* ⚠ TWO RULES WHERE ONE WAS NEEDED, and the h-branch omitted the
     zero guard — so 100, 200 ... 900 were tagged same-digits because
     their tens and ones are both 0. That would bucket them with 44 and
     77, which teach something else entirely. The gate re-derived it
     independently and disagreed; the gate was right. */
  if (d.t === d.o && d.t !== 0) f.push('same-digits');
  if (n >= 100) f.push('three-digit');
  if (n < 10) f.push('single-digit');

  /* ⭐ INVERSION is read off the SPAN ORDER, in any locale: does a ones
     span come before a tens span? That is a fact about the word, not an
     opinion about the language, and it is the tool's whole thesis. */
  for (const L of LOCALES) {
    const spans = T.PV_WORD_SPANS[L](n);
    const io = spans.findIndex((s) => s.p === 'ones');
    const it = spans.findIndex((s) => s.p === 'tens' || s.p === 'tenMark');
    if (io >= 0 && it >= 0 && io < it) { f.push('inversion'); break; }
  }
  /* an atom somewhere in the word — a number whose name cannot be taken
     apart, which is worth meeting deliberately */
  for (const L of LOCALES) {
    if (T.PV_WORD_SPANS[L](n).some((s) => s.p === 'atom')) { f.push('atom'); break; }
  }
  /* the French base-20 range, which no other locale has */
  if (T.PV_WORD_SPANS.fr(n).some((s) => s.p === 'scoreMark')) f.push('vigesimal');
  return f.filter((x, i, a) => a.indexOf(x) === i).sort();
}

/* ---- the numbers, chosen for what they TEACH ---------------------- */
const picked = new Map();
const add = (n) => { if (n >= 0 && n <= 999 && !picked.has(n)) picked.set(n, true); };

for (let n = 0; n <= 20; n++) add(n);              /* every single digit and every teen */
for (let t = 2; t <= 9; t++) add(t * 10);          /* every decade */
/* the teen-vs-decade confusable pairs, both members present */
[13, 30, 14, 40, 15, 50, 16, 60, 17, 70, 18, 80, 19, 90].forEach(add);
/* reversal pairs, both members present — the tool's thesis, twice each */
[24, 42, 35, 53, 47, 74, 51, 15, 68, 86, 39, 93, 27, 72, 61, 16].forEach(add);
/* the WHOLE two-digit range. This is the band a K-1 class lives in and
   the band the inversion actually bites in, so there is no argument for
   sampling it. */
for (let n = 21; n <= 99; n++) add(n);
/* three digits: round hundreds, the zero-placeholder family, and a spread */
for (let h = 1; h <= 9; h++) {
  add(h * 100); add(h * 100 + 4); add(h * 100 + 40); add(h * 100 + 7);
  add(h * 100 + 11); add(h * 100 + 24); add(h * 100 + 42); add(h * 100 + 70); add(h * 100 + 96);
}
[147, 247, 305, 380, 419, 502, 571, 606, 683, 714, 790, 828, 905, 999].forEach(add);

const nums = [...picked.keys()].sort((a, b) => a - b);

/* ---- the free subset, chosen BY MEASUREMENT ------------------------
   greedily take the entry that adds the most uncovered features, until
   every feature in the enum is exhibited; then top up with the numbers a
   first lesson actually starts on. Nothing in the argument sits behind
   the paywall — mechanised, not asserted. */
const ALL_FEATURES = [...new Set(nums.flatMap(featuresOf))].sort();
const free = new Set();
const covered = new Set();
while (covered.size < ALL_FEATURES.length) {
  let best = null, gain = -1;
  for (const n of nums) {
    if (free.has(n)) continue;
    const g = featuresOf(n).filter((f) => !covered.has(f)).length;
    if (g > gain) { gain = g; best = n; }
  }
  if (gain <= 0) break;
  free.add(best);
  featuresOf(best).forEach((f) => covered.add(f));
}
/* ⚠ this top-up list and SHOW_POOL in the tool are the SAME SET, and
   the gate asserts it — the inline fallback must BE the free tier, not
   a stale copy of an older one. When the greedy pass changes, this is
   where they are re-synced. */
[4, 7, 10, 12, 14, 16, 20, 24, 30, 42, 47, 71, 91, 100, 124, 147].forEach((n) => { if (picked.has(n)) free.add(n); });

const sets = nums.map((n) => {
  const d = digits(n);
  const e = { id: 'b' + String(n).padStart(3, '0'), kind: 'build', n: n, places: n >= 100 ? 3 : 2, features: featuresOf(n) };
  if (free.has(n)) e.free = true;
  return e;
});

const json = {
  version: 1,
  freeCount: sets.filter((s) => s.free).length,
  _note: 'Locale-NEUTRAL by construction: every entry is integers and a closed feature enum, so the library costs nothing to fan out to eleven locales. Features are COMPUTED here and RE-COMPUTED independently by verify-place-value-lab.js from the integer and from PV_WORD_SPANS — neither reads the other\'s answer. The free subset is chosen BY MEASUREMENT, not by taste: a greedy pass takes whichever number adds the most uncovered features until every feature in the enum is exhibited at least once, then tops up with the numbers a first lesson actually starts on. So no claim the tool\'s header makes — the inversion, the teens, the decades, the zero placeholder, the French vigesimal — sits behind the paywall. The paid remainder is DEPTH, not the argument. Replaces SHOW_POOL, twelve hard-coded numbers that between them covered 0 decades, 1 teen, 0 single digits, 0 three-digit numbers and 0 teen-vs-decade confusable pairs.',
  features: ALL_FEATURES,
  sets: sets,
};

fs.writeFileSync(OUT, JSON.stringify(json, null, 1) + '\n');
console.log(`wrote ${sets.length} entries (${json.freeCount} free) → ${path.basename(OUT)}`);
console.log('features:', ALL_FEATURES.join(', '));
for (const f of ALL_FEATURES) {
  const all = sets.filter((s) => s.features.includes(f)).length;
  const fr = sets.filter((s) => s.free && s.features.includes(f)).length;
  console.log(`  ${f.padEnd(18)} ${String(all).padStart(3)} entries, ${fr} free`);
}
