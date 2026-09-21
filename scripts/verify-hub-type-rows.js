#!/usr/bin/env node
/**
 * verify-hub-type-rows.js [--keys=a,b] [--locales=en,de] [--warn-missing-keys] [--poison]
 *
 * THE gate for the operator's standing OBS: "when the user clicks a worksheet
 * type in the left sidebar of /[locale]/worksheets, ALL the worksheets of that
 * type must show." Measured 2026-09-13 why past batches vanished: the rail is
 * corpus-derived and grouped by taxonomy SUBJECT via apps.<key>.default_subject
 * — a family registered in axes['exercise-type'] but WITHOUT apps.<key> is
 * rendered NOWHERE in the rail (typed ?type= still works); labels use
 * name.<locale> with NO en fallback; rows = the landing corpus filtered by the
 * exact raw key (applyLandingFilters).
 *
 * So, per (family key × locale), through the hub's OWN code (the real
 * worksheets-sheets.ts expandHubRows + worksheets-catalog.ts applyLandingFilters
 * + taxonomy.ts, transpiled, no stubs):
 *   rows == expected (docs/worksheet-gen/b3-designs/hub-expectations.json —
 *     6 minus the design-recorded refusals, NEVER padded) · slugs unique ·
 *     level ∈ the locale's band keys · canonicalDeckSlug set · b3 keys: mode a
 *     non-empty string (the nt20-C ruling; the b2 controls are mode:null)
 *   apps[key] exists · default_subject ∈ listSubjectKeys() ·
 *     exercise_type_axis_key === key · the key is in SOME subject bucket
 *     (exerciseTypeKeysForSubject — exactly what page.tsx groups the rail by) ·
 *     axes['exercise-type'][key].slug/name for all 11 locales via getAxisName
 *     (the no-fallback path the rail uses) · key ∉ INTERACTIVE_EXERCISE_TYPES
 *     (a printable never goes there; it would move the rows to the wrong tab).
 *
 * Exit 0 PASS · 1 FAIL · 2 REFUSED (empty corpus / unknown key / no expectations)
 * --warn-missing-keys: a (key, locale) with 0 rows WARNs instead of failing, and
 *   the taxonomy checks WARN for a key with 0 rows everywhere — the deploy-time
 *   mode until the batch's landings land; dropped at close-out.
 * --poison: control + 12 mutations over a synthetic fixture key cloned from the
 *   `articles` corpus (stable before AND after the batch ships). Each must be
 *   caught; a needle that changes nothing is itself a failure.
 * The SSR "?type=<key> link exists" check stays in verify-worksheets-hub-render.js
 * (needs a dev server); here the same condition is asserted statically.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const Module = require('module');

const REPO = path.resolve(__dirname, '..');
const FRONTEND = path.join(REPO, 'frontend');
const CATALOG_TS = path.join(FRONTEND, 'lib', 'worksheets-catalog.ts');
const SHEETS_TS = path.join(FRONTEND, 'lib', 'worksheets-sheets.ts');
const TAXONOMY_TS = path.join(FRONTEND, 'lib', 'taxonomy.ts');
const LANDING_DIR = path.join(FRONTEND, 'content', 'seo-landing');
const TAXONOMY_JSON = path.join(FRONTEND, 'config', 'topics-taxonomy.json');
const FORMATS_TS = path.join(FRONTEND, 'config', 'interactive-exercise-types.ts');
// --expect=<file> selects another batch's expectation matrix (nt10-D: docs/worksheet-gen/b4-designs/hub-expectations.json);
// the default stays the nt20-C file so the existing deploy.sh call is unchanged (a second call gates b4).
const EXPECT_ARG = process.argv.find((a) => a.startsWith('--expect='));
const EXPECT = EXPECT_ARG ? path.resolve(REPO, EXPECT_ARG.slice('--expect='.length)) : path.join(REPO, 'docs', 'worksheet-gen', 'b3-designs', 'hub-expectations.json');

const ALL_LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
// per-locale band keys (the LEVEL_KEYS map of scripts/seo-landing/gen-b2var-landings.js, + the sub-K key the corpus uses)
const LEVEL_KEYS = {
  en: ['preschool', 'kindergarten', 'grade-1', 'grade-2', 'grade-3'],
  de: ['vorschule', 'kindergarten', '1-klasse', '2-klasse', '3-klasse'],
  es: ['preescolar', 'jardin-infantil', 'primer-grado', 'segundo-grado', 'tercer-grado'],
  fr: ['maternelle', 'cp', 'ce1', 'ce2'],
  pt: ['educacao-infantil', '1o-ano', '2o-ano', '3o-ano'],
  it: ['infanzia', 'classe-prima', 'classe-seconda', 'classe-terza'],
  nl: ['peuterklas', 'kleuters', 'kleuterklas', 'groep-3', 'groep-4', 'groep-5'],
  sv: ['forskola', 'ak-1', 'ak-2', 'ak-3'],
  da: ['boernehaveklasse', '1-klasse', '2-klasse', '3-klasse'],
  no: ['1-trinn', '2-trinn', '3-trinn', '4-trinn'],
  fi: ['esikoulu', '1-luokka', '2-luokka', '3-luokka'],
};

const argv = process.argv.slice(2);
const arg = (n, d) => { const h = argv.find((a) => a.startsWith('--' + n + '=')); return h ? h.slice(n.length + 3) : d; };
const WARN_MISSING = argv.includes('--warn-missing-keys');
const POISON = argv.includes('--poison');
const LOCALES = String(arg('locales', ALL_LOCALES.join(','))).split(',').filter(Boolean);
const KEYS_ARG = arg('keys', null);

/* ------------------------------------------------------------------ *
 * Load the real TypeScript modules over an INJECTABLE taxonomy object
 * ------------------------------------------------------------------ */
