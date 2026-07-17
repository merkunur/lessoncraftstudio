#!/usr/bin/env node
/* =====================================================================
   flag-conflicts.js — detect corrections that CONTRADICT an earlier
   native decision, AFTER a blind review.

   THE DESIGN POINT: blind judgment + post-hoc detection.
   §A.13.58 layer 2 says the re-verify set includes the ALREADY-APPROVED
   — a first-pass call can be wrong even after native sign-off. So the
   reviewers must NOT be told which keys a previous arc already
   confirmed: telling them would bias them into ratifying, and we would
   learn nothing. We let them judge blind, then detect afterwards where
   they landed on a key that already carries a native decision.

   A conflict is NOT an error. It is either
     (a) the new native is right and the old decision was wrong  → a real
         finding, worth more than a hundred confirmations, or
     (b) the new native is wrong                                 → the
         adversarial pass should kill it.
   Either way it must NOT ship on the same silent path as an ordinary
   correction: it goes to the adversarial pass AND to the operator.

   The protected sets are DERIVED FROM THE GIT DIFFS, never hand-typed —
   a hand-typed list drifts the moment someone ships another wave.

   USAGE  node scripts/vocab-audit/flag-conflicts.js --locale=nl
   READ-ONLY apart from docs/audit-results/vocab-audit/conflicts-<loc>.json
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');

/* Commits that carry a NATIVE-CONFIRMED decision per locale. Each entry:
   the commit, and what its decision was about (so the report can say WHY
   a key is protected rather than just that it is). */
const PRIOR_ARCS = {
  nl: [
    { sha: 'c7de1a40', what: 'gender d→h (66 keys, Van Dale-confirmed, 0 held) — the het neuter wave' },
    { sha: '5310b329', what: 'gender h→d (12 keys, Van Dale-confirmed) — the reverse cluster: animals, the 6 -hoek polygons, doos/kist, science/toast' },
  ],
  de: [
    { sha: '7aa69cde', what: 'gender wave (51 keys, Duden-confirmed)' },
    { sha: '92dc275d', what: 'plural wave (52 keys, 2026-07 native audit)' },
    { sha: '5f976993', what: 'gender wave (55 keys, 2026-07 native audit)' },
    { sha: '69ee10ea', what: 'singular wave (11 keys, 2026-07 native audit)' },
  ],
  no: [{ sha: '51a0d957', what: 'gender/i18n wave (121 entries)' }],
  sv: [
    { sha: 'c8c16d11', what: 'gender-code audit (22 keys, neuter/common + d-leak)' },
    { sha: '3314cb5c', what: 'gender-code sweep top-up (11 keys, n→t)' },
    { sha: 'cedb564e', what: 'gender parallelogram n→t (-gram neuter class) — Nordic arc final' },
  ],
  /* NOT registered, deliberately — surfaced, not absorbed:
     8ec725ae "Fix 361 stripped diacritics + 19 gender errors across 11-language
     vocabulary" touches 197 keys but only ~19 carry a gender decision. keysTouchedBy()
     reads the key diff and cannot tell the two apart, so registering it would mark all
     197 gender-protected at ~90% false and drown the real signal. Those ~19 therefore
     rely on the adversarial pass + the operator hold, not on this scan. */
};

/* Items an earlier arc examined and DELIBERATELY LEFT ALONE. These are
   decisions, not misses — re-flipping one silently would re-litigate a
   ruling. Sourced from the prior commit bodies + the arc memory. */
const HELD_BY_DECISION = {
  nl: {
    football: 'sports twijfel — stayed de by decision', golf: 'sports twijfel — stayed de',
    hockey: 'sports twijfel — stayed de', tennis: 'sports twijfel — stayed de',
    'table-tennis': 'sports twijfel — stayed de', tape: 'stayed de by decision',
    apron: 'stayed de by decision', plesiosaurus: 'stayed de by decision',
    grapefruit: 'held twijfel — stayed de', toad: 'de pad (animal) — correct; do not follow trail/het pad',
    trapezium: 'het trapezium stays het while the -hoek shapes are de',
  },
  de: {},
  no: {},
  /* sv: the three prior sv arcs are gender-code sweeps whose commit bodies record no
     deliberate leave-alone rulings — every key they examined they moved. Empty is the
     accurate state, not a stub: nothing is known to have been held. */
  sv: {},
};

/* Keys a prior arc flagged as KNOWN-DEFECT but deliberately did not fix
   (Strygebrædder DOES-MORE). A correction landing here is EXPECTED and
   welcome — reported as `expected`, not as a conflict. */
const KNOWN_CARRY_FORWARD = {
  nl: {
    calf: 'Kalven→kalveren (irregular -eren)', padlock: 'Hangslotten→hangsloten (tt→t)',
    trillium: 'Driebladden→driebladen (dd→d)', trail: 'Padden→paden (homonym plural)',
    'medical-chart': '→medische dossiers (adjective agreement)', salt: 'Zouten→mass',
    thunderstorm: 'Onweren→mass', 'dragon-fruit': '→uncountable',
  },
  de: {}, no: {},
  /* sv: no prior arc flagged-but-deferred a known sv defect. The `camp`
     ["Läger","Lägerar","n"] class (both fields wrong from one missing SV_ETT_WORDS
     entry) is NEW ground found this arc — not a carry-forward. */
  sv: {},
};

