#!/usr/bin/env node
/**
 * verify-clock-digital-strings.js
 *
 * Two questions the browser gate cannot answer, because a string that is never reached still
 * renders nothing and breaks nothing:
 *
 *   1. IS EVERY AUTHORED KEY REACHED? A key can be authored in eleven locales and wired to
 *      nothing — that has happened on this project before, and a `grep` for the key name does
 *      not settle it, because the call can sit in a branch that is unreachable. Here the
 *      engine asks for keys through a single `txt()` helper, so the check enumerates the
 *      dispatch instead: every key the engine can ask for is derived from the SOURCE, and
 *      every key authored in the table must appear in that set.
 *
 *   2. IS EVERY REACHABLE KEY AUTHORED, IN EVERY LOCALE THAT SHIPS? A missing key does not
 *      throw — `txt()` falls back to English and then to the key NAME, so the defect ships as
 *      the literal string "srReadOffMark" read aloud to a blind child. That is worse than a
 *      crash, because nothing reports it.
 *
 * ⚠ This engine is deliberately 8-locale (en de fr es pt it nl sv), not 11: the activity is
 * not published in da/no/fi, and asserting 11 here would manufacture work that ships nothing.
 *
 * Usage: node scripts/verify-clock-digital-strings.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'mini tools', 'clock-digital-activity.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv'];

const raw = fs.readFileSync(SRC, 'utf8');
/* comments are stripped first: a docblock quoting an old key name would otherwise be read as
   a live reference — the exact trap that made an earlier check condemn a correct file. */
const code = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
if (code.length < raw.length * 0.4) { console.error('FAULT: comment strip removed too much'); process.exit(1); }

/* Every key the engine can ask for.
   ⚠ NOT `txt\('key'` — the hint dispatch selects the key inside a ternary, so the literal is
   not adjacent to the call, and requiring adjacency condemned four correct keys on the first
   run. The scan therefore takes every quoted identifier-like literal in the code OUTSIDE the
   string table (the table is excluded so a key's own definition cannot vouch for it). */
const tableM = code.match(/var L = \{[\s\S]*?\n  \};/);
const codeNoTable = tableM ? code.replace(tableM[0], '') : code;
if (!tableM) { console.error('FAULT: could not locate the L table to exclude it'); process.exit(1); }
const asked = new Set();
for (const m of codeNoTable.matchAll(/'([a-zA-Z][a-zA-Z0-9]*)'/g)) asked.add(m[1]);
/* ⚠ Some keys are read by PROPERTY ACCESS, not through txt() — `L[LANG].instructionMatch`
   has no quoted literal anywhere, and the literal-only scan condemned it. Property names are
   unioned in. This direction of error is the safe one: it can only ever EXCUSE a key, so the
   worst case is a dead string surviving, never a live one being condemned. */
