#!/usr/bin/env node
/* =====================================================================
   verify-reflexive-pronoun-core.js — the MEASURED build-gate for "Robin's
   Mirror" (L.2.1.c), across ALL EIGHT pools.

   ⚠⚠ THE PREVIOUS VERSION READ `params.rounds` ONLY. That is the eight ENGLISH
   rounds. `reflexive-pronoun-core.js` hardcodes the ENGLISH REFLEXIVE_TABLE, so
   its `oracle`/`chips`/`facts` are meaningless on any localized deck — and the
   activity layer knows this and routes every non-English locale through its own
   REFL_L10N table instead. So SIX SHIPPED LOCALIZATIONS HAD NO GATE AT ALL, and
   neither would Swedish. 48 rounds, 0 assertions.

   This version does two things at once and needs both:
     • it DRIVES THE REAL ACTIVITY — loads robin-mirror-activity.js in a sandbox,
       sets the locale through init(), and reads the chips back out of
       setupTask/view, grading each one through the shipped isCorrect() — so it
       tests the shipped builder, not a copy of it re-implemented here, which
       would be testing a copy;
     • it holds its OWN independently declared subject -> form table per locale,
       so the shipped builder cannot mark its own homework. A disagreement is
       reported as DRIFT and names both strings.

   ⭐ THE BOT TABLE IS THE POINT. Three of the four bots are the usual surface
   heuristics (fixed word, longest chip, shortest chip). The fourth is specific to
   what this activity claims to teach:

       firstToken   read ONLY the first word of the sentence, look it up in the
                    locale's table, and tap that form if it is on the board.

   A deck that scores high on `firstToken` does not teach the child to find the
   doer — it teaches them to copy word one. Measured 2026-09-10, that is exactly
   what most of this catalogue does, and the numbers are recorded as a RATCHET
   below rather than hidden: they may only ever shrink. The Swedish deck is the
   rebuild, and it is the reason the bot exists — bands 2 and 3 put the doer
   inside a coordination and behind the finite verb, where word one is a decoy.

   ⚠ ARTEFACT GUARD. A bot that never resolves is not a passing bot, it is a bot
   measuring nothing — the sv #28 defect, where three of four reported numbers
   were artefacts of a lookup that always missed. So `firstToken` must RESOLVE in
   at least one round of every pool or the pool FAILS.

   ⚠⚠ THE ONE INVARIANT THIS FILE STILL CANNOT ENFORCE, stated so nobody mistakes
   a green run for its absence: EXACTLY ONE CHIP SHOULD YIELD A GRAMMATICAL
   SENTENCE. A chip that merely means something else is not a wrong answer. Many
   of these verbs also have ordinary transitive uses in their own language, so a
   foil can be well-formed with a different meaning. Deciding that needs a native
   judgement per language, and the Swedish half of it is encoded below as
   SV_TRANSITIVE_OK — a declared, auditable list, reported as a number. The other
   seven locales are UNMEASURED and that is a known hole, not a clean bill.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const CORE = path.join(REPO, 'mini tools', 'reflexive-pronoun-core.js');
const ACT = path.join(REPO, 'mini tools', 'robin-mirror-activity.js');
const MANIFEST = path.join(REPO, 'mini tools', 'robin-mirror-activities.json');
const CHANCE = 0.45;   /* three chips -> 33.3% is blind guessing; 45% is the house ceiling */

/* ---- independently declared truth. NOT read off the activity or the core. ----
   ⚠ Every locale collapses some set of subjects onto one form. Swedish collapses
   the most: han, hon, den, det and de all give `sig`, and mig/dig/oss/er are just
   the ordinary object pronouns. */
const TRUTH = {
  en: { i: 'myself', you: 'yourself', he: 'himself', she: 'herself', we: 'ourselves', they: 'themselves', it: 'itself' },
  de: { ich: 'mich', du: 'dich', er: 'sich', sie: 'sich', es: 'sich', wir: 'uns', ihr: 'euch' },
  fr: { je: 'me', tu: 'te', il: 'se', elle: 'se', on: 'se', nous: 'nous', vous: 'vous', ils: 'se', elles: 'se' },
  es: { yo: 'me', tu: 'te', el: 'se', ella: 'se', ellos: 'se', ellas: 'se', nosotros: 'nos', ustedes: 'se' },
  pt: { eu: 'me', voce: 'se', ele: 'se', ela: 'se', a_gente: 'se', nos: 'nos', voces: 'se', eles: 'se', elas: 'se' },
  it: { io: 'mi', tu: 'ti', lui: 'si', lei: 'si', noi: 'ci', voi: 'vi', loro: 'si' },
  nl: { ik: 'me', jij: 'je', hij: 'zich', zij: 'zich', het: 'zich', wij: 'ons' },
  sv: { jag: 'mig', du: 'dig', han: 'sig', hon: 'sig', den: 'sig', det: 'sig', de: 'sig', vi: 'oss', ni: 'er' },
};

