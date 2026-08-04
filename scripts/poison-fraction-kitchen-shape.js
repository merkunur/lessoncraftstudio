#!/usr/bin/env node
/* =====================================================================
   poison-fraction-kitchen-shape.js — prove §8 of verify-fraction-kitchen
   is a GATE, in BOTH directions.
   ---------------------------------------------------------------------
   A check that currently fires on a real defect has proved it CAN fail.
   It has NOT proved it will pass once the defect is fixed — a check that
   is stuck on is as useless as one that is stuck off. And 8c/8d pass
   today, so they have proved nothing at all yet.

   So each check gets two cases:
     MUST_FIRE  — a synthetic violation; the named error must appear
     MUST_PASS  — a synthetic repair;  the named error must NOT appear

   ⚠ Each case violates ONLY its own condition. A poison that also trips
   a sibling check is testing the sibling (the recorded #42 lesson: the
   landing-fields poison keeps the slug so it cannot pass by tripping
   check 7 instead).

   ⚠ The repo file is LF. Every needle here is written against LF and the
   harness collapses CRLF before searching, because `git checkout`
   normalises line endings and multi-line needles go blind when it does
   (the #43 lesson).

   Usage: node scripts/poison-fraction-kitchen-shape.js
   Exit 1 if any case fails.
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

/* run verify against a doctored copy; return its stdout */
function runVerify(source) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'frk-poison-'));
  fs.writeFileSync(path.join(dir, 'fraction-kitchen.js'), source, 'utf8');
  let out;
  try {
    out = execFileSync(process.execPath, [path.join(__dirname, 'verify-fraction-kitchen.js'), '--locales=en'],
      { env: Object.assign({}, process.env, { FRK_TOOL_DIR: dir }), encoding: 'utf8', timeout: 30000 });
  } catch (e) {
    out = (e.stdout || '') + (e.stderr || '');
  }
  fs.rmSync(dir, { recursive: true, force: true });
  return out;
}

/* apply a needle; THROW if it does not match, never skip silently —
   a dropped needle shrinks the total while the run still says "all green" */
function sub(source, needle, replacement, label) {
  if (source.indexOf(needle) < 0) throw new Error(`HARNESS FAULT: needle not found for "${label}": ${JSON.stringify(needle.slice(0, 70))}`);
  return source.replace(needle, replacement);
}

const CASES = [];

/* ---- 8a undefined method ---------------------------------------- */
CASES.push({
  name: '8a MUST_FIRE — a call to a method that does not exist',
  marker: 'UNDEFINED METHOD',
  expect: true,
  build: (s) => sub(s, 'this._saveStore();', 'this._saveStoreTypo();', '8a fire')
});
CASES.push({
  name: '8a MUST_PASS — the real missing method, defined',
  marker: 'UNDEFINED METHOD',
  expect: false,
  /* define _dropOnTray as a no-op: the ONLY change, so if 8a still fires
     it is firing on something it invented */
  build: (s) => sub(s, '  _makePieceFly: function (pieceIdx) {',
    '  _dropOnTray: function (pieceIdx, x, y) { return null; },\n  _makePieceFly: function (pieceIdx) {', '8a pass')
});

/* ---- 8b drag contract -------------------------------------------- */
CASES.push({
  name: '8b MUST_FIRE — the drag primitive loses preventDefault',
  marker: 'never calls preventDefault',
  expect: true,
  build: (s) => sub(s,
    '      if (opts.enabled && !opts.enabled()) return;\n      e.preventDefault();',
    '      if (opts.enabled && !opts.enabled()) return;', '8b no-preventDefault')
});
CASES.push({
  name: '8b MUST_FIRE — pointermove rebound to the element',
  marker: 'must be bound to window',
  expect: true,
  build: (s) => sub(s,
    "      window.addEventListener('pointermove', move, { passive: false });",
    "      btn.addEventListener('pointermove', move, { passive: false });", '8b element-bound')
});
CASES.push({
  name: '8b MUST_FIRE — touch-action back on the SVG <g>',
  marker: 'inert there',
  expect: true,
  build: (s) => sub(s,
    "  + '.frk-piece{transform:translate(0,0);",
    "  + '.frk-piece{touch-action:none;transform:translate(0,0);", '8b svg touch-action')
});
CASES.push({
  /* ⚠ the ban must NOT match .frk-piecebtn, which is an HTML button where
     touch-action is correct. The first version had no boundary and
     condemned the repair — the Zufallsbeutel trap, in my own gate. */
  name: '8b MUST_PASS — .frk-piecebtn may keep touch-action (it is HTML)',
  marker: 'inert there',
  expect: false,
  build: (s) => sub(s,
    "  + '.frk-cutbtn,.frk-piecebtn{position:absolute;",
    "  + '.frk-piecebtn{touch-action:none;}'\n  + '.frk-cutbtn,.frk-piecebtn{position:absolute;", '8b piecebtn ok')
});
CASES.push({
  /* violates ONLY the coverage condition: the renamed helper is defined,
     so 8a stays silent and cannot be what fires */
  name: '8b MUST_FIRE — one surface bypasses the shared drag contract',
  marker: '_grab() is used by only',
  expect: true,
  build: (s) => {
    let out = sub(s, '    this._grab(chip, {', '    this._grab2(chip, {', '8b bypass call');
    /* ⚠ the stub must NOT delegate to _grab — an earlier version did, which
       put the call site straight back and made the poison test nothing */
    return sub(out, '  _grab: function (btn, opts) {',
      '  _grab2: function (btn, opts) { return null; },\n  _grab: function (btn, opts) {', '8b bypass def');
  }
});

