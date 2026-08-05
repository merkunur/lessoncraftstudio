/* =====================================================================
   poison-part-whole-frame-bans.js — are the content bans the RIGHT width?
   ---------------------------------------------------------------------
   Run:  node scripts/poison-part-whole-frame-bans.js

   ⭐⭐ EVERY BAN IS POISONED IN BOTH DIRECTIONS. A ban that only ever gets
   a MUST_FIRE test is half-tested, and the half that goes untested is the
   half that has repeatedly shipped:

     - the Draw Bag likelihood ban rejected the German panel's OWN name
       `Der Zufallsbeutel`, which is the real Grundschule register;
     - `par` rejected correct French;
     - "how many cubes TALL" is a HEIGHT and got condemned by a height ban;
     - `dessinée en volume` means "drawn in three dimensions" and got
       condemned by a dimension ban.

   A fence that rejects correct native prose does not protect the product.
   It teaches a native panel to write AROUND the gate instead of reporting
   it, and the next defect arrives dressed as compliance.

   ⚠ AND `\b` IS ASCII-ONLY. `\bväärin\b`, `\braté\b` and `\byhteensä\b`
   can never match, so a ban written with it is DEAD in exactly the
   languages it was written for — and testing it on English alone tests it
   in the one language where it happens to work. Every MUST_FIRE case
   below is in the language the ban polices.

   Exit 1 if any ban is too narrow (a MUST_FIRE string slips through) or
   too wide (a MUST_PASS string is condemned).
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');

const GATE = fs.readFileSync(path.join(__dirname, 'verify-part-whole-frame.js'), 'utf8');

/* Rebuild the ban table from the GATE'S OWN SOURCE rather than restating
   it here. A poison script that carries its own copy of the regex tests a
   copy — the recorded "a gate that reimplements the thing it checks is
   testing a copy" lesson, applied to the poison instead of the gate. */
