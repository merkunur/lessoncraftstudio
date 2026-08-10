/* =====================================================================
   apply-counting-cups-locales.js — fold the ten authored locales into
   `mini tools/counting-cups.js`, in place, idempotently.
   Run:  node scripts/apply-counting-cups-locales.js [--check]

   ⚠ It rewrites only the value objects of the existing `strings:` keys.
   It never invents a key, never reorders, and refuses to run if the key
   set on disk and the key set in the data file disagree — because a
   locale silently gaining or losing a key is exactly how a dead string
   or a raw-key leak ships.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'counting-cups.js');
const DATA = require('./_counting-cups-strings.js');
const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CHECK = process.argv.indexOf('--check') !== -1;

const src = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
const T = require(TOOL);
const KEYS = Object.keys(T.strings);

/* ---- refuse to run on a key-set disagreement --------------------- */
let bad = 0;
for (const loc of LOCALES) {
  const d = DATA[loc];
  if (!d) { console.log(`✗ ${loc}: no data at all`); bad++; continue; }
  const have = Object.keys(d);
  const missing = KEYS.filter(k => !(k in d));
  const extra = have.filter(k => KEYS.indexOf(k) === -1);
  if (missing.length) { console.log(`✗ ${loc}: missing ${missing.join(', ')}`); bad++; }
  if (extra.length) { console.log(`✗ ${loc}: unknown key ${extra.join(', ')}`); bad++; }
}
if (bad) { console.log('\nREFUSING TO RUN — the key sets disagree.'); process.exit(1); }
console.log(`key sets agree: ${KEYS.length} keys × ${LOCALES.length} locales`);

/* ---- placeholder parity ------------------------------------------ */
function toks(s) { return (String(s).match(/\{\w+\}/g) || []).sort().join(','); }
let pbad = 0;
for (const k of KEYS) {
  const want = toks(T.strings[k].en);
  for (const loc of LOCALES) {
    const got = toks(DATA[loc][k]);
    if (got !== want) {
      console.log(`✗ ${loc}.${k}: placeholders "${got}" but English has "${want}"`);
      pbad++;
    }
  }
}
if (pbad) { console.log('\nREFUSING TO RUN — placeholder parity broken.'); process.exit(1); }
console.log('placeholder parity: OK');

/* ---- the bans, poisoned in BOTH directions ----------------------- */
/* ⚠ `\b` is ASCII-only and silently never matches a non-ASCII word, so
   the digit ban uses an explicit class and the operator ban is a plain
   character set. Dashes and hyphens are punctuation, NOT operators —
   banning the em-dash condemned five correct English strings on this
   build's first gate run. */
const DIGIT = /[0-9]/;
const OPERATOR = /[+×÷=−]/;
const NO_DIGIT_KEYS = ['setBand', 'bandHandful', 'bandHeap', 'bandSpill', 'instruction'];

(function poison() {
  const mustFire = ['A heap of 60', '3 + 4', 'ten × ten', 'n = 10', '9 ÷ 3', 'take − one'];
  const mustPass = ['A heap', 'Take one away — there is nothing left.', 'Ti brikker. Æsken er lukket.',
    'Der er plads til én mere', 'well-filled, half-empty'];
  let f = 0;
  for (const s of mustFire) if (!(DIGIT.test(s) || OPERATOR.test(s))) { console.log(`✗ poison: bans missed "${s}"`); f++; }
  for (const s of mustPass) if (OPERATOR.test(s)) { console.log(`✗ poison: bans condemned "${s}"`); f++; }
  if (f) { console.log('\nREFUSING TO RUN — the bans are not sound.'); process.exit(1); }
  console.log('bans poison-tested in both directions: OK');
}());

let vbad = 0;
for (const loc of LOCALES) {
  for (const k of KEYS) {
    const v = DATA[loc][k];
    if (OPERATOR.test(v)) { console.log(`✗ ${loc}.${k} carries an operator glyph`); vbad++; }
    if (NO_DIGIT_KEYS.indexOf(k) !== -1 && DIGIT.test(v)) {
      console.log(`✗ ${loc}.${k} leaks a digit: "${v}"`); vbad++;
    }
    if (!String(v).trim()) { console.log(`✗ ${loc}.${k} is empty`); vbad++; }
  }
}
if (vbad) { console.log('\nREFUSING TO RUN — string content violations.'); process.exit(1); }
console.log('content bans: OK');

if (CHECK) { console.log('\n--check: nothing written.'); process.exit(0); }

/* ---- rewrite each key's value object ----------------------------- */
function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }

let out = src, wrote = 0;
for (const k of KEYS) {
  /* match `key:<spaces>{ en: '...' }` possibly already carrying locales */
  const re = new RegExp('(^\\s*' + k + ':\\s*)\\{[\\s\\S]*?\\n?\\s*\\}(,?)$', 'm');
  const m = out.match(re);
  if (!m) { console.log(`✗ could not find the value object for ${k}`); process.exit(1); }
  const parts = ["en: '" + esc(T.strings[k].en) + "'"];
  for (const loc of LOCALES) parts.push(loc + ": '" + esc(DATA[loc][k]) + "'");
  const body = '{\n        ' + parts.join(',\n        ') + '\n      }';
  out = out.replace(re, m[1] + body + m[2]);
  wrote++;
}
fs.writeFileSync(TOOL, out);
console.log(`\nwrote ${wrote} keys × 11 locales into ${path.basename(TOOL)}`);
