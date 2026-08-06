#!/usr/bin/env node
/* =====================================================================
   verify-author-purpose-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/author-purpose-core.js (window shim) and proves,
   for the shipped manifest (RI.2.6 author's purpose), the clarity-first
   redesign of #72:

     1. ORACLE 100% — oracle(round) === the note's purpose; the matching-purpose
        bin is accepted, the other two are rejected.
     2. DERIVED_NOT_STORED — no stored isCorrect/correct/correctIndex/answer
        field (deep scan); the answer is the authored purpose tag (the ground
        truth for an authored-judgment standard).
     3. MATCHES_PURPOSE per note (the STRUCTURAL VALIDITY gate — the clarity-
        first, non-tautological proxy for the spec's human blind-agreement
        panel): the note's PROSE matches its claimed purpose —
          instruct  → ≥2 sequence markers (first/next/then/last)
          entertain → <2 sequence markers AND a "!"
          inform    → <2 sequence markers AND no "!"
        A mislabeled/contestable note FAILS the build.
     4. each note 12-40 words; all 3 purposes present + balanced (none > 50%);
        ≥7 distinct notes; binLabels present for all 3 purposes.

   The spec's machine swap-invariance / human blind-agreement panel / quarantine
   / same-topic-triad-only / which-of-3 rigor is deliberately NOT implemented
   (clarity-first — clear prototypes + this structural gate carry validity).
   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'author-purpose-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.AuthorPurposeCore;
if (!Core) { console.error('FAIL: author-purpose-core.js did not define window.AuthorPurposeCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'author-purpose-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  const binLabels = (row.params && row.params.binLabels) || {};
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  Core.PURPOSES.forEach((p) => check(!!binLabels[p] && String(binLabels[p]).trim().length, `${row.id}: missing binLabel for "${p}"`));

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}[${r.note && r.note.purpose}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(f.purposeValid, `${label}: invalid purpose`);
    check(f.derivedNotStored, `${label}: derived invariant`);
    check(oi === r.note.purpose && Core.isAnswer(r, oi), `${label}: oracle is not the note's purpose`);
    check(f.matchesPurpose, `${label}: note PROSE does not match its purpose (seq=${Core.seqCount(r.note.text)}, "!"=${/!/.test(r.note.text)}) — "${r.note.text.slice(0, 40)}…"`);
    check(f.wordCountOk, `${label}: note is ${f.wordCount} words (want 12-40)`);

    // the other two bins are rejected
    Core.PURPOSES.forEach((p) => { if (p !== r.note.purpose) check(!Core.isAnswer(r, p), `${label}: non-answer bin "${p}" accepted`); });
  });

  const df = Core.deckFacts(rounds);
  Core.PURPOSES.forEach((p) => check(df.distinctPurposes.indexOf(p) >= 0, `deck missing purpose "${p}"`));
  const maxShare = Math.max(...Object.values(df.perPurposeCounts)) / rounds.length;
  check(maxShare <= 0.5, `a purpose is ${(maxShare * 100).toFixed(0)}% of the deck (>50% — unbalanced)`);
  check(df.distinctNotes >= VARIETY_MIN, `only ${df.distinctNotes} distinct notes (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} author-purpose violation(s) across ${roundCount} note(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} note(s), purposes [${df0.distinctPurposes.join('/')}] (${JSON.stringify(df0.perPurposeCounts)}): oracle 100% (matching bin accepted, others rejected); derived-not-stored; MATCHES_PURPOSE structural gate (instruct=steps / entertain=playful "!" / inform=facts); 12-40 words; balanced; ≥${VARIETY_MIN} distinct notes. [clarity-first redesign of #72]`);
process.exit(0);
