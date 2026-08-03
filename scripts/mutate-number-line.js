/* =====================================================================
   mutate-number-line.js — is verify-number-line.js actually a gate?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-number-line.js

   Copies the tool + its data file to a tmp dir, applies one plausible
   defect at a time, and runs `verify-` against the copy. EVERY MUTATION
   MUST BE KILLED.

   ⚠ FOUR HARNESS RULES, each bought by a real defect elsewhere:
     · TIMEOUT. A gate that HANGS is a gate that SURVIVED — an unbounded
       loop met a mutation that stopped a record filling and the harness
       scored it "timed out", which it had counted as survived.
     · CARRY EVERY DATA FILE the gate reads. `verify-` opens
       number-line-lines.json; without it in the tmp dir every mutation
       "dies" for the wrong reason and the run is meaningless.
     · AN INERT NEEDLE IS A HARNESS FAULT, NOT A SKIP. A needle that no
       longer matches silently shrinks the denominator while the run
       still reports "every mutation killed".
     · COLLAPSE CRLF BEFORE SEARCHING. `git checkout` normalises line
       endings through core.autocrlf, and multi-line needles go blind
       without a sound — seven did on #43.
   ===================================================================== */

'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC_DIR = path.join(__dirname, '..', 'mini tools');
const VERIFY = path.join(__dirname, 'verify-number-line.js');
const CARRY = ['number-line.js', 'number-line-lines.json'];
const TIMEOUT = 30000;

/* ⚠ collapse CRLF once, here, so every needle below is written in \n */
const ORIG = fs.readFileSync(path.join(SRC_DIR, 'number-line.js'), 'utf8').replace(/\r\n/g, '\n');
const BOOK = fs.readFileSync(path.join(SRC_DIR, 'number-line-lines.json'), 'utf8').replace(/\r\n/g, '\n');

