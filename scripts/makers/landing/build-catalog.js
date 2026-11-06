#!/usr/bin/env node
/**
 * The maker landings' committed data, generated from the gated build tree (out/makers) + topic-map.js. The website never
 * reads the build scripts, and the landings do not depend on the served tree being readable at render time:
 *
 *   frontend/lib/makers/landing-catalog.json      makers: id, group, templates [{ id, grade, screen, locales }], showcase
 *   frontend/lib/makers/type-to-maker.json        template id / worksheet family / old app → maker id (every deck and
 *                                                 worksheet landing finds its maker here; scripts/lib/maker-links.js)
 *   frontend/content/maker-landings/templates.<loc>.json   { <maker>: { <template>: [title, instruction] } } native ×11
 *
 *   node scripts/makers/landing/build-catalog.js [--check]    --check: exit 1 if the committed files differ from the build
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const SRC = path.join(REPO, 'out', 'makers');
const PREV = path.join(REPO, 'out', 'maker-previews');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CHECK = process.argv.includes('--check');
const topic = require('../topic-map.js');
const MAKERS = topic.MAKERS || topic;

const versions = JSON.parse(fs.readFileSync(path.join(SRC, 'versions.json'), 'utf8'));
const inventory = JSON.parse(fs.readFileSync(path.join(REPO, 'docs', 'makers', 'inventory', 'types.json'), 'utf8')).rows;
const familyOf = Object.fromEntries(inventory.map((r) => [r.id, r.family]));

const size = (maker, loc, id) => { try { return fs.statSync(path.join(PREV, maker, loc, `${id}.webp`)).size; } catch { return 0; } };

const catalog = { generated: 'scripts/makers/landing/build-catalog.js', makers: {} };
const byTemplate = {}, byFamily = {}, byApp = {};
const perLocale = Object.fromEntries(LOCALES.map((l) => [l, {}]));

for (const m of MAKERS) {
  const v = versions[m.id];
  if (!v) continue;
  const dir = path.join(SRC, m.id, v.current);
  const tj = JSON.parse(fs.readFileSync(path.join(dir, 'templates.json'), 'utf8'));
  const templates = tj.templates.map((t) => ({ id: t.id, grade: t.grade, screen: !!(t.screen && t.verdict === 'screen'), key: !!t.hasKey, themed: !!t.themed, levels: (t.levels || []).length, locales: t.locales.length === LOCALES.length ? undefined : t.locales }));
  const locales = LOCALES.filter((l) => tj.templates.some((t) => t.locales.includes(l)));
  // the showcase: the three richest sample pages (the largest previews = the most picture and colour on the page), one
  // per worksheet family while there are enough, so the hero shows the range of the maker and not three cousins
  const showcase = {};
  for (const loc of locales) {
    const offered = tj.templates.filter((t) => t.locales.includes(loc)).map((t) => ({ id: t.id, f: familyOf[t.id] || t.family, s: size(m.id, loc, t.id) })).sort((a, b) => b.s - a.s || a.id.localeCompare(b.id));
    const pick = [], seen = new Set();
    for (const t of offered) { if (pick.length < 3 && !seen.has(t.f)) { pick.push(t.id); seen.add(t.f); } }
    for (const t of offered) { if (pick.length < 3 && !pick.includes(t.id)) pick.push(t.id); }
    showcase[loc] = pick;
  }
  catalog.makers[m.id] = { group: m.group, locales: locales.length === LOCALES.length ? undefined : locales, oldApps: m.oldApps || [], families: m.families || [], templates, showcase };
  for (const t of tj.templates) { if (!byTemplate[t.id]) byTemplate[t.id] = m.id; }
  for (const f of m.families || []) { if (!byFamily[f]) byFamily[f] = m.id; }
  for (const a of m.oldApps || []) { if (!byApp[a]) byApp[a] = m.id; }
  for (const loc of locales) {
    const s = JSON.parse(fs.readFileSync(path.join(dir, `strings.${loc}.json`), 'utf8'));
    const entry = {};
    for (const t of tj.templates) {
      if (!t.locales.includes(loc)) continue;
      const row = s[t.id];
      if (!row || !row.title) throw new Error(`no title for ${m.id} ${t.id} in ${loc}`);
      entry[t.id] = [row.title, row.instruction || ''];
    }
    perLocale[loc][m.id] = entry;
  }
}

// the rendered words of templates whose strings carry tokens (fill-tokens.js)
for (const loc of LOCALES) {
  const f = path.join(REPO, 'frontend', 'content', 'maker-landings', `template-fills.${loc}.json`);
  if (!fs.existsSync(f)) continue;
  const fills = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [maker, entries] of Object.entries(fills)) {
    for (const [id, pair] of Object.entries(entries)) { if (perLocale[loc][maker] && perLocale[loc][maker][id]) perLocale[loc][maker][id] = pair; }
  }
}

const sort = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
const files = [
  ['frontend/lib/makers/landing-catalog.json', JSON.stringify(catalog)],
  ['frontend/lib/makers/type-to-maker.json', JSON.stringify({ byTemplate: sort(byTemplate), byFamily: sort(byFamily), byApp: sort(byApp) }, null, 1)],
  ...LOCALES.map((l) => [`frontend/content/maker-landings/templates.${l}.json`, JSON.stringify(perLocale[l])]),
];
let drift = 0;
for (const [rel, text] of files) {
  const f = path.join(REPO, rel);
  if (CHECK) { if (!fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== text) { console.log(`DRIFT ${rel}`); drift++; } continue; }
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, text);
}
console.log(CHECK ? `catalog check: ${drift} drifted of ${files.length}` : `catalog: ${Object.keys(catalog.makers).length} makers, ${Object.keys(byTemplate).length} templates, ${Object.keys(byFamily).length} families, ${Object.keys(byApp).length} old apps`);
process.exit(drift ? 1 : 0);
