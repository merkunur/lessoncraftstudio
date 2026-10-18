#!/usr/bin/env node
/**
 * verify-hub-theme-truth.js [--locales=en,de] [--poison] [--verbose]
 *
 * THE gate for the operator's 2026-10-18 finding: "When I click on a theme
 * there are a lot of worksheets with different themes. Very unprofessional."
 *
 * Root cause (measured on en): Level Set rows and collapsed sheets borrowed
 * their PARENT landing's coordinate, theme included — 4,206 of 11,088 Level Set
 * rows and 130 sheets sat under a theme they are not. The hub now gives every
 * non-landing row its OWN deck's theme (`Deck.subjectTags[0]`).
 *
 * What this checks, per locale, through the hub's REAL code (worksheets-sheets.ts
 * expandHubRows + levelSetRows, worksheets-catalog.ts applyLandingFilters +
 * buildLandingFacets, transpiled, no stubs), with the rows built exactly as
 * app/[locale]/worksheets/page.tsx builds them:
 *   1. for EVERY theme the rail offers, every row the filter returns is that
 *      theme by an INDEPENDENT oracle: a landing row by its curated landing
 *      coordinate, any other row by its own deck tag, normalised here by this
 *      gate's own rule (never by the hub's baseTheme — a gate that reads its
 *      expectation off the code it checks marks its own homework);
 *   2. the rail's count for a theme equals the number of rows its link opens;
 *   3. no theme label is a raw key, a "X 2" copy number or a BW marker.
 * Reported, not failed: landing rows whose deck tag disagrees with the curated
 * landing coordinate (the thumbnail-recovered treasure-hunt class).
 *
 * --poison: re-runs locale #1 with the pre-fix call shape (no deck theme passed
 *   to levelSetRows / expandHubRows) — it MUST fail; a control run must pass.
 *
 * Needs DATABASE_URL (deploy.sh sources frontend/.env.production).
 * Exit 0 PASS · 1 FAIL · 2 REFUSED (no DB / empty corpus).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const Module = require('module');

const REPO = path.resolve(__dirname, '..');
const FRONTEND = path.join(REPO, 'frontend');
const LANDING_DIR = path.join(FRONTEND, 'content', 'seo-landing');
const TAXONOMY_JSON = path.join(FRONTEND, 'config', 'topics-taxonomy.json');
const ALL = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : null; };
const LOCALES = arg('locales') ? arg('locales').split(',') : ALL;
const POISON = process.argv.includes('--poison');
const VERBOSE = process.argv.includes('--verbose');

/* ---- load the real TS modules (same loader shape as verify-hub-type-rows.js) ---- */
const ts = require(path.join(FRONTEND, 'node_modules', 'typescript'));
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_JSON, 'utf8'));
const cache = new Map();
function loadTs(file) {
  if (cache.has(file)) return cache.get(file);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: file,
  }).outputText;
  const m = new Module(file, null);
  m.filename = file;
  m.paths = Module._nodeModulePaths(path.dirname(file));
  const real = m.require.bind(m);
  m.require = (id) => {
    if (id === '@/config/topics-taxonomy.json') return taxonomy;
    if (id === './taxonomy' || id === '@/lib/taxonomy') return loadTs(path.join(FRONTEND, 'lib', 'taxonomy.ts'));
    if (id === './seo/landing-content' || id === '@/lib/seo/landing-content' || id === './activities-catalog') return {};
    if (id.startsWith('@/lib/')) return loadTs(path.join(FRONTEND, 'lib', id.slice(6) + '.ts'));
    return real(id);
  };
  m._compile(js, file);
  cache.set(file, m.exports);
  return m.exports;
}
const catalog = loadTs(path.join(FRONTEND, 'lib', 'worksheets-catalog.ts'));
const sheets = loadTs(path.join(FRONTEND, 'lib', 'worksheets-sheets.ts'));

