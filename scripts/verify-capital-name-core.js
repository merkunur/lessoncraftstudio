#!/usr/bin/env node
/* =====================================================================
   verify-capital-name-core.js — the MEASURED build-gate for "Wally's Capital
   Crane" (L.2.2.a), across ALL EIGHT pools.

   ⚠⚠ THE PREVIOUS VERSION READ `manifest[0].params.rounds` — the ENGLISH pool and
   nothing else. Eight rounds gated, forty-eight ungated: de, fr, es, pt, it and nl
   have never been checked by anything, and neither would sv. The activity picks its
   deck with `roundsL10n[LANG] || params.rounds`, so this file was measuring one of
   seven decks and reporting on the engine.

   ⭐ THREE AXES THE CORE CANNOT SEE, and they are where the real leaks live.
   `deckFacts` measures absolute token index, longest, shortest and fixed-guess. It
   does NOT measure:

     lastWord   tap the last word before the full stop.
                MEASURED on the shipped decks: nl 88%, en 75%, es/pt/it 50%.
                A Dutch child can clear that deck without reading a letter.
     loLongest  tap the longest LOWERCASE chip — i.e. ignore the sentence-initial
                word, which is already capitalised and which no child would tap.
                This one is invisible to `longestBot` and it is not theoretical: the
                sv panel's own second draft scored 12.5% on longest and 62.5% on
                this, because its long distractor was usually the first word.
     oneCapital ⭐⭐ NO TOKEN OTHER THAN `proper` MAY REQUIRE A CAPITAL. `facts()`
                checks `oneMatch` — that the proper token occurs once — never that
                the REST of the sentence is legitimately lowercase. A second name in
                the sentence is a second right answer, and nothing has ever looked.

   ⚠ For sv the oneCapital check is a DECLARED PER-ROUND ruling, not a computation:
   whether a Swedish word takes a capital is a fact about Swedish, and an unclassified
   round FAILS rather than inheriting another round's verdict.

   ⚠ The core is locale-NEUTRAL (oracle = tokens.indexOf(proper), no word list), so
   unlike reflexive-pronoun-core it can be driven on every pool directly. It still
   must not mark its own homework: the answers below are re-derived here.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'capital-name-core.js');
const MANIFEST = path.join(REPO, 'mini tools', 'wally-capital-crane-activities.json');
const CHANCE = 0.45;
const MEASURE = process.argv.indexOf('--measure') >= 0;

/* ⚠⚠ RATCHETS, MEASURED with `--measure` against the shipped decks 2026-09-10. An entry
   may only go DOWN. They are not permission — they are the recorded size of a live
   weakness whose repair is native round data per locale. ⚠ My first attempt at a table
   like this on sv #31 carried numbers I had ESTIMATED and three of eight were wrong in
   the direction that fails a CORRECT deck. Run --measure, paste, never round to taste. */
const RATCHET = {
  lastWord: { en: 0.7500, de: 0.2500, fr: 0.0000, es: 0.5000, pt: 0.5000, it: 0.5000, nl: 0.8750, sv: 0.2500 },
  loLongest: { en: 0.2500, de: 0.2500, fr: 0.0417, es: 0.3542, pt: 0.2917, it: 0.0000, nl: 0.5000, sv: 0.1250 },
};

/* ---- the sv exactly-one-capital ruling, from the native panel, per round ----
   ⚠ A Swedish place name is usable as `proper` ONLY if its lowercase form is not
   itself a Swedish word — the homograph is invisible in the capitalised form, which
   is the only form a designer looks at. That rule cost a round in this very build:
   `dalarna` is the definite plural of *dal*, "the valleys". Also excluded on the same
   test: Lund (en lund = a grove), Rom (fish roe), Polen (the pole), Skansen (the
   redoubt), Kolmården, and worst of all JAPAN — *en japan* is a Japanese person, and
   nationality nouns are lowercase, which is exactly the distinction this deck teaches. */
const SV_BANNED = ['dalarna', 'lund', 'rom', 'japan', 'polen', 'skansen', 'kolmården',
  /* foils whose lowercase status is real but contested in practice, or ambiguous */
  'mars', 'halloween', 'lucia', 'valborg'];
const SV_ONE_CAPITAL = {
  'snö-sverige': 'ok',        /* finns, mycket, snö — all common nouns/verbs */
  'resa-stockholm': 'ok',     /* åker, till, tillsammans */
  'strand-danmark': 'ok',     /* stranden, bor, kompisarna */
  'simhall-goteborg': 'ok',   /* fredag is a WEEKDAY — lowercase in Swedish, the trap */
  'lager-gotland': 'ok',      /* maj is a MONTH — lowercase */
  'mote-kiruna': 'ok',        /* oktober is a MONTH — lowercase */
  'sommar-finland': 'ok',     /* svenska is a LANGUAGE — lowercase */
  'pepparkakor-umea': 'ok',   /* jul is a HÖGTID — lowercase; pepparkakor common */
};

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(1) + '%';
const isWord = (t) => /\p{L}/u.test(t);

