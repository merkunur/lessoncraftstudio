#!/usr/bin/env node
/* =====================================================================
   check-correction-diacritics.js — refuse a correction that silently
   DROPS a diacritic its own singular carries.

   WHY THIS EXISTS (sv wave, 2026-07-17). The whole arc exists because
   the builder shipped defects like beanie ["Mossa","Mossor"] — a lost ö
   that landed on a DIFFERENT REAL WORD (mossa = moss, not mössa = a
   beanie). While fixing exactly that class, four of the sv wave's own
   proposed corrections arrived with the SAME defect:

       purse     sing "Portmonnä"     -> "Portmonnaer"    (want Portmonnäer)
       push-pin  sing "Häftstift"     -> "Haftstift"      (want Häftstift)
       sauce     sing "Sås"           -> "Saser"          (want Såser)
       scrubs    sing "Sjukhuskläder" -> "Sjukhusklader"  (want Sjukhuskläder)

   The adversarial pass caught them, and the tell proved it was an
   ENVIRONMENT ARTIFACT rather than a judgement: `scrubs` and
   `hospital-gown` are one lemma with identical stored rows, and the SAME
   reviewer wrote "Sjukhuskläder" for one and "Sjukhusklader" for the
   other. A human does not make that choice twice differently.

   An adversarial reviewer is a person and can miss one. This class is
   mechanical, so it gets a mechanical gate: a lost diacritic is not a
   judgement call, it is a byte. §A.13.45 (encoding fidelity) as a gate
   rather than a hope.

   THE TEST, and why it is shaped this way:
     flag when   the effective singular HAS a diacritic
           and   the proposed plural has NONE
           and   the two still share a folded stem
   The stem clause is what keeps it honest: a correction that
   legitimately REMOVES an accent (sv lilac "Syrén" -> "Syren", correct
   per SAOL) changes the singular too, so the effective singular carries
   no diacritic and the row is never flagged. The gate must catch the
   artifact without vetoing a real fix.

   Effective singular = this wave's proposed singular fix if there is
   one, else the current value — because a wave may fix both fields of
   one key (the sv coupling class), and the plural must agree with the
   singular the wave is actually shipping, not the one it is replacing.

   USAGE  node scripts/vocab-audit/check-correction-diacritics.js --locale=sv
          node scripts/vocab-audit/check-correction-diacritics.js --self-test
   Exit 1 on any suspect. READ-ONLY.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');

/* Every diacritic the 11 locales actually use. Folding is deliberately
   ASCII-ward: we are asking "is this the same word with its accents
   knocked off", not doing linguistics. */
const FOLD = [
  [/[åäàâáã]/g, 'a'], [/[öôòóõø]/g, 'o'], [/[éèêë]/g, 'e'], [/[üùúû]/g, 'u'],
  [/[ïìíî]/g, 'i'], [/[ýÿ]/g, 'y'], [/ç/g, 'c'], [/ñ/g, 'n'], [/ß/g, 'ss'], [/æ/g, 'ae'],
];
const fold = (s) => { let x = String(s).toLowerCase(); for (const [re, to] of FOLD) x = x.replace(re, to); return x; };
const hasDia = (s) => fold(s) !== String(s).toLowerCase();

/* WHAT THIS GATE CAN AND CANNOT DECIDE — the scope is deliberate.

   DECIDABLE, so gated: a PLURAL must carry the diacritics of the
   singular it ships beside. That is internal consistency and needs no
   lexical knowledge — "Sås" cannot pluralise to "Saser".

   NOT DECIDABLE, so NOT gated: a SINGULAR fix that changes a diacritic.
   `Syrén -> Syren` (right: SAOL has no accent) and `Mössa -> Mossa`
   (wrong: mossa is moss) are the same shape. Only lexical truth
   separates them, and a machine has none. An earlier draft of this gate
   checked singular-vs-`from` and duly false-positived on lilac — the
   correct response was to narrow what it measures, never to loosen the
   threshold until lilac passed. A singular diacritic claim belongs to
   the native reviewer and the adversarial pass; this gate does not
   pretend to cover it.

   The cross-field case is still covered: when a wave corrects BOTH
   fields of a key, the plural is judged against the CORRECTED singular,
   so an inconsistent pair (singular keeps ä, plural drops it) bites. */
function suspects(corrections, currentSingulars) {
  const out = [];
  for (const [key, c] of Object.entries(corrections.plural || {})) {
    if (!c || !c.to) continue;
    /* judged against the singular this wave actually ships, not the one
       it replaces — a wave may fix both fields of one key (sv coupling) */
    const eff = (corrections.singular && corrections.singular[key] && corrections.singular[key].to)
      || currentSingulars[key];
    if (!eff) continue;
    if (!hasDia(eff) || hasDia(c.to)) continue;
    const stem = fold(eff).slice(0, Math.min(4, fold(eff).length));
    if (!stem || !fold(c.to).startsWith(stem)) continue;
    out.push({ key, field: 'plural', singular: eff, from: c.from, to: c.to });
  }
  return out;
}

