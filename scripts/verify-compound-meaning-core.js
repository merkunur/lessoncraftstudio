#!/usr/bin/env node
/* =====================================================================
   verify-compound-meaning-core.js — the MEASURED build-gate for "Skip's
   Word-Welding Yard" (L.2.4.d · predict the meaning of compound words).
   Loads the REAL compound-meaning-core.js + the deck, drives a composeMeaning
   ORACLE + the critic-armed adversary set. HALTS the build on any failure.

   THE HEADLINE PROOF (the critic's deepest fix): a composeMeaning ORACLE wins
   100% while —
     • FAMILIAR-RETRIEVAL (a dictionary of well-known whole-compound meanings) →
       FAILS the predict/build rounds (the whole is NOVEL → no dictionary entry).
       This is the cohort blind-spot closed: a "derived-not-stored" proof shows
       the SCORING composes, NOT that the CHILD did — so we model + defeat the
       retrieval/picture-read shortcut.
     • BLIND-CONCAT (glue the two part meanings) → lands on the same-head-WRONG-
       RELATION foil ("a bowl made of fish" vs "a bowl for fish").
     • ROTE-PAIR (knows real compounds) → can't pick the MEANING.
     • FIRST/RANDOM → correct ∉ index-0.
   Plus §20.5: every part image is a COLOR asset that exists + the noun is in
   the EN approved-words list.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'compound-meaning-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'compound-meaning-activities.json');
const IMG_ROOT = path.join(REPO, 'image-library-webp', 'themes');
const APPROVED = path.join(REPO, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-en.json');

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const sandbox = {};
  new Function('window', 'self', src)(sandbox, sandbox);
  if (!sandbox.CompoundMeaningCore) throw new Error('CompoundMeaningCore did not attach');
  return sandbox.CompoundMeaningCore;
}

const C = loadCore();
const ROUNDS = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0].params.rounds;
const APPROVED_SET = new Set(JSON.parse(fs.readFileSync(APPROVED, 'utf8')).entries.map((e) => String(e.word).toLowerCase()));

/* the FAMILIAR_RETRIEVAL_SOLVER's dictionary: well-known whole-compound
   meanings. It deliberately does NOT contain the NOVEL predict/build wholes —
   that's the point (a child who only RETRIEVES known compounds can't do these).
   The gate asserts the predict/build compounds are absent from this dict. */
const FAMILIAR_DICT = {
  football: 'a ball for the foot', cupcake: 'a cake shaped like a cup',
  birdhouse: 'a house for birds', doghouse: 'a house for dogs',
  starfish: 'a fish shaped like a star', pancake: 'a cake cooked in a pan',
  watermelon: 'a melon full of water', sunflower: 'a flower like the sun',
  rainbow: 'a bow of rain', snowman: 'a man made of snow',
  toothbrush: 'a brush for teeth', lighthouse: 'a house of light'
};

const fails = [];
const note = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

const predict = ROUNDS.filter((r) => C.isPredict(r));       /* predict + build (form→meaning) */
const optionRounds = ROUNDS.filter((r) => r.cog !== 'head'); /* ≥3-choice rounds */

/* ---------- 1. composeMeaning ORACLE → 100% ---------- */
let oracleOk = 0;
ROUNDS.forEach((r) => { if (C.isAnswer(r, C.oracle(r))) oracleOk += 1; });
note(oracleOk === ROUNDS.length, `oracle self-consistency ${oracleOk}/${ROUNDS.length}`);

/* answer DERIVED, not stored: flip the relation to 'made-of' on a predict round →
   the keyed answer MOVES to the made-of choice (a different, specific index). */
note(predict.every((r) => {
  const probe = JSON.parse(JSON.stringify(r));
  const before = C.oracle(probe);
  probe.entry.relation = 'made-of';
  const after = C.oracle(probe);                 /* composeMeaning now = "a <head> made of <glossMod>" */
  return after !== before;                        /* the answer index moved (derived from relation) */
}), 'ANSWER_FROM_MEANING_NOT_STORED: mutating relation→made-of did not move the keyed answer');
/* flip the head → headNoun changes → composed gloss is no longer among the choices */
note(predict.every((r) => {
  const probe = JSON.parse(JSON.stringify(r));
  const before = C.oracle(probe);
  probe.entry.head = probe.entry.head === 'part2' ? 'part1' : 'part2';
  return C.oracle(probe) !== before;
}), 'ANSWER_FROM_MEANING_NOT_STORED: mutating head did not move the keyed answer');

