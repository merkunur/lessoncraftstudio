#!/usr/bin/env node
/**
 * gen-b5-landings.js <locale> <prose.json> [--dry-run]
 *
 * Composes the nt10-E landing entries (10 base types + 50 variation faces) for
 * one locale from a native panel's prose bank and merges them into
 * frontend/content/seo-landing/<locale>.json. A clone of gen-b2var-landings.js
 * (same validation, same idempotent merge by slug) with the batch-3 differences (nt10-E = batch 5, same shape as nt10-D):
 *
 *  1. The face table is DERIVED from the spec modules (family, band, theme
 *     applicability) — base ids from gen-b5var-specs FAMILIES, face ids from
 *     _records/b5var-id-allocation.json — so the composer cannot drift from the
 *     generator.
 *  2. The shipped theme is read from BOTH wave files (wave-b5-<loc> for the
 *     bases, wave-b5var-<loc> for the faces) — `themeOverrides` is the only source
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
const { FAMILIES } = require(path.join(WSG, 'tools', 'gen-b5var-specs.js'));
const ALLOC = require(path.join(ROOT, 'docs', 'worksheet-gen', 'b5-designs', '_records', 'b5var-id-allocation.json'));
const { loadType } = require(path.join(WSG, 'lib', 'load-types.js'));
const freeClaim = require(path.join(ROOT, 'scripts', 'lib', 'free-claim.js'));
// nt10-E printables ship with NO answer key, so no field may promise one. Only the answer-KEY
// collocations are banned - the bare word "answer" is correct prose on these very pages.
const ANSWER_KEY_CLAIM = /with answers?|answer keys?|mit l\u00f6sung(?:en)?|con (?:las )?respuestas|com (?:as )?respostas|avec (?:le )?corrig\u00e9|con (?:le )?soluzioni|met (?:de )?antwoorden|med facit(?:liste)?|med fasit|vastauksineen|vastausten kanssa/i;
freeClaim.selfTest();

/**
 * Per-id CCSS code (the JSON-LD `educationalAlignment.targetName`, kept as the
 * machine anchor in every locale per §20.10 / §22.3 R3; the prose names the
 * national framework), or null for a readiness face carrying no standard.
 * Transcribed from each nt10-E design file's §1 "CCSS en (honest)" row, checked
 * against its §3 face entries and §6 SEO table (the primary code where a face
 * lists two). The three science families (plants, animal-life-cycles,
 * earth-and-space) and the three social-studies-like ones (road-safety, family,
 * maps) carry NO CCSS on any face: NGSS / C3 codes are not CCSS, so they are
 * named in en PROSE only, never in the JSON-LD (as nt10-D did).
 */
const STANDARD = {
  // 2d-shapes (K-368 §1: base K.G.A.2 · F1 1.G.A.1 · F2 K.G.A.1 · F3 K.G.A.2 (G1 page, no G1 code) · F4 1.G.A.1 · F5 K.G.B.5)
  'K-368': 'K.G.A.2', 'G1-381': '1.G.A.1', 'K-371': 'K.G.A.1', 'G1-382': 'K.G.A.2', 'G1-383': '1.G.A.1', 'K-372': 'K.G.B.5',
  // road-safety (K-369 §1: no CCSS / NGSS road-safety standard — all six null)
  'K-369': null, 'K-373': null, 'K-374': null, 'G1-384': null, 'G2-360': null, 'G2-361': null,
  // family (K-370 §1: social-studies readiness, no CCSS — all six null)
  'K-370': null, 'G1-385': null, 'K-375': null, 'G1-386': null, 'G2-362': null, 'G1-387': null,
  // plants (G1-376 §1: science, NONE on any face; NGSS 1-LS1-1 / K-LS1-1 / 3-LS1-1 / 4-LS1-1 in en PROSE only)
  'G1-376': null, 'K-376': null, 'G1-388': null, 'G2-363': null, 'G2-364': null, 'G3-392': null,
  // animal-life-cycles (G1-377 §1: science, NONE on any face; NGSS 3-LS1-1 (+ 1-LS3-1 on F3) in en PROSE only)
  'G1-377': null, 'G1-389': null, 'G2-365': null, 'G2-366': null, 'G3-393': null, 'G1-390': null,
  // earth-and-space (G1-378 §1: science, NONE on any face; NGSS 1-ESS1-1 / 5-ESS1-2 in en PROSE only)
  'G1-378': null, 'G1-391': null, 'G2-367': null, 'G2-368': null, 'G3-394': null, 'G3-395': null,
  // maps (G1-379 §1: NONE; C3 D2.Geo.1.K-2 in en PROSE only on base / F1 / F5)
  'G1-379': null, 'K-377': null, 'G2-369': null, 'G2-370': null, 'G3-396': null, 'G2-371': null,
  // digraphs (G1-380 §1: base / F2 / F3 / F4 RF.1.3.a · F1 (K) readiness · F5 (G2) RF.1.3.a as grade-1 review)
  'G1-380': 'RF.1.3.a', 'K-378': null, 'G1-392': 'RF.1.3.a', 'G1-393': 'RF.1.3.a', 'G1-394': 'RF.1.3.a', 'G2-372': 'RF.1.3.a',
  // synonyms (G2-358 §1: base L.2.5 · F1 readiness · F2 L.2.5 · F3 L.1.5.d · F4 L.2.5.b · F5 L.3.5)
  'G2-358': 'L.2.5', 'G1-395': null, 'G2-373': 'L.2.5', 'G1-396': 'L.1.5.d', 'G2-374': 'L.2.5.b', 'G3-397': 'L.3.5',
  // word-parts (G2-359 §1: base L.2.4.c · F1 readiness (L.1.4.c is inflection) · F2 L.2.4.c · F3 L.2.4.b · F4 L.3.4.b · F5 L.3.4.c)
  'G2-359': 'L.2.4.c', 'G1-397': null, 'G2-375': 'L.2.4.c', 'G2-376': 'L.2.4.b', 'G3-398': 'L.3.4.b', 'G3-399': 'L.3.4.c',
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
if (!locale || !prosePath) fail('usage: gen-b5-landings.js <locale> <prose.json> [--dry-run]');
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
for (const id of Object.keys(STANDARD)) if (!TYPES[id]) fail('STANDARD names an id that is not a b5 type: ' + id);
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
const WAVE_BASE = waveFor('b5'), WAVE_VAR = waveFor('b5var');
const shippedTheme = (id) => {
  const w = TYPES[id].isBase ? WAVE_BASE : WAVE_VAR;
  const ov = w.themeOverrides && w.themeOverrides[id];
  // the same key form emit/manifest.js `themeAxisKey` writes into the staged
  // manifests ('At the Supermarket' → 'at_the_supermarket'); the taxonomy keys
  // are all lowercase, so a case-preserving replace ABORTed every supermarket face
  return ov ? ov.trim().toLowerCase().replace(/\s+/g, '_') : null;
};
// ids the panel refused for this locale — no deck, so no landing
const refusalsPath = path.join(ROOT, 'docs', 'worksheet-gen', 'b5-designs', '_records', 'refusals.' + locale + '.json');
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
// (the nt10-E waves pin exemplar units only, so no unit segment — manifest.variant_id
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
  for (const f of [...VISIBLE, 'title', 'metaDescription']) {
    const m = ANSWER_KEY_CLAIM.exec(e[f] || '');
    if (m) errs.push(`${id}.${f}: promises an answer key ("${m[0]}") - these printables ship without one`);
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
