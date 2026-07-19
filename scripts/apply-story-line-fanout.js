#!/usr/bin/env node
/* =====================================================================
   apply-story-line-fanout.js — batch-apply the 10 native-agent
   deliverables (scratchpad story-line-<loc>.json) to:
     1. mini tools/story-line.js       — strings corrections
     2. mini tools/story-line-sets.json — per-locale set titles + captions
     3. frontend/messages/tool-content/<loc>.json — the ToolEntry
     4. frontend/lib/manipulatives.ts  — ONE new story-line entry
   Includes the STANDING slug-uniqueness gate against BOTH tool-content
   AND maker-content (the /tools/ namespace is shared — the WODB lesson).
   Run with --dry-run to preview. Exit 1 on any structural failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const SCRATCH = 'C:/Users/rkgen/AppData/Local/Temp/claude/C--Users-rkgen-lessoncraftstudio/dcee0a6c-dd74-446f-9ede-697d793768e3/scratchpad';
const TOOL_FILE = path.join(REPO, 'mini tools', 'story-line.js');
const SETS_FILE = path.join(REPO, 'mini tools', 'story-line-sets.json');
const MANIP_FILE = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
const LOCS = ['de', 'nl', 'fr', 'es', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const ALL_LOCS = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const errors = [];
const E = (m) => { errors.push(m); console.log('  ✗ ' + m); };
const OK = (m) => console.log('  ✓ ' + m);

function extract(v, loc) {
  if (v == null) return null;
  if (typeof v === 'string') return v.trim() || null;
  if (typeof v === 'object') {
    if (v.changed === false) return null;
    if (typeof v.status === 'string' && /keep|ok|unchanged/i.test(v.status)) return null;
    const c = v.corrected || v.value || v[loc] || v.text;
    return typeof c === 'string' && c.trim() ? c.trim() : null;
  }
  return null;
}
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

let toolSrc = fs.readFileSync(TOOL_FILE, 'utf8');
const setsData = JSON.parse(fs.readFileSync(SETS_FILE, 'utf8'));
const setById = {};
setsData.sets.forEach((s) => { setById[s.id] = s; });

const deliverables = {};
for (const L of LOCS) {
  const f = path.join(SCRATCH, `story-line-${L}.json`);
  if (!fs.existsSync(f)) { E(`${L}: deliverable missing`); continue; }
  try { deliverables[L] = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { E(`${L}: parse error: ${e.message}`); }
}
if (errors.length) { console.log('\nFAIL — deliverables incomplete'); process.exit(1); }

/* ---- 1. strings corrections ---- */
console.log('\n1. strings corrections (story-line.js)');
let stringsApplied = 0;
for (const L of LOCS) {
  const corr = deliverables[L].stringsCorrections || {};
  for (const key of Object.keys(corr)) {
    const val = extract(corr[key], L);
    if (!val) continue;
    const count = (toolSrc.match(new RegExp(`^\\s{4}${key}:\\s*\\{en:`, 'gm')) || []).length;
    if (count !== 1) { E(`${L}.${key}: ${count} line matches (need exactly 1)`); continue; }
    const re = new RegExp(`^(\\s{4})(${key}):(\\s*)\\{(en:.*)\\}(,?)\\s*$`, 'm');
    const m = toolSrc.match(re);
    if (!m) { E(`${L}.${key}: line regex failed`); continue; }
    let obj;
    try { obj = eval('({' + m[4] + '})'); }
    catch (e) { E(`${L}.${key}: eval failed: ${e.message}`); continue; }
    if (obj[L] === val) continue;
    const ph = (obj.en.match(/\{\w+\}/g) || []);
    if (ph.some((p) => !val.includes(p))) { E(`${L}.${key}: drops a placeholder`); continue; }
    obj[L] = val;
    const rebuilt = m[1] + m[2] + ':' + m[3] + '{' + ALL_LOCS.map(l => `${l}:'${esc(obj[l] != null ? obj[l] : obj.en)}'`).join(',') + '}' + m[5];
    toolSrc = toolSrc.replace(re, rebuilt.replace(/\$/g, '$$$$'));
    stringsApplied++;
  }
}
OK(`${stringsApplied} string fields rebuilt`);

/* ---- 2. set titles + captions ---- */
console.log('\n2. set locale columns (story-line-sets.json)');
for (const L of LOCS) {
  const d = deliverables[L];
  const titles = d.setTitles || {};
  const caps = d.setCaptions || {};
  let tCount = 0, cCount = 0;
  for (const s of setsData.sets) {
    const t = extract(titles[s.id], L);
    if (!t) { E(`${L}: setTitles.${s.id} missing`); }
    else { s.title[L] = t; tCount++; }
    const arr = caps[s.id];
    if (!Array.isArray(arr) || arr.length !== s.cards.length) { E(`${L}: setCaptions.${s.id} needs exactly ${s.cards.length}`); continue; }
    const clean = arr.map((r) => (typeof r === 'string' ? r.trim() : ''));
    if (clean.some((r) => !r)) { E(`${L}: setCaptions.${s.id} has an empty caption`); continue; }
    if (clean.some((r) => r.length > 80)) { E(`${L}: setCaptions.${s.id} exceeds the 80-char cap`); continue; }
    clean.forEach((r, i) => { s.cards[i].cap[L] = r; cCount++; });
  }
  OK(`${L}: ${tCount} titles + ${cCount} captions`);
}