/* Each mutation: [name, gate it should trip, from, to]  (file defaults to the tool) */
const M = [
  /* --- V2 refuse at the wall --------------------------------------- */
  ['hop clamps instead of refusing', 'V2',
    'if (this.atWall(s)) return null;\n      return { max: s.max, start: s.start, hop: s.hop, n: s.n + 1 };',
    'if (this.atWall(s)) return { max: s.max, start: s.start, hop: s.hop, n: s.n };\n      return { max: s.max, start: s.start, hop: s.hop, n: s.n + 1 };'],
  ['maxHops off by one', 'V2',
    'var k = Math.floor(room / Math.abs(hop));',
    'var k = Math.floor(room / Math.abs(hop)) + 1;'],
  ['maxHops rounds instead of floors', 'V2',
    'var k = Math.floor(room / Math.abs(hop));',
    'var k = Math.round(room / Math.abs(hop));'],

  /* --- V1 equal hops ------------------------------------------------ */
  ['setHop keeps the trail', 'V1',
    'if (h === s.hop && s.n === 0) return null;\n      return { max: s.max, start: s.start, hop: h, n: 0 };',
    'if (h === s.hop && s.n === 0) return null;\n      return { max: s.max, start: s.start, hop: h, n: s.n };'],
  ['setStart keeps the trail', 'V1',
    'if (v === s.start && s.n === 0) return null;\n      return { max: s.max, start: v, hop: s.hop, n: 0 };',
    'if (v === s.start && s.n === 0) return null;\n      return { max: s.max, start: v, hop: s.hop, n: s.n };'],
  ['landings drift by one on the last step', 'V1',
    'for (i = 0; i <= s.n; i++) out.push(s.start + i * s.hop);',
    'for (i = 0; i <= s.n; i++) out.push(s.start + i * s.hop + (i === s.n ? 1 : 0));'],

  /* --- V4 the floor -------------------------------------------------- */
  ['DMIN opens below zero', 'V4', '    DMIN: 0,', '    DMIN: -20,'],
  ['_st stops clamping a negative start', 'V4',
    'if (start < this.DMIN) start = this.DMIN;', 'if (false) start = this.DMIN;'],
  ['_st stops clamping n to the wall', 'V4',
    'if (n > room) n = room;', 'if (false) n = room;'],

  /* --- V3 the arcs ---------------------------------------------------- */
  ['arc sweep never flips for a backward hop', 'V3',
    "var sweep = (to >= from) ? 1 : 0;", 'var sweep = 1;'],
  ['arc dome loses its cap', 'V3',
    'return Math.max(this.ARC_MIN, Math.min(this.ARC_MAX, rx));',
    'return Math.max(this.ARC_MIN, rx);'],
  ['arc dome loses its floor', 'V3',
    'return Math.max(this.ARC_MIN, Math.min(this.ARC_MAX, rx));',
    'return Math.min(this.ARC_MAX, rx);'],
  ['arc ends on the wrong x', 'V3',
    "' 0 0 ' + sweep + ' ' +\n             x2.toFixed(2) + ' ' + this.AXIS_Y;",
    "' 0 0 ' + sweep + ' ' +\n             (x2 + 3).toFixed(2) + ' ' + this.AXIS_Y;"],
  ['arc apex disagrees with the arc', 'V3',
    'y: this.AXIS_Y - this.arcRy(st, from, to)',
    'y: this.AXIS_Y - this.arcRy(st, from, to) * 0.5'],
  ['xOf loses the inset', 'V3',
    'return this.INSET + (v / span) * (this.W - 2 * this.INSET);',
    'return (v / span) * this.W;'],

  /* --- V6 the range chip ---------------------------------------------- */
  ['range change throws the value away', 'V6',
    'var start = s.start > m ? m : s.start;', 'var start = 0;'],

  /* --- V7 the ruling ---------------------------------------------------- */
  ['a numeral stop drops the far end', 'V7',
    'if (out.indexOf(s.max) < 0) out.push(s.max);', 'if (false) out.push(s.max);'],
  ['major ticks drift from the numerals', 'V7',
    'majorStep: function (max) { return this.labelStep(max, 0); },',
    'majorStep: function (max) { return 5; },'],
  ['the tick ruling moves with the numerals', 'V7',
    'tickStep: function (max) { return max >= 1000 ? 50 : max >= 100 ? 5 : 1; },',
    'tickStep: function (max) { return (this._numStop ? 2 : 1) * (max >= 1000 ? 50 : max >= 100 ? 5 : 1); },'],

  /* --- V9 dead strings -------------------------------------------------- */
  ['hintWall becomes unreachable', 'V9',
    "return this.fitsExactly(s) ? 'hintExact' : 'hintWall';",
    "return 'hintExact';"],
  ['hintExact becomes unreachable', 'V9',
    "return this.fitsExactly(s) ? 'hintExact' : 'hintWall';",
    "return 'hintWall';"],
  ['a grip loses its aria key', 'V9',
    "this._gStart = this._grip(this._railStart, 'nl-g-start', 'startAria');",
    "this._gStart = this._grip(this._railStart, 'nl-g-start', 'rangeAria');"],

  /* --- V11 the free tier ------------------------------------------------- */
  ['the offline fallback drifts from the book', 'V11',
    "{ id: 'threes-gap',       max: 20,  s: 0,  h: 3 },",
    "{ id: 'threes-gap',       max: 20,  s: 0,  h: 4 },"],
  ['a free visitor is served the paid records', 'V11',
    'if (i < this.FREE_LINES || this.premium) out.push(all[i]);',
    'out.push(all[i]);'],
  ['unknown entitlement becomes optimistic', 'V11',
    'if (!self.premium) { self._showGate(); return; }',
    'if (!self.premium && self.premiumKnown) { self._showGate(); return; }'],

  /* --- V12 the repertoire ------------------------------------------------- */
  ['a repertoire record becomes vacuous', 'V12',
    '{ "id": "fives-fit",         "max": 20,   "s": 0,    "h": 5 },',
    '{ "id": "fives-fit",         "max": 20,   "s": 0,    "h": 15 },',
    'number-line-lines.json'],
  ['the free set loses its backward hop', 'V12',
    '{ "id": "back-from-twenty",  "max": 20,   "s": 20,   "h": -5 },',
    '{ "id": "back-from-twenty",  "max": 20,   "s": 20,   "h": 5 },',
    'number-line-lines.json'],

  /* --- V13 exfil ------------------------------------------------------------ */
  ['the tool phones somewhere else', 'V13',
    "fetch('/mini-tools/number-line-lines.json'", "fetch('https://example.com/collect'"],

  /* --- V8 content ------------------------------------------------------------ */
  /* ⚠ self-anchored on the GENERATED block. A needle that encodes the
     hand-written form has a half-life of exactly one `apply-` run. */
  ['a verdict word appears in a string', 'V8',
    'en: "The hops came out exactly even. Nothing is left over."',
    'en: "Correct! Well done."'],
  ['a locale loses its typographic apostrophe', 'V8',
    'fr: "Les bonds tombent juste : il ne reste rien."',
    'fr: "Les bonds tombent juste, il n\'en reste rien."'],
  /* ⚠⚠ THE MARE. `en hoppe` is a mare, so `hoppene` reads as "the mares"
     in bokmål — and I walked into this myself when I added the
     trail-wipe clause after the panel had engineered it out. */
  ['no: the arcs become the mares', 'V8',
    'no: "Hvor kaninen starter. Dra grepet langs sin skinne, eller bruk piltastene. Når du flytter det, forsvinner buene som allerede er tegnet."',
    'no: "Hvor kaninen starter. Dra grepet langs sin skinne, eller bruk piltastene. Når du flytter det, forsvinner hoppene som allerede er tegnet."'],

  /* --- V14 purity ------------------------------------------------------------- */
  ['the model becomes non-deterministic', 'V14',
    'var k = Math.floor(room / Math.abs(hop));',
    'var k = Math.floor(room / Math.abs(hop)) - (Math.random() < 0.5 ? 1 : 0);'],
  /* ⚠ THE FIRST VERSION OF THIS MUTATION WAS INERT AND I ALMOST "FIXED"
     THE GATE FOR IT. Swapping the guard for `if (!st)` still yields a
     legal state for every junk input, because `(5).max` is `undefined`
     and `_int` defaults it — weaker code, but not a defect, so verify
     was right to pass it. Removing the guard entirely is the real one:
     `null.max` throws. A survivor is only a gate failure once you have
     checked the mutation actually breaks something. */
  ['_st loses its null guard', 'V14',
    "if (st === null || typeof st !== 'object') return this.newState();",
    'if (st === undefined) return this.newState();'],
  ['hintKey loses the no-room branch', 'V9',
    "if (this.maxHops(s) === 0) return 'hintNoRoom';",
    'if (false) return 0;'],
  ['a backward record stops leaving a gap', 'V9',
    '{ "id": "back-from-hundred", "max": 100,  "s": 100,  "h": -30 },',
    '{ "id": "back-from-hundred", "max": 100,  "s": 100,  "h": -20 },',
    'number-line-lines.json'],
  ['a reducer mutates its input', 'V14',
    'if (this.atWall(s)) return null;\n      return { max: s.max, start: s.start, hop: s.hop, n: s.n + 1 };',
    'if (this.atWall(s)) return null;\n      st.n = s.n + 1;\n      return { max: s.max, start: s.start, hop: s.hop, n: s.n + 1 };'],

  /* --- V5 derived state --------------------------------------------------------- */
  ['the state grows a fifth field', 'V5',
    'return { max: max, start: start, hop: hop, n: n };',
    'return { max: max, start: start, hop: hop, n: n, cache: null };']
];

