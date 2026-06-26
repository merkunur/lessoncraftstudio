#!/usr/bin/env node
/*
 * gen-printable-mathskills-i18n.js — locale fan-out of the 21 printable math-skill landings.
 * Reads the per-locale structural coords (printable-mathskills-coords-<loc>.json, from the
 * locale-aware enum) + the native-ensemble prose (printable-mathskills-prose-<loc>.json,
 * keyed by the English join-key: {slug, deBand, eyebrow, h1, title, metaDescription, strand,
 * p1, p2, p3}) and appends the landings to <loc>.json.
 *
 * The landing slug + level chip + prose are LOCALE-NATIVE; coordinate.type/mode/theme stay the
 * English canonical keys so each landing auto-hreflang-siblings the EN landing (coordKey excludes
 * level). standard (CCSS code) is the locale-independent machine anchor (route localizes the
 * framework NAME via FRAMEWORK_BY_LOCALE). Idempotent; format-fidelity guard.
 *
 * Usage: node scripts/seo-landing/gen-printable-mathskills-i18n.js --locale=de
 */
'use strict';
const fs = require('fs');
const path = require('path');

const LOCALE = (process.argv.find((a) => a.indexOf('--locale=') === 0) || '').slice(9);
if (!LOCALE) { console.error('--locale=<loc> required'); process.exit(1); }
const FILE = path.join(__dirname, '..', '..', 'frontend', 'content', 'seo-landing', LOCALE + '.json');
const COORDS = require('./printable-mathskills-coords-' + LOCALE + '.json').coordinates;
const PROSE = require('./printable-mathskills-prose-' + LOCALE + '.json');

// Per-locale band-key → the human label that the prose puts in p1 (slotTokens lint anchor).
const BANDLBL_BY_LOCALE = {
  de: { vorschule: 'Vorschule', '1-klasse': 'Klasse 1', '2-klasse': 'Klasse 2', '3-klasse': 'Klasse 3' },
  es: { preescolar: 'Preescolar', 'primer-grado': 'Primer grado', 'segundo-grado': 'Segundo grado', 'tercer-grado': 'Tercer grado' },
  nl: { kleuters: 'kleuters', 'groep-3': 'groep 3', 'groep-4': 'groep 4', 'groep-5': 'groep 5' },
  fr: { maternelle: 'maternelle', cp: 'CP', ce1: 'CE1', ce2: 'CE2' },
  it: { infanzia: 'infanzia', 'classe-prima': 'classe prima', 'classe-seconda': 'classe seconda', 'classe-terza': 'classe terza' },
  pt: { 'educacao-infantil': 'educação infantil', '1o-ano': '1º ano', '2o-ano': '2º ano', '3o-ano': '3º ano' },
};
// Per-locale type→noun for the sibling-grade carousel labels.
const TYPE_NOUN_BY_LOCALE = {
  de: { 'telling-time': 'Uhrzeit', fractions: 'Brüche', geometry: 'Geometrie', measurement: 'Messen', 'arrays-multiplication': 'Einmaleins', 'graphing-data': 'Diagramme', 'number-charts': 'Hundertertafel' },
  es: { 'telling-time': 'La hora', fractions: 'Fracciones', geometry: 'Geometría', measurement: 'Medición', 'arrays-multiplication': 'Multiplicación', 'graphing-data': 'Gráficas', 'number-charts': 'Tabla del 100' },
  nl: { 'telling-time': 'Klokkijken', fractions: 'Breuken', geometry: 'Meetkunde', measurement: 'Meten', 'arrays-multiplication': 'Keersommen', 'graphing-data': 'Grafieken', 'number-charts': 'Honderdveld' },
  fr: { 'telling-time': "Lire l'heure", fractions: 'Fractions', geometry: 'Géométrie', measurement: 'Mesures', 'arrays-multiplication': 'Multiplication', 'graphing-data': 'Graphiques', 'number-charts': 'Tableau des nombres' },
  it: { 'telling-time': "Leggere l'ora", fractions: 'Frazioni', geometry: 'Geometria', measurement: 'Misure', 'arrays-multiplication': 'Moltiplicazione', 'graphing-data': 'Grafici', 'number-charts': 'Tabella dei numeri' },
  pt: { 'telling-time': 'Ver as horas', fractions: 'Frações', geometry: 'Geometria', measurement: 'Medidas', 'arrays-multiplication': 'Multiplicação', 'graphing-data': 'Gráficos', 'number-charts': 'Quadro numérico' },
};
const BANDLBL = BANDLBL_BY_LOCALE[LOCALE];
const TYPE_NOUN = TYPE_NOUN_BY_LOCALE[LOCALE];
if (!BANDLBL || !TYPE_NOUN) { console.error('No BANDLBL/TYPE_NOUN map for locale ' + LOCALE + ' — add it.'); process.exit(1); }

const carouselLabel = (pr, type) => (BANDLBL[pr.band||pr.deBand] || (pr.band||pr.deBand)) + ' ' + (TYPE_NOUN[type] || type);

const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
if (JSON.stringify(data, null, 2) + '\n' !== raw) { console.error('FORMAT MISMATCH — would reflow ' + LOCALE + '.json. Aborting.'); process.exit(1); }
const have = new Set(data.landings.map((l) => l.slug));

// carousel = sibling grades within the same type
const byType = {};
for (const c of COORDS) (byType[c.type] || (byType[c.type] = [])).push(c);
const carouselFor = (c) => (byType[c.type] || []).filter((o) => o.slug !== c.slug)
  .map((o) => ({ label: carouselLabel(PROSE[o.slug], o.type), href: PROSE[o.slug].slug }));

let added = 0;
for (const c of COORDS) {
  const pr = PROSE[c.slug];
  if (!pr) { console.error('NO PROSE for ' + c.slug + ' — aborting.'); process.exit(1); }
  if (have.has(pr.slug)) { console.log('skip (exists):', pr.slug); continue; }
  const label = BANDLBL[pr.band||pr.deBand];
  if (!label) { console.error('bad band "' + (pr.band||pr.deBand) + '" for ' + c.slug); process.exit(1); }
  if (!pr.p1.includes(label)) { console.error('p1 missing band label "' + label + '" for ' + c.slug); process.exit(1); }
  const w = [pr.p1, pr.p2, pr.p3].join(' ').trim().split(/\s+/).length;
  if (w < 200) { console.error('WORDCOUNT ' + w + '<200 for ' + c.slug); process.exit(1); }
  const base = {
    slug: pr.slug,
    variantShape: 'collapsed',
    coordinate: { type: c.type, mode: c.mode, theme: '', level: (pr.band||pr.deBand) },
    eyebrow: pr.eyebrow,
    h1: pr.h1,
    strand: pr.strand,
  };
  const tail = {
    slotTokens: [label],
    p1: pr.p1, p2: pr.p2, p3: pr.p3,
    canonicalDeckSlug: c.canonicalDeckSlug,
    collapseSiblings: c.collapseSiblings,
    carousel: carouselFor(c),
    title: pr.title,
    metaDescription: pr.metaDescription,
  };
  const entry = c.standard ? Object.assign(base, { standard: c.standard }, tail) : Object.assign(base, tail);
  data.landings.push(entry);
  added++;
  console.log('added:', pr.slug, '| ' + pr.deBand + ' | decks=' + c.collapseSiblings.length + ' | ' + (c.standard || 'strand-only'));
}
if (added) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('TOTAL added=' + added + ' | ' + LOCALE + '.json landings now=' + data.landings.length);
} else {
  console.log('nothing added');
}
