/* =====================================================================
   _baking-tray-bans.js — the operator bans, in ONE place
   ---------------------------------------------------------------------
   ⚠⚠ THIS FILE EXISTS BECAUSE THE SAME RULE IN TWO FILES GETS
   HALF-FIXED. The ban started life copied into both
   apply-baking-tray-locales.js and verify-baking-tray.js. Narrowing
   German `gleich` to `ist gleich` in the apply script — because the
   panel's own correct "Gleich viele Reihen" is the ADJECTIVE, not the
   operator — left verify- still carrying the wide copy, still condemning
   the same correct sentence. #44 shipped exactly this: a French
   exemption went into apply-, verify- kept its own copy, and the same
   correct prose kept failing.
   An exemption has to travel with the ban it exempts. So both now
   import from here, and both poison-test what they import.

   THE RULE: the apparatus carries numerals and the material, nothing
   else — so no operator may appear, as a glyph OR as a word. No reading
   of "3 x 4" is correct in all eleven markets (German reads *3 mal 4*),
   which is why the tool refuses to notate at all and the TEACHER writes
   the sentence on the board in the local convention.
   ===================================================================== */

'use strict';

/* ⚠ UNICODE LOOKAROUNDS, NEVER `\b` — it is ASCII-only and cannot see a
   boundary beside an accented letter, which killed three bans on #44 and
   one on #43. And a LETTER boundary is not a boundary for a NUMERAL:
   `42` inside `421` needs `\p{N}` in the guard too. */
const word = (body) => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');
const numeral = (body) => new RegExp('(?<![\\p{L}\\p{N}])(?:' + body + ')(?![\\p{L}\\p{N}])', 'iu');

const GLYPHS = /[×✕✖·]|(?<!\p{L})x(?!\p{L})|\s\+\s|\s=\s/iu;

const OP_WORDS = {
  en: 'times|equals|makes|altogether|in all',
  /* ⭐ `ist gleich`, NOT bare `gleich`. The German "=" is spoken and
     written *ist gleich*; bare *gleich* is an ordinary adjective, and
     the wide form condemned the panel's own correct "Gleich viele
     Reihen wie Brötchen in jeder Reihe". Fixing WHAT is measured, not
     loosening a threshold — the operator is still caught. */
  de: 'mal|ist gleich|ergibt|macht|zusammen',
  nl: 'keer|maal|samen',
  fr: 'fois|égale|égalent|font|en tout',
  it: 'volte|uguale|in tutto',
  /* ⭐ NOT bare `por` and NOT bare `son`. The first list banned both, and
     a Spanish panel pointed out that `por` is the commonest preposition
     this tool needs ("separar por la línea", "¿por dónde?") and `son` is
     simply "are" — so the ban condemned ordinary Spanish and the panel
     had to write around it at a real cost to the prose. Worse, my
     counter-poison only ever exercised German and Italian, so nothing
     caught it. `son iguales` is the operator; `son` is not. */
  es: 'veces|es igual|son iguales|en total',
  pt: 'vezes|é igual|são iguais|ao todo',
  /* ⭐ `lika med`, NOT bare `lika`. Swedish for "equals" is *är lika
     MED*; bare `lika` fires on "det är lika många bullar som förut" —
     the exact CONSERVATION sentence this apparatus exists to make, so
     the ban forbade the tool's own message and the Swedish panel had to
     write around a live gate to say the true thing. Danish `er lig` and
     Norwegian `er lik` are right; Swedish is the one that needs the
     preposition. */
  sv: 'gånger|lika med|sammanlagt',
  da: 'gange|lig|i alt',
  no: 'ganger|lik|til sammen',
  fi: 'kertaa|yhteensä'
};

/* ⭐ AN AUDITABLE EXEMPTION LIST, never a loosened regex. Each entry
   names the locale, the key, the word and WHY it is correct there. */
const EXEMPT = [
  {
    loc: 'de', key: 'hintCut', word: 'zusammen',
    why: 'THE BAN IS RIGHT AND THIS SENTENCE IS RIGHT TOO. German "zusammen" IS an equals-word ' +
         'in "das sind zusammen 42", which is why it is banned — but here it is the separable ' +
         'prefix of ZUSAMMENSCHIEBEN, the tool\'s own PUSH move: "schiebt sie wieder zusammen" = ' +
         'push them back together. Separated by the grammar, not by the meaning. Loosening the ' +
         'pattern would let the real total through everywhere else.'
  }
];

