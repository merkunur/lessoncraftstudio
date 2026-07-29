#!/usr/bin/env node
/* =====================================================================
   apply-syllable-splitter-fanout.js — applies the nine native ensembles'
   output for TOOL #21 Syllable Splitter.

   The per-locale BANKS (mini tools/syllable-splitter-<loc>.json) are written
   directly by each ensemble and validated by scripts/verify-syllable-splitter.js;
   this script applies everything else:

     1. STANDING SLUG GATE — every new slug is checked against every key
        of every tool-content/*.json AND maker-content/*.json across all
        11 locales. The /tools/ slug namespace is SHARED with the 33
        worksheet makers, and the Romance makers in particular sit on a
        lot of obvious slugs. A collision is FATAL.
     2. strings — surgical single-line replace inside mini tools/syllable-splitter.js
     3. toolEntry — inserted immediately BEFORE the trailing `labels` key
        of frontend/messages/tool-content/<loc>.json
     4. manip — the per-locale title/tagline/description in
        frontend/lib/manipulatives.ts

   Input: a JSON file collecting the ensembles' returns, shaped
     { "<loc>": { strings:{}, toolEntry:{}, manip:{} }, ... }

   Usage:
     node scripts/apply-syllable-splitter-fanout.js --input=<file> [--apply]
   Without --apply it is a dry run and mutates nothing.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const TOOL_JS = path.join(TOOLS_DIR, 'syllable-splitter.js');
const TC_DIR = path.join(ROOT, 'frontend', 'messages', 'tool-content');
const MC_DIR = path.join(ROOT, 'frontend', 'messages', 'maker-content');
const MANIP = path.join(ROOT, 'frontend', 'lib', 'manipulatives.ts');

/* Syllable Splitter ships in ALL ELEVEN locales. */
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const ALL_11 = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const argOf = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : null; };
const APPLY = process.argv.includes('--apply');
const INPUT = argOf('input');
if (!INPUT) die('--input=<file> is required');

function die(msg) { console.error('FATAL: ' + msg); process.exit(1); }

const data = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
let applied = 0;

/* ---------------- 1. standing slug gate ---------------- */
console.log('STEP 1 — slug collision gate');
{
  const taken = new Map();   /* slug -> "file:toolKey" */
  for (const dir of [TC_DIR, MC_DIR]) {
    for (const loc of ALL_11) {
      const f = path.join(dir, loc + '.json');
      if (!fs.existsSync(f)) continue;
      const j = JSON.parse(fs.readFileSync(f, 'utf8'));
      for (const key of Object.keys(j)) {
        const e = j[key];
        if (e && typeof e === 'object' && typeof e.slug === 'string') {
          taken.set(loc + '|' + e.slug, path.basename(dir) + '/' + loc + '.json:' + key);
        }
      }
    }
  }
  let clash = 0;
  for (const loc of LOCALES) {
    const slug = data[loc] && data[loc].toolEntry && data[loc].toolEntry.slug;
    if (!slug) { console.log(`  (no ${loc} toolEntry in input — skipped)`); continue; }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) die(`${loc} slug "${slug}" is not lowercase-hyphen ASCII`);
    const owner = taken.get(loc + '|' + slug);
    if (owner && !/tool-content\/.*:syllable-splitter/.test(owner)) {
      console.error(`  COLLISION ${loc} "${slug}" already owned by ${owner}`);
      clash++;
    } else {
      console.log(`  ok ${loc} /${loc}/tools/${slug}`);
    }
  }
  if (clash) die(`${clash} slug collision(s) — the /tools/ namespace is shared with the 33 makers`);
}

