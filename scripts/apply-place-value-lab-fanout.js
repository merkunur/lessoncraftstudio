#!/usr/bin/env node
/* =====================================================================
   apply-place-value-lab-fanout.js — batch-apply the 10 native-agent
   deliverables (scratchpad pvl-<loc>.json) to:
     1. mini tools/place-value-lab.js — strings corrections (exactly-once
        single-line rebuild) + title-consistency (strings.title[loc] :=
        toolEntry.name)
     2. frontend/messages/tool-content/<loc>.json — the ToolEntry
     3. frontend/lib/manipulatives.ts — the place-value-lab entry
        rebuilt from all 10 deliverables + the EN values
   NOTE: span PART-BOUNDARY rulings (fr mixed range, es veinti, it
   elision, nl trema) are CODE changes — they are applied MANUALLY per
   ruling before this script runs; the gate (span byte-equality) is
   re-run here as the post-check either way.
   Run with --dry-run to preview. Exit 1 on any structural failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const SCRATCH = 'C:/Users/rkgen/AppData/Local/Temp/claude/C--Users-rkgen-lessoncraftstudio/c55d44cf-fa06-4fe4-8af8-69e090308583/scratchpad';
const TOOL_FILE = path.join(REPO, 'mini tools', 'place-value-lab.js');
const GATE = path.join(REPO, 'scripts', 'verify-place-value-lab.js');
const MANIP_FILE = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
const LOCS = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
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
const deliverables = {};
for (const L of LOCS) {
  const f = path.join(SCRATCH, `pvl-${L}.json`);
  if (!fs.existsSync(f)) { E(`${L}: deliverable missing`); continue; }
  try { deliverables[L] = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { E(`${L}: parse error: ${e.message}`); }
}
if (errors.length) { console.log('\nFAIL — deliverables incomplete'); process.exit(1); }

/* ---- 1. strings corrections + title consistency ---- */
console.log('\n1. strings corrections (place-value-lab.js)');
let stringsApplied = 0;
function setStringLine(L, key, val) {
  const count = (toolSrc.match(new RegExp(`^\\s{4}${key}:\\s*\\{en:`, 'gm')) || []).length;
  if (count !== 1) { E(`${L}.${key}: ${count} line matches (need exactly 1)`); return; }
  const re = new RegExp(`^(\\s{4})(${key}):(\\s*)\\{(en:.*)\\}(,?)\\s*$`, 'm');
  const m = toolSrc.match(re);
  if (!m) { E(`${L}.${key}: line regex failed`); return; }
  let obj;
  try { obj = eval('({' + m[4] + '})'); }
  catch (e) { E(`${L}.${key}: eval failed: ${e.message}`); return; }
  if (obj[L] === val) return;
  for (const ph of ['{n}', '{a}', '{b}', '{c}', '{word}']) {
    if (obj.en.includes(ph) && !val.includes(ph)) { E(`${L}.${key}: drops the ${ph} placeholder`); return; }
  }
  obj[L] = val;
  const rebuilt = m[1] + m[2] + ':' + m[3] + '{' + ALL_LOCS.map((l) => `${l}:'${esc(obj[l] != null ? obj[l] : obj.en)}'`).join(',') + '}' + m[5];
  toolSrc = toolSrc.replace(re, rebuilt.replace(/\$/g, '$$$$'));
  stringsApplied++;
}
for (const L of LOCS) {
  const corr = deliverables[L].stringsCorrections || {};
  let titleRuled = false;
  for (const key of Object.keys(corr)) {
    const val = extract(corr[key], L);
    if (val) { setStringLine(L, key, val); if (key === 'title') titleRuled = true; }
  }
  /* title consistency — UNLESS the native explicitly ruled the in-tool
     title separately (nl: in-tool "Bouw het getal" / catalog "Getallenlab") */
  const name = deliverables[L].toolEntry && deliverables[L].toolEntry.name;
  if (name && !titleRuled) setStringLine(L, 'title', name.trim());
  if (titleRuled) console.log(`  ⚠ ${L}: in-tool title ruled separately from the catalog name (native split kept)`);
  /* slot letters ride as rulings too */
  const slots = deliverables[L].rulings && deliverables[L].rulings.slotLetters;
  if (slots && typeof slots === 'object') {
    if (slots.H || slots.h) setStringLine(L, 'slotH', String(slots.H || slots.h));
    if (slots.T || slots.t) setStringLine(L, 'slotT', String(slots.T || slots.t));
    if (slots.O || slots.o) setStringLine(L, 'slotO', String(slots.O || slots.o));
  }
}
OK(`${stringsApplied} string fields rebuilt`);

