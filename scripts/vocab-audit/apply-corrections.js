#!/usr/bin/env node
/* =====================================================================
   apply-corrections.js — surgical, per-key, single-field rewrite of
   REFERENCE TRANSLATIONS/image-vocabulary.js.

   WHY NOT THE "SANCTIONED" PATH
   -----------------------------
   scripts/build-image-vocabulary.js + vocabulary-corrections.json LOOK
   like the official pipeline. They are a footgun: raw holds 1,246 keys,
   the built file holds 1,263, and the corrections JSON was abandoned
   2026-03-01. Running the builder today would (a) DELETE 17 hand-added
   keys, (b) revert ~378 gender corrections shipped by five prior hand
   commits, and (c) re-introduce a fixed window.ImageVocab bug. The prior
   arcs (c7de1a40, 7aa69cde, 51a0d957) all bypassed it and edited the
   built file directly. So does this. See --help of that builder's guard.

   THE SAFETY PROPERTY
   -------------------
   Every key lives on exactly one line, whose object portion is strict
   JSON. Before touching a line we PARSE it and require
   JSON.stringify(parse(x)) === x — a byte-exact round-trip. A line that
   fails that check is SKIPPED and reported, never rewritten. Verified:
   1263/1263 lines round-trip today, so a mismatch means the file's shape
   changed under us — exactly when a blind regex would corrupt data.

   Only ONE (locale, field) moves per run. Everything else — every other
   locale, every other key, whitespace, the trailing comma, the file's
   header — is untouched by construction. `verify-vocab-diff.js` then
   proves that independently.

   USAGE
     node scripts/vocab-audit/apply-corrections.js --locale=de --field=plural [--apply]
   Dry-run by default. --apply writes.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const REL = 'REFERENCE TRANSLATIONS/image-vocabulary.js';
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const IDX = { singular: 0, plural: 1, gender: 2 };
const LINE_RE = /^(\s*"([^"]+)":\s*)(\{.*\})(,?)\s*$/;

function main() {
  const argv = process.argv.slice(2);
  const get = (n, d) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : d; };
  const loc = get('locale', 'de');
  const field = get('field', 'plural');
  const apply = argv.includes('--apply');
  if (!(field in IDX)) { console.error('FAIL: --field=<singular|plural|gender>'); process.exit(1); }

  const C = JSON.parse(fs.readFileSync(path.join(OUT, 'corrections-' + loc + '.json'), 'utf8'));
  const set = C.corrections[field] || {};
  const keys = Object.keys(set);
  if (!keys.length) { console.log('nothing to apply for ' + loc + '.' + field); return; }

  const file = path.join(REPO, REL);
  const src = fs.readFileSync(file, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const lines = src.split(/\r?\n/);

  const applied = [], skipped = [], notFound = new Set(keys);
  let changedLines = 0;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(LINE_RE);
    if (!m) continue;
    const key = m[2];
    if (!(key in set)) continue;
    notFound.delete(key);

    /* THE ROUND-TRIP GUARD — refuse to rewrite what we cannot reproduce */
    let obj;
    try { obj = JSON.parse(m[3]); }
    catch (e) { skipped.push(key + ': line is not parseable JSON'); continue; }
    if (JSON.stringify(obj) !== m[3]) { skipped.push(key + ': line does not round-trip byte-exactly — shape changed; refusing to rewrite'); continue; }

    const arr = obj[loc];
    if (!Array.isArray(arr)) { skipped.push(key + ': locale ' + loc + ' missing'); continue; }
    const at = IDX[field];
    if (at >= arr.length) { skipped.push(key + ': ' + loc + ' has no field ' + field + ' (arity ' + arr.length + ')'); continue; }

    const cur = arr[at], want = set[key].to, from = set[key].from;
    /* the value must be what the reviewer actually saw — otherwise the
       file moved under the ensemble and the verdict may not apply */
    if (cur !== from) { skipped.push(key + ': current "' + cur + '" ≠ reviewed "' + from + '" — stale verdict, refusing'); continue; }
    if (cur === want) { skipped.push(key + ': already "' + want + '" — no-op'); continue; }

    arr[at] = want;
    lines[i] = m[1] + JSON.stringify(obj) + m[4];
    changedLines++;
    applied.push({ key, from: cur, to: want, why: set[key].why, cls: set[key].cls || 'FIX' });
  }

  for (const k of notFound) skipped.push(k + ': key not found in the file');

  console.log((apply ? 'APPLY' : 'DRY-RUN') + '  ' + loc + '.' + field + '  ' +
    applied.length + '/' + keys.length + ' corrections  (' + changedLines + ' lines)');
  for (const a of applied) {
    console.log('   ' + a.key.padEnd(20) + '"' + a.from + '" → "' + a.to + '"' +
      (a.cls && a.cls !== 'FIX' ? '  [' + a.cls + ']' : '') + (a.why ? '   — ' + a.why.slice(0, 72) : ''));
  }
  if (skipped.length) {
    console.log('\n  SKIPPED ' + skipped.length + ' (nothing was rewritten for these):');
    for (const s of skipped) console.log('   · ' + s);
  }

  if (apply) {
    if (skipped.some((s) => s.includes('round-trip'))) { console.error('\nFAIL: a line failed the round-trip guard — aborting the whole run'); process.exit(1); }
    fs.writeFileSync(file, lines.join(eol));
    console.log('\n→ wrote ' + REL);
    console.log('  now PROVE it:  node scripts/vocab-audit/verify-vocab-diff.js --locale=' + loc + ' --field=' + field + ' --expect=' + applied.length);
  } else {
    console.log('\n(dry-run — nothing written; re-run with --apply)');
  }
}
main();