/* ---------------- 2. strings ---------------- */
console.log('\nSTEP 2 — tool strings');
{
  let src = fs.readFileSync(TOOL_JS, 'utf8');
  const before = src;

  const lineReplace = (key, loc, val) => {
    if (val.indexOf("'") >= 0) die(`strings.${key}.${loc}: ASCII apostrophe (use the typographic one)`);
    if (val.indexOf('\n') >= 0) die(`strings.${key}.${loc}: newline in value`);
    const lineRe = new RegExp('^(    ' + key + ':\\s*\\{.*)$', 'm');
    const m = src.match(lineRe);
    if (!m) die(`strings line not found for key "${key}"`);
    const line = m[1];
    const segRe = new RegExp("([,{])" + loc + ":'[^']*'");
    if (!segRe.test(line)) die(`locale segment ${loc} not found on the line for "${key}"`);
    src = src.replace(line, line.replace(segRe, (mm, pre) => pre + loc + ":'" + val + "'"));
    applied++;
  };

  for (const loc of LOCALES) {
    const s = data[loc] && data[loc].strings;
    if (!s) { console.log(`  (no ${loc} strings)`); continue; }
    let n = 0;
    for (const key of Object.keys(s)) { lineReplace(key, loc, s[key]); n++; }
    console.log(`  ${loc}: ${n} strings`);
  }

  if (APPLY && src !== before) fs.writeFileSync(TOOL_JS, src);
}

/* ---------------- 3. tool-content entries ---------------- */
console.log('\nSTEP 3 — tool-content ToolEntry');
for (const loc of LOCALES) {
  const te = data[loc] && data[loc].toolEntry;
  if (!te) { console.log(`  (no ${loc} toolEntry)`); continue; }
  const f = path.join(TC_DIR, loc + '.json');
  const raw = fs.readFileSync(f, 'utf8');
  const j = JSON.parse(raw);
  if (j['syllable-splitter']) { console.log(`  ${loc}: already present — skipped`); continue; }
  const out = {};
  for (const k of Object.keys(j)) {
    if (k === 'labels') out['syllable-splitter'] = te;   /* always immediately before labels */
    out[k] = j[k];
  }
  if (!out['syllable-splitter']) die(`${loc}.json has no trailing "labels" key to anchor against`);
  console.log(`  ${loc}: inserted before labels (slug ${te.slug})`);
  if (APPLY) fs.writeFileSync(f, JSON.stringify(out, null, 2) + '\n');
}

/* ---------------- 4. manipulatives ---------------- */
console.log('\nSTEP 4 — manipulatives copy');
{
  let src = fs.readFileSync(MANIP, 'utf8');
  const before = src;
  const start = src.indexOf('    id: "syllable-splitter",');
  if (start < 0) die('syllable-splitter entry not found in manipulatives.ts');
  const end = src.indexOf('\n  },', start);
  let block = src.slice(start, end);

  for (const loc of LOCALES) {
    const m = data[loc] && data[loc].manip;
    if (!m) continue;
    for (const field of ['title', 'tagline', 'description']) {
      if (!m[field]) continue;
      const val = String(m[field]).replace(/"/g, '\\"');
      const re = new RegExp('(\\n      ' + loc + ': ")(?:[^"\\\\]|\\\\.)*(",)');
      const secRe = new RegExp(field + ': \\{[\\s\\S]*?\\n    \\}');
      const sec = block.match(secRe);
      if (!sec) die(`manipulatives ${field} block not found`);
      if (!re.test(sec[0])) die(`manipulatives ${field}.${loc} row not found`);
      block = block.replace(sec[0], sec[0].replace(re, '$1' + val + '$2'));
      applied++;
    }
    console.log(`  ${loc}: manip copy`);
  }
  src = src.slice(0, start) + block + src.slice(end);
  if (APPLY && src !== before) fs.writeFileSync(MANIP, src);
}

console.log(`\n${APPLY ? 'APPLIED' : 'DRY RUN (no files written — pass --apply)'} — ${applied} field(s)`);
console.log('Next: node scripts/verify-syllable-splitter.js   &&   node scripts/smoke-syllable-splitter-locales.js');
