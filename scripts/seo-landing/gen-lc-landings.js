#!/usr/bin/env node
/**
 * gen-lc-landings.js <locale> <prose.json> [--dry-run]
 *
 * The K-278 LOWERCASE letter-tracing family's landing composer — the same
 * contract as gen-nt20-landings.js / gen-var-landings.js, with its own six-id
 * TYPES table. It is a sibling rather than six more rows in gen-nt20-landings
 * because that script's ORDER is `Object.keys(TYPES)` and it refuses unless
 * EVERY id has prose: adding ids there would demand all 26 entries in all
 * eleven existing nt20 prose banks before any of them could be re-run.
 * gen-var-landings.js set the clone-per-batch precedent.
 *
 * Everything mechanical is derived here (coordinate, canonicalDeckSlug via the
 * deck-slug formula publish-cli used, slotTokens, carousel); everything
 * linguistic comes from the panel file. Validation refuses before any write:
 *  - all 6 ids present with every field
 *  - p1+p2+p3 >= 200 words (§22 body floor)
 *  - slug ASCII-kebab, unique in the batch and vs the locale's existing corpus
 *  - metaDescription 120-175 chars, title <= 75
 *  - canonicalDeckSlug must name a deck that EXISTS on disk (structural: the
 *    landing is worthless if it points at nothing, and a silent miss here is
 *    what makes a hub strip render empty later)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const TAX = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));

// id → { family, theme, band, standard }. L.K.1.a reads "print upper- AND
// lowercase letters", so the lowercase family claims it as honestly as the
// capitals family does; §22.1's same-code/different-query-face case.
const TYPES = {
  'K-278': { family: 'lowercase-letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-279': { family: 'lowercase-letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-280': { family: 'lowercase-letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-281': { family: 'lowercase-letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-282': { family: 'lowercase-letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
  'K-283': { family: 'lowercase-letter-tracing', theme: null, band: 'K', standard: 'L.K.1.a' },
};

const LEVEL_KEYS = {
  en: { K: 'kindergarten', G1: 'grade-1', G2: 'grade-2', G3: 'grade-3' },
  de: { K: 'vorschule', G1: '1-klasse', G2: '2-klasse', G3: '3-klasse' },
  es: { K: 'preescolar', G1: 'primer-grado', G2: 'segundo-grado', G3: 'tercer-grado' },
  fr: { K: 'maternelle', G1: 'cp', G2: 'ce1', G3: 'ce2' },
  pt: { K: 'educacao-infantil', G1: '1o-ano', G2: '2o-ano', G3: '3o-ano' },
  it: { K: 'scuola-infanzia', G1: 'prima-elementare', G2: 'seconda-elementare', G3: 'terza-elementare' },
  nl: { K: 'kleuters', G1: 'groep-3', G2: 'groep-4', G3: 'groep-5' },
  sv: { K: 'forskoleklass', G1: 'arskurs-1', G2: 'arskurs-2', G3: 'arskurs-3' },
  da: { K: 'boernehaveklasse', G1: '1-klasse', G2: '2-klasse', G3: '3-klasse' },
  no: { K: '1-trinn', G1: '2-trinn', G2: '3-trinn', G3: '4-trinn' },
  fi: { K: 'esikoulu', G1: '1-luokka', G2: '2-luokka', G3: '3-luokka' },
};

const ORDER = Object.keys(TYPES);
const DECKS_ROOT = process.env.LCS_DECKS_ROOT || '/var/www/lcs-media/decks';

function fail(m) { console.error('ABORT: ' + m); process.exit(1); }
const wordCount = (s) => (s.match(/\S+/g) || []).length;

const [, , locale, prosePath, flag] = process.argv;
const DRY = flag === '--dry-run';
if (!locale || !prosePath) fail('usage: gen-lc-landings.js <locale> <prose.json> [--dry-run]');
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
// the deck slug formula publish-cli used: <family-slug>-<variantid>
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
  if (newSlugs.has(e.slug)) errs.push(`${id}: duplicate slug in this batch`);
  newSlugs.add(e.slug);
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
  // the deck must actually exist — a landing pointing at nothing is how a hub
  // strip ends up silently empty. Skipped when the deck tree is not mounted.
  if (fs.existsSync(DECKS_ROOT)) {
    const d = path.join(DECKS_ROOT, locale, deckSlugFor(id));
    if (!fs.existsSync(d)) errs.push(`${id}: no published deck at ${d}`);
  }
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
  console.log(`dry-run ok: ${entries.length} entries for ${locale}; existing corpus ${content.landings.length}`);
  process.exit(0);
}

const bySlug = new Map(content.landings.map((l) => [l.slug, l]));
let added = 0, replaced = 0;
for (const e of entries) {
  if (bySlug.has(e.slug)) { replaced++; } else { added++; }
  bySlug.set(e.slug, e);
}
content.landings = [...bySlug.values()];
fs.writeFileSync(contentPath, JSON.stringify(content, null, 1) + '\n');
console.log(`${locale}: +${added} added, ${replaced} replaced → ${content.landings.length} landings total`);
