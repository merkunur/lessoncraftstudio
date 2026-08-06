#!/usr/bin/env node
/* =====================================================================
   apply-sorting-hoops-locales.js — write the ten native panels' strings
   into `mini tools/sorting-hoops.js`.

   SoT: `scripts/_sorting-hoops-strings.js`. This script only MOVES data;
   every judgement in it belongs to a panel.

   ⚠ It rewrites each key's whole object, so it is idempotent: a second run
   reports every key already current and changes nothing.
   ⚠ It REFUSES to run if it cannot parse a plausible number of keys out of
   the tool, rather than silently writing none — the recorded
   completeness-check-that-certifies trap.
   ⚠ It preserves the EN value byte-for-byte. English is the source the
   panels audited; this pass must not quietly re-author it.

   Usage: node scripts/apply-sorting-hoops-locales.js [--check]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'mini tools', 'sorting-hoops.js');
const PANELS = require('./_sorting-hoops-strings.js');
const ORDER = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const CHECK = process.argv.indexOf('--check') > -1;

const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

function main() {
  let src = fs.readFileSync(TOOL, 'utf8');

  /* the key set the panels were given */
  const keys = Object.keys(PANELS.de);
  const locales = Object.keys(PANELS);
  if (locales.length !== 10) {
    console.error(`FAIL  expected 10 non-en panels, found ${locales.length}`);
    process.exit(1);
  }
  /* every panel must have delivered every key — the #42 lesson: a
     completeness check that accepts a subset CERTIFIES the gap */
  const short = locales.filter((L) => Object.keys(PANELS[L]).length !== keys.length);
  if (short.length) {
    console.error('FAIL  panel(s) missing keys: ' +
      short.map((L) => L + ' has ' + Object.keys(PANELS[L]).length + '/' + keys.length).join(', '));
    process.exit(1);
  }
  if (keys.length < 20) {
    console.error(`FAIL  only ${keys.length} keys parsed out of the SoT — refusing to run on an ` +
      'implausible field list rather than silently writing almost nothing');
    process.exit(1);
  }

  let wrote = 0, already = 0;
  const missing = [];
  for (const key of keys) {
    /* match `key: { ... },` on one logical entry */
    const re = new RegExp('(^\\s*)' + key + ':(\\s*)\\{[^}]*\\},', 'm');
    const m = re.exec(src);
    if (!m) { missing.push(key); continue; }
    /* keep EN exactly as it stands */
    const en = /\ben:\s*'((?:[^'\\]|\\.)*)'/.exec(m[0]);
    if (!en) { missing.push(key + ' (no en)'); continue; }
    const parts = ORDER.map((L) => L + ': ' + (L === 'en' ? "'" + en[1] + "'" : q(PANELS[L][key])));
    const next = m[1] + key + ':' + m[2] + '{ ' + parts.join(', ') + ' },';
    if (next === m[0]) { already++; continue; }
    src = src.slice(0, m.index) + next + src.slice(m.index + m[0].length);
    wrote++;
  }

  if (missing.length) {
    console.error('FAIL  key(s) not found in the tool: ' + missing.join(', '));
    process.exit(1);
  }

  if (CHECK) {
    if (wrote) { console.error(`FAIL  ${wrote} key(s) are STALE — re-run without --check`); process.exit(1); }
    console.log(`ok    all ${keys.length} keys carry the current panel strings`);
    return;
  }
  fs.writeFileSync(TOOL, src);
  console.log(`  ${wrote} key(s) rewritten from the native panels, ${already} already current`);
  console.log(`  ${keys.length} keys x ${locales.length} locales = ${keys.length * locales.length} strings`);
}

main();
