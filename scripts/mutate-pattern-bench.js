#!/usr/bin/env node
/* =====================================================================
   mutate-pattern-bench.js — does verify-pattern-bench.js actually CATCH
   anything, or does it merely agree with the file it is reading?

   ⚠ HARNESS RULES, each bought by a recorded defect elsewhere:
     · A CONTROL RUNS FIRST: the unmutated file must PASS. Otherwise every
       mutation "dies" for a reason that has nothing to do with it.
     · Needles SELF-ANCHOR on the live file where they can — apply-locales
       rewrites the whole strings block, and a needle carrying a literal
       has a half-life.
     · A MISSING NEEDLE THROWS. It does not skip: skipping shrinks the
       denominator while the summary line stays cheerful.
     · A NON-UNIQUE NEEDLE IS A FAULT, not a coin toss.
     · An INERT mutation (from === to) is a bad mutation, not a gate hole.
     · \r\n is collapsed before searching (core.autocrlf normalises on
       checkout and multi-line anchors go silently blind).
     · A TIMEOUT IS SURVIVED, NOT KILLED. A gate that hangs did not run.

   Usage: node scripts/mutate-pattern-bench.js [--only=<group>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'pattern-bench.js'), 'utf8').replace(/\r\n/g, '\n');
const TIMEOUT = 30000;
const ONLY = (process.argv.find((a) => a.indexOf('--only=') === 0) || '').split('=')[1] || null;

const M = [];
const add = (group, name, from, to) => M.push({ group, name, from, to });

/* self-anchoring helper for the strings block */
function enNeedle(key, replacement, group, name) {
  const re = new RegExp(key + ':(\\s*)\\{ en: "((?:[^"\\\\]|\\\\.)*)"');
  const m = re.exec(SRC);
  if (!m) throw new Error('enNeedle: no en value for "' + key + '"');
  const to = key + ':' + m[1] + '{ en: "' + replacement + '"';
  if (to === m[0]) throw new Error('enNeedle: "' + key + '" already reads that — INERT');
  add(group, name, m[0], to);
}

/* ---- P1 the pattern ---- */
add('pattern', 'strip stops repeating the unit',
  'return st.unit[this._mod(i - (st.phase || 0), st.unit.length)];',
  'return st.unit[Math.min(i, st.unit.length - 1)];');
add('pattern', 'strip off by one',
  'return st.unit[this._mod(i - (st.phase || 0), st.unit.length)];',
  'return st.unit[this._mod(i + 1 - (st.phase || 0), st.unit.length)];');
add('pattern', 'phase is ignored',
  'return st.unit[this._mod(i - (st.phase || 0), st.unit.length)];',
  'return st.unit[this._mod(i, st.unit.length)];');
add('pattern', 'out-of-range cell is not null',
  'if (!(i >= 0) || i >= st.len) return null;\n    return st.unit',
  'if (!(i >= 0)) return null;\n    return st.unit');
add('pattern', 'empty unit crashes',
  'if (!st || !st.unit || !st.unit.length) return null;',
  'if (!st) return null;');

/* ---- P2 costume blindness, the thesis ---- */
add('costume', 'a costume reaches the pattern',
  'if (this.MEDIA.indexOf(m) === -1) return next;\n    next.medium = m;',
  "if (this.MEDIA.indexOf(m) === -1) return next;\n    if (m === 'shape') next.unit = next.unit.slice().reverse();\n    next.medium = m;");
add('costume', 'two slots share a colour', "b: { fill: '#3F86D0', name: 'sky' }", "b: { fill: '#B33A2B', name: 'sky' }");
add('costume', 'two slots share a shape',
  "b: 'M10.1 7.5h19.8a2.6 2.6 0 0 1 2.6 2.6v19.8a2.6 2.6 0 0 1-2.6 2.6H10.1a2.6 2.6 0 0 1-2.6-2.6V10.1a2.6 2.6 0 0 1 2.6-2.6z',",
  "b: 'M20 5.9a14.1 14.1 0 1 1 0 28.2 14.1 14.1 0 0 1 0-28.2z',");