function loadCore() {
  const win = {};
  new Function('window', fs.readFileSync(CORE, 'utf8'))(win);
  if (!win.CapitalNameCore) throw new Error('core did not attach window.CapitalNameCore');
  return win.CapitalNameCore;
}

/* ---- the bots the core cannot see ---- */
function botLastWord(r) {
  const wi = r.tokens.map((w, i) => (isWord(w) ? i : -1)).filter((i) => i >= 0);
  return wi[wi.length - 1] === r.tokens.indexOf(r.proper) ? 1 : 0;
}
function botLowercaseLongest(r) {
  const wi = r.tokens.map((w, i) => (isWord(w) ? i : -1)).filter((i) => i >= 0);
  const lo = wi.filter((i) => r.tokens[i] === r.tokens[i].toLowerCase());
  if (!lo.length) return 0;
  const mx = Math.max(...lo.map((i) => r.tokens[i].length));
  const tied = lo.filter((i) => r.tokens[i].length === mx);
  return tied.indexOf(r.tokens.indexOf(r.proper)) >= 0 ? 1 / tied.length : 0;
}

/* =====================================================================
   checkPool — every assertion for ONE pool, returned so the poison suite can call it
   on mutated input and require it to FAIL.
   ===================================================================== */
function checkPool(loc, rounds, Core, enforceRatchet) {
  const out = [];
  const f = (cond, msg) => { if (!cond) out.push(`${loc}: ${msg}`); };
  const N = rounds.length || 1;
  f(rounds.length >= 8, `${rounds.length} rounds (need >= 8)`);

  let oracleHits = 0, lastWord = 0, loLongest = 0;
  for (const r of rounds) {
    const fx = Core.facts(r);
    f(fx.hasProper, `${r.id}: missing proper`);
    f(fx.oneMatch, `${r.id}: not exactly one token === proper "${r.proper}"`);
    f(fx.properLower, `${r.id}: proper "${r.proper}" is not lowercase`);
    f(fx.notSentenceStart, `${r.id}: the special name is the sentence-start word`);
    f(fx.capForm, `${r.id}: capitalizing "${r.proper}" does not change it`);
    f(r.tokens[r.tokens.length - 1] === '.', `${r.id}: the final token is not "."`);

    /* ⭐ the answer re-derived HERE, not read off the core */
    const want = r.tokens.indexOf(r.proper);
    f(Core.oracle(r) === want, `${r.id}: DRIFT — the core says index ${Core.oracle(r)}, this gate derives ${want}`);
    if (Core.grade(r, Core.oracle(r))) oracleHits++;

    /* DERIVED, not stored: a bogus authored index must be ignored */
    const poisoned = Object.assign({}, r, { targetIndex: 0, answer: 0, index: 0 });
    f(Core.oracle(poisoned) === want, `${r.id}: the oracle moved when a bogus index was injected — it is not derived`);

    const view = Core.childView(r);
    f(JSON.stringify(view).indexOf('"proper"') < 0, `${r.id}: childView leaks the proper property`);

    lastWord += botLastWord(r);
    loLongest += botLowercaseLongest(r);
  }
  f(oracleHits === N, `${loc}: oracle ${oracleHits}/${N} (must be 100%)`);

  const d = Core.deckFacts(rounds);
  const rate = { lastWord: lastWord / N, loLongest: loLongest / N };
  f(d.positionBot <= CHANCE, `position bot ${pct(d.positionBot)} > ${pct(CHANCE)}`);
  f(d.longestBot <= CHANCE, `longest bot ${pct(d.longestBot)} > ${pct(CHANCE)}`);
  f(d.shortestBot <= CHANCE, `shortest bot ${pct(d.shortestBot)} > ${pct(CHANCE)}`);
  f(d.fixedGuessBot <= CHANCE, `fixed-guess bot ${pct(d.fixedGuessBot)} > ${pct(CHANCE)}`);

  /* ⚠ enforceRatchet is an ARGUMENT, not the global: the ratchet poisons must be able
     to force enforcement on, or --measure would disable the very assertion they test and
     they would "survive" for a reason that has nothing to do with the gate. */
  if (enforceRatchet === undefined ? !MEASURE : enforceRatchet) {
    for (const axis of ['lastWord', 'loLongest']) {
      const allowed = RATCHET[axis][loc];
      f(allowed !== undefined, `no ${axis} ratchet — a new locale must declare its MEASURED value (run --measure)`);
      if (allowed !== undefined) {
        f(rate[axis] <= allowed + 1e-4,
          `${axis} bot ${pct(rate[axis])} EXCEEDS its ratchet ${pct(allowed)} — a change made this deck MORE solvable without reading`);
      }
    }
  }
  return { fails: out, d, rate };
}