/* ---- the mutation proof. A gate is worth exactly what it BITES. ---- */
function selfTest() {
  let pass = 0, fail = 0;
  const t = (name, corrections, singulars, expectHit) => {
    const hit = suspects(corrections, singulars).length > 0;
    const ok = hit === expectHit;
    console.log('   ' + (ok ? (expectHit ? '✓ bites' : '✓ quiet') : '✗ ' + (expectHit ? 'BLIND' : 'FALSE POSITIVE')) + '  ' + name);
    ok ? pass++ : fail++;
  };
  console.log('mutation proof:');

  /* the four real sv cases, verbatim */
  t('sv purse: Portmonnä -> "Portmonnaer" (ä dropped)',
    { plural: { purse: { from: 'Portmonnäar', to: 'Portmonnaer' } } }, { purse: 'Portmonnä' }, true);
  t('sv sauce: Sås -> "Saser" (å dropped; "sas" is a real string, so it looks fine)',
    { plural: { sauce: { from: 'Såsar', to: 'Saser' } } }, { sauce: 'Sås' }, true);
  t('sv scrubs: Sjukhuskläder -> "Sjukhusklader"',
    { plural: { scrubs: { from: 'Sjukhuskläderar', to: 'Sjukhusklader' } } }, { scrubs: 'Sjukhuskläder' }, true);
  t('de: Käse -> "Kase"',
    { plural: { cheese: { from: 'Käsen', to: 'Kase' } } }, { cheese: 'Käse' }, true);
  t('cross-field: singular KEEPS the ä, paired plural drops it',
    { singular: { x: { from: 'Haftstift', to: 'Häftstift' } }, plural: { x: { from: 'Haftstiftar', to: 'Haftstift' } } },
    { x: 'Haftstift' }, true);

  /* negative controls — a gate that fires on everything is useless */
  t('NEG lilac: a LEGITIMATE accent removal (Syrén -> Syren, SAOL) with an agreeing plural',
    { singular: { lilac: { from: 'Syrén', to: 'Syren' } }, plural: { lilac: { from: 'Syrénar', to: 'Syrener' } } },
    { lilac: 'Syrén' }, false);
  t('NEG the correct fix keeps the diacritic (Sås -> Såser)',
    { plural: { sauce: { from: 'Såsar', to: 'Såser' } } }, { sauce: 'Sås' }, false);
  t('NEG plain ASCII word, no diacritic anywhere (Katt -> Katter)',
    { plural: { cat: { from: 'Kattar', to: 'Katter' } } }, { cat: 'Katt' }, false);
  t('NEG unrelated lemma, not a stripped stem (Släde -> Kälkar)',
    { plural: { sled: { from: 'Slädar', to: 'Kälkar' } } }, { sled: 'Släde' }, false);
  t('NEG a fix that ADDS a diacritic (Mossa -> Mössor)',
    { singular: { beanie: { from: 'Mossa', to: 'Mössa' } } }, { beanie: 'Mossa' }, false);

  console.log('\n' + (fail ? 'FAIL' : 'PASS') + '  ' + pass + ' proven, ' + fail + ' blind');
  return fail === 0;
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--self-test')) process.exit(selfTest() ? 0 : 1);
  const a = argv.find((x) => x.startsWith('--locale='));
  if (!a) { console.error('FAIL: --locale=<xx> is required (no default — a forgotten flag must not silently check the wrong locale)'); process.exit(1); }
  const loc = a.split('=')[1];

  const cPath = path.join(OUT, 'corrections-' + loc + '.json');
  if (!fs.existsSync(cPath)) { console.error('FAIL: no corrections-' + loc + '.json — run merge-verdicts.js --locale=' + loc + ' first'); process.exit(1); }
  const corrections = JSON.parse(fs.readFileSync(cPath, 'utf8')).corrections;

  const dossier = JSON.parse(fs.readFileSync(path.join(OUT, 'dossier.json'), 'utf8'));
  const rows = dossier.rows || dossier;
  const singulars = {};
  for (const r of rows) if (r.loc && r.loc[loc]) singulars[r.key] = r.loc[loc].s;

  const sus = suspects(corrections, singulars);
  const n = Object.keys(corrections.plural || {}).length + Object.keys(corrections.singular || {}).length;
  console.log(loc + ': ' + n + ' singular+plural corrections checked');
  if (!sus.length) { console.log('  ✓ none drops a diacritic its own singular carries'); return; }

  console.log('\n  🔴 DIACRITIC DROPPED — these would ship a non-word while fixing one:');
  for (const s of sus) {
    console.log('     ' + (s.key + '.' + s.field).padEnd(22) + '"' + s.from + '" → "' + s.to + '"');
    console.log('        singular is "' + s.singular + '" — the fix folded it to ASCII');
  }
  console.log('\n  This is an environment artifact, not a judgement. Amend `to` to carry');
  console.log('  the diacritic (the adversarial pass proposes `better`), then re-run.');
  process.exit(1);
}
main();