for (const m of codeNoTable.matchAll(/\.([a-zA-Z][a-zA-Z0-9]*)\b/g)) asked.add(m[1]);
/* describeHands(pre) composes pre + OnHour|Between|OffMark */
for (const m of code.matchAll(/describeHands\([^,]+,\s*'([a-zA-Z]+)'/g)) {
  ['OnHour', 'Between', 'OffMark'].forEach((s) => asked.add(m[1] + s));
}
/* markPhrase() */
if (/function markPhrase/.test(code)) { asked.add('markOne'); asked.add('markMany'); }
/* the shell reads these two off tool.strings, not through txt() */
['title', 'instruction'].forEach((k) => asked.add(k));
if (asked.size < 10) { console.error('FAULT: only ' + asked.size + ' keys derived — the scan is vacuous'); process.exit(1); }

/* what each locale authors */
const m = raw.match(/var L = (\{[\s\S]*?\n  \});/);
if (!m) { console.error('FAULT: cannot find the L table'); process.exit(1); }
let L;
try { L = eval('(' + m[1] + ')'); } catch (e) { console.error('FAULT: L does not parse — ' + e.message); process.exit(1); }

let fail = 0;
const enKeys = Object.keys(L.en || {});
if (!enKeys.length) { console.error('FAULT: no en keys'); process.exit(1); }

/* 1. dead strings — authored but unreachable */
const dead = enKeys.filter((k) => !asked.has(k));
if (dead.length) {
  console.error('DEAD STRINGS (authored, never asked for): ' + dead.join(', '));
  console.error('  Remove them, or wire them up. A key nobody reads is a maintenance trap and');
  console.error('  the next reader cannot tell it from a live one.');
  fail = 1;
} else console.log('reachability: all ' + enKeys.length + ' authored keys are asked for by the engine');

/* 2. missing per locale — would render the KEY NAME aloud */
for (const loc of LOCALES) {
  const have = new Set(Object.keys(L[loc] || {}));
  if (!have.size) { console.error('FAULT: locale ' + loc + ' has no strings'); fail = 1; continue; }
  const miss = enKeys.filter((k) => !have.has(k));
  if (miss.length) { console.error('MISSING in ' + loc + ' (' + miss.length + '): ' + miss.join(', ')); fail = 1; }
}
if (!fail) console.log('coverage: all ' + LOCALES.length + ' shipping locales author every key');

/* 3. no sr description may state a time or a minute count */
const SR = /^sr(Read|Item)/;
const TIME = /\d{1,2}\s*[:.]\s*\d{2}/;
const MINUTE = /(?<!\p{L})(minut\p{L}*|minuut\p{L}*|minuti|minutos?|Minuten?)(?!\p{L})/iu;
for (const loc of LOCALES) {
  for (const [k, v] of Object.entries(L[loc] || {})) {
    if (!SR.test(k) || typeof v !== 'string') continue;
    if (TIME.test(v)) { console.error('ANSWER LEAK ' + loc + '.' + k + ': states a time — "' + v + '"'); fail = 1; }
    if (MINUTE.test(v)) { console.error('ANSWER LEAK ' + loc + '.' + k + ': names minutes — "' + v + '"'); fail = 1; }
    if (/\{mm\}/.test(v)) { console.error('ANSWER LEAK ' + loc + '.' + k + ': uses the removed {mm} token'); fail = 1; }
  }
}
if (!fail) console.log('answer-leak: no hand description states a time, a minute count, or {mm}');

/* 4. per-locale invariants a native panel asked to be asserted, because losing them yields a
      DIFFERENT, WRONG sentence rather than a visible typo — the kind of damage an encoding
      pass or a well-meaning "cleanup" does silently. */
const INVARIANTS = [
  ['nl', 'markOne', /é.*é/u,
   'Dutch: "een streepje" is the ARTICLE (a mark), "één streepje" is the NUMERAL (one mark). ' +
   'Both acutes must survive or the sentence says something else.'],
  ['de', 'markOne', /(?<!\p{L})einen(?!\p{L})/u,
   'German inflects "one" by CASE: markOne is accusative ("einen Strich") and is only correct ' +
   'inside the frame srReadOffMark/srItemOffMark put it in. Frame and markOne change together.'],
  ['it', 'srReadBetween', /(?<!\p{L})numeri(?!\p{L})/u,
   'Italian: the numeral must be preceded by the noun ("tra i numeri 8 e 9"), because uno, otto ' +
   'and undici are vowel-initial and a bare article is wrong on a quarter of all rounds.'],
  ['it', 'srReadOnHour', /(?<!\p{L})numero(?!\p{L})/u, 'Italian: same — "sul numero 8", never "sul 8".']
];
for (const [loc, key, re, why] of INVARIANTS) {
  const v = (L[loc] || {})[key];
  if (typeof v !== 'string') { console.error('INVARIANT ' + loc + '.' + key + ': key absent'); fail = 1; continue; }
  if (!re.test(v)) { console.error('INVARIANT BROKEN ' + loc + '.' + key + ' — "' + v + '"\n    ' + why); fail = 1; }
}
if (!fail) console.log('invariants: ' + INVARIANTS.length + ' native-panel invariants hold');

console.log(fail ? '\nVERIFY-CLOCK-DIGITAL-STRINGS FAILED' : '\nVERIFY-CLOCK-DIGITAL-STRINGS PASSED');
process.exit(fail);
