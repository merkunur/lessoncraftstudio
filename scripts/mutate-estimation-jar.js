#!/usr/bin/env node
/* =====================================================================
   mutate-estimation-jar.js — does verify-estimation-jar.js actually bite?

   A gate that has never failed has proven nothing. This writes a broken
   tool to a temp directory, points the gate at it through the
   EJ_TOOL_DIR / EJ_DATA_DIR indirection, and requires the gate to FAIL.
   Every mutation must be killed.

   THE HOUSE RULES, each bought by a real defect elsewhere:
     · collapse CRLF before searching — `git checkout` normalises line
       endings and multi-line needles go blind silently (7 of them did,
       on #43);
     · CARRY every data file the gate reads into the tmp dir, or every
       mutation is "killed" by a missing file and the run reports a
       clean sweep of nothing;
     · a needle that cannot find its text is a HARNESS FAULT, not a
       skip — dropping it shrinks the total while the run still says
       "every mutation killed";
     · an INERT mutation (one that changes nothing) is a BAD MUTATION,
       not a gate hole;
     · ⚠ a gate that HANGS has SURVIVED. An unbounded loop meeting a
       mutation that stops it terminating would otherwise be scored a
       kill.

   Usage:  node scripts/mutate-estimation-jar.js [--only=<substr>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const TOOL = path.join(MINI, 'estimation-jar.js');
const GATE = path.join(__dirname, 'verify-estimation-jar.js');
const CARRY = ['estimation-jar-sets.json'];

const SRC = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
const ONLY = (process.argv.find(a => a.startsWith('--only=')) || '').slice(7);

/* Self-anchoring needle: reads the CURRENT English value out of the live
   strings block and rebuilds the from/to pair, so a locale rewrite
   cannot silently un-anchor it. Throws rather than returning null. */
function enNeedle(key, replacement, name) {
  const re = new RegExp('(' + key + ':\\s*\\{en:\')([^\']*)(\')');
  const m = SRC.match(re);
  if (!m) throw new Error(`needle "${name}": could not read the en value of ${key}`);
  return [name, m[1] + m[2] + m[3], m[1] + replacement + m[3]];
}

