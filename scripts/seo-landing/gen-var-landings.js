#!/usr/bin/env node
/**
 * gen-var-landings.js <locale> <prose.json> [--dry-run]
 *
 * nt20-VAR tier-1 landing composer — clone of gen-nt20-landings.js for the
 * 26 highest-query-value variation types (times tables ×5, number tracing ×5,
 * letter tracing ×5, classic color-by-number, regrouping ×5, reading ×5).
 * Mechanical fields derived here; prose from the native panel bank
 * (i18n/.landing-var-<loc>.json). Same validation as the nt20 composer.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const TAX = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));

// id → { family, theme, band, standard } — tier-1 set (all themeless)
const TYPES = {
  'K-249': { family: 'number-tracing', theme: null, band: 'K', standard: 'K.CC.A.3' },
  'K-250': { family: 'number-tracing', theme: null, band: 'K', standard: 'K.CC.A.3' },
  'K-251': { family: 'number-tracing', theme: null, band: 'K', standard: 'K.CC.A.3' },
  'K-252': { family: 'number-tracing', theme: null, band: 'K', standard: 'K.CC.A.3' },
  'K-253': { family: 'number-tracing', theme: null, band: 'K', standard: 'K.CC.A.3' },
  'K-254': { family: 'letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-255': { family: 'letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-256': { family: 'letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-257': { family: 'letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-258': { family: 'letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-266': { family: 'color-by-number', theme: null, band: 'K', standard: null },
  'G2-269': { family: 'reading-comprehension', theme: null, band: 'G2', standard: 'RL.2.1' },
  'G2-270': { family: 'reading-comprehension', theme: null, band: 'G2', standard: 'RL.2.1' },
  'G2-271': { family: 'reading-comprehension', theme: null, band: 'G2', standard: 'RL.2.1' },
  'G2-272': { family: 'reading-comprehension', theme: null, band: 'G2', standard: 'RL.2.1' },
  'G2-273': { family: 'reading-comprehension', theme: null, band: 'G2', standard: 'RL.2.1' },
  'G3-359': { family: 'column-arithmetic', theme: null, band: 'G3', standard: '3.NBT.A.2' },
  'G3-360': { family: 'column-arithmetic', theme: null, band: 'G3', standard: '3.NBT.A.2' },
  'G3-361': { family: 'column-arithmetic', theme: null, band: 'G3', standard: '3.NBT.A.2' },
  'G3-362': { family: 'column-arithmetic', theme: null, band: 'G3', standard: '3.NBT.A.2' },
  'G3-363': { family: 'column-arithmetic', theme: null, band: 'G3', standard: '3.NBT.A.2' },
  'G3-364': { family: 'multiplication-tables', theme: null, band: 'G3', standard: '3.OA.C.7' },
  'G3-365': { family: 'multiplication-tables', theme: null, band: 'G3', standard: '3.OA.C.7' },
  'G3-366': { family: 'multiplication-tables', theme: null, band: 'G3', standard: '3.OA.C.7' },
  'G3-367': { family: 'multiplication-tables', theme: null, band: 'G3', standard: '3.OA.C.7' },
  'G3-368': { family: 'multiplication-tables', theme: null, band: 'G3', standard: '3.OA.C.7' },
};

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
  no: { K: '1-trinn', G1: '2-trinn', G2: '3-trinn', G3: '4-trinn' },
  fi: { K: 'esikoulu', G1: '1-luokka', G2: '2-luokka', G3: '3-luokka' },
};

const ORDER = Object.keys(TYPES);
function fail(m) { console.error('ABORT: ' + m); process.exit(1); }
const wordCount = (s) => (s.match(/\S+/g) || []).length;

const [, , locale, prosePath, flag] = process.argv;
const DRY = flag === '--dry-run';
if (!locale || !prosePath) fail('usage: gen-var-landings.js <locale> <prose.json> [--dry-run]');
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
const deckSlugFor = (id) => famSlug(TYPES[id].family) + '-' + id.toLowerCase().replace('-', '');

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
  if (newSlugs.has(e.slug)) errs.push(`${id}: duplicate slug among the set`);
  newSlugs.add(e.slug);
  if (existingSlugs.has(e.slug)) errs.push(`${id}: slug collides with existing landing "${e.slug}"`);
  const words = wordCount(e.p1) + wordCount(e.p2) + wordCount(e.p3);
  if (words < 200) errs.push(`${id}: body ${words} words < 200`);
  if (e.metaDescription && (e.metaDescription.length < 120 || e.metaDescription.length > 175)) {
    errs.push(`${id}: metaDescription ${e.metaDescription.length} chars (want 120-175)`);
  }
  if (e.title && e.title.length > 75) errs.push(`${id}: title ${e.title.length} chars > 75`);
}
if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); fail(errs.length + ' validation error(s)'); }

/* -------- compose -------- */
const entries = ORDER.map((id) => {
  const t = TYPES[id];
  const e = prose.landings[id];
  const level = LEVEL_KEYS[locale][t.band];
  return {
    slug: e.slug,
    variantShape: 'singleton',
    coordinate: { type: t.family, mode: null, theme: '', level },
    eyebrow: e.eyebrow,
    h1: e.h1,
    strand: e.strand,
    ...(t.standard ? { standard: t.standard } : {}),
    slotTokens: [famSlug(t.family), level],
    p1: e.p1, p2: e.p2, p3: e.p3,
    canonicalDeckSlug: deckSlugFor(id),
    carousel: [],
    title: e.title,
    metaDescription: e.metaDescription,
  };
});
// carousel: 4 same-family siblings first, then same-band neighbors
for (let i = 0; i < entries.length; i++) {
  const fam = ORDER[i] && TYPES[ORDER[i]].family;
  const sibs = [];
  for (let k = 1; sibs.length < 4 && k < entries.length; k++) {
    const j = (i + k) % entries.length;
    if (TYPES[ORDER[j]].family === fam) sibs.push({ label: entries[j].h1, href: entries[j].slug });
  }
  for (let k = 1; sibs.length < 4 && k < entries.length; k++) {
    const j = (i + k) % entries.length;
    if (TYPES[ORDER[j]].family !== fam) sibs.push({ label: entries[j].h1, href: entries[j].slug });
  }
  entries[i].carousel = sibs;
}

if (DRY) {
  console.log(JSON.stringify(entries[0], null, 1));
  console.log(`dry-run ok: ${entries.length} entries for ${locale}; existing corpus ${content.landings.length}`);
  process.exit(0);
}

const bySlug = new Map(content.landings.map((l) => [l.slug, l]));
let added = 0, replaced = 0;
for (const e of entries) {
  if (bySlug.has(e.slug)) replaced++; else added++;
  bySlug.set(e.slug, e);
}
content.landings = [...bySlug.values()];
fs.writeFileSync(contentPath, JSON.stringify(content, null, 1) + '\n');
console.log(`${locale}: +${added} added, ${replaced} replaced → ${content.landings.length} landings total`);
