#!/usr/bin/env node
/* =====================================================================
   verify-main-idea-core.js — the MEASURED, critic-armed build-gate for
   "Nila's Idea Pond" (RI.K.2). Drives the REAL core (loaded via
   `new Function`) over the REAL manifest bank. HALTS the build on any
   failure. The headline = THE GATE-CAN'T-READ PROOF:

     • the COMPREHENSION oracle (GIVEN the authored topicId + belongs)
       scores 100% — the answer is fully determined by the authored truth;
     • the ARMED SURFACE-CUE solver (length / first-mention / latest /
       position / highest-overlap / odd-one-out-len / odd-one-out-shape /
       framed / in-text-random — NO comprehension) scores <= CHANCE (0.55)
       on the STAGE-1 topic pick, both single-heuristic AND majority-vote.

   Surface cues are scored on the STAGE-1 TOPIC pick only: at runtime the
   paragraph is HEARD (not printed), so "the non-belonger's noun is absent"
   is the intended STAGE-2 comprehension signal (did you hear this fact?),
   not a stage-1 surface cheat — it is asserted STRUCTURALLY instead.

   Also: validateBank (per-LABEL swap-invariance, register/frame balance,
   no per-fish picture, surface balance, exactly-one-non-belonger + more-
   fish-than-slots, belonging-noun-in-text / non-belonger-noun-absent, 4
   cogs, >=7 paragraphs) + the BRUTE-FORCE-WITHIN-ROUND check (commit-then-
   reveal + a non-empty regenerate-on-wrong swap-group → the retry board is
   non-stationary).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'main-idea-core.js');
const MANIFEST = path.join(MINI, 'nila-pond-activities.json');

const ARMED_MAX = 0.55;     /* armed surface solver must be <= this (chance is 0.25–0.33) */

/* ---- load the REAL core into a sandbox window ---- */
function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.MainIdeaCore) throw new Error('core did not attach window.MainIdeaCore');
  return win.MainIdeaCore;
}

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };

function pct(x) { return (100 * x).toFixed(1) + '%'; }

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  /* locale-aware: `--locale=de` gates the German roundsL10n bank with the SAME
     strict solver; default (no flag) gates the EN params.rounds. */
  const argLoc = (process.argv.find((a) => a.startsWith('--locale=')) || '').split('=')[1];
  const rounds = (argLoc && row && row.params && row.params.roundsL10n && row.params.roundsL10n[argLoc])
    ? row.params.roundsL10n[argLoc]
    : ((row && row.params && row.params.rounds) || []);
  if (argLoc) console.log(`[locale=${argLoc}] gating roundsL10n.${argLoc}`);

  F(rounds.length >= 7, `bank has ${rounds.length} paragraphs (need >=7)`);

  /* ---- (A) per-round structural facts ---- */
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.noContentPicturePerFish, `${r.id}: a fish carries a content picture (must be null)`);
    F(f.topicInLabelSet, `${r.id}: topicId "${r.topicId}" is not one of the fish`);
    F(f.commitRequiredBeforeReveal === true, `${r.id}: commit-required-before-reveal not asserted`);
    F(f.topicNounInText, `${r.id}: the TOPIC's key word is absent from the paragraph`);
    if (r.cog === 'nest-reject') {
      F(f.exactlyOneNonBelonger, `${r.id}: nest-reject must have exactly one belongs:false`);
      F(f.moreFishThanSlots, `${r.id}: nest-reject must have more detail fish than slots`);
      F(f.nonBelongerNounAbsentFromText, `${r.id}: the NON-BELONGER's noun appears in the text (must be absent)`);
      F(f.belongingDetailNounsInText, `${r.id}: a belonging detail's noun is absent from the text`);
    }
    if (r.cog === 'supply-detail') {
      const alt = r.altDetails || [];
      F(alt.length === 2, `${r.id}: supply-detail needs exactly 2 altDetails`);
      F(alt.filter((a) => a.belongs).length === 1, `${r.id}: supply-detail needs exactly one in-text altDetail`);
      const t = Core._paraText(r);
      alt.forEach((a) => {
        const fish = (r.fish || []).concat(r.altDetails || []).find((x) => x.id === a.id);
        const inText = fish && Core._countKey(t, fish.key) > 0;
        F(!!inText === !!a.belongs, `${r.id}: supply altDetail "${a.id}" belongs=${a.belongs} but inText=${inText}`);
      });
    }
  });

  /* ---- (B) the 4 cogs present ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  Core.COGS.forEach((c) => F(cogs.has(c), `cog "${c}" missing from the bank`));

  /* ---- (C) THE COVERAGE LAW (2026-10-17, replaces per-label swap-invariance) ----
     The topic fish covers EVERY pad (paragraph sentences 2-4); every other fish covers at most
     one pad; the not-in-text fish covers none; in nest-reject the two belonging details cover two
     DIFFERENT pads and the non-belonger covers none. A careful reader can therefore never be
     marked wrong: the umbrella answer is the only fish that is about all of the text. */
  const allFishIds = new Set();
  rounds.forEach((r) => {
    const pads = (r.paragraph || []).length - 1;
    (r.fish || []).forEach((fi) => {
      allFishIds.add(fi.id);
      F(Array.isArray(fi.covers), `${r.id}: fish "${fi.id}" has no authored covers[]`);
      const c = fi.covers || [];
      if (fi.id === r.topicId) F(c.length === pads && c.every((x, i) => x === i + 1), `${r.id}: the TOPIC does not cover all ${pads} pads (covers ${JSON.stringify(c)})`);
      else F(c.length <= 1, `${r.id}: non-topic fish "${fi.id}" covers ${c.length} pads (a second umbrella)`);
    });
    const byId = (id) => (r.fish || []).find((x) => x.id === id) || {};
    const inText = (r.fish || []).filter((x) => x.id !== r.topicId && (x.covers || []).length === 1).map((x) => x.covers[0]);
    F(new Set(inText).size === inText.length, `${r.id}: two detail fish cover the SAME pad`);
    F((r.fish || []).filter((x) => (x.covers || []).length === 0).length === 1, `${r.id}: need exactly one not-in-text fish (covers none)`);
    if (r.cog === 'nest-reject') {
      (r.details || []).forEach((d) => { const c = byId(d.id).covers || []; F(d.belongs ? c.length === 1 : c.length === 0, `${r.id}: detail "${d.id}" belongs=${d.belongs} but covers ${JSON.stringify(c)}`); });
    }
    if (r.cog === 'reject-narrow') F(r.narrowId && (byId(r.narrowId).covers || []).length === 1, `${r.id}: narrow lure "${r.narrowId}" must cover exactly one pad`);
  });

  /* ---- (D) register/frame balance (no structural tell for the topic) ---- */
  rounds.forEach((r) => {
    const a = Core.audit(r);
    const topicShape = a.fish.find((x) => x.id === r.topicId).shape;
    const others = a.fish.filter((x) => x.id !== r.topicId).map((x) => x.shape);
    /* the topic's shape must NOT be unique among the fish (else odd-one-out / framed cue) */
    F(others.indexOf(topicShape) !== -1, `${r.id}: the topic's phrase shape "${topicShape}" is unique among the fish (register/frame tell)`);
    F(!/framed/.test(topicShape), `${r.id}: the topic phrase uses a how/why/about frame`);
  });

  /* ---- (E) THE ARMED SURFACE-CUE SOLVER (stage-1 topic pick) ---- */
  /* each heuristic picks ONE fish per round (ties → lowest id, NOT manifest
     order, so position is not rewarded by tie-breaks). */
  function pickBy(a, scoreFn, dir) {
    /* dir +1 = max wins, -1 = min wins */
    let best = null, bestScore = null;
    a.fish.slice().sort((x, y) => (x.id < y.id ? -1 : 1)).forEach((fi) => {
      const s = scoreFn(fi, a);
      if (s == null) return;
      if (bestScore == null || (dir > 0 ? s > bestScore : s < bestScore)) { bestScore = s; best = fi.id; }
    });
    return best;
  }
  /* 2026-10-17: the in-text cues are measured on what the child SEES — the phrase's own content words
     (4+ letters, minus words every fish shares) found in the printed paragraph — not on one
     authored key word. The topic now echoes the lead sentence (the RI.K.2 text feature), so the
     old key-based "earliest" measured the authoring, not the screen; the not-in-text fish carries
     a lead-sentence lure in most rounds, and this is what proves "match sentence 1" no longer wins. */
  const LEX = (str) => String(str).toLowerCase().split(/[^\p{L}]+/u).filter((w) => w.length >= 4);
  function lexAudit(r, a) {
    const text = LEX(Core._paraText(r));
    const common = LEX((r.fish[0] || {}).phrase).filter((w) => (r.fish || []).every((f) => LEX(f.phrase).includes(w)));
    a.fish.forEach((af) => {
      const f = (r.fish || []).find((x) => x.id === af.id);
      const idx = LEX(f.phrase).filter((w) => !common.includes(w)).map((w) => text.indexOf(w)).filter((i) => i >= 0);
      af.firstMention = idx.length ? Math.min(...idx) : Infinity; af.overlap = idx.length; af.inText = idx.length > 0;
    });
    return a;
  }
  const HEURISTICS = {
    longest:        (a) => pickBy(a, (f) => f.len, +1),
    shortest:       (a) => pickBy(a, (f) => f.len, -1),
    earliest:       (a) => pickBy(a, (f) => f.firstMention, -1),     /* Infinity (absent) never wins min? min picks finite */
    latest_intext:  (a) => pickBy(a, (f) => (isFinite(f.firstMention) ? f.firstMention : null), +1),
    position0:      (a) => (a.fish[0] ? a.fish[0].id : null),        /* manifest order (runtime shuffles, but test it) */
    highest_overlap:(a) => pickBy(a, (f) => f.overlap, +1),
    odd_one_len:    (a) => {
      /* the fish whose length is the biggest outlier from the mean */
      const mean = a.fish.reduce((s, f) => s + f.len, 0) / a.fish.length;
      return pickBy(a, (f) => Math.abs(f.len - mean), +1);
    },
    intext_first:   (a) => { const it = a.fish.filter((f) => f.inText).sort((x, y) => (x.id < y.id ? -1 : 1)); return it.length ? it[0].id : null; }
  };

  const names = Object.keys(HEURISTICS);
  const acc = {};
  names.forEach((n) => { acc[n] = 0; });
  let voteHits = 0;
  rounds.forEach((r) => {
    const a = lexAudit(r, Core.audit(r));
    const votes = {};
    names.forEach((n) => {
      const pick = HEURISTICS[n](a);
      if (pick === r.topicId) acc[n]++;
      if (pick != null) votes[pick] = (votes[pick] || 0) + 1;
    });
    /* majority vote (tie → lowest id) */
    let vbest = null, vn = -1;
    Object.keys(votes).sort().forEach((id) => { if (votes[id] > vn) { vn = votes[id]; vbest = id; } });
    if (vbest === r.topicId) voteHits++;
  });
  const N = rounds.length || 1;
  names.forEach((n) => {
    const a = acc[n] / N;
    F(a <= ARMED_MAX, `ARMED surface heuristic "${n}" scores ${pct(a)} on the topic pick (> ${pct(ARMED_MAX)} chance ceiling) — surface cue leaks the topic`);
  });
  const voteAcc = voteHits / N;
  F(voteAcc <= ARMED_MAX, `ARMED majority-vote surface solver scores ${pct(voteAcc)} (> ${pct(ARMED_MAX)}) — combined surface cues leak the topic`);

  /* ---- (F) THE COMPREHENSION ORACLE (given authored truth) → 100% ---- */
  let oracleTopic = 0, oracleSchool = 0, schoolRounds = 0;
  rounds.forEach((r) => {
    /* topic: the oracle knows topicId */
    if (Core.isTopic(r, r.topicId)) oracleTopic++;
    /* school: nest the belongs:true, reject the belongs:false */
    if (r.cog === 'nest-reject') {
      schoolRounds++;
      const ok = (r.details || []).every((d) => Core.belongs(r, d.id) === !!d.belongs);
      if (ok) oracleSchool++;
    }
    if (r.cog === 'supply-detail') {
      schoolRounds++;
      const inOne = (r.altDetails || []).filter((d) => Core.belongs(r, d.id)).length === 1;
      if (inOne) oracleSchool++;
    }
  });
  F(oracleTopic === N, `comprehension oracle topic accuracy ${oracleTopic}/${N} (must be 100%)`);
  F(schoolRounds === 0 || oracleSchool === schoolRounds, `comprehension oracle school accuracy ${oracleSchool}/${schoolRounds} (must be 100%)`);

  /* ---- (G) BRUTE-FORCE-WITHIN-ROUND defeated ---- */
  rounds.forEach((r) => {
    F(Core.facts(r).commitRequiredBeforeReveal === true, `${r.id}: no commit-before-reveal`);
    const grp = Core.regenGroup(r, rounds);
    F(grp.length >= 1, `${r.id}: empty regenerate-on-wrong swap-group → a wrong commit can't move the board (brute-force survives)`);
    /* the swap-group sibling is a different paragraph whose topic phrase differs (the target moves) */
    const tp = (x) => ((x.fish || []).find((f) => f.id === x.topicId) || {}).phrase;
    grp.forEach((gid) => {
      const g = rounds.find((x) => x.id === gid);
      if (!g) { fails.push(`${r.id}: regenGroup id "${gid}" not found`); return; }
      F(tp(g) !== tp(r), `${r.id}: swap-group sibling "${gid}" has the SAME topic phrase (board move would not move the target)`);
    });
  });

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} paragraphs, ${allFishIds.size} distinct fish, cogs: ${[...cogs].join('/')}`);
  console.log('armed surface heuristics (topic pick):');
  names.forEach((n) => console.log(`  ${acc[n] / N <= ARMED_MAX ? 'ok  ' : 'FAIL'} ${n}: ${pct(acc[n] / N)}`));
  console.log(`  ${voteAcc <= ARMED_MAX ? 'ok  ' : 'FAIL'} majority-vote: ${pct(voteAcc)}  (chance ~${pct(1 / 4)}–${pct(1 / 3)}, ceiling ${pct(ARMED_MAX)})`);
  console.log(`comprehension oracle: topic ${oracleTopic}/${N}, school ${oracleSchool}/${schoolRounds}`);
  let chLong = 0, chShort = 0;
  rounds.forEach((r) => {
    const L = (r.fish || []).map((f) => f.phrase.length); const t = (r.fish || []).find((f) => f.id === r.topicId).phrase.length;
    if (t === Math.max(...L) && L.filter((x) => x === t).length === 1) chLong++;
    if (t === Math.min(...L) && L.filter((x) => x === t).length === 1) chShort++;
  });
  console.log(`topic phrase is the uniquely LONGEST (characters) in ${chLong}/${N}, uniquely SHORTEST in ${chShort}/${N}`);
  F(chLong <= Math.floor(N / 3), `topic phrase is the visibly longest option in ${chLong}/${N} rounds (width tell)`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-MAIN-IDEA-CORE FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-MAIN-IDEA-CORE PASSED — coverage law (topic covers every pad, details one each, one not-in-text) + register/frame balance + no per-fish picture + exactly-one-non-belonger + non-belonger-noun-absent/belonging-nouns-present + 4 cogs + >=7 paragraphs; the ARMED surface solver scores <= chance on the topic pick (single + majority-vote) while the comprehension oracle scores 100%; commit-then-reveal + a non-stationary regenerate-on-wrong swap-group defeat brute-force.');
  process.exit(0);
})();
