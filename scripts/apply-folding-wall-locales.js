#!/usr/bin/env node
/* =====================================================================
   apply-folding-wall-locales.js — writes the eleven native panels' work
   into `mini tools/folding-wall.js`, and REFUSES to write anything that
   breaks a content ban.

   Idempotent: a second run reports every key as already current.

   ⚠ THE BANS, THEIR EXEMPTIONS AND THEIR POISON LIVE IN ONE FILE —
   `_folding-wall-bans.js` — imported by this AND by `verify-`. #44
   shipped a French exemption into `apply-` while `verify-` kept its own
   copy and went on condemning the same correct sentence.

   ⚠ IT REBUILDS THE WHOLE `strings:` BLOCK from the SoT rather than
   patching it line by line, because a needle that encodes the current
   text of what it edits has a half-life (#43: four locale needles died
   the moment the block was re-laid-out for eleven locales instead of
   eight).

   Run:  node scripts/apply-folding-wall-locales.js [--dry-run]
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const BANS = require('./_folding-wall-bans.js');
const SOT = require('./_folding-wall-strings.js');

const TOOL = path.join(__dirname, '..', 'mini tools', 'folding-wall.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.indexOf('--dry-run') > -1;

let FAIL = 0;
const die = (m) => { console.error('  FATAL ' + m); FAIL++; };

/* ---- 0. the poison must be correct before anything is written ----- */
const poison = BANS.poison();
const badPoison = poison.filter((r) => !r.ok);
if (badPoison.length) {
  badPoison.forEach((r) => console.error(`  POISON WRONG [${r.loc}] ${r.why}`));
  console.error('\nthe bans are not trustworthy — nothing written.');
  process.exit(1);
}
console.log(`poison: ${poison.length}/${poison.length} correct`);

/* ---- 1. every key, every locale, present and non-empty ----------- */
const KEYS = Object.keys(SOT);
for (const k of KEYS) {
  for (const loc of LOCALES) {
    const v = SOT[k][loc];
    if (typeof v !== 'string' || !v.length) die(`${k}.${loc} is missing or empty`);
  }
}
/* ⚠ AND NO EXTRA LOCALE — a stray key silently ships untested copy */
for (const k of KEYS) {
  for (const loc of Object.keys(SOT[k])) {
    if (LOCALES.indexOf(loc) < 0) die(`${k} carries an unknown locale "${loc}"`);
  }
}

/* ---- 2. the bans, per locale ------------------------------------- */
for (const loc of LOCALES) {
  const set = {};
  for (const k of KEYS) set[k] = SOT[k][loc];
  const bad = BANS.checkStrings(set, loc);
  for (const b of bad) die(`[${loc}] ${b.key}: ${b.ban} — ${b.why} :: "${b.value}"`);
}

/* ---- 3. the plural marker is well-formed ------------------------- */
/* `[x|one|many]` resolves BEFORE interpolation. ⚠ The slots are
   one|many, never singular|plural: Finnish `riviä` is a partitive
   singular after a numeral and "correcting" it ships the "1 rows" bug. */
for (const k of KEYS) {
  for (const loc of LOCALES) {
    const v = SOT[k][loc];
    const marks = v.match(/\[[^\]]*\]/g) || [];
    for (const m of marks) {
      if (!/^\[[a-z]\|[^|\]]*\|[^\]]*\]$/.test(m)) die(`[${loc}] ${k}: malformed plural marker ${m}`);
    }
  }
}

/* ---- 4. every placeholder the English uses survives -------------- */
/* ⚠ A DROPPED PLACEHOLDER IS A SENTENCE THAT NAMES NOTHING, and it is
   invisible to a reader who does not speak the language. */
for (const k of KEYS) {
  const want = (SOT[k].en.match(/\{[a-z]+\}/g) || []).sort();
  for (const loc of LOCALES) {
    const got = (SOT[k][loc].match(/\{[a-z]+\}/g) || []).sort();
    const missing = want.filter((w) => got.indexOf(w) < 0);
    if (missing.length) die(`[${loc}] ${k}: dropped ${missing.join(', ')}`);
    const extra = got.filter((g) => want.indexOf(g) < 0);
    if (extra.length) die(`[${loc}] ${k}: invented ${extra.join(', ')}`);
  }
}

if (FAIL) {
  console.error(`\n${FAIL} problem(s) — nothing written.`);
  process.exit(1);
}

/* ---- 5. rebuild the strings block -------------------------------- */
const src = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
const start = src.indexOf('    strings: {');
const end = src.indexOf('\n    settings: [');
if (start < 0 || end < start) { console.error('  FATAL could not locate the strings block'); process.exit(1); }

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const lines = ['    strings: {'];
KEYS.forEach((k, i) => {
  const pad = ' '.repeat(Math.max(1, 14 - k.length));
  const body = LOCALES.map((loc) => `${loc}: '${esc(SOT[k][loc])}'`).join(', ');
  lines.push(`      ${k}:${pad}{ ${body} }${i === KEYS.length - 1 ? '' : ','}`);
});
lines.push('    },');

const next = src.slice(0, start) + lines.join('\n') + src.slice(end);

if (next === src) {
  console.log('\nalready current — nothing to do.');
  process.exit(0);
}
if (DRY) {
  console.log(`\nwould rewrite ${KEYS.length} keys x ${LOCALES.length} locales (dry run).`);
  process.exit(0);
}
fs.writeFileSync(TOOL, next, 'utf8');
console.log(`\nwrote ${KEYS.length} keys x ${LOCALES.length} locales into mini tools/folding-wall.js`);
