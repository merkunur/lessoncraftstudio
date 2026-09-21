#!/usr/bin/env node
/**
 * gen-b4-landings.js <locale> <prose.json> [--dry-run]
 *
 * Composes the nt10-D landing entries (10 base types + 50 variation faces) for
 * one locale from a native panel's prose bank and merges them into
 * frontend/content/seo-landing/<locale>.json. A clone of gen-b2var-landings.js
 * (same validation, same idempotent merge by slug) with the batch-3 differences (nt10-D = batch 4, same shape):
 *
 *  1. The face table is DERIVED from the spec modules (family, band, theme
 *     applicability) — base ids from gen-b4var-specs FAMILIES, face ids from
 *     _records/b4var-id-allocation.json — so the composer cannot drift from the
 *     generator.
 *  2. The shipped theme is read from BOTH wave files (wave-b4-<loc> for the
 *     bases, wave-b4var-<loc> for the faces) — `themeOverrides` is the only source
 *     of a deck's theme; a themed face without a pin aborts.
 *  3. `coordinate.mode` is NEVER null: the face's spec slug for a variation and
 *     the literal 'base' for the base type. `landing-content.ts coordKey()` is
 *     `type|mode|theme` without level, so six themeless faces of one family with
 *     `mode:null` would collide on the coordinate index (README ruling).
 *  4. A face the locale's panel REFUSED (_records/refusals.<loc>.json) may not
 *     carry a landing — the deck does not exist, so the landing would point at
 *     nothing.
 *  5. The visible fields (h1 / eyebrow / strand / p1-p3) are linted for a
 *     free-claim (operator ruling 2026-09-14: "free printable" is SEO metadata
 *     only — title / metaDescription stay exempt) and for U+00AD soft hyphens.
 *
 * Everything mechanical (coordinate, canonicalDeckSlug, slotTokens, carousel,
 * standard, level) is derived here; everything linguistic comes from the panel.
 * Validation refuses before any write.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const WSG = path.join(ROOT, 'scripts', 'worksheet-gen');
const TAX = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));
const { FAMILIES } = require(path.join(WSG, 'tools', 'gen-b4var-specs.js'));
const ALLOC = require(path.join(ROOT, 'docs', 'worksheet-gen', 'b4-designs', '_records', 'b4var-id-allocation.json'));
const { loadType } = require(path.join(WSG, 'lib', 'load-types.js'));
const freeClaim = require(path.join(ROOT, 'scripts', 'lib', 'free-claim.js'));
freeClaim.selfTest();

/**
 * Per-id CCSS code (the JSON-LD `educationalAlignment.targetName`, kept as the
 * machine anchor in every locale per §20.10 / §22.3 R3; the prose names the
 * national framework), or null for a readiness face carrying no standard.
 * Transcribed from each design file's §1 "CCSS" row (the primary code where a
 * face lists two). Faces the design ruled readiness carry null; whole readiness
 * families (human-body, five-senses, weather-symbols, recycling) too — the four
 * science families cite NGSS in en PROSE only, never in the JSON-LD.
 */
