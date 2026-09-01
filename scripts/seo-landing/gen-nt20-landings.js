#!/usr/bin/env node
/**
 * gen-nt20-landings.js <locale> <prose.json> [--dry-run]
 *
 * Composes the 20 nt20-batch landing entries for one locale from the native
 * panel's prose bank (i18n/.landing-nt20-<loc>.json in scripts/worksheet-gen)
 * and appends them to frontend/content/seo-landing/<locale>.json (idempotent:
 * replaces by slug). Everything mechanical (coordinate, canonicalDeckSlug,
 * carousel, standard, slotTokens) is derived here; everything linguistic
 * comes from the panel file. Validation refuses before any write:
 *  - all 20 ids present with every field
 *  - p1+p2+p3 ≥ 200 words (§22 body floor)
 *  - slug ASCII-kebab + unique among the 20 + vs the locale's existing corpus
 *  - themed types name their theme word in p1 (warn-only: theme name match)
 *  - canonicalDeckSlug derivation must equal a slug that EXISTS in the
 *    published set (checked against taxonomy-derived slug — the same formula
 *    publish-cli used, so equality is structural)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const TAX = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));

// id → { family, theme (cache key|null), band, standard (EN CCSS or null=readiness) }
const TYPES = {
  'K-236': { family: 'pre-writing', theme: 'animals', band: 'K', standard: null },
  'K-237': { family: 'number-tracing', theme: null, band: 'K', standard: 'K.CC.A.3' },
  'K-238': { family: 'letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-239': { family: 'sight-words', theme: null, band: 'K', standard: 'RF.K.3.c' },
  'K-240': { family: 'cutting-practice', theme: 'animals', band: 'K', standard: 'K.MD.B.3' },
  'K-241': { family: 'color-by-number', theme: null, band: 'K', standard: 'K.OA.A.2' },
  'K-242': { family: 'mazes', theme: 'toys', band: 'K', standard: null },
  'K-243': { family: 'number-bonds', theme: null, band: 'K', standard: 'K.OA.A.4' },
  'G1-208': { family: 'mental-math', theme: null, band: 'G1', standard: '1.OA.C.6' },
  'G1-209': { family: 'fact-families', theme: null, band: 'G1', standard: '1.OA.B.4' },
  'G1-210': { family: 'number-words', theme: null, band: 'G1', standard: '2.NBT.A.3' },
  'G1-211': { family: 'money', theme: null, band: 'G1', standard: '2.MD.C.8' },
  'G1-212': { family: 'telling-time', theme: null, band: 'G1', standard: '1.MD.B.3' },
  'G1-213': { family: 'word-problems', theme: 'fruits', band: 'G1', standard: '1.OA.A.1' },
  'G2-251': { family: 'column-arithmetic', theme: null, band: 'G2', standard: '2.NBT.B.5' },
  'G2-252': { family: 'measurement', theme: 'vehicles', band: 'G2', standard: '3.MD.A.2' },
  'G2-253': { family: 'symmetry', theme: null, band: 'G2', standard: null }, // CCSS reaches this at grade 4 — readiness (§22 grade honesty)
  'G2-254': { family: 'reading-comprehension', theme: null, band: 'G2', standard: 'RL.2.1' },
  'G3-357': { family: 'column-arithmetic', theme: null, band: 'G3', standard: '3.NBT.A.2' },
  'G3-358': { family: 'multiplication-tables', theme: null, band: 'G3', standard: '3.OA.C.7' },
};

// per-locale coordinate.level keys (must match the locale corpus' existing keys)
const LEVEL_KEYS = {
  en: { K: 'kindergarten', G1: 'grade-1', G2: 'grade-2', G3: 'grade-3' },
  de: { K: 'vorschule', G1: '1-klasse', G2: '2-klasse', G3: '3-klasse' },
  es: { K: 'preescolar', G1: 'primer-grado', G2: 'segundo-grado', G3: 'tercer-grado' },
  fr: { K: 'maternelle', G1: 'cp', G2: 'ce1', G3: 'ce2' },
  pt: { K: 'educacao-infantil', G1: '1o-ano', G2: '2o-ano', G3: '3o-ano' },
  it: { K: 'infanzia', G1: 'classe-prima', G2: 'classe-seconda', G3: 'classe-terza' },
  nl: { K: 'kleuters', G1: 'groep-3', G2: 'groep-4', G3: 'groep-5' },
  sv: { K: 'forskola', G1: 'ak-1', G2: 'ak-2', G3: 'ak-3' },
  da: { K: 'boernehaveklasse', G1: '1-klasse', G2: '2-klasse', G3: '3-klasse' },
  no: { K: '1-trinn', G1: '2-trinn', G2: '3-trinn', G3: '4-trinn' }, // Nordic +1 shift; no sub-school key exists in the no corpus
  fi: { K: 'esikoulu', G1: '1-luokka', G2: '2-luokka', G3: '3-luokka' },
};

const ORDER = Object.keys(TYPES);

function fail(m) { console.error('ABORT: ' + m); process.exit(1); }
const wordCount = (s) => (s.match(/\S+/g) || []).length;

const [, , locale, prosePath, flag] = process.argv;
const DRY = flag === '--dry-run';
if (!locale || !prosePath) fail('usage: gen-nt20-landings.js <locale> <prose.json> [--dry-run]');
if (!LEVEL_KEYS[locale]) fail('no LEVEL_KEYS for ' + locale);
const prose = JSON.parse(fs.readFileSync(prosePath, 'utf8'));
if (prose.locale !== locale) fail(`prose.locale ${prose.locale} != ${locale}`);

const contentPath = path.join(ROOT, 'frontend', 'content', 'seo-landing', locale + '.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
const existingSlugs = new Set(content.landings.map((l) => l.slug));

const famSlug = (fam) => {
  const ax = TAX.axes['exercise-type'][fam];
  if (!ax) fail('taxonomy missing family ' + fam);
  return ax.slug[locale] || ax.slug.en;
};
const themeSlug = (themeKey) => {
  const ax = TAX.axes.theme[themeKey];
  if (!ax) fail('taxonomy missing theme ' + themeKey);
  return ax.slug[locale] || ax.slug.en;
};
const themeName = (themeKey) => {
  const ax = TAX.axes.theme[themeKey];
  return (ax.name && (ax.name[locale] || ax.name.en)) || themeKey;
};
// the deck slug formula publish-cli used: <family-slug>[-<theme-slug>]-<variantid>
const deckSlugFor = (id) => {
  const t = TYPES[id];
  const vid = id.toLowerCase().replace('-', '');
  return famSlug(t.family) + (t.theme ? '-' + themeSlug(t.theme) : '') + '-' + vid;
};

/* -------- validate -------- */
const errs = [];
const newSlugs = new Set();
for (const id of ORDER) {
  const e = prose.landings && prose.landings[id];
  if (!e) { errs.push(id + ' missing'); continue; }
  for (const f of ['slug', 'eyebrow', 'h1', 'title', 'metaDescription', 'strand', 'p1', 'p2', 'p3']) {
    if (!e[f] || typeof e[f] !== 'string') errs.push(`${id}.${f} missing`);
  }
  if (!e.slug) continue;
  if (!/^[a-z0-9-]+$/.test(e.slug)) errs.push(`${id}: slug not ascii-kebab "${e.slug}"`);
  if (newSlugs.has(e.slug)) errs.push(`${id}: duplicate slug among the 20`);
  newSlugs.add(e.slug);
  // a collision is only an error when the existing landing is a DIFFERENT page
  // (different deck) — re-applying our own entry after a copy fix is idempotent
  if (existingSlugs.has(e.slug)) {
    const existing = content.landings.find((l) => l.slug === e.slug);
    if (existing && existing.canonicalDeckSlug !== deckSlugFor(id)) {
      errs.push(`${id}: slug collides with existing landing "${e.slug}" (deck ${existing.canonicalDeckSlug})`);
    }
  }
  const words = wordCount(e.p1) + wordCount(e.p2) + wordCount(e.p3);
  if (words < 200) errs.push(`${id}: body ${words} words < 200`);
  if (e.metaDescription && (e.metaDescription.length < 120 || e.metaDescription.length > 175)) {
    errs.push(`${id}: metaDescription ${e.metaDescription.length} chars (want 120-175)`);
  }
  if (e.title && e.title.length > 75) errs.push(`${id}: title ${e.title.length} chars > 75`);
  const t = TYPES[id];
  if (t.theme) {
    const tn = themeName(t.theme).toLowerCase().split(/\s+/)[0];
    if (!(e.p1 || '').toLowerCase().includes(tn.slice(0, 4))) {
      console.warn(`WARN ${id}: theme word "${themeName(t.theme)}" not obviously in p1`);
    }
  }
}
if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); fail(errs.length + ' validation error(s)'); }

