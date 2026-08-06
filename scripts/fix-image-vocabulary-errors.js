/**
 * Fix 71 special character errors in image-vocabulary-raw.json
 * across 10 languages (fi, sv, da, no, fr, es, pt, de, it, nl)
 */

const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, 'v2-data', 'image-vocabulary-raw.json');
const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

// All 71 corrections keyed by [image-key][locale] = correct value
const fixes = {
  // ============================================================
  // FINNISH (fi) — 11 errors
  // ============================================================
  'traffic-cone':   { fi: 'Liikennekartio' },      // Cyrillic о → Latin o
  'snake':          { fi: 'K\u00e4\u00e4rme' },     // Käärme (missing ä)
  'uncle-sam':      { fi: 'Set\u00e4 Sam' },         // Setä Sam (missing ä)
  'vacuum-cleaner': { fi: 'P\u00f6lynimuri' },       // Pölynimuri (missing ö)
  'handbag':        { fi: 'K\u00e4silaukku' },        // Käsilaukku (kassi→käsi)
  'lime':           { fi: 'Limetti' },                // Limetti (fruit, not color)
  'morning-glory':  { fi: 'Purppurakierto', nl: 'Winde' }, // fi: wrong flower; nl: dagbloem is made-up
  'trowel':         { fi: 'Muurauslasta' },           // laasti=mortar, not the tool
  'cookie-sheet':   { fi: 'Leivinpelti' },            // Keksileivin is malformed
  'hornbill':       { fi: 'Sarvinokkalintu', no: 'Nesehornsfugl' }, // fi: rhinoceros→horn+beak; no: Danish næse→Norwegian nese
  'skeptical':      { fi: 'Ep\u00e4ilev\u00e4' },    // Epäilevä (spurious -inen suffix)

  // ============================================================
  // SWEDISH (sv) — 7 errors
  // ============================================================
  'bowl':           { sv: 'Sk\u00e5l', da: 'Sk\u00e5l' },    // Skål (missing å in both sv and da)
  'cake':           { sv: 'T\u00e5rta' },              // Tårta (missing å)
  'crow':           { sv: 'Kr\u00e5ka' },              // Kråka (missing å)
  'painting':       { sv: 'M\u00e5la' },               // Måla (missing å)
  'wallet':         { sv: 'Pl\u00e5nbok' },            // Plånbok (missing å)
  'armadillo':      { sv: 'B\u00e4ltdjur' },           // Bältdjur (not a standard word)
  'hot-dog':        { sv: 'Korv med br\u00f6d' },      // lowercase bröd

  // ============================================================
  // DANISH (da) — 15 errors (bowl already handled above)
  // ============================================================
  'dryer':          { da: 'T\u00f8rretumbler' },       // Tørretumbler (missing ø)
  'handbag':        { fi: 'K\u00e4silaukku', da: 'H\u00e5ndtaske' }, // da: missing å (fi already set above, merge)
  'ladybug':        { da: 'Marieh\u00f8ne', no: 'Marih\u00f8ne' },  // missing ø in both
  'parrot':         { da: 'Papeg\u00f8je', no: 'Papeg\u00f8ye' },   // da: missing ø; no: missing ø + wrong ending
  'toothbrush':     { da: 'Tandb\u00f8rste', no: 'Tannb\u00f8rste' }, // missing ø in both
  'ironing-board':  { da: 'Strygeb\u00e6t' },          // Strygebræt (missing 'e') — wait, bræt has æ
  'banana-tree':    { da: 'Banantr\u00e6' },            // Banantræ (missing "tree" part)
  'eight-ball':     { da: 'Ottebold' },                 // Otter→Otte (otter=animal, otte=eight)
  'lifeguard-tower':{ da: 'Livredder\u00e5rn' },       // wait — should be Livreddertårn
  'porcupine':      { da: 'Hulepindsvin' },             // Distinguish from hedgehog
  'slug':           { da: 'Skovsnegl', no: 'Nakensnegle', it: 'Limaccia' }, // Distinguish from snail
  'pretzels':       { da: 'Kringler' },                 // Plural form
  'lemonade':       { da: 'Limonade' },                 // Danish spelling uses 'i'
  'snowboarding':   { da: 'Snowboarding' },             // Activity, not just noun

  // ============================================================
  // NORWEGIAN (no) — 13 errors (ladybug, parrot, toothbrush, hornbill, slug already handled)
  // ============================================================
  'plunger':        { no: 'Sugekopp' },                 // stoppeklokke=stopwatch, completely wrong
  'weasel':         { no: 'Sn\u00f8mus' },              // Snømus (røyskatt=stoat/ermine)
  'satellite':      { no: 'Satellitt' },                 // Missing 'l'
  'snowsuit':       { no: 'Sn\u00f8drakt' },            // Snødrakt (Danish sne→Norwegian snø)
  'double-decker-bus': { no: 'Dobbeltdekkerbuss' },      // Missing 't'
  'bored':          { no: 'Lei' },                       // Nynorsk kjeda→Bokmål lei
  'tired':          { no: 'Trett' },                     // Nynorsk/Swedish trøtt→Bokmål trett
  'peeler':         { no: 'Skreller' },                  // Verb skrell→noun skreller
  // slug already handled above with da fix

  // ============================================================
  // FRENCH (fr) — 9 errors
  // ============================================================
  'baking':         { fr: 'P\u00e2tisserie', pt: 'Assar' },  // fr: missing â; pt: cozinhar=cook, not bake
  'chess':          { fr: '\u00c9checs' },               // Échecs (missing É)
  'football':       { fr: 'Football am\u00e9ricain', es: 'F\u00fatbol americano' }, // fr: missing é; es: missing ú
  'bow-tie':        { fr: 'N\u0153ud papillon', es: 'Corbata de mo\u00f1o' },  // fr: missing œ; es: mono→moño
  'mailbox':        { fr: 'Bo\u00eete aux lettres' },    // Boîte (missing î)
  'us':             { fr: '\u00c9tats-Unis' },           // États-Unis (missing É)
  'penguin':        { fr: 'Manchot' },                   // pingouin=auk, manchot=penguin
  'centipede':      { fr: 'Scolopendre' },               // Centipède not standard French
  'gopher':         { fr: 'Spermophile', nl: 'Wangzakrat', it: 'Citello' }, // fr: gaufre=waffle; nl: ground squirrel≠gopher; it: untranslated

  // ============================================================
  // SPANISH (es) — 8 errors (football, bow-tie already handled above)
  // ============================================================
  'belt':           { es: 'Cintur\u00f3n' },             // Cinturón (missing accent)
  'baseball':       { es: 'B\u00e9isbol' },              // Béisbol (missing accent)
  'basketball':     { es: 'B\u00e1squetbol' },           // Básquetbol (missing accent)
  'high-heeled-shoes': { es: 'Zapatos de tac\u00f3n' },  // tacón (missing accent)
  'cinnamon-roll':  { es: 'Rollo de canela' },            // rol=role, rollo=roll
  'garage':         { es: 'Garaje' },                     // Spanish spelling uses -je

  // ============================================================
  // PORTUGUESE (pt) — 12 errors (baking already handled above)
  // ============================================================
  'shovel':         { pt: 'P\u00e1' },                    // Pá (missing accent)
  'floor-lamp':     { pt: 'Lumin\u00e1ria de piso' },     // Luminária (missing accent)
  'dishwasher':     { pt: 'Lava-lou\u00e7as' },           // Lava-louças (missing cedilla)
  'bulldozer':      { pt: 'Buld\u00f4zer' },              // Buldôzer (escavadeira=excavator)
  'snowdrop':       { pt: 'Flor-de-neve' },               // floco-de-neve=snowflake
  'hedgehog':       { pt: 'Ouri\u00e7o' },                // Ouriço (porco-espinho=porcupine duplicate)
  'frog':           { pt: 'R\u00e3' },                     // Rã (sapo=toad, duplicate)
  'mitten':         { pt: 'Mitene', de: 'F\u00e4ustling' }, // pt: sem dedos=fingerless; de: missing umlaut
  'cooler':         { pt: 'Caixa t\u00e9rmica' },          // Caixa térmica (untranslated loanword)
  'timer':          { pt: 'Temporizador' },                 // Untranslated loanword
  'gerbil':         { pt: 'Gerbo' },                        // Untranslated loanword

  // ============================================================
  // ITALIAN (it) — 6 errors (slug, gopher already handled above)
  // ============================================================
  'milkshake':      { it: 'Frapp\u00e9' },                // Frappé (grave→acute accent)
  'stingray':       { it: 'Trigone' },                      // Pastinaca=parsnip duplicate
  'excited':        { it: 'Entusiasta' },                   // Eccitato has sexual connotation
  'eclair':         { it: '\u00c9clair' },                  // Éclair (missing accent)

  // ============================================================
  // DUTCH (nl) — 6 errors (morning-glory, gopher already handled above)
  // ============================================================
  'baby-girl':      { nl: 'Babymeisje' },                  // Compound word spacing
  "baby's-onesie":  { nl: 'Babyromper' },                  // Unnecessary hyphen
  'shuttlecock':    { nl: 'Pluimbal' },                     // Dutch native term
  'squash':         { nl: 'Squash' },                       // Duplicate with pumpkin (pompoen)
};

