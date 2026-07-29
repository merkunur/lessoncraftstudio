#!/usr/bin/env node
/* =====================================================================
   apply-letter-studio-fanout.js — land the 11 native ensembles' work.

   Each ensemble wrote ONE JSON file (the strings it changed + its
   ToolEntry + its hub blurb + ITS RULING). This script is the only thing
   that writes them into the repo, so every landing goes through the same
   gates:

     1. SLUG COLLISION — the standing gate. /tools/ is one namespace
        shared with the 33 worksheet makers, so a new slug is checked
        against BOTH tool-content AND maker-content, in EVERY locale,
        before anything is written. A collision aborts the whole run.
     2. LINE CONTRACT — tool strings live one physical line per key
        (`key:{en:'…',de:'…',…}`). Replacement is a surgical single-locale
        edit on that line; anything that does not match exactly aborts,
        rather than reflowing a file the verify gate parses by line.
     3. PLACEHOLDER PARITY — {a} in, {a} out. A locale that drops or
        invents a placeholder aborts.
     4. NO STRAIGHT APOSTROPHES in landed content (typographic ’ only).
     5. THE RULING — new for this tool, and the reason the fan-out existed
        at all. Each locale states the writing guide its schools actually
        use. Only renderer-true fields are landed ({system, zones, band});
        a locale's provenance rides as a comment so the file says WHY.

   Nothing is written until every check has passed for every locale.

   Usage: LS_FANOUT_DIR=<dir> node scripts/apply-letter-studio-fanout.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
/* No default: the #24 script hard-coded a dead scratchpad UUID, which is a
   silent way to land the wrong session's work. Demand the path. */
const IN_DIR = process.env.LS_FANOUT_DIR;
if (!IN_DIR) { console.error('ABORT — set LS_FANOUT_DIR to the directory holding <locale>.json'); process.exit(1); }
const TOOL = path.join(REPO, 'mini tools', 'letter-studio.js');
const TC_DIR = path.join(REPO, 'frontend', 'messages', 'tool-content');
const MC_DIR = path.join(REPO, 'frontend', 'messages', 'maker-content');
const MANIP = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
const KEY = 'letter-studio';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const DRY = process.argv.includes('--dry-run');

const die = (m) => { console.error('ABORT — ' + m); process.exit(1); };
const say = (m) => console.log('  ' + m);

