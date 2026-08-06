#!/usr/bin/env node
/* =====================================================================
   verify-word-clinic-core.js — the MEASURED, critic-armed build-gate for
   "Word Doctor's Clinic — heal by ear" (L.1.2.e). Drives the REAL core
   (loaded via `new Function`) over the REAL manifest + the gated confusable
   table. HALTS the build on any failure. The headline = the SOLVER SET:

     • SPELLING ORACLE (knows the heard sound's grapheme) → 100%;
     • NO-SPELLING solver (random tray pick, no sound-map) → <= chance;
     • CONSTRAINT solver (frame + orthotactics, ignores sound) → <= chance
       (proves the scaffold does NOT do the encoding — >=2 plausible
       completions per round);
     • PICTURE-RECALL solver (sight-spell a memorized common word) → FAILS
       (proves the pool is untaught — no word is a top sight-word);
     • BRUTE-FORCE (no per-slot/closer signal) → <= chance.

   Plus STRUCTURAL asserts: core CONFUSABLES === the gated JSON SoT (no
   drift); the correct grapheme/complete spelling NOT in snapshot; tray =
   1 correct (head) + >=2 DIFFERENT-sound competitors that each voice a word
   DIFFERENT from the target; graphemes.join === the real word; the pool ⊆
   approved-words-en ∩ image-vocabulary ∩ a COLOR WebP; >=7 distinct cogs.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const CORE = path.join(MINI, 'word-clinic-core.js');
const MANIFEST = path.join(MINI, 'word-clinic-activities.json');
const TABLE_JSON = path.join(REPO, 'scripts/v2-data/en-phoneme-confusables.json');
const APPROVED = path.join(REPO, 'scripts/v2-data/verify-syllable-boundaries/output/approved-words-en.json');
const VOCAB_JS = path.join(REPO, 'REFERENCE TRANSLATIONS/image-vocabulary.js');
const THEMES_DIR = path.join(REPO, 'frontend/public/image-library-webp/themes');

const ARMED_MAX = 0.55;

function loadCore() {
  const src = fs.readFileSync(CORE, 'utf8');
  const win = {};
  new Function('window', src)(win);
  if (!win.WordClinicCore) throw new Error('core did not attach window.WordClinicCore');
  return win.WordClinicCore;
}
function deepEq(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
function pct(x) { return (100 * x).toFixed(1) + '%'; }
function hasVowel(s) { return /[aeiou]/.test(s); }
function plausible(s) { return /^[a-z]+$/.test(s) && hasVowel(s); }

const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };

(function main() {
  const Core = loadCore();
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const row = Array.isArray(manifest) ? manifest[0] : manifest;
  const rounds = (row && row.params && row.params.rounds) || [];
  const tableJson = JSON.parse(fs.readFileSync(TABLE_JSON, 'utf8'));

  /* ---- (A) core table === gated JSON SoT (no drift) ---- */
  F(deepEq(Core.CONFUSABLES, tableJson.confusables), 'core CONFUSABLES does NOT match scripts/v2-data/en-phoneme-confusables.json (drift)');

  /* ---- word-set sources ---- */
  const approved = JSON.parse(fs.readFileSync(APPROVED, 'utf8'));
  const APP = new Set((approved.entries || []).map(w => (typeof w === 'string' ? w : (w.word || w.key))));
  const vm = fs.readFileSync(VOCAB_JS, 'utf8').match(/const IMAGE_VOCABULARY = (\{[\s\S]*?\});/);
  const VOCAB = vm ? eval('(' + vm[1] + ')') : {};
  const themes = fs.readdirSync(THEMES_DIR).filter(t => { try { return fs.statSync(path.join(THEMES_DIR, t)).isDirectory(); } catch (e) { return false; } });
  const colorThemes = themes.filter(t => !/\bbw\b/i.test(t) && t !== 'BACKGROUNDS' && t !== 'BORDERS');
  function colorWebpExists(noun, theme) {
    if (theme && fs.existsSync(path.join(THEMES_DIR, theme, noun + '@2x.webp')) && colorThemes.indexOf(theme) !== -1) return true;
    return colorThemes.some(t => fs.existsSync(path.join(THEMES_DIR, t, noun + '@2x.webp')));
  }

  F(rounds.length >= 7, `bank has ${rounds.length} rounds (need >=7)`);

  /* ---- (B) per-round structural + data-integrity ---- */
  rounds.forEach((r) => {
    const f = Core.facts(r);
    F(f.graphemesSpellTheWord, `${r.id}: graphemes ${JSON.stringify(r.graphemes)} do NOT spell "${r.word}"`);
    F(f.sickPhonemeInTable, `${r.id}: sickPhoneme "${r.sickPhoneme}" not in the confusable table`);
    F(f.correctIsTrayHead, `${r.id}: the correct grapheme is not the table head for "${r.sickPhoneme}"`);
    F(f.trayHasCorrectPlusTwo, `${r.id}: tray must be correct + >=2 competitors`);
    F(f.poolIsUntaught, `${r.id}: "${r.word}" is a top sight-word (pool must be untaught)`);
    F(f.competitorsVoiceDifferent, `${r.id}: a competitor voices the SAME word (must be different-sound)`);
    F(APP.has(r.word), `${r.id}: "${r.word}" not in approved-words-en`);
    F(!!VOCAB[r.word], `${r.id}: "${r.word}" not in image-vocabulary`);
    F(colorWebpExists(r.word, r.theme), `${r.id}: no COLOR WebP for "${r.word}" (theme "${r.theme}")`);
    /* snapshot must NOT leak the answer */
    const snap = Core.snapshot(r);
    F(snap.frameTiles[r.sickIndex] === null, `${r.id}: snapshot frameTiles exposes the sick grapheme`);
    F(!('correctGrapheme' in snap), `${r.id}: snapshot exposes correctGrapheme`);
    F(snap.frameTiles.join('').indexOf(r.word) === -1, `${r.id}: snapshot frame assembles the complete word`);
    /* scaffold-minimum: >=2 tray completions are orthotactically plausible
       (a constraint-solver cannot uniquely pick the answer) */
    const aud = Core.audit(r);
    const nPlausible = aud.assembled.filter(a => plausible(a.str)).length;
    F(nPlausible >= 2, `${r.id}: only ${nPlausible} plausible completion(s) — the scaffold over-determines the answer`);
  });

  /* ---- (C) >=7 distinct cogs (of the 8) ---- */
  const cogs = new Set(rounds.map((r) => r.cog));
  F(cogs.size >= 7, `only ${cogs.size} distinct cogs (need >=7 of the 8)`);

  /* ---- (D) THE SOLVER SET ---- */
  let oracle = 0, noSpellExp = 0, constraintExp = 0, pictureRecall = 0, bruteExp = 0;
  rounds.forEach((r) => {
    const aud = Core.audit(r);
    const tray = aud.tray, cg = aud.correctGrapheme;
    /* SPELLING ORACLE — knows the heard sound's grapheme */
    if (Core.isHealed(r, cg)) oracle++;
    /* NO-SPELLING — random tray pick → expected 1/trayLen */
    noSpellExp += 1 / tray.length;
    /* CONSTRAINT — uniform among orthotactically-plausible completions (incl. correct) */
    const plausibleSet = aud.assembled.filter(a => plausible(a.str));
    const correctPlausible = plausibleSet.some(a => a.correct);
    constraintExp += correctPlausible ? (1 / plausibleSet.length) : 0;
    /* PICTURE-RECALL — sight-spell only succeeds for a memorized common word */
    if (Core.TOP_SIGHT.indexOf(r.word) !== -1) pictureRecall++;
    /* BRUTE-FORCE — no closer/per-slot signal → random → 1/trayLen */
    bruteExp += 1 / tray.length;
  });
  const N = rounds.length || 1;
  F(oracle === N, `spelling oracle ${oracle}/${N} (must be 100%)`);
  F(noSpellExp / N <= ARMED_MAX, `NO-SPELLING solver expected ${pct(noSpellExp / N)} (> ${pct(ARMED_MAX)})`);
  F(constraintExp / N <= ARMED_MAX, `CONSTRAINT solver expected ${pct(constraintExp / N)} (> ${pct(ARMED_MAX)}) — scaffold leaks the answer`);
  F(pictureRecall === 0, `PICTURE-RECALL solved ${pictureRecall} round(s) — pool too memorized (must be untaught)`);
  F(bruteExp / N <= ARMED_MAX, `BRUTE-FORCE expected ${pct(bruteExp / N)} (> ${pct(ARMED_MAX)})`);

  /* ---- report ---- */
  console.log(`bank: ${rounds.length} rounds, cogs: ${[...cogs].sort().join('/')}`);
  console.log('solvers:');
  console.log(`  ${oracle === N ? 'ok  ' : 'FAIL'} spelling-oracle (ear): ${oracle}/${N}`);
  console.log(`  ${noSpellExp / N <= ARMED_MAX ? 'ok  ' : 'FAIL'} no-spelling (random): ${pct(noSpellExp / N)}`);
  console.log(`  ${constraintExp / N <= ARMED_MAX ? 'ok  ' : 'FAIL'} constraint (no sound): ${pct(constraintExp / N)}`);
  console.log(`  ${pictureRecall === 0 ? 'ok  ' : 'FAIL'} picture-recall (sight-spell): ${pictureRecall}/${N} solved`);
  console.log(`  ${bruteExp / N <= ARMED_MAX ? 'ok  ' : 'FAIL'} brute-force: ${pct(bruteExp / N)}  (chance ~33%, ceiling ${pct(ARMED_MAX)})`);
  console.log('');
  if (fails.length) {
    console.error(`VERIFY-WORD-CLINIC-CORE FAILED — ${fails.length} issue(s):`);
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-WORD-CLINIC-CORE PASSED — core table === the gated JSON; every round graphemes.join===the real word, pool ⊆ approved-words ∩ image-vocab ∩ color WebP + untaught, tray = correct + >=2 different-sound competitors voicing a DIFFERENT word, the answer is not in the snapshot, >=2 plausible completions; the spelling ORACLE heals 100% while no-spelling / constraint / picture-recall / brute-force all score <= chance; >=7 distinct ear-decision cogs.');
  process.exit(0);
})();
