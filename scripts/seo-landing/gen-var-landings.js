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

// tier-2 (Phase 9): the remaining 74 variation faces. Keys with '@<theme>'
// are theme-fan decks of a base id (deck slug = famSlug-themeSlug-id).
// Standards follow grade-honesty: a K-level page never carries a G1+ code.
const TIER2 = {
  'K-244': { family: 'pre-writing', theme: 'animals', band: 'K', standard: null },
  'K-245': { family: 'pre-writing', theme: 'fruits', band: 'K', standard: null },
  'K-246': { family: 'pre-writing', theme: 'vehicles', band: 'K', standard: null },
  'K-247': { family: 'pre-writing', theme: 'toys', band: 'K', standard: null },
  'K-248': { family: 'pre-writing', theme: 'animals', band: 'K', standard: null },
  'K-259': { family: 'sight-words', theme: null, band: 'K', standard: 'RF.K.3.c' },
  'K-260': { family: 'sight-words', theme: null, band: 'K', standard: 'RF.K.3.c' },
  'K-261': { family: 'sight-words', theme: null, band: 'K', standard: 'RF.K.3.c' },
  'K-262': { family: 'sight-words', theme: null, band: 'K', standard: 'RF.K.3.c' },
  'K-263': { family: 'sight-words', theme: null, band: 'K', standard: 'RF.K.3.c' },
  'K-264': { family: 'cutting-practice', theme: 'animals', band: 'K', standard: 'K.MD.B.3', collapseThemes: ['vehicles'] },
  'K-240@vehicles': { family: 'cutting-practice', theme: 'vehicles', band: 'K', standard: 'K.MD.B.3' },
  'K-240@fruits': { family: 'cutting-practice', theme: 'fruits', band: 'K', standard: 'K.MD.B.3' },
  'K-240@toys': { family: 'cutting-practice', theme: 'toys', band: 'K', standard: 'K.MD.B.3' },
  'K-265': { family: 'color-by-number', theme: null, band: 'K', standard: 'K.G.A.2' },
  'K-267': { family: 'color-by-number', theme: null, band: 'K', standard: 'K.OA.A.2' },
  'K-268': { family: 'color-by-number', theme: null, band: 'K', standard: 'K.OA.A.2' },
  'K-269': { family: 'color-by-number', theme: null, band: 'K', standard: null },
  'K-270': { family: 'mazes', theme: 'fruits', band: 'K', standard: null },
  'K-271': { family: 'mazes', theme: 'vehicles', band: 'K', standard: null },
  'K-272': { family: 'mazes', theme: 'toys', band: 'K', standard: null },
  'K-242@animals': { family: 'mazes', theme: 'animals', band: 'K', standard: null },
  'K-242@fruits': { family: 'mazes', theme: 'fruits', band: 'K', standard: null },
  'K-273': { family: 'number-bonds', theme: null, band: 'K', standard: 'K.OA.A.5' },
  'K-274': { family: 'number-bonds', theme: null, band: 'K', standard: 'K.OA.A.3' },
  'K-275': { family: 'number-bonds', theme: null, band: 'K', standard: null },
  'K-276': { family: 'number-bonds', theme: null, band: 'K', standard: 'K.OA.A.3' },
  'K-277': { family: 'number-bonds', theme: null, band: 'K', standard: 'K.OA.A.4' },
  'G1-214': { family: 'mental-math', theme: null, band: 'G1', standard: '1.OA.C.6' },
  'G1-215': { family: 'mental-math', theme: null, band: 'G1', standard: '1.OA.D.8' },
  'G1-216': { family: 'mental-math', theme: null, band: 'G1', standard: '1.OA.C.6' },
  'G1-217': { family: 'mental-math', theme: null, band: 'G1', standard: '1.OA.C.6' },
  'G1-218': { family: 'mental-math', theme: null, band: 'G1', standard: '1.OA.D.8' },
  'G1-219': { family: 'fact-families', theme: null, band: 'G1', standard: '1.OA.B.4' },
  'G1-220': { family: 'fact-families', theme: null, band: 'G1', standard: '1.OA.B.4' },
  'G1-221': { family: 'fact-families', theme: null, band: 'G1', standard: '1.OA.B.4' },
  'G1-222': { family: 'fact-families', theme: null, band: 'G1', standard: '1.OA.D.8' },
  'G3-369': { family: 'fact-families', theme: null, band: 'G3', standard: '3.OA.B.6' },
  'G1-223': { family: 'number-words', theme: null, band: 'G1', standard: '2.NBT.A.3' },
  'G1-224': { family: 'number-words', theme: null, band: 'G1', standard: '2.NBT.A.3' },
  'G1-225': { family: 'number-words', theme: null, band: 'G1', standard: '2.NBT.A.3' },
  'G1-226': { family: 'number-words', theme: null, band: 'G1', standard: '2.NBT.A.3' },
  'G1-227': { family: 'number-words', theme: null, band: 'G1', standard: '2.NBT.A.3' },
  'G1-228': { family: 'money', theme: null, band: 'G1', standard: '2.MD.C.8' },
  'G1-229': { family: 'money', theme: null, band: 'G1', standard: '2.MD.C.8' },
  'G1-230': { family: 'money', theme: null, band: 'G1', standard: '2.MD.C.8' },
  'G1-231': { family: 'money', theme: null, band: 'G1', standard: '2.MD.C.8' },
  'G1-232': { family: 'money', theme: null, band: 'G1', standard: '2.MD.C.8' },
  'G1-233': { family: 'telling-time', theme: null, band: 'G1', standard: '1.MD.B.3' },
  'G1-234': { family: 'telling-time', theme: null, band: 'G1', standard: '1.MD.B.3' },
  'G1-235': { family: 'telling-time', theme: null, band: 'G1', standard: '1.MD.B.3' },
  'G1-236': { family: 'telling-time', theme: null, band: 'G1', standard: '2.MD.C.7' },
  'G1-237': { family: 'telling-time', theme: null, band: 'G1', standard: '1.MD.B.3' },
  'G1-238': { family: 'word-problems', theme: 'fruits', band: 'G1', standard: '1.OA.A.1' },
  'G1-239': { family: 'word-problems', theme: 'fruits', band: 'G1', standard: '1.OA.A.1' },
  'G1-240': { family: 'word-problems', theme: 'fruits', band: 'G1', standard: '1.OA.A.1' },
  'G1-241': { family: 'word-problems', theme: 'fruits', band: 'G1', standard: '1.OA.A.1' },
  'G1-213@animals': { family: 'word-problems', theme: 'animals', band: 'G1', standard: '1.OA.A.1' },
  'G2-255': { family: 'column-arithmetic', theme: null, band: 'G2', standard: '2.NBT.B.5' },
  'G2-256': { family: 'column-arithmetic', theme: null, band: 'G2', standard: '2.NBT.B.5' },
  'G2-257': { family: 'column-arithmetic', theme: null, band: 'G2', standard: '2.NBT.B.7' },
  'G2-258': { family: 'column-arithmetic', theme: null, band: 'G2', standard: '2.NBT.B.7' },
  'G2-259': { family: 'column-arithmetic', theme: null, band: 'G2', standard: '2.NBT.B.5' },
  'G2-260': { family: 'measurement', theme: null, band: 'G2', standard: '3.MD.A.2' },
  'G2-261': { family: 'measurement', theme: 'vehicles', band: 'G2', standard: '3.MD.A.2' },
  'G2-262': { family: 'measurement', theme: 'vehicles', band: 'G2', standard: '3.MD.A.2' },
  'G2-263': { family: 'measurement', theme: null, band: 'G2', standard: '3.MD.A.2' },
  'G2-252@animals': { family: 'measurement', theme: 'animals', band: 'G2', standard: '3.MD.A.2' },
  'G2-264': { family: 'symmetry', theme: null, band: 'G2', standard: null },
  'G2-265': { family: 'symmetry', theme: null, band: 'G2', standard: null },
  'G2-266': { family: 'symmetry', theme: null, band: 'G2', standard: null },
  'G2-267': { family: 'symmetry', theme: null, band: 'G2', standard: null },
  'G2-268': { family: 'symmetry', theme: null, band: 'G2', standard: null },
};

