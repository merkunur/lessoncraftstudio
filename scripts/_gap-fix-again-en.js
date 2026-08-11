/* =====================================================================
   _gap-fix-again-en.js — REVERSING my own English `again` change, which
   made the string LESS TRUE.
   Run:  node scripts/_gap-fix-again-en.js

   ⚠⚠ I CHANGED 'Something else happens' TO 'New marks' ON A SHAPE
   COMPLAINT — that it was the only declarative among four control
   labels — AND IN DOING SO BROKE ITS ACCURACY. Measured: `_again` calls
   `newState()`, which picks a whole scene at random —
       var s = all[Math.floor(Math.random() * all.length)];
       return { n: s.n, k: s.k, m: s.m, phase: 'before', tried: null };
   — so it deals A NEW `n` AND A NEW HIDDEN `k`. 'New marks' names only
   the dots and under-describes the button: a teacher would reasonably
   expect the same hidden change with fresh marks. The Finnish panel
   caught it by reading the model.

   ⚠ AND THE DEFECT THAT TRIGGERED THE CHANGE WAS NEVER THE ENGLISH'S.
   The declarative-among-imperatives complaint was raised per locale and
   each locale fixed its OWN row on its own grammar (nl ships an
   infinitive phrase because its other three are infinitives; pt ruled
   from its own row; fi `Uusi näytös` was already a noun phrase). The
   English row is imperative, so the English keeps BOTH properties here:
   imperative in shape, and naming the whole scene rather than the marks.

   That is the sixth "a repair is not finished when the thing it repaired
   starts working" of this build, and the only one that is mine end to
   end: I propagated a locale-shaped complaint onto the source.

   ⚠ A script file, not `node -e`; node, not Python text mode.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
let src = fs.readFileSync(TOOL, 'utf8');

const FIND = "en: 'New marks'";
const REPL = "en: 'Make something else happen'";

const hits = src.split(FIND).length - 1;
if (hits !== 1) { console.log('⚠ FAULT: needle matched ' + hits + ', expected 1. NOTHING written.'); process.exit(1); }
src = src.replace(FIND, REPL);
fs.writeFileSync(TOOL, src);

delete require.cache[require.resolve(TOOL)];
const S = require(TOOL).strings;
if (S.again.en !== 'Make something else happen') { console.log('✗ VERIFY again = ' + JSON.stringify(S.again.en)); process.exit(1); }

/* ⚠ the accuracy assertion, not just the string: the label must name the
   EVENT, not the marks, because the move changes n AND k. */
if (/^New marks$/.test(S.again.en)) { console.log('✗ still names only the marks'); process.exit(1); }

console.log('PASS — again.en restored to name the whole scene');
['again', 'run', 'clear', 'print'].forEach(function (k) {
  console.log('  ' + k.padEnd(7) + ' = ' + JSON.stringify(S[k].en));
});