/* ---- the oracle: this gate's OWN normalisation of a raw theme key ---- */
const COLOUR = new Set(Object.keys(taxonomy.axes.theme).filter((k) => !/_bw/.test(k) && !/_\d+$/.test(k)));
const TWIN = { dessert: 'desserts_and_sweets', farm: 'farm_animals', home: 'around_the_house', household: 'around_the_house',
  kitchen: 'kitchen_tools', apparel: 'clothing', education: 'classroom', sea_life: 'ocean_life' };
function oracleThemes(raw) {
  if (!raw) return [];
  return [...new Set(String(raw).split('-vs-').filter(Boolean).map((k) => {
    let x = k.replace(/_\d+$/, '');
    if (x === 'thanksgiving') x = 'thanksgivinng'; // the taxonomy key keeps its historical spelling
    const bw = x.match(/^(.*)_bw$/);
    if (bw) { const stem = TWIN[bw[1]] || bw[1]; x = COLOUR.has(stem) ? stem : bw[1] + '_bw'; }
    return x;
  }))];
}

/* ---- data ---- */
async function decksOf(prisma, locale) {
  return prisma.deck.findMany({
    where: { language: locale, status: 'published', contentLanguage: null },
    select: { slug: true, title: true, answerKeyUrl: true, exerciseType: true, exerciseMode: true, indexable: true, subjectTags: true },
  });
}

/** Hub rows exactly as page.tsx builds them. `legacy` = the pre-fix call shape (no deck theme). */
function hubRowsFor(locale, landings, decks, legacy) {
  const facts = new Map();
  for (const d of decks) {
    const raw = d.title || {};
    const label = raw[locale] || raw.en || Object.values(raw)[0];
    if (!label) continue;
    const f = { title: label, hasAnswerKey: d.answerKeyUrl != null };
    if (!legacy) f.theme = d.subjectTags[0] || null;
    facts.set(d.slug, f);
  }
  const rows = sheets.expandHubRows(landings, facts, (s) => '/' + locale + '/decks/' + s + '/', (k) => k);
  const byType = new Map();
  for (const d of decks) {
    if (d.indexable || !d.exerciseType) continue;
    if (!byType.has(d.exerciseType)) byType.set(d.exerciseType, []);
    byType.get(d.exerciseType).push(d);
  }
  let ls = [];
  for (const [type, ds] of byType) {
    const tl = landings.filter((l) => l.coordinate.type === type);
    if (!tl[0]) continue;
    ls = ls.concat(sheets.levelSetRows(tl, ds.map((d) => {
      const raw = d.title || {};
      const o = { slug: d.slug, title: raw[locale] || raw.en || tl[0].h1, exerciseMode: d.exerciseMode, hasAnswerKey: d.answerKeyUrl != null };
      if (!legacy) o.theme = d.subjectTags[0] || null;
      return o;
    }), (s) => s, (m) => m, 'Set'));
  }
  return rows.concat(ls);
}

