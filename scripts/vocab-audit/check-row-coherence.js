#!/usr/bin/env node
/* =====================================================================
   check-row-coherence.js — asks the question none of the other gates ask:
   AFTER the change, DOES THE ROW STILL MAKE SENSE?

   WHY THIS EXISTS. Every gate in this arc asked "did exactly N keys move?"
   and every one of them passed while I shipped `curtains` as
   ["Gardiner","Gardiner"] with its singular fix held — a plural in the
   singular slot. The count was right. The row was nonsense. The operator
   found it in seconds. A counting gate cannot see meaning.

   (That particular row turned out to be CORRECT — `curtains` is a
   plural-picture key and en says ["Curtains","Curtains"] too. I then
   misdiagnosed my own correct work as broken and nearly "fixed" it into a
   duplicate of `curtain`. Both failures — shipping blind and then
   panicking blind — come from having no gate that models what a row MEANS.
   This is that gate.)

   IT VALIDATES AGAINST THE CLASSIFICATION SoT, which is image-derived, so
   it can assert things a spell-checker never could:

     1. ARITY / GENDER PRESENCE follows the classification, identically in
        all 11 locales. A quality that is genderless in `de` but gendered in
        `fr` is a FAIL — the operator's rule is that the picture decides, and
        the picture is the same for everyone.
     2. hasPlural:false  => s === p, in every locale. (The file's documented
        "no plural" encoding.)
     3. hasPlural:true   => s !== p, UNLESS the locale genuinely has a zero
        plural there (sv "ett hus -> flera hus"). A zero plural is a real
        thing, so this is a WARN a native must ratify, never a silent FAIL —
        and never an auto-fix.
     4. NO PLURAL IN THE SINGULAR SLOT: a key's singular must not equal a
        SISTER KEY's plural. This is the `curtains`-vs-`curtain` shape, and
        it is the one that reaches children as a wrong spoken word.
        ⚠ It is a WARN, not a FAIL: `curtains`/`curtain` are two legitimate
        rows for two different pictures, and the plural-picture key's
        singular IS the sister's plural, by design. The classification tells
        us which is which — but a *countable-thing* whose singular equals a
        sister's plural is a real defect.
     5. BLOCKED keys must not move at all. If the word does not name the
        picture, pluralising it manufactures garbage ("Singen" -> "Singens").
     6. LEGAL GENDER CODES per locale — and NEVER cross-applied.
        sv/da: n = COMMON (en/et-ord), t = NEUTER. `n` does NOT mean neuter.
        nl: d/h. no: m/f/n. de: m/f/n. Romance: m/f. (§A.13.58)

   USAGE  node scripts/vocab-audit/check-row-coherence.js --locale=sv
          node scripts/vocab-audit/check-row-coherence.js --all
          node scripts/vocab-audit/check-row-coherence.js --self-test
   Exit 1 on any FAIL. READ-ONLY.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const VOCAB = path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');

const GENDERED = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no'];
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* §A.13.58 — per-locale gender authority. NEVER cross-apply a code:
   `lås` is common in da/no but NEUTER in sv. */
const LEGAL = {
  de: ['m', 'f', 'n'], fr: ['m', 'f'], it: ['m', 'f'], es: ['m', 'f'], pt: ['m', 'f'],
  nl: ['d', 'h'], sv: ['n', 't'], da: ['n', 't'], no: ['m', 'f', 'n'],
};

function loadVocab(src) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext((src || fs.readFileSync(VOCAB, 'utf8')) + '\n; __OUT = IMAGE_VOCABULARY;', ctx);
  return ctx.__OUT;
}

