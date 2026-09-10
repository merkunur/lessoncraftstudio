#!/usr/bin/env node
/* =====================================================================
   verify-conjunction-core.js — the MEASURED build-gate for "Hazel's Word Bridge"
   (L.1.1.g, conjunctions). EIGHT pools: en de fr es pt it nl sv.

   ⚠⚠ THIS GATE MUST NOT ASK THE CORE ABOUT A NON-ENGLISH POOL, AND UNTIL sv #29
   IT ONLY EVER READ THE ENGLISH ONE — 48 shipped rounds, 0 assertions.
   `conjunction-core.js:19-20` hard-codes

       RELATION_CONJ = { addition:'and', contrast:'but', cause:'because', result:'so' }
       CONJ_CHIPS    = ['and','but','because','so']

   and it fails PARTIALLY, which is worse than failing cleanly. Measured — the
   English core applied to all 48 localized rounds returns, for every locale:

       "and"  ""  "but"  "and"  ""  "because"  "but"  "because"

   A plausible ENGLISH word six times in eight, and an empty string on the two
   `alternative` rounds, because `alternative` is not a key in its map. So
   `facts().relationValid` is FALSE on 12 of the 48, `sentenceNoAnswerLeak` is
   VACUOUSLY TRUE on those same rounds (it searches the sentence for ''), and
   `deckFacts` buckets a whole deck into English keys plus an '' bucket. Any bot
   number taken off the core for a localized pool is an artefact.

   ⭐⭐ AND THE TWO ENUMS DIVERGE. English rounds use
   addition/contrast/cause/RESULT; every localized deck uses
   addition/ALTERNATIVE/contrast/cause. `result` exists only in en, `alternative`
   only outside it. A gate that asserted one enum globally would condemn 48
   correct rounds — which is exactly what the core's `relationValid` does.

   ⭐ So this gate declares its OWN per-locale relation→conjunction tables and
   cross-checks them against what the activity actually ships (`REL_CONJ_L10N`
   and `CHIPS_L10N` both parse cleanly out of the activity layer). That gives
   independent ground truth AND drift detection, instead of the two recorded
   failure modes — reading the expectation off the tool, or hard-coding a copy
   that silently rots.

   ⚠⚠ EVERY WORD CHECK IS TOKEN-SCOPED — `(?<!\p{L})…(?!\p{L})`, never `\b`
   (ASCII-only: it cannot match after å/ä/ö) and never `includes()`. Measured
   reasons this matters: `ändå` and `på` contain the letter å; `meningen`
   contains `men`; `första` contains `för`. A bare-substring ban would make the
   Swedish deck unbuildable.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'conjunction-core.js');
const ACTIVITY = path.join(REPO, 'mini tools', 'hazel-word-bridge-activity.js');
const MANIFEST = path.join(REPO, 'mini tools', 'hazel-word-bridge-activities.json');
const CHANCE = 0.45;

/* ---------------------------------------------------------------- ground truth
   Declared HERE, then cross-checked against the shipped tables. */
const CONJ = {
  en: { addition: 'and', contrast: 'but', cause: 'because', result: 'so' },
  de: { addition: 'und', alternative: 'oder', contrast: 'aber', cause: 'denn' },
  fr: { addition: 'et', alternative: 'ou', contrast: 'mais', cause: 'car' },
  es: { addition: 'y', alternative: 'o', contrast: 'pero', cause: 'porque' },
  pt: { addition: 'e', alternative: 'ou', contrast: 'mas', cause: 'porque' },
  it: { addition: 'e', alternative: 'o', contrast: 'ma', cause: 'perché' },
  nl: { addition: 'en', alternative: 'of', contrast: 'maar', cause: 'want' },
  sv: { addition: 'och', alternative: 'eller', contrast: 'men', cause: 'för' },
};

