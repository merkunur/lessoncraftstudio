#!/usr/bin/env node
/* =====================================================================
   audit-wodb-palette.js — the colour law for Which One Doesn't Belong.

   ⭐⭐ WHY THIS EXISTS. Two shipped grids offered "It's the only purple
   one" as one of their four answers. Measured, the shipped teal #146B5E
   and plum #6B4C9A are 1.05:1 apart and collapse to the same colour under
   all three dichromacies. For roughly one boy in twelve that answer did
   not exist — nor did it in greyscale, on a photocopy, or on a
   washed-out projector. A tool whose whole premise is "every answer can
   be right" was shipping an answer that, for some children, was not
   there.

   ⭐⭐ AND THEN THIS GATE PROVED THE OBVIOUS FIX IMPOSSIBLE, WHICH CHANGED
   THE DESIGN. An exhaustive sweep of 15,190 candidate inks found NO set
   of FOUR that stays >= 1.9:1 apart under normal, deuteranopic,
   protanopic AND tritanopic vision while each keeps >= 2.4:1 on the cell.
   Three is the ceiling, and the three are ugly. (An art panel's
   prescription, plum #8E3F86, measured 1.03:1 against teal — WORSE than
   what it replaced. A proposed hex is a hypothesis too.)

   So colour stopped being an answer. The tool uses ONE ink and
   discriminates by FILL TEXTURE, which survives greyscale, print,
   projection and every dichromacy. That is a better tool as well as a
   fixable one: colour was a graphic-design property, never a
   mathematical one — the same objection the pedagogy audit raised
   against "the only one not coloured in".

   THE LAW
     L1  the ink is >= 4.5:1 on its cell under all four vision models
         (one ink, so there is no pair left to separate)
     L2  every chrome colour clears its own ground. Chrome is never one
         of the four answers, so chrome pairs are NOT compared — that is
         precisely what let the ink set shrink to one.
     L3  ⭐ the load-bearing one: THE STAGE EMITS ONE INK. Structural, so
         a grid cannot discriminate by colour even if someone tries.
     L4  the fill textures stay distinct with the colour removed, i.e.
         they survive a photocopier.

   Run:  node scripts/audit-wodb-palette.js
         node scripts/audit-wodb-palette.js --poison
   Exit 1 on any violation.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.WDB_TOOL_DIR || path.join(ROOT, 'mini tools');

let ERRORS = 0;
const err = (m) => { ERRORS++; console.log('  FAIL  ' + m); };
const ok = (m) => console.log('  ok    ' + m);

/* ── colour maths, written here rather than imported, so the gate never
      shares an implementation with the thing it judges ───────────────── */
const hexOf = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const srgb2lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lin2srgb = (c) => {
  const v = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(v * 255)));
};
const relLum = (h) => { const p = hexOf(h).map(srgb2lin); return 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2]; };
const contrast = (a, b) => {
  const x = relLum(a), y = relLum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const MAT = {
  deuteranopia: [[0.625, 0.375, 0], [0.70, 0.30, 0], [0, 0.30, 0.70]],
  protanopia: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]],
  tritanopia: [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]],
};
function simulate(h, kind) {
  const p = hexOf(h).map(srgb2lin), m = MAT[kind];
  const o = [
    m[0][0] * p[0] + m[0][1] * p[1] + m[0][2] * p[2],
    m[1][0] * p[0] + m[1][1] * p[1] + m[1][2] * p[2],
    m[2][0] * p[0] + m[2][1] * p[1] + m[2][2] * p[2],
  ].map(lin2srgb);
  return '#' + o.map((v) => v.toString(16).padStart(2, '0')).join('');
}

const CELL = '#FFFEFB';
const VIEWS = ['normal', 'deuteranopia', 'protanopia', 'tritanopia'];

function loadTool() {
  const p = path.join(TOOL_DIR, 'wodb.js');
  if (!fs.existsSync(p)) { console.error('no wodb.js at ' + TOOL_DIR); process.exit(1); }
  delete require.cache[require.resolve(p)];
  return require(p);
}

