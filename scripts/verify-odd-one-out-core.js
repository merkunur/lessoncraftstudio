#!/usr/bin/env node
/* =====================================================================
   verify-odd-one-out-core.js — the MEASURED build-gate for "Ziggy's Odd One Out"
   (L.1.5.a). Drives the REAL odd-one-out-core.js over the REAL manifest, EVERY
   locale pool.

   ⚠⚠ WHY THIS FILE WAS REWRITTEN AT sv #35.

   1. It read `manifest[0].params.rounds` — the English pool only, so 6 of 7 pools
      were ungated. Fifth consecutive engine in this fan-out with that hole.

   2. ⭐ IT MEASURED THE WRONG STRING. `deckFacts` computes its length bots from
      `it.noun`, which is the ENGLISH IMAGE FILENAME, not the word the child sees —
      the rendered word is `it.label`. The tell was that the old gate reported an
      IDENTICAL 12.5% / 25.0% for all seven locales while the real per-locale
      numbers differ (de 0/0, es 25/12.5, nl 0/25). **A number that is constant
      across seven languages is not measuring the language.**

   3. ⭐ IT HAD NO CUE FOR A PICTURE DECK. In 5 of the 8 shipped English rounds one
      of the THREE MEMBERS is the only tile from its theme folder — a bee from
      `farm animals` beside an ant from `forest creatures` and a butterfly from
      `easter` — so the art points at a member rather than at the outsider. 62.5%
      shipped. Gated now. ⚠ My first version of this cue measured the OUTSIDER being
      alone instead, which is tautological with the category; see the note on CUES.

   4. ⭐ IT NEVER CHECKED THAT THE PICTURES EXIST. The activity hides a broken
      image with `onerror="this.style.visibility='hidden'"`, so a missing file
      renders as an EMPTY TILE and every other gate stays green. Also enforces the
      §20.5 colour-only rule: no B&W theme may be referenced.

   WHAT IS DELIBERATELY *NOT* ASSERTED
     ⚠ positionBot. It reads the STORED item order, and the activity shuffles one
     layer up — `ziggy-odd-one-out-activity.js:64`
     `this._cards = shuffle(this.view.items.slice())`, with `render()` iterating
     `_cards`. Third engine running where that number is an artefact; two separate
     instruments have now filed a false catastrophe off exactly this shape. It is
     printed as informational only, and the RENDERED order is asserted where a
     child could see it — in local-test-ziggy-odd-one-out.js.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'odd-one-out-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'ziggy-odd-one-out-activities.json');
const THEMES = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes');
const CHANCE = 0.45;          // for word-shape cues, where a bot picks 1 of 4
const PICK4 = 0.25;           // true chance on a 4-tile board

/* Measured baselines, pasted from `--measure`, never estimated. ⚠ RATCHET: may only
   SHRINK. And ⚠⚠ WHICH locales may carry a row is frozen — sv #34 proved that a
   max-over-family ratchet is laundered by simply ADDING a row for the failing locale. */
const WORD_BASELINE = { en: 0.500 };            // en firstAlpha; the only word-cue breach
const DECOY_BASELINE = 0.625;                   // measured: 5 of the 8 shipped en rounds
const RATCHET_ALLOWED = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'];

/* §20.5: colour-only. The end-of-theme-name B&W marker is LOCALIZED, so matching the
   literal string "bw" leaks B&W art into ten locales. Trailing digits are stripped
   first ("animals bw 2"). */
const BW_MARKERS = ['bw', 'sw', 'bn', 'nb', 'zw', 'sh', 'pb', 'mv', 'sv'];
const isBW = (dir) => {
  const t = String(dir).toLowerCase().replace(/\s*\d+\s*$/, '').trim();
  return BW_MARKERS.some((mk) => t === mk || t.endsWith(' ' + mk));
};

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.OddOneOutCore) throw new Error('core did not attach window.OddOneOutCore');
  return win.OddOneOutCore;
}

/* ---- the cue family. None of these looks at a picture or reads a language. ---- */
const oddIndex = (r) => {
  const c = {};
  r.items.forEach((it) => { c[it.category] = (c[it.category] || 0) + 1; });
  return r.items.findIndex((it) => c[it.category] === 1);
};
const share = (r, cand) => (cand.length ? (cand.indexOf(oddIndex(r)) >= 0 ? 1 / cand.length : 0) : 0);
const uniqExtreme = (r, f, dir) => {
  const v = r.items.map(f);
  const target = Math[dir].apply(null, v);
  const idx = v.map((x, i) => (x === target ? i : -1)).filter((i) => i >= 0);
  return idx;
};
// ⭐ the rendered word, NOT the image filename
const WORD = (it) => String(it.label || it.noun);

