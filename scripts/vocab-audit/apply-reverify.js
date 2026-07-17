#!/usr/bin/env node
/* =====================================================================
   apply-reverify.js — fold the SECOND native pass's verdicts into the
   correction set (§A.13.58 layer 2/4: "dictionary re-verify incl. the
   already-approved"; the confirm set is the bounded set).

   The second pass was briefed ADVERSARIALLY — its job was to refute,
   not to ratify. So its verdicts OVERRIDE the first pass:

     CONFIRM  → the correction survives, and ships
     REJECT   → the correction is DROPPED. The first pass was wrong and
                the original value was right. This is the most valuable
                outcome in the whole arc: it is a defect caught before it
                reached a child, not after.
     AMEND    → ship `better` instead of `to`
     ESCALATE → move to HELD. Not a form fix; it needs an operator
                decision. (e.g. `hot` m→n: "n" is as invented as "m" —
                *das Heiß* is not a German noun; and 21 identical
                adjectives carry the same default untouched, so fixing
                one makes the data LESS consistent.)

   A correction with NO second-pass verdict is DROPPED, not defaulted to
   confirm — silence is not approval. That would let a re-verify that
   quietly skipped rows look identical to one that passed everything.

   USAGE  node scripts/vocab-audit/apply-reverify.js --locale=de [--write]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');

function main() {
  const argv = process.argv.slice(2);
  const get = (n, d) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : d; };
  const loc = get('locale', 'de');
  const write = argv.includes('--write');

  const cPath = path.join(OUT, 'corrections-' + loc + '.json');
  const C = JSON.parse(fs.readFileSync(cPath, 'utf8'));
  const H = JSON.parse(fs.readFileSync(path.join(OUT, 'held-' + loc + '.json'), 'utf8'));

  /* ---- gather the second pass ---- */
  const rvDir = path.join(OUT, 'reverify');
  const rv = {};                     /* "key|field" -> verdictObj */
  let rvCount = 0;
  for (const f of fs.readdirSync(rvDir).filter((x) => x.startsWith(loc + '-') && x.endsWith('.json'))) {
    const j = JSON.parse(fs.readFileSync(path.join(rvDir, f), 'utf8'));
    for (const r of j.rows || []) { rv[r.key + '|' + r.field] = r; rvCount++; }
  }

  const kept = { singular: {}, plural: {}, gender: {} };
  const dropped = [], amended = [], escalated = [], unreviewed = [];

  for (const field of ['singular', 'plural', 'gender']) {
    for (const key of Object.keys(C.corrections[field] || {})) {
      const c = C.corrections[field][key];
      const v = rv[key + '|' + field];
      if (!v) { unreviewed.push(key + '.' + field); continue; }   /* silence ≠ approval */
      if (v.verdict === 'CONFIRM') kept[field][key] = c;
      else if (v.verdict === 'REJECT') dropped.push({ key, field, to: c.to, from: c.from, note: v.note || '' });
      else if (v.verdict === 'AMEND') {
        if (!v.better) { dropped.push({ key, field, to: c.to, from: c.from, note: 'AMEND with no `better` — unactionable' }); continue; }
        kept[field][key] = Object.assign({}, c, { to: v.better, why: (c.why || '') + ' [amended: ' + (v.note || '') + ']' });
        amended.push({ key, field, was: c.to, now: v.better, note: v.note || '' });
      } else if (v.verdict === 'ESCALATE') {
        escalated.push({ key, field, to: c.to, from: c.from, note: v.note || '' });
        H.held.push({ key: key, field: field, cur: null, why: 'ESCALATED by re-verify: ' + (v.note || '') });
      }
    }
  }

  /* ---- report ---- */
  const n = (o) => Object.keys(o).length;
  console.log(loc + ' re-verify fold:  ' + rvCount + ' second-pass verdicts');
  console.log('  kept:      ' + ['singular', 'plural', 'gender'].map((f) => n(kept[f]) + ' ' + f).join(' / '));
  if (dropped.length) {
    console.log('\n  ✗ DROPPED (the second pass refuted the first — the original value was right):');
    for (const d of dropped) console.log('     ' + (d.key + '.' + d.field).padEnd(26) + '"' + d.from + '" → "' + d.to + '"  ✗\n        ' + d.note.slice(0, 150));
  }
  if (amended.length) {
    console.log('\n  ~ AMENDED (a fix was needed, but not that one):');
    for (const a of amended) console.log('     ' + (a.key + '.' + a.field).padEnd(26) + '"' + a.was + '" → "' + a.now + '"\n        ' + a.note.slice(0, 150));
  }
  if (escalated.length) {
    console.log('\n  ↑ ESCALATED to held (needs an operator decision, not a form fix):');
    for (const e of escalated) console.log('     ' + (e.key + '.' + e.field).padEnd(26) + '"' + e.from + '" → "' + e.to + '"\n        ' + e.note.slice(0, 200));
  }
  if (unreviewed.length) {
    console.log('\n  ⚠ NO second-pass verdict — DROPPED (silence is not approval): ' + unreviewed.length);
    console.log('     ' + unreviewed.slice(0, 20).join(', ') + (unreviewed.length > 20 ? ' …' : ''));
  }

  if (write) {
    fs.writeFileSync(cPath, JSON.stringify({ locale: loc, corrections: kept, reverified: true }, null, 1) + '\n');
    fs.writeFileSync(path.join(OUT, 'held-' + loc + '.json'), JSON.stringify(H, null, 1) + '\n');
    fs.writeFileSync(path.join(OUT, 'rejected-' + loc + '.json'), JSON.stringify({ locale: loc, dropped, amended, escalated, unreviewed }, null, 1) + '\n');
    console.log('\n→ corrections-' + loc + '.json now holds ONLY re-verified corrections');
    console.log('  held-' + loc + '.json  +' + escalated.length + ' escalated');
    console.log('  rejected-' + loc + '.json  (the audit trail of what the second pass killed)');
  } else {
    console.log('\n(dry-run — nothing written; re-run with --write)');
  }
}
main();