let killed = 0, survived = 0, faults = 0;
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'nlmut-'));

console.log('mutating ' + M.length + ' defects into ' + CARRY.length + ' carried files\n');

M.forEach(([name, gate, from, to, file]) => {
  const target = file || 'number-line.js';
  const base = target === 'number-line.js' ? ORIG : BOOK;

  /* ⚠ AN INERT NEEDLE IS A FAULT. It must be counted and reported, never
     skipped — a dropped needle shrinks the total while the run still
     says "every mutation killed". */
  const hits = base.split(from).length - 1;
  if (hits === 0) { faults++; console.error('  HARNESS FAULT  needle not found: ' + name); return; }
  if (hits > 1) { faults++; console.error('  HARNESS FAULT  needle matches ' + hits + 'x (ambiguous): ' + name); return; }

  const dir = fs.mkdtempSync(path.join(tmpRoot, 'm-'));
  for (const f of CARRY) {
    const body = (f === target)
      ? base.replace(from, to)
      : (f === 'number-line.js' ? ORIG : BOOK);
    fs.writeFileSync(path.join(dir, f), body);
  }
  if (fs.readFileSync(path.join(dir, target), 'utf8') === base) {
    faults++; console.error('  HARNESS FAULT  mutation was inert: ' + name); return;
  }

  let died = false, why = '';
  try {
    /* ⚠⚠ ALL ELEVEN LOCALES, NOT `--locales=en`. The first version passed
       `--locales=en` for speed, which made every locale mutation
       STRUCTURALLY INVISIBLE: the Norwegian mare and a French straight
       apostrophe both "survived" a gate that was never shown them. A
       harness that narrows the gate's scope below the mutation's scope
       is not testing the gate — it is testing a slice of it, and
       reporting the whole. */
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { NL_TOOL_DIR: dir }),
      timeout: TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    /* ⚠ a TIMEOUT is NOT a kill — the gate failed to answer. */
    if (e.killed || /ETIMEDOUT/.test(String(e.code))) { why = 'TIMED OUT'; }
    else died = true;
  }
  if (died) { killed++; console.log('  killed   ' + gate + '  ' + name); }
  else { survived++; console.error('  SURVIVED ' + gate + '  ' + name + (why ? '  (' + why + ')' : '')); }
});

try { fs.rmSync(tmpRoot, { recursive: true, force: true }); } catch (_) { }

console.log('\n' + killed + '/' + (killed + survived) + ' killed, ' + faults + ' harness faults');
process.exit((survived || faults) ? 1 : 0);