// Now we need to handle the lifeguard-tower fix properly
// The plan says Livreddertårn (compound word)
// Let me fix it directly:
fixes['lifeguard-tower'] = { da: 'Livredder\u0074\u00e5rn' };
// Actually that's "Livreddertårn" with tårn. Let me just spell it out:
// t + å + r + n = tårn. In the fix above I used \u00e5 for å
// Wait, I had: { da: 'Livredder\u00e5rn' } — that's Livredderårnm missing 't'
// Let me fix:
fixes['lifeguard-tower'] = { da: 'Livreddert\u00e5rn' };

// Also fix ironing-board — Strygebræt
// Current is "Strygbræt" (missing 'e'). Correct is "Strygebræt"
// bræt uses æ (\u00e6): Strygebr\u00e6t
fixes['ironing-board'] = { da: 'Strygebr\u00e6t' };

// ============================================================
// APPLY FIXES
// ============================================================

let fixCount = 0;
let errorCount = 0;
const changes = [];

for (const [key, localeFixes] of Object.entries(fixes)) {
  if (!raw[key]) {
    console.error(`ERROR: Key "${key}" not found in raw data!`);
    errorCount++;
    continue;
  }

  for (const [locale, correctValue] of Object.entries(localeFixes)) {
    const oldValue = raw[key][locale];
    if (oldValue === correctValue) {
      console.log(`SKIP: ${key}.${locale} already correct: "${correctValue}"`);
      continue;
    }
    if (oldValue === undefined) {
      console.error(`ERROR: ${key}.${locale} does not exist in raw data!`);
      errorCount++;
      continue;
    }

    raw[key][locale] = correctValue;
    changes.push({ key, locale, old: oldValue, new: correctValue });
    fixCount++;
  }
}

