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
  name: '8b MUST_PASS — window-bound moves + preventDefault + no SVG touch-action',
  marker: 'DRAG CONTRACT',
  expect: false,
  build: (s) => {
    /* rewire all three surfaces to the house contract, minimally */
    let out = s;
    out = out.replace(/(\w+)\.addEventListener\('(pointermove|pointerup|pointercancel)'/g, "window.addEventListener('$2'");
    out = out.replace(/addEventListener\('pointerdown', function \((\w+)\) \{/g,
      "addEventListener('pointerdown', function ($1) { $1.preventDefault();");
    out = sub(out, "      g.style.touchAction = 'none';", '      /* moved to the HTML overlay */', '8b pass touch-action');
    return out;
  }
});
CASES.push({
  name: '8b MUST_FIRE — one pointerdown loses preventDefault',
  marker: 'never calls preventDefault',
  expect: true,
  build: (s) => {
    let out = s;
    out = out.replace(/(\w+)\.addEventListener\('(pointermove|pointerup|pointercancel)'/g, "window.addEventListener('$2'");
    out = out.replace(/addEventListener\('pointerdown', function \((\w+)\) \{/g,
      "addEventListener('pointerdown', function ($1) { $1.preventDefault();");
    out = sub(out, "      g.style.touchAction = 'none';", '      /* moved */', '8b fire base');
    /* now remove it from exactly one handler again */
    const i = out.indexOf("addEventListener('pointerdown', function (e) { e.preventDefault();");
    if (i < 0) throw new Error('HARNESS FAULT: could not re-open a pointerdown handler');
    return out.slice(0, i) + out.slice(i).replace(" e.preventDefault();", '');
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

/* ---- 8d square foodbox ------------------------------------------- */
CASES.push({
  name: '8d MUST_FIRE — a one-sided clamp skews the hit overlay',
  marker: 'SQUARE INVARIANT',
  expect: true,
  build: (s) => sub(s, ".frk-foodbox{width:min(300px,74vw);height:min(300px,74vw);max-height:100%;}",
    ".frk-foodbox{width:min(300px,74vw);height:min(240px,60vw);max-height:100%;}", '8d fire')
});
CASES.push({
  name: '8d MUST_PASS — unequal width/height is fine WITH an explicit aspect-ratio:1',
  marker: 'SQUARE INVARIANT',
  expect: false,
  build: (s) => sub(s, ".frk-foodbox{width:min(300px,74vw);height:min(300px,74vw);max-height:100%;}",
    ".frk-foodbox{width:auto;height:min(100%,300px);aspect-ratio:1;}", '8d pass')
});

/* ---- run ---------------------------------------------------------- */
console.log('poison-fraction-kitchen-shape — §8 in both directions\n');

/* baseline: the checks that pass today must keep passing on the real file */
const base = runVerify(ORIGINAL);
ok('baseline — 8c does not fire on the shipped art', !/8c/.test(base), base.split('\n').filter((l) => /8c/.test(l))[0]);
ok('baseline — 8d does not fire on the shipped CSS', !/8d/.test(base), base.split('\n').filter((l) => /8d/.test(l))[0]);

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