function checkLocale(locale, landings, decks, legacy) {
  const fails = [];
  const tagOf = new Map(decks.map((d) => [d.slug, d.subjectTags[0] || '']));
  const landingSlugs = new Set(landings.map((l) => l.slug));
  const landingBySlug = new Map(landings.map((l) => [l.slug, l]));
  const parentOf = new Map();
  for (const l of landings) for (const sib of l.collapseSiblings || []) if (!parentOf.has(sib) && sib !== l.canonicalDeckSlug) parentOf.set(sib, l);
  const tagsOfType = new Map();
  for (const l of landings) {
    const tg = tagOf.get(l.canonicalDeckSlug);
    if (!tg) continue;
    if (!tagsOfType.has(l.coordinate.type)) tagsOfType.set(l.coordinate.type, new Set());
    tagsOfType.get(l.coordinate.type).add(tg);
  }
  const trusted = (type) => (tagsOfType.get(type) || new Set()).size > 1;
  const rows = hubRowsFor(locale, landings, decks, legacy);
  const facets = catalog.buildLandingFacets(rows, { subject: null, type: null, level: null, theme: null, set: null, format: 'all', page: 1 });
  let checked = 0;
  for (const { value, count } of facets.theme) {
    const got = catalog.applyLandingFilters(rows, { theme: value });
    if (got.length !== count) fails.push(`${locale} theme=${value}: rail says ${count}, link opens ${got.length}`);
    for (const r of got) {
      checked++;
      // Landing row: its curated coordinate. Any other row: its own deck tag; a tagless COLLAPSED sheet
      // (old app decks carry no subject tag) is the theme of the landing that groups it — read 2026-10-18 on
      // pt sudoku/crossword thumbnails: the pictures are that theme. A tagless Level Set copy is themeless.
      // A deck tag is trusted only where a type's landing decks carry MORE than one tag (one tag
      // everywhere = an app stamp; read on thumbnails: es chart-count all "accessories"), so:
      //   landing row  → its deck tag when trusted, else its curated coordinate;
      //   other row    → its deck tag when trusted and present, else the grouping landing's theme
      //                  (a Level Set copy has no grouping landing → its tag, or themeless).
      const own = tagOf.get(r.canonicalDeckSlug) || '';
      const landing = landingBySlug.get(r.slug);
      const parent = parentOf.get(r.canonicalDeckSlug);
      const truth = landing
        ? oracleThemes(own && trusted(landing.coordinate.type) ? own : landing.coordinate.theme)
        : parent
          ? oracleThemes(own && trusted(parent.coordinate.type) ? own : parent.coordinate.theme)
          : oracleThemes(own);
      if (!truth.includes(value)) {
        fails.push(`${locale} theme=${value}: ${r.canonicalDeckSlug} is ${truth.join('+') || 'themeless'}`);
      }
    }
    const label = catalog.themeLabel(value, locale);
    if (!label || label === value || /\s\d+$/.test(label) || /\s(?:BW|SW|BN|NB|ZW|PB|SV|SH|MV)$/.test(label)) {
      fails.push(`${locale} theme=${value}: label "${label}" is a raw key, a copy number or a BW marker`);
    }
  }
  let landingDisagree = 0;
  for (const l of landings) {
    const tag = tagOf.get(l.canonicalDeckSlug);
    if (tag && l.coordinate.theme && !oracleThemes(l.coordinate.theme).some((x) => oracleThemes(tag).includes(x))) landingDisagree++;
  }
  return { fails, checked, themes: facets.theme.length, landingDisagree };
}

(async () => {
  if (!process.env.DATABASE_URL) { console.error('REFUSED: DATABASE_URL is not set'); process.exit(2); }
  const { PrismaClient } = require(path.join(FRONTEND, 'node_modules', '@prisma/client'));
  const prisma = new PrismaClient();
  let failed = false;
  try {
    for (const locale of LOCALES) {
      const file = path.join(LANDING_DIR, locale + '.json');
      const landings = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).landings : null;
      const decks = await decksOf(prisma, locale);
      if (!landings || landings.length === 0 || decks.length === 0) { console.error(`REFUSED: ${locale} has no corpus`); process.exit(2); }
      const r = checkLocale(locale, landings, decks, false);
      if (r.checked < 100 || r.themes < 10) { console.error(`REFUSED: ${locale} measured only ${r.checked} rows over ${r.themes} themes`); process.exit(2); }
      console.log(`${r.fails.length ? 'FAIL' : 'PASS'} ${locale}: ${r.themes} themes, ${r.checked} filtered rows checked, ${r.fails.length} wrong` +
        (r.landingDisagree ? ` (info: ${r.landingDisagree} landing decks whose tag differs from the landing's named theme)` : ''));
      if (r.fails.length) { failed = true; r.fails.slice(0, VERBOSE ? 1e9 : 8).forEach((f) => console.log('   ' + f)); }

      if (POISON && locale === LOCALES[0]) {
        const control = checkLocale(locale, landings, decks, false);
        const poison = checkLocale(locale, landings, decks, true);
        const ok = control.fails.length === 0 && poison.fails.length > 0;
        console.log(`${ok ? 'PASS' : 'FAIL'} poison ${locale}: control ${control.fails.length} wrong, pre-fix call shape ${poison.fails.length} wrong (must be > 0)`);
        if (!ok) failed = true;
      }
    }
  } finally {
    await prisma.$disconnect();
  }
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error('ERROR', e.message); process.exit(1); });