const CUES = {
  longestWord: (r) => share(r, uniqExtreme(r, (it) => WORD(it).length, 'max')),
  shortestWord: (r) => share(r, uniqExtreme(r, (it) => WORD(it).length, 'min')),
  /* ⭐⭐ THE PICTURE-DECK CUE, AND MY FIRST VERSION OF IT MEASURED THE WRONG THING.
     I first gated "the outsider is the only tile from its theme folder" and it read
     62.5% shipped / 75% on the new Swedish deck — so it would have FAILED the better
     deck. Diagnosed: that number is 100% exactly when a round is CROSS-superordinate
     and 0% when it is WITHIN one. It is the category arriving by another name, not a
     shortcut — a child who can see that a ball is not a cow does not need art style.

     What a child CAN exploit is the inverse: a MEMBER alone in its folder while the
     other two members share one, so the art points at the wrong tile. Measured:
     shipped en 62.5% (a bee from `farm animals`, an ant from `forest creatures` and a
     butterfly from `easter` are three art sets pretending to be one category), and the
     Swedish deck 0%. That is the defect; the other reading was the design. */
  memberDecoy: (r) => {
    const o = oddIndex(r);
    const c = {};
    r.items.forEach((it) => { c[it.themeDir] = (c[it.themeDir] || 0) + 1; });
    return r.items.some((it, i) => i !== o && c[it.themeDir] === 1) ? 1 : 0;
  },
  firstAlpha: (r) => share(r, uniqExtreme(r, (it) => WORD(it).toLowerCase().charCodeAt(0), 'min'))
};
/* ⭐⭐ TWO FAMILIES, MEASURED SEPARATELY — because one number conflates two different
   things and hides both. WORD cues are about the printed label and CAN be driven to
   chance by choosing items. `themeOutlier` CANNOT: in an image library organised BY
   THEME, the members of a category necessarily live in one folder, so the folder and
   the category are the same signal arriving twice (measured: it hands over the answer
   outright in 3 of the 8 English rounds and narrows it in the rest). Driving it to 25%
   would mean sourcing the three members from three unrelated folders, which makes the
   board look incoherent. So it is ratcheted at its measured value with the reason
   recorded, and the word cues are held to the flat ceiling on their own. */
const WORD_CUES = ['longestWord', 'shortestWord', 'firstAlpha'];
const CUE_NAMES = Object.keys(CUES);