// Write fixed JSON
fs.writeFileSync(rawPath, JSON.stringify(raw, null, 2) + '\n', 'utf8');

// Print summary
console.log('\n========================================');
console.log(`FIXES APPLIED: ${fixCount}`);
console.log(`ERRORS: ${errorCount}`);
console.log('========================================\n');

// Print all changes
for (const c of changes) {
  console.log(`${c.key}.${c.locale}: "${c.old}" → "${c.new}"`);
}

// Verify no Cyrillic characters remain in the file
const content = fs.readFileSync(rawPath, 'utf8');
const cyrillicRegex = /[\u0400-\u04FF]/g;
const cyrillicMatches = content.match(cyrillicRegex);
if (cyrillicMatches) {
  console.log(`\nWARNING: ${cyrillicMatches.length} Cyrillic character(s) still found!`);
  // Find which entries have them
  for (const [key, entry] of Object.entries(raw)) {
    for (const [locale, value] of Object.entries(entry)) {
      if (locale.startsWith('_')) continue;
      if (typeof value === 'string' && cyrillicRegex.test(value)) {
        cyrillicRegex.lastIndex = 0;
        console.log(`  Cyrillic in ${key}.${locale}: "${value}"`);
      }
    }
  }
} else {
  console.log('\nNo Cyrillic characters found — clean!');
}

console.log('\nDone. Now run: node scripts/build-image-vocabulary.js');