const M = [
  /* ---- the honest jar: the theorems the rebuild rests on ---- */
  /* ⚠ The first attempt at this one — `if (!this.premium) return
     this.freeMax()` inside ceiling() — SURVIVED, and it was a BAD
     MUTATION rather than a gate hole: freeMax is 30 and the only free
     capacity is also 30, so mutated and un-mutated agree on every input
     the shipped data can produce. It was provably equivalent, so it is
     replaced here by one that genuinely reintroduces the v1 defect:
     the SIZE of the objects keyed to the subscription. */
  ['⭐⭐ P8 the tier is back inside the picture (the original defect)',
    'capacityOf: function () { return this.ceiling(); },',
    'capacityOf: function () { return this.premium ? 200 : 30; },'],

  ['⭐⭐ P4 the picture stops distinguishing adjacent counts',
    'var N = Math.max(0, Math.min(all.length, Math.floor(n || 0)));',
    'var N = Math.max(0, Math.min(all.length, Math.floor((n || 0) / 6) * 6));'],

  /* ⚠ Also replaced after surviving: `^ 7` on the seed changes WHICH
     arrangement you get and nothing about its monotonicity, because the
     seed deliberately excludes n. Reintroducing n-dependence in the
     placement is the defect that actually shipped. */
  ['⭐⭐ P5 the pile top moves back down as objects are added',
    'out.push({ x: s.x, y: s.baseY, row: s.row,',
    'out.push({ x: s.x, y: s.baseY + (N % 7) * 1.4, row: s.row,'],

  ['⭐ P3 one object is quietly dropped',
    'for (i = 0; i < N; i++) {\n      var s = all[i];',
    'for (i = 0; i < N - 1; i++) {\n      var s = all[i];'],

  ['⭐ P6 the wall clamp is removed (objects escape the glass)',
    'var lim = Math.max(0, this.interiorHalfWidthAt(oy) - R);\n        if (ox > 100 + lim) ox = 100 + lim;\n        if (ox < 100 - lim) ox = 100 - lim;',
    'var lim = Math.max(0, this.interiorHalfWidthAt(oy) - R);'],

  ['⭐ P6b the crown re-clamp is removed',
    'var lim = Math.max(0, this.interiorHalfWidthAt(o.y) - R);\n      if (o.x > 100 + lim) o.x = 100 + lim;\n      if (o.x < 100 - lim) o.x = 100 - lim;',
    'var lim = Math.max(0, this.interiorHalfWidthAt(o.y) - R);'],

  ['⭐⭐ P2 the radius stops being maximal (a full jar reads half empty)',
    'if (this.slotsBelowRing(mid) >= cap) lo = mid; else hi = mid;',
    'if (this.slotsBelowRing(mid) >= cap * 1.6) lo = mid; else hi = mid;'],

  /* ⚠ Replaced: eight bisection steps over [1.5,45] already lands
     within 0.17 units, so the mutation was very nearly inert. */
  ['⭐ P2b the radius overshoots (the jar overflows its own ring)',
    'return (this._radiusCache[cap] = lo);',
    'return (this._radiusCache[cap] = lo * 1.22);'],

  /* ⚠ Replaced: the original flattened rows y48-84, which are the NECK
     — above the fill region entirely, so the pile never sees them. A
     mutation aimed at the part of a table nobody reads is not a test of
     the table. These are the BODY rows. */
  ['⭐ P7 the interior profile is flattened, so the fill stops matching the glass',
    '[88, 70], [120, 72.5],\n    [160, 73], [200, 71.5], [214, 69], [224, 64], [232, 56], [238, 50]',
    '[88, 40], [120, 40],\n    [160, 40], [200, 40], [214, 40], [224, 40], [232, 40], [238, 40]'],

  /* ---- the reveal ---- */
  ['⭐⭐ P9 the reveal stops counting on ("ten … twelve" returns)',
    'for (i = 0; i < rem; i++) { t += 1; out.push({ add: 1, total: t }); }',
    'if (rem) { t += rem; out.push({ add: rem, total: t }); }'],

  ['⭐⭐ P9b small jars are counted in tens again',
    'if (alwaysOnes || N <= this.ONES_MAX) {',
    'if (alwaysOnes) {'],

  ['⭐ P9c the always-by-ones override is ignored',
    'if (alwaysOnes || N <= this.ONES_MAX) {',
    'if (N <= this.ONES_MAX) {'],

  ['⭐ P9d a beat loses an object',
    'var tens = Math.floor(N / 10), rem = N - tens * 10;',
    'var tens = Math.floor(N / 10), rem = Math.max(0, N - tens * 10 - 1);'],

  /* ---- doctrine A + B, still ---- */
  ['⭐⭐ T10 the true count becomes readable before the reveal',
    "if (!state || state.stage !== 'reveal')",
    'if (false)'],

  ['⭐⭐ T9 compare() starts leaking a distance',
    "return actual === guess ? 'same' : (actual > guess ? 'more' : 'fewer');",
    "return actual === guess ? 'same' : String(actual - guess);"],

  ['⭐ P10 the sign summary starts counting a distance band',
    "if (s === 'same') out.same++;",
    'if (Math.abs(guesses[i] - actual) <= 2) out.same++;'],

  ['⭐ T9b a rank function appears on the tool',
    '  spread: function (guesses, actual) {',
    '  rank: function (g, a) { return Math.abs(g - a); },\n  spread: function (guesses, actual) {'],

  /* ---- the suggested count ---- */
  ['⭐ P11 the suggested count stops rejecting decades',
    'if (v % 10 === 0) continue;',
    'if (false) continue;'],

  ['⭐ P11b the suggested count leaves the jar',
    'var hi = Math.max(lo + 1, Math.round(cap * 0.85));',
    'var hi = Math.max(lo + 1, Math.round(cap * 1.9));'],

  /* ---- the deep link ---- */
  ['⭐⭐ P12 a deep link stops bringing its jar (silently clamps instead)',
    'return { set: sid, count: c, capacityId: capId };',
    'return { set: sid, count: c, capacityId: null };'],

  ['⭐ P12b a free visitor is handed a premium-size count',
    'if (c !== null && c > tierMax) c = tierMax;',
    'if (false) c = tierMax;'],

  /* ---- the saved weekly ritual ---- */
  ['⭐⭐ P14 the weekly record starts carrying an accuracy, which is a trend',
    'return { d: stamp, set: setId, cap: capacity, n: count, cols: cols };',
    'return { d: stamp, set: setId, cap: capacity, n: count, cols: cols, accuracy: cols.length };'],

  ['⭐ P14b the record keeps the raw guesses, so arrival order survives',
    'cols.sort(function (a, b) { return a[0] - b[0]; });',
    'cols = (guesses || []).map(function (g, i) { return [g, i]; });'],

  ['⭐ P14c the history grows long enough to BE a series',
    'HISTORY_MAX: 12,',
    'HISTORY_MAX: 52,'],

  /* ---- range mode: the width is the risk ---- */
  ['⭐⭐ P15 the range tally starts rewarding a NARROW range (a distance)',
    'for (i = 0; i < (ranges || []).length; i++) if (this.rangeHolds(ranges[i], actual)) held++;',
    'for (i = 0; i < (ranges || []).length; i++) if (this.rangeHolds(ranges[i], actual) && (ranges[i].hi - ranges[i].lo) < 20) held++;'],

  ['⭐ P15b a range-width function appears on the tool',
    '  rangeHolds: function (r, actual) {',
    '  rangeWidth: function (r) { return r.hi - r.lo; },\n  rangeHolds: function (r, actual) {'],

  ['⭐ P15c a reversed range stops being normalised',
    'return actual >= Math.min(r.lo, r.hi) && actual <= Math.max(r.lo, r.hi);',
    'return actual >= r.lo && actual <= r.hi;'],

  ['⭐ P15d the tally leaks a width alongside the count',
    'return { held: held, total: (ranges || []).length };',
    'return { held: held, total: (ranges || []).length, avgWidth: 1 };'],

  /* ---- the display bin ---- */
  ['⭐ P13 the plot stops binning, so a 200-jar draws 201 columns',
    'if (max <= 30) return 1;',
    'return 1;\n    if (max <= 30) return 1;'],

  /* ---- the data ---- */
  ['⭐⭐ P1 the per-set pack constants are flattened to one global size',
    '"r70": 0.231', '"r70": 0.334'],

  /* ---- doctrine, in the authored strings ---- */
  enNeedle('neighbourhood', 'Look who got closest of all!', '⭐⭐ T4 ranking vocabulary enters the copy'),
  enNeedle('guessesIn', 'Every guess gets a score.', '⭐ T4b scoring vocabulary enters the copy'),
  enNeedle('secretHint', '', '⭐ T3 a string is emptied in English'),
];

