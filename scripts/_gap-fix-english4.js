/* =====================================================================
   _gap-fix-english4.js — the NINTH English defect: `again` is a
   declarative sentence sitting on a control.
   Run:  node scripts/_gap-fix-english4.js

   ⚠ `again` is a BUTTON LABEL — `_mk(row, 'crt-b-again', '↻', 'again')`
   renders it into `<span class="crt-label">`. Its three siblings are all
   verb phrases naming what the control DOES ('Show the gap', 'Clear the
   try', 'Print the sheet'); `again` read 'Something else happens', which
   describes an EVENT and names no action. Pressing it deals a new scene.

   ⚠ THE REPLACEMENT IS THE ONE THE TEN PANELS WERE ASKED TO RULE ON.
   'New marks' was put to all ten before they answered, so their verdicts
   are verdicts on THIS string. Substituting a different English now —
   however much more parallel — would silently invalidate ten native
   rulings, which is the whole failure mode this file keeps recording.
   Several locales had already reached the same shape independently
   (da 'Nye kastanjer', no 'Nye punkt på bakken', es 'Empezar con otras
   marcas'), so the English is converging on them rather than the other
   way round.

   ⚠ A script file, not `node -e`; node, not Python text mode.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
let src = fs.readFileSync(TOOL, 'utf8');

const FIND = "en: 'Something else happens'";
const REPL = "en: 'New marks'";

const hits = src.split(FIND).length - 1;
if (hits !== 1) { console.log('⚠ FAULT: needle matched ' + hits + ' times, expected 1. NOTHING written.'); process.exit(1); }

src = src.replace(FIND, REPL);
fs.writeFileSync(TOOL, src);

delete require.cache[require.resolve(TOOL)];
const S = require(TOOL).strings;
if (S.again.en !== 'New marks') { console.log('✗ VERIFY again = ' + JSON.stringify(S.again.en)); process.exit(1); }

/* ⚠ non-vacuity + the whole-file re-read: prove the declarative is gone
   from the ENGLISH of every control label, not just the one edited. */
let bad = 0;
['again', 'run', 'clear', 'print'].forEach(function (k) {
  if (/happens/i.test(S[k].en)) { console.log('✗ control `' + k + '` still describes an event: ' + JSON.stringify(S[k].en)); bad++; }
});
if (bad) process.exit(1);

console.log('PASS — again.en fixed and verified on disk');
['again', 'run', 'clear', 'print'].forEach(function (k) {
  console.log('  ' + k.padEnd(7) + ' = ' + JSON.stringify(S[k].en));
});
