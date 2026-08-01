/* =====================================================================
   apply-build-plan-locales.js — write the strings block from SoT
   ---------------------------------------------------------------------
   Run:  node scripts/apply-build-plan-locales.js [--dry-run]

   Rewrites the whole `strings: { … }` block in `mini tools/build-plan.js`
   from `scripts/_build-plan-strings.js`. Idempotent.

   ⚠ IT REFUSES TO WRITE rather than ship a defect:
     · a missing or empty key in any locale
     · a key present in one locale and absent in another
     · a non-EN string identical to the English (an untranslated leak)
     · a string that ASKS FOR A TOTAL (volume — 5.MD.C, and G3-346's
       question, not this tool's)
     · a string that counts AREA (3.MD.C.5/6 is taken)
     · a string that NAMES A SOLID or a net (K.G.A.3 is taken in all
       eleven locales)
     · ⭐ a string that gives THE CUBES A NAME — the census found no
       free cube word in any locale, so they stay geometry
     · a verdict, a score, a timer
     · a digit where a placeholder belongs, or a lost placeholder

   ⭐⭐ ONE FENCE IS DELIBERATELY *NOT* A WORD-BAN, AND SAYING SO MATTERS.
   The line between this tool and `G3-346-volume-unit-cubes` is that the
   printable ASKS FOR A TOTAL and this tool never asks anything. A regex
   over the copy cannot enforce that — a teacher could phrase the
   forbidden question in a hundred ways, and a ban wide enough to catch
   them all would condemn "how many cubes TALL", which is the tool's own
   subject. What actually holds the line is BEHAVIOURAL: no input, no
   keypad, no check, no answer taken. `verify-build-plan.js` asserts
   that, and it is the real boundary. The bans below catch the blunt
   cases only, and they are honest about it.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const SoT = require('./_build-plan-strings.js');
const TOOL = path.join(__dirname, '..', 'mini tools', 'build-plan.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.indexOf('--dry-run') > -1;

/* ⚠ THE KEY SET IS READ OFF THE TOOL, NOT HAND-LISTED. A hand-list
   silently drops a key the tool actually renders, and a completeness
   check covering a SUBSET of the required fields is worse than none
   because it CERTIFIES (#42 shipped five of eight ToolEntry fields past
   two such guards). */
const TOOL_MODEL = require(TOOL);
const ORDER = Object.keys(TOOL_MODEL.strings);
if (ORDER.length < 15) {
  console.error(`REFUSED: only ${ORDER.length} string keys parsed off the tool — this gate would be hollow`);
  process.exit(1);
}

/* ---------------------------------------------------------------------
   EVERY BAN IS POISON-TESTED IN BOTH DIRECTIONS BEFORE IT JUDGES REAL
   COPY. This program has bought the ban-too-wide defect six times now
   — a ban shown only to FIRE has not been tested. Each MUST_PASS below
   is real prose this tool needs.
   ------------------------------------------------------------------- */
/* ⚠⚠ EVERY BAN USES UNICODE LOOKAROUNDS, NEVER `\b`.
   JS `\b` is ASCII-only: it cannot see a boundary next to an accented
   letter, so `\byhteensä\b` and `\bárea\b` CAN NEVER MATCH. That defect
   is recorded from #43 — where `/\bsnö\b/` left the Swedish weather ban
   dead — and I wrote it again from scratch here. The poison run caught
   it because each ban carries must-FIRE examples in the languages it is
   supposed to police, not only in English. A ban tested only on English
   is a ban tested in the one language where `\b` happens to work.
   `w()` wraps a stem so it matches a whole word in any script. */
const w = (body) => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');