/* ---------- load ---------- */
const bundles = {};
for (const loc of LOCALES) {
  const f = path.join(IN_DIR, loc + '.json');
  if (loc === 'en') continue;                 /* en is authored in-tool */
  if (!fs.existsSync(f)) die(`${loc}.json is missing — the ${loc} ensemble has not landed`);
  let j;
  try { j = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { die(`${loc}.json is not valid JSON: ${e.message}`); }
  if (j.locale !== loc) die(`${loc}.json declares locale "${j.locale}"`);
  for (const k of ['toolEntry', 'manip', 'ruling']) if (!j[k]) die(`${loc}.json has no ${k}`);
  const te = j.toolEntry;
  for (const k of ['slug', 'name', 'tagline', 'about', 'howToUse', 'classroomIdeas', 'metaTitle', 'metaDescription'])
    if (!te[k] || (Array.isArray(te[k]) && !te[k].length)) die(`${loc} toolEntry.${k} is empty`);
  bundles[loc] = j;
}
const FAN = LOCALES.filter(l => l !== 'en');
console.log(`loaded ${FAN.length} ensemble bundles`);

/* ---------- gate 1: slug collisions (the standing gate) ---------- */
console.log('\n[1] slug collision — /tools/ is shared with the 33 makers');
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
  say(`${loc}: ${slug} — clear against ${taken.length} existing slugs`);
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
    /* A correction for a key that no longer exists is not fatal — the dead
       `againBtn` was deleted mid-build precisely because an ensemble read it
       and found it unreachable. Skip it loudly rather than abort. */
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

/* ---------- gate 5: THE RULING ---------- */
console.log('\n[3] the ruling — each locale’s real writing guide');
const KINDS = ['solid', 'dashed'], TONES = ['faint', 'mid', 'strong'];
const rulings = {};
for (const loc of FAN) {
  const r = bundles[loc].ruling;
  if (typeof r.system !== 'string' || !r.system.trim()) die(`${loc} ruling has no system`);
  const z = r.zones;
  if (!Array.isArray(z) || z.length < 2 || z.length > 6) die(`${loc} ruling has ${z && z.length} zones — expected 2..6`);
  let prev = -1, strong = 0, atBaseline = false;
  for (const s of z) {
    if (s.y === 84) atBaseline = true;
    if (typeof s.y !== 'number' || !isFinite(s.y) || s.y < 0 || s.y > 110) die(`${loc} ruling zone y=${s.y} is outside the 0..110 sheet`);
    if (s.y <= prev) die(`${loc} ruling zones are not in top-to-bottom order (${prev} then ${s.y})`);
    prev = s.y;
    if (KINDS.indexOf(s.kind) < 0) die(`${loc} ruling zone kind "${s.kind}"`);
    if (TONES.indexOf(s.tone) < 0) die(`${loc} ruling zone tone "${s.tone}"`);
    if (s.tone === 'strong') strong++;
  }
  /* ⚠ The obvious invariant — "exactly one strong line, the baseline" — is
     an ANGLO ASSUMPTION, and two ensembles disproved it from primary
     sources. Spanish doble raya boxes lowercase between TWO solid lines of
     equal weight (that is what "doble" means), and Finland's official OPH
     grid draws FOUR identical 0.5w lines with no emphasis anywhere. Either
     rule — exactly-one, or at-least-one — would have rejected a correct
     national convention and pushed a native to fake one.
     What IS universal, and all ten locales produced independently: a line
     where the letters actually sit. A writing guide that draws no line at
     the baseline is not a writing guide. */
  if (!atBaseline) die(`${loc} ruling draws no line at the baseline (y=84) — letters would float`);
  if (r.band) {
    const b = r.band;
    if (typeof b.from !== 'number' || typeof b.to !== 'number' || b.to <= b.from)
      die(`${loc} ruling band is not a from<to pair`);
    if (b.from < z[0].y || b.to > z[z.length - 1].y) die(`${loc} ruling band escapes its own zones`);
  }
  rulings[loc] = r;
  say(`${loc}: ${r.system} — ${z.length} zones, ${strong} strong${r.band ? ', tinted band' : ''}`);
}

/* rebuild the RULING map whole (brace-counted splice; the block is nested
   structure, so a line-regex cannot own it) */
{
  const at = src.indexOf('\n  RULING: {');
  if (at < 0) die('could not find the RULING block');
  let i = src.indexOf('{', at), depth = 0, end = -1;
  for (let k = i; k < src.length; k++) {
    if (src[k] === '{') depth++;
    else if (src[k] === '}') { depth--; if (!depth) { end = k; break; } }
  }
  if (end < 0) die('could not find the end of the RULING block');
  const zone = (s) => `{ y: ${s.y}, kind: '${s.kind}', tone: '${s.tone}' }`;
  const one = (loc) => {
    const r = rulings[loc];
    const band = r.band ? `, band: { from: ${r.band.from}, to: ${r.band.to} }` : '';
    return `    /* ${loc} — ${String(r.system)} */\n`
      + `    ${loc}: { system: '${r.system}', zones: [${r.zones.map(zone).join(', ')}]${band} },`;
  };
  const body = '{\n'
    + FAN.map(one).join('\n') + '\n'
    + `    /* en + any locale whose ensemble could cite no national convention */\n`
    + `    'default': {\n`
    + `      system: '3-zone',\n`
    + `      zones: [\n`
    + `        { y: 14, kind: 'dashed', tone: 'faint' },   /* ascender  */\n`
    + `        { y: 44, kind: 'dashed', tone: 'mid'   },   /* x-height  */\n`
    + `        { y: 84, kind: 'solid',  tone: 'strong'},   /* baseline  */\n`
    + `        { y: 96, kind: 'dashed', tone: 'faint' }    /* descender */\n`
    + `      ]\n`
    + `    }\n  }`;
  src = src.slice(0, i) + body + src.slice(end + 1);
  say(`RULING rebuilt: ${FAN.length} locales + default`);
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
  if (!ordered[KEY]) ordered[KEY] = te;               /* no labels key: append */
  tcWrites[f] = JSON.stringify(ordered, null, 2) + '\n';
  say(`${loc}: ${te.name}`);
}

/* ---------- manipulatives entry ---------- */
console.log('\n[5] manipulatives entry');
let manipSrc = fs.readFileSync(MANIP, 'utf8');
/* RE-RUNNABLE. An ensemble revising its own bundle after a first landing is
   normal — the Swedish one did exactly that, correcting its ruling from the
   neutral default to a real stödlinjerat convention hours later. Every other
   step here already overwrites, so the manipulatives entry is cut out and
   rebuilt rather than treated as a one-shot append. */
{
  const marker = `  {\n    id: "${KEY}",`;
  const at = manipSrc.indexOf(marker);
  if (at >= 0) {
    const stop = manipSrc.indexOf('\n  },\n', at);
    if (stop < 0) die('found a letter-studio manip entry but not its end');
    manipSrc = manipSrc.slice(0, at) + manipSrc.slice(stop + '\n  },\n'.length);
    say('existing entry removed — rebuilding from the current bundles');
  }
}
const EN = JSON.parse(fs.readFileSync(path.join(TC_DIR, 'en.json'), 'utf8'))[KEY];
if (!EN) die('tool-content/en.json has no letter-studio entry yet — write the en ToolEntry first');
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
console.log('\nlanded: tool strings + 10 rulings + 10 ToolEntries + the manipulatives entry');
