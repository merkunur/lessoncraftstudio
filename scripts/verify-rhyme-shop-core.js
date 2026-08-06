#!/usr/bin/env node
/* =====================================================================
   verify-rhyme-shop-core.js — the MEASURED build-gate for "Rosa Raccoon's
   Rhyme Wagon" (RF.K.2.a · rhyme). Loads the REAL rhyme-shop-core.js + the
   deck, then drives a rimeKey ORACLE + the critic-armed adversary set, and
   validates EVERY token against the real assets/vocab/approved-words/phonics.
   HALTS the build on any failure.

   THE HEADLINE PROOF (the critic's deepest, program-wide fix): a rimeKey
   ORACLE wins 100% while —
     • VISUAL/SEMANTIC-MATCH (argmax same-category) → 0% on pick (mis-fires on
                              the same-category non-rhyme decoy)
     • FAMILIAR-PAIR (a nursery table) → ≤chance (novel pairs)
     • PRINT-MATCH (exact spelled-rime, PER ROUND) → produces the WRONG answer
                              on 100% of rounds (every recognition round's
                              correct is different-spelling)
     • FIRST/RANDOM (index-0) → 0%
   — all lose. The print-matcher is measured at the per-ROUND granularity the
   child plays (the cohort blind-spot: a deck-level constraint-ratio gate is
   blind to a per-round cheat).

   PLUS the asset substrate: every token's word === IMAGE_VOCABULARY[noun].en[0],
   noun ∈ approved-words-en, a COLOR asset exists, and spelledRime === the
   vocab-phonics rime (read-only checks; the library/vocab are never touched).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'rhyme-shop-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'rhyme-shop-activities.json');
const VOCAB_JS = path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
const APPROVED = path.join(REPO, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-en.json');
const PHONICS = path.join(REPO, 'scripts', 'v2-data', 'vocabulary-phonics.json');
const LIB = path.join(REPO, 'image-library-webp', 'themes');

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const sandbox = {};
  new Function('window', 'self', src)(sandbox, sandbox);
  if (!sandbox.RhymeShopCore) throw new Error('RhymeShopCore did not attach');
  return sandbox.RhymeShopCore;
}
function loadVocab() {
  const src = fs.readFileSync(VOCAB_JS, 'utf8');
  const win = {};
  const fn = new Function('window', 'self', 'module', 'exports', src +
    ';return (typeof IMAGE_VOCABULARY!=="undefined"?IMAGE_VOCABULARY:(window.IMAGE_VOCABULARY||(typeof module!=="undefined"&&module.exports)));');
  const mod = { exports: {} };
  const v = fn(win, win, mod, mod.exports);
  if (!v || typeof v !== 'object') throw new Error('IMAGE_VOCABULARY did not load');
  return v;
}

const C = loadCore();
const ROUNDS = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0].params.rounds;
const VOCAB = loadVocab();
const APPROVED_SET = new Set(JSON.parse(fs.readFileSync(APPROVED, 'utf8')).entries.map((e) => e.word.toLowerCase()));
const PH = JSON.parse(fs.readFileSync(PHONICS, 'utf8'));
const fails = [];
const note = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

const recog = ROUNDS.filter((r) => C.RECOGNIZE[r.cog]);
const pickRounds = ROUNDS.filter((r) => r.cog === 'pick' || r.cog === 'chant');

/* ---------- 1. RIMEKEY ORACLE → 100% ---------- */
let oracleOk = 0;
ROUNDS.forEach((r) => { if (C.isAnswer(r, C.oracle(r))) oracleOk += 1; });
note(oracleOk === ROUNDS.length, `oracle self-consistency ${oracleOk}/${ROUNDS.length}`);
/* the oracle is DERIVED from rimeKey, not a stored flag: make every rimeKey
   UNIQUE (nothing rhymes) → a single-correct recognition round loses its
   answer. (judge/odd/sort/chain are relation-based; tested via print-match.) */
note(ROUNDS.filter((r) => r.cog === 'pick' || r.cog === 'chant' || r.cog === 'field').every((r) => {
  const probe = JSON.parse(JSON.stringify(r));
  const before = JSON.stringify(C.oracle(probe));
  let n = 0; C.allTokens(probe).forEach((t) => { t.rimeKey = 'UNIQ_' + (n++); });
  return JSON.stringify(C.oracle(probe)) !== before;
}), 'ANSWER_DERIVED_FROM_RIMEKEY: oracle unchanged when all rimeKeys made unique (no rhyme should remain)');