/* ---- 2. tool-content entries ---- */
console.log('\n2. tool-content entries');
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
  const file = path.join(REPO, 'frontend', 'messages', 'tool-content', `${L}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = {};
  for (const k of Object.keys(j)) {
    if (k === 'labels') out['place-value-lab'] = { slug: te.slug, name: te.name, tagline: te.tagline, metaTitle: te.metaTitle, metaDescription: te.metaDescription, about: te.about, howToUse: te.howToUse, classroomIdeas: te.classroomIdeas };
    if (k !== 'place-value-lab') out[k] = j[k];
  }
  tcWrites[file] = out;
  OK(`${L}: "${te.name}" (slug ${te.slug})`);
}

/* ---- 3. manipulatives entry (rebuild in place) ---- */
console.log('\n3. manipulatives entry');
const manipEN = {
  title: 'Place Value Lab',
  tagline: 'Blocks, digits, and the number word — linked live, in your language.',
  description: 'A base-10 workmat where ten ones visibly snap into a ten (and unbundle for borrowing), with three linked displays: blocks, the numeral, and the number word — its tens and ones parts color-matched to the columns. Build numbers, take a spoken challenge, and make regrouping subtraction physical.',
};
const manip = { title: { en: manipEN.title }, tagline: { en: manipEN.tagline }, description: { en: manipEN.description } };
for (const L of LOCS) {
  const mp = deliverables[L].manipulatives || {};
  const te = deliverables[L].toolEntry || {};
  /* heterogeneous-shape normalizer + toolEntry fallback (some natives
     delivered a VOCABULARY table, not a hub card — their toolEntry
     tagline/metaDescription are the same native's card-ready copy) */
  const fields = {
    title: extract(mp.title, L) || extract(mp.name, L) || (te.name || '').trim(),
    tagline: extract(mp.tagline, L) || (te.tagline || '').trim(),
    description: extract(mp.description, L) || extract(mp.cardDescription, L) || extract(mp.blurb, L) || extract(mp.shortDesc, L) || extract(mp.short, L) || (te.metaDescription || '').trim(),
  };
  for (const f of ['title', 'tagline', 'description']) {
    if (!fields[f]) { E(`${L}: manipulatives.${f} missing (no fallback either)`); continue; }
    manip[f][L] = fields[f];
  }
  const name = deliverables[L].toolEntry && deliverables[L].toolEntry.name;
  if (name && manip.title[L] && manip.title[L] !== name.trim()) {
    console.log(`  ⚠ ${L}: manipulatives.title "${manip.title[L]}" → toolEntry.name "${name.trim()}" (consistency)`);
    manip.title[L] = name.trim();
  }
}
const ORDER = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const qd = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const field = (name, map) => `    ${name}: {\n` + ORDER.map((l) => `      ${l}: ${qd(map[l] || map.en)},`).join('\n') + '\n    },';
const manipEntry = `  {\n    id: "place-value-lab",\n    mini_tool_url: "/mini-tools/place-value-lab.html",\n${field('title', manip.title)}\n${field('tagline', manip.tagline)}\n${field('description', manip.description)}\n  },`;
let manipSrc = fs.readFileSync(MANIP_FILE, 'utf8');
const entryRe = /  \{\r?\n    id: "place-value-lab",[\s\S]*?\r?\n  \},/;
if (entryRe.test(manipSrc)) { manipSrc = manipSrc.replace(entryRe, manipEntry.replace(/\$/g, '$$$$')); OK('manipulatives entry rebuilt in place (11 locales)'); }
else if (manipSrc.includes('id: "place-value-lab"')) E('manipulatives.ts: entry present but the rebuild regex failed — never append a duplicate');
else E('manipulatives.ts: entry missing (expected the pre-authored draft)');

if (errors.length) { console.log(`\nFAIL — ${errors.length} error(s); nothing written`); process.exit(1); }
if (DRY) { console.log('\nDRY-RUN — no files written'); process.exit(0); }
fs.writeFileSync(TOOL_FILE, toolSrc);
for (const [f, obj] of Object.entries(tcWrites)) fs.writeFileSync(f, JSON.stringify(obj, null, 2) + '\n');
fs.writeFileSync(MANIP_FILE, manipSrc);
console.log('\nAPPLIED — place-value-lab.js, 10 tool-content files, manipulatives.ts');

/* ---- 4. post-check: the gate MUST pass ---- */
console.log('\n4. post-check: the span/engine/strings gate');
const r = cp.spawnSync('node', [GATE], { encoding: 'utf8' });
process.stdout.write(r.stdout || '');
if (r.status !== 0) { console.log('POST-CHECK FAIL'); process.exit(1); }
console.log('POST-CHECK PASS');
