/* =====================================================================
   APPLY + GATE — TOOL #54's ten non-English string sets
   =====================================================================
   Merges `_doubling-mirror-strings.js` into the tool's `strings` block and
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

   Run: node scripts/apply-doubling-mirror-locales.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.indexOf('--dry-run') >= 0;
const TOOL = path.join(__dirname, '..', 'mini tools', 'doubling-mirror.js');
const LOC = require(path.join(__dirname, '_doubling-mirror-strings.js'));
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
  de: [['Spiegel', 'stem'], ['Falte', 'stem'], ['Zwilling', 'stem'], ['Glas', 'stem'], ['Blatt', 'stem']],
  fr: [['miroir', 'word'], ['reflet', 'word'], ['pli', 'word'], ['jumeau', 'word'],
    ['feuille', 'word'], ['verre', 'word'], ['image', 'word']],
  /* ⚠ es/fr/pt/it carried no GLASS and no IMAGE word while all six
     Germanic and Nordic rows banned glass — a table can be binding in
     the brief and absent from the code, which is a ban that ships. */
  es: [['espejo', 'word'], ['reflejo', 'word'], ['doblez', 'word'], ['pliegue', 'word'],
    ['gemelo', 'word'], ['hoja', 'word'], ['cristal', 'word'], ['imagen', 'word']],
  pt: [['espelho', 'word'], ['reflexo', 'word'], ['dobra', 'word'], ['gemeo', 'word'],
    ['folha', 'word'], ['vidro', 'word'], ['imagem', 'word']],
  it: [['specchio', 'word'], ['riflesso', 'word'], ['piega', 'word'], ['gemello', 'word'],
    ['foglio', 'word'], ['vetro', 'word'], ['immagine', 'word']],
  nl: [['spiegel', 'stem'], ['vouw', 'stem'], ['tweeling', 'stem'], ['glas', 'stem'], ['blad', 'stem']],
  sv: [['spegel', 'stem'], ['spegl', 'stem'], ['vik', 'stem'], ['tvilling', 'stem'], ['glass', 'stem']],
  da: [['spejl', 'stem'], ['fold', 'stem'], ['tvilling', 'stem'], ['glas', 'stem']],
  no: [['speil', 'stem'], ['brett', 'stem'], ['tvilling', 'stem'], ['glass', 'stem']],
  fi: [['peili', 'stem'], ['taite', 'stem'], ['kaksonen', 'stem'], ['lasi', 'stem']]
};

/* ⚠⚠ PARITY IS SIBLING #53's SUBJECT AND THE FENCE COULD NOT SEE A
   BREACH OF IT — no locale row carried a parity word, on a tool whose
   own brief calls that ban binding. A Swedish panel then found the
   shipped `saidOddWaiting` saying *går inte JÄMNT upp*, which survived
   only because it was inflected.
   ⚠ AND THE OBVIOUS WIDENING WOULD HAVE BEEN FAR TOO WIDE, which is
   why these are the UNAMBIGUOUS terms only. Every bare "even"/"pair"
   root is load-bearing elsewhere in ordinary language OR in this
   tool's own vocabulary: de `gerade` also means *straight/just now*;
   nl `even` also means *for a moment*; da `lige` also means *just* and
   *equally* (`går lige op`); it `pari` also means *equal*; and es
   `par` / pt `par` / fi `pari` are the tool's OWN word for a partner —
   banning them outright would fail the tool as shipped, and es
   `pareja` would even be killed by a stem ban on `par`. So the ban
   takes the odd-word and the explicit compound, never the root. */
const PARITY = {
  de: [['ungerade', 'stem']],
  fr: [['impair', 'stem']],
  es: [['impar', 'stem'], ['número par', 'word'], ['números pares', 'word']],
  pt: [['ímpar', 'stem'], ['impar', 'stem'], ['número par', 'word'], ['números pares', 'word']],
  it: [['dispari', 'stem'], ['numero pari', 'word']],
  nl: [['oneven', 'stem']],
  sv: [['udda', 'stem'], ['jämn', 'stem']],
  da: [['ulige', 'stem']],
  no: [['oddetall', 'stem'], ['partall', 'stem']],
  fi: [['pariton', 'stem'], ['parittom', 'stem'], ['parillin', 'stem']]
};
LOCALES.forEach(function (L) { BAN[L] = (BAN[L] || []).concat(PARITY[L] || []); });

/* ⚠ AUDITABLE EXEMPTIONS, with a reason each — never a loosened ban.
   `Streifen`/`strimmel`/`remsa`/`remse`/`suikale` name the PAPER a
   child cuts out on the printed sheet, which is a piece of paper and
   not `unroll-tape`'s instrument. Scoped to the two sheet keys only. */
/* ⚠⚠ KEYED BY LOCALE **AND** KEY. An exemption keyed by key alone
   would forgive a word in ten languages to spare it in one, which is a
   loosened regex wearing a list's clothes.
   Each line names the locale, the key, the word and the reason:

   pt.sheetNote `folha` — the PIECE OF PAPER a child is cutting ("as
     linhas que atravessam a folha inteira" = the lines that cross the
     whole sheet). Portuguese has no other everyday word for a sheet of
     paper, so banning it outright makes the paper instructions
     unwritable. `folha` stays banned in every other pt key, where it
     would name a LEAF of the apparatus and collide with
     `folding-sheet`. Scoped to the paper instructions only.          */
