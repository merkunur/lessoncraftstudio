#!/usr/bin/env node
/**
 * audit-hero-copy.js — the homepage hero's copy laws, as a browser-free gate.
 *
 * Reads `homepageV6.hero` in every locale file and asserts:
 *   (a) KEY PARITY — every locale carries exactly EN's key set, and none of
 *       the retired keys (sub / microLine / countsLine / ctaTools) survives
 *       anywhere. A retired key is stale copy in a slot nobody renders.
 *   (b) DIGITS — the marketing surface carries NO numerals (the v9.1
 *       no-counts law), with ONE operator-scoped exception: `pillar1Count`,
 *       the size of the worksheet library, which must be the 40 000 figure
 *       written in the locale's own way ("40,000+", "40.000+", "40 000+",
 *       "Über 40.000", "Plus de 40 000", "Yli 40 000"...). Exactly five
 *       digit characters, and they spell 40000.
 *   (c) PRICE WORDS — nothing is free (limited trial only): no free / gratis /
 *       kostenlos / gratuit / ilmainen ... in any hero key, matched with
 *       Unicode-aware word boundaries (never \b, which is ASCII-only).
 *   (d) PLACEHOLDERS — no {count} / {tools} ICU params (mirrors the
 *       de-numbering pass).
 *   (e) NON-VACUITY — at least MIN_KEYS keys read per locale, else the run
 *       is INCONCLUSIVE, never a silent PASS.
 *
 * Usage:
 *   node scripts/audit-hero-copy.js               # gate
 *   node scripts/audit-hero-copy.js --poison=<m>  # prove it can fail
 *     modes: digit | free | stale | figure | parity   (must FAIL)
 *            figure-ok | pedagogy                     (must PASS)
 * Exit 1 on any failure (or when a must-FAIL poison passes).
 */
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MESSAGES = path.join(__dirname, '..', 'frontend', 'messages');
const COUNT_KEY = 'pillar1Count';
const RETIRED = ['sub', 'microLine', 'countsLine', 'ctaTools'];
const MIN_KEYS = 12;
/* Digit-bearing tokens that are NAMES, not counts, and have no digit-free
   form a native would write: fr "CE2" (cours élémentaire 2e année) is the
   only natural term for the top of the K-3 band. Listed per locale, per key,
   so the exemption cannot widen silently. */
const NAME_TOKENS = { fr: { scope: ['CE2'] } };

/* Unicode-aware whole-word match: (?<!\p{L})word(?!\p{L}). `\b` is ASCII-only
   and can never match after "ä" or before "é". Stems carry a trailing \p{L}*
   where the language inflects (kostenlos/kostenlose/kostenloser…). */
const PRICE_WORDS = [
  'free',
  'kostenlos\\p{L}*', 'kostenfrei\\p{L}*', 'umsonst',
  'gratuit\\p{L}*',
  'gratis', 'grátis', 'gratuit[oa]s?',
  'kosteloos', 'kostnadsfri\\p{L}*',
  'ilmai\\p{L}*', 'maksut\\p{L}*',
];
const PRICE_RE = new RegExp('(?<!\\p{L})(?:' + PRICE_WORDS.join('|') + ')(?!\\p{L})', 'iu');
/* Pedagogical "free" is not a price claim and must PASS: de "frei erkunden",
   sv "utforska fritt", fr "en toute liberté". The word list above deliberately
   omits the bare de/sv/no/da "frei/fritt/fri" and fr "libre" stems for that
   reason; "free" itself is English-only. */

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/);
  return m ? [m[1], m[2] ?? true] : [a, true];
}));
const POISON = typeof args.poison === 'string' ? args.poison : null;