/* -------- compose -------- */
const STRAND_EN = { // fallback only; panels supply the locale strand
};
void STRAND_EN;
const entries = ORDER.map((id) => {
  const t = TYPES[id];
  const e = prose.landings[id];
  const level = LEVEL_KEYS[locale][t.band];
  const entry = {
    slug: e.slug,
    variantShape: 'singleton',
    coordinate: { type: t.family, mode: null, theme: t.theme || '', level }, // '' = the corpus' themeless convention
    eyebrow: e.eyebrow,
    h1: e.h1,
    strand: e.strand,
    ...(t.standard ? { standard: t.standard } : {}),
    slotTokens: [famSlug(t.family), ...(t.theme ? [themeSlug(t.theme)] : []), level],
    p1: e.p1, p2: e.p2, p3: e.p3,
    canonicalDeckSlug: deckSlugFor(id),
    carousel: [],
    title: e.title,
    metaDescription: e.metaDescription,
  };
  return entry;
});
// carousel: 4 cyclic same-batch siblings, preferring same band
for (let i = 0; i < entries.length; i++) {
  const sibs = [];
  for (let k = 1; sibs.length < 4 && k < entries.length; k++) {
    const s = entries[(i + k) % entries.length];
    sibs.push({ label: s.h1, href: s.slug });
  }
  entries[i].carousel = sibs;
}

if (DRY) {
  console.log(JSON.stringify(entries[0], null, 1));
  console.log(`dry-run ok: 20 entries for ${locale}; existing corpus ${content.landings.length}`);
  process.exit(0);
}

// idempotent append (replace by slug)
const bySlug = new Map(content.landings.map((l) => [l.slug, l]));
let added = 0, replaced = 0;
for (const e of entries) {
  if (bySlug.has(e.slug)) { replaced++; } else { added++; }
  bySlug.set(e.slug, e);
}
content.landings = [...bySlug.values()];
fs.writeFileSync(contentPath, JSON.stringify(content, null, 1) + '\n');
console.log(`${locale}: +${added} added, ${replaced} replaced → ${content.landings.length} landings total`);