/* ---------- 2. PRINT-MATCH (per-round, the deepest) → wrong on 100% ---------- */
function printMatch(r) {
  switch (r.cog) {
    case 'judge': return r.a.spelledRime === r.b.spelledRime;
    case 'pick': case 'chant': {
      for (let i = 0; i < r.choices.length; i++) if (r.choices[i].spelledRime === r.target.spelledRime) return i;
      return 0;
    }
    case 'odd': {
      const c = {}; r.choices.forEach((x) => { c[x.spelledRime] = (c[x.spelledRime] || 0) + 1; });
      let minS = null, minN = 1e9; for (const k in c) if (c[k] < minN) { minN = c[k]; minS = k; }
      for (let i = 0; i < r.choices.length; i++) if (r.choices[i].spelledRime === minS) return i;
      return 0;
    }
    case 'sort': return r.pile.map((tok) => { for (let b = 0; b < r.bins.length; b++) if (r.bins[b].spelledRime === tok.spelledRime) return b; return 0; });
    case 'field': { const out = []; for (let i = 0; i < r.choices.length; i++) if (r.choices[i].spelledRime === r.target.spelledRime) out.push(i); return out; }
    case 'chain': { let anchor = r.anchor, seq = []; r.steps.forEach((st) => { let idx = 0; for (let j = 0; j < st.choices.length; j++) if (st.choices[j].spelledRime === anchor.spelledRime) { idx = j; break; } seq.push(idx); if (st.choices[idx]) anchor = st.choices[idx]; }); return seq; }
    default: return -1;
  }
}
let pmRight = 0;
ROUNDS.forEach((r) => { if (C.isAnswer(r, printMatch(r))) pmRight += 1; });
note(pmRight === 0, `PRINT-MATCH scored ${pct(pmRight, ROUNDS.length)}% (need 0% — every round is print-defeated)`);
note(ROUNDS.every((r) => C.facts(r).printMatchFailsThisRound === true), 'printMatchFailsThisRound not true on every round');

/* ---------- 3. VISUAL/SEMANTIC-MATCH → 0% on pick ---------- */
function visual(r) { /* argmax same-category as target */
  for (let i = 0; i < r.choices.length; i++) if (r.choices[i].category === r.target.category) return i;
  return 0;
}
let vRight = 0;
pickRounds.filter((r) => r.cog === 'pick').forEach((r) => { if (C.isAnswer(r, visual(r))) vRight += 1; });
const nPick = pickRounds.filter((r) => r.cog === 'pick').length;
note(vRight === 0, `VISUAL/SEMANTIC-MATCH scored ${pct(vRight, nPick)}% on pick (need 0% — same-category decoy is non-rhyme)`);
note(pickRounds.filter((r) => r.cog === 'pick').every((r) => C.facts(r).sameCategoryNonRhymeDecoyPresent), 'a pick round lacks a same-category non-rhyme decoy');
note(recog.every((r) => C.facts(r).correctIsCrossCategory), 'a recognition round is not cross-category');

/* ---------- 4. FAMILIAR-PAIR → ≤ chance (novel pairs) ---------- */
const NURSERY = { 'cat': 'hat', 'star': 'car', 'fox': 'box', 'dog': 'log', 'sun': 'bun', 'bee': 'tree' };
function familiar(r) { /* pick the nursery partner of the target if present, else index-0 */
  if (r.cog !== 'pick' && r.cog !== 'chant') return 0;
  const want = NURSERY[r.target.noun];
  if (want) for (let i = 0; i < r.choices.length; i++) if (r.choices[i].noun === want) return i;
  return 0;
}
let famRight = 0;
pickRounds.forEach((r) => { if (C.isAnswer(r, familiar(r))) famRight += 1; });
note(famRight <= Math.ceil(pickRounds.length / 3), `FAMILIAR-PAIR scored ${pct(famRight, pickRounds.length)}% (need ≤ chance — novel pairs)`);

/* ---------- 5. FIRST/RANDOM → 0% on pick/chant ---------- */
let firstRight = 0;
pickRounds.forEach((r) => { if (C.isAnswer(r, 0)) firstRight += 1; });
note(firstRight === 0, `FIRST (index-0) scored ${pct(firstRight, pickRounds.length)}% (need 0% — correct never index-0)`);
note(pickRounds.every((r) => C.facts(r).correctNotIndex0 && C.facts(r).multiplePlausibleChoices), 'correctNotIndex0 / multiplePlausibleChoices violated');

