/* =====================================================================
   apply-the-gap-locales.js — expand TOOL #56's strings from `{ en: … }`
   to the full eleven-locale object, from `scripts/_the-gap-strings.js`.
   Run:  node scripts/apply-the-gap-locales.js  [--check]

   ⚠⚠ IT VERIFIES EVERY WRITE LANDED. A silent partial rewrite that
   reports success is a recorded defect on this shelf, so this script
   re-`require`s the tool WITH THE MODULE CACHE BUSTED and asserts, per
   key per locale, that the byte in the file is the byte the panel wrote.
   Exit 1 on any mismatch. "I wrote it" is not "it is there".

   ⚠ AN UNDECLARED KEY IS FATAL, NEVER A SKIP. If a panel carries a key
   the tool does not declare, the panel is authoring for a string that
   will never render — the #39 `hintMark` class — and silently dropping
   it is how that ships. It halts.

   ⚠ AND THE CONVERSE IS REPORTED: a key the TOOL declares and a panel
   does not means that locale falls back to English at that surface. A
   key-count check cannot see either direction on its own.

   ⚠ PLACEHOLDER PARITY IS ASSERTED, NOT HOPED FOR. Every locale value
   must carry exactly the `{n}` `{m}` `{k}` `{r}` multiset its English
   carries — a dropped token is a number that never reaches the class,
   an added one prints as literal braces.

   ⚠ IDEMPOTENT. A second run must report every key as already applied
   and write nothing. The `en` value is read back OUT of the tool each
   time and never sourced from the panel file, so the tool stays the
   sole author of its own English however many times this runs.

   ⚠ KEY ORDER IS PRESERVED BY CONSTRUCTION: each key's object literal
   is replaced in place. Nothing is re-ordered, re-indented, or moved.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
const PANEL = path.join(__dirname, '_the-gap-strings.js');
const CHECK_ONLY = process.argv.indexOf('--check') >= 0;

const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const ORDER = ['en'].concat(LOCALES);

let fatal = 0;
const problems = [];
const bad = m => { problems.push(m); fatal++; };

/* ---- the serializer. Single-quoted, escaping ONLY backslash and the
   quote itself, because that is the complete set of characters that can
   terminate or re-open a single-quoted JS string. Every value is a
   one-line string; a newline would be a defect and is asserted below. */
function q(s) {
  if (/[\r\n]/.test(s)) throw new Error('a string value carries a newline: ' + JSON.stringify(s));
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

/* ---- brace-match an object literal starting at the `{` at `from` ----
   ⚠ QUOTE-AWARE. A naive depth counter walks straight into a `{` inside
   a string value and stops in the wrong place; every value here is prose
   and several carry braces as placeholders. */
function matchBrace(src, from) {
  let d = 0, i = from, quote = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') { i++; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (!d) return i + 1; }
  }
  throw new Error('unbalanced braces from offset ' + from);
}

function evalObject(blob) {
  /* eslint-disable no-new-func */
  return (new Function('return (' + blob + ')'))();
}

/* ================= 0. THE PANEL FILE ROUND-TRIPS ==================== */
/* ⭐ A REGENERATED SOURCE FILE IS ONLY TRUSTWORTHY IF PARSING IT AND
   RE-EMITTING IT REPRODUCES THE SAME VALUES. This proves the escaping is
   sound before a single byte of the tool is touched — if `q()` and the
   file disagree, the mismatch surfaces here rather than as ten locales
   of mangled apostrophes. */
const panel = require(PANEL);
{
  const reparsed = evalObject('{' + Object.keys(panel).map(function (L) {
    return L + ': {' + Object.keys(panel[L]).map(function (k) {
      return k + ': ' + q(panel[L][k]);
    }).join(',') + '}';
  }).join(',') + '}');
  let n = 0;
  Object.keys(panel).forEach(function (L) {
    Object.keys(panel[L]).forEach(function (k) {
      n++;
      if (reparsed[L][k] !== panel[L][k]) {
        bad('ROUND-TRIP: ' + L + '.' + k + ' does not survive the serializer');
      }
    });
  });
  if (!n) bad('ROUND-TRIP non-vacuity: the panel file carries no values at all');
  console.log('round-trip: ' + n + ' panel values re-emit byte-equal');
}

/* ⚠ NO VALUE MAY CARRY A NEWLINE OR A STRAY `{token}` SHAPE the paint
   cannot fill — checked against the tool's own English further down.
   Here only the newline, because `q()` throws on it and a throw inside
   the rewrite loop would leave the tool half-written. */
Object.keys(panel).forEach(function (L) {
  Object.keys(panel[L]).forEach(function (k) {
    if (/[\r\n]/.test(panel[L][k])) bad('NEWLINE in ' + L + '.' + k);
  });
});

/* ================= 1. READ THE TOOL'S DECLARED KEYS ================= */
let src = fs.readFileSync(TOOL, 'utf8');
const sIdx = src.indexOf('\n    strings: {');
if (sIdx < 0) { console.log('FATAL: the tool has no `strings:` block'); process.exit(1); }
const sOpen = src.indexOf('{', sIdx);
const sEnd = matchBrace(src, sOpen);
const stringsBlob = src.slice(sOpen, sEnd);
const declared = Object.keys(evalObject(stringsBlob));

