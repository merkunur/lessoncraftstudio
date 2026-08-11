/* =====================================================================
   _gap-fix-english3.js — the EIGHTH English defect: `sheetHint` counts
   lines the code does not produce.
   Run:  node scripts/_gap-fix-english3.js

   ⚠ `sheetHint` said "One line for each gap the class watched", and
   `_buildSheet` builds a FIXED SIX:
       for (i = 0; i < 6; i++) { ... 'crt-sh-line' ... }
   Read as DESCRIPTION it is false for any class that watches other than
   six gaps. Read as INSTRUCTION it is fine. The French panel flagged it
   report-only for exactly that ambiguity — so it is rewritten to be
   unambiguously an INSTRUCTION, which is true either way and needs no
   knowledge of the loop bound.

   ⚠ A script file, not `node -e`; node, not Python text mode.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
let src = fs.readFileSync(TOOL, 'utf8');

const FIND = "en: 'One line for each gap the class watched, and the number sentence that goes with it.'";
const REPL = "en: 'Use one line for each gap the class watched, and write the number sentence that goes with it.'";

const hits = src.split(FIND).length - 1;
if (hits !== 1) { console.log('⚠ FAULT: needle matched ' + hits + ' times, expected 1. NOTHING written.'); process.exit(1); }

src = src.replace(FIND, REPL);
fs.writeFileSync(TOOL, src);

delete require.cache[require.resolve(TOOL)];
const S = require(TOOL).strings;
const want = REPL.slice("en: '".length, -1);
if (S.sheetHint.en !== want) { console.log('✗ VERIFY sheetHint = ' + JSON.stringify(S.sheetHint.en)); process.exit(1); }

/* ⚠⚠ NON-VACUITY + THE WHOLE-STRING RE-READ. Four times today a repair
   fixed one clause and left another carrying the same false premise, so
   this asserts the claim is gone from BOTH strings that made it, not
   just from the one this script edited. */
let bad = 0;
['sheetTitle', 'lockedBody', 'sheetHint'].forEach(function (k) {
  if (/the before and the after/i.test(S[k].en)) { console.log('✗ `' + k + '`.en still promises "the before and the after"'); bad++; }
});
if (!/ground as the class watched it/.test(S.sheetTitle.en)) { console.log('✗ sheetTitle lost its corrected wording'); bad++; }
if (!/ground as the class watched it/.test(S.lockedBody.en)) { console.log('✗ lockedBody lost its corrected wording'); bad++; }
if (bad) process.exit(1);

console.log('PASS — sheetHint.en fixed; sheetTitle + lockedBody re-checked whole, not by clause');
console.log('  sheetHint  : ' + S.sheetHint.en);
console.log('  sheetTitle : ' + S.sheetTitle.en);
console.log('  lockedBody : ' + S.lockedBody.en);
