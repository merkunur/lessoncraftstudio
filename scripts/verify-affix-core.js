#!/usr/bin/env node
/* =====================================================================
   verify-affix-core.js — build-time gate (MEASURED)
   ---------------------------------------------------------------------
   Loads the REAL mini tools/affix-core.js (window shim) and proves, for the
   shipped manifest (L.2.4.b/c affix word-meaning), the clarity-first game.

   ⚠⚠ THIS GATE USED TO READ `row.params.rounds` ONLY — the ENGLISH pool.
   Six shipped non-English decks (de/fr/es/pt/it/nl) were never measured at
   all, which is the third occurrence of that class in this activity family
   (see 42a07726, tense: "the gate had never read a non-English pool"). It now
   walks `params.roundsL10n` too.

   ⚠ BUT THE NAIVE EXTENSION IS WORSE THAN NO EXTENSION. Three of the original
   assertions are not locale-neutral, and pointing them at every pool produces
   ~60 failures of which zero are real. Every assertion below therefore carries
   an explicit SCOPE, so nobody can re-widen an authoring-hygiene check by
   accident:

     UNIVERSAL — true of every pool in every language. HARD FAIL anywhere.
     SURFACE   — needs the locale's own affix spellings (AFFIX_SURFACE below).
                 `Core.applySpelling` hard-codes the ENGLISH letters un/re/ful/
                 less, so `wordSpellingOk` is meaningless off English: measured,
                 it passes ONLY where a locale's affix happens to be spelt like
                 English (de 2/8 = its two `un` rounds; fr/es/pt 3/8 = their
                 `re` rounds; it 0/8; nl 0/8). Two numbers agreeing by
                 coincidence, not a check. HARD for locales with a declared
                 surface table; skipped for the rest.
     AUTHORING — real authoring hygiene, but violated by pre-existing pools
                 that shipped before the gate could see them (correct-at-index-0
                 in 9 of 11 fr and it rounds; no root distractor at all in the
                 four Romance pools). HARD for pools authored under this gate,
                 reported as an honest WARN backlog for the rest rather than
                 either failing the build or silently blessing them.

   Run `--poison` to prove every assertion still fires: it mutates a known-good
   pool once per check and requires each mutation to be caught.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const REPO = path.join(__dirname, '..');
const FORBIDDEN_KEYS = ['isCorrect', 'correct', 'correctIndex', 'answer', 'answerIndex'];

/* SURFACE: the locale's real affix spellings, as [prefix, suffix] per key.
   Declare a locale here only when its pool actually concatenates literally. */
const AFFIX_SURFACE = {
  en: { un: ['un', ''], re: ['re', ''], ful: ['', 'ful'], less: ['', 'less'] },
  sv: { un: ['o', ''], ful: ['', 'full'], less: ['', 'lös'] },
};

/* pools authored under this gate — every AUTHORING check is HARD for these */
const STRICT = ['en', 'sv'];