/* ---- 8c ids + colours in the injected body ----------------------- */
CASES.push({
  name: '8c MUST_FIRE — an id inside _bodySVG',
  marker: 'contains an id',
  expect: true,
  build: (s) => sub(s, "s += '<circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#D9A05B\" stroke=\"#B97F3F\" stroke-width=\"2.5\"/>';",
    "s += '<circle id=\"crust\" cx=\"50\" cy=\"50\" r=\"40\" fill=\"#D9A05B\" stroke=\"#B97F3F\" stroke-width=\"2.5\"/>';", '8c id')
});
CASES.push({
  name: '8c MUST_FIRE — alarm-red in a food body (#D2553A, the sauce that was proposed)',
  marker: 'alarm-red',
  expect: true,
  build: (s) => sub(s, "s += '<circle cx=\"50\" cy=\"50\" r=\"33.5\" fill=\"#F5D272\"/>';",
    "s += '<circle cx=\"50\" cy=\"50\" r=\"33.5\" fill=\"#D2553A\"/>';", '8c red')
});
CASES.push({
  name: '8c MUST_PASS — #CB5F3C, the tomato that clears the same predicate',
  marker: 'alarm-red',
  expect: false,
  build: (s) => sub(s, "s += '<circle cx=\"50\" cy=\"50\" r=\"33.5\" fill=\"#F5D272\"/>';",
    "s += '<circle cx=\"50\" cy=\"50\" r=\"33.5\" fill=\"#CB5F3C\"/>';", '8c tomato')
});

CASES.push({
  /* the hole 8d used to skip: one axis alone leaves the other at its old
     value and the box goes oblong */
  name: '8d MUST_FIRE — a rule that sizes only ONE axis',
  marker: 'alone',
  expect: true,
  build: (s) => sub(s, "  +   '.frk-wrap{--frk-fbmax:200px;}'",
    "  +   '.frk-foodbox{width:180px;}'", '8d one-axis')
});

/* ---- 9 the freehand area model ----------------------------------- */
CASES.push({
  name: '9 MUST_FIRE — the area split is measured on the wrong side',
  marker: 'closed form says',
  expect: true,
  build: (s) => sub(s,
    '        if (dx * (y - a.y) - dy * (x - a.x) >= 0) lo++; else hi++;',
    /* a DOT product, not a cross product: splits along the wrong axis.
       (v1 shifted the cross product by 4, which is ~0.03 geometric units
       and vanished under the tolerance — a poison too weak to poison.) */
    '        if (dx * (x - a.x) + dy * (y - a.y) >= 0) lo++; else hi++;', '9 split')
});
CASES.push({
  name: '9 MUST_FIRE — the tool lowers its free-cut floor',
  marker: "free-cut floor is",
  expect: true,
  build: (s) => sub(s,
    '  _cutFloor: function (food) { return 1 / (Math.max.apply(null, this.MENU[food]) + 1); },',
    '  _cutFloor: function (food) { return 0.01; },', '9 floor')
});
CASES.push({
  name: '9 MUST_FIRE — the food mask leaks, so a diameter stops measuring equal',
  marker: 'measures UNEQUAL',
  expect: true,
  build: (s) => sub(s,
    "    if (this.food === 'pizza') return Math.hypot(p.x - G.CX, p.y - G.CY) <= G.R;",
    "    if (this.food === 'pizza') return Math.hypot(p.x - G.CX, p.y - G.CY) <= G.R && p.x < 62;", '9 mask')
});

/* ---- 8d square foodbox ------------------------------------------- */
CASES.push({
  name: '8d MUST_FIRE — a one-sided clamp skews the hit overlay',
  marker: 'SQUARE INVARIANT',
  expect: true,
  build: (s) => sub(s, ".frk-foodbox{position:relative;width:var(--frk-fb);height:var(--frk-fb);}",
    ".frk-foodbox{position:relative;width:var(--frk-fb);height:calc(var(--frk-fb) * 0.8);}", '8d fire')
});
CASES.push({
  name: '8d MUST_PASS — unequal width/height is fine WITH an explicit aspect-ratio:1',
  marker: 'SQUARE INVARIANT',
  expect: false,
  build: (s) => sub(s, ".frk-foodbox{position:relative;width:var(--frk-fb);height:var(--frk-fb);}",
    ".frk-foodbox{position:relative;width:auto;height:var(--frk-fb);aspect-ratio:1;}", '8d pass')
});

/* ---- run ---------------------------------------------------------- */
console.log('poison-fraction-kitchen-shape — §8 in both directions\n');

/* baseline: NOTHING in §8 may fire on the real file. A gate that is stuck
   on is exactly as useless as one that is stuck off. */
const base = runVerify(ORIGINAL);
for (const sec of ['8a', '8b', '8c', '8d', '9:']) {
  ok(`baseline — §${sec} is silent on the shipped file`, !new RegExp(sec).test(base),
    base.split('\n').filter((l) => new RegExp(sec).test(l))[0]);
}

for (const c of CASES) {
  let out;
  try { out = runVerify(c.build(ORIGINAL)); }
  catch (e) { ok(c.name, false, e.message); continue; }
  const fired = out.indexOf(c.marker) >= 0;
  ok(c.name, fired === c.expect,
    `marker ${JSON.stringify(c.marker)} ${fired ? 'FIRED' : 'did not fire'}, expected ${c.expect ? 'FIRE' : 'SILENCE'}`);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) { console.log('FAILED: ' + bad.join(' · ')); process.exit(1); }
console.log('poison-fraction-kitchen-shape: every §8 check fires on its own violation and stays silent on its repair');