/* ⚠⚠ RATCHET, MEASURED 2026-09-10 by running this file with --measure against the
   shipped decks. An entry may only go DOWN. It is NOT permission — it is the
   recorded size of a live weakness whose repair is native round data per locale.
   ⚠ The first version of this file carried numbers I had ESTIMATED, and three of
   the eight were wrong in the direction that fails a correct deck. An invented
   threshold is not a measurement: run --measure, paste, never round to taste.

   Two axes are ratcheted, because two are genuinely breached today:
     firstToken  copy word one and look it up. de/nl at 83% are decks a child can
                 clear without ever locating the doer; sv is the rebuild.
     fixed       always tap the same form. Only pt breaches (50%), because BR
                 Portuguese has just three surface forms and `se` answers four of
                 eight rounds — measured, filed, and not repairable from here. */
const RATCHET = {
  firstToken: { en: 0.5833, de: 0.8333, fr: 0.4167, es: 0.5833, pt: 0.6667, it: 0.4583, nl: 0.8333, sv: 0.5417 },
  fixed: { en: 0.45, de: 0.45, fr: 0.45, es: 0.45, pt: 0.50, it: 0.45, nl: 0.45, sv: 0.45 },
};
const MEASURE = process.argv.indexOf('--measure') >= 0;

/* ---- Swedish content rules (native ensemble, sv #31) --------------------------- */
const SV_BANNED_NAMES = ['Hans', 'Sigge', 'Signe', 'Bosse'];   /* each contains a chip word */
const SV_MAX_SENTENCE = 39;
/* ⚠ A gap directly after a PREPOSITION wants `sig själv` in Swedish, so a bare
   chip there is wrong. But a verb PARTICLE is spelled like a preposition and does
   NOT take `själv` — «klä på sig» is ordinary Swedish. So the ban carries an
   explicit, auditable exemption list of verb+particle pairs rather than a
   loosened pattern. Add a pair here only with a native ruling. */
const SV_PREPOSITIONS = ['på', 'i', 'till', 'från', 'med', 'om', 'för', 'av', 'under', 'över',
  'bakom', 'framför', 'hos', 'vid', 'efter', 'mot', 'genom', 'utan', 'runt', 'kring'];
const SV_VERB_PARTICLES = [['klär', 'på'], ['klä', 'på'], ['tar', 'på'], ['ta', 'på']];

/* ⚠⚠ THE EXACTLY-ONE-GRAMMATICAL INVARIANT, encoded for Swedish as a NATIVE
   RULING PER ROUND rather than as a rule this file could compute.
   ⭐ My first version tried to compute it from a list of transitive verbs. That is
   the wrong instrument twice over: it folded only one side of the comparison (so
   it reported 1 of 8 when the answer was 6 of 8), and even corrected it answers a
   question nobody asked — a verb having a transitive use does not mean THIS
   round's foils are grammatical. What matters is whether any CHIP ON THE BOARD
   yields a well-formed sentence, and only a native can say.
   Verdicts below are the sv #31 panel's, on the printed sentences cold:
     none      every foil is killed by person agreement, binding, or the verb
     marginal  a foil parses but says something nobody would say
     live      a foil is a sentence a 9-year-old would plausibly land on -> FAIL
   ⚠ An unclassified round FAILS: a new round cannot inherit a ruling it never got.
   ⚠ The other seven locales are UNMEASURED on this invariant. The panel's reading
   of the shipped German — «Ich wasche dich jeden Morgen» is grammatical — says
   the hole is live there too. That is a separate commission, per locale. */
