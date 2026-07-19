#!/usr/bin/env node
/* =====================================================================
   apply-money-mat-fanout.js — batch-apply the 10 native-agent
   deliverables (scratchpad money-mat-<loc>.json) to:
     1. mini tools/money-mat.js — strings corrections + SPOKEN template
        rows + UNITW unit-word rows + NOUNS phrase rows
     2. frontend/messages/tool-content/<loc>.json — the ToolEntry
     3. frontend/lib/manipulatives.ts — ONE new money-mat entry
   Includes the STANDING slug-uniqueness gate against BOTH tool-content
   AND maker-content. Run with --dry-run to preview. Exit 1 on failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const SCRATCH = 'C:/Users/rkgen/AppData/Local/Temp/claude/C--Users-rkgen-lessoncraftstudio/dcee0a6c-dd74-446f-9ede-697d793768e3/scratchpad';
const TOOL_FILE = path.join(REPO, 'mini tools', 'money-mat.js');
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
const esc = (s) => s.replace(/'/g, '’');

let toolSrc = fs.readFileSync(TOOL_FILE, 'utf8');

const deliverables = {};
for (const L of LOCS) {
  const f = path.join(SCRATCH, `money-mat-${L}.json`);
  if (!fs.existsSync(f)) { E(`${L}: deliverable missing`); continue; }
  try { deliverables[L] = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { E(`${L}: parse error: ${e.message}`); }
}
if (errors.length) { console.log('\nFAIL — deliverables incomplete'); process.exit(1); }

/* shared single-line {en:...} map rebuilder (indent-parametrized) */
function applyLineMap(kind, key, L, val, indent) {
  const pad = ' '.repeat(indent || 4);
  const count = (toolSrc.match(new RegExp(`^${pad}${key}:\\s*\\{en:`, 'gm')) || []).length;
  if (count !== 1) { E(`${L}.${kind}.${key}: ${count} line matches (need exactly 1)`); return false; }
  const re = new RegExp(`^(${pad})(${key}):(\\s*)\\{(en:.*)\\}(,?)\\s*$`, 'm');
  const m = toolSrc.match(re);
  if (!m) { E(`${L}.${kind}.${key}: line regex failed`); return false; }
  let obj;
  try { obj = eval('({' + m[4] + '})'); }
  catch (e) { E(`${L}.${kind}.${key}: eval failed: ${e.message}`); return false; }
  if (obj[L] === val) return false;
  const ph = (obj.en.match(/\{\w+\}/g) || []);
  if (ph.some((p) => !val.includes(p))) { E(`${L}.${kind}.${key}: drops a placeholder`); return false; }
  obj[L] = esc(val);
  const rebuilt = m[1] + m[2] + ':' + m[3] + '{' + ALL_LOCS.map((l) => `${l}:'${esc(obj[l] != null ? obj[l] : obj.en)}'`).join(',') + '}' + m[5];
  toolSrc = toolSrc.replace(re, rebuilt.replace(/\$/g, '$$$$'));
  return true;
}

/* ---- 1. strings + SPOKEN + NOUNS ---- */
console.log('\n1. strings / spoken / noun corrections');
let nStrings = 0, nSpoken = 0, nNouns = 0;
for (const L of LOCS) {
  const d = deliverables[L];
  for (const key of Object.keys(d.stringsCorrections || {})) {
    const v = extract(d.stringsCorrections[key], L);
    if (v && applyLineMap('strings', key, L, v, 4)) nStrings++;
  }
  for (const key of Object.keys(d.spokenCorrections || {})) {
    const v = extract(d.spokenCorrections[key], L);
    if (v && applyLineMap('spoken', key, L, v, 4)) nSpoken++;
  }
  for (const key of Object.keys(d.nounCorrections || {})) {
    const v = extract(d.nounCorrections[key], L);
    if (!v) continue;
    const kEsc = key.replace(/-/g, '\\-');
    const re = new RegExp(`^(    '?${kEsc}'?): \\{(en:.*)\\}(,?)$`, 'm');
    const m = toolSrc.match(re);
    if (!m) { E(`${L}.nouns.${key}: row not found`); continue; }
    let obj;
    try { obj = eval('({' + m[2] + '})'); } catch (e) { E(`${L}.nouns.${key}: eval ${e.message}`); continue; }
    if (obj[L] === v) continue;
    obj[L] = esc(v);
    const rebuilt = m[1] + ': {' + ALL_LOCS.map((l) => `${l}:'${esc(obj[l] != null ? obj[l] : obj.en)}'`).join(',') + '}' + m[3];
    toolSrc = toolSrc.replace(re, rebuilt.replace(/\$/g, '$$$$'));
    nNouns++;
  }
}
OK(`${nStrings} strings + ${nSpoken} spoken templates + ${nNouns} noun phrases rebuilt`);