const ts = require(path.join(FRONTEND, 'node_modules', 'typescript'));
const cache = new Map();

function loadTs(file, ctx) {
  const ck = file + '#' + ctx.id;
  if (cache.has(ck)) return cache.get(ck);
  const src = fs.readFileSync(file, 'utf8');
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: file,
  }).outputText;
  const m = new Module(file, null);
  m.filename = file;
  m.paths = Module._nodeModulePaths(path.dirname(file));
  const realRequire = m.require.bind(m);
  m.require = (id) => {
    if (id === '@/config/topics-taxonomy.json') return ctx.taxonomy;
    if (id === './taxonomy' || id === '@/lib/taxonomy') return loadTs(TAXONOMY_TS, ctx);
    if (id.startsWith('@/lib/')) return loadTs(path.join(FRONTEND, 'lib', id.slice(6) + '.ts'), ctx);
    if (id === './seo/landing-content' || id === '@/lib/seo/landing-content') return {};   // type-only import in these modules
    if (id === './activities-catalog') return {};                                             // type-only import
    return realRequire(id);
  };
  m._compile(js, file);
  cache.set(ck, m.exports);
  return m.exports;
}

function interactiveSet() {
  const src = fs.readFileSync(FORMATS_TS, 'utf8');
  const start = src.indexOf('new Set([');
  const end = src.indexOf(']', start);
  const keys = [...src.slice(start, end).matchAll(/'([^']+)'/g)].map((m) => m[1]);
  if (keys.length < 10) throw new Error('gate: parsed only ' + keys.length + ' interactive types');
  return new Set(keys);
}

/* ------------------------------------------------------------------ *
 * Corpus + context
 * ------------------------------------------------------------------ */
function readCorpus(locale) {
  const file = path.join(LANDING_DIR, locale + '.json');
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')).landings;
}

function buildCtx(overrides) {
  const ctx = {
    id: 'live',
    taxonomy: JSON.parse(fs.readFileSync(TAXONOMY_JSON, 'utf8')),
    interactive: interactiveSet(),
    corpus: {},
    expect: fs.existsSync(EXPECT) ? JSON.parse(fs.readFileSync(EXPECT, 'utf8')) : null,
  };
  for (const loc of LOCALES) ctx.corpus[loc] = readCorpus(loc);
  return Object.assign(ctx, overrides || {});
}

