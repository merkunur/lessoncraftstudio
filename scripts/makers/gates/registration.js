#!/usr/bin/env node
/**
 * Gate 13 `registration` (ARCHITECTURE §15): every BUILT worksheet maker is COMPLETELY registered — the shape of
 * scripts/preflight-tool-registration.js, where each point that fails silently on the live site is asserted here.
 *
 * For every maker with a current version in the tree:
 *   1. the version ledger (versions.json) names the version current.txt points at, and its data snapshot folder exists
 *   2. the version folder is whole: index.js, templates.json, data-manifest.json, strings.<loc>.json for every locale
 *      any template is offered in; every file the data manifest names exists in the data snapshot
 *   3. the gallery thumbnail exists for every template × locale it is offered in (a missing one shows a blank card)
 *   4. the maker has a NAME in frontend/messages/makers/<loc>.json ×11 (the share sheet, the student page card)
 *   5. the smart links (ARCHITECTURE §13): every old app the maker absorbs names the template its landing opens,
 *      that template is in the built maker, every old landing's slug is frozen and present ×11, and the committed
 *      frontend/lib/makers/smart-links.json is in sync with topic-map.js
 *   6. the play tree: play/current.txt → index.html, play.js, play.css, recipe.js, resolve-version.js, strings.json,
 *      landings.json, chrome/<loc>.json ×11; landings.json names the maker ×11 (the student page's back-link)
 *   7. the app shell + its two generated files (ui-strings.js, vendor/pdf-lib.js)
 *   8. content-fix records (migrations/<maker>.json): every `at` hash is in the ledger (an unknown one is ignored by
 *      resolve-version.js — a fix that re-routes nothing)
 * And once, for the release wiring (the website side):
 *   9. the routes exist (/s/[id], /api/makers/recipes, recipes/[id], links, links/[linkId], preset/[deckId]); the Prisma
 *      schema has MakerRecipe + MakerShareLink and a migration creates maker_recipes; deploy.sh installs the release and
 *      runs this gate; the nginx patch + install scripts exist; housekeeping.sh never deletes under makers*
 *
 *   node scripts/makers/gates/registration.js                         the PC build tree (out/makers)
 *   node scripts/makers/gates/registration.js --served=/var/www/lcs-media/makers   the served tree (deploy.sh, HARD)
 *
 * The poisons run first, every time: each check must fail on a broken model and pass on the real one.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const SHELL_FILES = ['index.html', 'shell.js', 'shell.css', 'recipe.js', 'resolve-version.js', 'export.js'];
const PLAY_FILES = ['index.html', 'play.js', 'play.css', 'recipe.js', 'resolve-version.js', 'strings.json', 'landings.json', ...LOCALES.map((l) => 'chrome/' + l + '.json')];
const ROUTES = ['frontend/app/s/[id]/route.ts', 'frontend/app/api/makers/recipes/route.ts', 'frontend/app/api/makers/recipes/[id]/route.ts', 'frontend/app/api/makers/links/route.ts', 'frontend/app/api/makers/links/[linkId]/route.ts', 'frontend/app/api/makers/preset/[deckId]/route.ts'];

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));

/* ---------------- the pure check over a model ---------------- */
function check(M) {
  const fails = [], notes = [];
  const built = Object.keys(M.makers);
  if (!built.length) fails.push('no built maker in ' + M.dir + ' — the gate checked nothing');
  for (const id of built) {
    const m = M.makers[id];
    const v = M.versions[id];
    // 1. the ledger
    if (!v) fails.push(`${id}: not in versions.json`);
    else {
      if (v.current !== m.current) fails.push(`${id}: current.txt says ${m.current}, versions.json says ${v.current}`);
      if (!M.dataDirs[v.currentData]) fails.push(`${id}: data snapshot ${v.currentData} is missing from data/`);
    }
    // 2. the version folder
    for (const f of ['index.js', 'templates.json', 'data-manifest.json']) if (!m.files.has(f)) fails.push(`${id}/${m.current}: ${f} missing`);
    const locs = [...new Set(m.templates.flatMap((t) => t.locales))];
    for (const l of locs) if (!m.files.has('strings.' + l + '.json')) fails.push(`${id}/${m.current}: strings.${l}.json missing (templates are offered in ${l})`);
    if (!m.templates.length) fails.push(`${id}: templates.json lists no template`);
    const data = v && M.dataDirs[v.currentData];
    if (data) for (const f of m.manifestFiles) if (!data.has(f)) fails.push(`${id}: data-manifest file ${f} is not in data/${v.currentData}`);
    // 3. thumbnails
    for (const t of m.templates) for (const l of t.locales) if (!m.files.has(`thumbs/${l}/${t.id}.webp`)) fails.push(`${id}: no thumbnail thumbs/${l}/${t.id}.webp`);
    // 4. a name ×11
    for (const l of LOCALES) if (!M.ui[l] || !M.ui[l].has(id)) fails.push(`${id}: no name in frontend/messages/makers/${l}.json (makers.${id})`);
    // 5. the smart links
    const tm = M.topicMap.find((x) => x.id === id);
    if (!tm) fails.push(`${id}: not in topic-map.js`);
    for (const app of (tm && tm.oldApps) || []) {
      const tid = tm.oldAppTemplates && tm.oldAppTemplates[app];
      if (!tid) { fails.push(`${id}: old app ${app} has no oldAppTemplates entry (its landing would open the gallery, not the template that does what it did)`); continue; }
      const t = m.templates.find((x) => x.id === tid);
      if (!t) { fails.push(`${app} → ${id} ${tid}: that template is not in the built maker`); continue; }
      const sl = M.smartLinks[app];
      // an old app shared by two makers ('writing': letter tracing AND word writing) keeps its landing with the FIRST maker
      // that lists it — build-smart-links.js's own rule; the other maker's template is checked above, not its link
      const owner = M.topicMap.find((x) => (x.oldApps || []).includes(app));
      if (owner && owner.id !== id) continue;
      if (!sl || sl.maker !== id || sl.template !== tid) fails.push(`smart-links.json: ${app} should be { maker: ${id}, template: ${tid} }`);
      const frozen = M.frozen[app];
      if (!frozen) fails.push(`${app}: no frozen landing slugs (docs/makers/old-landings.frozen.json)`);
      else for (const [l, slug] of Object.entries(frozen)) {
        if (!M.content[l] || M.content[l][app] !== slug) fails.push(`${app} ${l}: landing slug "${slug}" is not in maker-content (${M.content[l] ? M.content[l][app] : 'no file'})`);
        if (!t.locales.includes(l)) notes.push(`${app} → ${id} ${tid}: not offered in ${l} (that landing opens the gallery)`);
      }
    }
    // 6. the play tree names the maker
    if (M.play) for (const l of LOCALES) { const e = M.play.landings[id] && M.play.landings[id][l]; if (!e || !/^\/[a-z]{2}\/tools(\/[a-z0-9-]+)?$/.test(e.url) || !e.name) fails.push(`${id}: play landings.json has no ${l} entry`); }
    // 8. content-fix records
    for (const mg of M.migrations[id] || []) {
      if (!mg || !mg.at || !['content-fix', 'polish'].includes(mg.kind)) { fails.push(`${id}: a migration record without at/kind`); continue; }
      if (!v || !v.history.some((h) => h.hash === mg.at)) fails.push(`${id}: migration at ${mg.at} names a version the ledger does not know (resolve-version ignores it: the fix re-routes nothing)`);
      if (mg.kind === 'content-fix' && !(mg.templates || []).length) fails.push(`${id}: a content-fix record with no templates`);
    }
  }
  if (!M.smartLinksInSync) fails.push('frontend/lib/makers/smart-links.json differs from topic-map.js — node scripts/makers/build-smart-links.js');
  // 6. the play tree itself
  if (!M.play) fails.push('no play tree (play/current.txt) — node scripts/makers/build-play.js');
  else for (const f of PLAY_FILES) if (!M.play.files.has(f)) fails.push(`play/${M.play.current}: ${f} missing`);
  if (M.play && M.served) for (const f of ['strings.json', 'landings.json']) if (!M.play.pointers.has(f)) fails.push(`play/${f} (the unversioned pointer the maker screen fetches) missing`);
  // 7. the app shell
  for (const f of [...SHELL_FILES, 'ui-strings.js', 'vendor/pdf-lib.js']) if (!M.shell.has(f)) fails.push(`app shell: ${f} missing`);
  if (M.served) for (const d of ['themes-512', 'fonts']) if (!M.assets.has(d)) fails.push(`makers-assets/${d} missing beside the makers tree`);
  // 9. the website wiring
  for (const r of ROUTES) if (!M.repo.routes.has(r)) fails.push(`route missing: ${r}`);
  for (const m of ['MakerRecipe', 'MakerShareLink']) if (!M.repo.schemaModels.has(m)) fails.push(`prisma schema: model ${m} missing`);
  if (!M.repo.migration) fails.push('no Prisma migration creates maker_recipes');
  if (!M.repo.deployInstalls) fails.push('deploy.sh does not run scripts/makers/install-release.js');
  if (!M.repo.deployGates) fails.push('deploy.sh does not run this gate on the served tree');
  for (const f of ['scripts/makers/patch-nginx-makers.py', 'scripts/makers/install-release.js', 'scripts/makers/release-pack.js']) if (!M.repo.files.has(f)) fails.push(`${f} missing`);
  if (M.repo.housekeepingTouchesMakers) fails.push('server-scripts/housekeeping.sh deletes under makers* — the served versions are kept forever (ARCHITECTURE §5.2)');
  return { fails, notes, built };
}