/* sv-only content rules, each one bought by a native-panel ruling. */
const SV_BANNED_WORDS = [
  'för',   // must appear ONLY as the chip: «för kallt» / «för stor» / «för att» would read as "too"
  'så',    // a konjunktionellt adverb, and the resumptive filler — never in a frame
  'å',     // the colloquial spelling of `och`; a sibling sv deck teaches å→och as a SPELLING fact
  'utan',  // after a negated clause 1 Swedish needs `utan`, which is not on any chip
];
/* ⚠⚠ WHAT THIS CHECKS, AND WHAT IT DOES NOT.
   The native ruling is "the token after the gap must be that clause's own SUBJECT",
   because an adjective / adverb / quantifier there makes the `för` chip read as
   *too* — «för mycket snö» = "too much snow", a real garden path for an
   eight-year-old who pattern-matches rather than parses.

   My first version tried to prove subjecthood POSITIVELY (pronoun, or capitalised,
   or a definite ending) and it FAILED A CORRECT ROUND: «mamma» is an ordinary
   Swedish subject, lowercase, ending in -a. A rule I invented is not a measurement.

   So this bans the HAZARD CLASS instead, which is closed enough to enumerate: the
   degree words, quantifiers and the infinitive marker that would let `för` be read
   as *too*. It does NOT prove the token is a subject — it proves the round cannot
   trigger the "too" reading. That is the invariant the ruling actually protects. */
const SV_GRADABLE_AFTER_GAP = [
  'att',
  'mycket', 'många', 'lite', 'litet', 'mer', 'mera', 'mest', 'minst', 'få', 'några',
  'ganska', 'väldigt', 'alldeles', 'riktigt', 'jätte', 'ovanligt', 'extra',
  'ofta', 'sent', 'tidigt', 'länge', 'nära', 'långt', 'högt', 'lågt', 'hårt', 'snabbt', 'långsamt',
];

/* ⚠ five of six sibling locales prefix the round id with its own answer word
   (`und-essen-tisch`, `denn-schirm-regen`), leaking it into the DOM-adjacent task
   id. sv ships clean. This is a NAMED RATCHET: it may only SHRINK. */
const ID_LEAK_RATCHET = new Set(['de', 'fr', 'es', 'pt', 'nl']);

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const word = (w) => new RegExp('(?<!\\p{L})' + esc(w) + '(?!\\p{L})', 'iu');

function loadCore() {
  const win = {};
  new Function('window', fs.readFileSync(CORE, 'utf8'))(win);
  if (!win.ConjunctionCore) throw new Error('core did not attach window.ConjunctionCore');
  return win.ConjunctionCore;
}