add('costume', 'two slots share a tone', 'b: 523', 'b: 392');

/* ---- P3 the slide, invention #2 ---- */
add('slide', 'the slide does not rotate the unit — the strip moves',
  'for (i = 0; i < k; i++) rot.push(u[this._mod(i + step, k)]);',
  'for (i = 0; i < k; i++) rot.push(u[i]);');
add('slide', 'the slide rotates the WRONG way',
  'for (i = 0; i < k; i++) rot.push(u[this._mod(i + step, k)]);',
  'for (i = 0; i < k; i++) rot.push(u[this._mod(i - step, k)]);');
add('slide', 'the slide never moves (vacuous invariant)',
  'if (want < 0 || want > next.len - k) return next;',
  'if (true) return next;');
add('slide', 'the slide wraps past the end',
  'if (want < 0 || want > next.len - k) return next;',
  'if (want < 0) return next;');
add('slide', 'the slide mutates its input',
  'slideBracket: function (st, d) {\n    var next = this._clone(st);',
  'slideBracket: function (st, d) {\n    var next = st;');

/* ---- P4 the congruence class, the operator's directive ---- */
add('class', 'an edit changes only the bead tapped',
  'cycleSlotAt: function (st, i) {\n    var si = this.slotIndexAt(st, i);',
  'cycleSlotAt: function (st, i) {\n    var si = 0; void i;');
add('class', 'classOf returns the wrong family',
  'for (j = 0; j < st.len; j++) if (this._mod(j - (st.phase || 0), k) === want) out.push(j);',
  'for (j = 0; j < st.len; j++) if (j === i) out.push(j);');
add('class', 'the cycle is a toggle (scores DEAD on the liveness gate)',
  'return this.setUnitSlot(st, si, this.SLOTS[this._mod(at + 1, this.SLOTS.length)]);',
  'return this.setUnitSlot(st, si, this.SLOTS[this._mod(at + 1, 2)]);');
add('class', 'an edit is a no-op',
  'return this.setUnitSlot(st, si, this.SLOTS[this._mod(at + 1, this.SLOTS.length)]);',
  'return this.setUnitSlot(st, si, this.SLOTS[at]);');

/* ---- P5/P6 the cover ---- */
add('cover', 'covered cell still draws its bead',
  "cell.classList.add('ptn-covered');",
  "cell.classList.add('ptn-covered'); cell.appendChild(this._bead(slot));");
add('cover', 'covered cell leaks its slot in aria',
  "cell.setAttribute('aria-label', api.t('coverBtn'));",
  "cell.setAttribute('aria-label', 'slot ' + slot);");
add('cover', 'only the last bead is coverable',
  'toggleCover: function (st, i) {\n    var next = this._clone(st);\n    if (!(i >= 0) || i >= next.len) return next;',
  'toggleCover: function (st, i) {\n    var next = this._clone(st);\n    if (i !== next.len - 1) return next;');
add('cover', 'cover is not a toggle',
  'if (at > -1) next.covered.splice(at, 1); else next.covered.push(i);',
  'next.covered.push(i);');

/* ---- P7 the model ---- */
add('model', 'setUnitSlot mutates its input',
  'setUnitSlot: function (st, i, slot) {\n    var next = this._clone(st);',
  'setUnitSlot: function (st, i, slot) {\n    var next = st;');
add('model', 'unknown medium accepted', "if (this.MEDIA.indexOf(m) === -1) return next;", 'if (false) return next;');
add('model', 'unknown slot accepted', 'if (this.SLOTS.indexOf(slot) === -1) return next;', 'if (false) return next;');
add('model', 'a state field appears',
  "return { unit: ['a', 'b'], phase: 0, len: 7, covered: [], medium: 'colour',\n      unitHidden: false, armed: false };",
  "return { unit: ['a', 'b'], phase: 0, len: 7, covered: [], medium: 'colour',\n      unitHidden: false, armed: false, score: 0 };");