/* ---- Swedish-only content rules ---- */
function svRules(rounds) {
  const out = [];
  const f = (cond, msg) => { if (!cond) out.push('sv: ' + msg); };
  f(rounds.map((r) => r.band).join('') === '11122233',
    `bands are ${rounds.map((r) => r.band).join('')}, expected 11122233 — the trap ladder is the design`);
  for (const r of rounds) {
    /* ⭐⭐ the exactly-one-capital ruling — an unclassified round FAILS */
    f(SV_ONE_CAPITAL[r.id] !== undefined,
      `${r.id}: no native ruling on whether a SECOND word in this sentence needs a capital. Classify it in SV_ONE_CAPITAL — a new round may NOT inherit another round's verdict.`);
    for (const t of r.tokens) {
      if (!isWord(t)) continue;
      f(SV_BANNED.indexOf(t.toLowerCase()) < 0,
        `${r.id}: "${t}" is on the banned list — its lowercase form is itself a Swedish word, or its capitalization is contested in real usage`);
    }
    const chips = r.tokens.filter(isWord).length;
    f(chips >= 5 && chips <= 7, `${r.id}: ${chips} word chips, expected 5-7 (nl ships a 3-chip round = 33% blind chance)`);
    f(r.tokens.join(' ').length <= 40, `${r.id}: renders ${r.tokens.join(' ').length} chars (> 40) — the chips then wrap below the 44px tap floor`);
  }
  return out;
}

/* =====================================================================
   POISON — both directions, every run, with controls.
   ===================================================================== */
function poison(Core, pools) {
  const bad = [];
  let nFire = 0, nPass = 0;
  const clone = () => JSON.parse(JSON.stringify(pools.sv));
  const mustFire = (name, run) => {
    nFire++;
    let res; try { res = run(); } catch (e) { res = ['threw: ' + e.message]; }
    if (!res || res.length === 0) bad.push('POISON SURVIVED: ' + name);
  };
  const mustPass = (name, run) => {
    nPass++;
    let res; try { res = run(); } catch (e) { bad.push('CONTROL THREW: ' + name + ' — ' + e.message); return; }
    if (res && res.length) bad.push('CONTROL FAILED: ' + name + ' -> ' + res[0]);
  };

  mustPass('the shipped sv pool through checkPool (ratchet ENFORCED)', () => checkPool('sv', clone(), Core, true).fails);
  mustPass('the shipped sv pool through svRules', () => svRules(clone()));

  mustFire('proper is not in tokens at all', () => {
    const p = clone(); p[0].proper = 'zzz'; return checkPool('sv', p, Core).fails;
  });
  mustFire('proper appears TWICE', () => {
    const p = clone(); p[0].tokens = ['I', 'sverige', 'finns', 'sverige', '.']; return checkPool('sv', p, Core).fails;
  });
  mustFire('proper is the sentence-start word', () => {
    const p = clone(); p[0].tokens = ['sverige', 'finns', 'mycket', 'snö', '.']; return checkPool('sv', p, Core).fails;
  });
  mustFire('proper is already capitalised', () => {
    const p = clone(); p[0].tokens = ['I', 'Sverige', 'finns', 'mycket', 'snö', '.']; p[0].proper = 'Sverige';
    return checkPool('sv', p, Core).fails;
  });
  mustFire('the final "." token removed', () => {
    const p = clone(); p[0].tokens = p[0].tokens.slice(0, -1); return checkPool('sv', p, Core).fails;
  });
  mustFire('a stored index that disagrees with indexOf', () => {
    /* the round is fine, but a future core that READ the index would be caught */
    const p = clone(); p[0].targetIndex = 0;
    const spy = Object.assign({}, Core, { oracle: (r) => (r.targetIndex !== undefined ? r.targetIndex : Core.oracle(r)) });
    return checkPool('sv', p, spy).fails;
  });
  mustFire('the lastWord bot pushed over its ratchet', () => {
    const p = clone();
    p.forEach((r) => { r.tokens = ['Vi', 'bor', 'i', r.proper, '.']; });
    return checkPool('sv', p, Core, true).fails.filter((m) => /lastWord/.test(m));
  });
  mustFire('the lowercase-longest bot pushed over its ratchet', () => {
    const p = clone();
    p.forEach((r) => { r.tokens = ['Vi', 'ser', r.proper, 'nu', '.']; });
    return checkPool('sv', p, Core, true).fails.filter((m) => /loLongest/.test(m));
  });
  mustFire('a BANNED place name (dalarna — the definite plural of dal)', () => {
    const p = clone(); p[7].tokens = ['Vi', 'bakar', 'pepparkakor', 'i', 'dalarna', 'till', 'jul', '.']; p[7].proper = 'dalarna';
    return svRules(p).filter((m) => /banned list/.test(m));
  });
  mustFire('a BANNED foil (mars — the planet is capitalised)', () => {
    const p = clone(); p[4].tokens = ['På', 'gotland', 'övernattar', 'eleverna', 'i', 'mars', '.'];
    return svRules(p).filter((m) => /banned list/.test(m));
  });
  mustFire('a round with NO exactly-one-capital ruling', () => {
    const p = clone(); p[0].id = 'brand-new-round';
    return svRules(p).filter((m) => /no native ruling/.test(m));
  });
  mustFire('too many chips (the nl 3-chip / over-long shape)', () => {
    const p = clone(); p[0].tokens = ['I', 'sverige', 'finns', 'mycket', 'snö', 'och', 'is', 'och', 'kyla', '.'];
    return svRules(p).filter((m) => /word chips/.test(m));
  });
  mustFire('a sentence over the 40-char budget', () => {
    const p = clone(); p[0].tokens = ['I', 'sverige', 'finns', 'alldeles', 'otroligt', 'mycket', 'snö', '.'];
    return svRules(p).filter((m) => /chars/.test(m));
  });
  mustFire('the band ladder scrambled', () => {
    const p = clone(); p[7].band = 1; return svRules(p).filter((m) => /ladder/.test(m));
  });
  return { bad, nFire, nPass };
}

