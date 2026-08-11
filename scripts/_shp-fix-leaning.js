/* ⚠⚠ MY OWN REPAIR CREATED A WORSE DEFECT — the seventh time this
   session, and this one an hour after the fix it replaced.

   Removing the banned degree numeral, I wrote "A four-sided shape,
   leaning." It is a CONSTANT, emitted on every paint regardless of
   theta — so at rot=0, theta=90, k=0, the upright square, the aria
   announces that it is leaning. The numeral was MEANINGLESS; this is
   WRONG, and it is wrong in the single most important reachable state
   in the tool.

   ⚠ It also collided with the tool's own lexicon: `skewLabel` IS
   'Lean', so the word asserts a non-zero skew using the very term for
   the skew track — blurring the header's central distinction (a tilt
   and a skew look alike and are not alike) on the one channel where a
   blind user has no picture to correct it from.

   Found independently by the Spanish and French panels. Spanish added
   the generalisation: any locale whose lean-verb shares a root with the
   participle inherits the same false assertion.

   POSE-NEUTRALITY IS THE THEOREM. `_paint` appends the tag line
   immediately after, which carries everything actually true. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'shape-stretcher.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => {
  if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 60));
  if (s.split(a).length - 1 !== 1) throw new Error('NOT UNIQUE: ' + a.slice(0, 60));
  s = s.split(a).join(b);
};
sub("ariaShape3: { en: 'A three-sided shape, leaning.' },", "ariaShape3: { en: 'A three-sided shape.' },");
sub("ariaShape4: { en: 'A four-sided shape, leaning.' },", "ariaShape4: { en: 'A four-sided shape.' },");
fs.writeFileSync(P, s);
delete require.cache[require.resolve(P)];
const T = require(P);
const bad = [];
if (!T.strings.ariaShape3 || !T.strings.ariaShape4) bad.push('NON-VACUITY: strings missing');
if (/lean/i.test(T.strings.ariaShape3.en + T.strings.ariaShape4.en)) bad.push('still asserts a pose');
if (/\{rot\}|degree/i.test(JSON.stringify(T.strings))) bad.push('degree numeral came back');
if (bad.length) { console.log('FAILED:\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('pose assertion removed — the aria now states only what is true in every reachable state');