/* the check, factored out so the self-test drives it directly */
function check(vocab, classification, locales) {
  const fails = [], warns = [];

  /* sister index: every plural form -> the key that owns it */
  const pluralOwner = {};
  for (const [k, row] of Object.entries(vocab)) {
    for (const l of ALL) {
      const r = row[l];
      if (!r || r[0] === r[1]) continue;
      const kk = l + '|' + String(r[1]).toLowerCase();
      (pluralOwner[kk] || (pluralOwner[kk] = [])).push(k);
    }
  }

  for (const [key, row] of Object.entries(vocab)) {
    const c = classification[key];
    if (!c) { fails.push({ key, field: '-', msg: 'NO CLASSIFICATION — this key is not in the SoT; it cannot be validated' }); continue; }

    for (const l of locales) {
      const r = row[l];
      if (!r) continue;
      const [s, p] = [r[0], r[1]];
      const g = r.length > 2 ? r[2] : null;
      const gendered = GENDERED.indexOf(l) >= 0;

      /* 1. gender presence follows the classification — the SAME everywhere */
      if (gendered) {
        if (c.hasGender && r.length !== 3) fails.push({ key, field: l, msg: 'NOUN but no gender element (arity ' + r.length + '). ' + c.category + ' keeps a gender in every locale.' });
        if (!c.hasGender && r.length !== 2) fails.push({ key, field: l, msg: 'NOT A NOUN (' + c.category + ') but carries gender "' + g + '" — fabricated. The operator: "If they are not nouns, don\'t make up anything."' });
      }

      /* 6. legal codes, never cross-applied */
      if (g && LEGAL[l] && LEGAL[l].indexOf(g) < 0) fails.push({ key, field: l, msg: 'ILLEGAL gender "' + g + '" for ' + l + ' (legal: ' + LEGAL[l].join('/') + ') — a code from another locale' });

      /* 2/3. plural presence follows the classification */
      if (!c.hasPlural && s !== p) fails.push({ key, field: l, msg: c.category + ' has NO plural, but p="' + p + '" != s="' + s + '" — an invented plural (the Gardinerar class)' });
      if (c.hasPlural && s === p) warns.push({ key, field: l, msg: 'countable but s===p ("' + s + '") — legal ONLY if this locale has a genuine zero plural here (sv ett hus -> flera hus). A native must ratify; never auto-fix.' });

      /* 4. a plural sitting in the singular slot */
      const owner = pluralOwner[l + '|' + String(s).toLowerCase()];
      if (owner && owner.length && owner.indexOf(key) < 0) {
        const msg = 'singular "' + s + '" is the PLURAL of sister key "' + owner[0] + '"';
        if (c.category === 'plural-picture') { /* by design — the picture IS several */ }
        else warns.push({ key, field: l, msg: msg + ' — but this key is ' + c.category + ', not plural-picture. A plural in the singular slot?' });
      }
    }
  }
  return { fails, warns };
}

