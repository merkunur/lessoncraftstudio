/* The Swedish panel found the English violating THIS FILE'S OWN
   refuse-list, four lines apart:

     header line 120  "No degree numeral and no hinge gesture (v5 entry
                       14 owns angle-as-turn)."
     strings :213-214 "A three-sided shape, turned {rot} degrees."

   Every paint announced a degree numeral to a screen-reader user. And it
   is MEANINGLESS BY THE TOOL'S OWN THEOREM — `rot` enters no predicate,
   so the number cannot change anything the child is being asked to
   notice. It is exactly the numeral the tool exists to argue against,
   delivered on the one channel nobody looks at.

   ⚠ No locale could repair it in copy: the applier enforces placeholder
   parity against English, so `{rot}` had to leave the STRING and the
   CALL SITE together.

   Second finding, same panel, re-derived by enumerating the whole space
   against the tool's own predicates: `sayTagsRight` says "square
   cornerS" but the reachable corner counts are n=3 -> exactly 1 and
   n=4 -> exactly 4. One corner announced as plural. The property is
   named instead of counted, which is also what the refuse-list wants
   ("no count of corners"). */
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

sub("      ariaShape3: { en: 'A three-sided shape, turned {rot} degrees.' },\n" +
    "      ariaShape4: { en: 'A four-sided shape, turned {rot} degrees.' },",
  "      /* ⚠ NO DEGREE NUMERAL — this file's own refuse-list, line 120,\n" +
  "         and the numeral was meaningless anyway because `rot` enters no\n" +
  "         predicate. Found by the Swedish panel reading the model. */\n" +
  "      ariaShape3: { en: 'A three-sided shape, leaning.' },\n" +
  "      ariaShape4: { en: 'A four-sided shape, leaning.' },");

sub("      sayTagsRight: { en: 'One tag is holding: square corners.' },",
  "      /* ⚠ was \"square cornerS\" — the reachable counts are exactly 1\n" +
  "         (n=3) and exactly 4 (n=4), so the plural was false half the\n" +
  "         time. Name the property, never count the corners. */\n" +
  "      sayTagsRight: { en: 'One tag is holding: the shape is right-angled.' },");

sub("        this._fmt(t(s.n === 4 ? 'ariaShape4' : 'ariaShape3'), { rot: s.rot }) + ' ' + t(key) +",
    "        t(s.n === 4 ? 'ariaShape4' : 'ariaShape3') + ' ' + t(key) +");

fs.writeFileSync(P, s);

delete require.cache[require.resolve(P)];
const T = require(P);
const bad = [];
/* non-vacuity first: the strings exist at all */
if (!T.strings.ariaShape3 || !T.strings.ariaShape4) bad.push('NON-VACUITY: aria strings missing');
if (/\{rot\}/.test(JSON.stringify(T.strings))) bad.push('{rot} still present in a string');
if (/degrees/.test(JSON.stringify(T.strings))) bad.push('a degree word still present');
if (/corners/.test(T.strings.sayTagsRight.en)) bad.push('sayTagsRight still counts corners');
if (fs.readFileSync(P, 'utf8').indexOf('{ rot: s.rot }') >= 0) bad.push('call site still passes rot');
if (bad.length) { console.log('FAILED:\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('degree numeral removed from strings AND call site; sayTagsRight names the property instead of counting corners');
