/* =====================================================================
   apply-number-line-locales.js
   ---------------------------------------------------------------------
   Run:  node scripts/apply-number-line-locales.js [--dry-run]

   Rewrites the ENTIRE `strings:` block of `mini tools/number-line.js`
   from `scripts/_number-line-strings.js`, which is the SoT.

   ⚠ It VALIDATES BEFORE IT WRITES, and it refuses on:
     · a key in the tool that the SoT does not carry, or vice versa
     · a missing (key, locale) pair
     · an empty or whitespace-only value
     · a straight apostrophe where a typographic one belongs
     · a hyphen standing in for a minus
     · `hoppen` or `hoppene` ANYWHERE in da/no — `en hoppe` is A MARE, so
       those are "the mare" / "the mares" and must never reach a
       seven-year-old. This is the `banan`-class trap of this build.
     · `hyppy*` in fi — that noun is `open-number-line`'s shipped Finnish
       TITLE (`Piirrä hypyt`), so it is a sibling's name.
   ⚠ Every ban below is POISON-TESTED IN BOTH DIRECTIONS before a single
   file is read, because a ban that has never been shown to fire is a
   claim, and one that has never been shown to PASS correct prose is the
   recorded defect that teaches a panel to reword around it.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const { ORDER, LOCALES, STRINGS } = require('./_number-line-strings.js');

const TOOL = path.join(__dirname, '..', 'mini tools', 'number-line.js');
const DRY = process.argv.indexOf('--dry-run') >= 0;

let bad = 0;
const err = (m) => { bad++; console.error('  REFUSE  ' + m); };

/* ---- the bans, as (name, regex, mustFire, mustPass) ------------------ */
const W = (s) => new RegExp('(?<!\\p{L})' + s + '(?!\\p{L})', 'iu');
const BANS = [
  /* ⚠⚠ THE MARE, SPLIT PER LANGUAGE BECAUSE THE GRAMMAR IS NOT THE SAME.
     `en hoppe` is a mare.
       da — def sg `hoppen` collides. `hoppene` does NOT: the mare's
            plural is `hopperne`, so `hoppene` is the ordinary plural of
            neuter `hop` and is correct Danish.
       no — def sg `hoppen` AND def pl `hoppene` both collide.
       sv — NEITHER, and Swedish is deliberately out of scope: `ett hopp`
            is neuter, so `hoppen` is its definite plural, "the hops".
            An unscoped version of this ban failed correct Swedish on
            production. */
  {
    name: 'da: "hoppen" is THE MARE',
    locales: ['da'],
    re: /(?<!\p{L})hoppen(?!\p{L})/iu,
    mustFire: ['Se på hoppen'],
    mustPass: ['Hvert hop er lige langt', 'Det gik lige op', 'Træk i hoppet',
      'Alle hoppene er lige lange']
  },
  {
    name: 'no: "hoppen"/"hoppene" is THE MARE',
    locales: ['no'],
    re: /(?<!\p{L})hoppene?(?!\p{L})/iu,
    mustFire: ['Se på hoppen', 'forsvinner hoppene som allerede er tegnet'],
    mustPass: ['Hvert hopp er like langt', 'Det gikk akkurat opp', 'Dra i hoppet']
  },
  {
    name: 'fi: "hyppy" is a sibling\'s shipped title',
    locales: ['fi'],
    re: /(?<!\p{L})hyppy\p{L}*/iu,
    mustFire: ['Paina Hyppy', 'jokainen hyppy on yhtä pitkä'],
    mustPass: ['Jokainen loikka on yhtä pitkä', 'Vedä loikkaa', 'Lukusuora']
  },
  {
    name: 'all: verdict vocabulary',
    locales: LOCALES,
    re: new RegExp([
      'correct', 'wrong', 'well done', 'score', 'richtig', 'falsch', 'punkte',
      'correcto', 'incorrecto', 'puntos', 'correto', 'errado', 'pontos',
      'bravo', 'corretto', 'sbagliato', 'punteggio', 'goed zo', 'fout',
      'rätt', 'poäng', 'rigtigt', 'forkert', 'riktig', 'feil', 'poeng',
      'oikein', 'väärin', 'pisteet'
    ].map((s) => '(?<!\\p{L})' + s + '(?!\\p{L})').join('|'), 'iu'),
    mustFire: ['Das ist richtig!', 'Well done!', 'Oikein!', 'Din poäng: 4', 'Muito bem, correto!'],
    /* ⚠ MUST PASS: the subject word in every language, and the two
       phrases a ban on "even"/"exact" would wrongly condemn. */
    mustPass: [
      'Jeder Sprung ist gleich lang', 'Hyppy on aina yhtä pitkä',
      'Les bonds tombent juste : il ne reste rien', 'Det gick jämnt ut',
      'De sprongen zijn even lang', 'Os saltos deram certinho',
      'Loikat menivät tasan', 'Det gikk akkurat opp'
    ]
  }
];