/* the pack-constant mutation lives in the JSON, not the tool */
const JSON_MUTS = new Set(['⭐⭐ P1 the per-set pack constants are flattened to one global size']);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ej-mut-'));
let killed = 0;
const survived = [];
const harness = [];

console.log('mutate-estimation-jar — ' + M.length + ' mutations\n');

for (const [name, from, to] of M) {
  if (ONLY && name.indexOf(ONLY) === -1) continue;

  const isJson = JSON_MUTS.has(name);
  const carrySrc = isJson
    ? fs.readFileSync(path.join(MINI, 'estimation-jar-sets.json'), 'utf8').replace(/\r\n/g, '\n')
    : SRC;

  if (carrySrc.indexOf(from) === -1) {
    harness.push(name + '  — NEEDLE NOT FOUND');
    console.log('  FAULT ' + name + '  (needle not found)');
    continue;
  }
  const mutated = carrySrc.replace(from, to);
  if (mutated === carrySrc) {
    harness.push(name + '  — INERT');
    console.log('  FAULT ' + name + '  (inert: the patch changed nothing)');
    continue;
  }

  /* stage a complete world, then break exactly one thing in it */
  fs.writeFileSync(path.join(tmp, 'estimation-jar.js'), isJson ? SRC : mutated);
  for (const f of CARRY) {
    const body = (isJson && f === 'estimation-jar-sets.json')
      ? mutated
      : fs.readFileSync(path.join(MINI, f), 'utf8');
    fs.writeFileSync(path.join(tmp, f), body);
  }

  let lived = false, why = '';
  try {
    execFileSync(process.execPath, [GATE], {
      env: Object.assign({}, process.env, { EJ_TOOL_DIR: tmp, EJ_DATA_DIR: tmp }),
      timeout: 30000, stdio: 'pipe'
    });
    lived = true;                                   /* exit 0 = the gate did not notice */
  } catch (e) {
    if (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code || e.message))) {
      lived = true; why = ' (the gate HUNG — that is a survival)';
    }
  }

  if (lived) { survived.push(name + why); console.log('  SURVIVED ' + name + why); }
  else { killed++; console.log('  killed   ' + name); }
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}

console.log('\n' + killed + ' killed, ' + survived.length + ' survived, ' + harness.length + ' harness fault(s)');
if (survived.length) { console.log('\nSURVIVORS — the gate is blind to these:'); survived.forEach(s => console.log('  ' + s)); }
if (harness.length) { console.log('\nHARNESS FAULTS:'); harness.forEach(s => console.log('  ' + s)); }
process.exit(survived.length || harness.length ? 1 : 0);