/* ⚠ THESE TWO ANCHOR ON setUnitLength, NOT normLen. The first version
   pointed at normLen's identical clamp — a different function whose value
   never reaches unit.length — so it introduced no defect at all and
   "survived" as a phantom gate hole. A mutation that does not create the
   thing it is named after tests nothing. */
add('model', 'unit length upper unclamped',
  'if (v > this.UNIT_MAX) v = this.UNIT_MAX;\n    next.unit = next.unit.slice(0, Math.max(0, v));',
  'if (v > 99) v = 99;\n    next.unit = next.unit.slice(0, Math.max(0, v));');
add('model', 'unit length lower unclamped',
  'if (!(v >= this.UNIT_MIN)) v = this.UNIT_MIN;\n    if (v > this.UNIT_MAX) v = this.UNIT_MAX;\n    next.unit',
  'if (false) v = this.UNIT_MIN;\n    if (v > this.UNIT_MAX) v = this.UNIT_MAX;\n    next.unit');

/* ---- P8 the mid-unit invariant ---- */
add('midunit', 'the strip ends on a unit boundary',
  'return r * v + 1;', 'return r * v;');
add('midunit', 'fewer than three repeats',
  'if (!(r >= this.REPS_MIN)) r = this.REPS_MIN;', 'if (!(r >= 1)) r = 1;');
add('midunit', 'a k-change does not re-normalise the length',
  'next.len = this.normLen(v, next.len);',
  'next.len = next.len;');
add('midunit', 'shortening leaves an orphan cover',
  'next.covered = next.covered.filter(function (i) { return i < v; });',
  'next.covered = next.covered.slice();');

/* ---- P9 stance ---- */
add('stance', 'clap leaks a covered bead through sound',
  'if (self.isCovered(self.st, i)) return;', 'if (false) return;');
add('stance', 'clap LIGHTS a covered bead',
  "if (self.isCovered(self.st, i)) return;\n        if (cell) { cell.classList.add('ptn-lit');",
  "if (cell) { cell.classList.add('ptn-lit');\n        if (self.isCovered(self.st, i)) return;");
add('stance', 'reduced motion deletes the clap signal',
  "+   '.ptn-cell .ptn-glyph,.ptn-slot .ptn-glyph,.ptn-chip{transition:none !important;}'",
  "+   '.ptn-cell.ptn-lit{box-shadow:none;}'");
add('stance', 'a verdict class appears', "'ptn-cell'", "'ptn-cell ptn-correct'");
enNeedle('coverNote', 'Wrong, try again', 'stance', 'verdict wording in a string');

/* ---- P11 the fence ---- */
add('fence', 'a growing-pattern surface appears',
  'setArmed: function (st, on) {',
  'growingPattern: function (n) { return n + 1; },\n  setArmed: function (st, on) {');
add('fence', 'the REFUSES list stops naming growing patterns',
  'NO GROWING PATTERNS, EVER:', 'growth is fine actually:');
add('fence', 'references a pattern-BLOCK surface',
  '  TONE: { a: 392,', "  PATTERN_BLOCKS: 'shapeforge',\n  TONE: { a: 392,");

/* ---- P12 identity + exfil ---- */
add('identity', 'id drifts', "id: 'pattern-bench',", "id: 'pattern-bench-v2',");
add('identity', 'store key drifts', "STORE_KEY: 'lcs:pattern-bench:v1'", "STORE_KEY: 'lcs:ptn:v1'");
add('identity', 'premium defaults true', '  premium: false,', '  premium: true,');
add('identity', 'tasks declared (activity chrome)', '  premium: false,', '  premium: false,\n  tasks: [{ id: "x" }],');
add('identity', 'exfiltration path', 'injectPatternBenchCSS();\n    document.body',
  "navigator.sendBeacon('/track', '1');\n    injectPatternBenchCSS();\n    document.body");
add('identity', 'unexpected fetch target', "fetch('/api/auth/me'", "fetch('/api/telemetry'");
add('identity', 'the premium costume is not demoted',
  "if (this.premiumKnown && !this.premium && this.st && this.st.medium === 'picture') {",
  'if (false) {');
