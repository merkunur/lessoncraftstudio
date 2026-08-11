/* =====================================================================
   poison-missing-question.js — PROVE THE MODEL GATE CAN FAIL
   ---------------------------------------------------------------------
   Run:  node scripts/poison-missing-question.js

   A gate that has never been shown to FAIL is indistinguishable from one
   that CANNOT. This writes a deliberately broken copy of the tool to a
   scratch directory, points `verify-` at it via
   MISSING_QUESTION_TOOL_DIR, and asserts the gate exits non-zero — one
   poison per law, plus a CONTROL run on the untouched file that must
   PASS.

   ⚠ A POISON THAT IS STOPPED UPSTREAM TESTS NOTHING. Each needle below
   is checked against the source FIRST; a needle that does not match is a
   FAULT, not a skip, because a silently-dropped poison shrinks the total
   while the run still says "every poison killed".
   ===================================================================== */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const REAL_DIR = path.join(__dirname, '..', 'mini tools');
const REAL = path.join(REAL_DIR, 'missing-question.js');
const GATE = path.join(__dirname, 'verify-missing-question.js');
/* ⚠ collapse CRLF before searching: `git checkout` normalises line
   endings and multi-line needles go silently blind to it. */
const SRC = fs.readFileSync(REAL, 'utf8').replace(/\r\n/g, '\n');

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'mq-poison-'));

/* every poison: [name, needle, replacement, the law it must trip] */
const POISONS = [
  ['the invariant — a part that does not add up', 'L2',
    'out[other[1]] = s.w - s.p;',
    'out[other[1]] = s.w - s.p + 1;'],

  ['a refused move MUTATES the state it was given', 'L4',
    'if (i === s.ask) return null;                 /* that IS the question */',
    'if (i === s.ask) { s.told[i] = true; return null; }'],

  ['the question slot becomes tellable', 'L4',
    'if (i === s.ask) return null;                 /* that IS the question */',
    'if (i === -99) return null;'],

  ['the answer can be counted before anything is said', 'L4',
    'if (want && !(s.linked && this.toldCount(s) === 2)) return null;',
    'if (want && false) return null;'],

  ['a counted answer survives an arrangement change', 'L4',
    'n.shape = shape;\n      n.counted = false;',
    'n.shape = shape;'],

  /* ⭐⭐ the defect three native panels found by reading the model, and
     that nothing in the suite could see: carrying `told` across an
     arrangement change by POSITION, so the slips keep their places and
     change their numbers in front of the class. */
  ['a told numeral rewrites itself on an arrangement change', 'L4b',
    'n.w = w; n.p = p;\n      return n;\n    },\n\n    /* did an arrangement change',
    'return n;\n    },\n\n    /* did an arrangement change'],

  /* ⭐⭐ the band silently stopping at an arrangement change: the class
     counts the band's wells while the tool announces a bigger total */
  ['an arrangement change escapes the configured band', 'L4b',
    'if (!this.legal(w, p) || w > n.cap) {',
    'if (!this.legal(w, p)) {'],

  ['setShape lands on an illegal frame', 'L4b',
    'if (!this.legal(w, p) || w > n.cap) {\n        n.told = [false, false, false];\n        return n;\n      }',
    'if (false) { n.told = [false, false, false]; }'],

  /* ⚠ RE-AIMED. This used to poison the `told` wipe inside `setTotal`;
     that line is gone, because the move now REFUSES once the telling has
     started rather than destroying and warning. The needle went dead and
     the harness reported it as a FAULT — which is the whole reason a
     missing needle is not a skip. The invariant to poison is now the
     guard itself. */
  ['setTotal is allowed after the telling has started', 'L4b',
    'if (this.toldCount(s) > 0 || s.linked) return null;',
    'if (false) return null;'],

  ['the enumerator comes back', 'L5',
    '    _st: function (st) { return st || this.st; },',
    '    consistent: function () { return [1, 2, 3]; },\n    _st: function (st) { return st || this.st; },'],

  ['a geometry property gets its own clamp — the similarity transform dies', 'L6',
    "'--mqu-hop:calc(var(--mqu-sh) * 0.5);',",
    "'--mqu-hop:clamp(8px,3cqi,40px);',"],

  ['a linkage coordinate is interpolated rather than literal', 'L6',
    "d: 'M50,60 L50,74 L272,74 L272,60 M161,74 L161,90'",
    "d: 'M50,60 L50,' + (74) + ' L272,74 L272,60 M161,74 L161,90'"],

  ['the lattice row count reads the VALUE instead of the band', 'L7',
    "this._card.style.setProperty('--mqu-rows', String(Math.ceil(cap / GEO.LAT_COLS)));",
    "this._card.style.setProperty('--mqu-rows', String(Math.ceil(vals[s.ask] / GEO.LAT_COLS)));"],

  ['the two bands serve the same cap', 'L7',
    "BANDS: { ten: 10, twenty: 20 },",
    "BANDS: { ten: 10, twenty: 10 },"],

  ['the deal starts part-way up the ladder', 'L8',
    'linked: false, told: [false, false, false], counted: false',
    'linked: true, told: [false, false, false], counted: false'],

  ['the tool declares tasks and stops being free-play', 'L0',
    "    id: 'missing-question',",
    "    id: 'missing-question',\n    tasks: [{ id: 'x' }],"],
];

function runGate(dir) {
  try {
    execFileSync(process.execPath, [GATE], {
      env: Object.assign({}, process.env, { MISSING_QUESTION_TOOL_DIR: dir }),
      stdio: 'pipe'
    });
    return 0;
  } catch (e) {
    return e.status || 1;
  }
}

let fails = 0;

/* ---- CONTROL: the untouched tool must PASS ---- */
const ctlDir = path.join(TMP, 'control');
fs.mkdirSync(ctlDir);
fs.writeFileSync(path.join(ctlDir, 'missing-question.js'), SRC);
const ctl = runGate(ctlDir);
if (ctl === 0) {
  console.log('CONTROL   correct tool PASSES the gate                          OK');
} else {
  console.log('CONTROL   correct tool FAILED the gate — the gate is wrong      ✗');
  fails++;
}

/* ---- POISONS ---- */
console.log('');
POISONS.forEach(([name, law, needle, repl], i) => {
  /* ⚠ a needle that does not match is a FAULT, not a skip */
  const hits = SRC.split(needle).length - 1;
  if (hits !== 1) {
    console.log(`POISON ${String(i + 1).padStart(2)} [${law}] ${name}`);
    console.log(`          NEEDLE MATCHED ${hits} TIMES — the poison is dead, not passing   ✗`);
    fails++;
    return;
  }
  const dir = path.join(TMP, 'p' + i);
  fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, 'missing-question.js'), SRC.replace(needle, repl));
  const code = runGate(dir);
  const killed = code !== 0;
  if (!killed) fails++;
  console.log(`POISON ${String(i + 1).padStart(2)} [${law}] ${name}`);
  console.log(`          ${killed ? 'gate FIRES                                             OK'
    : 'GATE IS BLIND TO THIS                                  ✗'}`);
});

fs.rmSync(TMP, { recursive: true, force: true });

console.log('');
if (fails) {
  console.log(`FAIL — ${fails} of ${POISONS.length + 1} checks did not behave`);
  process.exit(1);
}
console.log(`PASS — control passes, and all ${POISONS.length} poisons are killed`);