/* ================================ main ================================ */
(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0];
  const pools = Object.assign({ en: manifest.params.rounds }, manifest.params.roundsL10n);

  F(Object.keys(pools).length === Object.keys(RATCHET.lastWord).length,
    `the manifest carries ${Object.keys(pools).length} pools and this gate declares ${Object.keys(RATCHET.lastWord).length} — a locale shipped without a ratchet, or vice versa`);

  console.log(MEASURE ? '--measure: raw rates for the ratchet table (paste these, do not round)\n' : '');
  console.log('pool  n   position longest shortest  fixed        lastWord      loLongest');
  for (const loc of Object.keys(RATCHET.lastWord)) {
    const rounds = pools[loc];
    if (!rounds) { F(false, `${loc}: declared here but absent from the manifest`); continue; }
    const { fails: pf, d, rate } = checkPool(loc, rounds, Core);
    pf.forEach((m) => fails.push(m));
    const show = (k) => (MEASURE ? rate[k].toFixed(4) : pct(rate[k]) + ' (' + pct(RATCHET[k][loc]) + ')');
    console.log(
      loc.padEnd(5), String(rounds.length).padEnd(3),
      pct(d.positionBot).padStart(8), pct(d.longestBot).padStart(7), pct(d.shortestBot).padStart(8),
      pct(d.fixedGuessBot).padStart(6), String(show('lastWord')).padStart(14), String(show('loLongest')).padStart(15)
    );
  }

  if (pools.sv) {
    const sr = svRules(pools.sv);
    sr.forEach((m) => fails.push(m));
    console.log(`\nsv content rules: bands ${pools.sv.map((r) => r.band).join('')} | ` +
      `${Object.keys(SV_ONE_CAPITAL).length}/${pools.sv.length} rounds carry an exactly-one-capital ruling | 0 banned tokens`);
  }

  const { bad, nFire, nPass } = poison(Core, pools);
  console.log(`poison: ${nPass} controls + ${nFire} mutations — ${bad.length === 0 ? 'all killed, all controls clean' : bad.length + ' PROBLEM(S)'}`);
  bad.forEach((m) => fails.push(m));

  console.log('');
  if (fails.length) {
    console.error(`VERIFY-CAPITAL-NAME FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-CAPITAL-NAME PASSED — 8 pools (was 1); oracle 100% and re-derived here rather than read off ' +
    'the core; a bogus authored index is ignored; one lowercase special name per round, never the sentence start, ' +
    'always with a final "." token; childView leaks nothing; position/longest/shortest/fixed-guess <= ' + pct(CHANCE) +
    '; the lastWord and lowercase-longest bots — neither of which the core can see — within every pool\'s MEASURED ' +
    'ratchet; sv content rules (the 1-1-1-2-2-2-3-3 trap ladder, a per-round exactly-one-capital ruling, no banned ' +
    'homograph or contested foil, 5-7 chips, <= 40 chars); poison suite all killed with its controls clean.');
  console.log('⚠ UNGATED: whether a SECOND token needs a capital is a declared native ruling for sv only. ' +
    'en/de/fr/es/pt/it/nl carry NONE — a green run here says nothing about them.');
  process.exit(0);
})();