const SV_SECOND_ANSWER = {
  'bryr-jag': 'none',              /* «bry någon» does not exist in modern Swedish */
  'skynda-du': 'none',             /* skynda sig obligatorily reflexive; «er» blocked by the singular subject */
  'beter-vi': 'none',              /* bete sig obligatorily reflexive */
  'klar-barnen': 'marginal',       /* «Barnen klär på oss/er i hallen» parses; nobody says it */
  'ger-ali-och-jag': 'none',       /* the particle reading needs «ger iväg dig», not «ger dig iväg» */
  'torkar-du-och-sara': 'none',    /* a coordination containing «du» resolves to «ni» -> «er» only */
  'lagger-katten': 'marginal',     /* «lägga någon» = put someone to bed; absurd of a cat */
  'tvattar-jag': 'none',           /* «sig» person-mismatched, «oss» binding-deviant */
};
const SV_MARGINAL_RATCHET = 2;   /* measured 2026-09-10; may only shrink */

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };
const pct = (x) => (100 * x).toFixed(0) + '%';
const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const words = (s) => String(s).replace(/[.,!?;:«»]/g, ' ').split(/\s+/).filter(Boolean);

/* ---- load the REAL core + activity in a sandbox -------------------------------- */
function loadCore() {
  const win = {};
  new Function('window', fs.readFileSync(CORE, 'utf8'))(win);
  if (!win.ReflexivePronounCore) throw new Error('core did not attach window.ReflexivePronounCore');
  return win.ReflexivePronounCore;
}
function loadActivity(core, srcOverride) {
  const win = { ReflexivePronounCore: core };
  new Function('window', srcOverride || fs.readFileSync(ACT, 'utf8'))(win);
  if (!win.RobinMirrorActivity) throw new Error('activity did not attach window.RobinMirrorActivity');
  return win.RobinMirrorActivity;
}
/* the shipped builder's own chips + its own grading, for one round in one locale */
function shippedChips(A, loc, round) {
  A.init({ lang: loc });
  A.setupTask(round);
  const chips = A.view.chips.slice();
  const ok = [];
  for (const c of chips) { A.sel = c; if (A.isCorrect()) ok.push(c); }
  A.sel = null;
  return { chips, ok };
}

/* ---- the bots ------------------------------------------------------------------
   Each returns the expected score of a bot that cannot read, splitting ties
   uniformly. `firstToken` is the one that matters here. */
function botLongest(chips, ans) { const m = Math.max(...chips.map((c) => c.length)); const t = chips.filter((c) => c.length === m); return t.indexOf(ans) < 0 ? 0 : 1 / t.length; }
function botShortest(chips, ans) { const m = Math.min(...chips.map((c) => c.length)); const t = chips.filter((c) => c.length === m); return t.indexOf(ans) < 0 ? 0 : 1 / t.length; }
function botFirstToken(loc, sentence, chips, ans) {
  const t = fold(words(sentence)[0] || '');
  const form = TRUTH[loc][t];
  if (!form || chips.indexOf(form) < 0) return { score: 1 / chips.length, resolved: false };
  return { score: form === ans ? 1 : 0, resolved: true };
}

/* =====================================================================
   checkPool — every assertion for ONE pool. Returns its own fails array so the
   poison suite can call it on mutated inputs and require it to FAIL.
   ===================================================================== */