/* ---- 3. tool-content entries (+ the standing slug gate) ---- */
console.log('\n3. tool-content entries');
const REQUIRED = ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription', 'about', 'howToUse', 'classroomIdeas'];
const tcWrites = {};
for (const L of LOCS) {
  const te = deliverables[L].toolEntry;
  if (!te) { E(`${L}: toolEntry missing`); continue; }
  for (const k of REQUIRED) if (!te[k] || (Array.isArray(te[k]) && !te[k].length)) E(`${L}: toolEntry.${k} missing/empty`);
  if (te.about && te.about.length !== 3) E(`${L}: about ${te.about.length} paragraphs (need 3)`);
  if (te.howToUse && te.howToUse.length !== 5) E(`${L}: howToUse ${te.howToUse.length} (need 5)`);
  if (te.classroomIdeas && (te.classroomIdeas.length < 4 || te.classroomIdeas.length > 5)) E(`${L}: classroomIdeas ${te.classroomIdeas.length}`);
  if (te.metaTitle && te.metaTitle.length > 66) console.log(`  ⚠ ${L}: metaTitle ${te.metaTitle.length} chars`);
  if (te.metaDescription && (te.metaDescription.length < 120 || te.metaDescription.length > 175)) console.log(`  ⚠ ${L}: metaDescription ${te.metaDescription.length} chars`);
  if (te.slug && !/^[a-z0-9-]+$/.test(te.slug)) E(`${L}: slug "${te.slug}" not url-safe`);
  if (JSON.stringify(te).includes('Common Core')) E(`${L}: mentions Common Core`);

  const tcFile = path.join(REPO, 'frontend', 'messages', 'tool-content', `${L}.json`);
  const mkFile = path.join(REPO, 'frontend', 'messages', 'maker-content', `${L}.json`);
  const tc = JSON.parse(fs.readFileSync(tcFile, 'utf8'));
  const taken = new Set();
  for (const k of Object.keys(tc)) if (k !== 'labels' && k !== 'story-line' && tc[k] && tc[k].slug) taken.add(tc[k].slug);
  if (fs.existsSync(mkFile)) {
    const mk = JSON.parse(fs.readFileSync(mkFile, 'utf8'));
    for (const k of Object.keys(mk)) if (mk[k] && mk[k].slug) taken.add(mk[k].slug);
  }
  if (taken.has(te.slug)) E(`${L}: slug "${te.slug}" COLLIDES with an existing tool/maker slug`);

  const out = {};
  for (const k of Object.keys(tc)) {
    if (k === 'labels') out['story-line'] = { slug: te.slug, name: te.name, tagline: te.tagline, metaTitle: te.metaTitle, metaDescription: te.metaDescription, about: te.about, howToUse: te.howToUse, classroomIdeas: te.classroomIdeas };
    if (k !== 'story-line') out[k] = tc[k];
  }
  tcWrites[tcFile] = out;
  OK(`${L}: "${te.name}" (slug ${te.slug})`);
}

/* ---- 4. manipulatives entry ---- */
console.log('\n4. manipulatives entry');
const manipEN = {
  title: 'Story Line',
  tagline: 'Peg the story cards in order — then play your story.',
  description: 'A clothesline of story cards on the projector: children peg the beats in order, every peg is narrated with real sequence words, and a warm spotlight replays the whole tale. Jumbled orders play too — hearing them is the gentlest self-correction there is. No scores, no timers, and retell mode captures nothing, on purpose.',
};
const manip = { title: { en: manipEN.title }, tagline: { en: manipEN.tagline }, description: { en: manipEN.description } };
for (const L of LOCS) {
  const mp = deliverables[L].manipulatives || {};
  for (const f of ['title', 'tagline', 'description']) {
    const v = extract(mp[f], L);
    if (!v) { E(`${L}: manipulatives.${f} missing`); continue; }
    manip[f][L] = v;
  }
}
const ORDER = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const q = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const field = (name, map) => `    ${name}: {\n` + ORDER.map(l => `      ${l}: ${q(map[l] || map.en)},`).join('\n') + '\n    },';
const manipEntry = `  {\n    id: "story-line",\n    mini_tool_url: "/mini-tools/story-line.html",\n${field('title', manip.title)}\n${field('tagline', manip.tagline)}\n${field('description', manip.description)}\n  },`;
let manipSrc = fs.readFileSync(MANIP_FILE, 'utf8');
if (manipSrc.includes('id: "story-line"')) OK('manipulatives entry already present — skipping');
else {
  const anchor = manipSrc.lastIndexOf('\n];');
  if (anchor < 0) E('manipulatives.ts: array close not found');
  else manipSrc = manipSrc.slice(0, anchor) + '\n' + manipEntry + manipSrc.slice(anchor);
  OK('manipulatives entry built (11 locales)');
}

if (errors.length) { console.log(`\nFAIL — ${errors.length} error(s); nothing written`); process.exit(1); }
if (DRY) { console.log('\nDRY-RUN — no files written'); process.exit(0); }
fs.writeFileSync(TOOL_FILE, toolSrc);
fs.writeFileSync(SETS_FILE, JSON.stringify(setsData, null, 2) + '\n');
for (const [f, obj] of Object.entries(tcWrites)) fs.writeFileSync(f, JSON.stringify(obj, null, 2) + '\n');
fs.writeFileSync(MANIP_FILE, manipSrc);
console.log('\nAPPLIED — story-line.js, story-line-sets.json, 10 tool-content files, manipulatives.ts');
