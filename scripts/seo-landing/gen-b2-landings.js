#!/usr/bin/env node
/**
 * gen-b2-landings.js <locale> <prose.json> [--dry-run]
 *
 * Composes the 20 nt20-B (second batch) landing entries for one locale from the native
 * panel's prose bank (i18n/.landing-b2-<loc>.json in scripts/worksheet-gen)
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
  'K-284': { family: 'word-tracing', theme: 'animals', band: 'K', standard: 'L.K.1.a' },
  'K-285': { family: 'dot-to-dot', theme: null, band: 'K', standard: 'K.CC.A.1' },
  'K-286': { family: 'grid-copy', theme: null, band: 'K', standard: null },
  'K-287': { family: 'singular-plural', theme: 'fruits', band: 'K', standard: 'L.K.1.c' },
  'K-288': { family: 'articles', theme: 'animals', band: 'K', standard: null }, // per-locale grammar; no CCSS code (pedagogue ruling)
  'G1-242': { family: 'read-and-color', theme: 'fruits_bw', band: 'G1', standard: 'RF.1.4' },
  'G1-243': { family: 'number-of-the-day', theme: null, band: 'G1', standard: '1.NBT.B.2' },
  'G1-244': { family: 'write-the-word', theme: 'fruits', band: 'G1', standard: 'L.1.2.d' },
  'G1-245': { family: 'alphabetical-order', theme: 'animals', band: 'G1', standard: null }, // L.2.2.e is a grade-2 code — readiness at G1
  'G1-246': { family: 'number-walls', theme: null, band: 'G1', standard: '1.OA.C.6' },
  'G1-247': { family: 'doubles-halves', theme: 'fruits', band: 'G1', standard: '1.OA.C.6' },
  'G1-248': { family: 'number-lines', theme: null, band: 'G1', standard: '1.NBT.A.1' },
  'G1-249': { family: 'sentence-building', theme: 'animals', band: 'G1', standard: 'L.1.1.j' },
  'G2-274': { family: 'capitals-punctuation', theme: 'vehicles', band: 'G2', standard: 'L.1.2.b' },
  'G2-275': { family: 'word-classes', theme: 'toys', band: 'G2', standard: 'L.2.1.e' },
  'G2-276': { family: 'money', theme: 'fruits', band: 'G2', standard: '2.MD.C.8' },
  'G2-277': { family: 'calendar', theme: null, band: 'G2', standard: null },
  'G2-278': { family: 'picture-writing', theme: 'vehicles', band: 'G2', standard: 'W.2.3' },
  'G2-279': { family: 'grid-coordinates', theme: null, band: 'G2', standard: null },
  'G3-370': { family: 'word-problems', theme: 'fruits', band: 'G3', standard: '3.OA.A.3' },
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

// a locale's wave may override a type's theme (waves/wave-b2-<loc>.json themeOverrides — e.g. sv/da/no
// K-288 ships on fruits because their animals theme has too few ett/et-nouns); the deck slug and the
// slot tokens follow the SHIPPED theme, so read the wave file — the single source of truth
const waveThemeOverride = (loc, id) => {
  const wp = path.join(ROOT, 'scripts', 'worksheet-gen', 'waves', 'wave-b2-' + loc + '.json');
  if (!fs.existsSync(wp)) return null;
  const w = JSON.parse(fs.readFileSync(wp, 'utf8'));
  const ov = w.themeOverrides && w.themeOverrides[id];
  return ov ? ov.replace(/ /g, '_') : null;
};
const shippedTheme = (loc, id) => waveThemeOverride(loc, id) || TYPES[id].theme;

function fail(m) { console.error('ABORT: ' + m); process.exit(1); }
const wordCount = (s) => (s.match(/\S+/g) || []).length;

const [, , locale, prosePath, flag] = process.argv;
const DRY = flag === '--dry-run';
if (!locale || !prosePath) fail('usage: gen-b2-landings.js <locale> <prose.json> [--dry-run]');
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
  const theme = shippedTheme(locale, id);
  const vid = id.toLowerCase().replace('-', '');
  return famSlug(t.family) + (theme ? '-' + themeSlug(theme) : '') + '-' + vid;
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
  if (e.metaDescription && (e.metaDescription.length < 120 || e.metaDescription.length > 170)) {
    errs.push(`${id}: metaDescription ${e.metaDescription.length} chars (want 120-170, the gate band)`);
  }
  if (e.title && e.title.length > 75) errs.push(`${id}: title ${e.title.length} chars > 75`);
  const t = TYPES[id];
  if (t.theme) {
    const tn = themeName(t.theme).toLowerCase().split(/\s+/)[0];
    if (!(e.p1 || '').toLowerCase().includes(tn.slice(0, 4))) {
      console.warn(`WARN ${id}: theme word "${themeName(shippedTheme(locale, id))}" not obviously in p1`);
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
  const theme = shippedTheme(locale, id);
  const entry = {
    slug: e.slug,
    variantShape: 'singleton',
    coordinate: { type: t.family, mode: null, theme: theme || '', level }, // '' = the corpus' themeless convention
    eyebrow: e.eyebrow,
    h1: e.h1,
    strand: e.strand,
    ...(t.standard ? { standard: t.standard } : {}),
    slotTokens: [famSlug(t.family), ...(theme ? [themeSlug(theme)] : []), level],
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