const STANDARD = {
  // tangram (K-353 §1: base + F1 K.G.B.6 · F2 / F3 1.G.A.2 · F4 readiness · F5 K.G.A.2)
  'K-353': 'K.G.B.6', 'K-358': 'K.G.B.6', 'G1-354': '1.G.A.2', 'G1-355': '1.G.A.2', 'G2-347': null, 'K-359': 'K.G.A.2',
  // human-body (K-354 §1: no K-2 CCSS / NGSS body standard — all six readiness)
  'K-354': null, 'K-360': null, 'K-361': null, 'G1-356': null, 'K-362': null, 'K-363': null,
  // five-senses (K-355 §1: no K-2 code; NGSS 1-LS1-1 / 4-LS1-2 not claimed — all six readiness)
  'K-355': null, 'G1-357': null, 'G1-358': null, 'G1-359': null, 'G1-360': null, 'G1-361': null,
  // weather-symbols (K-356 §1: NONE on any face; NGSS K-ESS2-1 named in en PROSE only)
  'K-356': null, 'G1-362': null, 'K-364': null, 'K-365': null, 'G3-385': null, 'G1-363': null,
  // recycling (K-357 §1: NONE on any face; NGSS K-ESS3-3 named in en PROSE only)
  'K-357': null, 'K-366': null, 'G1-364': null, 'G2-348': null, 'K-367': null, 'G1-365': null,
  // cloze (G1-350 §1: base / F1 / F2 L.1.1.b · F3 L.1.1.c · F4 RF.2.4.c · F5 RF.1.4.c)
  'G1-350': 'L.1.1.b', 'G1-366': 'L.1.1.b', 'G1-367': 'L.1.1.b', 'G2-349': 'L.1.1.c', 'G2-350': 'RF.2.4.c', 'G1-368': 'RF.1.4.c',
  // odd-and-even (G1-351 §1: base / F2 / F5 readiness · F1 / F3 2.OA.C.3 · F4 3.OA.D.9)
  'G1-351': null, 'G2-351': '2.OA.C.3', 'G1-369': null, 'G2-352': '2.OA.C.3', 'G3-386': '3.OA.D.9', 'G1-370': null,
  // pronouns (G1-352 §1: L.1.1.d on every face; F5 also L.1.1.j — the JSON-LD carries ONE code)
  'G1-352': 'L.1.1.d', 'G1-371': 'L.1.1.d', 'G2-353': 'L.1.1.d', 'G2-354': 'L.1.1.d', 'G1-372': 'L.1.1.d', 'G2-355': 'L.1.1.d',
  // question-words (G1-353 §1: base / F1 / F3 L.K.1.d · F2 / F4 / F5 L.1.1.j)
  'G1-353': 'L.K.1.d', 'G1-373': 'L.K.1.d', 'G1-374': 'L.1.1.j', 'G1-375': 'L.K.1.d', 'G2-356': 'L.1.1.j', 'G2-357': 'L.1.1.j',
  // rounding (G2-346 §1: 3.NBT.A.1 on every face; F3 also 3.OA.D.8 — ONE code in the JSON-LD)
  'G2-346': '3.NBT.A.1', 'G3-387': '3.NBT.A.1', 'G3-388': '3.NBT.A.1', 'G3-389': '3.NBT.A.1', 'G3-390': '3.NBT.A.1', 'G3-391': '3.NBT.A.1',
};

// per-locale coordinate.level keys — must match the keys already in each corpus
// (measured: every locale's corpus already carries its G3 key from nt20/nt20-B)
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
  no: { K: '1-trinn', G1: '2-trinn', G2: '3-trinn', G3: '4-trinn' }, // Nordic +1 shift
  fi: { K: 'esikoulu', G1: '1-luokka', G2: '2-luokka', G3: '3-luokka' },
};

function fail(m) { console.error('ABORT: ' + m); process.exit(1); }
const wordCount = (s) => (s.match(/\S+/g) || []).length;

const [, , locale, prosePath, flag] = process.argv;
const DRY = flag === '--dry-run';
if (!locale || !prosePath) fail('usage: gen-b4-landings.js <locale> <prose.json> [--dry-run]');
if (!LEVEL_KEYS[locale]) fail('no LEVEL_KEYS for ' + locale);

// face table, derived from the specs themselves: 10 bases + 50 faces
const TYPES = {};
const addType = (id, isBase) => {
  const t = loadType(id);
  if (!(id in STANDARD)) fail('no STANDARD entry for ' + id);
  TYPES[id] = {
    family: t.exerciseType, band: id.split('-')[0], standard: STANDARD[id],
    mode: isBase ? 'base' : t.slug,
    themed: !!(t.themeAxis && t.themeAxis.applicable),
    isBase,
  };
};
for (const [baseId] of FAMILIES) addType(baseId, true);
for (const f of ALLOC.faces) addType(f.id, false);
if (Object.keys(TYPES).length !== 60) fail('face table has ' + Object.keys(TYPES).length + ' ids, expected 60');
for (const id of Object.keys(STANDARD)) if (!TYPES[id]) fail('STANDARD names an id that is not a b4 type: ' + id);
// a face's mode must be unique within its family — coordKey is type|mode|theme
{
  const seen = {};
  for (const [id, t] of Object.entries(TYPES)) {
    const k = t.family + '|' + t.mode;
    if (seen[k]) fail(`mode "${t.mode}" is shared by ${seen[k]} and ${id} within ${t.family} — the coordinate index would collide`);
    seen[k] = id;
  }
}
let ORDER = Object.keys(TYPES);

