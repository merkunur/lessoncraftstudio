#!/usr/bin/env node
/**
 * Gate: the old makers' landing pages keep their SEO when the new makers replace the old apps.
 *
 * Operator 2026-10-31: "the current worksheet makers were the first content on the website so they have the best seo on
 * the website. So, when you replace them with the new ones you shouldn't delete or change the landing pages or slugs but
 * link them in a smart way to the corresponding new worksheet makers so that the replacement doesn't harm the seo."
 *
 *   1. frozen slugs — every old landing in docs/makers/old-landings.frozen.json (33 makers × 11 languages, frozen
 *      2026-10-31) still exists in frontend/messages/maker-content/<loc>.json with exactly the same slug
 *   2. a home — every old maker (MAKER_KEYS in frontend/lib/seo/maker-content.ts) is in exactly one new maker's oldApps
 *      (scripts/makers/topic-map.js); none is left without a destination, none is split
 *   3. the smart link — for every new maker that is BUILT (out/makers/<id>/current.txt), each of its old apps names the
 *      template its landing opens (oldAppTemplates), that template is in the built maker, and it is offered in every
 *      language the old landing exists in (a language it is refused in is listed: that landing opens the maker's gallery)
 *
 *   node scripts/makers/gates/old-landings.js        (the poisons run first, every time)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');

function check({ frozen, content, makerKeys, makers, built }) {
  const fails = [], notes = [];
  // 1. frozen slugs
  let n = 0;
  for (const [key, bySlugLoc] of Object.entries(frozen.landings)) {
    for (const [loc, slug] of Object.entries(bySlugLoc)) {
      n++;
      const now = content[loc] && content[loc][key] && content[loc][key].slug;
      if (now !== slug) fails.push(`${key} ${loc}: the landing slug was "${slug}", now ${now === undefined ? 'MISSING' : `"${now}"`}`);
    }
  }
  if (n < 300) fails.push(`only ${n} frozen landings read — the frozen list is not being read`);
  for (const key of Object.keys(frozen.landings)) if (!makerKeys.includes(key)) fails.push(`${key}: no longer in MAKER_KEYS (its landing would disappear)`);
  // 2. a home
  const home = {};
  for (const m of makers) for (const a of m.oldApps || []) (home[a] = home[a] || []).push(m.id);
  for (const key of makerKeys) {
    if (!home[key]) fails.push(`${key}: no new maker lists it in oldApps`);
    else if (home[key].length > 1 && !(home[key].length === 2 && key === 'writing')) notes.push(`${key}: shared by ${home[key].join(' + ')}`);
  }
  // 3. the smart link, for built makers
  for (const m of makers) {
    const tj = built[m.id];
    if (!tj) continue;
    for (const a of m.oldApps || []) {
      const tid = m.oldAppTemplates && m.oldAppTemplates[a];
      if (!tid) { fails.push(`${m.id} is built but old app ${a} has no oldAppTemplates entry (its landing would open a random template)`); continue; }
      const t = tj.templates.find((x) => x.id === tid);
      if (!t) { fails.push(`${a} → ${m.id} ${tid}: that template is not in the built maker`); continue; }
      const langs = Object.keys(frozen.landings[a] || {});
      const missing = langs.filter((l) => !t.locales.includes(l));
      if (missing.length) notes.push(`${a} → ${m.id} ${tid}: not offered in ${missing.join(', ')} (those landings open the gallery)`);
    }
  }
  return { fails, notes, n };
}

function load() {
  const frozen = JSON.parse(fs.readFileSync(path.join(REPO, 'docs', 'makers', 'old-landings.frozen.json'), 'utf8'));
  const locs = [...new Set(Object.values(frozen.landings).flatMap((x) => Object.keys(x)))];
  const content = {};
  for (const l of locs) content[l] = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'maker-content', `${l}.json`), 'utf8'));
  const src = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'seo', 'maker-content.ts'), 'utf8');
  const makerKeys = [...src.match(/MAKER_KEYS = \[([\s\S]*?)\] as const/)[1].matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]);
  const { MAKERS } = require('../topic-map.js');
  const built = {};
  for (const m of MAKERS) {
    const cur = path.join(REPO, 'out', 'makers', m.id, 'current.txt');
    if (!fs.existsSync(cur)) continue;
    const f = path.join(REPO, 'out', 'makers', m.id, fs.readFileSync(cur, 'utf8').trim(), 'templates.json');
    if (fs.existsSync(f)) built[m.id] = JSON.parse(fs.readFileSync(f, 'utf8'));
  }
  return { frozen, content, makerKeys, makers: MAKERS, built };
}

const data = load();
let bad = 0;
{
  // every check must be able to fail: a changed slug, a removed landing, an old app without a home, a built maker whose
  // old app names no template / a template it does not have
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const poisons = [
    ['a changed slug', (d) => { d.content.de['find-and-count'].slug = 'finden-und-zaehlen-neu'; }],
    ['a removed landing', (d) => { delete d.content.fr.sudoku; }],
    ['an old app without a home', (d) => { d.makers = d.makers.map((m) => ({ ...m, oldApps: (m.oldApps || []).filter((a) => a !== 'bingo') })); }],
    ['a built maker without a smart link', (d) => { d.makers = d.makers.map((m) => (m.id === 'counting' ? { ...m, oldAppTemplates: {} } : m)); }],
    ['a smart link to a missing template', (d) => { d.makers = d.makers.map((m) => (m.id === 'counting' ? { ...m, oldAppTemplates: { 'find-and-count': 'K-999', 'find-objects': 'K-059' } } : m)); }],
  ];
  for (const [name, poison] of poisons) {
    const d = { ...clone({ frozen: data.frozen, content: data.content, makerKeys: data.makerKeys, built: data.built }), makers: data.makers };
    poison(d);
    if (!check(d).fails.length) { bad++; console.log(`FAIL poison not caught: ${name}`); }
  }
}
const r = check(data);
r.fails.forEach((f) => console.log('FAIL ' + f));
r.notes.forEach((x) => console.log('note ' + x));
bad += r.fails.length;
console.log(`old landings: ${r.n} frozen slugs checked, ${Object.keys(data.built).length} built makers' smart links checked — ${bad ? bad + ' failing' : 'all pass'}`);
if (bad) process.exitCode = 1;