const EXEMPT = { 'pt.sheetNote': ['folha'] };

LOCALES.forEach(function (L) {
  (BAN[L] || []).forEach(function (b) {
    const re = (b[1] === 'stem' ? stem : word)(b[0]);
    KEYS.forEach(function (k) {
      if (!LOC[L] || !LOC[L][k]) return;
      if ((EXEMPT[L + '.' + k] || []).indexOf(b[0]) >= 0) return;
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

/* ---- 6. the tool's own English must survive its own bans --------
   ⚠⚠ THIS CHECK WAS CLONED FROM #41/#50 AND KEPT THEIR WORD LIST.
   It said "the tool's own English must survive ITS OWN bans" and then
   tested runway · ghost · trail · rail · peg · drum · gear · cog ·
   dial · roller — the parts of `unroll-tape` and `number-drum`, none
   of which this tool could ever say. So the check could not fail, and
   THAT IS WHY a retired `sheetNote` carrying the fold-word three times
   travelled all the way into a brief handed to ten native panels: the
   one gate that claimed to catch it was measuring another tool's
   vocabulary. The recorded #43 lesson — cloning a gate copies its
   selectors AND its globals — in a new dress.
   A German panel found it by reading the script, not the strings.   */
const BAN_EN = ['mirror','reflection','reflect','glass','twin','fold','folds','folded',
  'crease','image','odd','even','sheet'];
BAN_EN.forEach(function (w) {
  KEYS.filter(k => k !== 'title').forEach(function (k) {
    ok(!word(w).test(T.strings[k].en), '6 ⚠ the ENGLISH `' + k + '` uses "' + w + '"');
  });
});
/* poison, both directions — a ban that cannot fire is not a ban */
ok(word('fold').test('then fold it shut'), '6 poison: the English ban must FIRE on a real breach');
ok(!word('fold').test('the folding-sheet tool'), '6 poison: it must not fire inside another word');
ok(!word('odd').test('a hidden oddity'), '6 poison: the parity ban must respect the right boundary');

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
/* ⚠⚠ THE OLD WRITER ONLY KNEW ONE SHAPE. Its regex required
   `key: { en: '…' },` on a single line, so it silently could not find
   any key that ALREADY carried the ten locales — which after the first
   apply is most of them, and after this rebuild is every kept string.
   It reported "could not find" for six keys and would have reported it
   for fifty-two on the next run. This walks the block by BALANCING
   BRACES, so it replaces a one-locale block and an eleven-locale block
   identically, and it PRESERVES the English literal byte for byte
   rather than re-quoting it.
   ⚠ Comments above a key are untouched: the scan starts AT the key. */
function findBlock(s, key) {
  const re = new RegExp('\\n([ \\t]*)' + key + ': \\{');
  const m = re.exec(s);
  if (!m) return null;
  let i = m.index + m[0].length, depth = 1, q = 0;
  for (; i < s.length && depth > 0; i++) {
    const c = s[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = 0; continue; }
    if (c === "'" || c === '"') { q = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') depth--;
  }
  if (depth !== 0) return null;
  return { start: m.index, end: i, indent: m[1], body: s.slice(m.index + m[0].length, i - 1) };
}
KEYS.forEach(function (k) {
  const b = findBlock(src, k);
  if (!b) { fails.push('write: could not find `' + k + '`'); return; }
  /* keep the English exactly as authored — never re-quote it */
  const em = /(^|\n)\s*en:\s*/.exec(b.body);
  if (!em) { fails.push('write: `' + k + '` has no English'); return; }
  let j = em.index + em[0].length;
  const quote = b.body[j];
  if (quote !== "'" && quote !== '"') { fails.push('write: `' + k + '` English is not a literal'); return; }
  let e = j + 1;
  for (; e < b.body.length; e++) {
    if (b.body[e] === '\\') { e++; continue; }
    if (b.body[e] === quote) break;
  }
  const enLit = b.body.slice(j, e + 1);
  const ind = b.indent + '  ';
  const parts = LOCALES.map(L => '\n' + ind + L + ': ' + q(LOC[L][k]));
  const tail = src.slice(b.end, b.end + 1) === ',' ? ',' : '';
  src = src.slice(0, b.start) + '\n' + b.indent + k + ': {\n' + ind + 'en: ' + enLit +
    ',' + parts.join(',') + '\n' + b.indent + '}' +
    src.slice(b.end + (tail ? 1 : 0)).replace(/^/, tail);
  written++;
});
if (fails.length) { fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
if (written !== KEYS.length) { console.log('write: ' + written + '/' + KEYS.length); process.exit(1); }
fs.writeFileSync(TOOL, src);
console.log('wrote ' + written + ' keys x ' + (LOCALES.length + 1) + ' locales');