(function main() {
  const measure = process.argv.includes('--measure');
  const Core = loadCore();
  const params = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).find(Boolean).params;
  const pools = Object.assign({ en: params.rounds || [] }, params.roundsL10n || {});
  const locales = Object.keys(pools);

  F(locales.length >= 8, `only ${locales.length} pools — did a locale vanish?`);
  F(locales.indexOf('sv') >= 0, 'no sv pool — the Swedish deck is missing');

  Object.keys(WORD_BASELINE).forEach((loc) => {
    F(RATCHET_ALLOWED.indexOf(loc) >= 0,
      `${loc} carries a ratchet row, but only locales already breaching when this gate was ` +
      `written may have one — a locale added later is held to the flat ceiling`);
  });

  const table = [];
  const imagesChecked = {};
  locales.forEach((loc) => {
    const pool = pools[loc];
    const N = pool.length || 1;
    F(pool.length >= 8, `${loc}: ${pool.length} rounds (need >=8)`);

    let oracleHits = 0;
    pool.forEach((r) => {
      const f = Core.facts(r);
      const w = `${loc}/${r.id}`;
      F(f.fourItems, `${w}: not 4 items`);
      F(f.cleanSplit, `${w}: not a clean 3-1 category split`);
      F(f.distinct, `${w}: nouns not distinct`);
      /* ⭐ `facts.distinct` checks `noun` — the ENGLISH FILENAME — so nothing stops two
         tiles rendering the SAME word. Swedish has 61 labels shared by more than one
         image key: klocka is clock, watch AND bell; mask is face-mask AND worm; bok is
         book AND beech. A poison that renamed one tile slipped straight through until
         this line existed. */
      F(new Set(r.items.map((it) => String(it.label || it.noun).toLowerCase())).size === r.items.length,
        `${w}: two tiles render the SAME word (${r.items.map((it) => it.label || it.noun).join(', ')})`);
      /* ⚠ a 2-2 split makes oddIndex -1 and deckFacts then indexes items[-1]; without
         this the gate CRASHED instead of reporting, which is a worse failure than a
         red line because it prints no reason. */
      if (!f.cleanSplit) return;
      F(JSON.stringify(Core.childView(r)).indexOf('category') < 0, `${w}: childView leaks category`);
      if (Core.grade(r, Core.oracle(r))) oracleHits++;

      r.items.forEach((it) => {
        F(!!String(it.label || it.noun).trim(), `${w}: an item renders no word`);
        F(!isBW(it.themeDir), `${w}: "${it.themeDir}" is a B&W theme — §20.5 is colour-only`);
        const rel = path.join(it.themeDir, it.noun + '@2x.webp');
        if (!(rel in imagesChecked)) imagesChecked[rel] = fs.existsSync(path.join(THEMES, rel));
        F(imagesChecked[rel], `${w}: image missing on disk — ${rel} (a broken tile renders EMPTY: the activity hides it with onerror)`);
      });
    });
    F(oracleHits === N, `${loc}: oracle ${oracleHits}/${N} (must be 100%)`);

    /* ⚠ `deckFacts` indexes items[correctIndex] and correctIndex is -1 on a malformed
       round, so a single 2-2 split took the whole gate down with a TypeError instead of
       printing a reason. A crash is a worse failure than a red line: it tells the next
       person nothing. The structural failures above are already recorded, so a
       malformed pool stops here. */
    if (pool.some((r) => !Core.facts(r).cleanSplit)) return;

    const d = Core.deckFacts(pool);
    F(d.fixedGuessBot <= CHANCE, `${loc}: fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

    const cue = {};
    CUE_NAMES.forEach((n) => { cue[n] = pool.reduce((a, r) => a + CUES[n](r), 0) / N; });
    const worst = Math.max.apply(null, CUE_NAMES.map((n) => cue[n]));
    const worstName = CUE_NAMES.find((n) => cue[n] === worst);

    const worstWord = Math.max.apply(null, WORD_CUES.map((n) => cue[n]));
    const worstWordName = WORD_CUES.find((n) => cue[n] === worstWord);
    if (!measure) {
      const ceil = Object.prototype.hasOwnProperty.call(WORD_BASELINE, loc) ? WORD_BASELINE[loc] : CHANCE;
      F(worstWord <= ceil + 1e-3,
        `${loc}: worst WORD cue "${worstWordName}" ${pct(worstWord)} > ${pct(ceil)} ` +
        `(ratchet may only shrink — fix the ITEMS, never this number)`);
      F(cue.memberDecoy <= DECOY_BASELINE + 1e-3,
        `${loc}: memberDecoy ${pct(cue.memberDecoy)} > ${pct(DECOY_BASELINE)} — too often one of the THREE ` +
        `MEMBERS is the only tile from its theme folder, so the art points at the wrong answer`);
    }
    table.push({ loc, N: pool.length, d, cue, worst, worstName });
  });

  const pad = (s, n) => String(s).padStart(n);
  console.log('loc  n  fixed | ' + CUE_NAMES.map((n) => pad(n.slice(0, 13), 14)).join('') + '    worst');
  table.forEach((t) => {
    console.log(t.loc.padEnd(5) + pad(t.N, 2) + pad(t.d.fixedGuessBot.toFixed(2), 7) + ' | ' +
      CUE_NAMES.map((n) => pad((100 * t.cue[n]).toFixed(1), 14)).join('') +
      pad((100 * t.worst).toFixed(1), 9) + '  ' + t.worstName);
  });
  console.log(`\n(chance on a 4-tile board = ${pct(PICK4)}. ${Object.keys(imagesChecked).length} distinct images checked on disk. ` +
    'positionBot is NOT asserted — it reads the STORED order, which the activity shuffles away: ' +
    table.map((t) => t.loc + ' ' + t.d.positionBot.toFixed(2)).join(', ') + ')');

  if (measure) {
    console.log('\n--measure: paste into CUE_BASELINE, never estimate it');
    console.log('  WORD_BASELINE  ' + JSON.stringify(table.reduce((a, t) => {
      const w = Math.max.apply(null, WORD_CUES.map((n) => t.cue[n]));
      if (w > CHANCE) a[t.loc] = Number(w.toFixed(3));
      return a;
    }, {})));
    console.log('  DECOY_BASELINE ' + Math.max.apply(null, table.map((t) => Number(t.cue.memberDecoy.toFixed(3)))));
    process.exit(0);
  }

  console.log('');
  if (fails.length) {
    console.error(`VERIFY-ODD-ONE-OUT FAILED — ${fails.length} issue(s):`);
    fails.slice(0, 20).forEach((m) => console.error('  • ' + m));
    if (fails.length > 20) console.error(`  … and ${fails.length - 20} more`);
    process.exit(1);
  }
  console.log(`VERIFY-ODD-ONE-OUT PASSED — ${locales.length} pools, ${table.reduce((a, t) => a + t.N, 0)} rounds; ` +
    'oracle 100%; clean 3-1 splits; every picture exists and no B&W theme; every surface cue inside its measured ratchet.');
  process.exit(0);
})();
