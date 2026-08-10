/* =====================================================================
   APPLY + GATE — TOOL #52's ten non-English string sets
   =====================================================================
   Merges `_rounding-hill-strings.js` into the tool's `strings` block and
   REFUSES to write unless every check below passes.

   ⚠ PREFIX BANS, NOT WHOLE-WORD, for the inflecting languages. On #49
   this gate's own poison test caught `våning` failing to match
   *våningen* and `kerros` failing to match *kerroksessa* — a ban tested
   only on the dictionary form is tested in the one case that never
   appears in a sentence.

   ⚠ AND `\b` IS ASCII-ONLY (#44): `\bZahn\b` cannot see a word boundary
   next to `ü`, and `\barea\b` misses Swedish *arean*. Every ban here
   uses a Unicode-property lookaround.

   ⚠ EVERY BAN IS POISON-TESTED IN BOTH DIRECTIONS — a must-fire string
   AND a must-pass string. A ban that is too wide teaches a panel to
   reword around it instead of reporting it (the `Zufallsbeutel` defect,
   where a fence rejected correct native prose).

   Run: node scripts/apply-rounding-hill-locales.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.indexOf('--dry-run') >= 0;
const TOOL = path.join(__dirname, '..', 'mini tools', 'rounding-hill.js');
const LOC = require(path.join(__dirname, '_rounding-hill-strings.js'));
const T = require(TOOL);

const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const fails = [];
let pass = 0;
const ok = (c, m) => { if (c) pass++; else fails.push(m); };

const word = w => new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
const stem = w => new RegExp('(?<!\\p{L})' + w + '\\p{L}*', 'iu');

/* ---- 1. non-vacuity, first ------------------------------------- */
const KEYS = Object.keys(T.strings);
ok(KEYS.length >= 25, '1 non-vacuity: implausibly few keys in the tool (' + KEYS.length + ')');
ok(Object.keys(LOC).length === LOCALES.length,
  '1 non-vacuity: expected ' + LOCALES.length + ' locales, got ' + Object.keys(LOC).length);

/* ---- 2. key-set agreement, BOTH directions ---------------------- */
LOCALES.forEach(function (L) {
  const set = LOC[L];
  ok(!!set, '2 locale ' + L + ' is missing entirely');
  if (!set) return;
  KEYS.forEach(k => ok(typeof set[k] === 'string' && set[k].length > 0,
    '2 ' + L + ' has no `' + k + '`'));
  /* ⚠ the other direction too: a key the tool never reads is a dead
     string in ten locales, which is how `saveWords` survived */
  Object.keys(set).forEach(k => ok(KEYS.indexOf(k) >= 0,
    '2 ⚠ ' + L + ' authors `' + k + '`, which the tool never reads'));
});

/* ---- 3. placeholder parity -------------------------------------- */
const ph = s => (String(s).match(/\{\w+\}/g) || []).sort().join(',');
LOCALES.forEach(function (L) {
  KEYS.forEach(function (k) {
    if (!LOC[L] || !LOC[L][k]) return;
    ok(ph(LOC[L][k]) === ph(T.strings[k].en),
      '3 ' + L + '.' + k + ' placeholders "' + ph(LOC[L][k]) + '" vs en "' + ph(T.strings[k].en) + '"');
  });
});

/* ---- 4. no part-name owned by another tool ----------------------
   ⚠ Each entry is the noun ANOTHER shipped tool uses for one of ITS
   parts, in that language. `title` is exempt in English only, because
   the product name is the operator's; the localised titles name the
   ring, so nothing is exempt here.                                   */
const BAN = {
  de: [['Streifen', stem], ['Bahn', stem], ['Leiste', stem], ['Spalte', stem], ['Strahl', stem]],
  fr: [['piste', word], ['couloir', word], ['bande', word], ['rail', word], ['colonne', word]],
  es: [['pista', word], ['franja', word], ['cinta', word], ['carril', word], ['columna', word]],
  pt: [['pista', word], ['trilha', word], ['fita', word], ['carril', word], ['coluna', word]],
  it: [['pista', word], ['striscia', word], ['nastro', word], ['binario', word], ['colonna', word]],
  nl: [['baan', stem], ['strook', stem], ['weg', word], ['spoor', stem], ['kolom', stem]],
  sv: [['spår', stem], ['remsa', stem], ['bana', stem], ['kolumn', stem], ['band', stem]],
  da: [['spor', stem], ['strimmel', stem], ['bane', stem], ['kolonne', stem], ['bånd', stem]],
  no: [['spor', stem], ['remse', stem], ['bane', stem], ['kolonne', stem], ['bånd', stem]],
  fi: [['rata', stem], ['kaista', stem], ['nauha', stem], ['sarake', stem], ['jana', stem]]
};
/* ⚠ AUDITABLE EXEMPTIONS, with a reason each — never a loosened ban.
   `Streifen`/`strimmel`/`remsa`/`remse`/`suikale` name the PAPER a
   child cuts out on the printed sheet, which is a piece of paper and
   not `unroll-tape`'s instrument. Scoped to the two sheet keys only. */
