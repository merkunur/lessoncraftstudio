#!/usr/bin/env node
/* =====================================================================
   apply-picture-word-wall-fanout.js — batch-apply the 10 native-agent
   deliverables (scratchpad pww-<loc>.json) to:
     1. mini tools/picture-word-wall.js — strings corrections (exactly-
        once single-line rebuild) + title consistency + the per-locale
        PWW_ARTICLES line (whole-line replace at /*__ART_<loc>__* /),
        carrying each native's ruled form + `over` exceptions
     2. frontend/messages/tool-content/<loc>.json — the ToolEntry
     3. frontend/lib/manipulatives.ts — the picture-word-wall entry
   The gate re-runs as the post-check: a native who overturns a form
   ruling (sv/da/no indefinite, fr/it un-une) or adds `over` entries
   must still leave every article composing cleanly ×1495.
   Run with --dry-run to preview. Exit 1 on any structural failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const SCRATCH = 'C:/Users/rkgen/AppData/Local/Temp/claude/C--Users-rkgen-lessoncraftstudio/c55d44cf-fa06-4fe4-8af8-69e090308583/scratchpad';
const TOOL_FILE = path.join(REPO, 'mini tools', 'picture-word-wall.js');
const GATE = path.join(REPO, 'scripts', 'verify-picture-word-wall.js');
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
const q1 = (s) => "'" + esc(s) + "'";

let toolSrc = fs.readFileSync(TOOL_FILE, 'utf8');
/* the tool's real string ids, so a native's bookkeeping keys can't be
   mistaken for one */
const toolStrings = (function () {
  const vm = require('vm');
  const sb = { window: {}, navigator: {}, localStorage: { getItem: () => null, setItem() {} } };
  sb.global = sb;
  vm.createContext(sb);
  vm.runInContext(toolSrc, sb);
  return (sb.window.PictureWordWall || {}).strings || {};
}());
const deliverables = {};
for (const L of LOCS) {
  const f = path.join(SCRATCH, `pww-${L}.json`);
  if (!fs.existsSync(f)) { E(`${L}: deliverable missing`); continue; }
  try { deliverables[L] = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { E(`${L}: parse error: ${e.message}`); }
}
if (errors.length) { console.log('\nFAIL — deliverables incomplete'); process.exit(1); }

/* ---- 1. the article table (whole-line replace per locale) ---- */
console.log('\n1. PWW_ARTICLES (picture-word-wall.js)');
function currentLine(loc) {
  const re = new RegExp('^\\s*/\\*__ART_' + loc + '__\\*/ .*$', 'm');
  const m = toolSrc.match(re);
  return m ? m[0] : null;
}
function parseLine(line, loc) {
  const body = line.slice(line.indexOf(loc + ':') + loc.length + 1).replace(/,\s*$/, '');
  try { return eval('(' + body + ')'); } catch (e) { return null; }
}
for (const L of LOCS) {
  const d = deliverables[L];
  const line = currentLine(L);
  if (!line) { E(`${L}: ART marker not found`); continue; }
  const cur = parseLine(line, L);
  if (!cur) { E(`${L}: could not parse the current article line`); continue; }
  const r = d.rulings || {};
  /* a native may overturn the FORM (the pedagogue's sv/da/no indefinite
     and fr/it un/une rulings are theirs to confirm or reverse) */
  const tbl = d.articleTable || {};
  const next = {
    form: tbl.form || (typeof r.articleForm === 'string' && /^(definite|indefinite|none)$/.test(r.articleForm) ? r.articleForm : cur.form),
    by: tbl.by || cur.by,
    plural: tbl.plural !== undefined ? tbl.plural : cur.plural,
  };
  if (cur.pluralF !== undefined || tbl.pluralF !== undefined) next.pluralF = tbl.pluralF !== undefined ? tbl.pluralF : cur.pluralF;
  next.over = d.articleOverrides && Object.keys(d.articleOverrides).length ? d.articleOverrides : {};
  const parts = ["form: " + q1(next.form), 'by: {' + Object.keys(next.by).map((g) => g + ': ' + q1(next.by[g])).join(', ') + '}'];
  parts.push('plural: ' + q1(next.plural || ''));
  if (next.pluralF !== undefined) parts.push('pluralF: ' + q1(next.pluralF));
  /* an override is a STRING (singular) or {s, p} — both ship verbatim;
     '' legitimately suppresses the article */
  const overKeys = Object.keys(next.over);
  const serOver = (v) => (typeof v === 'string')
    ? q1(v)
    : '{' + ['s', 'p'].filter((x) => v && v[x] !== undefined).map((x) => x + ': ' + q1(v[x])).join(', ') + '}';
  parts.push('over: {' + overKeys.map((k) => q1(k) + ': ' + serOver(next.over[k])).join(', ') + '}');
  const rebuilt = '    /*__ART_' + L + '__*/ ' + L + ': { ' + parts.join(', ') + ' },';
  toolSrc = toolSrc.replace(currentLine(L), rebuilt.replace(/\$/g, '$$$$'));
  const changedForm = next.form !== cur.form;
  OK(`${L}: form=${next.form}${changedForm ? ' (NATIVE OVERTURNED "' + cur.form + '")' : ''}, ${overKeys.length} override${overKeys.length === 1 ? '' : 's'}`);
}

/* ---- 2. strings corrections + title consistency ---- */
console.log('\n2. strings corrections');
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
  for (const ph of ['{word}', '{n}', '{t}']) {
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
    /* a native may include bookkeeping keys ("confirmedUnchanged") that
       are not string ids — skip anything the tool doesn't actually own */
    if (!toolStrings[key]) { if (!/^(confirmed|notes?|unchanged)/i.test(key)) console.log(`  ⚠ ${L}.${key}: not a string key — skipped`); continue; }
    const val = extract(corr[key], L);
    if (val) { setStringLine(L, key, val); if (key === 'title') titleRuled = true; }
  }
  const name = deliverables[L].toolEntry && deliverables[L].toolEntry.name;
  if (name && !titleRuled) setStringLine(L, 'title', name.trim());
  if (titleRuled) console.log(`  ⚠ ${L}: in-tool title ruled separately from the catalog name (native split kept)`);
}
OK(`${stringsApplied} string fields rebuilt`);

