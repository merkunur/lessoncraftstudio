#!/usr/bin/env node
/**
 * gen-b2var-landings.js <locale> <prose.json> [--dry-run]
 *
 * Composes the nt20-B-VAR variation landing entries for one locale from a native
 * panel's prose bank and merges them into frontend/content/seo-landing/<locale>.json.
 * A direct clone of gen-b2-landings.js — same validation, same idempotency rule —
 * with three differences:
 *
 *  1. The face table is DERIVED, not hand-written: family and band come from the
 *     spec modules via loadType, so the composer cannot drift from the generator.
 *  2. The shipped theme is read from waves/wave-b2var-<loc>.json themeOverrides.
 *     gen-b2-landings is the only composer that does this and it is not optional:
 *     sv and da ship K-306 on fruits, sv ships K-307 on fruits, so a theme taken
 *     from a global map would derive a canonicalDeckSlug that does not exist.
 *  3. The carousel prefers siblings of the SAME family (the other faces of this
 *     worksheet type) before falling back to the rest of the batch — a reader on
 *     "number line to 50" is best served by the other number-line ranges.
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
const { ROWS } = require(path.join(WSG, 'tools', 'gen-b2var-specs.js'));
const { loadType } = require(path.join(WSG, 'lib', 'load-types.js'));

/**
 * Per-face CCSS code, or null for a readiness page carrying no standard.
 * Not simply inherited from the base type: several faces instantiate a
 * different code than their parent, and several are honestly readiness.
 *   - K-295/K-296 count on from a number other than 1 -> K.CC.A.2, not K.CC.A.1
 *   - G1-256 crosses the decade -> 1.NBT.C.5
 *   - G1-268 solves a missing addend by subtraction -> 1.OA.D.8
 *   - G1-258/G1-259 carry a word bank, so the child MATCHES rather than encodes;
 *     the pedagogy review ruled a bank-bearing page readiness, not L.1.2.d
 *   - G2-299 is descriptive writing -> W.2.2, where its parent is narrative W.2.3
 * grid-copy, articles, alphabetical-order, calendar and grid-coordinates carry no
 * code at all: CCSS has none for them at this band, and inventing one is worse
 * than omitting it.
 */
const STANDARD = {
  'K-289': 'L.K.1.a', 'K-290': 'L.K.1.a', 'K-291': 'L.K.1.a',
  'K-294': 'K.CC.A.1', 'K-295': 'K.CC.A.2', 'K-296': 'K.CC.A.2',
  'K-298': null, 'K-299': null, 'K-300': null,
  'K-302': 'L.K.1.c', 'K-303': 'L.K.1.c',
  'K-306': null, 'K-307': null,
  'G1-251': 'RF.1.4', 'G1-252': 'RF.1.4',
  'G1-255': '1.NBT.B.2', 'G1-256': '1.NBT.C.5', 'G1-257': '1.NBT.B.2',
  'G1-258': null, 'G1-259': null, 'G1-260': 'L.1.2.d',
  'G1-262': null, 'G1-263': null, 'G1-264': null,
  'G1-266': '1.OA.C.6', 'G1-267': '1.OA.C.6', 'G1-268': '1.OA.D.8',
  'G1-270': '1.OA.C.6', 'G1-271': '1.OA.C.6',
  'G1-274': '1.NBT.A.1', 'G1-275': '1.NBT.A.1', 'G1-276': '1.NBT.A.1', 'G1-277': '1.NBT.A.1',
  'G1-278': '1.NBT.A.1', 'G1-279': '1.NBT.A.1', 'G1-280': '1.NBT.A.1', 'G1-281': '1.NBT.A.1',
  'G1-282': 'L.1.1.j', 'G1-283': 'L.1.1.j',
  'G2-281': 'L.1.2.b', 'G2-282': 'L.1.2.b',
  'G2-285': 'L.2.1.e', 'G2-286': 'L.2.1.e', 'G2-287': 'L.2.1.e',
  'G2-289': '2.MD.C.8', 'G2-290': '2.MD.C.8', 'G2-291': '2.MD.C.8', 'G2-292': '2.MD.C.8',
  'G2-293': '2.MD.C.8', 'G2-294': '2.MD.C.8', 'G2-295': '2.MD.C.8',
  'G2-296': null, 'G2-297': null, 'G2-298': null,
  'G2-299': 'W.2.2', 'G2-300': 'W.2.3',
  'G2-302': null, 'G2-303': null,
  'G3-371': '3.OA.A.3', 'G3-372': '3.OA.A.3', 'G3-373': '3.OA.A.3',
  'G3-374': '3.OA.A.3', 'G3-375': '3.OA.A.3', 'G3-376': '3.OA.A.3',
  // nt20-B-VAR second half (36 faces) — added by the en panel; see the report.
  'K-308': null,
  'K-309': null,
  'G1-285': null,
  'G1-294': null,
  'G2-304': '2.NBT.A.2',
  'G2-314': '2.NBT.A.2',
  'K-310': 'L.K.1.a',
  'K-311': 'L.K.1.a',
  'K-315': 'L.K.1.a',
  'K-313': 'L.K.1.c',
  'K-314': 'L.K.1.c',
  'K-316': 'L.K.1.c',
  'G1-286': '1.OA.C.6',
  'G1-287': '1.OA.C.6',
  'G1-288': '1.OA.C.6',
  'G1-296': '1.OA.C.6',
  'G1-297': '1.OA.C.6',
  'G1-298': '1.OA.C.6',
  'G1-299': '1.OA.C.6',
  'G1-289': '1.OA.D.8',
  'G2-313': '2.NBT.B.5',
  'G1-291': 'L.1.2.d',
  'G1-301': null,
  'G1-303': 'L.1.2.d',
  'G1-304': null,
  'G1-292': null,
  'G1-293': null,
  'G1-300': null,
  'G1-295': '1.NBT.A.1',
  'G2-305': '2.NBT.A.2',
  'G2-310': '2.NBT.A.2',
  'G1-302': 'L.1.1.j',
  'G2-307': 'L.1.2.b',
  'G2-311': 'L.1.2.b',
  'G2-308': null,
  'G2-312': null,
};

