/* =====================================================================
   apply-baking-tray-locales.js — write the locale strings into the tool
   ---------------------------------------------------------------------
   Run:  node scripts/apply-baking-tray-locales.js [--dry-run]

   Rewrites the `strings:` block of `mini tools/baking-tray.js` from
   scripts/_baking-tray-strings.js. Idempotent: run it twice and the
   second run reports no change.

   ⚠ THE ORDER OF KEYS IS THE TOOL'S ORDER, not the data file's — the
   tool's block is the thing a reader reads, and a reshuffle on every run
   makes every diff unreviewable.

   ⚠ AND THE BANS ARE POISON-TESTED IN BOTH DIRECTIONS, with the
   exemptions written as an auditable list rather than a loosened
   pattern. A fence that rejects correct native prose teaches a panel to
   reword AROUND it instead of reporting it — that is the recorded
   `Zufallsbeutel` defect, where a likelihood ban condemned the German
   panel's own correct name.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'baking-tray.js');
const S = require('./_baking-tray-strings.js');
const DRY = process.argv.indexOf('--dry-run') > -1;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const die = (m) => { console.error('  FATAL ' + m); process.exit(1); };

/* ⚠⚠ THE BANS AND THEIR EXEMPTIONS COME FROM ONE PLACE. They used to be
   copied into this file AND into verify-baking-tray.js, and narrowing
   German `gleich` to `ist gleich` here left verify- still carrying the
   wide copy and still condemning the same correct sentence. An exemption
   has to travel with the ban it exempts — see _baking-tray-bans.js. */
const B = require('./_baking-tray-bans.js');
const w = B.word, GLYPHS = B.GLYPHS, OP_WORDS = B.OP_WORDS;

console.log('[poison — both directions, before anything is written]');
const bad = B.poison();
bad.forEach(function (m) { console.error('  FAIL ' + m); });
if (bad.length) die(bad.length + ' poison case(s) failed — the bans are not trustworthy, refusing to run');
console.log('  ok   ' + 'every poison case passes, in both directions');

/* ---- validate every authored string -------------------------------- */
const present = LOCALES.filter((l) => S[l]);
console.log(`\n[validating ${present.length} of ${LOCALES.length} locales]`);
const keys = Object.keys(S.en);
present.forEach((loc) => {
  keys.forEach((k) => {
    const v = S[loc][k];
    if (typeof v !== 'string' || !v.trim()) die(`${loc}.${k} is missing or empty`);
    if (GLYPHS.test(v)) die(`${loc}.${k} carries an operator GLYPH: "${v}"`);
    const ban = w(OP_WORDS[loc] || OP_WORDS.en);
    if (ban.test(v) && !B.exempt(loc, k)) {
      die(`${loc}.${k} carries an operator WORD: "${v}"`);
    }
    /* a count that governs a noun must carry its plural bracket; the
       check is the bracket's presence beside a count, not a word list */
    const m = /\{([abdr])\}\s+(\S+)/.exec(v);
    if (m && !/\[/.test(v) && /[a-z]{3,}/i.test(m[2])) {
      console.log(`  note  ${loc}.${k}: "{${m[1]}} ${m[2]}" has no plural bracket — confirm the locale needs none`);
    }
  });
  const extra = Object.keys(S[loc]).filter((k) => keys.indexOf(k) < 0);
  if (extra.length) die(`${loc} has keys the English does not: ${extra.join(', ')}`);
});
console.log(`  ok   ${keys.length} keys x ${present.length} locales, no operator glyph or word`);

/* ---- rewrite the tool's strings block ------------------------------ */
let src = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
let changed = 0;

keys.forEach((k) => {
  /* anchor on the KEY, and rewrite only its value object — comments
     between keys survive untouched, which is why this does not simply
     regenerate the whole block */
  const re = new RegExp('(\\n(\\s*)' + k + ':(\\s*)\\{)[^\\n]*?(\\},?)(?=\\n)');
  const m = re.exec(src);
  if (!m) die(`could not find the "${k}" entry in the tool's strings block`);
  const body = present.map((loc) => `${loc}: ${q(S[loc][k])}`).join(', ');
  const next = `${m[1]} ${body} ${m[4]}`;
  if (m[0] === next) return;
  src = src.slice(0, m.index) + next + src.slice(m.index + m[0].length);
  changed++;
});

if (!DRY && changed) fs.writeFileSync(TOOL, src, 'utf8');
console.log(`\n${DRY ? 'DRY RUN — ' : ''}${changed} key(s) rewritten in mini tools/baking-tray.js`);
if (!changed) console.log('  (already up to date)');