const ALL_TYPES = { ...TYPES, ...TIER2 };

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
const themeSlug = (themeKey) => {
  const ax = TAX.axes.theme[themeKey];
  if (!ax) fail('taxonomy missing theme ' + themeKey);
  return ax.slug[locale] || ax.slug.en;
};
// key may be 'K-240@vehicles' (theme-fan of a base id); the deck slug always
// derives from the id part + the entry's theme (measured against the
// published slugs: famSlug[-themeSlug]-idlower)
const deckSlugFor = (key) => {
  const t = ALL_TYPES[key];
  const id = key.split('@')[0];
  return famSlug(t.family) + (t.theme ? '-' + themeSlug(t.theme) : '') + '-' + id.toLowerCase().replace('-', '');
};
const deckSlugForTheme = (key, theme) => {
  const t = ALL_TYPES[key];
  const id = key.split('@')[0];
  return famSlug(t.family) + '-' + themeSlug(theme) + '-' + id.toLowerCase().replace('-', '');
};

// ORDER: the prose file's keys, in declaration order of the maps (tier-1
// files carry the 26 TYPES keys; tier-2 pass files carry a subset of TIER2).
const proseIds = Object.keys((prose.landings || {}));
for (const k of proseIds) if (!ALL_TYPES[k]) fail('unknown landing key in prose: ' + k);
const ORDER2 = Object.keys(ALL_TYPES).filter((k) => prose.landings && prose.landings[k]);