const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'affix-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.AffixCore;
if (!Core) { console.error('FAIL: affix-core.js did not define window.AffixCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'affix-activities.json'), 'utf8'));

function scanForbidden(obj, label, out) {
  if (obj == null || typeof obj !== 'object') return;
  Object.keys(obj).forEach((k) => {
    if (FORBIDDEN_KEYS.indexOf(k) >= 0) out.push(`${label}: forbidden stored-answer key "${k}"`);
    scanForbidden(obj[k], label, out);
  });
}

function poolsOf(row) {
  const p = (row.params) || {};
  const out = [['en', p.rounds || []]];
  const l10n = p.roundsL10n || {};
  Object.keys(l10n).forEach((loc) => out.push([loc, l10n[loc] || []]));
  return out;
}

/* returns { fails: [...], warns: [...], counted: n } for one pool */
function checkPool(loc, rounds, rowId) {
  const fails = [], warns = [];
  const strict = STRICT.indexOf(loc) >= 0;
  const surface = AFFIX_SURFACE[loc];
  const soft = (msg) => (strict ? fails : warns).push(msg);

  if (rounds.length < VARIETY_MIN) fails.push(`${rowId}[${loc}]: ${rounds.length} rounds < ${VARIETY_MIN} (§A.13.60)`);

  const cogs = {}, fams = {}, ids = {};
  rounds.forEach((r) => {
    const label = `${rowId}[${loc}] ${r.id}[${r.cog}]`;
    cogs[r.cog] = 1; fams[r.affix] = 1; ids[r.id] = (ids[r.id] || 0) + 1;
    scanForbidden(r, label, fails);

    const f = Core.facts(r);
    const ci = Core.correctIndex(r);

    /* ---- UNIVERSAL ---- */
    if (!Core.isAnswer(r, r.affix)) fails.push(`${label}: the correct affix (${r.affix}) was not accepted`);
    if (!(ci >= 0 && f.exactlyOneCorrect)) fails.push(`${label}: the correct option could not be derived`);
    if (!(f.optionCount >= 3)) fails.push(`${label}: <3 options`);
    if (!f.answerDerivedNotStored) fails.push(`${label}: derived invariant`);
    if (!f.oneCorrectMatch) fails.push(`${label}: not exactly one option matches the round's affix`);

    if (r.cog === 'apply') {
      const wrong = (r.options || []).find((o) => o.affix !== r.affix);
      if (!(wrong && !Core.isAnswer(r, wrong.affix))) fails.push(`${label}: a wrong option (${wrong && wrong.affix}) was accepted`);
      if (!f.hasWrongAffixDistractor) fails.push(`${label}: no wrong-affix distractor`);
      const otherAffix = (r.options || []).map((o) => o.affix).find((a) => a !== r.affix && a !== 'root');
      if (otherAffix) {
        const moved = Core.correctIndex(Object.assign({}, r, { affix: otherAffix }));
        if (!(moved !== ci && moved >= 0)) fails.push(`${label}: correct option did not move when round.affix changed (stored?)`);
      }
    } else {
      if (!((r.options || []).indexOf(r.affix) >= 0)) fails.push(`${label}: the correct affix is not among the cog options`);
      const wrong = (r.options || []).find((a) => a !== r.affix);
      if (!(wrong && !Core.isAnswer(r, wrong))) fails.push(`${label}: a wrong cog (${wrong}) was accepted`);
    }

    /* ---- SURFACE (declared locales only) ---- */
    if (r.cog === 'apply' && surface) {
      const s = surface[r.affix];
      if (!s) fails.push(`${label}: affix "${r.affix}" has no surface entry for ${loc}`);
      else if (s[0] + r.root + s[1] !== r.word) fails.push(`${label}: word "${r.word}" != ${s[0]}+${r.root}+${s[1]} (${s[0] + r.root + s[1]})`);
    }

    /* ---- AUTHORING ---- */
    if (!f.correctNotIndex0) soft(`${label}: correct at authored index 0`);
    if (r.cog === 'apply' && !f.hasRootDistractor) soft(`${label}: no root-only distractor`);
  });

  const distinctCogs = Object.keys(cogs);
  if (!(distinctCogs.indexOf('apply') >= 0 && distinctCogs.indexOf('which') >= 0))
    fails.push(`${rowId}[${loc}]: both cogs required (apply + which); got [${distinctCogs.join('/')}]`);
  if (Object.keys(fams).length < 2) fails.push(`${rowId}[${loc}]: only ${Object.keys(fams).length} affix family in the pool`);
  if (Object.keys(ids).length < VARIETY_MIN) fails.push(`${rowId}[${loc}]: only ${Object.keys(ids).length} distinct round ids (<${VARIETY_MIN})`);
  Object.keys(ids).forEach((id) => { if (ids[id] > 1) fails.push(`${rowId}[${loc}]: duplicate round id "${id}"`); });

  return { fails, warns, counted: rounds.length, families: Object.keys(fams), cogs: distinctCogs };
}

function run(mutate) {
  const allFails = [], allWarns = [];
  let total = 0;
  const summary = [];
  for (const row of manifest) {
    for (const [loc, roundsRaw] of poolsOf(row)) {
      let rounds = roundsRaw;
      if (mutate) rounds = mutate(loc, JSON.parse(JSON.stringify(roundsRaw)));
      const res = checkPool(loc, rounds, row.id);
      total += res.counted;
      allFails.push(...res.fails); allWarns.push(...res.warns);
      summary.push(`${loc}:${res.counted}[${res.families.join('/')}]`);
    }
  }
  return { allFails, allWarns, total, summary };
}

/* ---------- poison mode: every assertion must be able to fire ---------- */
if (process.argv.indexOf('--poison') >= 0) {
  const cases = [
    /* ⚠ Each poison must be caught by the assertion it NAMES. A mutation that
       also destroys the correct option is caught upstream by "could not be
       derived" and proves nothing about the check it claims to test — so the
       three structural poisons below are surgical: they leave exactly one
       correct, derivable option in place and break only their own invariant.
       (`expect` is asserted, not just "something failed".) */
    ['UNIVERSAL exactlyOneCorrect', (loc, rs) => { if (loc === 'sv') rs[0].affix = 'nope'; return rs; }, 'could not be derived'],
    ['UNIVERSAL wrong-affix distractor', (loc, rs) => {
      if (loc === 'sv') rs[0].options = rs[0].options.map((o) => (o.affix !== rs[0].affix && o.affix !== 'root' ? { affix: 'root', text: o.text } : o));
      return rs;
    }, 'no wrong-affix distractor'],
    ['UNIVERSAL <3 options', (loc, rs) => {
      if (loc === 'sv') { const r = rs[0]; const ci = Core.correctIndex(r); const keepWrong = r.options.findIndex((o, i) => i !== ci); r.options = [r.options[keepWrong], r.options[ci]]; }
      return rs;
    }, '<3 options'],
    ['UNIVERSAL duplicate round id', (loc, rs) => { if (loc === 'sv') rs[1].id = rs[0].id; return rs; }, 'duplicate round id'],
    ['UNIVERSAL both cogs', (loc, rs) => (loc === 'sv' ? rs.filter((r) => r.cog === 'apply') : rs), 'both cogs required'],
    ['SURFACE wordSpelling (sv)', (loc, rs) => { if (loc === 'sv') rs[0].word = 'osnall'; return rs; }, '!= o+'],
    ['SURFACE wordSpelling (en)', (loc, rs) => { if (loc === 'en') rs[0].word = 'notkind'; return rs; }, '!= un+'],
    ['AUTHORING correct-at-index-0 (sv, strict)', (loc, rs) => {
      if (loc === 'sv') { const r = rs[0]; const ci = Core.correctIndex(r); const t = r.options[0]; r.options[0] = r.options[ci]; r.options[ci] = t; }
      return rs;
    }, 'correct at authored index 0'],
    ['AUTHORING root distractor (sv, strict)', (loc, rs) => { if (loc === 'sv') rs[0].options = rs[0].options.map((o) => (o.affix === 'root' ? { affix: 'ful', text: o.text } : o)); return rs; }, 'no root-only distractor'],
    ['stored answer key', (loc, rs) => { if (loc === 'sv') rs[0].correctIndex = 1; return rs; }, 'forbidden stored-answer key'],
  ];
  const control = run(null);
  let bad = 0;
  if (control.allFails.length) { console.error('POISON CONTROL FAILED — the unmutated manifest does not pass:'); control.allFails.slice(0, 6).forEach((f) => console.error('  • ' + f)); process.exit(1); }
  console.log('poison control: unmutated manifest PASSES (non-vacuous baseline)');
  cases.forEach(([name, m, expect]) => {
    const r = run(m);
    /* the poison must be caught by the assertion it NAMES — a neighbouring
       failure does not count, or a mutation that merely breaks something else
       reports as proof for a check that never ran */
    const caught = r.allFails.some((f) => f.indexOf(expect) >= 0);
    const why = caught ? r.allFails.find((f) => f.indexOf(expect) >= 0) : (r.allFails[0] || '(nothing failed at all)');
    console.log((caught ? '  caught  ' : '  MISSED  ') + name + '  -> ' + why.slice(0, 88));
    if (!caught) bad++;
  });
  if (bad) { console.error(`\nPOISON FAILED — ${bad} assertion(s) did not fire ON THEIR OWN NAMED CHECK.`); process.exit(1); }
  console.log('\nPOISON PASSED — every assertion fires on a synthetic violation, and the real manifest passes.');
  process.exit(0);
}

const { allFails, allWarns, total, summary } = run(null);

if (allWarns.length) {
  console.log(`WARN — ${allWarns.length} authoring-hygiene issue(s) in pools that shipped before this gate could read them (not blocking; scope AUTHORING):`);
  const byLoc = {};
  allWarns.forEach((w) => { const m = w.match(/\[([a-z-]+)\]/); const k = m ? m[1] : '?'; byLoc[k] = (byLoc[k] || 0) + 1; });
  Object.keys(byLoc).sort().forEach((k) => console.log(`  • ${k}: ${byLoc[k]}`));
  console.log('  (fr/it place the correct option at authored index 0 in most rounds; the four Romance pools author no root-only distractor.');
  console.log('   Neither reaches a sighted child — _renderOptions shuffles — and the screen-reader leak they DID cause is closed in _srMirror.)');
}

if (allFails.length) {
  console.error(`FAIL — ${allFails.length} affix-correctness violation(s) across ${total} round(s):`);
  allFails.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${total} round(s) across ${summary.length} pool(s) [${summary.join(' ')}]:`);
console.log('  UNIVERSAL (every pool): oracle 100%; answer derived-not-stored; exactly one correct; >=3 options;');
console.log('    a wrong option rejected; a wrong-affix distractor present; both cogs; >=7 distinct, unique round ids.');
console.log(`  SURFACE (${Object.keys(AFFIX_SURFACE).join('/')} only): word === prefix+root+suffix in that locale's own spellings.`);
console.log(`  AUTHORING (hard for ${STRICT.join('/')}, WARN elsewhere): correct not at authored index 0; root-only distractor present.`);
process.exit(0);