/* the total, which may never appear in any string in any language */
const TOTAL = numeral('forty[- ]two|42');

function exempt(loc, key) {
  return EXEMPT.some((e) => e.loc === loc && e.key === key);
}

/* ⭐ POISON, SHIPPED WITH THE BAN so neither consumer can trust it
   without running it. Returns a list of failures; empty means sound. */
function poison() {
  const bad = [];
  const must = (c, m) => { if (!c) bad.push('MUST FIRE  — ' + m); };
  const mustNot = (c, m) => { if (c) bad.push('MUST PASS  — ' + m); };

  must(GLYPHS.test('7 x 6'), 'the glyph ban on "7 x 6"');
  must(GLYPHS.test('{r} x {c}'), 'the glyph ban between placeholders');
  must(GLYPHS.test('5 + 2') && GLYPHS.test('a = b'), 'the glyph ban on + and =');
  mustNot(GLYPHS.test('Break after row 5: 5 rows above, 2 rows below.'), 'a correct English label');

  must(word(OP_WORDS.de).test('sieben mal sechs'), 'German "mal"');
  must(word(OP_WORDS.de).test('fünf mal sechs ist gleich dreissig'), 'German "ist gleich"');
  mustNot(word(OP_WORDS.de).test('Das Blech drehen'), 'ordinary German');
  mustNot(word(OP_WORDS.de).test('Gleich viele Reihen wie Brötchen in jeder Reihe'),
    '⚠⚠ "gleich viele" — the ADJECTIVE, which the wide form condemned in the panel\'s own sentence');

  must(word(OP_WORDS.fi).test('seitsemän kertaa kuusi'), 'Finnish "kertaa"');
  must(word(OP_WORDS.sv).test('sju gånger sex'), 'Swedish "gånger"');
  mustNot(word(OP_WORDS.sv).test('Vänd på plåten'), 'ordinary Swedish');

  /* ⚠⚠ AND EVERY LOCALE GETS A MUST-PASS CASE, not just German and
     Italian. The Spanish ban condemned `por` and bare `son` — the
     commonest preposition this tool needs and the verb "are" — and
     nothing caught it, because the counter-poison exercised two
     languages out of eleven. A ban tested in the language where it
     happens to work is a ban that has not been tested. */
  must(word(OP_WORDS.es).test('cinco es igual a cinco'), 'Spanish "es igual"');
  mustNot(word(OP_WORDS.es).test('Separar por la línea de arriba, ¿por dónde?'),
    '⚠⚠ Spanish "por" — the PREPOSITION this tool needs most');
  mustNot(word(OP_WORDS.es).test('Los mismos bollos, ahora son dos trozos'), '⚠⚠ Spanish "son" — simply "are"');
  must(word(OP_WORDS.pt).test('cinco é igual a cinco'), 'Portuguese "é igual"');
  mustNot(word(OP_WORDS.pt).test('Separar pela linha de cima'), '⚠ ordinary Portuguese');
  mustNot(word(OP_WORDS.fr).test('Casser la plaque dans un creux profond'),
    '⚠ French "profond" — the ban must not reach inside a word');
  mustNot(word(OP_WORDS.it).test('Leggi ogni pezzo'), '⚠ ordinary Italian');
  mustNot(word(OP_WORDS.nl).test('Breek de plaat bij de groef'), '⚠ ordinary Dutch');
  mustNot(word(OP_WORDS.da).test('Bræk pladen ved rillen'), '⚠ ordinary Danish');
  mustNot(word(OP_WORDS.no).test('Brekk platen ved rillen'), '⚠ ordinary Norwegian');
  mustNot(word(OP_WORDS.fi).test('Katso uraa ja kerro mistä murrat'), '⚠ ordinary Finnish');
  mustNot(word(OP_WORDS.en).test('Break after row 5: 5 rows above.'), '⚠ ordinary English');

  must(TOTAL.test('that makes 42 buns'), 'the total ban on "42"');
  mustNot(TOTAL.test('there are 421 of them'), '⚠ "42" inside a longer numeral');

  return bad;
}

module.exports = { word, numeral, GLYPHS, OP_WORDS, EXEMPT, TOTAL, exempt, poison };
