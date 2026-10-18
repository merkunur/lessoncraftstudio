#!/usr/bin/env node
/**
 * verify-sitemap-integrity.js [--poison]
 *
 * Static gate for the two sitemap defects found 2026-10-18 (operator: "make sure that
 * the sitemap is flawless"). No server, no DB — run from deploy.sh before the build.
 *
 *  1. TOPIC SLUGS ARE UNIQUE PER LOCALE across the topic axes (exercise-type, theme,
 *     educational-level). sv `feelings` (type) and `emotions` (theme) both had slug
 *     `kanslor`: the route resolves the type first, so the theme page was unreachable
 *     and /sv/topic/kanslor sat in sitemap shard 3 twice.
 *  2. LANDING HREFLANG IS RECIPROCAL, measured through the REAL
 *     frontend/lib/seo/landing-content.ts getSiblingLandingsByCoordinate over every
 *     landing of every locale: if A lists B as an alternate, B lists A. The old
 *     last-wins coordinate index produced 18,603 one-way pairs in shards 4-7 and in
 *     the landing HTML. Reciprocity is a property of the output — the gate does not
 *     re-implement the clustering it checks.
 *  3. The hand-copied port in scripts/seo-landing/render-landing-html.js (which renders
 *     the static landing HTML) carries the same cluster key regex and uniqueness rule.
 *
 * --poison: (a) injects a slug collision into a copy of the taxonomy, (b) re-runs check 2
 *   with the uniqueness rule removed from the transpiled source — both MUST fail.
 * Exit 0 PASS · 1 FAIL · 2 REFUSED (nothing measured).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const Module = require('module');

const REPO = path.resolve(__dirname, '..');
const FE = path.join(REPO, 'frontend');
const TAX = JSON.parse(fs.readFileSync(path.join(FE, 'config', 'topics-taxonomy.json'), 'utf8'));
const LC_TS = path.join(FE, 'lib', 'seo', 'landing-content.ts');
const PORT = path.join(REPO, 'scripts', 'seo-landing', 'render-landing-html.js');
const POISON = process.argv.includes('--poison');
const ts = require(path.join(FE, 'node_modules', 'typescript'));

function slugCollisions(tax) {
  const seen = new Map();
  const out = [];
  for (const axis of ['exercise-type', 'theme', 'educational-level']) {
    for (const [key, e] of Object.entries(tax.axes[axis] || {})) {
      for (const [loc, slug] of Object.entries(e.slug || {})) {
        const id = loc + '/' + slug;
        if (seen.has(id)) out.push(`${id} <- ${seen.get(id)} AND ${axis}:${key}`);
        else seen.set(id, `${axis}:${key}`);
      }
    }
  }
  return out;
}

function loadLandingContent(mutate) {
  let src = fs.readFileSync(LC_TS, 'utf8');
  if (mutate) src = mutate(src);
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }, fileName: LC_TS }).outputText;
  const m = new Module(LC_TS, null);
  m.filename = LC_TS;
  m.paths = Module._nodeModulePaths(path.dirname(LC_TS));
  const real = m.require.bind(m);
  m.require = (id) => (id === '@/lib/seo/url' ? { CANONICAL_HOST: 'https://www.lessoncraftstudio.com' } : real(id));
  const cwd = process.cwd();
  process.chdir(FE); // loadFile looks in <cwd>/content/seo-landing first
  try { m._compile(js, LC_TS); } finally { process.chdir(cwd); }
  return { lc: m.exports, run: (fn) => { const c = process.cwd(); process.chdir(FE); try { return fn(); } finally { process.chdir(c); } } };
}

function reciprocity({ lc, run }) {
  return run(() => {
    const locales = lc.getLandingLocales();
    const alt = new Map();
    let landings = 0;
    for (const loc of locales) {
      for (const l of lc.getAllLandings(loc)) {
        landings++;
        const m = {};
        for (const s of lc.getSiblingLandingsByCoordinate(l, loc)) m[s.locale] = s.slug;
        alt.set(loc + '/' + l.slug, m);
      }
    }
    let pairs = 0;
    const bad = [];
    for (const [self, m] of alt) {
      const [loc] = self.split('/');
      for (const [o, slug] of Object.entries(m)) {
        pairs++;
        const back = alt.get(o + '/' + slug);
        if (!back || back[loc] !== self.slice(loc.length + 1)) bad.push(`${self} -> ${o}/${slug}`);
      }
    }
    return { landings, pairs, bad };
  });
}

const fails = [];
// 1
const coll = slugCollisions(TAX);
if (coll.length) fails.push(...coll.map((c) => 'topic slug collision: ' + c));
console.log(`${coll.length ? 'FAIL' : 'PASS'} topic slugs unique per locale (${coll.length} collisions)`);
// 2
const r = reciprocity(loadLandingContent());
if (r.landings < 1000 || r.pairs < 10000) { console.error(`REFUSED: measured only ${r.landings} landings / ${r.pairs} hreflang pairs`); process.exit(2); }
if (r.bad.length) fails.push(...r.bad.slice(0, 10).map((b) => 'one-way hreflang: ' + b));
console.log(`${r.bad.length ? 'FAIL' : 'PASS'} landing hreflang reciprocal: ${r.pairs} pairs over ${r.landings} landings, ${r.bad.length} one-way`);
// 3
const port = fs.readFileSync(PORT, 'utf8');
const portOk = port.includes('function clusterKey(l)') && port.includes("/-((?:k|g\\d)\\d{3})(?:-\\d+)?$/") && port.includes('m.set(k, m.has(k) ? null : l)') && port.includes('getSiblingLandingsByCoordinate(l, locale)');
if (!portOk) fails.push('render-landing-html.js port is out of sync with landing-content.ts clusterKey/clusterIndex');
console.log(`${portOk ? 'PASS' : 'FAIL'} landing HTML port in sync`);

// 4 — deck families (shards 0/1): a family holding TWO decks of one locale must still emit
// only reciprocal pairs; the non-representative deck declares itself alone.
const DECK_TS = path.join(FE, 'lib', 'seo', 'deck-sitemap-hreflang.ts');
function deckFamilyCheck(mutate) {
  let src = fs.readFileSync(DECK_TS, 'utf8');
  if (mutate) src = mutate(src);
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const m = new Module(DECK_TS, null);
  m.require = (id) => (id === '@/lib/seo/hreflang' ? { getHreflangCode: (l) => (l === 'pt' ? 'pt-BR' : l) } : require(id));
  m._compile(js, DECK_TS);
  const fam = [
    { language: 'es', slug: 'b-deck' }, { language: 'de', slug: 'x' }, { language: 'es', slug: 'a-deck' }, { language: 'en', slug: 'e' },
  ];
  const B = 'https://x';
  const alts = new Map();
  for (const d of fam) {
    const lines = m.exports.buildDeckHreflangLinks(d, [...fam].reverse(), B, (s) => s);
    alts.set(`${B}/${d.language}/decks/${d.slug}/`, lines.map((l) => [l.match(/hreflang="([^"]+)"/)[1], l.match(/href="([^"]+)"/)[1]]));
  }
  let bad = 0;
  for (const [self, ls] of alts) {
    for (const [code, href] of ls) {
      if (code === 'x-default' || href === self) continue;
      const back = alts.get(href);
      if (!back || !back.some(([, h]) => h === self)) bad++;
    }
  }
  return bad;
}
const deckBad = deckFamilyCheck();
if (deckBad) fails.push(`deck family hreflang: ${deckBad} one-way pairs`);
console.log(`${deckBad ? 'FAIL' : 'PASS'} deck family with two decks of one locale: ${deckBad} one-way pairs`);

if (POISON) {
  const p3 = deckFamilyCheck((src) => src.replace('if (byCode.get(getHreflangCode(deck.language)) !== urlFor(deck)) {', 'if (false) {')) > 0;
  console.log(`${p3 ? 'PASS' : 'FAIL'} poison: deck builder without the representative guard is caught`);
  if (!p3) fails.push('deck poison not caught');
  const t2 = JSON.parse(JSON.stringify(TAX));
  const anyType = Object.keys(t2.axes['exercise-type'])[0];
  const anyTheme = Object.keys(t2.axes.theme)[0];
  t2.axes.theme[anyTheme].slug.sv = t2.axes['exercise-type'][anyType].slug.sv;
  const p1 = slugCollisions(t2).length > 0;
  const p2r = reciprocity(loadLandingContent((src) => src.replace('m.set(k, m.has(k) ? null : l);', 'm.set(k, l);').replace('if (!own || own.slug !== landing.slug) return out;', '')));
  const p2 = p2r.bad.length > 0;
  console.log(`${p1 ? 'PASS' : 'FAIL'} poison: injected slug collision is caught`);
  console.log(`${p2 ? 'PASS' : 'FAIL'} poison: last-wins index gives ${p2r.bad.length} one-way pairs (must be > 0)`);
  if (!p1 || !p2) fails.push('poison not caught');
}

if (fails.length) { console.log('\nFAIL\n  ' + fails.join('\n  ')); process.exit(1); }
console.log('\nPASS — sitemap topic slugs unique, landing hreflang reciprocal');