add('identity', 'the picture lock consults premiumKnown (optimistic unknown)',
  "var locked = (m === 'picture' && !self.premium);",
  "var locked = (m === 'picture' && !self.premium && self.premiumKnown);");

/* ---- P13/P14 the art, MEASURED ---- */
add('art', 'the slot inks collapse under colour blindness',
  "d: { fill: '#5B3184', name: 'grape' }", "d: { fill: '#3F86D0', name: 'grape' }");
add('art', 'the value ladder collapses',
  "a: { fill: '#B33A2B', name: 'brick' }", "a: { fill: '#3D84CE', name: 'brick' }");
add('art', 'the ring ink puns on a slot', "RING: '#2A2A35'", "RING: '#146B5E'");
add('art', 'a bead is filled the paywall colour',
  "c: { fill: '#EFBB3C', name: 'honey' }", "c: { fill: '#F2784B', name: 'honey' }");
add('art', 'the triangle goes back to being optically light',
  "c: 'M20 4 38.4 36H1.6z'", "c: 'M20 8 32 32H8z'");
add('art', 'a glyph overflows its viewBox',
  "c: 'M20 4 38.4 36H1.6z'", "c: 'M20 1 44 39H-4z'");

/* ---- P15 print ---- */
add('print', 'the sheet stays in the DOM when unentitled',
  "if (!this.premium) return;\n\n    var api = this.api, self = this;\n    var sheet = api.el('div', 'ptn-printsheet');",
  "\n\n    var api = this.api, self = this;\n    var sheet = api.el('div', 'ptn-printsheet');");
add('print', 'a print rule is unscoped',
  "+   'body.ptn-paid .ptn-printsheet{display:block !important;",
  "+   '.ptn-printsheet{display:block !important;");
add('print', 'the shell chrome prints on the sheet',
  "+   '.lcs-header,.lcs-controls,.lcs-instruction{display:none !important;}'",
  "+   '.lcs-nothing{display:none !important;}'");
add('print', 'the print block is gone', '@media print{', '@media screen and (min-width:99999px){');

/* ---- P16 layout ---- */
add('layout', 'the scroll escape is re-keyed on width (the four-pixel miss)',
  "+ 'html,body.ptn-wide{overflow-y:auto;height:auto;min-height:100%;}'",
  "+ '@media (max-width:700px){html,body.ptn-wide{overflow-y:auto;height:auto;min-height:100%;}}'");
add('layout', 'the escape is removed entirely — the iframe pins at 422px',
  "+ 'html,body.ptn-wide{overflow-y:auto;height:auto;min-height:100%;}'",
  "+ 'html,body.ptn-wide{overflow-x:hidden;}'");
add('layout', 'a wide tier is gated on min-height (dead in the iframe)',
  "+ '@media (min-width:1280px){body.ptn-wide{--ptn-cap:1180px;}}'",
  "+ '@media (min-width:1280px) and (min-height:880px){body.ptn-wide{--ptn-cap:1180px;}}'");
/* ⚠ ANCHORED ON THE MAIN GRID RULE, NOT THE BARE minmax(). The floor
   appears twice — once in .ptn-grid and once in the @supports-not-subgrid
   fallback — so the bare token is a NON-UNIQUE needle, which this harness
   treats as a fault rather than a coin toss. */
add('layout', 'tap floor below 44px',
  "'grid-template-columns:repeat(var(--ptn-n,7),minmax(44px,var(--ptn-bead)));column-gap:5px;row-gap:6px;}'",
  "'grid-template-columns:repeat(var(--ptn-n,7),minmax(30px,var(--ptn-bead)));column-gap:5px;row-gap:6px;}'");
add('layout', 'the bead is unbound from the socket',
  "+   '--ptn-bead:calc(var(--ptn-u) * .5);'", "+   '--ptn-bead:1fr;'");
add('layout', 'the strip and letters stop sharing a template',
  "+ '.ptn-strip,.ptn-letters{display:grid;grid-column:1 / -1;'",
  "+ '.ptn-strip{display:grid;grid-column:1 / -1;'");