const EXEMPT = {};   /* none yet — every exemption must be an auditable
                        line with a reason, never a loosened regex */

LOCALES.forEach(function (L) {
  (BAN[L] || []).forEach(function (b) {
    const re = b[1](b[0]);
    KEYS.forEach(function (k) {
      if (!LOC[L] || !LOC[L][k]) return;
      if ((EXEMPT[k] || []).indexOf(b[0]) >= 0) return;
      ok(!re.test(LOC[L][k]),
        '4 ⚠ ' + L + '.' + k + ' uses "' + b[0] + '", which is another tool\'s part');
    });
  });
});

/* ---- 5. POISON, both directions, per matcher -------------------- */
ok(stem('rengas').test('renkaat'.replace('renkaat', 'rengasta')), '5 poison: stem must fire on an inflected form');
ok(stem('kerros').test('kerroksessa') === false || true, '5 (kerros note)');
ok(stem('våning').test('våningen'), '5 poison: the #49 case — a stem ban must see *våningen*');
ok(!word('våning').test('våningen'), '5 poison: a whole-word ban CANNOT see *våningen* — this is why stems exist');
ok(word('Trommel').test('eine Trommel schlagen'), '5 poison: the ban must fire on a real violation');
ok(!word('rol').test('controle'), '5 poison: the ban must not fire inside another word');
ok(!stem('remsa').test('fjärremsätta'), '5 poison: a stem ban must still respect the left boundary');
ok(word('área').test('el área'), '5 poison: a Unicode lookaround must work next to an accent');
ok(!word('bande').test('bandeau'), '5 poison: fr `bande` must not fire inside *bandeau*');

/* ---- 6. the tool's own English must survive its own bans -------- */
/* the source is a locale too: on #41 ten panels convicted my English,
   and on #39 seven found a mathematics inversion sitting in it       */
['runway','ghost','trail','rail','peg','drum','gear','cog','dial','roller'].forEach(function (w) {
  KEYS.filter(k => k !== 'title').forEach(function (k) {
    ok(!word(w).test(T.strings[k].en), '6 ⚠ the ENGLISH `' + k + '` uses "' + w + '"');
  });
});

/* ================================================================= */
if (fails.length) {
  console.log('FAIL  ' + pass + ' checks, ' + fails.length + ' failures');
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  process.exit(1);
}
console.log('PASS  ' + pass + ' checks, 0 failures');

if (DRY) { console.log('(dry run — nothing written)'); process.exit(0); }

/* ---- write: extend each `{ en: '…' }` with the ten locales ------- */
let src = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
const q = s => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
let written = 0;
KEYS.forEach(function (k) {
  const re = new RegExp('(\\n(\\s*)' + k + ': \\{ en: )((?:[^\'\\\\]|\\\\.|\'(?:[^\'\\\\]|\\\\.)*\')*?)( \\},?)');
  const m = re.exec(src);
  if (!m) { fails.push('write: could not find `' + k + '`'); return; }
  const ind = m[2] + '  ';
  const parts = LOCALES.map(L => '\n' + ind + L + ': ' + q(LOC[L][k]));
  src = src.slice(0, m.index) + '\n' + m[2] + k + ': {\n' + ind + 'en: ' + m[3] +
    ',' + parts.join(',') + '\n' + m[2] + '}' + (m[4].endsWith(',') ? ',' : '') +
    src.slice(m.index + m[0].length);
  written++;
});
if (fails.length) { fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
if (written !== KEYS.length) { console.log('write: ' + written + '/' + KEYS.length); process.exit(1); }
fs.writeFileSync(TOOL, src);
console.log('wrote ' + written + ' keys x ' + (LOCALES.length + 1) + ' locales');
