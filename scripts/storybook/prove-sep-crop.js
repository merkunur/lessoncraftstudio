#!/usr/bin/env node
/* =====================================================================
   prove-sep-crop.js — crop-fidelity unit proofs for the SEP export
   (node-only; loads catalog-export.js via the prove-sep-mappers.js
   global.window seam).

   Guards the operator-reported 2026-07-06 defect: a deliberate crop-UI
   crop of exercises 1-2 swallowed exercise 3 because the answer-expansion
   qualified rects by ANY overlap of a ±24px-padded band. The rules now:
     - _sepExpandCropToAnswers: an answer rect qualifies ONLY if its
       vertical CENTER lies inside the crop (same-row X-expansion kept).
     - _sepInCrop: an element belongs to the crop when its CENTER is
       inside (±tol) — no half-visible interactive elements from a
       clipped neighbor row.
   USAGE: node scripts/storybook/prove-sep-crop.js
   ===================================================================== */
'use strict';
const path = require('path');

/* load catalog-export.js in Node (the prove-sep-mappers.js seam) */
global.window = global;
global.location = { search: '' };
global.JSZip = function () {};   /* presence-checked only on export paths */
require(path.join(__dirname, '..', '..', 'REFERENCE TRANSLATIONS', 'catalog-export.js'));
const CE = global.LCSCatalogExport;

const fails = [];
function assert(ok, msg) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + msg);
  if (!ok) fails.push(msg);
}
const expand = CE._sepExpandCropToAnswersForTest;
const inCrop = CE._sepInCropForTest;
assert(typeof expand === 'function' && typeof inCrop === 'function', 'test seams exported');

/* A stacked worksheet: three exercise rows ~150px apart; answer boxes on
   the right of each row. The crop covers rows 1-2 exactly. */
const PAGE_W = 1500, PAGE_H = 2000;
const crop = { x: 100, y: 100, w: 900, h: 300 };            /* rows 1-2 */
const row1Ans = { x: 700, y: 150, w: 120, h: 50 };          /* center 175 — inside */
const row2Ans = { x: 700, y: 300, w: 120, h: 50 };          /* center 325 — inside */
const row3Ans = { x: 700, y: 410, w: 120, h: 50 };          /* 10px below the crop; center 435 — OUTSIDE
                                                               (the old ±24 pad + any-overlap swallowed this) */

{
  const out = expand({ ...crop }, [row1Ans, row2Ans, row3Ans], PAGE_W, PAGE_H);
  assert(out.y + out.h <= crop.y + crop.h + 20,
    'expansion does NOT swallow the next stacked exercise (bottom ' + (out.y + out.h) + ' vs crop bottom ' + (crop.y + crop.h) + ')');
  assert(out.y <= crop.y && out.y + out.h >= 350,
    'the cropped rows\' own answers stay covered');
}

{
  /* same-row forgiveness still works: an answer box RIGHT of the crop, in a
     cropped row, pulls the crop out to include it */
  const narrow = { x: 100, y: 100, w: 500, h: 300 };         /* excludes x=700+ */
  const out = expand({ ...narrow }, [row1Ans, row2Ans, row3Ans], PAGE_W, PAGE_H);
  assert(out.x + out.w >= row1Ans.x + row1Ans.w,
    'same-row answer boxes still pull the crop out horizontally (right edge ' + (out.x + out.w) + ')');
  assert(out.y + out.h < row3Ans.y,
    'the horizontal pull STILL does not leak into the next row');
}

{
  /* no answers qualifying → crop returned untouched */
  const off = { x: 100, y: 1500, w: 400, h: 200 };
  const out = expand({ ...off }, [row1Ans, row2Ans, row3Ans], PAGE_W, PAGE_H);
  assert(out.x === off.x && out.y === off.y && out.w === off.w && out.h === off.h,
    'a crop sharing no rows with any answer is returned untouched');
}

{
  /* element inclusion: center-based */
  assert(inCrop({ x: 150, y: 150, w: 100, h: 40 }, crop), 'inCrop: fully-inside element belongs');
  assert(!inCrop({ x: 150, y: 390, w: 100, h: 60 }, crop),
    'inCrop: a neighbor element merely CLIPPED by the crop edge (center below) does NOT belong');
  assert(inCrop({ x: 150, y: 380, w: 100, h: 40 }, crop),
    'inCrop: an element mostly inside (center in) belongs even if it pokes out');
  assert(!inCrop({ x: 1050, y: 150, w: 200, h: 40 }, crop),
    'inCrop: an element right of the crop (center out) does not belong');
}

console.log('\n[prove-sep-crop] ' + fails.length + ' failure(s)');
process.exit(fails.length ? 1 : 0);