/** Hub rows for one locale through the REAL expandHubRows (as page.tsx does). */
function hubRows(ctx, locale) {
  const all = ctx.corpus[locale];
  if (!all) return null;
  const sheets = loadTs(SHEETS_TS, ctx);
  const landings = all.filter((l) => !l.coordinate.target);
  const slugs = sheets.collapsedSheetSlugs(all);
  const facts = new Map(slugs.map((s) => [s, { id: s, title: s, hasAnswerKey: false }]));
  return sheets.expandHubRows(landings, facts, (s) => '/' + locale + '/decks/' + s + '/', () => '');
}

/* ------------------------------------------------------------------ *
 * The sweep
 * ------------------------------------------------------------------ */
function sweep(ctx, opts) {
  const fails = [], warns = [];
  const quiet = opts && opts.quiet;
  if (!ctx.expect || !ctx.expect.keys || !Object.keys(ctx.expect.keys).length) return { refused: 'no expectations (docs/worksheet-gen/b3-designs/hub-expectations.json)' };
  const b3Keys = Object.keys(ctx.expect.keys);
  const controls = ctx.expect.controls || {};
  let keys = b3Keys.concat(Object.keys(controls));
  if (ctx.extraKeys) keys = keys.concat(Object.keys(ctx.extraKeys));
  if (ctx.onlyKeys) keys = keys.filter((k) => ctx.onlyKeys.includes(k));   // poison mode: the fixture + the live controls (the b3 keys may not have landed)
  if (KEYS_ARG && !ctx.extraKeys) {
    const want = KEYS_ARG.split(',');
    const unknown = want.filter((k) => !keys.includes(k));
    if (unknown.length) return { refused: 'unknown --keys: ' + unknown.join(',') };
    keys = want;
  }
  const catalog = loadTs(CATALOG_TS, ctx);
  const tax = loadTs(TAXONOMY_TS, ctx);
  const subjects = tax.listSubjectKeys();
  const rowsByLoc = {};
  for (const loc of LOCALES) {
    const rows = hubRows(ctx, loc);
    if (!rows || !rows.length) return { refused: 'empty landing corpus for ' + loc };
    rowsByLoc[loc] = rows;
  }
  let cells = 0, rowsChecked = 0;
  for (const key of keys) {
    const isB3 = b3Keys.includes(key) || !!(ctx.extraKeys && ctx.extraKeys[key] && ctx.extraKeys[key].b3);
    const expectedRow = ctx.expect.keys[key] || (ctx.extraKeys && ctx.extraKeys[key] && ctx.extraKeys[key].rows) || null;
    let anyRows = 0;
    for (const loc of LOCALES) {
      const sel = catalog.applyLandingFilters(rowsByLoc[loc], { type: key });
      const expected = expectedRow ? expectedRow[loc] : controls[key];
      cells++; rowsChecked += sel.length; anyRows += sel.length;
      if (sel.length === 0 && WARN_MISSING && isB3) { warns.push(`${key}/${loc}: 0 rows (expected ${expected}) — not landed yet`); continue; }
      if (sel.length !== expected) fails.push(`${key}/${loc}: ${sel.length} rows on the hub, expected ${expected}`);
      const slugs = new Set();
      for (const l of sel) {
        if (slugs.has(l.slug)) fails.push(`${key}/${loc}: duplicate slug ${l.slug}`);
        slugs.add(l.slug);
        if (!LEVEL_KEYS[loc].includes(l.coordinate.level)) fails.push(`${key}/${loc}: ${l.slug} level "${l.coordinate.level}" is not a ${loc} band key`);
        if (!l.canonicalDeckSlug) fails.push(`${key}/${loc}: ${l.slug} has no canonicalDeckSlug`);
        if (isB3 && !(typeof l.coordinate.mode === 'string' && l.coordinate.mode)) fails.push(`${key}/${loc}: ${l.slug} mode must be the face string (got ${JSON.stringify(l.coordinate.mode)})`);
      }
    }
    // taxonomy / rail conditions (static form of "the key reaches the sidebar")
    const app = ctx.taxonomy.apps[key];
    const taxFails = [];
    if (!app) taxFails.push(`${key}: no apps.${key} in topics-taxonomy.json — the rail renders it NOWHERE`);
    else {
      if (!subjects.includes(app.default_subject)) taxFails.push(`${key}: default_subject "${app.default_subject}" is not a subject (${subjects.join('/')})`);
      if (app.exercise_type_axis_key !== key) taxFails.push(`${key}: exercise_type_axis_key is "${app.exercise_type_axis_key}"`);
      if (!subjects.some((s) => tax.exerciseTypeKeysForSubject(s).includes(key))) taxFails.push(`${key}: not in any subject bucket (exerciseTypeKeysForSubject) — invisible in the rail`);
    }
    const axis = (ctx.taxonomy.axes['exercise-type'] || {})[key];
    if (!axis) taxFails.push(`${key}: no axes['exercise-type'].${key}`);
    else for (const loc of ALL_LOCALES) {
      if (!axis.slug || !axis.slug[loc]) taxFails.push(`${key}: missing slug.${loc}`);
      if (tax.getAxisName('exercise-type', key, loc) === null) taxFails.push(`${key}: missing name.${loc} (the rail has no en fallback)`);
    }
    if (ctx.interactive.has(key)) taxFails.push(`${key}: listed in INTERACTIVE_EXERCISE_TYPES — a printable family never goes there`);
    if (taxFails.length) { if (WARN_MISSING && isB3 && anyRows === 0) warns.push(...taxFails.map((f) => f + ' (not landed yet)')); else fails.push(...taxFails); }
  }
  if (!quiet) console.log(`checked ${keys.length} keys × ${LOCALES.length} locales = ${cells} cells, ${rowsChecked} hub rows`);
  if (rowsChecked === 0 && !WARN_MISSING) fails.push('non-vacuity: 0 hub rows selected across every key — nothing was measured');
  return { fails, warns };
}