/* ---- which keys did a prior commit actually touch? read the diff ---- */
function keysTouchedBy(sha) {
  let out;
  try {
    out = execFileSync('git', ['show', sha, '--', 'REFERENCE TRANSLATIONS/image-vocabulary.js'],
      { cwd: REPO, maxBuffer: 64 * 1024 * 1024, encoding: 'utf8' });
  } catch (e) { return null; }               /* commit not present — report, don't guess */
  const keys = new Set();
  for (const line of out.split('\n')) {
    if (line[0] !== '+' || line.startsWith('+++')) continue;
    const m = line.match(/^\+\s*"([^"]+)":\s*\{/);
    if (m) keys.add(m[1]);
  }
  return keys;
}

function main() {
  const argv = process.argv.slice(2);
  const get = (n, d) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? a.split('=')[1] : d; };
  const loc = get('locale', 'nl');

  const cPath = path.join(OUT, 'corrections-' + loc + '.json');
  if (!fs.existsSync(cPath)) { console.error('FAIL: run merge-verdicts.js --locale=' + loc + ' first'); process.exit(1); }
  const C = JSON.parse(fs.readFileSync(cPath, 'utf8')).corrections;

  /* build the protected map: key -> [{sha, what}] */
  const protectedBy = {};
  for (const arc of (PRIOR_ARCS[loc] || [])) {
    const keys = keysTouchedBy(arc.sha);
    if (!keys) { console.log('  ⚠ commit ' + arc.sha + ' not found — cannot check it (reported, not assumed clean)'); continue; }
    for (const k of keys) (protectedBy[k] || (protectedBy[k] = [])).push(arc);
    console.log('  ' + arc.sha + '  ' + keys.size + ' keys  — ' + arc.what);
  }

  const held = HELD_BY_DECISION[loc] || {};
  const carry = KNOWN_CARRY_FORWARD[loc] || {};
  const conflicts = [], expected = [], reLitigated = [];

  for (const field of ['singular', 'plural', 'gender']) {
    for (const key of Object.keys(C[field] || {})) {
      const c = C[field][key];
      const row = { key, field, from: c.from, to: c.to, why: c.why || '' };
      if (carry[key]) { expected.push(Object.assign({ note: carry[key] }, row)); continue; }
      if (held[key]) { reLitigated.push(Object.assign({ note: held[key] }, row)); continue; }
      if (protectedBy[key]) {
        /* only a GENDER correction contradicts a gender arc; a plural fix
           on the same key is new ground, not a contradiction */
        const genderArc = protectedBy[key].some((a) => /gender/.test(a.what));
        if (field === 'gender' && genderArc) {
          conflicts.push(Object.assign({ note: protectedBy[key].map((a) => a.sha + ' ' + a.what).join(' | ') }, row));
        }
      }
    }
  }

  console.log('\n' + loc + ' conflict scan:');
  if (expected.length) {
    console.log('\n  ✓ EXPECTED — a prior arc flagged these as known defects and deliberately did NOT fix them');
    console.log('    (Strygebrædder DOES-MORE; this leg is where they were always meant to land):');
    for (const e of expected) console.log('     ' + (e.key + '.' + e.field).padEnd(24) + '"' + e.from + '" → "' + e.to + '"   [' + e.note + ']');
  }
  if (reLitigated.length) {
    console.log('\n  ⚠ RE-LITIGATED — a prior native EXAMINED these and deliberately left them alone.');
    console.log('    Not necessarily wrong, but it must not ship silently — adversarial pass + operator:');
    for (const r of reLitigated) console.log('     ' + (r.key + '.' + r.field).padEnd(24) + '"' + r.from + '" → "' + r.to + '"\n        prior decision: ' + r.note + '\n        now claims: ' + r.why.slice(0, 110));
  }
  if (conflicts.length) {
    console.log('\n  🔴 CONTRADICTS-SHIPPED — these reverse a NATIVE-CONFIRMED shipped decision.');
    console.log('    Either the new native is right (a real finding) or wrong (the adversarial pass');
    console.log('    must kill it). Never ships on the ordinary path:');
    for (const c of conflicts) console.log('     ' + (c.key + '.' + c.field).padEnd(24) + '"' + c.from + '" → "' + c.to + '"\n        shipped by: ' + c.note + '\n        now claims: ' + c.why.slice(0, 110));
  }
  if (!expected.length && !reLitigated.length && !conflicts.length) console.log('  none — no correction touches a prior decision');

  fs.writeFileSync(path.join(OUT, 'conflicts-' + loc + '.json'),
    JSON.stringify({ locale: loc, conflicts, reLitigated, expected }, null, 1) + '\n');
  console.log('\n→ conflicts-' + loc + '.json   (' + conflicts.length + ' contradict / ' +
    reLitigated.length + ' re-litigated / ' + expected.length + ' expected)');
}
main();
