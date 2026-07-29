#!/usr/bin/env node
/* =====================================================================
   apply-open-number-line-fanout.js — land the 10 native ensembles' work.

   Each ensemble wrote ONE JSON file (the strings it changed + its
   ToolEntry + its hub blurb + its didactic `convention`). This script is
   the only thing that writes them into the repo, so every landing goes
   through the same gates:

     1. SLUG COLLISION — the standing gate. /tools/ is one namespace
        shared with the 33 worksheet makers, so a new slug is checked
        against BOTH tool-content AND maker-content, in EVERY locale.
        ⚠ This tool is the sharpest case yet: our OWN shipped
        `number-line` tool already holds the head term in all eleven
        locales (zahlenstrahl, getallenlijn, tallinje ×3, lukusuora,
        recta-numerica, ligne-numerique, linea-dei-numeri,
        reta-numerica), so a careless slug would cannibalise us.
     2. LINE CONTRACT — tool strings live one physical line per key
        (`key:{en:'…',de:'…',…}`). Replacement is a surgical
        single-locale edit; anything that does not match exactly aborts
        rather than reflowing a file the verify gate parses by line.
     3. PLACEHOLDER PARITY — {n} in, {n} out.
     4. NO STRAIGHT APOSTROPHES in landed content (typographic ’ only).

   ⚠ `convention` is deliberately NOT landed as data. It is the native
   ruling on each tradition's didactic (what the arcs are called, how
   jumps are labelled, whether the model is taught there at all) and it
   belongs in the commit message and the memory record. Landing it would
   create exactly the dead-data the Letter Studio build learned to
   refuse: eleven ensembles maintaining fields nothing renders.

   RE-RUNNABLE — an ensemble revising its own bundle after a first
   landing is normal, so the manipulatives entry is cut and rebuilt
   rather than appended.

   Usage: ONL_FANOUT_DIR=<dir> node scripts/apply-open-number-line-fanout.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const IN_DIR = process.env.ONL_FANOUT_DIR;
if (!IN_DIR) { console.error('ABORT — set ONL_FANOUT_DIR to the directory holding <locale>.json'); process.exit(1); }
const TOOL = path.join(REPO, 'mini tools', 'open-number-line.js');
const TC_DIR = path.join(REPO, 'frontend', 'messages', 'tool-content');
const MC_DIR = path.join(REPO, 'frontend', 'messages', 'maker-content');
const MANIP = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
const KEY = 'open-number-line';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const FAN = LOCALES.filter(l => l !== 'en');
const DRY = process.argv.includes('--dry-run');

const die = (m) => { console.error('ABORT — ' + m); process.exit(1); };
const say = (m) => console.log('  ' + m);

/* ---------- load ---------- */
const bundles = {};
for (const loc of FAN) {
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
console.log(`loaded ${FAN.length} ensemble bundles`);

/* ---------- gate 1: slug collisions ---------- */
console.log('\n[1] slug collision — /tools/ is shared with the 33 makers AND our own number-line');
for (const loc of FAN) {
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
  /* and the specific self-cannibalisation check, stated loudly */
  const ours = taken.find(t => t.k === 'number-line');
  if (ours && ours.slug === slug) die(`${loc} slug "${slug}" IS our own number-line slug`);
  say(`${loc}: ${slug} — clear against ${taken.length} slugs (our number-line holds "${ours ? ours.slug : '?'}")`);
}

/* ---------- gate 2+3+4: strings ---------- */
console.log('\n[2] tool strings — surgical single-line edits');
let src = fs.readFileSync(TOOL, 'utf8');
const lines = src.split(/\r?\n/);
let edits = 0, skipped = [];

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

for (const loc of FAN) {
  const changed = bundles[loc].strings || {};
  for (const [key, val] of Object.entries(changed)) {
    const i = findKeyLine(key);
    if (i < 0) { skipped.push(`${loc}.${key}`); continue; }
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
if (skipped.length) say(`skipped (key no longer exists): ${skipped.join(', ')}`);

/* ---------- the conventions, reported not landed ---------- */
console.log('\n[3] didactic conventions (reported, NOT landed as data)');
for (const loc of FAN) {
  const c = bundles[loc].convention;
  if (!c) { say(`${loc}: no convention returned`); continue; }
  const sys = typeof c === 'string' ? c.slice(0, 60) : (c.system || c.name || c.term || JSON.stringify(c).slice(0, 60));
  say(`${loc}: ${sys}`);
}

/* ---------- tool-content entries ---------- */
console.log('\n[4] tool-content ToolEntry per locale');
const tcWrites = {};
for (const loc of FAN) {
  const f = path.join(TC_DIR, loc + '.json');
  const doc = JSON.parse(fs.readFileSync(f, 'utf8'));
  const te = bundles[loc].toolEntry;
  const ordered = {};
  for (const [k, v] of Object.entries(doc)) { if (k === 'labels') ordered[KEY] = te; ordered[k] = v; }
  if (!ordered[KEY]) ordered[KEY] = te;
  tcWrites[f] = JSON.stringify(ordered, null, 2) + '\n';
  say(`${loc}: ${te.name}`);
}

/* ---------- manipulatives entry ---------- */
console.log('\n[5] manipulatives entry');
let manipSrc = fs.readFileSync(MANIP, 'utf8');
{
  const marker = `  {\n    id: "${KEY}",`;
  const at = manipSrc.indexOf(marker);
  if (at >= 0) {
    const stop = manipSrc.indexOf('\n  },\n', at);
    if (stop < 0) die('found an open-number-line manip entry but not its end');
    manipSrc = manipSrc.slice(0, at) + manipSrc.slice(stop + '\n  },\n'.length);
    say('existing entry removed — rebuilding from the current bundles');
  }
}
const EN = JSON.parse(fs.readFileSync(path.join(TC_DIR, 'en.json'), 'utf8'))[KEY];
if (!EN) die('tool-content/en.json has no open-number-line entry yet — write the en ToolEntry first');
const pickTitle = (l) => l === 'en' ? EN.name : bundles[l].manip.title;
const pickTag = (l) => l === 'en' ? EN.tagline : (bundles[l].manip.tagline || bundles[l].manip.blurb);
const pickAbout = (l) => (l === 'en' ? EN.about : bundles[l].toolEntry.about || []).join(' ');
for (const l of LOCALES) if (!pickTitle(l) || !pickTag(l)) die(`${l} manip title/tagline missing`);
const q = (s) => JSON.stringify(String(s));
const block = (field, pick) => '    ' + field + ': {\n'
  + LOCALES.map(l => `      ${l}: ${q(pick(l))},`).join('\n') + '\n    },';
const entry = [
  '  {',
  `    id: "${KEY}",`,
  `    mini_tool_url: "/mini-tools/${KEY}.html",`,
  block('title', pickTitle),
  block('tagline', pickTag),
  block('description', pickAbout),
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
console.log('\nlanded: tool strings + 10 ToolEntries + the manipulatives entry');