/* ------------------------------------------------------------------ *
 * Poison — a synthetic fixture key cloned from the live `articles` corpus
 * ------------------------------------------------------------------ */
const FX = 'b3-fixture';
function fixtureCtx() {
  const ctx = buildCtx({ id: 'fixture' });
  ctx.taxonomy = JSON.parse(JSON.stringify(ctx.taxonomy));
  ctx.taxonomy.apps[FX] = { default_subject: 'letters', default_age_range: '5-7', exercise_type_axis_key: FX };
  ctx.taxonomy.axes['exercise-type'][FX] = { slug: {}, name: {} };
  for (const loc of ALL_LOCALES) { ctx.taxonomy.axes['exercise-type'][FX].slug[loc] = FX + '-' + loc; ctx.taxonomy.axes['exercise-type'][FX].name[loc] = 'Fixture ' + loc; }
  const rows = {};
  for (const loc of LOCALES) {
    const src = ctx.corpus[loc].filter((l) => l.coordinate.type === 'articles' && !l.coordinate.target);
    const clones = src.map((l) => Object.assign(JSON.parse(JSON.stringify(l)), { slug: l.slug + '-b3fx', coordinate: Object.assign({}, l.coordinate, { type: FX, mode: 'base' }) }));
    ctx.corpus[loc] = ctx.corpus[loc].concat(clones);
    rows[loc] = clones.length;
  }
  ctx.extraKeys = { [FX]: { b3: true, rows } };
  ctx.onlyKeys = [FX].concat(Object.keys((ctx.expect && ctx.expect.controls) || {}));
  return ctx;
}
const clone = (ctx, id) => { const c = Object.assign({}, ctx, { id, taxonomy: JSON.parse(JSON.stringify(ctx.taxonomy)), corpus: {} }); for (const l of Object.keys(ctx.corpus)) c.corpus[l] = JSON.parse(JSON.stringify(ctx.corpus[l])); return c; };
const fxRows = (c, loc) => c.corpus[loc].filter((l) => l.coordinate.type === FX);
const POISONS = [
  ['drop one fixture landing (de)', (c) => { const i = c.corpus.de.findIndex((l) => l.coordinate.type === FX); if (i < 0) return false; c.corpus.de.splice(i, 1); return true; }],
  ['delete apps.<key>', (c) => { if (!c.taxonomy.apps[FX]) return false; delete c.taxonomy.apps[FX]; return true; }],
  ['one row re-typed to articles', (c) => { const r = fxRows(c, 'en')[0]; if (!r) return false; r.coordinate.type = 'articles'; return true; }],
  ['mode:null on a b3 row', (c) => { const r = fxRows(c, 'fi')[0]; if (!r) return false; r.coordinate.mode = null; return true; }],
  ['name.fi removed', (c) => { const a = c.taxonomy.axes['exercise-type'][FX]; if (!a.name.fi) return false; delete a.name.fi; return true; }],
  ['duplicate slug', (c) => { const r = fxRows(c, 'sv'); if (r.length < 2) return false; r[1].slug = r[0].slug; return true; }],
  ['level outside the band map', (c) => { const r = fxRows(c, 'nl')[0]; if (!r) return false; r.coordinate.level = 'grade-9'; return true; }],
  ['empty canonicalDeckSlug', (c) => { const r = fxRows(c, 'pt')[0]; if (!r) return false; r.canonicalDeckSlug = ''; return true; }],
  ['key added to the interactive set', (c) => { if (c.interactive.has(FX)) return false; c.interactive = new Set([...c.interactive, FX]); return true; }],
  ['illegal default_subject', (c) => { if (!c.taxonomy.apps[FX]) return false; c.taxonomy.apps[FX].default_subject = 'history'; return true; }],
  ['exercise_type_axis_key points elsewhere', (c) => { if (!c.taxonomy.apps[FX]) return false; c.taxonomy.apps[FX].exercise_type_axis_key = 'articles'; return true; }],
];

