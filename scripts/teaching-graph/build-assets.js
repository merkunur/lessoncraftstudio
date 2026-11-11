#!/usr/bin/env node
/**
 * The asset index (Daily Teaching System, Part 1 step 2): what REALLY exists for each worksheet type, tool and
 * activity in each of the 11 languages. Generated, never hand-written.
 *
 *   node scripts/teaching-graph/build-assets.js            → frontend/content/teaching-graph/assets/<loc>.json ×11
 *                                                            + out/teaching-graph/screen-rule.txt
 *   node scripts/teaching-graph/build-assets.js --check     fails when a committed file differs from the build
 *
 * Sources (each is the place that already knows the fact):
 *   published pages     out/teaching-graph/decks.tsv — pulled from the server by pull-decks.sh: every published page
 *                       with its type, level and whether THE PAGE ITSELF has a Check button (a screen version)
 *   worksheet types     scripts/worksheet-gen/types/** (the registry: id, family, grade band)
 *   landing pages       frontend/content/seo-landing/<loc>.json (the indexable page of a type in that language)
 *   makers              scripts/makers/topic-map.js (which maker makes more of a family) and, for the languages a
 *                       template is built in, out/makers/<maker>/<current>/templates.json
 *   tools               frontend/content/teaching-graph/tools.json + frontend/messages/tool-content/<loc>.json
 *   activities          mini tools/*-activities.json (an activity is live in a language when it has a slug there)
 *
 * Per type and language the index says: pages per level [easy, core, hard], pages with a screen per level, the
 * indexable page and its landing, whether the pages form a Level Set (two or more), and the maker.
 * Pages of the 29 retired apps carry no type code: they are counted per family under `apps` and belong to no
 * teaching point (the makers replaced the apps).
 *
 * screen-rule.txt compares, page by page, what the page is with what frontend/lib/level-sets.ts pageIsInteractive
 * says (the rule the Level Set hubs and class links use). A disagreement there is a defect of the rule or of a page.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const DIR = path.join(REPO, 'frontend', 'content', 'teaching-graph');
const OUT = path.join(REPO, 'out', 'teaching-graph');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const RUNGS = ['easy', 'core', 'hard'];
const readJson = (f, fallback) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { if (fallback !== undefined) return fallback; throw new Error('cannot read ' + path.relative(REPO, f) + ': ' + e.message); } };

function levelSets() {
  const esbuild = require(path.join(REPO, 'node_modules', 'esbuild'));
  fs.mkdirSync(OUT, { recursive: true });
  const out = path.join(OUT, 'level-sets.bundle.js');
  esbuild.buildSync({ entryPoints: [path.join(REPO, 'frontend', 'lib', 'level-sets.ts')], bundle: true, platform: 'node', format: 'cjs', outfile: out, alias: { '@': path.join(REPO, 'frontend') }, external: ['@prisma/client'], logLevel: 'error' });
  delete require.cache[require.resolve(out)];
  return require(out);
}
/**
 * The type code a page's address carries. Most end in it (…-g1116, …-g1116-4); pages made per UNIT carry the unit
 * after it (…-g1309-10-og, …-k393-10-forestrabbit), which the site's own reader (level-sets.ts variationCodeOf)
 * does not read. The graph reads both: the last code-shaped part of the address.
 */
const codeOfSlug = (slug) => { const all = slug.match(/-(?:k|g[0-9])[0-9]{3}(?=-|$)/g); return all ? all[all.length - 1].slice(1) : null; };
const typeIdOf = (code) => { const m = /^(k|g\d)(\d{3})$/.exec(code); return m ? m[1].toUpperCase() + '-' + m[2] : null; };