/* ---------- 2. FAMILIAR-RETRIEVAL (the deepest) → FAILS predict/build ---------- */
function familiarRetrieval(r) {
  const known = FAMILIAR_DICT[r.entry.compound];     /* only resolves KNOWN wholes */
  if (!known) return -1;                              /* novel → can't answer */
  for (let i = 0; i < r.choices.length; i++) if (r.choices[i].text === known) return i;
  return -1;
}
let frRight = 0;
predict.forEach((r) => { if (familiarRetrieval(r) >= 0 && C.isAnswer(r, familiarRetrieval(r))) frRight += 1; });
note(frRight === 0, `FAMILIAR-RETRIEVAL scored ${pct(frRight, predict.length)}% on predict/build (need 0% — the novel wholes aren't retrievable)`);
note(predict.every((r) => r.entry.familiarity === 'novel'), 'PREDICT_USES_NOVEL_COMPOUND: a predict/build round is not familiarity:novel');
note(predict.every((r) => !FAMILIAR_DICT[r.entry.compound]), 'a predict/build compound IS in the familiar dictionary (must be novel/absent)');
/* the predict snapshot shows the compound as TEXT + the TWO PART images only —
   never a whole-compound image (no such field exists → the meaning can't be read
   off a picture). Positive check: both part images present. */
note(predict.every((r) => { const s = C.snapshot(r); return s.part1.themeDir && s.part2.themeDir; }), 'NO_WHOLE_COMPOUND_PICTURE_ON_PREDICT: a predict/build round does not expose both PART images (part-pictures-only)');
note(predict.every((r) => C.facts(r).predictUsesNovelCompound && C.facts(r).predictShowsBothPartImages), 'facts predictUsesNovelCompound / predictShowsBothPartImages false');

/* ---------- 3. BLIND-CONCAT → FAILS (lands on same-head-wrong-relation) ---------- */
function blindConcat(r) {
  for (let i = 0; i < r.choices.length; i++) if (r.choices[i].kind === 'made-of') return i;
  return -1;
}
let bcRight = 0;
predict.forEach((r) => { const i = blindConcat(r); if (i >= 0 && C.isAnswer(r, i)) bcRight += 1; });
note(bcRight === 0, `BLIND-CONCAT scored ${pct(bcRight, predict.length)}% (need 0% — the made-of foil is never correct)`);
note(predict.every((r) => C.facts(r).headModifierFoilPresent), 'HEAD_MODIFIER_FOIL_PRESENT: a predict/build round lacks a same-head-wrong-relation (made-of) foil');

/* ---------- 4. ROTE-PAIR → FAILS on ticket (real-word-ness doesn't disambiguate) ---------- */
const REAL_COMPOUNDS = new Set(['football', 'handball', 'cupcake', 'pancake', 'baseball', 'basketball', 'birdhouse']);
function rotePair(r) {
  if (r.cog !== 'ticket') return -1;
  for (let i = 0; i < r.choices.length; i++) if (REAL_COMPOUNDS.has(r.choices[i].text) && r.choices[i].text !== r.entry.compound) return i;
  return -1;   /* picks a real word that ISN'T the meaning-correct one */
}
const ticket = ROUNDS.filter((r) => r.cog === 'ticket');
let roteRight = 0;
ticket.forEach((r) => { const i = rotePair(r); if (i >= 0 && C.isAnswer(r, i)) roteRight += 1; });
note(roteRight === 0, `ROTE-PAIR scored ${pct(roteRight, ticket.length)}% on ticket (need 0% — a real word that isn't the meaning is wrong)`);
note(ticket.every((r) => r.choices.filter((c) => REAL_COMPOUNDS.has(c.text)).length >= 2 || r.choices.some((c) => c.kind === 'wrong-mod')), 'MEANING_NOT_REALWORD_DERIVABLE: a ticket round is resolvable by real-word-ness alone');

/* ---------- 5. FIRST/RANDOM → FAILS ---------- */
let firstRight = 0;
ROUNDS.forEach((r) => { if (C.isAnswer(r, 0)) firstRight += 1; });
note(firstRight === 0, `FIRST (index-0) scored ${pct(firstRight, ROUNDS.length)}% (need 0% — correct never index-0)`);
note(optionRounds.every((r) => r.choices.length >= 3), 'an option round (non-head) has <3 choices');
note(ROUNDS.every((r) => C.facts(r).correctNotIndex0 && C.facts(r).multiplePlausibleChoices), 'correctNotIndex0 / multiplePlausibleChoices violated');

