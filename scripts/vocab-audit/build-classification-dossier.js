#!/usr/bin/env node
/* =====================================================================
   build-classification-dossier.js — assemble the evidence needed to
   decide, ONCE PER KEY, what the PICTURE is.

   THE OPERATOR'S RULE (2026-07-17, verbatim): "All of the languages
   reflect the same images. If an image is a noun it is a noun in all
   languages. If it is not a noun in a language it is not a noun in all
   languages." The referent decides the category, and the referent is the
   same picture for every locale. So the classification is decided ONCE
   and applied to all 11 — never per-locale.

   The shipped code already agrees: build-pww-index.js marks
   adjectives/gerunds `noArticle:true` so the wall renders them frameless
   "in EVERY locale and never speaks 'der Rot'". That is a BANDAID at the
   index layer — the fabricated gender still sits in image-vocabulary.js
   (red -> ["Rot","Rot","m"]). This dossier is the first step to removing
   it at the source.

   WHY A DOSSIER AND NOT A RULE. Two rules were tried and both are wrong:

   1. `_type` from image-vocabulary-raw.json is ENGLISH-CENTRIC AND WRONG:
      chess/football/golf/baseball/badminton are typed `verb-gerund`, but
      the picture is an OBJECT — chess is a noun in English too, and it is
      `ett schack` / `das Schach` / `en fotboll -> fotbollar`. Wrong in
      every language at once, so it is one error to fix once.

   2. `en[0] === en[1]` looks like it means "the picture has no plural".
      It does not. It conflates FOUR different things:
        plural picture     Curtains/Curtains    -> no locale has a plural
        mass noun          Water/Water          -> no locale has a plural
        non-noun           Red/Red              -> no locale has a plural
        EN ZERO-PLURAL     Angelfish/Angelfish  -> other locales DO, and
                           Sheep/Sheep             they are CORRECT
                                                   (de Kaiserfisch ->
                                                    Kaiserfische)
      A gate built on that rule would flag ~460 rows, an unknown number of
      which are correct plurals, and "fix" them into fabrications.

   So the machine assembles EVIDENCE and a HYPOTHESIS; a native decides.
   The hypothesis is never applied without ratification.

   THE TWO AXES (they are independent — this is the `_countable`/`_type`
   split that was designed and approved but never built):
     hasGender : is the referent a NOUN?  (incl. proper nouns: die Venus,
                 la Terre. de already corrected venus der->die, so the
                 gender is real and load-bearing.)
     hasPlural : is the referent a COUNTABLE SINGLE thing? (a plural
                 picture, a mass noun and a proper noun all have none)

   USAGE  node scripts/vocab-audit/build-classification-dossier.js
   READ-ONLY apart from docs/audit-results/vocab-audit/classification-dossier.json
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..', '..');
const OUT = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');
const VOCAB = path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
const RAW = path.join(REPO, 'scripts', 'v2-data', 'image-vocabulary-raw.json');
const THEMES_DIR = path.join(REPO, 'image-library-webp', 'themes');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* IMAGE_VOCABULARY is a top-level `const` — a script-global that is NOT a
   property of `window`. (The file carries its own comment about this: the
   same trap made every `if (window.ImageVocab)` check silently false.)
   So we must ask for the binding by name in the epilogue. */
function loadVocab() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(VOCAB, 'utf8') + '\n; __OUT = IMAGE_VOCABULARY;', ctx);
  return ctx.__OUT;
}

/* Which themes does each key's art actually live in? The vocab is keyed
   FLAT — the subject lives only in the filesystem, and it is the
   load-bearing disambiguator (`orange` with [colors,fruits] is undecidable
   without it). Mirrors build-pww-index.js's key derivation: `_`->`-` and
   strip a trailing number (§20.5 `cat 2` -> `cat`). */
function themesOnDisk() {
  const map = {};
  let dirs = [];
  try { dirs = fs.readdirSync(THEMES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()); }
  catch (e) { return { map, ok: false, err: e.message }; }
  for (const d of dirs) {
    let files = [];
    try { files = fs.readdirSync(path.join(THEMES_DIR, d.name)); } catch (e) { continue; }
    for (const f of files) {
      if (!/@2x\.webp$/i.test(f)) continue;
      const base = f.replace(/@2x\.webp$/i, '');
      const key = base.replace(/_/g, '-').replace(/[-\s]?\d+$/, '');
      (map[key] || (map[key] = new Set())).add(d.name);
    }
  }
  return { map, ok: true };
}