const L = (alts) => new RegExp('(?<!\\p{L})(?:' + alts + ')(?!\\p{L})', 'iu');
const block = /const VERDICT = \{([\s\S]*?)\n\};/.exec(GATE);
if (!block) { console.error('POISON FAULT: could not read the VERDICT table out of the gate'); process.exit(1); }
const VERDICT = {};
const rowRe = /^\s*([a-z]{2}):\s*L\((['`])([\s\S]*?)\2\),?\s*$/gm;
let m;
while ((m = rowRe.exec(block[1]))) VERDICT[m[1]] = L(m[3].replace(/\\\\/g, '\\'));

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const missing = LOCALES.filter((l) => !VERDICT[l]);
if (missing.length) { console.error(`POISON FAULT: no ban parsed for ${missing.join(', ')}`); process.exit(1); }

/* ---------------------------------------------------------------------
   MUST_FIRE — a real verdict, in the language the ban polices. Each is
   sorted by what it MEANS, never by whether it currently passes: the
   recorded Swedish `tum` case was filed under MUST_PASS precisely
   because it happened to pass, and `tum` IS the Swedish inch.
   --------------------------------------------------------------------- */
const MUST_FIRE = [
  ['en', 'Carry one counter across and check you got it right.'],
  ['en', 'That answer is incorrect — try again.'],
  ['en', 'Well done, that is the correct pair!'],
  ['de', 'Das ist leider falsch, versuche es noch einmal.'],
  ['de', 'Richtig! Das Ganze bleibt gleich.'],
  ['fr', 'Ta réponse est fausse, tu as raté cette paire.'],
  ['fr', 'La paire correcte est quatre et deux.'],
  ['it', 'Hai sbagliato: la coppia giusta è quattro e due.'],
  ['es', 'Eso es incorrecto, la pareja correcta es cuatro y dos.'],
  ['pt', 'Está errado — o par correto é quatro e dois.'],
  ['nl', 'Dat is fout, het correcte paar is vier en twee.'],
  ['sv', 'Det blev fel — det korrekta paret är fyra och två.'],
  ['da', 'Det er forkert, det rigtigt svar er fire og to.'],
  ['no', 'Det er feil — det korrekte paret er fire og to.'],
  ['fi', 'Väärin, oikein on neljä ja kaksi.']
];

/* ---------------------------------------------------------------------
   MUST_PASS — correct native classroom prose that a too-wide ban would
   condemn. This list IS the auditable record of every ban width decision,
   with the reason on the line. It is not a convenience: each entry names
   a word that was considered for the ban and deliberately left out.
   --------------------------------------------------------------------- */
const MUST_PASS = [
  /* `right` is a DIRECTION as often as a verdict, and this board has two
     trays side by side. A bare ban would condemn every one of these. */
  ['en', 'Carry one counter to the tray on the right.'],
  ['en', 'The right-hand tray now holds four.'],
  ['en', 'Carry one counter across: a new pair each time — and the same number altogether.'],
  /* de `gut` is "good" and appears in ordinary encouragement that is not
     a verdict on an answer; `richtig` IS banned, `gut` is not. */
  ['de', 'Schaut gut hin: das Ganze bleibt gleich.'],
  ['de', 'Trage ein Plättchen hinüber: jedes Mal ein neues Paar.'],
  /* fr `juste` also means "just/only" — banned only as `correcte` */
  ['fr', 'Il reste juste un jeton dans cette part.'],
  ['fr', 'Fais passer un jeton : une nouvelle paire à chaque fois.'],
  /* it `giusto` is banned; `esatto` in the sense of "exactly the same"
     is ordinary and stays legal */
  ['it', 'Il totale resta esattamente lo stesso.'],
  ['es', 'Pasa una ficha al otro lado: cada vez una pareja nueva.'],
  ['pt', 'Leve uma ficha para o outro lado: de cada vez um par novo.'],
  /* ⚠ nl `goed` is "good" and is one of the commonest words in the
     language — banning it would condemn ordinary classroom Dutch */
  ['nl', 'Kijk goed: het geheel blijft gelijk.'],
  /* ⚠ sv `rätt` also means "rather/quite" and is not a verdict here.
     `korrekt` is banned; `rätt` is not. */
  ['sv', 'Det är rätt många brickor i den här delen.'],
  ['sv', 'Flytta en bricka: varje gång ett nytt par.'],
  /* ⚠ da/no: `rigtigt`/`riktig` ARE banned, but the noun `retning`
     (direction) shares no boundary with them and must survive */
  ['da', 'Flyt en brik i den anden retning.'],
  ['no', 'Flytt en brikke i den andre retningen.'],
  /* ⚠ fi `oikein` is banned as a verdict, but `oikealle` (to the right)
     is a direction and is a different word. This is exactly the case the
     `\\b` bug would have got wrong in both directions. */
  ['fi', 'Siirrä yksi nappula oikealle.'],
  ['fi', 'Siirrä yksi nappula: joka kerta uusi pari — ja aina yhtä monta yhteensä.']
];

let fails = 0;
console.log(`[bans parsed from the gate: ${Object.keys(VERDICT).length} locales]`);

console.log('\n[MUST FIRE — a real verdict must be caught]');
MUST_FIRE.forEach(([loc, s]) => {
  if (VERDICT[loc].test(s)) console.log(`  ok   ${loc}  ${s}`);
  else { fails++; console.error(`  TOO NARROW  ${loc}  slipped through: ${s}`); }
});

console.log('\n[MUST PASS — correct native prose must NOT be condemned]');
MUST_PASS.forEach(([loc, s]) => {
  if (!VERDICT[loc].test(s)) console.log(`  ok   ${loc}  ${s}`);
  else { fails++; console.error(`  TOO WIDE    ${loc}  condemned: ${s}`); }
});

/* ⚠ AND THE BANS MUST BE UNICODE-AWARE AT ALL. A ban written with `\b`
   silently never matches an accented or non-ASCII word, which is a
   failure mode no MUST_FIRE case can distinguish from "the ban is fine"
   if every case happens to be ASCII. Prove the boundary works on a
   non-ASCII word directly. */
console.log('\n[boundary is unicode-aware]');
if (!VERDICT.fi.test('väärin')) { fails++; console.error('  FAIL fi ban cannot match a non-ASCII word — it is written with \\b'); }
else console.log('  ok   fi matches a non-ASCII word');
if (VERDICT.fi.test('väärinkäsitys')) { fails++; console.error('  FAIL fi ban matches inside a longer word — the boundary is not holding'); }
else console.log('  ok   fi does not match inside a longer word');

/* the live strings must themselves pass — the gate asserts this too, but
   an assertion that has never been run against real data has not run */
const TOOL = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'part-whole-frame.js'), 'utf8');
const vm = require('vm');
const box = { console };
box.globalThis = box;
try {
  vm.runInNewContext(TOOL.replace(/^[\s\S]*?(var PartWholeFrame =)/, '$1').replace(/\nfunction injectPartWholeFrameCSS[\s\S]*$/, ''), box);
} catch (e) { /* the CSS injector is stripped; the object literal is what matters */ }
if (box.PartWholeFrame) {
  console.log('\n[the shipped strings pass their own bans]');
  let bad = 0;
  Object.keys(box.PartWholeFrame.strings).forEach((k) => {
    LOCALES.forEach((loc) => {
      const v = box.PartWholeFrame.strings[k][loc];
      if (v && VERDICT[loc].test(v)) { bad++; fails++; console.error(`  FAIL ${k}.${loc} condemned by its own ban: ${v}`); }
    });
  });
  if (!bad) console.log(`  ok   all ${Object.keys(box.PartWholeFrame.strings).length} keys x 11 locales`);
} else {
  fails++; console.error('\n  POISON FAULT: could not load the tool to check the shipped strings');
}

console.log('');
console.log(fails ? `FAIL — ${fails} ban-width problem(s)` : 'PASS — every ban fires on a verdict and spares correct native prose');
process.exit(fails ? 1 : 0);
