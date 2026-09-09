#!/usr/bin/env node
/* =====================================================================
   verify-sentence-builder-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/sentence-builder-core.js (window shim) and proves,
   for the shipped manifest (L.1.1.j build-a-sentence):

     1. EACH sentence ≥4 words, starts with a Capitalized word, ends with a "."
        (a complete declarative), with NO duplicate words (1:1 tile↔slot).
     2. ORDERED GRADE is strict — gradeOrder(canonical,canonical)=true;
        reversed=false; EVERY adjacent single-swap=false (only the exact order
        passes → exact-order grading is unambiguous).
     3. SCRAMBLE differs from canonical (there is always something to arrange).
     4. DERIVED_NOT_STORED — no stored correctIndex/answer/correct key (deep
        scan); mutate the canonical order → a previously-correct arrangement now
        fails (the grade is the order, not a stored flag).
     5. ASSET — every subject noun has a COLOR @2x.webp on disk (§20.5).
     6. ≥7 distinct sentences, ≥6 distinct subjects.

   NOTE: "unique grammatical order" (no SECOND valid sentence from the tiles) is
   an authoring guarantee checked by the visual-critic, not machine-verifiable
   here. Exit 0 = pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['correctIndex', 'answer', 'answerIndex', 'correct', 'isCorrect', 'order'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'sentence-builder-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.SentenceBuilderCore;
if (!Core) { console.error('FAIL: sentence-builder-core.js did not define window.SentenceBuilderCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'sentence-builder-activities.json'), 'utf8'));
const THEMES = path.join(REPO, 'image-library-webp', 'themes');
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
function scanKeys(obj, label) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => { if (FORBIDDEN_KEYS.indexOf(k) >= 0) failures.push(`${label}: forbidden stored-answer key "${k}"`); scanKeys(obj[k], label + '.' + k); });
}
const colorImage = (s) => fs.existsSync(path.join(THEMES, s.themeDir, s.noun + '@2x.webp')) && !/\bbw\b|black/i.test(s.themeDir);

let roundCount = 0;

/* ⚠⚠ THIS GATE USED TO READ `row.params.rounds` ONLY — the ENGLISH pool — so six
   shipped non-English decks were never measured. Fourth occurrence of that class in
   this activity family (plural -> tense -> affix -> here).
   ⭐ Unlike affix, the extension is CLEAN: every assertion here is locale-neutral and
   all pools pass unchanged, so there is no per-assertion scoping and no WARN backlog.
   Do not assume scoping is always required — measure first. */
function poolsOf(row) {
  const p = row.params || {};
  const out = [['en', p.rounds || []]];
  const l = p.roundsL10n || {};
  Object.keys(l).forEach((k) => out.push([k, l[k] || []]));
  return out;
}

