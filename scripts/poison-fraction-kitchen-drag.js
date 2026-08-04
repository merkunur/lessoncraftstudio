#!/usr/bin/env node
/* =====================================================================
   poison-fraction-kitchen-drag.js — prove the BROWSER assertions that
   guard the drag rewrite actually fail on the defects they name.
   ---------------------------------------------------------------------
   Three of local-test's assertions guard properties that are invisible
   to an outcome check, and all three passed the moment they were
   written — which proves nothing. A gate that has never been seen to
   fail is a gate nobody has tested.

     B2 one-stroke       ⟵ re-arm: tear the gesture down on every commit
     B2 handler-stacking ⟵ re-arm: re-wire the knife from _commit
     T2 touch drag       ⟵ re-arm: drop preventDefault from the primitive

   Each case doctors ONE line, overlays it via FRK_TOOL_DIR, and requires
   the named assertion to FAIL. The tool file itself is never touched.

   Usage: node scripts/poison-fraction-kitchen-drag.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..');
const SRC_PATH = path.join(REPO, 'mini tools', 'fraction-kitchen.js');
const ORIGINAL = fs.readFileSync(SRC_PATH, 'utf8').replace(/\r\n/g, '\n');

let pass = 0, fail = 0;
const bad = [];
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  ok   ' + name); }
  else { fail++; bad.push(name); console.log('  FAIL ' + name + (extra ? '\n         ' + extra : '')); }
};
function sub(s, needle, repl, label) {
  if (s.indexOf(needle) < 0) throw new Error(`HARNESS FAULT: needle not found for "${label}": ${JSON.stringify(needle.slice(0, 80))}`);
  return s.replace(needle, repl);
}
function runLocalTest(source) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'frk-drag-'));
  fs.writeFileSync(path.join(dir, 'fraction-kitchen.js'), source, 'utf8');
  let out;
  try {
    out = execFileSync(process.execPath, [path.join(__dirname, 'local-test-fraction-kitchen.js')],
      { env: Object.assign({}, process.env, { FRK_TOOL_DIR: dir }), encoding: 'utf8', timeout: 600000 });
  } catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
  fs.rmSync(dir, { recursive: true, force: true });
  return out;
}
/* did the named assertion FAIL in that run? */
const failed = (out, name) => new RegExp('✗ FAIL ' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(out);

const CASES = [
  {
    /* ⚠ v1 of this poison called _endKnife and expected the stroke to
       stop. It did not — _endKnife resets the VISUALS, and the window
       listeners keep the gesture alive, which is the whole point of the
       rewrite. Terminating the gesture is what the old code did, so
       that is what the poison must do. */
    name: 'B2 ONE stroke cuts the whole cross',
    why: 'the gesture is terminated on the first commit (the pre-Wave-2 shape)',
    build: (s) => {
      let out = sub(s, '  _knifeMove: function (d, e) {\n    if (this._busy || this.sliced) return;',
        '  _knifeMove: function (d, e) {\n    if (d._done) return;\n    if (this._busy || this.sliced) return;', 'B2 guard');
      return sub(out,
        '      this._disengage(c);\n      this._commit(idx);',
        '      this._disengage(c);\n      d._done = true; this._endKnife(c);\n      this._commit(idx);',
        'B2 terminate');
    }
  },
  {
    name: 'B2 one handler per gesture after a cut (no stacking)',
    why: 'the knife is re-wired from _commit, stacking a quadruple per cut',
    build: (s) => sub(s,
      '    this._markCut(idx);',
      '    this._markCut(idx); this._wireKnife(); this._wireKnife();',
      'B2 stacking')
  },
  {
    /* ⚠ v1 removed preventDefault and T2 still passed, which is itself
       the finding: touch-action:none on an HTML <button> already stops
       the pan, so preventDefault is belt-and-braces. The LOAD-BEARING
       fix was moving the pointer target off the SVG <g>, where
       touch-action is inert. So the poison takes touch-action away —
       which is what being back on the <g> amounts to. */
    name: 'T2 a touch drag puts a slice on a plate',
    why: 'the piece target loses touch-action (i.e. it is back on the inert SVG <g>)',
    /* ⚠ v2 removed only the CSS rule and T2 still passed, because _grab
       ALSO sets it inline in JS — two copies, and the inline one is the
       effective one. A poison that takes away one of two redundant
       guards is not a poison. Take both. */
    build: (s) => {
      let out = sub(s,
        "  + '.frk-cutbtn,.frk-piecebtn{position:absolute;pointer-events:auto;padding:0;margin:0;border:0;'\n  +   'background:transparent;font:inherit;color:inherit;touch-action:none;cursor:pointer;'",
        "  + '.frk-cutbtn,.frk-piecebtn{position:absolute;pointer-events:auto;padding:0;margin:0;border:0;'\n  +   'background:transparent;font:inherit;color:inherit;cursor:pointer;'",
        'T2 css touch-action');
      return sub(out,
        "    btn.style.touchAction = 'none';",
        "    /* poisoned: no touch-action, as on an SVG <g> where it is inert */",
        'T2 inline touch-action');
    }
  }
];

console.log('poison-fraction-kitchen-drag — the browser assertions, re-armed\n');

const base = runLocalTest(ORIGINAL);
ok('baseline — the shipped build is ALL GREEN', /ALL GREEN/.test(base),
  (base.match(/^FAILED:.*$/m) || ['no ALL GREEN line'])[0]);

for (const c of CASES) {
  let out;
  try { out = runLocalTest(c.build(ORIGINAL)); }
  catch (e) { ok(c.name, false, e.message); continue; }
  ok(`"${c.name}" FAILS when ${c.why}`, failed(out, c.name),
    'the assertion still passed — it is not measuring what it claims');
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) { console.log('FAILED: ' + bad.join(' · ')); process.exit(1); }
console.log('poison-fraction-kitchen-drag: every drag assertion fails on the defect it names');
