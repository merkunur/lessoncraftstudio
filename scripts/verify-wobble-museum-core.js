#!/usr/bin/env node
/* =====================================================================
   verify-wobble-museum-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/wobble-museum-core.js (window shim) and proves, for
   the shipped manifest (W.K.2 informative-writing topic focus), the clarity-
   first redesign of #85:

     1. EXACTLY-ONE-DRIFT per room (exactly one sentence with about !== topic).
     2. ORACLE 100% — oracle(room) is the drift index, accepted; every on-topic
        sentence rejected.
     3. DERIVED_NOT_STORED — no stored isCorrect/correct/correctIndex/drift/
        answer field (deep scan); the drift follows the about-vs-topic relation,
        re-proven by MUTATION: set room.topic to the drift's about → the drift
        SET changes (relevance is RELATIVE to the committed topic, not absolute).
     4. KEYWORD-DEFEAT — the topicWord appears in ≥1 on-topic sentence AND ≥1
        on-topic sentence LACKS it (so "tap the line without the topic word"
        does not uniquely find the drift).
     5. drift positions VARIED across the deck (>1 distinct index); ≥6 distinct
        topics; ≥7 distinct rounds.

   The spec's commit-topic-before-facts authorial flow / separate-graded-re-home
   / hard-lure-only grading / CATEGORIZATION_BIN-TOPIC_AS_CLUSTER-OBVIOUS_LURE
   solver suite is deliberately NOT implemented (clarity-first — stated topic +
   catch-the-drift + keyword-defeat carry it). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'drift', 'driftIndex', 'answer', 'answerIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'wobble-museum-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.WobbleMuseumCore;
if (!Core) { console.error('FAIL: wobble-museum-core.js did not define window.WobbleMuseumCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'wobble-museum-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

let roundCount = 0;

for (const row of manifest) {
  const rounds = (row.params && row.params.rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(f.sentenceCount >= 4, `${label}: <4 sentences`);
    check(f.exactlyOneDrift, `${label}: not exactly one drift (${Core.correctCount(r)})`);
    check(oi >= 0 && Core.isDrift(r, oi), `${label}: oracle is not a drift`);
    check(f.topicWordPresent, `${label}: the topicWord "${r.topicWord}" appears in NO on-topic sentence`);
    check(f.keywordDefeat, `${label}: every on-topic sentence contains the topicWord — "tap the line without the topic word" would win`);
    check(f.derivedNotStored, `${label}: derived invariant`);

    // every on-topic sentence rejected
    (r.sentences || []).forEach((s, i) => { if (i !== oi) check(!Core.isDrift(r, i), `${label}: an on-topic sentence "${s.text}" was accepted as the drift`); });

    // MUTATION: re-point the topic to the drift's about → the drift set changes (relative, not absolute)
    const about = Core.driftAbout(r);
    if (about) {
      const m = clone(r); m.topic = about;
      check(Core.oracle(m) !== oi, `${label}: re-pointing the topic to "${about}" did not move the drift (not relative to the committed topic)`);
    }
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctDriftPositions > 1, `drift is always at the same index (positions not varied)`);
  check(df.distinctTopics >= 6, `only ${df.distinctTopics} distinct topics (<6)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} wobble-museum violation(s) across ${roundCount} room(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} room(s), ${df0.distinctTopics} topics, drift positions at ${df0.distinctDriftPositions} distinct indices: exactly-one-drift; oracle 100% (drift accepted, on-topic rejected); derived-not-stored (re-pointing the topic moves the drift); keyword-defeat (topicWord present + ≥1 on-topic lacks it); ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #85]`);
process.exit(0);