const BANS = [
  {
    name: 'total',
    re: w('volumen?|volume|altogether|total|totalt|totale|tutto|insgesamt|zusammen|totaal|sammanlagt|yhteensä|yhteensa|alt'),
    fire: ['how many cubes altogether', 'wie viele Würfel insgesamt', 'hoeveel in totaal',
      'hur många sammanlagt', 'kuinka monta yhteensä', 'combien au total', 'cuántos en total',
      'quantos no total', 'quanti in tutto', 'the volume of the box'],
    pass: ['that is how many cubes tall it is', 'so hoch ist der Turm an dieser Stelle',
      'schrijf een getal in elk vakje', 'skriv ett tal i varje ruta', 'kirjoita luku joka ruutuun',
      'trois de haut', 'tres de alto', 'três de altura', 'tre di altezza']
  },
  {
    name: 'area',
    re: w('area|arean|areor|areaa|área|áreas|fläche|flache|oppervlakte|oppervlak|areal|arealet|pinta-ala|pinta-alan|aire|aires'),
    fire: ['work out the area', 'die Fläche berechnen', 'bereken de oppervlakte', 'räkna ut arean',
      'laske pinta-ala', "calcule l'aire", 'calcula el área'],
    pass: ['turn it a quarter turn', 'dreh es eine Vierteldrehung', 'draai het een kwartslag',
      'vrid det ett kvarts varv', 'käännä neljänneskierros']
  },
  {
    name: 'solid-or-net',
    re: w('sphere|cylinder|cylindre|cilindro|cilinder|sylinteri|sylinder|zylinder|cone|cono|cône|kegel|kegle|kartio|pyramid|pyramide|pyramidi|piramide|pirámide|prism|prisma|prisme|kugel|bol|klot|pallo|kule|unfold|unfolds|unfolded|netz|uitslag'),
    fire: ['name the solid: a cone or a cylinder', 'ist das eine Kugel oder ein Zylinder',
      'is het een bol of een kegel', 'är det ett klot eller en cylinder', 'onko se pallo vai sylinteri',
      'unfold the net'],
    pass: ['the building is the same one', 'das Bauwerk bleibt dasselbe', 'het bouwwerk blijft hetzelfde',
      'bygget är detsamma', 'sama rakennus']
  },
  {
    name: 'verdict',
    /* ⚠ two shapes, joined: whole-word stems that must respect accents,
       plus a few fixed PHRASES that are not single words at all. A
       lookaround cannot wrap a phrase containing a space and a bang. */
    re: new RegExp(
      '(?<!\\p{L})(?:score|streak|timer|punkte|punkter|punktar|poeng|pisteet|pisteitä)(?!\\p{L})'
      + '|correct!|well done|richtig!|goed zo|rätt svar|oikein!|bravo!|muy bien!', 'iu'),
    fire: ['well done, that is correct!', 'richtig! 5 Punkte', 'goed zo!', 'rätt svar', 'oikein!'],
    pass: ['ask the class to picture one before you show it', 'lass die Klasse erst raten',
      'laat de klas eerst raden', 'låt klassen gissa först', 'anna luokan arvata ensin']
  }
];

/* ⭐ THE CUBES GET NO NAME. The census found the cube word owned four
   times over in every locale — the weighing unit, the 3-D shape
   vocabulary, the place-value unit, and (de/sv/da/no) the DICE mode of
   another tool. So a string may DESCRIBE the material, but no string
   may christen it. This ban is narrow on purpose: it catches the
   definite-article naming pattern, not every mention of a cube. */
const NAMES_THE_CUBES = new RegExp(
  '(?<!\\p{L})(?:the|der|die|das|de|het|den|le|la|el|il|lo|los|las|i|gli)\\s+'
  + '(?:cubes?|würfel|wurfel|kubus|kuber|kuben|kub|terningen|terninger|terning|'
  + 'kuutio|kuutiot|cubo|cubos|cubetto|cubetti|cubinho|cubinhos)(?!\\p{L})', 'iu');

let bad = 0;
const refuse = (m) => { console.error('  REFUSED: ' + m); bad++; };

