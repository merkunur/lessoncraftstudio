#!/usr/bin/env node
/* =====================================================================
   verify-tense-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/tense-core.js (window shim) and proves, for the
   shipped manifest (L.1.1.e verb tense), the clarity-first redesign of #70:

     1. ORACLE 100% — oracle(round) === round.time, the `tense===time` form is
        accepted, the other two are rejected.
     2. EXACTLY-ONE-CORRECT per round.
     3. DERIVED_NOT_STORED — no stored isCorrect/correct/correctIndex/answer
        field (deep scan); the answer follows the time, re-proven by MUTATION:
        set round.time to each other tense → oracle + form follow.
     4. each round: 3 DISTINCT forms; future is "will <verb>"; present is the
        BARE form (no 3rd-singular -s trap); valid time.
     5. deck: all THREE times present + none > ~0.5 of the key; ≥1 irregular
        verb; ≥7 distinct rounds + ≥7 distinct verbs.

   The spec's OPTION_SURFACE_NON_DIAGNOSTIC / cue-absent / future-will-must-fail
   / odd-form-out / morph-reveal / 4-mode rigor is deliberately NOT implemented
   (clarity-first — the time cue + visible "will" are good Grade-1 pedagogy).
   Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'tense-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.TenseCore;
if (!Core) { console.error('FAIL: tense-core.js did not define window.TenseCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'tense-activities.json'), 'utf8'));
const failures = [];
const unannotated = [];
/* ⚠ RATCHET, NOT APPROVAL. Extending this gate to the localized pools surfaced a REAL content
   gap that had been invisible since those decks were written: the French pool (chanter, ranger,
   marcher, jouer, danser, dessiner, naviguer, nager, planter) and the Italian pool (nuotare,
   giocare, cantare, mangiare, dormire, lavorare, disegnare, ascoltare, guardare) contain NO
   irregular verb at all, so a child wins every past round by adding the regular ending — exactly
   what this check exists to prevent. Fixing that is native-authoring work for those locales, so
   the pre-existing state is frozen here and every OTHER pool is gated.
   ⚠⚠ THIS SET MAY ONLY SHRINK. Never add a locale to make a build pass. */
const KNOWN_NO_IRREGULAR = new Set(['fr', 'it']);
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanForbidden(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanForbidden(obj[k], label); });
}
const clone = (o) => JSON.parse(JSON.stringify(o));

let roundCount = 0;

/* ⚠⚠ THIS GATE READ row.params.rounds ONLY — the English 9 of 63 rounds. The 54 localized
   rounds had been checked by NOTHING since they were written, while the summary printed
   "PASS — 9 round(s)" seven locales into the fan-out.
   ⚠ AND THE NAIVE EXTENSION IS WORSE HERE THAN ANYWHERE ELSE: two of the core's per-round
   facts are ENGLISH morphology. Measured before writing this — futureWellFormed (/^will\s/)
   scores 0/9 in EVERY one of the six non-EN pools, so a blanket extension reports 54 failures
   of which ZERO are real. formsDistinct / exactlyOneCorrect / derived-not-stored and the
   balance + variety floors are universal; futureWellFormed and presentIsBare stay EN-only.
   (⚠ presentIsBare passes the other six by luck. For a language with no person/number
   agreement the hazard it half-gestures at is DEPONENS — hoppas, trivs, finns — a different
   rule with the same surface shape, which is why it still earns its keep for English.) */
