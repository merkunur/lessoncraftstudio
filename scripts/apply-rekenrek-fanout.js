#!/usr/bin/env node
/* =====================================================================
   apply-rekenrek-fanout.js — batch-apply the 10 native-agent
   deliverables (scratchpad rekenrek-<loc>.json) to:
     1. mini tools/rekenrek.js         — strings corrections (exactly-once
        single-line rebuild per key; the proven letter-tiles pattern)
     2. mini tools/rekenrek-seqs.json  — sequence name/note corrections
     3. frontend/messages/tool-content/<loc>.json — the ToolEntry
        (inserted before "labels"; addition-only)
     4. frontend/lib/manipulatives.ts  — ONE new rekenrek entry built
        from all 10 deliverables + the EN values authored inline
   Heterogeneous-shape normalizer per the standing lesson: corrections
   may arrive as strings, {corrected}, {value}, or with status/changed
   flags — extract() handles all; 'keep'/same-as-current are skipped.
   Run with --dry-run to preview. Exit 1 on any structural failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const SCRATCH = 'C:/Users/rkgen/AppData/Local/Temp/claude/C--Users-rkgen-lessoncraftstudio/c55d44cf-fa06-4fe4-8af8-69e090308583/scratchpad';
const TOOL_FILE = path.join(REPO, 'mini tools', 'rekenrek.js');
const SEQS_FILE = path.join(REPO, 'mini tools', 'rekenrek-seqs.json');
const MANIP_FILE = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
const LOCS = ['de', 'nl', 'fr', 'es', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const ALL_LOCS = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const errors = [];
const E = (m) => { errors.push(m); console.log('  ✗ ' + m); };
const OK = (m) => console.log('  ✓ ' + m);

/* normalizer: agent correction values arrive in heterogeneous shapes */
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