/* ⭐ POISON FIRST. If a ban cannot be shown to work, it is not a ban. */
for (const b of BANS) {
  for (const s of b.mustFire) if (!b.re.test(s)) err('POISON: "' + b.name + '" did NOT fire on "' + s + '"');
  for (const s of b.mustPass) if (b.re.test(s)) err('POISON: "' + b.name + '" wrongly fired on "' + s + '"');
}
if (bad) { console.error('\nFATAL: the bans are not trustworthy. Nothing written.'); process.exit(1); }
console.log('  ok  ' + BANS.length + ' bans poison-tested in both directions');

/* ---- validate the SoT ------------------------------------------------- */
const keys = Object.keys(STRINGS);
if (keys.length !== ORDER.length) err('ORDER has ' + ORDER.length + ' keys, STRINGS has ' + keys.length);
for (const k of ORDER) if (!STRINGS[k]) err('ORDER names a key STRINGS does not carry: ' + k);
for (const k of keys) if (ORDER.indexOf(k) < 0) err('STRINGS carries a key ORDER does not name: ' + k);

for (const k of ORDER) {
  for (const loc of LOCALES) {
    const v = STRINGS[k] && STRINGS[k][loc];
    if (typeof v !== 'string' || !v.trim()) { err('empty or missing ' + k + '.' + loc); continue; }
    if (/'/.test(v)) err('straight apostrophe in ' + k + '.' + loc + ' — use ’');
    if (/\s-\d/.test(v)) err('hyphen used as a minus in ' + k + '.' + loc);
    for (const b of BANS) {
      if (b.locales.indexOf(loc) < 0) continue;
      if (b.re.test(v)) err(b.name + ' -> ' + k + '.' + loc + ': "' + v.slice(0, 60) + '"');
    }
  }
}

/* ---- the tool's own key set must match, or a rename went unnoticed ----- */
const src = fs.readFileSync(TOOL, 'utf8');
const blockRe = /(\n    strings: \{\n)([\s\S]*?)(\n    \},\n)/;
const m = src.match(blockRe);
if (!m) { err('could not locate the strings: block in number-line.js'); }
else {
  const declared = (m[2].match(/^\s{6}(\w+):\s*\{/gm) || [])
    .map((s) => s.trim().replace(/:.*$/, ''));
  for (const k of declared) if (ORDER.indexOf(k) < 0) err('the tool declares a key the SoT drops: ' + k);
  for (const k of ORDER) if (declared.indexOf(k) < 0) err('the SoT adds a key the tool never reads: ' + k);
}

if (bad) { console.error('\nREFUSED: ' + bad + ' problem(s). Nothing written.'); process.exit(1); }

/* ---- build the block ---------------------------------------------------- */
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const lines = ORDER.map((k, i) => {
  const pairs = LOCALES.map((loc) => loc + ': "' + esc(STRINGS[k][loc]) + '"').join(', ');
  return '      ' + k + ': { ' + pairs + ' }' + (i === ORDER.length - 1 ? '' : ',');
});
const banner = [
  '      /* ⚠⚠ GENERATED — DO NOT HAND-EDIT A LOCALE HERE.',
  '         SoT: scripts/_number-line-strings.js',
  '         Apply: node scripts/apply-number-line-locales.js',
  '         Rebuilt (not translated) by four native panels, §A.13.48.',
  '         The rulings that are not visible in the strings — the da/no',
  '         mare trap, the fi sibling-title collision, the fr/it noun',
  '         split, and the rabbit’s grammatical gender per locale —',
  '         are recorded in the SoT header. Read it before changing one',
  '         word here. */'
].join('\n');

const out = src.replace(blockRe, '$1' + banner + '\n' + lines.join('\n') + '$3');

if (DRY) {
  console.log('\n--- dry run, ' + ORDER.length + ' keys x ' + LOCALES.length + ' locales ---');
  console.log(lines.slice(0, 3).join('\n').slice(0, 900) + '\n  ...');
  process.exit(0);
}
fs.writeFileSync(TOOL, out);
console.log('  ok  wrote ' + ORDER.length + ' keys x ' + LOCALES.length + ' locales into number-line.js');
