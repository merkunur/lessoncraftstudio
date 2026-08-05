#!/usr/bin/env node
/* =====================================================================
   apply-wodb-locales.js — write the native panels' work into wodb.js.

   The SoT is `scripts/_wodb-panels/<locale>.json`, one file per locale,
   each produced by that locale's own three-person panel (linguist +
   K-3 teacher on their national curriculum + B2C marketer). The English
   file is a panel output too — English is a locale, and it is the one
   nobody reviews.

   ⚠ NEVER HAND-EDIT THE `strings:` BLOCK once these files exist. This
   script owns it, and a hand edit is silently overwritten on the next
   run. (It is also why mutation needles against the strings must
   self-anchor on the live file rather than carry a literal: a recorded
   defect had four needles die the moment an apply- script re-padded the
   block for eleven locales instead of eight.)

   ⚠ It refuses to run on a partial panel set unless --partial is given,
   because a half-applied locale is worse than an unapplied one: the
   shell falls back to `en`, so the tool looks FINISHED while half its
   copy is in the wrong language.

   Run:  node scripts/apply-wodb-locales.js [--partial] [--dry-run]
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'wodb.js');
const PANELS = path.join(__dirname, '_wodb-panels');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const DRY = process.argv.indexOf('--dry-run') >= 0;
const PARTIAL = process.argv.indexOf('--partial') >= 0;

/* single-quoted JS string literal, the way the block is already written */
function q(s) {
  return "'" + String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n') + "'";
}

const have = LOCALES.filter((l) => fs.existsSync(path.join(PANELS, l + '.json')));
const missing = LOCALES.filter((l) => have.indexOf(l) < 0);
if (missing.length && !PARTIAL) {
  console.error('FAIL missing panel output for: ' + missing.join(', '));
  console.error('     A half-applied locale is worse than an unapplied one — the shell falls');
  console.error('     back to `en`, so the tool looks finished while half its copy is in the');
  console.error('     wrong language. Pass --partial only if you mean it.');
  process.exit(1);
}
if (missing.length) console.log('  ⚠ PARTIAL RUN — no panel yet for: ' + missing.join(', '));

const panel = {};
for (const l of have) {
  panel[l] = JSON.parse(fs.readFileSync(path.join(PANELS, l + '.json'), 'utf8'));
}

/* every key any panel supplied */
const keys = [];
for (const l of have) for (const k of Object.keys(panel[l])) if (keys.indexOf(k) < 0) keys.push(k);

let src = fs.readFileSync(TOOL, 'utf8').replace(/\r\n/g, '\n');
let done = 0, skipped = [], shortfall = [];

for (const key of keys) {
  /* the block is one physical line per key: `key: {en:'…',de:'…'}` */
  const re = new RegExp('(\\n(\\s*)' + key + ':(\\s*))\\{[\\s\\S]*?\\}(,?)(?=\\n)');
  const m = re.exec(src);
  if (!m) { skipped.push(key); continue; }

  const supplied = LOCALES.filter((l) => panel[l] && panel[l][key]);
  if (supplied.length < LOCALES.length) shortfall.push(key + ' (' + supplied.length + '/11)');

  /* ⚠ preserve any locale a panel did not supply, rather than dropping
     it — otherwise a partial run DELETES shipped copy. */
  const existing = {};
  const body = m[0].slice(m[1].length);
  const pairRe = /([a-z]{2})\s*:\s*'((?:[^'\\]|\\.)*)'/g;
  let pm;
  while ((pm = pairRe.exec(body))) existing[pm[1]] = pm[2];

  const parts = [];
  for (const l of LOCALES) {
    if (panel[l] && panel[l][key]) parts.push(l + ':' + q(panel[l][key]));
    else if (existing[l] !== undefined) parts.push(l + ":'" + existing[l] + "'");
  }
  src = src.slice(0, m.index) + m[1] + '{' + parts.join(',') + '}' + m[4] + src.slice(m.index + m[0].length);
  done++;
}

console.log('  applied ' + done + ' key(s) across ' + have.length + ' locale(s)');
if (skipped.length) {
  console.error('  FAIL ' + skipped.length + ' key(s) are in a panel file but NOT in wodb.js: ' +
    skipped.join(', '));
  console.error('       A panel wrote copy that can never render. Fix the key name or the tool.');
  process.exit(1);
}
if (shortfall.length) console.log('  ⚠ not yet 11/11: ' + shortfall.join(', '));

if (DRY) { console.log('  (dry run — nothing written)'); process.exit(0); }
fs.writeFileSync(TOOL, src);
console.log('  wrote ' + TOOL);
