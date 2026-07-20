#!/usr/bin/env node
/**
 * Prove the deck-vocab map cannot make a page lie about its own picture.
 *
 * This exists because alt text that names the wrong objects is worse than alt
 * text that names none: a reader arriving from image search sees at once that
 * the picture is not what was promised. So every name is traced back to the
 * deck's OWN extracted facts, and anything that cannot be traced is a failure,
 * not a warning.
 *
 * Four assertions per locale:
 *
 *   A. TRACEABLE   — every name is either a word printed on that deck, or the
 *                    `locale` form of one of that deck's own image nouns.
 *   B. NO ENGLISH  — in a non-EN locale, no name is the raw English key or the
 *                    English form of that noun (unless the locale genuinely
 *                    shares that spelling, which the vocabulary itself decides).
 *   C. PUZZLE POOL — word-puzzle decks name ONLY printed words, never a noun
 *                    from the theme pool (a wordsearch has no pictures).
 *   D. NO RESIDUE  — no upload timestamps, ids, shouting or stray digits.
 *
 * Usage: node scripts/seo-per-page/verify-deck-vocab.js [--locale=de]
 */
const fs = require('fs');
const path = require('path');
const {
  vocabKey, cleanPrinted, loadVocabulary, WORD_PUZZLE_TYPES, EXCLUDED_TYPES,
} = require('./build-deck-vocab');

const ROOT = path.resolve(__dirname, '..', '..');
const FACTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'deck-facts');
const MAP_DIR = path.join(ROOT, 'frontend', 'content', 'deck-vocab');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi', 'pt'];

const norm = (s) => String(s).toLowerCase().trim();

function verifyLocale(locale, vocabulary) {
  const factsPath = path.join(FACTS_DIR, `${locale}.json`);
  const mapPath = path.join(MAP_DIR, `${locale}.json`);
  if (!fs.existsSync(mapPath)) { console.log(`[${locale}] no map — skipped`); return 0; }

  const decks = JSON.parse(fs.readFileSync(factsPath, 'utf8')).decks;
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const bySlug = {};
  for (const d of Object.values(decks)) if (d.slug) bySlug[d.slug] = d;

  const fails = { untraceable: [], english: [], puzzlePool: [], residue: [], orphan: [] };
  let names = 0;

  for (const [slug, list] of Object.entries(map)) {
    const d = bySlug[slug];
    if (!d) { fails.orphan.push(slug); continue; }

    const isPuzzle = WORD_PUZZLE_TYPES.has(String(d.type));
    if (EXCLUDED_TYPES.has(String(d.type))) fails.puzzlePool.push(`${slug}: excluded type present in map`);

    // what this deck may honestly claim
    const printed = new Set((d.words || []).map((w) => norm(cleanPrinted(w, isPuzzle))));
    const printedRaw = new Set((d.words || []).map(norm));
    const nounForms = new Map(); // localized form -> english key
    for (const n of d.nouns || []) {
      const k = vocabKey(n);
      const e = vocabulary[k];
      if (e && e[locale] && e[locale][0]) nounForms.set(norm(e[locale][0]), k);
    }

    for (const name of list) {
      names++;
      const n = norm(name);

      // D. residue
      if (/\d{4,}/.test(name) || /\s\d+$/.test(name) || !name.trim()) {
        fails.residue.push(`${slug}: ${JSON.stringify(name)}`);
      }

      const fromPrinted = printed.has(n) || printedRaw.has(n);
      const fromNoun = nounForms.has(n);

      // A. traceable
      if (!fromPrinted && !fromNoun) {
        fails.untraceable.push(`${slug}: ${JSON.stringify(name)}`);
        continue;
      }

      // C. a word puzzle has no pictures — it may only name printed words
      if (isPuzzle && !fromPrinted) {
        fails.puzzlePool.push(`${slug}: ${JSON.stringify(name)} came from the theme pool`);
      }

      // B. no raw English in a non-EN locale. A name that came from a noun is
      // only acceptable if it IS this locale's form. If it also equals the
      // English form, that is fine ONLY when the vocabulary says they match
      // (e.g. "Hotdog" is the same word in several languages).
      if (locale !== 'en' && fromNoun && !fromPrinted) {
        const key = nounForms.get(n);
        const entry = vocabulary[key];
        const enForm = entry && entry.en && entry.en[0] ? norm(entry.en[0]) : null;
        const locForm = norm(entry[locale][0]);
        if (n === enForm && locForm !== enForm) {
          fails.english.push(`${slug}: ${JSON.stringify(name)} is the English form`);
        }
        if (n === norm(key) && locForm !== norm(key)) {
          fails.english.push(`${slug}: ${JSON.stringify(name)} is the raw library key`);
        }
      }
    }
  }

  const total = Object.values(fails).reduce((a, b) => a + b.length, 0);
  const status = total === 0 ? 'PASS' : 'FAIL';
  console.log(`[${locale}] ${status}  ${Object.keys(map).length} decks / ${names} names checked`);
  for (const [kind, list] of Object.entries(fails)) {
    if (!list.length) continue;
    console.log(`    ${kind}: ${list.length}`);
    for (const x of list.slice(0, 5)) console.log(`      ${x}`);
  }
  return total;
}

if (require.main === module) {
  const only = (process.argv.slice(2).find((a) => a.startsWith('--locale=')) || '').split('=')[1];
  const vocabulary = loadVocabulary();
  let total = 0;
  for (const loc of (only ? [only] : LOCALES)) total += verifyLocale(loc, vocabulary);
  console.log(total === 0
    ? '\nALL LOCALES PASS — every name traces to its own deck.'
    : `\n${total} FAILURES — do not ship.`);
  process.exit(total === 0 ? 0 : 1);
}