function checkPool(loc, rounds, A, truth) {
  const out = [];
  const f = (cond, msg) => { if (!cond) out.push(`${loc}: ${msg}`); };
  const N = rounds.length;
  f(N >= 7, `${N} rounds (need >= 7)`);

  const scores = { fixed: 0, longest: 0, shortest: 0, firstToken: 0 };
  const answers = {};
  let resolvedAny = false;

  for (const r of rounds) {
    const id = r.id;
    /* ---- the gate's OWN answer, from its OWN table ---- */
    const want = truth[r.referent];
    f(!!want, `${id}: referent "${r.referent}" is not in this gate's declared ${loc} table`);
    f(!!truth[r.wrongA] && !!truth[r.wrongB], `${id}: a wrong referent is not in the declared ${loc} table`);
    if (!want) continue;

    const { chips, ok } = shippedChips(A, loc, r);
    f(chips.length === 3, `${id}: ${chips.length} chips, expected 3`);
    f(new Set(chips).size === 3, `${id}: chips are not 3 DISTINCT words (${chips.join('/')}) — two referents collapse onto the same form`);
    f(ok.length === 1, `${id}: ${ok.length} chips grade as correct, expected exactly 1`);
    if (ok.length !== 1) continue;

    /* ⭐ DRIFT — the shipped builder against this gate's own declared truth */
    f(ok[0] === want, `${id}: DRIFT — the deck grades "${ok[0]}" but this gate's ${loc} table says "${want}" for referent "${r.referent}"`);

    /* ⭐ DERIVED, not stored: bogus authored fields must change nothing */
    const poisoned = Object.assign({}, r, { answer: 'ZZZ', reflexive: 'ZZZ', forms: ['x', 'y', 'z'] });
    f(shippedChips(A, loc, poisoned).chips.join('|') === chips.join('|'),
      `${id}: the chips changed when bogus fields were injected — they are not derived from the referent keys`);
    f(!('answer' in r), `${id}: the round stores an answer`);

    /* ---- structure of the sentence ---- */
    f(String(r.sentence).indexOf('___') >= 0, `${id}: sentence has no "___" blank`);
    f(String(r.sentence).indexOf(' ___ ') >= 0 || /\s___[.!?]/.test(String(r.sentence)),
      `${id}: the blank is not a free-standing token`);
    /* ⚠ WHOLE WORD, matching the shipped guard's own semantics (lowercase, strip
       punctuation, compare tokens — NOT diacritic-folded).
       ⭐ My first version tested SUBSTRING here and condemned three CORRECT rounds:
       French «Maya ___ repose» because *repose* contains "se", and two Portuguese
       ones for the same reason. Inside a SENTENCE a substring is not a leak — the
       chip is a whole word and nothing lines it up with the middle of another one.
       The substring rule is real, but it belongs to the fixed CHROME strings
       (instruction, prompt, hints, win, mascot, title), which the no-leak guard
       never inspects and where a Swedish `er` really does hide inside «eller» and
       «person». That screen lives in the activity patch, not here.
       ⚠ Deliberately NOT folded: Portuguese subject «Nós» and reflexive «nos»
       differ only by the accent, and treating them as the same token would fail a
       shipped correct deck. What that homography actually costs is priced by the
       firstToken bot, which is where it belongs. */
    f(words(r.sentence).map((w) => w.toLowerCase()).indexOf(want.toLowerCase()) < 0,
      `${id}: the correct form "${want}" already appears in the sentence as a word`);

    /* ---- the childView must not carry the key ---- */
    A.init({ lang: loc }); A.setupTask(r);
    const view = JSON.stringify(A.view);
    f(view.indexOf('referent') < 0 && view.indexOf('wrong') < 0, `${id}: the view leaks referent/wrong`);

    /* ---- bots ---- */
    answers[want] = (answers[want] || 0) + 1;
    scores.longest += botLongest(chips, want);
    scores.shortest += botShortest(chips, want);
    const ft = botFirstToken(loc, r.sentence, chips, want);
    scores.firstToken += ft.score;
    if (ft.resolved) resolvedAny = true;
  }

  scores.fixed = Math.max(0, ...Object.values(answers));
  const rate = { fixed: scores.fixed / N, longest: scores.longest / N, shortest: scores.shortest / N, firstToken: scores.firstToken / N };

  f(Object.keys(answers).length >= 3, `only ${Object.keys(answers).length} distinct answers across the deck`);
  f(rate.longest <= CHANCE, `longest-chip bot ${pct(rate.longest)} > ${pct(CHANCE)}`);
  f(rate.shortest <= CHANCE, `shortest-chip bot ${pct(rate.shortest)} > ${pct(CHANCE)}`);
  /* ⚠ ARTEFACT GUARD — a bot that never resolves is measuring nothing */
  f(resolvedAny, `the firstToken bot never resolved a single first word — it is measuring NOTHING in this pool, not passing`);

  if (!MEASURE) {
    for (const axis of ['firstToken', 'fixed']) {
      const allowed = RATCHET[axis][loc];
      f(allowed !== undefined, `no ${axis} ratchet entry — a new locale must declare its MEASURED value (run --measure)`);
      if (allowed !== undefined) {
        f(rate[axis] <= allowed + 1e-4,
          `${axis} bot ${pct(rate[axis])} EXCEEDS its ratchet ${pct(allowed)} — a change made this deck MORE guessable`);
      }
    }
  }
  return { fails: out, rate, answers };
}