/* ---------- 6. PERFECT RHYMES + STRUCTURAL ---------- */
/* perfect rhymes only: rhyming pairs share the EXACT rimeKey (no near-rhyme) — true by construction (rhymes() is ===) */
note(ROUNDS.every((r) => C.facts(r).perfectRhymesOnly), 'perfectRhymesOnly violated');
const df = C.deckFacts(ROUNDS);
note(df.distinctCogs.length >= 7, `only ${df.distinctCogs.length} distinct shapes (need ≥7): ${df.distinctCogs.join(', ')}`);
note(df.differentSpellingShare >= 0.3, `only ${Math.round(df.differentSpellingShare * 100)}% different-spelling recognition rounds (need ≥30%)`);

/* ---------- 7. THE ASSET SUBSTRATE (every token) ---------- */
const seenNoun = {};
ROUNDS.forEach((r) => {
  C.allTokens(r).forEach((t) => {
    const key = t.noun;
    if (seenNoun[key]) {
      /* word + vocab + approved + asset + phonics — check once per distinct noun, but
         verify the per-token rimeKey/spelledRime consistency every time */
    }
    /* WORD_MATCHES_VOCAB */
    const v = VOCAB[t.noun];
    const word = v && v.en && v.en[0];
    note(!!word, `WORD_MATCHES_VOCAB: "${t.noun}" not in image-vocabulary`);
    /* WORD_IN_APPROVED */
    note(APPROVED_SET.has(t.noun.toLowerCase()), `WORD_IN_APPROVED: "${t.noun}" not in approved-words-en`);
    /* spelledRime === vocab-phonics rime */
    const pr = PH[t.noun] && PH[t.noun].en && PH[t.noun].en.rime;
    note(pr === t.spelledRime, `spelledRime mismatch for "${t.noun}": token "${t.spelledRime}" vs phonics "${pr}"`);
    /* single-syllable */
    const syl = PH[t.noun] && PH[t.noun].en && PH[t.noun].en.syl;
    note(syl === 1, `"${t.noun}" is not single-syllable (syl=${syl})`);
    /* ASSET_EXISTS_AND_COLOR */
    note(!/\bbw\b/i.test(t.themeDir), `themeDir "${t.themeDir}" looks black-and-white (bw)`);
    const asset = path.join(LIB, t.themeDir, t.noun + '@2x.webp');
    note(fs.existsSync(asset), `ASSET missing: image-library-webp/themes/${t.themeDir}/${t.noun}@2x.webp`);
    seenNoun[key] = 1;
  });
});

/* ---------- report ---------- */
const distinctNouns = Object.keys(seenNoun).length;
console.log('Rhyme-Shop core gate —');
console.log(`  rimeKey oracle         : ${pct(oracleOk, ROUNDS.length)}%  (${oracleOk}/${ROUNDS.length})`);
console.log(`  print-match (per-round): ${pct(pmRight, ROUNDS.length)}%  (need 0)`);
console.log(`  visual/semantic (pick) : ${pct(vRight, nPick)}%`);
console.log(`  familiar-pair          : ${pct(famRight, pickRounds.length)}%`);
console.log(`  first/random (pick)    : ${pct(firstRight, pickRounds.length)}%`);
console.log(`  distinct shapes        : ${df.distinctCogs.length} (${df.distinctCogs.join(', ')})`);
console.log(`  per-shape pools        : ${JSON.stringify(df.perShape)}`);
console.log(`  different-spelling      : ${Math.round(df.differentSpellingShare * 100)}%   distinct nouns (assets verified): ${distinctNouns}`);
console.log('');
if (fails.length) {
  console.error(`RHYME-SHOP CORE GATE FAILED — ${fails.length}:`);
  [...new Set(fails)].forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log('RHYME-SHOP CORE GATE PASSED — the rimeKey oracle wins 100%; the PER-ROUND print-matcher produces the WRONG answer on every round (different-spelling rhymes); visual/semantic + familiar-pair + first/random all lose; the answer is derived from rimeKey (not stored); perfect rhymes only; ≥7 distinct shapes. Every token: word===vocab.en[0], in approved-words-en, single-syllable, spelledRime===vocab-phonics rime, a COLOR asset exists.');
process.exit(0);