function build(opt = {}) {
  const problems = [];
  const bad = (m) => problems.push(m);
  const L = levelSets();
  const { loadAllTypes } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'load-types.js'));
  const loaded = loadAllTypes();
  const types = new Map((Array.isArray(loaded) ? loaded : Object.values(loaded)).map((t) => [t.id, t]));
  const tsv = opt.decksText != null ? opt.decksText : fs.readFileSync(path.join(OUT, 'decks.tsv'), 'utf8');
  const rows = tsv.split('\n').filter(Boolean).map((l) => l.split('\t'));
  if (rows.length && rows[0].length !== 6) throw new Error('decks.tsv has ' + rows[0].length + ' columns (6 expected: language, slug, type, mode, indexable, screen): run pull-decks.sh');

  // makers: type → maker (families, plus single types pulled in, minus hidden ones), and the languages a template is built in
  const MAKERS = require(path.join(REPO, 'scripts', 'makers', 'topic-map.js')).MAKERS;
  const versions = readJson(path.join(REPO, 'out', 'makers', 'versions.json'), {});
  const makerOf = new Map(), makerLocales = new Map(), makerScreen = new Map();
  for (const m of MAKERS) {
    const hide = new Set(m.hideIds || []);
    const cur = versions[m.id] && versions[m.id].current;
    const tj = cur ? readJson(path.join(REPO, 'out', 'makers', m.id, cur, 'templates.json'), null) : null;
    if (tj) for (const t of tj.templates) { makerOf.set(t.id, m.id); makerLocales.set(t.id, new Set(t.locales || [])); makerScreen.set(t.id, (t.screen === 'marks' || t.screen === 'declared') && (t.screenLevels || []).length > 0); }
    else for (const t of types.values()) if (((m.families || []).includes(t.exerciseType) || (m.extraIds || []).includes(t.id)) && !hide.has(t.id) && !makerOf.has(t.id)) makerOf.set(t.id, m.id);
  }

  const tools = readJson(path.join(DIR, 'tools.json')).tools;
  const manifests = [];
  for (const f of fs.readdirSync(path.join(REPO, 'mini tools')).filter((x) => x.endsWith('-activities.json'))) {
    const j = readJson(path.join(REPO, 'mini tools', f));
    for (const e of (Array.isArray(j) ? j : j.activities || [])) manifests.push(e);
  }

  const out = {}, ruleLines = [];
  let ruleAgree = 0, ruleTotal = 0, unread = 0;
  for (const loc of LOCALES) {
    const landings = readJson(path.join(REPO, 'frontend', 'content', 'seo-landing', loc + '.json'), []);
    const landingList = Array.isArray(landings) ? landings : (landings.landings || Object.values(landings));
    const landingByDeck = new Map(landingList.filter((l) => l && l.canonicalDeckSlug).map((l) => [l.canonicalDeckSlug, l.slug]));
    const T = {}, apps = {};
    let pages = 0;
    for (const [lang, slug, family, mode, idx, screen] of rows) {
      if (lang !== loc) continue;
      pages++;
      const code = codeOfSlug(slug);
      const has = screen === '1';
      // the site's rule exactly as the site calls it (with its own reading of the code), and with the code the address really carries
      const rule = L.pageIsInteractive(family, L.variationCodeOf(slug) || '', idx === 't');
      const ruleFull = L.pageIsInteractive(family, code || '', idx === 't');
      ruleTotal++;
      if (!L.variationCodeOf(slug) && code) unread++;
      if (rule === has) ruleAgree++; else ruleLines.push([loc, slug, family, idx === 't' ? 'indexable' : 'noindex', 'rule says ' + (rule ? 'playable' : 'print-only'), 'the page ' + (has ? 'HAS a Check' : 'has no Check'), ruleFull === has ? 'right once the code is read from the whole address' : 'wrong with the full code too'].join('\t'));
      const id = code ? typeIdOf(code) : null;
      if (!id) { const a = apps[family] || (apps[family] = { n: 0, s: 0 }); a.n++; if (has) a.s++; continue; }
      if (!types.has(id)) { bad(loc + ': page ' + slug + ' carries the code of a type that does not exist (' + id + ')'); continue; }
      const rung = mode === '-' ? 'core' : RUNGS.includes(mode) ? mode : null;
      if (!rung) { bad(loc + ': page ' + slug + ' has the level "' + mode + '"'); continue; }
      const t = T[id] || (T[id] = { p: [0, 0, 0], s: [0, 0, 0] });
      const k = RUNGS.indexOf(rung);
      t.p[k]++; if (has) t.s[k]++;
      if (idx === 't') { t.base = slug; if (landingByDeck.has(slug)) t.landing = landingByDeck.get(slug); }
    }
    for (const [id, t] of Object.entries(T)) if (t.p[0] + t.p[1] + t.p[2] >= 2) t.set = 1;
    // a maker template that is built in this language, also when no page of the type is published here
    for (const [id, maker] of makerOf) {
      const locs = makerLocales.get(id);
      if (locs && !locs.has(loc)) continue;
      const t = T[id] || (T[id] = { p: [0, 0, 0], s: [0, 0, 0] });
      t.maker = maker;
      if (makerScreen.get(id)) t.ms = 1;
    }
    const sortedT = {};
    for (const id of Object.keys(T).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) sortedT[id] = T[id];
    const toolContent = readJson(path.join(REPO, 'frontend', 'messages', 'tool-content', loc + '.json'), {});
    const toolSlugs = {};
    for (const key of Object.keys(tools)) if (toolContent[key] && toolContent[key].slug) toolSlugs[key] = toolContent[key].slug;
    const acts = {};
    for (const e of manifests) { const s = e.slug && typeof e.slug === 'object' ? e.slug[loc] : (loc === 'en' && typeof e.slug === 'string' ? e.slug : null); if (s) acts[e.id] = s; }
    out[loc] = { locale: loc, pages, types: sortedT, apps, tools: toolSlugs, activities: acts };
  }
  return { assets: out, problems, ruleLines, ruleAgree, ruleTotal, unread };
}