/* ---- Swedish-only content rules ------------------------------------------------ */
function svRules(rounds) {
  const out = [];
  const f = (cond, msg) => { if (!cond) out.push('sv: ' + msg); };

  f(rounds.map((r) => r.band).join('') === '11122233',
    `bands are ${rounds.map((r) => r.band).join('')}, expected 11122233 — the ladder is the whole design`);

  let transitive = 0;
  for (const r of rounds) {
    const w = words(r.sentence);
    const gap = w.indexOf('___');
    f(gap > 0, `${r.id}: no free-standing "___" token`);
    f(r.sentence.length <= SV_MAX_SENTENCE, `${r.id}: sentence is ${r.sentence.length} chars (> ${SV_MAX_SENTENCE})`);

    /* ⚠ a gap right after a preposition wants «sig själv» — except after a verb particle */
    if (gap > 0) {
      const prev = fold(w[gap - 1]);
      const prev2 = gap > 1 ? fold(w[gap - 2]) : '';
      const isPrep = SV_PREPOSITIONS.map(fold).indexOf(prev) >= 0;
      const isParticle = SV_VERB_PARTICLES.some(([v, p]) => fold(v) === prev2 && fold(p) === prev);
      f(!isPrep || isParticle,
        `${r.id}: the gap follows the preposition "${w[gap - 1]}" — Swedish wants «sig själv» there. If "${w[gap - 2]} ${w[gap - 1]}" is a particle verb, add it to SV_VERB_PARTICLES with a native ruling.`);
    }

    /* ⚠ object shift moves the pronoun around «inte» — two positions for one word */
    f(!/(?<!\p{L})inte(?!\p{L})/u.test(r.sentence), `${r.id}: contains «inte» — object shift makes the pronoun's position depend on clause type`);
    /* ⚠ «säg» is a perfect homophone of «sig».
       ⭐ CASE-INSENSITIVE, and the poison is what proved it had to be: my first
       version was case-sensitive, so «Säg» at the start of a sentence — the only
       place a Swedish imperative actually stands — sailed straight through. Same
       defect class as sv #30's case-sensitive list-scope regex. Fix the RULE. */
    f(!/(?<!\p{L})säg(?!\p{L})/iu.test(r.sentence), `${r.id}: contains «säg», a perfect homophone of «sig»`);
    for (const n of SV_BANNED_NAMES) {
      f(!new RegExp('(?<!\\p{L})' + n + '(?!\\p{L})', 'u').test(r.sentence),
        `${r.id}: the name «${n}» contains a chip word`);
    }
    /* ⚠⚠ the exactly-one-grammatical invariant, from the native ruling */
    const verdict = SV_SECOND_ANSWER[r.id];
    f(verdict !== undefined,
      `${r.id}: no native ruling on whether a foil is also grammatical. Classify it in SV_SECOND_ANSWER (none/marginal/live) — a new round may NOT inherit another round's ruling.`);
    f(verdict !== 'live',
      `${r.id}: a foil is a LIVE second correct answer — the child who picks it has read Swedish correctly and would be marked wrong`);
    if (verdict === 'marginal') transitive++;
  }

  f(transitive <= SV_MARGINAL_RATCHET,
    `${transitive} rounds have a MARGINAL second reading (ratchet ${SV_MARGINAL_RATCHET}) — a foil parses, though nobody would say it`);
  return { fails: out, transitive };
}

/* =====================================================================
   POISON — every assertion, in BOTH directions, on every run, with controls.
   ⚠ A poison that is refused upstream tests nothing, so each one keeps the round
   shape valid and breaks exactly one thing.
   ===================================================================== */