/* parse the SHIPPED per-locale tables straight out of the activity layer */
function shipped() {
  /* ⚠ strip block comments first: a gate can read PROSE instead of code, and this
     file's comments now quote the very table names being searched for. */
  const raw = fs.readFileSync(ACTIVITY, 'utf8');
  const src = raw.split('/*').map((p, i) => (i ? p.slice(p.indexOf('*/') + 2) : p)).join('');
  const consts = {};
  let m;
  const reObj = /var\s+REL_CONJ_([A-Z]{2})\s*=\s*\{([^}]*)\}\s*;/g;
  while ((m = reObj.exec(src))) {
    const o = {};
    m[2].split(',').forEach((pair) => {
      const p = pair.split(':').map((x) => x.trim());
      if (p.length === 2) o[p[0]] = p[1].replace(/^'|'$/g, '');
    });
    consts['REL_CONJ_' + m[1]] = o;
  }
  const reArr = /var\s+CHIPS_([A-Z]{2})\s*=\s*(\[[^\]]*\])\s*;/g;
  while ((m = reArr.exec(src))) consts['CHIPS_' + m[1]] = JSON.parse(m[2].replace(/'/g, '"'));

  const pick = (mapName, prefix) => {
    const mm = src.match(new RegExp('var\\s+' + mapName + '\\s*=\\s*\\{([^}]*)\\}'));
    if (!mm) throw new Error('could not parse ' + mapName + ' out of the activity layer');
    const out = {};
    mm[1].split(',').forEach((pair) => {
      const p = pair.split(':').map((x) => x.trim());
      if (p.length === 2 && consts[p[1]]) out[p[0]] = consts[p[1]];
    });
    return out;
  };
  return { rel: pick('REL_CONJ_L10N', 'REL_CONJ_'), chips: pick('CHIPS_L10N', 'CHIPS_') };
}

/* ---------------------------------------------------------------- bots
   Computed from the locale's OWN chip set, never from the core. */
function bots(rounds, table, chips) {
  const n = rounds.length || 1;
  const posCount = {}, ans = {};
  let longHits = 0, shortHits = 0;
  const lens = chips.map((c) => c.length);
  const mx = Math.max.apply(null, lens), mn = Math.min.apply(null, lens);
  const uniqLong = lens.filter((l) => l === mx).length === 1;
  const uniqShort = lens.filter((l) => l === mn).length === 1;
  rounds.forEach((r) => {
    const a = table[r.relation];
    const ci = chips.indexOf(a);
    posCount[ci] = (posCount[ci] || 0) + 1;
    ans[a] = (ans[a] || 0) + 1;
    if (uniqLong && chips[lens.indexOf(mx)] === a) longHits++;
    if (uniqShort && chips[lens.indexOf(mn)] === a) shortHits++;
  });
  const max = (o) => Math.max.apply(null, Object.keys(o).map((k) => o[k]));
  return { positionBot: max(posCount) / n, longestBot: longHits / n, shortestBot: shortHits / n, fixedGuessBot: max(ans) / n, ans: ans };
}

(function main() {
  const Core = loadCore();
  const row = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0];
  const pools = Object.assign({ en: row.params.rounds || [] }, row.params.roundsL10n || {});
  const ship = shipped();

  /* ---- DRIFT: the shipped tables must equal the declared ones ---- */
  Object.keys(CONJ).filter((l) => l !== 'en').forEach((loc) => {
    const s = ship.rel[loc], c = ship.chips[loc];
    F(!!s, `DRIFT: the activity ships no REL_CONJ entry for "${loc}" — hwbOracle() would fall through to the ENGLISH core, which returns '' for relation "alternative", so NO chip would ever be correct`);
    F(!!c, `DRIFT: the activity ships no CHIPS entry for "${loc}"`);
    if (s) F(JSON.stringify(s) === JSON.stringify(CONJ[loc]), `DRIFT: REL_CONJ_L10N.${loc} ships ${JSON.stringify(s)}, this gate declares ${JSON.stringify(CONJ[loc])}`);
    if (c) F(JSON.stringify(c.slice().sort()) === JSON.stringify(Object.values(CONJ[loc]).slice().sort()), `DRIFT: CHIPS_L10N.${loc} ${JSON.stringify(c)} is not the chip set of REL_CONJ_L10N.${loc}`);
  });
  Object.keys(pools).forEach((loc) => F(!!CONJ[loc], `pool "${loc}" has no declared table in this gate`));

  const rows = [];
  Object.keys(pools).forEach((loc) => {
    const rounds = pools[loc];
    const table = CONJ[loc] || {};
    const chips = Object.values(table);
    const n = rounds.length || 1;
    F(rounds.length >= 7, `${loc}: ${rounds.length} rounds (need >=7)`);

    const seen = {};
    rounds.forEach((r) => {
      const tag = `${loc}/${r.id}`;
      const ans = table[r.relation];

      /* the relation must exist in THIS locale's table — so `result` fails outside
         en, and `alternative` is no longer false-failed by the English core */
      F(!!ans, `${tag}: relation "${r.relation}" is not in the ${loc} table (${Object.keys(table).join('/')})`);
      if (!ans) return;
      seen[ans] = (seen[ans] || 0) + 1;

      F(chips.length === 4, `${tag}: ${chips.length} chips (need 4)`);
      F(new Set(chips).size === 4, `${tag}: chips not distinct — ${JSON.stringify(chips)}`);
      F((String(r.sentence).match(/___/g) || []).length === 1, `${tag}: sentence must contain exactly one "___"`);
      /* ⚠ `indexOf(' ___ ')` is satisfied by '  ___  ' too — it proves there IS a space
         each side, not that there is EXACTLY one, so it could not see the very defect it
         was written for (48 rounds of a sibling deck shipped a double space this way).
         Measure the actual neighbours instead. */
      (function () {
        const h = String(r.sentence).split('___');
        F(h.length === 2 && / $/.test(h[0]) && !/  $/.test(h[0]) && /^ /.test(h[1]) && !/^  /.test(h[1]),
          `${tag}: the gap needs EXACTLY one space each side — got ${JSON.stringify(h[0].slice(-2) + '___' + h[1].slice(0, 2))}`);
        F(!/  /.test(r.sentence), `${tag}: the sentence contains a double space`);
      }());
      F(r.sentence === r.sentence.trim(), `${tag}: sentence has leading/trailing whitespace`);
      F(r.answer === undefined && r.correct === undefined, `${tag}: the answer is STORED, not derived`);

      /* ⭐ the core's own leak guard is vacuously true for `alternative` (it searches
         for ''), so do it here against the locale's real answer word. */
      F(!word(ans).test(r.sentence), `${tag}: the answer "${ans}" already appears in the sentence`);

      /* ⭐⭐ and the id must not carry it either */
      if (!ID_LEAK_RATCHET.has(loc)) F(String(r.id).split('-').indexOf(ans) < 0, `${tag}: the round id LEAKS its own answer "${ans}"`);

      /* childView is locale-neutral, so this one CAN go through the core */
      F(JSON.stringify(Core.childView(r)).indexOf('relation') < 0, `${tag}: childView leaks relation`);

      if (loc === 'sv') {
        F(r.sentence.indexOf(',') < 0, `${tag}: contains a comma — with four fixed chips any punctuation regularity is a shortcut, and a uniform comma is not available in Swedish`);
        SV_BANNED_WORDS.forEach((w) => {
          if (w === ans) return;                       // `för` IS the answer word in cause rounds
          F(!word(w).test(r.sentence), `${tag}: the WORD "${w}" appears in the sentence`);
        });
        const halves = r.sentence.split('___');
        const c1 = halves[0].trim().split(/\s+/).filter(Boolean);
        const c2 = halves[1].trim().split(/\s+/).filter(Boolean);
        const after = c2[0].replace(/[.,!?]/g, '').toLowerCase();
        /* see SV_GRADABLE_AFTER_GAP: this bans the "too" reading, it does not prove subjecthood */
        F(SV_GRADABLE_AFTER_GAP.indexOf(after) < 0,
          `${tag}: "${c2[0]}" follows the gap — a degree word, quantifier or "att" there makes the "för" chip read as *too* («för mycket snö»)`);
        F(c1.length + c2.length <= 10, `${tag}: ${c1.length + c2.length} words (max 10)`);
        F(c1.length <= 5 && c2.length <= 5, `${tag}: a clause exceeds 5 words (${c1.length}/${c2.length})`);
        F(c2.length >= 2, `${tag}: clause 2 has no subject+verb — subject ellipsis is grammatical with och/eller/men but NOT with för`);
      }
    });

    /* every relation in the locale's table must be the answer in >=1 round */
    Object.keys(table).forEach((rel) => F(rounds.some((r) => r.relation === rel), `${loc}: relation "${rel}" is never used — the bank is not a genuine 4-way`));

    const b = bots(rounds, table, chips);
    F(b.positionBot <= CHANCE, `${loc}: position bot ${pct(b.positionBot)} > ${pct(CHANCE)}`);
    F(b.longestBot <= CHANCE, `${loc}: longest-chip bot ${pct(b.longestBot)} > ${pct(CHANCE)}`);
    F(b.shortestBot <= CHANCE, `${loc}: shortest-chip bot ${pct(b.shortestBot)} > ${pct(CHANCE)}`);
    F(b.fixedGuessBot <= CHANCE, `${loc}: fixed-guess bot ${pct(b.fixedGuessBot)} > ${pct(CHANCE)} — one conjunction answers too many rounds; balance the relations`);

    rows.push(`  ${loc.padEnd(3)} ${String(rounds.length).padStart(2)} rounds  ` +
      `position ${pct(b.positionBot).padStart(6)} | longest ${pct(b.longestBot).padStart(6)} | ` +
      `shortest ${pct(b.shortestBot).padStart(6)} | fixed-guess ${pct(b.fixedGuessBot).padStart(6)}  ${JSON.stringify(b.ans)}`);
  });

  console.log(`hazel-word-bridge: ${Object.keys(pools).length} pools, ${Object.values(pools).reduce((a, r) => a + r.length, 0)} rounds  (ceiling ${pct(CHANCE)})`);
  rows.forEach((r) => console.log(r));
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-CONJUNCTION FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-CONJUNCTION PASSED — 8 pools; every relation in its OWN locale table; 4 distinct chips; exactly one padded "___"; answer derived, not stored, and absent from the sentence; id does not leak the answer (ratchet: ' + [...ID_LEAK_RATCHET].join(',') + '); every relation used; position/longest/shortest/fixed-guess ≤ chance on each locale’s OWN chips; sv content rules (no comma, no banned WORD, no degree word/quantifier/"att" after the gap so the "för" chip cannot read as *too*, ≤10 words, clause 2 has subject+verb); shipped REL_CONJ_L10N/CHIPS_L10N match this gate’s declared truth.');
  process.exit(0);
})();