// the shipped theme comes from the waves — the single source of truth
const waveFor = (kind) => {
  const p = path.join(WSG, 'waves', 'wave-' + kind + '-' + locale + '.json');
  if (!fs.existsSync(p)) fail('no wave file at ' + p);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
};
const WAVE_BASE = waveFor('b4'), WAVE_VAR = waveFor('b4var');
const shippedTheme = (id) => {
  const w = TYPES[id].isBase ? WAVE_BASE : WAVE_VAR;
  const ov = w.themeOverrides && w.themeOverrides[id];
  // the same key form emit/manifest.js `themeAxisKey` writes into the staged
  // manifests ('At the Supermarket' → 'at_the_supermarket'); the taxonomy keys
  // are all lowercase, so a case-preserving replace ABORTed every supermarket face
  return ov ? ov.trim().toLowerCase().replace(/\s+/g, '_') : null;
};
// ids the panel refused for this locale — no deck, so no landing
const refusalsPath = path.join(ROOT, 'docs', 'worksheet-gen', 'b4-designs', '_records', 'refusals.' + locale + '.json');
const REFUSED = fs.existsSync(refusalsPath) ? (JSON.parse(fs.readFileSync(refusalsPath, 'utf8')).refusals || {}) : {};
const waveTypes = new Set([...(WAVE_BASE.types || []), ...(WAVE_VAR.types || [])]);

const prose = JSON.parse(fs.readFileSync(prosePath, 'utf8'));
if (prose.locale !== locale) fail(`prose.locale ${prose.locale} != ${locale}`);

const present = Object.keys((prose && prose.landings) || {});
const unknown = present.filter((k) => !TYPES[k]);
if (unknown.length) fail('unknown id(s) in the prose file: ' + unknown.join(', '));
if (!present.length) fail('prose file carries no landings');
const refusedPresent = present.filter((k) => REFUSED[k] || !waveTypes.has(k));
if (refusedPresent.length) fail('landing(s) for id(s) this locale does not ship (refused / not in the wave): ' + refusedPresent.join(', '));
ORDER = ORDER.filter((k) => present.includes(k));
const expected = Object.keys(TYPES).filter((k) => !REFUSED[k] && waveTypes.has(k));
const missing = expected.filter((k) => !present.includes(k));

