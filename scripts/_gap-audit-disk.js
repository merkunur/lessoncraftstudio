/* =====================================================================
   _gap-audit-disk.js — what is ACTUALLY in `mini tools/the-gap.js` right
   now, per key per locale, compared against `scripts/_the-gap-strings.js`.
   Run:  node scripts/_gap-audit-disk.js

   ⚠ THE FILE IS THE WITNESS. Both a panel and a relay have now given me
   an account of the English in this file that disk refuted, in opposite
   directions on the same day. Nothing here reads a report.
   ===================================================================== */
'use strict';
const path = require('path');
const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
const PANEL = path.join(__dirname, '_the-gap-strings.js');

delete require.cache[require.resolve(TOOL)];
delete require.cache[require.resolve(PANEL)];
const S = require(TOOL).strings;
const P = require(PANEL);

const LOC = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const keys = Object.keys(S);

console.log('tool keys: ' + keys.length);
console.log('');
console.log('--- ENGLISH, as it sits on disk ---');
['again', 'test', 'instruction', 'ariaEnd', 'saidTryOff', 'sheetTitle', 'sheetHint', 'lockedBody'].forEach(function (k) {
  console.log('  ' + k.padEnd(12) + ' = ' + JSON.stringify(S[k].en));
});

console.log('');
console.log('--- TOOL vs PANEL FILE, per key per locale ---');
let drift = 0, compared = 0;
keys.forEach(function (k) {
  LOC.forEach(function (L) {
    if (!P[L] || !(k in P[L])) { console.log('  MISSING in panel: ' + L + '.' + k); drift++; return; }
    compared++;
    if (S[k][L] !== P[L][k]) {
      drift++;
      console.log('  DRIFT ' + L + '.' + k);
      console.log('        tool : ' + JSON.stringify(S[k][L]));
      console.log('        panel: ' + JSON.stringify(P[L][k]));
    }
  });
});
if (!compared) { console.log('  VACUOUS — compared nothing'); process.exit(1); }
console.log('  compared ' + compared + ' values; ' + drift + ' drifted');

/* ⭐ the two strings that make the same promise, in every locale */
console.log('');
console.log('--- the two-band over-promise, per locale (sheetTitle | lockedBody) ---');
LOC.concat(['en']).forEach(function (L) {
  const st = (S.sheetTitle[L] || '');
  const lb = (S.lockedBody[L] || '');
  console.log('  ' + L + ': ' + JSON.stringify(st));
});