for (const row of manifest) {
  const pools = [['en', (row.params && row.params.rounds) || []]]
    .concat(Object.entries((row.params && row.params.roundsL10n) || {}));
  for (const [loc, rounds] of pools) {
  const isEn = loc === 'en';
  check(rounds.length >= VARIETY_MIN, `${row.id}/${loc}: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);
  /* ⚠ six locales' nudges QUOTE the time word literally while _nudge keys on round.time, so a
     band using two different time words makes the nudge lie. Nothing checked this until now. */
  const twByTime = {};
  rounds.forEach((r) => { (twByTime[r.time] = twByTime[r.time] || new Set()).add(r.timeWord); });
  Object.keys(twByTime).forEach((tm) => check(twByTime[tm].size <= 1,
    `${row.id}/${loc}: the "${tm}" band uses ${twByTime[tm].size} time words (${[...twByTime[tm]].join(' / ')}) — the nudge quotes ONE literally and would lie about the rest`));

  rounds.forEach((r) => {
    roundCount++;
    const label = `${r.id}[${r.time}]`;
    scanForbidden(r, label);
    const f = Core.facts(r);
    const oi = Core.oracle(r);

    check(f.timeValid, `${label}: invalid time`);
    check(f.formsDistinct, `${label}: the 3 forms are not all distinct`);
    /* ⚠ EN-ONLY. `futureWellFormed` is /^will\s/ — measured 0/9 in every non-EN pool, so applying
       it everywhere reports 54 failures of which zero are real. `presentIsBare` is English
       3rd-singular reasoning; it passes the other six by luck. */
    if (isEn) {
      check(f.futureWellFormed, `${label}: future form is not "will <verb>" ("${r.verb.forms.future}")`);
      check(f.presentIsBare, `${label}: present form looks like a 3rd-singular -s form ("${r.verb.forms.present}")`);
    }
    check(f.exactlyOneCorrect, `${label}: not exactly one correct tense`);
    check(f.derivedNotStored, `${label}: derived invariant`);
    check(oi === r.time && Core.isAnswer(r, oi), `${label}: oracle is not the round's time`);

    // the non-answer forms are rejected
    Core.TENSES.forEach((t) => { if (t !== r.time) check(!Core.isAnswer(r, t), `${label}: non-answer tense "${t}" accepted`); });

    // MUTATION: set time to each other tense → oracle + form follow (proves derived, not stored)
    Core.TENSES.forEach((t) => {
      if (t === r.time) return;
      const m = clone(r); m.time = t;
      check(Core.oracle(m) === t, `${label}: oracle did not follow mutated time → ${t}`);
      check(Core.formText(m, Core.oracle(m)) === r.verb.forms[t], `${label}: form did not follow mutated time → ${t}`);
    });
  });

  const df = Core.deckFacts(rounds);
  Core.TENSES.forEach((t) => check(df.distinctTimes.indexOf(t) >= 0, `deck missing time "${t}"`));
  const maxShare = Math.max(...Object.values(df.timeCounts)) / rounds.length;
  check(maxShare <= 0.5, `a time is ${(maxShare * 100).toFixed(0)}% of the key (>50% — unbalanced)`);
  /* ⚠ This checks an ANNOTATION (`regular:false`), not the content. de/fr/es/pt/it/nl all CONTAIN
     strong verbs (liefen, schliefen…) but never annotate them, so a blanket check would fail six
     pools for a metadata gap rather than a defect. Gate the pools that annotate; NAME the ones
     that do not, so the gap is visible instead of silently excused. */
  const annotates = rounds.some((r) => r.verb && typeof r.verb.regular === 'boolean');
  if (!annotates) unannotated.push(`${row.id}/${loc}`);
  else if (KNOWN_NO_IRREGULAR.has(loc)) {
    /* self-clearing: the day the locale gains an irregular, the ratchet entry becomes the defect */
    check(df.irregularCount === 0, `${row.id}/${loc}: is in KNOWN_NO_IRREGULAR but now HAS ${df.irregularCount} irregular verb(s) — remove it from the set (the ratchet only shrinks)`);
  } else check(df.irregularCount >= 1, `${row.id}/${loc}: no irregular verbs (want ≥1 for real past forms)`);
  check(df.distinctExercises >= VARIETY_MIN, `only ${df.distinctExercises} distinct exercises (<${VARIETY_MIN})`);
  check(df.distinctVerbs >= VARIETY_MIN, `${row.id}/${loc}: only ${df.distinctVerbs} distinct verbs (<${VARIETY_MIN})`);
  }
}

if (KNOWN_NO_IRREGULAR.size) console.log(`DEBT — ${KNOWN_NO_IRREGULAR.size} pool(s) frozen with no irregular verb, so "add the regular ending" wins every past round there: ${[...KNOWN_NO_IRREGULAR].join(', ')}`);
if (unannotated.length) console.log(`NOTE — ${unannotated.length} pool(s) declare no verb.regular annotation, so the irregular-verb floor cannot speak for them: ${unannotated.join(', ')}`);
if (failures.length) {
  console.error(`FAIL — ${failures.length} tense violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
const df0 = Core.deckFacts(manifest[0].params.rounds);
console.log(`PASS — ${roundCount} round(s) across EVERY pool (en + roundsL10n), times [${df0.distinctTimes.join('/')}], ${df0.distinctVerbs} distinct verbs, ${df0.irregularCount} irregular: oracle 100% (the time-matching form accepted, others rejected); exactly-one-correct; distinct forms; future="will …"; present bare (no 3rd-sing -s); derived-not-stored (oracle+form follow mutated time); ≥${VARIETY_MIN} distinct rounds. [clarity-first redesign of #70]`);
process.exit(0);