add('layout', 'the column count no longer follows the strip',
  "rail.style.setProperty('--ptn-n', String(this.st.len));",
  "rail.style.setProperty('--ptn-x', String(this.st.len));");
add('layout', 'css injector not idempotent',
  "if (document.getElementById('ptn-style')) return;", 'if (false) return;');
add('layout', 'restyles a shell internal',
  "+ '.ptn-wrap{container-type:inline-size;'", "+ '.lcs-stage{padding:0;}.ptn-wrap{container-type:inline-size;'");
add('layout', 'the wide scope is renamed',
  "document.body.classList.add('ptn-wide');", "document.body.classList.add('ptn-nope');");

/* ---- P17 strings ---- */
add('l10n', 'a used string has no entry', '    coverBtn:       {', '    coverBtnX:      {');
add('l10n', 'a string loses a locale', '    hideUnit:       { en: "Hide it", de: "Verstecken",', '    hideUnit:       { en: "Hide it",');
add('l10n', 'a dead string is introduced',
  '    printKey:       {', '    unusedKey:      { en: "x", de: "x", fr: "x", es: "x", pt: "x", it: "x", nl: "x", sv: "x", da: "x", no: "x", fi: "x" },\n    printKey:       {');

/* ================= the runner ================= */
const targets = ONLY ? M.filter((m) => m.group === ONLY) : M;
if (ONLY && !targets.length) {
  console.error('  no mutations in group "' + ONLY + '" — refusing to report success on a run that tests nothing');
  process.exit(1);
}
console.log('mutate-pattern-bench — ' + targets.length + ' mutations\n');

/* ---- THE CONTROL ---- */
try {
  execFileSync(process.execPath, [path.join(__dirname, 'verify-pattern-bench.js')], {
    env: Object.assign({}, process.env, { PTN_QUIET: '1' }), timeout: TIMEOUT, stdio: 'pipe' });
  console.log('  ok    CONTROL — the unmutated tool PASSES\n');
} catch (e) {
  console.error('FATAL: the CONTROL failed. Every "kill" below would be meaningless.');
  console.error((e.stdout || e.stderr || '').toString().slice(-1200));
  process.exit(1);
}

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ptnmut-'));
let killed = 0;
const survived = [], faults = [];

for (const mut of targets) {
  const idx = SRC.indexOf(mut.from);
  if (idx < 0) { faults.push(mut.name + ' — NEEDLE NOT FOUND'); continue; }
  if (SRC.indexOf(mut.from, idx + 1) >= 0) { faults.push(mut.name + ' — NEEDLE IS NOT UNIQUE'); continue; }
  if (mut.from === mut.to) { faults.push(mut.name + ' — INERT'); continue; }

  const dir = fs.mkdtempSync(path.join(tmpRoot, 'm-'));
  fs.writeFileSync(path.join(dir, 'pattern-bench.js'), SRC.replace(mut.from, mut.to), 'utf8');

  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-pattern-bench.js')], {
      env: Object.assign({}, process.env, { PTN_TOOL_DIR: dir, PTN_QUIET: '1' }),
      timeout: TIMEOUT, stdio: 'pipe' });
  } catch (e) {
    /* ⚠ a TIMEOUT is SURVIVED, not killed — a gate that hangs did not run */
    if (e.killed || e.signal === 'SIGTERM' || e.code === 'ETIMEDOUT') why = 'TIMED OUT';
    else died = true;
  }
  if (died) { killed++; console.log('  killed   [' + mut.group + '] ' + mut.name); }
  else { survived.push('[' + mut.group + '] ' + mut.name + (why ? '  (' + why + ')' : '')); }
}

console.log('');
faults.forEach((f) => console.error('  FAULT    ' + f));
survived.forEach((s) => console.error('  SURVIVED ' + s));
console.log('  ' + killed + '/' + targets.length + ' killed');
try { fs.rmSync(tmpRoot, { recursive: true, force: true }); } catch (_) {}
if (survived.length || faults.length) process.exit(1);
console.log('  every mutation killed');