if (declared.length < 18) { console.log('FATAL: only ' + declared.length + ' declared keys — the parse is wrong, not the tool'); process.exit(1); }
console.log('tool declares ' + declared.length + ' keys');

/* ---- an undeclared key in ANY panel is FATAL --------------------- */
LOCALES.forEach(function (L) {
  if (!panel[L]) { bad('FATAL: the panel file has no `' + L + '` locale at all'); return; }
  Object.keys(panel[L]).forEach(function (k) {
    if (declared.indexOf(k) < 0) {
      bad('FATAL: `' + L + '` authors `' + k + '`, WHICH THE TOOL DOES NOT DECLARE — that string can never render');
    }
  });
});
/* ---- ⭐ KEY ORDER. The panel file is regenerated mechanically and must
   carry the tool's declared order inside every locale block, or a human
   diffing the two files is comparing two different sequences and will
   mis-read a missing key as a moved one. */
LOCALES.forEach(function (L) {
  if (!panel[L]) return;
  const have = Object.keys(panel[L]);
  const want = declared.filter(k => have.indexOf(k) >= 0);
  if (have.join('|') !== want.join('|')) {
    bad('ORDER: `' + L + '` does not follow the tool\'s declared key order');
  }
});

/* ---- a declared key missing from a panel is REPORTED -------------- */
const gaps = [];
declared.forEach(function (k) {
  LOCALES.forEach(function (L) {
    if (panel[L] && !(k in panel[L])) gaps.push(L + '.' + k);
  });
});
if (gaps.length) {
  gaps.forEach(function (g) { bad('MISSING: `' + g + '` is declared by the tool and absent from the panel — that locale falls back to English there'); });
}

if (fatal) {
  console.log('\nFAIL — nothing was written.');
  problems.forEach(p => console.log('  ✗ ' + p));
  process.exit(1);
}

/* ================= 2. REWRITE EACH KEY IN PLACE ===================== */
const tok = s => (s.match(/\{\w+\}/g) || []).slice().sort().join(' ');
let rewritten = 0, unchanged = 0;
const intended = {};

declared.forEach(function (key) {
  /* ⚠ anchored on the 6-space declaration, inside the strings block only */
  const anchor = '\n      ' + key + ': {';
  const at = src.indexOf(anchor);
  if (at < 0) { bad('could not locate the declaration of `' + key + '`'); return; }
  if (src.indexOf(anchor, at + 1) >= 0) { bad('`' + key + '` is declared more than once'); return; }
  const open = src.indexOf('{', at + 1);
  const close = matchBrace(src, open);
  const cur = evalObject(src.slice(open, close));

  if (typeof cur.en !== 'string' || !cur.en.trim()) { bad('`' + key + '` has no English in the tool'); return; }

  const want = { en: cur.en };
  LOCALES.forEach(function (L) { want[L] = panel[L][key]; });

  /* placeholder parity, per locale, against the tool's own English */
  ORDER.forEach(function (L) {
    if (tok(want[L]) !== tok(want.en)) {
      bad('PLACEHOLDER: `' + key + '`.' + L + ' carries [' + tok(want[L]) + '] and en carries [' + tok(want.en) + ']');
    }
  });

  intended[key] = want;

  const emitted = '{\n' + ORDER.map(function (L) {
    return '        ' + L + ': ' + q(want[L]);
  }).join(',\n') + '\n      }';

  if (src.slice(open, close) === emitted) { unchanged++; return; }
  src = src.slice(0, open) + emitted + src.slice(close);
  rewritten++;
});

if (fatal) {
  console.log('\nFAIL — nothing was written.');
  problems.forEach(p => console.log('  ✗ ' + p));
  process.exit(1);
}

if (CHECK_ONLY) {
  console.log('--check: ' + rewritten + ' key(s) would change, ' + unchanged + ' already applied');
} else if (rewritten) {
  fs.writeFileSync(TOOL, src);
  console.log('wrote ' + rewritten + ' key(s); ' + unchanged + ' already applied');
} else {
  console.log('IDEMPOTENT: all ' + unchanged + ' keys already carry every locale — nothing written');
}

/* ================= 3. ⭐⭐ VERIFY EVERY WRITE LANDED ================= */
/* re-require from disk with the cache busted — the file is the witness,
   not the variable this script has been holding in memory */
delete require.cache[require.resolve(TOOL)];
const after = require(TOOL);
let checked = 0;
declared.forEach(function (key) {
  const got = after.strings[key];
  if (!got || typeof got !== 'object') { bad('VERIFY: `' + key + '` is not an object after the write'); return; }
  ORDER.forEach(function (L) {
    checked++;
    if (got[L] !== intended[key][L]) {
      bad('VERIFY: `' + key + '`.' + L + ' is ' + JSON.stringify(got[L]) + ', expected ' + JSON.stringify(intended[key][L]));
    }
  });
});
if (checked < declared.length * ORDER.length) bad('VERIFY non-vacuity: only ' + checked + ' values were compared');
console.log('verified ' + checked + ' values on disk across ' + ORDER.length + ' locales');

if (fatal) {
  console.log('\nFAIL');
  problems.forEach(p => console.log('  ✗ ' + p));
  process.exit(1);
}
console.log('PASS');
