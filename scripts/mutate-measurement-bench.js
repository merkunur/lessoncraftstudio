#!/usr/bin/env node
/* =====================================================================
   mutate-measurement-bench.js — does verify-measurement-bench actually
   CATCH anything, or does it merely agree with the file it reads?

   Run:  node scripts/mutate-measurement-bench.js
         node scripts/mutate-measurement-bench.js --only=pour

   ⭐ WHY. Every law in the gate passed on the shipped tool — and the shipped
   tool poured the wrong way, held a different amount of water per cup in
   every vessel, and drew an 8px gap between cubes in a chain it had just
   declared perfect. A gate that has never been observed to FAIL is
   indistinguishable from one that CANNOT. Each mutation below breaks exactly
   one thing the gate claims to protect; every one must be killed.

   ⚠ HARNESS RULES, each bought by a recorded defect elsewhere in this
   programme:
     · Needles SELF-ANCHOR on the live file. A needle that carries a copy of
       the text it mutates has a half-life — the moment the source is
       reformatted it silently stops matching, and a run that finds nothing to
       mutate still prints "every mutation killed".
     · A MISSING NEEDLE THROWS. It does not skip. Skipping shrinks the
       denominator while the summary line stays cheerful.
     · \r\n is collapsed before searching, because `git checkout` normalises
       line endings through core.autocrlf and multi-line needles go blind.
     · A CONTROL runs first: the UNMUTATED file must PASS. Without it, a gate
       that fails on everything looks exactly like a gate that works.
     · No loop here depends on the tool terminating; the child process is
       hard-bounded by `timeout`.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..');
const TOOL = path.join(REPO, 'mini tools', 'measurement-bench.js');
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || null;

const original = fs.readFileSync(TOOL, 'utf8');
/* ⚠ collapse CRLF before any needle search — see the harness note above */
const norm = (s) => s.replace(/\r\n/g, '\n');

/* Each mutation: [group, name, find, replace].
   `find` must appear EXACTLY ONCE in the normalised source. */
const MUTATIONS = [
  /* ---- the operator-reported defect: the pour direction ---- */
  ['pour', 'pour tips AWAY from the target (the shipped defect, restored)',
    "var sgn = (T.x + T.w / 2) > (S.x + S.w / 2) ? 1 : -1;",
    "var sgn = (T.x + T.w / 2) > (S.x + S.w / 2) ? -1 : 1;"],
  ['pour', 'pour direction hardcoded instead of derived',
    "return { sgn: sgn, deg: sgn * 16 };",
    "return { sgn: sgn, deg: 16 };"],
  ['pour', 'tilt too shallow to read across a room',
    "deg: sgn * 16 };",
    "deg: sgn * 4 };"],

  /* ---- the vessel model: a cup must be one fixed amount ---- */
  ['vessel', 'a cup occupies a different area in the jug',
    "JUG: { w: 150, h: 228, cap: 18 },",
    "JUG: { w: 150, h: 228, cap: 14 },"],
  ['vessel', 'a cup occupies a different area in one beaker',
    "{ tall: { w: 60, h: 190, cap: 6 }, wide: { w: 152, h: 75, cap: 6 } },",
    "{ tall: { w: 60, h: 190, cap: 8 }, wide: { w: 152, h: 75, cap: 6 } },"],
  ['vessel', 'the "tall" vessel is not the taller one',
    "{ tall: { w: 70, h: 190, cap: 7 }, wide: { w: 100, h: 76, cap: 4 } },",
    "{ tall: { w: 70, h: 60, cap: 7 }, wide: { w: 100, h: 76, cap: 4 } },"],
  ['vessel', 'no pair holds the SAME amount (conservation unreachable)',
    "{ tall: { w: 76, h: 200, cap: 8 }, wide: { w: 152, h: 100, cap: 8 } },",
    "{ tall: { w: 76, h: 200, cap: 8 }, wide: { w: 190, h: 100, cap: 10 } },"],
  /* ⚠ THIS POISON WAS MIS-SORTED ON ITS FIRST RUN and it SURVIVED — not
     because the gate was blind, but because I changed ONE of the two
     inversions and the law (>=1) was still satisfied. A poison that does not
     actually create the violation it names proves nothing, and the tempting
     response — raising the threshold to 2 so my bad poison would fire — would
     have been tuning the law to its own counter-example. It replaces the whole
     table instead, so no inversion remains anywhere. */
  ['vessel', 'no pair where the taller holds FEWER (the heuristic survives)',
    "  CAP_PAIRS: [",
    "  CAP_PAIRS: [{ tall: { w: 70, h: 190, cap: 7 }, wide: { w: 100, h: 76, cap: 4 } },{ tall: { w: 60, h: 190, cap: 6 }, wide: { w: 100, h: 57, cap: 3 } },{ tall: { w: 76, h: 200, cap: 8 }, wide: { w: 152, h: 75, cap: 6 } },{ tall: { w: 50, h: 190, cap: 5 }, wide: { w: 152, h: 38, cap: 3 } }],\n  _DEAD: ["],

  /* ---- the length lattice: the art must fill the pitch ---- */
  ['length', 'a unit width no longer divides every object',
    "UNITS: { clip: { w: 45, h: 20, sKey: 'unitClipS', pKey: 'unitClipP' }, cube: { w: 30, h: 26, sKey: 'unitCubeS', pKey: 'unitCubeP' } },",
    "UNITS: { clip: { w: 45, h: 20, sKey: 'unitClipS', pKey: 'unitClipP' }, cube: { w: 28, h: 26, sKey: 'unitCubeS', pKey: 'unitCubeP' } },"],
  ['length', 'the scooched chain is no longer abutted from x0',
    "closed: sorted.map(function (_, i) { return x0 + i * unitW; })",
    "closed: sorted.map(function (_, i) { return x0 + i * (unitW + 2); })"],
  ['length', 'a gap is classified as a clean chain',
    "if (sorted[i] > sorted[i - 1] + unitW) { status = status === 'ok' ? 'gap' : status; }",
    "if (false) { status = status === 'ok' ? 'gap' : status; }"],
  ['length', 'a misaligned start is no longer noticed',
    "if (sorted.length && sorted[0] !== x0) status = 'misaligned-start';",
    "if (false) status = 'misaligned-start';"],

  /* ---- the balance ---- */
  ['balance', 'the beam tilts the wrong way',
    "return this.BAL.maxAngle * Math.tanh((cubes - weight) / this.BAL.k);",
    "return this.BAL.maxAngle * Math.tanh((weight - cubes) / this.BAL.k);"],
  ['balance', 'a weight is heavier than the cube supply can ever reach',
    "cow: 16, horse: 16",
    "cow: 16, horse: 26"],
  ['balance', 'the cube supply cap drops below the heaviest object',
    "if (self.cubes >= 18) return;",
    "if (self.cubes >= 11) return;"],
  ['balance', 'the yoke collapses back to a single point',
    "'<line class=\"pan-str a\" x1=\"' + (-this.BAL_ROPE_HALF) + '\" y1=\"0\"",
    "'<line class=\"pan-str a\" x1=\"' + (0) + '\" y1=\"0\""],
  ['balance', 'a mouse outweighs a bear',
    "strawberry: 3, mouse: 3,",
    "strawberry: 3, mouse: 16,"],

  /* ---- the no-shame contract ---- */
  ['voice', 'a verdict word reaches a child',
    "fullLine:     {en:'It’s full to the top!'",
    "fullLine:     {en:'Wrong, it’s full to the top!'"],
  ['voice', 'the comparison addresses the child in the second person',
    "compareLine: {en:\"Guessed: {g} · Measured: {n}\"",
    "compareLine: {en:\"You guessed {g} · It measured {n}\""],
  ['voice', 'a placeholder is dropped from a locale',
    "measuredOnly: {en:\"Measured: {n}\"",
    "measuredOnly: {en:\"Measured:\""],
];