/* ---------------- the model, from a tree ---------------- */
const listFiles = (dir) => { const out = new Set(); const walk = (d, rel) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const r = rel ? rel + '/' + e.name : e.name; if (e.isDirectory()) walk(path.join(d, e.name), r); else out.add(r); } }; if (fs.existsSync(dir)) walk(dir, ''); return out; };
const readJson = (f, dflt) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return dflt; } };
const readText = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch (e) { return null; } };

function load(dir, served) {
  const M = { dir, served, versions: readJson(path.join(dir, 'versions.json'), {}), makers: {}, dataDirs: {}, play: null, shell: new Set(), assets: new Set(), migrations: {}, ui: {}, topicMap: require('../topic-map.js').MAKERS, smartLinks: {}, smartLinksInSync: false, frozen: {}, content: {}, repo: {} };
  for (const id of Object.keys(M.versions)) {
    const cur = readText(path.join(dir, id, 'current.txt'));
    if (!cur) continue;
    const current = cur.trim();
    const vdir = path.join(dir, id, current);
    const tj = readJson(path.join(vdir, 'templates.json'), { templates: [] });
    const dm = readJson(path.join(vdir, 'data-manifest.json'), { files: [] });
    M.makers[id] = { current, files: listFiles(vdir), templates: (tj.templates || []).map((t) => ({ id: t.id, locales: t.locales || [] })), manifestFiles: dm.files || [] };
    const dh = M.versions[id].currentData;
    if (dh && !M.dataDirs[dh] && fs.existsSync(path.join(dir, 'data', dh))) M.dataDirs[dh] = listFiles(path.join(dir, 'data', dh));
  }
  const pc = readText(path.join(dir, 'play', 'current.txt'));
  if (pc) {
    const current = pc.trim();
    const pdir = path.join(dir, 'play', current);
    M.play = { current, files: listFiles(pdir), landings: readJson(path.join(pdir, 'landings.json'), {}), pointers: new Set(['strings.json', 'landings.json'].filter((f) => fs.existsSync(path.join(dir, 'play', f)))) };
  }
  if (served) {
    M.shell = listFiles(path.join(dir, 'app'));
    for (const d of ['themes-512', 'fonts']) if (fs.existsSync(path.join(dir, '..', 'makers-assets', d)) && fs.readdirSync(path.join(dir, '..', 'makers-assets', d)).length) M.assets.add(d);
    for (const f of listFiles(path.join(dir, 'migrations'))) M.migrations[f.replace(/\.json$/, '')] = readJson(path.join(dir, 'migrations', f), null);
  } else {
    for (const f of SHELL_FILES) if (fs.existsSync(path.join(REPO, 'scripts', 'makers', 'shell', f))) M.shell.add(f);
    if (fs.existsSync(path.join(dir, 'ui-strings.js'))) M.shell.add('ui-strings.js');
    if (fs.existsSync(path.join(dir, 'vendor', 'pdf-lib.js'))) M.shell.add('vendor/pdf-lib.js');
    for (const f of listFiles(path.join(REPO, 'docs', 'makers', 'migrations'))) M.migrations[f.replace(/\.json$/, '')] = readJson(path.join(REPO, 'docs', 'makers', 'migrations', f), null);
  }
  for (const l of LOCALES) { const u = readJson(path.join(REPO, 'frontend', 'messages', 'makers', l + '.json'), {}); M.ui[l] = new Set(Object.keys(u.makers || {}).filter((k) => u.makers[k] && String(u.makers[k]).trim())); }
  const sl = require('../build-smart-links.js');
  const slFile = readText(sl.FILE);
  M.smartLinks = (readJson(sl.FILE, { links: {} })).links;
  M.smartLinksInSync = slFile === sl.build();
  M.frozen = readJson(path.join(REPO, 'docs', 'makers', 'old-landings.frozen.json'), { landings: {} }).landings;
  for (const l of LOCALES) { const c = readJson(path.join(REPO, 'frontend', 'messages', 'maker-content', l + '.json'), {}); M.content[l] = Object.fromEntries(Object.entries(c).map(([k, e]) => [k, e && e.slug])); }
  const deploy = readText(path.join(REPO, 'deploy.sh')) || '';
  const schema = readText(path.join(REPO, 'frontend', 'prisma', 'schema.prisma')) || '';
  const migDir = path.join(REPO, 'frontend', 'prisma', 'migrations');
  const housekeeping = readText(path.join(REPO, 'server-scripts', 'housekeeping.sh')) || '';
  M.repo = {
    routes: new Set(ROUTES.filter((r) => fs.existsSync(path.join(REPO, r)))),
    schemaModels: new Set(['MakerRecipe', 'MakerShareLink'].filter((m) => new RegExp('^model ' + m + ' \\{', 'm').test(schema))),
    migration: fs.existsSync(migDir) && fs.readdirSync(migDir).some((d) => /maker_recipes/.test(readText(path.join(migDir, d, 'migration.sql')) || '')),
    deployInstalls: /scripts\/makers\/install-release\.js/.test(deploy),
    deployGates: /scripts\/makers\/gates\/registration\.js --served=/.test(deploy),
    files: new Set(['scripts/makers/patch-nginx-makers.py', 'scripts/makers/install-release.js', 'scripts/makers/release-pack.js'].filter((f) => fs.existsSync(path.join(REPO, f)))),
    housekeepingTouchesMakers: /^[^#\n]*(rm |-delete)[^\n]*makers/m.test(housekeeping) || /^[^#\n]*makers[^\n]*(rm |-delete)/m.test(housekeeping),
  };
  return M;
}

/* ---------------- poisons, then the real run ---------------- */
const dir = args.served ? path.resolve(String(args.served)) : path.join(REPO, 'out', 'makers');
const M = load(dir, !!args.served);
const first = Object.keys(M.makers)[0];
const clone = (x) => {
  const seen = (k, v) => (v instanceof Set ? { __set: [...v] } : v);
  const back = (k, v) => (v && v.__set ? new Set(v.__set) : v);
  const c = JSON.parse(JSON.stringify(x, seen), back);
  c.topicMap = JSON.parse(JSON.stringify(x.topicMap));
  return c;
};
let bad = 0;
if (first) {
  const m0 = M.makers[first];
  const anyT = m0.templates[0];
  const withOld = M.topicMap.find((x) => M.makers[x.id] && (x.oldApps || []).length);
  const poisons = [
    ['current.txt disagrees with the ledger', (d) => { d.versions[first].current = 'ffffffffffff'; }],
    ['a missing data snapshot', (d) => { delete d.dataDirs[d.versions[first].currentData]; }],
    ['a missing strings slice', (d) => { d.makers[first].files.delete('strings.' + anyT.locales[0] + '.json'); }],
    ['a data-manifest file missing from the snapshot', (d) => { d.makers[first].manifestFiles.push('scripts/worksheet-gen/data/nope.json'); }],
    ['a missing thumbnail', (d) => { d.makers[first].files.delete(`thumbs/${anyT.locales[0]}/${anyT.id}.webp`); }],
    ['a maker without a name in one locale', (d) => { d.ui.fi.delete(first); }],
    ['an old app without a smart-link template', (d) => { if (!withOld) return; d.topicMap = d.topicMap.map((x) => (x.id === withOld.id ? { ...x, oldAppTemplates: {} } : x)); }],
    ['a smart link to a template the maker has not got', (d) => { if (!withOld) return; d.topicMap = d.topicMap.map((x) => (x.id === withOld.id ? { ...x, oldAppTemplates: Object.fromEntries((x.oldApps || []).map((a) => [a, 'K-999'])) } : x)); }],
    ['smart-links.json out of sync', (d) => { d.smartLinksInSync = false; }],
    ['a frozen landing slug changed', (d) => { if (!withOld) return; d.content.de[withOld.oldApps[0]] = 'anders'; }],
    ['the play tree has no landing for the maker in one locale', (d) => { if (d.play) delete d.play.landings[first].sv; }],
    ['a play file missing', (d) => { if (d.play) d.play.files.delete('chrome/fi.json'); }],
    ['the app shell missing a file', (d) => { d.shell.delete('shell.js'); }],
    ['a content-fix record at a version the ledger does not know', (d) => { d.migrations[first] = [{ at: 'eeeeeeeeeeee', kind: 'content-fix', templates: [anyT.id] }]; }],
    ['a route missing', (d) => { d.repo.routes.delete(ROUTES[1]); }],
    ['the schema without the models', (d) => { d.repo.schemaModels.delete('MakerShareLink'); }],
    ['deploy.sh not running the gate', (d) => { d.repo.deployGates = false; }],
    ['housekeeping deleting under makers', (d) => { d.repo.housekeepingTouchesMakers = true; }],
    ['no built maker at all', (d) => { d.makers = {}; }],
  ];
  for (const [name, poison] of poisons) {
    const d = clone(M);
    poison(d);
    if (name.startsWith('an old app') && !withOld) continue;
    if (!check(d).fails.length) { bad++; console.log('FAIL poison not caught: ' + name); }
  }
}
const r = check(M);
r.fails.forEach((f) => console.log('FAIL ' + f));
r.notes.forEach((n) => console.log('note ' + n));
bad += r.fails.length;
console.log(`registration (${args.served ? 'served' : 'build'} tree ${dir}): ${r.built.length} built makers — ${bad ? bad + ' failing' : 'all registered'}`);
if (bad) process.exitCode = 1;
