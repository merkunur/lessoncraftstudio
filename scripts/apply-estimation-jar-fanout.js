#!/usr/bin/env node
/* =====================================================================
   apply-estimation-jar-fanout.js — land the 11 native ensembles' work.

   Each ensemble wrote ONE JSON file (strings it changed + its ToolEntry +
   its manipulative blurb). This script is the only thing that writes them
   into the repo, so every landing goes through the same gates:

     1. SLUG COLLISION — the standing gate. /tools/ is one namespace shared
        with the 33 worksheet makers, so a new slug is checked against BOTH
        tool-content AND maker-content, in EVERY locale, before anything is
        written. A collision aborts the whole run.
     2. LINE CONTRACT — tool strings live one physical line per key
        (`key:{en:'…',de:'…',…}`). Replacement is a surgical single-locale
        edit on that line; anything that does not match exactly aborts,
        rather than reflowing a file the verify gate parses by line.
     3. PLACEHOLDER PARITY — {n} in, {n} out. A locale that drops or
        invents a placeholder aborts.
     4. NO STRAIGHT APOSTROPHES in landed content (typographic ’ only).

   Nothing is written until every check has passed for every locale.

   Usage: node scripts/apply-estimation-jar-fanout.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const IN_DIR = process.env.EJ_FANOUT_DIR || path.join(
  'C:', 'Users', 'rkgen', 'AppData', 'Local', 'Temp', 'claude',
  'C--Users-rkgen-lessoncraftstudio', '7b4f86e7-1753-43a3-90a9-0270bd050f56',
  'scratchpad', 'ej-fanout');
const TOOL = path.join(REPO, 'mini tools', 'estimation-jar.js');
const TC_DIR = path.join(REPO, 'frontend', 'messages', 'tool-content');
const MC_DIR = path.join(REPO, 'frontend', 'messages', 'maker-content');
const MANIP = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
const KEY = 'estimation-jar';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.includes('--dry-run');

const die = (m) => { console.error('ABORT — ' + m); process.exit(1); };
const say = (m) => console.log('  ' + m);

/* ---------- load ---------- */
const bundles = {};
for (const loc of LOCALES) {
  const f = path.join(IN_DIR, loc + '.json');
  if (!fs.existsSync(f)) die(`${loc}.json is missing — the ${loc} ensemble has not landed`);
  let j;
  try { j = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { die(`${loc}.json is not valid JSON: ${e.message}`); }
  if (j.locale !== loc) die(`${loc}.json declares locale "${j.locale}"`);
  for (const k of ['toolEntry', 'manip']) if (!j[k]) die(`${loc}.json has no ${k}`);
  const te = j.toolEntry;
  for (const k of ['slug', 'name', 'tagline', 'about', 'howToUse', 'classroomIdeas', 'metaTitle', 'metaDescription'])
    if (!te[k] || (Array.isArray(te[k]) && !te[k].length)) die(`${loc} toolEntry.${k} is empty`);
  bundles[loc] = j;
}
console.log(`loaded ${LOCALES.length} ensemble bundles`);

/* ---------- gate 1: slug collisions (the standing gate) ---------- */
console.log('\n[1] slug collision — /tools/ is shared with the 33 makers');
for (const loc of LOCALES) {
  const slug = bundles[loc].toolEntry.slug;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) die(`${loc} slug "${slug}" is not lowercase-ascii-hyphenated`);
  const taken = [];
  for (const [label, dir] of [['tool', TC_DIR], ['maker', MC_DIR]]) {
    const f = path.join(dir, loc + '.json');
    if (!fs.existsSync(f)) { if (label === 'tool') die(`no tool-content for ${loc}`); continue; }
    const doc = JSON.parse(fs.readFileSync(f, 'utf8'));
    for (const [k, v] of Object.entries(doc))
      if (v && typeof v === 'object' && typeof v.slug === 'string' && k !== KEY)
        taken.push({ label, k, slug: v.slug });
  }
  const hit = taken.find(t => t.slug === slug);
  if (hit) die(`${loc} slug "${slug}" collides with ${hit.label} "${hit.k}"`);
  say(`${loc}: ${slug} — clear against ${taken.length} existing slugs`);
}