// per-locale coordinate.level keys — must match the keys already in each corpus
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
if (!locale || !prosePath) fail('usage: gen-b2var-landings.js <locale> <prose.json> [--dry-run]');
if (!LEVEL_KEYS[locale]) fail('no LEVEL_KEYS for ' + locale);

// face table, derived from the specs themselves
const TYPES = {};
for (const r of ROWS) {
  const id = r[1];
  const t = loadType(id);
  TYPES[id] = { family: t.exerciseType, band: id.split('-')[0], standard: STANDARD[id] };
  if (!(id in STANDARD)) fail('no STANDARD entry for ' + id);
}
// Only the ids this prose file actually carries. 64 faces is too much prose for
// one panel pass, so a locale is written in two halves and each half composes
// independently; the merge below is by slug and idempotent, so the halves can
// land in either order and be re-applied after a copy fix. An id in the file
// that is not a known face is still an error.
let ORDER = Object.keys(TYPES);

// the shipped theme comes from the wave — the single source of truth
const wavePath = path.join(WSG, 'waves', 'wave-b2var-' + locale + '.json');
if (!fs.existsSync(wavePath)) fail('no wave file at ' + wavePath);
const WAVE = JSON.parse(fs.readFileSync(wavePath, 'utf8'));
const shippedTheme = (id) => {
  const ov = WAVE.themeOverrides && WAVE.themeOverrides[id];
  return ov ? ov.replace(/ /g, '_') : null;
};

const prose = JSON.parse(fs.readFileSync(prosePath, 'utf8'));
if (prose.locale !== locale) fail(`prose.locale ${prose.locale} != ${locale}`);

const present = Object.keys((prose && prose.landings) || {});
const unknown = present.filter((k) => !TYPES[k]);
if (unknown.length) fail('unknown face id(s) in the prose file: ' + unknown.join(', '));
if (!present.length) fail('prose file carries no landings');
ORDER = ORDER.filter((k) => present.includes(k));

const contentPath = path.join(ROOT, 'frontend', 'content', 'seo-landing', locale + '.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
const existingSlugs = new Set(content.landings.map((l) => l.slug));

const famSlug = (fam) => {
  const ax = TAX.axes['exercise-type'][fam];
  if (!ax) fail('taxonomy missing family ' + fam);
  return ax.slug[locale] || ax.slug.en;
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
const deckSlugFor = (id) => {
  const theme = shippedTheme(id);
  return famSlug(TYPES[id].family) + (theme ? '-' + themeSlug(theme) : '') + '-' + id.toLowerCase().replace('-', '');
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
    coordinate: { type: t.family, mode: null, theme: theme || '', level },
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
// carousel: same-family siblings first (the other ranges/scaffolds of this very
// worksheet type), then the rest of the batch cyclically, to 4.
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
  console.log(`dry-run ok: ${entries.length} of ${Object.keys(TYPES).length} faces for ${locale}; existing corpus ${content.landings.length}`);
  process.exit(0);
}

const bySlug = new Map(content.landings.map((l) => [l.slug, l]));
let added = 0, replaced = 0;
for (const e of entries) { if (bySlug.has(e.slug)) replaced++; else added++; bySlug.set(e.slug, e); }
content.landings = [...bySlug.values()];
fs.writeFileSync(contentPath, JSON.stringify(content, null, 1) + '\n');
console.log(`${locale}: +${added} added, ${replaced} replaced -> ${content.landings.length} landings total`);
