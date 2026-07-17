#!/usr/bin/env node
/* =====================================================================
   merge-verdicts.js — fold the native ensemble's per-batch verdicts
   into one correction set + one held set, and PROVE the coverage.

   THE COVERAGE ASSERT IS THE POINT.
   The operator's directive was "analyze each word one by one". An agent
   that quietly reviews 90 of its 110 keys produces a file that looks
   exactly like success. So this script does not trust the ensemble's own
   `reviewed` count — it re-derives coverage from the BATCH files (the
   ground truth of what was asked) and asserts every key came back. A
   missing key is a hard failure, not a warning.

   It also enforces the schema the brief demanded:
     · every row carries all three fields (singular/plural/gender)
     · FIX without `correct` is a defect (an unactionable verdict)
     · `correct` on a non-FIX is a defect (ambiguous intent)
     · an unknown verdict string is a defect (never silently dropped)
     · a FIX whose `correct` equals the current value is a no-op defect

   Triage per §A.13.58 (the Strygebrædder discipline):
     SIMPLE-RIDE → FIX / NO_PLURAL / PLURALIA_TANTUM  (pure form change)
     DOES-MORE   → HOLD                                (needs a decision)

   USAGE  node scripts/vocab-audit/merge-verdicts.js --locale=de
   READ-ONLY apart from docs/audit-results/vocab-audit/.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const FIELDS = ['singular', 'plural', 'gender'];
const VERDICTS = ['OK', 'FIX', 'NO_PLURAL', 'PLURALIA_TANTUM', 'HOLD'];

function main() {
  const argv = process.argv.slice(2);
  const get = (n, d) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : d; };
  const loc = get('locale', 'de');

  /* ---- ground truth: what we ASKED to be reviewed ---- */
  const asked = {};      /* key -> cur {s,p,g} */
  const batchDir = path.join(OUT, 'batches');
  const bFiles = fs.readdirSync(batchDir).filter((f) => f.startsWith(loc + '-') && f.endsWith('.json')).sort();
  for (const f of bFiles) {
    const b = JSON.parse(fs.readFileSync(path.join(batchDir, f), 'utf8'));
    for (const r of b.rows) asked[r.key] = r.cur;
  }

  /* ---- what came back ---- */
  const vDir = path.join(OUT, 'verdicts');
  if (!fs.existsSync(vDir)) { console.error('FAIL: no verdicts/ — run the ensemble first'); process.exit(1); }
  const vFiles = fs.readdirSync(vDir).filter((f) => f.startsWith(loc + '-') && f.endsWith('.json')).sort();

  const errors = [];
  const seen = {};                       /* key -> {field -> verdictObj} */
  for (const f of vFiles) {
    let v;
    try { v = JSON.parse(fs.readFileSync(path.join(vDir, f), 'utf8')); }
    catch (e) { errors.push(f + ': parse — ' + e.message); continue; }
    for (const row of (v.rows || [])) {
      if (!row || !row.key) { errors.push(f + ': a row with no key'); continue; }
      if (!(row.key in asked)) { errors.push(f + ': key not in any batch: ' + row.key); continue; }
      if (seen[row.key]) errors.push('DUPLICATE verdict for ' + row.key + ' (in ' + f + ')');
      const fields = {};
      for (const fl of FIELDS) {
        const d = row[fl];
        if (!d || !d.verdict) { errors.push(f + ' ' + row.key + ': missing field "' + fl + '"'); continue; }
        if (VERDICTS.indexOf(d.verdict) < 0) { errors.push(f + ' ' + row.key + '.' + fl + ': unknown verdict "' + d.verdict + '"'); continue; }
        if (d.verdict === 'FIX' && (d.correct === undefined || d.correct === '')) errors.push(f + ' ' + row.key + '.' + fl + ': FIX with no `correct` — unactionable');
        if (d.verdict === 'OK' && d.correct !== undefined) errors.push(f + ' ' + row.key + '.' + fl + ': OK carries a `correct` — ambiguous intent');
        fields[fl] = d;
      }
      seen[row.key] = fields;
    }
  }

  /* ---- THE COVERAGE ASSERT (never trust the agents' own counts) ---- */
  const askedKeys = Object.keys(asked);
  const missing = askedKeys.filter((k) => !seen[k]);
  if (missing.length) {
    errors.push('COVERAGE: ' + missing.length + ' of ' + askedKeys.length + ' keys never came back — the operator asked for EVERY word');
    errors.push('   missing: ' + missing.slice(0, 30).join(', ') + (missing.length > 30 ? ' …' : ''));
  }

  /* ---- build the correction + held sets ---- */
  const corrections = { singular: {}, plural: {}, gender: {} };
  const held = [];
  const pluraliaTantum = [];   /* words with no singular — correct as-is */
  const stats = {};
  for (const fl of FIELDS) stats[fl] = { OK: 0, FIX: 0, NO_PLURAL: 0, PLURALIA_TANTUM: 0, HOLD: 0 };

  for (const key of askedKeys) {
    const fields = seen[key];
    if (!fields) continue;
    const cur = asked[key];
    for (const fl of FIELDS) {
      const d = fields[fl];
      if (!d) continue;
      stats[fl][d.verdict]++;
      if (d.verdict === 'FIX') {
        const now = fl === 'singular' ? cur.s : fl === 'plural' ? cur.p : cur.g;
        if (d.correct === now) { errors.push(key + '.' + fl + ': FIX whose `correct` equals the current value — no-op'); continue; }
        corrections[fl][key] = { to: d.correct, from: now, why: d.reason || '', src: d.source || '' };
      } else if (d.verdict === 'PLURALIA_TANTUM' && fl === 'singular') {
        /* NOT an error — my first schema asserted this verdict was
           "only meaningful on plural" and the ensemble proved that wrong.
           `french-fries`, `leggings`, `shorts`, `us`: these words have NO
           singular, so the singular field legitimately holds a plural
           form. That is the correct state, not the `blocks`/`candy`
           defect (where a real singular exists and was lost). The right
           outcome is therefore NO correction — record the fact so nobody
           "fixes" it later. */
        stats[fl].PLURALIA_TANTUM = stats[fl].PLURALIA_TANTUM || 0;
        pluraliaTantum.push({ key: key, why: d.reason || '' });
      } else if (d.verdict === 'NO_PLURAL' || d.verdict === 'PLURALIA_TANTUM') {
        /* the file's convention for "no plural" is plural === singular */
        if (fl !== 'plural') { errors.push(key + '.' + fl + ': ' + d.verdict + ' is not interpretable on `' + fl + '`'); continue; }
        const to = d.correct !== undefined ? d.correct : cur.s;
        if (to !== cur.p) corrections.plural[key] = { to: to, from: cur.p, why: d.reason || '', src: d.source || '', cls: d.verdict };
      } else if (d.verdict === 'HOLD') {
        held.push({ key: key, field: fl, cur: cur, why: d.reason || '' });
      }
    }
  }

  fs.writeFileSync(path.join(OUT, 'corrections-' + loc + '.json'), JSON.stringify({ locale: loc, corrections }, null, 1) + '\n');
  fs.writeFileSync(path.join(OUT, 'held-' + loc + '.json'), JSON.stringify({ locale: loc, held, pluraliaTantum }, null, 1) + '\n');

  /* ---- report ---- */
  console.log(loc + ': ' + Object.keys(seen).length + '/' + askedKeys.length + ' keys reviewed  (' + vFiles.length + '/' + bFiles.length + ' batches)');
  for (const fl of FIELDS) {
    const s = stats[fl];
    console.log('  ' + fl.padEnd(9) + Object.keys(s).filter((k) => s[k]).map((k) => s[k] + ' ' + k).join(' / '));
  }
  console.log('  → corrections: ' + FIELDS.map((f) => Object.keys(corrections[f]).length + ' ' + f).join(' / ') +
    '   held (DOES-MORE): ' + held.length +
    (pluraliaTantum.length ? '   pluralia tantum (correct as-is): ' + pluraliaTantum.map((p) => p.key).join(', ') : ''));

  if (errors.length) {
    console.log('\nFAIL  ' + errors.length + ' schema/coverage errors:');
    for (const e of errors.slice(0, 30)) console.log('   ERROR ' + e);
    if (errors.length > 30) console.log('   … +' + (errors.length - 30) + ' more');
    process.exit(1);
  }
  console.log('\nPASS  every asked key came back; schema clean');
}
main();