function readHero(locale) {
  const file = path.join(MESSAGES, `${locale}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  const hero = json.homepageV6 && json.homepageV6.hero;
  if (!hero || typeof hero !== 'object') return null;
  return { ...hero };
}

function digitsOf(s) {
  return (s.match(/\p{Nd}/gu) || []).join('');
}

const heroes = {};
for (const loc of LOCALES) heroes[loc] = readHero(loc);

/* ── poison: mutate IN MEMORY only ── */
if (POISON) {
  const p = POISON;
  if (p === 'digit') heroes.de.pillar3Gloss = '24 Generatoren für die Klasse';
  else if (p === 'free') heroes.en.scope = 'Free to start, for preschool to third grade.';
  else if (p === 'stale') heroes.fi.microLine = 'Ilmaiseksi alkuun';
  else if (p === 'figure') heroes.fr[COUNT_KEY] = '45 309+';
  else if (p === 'parity') delete heroes.sv.pillar2Gloss;
  else if (p === 'figure-ok') heroes.de[COUNT_KEY] = 'Über 40.000';
  else if (p === 'pedagogy') heroes.de.pillar3Gloss = 'Zum freien Erkunden an der Tafel.';
  else { console.error(`unknown poison mode "${p}"`); process.exit(2); }
  console.log(`[POISONED: ${p}]`);
}

let failed = false;
let inconclusive = false;
const failedLocales = new Set();
/* The locale each poison mode mutates — its verdict is judged on THAT locale
   alone, so an unrelated locale mid-authoring cannot mask a vacuous gate or
   fake a too-wide ban. */
const POISON_LOCALE = { digit: 'de', free: 'en', stale: 'fi', figure: 'fr', parity: 'sv', 'figure-ok': 'de', pedagogy: 'de' };
const enKeys = heroes.en ? Object.keys(heroes.en).sort() : [];

for (const loc of LOCALES) {
  const hero = heroes[loc];
  const notes = [];
  if (!hero) { console.log(`  ${loc}  FAIL  homepageV6.hero missing`); failed = true; continue; }
  const keys = Object.keys(hero);
  if (keys.length < MIN_KEYS) { notes.push(`only ${keys.length} keys read (<${MIN_KEYS}) — INCONCLUSIVE`); inconclusive = true; }

  // (a) parity + retired
  const mine = keys.slice().sort();
  const missing = enKeys.filter((k) => !mine.includes(k));
  const extra = mine.filter((k) => !enKeys.includes(k));
  if (missing.length) notes.push(`missing keys: ${missing.join(', ')}`);
  if (extra.length) notes.push(`extra keys: ${extra.join(', ')}`);
  const stale = keys.filter((k) => RETIRED.includes(k));
  if (stale.length) notes.push(`retired keys still present: ${stale.join(', ')}`);

  for (const [k, v] of Object.entries(hero)) {
    if (typeof v !== 'string') { notes.push(`${k}: not a string`); continue; }
    // (b) digits
    const exempt = (NAME_TOKENS[loc] && NAME_TOKENS[loc][k]) || [];
    const d = digitsOf(exempt.reduce((s, tok) => s.split(tok).join(''), v));
    if (k === COUNT_KEY) {
      if (d !== '40000') notes.push(`${k}: figure must be 40000, got "${v}"`);
      if (!/\+|\p{L}/u.test(v)) notes.push(`${k}: needs a "+" or an "over/more than" word — "${v}" reads as an exact count`);
    } else if (d.length) {
      notes.push(`${k}: digit in marketing copy — "${v}"`);
    }
    // (c) price words
    const hit = v.match(PRICE_RE);
    if (hit) notes.push(`${k}: price word "${hit[0]}" — nothing is free`);
    // (d) placeholders
    if (/\{count\}|\{tools\}/.test(v)) notes.push(`${k}: ICU count placeholder survives`);
  }

  const ok = notes.length === 0;
  if (!ok) { failed = true; failedLocales.add(loc); }
  console.log(`  ${loc}  ${ok ? 'PASS' : 'FAIL'}  ${keys.length} keys${notes.length ? '  · ' + notes.join(' · ') : ''}`);
}

const MUST_FAIL = ['digit', 'free', 'stale', 'figure', 'parity'];
const MUST_PASS = ['figure-ok', 'pedagogy'];
if (POISON) {
  const target = POISON_LOCALE[POISON];
  const targetFailed = failedLocales.has(target);
  if (MUST_FAIL.includes(POISON)) {
    console.log(targetFailed ? `\nPOISON OK: mode "${POISON}" was caught on ${target}.` : `\nPOISON MISSED: mode "${POISON}" passed on ${target} — the gate is vacuous here.`);
    process.exit(targetFailed ? 0 : 1);
  }
  if (MUST_PASS.includes(POISON)) {
    console.log(!targetFailed ? `\nPOISON OK: mode "${POISON}" correctly passes on ${target} (the ban is not too wide).` : `\nPOISON MISSED: mode "${POISON}" was rejected on ${target} — the ban is too wide.`);
    process.exit(!targetFailed ? 0 : 1);
  }
}
if (inconclusive) { console.log('\nINCONCLUSIVE: too few keys read in at least one locale.'); process.exit(1); }
console.log(failed ? '\nFAIL: hero copy breaks a law above.' : `\nPASS: ${LOCALES.length} locales · one numeral (${COUNT_KEY}) · no price words · key parity.`);
process.exit(failed ? 1 : 0);