function poison(A) {
  const base = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0].params.roundsL10n.sv;
  const clone = () => JSON.parse(JSON.stringify(base));
  const bad = [];
  let nFire = 0, nPass = 0;
  const mustFire = (name, run) => {
    nFire++;
    let res;
    try { res = run(); } catch (e) { res = ['threw: ' + e.message]; }
    if (!res || res.length === 0) bad.push('POISON SURVIVED: ' + name);
  };
  const mustPass = (name, run) => {
    nPass++;
    let res;
    try { res = run(); } catch (e) { bad.push('CONTROL THREW: ' + name + ' — ' + e.message); return; }
    if (res && res.length) bad.push('CONTROL FAILED: ' + name + ' -> ' + res[0]);
  };

  /* ---- controls: the real thing must be clean ---- */
  mustPass('the shipped sv pool through checkPool', () => checkPool('sv', clone(), A, TRUTH.sv).fails);
  mustPass('the shipped sv pool through svRules', () => svRules(clone()).fails);
  /* ⚠ the particle-verb exemption must NOT be condemned by the preposition ban */
  mustPass('«Barnen klär på ___ i hallen.» (verb particle, not a preposition)',
    () => svRules(clone().filter((r) => r.id === 'klar-barnen')).fails.filter((m) => /preposition/.test(m)));

  /* ---- poisons ---- */
  mustFire('two referents that collapse onto sig (han + hon)', () => {
    const p = clone(); p[0].wrongA = 'han'; p[0].wrongB = 'hon'; return checkPool('sv', p, A, TRUTH.sv).fails;
  });
  mustFire('DRIFT — this gate\'s table disagrees with the deck', () => {
    const t = Object.assign({}, TRUTH.sv, { jag: 'dig' }); return checkPool('sv', clone(), A, t).fails;
  });
  mustFire('the blank removed', () => {
    const p = clone(); p[1].sentence = p[1].sentence.replace(' ___', ' nu'); return checkPool('sv', p, A, TRUTH.sv).fails;
  });
  mustFire('the answer leaked into the sentence', () => {
    const p = clone(); p[0].sentence = 'Jag bryr mig och ___ om hunden.'; return checkPool('sv', p, A, TRUTH.sv).fails;
  });
  mustFire('a stored answer field', () => {
    const p = clone(); p[0].answer = 'mig'; return checkPool('sv', p, A, TRUTH.sv).fails;
  });
  mustFire('fixed-guess pushed over the ceiling (every round answers sig)', () => {
    const p = clone(); p.forEach((r) => { r.referent = 'han'; r.wrongA = 'jag'; r.wrongB = 'vi'; });
    return checkPool('sv', p, A, TRUTH.sv).fails;
  });
  mustFire('firstToken pushed over the ratchet (every sentence starts with its own subject)', () => {
    const p = clone();
    p.forEach((r) => { r.sentence = 'Jag bryr ___ om hunden.'; r.referent = 'jag'; r.wrongA = 'du'; r.wrongB = 'han'; });
    return checkPool('sv', p, A, TRUTH.sv).fails;
  });
  mustFire('the artefact guard — no first word ever resolves', () => {
    const p = clone(); p.forEach((r) => { r.sentence = 'Idag ' + r.sentence.replace(/^\S+\s/, '').toLowerCase(); });
    /* ⚠ this poison must ONLY be credited when it hits the artefact guard */
    return checkPool('sv', p, A, TRUTH.sv).fails.filter((m) => /measuring NOTHING/.test(m));
  });
  mustFire('the gap follows a real preposition', () => {
    const p = clone(); p[0].sentence = 'Hon tittar på ___ i spegeln.'; p[0].referent = 'hon';
    return svRules(p).fails.filter((m) => /preposition/.test(m));
  });
  mustFire('«inte» in a sentence', () => {
    const p = clone(); p[2].sentence = 'Vi beter inte ___ fint i klassen.'; return svRules(p).fails.filter((m) => /inte/.test(m));
  });
  mustFire('«säg» in a sentence', () => {
    const p = clone(); p[1].sentence = 'Säg åt Du att skynda ___ nu!'; return svRules(p).fails.filter((m) => /homophone/.test(m));
  });
  mustFire('a banned name', () => {
    const p = clone(); p[4].sentence = 'Hans och jag ger ___ iväg nu.'; return svRules(p).fails.filter((m) => /chip word/.test(m));
  });
  /* ⭐⭐ the exactly-one-grammatical ruling, poisoned in both directions */
  mustFire('a round ruled LIVE by the native panel', () => {
    const keep = SV_SECOND_ANSWER['bryr-jag']; SV_SECOND_ANSWER['bryr-jag'] = 'live';
    const res = svRules(clone()).fails.filter((m) => /LIVE second correct answer/.test(m));
    SV_SECOND_ANSWER['bryr-jag'] = keep; return res;
  });
  mustFire('a round with NO native ruling at all', () => {
    const p = clone(); p[0].id = 'brand-new-round';
    return svRules(p).fails.filter((m) => /no native ruling/.test(m));
  });
  mustFire('the marginal count pushed over its ratchet', () => {
    const keep = SV_SECOND_ANSWER['skynda-du']; SV_SECOND_ANSWER['skynda-du'] = 'marginal';
    const res = svRules(clone()).fails.filter((m) => /MARGINAL second reading/.test(m));
    SV_SECOND_ANSWER['skynda-du'] = keep; return res;
  });
  mustFire('a sentence over the length budget', () => {
    const p = clone(); p[0].sentence = 'Varje morgon sätter jag ___ på den blåa stolen i hallen.';
    return svRules(p).fails.filter((m) => /chars/.test(m));
  });
  mustFire('the band ladder scrambled', () => {
    const p = clone(); p[7].band = 1; return svRules(p).fails.filter((m) => /ladder/.test(m));
  });
  /* ⭐⭐ the one that matters most: sv deleted from the activity's REFL_L10N.
     Without the registration `rmReflexiveOf` falls through to the ENGLISH core
     and a Swedish child is shown myself/herself. */
  mustFire('sv removed from REFL_L10N in the activity source', () => {
    const src = fs.readFileSync(ACT, 'utf8');
    const cut = src.replace(', sv: REFL_SV }', ' }');
    if (cut === src) return ['the REFL_L10N needle no longer matches — this poison went blind'];
    return checkPool('sv', clone(), loadActivity(loadCore(), cut), TRUTH.sv).fails;
  });

  return { bad, nFire, nPass };
}

