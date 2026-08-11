/* [FIX][PRINTABLES] The diamond answer keys were false, and the verifier
   could never catch them because it re-declared the same tables.

   `image library/shapes/diamond.png` IS A SQUARE ROTATED 45 DEGREES —
   measured w/h 0.9993 with all four vertices at the bbox midpoints, and
   confirmed by eye. So the printable shipped:
     SYMMETRY_COUNT.diamond = 2  -> a child who answers 4 is marked WRONG
     QUAD_CLASS.diamond = 'other' -> teaches that a tilted square is not
                                     a square, which is the exact
                                     prototype-effect misconception the
                                     platform elsewhere exists to break
                                     (`curate-wing-core.js:7-8`).
   The tool shelf already fixed this once — `draw-bag.js:917` records
   "Build #3's diamond was the SQUARE ROTATED 45 DEGREES … now a true
   rhombus at width/height 0.70." The tool was swept; the printables were
   not.

   ⭐ Both consumers are PICTURE-ONLY — `classify-quads` labels its bins
   with `shapeImg(labelKey, 38)`, not words — so nothing prints the noun
   "diamond". Setting the keys true of the artwork therefore turns the
   defect into the instruction: the sheet shows a tilted square and
   expects it sorted to SQUARE, which is the anti-prototype-effect lesson
   delivered where the misconception actually lives.

   ⚠ And the verifier at :357/:370 hard-coded its own copies of both
   tables inside the browser `evaluate`, so it agreed with the code by
   construction and could not fail. They are now PASSED IN. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, 'worksheet-gen', 'types', '_shared', 'geometry-tasks.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => {
  if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 70));
  if (s.split(a).length - 1 !== 1) throw new Error('NOT UNIQUE: ' + a.slice(0, 70));
  s = s.split(a).join(b);
};

/* ---- 0. the verifier's duplicate SY goes FIRST -------------------
   ⚠ Its uniqueness guard caught this on the first run: the symmetry
   string occurs TWICE, once in the real table and once in the
   verifier's hard-coded copy. That duplication is the defect — and it
   also meant a naive substitution would have silently patched only one
   of them, leaving the gate disagreeing with the code in the other
   direction. Delete the copy, then the remaining one is unique. */
sub("          const SY = { square: 4, rectangle: 2, triangle: 3, diamond: 2, oval: 2, pentagon: 5, hexagon: 6, heart: 1, star: 5, trapezoid: 1 };\n", "");

/* ---- 1. the two false answer keys -------------------------------- */
sub("triangle: 3, diamond: 2, oval: 2",
    "triangle: 3, diamond: 4, oval: 2");
sub("const QUAD_CLASS = { square: 'square', rectangle: 'rectangle', diamond: 'other', trapezoid: 'other', parallelogram: 'other' };",
    "/* ⚠ diamond is 'square' because the shipped artwork IS a square\n" +
    "   rotated 45 degrees. A tilted square sorted to SQUARE is the\n" +
    "   lesson, not a leniency. */\n" +
    "const QUAD_CLASS = { square: 'square', rectangle: 'rectangle', diamond: 'square', trapezoid: 'other', parallelogram: 'other' };");

/* ---- 2. stop the verifier agreeing with itself -------------------- */
sub("return page.evaluate(({ mode, facet }) => {",
    "/* ⚠⚠ SY and QC are PASSED IN, never re-declared. They used to be\n" +
    "   hard-coded copies inside this browser context, so the gate carried\n" +
    "   whatever misconception the code carried and could not fail. */\n" +
    "      return page.evaluate(({ mode, facet, SY, QC }) => {");
sub("          const cls = { square: 'square', rectangle: 'rectangle', diamond: 'other', trapezoid: 'other', parallelogram: 'other' };",
    "          const cls = QC;");
sub("      }, { mode: m, facet: f });",
    "      }, { mode: m, facet: f, SY: SYMMETRY_COUNT, QC: QUAD_CLASS });");

fs.writeFileSync(P, s);

/* ---- verify the writes landed, and that the gate can now FAIL ----- */
delete require.cache[require.resolve(P)];
const after = fs.readFileSync(P, 'utf8');
const bad = [];
if (!/diamond: 4/.test(after)) bad.push('symmetry key did not land');
if (!/diamond: 'square'/.test(after)) bad.push('quad-class key did not land');
if (/const SY = \{ square: 4/.test(after)) bad.push('verifier still re-declares SY');
if (/const cls = \{ square: 'square'/.test(after)) bad.push('verifier still re-declares cls');
if (!/SY: SYMMETRY_COUNT, QC: QUAD_CLASS/.test(after)) bad.push('tables are not passed in');
/* non-vacuity: the checks above must be capable of firing */
if (!/diamond/.test(after)) bad.push('NON-VACUITY: no diamond key at all — wrong file?');
if (bad.length) { console.log('FAILED:\n  ' + bad.join('\n  ')); process.exit(1); }
require(P);   /* it must still parse */
console.log('diamond answer keys corrected (4 lines of symmetry, class square); verifier tables passed in, no longer self-agreeing');
