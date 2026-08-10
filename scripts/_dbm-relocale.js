/* one-shot: the locale panel revised several strings AFTER the first
   apply, so the tool's keys are already per-locale objects and the
   apply gate's `{ en: X }` anchor no longer matches. This updates the
   per-locale values in place instead of re-expanding them.
   ⚠ It verifies every write landed, because a silent partial rewrite is
   the recorded tool-content.ts defect in a new place. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'doubling-mirror.js');
const S = require(path.join(__dirname, '_doubling-mirror-strings.js'));
const T = require(P);
let s = fs.readFileSync(P, 'utf8');

const LOC = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const q = x => "'" + String(x).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
let changed = 0, missed = [];

Object.keys(T.strings).forEach(function (k) {
  LOC.forEach(function (l) {
    const want = S[l] && S[l][k];
    if (want == null) return;
    const have = T.strings[k][l];
    if (have === want) return;
    /* anchor on the exact existing `<loc>: '<value>'` inside this key's
       object — the value is unique enough, and we verify after */
    if (have == null) { missed.push(k + '.' + l + ' (absent)'); return; }
    const needle = '\n        ' + l + ': ' + q(have);
    if (s.indexOf(needle) < 0) { missed.push(k + '.' + l + ' (anchor)'); return; }
    s = s.replace(needle, '\n        ' + l + ': ' + q(want));
    changed++;
  });
});

if (missed.length) {
  console.log('  ' + missed.length + ' could not be anchored:');
  missed.slice(0, 8).forEach(m => console.log('    ' + m));
}
fs.writeFileSync(P, s);

/* ⚠ VERIFY EVERY WRITE LANDED. A partial rewrite that reports success is
   the tool-content.ts defect, and it has happened twice on this shelf. */
delete require.cache[require.resolve(P)];
const after = require(P);
let bad = 0;
Object.keys(after.strings).forEach(function (k) {
  LOC.forEach(function (l) {
    if (S[l] && S[l][k] != null && after.strings[k][l] !== S[l][k]) {
      bad++; if (bad <= 5) console.log('  MISMATCH ' + k + '.' + l);
    }
  });
});
console.log(changed + ' values updated; ' + (bad ? bad + ' MISMATCHES' : 'all values match the panel file'));
if (bad) process.exit(1);
