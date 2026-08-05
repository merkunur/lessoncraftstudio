#!/usr/bin/env node
/* =====================================================================
   fix-wodb-colour-reasons.js — one-shot.

   ⚠⚠ THE REBUILD ABOLISHED COLOUR AS AN ANSWER AND LEFT THE DATA SAYING
   OTHERWISE. Two shipped grids offer "It's the only purple one" as one of
   their four answers, in all eleven locales. There is no purple on screen
   any more — `INK` is a single colour and `LEGACY_FILL` maps the old
   `plum` to a hatch — so those cells now render STRIPED while the reveal
   card names a colour. The Finnish panel found it; the Italian panel
   measured the consequence on `wodb-shape-23-triangles`, whose entire
   task is telling four triangles apart.

   ⭐ NO NEW TEXT IS AUTHORED HERE, in any locale. Both replacements reuse
   native strings that already exist in this same file for exactly the
   attribute now being named:
     - k-onlyone[3]  becomes an OUTLINE circle, and takes the verbatim
       "not coloured in" reason already authored for 23-triangles[0];
     - 23-triangles[3] keeps its own second clause. Its reason is already
       double-barrelled ("the only purple one — AND the only small one"),
       which three panels flagged independently as a corner getting two
       claims; dropping the dead half fixes both defects at once.
   Inventing eleven new sentences would have been a translation pass
   without a native panel behind it.

   Run:  node scripts/fix-wodb-colour-reasons.js [--apply]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'wodb-grids.json');
const APPLY = process.argv.indexOf('--apply') >= 0;
const raw = fs.readFileSync(P, 'utf8');
const j = JSON.parse(raw);
const by = {}; j.grids.forEach((g) => { by[g.id] = g; });

const donor = by['wodb-shape-23-triangles'];
const target = by['wodb-shape-k-onlyone'];
if (!donor || !target) { console.error('FAIL grids missing'); process.exit(1); }

/* non-vacuity first: the donor must really carry the outline reason, or
   this would copy an empty object into a live cell */
const outlineReason = donor.reasons[0];
if (!outlineReason || !outlineReason.en || !/coloured in|colored in/i.test(outlineReason.en)) {
  console.error('FAIL the donor reason is not the outline one: ' + JSON.stringify(outlineReason));
  process.exit(1);
}
const LOC = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const missing = LOC.filter((l) => !outlineReason[l]);
if (missing.length) { console.error('FAIL donor reason lacks: ' + missing.join(',')); process.exit(1); }

/* 1. k-onlyone[3]: plum circle -> outline circle, with the donor reason */
target.cells[3] = { t: 'shape', shape: 'circle', size: 'lg', fill: 'outline' };
target.reasons[3] = JSON.parse(JSON.stringify(outlineReason));

/* 2. 23-triangles[3]: the reason is double-barrelled ("the only purple
      one — AND the only small one"), which three panels flagged
      independently as one corner holding two claims. Only the colour half
      is dead, so the fix is to keep the size claim.
      ⚠ I FIRST TRIED TO SPLIT THE SENTENCE and the script refused at
      10/11: Spanish joins its clauses with an ellipsis rather than an
      em-dash, and its second half ("y también el más chiquito") is not a
      standalone sentence. Splitting prose per language is authoring
      without a native panel, which is the thing this file exists not to
      do. So it takes the SIZE reason that is already authored natively
      one grid away, for exactly this attribute. */
const smallReason = target.reasons[2];
if (!smallReason || !smallReason.en || !/only small/i.test(smallReason.en)) {
  console.error('FAIL the size donor is not the small reason: ' + JSON.stringify(smallReason));
  process.exit(1);
}
const missing2 = LOC.filter((l) => !smallReason[l]);
if (missing2.length) { console.error('FAIL size donor lacks: ' + missing2.join(',')); process.exit(1); }
donor.reasons[3] = JSON.parse(JSON.stringify(smallReason));
donor.cells[3] = { t: 'shape', shape: 'triangle', size: 'sm', fill: 'solid' };
const r3 = donor.reasons[3];
const split = LOC.length;

/* the check that matters: no reason in ANY locale still names a colour */
const COLOUR = /purple|violett|viola|morad|roxo|paars|lila|lilla|violetti|pourpre|violet|orange|coral|teal/i;
let leaks = 0;
for (const g of j.grids) {
  for (let i = 0; i < (g.reasons || []).length; i++) {
    const r = g.reasons[i];
    if (!r) continue;
    for (const l of LOC) if (r[l] && COLOUR.test(r[l])) { leaks++; console.error('  LEAK ' + g.id + '[' + i + '].' + l + ': ' + r[l]); }
  }
}
if (leaks) { console.error('FAIL ' + leaks + ' reason(s) still name a colour'); process.exit(1); }

console.log('  k-onlyone[3]      -> outline circle, reason reused verbatim from 23-triangles[0] (11 locales)');
console.log('  23-triangles[3]   -> small solid triangle, colour clause dropped in ' + split + '/11 locales');
console.log('  en now: "' + target.reasons[3].en + '" / "' + r3.en + '"');
console.log('  0 colour references remain in any reason, in any locale');
if (!APPLY) { console.log('\n  (dry run — pass --apply to write)'); process.exit(0); }
fs.writeFileSync(P, JSON.stringify(j, null, 1) + '\n');
console.log('\n  wrote ' + P);
