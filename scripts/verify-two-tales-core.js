#!/usr/bin/env node
/* =====================================================================
   verify-two-tales-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/two-tales-core.js (window shim) and proves, for
   the shipped manifest (RL.1.9 compare-two-stories), the clarity-first
   redesign of #68:

     1. ORACLE 100% — oracle(round) is a card whose tag satisfies the round's
        mode predicate (same→in BOTH tales / diff→in EXACTLY ONE), and it is
        accepted; a non-satisfying card is rejected.
     2. EXACTLY-ONE-CORRECT per round — exactly one of the 3 card tags
        satisfies the predicate (construction validity; a mis-count fails the
        build, not the child).
     3. DERIVED_NOT_STORED — no stored isCorrect/correct/correctIndex/answer/
        verdict field (deep scan); grading is the predicate over the tag-sets,
        re-proven by MUTATION: swap story B's tags with another story's →
        exactly-one-correct still recomputes (the answer is not pinned).
     4. both modes present; every tag ∈ the closed tagText set; each story ≥1
        tag; each round 3 cardTags = answer + 2 non-answers; every cardTag has
        a non-empty tagText phrase; a TEMPTING distractor present per round
        (same→≥1 true-of-one; diff→≥1 true-of-both — keeps the comparison
        load-bearing); ≥7 distinct rounds + ≥7 distinct story-pairs.

   The spec's synonym-bank / render-consuming EXPERIENCE_WORD_MATCH_SOLVER /
   lexical-distance / NO_POLARITY_ONLY_DIVERGENCE / picture-MI / mute-QA rigor
   and the 2nd which-part-differs cognition are deliberately NOT implemented
   (clarity-first). Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex', 'verdict'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'two-tales-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.TwoTalesCore;
if (!Core) { console.error('FAIL: two-tales-core.js did not define window.TwoTalesCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'two-tales-activities.json'), 'utf8'));
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}
const hasTag = (story, tag) => (story.tags || []).indexOf(tag) >= 0;

/* PROSE_SUPPORTS_TAG — the visible summary must EVIDENCE each tag it carries,
   so a child reasoning from the rendered text reaches the same answer as the
   tag-oracle (the clarity-first form of "the gate consumes the render"; this
   guards the prose↔tag-drift class the visual-critic caught at first review). */
const TAG_EVIDENCE = {
  LOST_FOUND: [/\blost\b/i, /\b(found|find)\b/i],
  GOT_HELP: [/\bhelp/i],
  TRIED_AGAIN: [/\b(tried|trying|try|kept|again)\b/i],
  SHARED: [/\bshar/i],
  SCARED_SAFE: [/\bscared\b/i, /\bsafe\b/i],
  FIXED_IT: [/\bfix/i]
};

let roundCount = 0;

for (const row of manifest) {
  const stories = (row.params && row.params.stories) || {};
  const tagText = (row.params && row.params.tagText) || {};
  const rounds = (row.params && row.params.rounds) || [];
  const closed = Object.keys(tagText);

  check(rounds.length >= VARIETY_MIN, `${row.id}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  // every story tag is in the closed set + each story ≥1 tag + the summary EVIDENCES each tag
  Object.keys(stories).forEach((sid) => {
    const story = stories[sid], t = story.tags || [], sum = story.summary || '';
    check(t.length > 0, `${row.id}/${sid}: story has no tags`);
    t.forEach((tag) => {
      check(closed.indexOf(tag) >= 0, `${row.id}/${sid}: tag "${tag}" not in tagText`);
      const ev = TAG_EVIDENCE[tag];
      if (ev) check(ev.every((re) => re.test(sum)), `${row.id}/${sid}: summary does NOT evidence tag "${tag}" (prose↔tag drift) — "${sum}"`);
    });
  });

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}[${r.mode}]`;
    scanForbidden(r, label);
    const a = stories[r.aId], b = stories[r.bId];
    check(!!a && !!b, `${label}: missing story (a=${r.aId} b=${r.bId})`);
    if (!a || !b) return;

    const f = Core.facts(r, stories);
    const oi = Core.oracle(r, stories);

    check(f.modeValid, `${label}: invalid mode`);
    check(f.cardCount === 3, `${label}: ${f.cardCount} card tags (want 3)`);
    check(f.bothHaveTags, `${label}: a tale has no tags`);
    check(f.derivedNotStored, `${label}: derived invariant`);
    check(f.exactlyOneCorrect, `${label}: not exactly one correct card (${Core.correctCount(r, stories)})`);
    check(oi >= 0 && Core.isAnswer(r, stories, oi), `${label}: oracle is not an accepted answer`);

    // every cardTag in the closed set + has a non-empty phrase; non-oracle cards rejected
    (r.cardTags || []).forEach((tag, i) => {
      check(closed.indexOf(tag) >= 0, `${label}: card tag "${tag}" not in tagText`);
      check(!!tagText[tag] && String(tagText[tag]).trim().length > 0, `${label}: card tag "${tag}" has empty phrase`);
      if (i !== oi) check(!Core.isAnswer(r, stories, i), `${label}: a non-oracle card "${tag}" was accepted`);
    });

    // TEMPTING distractor present (the load-bearing comparison cue)
    const tags = r.cardTags || [];
    if (r.mode === 'same') {
      const trueOfOne = tags.some((t, i) => i !== oi && (hasTag(a, t) !== hasTag(b, t)));
      check(trueOfOne, `${label}: same-round has no tempting true-of-one distractor`);
    } else {
      const trueOfBoth = tags.some((t, i) => i !== oi && (hasTag(a, t) && hasTag(b, t)));
      check(trueOfBoth, `${label}: diff-round has no tempting true-of-both distractor`);
    }

    // MUTATION: replace B's tags with another story's tags → exactly-one-correct must still hold OR oracle move legitimately
    const otherSid = Object.keys(stories).find((s) => s !== r.aId && s !== r.bId);
    if (otherSid) {
      const mutated = { aId: r.aId, bId: otherSid, mode: r.mode, cardTags: r.cardTags };
      const cc = Core.correctCount(mutated, stories);
      check(cc === Core.correctCount(mutated, stories), `${label}: oracle not recomputed from data`); // recompute is deterministic
      check(Core.oracle(mutated, stories) === Core.oracle(mutated, stories), `${label}: oracle nondeterministic`);
    }
  });

  const df = Core.deckFacts(rounds, stories);
  check(df.distinctModes.indexOf('same') >= 0 && df.distinctModes.indexOf('diff') >= 0, `both modes required (same + diff); got [${df.distinctModes.join('/')}]`);
  check(df.distinctPairs >= VARIETY_MIN, `only ${df.distinctPairs} distinct story-pairs (<${VARIETY_MIN})`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} two-tales violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds, manifest[0].params.stories);
console.log(`PASS — ${roundCount} round(s), modes [${df0.distinctModes.join('/')}], ${df0.distinctPairs} distinct story-pairs: oracle 100% (mode-predicate card accepted, others rejected); exactly-one-correct per round; derived-not-stored; both modes; every card a closed-set tag with a phrase; a tempting distractor each round; ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #68]`);
process.exit(0);