const contentPath = path.join(ROOT, 'frontend', 'content', 'seo-landing', locale + '.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
const existingSlugs = new Set(content.landings.map((l) => l.slug));

const famSlug = (fam) => {
  const ax = TAX.axes['exercise-type'][fam];
  if (!ax) fail('taxonomy missing family ' + fam);
  if (!ax.slug[locale]) fail('taxonomy family ' + fam + ' has no slug.' + locale + ' (the rail has no en fallback)');
  return ax.slug[locale];
};
const themeSlug = (k) => {
  const ax = TAX.axes.theme[k];
  if (!ax) fail('taxonomy missing theme ' + k);
  return ax.slug[locale] || ax.slug.en;
};
const themeName = (k) => {
  const ax = TAX.axes.theme[k];
  return (ax && ax.name && (ax.name[locale] || ax.name.en)) || k;
};
// the deck slug formula publish-cli uses: <family-slug>[-<theme-slug>]-<variantid>
// (the nt10-D waves pin exemplar units only, so no unit segment — manifest.variant_id
// is the bare id, measured on the staged ZIPs)
for (const id of ORDER) {
  if (TYPES[id].themed && !shippedTheme(id)) {
    fail(`${id} is a themed type with no themeOverrides entry in its wave — its deck slug would omit the theme segment and the landing would point at a deck that does not exist`);
  }
}
const deckSlugFor = (id) => {
  const theme = shippedTheme(id);
  return famSlug(TYPES[id].family) + (theme ? '-' + themeSlug(theme) : '') + '-' + id.toLowerCase().replace('-', '');
};

/* -------- validate -------- */
const errs = [];
const newSlugs = new Set();
const VISIBLE = ['eyebrow', 'h1', 'strand', 'p1', 'p2', 'p3'];
for (const id of ORDER) {
  const e = prose.landings && prose.landings[id];
  for (const f of ['slug', 'eyebrow', 'h1', 'title', 'metaDescription', 'strand', 'p1', 'p2', 'p3']) {
    if (!e[f] || typeof e[f] !== 'string') errs.push(`${id}.${f} missing`);
  }
  for (const f of Object.keys(e)) if (!['slug', 'eyebrow', 'h1', 'title', 'metaDescription', 'strand', 'p1', 'p2', 'p3'].includes(f)) errs.push(`${id}.${f}: unknown field`);
  if (!e.slug) continue;
  if (!/^[a-z0-9-]+$/.test(e.slug)) errs.push(`${id}: slug not ascii-kebab "${e.slug}"`);
  if (newSlugs.has(e.slug)) errs.push(`${id}: duplicate slug within this batch`);
  newSlugs.add(e.slug);
  if (existingSlugs.has(e.slug)) {
    const ex = content.landings.find((l) => l.slug === e.slug);
    if (ex && ex.canonicalDeckSlug !== deckSlugFor(id)) {
      errs.push(`${id}: slug collides with existing landing "${e.slug}" (deck ${ex.canonicalDeckSlug})`);
    }
  }
  const words = wordCount(e.p1) + wordCount(e.p2) + wordCount(e.p3);
  if (words < 200) errs.push(`${id}: body ${words} words < 200`);
  if (e.metaDescription && (e.metaDescription.length < 120 || e.metaDescription.length > 170)) {
    errs.push(`${id}: metaDescription ${e.metaDescription.length} chars (want 120-170)`);
  }
  if (e.title && e.title.length > 75) errs.push(`${id}: title ${e.title.length} chars > 75`);
  for (const f of VISIBLE) {
    const h = freeClaim.hit(e[f] || '');
    if (h) errs.push(`${id}.${f}: free-claim "${h}" in a VISIBLE field (metadata only, operator ruling 2026-09-14)`);
  }
  for (const f of [...VISIBLE, 'title', 'metaDescription', 'slug']) if (/­/.test(e[f] || '')) errs.push(`${id}.${f}: U+00AD soft hyphen`);
  const theme = shippedTheme(id);
  if (theme) {
    const tn = themeName(theme).toLowerCase().split(/\s+/)[0];
    if (!(e.p1 || '').toLowerCase().includes(tn.slice(0, 4))) {
      console.warn(`WARN ${id}: theme word "${themeName(theme)}" not obviously in p1`);
    }
  }
}
if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); fail(errs.length + ' validation error(s)'); }

/* -------- compose -------- */
const entries = ORDER.map((id) => {
  const t = TYPES[id];
  const e = prose.landings[id];
  const level = LEVEL_KEYS[locale][t.band];
  const theme = shippedTheme(id);
  return {
    slug: e.slug,
    variantShape: 'singleton',
    coordinate: { type: t.family, mode: t.mode, theme: theme || '', level },
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
    _family: t.family,
  };
});
// carousel: same-family siblings first (the base and the other faces of this
// very worksheet type), then the rest of the batch cyclically, to 4.
for (let i = 0; i < entries.length; i++) {
  const me = entries[i];
  const sibs = [];
  const push = (s) => { if (s !== me && sibs.length < 4 && !sibs.some((x) => x.href === s.slug)) sibs.push({ label: s.h1, href: s.slug }); };
  for (const s of entries) if (s._family === me._family) push(s);
  for (let k = 1; sibs.length < 4 && k < entries.length; k++) push(entries[(i + k) % entries.length]);
  me.carousel = sibs;
}
entries.forEach((e) => { delete e._family; });

if (DRY) {
  console.log(JSON.stringify(entries[0], null, 1));
  console.log(`dry-run ok: ${entries.length} of ${expected.length} shipped ids for ${locale}` +
    (missing.length ? ` (${missing.length} not yet in this prose file: ${missing.slice(0, 12).join(', ')}${missing.length > 12 ? ', …' : ''})` : ' — complete') +
    `; existing corpus ${content.landings.length}`);
  process.exit(0);
}

const bySlug = new Map(content.landings.map((l) => [l.slug, l]));
let added = 0, replaced = 0;
for (const e of entries) { if (bySlug.has(e.slug)) replaced++; else added++; bySlug.set(e.slug, e); }
content.landings = [...bySlug.values()];
fs.writeFileSync(contentPath, JSON.stringify(content, null, 1) + '\n');
console.log(`${locale}: +${added} added, ${replaced} replaced -> ${content.landings.length} landings total` +
  (missing.length ? ` (${missing.length} shipped ids still without a landing)` : ''));