/* ---- load everything ---- */
let toolSrc = fs.readFileSync(TOOL_FILE, 'utf8');
const seqs = JSON.parse(fs.readFileSync(SEQS_FILE, 'utf8'));
const deliverables = {};
for (const L of LOCS) {
  const f = path.join(SCRATCH, `rekenrek-${L}.json`);
  if (!fs.existsSync(f)) { E(`${L}: deliverable missing (${f})`); continue; }
  try { deliverables[L] = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { E(`${L}: deliverable parse error: ${e.message}`); }
}
if (errors.length) { console.log('\nFAIL — deliverables incomplete'); process.exit(1); }

/* ---- 1. strings corrections in rekenrek.js ---- */
console.log('\n1. strings corrections (rekenrek.js)');
let stringsApplied = 0;
for (const L of LOCS) {
  const corr = deliverables[L].stringsCorrections || {};
  for (const key of Object.keys(corr)) {
    const val = extract(corr[key], L);
    if (!val) continue;
    /* exactly-once: the single-line strings entry `    key:  {en:'...` */
    const re = new RegExp(`^(\\s{4})(${key}):(\\s*)\\{(en:.*)\\}(,?)\\s*$`, 'm');
    const matches = toolSrc.match(new RegExp(`^\\s{4}${key}:\\s*\\{en:`, 'gm')) || [];
    if (matches.length !== 1) { E(`${L}.${key}: ${matches.length} line matches (need exactly 1)`); continue; }
    const m = toolSrc.match(re);
    if (!m) { E(`${L}.${key}: line regex failed`); continue; }
    let obj;
    try { obj = eval('({' + m[4] + '})'); }
    catch (e) { E(`${L}.${key}: line eval failed: ${e.message}`); continue; }
    if (obj[L] === val) continue;                      /* same-as-current */
    if (/\{n\}/.test(obj.en) && !/\{n\}/.test(val)) { E(`${L}.${key}: correction drops the {n} placeholder`); continue; }
    obj[L] = val;
    const rebuilt = m[1] + m[2] + ':' + m[3] + '{' + ALL_LOCS.map(l => `${l}:'${esc(obj[l] != null ? obj[l] : obj.en)}'`).join(',') + '}' + m[5];
    toolSrc = toolSrc.replace(re, rebuilt.replace(/\$/g, '$$$$'));
    stringsApplied++;
  }
}
OK(`${stringsApplied} string fields rebuilt`);

/* ---- 2. sequence corrections ---- */
console.log('\n2. sequence corrections (rekenrek-seqs.json)');
let seqApplied = 0;
for (const L of LOCS) {
  const list = deliverables[L].seqCorrections || [];
  for (const c of Array.isArray(list) ? list : []) {
    const id = c.id || c.seqId;
    const field = c.field;
    const val = extract(c.corrected != null ? c.corrected : c, L);
    if (!id || !['name', 'note'].includes(field) || !val) { if (id || field) E(`${L}: bad seq correction ${JSON.stringify(c).slice(0, 60)}`); continue; }
    const sq = seqs.sequences.find(s => s.id === id);
    if (!sq) { E(`${L}: unknown seq id "${id}"`); continue; }
    if (sq[field][L] === val) continue;
    sq[field][L] = val;
    seqApplied++;
  }
}
OK(`${seqApplied} sequence fields updated`);

/* ---- 3. tool-content ToolEntry per locale ---- */
console.log('\n3. tool-content entries');
const REQUIRED = ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription', 'about', 'howToUse', 'classroomIdeas'];
const tcWrites = {};
for (const L of LOCS) {
  const te = deliverables[L].toolEntry;
  if (!te) { E(`${L}: toolEntry missing`); continue; }
  for (const k of REQUIRED) if (!te[k] || (Array.isArray(te[k]) && !te[k].length)) E(`${L}: toolEntry.${k} missing/empty`);
  if (te.about && te.about.length !== 3) E(`${L}: about has ${te.about.length} paragraphs (need 3)`);
  if (te.howToUse && te.howToUse.length !== 5) E(`${L}: howToUse has ${te.howToUse.length} steps (need 5)`);
  if (te.classroomIdeas && (te.classroomIdeas.length < 4 || te.classroomIdeas.length > 5)) E(`${L}: classroomIdeas ${te.classroomIdeas.length} (need 4-5)`);
  if (te.metaTitle && te.metaTitle.length > 66) console.log(`  ⚠ ${L}: metaTitle ${te.metaTitle.length} chars (>66)`);
  if (te.metaDescription && (te.metaDescription.length < 120 || te.metaDescription.length > 175)) console.log(`  ⚠ ${L}: metaDescription ${te.metaDescription.length} chars`);
  if (te.slug && !/^[a-z0-9-]+$/.test(te.slug)) E(`${L}: slug "${te.slug}" not url-safe`);
  if (JSON.stringify(te).includes('Common Core')) E(`${L}: toolEntry mentions Common Core`);
  const file = path.join(REPO, 'frontend', 'messages', 'tool-content', `${L}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = {};
  for (const k of Object.keys(j)) {
    if (k === 'labels') out.rekenrek = { slug: te.slug, name: te.name, tagline: te.tagline, metaTitle: te.metaTitle, metaDescription: te.metaDescription, about: te.about, howToUse: te.howToUse, classroomIdeas: te.classroomIdeas };
    if (k !== 'rekenrek') out[k] = j[k];
  }
  tcWrites[file] = out;
  OK(`${L}: toolEntry "${te.name}" (slug ${te.slug})`);
}

/* ---- 4. manipulatives.ts entry ---- */
console.log('\n4. manipulatives entry');
const manipEN = {
  title: 'Rekenrek',
  tagline: 'Twenty beads, one push — see the number.',
  description: 'Slide five-red-five-white bead chains with a wooden clack — showing 7 is one push, seen as five-and-two. Flash the rack behind the curtain, hear the number word spoken aloud, and grow from one rod to the 100-bead wall.',
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
const ORDER = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];   /* file's own locale order */
const q = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const field = (name, map) => `    ${name}: {\n` + ORDER.map(l => `      ${l}: ${q(map[l] || map.en)},`).join('\n') + '\n    },';
const manipEntry = `  {\n    id: "rekenrek",\n    mini_tool_url: "/mini-tools/rekenrek.html",\n${field('title', manip.title)}\n${field('tagline', manip.tagline)}\n${field('description', manip.description)}\n  },`;
let manipSrc = fs.readFileSync(MANIP_FILE, 'utf8');
if (manipSrc.includes('id: "rekenrek"')) { OK('manipulatives entry already present — replacing not supported, skipping'); }
else {
  const anchor = manipSrc.lastIndexOf('\n];');
  if (anchor < 0) E('manipulatives.ts: array close not found');
  else manipSrc = manipSrc.slice(0, anchor) + '\n' + manipEntry + manipSrc.slice(anchor);
  OK('manipulatives entry built (11 locales)');
}

/* ---- write ---- */
if (errors.length) { console.log(`\nFAIL — ${errors.length} error(s); nothing written`); process.exit(1); }
if (DRY) { console.log('\nDRY-RUN — no files written'); process.exit(0); }
fs.writeFileSync(TOOL_FILE, toolSrc);
fs.writeFileSync(SEQS_FILE, JSON.stringify(seqs, null, 2) + '\n');
for (const [f, obj] of Object.entries(tcWrites)) fs.writeFileSync(f, JSON.stringify(obj, null, 2) + '\n');
fs.writeFileSync(MANIP_FILE, manipSrc);
console.log('\nAPPLIED — rekenrek.js, rekenrek-seqs.json, 10 tool-content files, manipulatives.ts');