/* -------- validate -------- */
const errs = [];
const newSlugs = new Set();
for (const id of ORDER2) {
  const e = prose.landings[id];
  if (!e) { errs.push(id + ' missing'); continue; }
  for (const f of ['slug', 'eyebrow', 'h1', 'title', 'metaDescription', 'strand', 'p1', 'p2', 'p3']) {
    if (!e[f] || typeof e[f] !== 'string') errs.push(`${id}.${f} missing`);
  }
  if (!e.slug) continue;
  if (!/^[a-z0-9-]+$/.test(e.slug)) errs.push(`${id}: slug not ascii-kebab "${e.slug}"`);
  if (newSlugs.has(e.slug)) errs.push(`${id}: duplicate slug among the set`);
  newSlugs.add(e.slug);
  // a collision is only an error when the existing landing is a DIFFERENT
  // page (different deck) — re-applying our own entry is idempotent
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
}
if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); fail(errs.length + ' validation error(s)'); }

/* -------- compose -------- */
const entries = ORDER2.map((id) => {
  const t = ALL_TYPES[id];
  const e = prose.landings[id];
  const level = LEVEL_KEYS[locale][t.band];
  return {
    slug: e.slug,
    variantShape: 'singleton',
    coordinate: { type: t.family, mode: null, theme: t.theme || '', level },
    eyebrow: e.eyebrow,
    h1: e.h1,
    strand: e.strand,
    ...(t.standard ? { standard: t.standard } : {}),
    slotTokens: [famSlug(t.family), ...(t.theme ? [themeSlug(t.theme)] : []), level],
    p1: e.p1, p2: e.p2, p3: e.p3,
    canonicalDeckSlug: deckSlugFor(id),
    ...(t.collapseThemes ? { collapseSiblings: t.collapseThemes.map((th) => deckSlugForTheme(id, th)) } : {}),
    carousel: [],
    title: e.title,
    metaDescription: e.metaDescription,
  };
});
// carousel: 4 same-family siblings first, then same-band neighbors
for (let i = 0; i < entries.length; i++) {
  const fam = ORDER2[i] && ALL_TYPES[ORDER2[i]].family;
  const sibs = [];
  for (let k = 1; sibs.length < 4 && k < entries.length; k++) {
    const j = (i + k) % entries.length;
    if (ALL_TYPES[ORDER2[j]].family === fam) sibs.push({ label: entries[j].h1, href: entries[j].slug });
  }
  for (let k = 1; sibs.length < 4 && k < entries.length; k++) {
    const j = (i + k) % entries.length;
    if (ALL_TYPES[ORDER2[j]].family !== fam) sibs.push({ label: entries[j].h1, href: entries[j].slug });
  }
  entries[i].carousel = sibs;
}

if (DRY) {
  entries.forEach((e) => console.log(
    `  ${e.slug} -> ${e.canonicalDeckSlug}` +
    (e.collapseSiblings ? ` (+${e.collapseSiblings.join(',')})` : '') +
    (e.coordinate.theme ? ` [theme:${e.coordinate.theme}]` : '')));
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