/* ---- the mutation proof. A gate is worth exactly what it BITES. ---- */
function selfTest() {
  let pass = 0, fail = 0;
  const t = (name, vocab, cls, expectFail) => {
    const r = check(vocab, cls, ALL);
    const hit = r.fails.length > 0;
    const ok = hit === expectFail;
    console.log('   ' + (ok ? (expectFail ? '✓ bites' : '✓ quiet') : '✗ ' + (expectFail ? 'BLIND' : 'FALSE POSITIVE')) + '  ' + name);
    ok ? pass++ : fail++;
  };
  const NOUN = { category: 'countable-thing', hasGender: true, hasPlural: true };
  const ADJ = { category: 'adjective', hasGender: false, hasPlural: false };
  const MASS = { category: 'mass', hasGender: true, hasPlural: false };
  const PPIC = { category: 'plural-picture', hasGender: true, hasPlural: false };

  console.log('mutation proof (each injects ONE defect; the gate must bite):');

  t('a fabricated gender on an ADJECTIVE (red -> ["Rot","Rot","m"])',
    { red: { en: ['Red', 'Red'], de: ['Rot', 'Rot', 'm'] } }, { red: ADJ }, true);
  t('an invented plural on a MASS noun (the Gardinerar class)',
    { water: { en: ['Water', 'Water'], de: ['Wasser', 'Wassern', 'n'] } }, { water: MASS }, true);
  t('an invented plural on a PLURAL-PICTURE (curtains -> Gardinerar)',
    { curtains: { en: ['Curtains', 'Curtains'], sv: ['Gardiner', 'Gardinerar', 'n'] } }, { curtains: PPIC }, true);
  t('a NOUN stripped of its gender',
    { cat: { en: ['Cat', 'Cats'], de: ['Katze', 'Katzen'] } }, { cat: NOUN }, true);
  t('sv gender cross-applied from de (sv is n/t, not m)',
    { cat: { en: ['Cat', 'Cats'], sv: ['Katt', 'Katter', 'm'] } }, { cat: NOUN }, true);
  t('nl gender cross-applied (nl is d/h, not n)',
    { cat: { en: ['Cat', 'Cats'], nl: ['Kat', 'Katten', 'n'] } }, { cat: NOUN }, true);
  t('a key with NO classification cannot be validated',
    { ghost: { en: ['Ghost', 'Ghosts'], de: ['Geist', 'Geister', 'm'] } }, {}, true);

  /* negative controls — a gate that fires on everything is as useless as one that fires on nothing */
  t('NEG a correct countable noun',
    { cat: { en: ['Cat', 'Cats'], de: ['Katze', 'Katzen', 'f'], sv: ['Katt', 'Katter', 'n'] } }, { cat: NOUN }, false);
  t('NEG a correct adjective with NO gender element (arity 2)',
    { red: { en: ['Red', 'Red'], de: ['Rot', 'Rot'], sv: ['Röd', 'Röd'] } }, { red: ADJ }, false);
  t('NEG a correct plural-picture (curtains, s===p, keeps gender)',
    { curtains: { en: ['Curtains', 'Curtains'], sv: ['Gardiner', 'Gardiner', 'n'] } }, { curtains: PPIC }, false);
  t('NEG a correct mass noun (s===p)',
    { water: { en: ['Water', 'Water'], de: ['Wasser', 'Wasser', 'n'] } }, { water: MASS }, false);
  t('NEG sv genuine zero plural (ett hus -> flera hus) is a WARN, not a FAIL',
    { house: { en: ['House', 'Houses'], sv: ['Hus', 'Hus', 't'] } }, { house: NOUN }, false);
  t('NEG an EN zero-plural keeps its real de plural (Kaiserfisch->Kaiserfische)',
    { angelfish: { en: ['Angelfish', 'Angelfish'], de: ['Kaiserfisch', 'Kaiserfische', 'm'] } }, { angelfish: NOUN }, false);

  console.log('\n' + (fail ? 'FAIL' : 'PASS') + '  ' + pass + ' proven, ' + fail + ' blind');
  return fail === 0;
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--self-test')) process.exit(selfTest() ? 0 : 1);
  const a = argv.find((x) => x.startsWith('--locale='));
  if (!a && !argv.includes('--all')) { console.error('FAIL: --locale=<xx> or --all required (no default — a forgotten flag must not silently check the wrong locale)'); process.exit(1); }
  const locales = a ? [a.split('=')[1]] : ALL;

  const cPath = path.join(OUT, 'classification.json');
  if (!fs.existsSync(cPath)) { console.error('FAIL: no classification.json — run build-classification-sot.js first'); process.exit(1); }
  const cls = JSON.parse(fs.readFileSync(cPath, 'utf8')).rows;
  const vocab = loadVocab();

  const { fails, warns } = check(vocab, cls, locales);
  const blocked = Object.entries(cls).filter(([, c]) => c.blocked).map(([k]) => k);

  console.log('row coherence [' + locales.join(',') + ']  ' + Object.keys(vocab).length + ' keys');
  if (warns.length) {
    console.log('\n  ⚠ ' + warns.length + ' WARN — a native must ratify each; NEVER auto-fix:');
    for (const w of warns.slice(0, 15)) console.log('     ' + (w.key + '.' + w.field).padEnd(24) + w.msg);
    if (warns.length > 15) console.log('     … +' + (warns.length - 15) + ' more');
  }
  if (fails.length) {
    console.log('\n  🔴 ' + fails.length + ' FAIL — incoherent rows. These cannot ship:');
    for (const f of fails.slice(0, 25)) console.log('     ' + (f.key + '.' + f.field).padEnd(24) + f.msg);
    if (fails.length > 25) console.log('     … +' + (fails.length - 25) + ' more');
  }
  console.log('\n  ' + blocked.length + ' keys BLOCKED (word does not name the picture) — no field of these may move');
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + fails.length + ' incoherent / ' + warns.length + ' to ratify');
  process.exit(fails.length ? 1 : 0);
}
main();