/* ---- 2. UNITW unit words (per locale-currency row) ---- */
console.log('\n2. unit words');
const CUR_OF = { de: 'eur', fr: 'eur', it: 'eur', es: 'eur', nl: 'eur', fi: 'eur', pt: 'brl', sv: 'sek', da: 'dkk', no: 'nok' };
for (const L of LOCS) {
  const uw = deliverables[L].unitWords;
  if (!uw) { OK(`${L}: unit words unchanged`); continue; }
  const cKey = CUR_OF[L];
  /* eur rows are one-locale-per-line; brl/sek/dkk/nok are inline single
     rows — match the locale's row ANYWHERE (each occurs exactly once) */
  const re = new RegExp(`(${L}: \\{ )majS:'[^']*', majP:'[^']*', minS:'[^']*', minP:'[^']*'( \\})`);
  const m = toolSrc.match(re);
  if (!m) { E(`${L}: UNITW row for ${cKey} not found`); continue; }
  const rebuilt = m[1] + `majS:'${esc(uw.majS || '')}', majP:'${esc(uw.majP || '')}', minS:'${esc(uw.minS || '')}', minP:'${esc(uw.minP || '')}'` + m[2];
  toolSrc = toolSrc.replace(re, rebuilt.replace(/\$/g, '$$$$'));
  OK(`${L}: unit words → ${uw.majS}/${uw.majP}` + (uw.minS ? ` + ${uw.minS}/${uw.minP}` : ''));
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
  for (const k of Object.keys(tc)) if (k !== 'labels' && k !== 'money-mat' && tc[k] && tc[k].slug) taken.add(tc[k].slug);
  if (fs.existsSync(mkFile)) {
    const mk = JSON.parse(fs.readFileSync(mkFile, 'utf8'));
    for (const k of Object.keys(mk)) if (mk[k] && mk[k].slug) taken.add(mk[k].slug);
  }
  if (taken.has(te.slug)) E(`${L}: slug "${te.slug}" COLLIDES with an existing tool/maker slug`);

  const out = {};
  for (const k of Object.keys(tc)) {
    if (k === 'labels') out['money-mat'] = { slug: te.slug, name: te.name, tagline: te.tagline, metaTitle: te.metaTitle, metaDescription: te.metaDescription, about: te.about, howToUse: te.howToUse, classroomIdeas: te.classroomIdeas };
    if (k !== 'money-mat') out[k] = tc[k];
  }
  tcWrites[tcFile] = out;
  OK(`${L}: "${te.name}" (slug ${te.slug})`);
}

/* ---- 4. manipulatives entry ---- */
console.log('\n4. manipulatives entry');
const manipEN = {
  title: 'Money Mat',
  tagline: 'Count real coins onto the mat — in your classroom’s own currency.',
  description: 'A warm market stall for first money work, in the coins children actually see: euros, kronor, kroner, reais, dollars or pounds — with true relative coin sizes and locale price formats. Tap coins from the purse onto the mat and the running total counts up with soft clinks; a speaker chip says the total out loud. Pay exactly and a gentle invitation asks for the same amount another way. Premium adds banknotes, bigger prices, saved stalls, and a change-making mode where the stall keeper counts your change back coin by coin, out loud.',
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
const field = (name, map) => `    ${name}: {\n` + ORDER.map((l) => `      ${l}: ${q(map[l] || map.en)},`).join('\n') + '\n    },';
const manipEntry = `  {\n    id: "money-mat",\n    mini_tool_url: "/mini-tools/money-mat.html",\n${field('title', manip.title)}\n${field('tagline', manip.tagline)}\n${field('description', manip.description)}\n  },`;
let manipSrc = fs.readFileSync(MANIP_FILE, 'utf8');
if (manipSrc.includes('id: "money-mat"')) OK('manipulatives entry already present — skipping');
else {
  const anchor = manipSrc.lastIndexOf('\n];');
  if (anchor < 0) E('manipulatives.ts: array close not found');
  else manipSrc = manipSrc.slice(0, anchor) + '\n' + manipEntry + manipSrc.slice(anchor);
  OK('manipulatives entry built (11 locales)');
}

if (errors.length) { console.log(`\nFAIL — ${errors.length} error(s); nothing written`); process.exit(1); }
if (DRY) { console.log('\nDRY-RUN — no files written'); process.exit(0); }
fs.writeFileSync(TOOL_FILE, toolSrc);
for (const [f, obj] of Object.entries(tcWrites)) fs.writeFileSync(f, JSON.stringify(obj, null, 2) + '\n');
fs.writeFileSync(MANIP_FILE, manipSrc);
console.log('\nAPPLIED — money-mat.js, 10 tool-content files, manipulatives.ts');