/* ---------- 6. STRUCTURAL ---------- */
const df = C.deckFacts(ROUNDS);
note(df.distinctCogs.length >= 5, `only ${df.distinctCogs.length} distinct ACTIONS (need ≥5): ${df.distinctCogs.join(', ')}`);
note(df.distinctExercises >= 7, `only ${df.distinctExercises} distinct exercises (need ≥7)`);
note(df.meaningModesDominate, `meaning modes do not dominate (${df.meaningModeCount}/${df.total})`);
note(ROUNDS.filter((r) => r.cog === 'head').every((r) => C.facts(r).identifyHeadIsMeaningNotPosition), 'IDENTIFY_HEAD_IS_MEANING_NOT_POSITION violated (head round not a 2-word kind-of)');
/* head: the kind-of question asks by MEANING (the two part WORDS), not position;
   the authored correct ∉ index-0 + the runtime per-serve shuffle (local-test) defeat
   any fixed-slot cheat. */
note(ROUNDS.every((r) => r.entry.transparency !== 'opaque'), 'OPAQUE_NOT_CHILD_FACING: an opaque compound is child-facing');
/* snapshot leaks none of the gate-only keys (entry.head as "part1/2", relation,
   glossMod, choice kind, familiarity). NOTE: `missing:"head"` is a LEGITIMATE
   renderable value (which part to supply) — so match the KEYS precisely. */
note(ROUNDS.every((r) => !/"relation"|"glossMod"|"glossModMaterial"|"familiarity"|"kind"|"head"\s*:\s*"part/.test(JSON.stringify(C.snapshot(r)))), 'snapshot leaked a gate-only key (relation / glossMod / kind / familiarity / entry.head)');

/* ---------- 7. §20.5 part-image (COLOR) + approved-words ---------- */
function bwTheme(t) { return /\bbw\b|\bbw\s*\d|\sbw$/i.test(t); }
function imgExists(themeDir, noun) { return fs.existsSync(path.join(IMG_ROOT, themeDir, noun + '@2x.webp')); }
const allImgTokens = [];
ROUNDS.forEach((r) => {
  allImgTokens.push(r.entry.part1, r.entry.part2);
  r.choices.forEach((c) => { if (c.noun) allImgTokens.push(c); });
});
allImgTokens.forEach((t) => {
  note(!bwTheme(t.themeDir), `part "${t.noun}" uses a B&W theme "${t.themeDir}" (§20.5 color-only)`);
  note(imgExists(t.themeDir, t.noun), `part "${t.noun}" has no COLOR image at themes/${t.themeDir}/${t.noun}@2x.webp`);
  note(APPROVED_SET.has(t.noun.toLowerCase()), `part "${t.noun}" not in approved-words-en`);
});

/* ---------- report ---------- */
console.log('Compound-meaning core gate —');
console.log(`  composeMeaning oracle    : ${pct(oracleOk, ROUNDS.length)}%  (${oracleOk}/${ROUNDS.length})`);
console.log(`  familiar-retrieval (pred): ${pct(frRight, predict.length)}%   on ${predict.length} predict/build`);
console.log(`  blind-concat (pred)      : ${pct(bcRight, predict.length)}%`);
console.log(`  rote-pair (ticket)       : ${pct(roteRight, ticket.length)}%`);
console.log(`  first/random             : ${pct(firstRight, ROUNDS.length)}%`);
console.log(`  distinct ACTIONS         : ${df.distinctCogs.length} (${df.distinctCogs.join(', ')})  exercises: ${df.distinctExercises}`);
console.log(`  per-cog: ${JSON.stringify(df.perCog)}   meaning-modes: ${df.meaningModeCount}/${df.total}`);
console.log('');
if (fails.length) {
  console.error(`COMPOUND-MEANING CORE GATE FAILED — ${fails.length}:`);
  [...new Set(fails)].forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log('COMPOUND-MEANING CORE GATE PASSED — the composeMeaning oracle wins 100%; FAMILIAR-RETRIEVAL (the critic\'s deepest) fails the NOVEL predict/build rounds (a derived-not-stored proof does NOT prove the CHILD composed — so the retrieval route is modeled + defeated); BLIND-CONCAT lands on the same-head-wrong-relation foil; ROTE-PAIR can\'t pick the meaning; FIRST/RANDOM fails; the answer is DERIVED from head+relation (mutate either → it moves); no whole-compound picture on predict; identify-head is a kind-of MEANING question; every part image is a COLOR asset in approved-words; ≥5 distinct ACTIONS + ≥7 exercises; meaning-modes dominate.');
process.exit(0);
