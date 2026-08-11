/* =====================================================================
   _gap-fix-english2.js — the SEVENTH English defect, and the worst of
   them, because it is the one the money is taken on.
   Run:  node scripts/_gap-fix-english2.js

   ⚠⚠ `lockedBody` IS THE PAID PROMISE AND IT WAS FALSE. It sold a sheet
   carrying "the before and the after", but `_buildSheet` reads
       var bands = (s.phase === 'after') ? [s.n, s.m] : [s.n];
   so in phases `before` and `gap` the sheet prints ONE band. A teacher
   who buys the plan on that sentence and prints during setup gets
   exactly what they were told they would not.

   ⭐ AND IT IS THE SHADOW OF AN EARLIER FIX. The phase guard on
   `_buildSheet` was added so a subscriber pressing Print mid-gap could
   not put `m` on the paper before the class had watched. That fix was
   correct — and it made the copy that SELLS the sheet false, because
   nobody re-read the copy afterwards. A repair is not finished when the
   thing it repaired starts working.

   The wording is deliberately aligned with `sheetTitle` so the printed
   artefact and the sales panel describe ONE object, not two.

   ⚠ A script file, not `node -e`; node, not Python text mode.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
let src = fs.readFileSync(TOOL, 'utf8');

const FIND = "en: 'The whole apparatus is free — every gap, the ground, and as many tries as the class wants. A Teacher plan adds the printed sheet, which carries the before and the after the class just watched, and ruled lines for the sentences they wrote.'";
const REPL = "en: 'The whole apparatus is free — every gap, the ground, and as many tries as the class wants. A Teacher plan adds the printed sheet, which carries the ground as the class watched it, and ruled lines for the sentences they wrote.'";

const hits = src.split(FIND).length - 1;
if (hits !== 1) { console.log('⚠ FAULT: needle matched ' + hits + ' times, expected 1. NOTHING written.'); process.exit(1); }

src = src.replace(FIND, REPL);
fs.writeFileSync(TOOL, src);

delete require.cache[require.resolve(TOOL)];
const got = require(TOOL).strings.lockedBody.en;
const want = REPL.slice("en: '".length, -1);
if (got !== want) { console.log('✗ VERIFY lockedBody = ' + JSON.stringify(got)); process.exit(1); }

/* ⚠ non-vacuity: prove the false phrase is gone from the ENGLISH, and
   that we did not merely fail to find it. */
if (/the before and the after/.test(got)) { console.log('✗ the overclaim survives'); process.exit(1); }
console.log('PASS — lockedBody.en fixed and verified on disk');
console.log('  ' + got);