/* ================================ main ================================ */
(function main() {
  const core = loadCore();
  const A = loadActivity(core);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))[0];
  const pools = Object.assign({ en: manifest.params.rounds }, manifest.params.roundsL10n);

  F(Object.keys(pools).length === Object.keys(TRUTH).length,
    `the manifest carries ${Object.keys(pools).length} pools and this gate declares ${Object.keys(TRUTH).length} — a locale shipped without a declared table, or vice versa`);

  console.log(MEASURE ? '--measure: raw rates for the ratchet table (paste these, do not round)\n' : '');
  console.log('pool  n   longest  shortest      fixed         firstToken      answers');
  for (const loc of Object.keys(TRUTH)) {
    const rounds = pools[loc];
    if (!rounds) { F(false, `${loc}: declared here but absent from the manifest`); continue; }
    const { fails: pf, rate, answers } = checkPool(loc, rounds, A, TRUTH[loc]);
    pf.forEach((m) => fails.push(m));
    const show = (k) => MEASURE ? rate[k].toFixed(4) : pct(rate[k]) + ' (' + pct(RATCHET[k][loc]) + ')';
    console.log(
      loc.padEnd(5), String(rounds.length).padEnd(3),
      pct(rate.longest).padStart(8), pct(rate.shortest).padStart(9),
      String(show('fixed')).padStart(12), String(show('firstToken')).padStart(16),
      '  ' + JSON.stringify(answers)
    );
  }

  let sv = null;
  if (pools.sv) {
    sv = svRules(pools.sv);
    sv.fails.forEach((m) => fails.push(m));
    console.log(`\nsv content rules: bands ${pools.sv.map((r) => r.band).join('')} | ` +
      `exactly-one-grammatical (native ruling): ${pools.sv.length - sv.transitive} none, ` +
      `${sv.transitive} marginal (ratchet ${SV_MARGINAL_RATCHET}), 0 live`);
  }

  const { bad, nFire, nPass } = poison(A);
  console.log(`poison: ${nPass} controls + ${nFire} mutations — ${bad.length === 0 ? 'all killed, all controls clean' : bad.length + ' PROBLEM(S)'}`);
  bad.forEach((m) => fails.push(m));

  console.log('');
  if (fails.length) {
    console.error(`VERIFY-REFLEXIVE-PRONOUN FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-REFLEXIVE-PRONOUN PASSED — 8 pools driven through the REAL activity builder, each ' +
    'cross-checked against this gate\'s own declared subject->form table (drift); chips DERIVED from the ' +
    'referent keys (bogus fields ignored); exactly one correct, three distinct; the correct form never ' +
    'already in the sentence as a WORD; longest/shortest bots <= ' + pct(CHANCE) + '; the fixed and ' +
    'firstToken bots within every pool\'s MEASURED ratchet and never vacuous; sv content rules (the ' +
    '1-1-1-2-2-2-3-3 ladder, a native exactly-one-grammatical ruling on every round with 0 live, no gap ' +
    'after a preposition outside the particle-verb list, no «inte», no «säg», no chip-bearing name, <= ' +
    SV_MAX_SENTENCE + ' chars); poison suite all killed with its controls clean.');
  console.log('⚠ UNGATED IN SEVEN LOCALES: exactly-one-grammatical. sv carries a native ruling per round; ' +
    'en/de/fr/es/pt/it/nl carry NONE — a green run here says nothing about them.');
  process.exit(0);
})();
