#!/usr/bin/env node
/* Mutation harness for verify-pattern-bench.js.
   A gate nobody has broken on purpose is not a gate. Each mutation below
   is a defect a future edit could plausibly introduce; the gate must FAIL
   on every one. A SURVIVOR is a hole in the gate, never an acceptable
   mutation — fix the gate, never the mutation list. */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC_PATH = path.join(ROOT, 'mini tools', 'pattern-bench.js');
const ORIG = fs.readFileSync(SRC_PATH, 'utf8');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'ptn-mut-'));

const M = [
  /* the pattern itself */
  ['strip stops repeating the unit', "return st.unit[i % st.unit.length];", "return st.unit[Math.min(i, st.unit.length - 1)];"],
  ['strip off by one', "return st.unit[i % st.unit.length];", "return st.unit[(i + 1) % st.unit.length];"],
  ['out-of-range cell is not null', "if (i < 0 || i >= st.len) return null;", "if (i < 0) return null;"],
  ['empty unit crashes', "if (!st || !st.unit || !st.unit.length) return null;", "if (!st) return null;"],
  /* costume blindness — the thesis */
  ['a costume reaches the pattern', "next.medium = m;", "next.medium = m; if (m === 'shape') next.unit = next.unit.slice().reverse();"],
  ['two slots share a colour', "b: '#2F6FB5'", "b: '#D6453C'"],
  ['two slots share a shape', "b: 'square'", "b: 'circle'"],
  ['two slots share a picture', "b: 'banana'", "b: 'apple'"],
  ['two slots share a tone', "b: 523", "b: 392"],
  /* the cover */
  ['covered cell still draws its bead', "cell.classList.add('ptn-covered');", "cell.classList.add('ptn-covered'); cell.appendChild(self._bead(slot));"],
  ['covered cell leaks its slot in aria', "cell.setAttribute('aria-label', api.t('coverNote'));", "cell.setAttribute('aria-label', 'slot ' + slot);"],
  ['only the last bead is coverable', "if (i < 0 || i >= next.len) return next;", "if (i !== next.len - 1) return next;"],
  ['out-of-range cover accepted', "if (i < 0 || i >= next.len) return next;", "if (i < 0) return next;"],
  ['cover is not a toggle', "if (at > -1) next.covered.splice(at, 1); else next.covered.push(i);", "next.covered.push(i);"],
  /* the model */
  ['setUnitSlot mutates its input', "var next = this._clone(st);\n    if (i < 0 || i >= next.unit.length) return next;", "var next = st;\n    if (i < 0 || i >= next.unit.length) return next;"],
  ['toggleCover mutates its input', "var next = this._clone(st);\n    if (i < 0 || i >= next.len) return next;\n    var at", "var next = st;\n    if (i < 0 || i >= next.len) return next;\n    var at"],
  ['unknown medium accepted', "if (this.MEDIA.indexOf(m) === -1) return next;", "if (false) return next;"],
  ['unknown slot accepted', "if (this.SLOTS.indexOf(slot) === -1) return next;", "if (false) return next;"],
  ['unit length lower unclamped', "if (!(v >= this.UNIT_MIN)) v = this.UNIT_MIN;", "if (false) v = this.UNIT_MIN;"],
  ['unit length upper unclamped', "if (v > this.UNIT_MAX) v = this.UNIT_MAX;", "if (v > 99) v = 99;"],
  ['a state field appears', "return { unit: ['a', 'b'], len: 12, covered: [], medium: 'colour', unitHidden: false };", "return { unit: ['a', 'b'], len: 12, covered: [], medium: 'colour', unitHidden: false, score: 0 };"],
  ['strip length unclamped', "if (v > this.LEN_MAX) v = this.LEN_MAX;", "if (v > 9999) v = 9999;"],
  ['strip length floor removed', "if (!(v >= this.LEN_MIN)) v = this.LEN_MIN;", "if (false) v = this.LEN_MIN;"],
  ['shortening leaves an orphan cover', "next.covered = next.covered.filter(function (i) { return i < v; });", "next.covered = next.covered.slice();"],
  ['setLen mutates its input', "var next = this._clone(st);\n    var v = Math.round(Number(n) || 0);", "var next = st;\n    var v = Math.round(Number(n) || 0);"],
  /* the transfer line — the moat */
  ['transfer line never fires', "self._transfer = (was !== m);", "self._transfer = false;"],
  ['transfer line never clears', "this._transfer = false;\n    }", "}"],
  ['transfer line never rendered', "tr.textContent = api.t('sameAgain');", "tr.textContent = '';"],
  /* stance */
  ['clap leaks a covered bead', "if (self.isCovered(self.st, i)) return;", "if (false) return;"],
  ['a verdict appears', "clapIt: function () {", "clapIt: function () { var isCorrect = true; void isCorrect;"],
  ['a correct/wrong class appears', "'ptn-cell'", "'ptn-cell ptn-correct'"],
  ['verdict wording in a string', "    coverNote:      { en: \"Tap a bead to cover it — try one in the middle.\"", "    coverNote:      { en: \"Wrong, try again\""],
  ['fence broken', "PICTURE_DIR: 'fruits',", "PICTURE_DIR: 'fruits',\n  BLOCKS: 'shapeforge',"],
  /* identity + safety */
  ['id drifts', "id: 'pattern-bench'", "id: 'pattern-bench-v2'"],
  ['store key drifts', "STORE_KEY: 'lcs:pattern-bench:v1'", "STORE_KEY: 'lcs:ptn:v1'"],
  ['premium defaults true', "premium: false,", "premium: true,"],
  ['tasks declared (activity chrome)', "premium: false,", "premium: false,\n  tasks: [{ id: 'x' }],"],
  ['exfiltration path', "injectPatternBenchCSS();", "navigator.sendBeacon('/track', '1'); injectPatternBenchCSS();"],
  ['unexpected fetch target', "fetch('/api/auth/me'", "fetch('/api/telemetry'"],
  /* layout */
  ['strip and letters no longer share a grid', ".ptn-strip,.ptn-letters{display:grid", ".ptn-strip{display:grid"],
  ['column count no longer follows the strip', "repeat(var(--ptn-n,12),minmax(44px,1fr))", "repeat(12,minmax(44px,1fr))"],
  ['tap floor below 44px', "minmax(44px,1fr)", "minmax(30px,1fr)"],
  /* l10n + css */
  ['a used string has no entry', "    clapIt:         { en: \"Clap it\"", "    clapItX:         { en: \"Clap it\""],
  ['a string loses en', "    hideUnit:       { en: \"Hide it\"", "    hideUnit:       { zz: \"x\""],
  ['css injector not idempotent', "if (document.getElementById('ptn-style')) return;", "if (false) return;"],
  ['print block removed', "@media print", "@media screen and (min-width:99999px)"],
  ['reduced motion guard removed', "prefers-reduced-motion", "prefers-nothing"],
  ['restyles shell internals', ".ptn-wrap{", ".lcs-stage{padding:0;}.ptn-wrap{"],
  ['wide scope removed', "body.ptn-wide", "body.ptn-nope"]
];

let died = 0; const survivors = [];
M.forEach(([name, from, to], n) => {
  if (ORIG.indexOf(from) === -1) { survivors.push(`${name}  [ANCHOR NOT FOUND — mutation never applied]`); return; }
  const dir = path.join(TMP, 'm' + n);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'pattern-bench.js'), ORIG.split(from).join(to), 'utf8');
  let failed = false;
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-pattern-bench.js')],
      /* a gate run that HANGS reports nothing, so it counts as a failed run
         too — and without this the harness itself wedges */
      { env: Object.assign({}, process.env, { PTN_TOOL_DIR: dir }), stdio: 'pipe', timeout: 20000 });
  } catch (e) { failed = true; }
  if (failed) { died++; console.log(`  killed   ${name}`); }
  else survivors.push(name);
});

console.log('');
survivors.forEach((s) => console.error(`  SURVIVED ${s}`));
console.log(`${died}/${M.length} mutations killed`);
try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (_) {}
process.exit(survivors.length ? 1 : 0);