const fail = [];
const pass = [];

function runVerify() {
  try {
    execFileSync(process.execPath, [path.join(REPO, 'scripts', 'verify-measurement-bench.js'), '--locales=en'],
      { cwd: REPO, stdio: 'pipe', timeout: 30000 });
    return null;                     /* PASSED = the mutation survived */
  } catch (e) {
    return String(e.stdout || '') + String(e.stderr || '');
  }
}

/* ── the CONTROL: the untouched file must pass, or nothing below means
      anything (a gate that fails on everything looks identical to one that
      works, and this is the check that tells them apart) ── */
fs.writeFileSync(TOOL, original);
if (runVerify() !== null) {
  fs.writeFileSync(TOOL, original);
  console.error('FATAL: the CONTROL failed — verify does not pass on the unmutated file, so no mutation result is interpretable.');
  process.exit(1);
}
console.log('  ok    CONTROL — the unmutated tool passes\n');

const src = norm(original);
let ran = 0;
try {
  for (const [group, name, find, repl] of MUTATIONS) {
    if (only && group !== only) continue;
    const n = src.split(find).length - 1;
    /* ⚠ THROW, do not skip. A silently-dropped needle shrinks the denominator
       while the summary still says "every mutation killed". */
    if (n !== 1) {
      throw new Error(`needle for "${name}" matched ${n} times (need exactly 1). ` +
        `The source moved under it — re-anchor the needle, do not delete it.`);
    }
    ran++;
    fs.writeFileSync(TOOL, src.replace(find, repl));
    const out = runVerify();
    if (out === null) { fail.push(name); console.log('  FAIL  SURVIVED: ' + name); }
    else { pass.push(name); console.log('  ok    killed: ' + name); }
  }
} finally {
  fs.writeFileSync(TOOL, original);
}

console.log('\n' + pass.length + '/' + ran + ' mutations killed' + (fail.length ? ', ' + fail.length + ' SURVIVED' : ''));
if (fail.length) {
  console.log('\nEach survivor is a law verify-measurement-bench.js claims to enforce and does not:');
  fail.forEach((f) => console.log('  · ' + f));
  process.exit(1);
}
console.log('mutate-measurement-bench: every mutation killed');