function runPoisons() {
  console.log('poison tests — each must FAIL the gate\n');
  const base = fixtureCtx();
  const ctrl = sweep(base, { quiet: true });
  if (ctrl.refused || ctrl.fails.length) {
    console.log('  ✗ CONTROL FAILED — the fixture over the live corpus does not pass, so no poison result means anything');
    (ctrl.fails || [ctrl.refused]).slice(0, 5).forEach((f) => console.log('      ' + f));
    return 1;
  }
  console.log('  ✓ control: the fixture key passes over the live corpus (' + Object.values(base.extraKeys[FX].rows).reduce((a, b) => a + b, 0) + ' fixture rows)\n');
  let bad = 0, i = 0;
  for (const [name, mutate] of POISONS) {
    const c = clone(base, 'poison-' + (i++));
    let changed;
    try { changed = mutate(c); } catch (e) { changed = false; }
    if (!changed) { console.log(`  ✗ ${name} — THE NEEDLE MATCHED NOTHING`); bad++; continue; }
    const r = sweep(c, { quiet: true });
    const caught = r.refused || (r.fails && r.fails.length);
    if (!caught) { console.log(`  ✗ ${name} — SURVIVED`); bad++; }
    else console.log(`  ✓ ${name} — killed (${r.refused ? 'refused: ' + r.refused : String(r.fails[0]).slice(0, 100)})`);
  }
  // 12: an empty corpus must be REFUSED (exit 2), never FAIL or PASS
  const c = clone(base, 'poison-empty'); c.corpus.sv = [];
  const r = sweep(c, { quiet: true });
  if (r.refused) console.log('  ✓ empty sv corpus — refused (' + r.refused + ')'); else { console.log('  ✗ empty sv corpus — NOT refused'); bad++; }
  console.log(bad === 0 ? '\nall poisons killed.' : `\n${bad} poison(s) survived.`);
  return bad === 0 ? 0 : 1;
}

/* ------------------------------------------------------------------ */
if (POISON) process.exit(runPoisons());
const res = sweep(buildCtx());
if (res.refused) { console.log('REFUSED — ' + res.refused); process.exit(2); }
res.warns.forEach((w) => console.log('  ⚠ ' + w));
if (res.fails.length) {
  console.log('\nFAIL — ' + res.fails.length + ' problem(s):');
  res.fails.slice(0, 60).forEach((f) => console.log('  ✗ ' + f));
  if (res.fails.length > 60) console.log('  … and ' + (res.fails.length - 60) + ' more');
  process.exit(1);
}
console.log('\nPASS — every family lists exactly its expected rows under its type' + (res.warns.length ? ' (' + res.warns.length + ' warnings: keys not landed yet)' : '') + '.');
process.exit(0);