const fileText = (a) => JSON.stringify(Object.assign({ $comment: 'GENERATED by scripts/teaching-graph/build-assets.js from the published catalogue (pull-decks.sh), the worksheet type registry, the landings, the makers, tools.json and the activity manifests. Per type: p = pages per level [easy, core, hard]; s = pages with a screen version per level; base = the indexable page; landing = its landing page; set = 1 when the pages form a Level Set; maker = the maker that makes more; ms = 1 when the maker template has a screen version. Do not edit by hand.' }, a)) + '\n';

if (require.main === module) {
  const r = build();
  if (r.problems.length) { for (const m of r.problems.slice(0, 40)) console.log('FAIL  ' + m); console.log(r.problems.length + ' problem(s)'); process.exit(1); }
  fs.mkdirSync(path.join(DIR, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'screen-rule.txt'), r.ruleLines.join('\n') + (r.ruleLines.length ? '\n' : ''));
  let diff = 0;
  for (const loc of LOCALES) {
    const f = path.join(DIR, 'assets', loc + '.json'), text = fileText(r.assets[loc]);
    if (process.argv.includes('--check')) { if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n') !== text) { diff++; console.log('FAIL  assets/' + loc + '.json is not what the builder produces from decks.tsv'); } }
    else fs.writeFileSync(f, text);
    const a = r.assets[loc];
    const n = Object.values(a.types);
    console.log(loc + ': ' + a.pages + ' pages; ' + n.filter((t) => t.p[0] + t.p[1] + t.p[2] > 0).length + ' types published, ' + n.filter((t) => t.s[0] + t.s[1] + t.s[2] > 0).length + ' with a screen, ' + n.filter((t) => t.set).length + ' Level Sets, ' + n.filter((t) => t.maker).length + ' in a maker; ' + Object.keys(a.tools).length + ' tools, ' + Object.keys(a.activities).length + ' activities');
  }
  console.log('addresses with a unit after the type code (the site\'s own code reader does not read them): ' + r.unread);
  console.log('screen rule: the catalogue rule and the page agree on ' + r.ruleAgree + ' of ' + r.ruleTotal + ' pages' + (r.ruleLines.length ? '; ' + r.ruleLines.length + ' disagreements → out/teaching-graph/screen-rule.txt' : ''));
  if (diff) process.exit(1);
}
module.exports = { build, LOCALES, RUNGS, typeIdOf };