function run(T, grids, label) {
  console.log('\n' + label);

  /* ── L1 ── */
  if (!T.INK) { err('L1 the tool declares no INK — this run would compare nothing'); return; }
  let l1 = true;
  for (const v of VIEWS) {
    const ink = v === 'normal' ? T.INK : simulate(T.INK, v);
    const cell = v === 'normal' ? CELL : simulate(CELL, v);
    const c = contrast(ink, cell);
    if (c < 4.5) { err('L1 ink ' + T.INK + ' is ' + c.toFixed(2) + ':1 on the cell under ' + v); l1 = false; }
  }
  if (l1) ok('L1 ink ' + T.INK + ' clears the cell under all four vision models');

  /* ── L2 ── */
  const CHROME = [
    ['ear', T.UI && T.UI.ear, CELL, 4.5],
    ['warm', T.UI && T.UI.warm, CELL, 2.4],
    ['plate', T.UI && T.UI.plate, T.INK, 3.0],
  ];
  let l2 = true;
  for (const row of CHROME) {
    const n = row[0], hx = row[1], ground = row[2], floor = row[3];
    if (!hx) { err('L2 chrome colour "' + n + '" is missing'); l2 = false; continue; }
    const c = contrast(hx, ground);
    if (c < floor) { err('L2 chrome ' + n + ' ' + hx + ' is ' + c.toFixed(2) + ':1 (need ' + floor + ')'); l2 = false; }
  }
  if (l2) ok('L2 chrome clears its own grounds (' + CHROME.length + ' colours)');

  /* ── L3 — non-vacuity FIRST: an empty probe set "contains no second
        colour" and would pass on a tool that renders nothing at all. ── */
  const probes = [
    T._shapeSVG({ shape: 'hexagon', fill: 'solid' }, false),
    T._shapeSVG({ shape: 'star', fill: 'outline', size: 'sm' }, false),
    T._shapeSVG({ shape: 'square', fill: 'hatch', color: 'plum' }, false),
    T._shapeSVG({ shape: 'circle', fill: 'stipple', color: 'honey' }, false),
    T._dotsSVG('dice', 6, false),
    T._dotsSVG('row', 12, false),
    T._clockSVG(4, 45, false),
  ].filter(Boolean);
  if (probes.length < 7) {
    err('L3 only ' + probes.length + ' of 7 probes rendered — this check would be vacuous');
  } else {
    const seen = new Set();
    for (const p of probes) {
      const ms = p.match(/#[0-9A-Fa-f]{6}/g) || [];
      for (const m of ms) seen.add(m.toUpperCase());
    }
    const GROUND = new Set(['#FFFEFB', '#FFFFFF']);
    const allowed = new Set([T.INK.toUpperCase(), (T.UI && T.UI.warm || '').toUpperCase()]);
    const extra = [...seen].filter((h) => !GROUND.has(h) && !allowed.has(h));
    if (extra.length) {
      err('L3 the stage emits ' + extra.length + ' colour(s) besides the ink: ' + extra.join(', ') +
        ' — a grid could discriminate by colour again');
    } else ok('L3 ' + probes.length + ' probes emit one ink; colour cannot be an answer');
  }

  /* ── L4 — with the colour stripped, the four fills must still differ ── */
  const fills = T.FILLS || [];
  const tex = fills.map((f) => {
    const svg = T._shapeSVG({ shape: 'square', fill: f }, false) || '';
    return svg.replace(/#[0-9A-Fa-f]{6}/g, '#000').replace(/wdbp\d+/g, 'P');
  });
  if (tex.length < 4) err('L4 only ' + tex.length + ' fill textures declared');
  else if (new Set(tex).size !== tex.length) {
    err('L4 two fill textures are identical once colour is removed — on a photocopy they are ' +
      'the same fill and the attribute vanishes');
  } else ok('L4 all ' + tex.length + ' fill textures are distinct in greyscale');

  /* ── L3b — no grid leans on the now-inert `color` field alone ── */
  if (grids && grids.length) {
    let checked = 0;
    for (const g of grids) {
      const cells = g.cells || [];
      if (cells.length !== 4) continue;
      let allShape = true;
      for (const c of cells) if (!c || c.t !== 'shape') allShape = false;
      if (!allShape) continue;
      checked++;
      const same = (k) => new Set(cells.map((c) => String(c[k] || ''))).size === 1;
      if (same('shape') && same('size') && same('rot') && same('fill')) {
        err('L3b ' + g.id + ' differed only in `color`, which is now inert — it would render as ' +
          'four IDENTICAL shapes. Re-author onto shape/size/rot/fill.');
      }
    }
    ok('L3b checked ' + checked + ' all-shape grid(s)');
  }
}

const args = process.argv.slice(2);
const T = loadTool();
let grids = [];
try {
  grids = (JSON.parse(fs.readFileSync(path.join(TOOL_DIR, 'wodb-grids.json'), 'utf8')).grids) || [];
} catch (_) { /* the data file is optional for L1/L2/L4 */ }

if (args.indexOf('--poison') >= 0) {
  /* ⚠ POISON EVERY LAW, NOT JUST THE FIRST. An obvious poison
     short-circuits at check one and leaves the rest never observed
     failing — indistinguishable from unable to fail. */
  console.log('POISON RUN — each law is broken in turn and must be NAMED.');
  const cases = [
    ['L1 ink too pale', function () { const c = Object.create(T); c.INK = '#BFE3DC'; return c; }],
    ['L2 chrome too pale', function () {
      const c = Object.create(T);
      c.UI = { ear: '#EFEFEF', warm: T.UI.warm, plate: T.UI.plate };
      return c;
    }],
    ['L3 a second ink reaches the stage', function () {
      const c = Object.create(T);
      c._shapeSVG = function (cell, mini) {
        return T._shapeSVG.call(T, cell, mini).replace('#146B5E', '#6B4C9A');
      };
      return c;
    }],
    ['L4 two textures collapse into one', function () {
      const c = Object.create(T);
      c._shapeSVG = function (cell, mini) {
        const d = {};
        for (const k in cell) d[k] = cell[k];
        if (d.fill === 'stipple') d.fill = 'hatch';
        return T._shapeSVG.call(T, d, mini);
      };
      return c;
    }],
  ];
  let allFired = true;
  for (const cs of cases) {
    const before = ERRORS;
    run(cs[1](), grids, 'must-FIRE: ' + cs[0]);
    const fired = ERRORS - before;
    ERRORS = before;
    if (!fired) { console.log('  !! POISON DID NOT FIRE for ' + cs[0]); allFired = false; }
  }
  /* the CONTROL — a gate that fires on everything is as useless as one
     that fires on nothing */
  const before = ERRORS;
  run(T, grids, 'must-PASS: the shipped tool (the control)');
  const nowFailed = ERRORS - before;
  console.log('');
  if (!allFired) { console.log('POISON FAILED — a law cannot fail, so it is not being tested.'); process.exit(1); }
  if (nowFailed) { console.log('POISON FAILED — the control does not pass its own law.'); process.exit(1); }
  console.log('POISON OK — every law fires when broken, and the shipped tool is clean.');
  process.exit(0);
}

run(T, grids, 'mini tools/wodb.js');
console.log('');
if (ERRORS) { console.log('FAIL — ' + ERRORS + ' violation(s). Fix the TOOL, never the law.'); process.exit(1); }
console.log('PASS');