let poolCount = 0;
for (const row of manifest) {
  for (const [loc, rounds] of poolsOf(row)) {
  poolCount++;
  check(rounds.length >= VARIETY_MIN, `${row.id}[${loc}]: ${rounds.length} rounds < ${VARIETY_MIN}`);

  rounds.forEach((r) => {
    roundCount++;
    const label = `${row.id}[${loc}] ${r.id}`;
    scanKeys(r, label);
    const f = Core.facts(r);
    const c = r.canonical || [];

    check(f.wordCount >= 4, `${label}: ${f.wordCount} words (<4 — middle ordering must be non-trivial)`);
    /* ⚠ `Core.facts().startsCapital` is `/^[A-Z]/` — ASCII-only, the same class as the
       recorded \b trap. Measured: it REJECTS `Åtta`, `Ärtan`, `Öknen`. Swedish dodges it
       (Den/Det/De/En/Ett are ASCII-initial) but da/no (Å, Æ, Ø) will not, and today they
       would be told they "do not start with a capitalized word", which is the wrong
       diagnosis. The core is protected, so the gate names the real cause instead. */
    const firstIsUpper = !!c[0] && c[0][0] === c[0][0].toLocaleUpperCase() && c[0][0] !== c[0][0].toLocaleLowerCase();
    if (!f.startsCapital && firstIsUpper) {
      failures.push(`${label}: "${c[0]}" IS capitalized, but Core.facts().startsCapital is ASCII-only (/^[A-Z]/) and cannot see it — the CORE needs a Unicode-aware test, the sentence is fine`);
    } else {
      check(f.startsCapital, `${label}: does not start with a capitalized word ("${c[0]}")`);
    }
    check(f.endsPeriod, `${label}: does not end with . ! or ? ("${c[c.length - 1]}")`);
    check(f.noDuplicateWords, `${label}: has duplicate words (breaks 1:1 tile↔slot)`);
    check(f.scrambleDiffers, `${label}: scramble equals the canonical order (nothing to arrange)`);

    // strict ordered grade
    check(Core.gradeOrder(c, c) === true, `${label}: canonical order not accepted`);
    check(Core.gradeOrder(c.slice().reverse(), c) === false, `${label}: reversed order accepted`);
    for (let i = 0; i < c.length - 1; i++) {
      const sw = c.slice(); const t = sw[i]; sw[i] = sw[i + 1]; sw[i + 1] = t;
      check(Core.gradeOrder(sw, c) === false, `${label}: a single adjacent swap (${i}) was accepted`);
    }
    // tiles are a permutation of canonical
    const tiles = Core.scramble(c, r.seed || 1);
    /* ⭐ `Core.scramble` guarantees only that the opening order != canonical — never that
       it is FAR from it. A 4-tile round with 2 tiles already home is ONE TRANSPOSITION
       from solved, and for n=4 the permutation is a pure function of the seed, so a bad
       seed was identical in every locale. Measured before the fix: seeds 31/41/61/67/71
       each left 2 tiles home, and 41 gave [0,2,1,3] — capital and period already pinned,
       only the middle pair swapped. */
    const homeTiles = tiles.filter((t, i) => t === c[i]).length;
    check(homeTiles < 2, `${label}: opens with ${homeTiles} of ${c.length} tiles already in their correct slot (seed ${r.seed}) — one transposition from solved`);

    /* ⭐ the exact-order grading is safe ONLY because the capital is pinned to slot 1 and
       the period to the last slot, leaving one grammatical order of the middle. A SECOND
       ADJECTIVE would make two orders correct (Swedish `den stora bruna` / `den bruna
       stora` are both acceptable), and the engine would mark one wrong. Four tiles keeps
       the middle a pair. */
    check(c.length === 4, `${label}: ${c.length} tiles — this deck is built on a 4-tile pin (capital, adj, noun, verb+period); a 5th tile can open a second valid order`);
    check(tiles.slice().sort().join('|') === c.slice().sort().join('|'), `${label}: tiles are not a permutation of the sentence`);

    // derived: mutate the canonical order → the old-correct arrangement fails
    if (c.length >= 2) {
      const mutated = c.slice(); const t2 = mutated[0]; mutated[0] = mutated[1]; mutated[1] = t2;
      check(Core.gradeOrder(c, mutated) === false, `${label}: grade not derived from order (re-pointing canonical still accepted the old order)`);
    }

    // asset
    if (r.subject && r.subject.noun) check(colorImage(r.subject), `${label}: subject ${r.subject.noun} has no COLOR @2x.webp at themes/${r.subject.themeDir}/`);
  });

  const df = Core.deckFacts(rounds);
  check(df.distinctSentences >= VARIETY_MIN, `${row.id}[${loc}]: only ${df.distinctSentences} distinct sentences (<${VARIETY_MIN})`);
  check(df.distinctSubjects >= 6, `${row.id}[${loc}]: only ${df.distinctSubjects} distinct subjects (<6)`);
  }
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} sentence-builder violation(s) across ${roundCount} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
/* ⚠ this line used to report a count computed from the ENGLISH pool alone while
   claiming to describe the whole gate — it said "9 sentences" when 63 existed. */
console.log(`PASS — ${roundCount} sentence(s) across ${poolCount} pool(s): each exactly 4 tiles, capital-first + period-last, no dup words; ordered grade strict (only the exact order passes, every swap rejected); opens <2 tiles from home; derived-not-stored (order-mutation); subjects color-imaged; ≥${VARIETY_MIN} distinct sentences per pool. [L.1.1.j + L.K.1.b]`);
process.exit(0);
