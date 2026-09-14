#!/usr/bin/env node
/**
 * gen-b3-landings.js <locale> <prose.json> [--dry-run]
 *
 * Composes the nt20-C landing entries (20 base types + 100 variation faces) for
 * one locale from a native panel's prose bank and merges them into
 * frontend/content/seo-landing/<locale>.json. A clone of gen-b2var-landings.js
 * (same validation, same idempotent merge by slug) with the batch-3 differences:
 *
 *  1. The face table is DERIVED from the spec modules (family, band, theme
 *     applicability) — base ids from gen-b3var-specs FAMILIES, face ids from
 *     _records/b3var-id-allocation.json — so the composer cannot drift from the
 *     generator.
 *  2. The shipped theme is read from BOTH wave files (wave-b3-<loc> for the
 *     bases, wave-b3var-<loc> for the faces) — `themeOverrides` is the only source
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
const { FAMILIES } = require(path.join(WSG, 'tools', 'gen-b3var-specs.js'));
const ALLOC = require(path.join(ROOT, 'docs', 'worksheet-gen', 'b3-designs', '_records', 'b3var-id-allocation.json'));
const { loadType } = require(path.join(WSG, 'lib', 'load-types.js'));
const freeClaim = require(path.join(ROOT, 'scripts', 'lib', 'free-claim.js'));
freeClaim.selfTest();

/**
 * Per-id CCSS code (the JSON-LD `educationalAlignment.targetName`, kept as the
 * machine anchor in every locale per §20.10 / §22.3 R3; the prose names the
 * national framework), or null for a readiness face carrying no standard.
 * Transcribed from each design file's §1 "CCSS" row (the primary code where a
 * face lists two). Faces the design ruled readiness carry null; whole readiness
 * families (ordinal-numbers, days-and-months, seasons, logic-puzzles) too.
 */