/* ---- poison every ban, both directions, BEFORE judging anything ---- */
console.log('\n[poison] every ban, both directions');
for (const b of BANS) {
  let f = 0, p = 0;
  for (const s of b.fire) if (b.re.test(s)) f++; else console.error(`  POISON GAP [${b.name}] should FIRE: ${JSON.stringify(s)}`);
  for (const s of b.pass) if (!b.re.test(s)) p++; else console.error(`  POISON GAP [${b.name}] should PASS: ${JSON.stringify(s)}`);
  if (f !== b.fire.length || p !== b.pass.length) bad++;
  console.log(`  poison [${b.name}]: fires ${f}/${b.fire.length}, clears ${p}/${b.pass.length}`);
}
{
  const fire = ['the cubes are orange', 'die Würfel sind orange', 'de kubus is oranje'];
  const pass = ['write a number in each square', 'height 3', 'the building follows',
    'das Bauwerk folgt', 'skriv ett tal i varje ruta'];
  let f = 0, p = 0;
  for (const s of fire) if (NAMES_THE_CUBES.test(s)) f++; else console.error(`  POISON GAP [cube-name] should FIRE: ${JSON.stringify(s)}`);
  for (const s of pass) if (!NAMES_THE_CUBES.test(s)) p++; else console.error(`  POISON GAP [cube-name] should PASS: ${JSON.stringify(s)}`);
  if (f !== fire.length || p !== pass.length) bad++;
  console.log(`  poison [cube-name]: fires ${f}/${fire.length}, clears ${p}/${pass.length}`);
}
if (bad) { console.error('\nFAIL — a ban is not trustworthy; nothing was written'); process.exit(1); }

/* ---- validate the SoT ------------------------------------------- */
console.log('');
for (const loc of LOCALES) {
  const set = SoT[loc];
  if (!set) { refuse(`${loc} is missing entirely`); continue; }
  const extra = Object.keys(set).filter((k) => ORDER.indexOf(k) < 0);
  if (extra.length) refuse(`${loc} has keys not in ORDER: ${extra.join(', ')}`);
  for (const k of ORDER) {
    const v = set[k];
    if (typeof v !== 'string' || !v.trim()) { refuse(`${loc}.${k} is missing or empty`); continue; }
    if (loc !== 'en' && v === SoT.en[k]) refuse(`${loc}.${k} is identical to English — an untranslated leak`);
    for (const b of BANS) if (b.re.test(v)) refuse(`${loc}.${k} trips the ${b.name} ban: ${JSON.stringify(v.slice(0, 70))}`);
    if (NAMES_THE_CUBES.test(v)) refuse(`${loc}.${k} NAMES THE CUBES — the census left no free cube word: ${JSON.stringify(v.slice(0, 70))}`);
    /* placeholders must survive the rebuild */
    for (const ph of ['{r}', '{c}', '{v}']) {
      if (SoT.en[k].indexOf(ph) >= 0 && v.indexOf(ph) < 0) refuse(`${loc}.${k} LOST the ${ph} placeholder`);
      if (SoT.en[k].indexOf(ph) < 0 && v.indexOf(ph) >= 0) refuse(`${loc}.${k} INVENTED a ${ph} placeholder`);
    }
    if (/[ --]/.test(v)) refuse(`${loc}.${k} carries an invisible control character`);
  }
}
if (bad) { console.error(`\nFAIL — ${bad} problem(s); the tool was NOT written`); process.exit(1); }
console.log(`  validated ${LOCALES.length} locales × ${ORDER.length} keys`);

/* ---- rewrite the block ------------------------------------------- */
const src = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
const START = '    strings: {';
const a = src.indexOf(START);
if (a < 0) { console.error('REFUSED: the strings block was not found'); process.exit(1); }
/* the block ends at the first line that is exactly four spaces + }, */
const end = src.indexOf('\n    },\n', a);
if (end < 0) { console.error('REFUSED: the end of the strings block was not found'); process.exit(1); }

const pad = Math.max.apply(null, ORDER.map((k) => k.length));
const lines = ORDER.map((k) => {
  const per = LOCALES.map((l) => `${l}: ${JSON.stringify(SoT[l][k])}`).join(', ');
  return `      ${k}:${' '.repeat(pad - k.length + 1)}{ ${per} }`;
});
const block = START + '\n' + lines.join(',\n') + '\n    },\n';
const out = src.slice(0, a) + block + src.slice(end + '\n    },\n'.length);

if (DRY) {
  console.log(`\nDRY RUN — would write ${ORDER.length} keys × ${LOCALES.length} locales; nothing was written`);
  process.exit(0);
}
fs.writeFileSync(TOOL, out, 'utf8');
console.log(`\n  wrote ${ORDER.length} keys × ${LOCALES.length} locales into mini tools/build-plan.js`);