/* ---- 3. tool-content entries ---- */
console.log('\n3. tool-content entries');
const REQUIRED = ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription', 'about', 'howToUse', 'classroomIdeas'];
const tcWrites = {};
for (const L of LOCS) {
  const te = deliverables[L].toolEntry;
  if (!te) { E(`${L}: toolEntry missing`); continue; }
  for (const k of REQUIRED) if (!te[k] || (Array.isArray(te[k]) && !te[k].length)) E(`${L}: toolEntry.${k} missing/empty`);
  if (te.about && te.about.length !== 3) E(`${L}: about ${te.about.length} paragraphs (need 3)`);
  if (te.howToUse && te.howToUse.length !== 5) E(`${L}: howToUse ${te.howToUse.length} (need 5)`);
  /* over-delivery is not a defect — take the first 5 and SAY so; only
     under-delivery fails (the shape needs at least 4) */
  if (te.classroomIdeas && te.classroomIdeas.length > 5) {
    console.log(`  ⚠ ${L}: classroomIdeas ${te.classroomIdeas.length} → keeping the first 5`);
    te.classroomIdeas = te.classroomIdeas.slice(0, 5);
  }
  if (te.classroomIdeas && te.classroomIdeas.length < 4) E(`${L}: classroomIdeas ${te.classroomIdeas.length} (need 4-5)`);
  if (te.metaTitle && te.metaTitle.length > 66) console.log(`  ⚠ ${L}: metaTitle ${te.metaTitle.length} chars`);
  if (te.metaDescription && (te.metaDescription.length < 120 || te.metaDescription.length > 175)) console.log(`  ⚠ ${L}: metaDescription ${te.metaDescription.length} chars`);
  if (te.slug && !/^[a-z0-9-]+$/.test(te.slug)) E(`${L}: slug "${te.slug}" not url-safe`);
  if (JSON.stringify(te).includes('Common Core')) E(`${L}: mentions Common Core`);
  const file = path.join(REPO, 'frontend', 'messages', 'tool-content', `${L}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = {};
  for (const k of Object.keys(j)) {
    if (k === 'labels') out['picture-word-wall'] = { slug: te.slug, name: te.name, tagline: te.tagline, metaTitle: te.metaTitle, metaDescription: te.metaDescription, about: te.about, howToUse: te.howToUse, classroomIdeas: te.classroomIdeas };
    if (k !== 'picture-word-wall') out[k] = j[k];
  }
  tcWrites[file] = out;
  OK(`${L}: "${te.name}" (slug ${te.slug})`);
}

/* ---- 4. manipulatives entry (rebuild in place) ---- */
console.log('\n4. manipulatives entry');
const manipEN = {
  title: 'Picture Word Wall',
  tagline: '1,495 illustrated words that say themselves — with their article.',
  description: 'A browsable wall of 1,495 illustrated nouns across 50 themes. Tap a card and it grows big and says its word out loud — with its article. A toggle multiplies the picture from one to many, and the word changes with it.',
};
const manip = { title: { en: manipEN.title }, tagline: { en: manipEN.tagline }, description: { en: manipEN.description } };
for (const L of LOCS) {
  const mp = deliverables[L].manipulatives || {};
  const te = deliverables[L].toolEntry || {};
  const fields = {
    title: extract(mp.title, L) || extract(mp.name, L) || (te.name || '').trim(),
    tagline: extract(mp.tagline, L) || (te.tagline || '').trim(),
    description: extract(mp.description, L) || extract(mp.cardDescription, L) || extract(mp.blurb, L) || extract(mp.shortDesc, L) || extract(mp.short, L) || (te.metaDescription || '').trim(),
  };
  for (const f of ['title', 'tagline', 'description']) {
    if (!fields[f]) { E(`${L}: manipulatives.${f} missing (no fallback either)`); continue; }
    manip[f][L] = fields[f];
  }
  const name = te.name;
  if (name && manip.title[L] && manip.title[L] !== name.trim()) {
    console.log(`  ⚠ ${L}: manipulatives.title "${manip.title[L]}" → toolEntry.name "${name.trim()}" (consistency)`);
    manip.title[L] = name.trim();
  }
}
const ORDER = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const qd = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const field = (name, map) => `    ${name}: {\n` + ORDER.map((l) => `      ${l}: ${qd(map[l] || map.en)},`).join('\n') + '\n    },';
const manipEntry = `  {\n    id: "picture-word-wall",\n    mini_tool_url: "/mini-tools/picture-word-wall.html",\n${field('title', manip.title)}\n${field('tagline', manip.tagline)}\n${field('description', manip.description)}\n  },`;
let manipSrc = fs.readFileSync(MANIP_FILE, 'utf8');
const entryRe = /  \{\r?\n    id: "picture-word-wall",[\s\S]*?\r?\n  \},/;
if (entryRe.test(manipSrc)) { manipSrc = manipSrc.replace(entryRe, manipEntry.replace(/\$/g, '$$$$')); OK('manipulatives entry rebuilt in place (11 locales)'); }
else if (manipSrc.includes('id: "picture-word-wall"')) E('manipulatives.ts: entry present but the rebuild regex failed — never append a duplicate');
else E('manipulatives.ts: entry missing (expected the pre-authored draft)');

if (errors.length) { console.log(`\nFAIL — ${errors.length} error(s); nothing written`); process.exit(1); }
if (DRY) { console.log('\nDRY-RUN — no files written'); process.exit(0); }
fs.writeFileSync(TOOL_FILE, toolSrc);
for (const [f, obj] of Object.entries(tcWrites)) fs.writeFileSync(f, JSON.stringify(obj, null, 2) + '\n');
fs.writeFileSync(MANIP_FILE, manipSrc);
console.log('\nAPPLIED — picture-word-wall.js, 10 tool-content files, manipulatives.ts');

/* ---- 5. post-check: the gate MUST pass ---- */
console.log('\n5. post-check: the article/index/strings gate');
const r = cp.spawnSync('node', [GATE], { encoding: 'utf8' });
process.stdout.write(r.stdout || '');
if (r.status !== 0) { console.log('POST-CHECK FAIL'); process.exit(1); }
console.log('POST-CHECK PASS');