/* ---------- gate 2+3: strings, line contract + placeholder parity ---------- */
console.log('\n[2] tool strings — surgical single-line edits');
let src = fs.readFileSync(TOOL, 'utf8');
const lines = src.split(/\r?\n/);
let edits = 0;

const findKeyLine = (key) => {
  const re = new RegExp('^\\s{4}' + key + ':\\s*\\{');
  for (let i = 0; i < lines.length; i++) if (re.test(lines[i])) return i;
  return -1;
};
const readLocaleValue = (line, loc) => {
  const m = new RegExp("[,{]" + loc + ":'((?:[^'\\\\]|\\\\.)*)'").exec(line);
  return m ? m[1] : null;
};
const placeholders = (s) => (s.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');

for (const loc of LOCALES) {
  const changed = bundles[loc].strings || {};
  for (const [key, val] of Object.entries(changed)) {
    const i = findKeyLine(key);
    if (i < 0) die(`${loc}: no strings line for key "${key}"`);
    const before = readLocaleValue(lines[i], loc);
    if (before === null) die(`${loc}: key "${key}" has no ${loc}: entry on its line`);
    if (/'/.test(val)) die(`${loc}.${key} contains a straight apostrophe — use ’`);
    if (placeholders(before) !== placeholders(val))
      die(`${loc}.${key} placeholder parity broken: "${placeholders(before)}" -> "${placeholders(val)}"`);
    if (before === val) continue;
    const re = new RegExp("([,{]" + loc + ":')(?:[^'\\\\]|\\\\.)*(')");
    const next = lines[i].replace(re, (mm, a, b) => a + val + b);
    if (next === lines[i]) die(`${loc}.${key}: replacement did not apply`);
    lines[i] = next;
    edits++;
  }
  say(`${loc}: ${Object.keys(changed).length} key(s) reviewed`);
}
src = lines.join('\n');
say(`${edits} string line-edits staged`);

/* ---------- tool-content entries ---------- */
console.log('\n[3] tool-content ToolEntry per locale');
const tcWrites = {};
for (const loc of LOCALES) {
  const f = path.join(TC_DIR, loc + '.json');
  const doc = JSON.parse(fs.readFileSync(f, 'utf8'));
  const te = bundles[loc].toolEntry;
  const ordered = {};
  for (const [k, v] of Object.entries(doc)) { if (k === 'labels') ordered[KEY] = te; ordered[k] = v; }
  if (!ordered[KEY]) ordered[KEY] = te;               /* no labels key: append */
  tcWrites[f] = JSON.stringify(ordered, null, 2) + '\n';
  say(`${loc}: ${te.name}`);
}

/* ---------- manipulatives entry ---------- */
console.log('\n[4] manipulatives entry');
let manipSrc = fs.readFileSync(MANIP, 'utf8');
if (manipSrc.includes(`id: "${KEY}"`)) die('manipulatives.ts already has an estimation-jar entry');
const q = (s) => JSON.stringify(String(s));
const block = (field, pick) => '    ' + field + ': {\n'
  + LOCALES.map(l => `      ${l}: ${q(pick(l))},`).join('\n') + '\n    },';
const entry = [
  '  {',
  `    id: "${KEY}",`,
  `    mini_tool_url: "/mini-tools/${KEY}.html",`,
  block('title', l => bundles[l].manip.title),
  block('tagline', l => bundles[l].manip.blurb),
  block('description', l => (bundles[l].toolEntry.about || []).join(' ')),
  '  },',
  '];'
].join('\n');
const tail = manipSrc.lastIndexOf('\n];');
if (tail < 0) die('could not find the end of the manipulatives array');
manipSrc = manipSrc.slice(0, tail + 1) + entry + manipSrc.slice(tail + 3);
say('entry composed for 11 locales');

/* ---------- write ---------- */
if (DRY) { console.log('\nDRY RUN — every gate passed, nothing written'); process.exit(0); }
fs.writeFileSync(TOOL, src);
for (const [f, body] of Object.entries(tcWrites)) fs.writeFileSync(f, body);
fs.writeFileSync(MANIP, manipSrc);
console.log('\nlanded: tool strings + 11 ToolEntries + the manipulatives entry');
