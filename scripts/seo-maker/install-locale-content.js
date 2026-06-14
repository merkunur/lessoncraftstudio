#!/usr/bin/env node
/**
 * install-locale-content.js — merge staged maker content into the live
 * maker-content/<locale>.json files, with validation (SEO RESCUE Phase 1b).
 *
 * Pilot locales (already have 6 live pilot entries + labels): staging holds the
 * 27 NEW makers → merge into 33 + keep existing labels.
 * New locales (no file yet): staging holds all 33 + a labels block → install.
 *
 * Validates: 33 maker keys present, each slug === maker-slugs.json[key][loc],
 * required prose arrays present, labels complete (launchCta keeps {name}).
 * Aborts (writes nothing) if any locale fails.
 */
const fs = require('fs');
const path = require('path');

const MC = path.join(__dirname, '..', '..', 'frontend', 'messages', 'maker-content');
const STAGE = path.join(__dirname, 'staging');
const SLUGS = JSON.parse(fs.readFileSync(path.join(__dirname, 'maker-slugs.json'), 'utf8'));

const ORDER = [
  'addition', 'subtraction', 'code-addition', 'more-less', 'math-puzzle', 'math-worksheet',
  'alphabet-train', 'prepositions', 'word-guess', 'word-scramble', 'wordsearch', 'cryptogram', 'writing',
  'big-small', 'pattern-train', 'pattern-worksheet', 'draw-and-color', 'drawing-lines', 'coloring', 'chart-count',
  'matching', 'grid-match', 'shadow-match', 'bingo', 'picture-sort',
  'missing-pieces', 'odd-one-out', 'sudoku', 'picture-path',
  'find-and-count', 'find-objects', 'crossword', 'treasure-hunt',
];
const PILOT = ['cryptogram', 'wordsearch', 'sudoku', 'crossword', 'find-objects', 'word-guess'];
const PILOT_LOCALES = ['de', 'es', 'it', 'nl', 'sv'];
const NEW_LOCALES = ['fr', 'pt', 'da', 'no', 'fi'];
const LABEL_KEYS = ['about', 'howToUse', 'classroomIdeas', 'launchCta', 'otherLanguages', 'relatedMakers', 'makersBreadcrumb'];

function validate(loc, obj, errs) {
  for (const k of ORDER) {
    const e = obj[k];
    if (!e) { errs.push(`${loc}: missing key ${k}`); continue; }
    const want = SLUGS[k][loc];
    if (e.slug !== want) errs.push(`${loc}.${k}: slug "${e.slug}" !== "${want}"`);
    for (const f of ['name', 'tagline', 'metaTitle', 'metaDescription']) {
      if (typeof e[f] !== 'string' || !e[f]) errs.push(`${loc}.${k}: bad ${f}`);
    }
    for (const f of ['about', 'howToUse', 'classroomIdeas']) {
      if (!Array.isArray(e[f]) || e[f].length === 0) errs.push(`${loc}.${k}: bad ${f}`);
    }
  }
  const L = obj.labels;
  if (!L) { errs.push(`${loc}: missing labels`); return; }
  for (const lk of LABEL_KEYS) if (typeof L[lk] !== 'string' || !L[lk]) errs.push(`${loc}: label ${lk} bad`);
  if (L.launchCta && !L.launchCta.includes('{name}')) errs.push(`${loc}: launchCta missing {name} token`);
}

const built = {};
const errs = [];

for (const loc of PILOT_LOCALES) {
  const existing = JSON.parse(fs.readFileSync(path.join(MC, `${loc}.json`), 'utf8'));
  const staged = JSON.parse(fs.readFileSync(path.join(STAGE, `${loc}.json`), 'utf8'));
  const out = {};
  for (const k of ORDER) out[k] = PILOT.includes(k) ? existing[k] : staged[k];
  out.labels = existing.labels;
  validate(loc, out, errs);
  built[loc] = out;
}

for (const loc of NEW_LOCALES) {
  const staged = JSON.parse(fs.readFileSync(path.join(STAGE, `${loc}.json`), 'utf8'));
  const out = {};
  for (const k of ORDER) out[k] = staged[k];
  out.labels = staged.labels;
  validate(loc, out, errs);
  built[loc] = out;
}

if (errs.length) {
  console.error(`VALIDATION FAILED (${errs.length}) — nothing written:`);
  errs.slice(0, 40).forEach((e) => console.error('  - ' + e));
  process.exit(1);
}

for (const [loc, out] of Object.entries(built)) {
  fs.writeFileSync(path.join(MC, `${loc}.json`), JSON.stringify(out, null, 2) + '\n');
  console.log(`wrote ${loc}.json — 33 makers + labels`);
}
console.log('\nAll 10 locale files installed + validated. (en.json already merged.)');