const STANDARD = {
  // letter-of-the-week (K-317 §1: base RF.K.1.d + RF.K.3.a · F2 RF.K.2.d · F3 RF.K.2.d · F4 RF.K.1.d · F5 readiness · F6 RF.K.3.a)
  'K-317': 'RF.K.1.d', 'K-325': 'RF.K.2.d', 'K-326': 'RF.K.2.d', 'K-327': 'RF.K.1.d', 'G1-311': null, 'K-328': 'RF.K.3.a',
  // sound-boxes (K-318 §1, by face name)
  'K-318': 'L.K.2.d', 'K-329': 'RF.K.2.d', 'K-330': 'RF.K.2.c', 'G1-312': 'RF.1.2.d', 'G1-313': 'RF.1.3.e', 'G1-314': 'RF.1.2.b',
  // emotions (K-319 §1: base + F4 L.K.5 · F1 L.K.5.c · F2 / F3 / F5 no code)
  'K-319': 'L.K.5', 'K-331': 'L.K.5.c', 'K-332': null, 'K-333': null, 'K-334': 'L.K.5', 'K-335': null,
  // ordinal-numbers — all readiness
  'K-320': null, 'G1-315': null, 'G1-316': null, 'G1-317': null, 'K-336': null, 'G1-318': null,
  // days-and-months — all readiness
  'K-321': null, 'K-337': null, 'G1-319': null, 'G1-320': null, 'G1-321': null, 'G1-322': null,
  // seasons — all readiness
  'K-322': null, 'K-338': null, 'K-339': null, 'K-340': null, 'G1-323': null, 'K-341': null,
  // all-about-me (K-323 §1: base W.K.2 · F1 none · F2 K.CC.A.3 · F3 none · F4 none · F5 K.CC.B.5)
  'K-323': 'W.K.2', 'K-342': null, 'K-343': 'K.CC.A.3', 'K-344': null, 'K-345': null, 'K-346': 'K.CC.B.5',
  // picture-word-cards (K-324 §1: base, F2, F5 readiness · F3 readiness · F4 L.K.1.c · F6 RF.1.3.e)
  'K-324': null, 'K-347': null, 'K-348': null, 'K-349': 'L.K.1.c', 'K-350': null, 'G1-324': 'RF.1.3.e',
  // syllable-split (G1-305 §1: RF.1.3.e on every face)
  'G1-305': 'RF.1.3.e', 'G1-325': 'RF.1.3.e', 'G1-326': 'RF.1.3.e', 'G1-327': 'RF.1.3.e', 'G1-328': 'RF.1.3.e', 'G1-329': 'RF.1.3.e',
  // syllable-reading (G1-306 §1: base + Circle + Complex RF.1.3.b · Join + Carpet + Syllabified RF.1.3.e)
  'G1-306': 'RF.1.3.b', 'G1-330': 'RF.1.3.b', 'G1-331': 'RF.1.3.e', 'G1-332': 'RF.1.3.e', 'G1-333': 'RF.1.3.b', 'G1-334': 'RF.1.3.e',
  // opposites (G1-307 §1: F1 L.K.5.b · base/F2/F3/F4 L.1.5 · F5 L.1.4.b)
  'G1-307': 'L.1.5', 'K-351': 'L.K.5.b', 'G1-335': 'L.1.5', 'G1-336': 'L.1.5', 'G1-337': 'L.1.5', 'G2-320': 'L.1.4.b',
  // read-and-do (G1-308 §1: RF.1.4 on every face)
  'G1-308': 'RF.1.4', 'G1-338': 'RF.1.4', 'G1-339': 'RF.1.4', 'G1-340': 'RF.1.4', 'G1-341': 'RF.1.4', 'G1-342': 'RF.1.4',
  // rhyming-words (G1-309 §1: RF.K.2.a on all six)
  'G1-309': 'RF.K.2.a', 'K-352': 'RF.K.2.a', 'G1-343': 'RF.K.2.a', 'G1-344': 'RF.K.2.a', 'G1-345': 'RF.K.2.a', 'G1-346': 'RF.K.2.a',
  // hundreds-chart-puzzles (G1-310 §1: base / F1 / F4 1.NBT.C.5 · F2 / F3 / F5 2.NBT.B.5)
  'G1-310': '1.NBT.C.5', 'G1-347': '1.NBT.C.5', 'G2-321': '2.NBT.B.5', 'G2-322': '2.NBT.B.5', 'G1-348': '1.NBT.C.5', 'G2-323': '2.NBT.B.5',
  // spelling-rules (G2-315 §1: base L.2.2.d · F1 RF.2.3.a · F2 RF.2.3.b · F3 L.2.2.d · F4 L.2.2.d · F5 L.2.2.d)
  'G2-315': 'L.2.2.d', 'G2-324': 'RF.2.3.a', 'G2-325': 'RF.2.3.b', 'G2-326': 'L.2.2.d', 'G2-327': 'L.2.2.d', 'G2-328': 'L.2.2.d',
  // compound-words (G2-316 §1: L.2.4.d on every face)
  'G2-316': 'L.2.4.d', 'G2-329': 'L.2.4.d', 'G2-330': 'L.2.4.d', 'G2-331': 'L.2.4.d', 'G2-332': 'L.2.4.d', 'G2-333': 'L.2.4.d',
  // verb-forms (G2-317 §1: base L.1.1.c · F2 L.1.1.c · F3 L.1.1.e · F4 L.2.1.d · F5 L.1.1.c · F6 L.1.1.b)
  'G2-317': 'L.1.1.c', 'G2-334': 'L.1.1.c', 'G2-335': 'L.1.1.e', 'G2-336': 'L.2.1.d', 'G2-337': 'L.1.1.c', 'G2-338': 'L.1.1.b',
  // animal-fact-file (G2-318 §1: base W.2.7 · F2 none · F3 W.2.2 · F4 W.2.2 · F5 W.2.2 · F6 RI.2.1)
  'G2-318': 'W.2.7', 'G2-339': null, 'G2-340': 'W.2.2', 'G2-341': 'W.2.2', 'G2-342': 'W.2.2', 'G2-343': 'RI.2.1',
  // logic-puzzles — all readiness (G2-319 §1: no honest code)
  'G2-319': null, 'G2-344': null, 'G3-378': null, 'G1-349': null, 'G3-379': null, 'G2-345': null,
  // division-with-remainder (G3-377 §1: 4.NBT.B.6 on every face)
  'G3-377': '4.NBT.B.6', 'G3-380': '4.NBT.B.6', 'G3-381': '4.NBT.B.6', 'G3-382': '4.NBT.B.6', 'G3-383': '4.NBT.B.6', 'G3-384': '4.NBT.B.6',
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
if (!locale || !prosePath) fail('usage: gen-b3-landings.js <locale> <prose.json> [--dry-run]');
if (!LEVEL_KEYS[locale]) fail('no LEVEL_KEYS for ' + locale);

// face table, derived from the specs themselves: 20 bases + 100 faces
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
if (Object.keys(TYPES).length !== 120) fail('face table has ' + Object.keys(TYPES).length + ' ids, expected 120');
for (const id of Object.keys(STANDARD)) if (!TYPES[id]) fail('STANDARD names an id that is not a b3 type: ' + id);
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
const WAVE_BASE = waveFor('b3'), WAVE_VAR = waveFor('b3var');
const shippedTheme = (id) => {
  const w = TYPES[id].isBase ? WAVE_BASE : WAVE_VAR;
  const ov = w.themeOverrides && w.themeOverrides[id];
  return ov ? ov.replace(/ /g, '_') : null;
};
// ids the panel refused for this locale — no deck, so no landing
const refusalsPath = path.join(ROOT, 'docs', 'worksheet-gen', 'b3-designs', '_records', 'refusals.' + locale + '.json');
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
// (the nt20-C waves pin exemplar units only, so no unit segment — manifest.variant_id
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