/* Is the English gloss itself a PLURAL FORM? Distinguishes a plural
   picture (Curtains) from an English zero-plural (Angelfish). Evidence,
   never a verdict — the native rules on it. */
function enPluralEvidence(key, en, vocab) {
  const s = en && en[0] ? String(en[0]) : '';
  const sameShape = !!(en && en[0] === en[1]);
  /* a sister key whose PLURAL equals this key's SINGULAR is the strongest
     signal that this row is the plural of that one (curtain -> Curtains) */
  let sister = null;
  for (const [k2, row2] of Object.entries(vocab)) {
    if (k2 === key || !row2.en) continue;
    if (row2.en[1] === s && row2.en[0] !== s) { sister = k2; break; }
  }
  return {
    en_same_shape: sameShape,
    en_looks_plural: /(?:[^s]s|es)$/i.test(s) && !/(?:ss|us|is)$/i.test(s),
    sister_singular_key: sister,          /* e.g. curtains -> "curtain" */
  };
}

function main() {
  const vocab = loadVocab();
  const raw = JSON.parse(fs.readFileSync(RAW, 'utf8'));
  const themes = themesOnDisk();
  if (!themes.ok) console.log('  ⚠ image themes unreadable (' + themes.err + ') — themes will be empty');

  const rows = [];
  const stats = { total: 0, orphan_no_raw: 0, no_image: 0, en_same_shape: 0, has_sister: 0 };

  for (const key of Object.keys(vocab)) {
    const row = vocab[key];
    const r = raw[key] || null;
    const onDisk = themes.map[key] ? Array.from(themes.map[key]).sort() : [];
    const ev = enPluralEvidence(key, row.en, vocab);

    stats.total++;
    if (!r) stats.orphan_no_raw++;
    if (!onDisk.length) stats.no_image++;
    if (ev.en_same_shape) stats.en_same_shape++;
    if (ev.sister_singular_key) stats.has_sister++;

    /* the current data, per locale, so the native sees what is there now */
    const cur = {};
    for (const l of LOCALES) if (row[l]) cur[l] = { s: row[l][0], p: row[l][1], g: row[l].length > 2 ? row[l][2] : null, arity: row[l].length };

    rows.push({
      key,
      en: row.en || null,
      themes_on_disk: onDisk,                 /* WHAT THE PICTURE IS — load-bearing */
      themes_raw: r ? (r._themes || []) : [],
      no_image: onDisk.length === 0,          /* dead data: ~50 keys reach no child */
      evidence: ev,
      /* HYPOTHESIS ONLY — raw._type is demonstrably wrong (chess/football
         are nouns). The native confirms or overturns; an overturn is a
         finding worth recording. */
      hypothesis: {
        raw_type: r ? (r._type || null) : null,
        raw_countable: r ? (r._countable === undefined ? null : r._countable) : null,
        note: r ? null : 'ORPHAN: no raw metadata, _type unknown — needs a hand call',
      },
      cur,
    });
  }

  rows.sort((a, b) => (a.key < b.key ? -1 : 1));
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'classification-dossier.json'),
    JSON.stringify({ v: 1, built_for: 'one classification per key, applied to all 11 locales', rows }, null, 1) + '\n');

  console.log('classification dossier: ' + stats.total + ' keys');
  console.log('   ' + stats.orphan_no_raw + ' orphans with NO raw _type (need a hand call)');
  console.log('   ' + stats.no_image + ' with no image on disk (dead data — corrections there reach no child)');
  console.log('   ' + stats.en_same_shape + ' where en[0]===en[1]  ← the AMBIGUOUS set:');
  console.log('        plural picture / mass / non-noun / EN zero-plural are NOT the same thing');
  console.log('   ' + stats.has_sister + ' whose en singular equals another key\'s en plural (plural-picture candidates)');
  console.log('\n→ docs/audit-results/vocab-audit/classification-dossier.json');
  console.log('  (evidence + hypothesis only — every key still goes to a native)');
}
main();
