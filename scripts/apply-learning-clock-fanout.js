#!/usr/bin/env node
/* =====================================================================
   apply-learning-clock-fanout.js — batch-apply the 10 native-agent
   deliverables (scratchpad learning-clock-<loc>.json) to:
     1. mini tools/learning-clock.js — strings corrections (exactly-once
        single-line rebuild) + title-consistency (strings.title[loc] :=
        toolEntry.name) + TIME_RULES whole-line replace per the
        /*__TR_<loc>__* / marker (each native OWNS its rule object)
     2. scripts/verify-learning-clock-l10n.js — ACCEPTED_DIVERGENCES
        computed EMPIRICALLY (post-apply sayTime vs the 16 anchors) and
        validated against the per-locale ruled-divergence WHITELIST below
        (a mismatch outside the whitelist FAILS the apply)
     3. frontend/messages/tool-content/<loc>.json — the ToolEntry
     4. frontend/lib/manipulatives.ts — the learning-clock entry rebuilt
        from all 10 deliverables + the EN values
   Post-check: re-runs the speech regression gate; apply FAILS on red.
   fr/pt night-time (ampm) specials are DROPPED — sayTime has no am/pm
   input (deferred cross-locale opts.pm enhancement, both natives ruled).
   Run with --dry-run to preview. Exit 1 on any structural failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cp = require('child_process');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const SCRATCH = 'C:/Users/rkgen/AppData/Local/Temp/claude/C--Users-rkgen-lessoncraftstudio/c55d44cf-fa06-4fe4-8af8-69e090308583/scratchpad';
const TOOL_FILE = path.join(REPO, 'mini tools', 'learning-clock.js');
const GATE_FILE = path.join(REPO, 'scripts', 'verify-learning-clock-l10n.js');
const MANIP_FILE = path.join(REPO, 'frontend', 'lib', 'manipulatives.ts');
const LOCS = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const ALL_LOCS = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* Per-locale anchors the native EXPLICITLY ruled divergent (see each
   deliverable's acceptedDivergences). A post-apply mismatch at any OTHER
   anchor is an authoring accident and fails the apply. */
const RULED = {
  es: { keys: ['7:45', '4:40', '1:50'], reason: 'Mexican para-system (un cuarto para las ocho) over peninsular menos — native ruling, learning-clock-es.json' },
  nl: { keys: ['9:20', '4:40'], reason: 'digit-register normalized at :20/:40 (tien voor half 10) — the word/digit mix in the anchors is an artefact; native ruling, learning-clock-nl.json' },
  no: { keys: ['3:00', '9:00', '12:00', '10:00'], reason: 'whole hours read "klokka {H}" — bare digit is ambiguous vs a minute numeral; native ruling, learning-clock-no.json' },
  fi: { keys: ['9:20', '12:25'], reason: 'anchor itself is bad Finnish (puoli kymmentä → puoli kymmenen; viisi vaille → viittä vaille, Kielitoimiston sanakirja) — native ruling, learning-clock-fi.json; clock-core timeExpr correction flagged to operator (§10.3)' },
};

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
const deliverables = {};
for (const L of LOCS) {
  const f = path.join(SCRATCH, `learning-clock-${L}.json`);
  if (!fs.existsSync(f)) { E(`${L}: deliverable missing`); continue; }
  try { deliverables[L] = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { E(`${L}: parse error: ${e.message}`); }
}
if (errors.length) { console.log('\nFAIL — deliverables incomplete'); process.exit(1); }

/* ---- 1. TIME_RULES whole-line replace ---- */
console.log('\n1. TIME_RULES (learning-clock.js)');
function serializeRules(loc, tr) {
  const words = (a) => '[' + a.map(q1).join(',') + ']';
  const parts = [];
  if (!Array.isArray(tr.hourWords) || tr.hourWords.length !== 12) { E(`${loc}: hourWords length`); return null; }
  parts.push('hourWords:' + words(tr.hourWords));
  parts.push('hourWordsAlt:' + (Array.isArray(tr.hourWordsAlt) && tr.hourWordsAlt.length === 12 ? words(tr.hourWordsAlt) : 'null'));
  if (Array.isArray(tr.hourWordsAlt2) && tr.hourWordsAlt2.length === 12) parts.push('hourWordsAlt2:' + words(tr.hourWordsAlt2));
  const pos = tr.positions || {};
  const pKeys = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  for (const k of pKeys) if (typeof pos[k] !== 'string' && typeof pos[String(k)] !== 'string') { E(`${loc}: positions[${k}] missing`); return null; }
  parts.push('positions:{' + pKeys.map((k) => k + ':' + q1(pos[k] != null ? pos[k] : pos[String(k)])).join(',') + '}');
  if (tr.overlays && tr.overlays.deQuarter) {
    const o = tr.overlays.deQuarter;
    parts.push("overlays:{deQuarter:{15:" + q1(o[15] != null ? o[15] : o['15']) + ',45:' + q1(o[45] != null ? o[45] : o['45']) + '}}');
  }
  const F = tr.formal || {};
  if (!F.tpl || !F.zero) { E(`${loc}: formal incomplete`); return null; }
  parts.push('formal:{tpl:' + q1(F.tpl) + ',zero:' + q1(F.zero) + (F.low ? ',low:' + q1(F.low) : '') + '}');
  const specials = (tr.specials || []).filter((sp) => {
    if (sp && sp.ampm && sp.ampm !== 'day') { console.log(`  ⚠ ${loc}: night special ${sp.h}:${sp.m} "${sp.text}" DROPPED (no am/pm input in sayTime — deferred)`); return false; }
    return sp && typeof sp.h === 'number' && typeof sp.m === 'number' && typeof sp.text === 'string';
  });
  parts.push('specials:[' + specials.map((sp) => '{h:' + sp.h + ',m:' + sp.m + ',text:' + q1(sp.text) + '}').join(',') + ']');
  return `    /*__TR_${loc}__*/ ${loc}: { ` + parts.join(', ') + ' },';
}
for (const L of LOCS) {
  const tr = deliverables[L].timeRules;
  if (!tr) { E(`${L}: timeRules missing`); continue; }
  const line = serializeRules(L, tr);
  if (!line) continue;
  const re = new RegExp(`^\\s*/\\*__TR_${L}__\\*/ .*$`, 'm');
  if (!re.test(toolSrc)) { E(`${L}: TR marker line not found`); continue; }
  toolSrc = toolSrc.replace(re, line.replace(/\$/g, '$$$$'));
  OK(`${L}: TIME_RULES replaced (${(tr.specials || []).length} specials in deliverable)`);
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
  for (const ph of ['{time}', '{n}', '{h}', '{m}', '{label}']) {
    if (obj.en.includes(ph) && !val.includes(ph)) { E(`${L}.${key}: drops the ${ph} placeholder`); return; }
  }
  obj[L] = val;
  const rebuilt = m[1] + m[2] + ':' + m[3] + '{' + ALL_LOCS.map((l) => `${l}:'${esc(obj[l] != null ? obj[l] : obj.en)}'`).join(',') + '}' + m[5];
  toolSrc = toolSrc.replace(re, rebuilt.replace(/\$/g, '$$$$'));
  stringsApplied++;
}
for (const L of LOCS) {
  const corr = deliverables[L].stringsCorrections || {};
  for (const key of Object.keys(corr)) {
    const val = extract(corr[key], L);
    if (val) setStringLine(L, key, val);
  }
  /* title consistency: the bubble title matches the page name */
  const name = deliverables[L].toolEntry && deliverables[L].toolEntry.name;
  if (name) setStringLine(L, 'title', name.trim());
}
OK(`${stringsApplied} string fields rebuilt`);

/* ---- 3. empirical anchor divergences vs the ruled whitelist ---- */
console.log('\n3. anchor divergences (empirical, post-apply)');
function loadFromSrc(src, name) {
  const sb = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {} }, navigator: {}, location: { search: '' }, localStorage: { getItem: () => null, setItem: () => {} }, sessionStorage: { getItem: () => null, setItem: () => {} } };
  sb.global = sb;
  vm.createContext(sb);
  vm.runInContext(src, sb);
  return sb[name] || sb.window[name];
}
let divergences = [];
try {
  const tool2 = loadFromSrc(toolSrc, 'LearningClock');
  const core = loadFromSrc(fs.readFileSync(path.join(REPO, 'mini tools', 'clock-core.js'), 'utf8'), 'ClockCore');
  for (const key of Object.keys(core.strings.timeExpr)) {
    const [H, M] = key.split(':').map(Number);
    for (const L of ALL_LOCS) {
      const want = core.strings.timeExpr[key][L];
      if (!want) continue;
      const got = tool2.sayTime(L, H, M, {});
      if (got === want) continue;
      const ruled = RULED[L] && RULED[L].keys.includes(key);
      if (!ruled) { E(`UNRULED anchor mismatch ${key}.${L}: sayTime="${got}" ≠ "${want}"`); continue; }
      divergences.push({ key, locale: L, ruled: got, reason: RULED[L].reason });
      OK(`${key}.${L}: "${got}" (ruled divergence from "${want}")`);
    }
  }
} catch (e) { E('post-apply eval failed: ' + e.message); }

/* rewrite the gate's ACCEPTED_DIVERGENCES */
let gateSrc = fs.readFileSync(GATE_FILE, 'utf8');
const divBlock = 'const ACCEPTED_DIVERGENCES = [\n' + divergences.map((d) => `  { key: '${d.key}', locale: '${d.locale}', ruled: '${esc(d.ruled)}', reason: '${esc(d.reason)}' },`).join('\n') + '\n];';
const gateRe = /const ACCEPTED_DIVERGENCES = \[[\s\S]*?\];/;
if (!gateRe.test(gateSrc)) E('gate: ACCEPTED_DIVERGENCES block not found');
else gateSrc = gateSrc.replace(gateRe, divBlock);
OK(`${divergences.length} divergence entries written to the gate`);

/* ---- 4. tool-content entries ---- */
console.log('\n4. tool-content entries');
const REQUIRED = ['slug', 'name', 'tagline', 'metaTitle', 'metaDescription', 'about', 'howToUse', 'classroomIdeas'];
const tcWrites = {};
const slugs = new Set();
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
  if (te.slug) slugs.add(te.slug);
  if (JSON.stringify(te).includes('Common Core')) E(`${L}: mentions Common Core`);
  const file = path.join(REPO, 'frontend', 'messages', 'tool-content', `${L}.json`);
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = {};
  for (const k of Object.keys(j)) {
    if (k === 'labels') out['learning-clock'] = { slug: te.slug, name: te.name, tagline: te.tagline, metaTitle: te.metaTitle, metaDescription: te.metaDescription, about: te.about, howToUse: te.howToUse, classroomIdeas: te.classroomIdeas };
    if (k !== 'learning-clock') out[k] = j[k];
  }
  tcWrites[file] = out;
  OK(`${L}: "${te.name}" (slug ${te.slug})`);
}

/* ---- 5. manipulatives entry (rebuild in place) ---- */
console.log('\n5. manipulatives entry');
const manipEN = {
  title: 'Learning Clock',
  tagline: 'The clock that says the time out loud — the way people really say it.',
  description: 'A big geared analog clock: drag either hand and the hour hand sweeps realistically with the minutes. Set 2:30 and the speech bubble says "half past 2" out loud — with a little arc that shows why. Five difficulty stops from whole hours to the minute, plus set-the-clock tasks and an elapsed-time mode.',
};
const manip = { title: { en: manipEN.title }, tagline: { en: manipEN.tagline }, description: { en: manipEN.description } };
for (const L of LOCS) {
  const mp = deliverables[L].manipulatives || {};
  /* heterogeneous-shape normalizer: title|name, description|cardDescription|blurb */
  const fields = {
    title: extract(mp.title, L) || extract(mp.name, L),
    tagline: extract(mp.tagline, L),
    description: extract(mp.description, L) || extract(mp.cardDescription, L) || extract(mp.blurb, L),
  };
  for (const f of ['title', 'tagline', 'description']) {
    if (!fields[f]) { E(`${L}: manipulatives.${f} missing`); continue; }
    manip[f][L] = fields[f];
  }
  /* title consistency with the toolEntry name */
  const name = deliverables[L].toolEntry && deliverables[L].toolEntry.name;
  if (name && manip.title[L] && manip.title[L] !== name.trim()) {
    console.log(`  ⚠ ${L}: manipulatives.title "${manip.title[L]}" → toolEntry.name "${name.trim()}" (consistency)`);
    manip.title[L] = name.trim();
  }
}
const ORDER = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const qd = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const field = (name, map) => `    ${name}: {\n` + ORDER.map((l) => `      ${l}: ${qd(map[l] || map.en)},`).join('\n') + '\n    },';
const manipEntry = `  {\n    id: "learning-clock",\n    mini_tool_url: "/mini-tools/learning-clock.html",\n${field('title', manip.title)}\n${field('tagline', manip.tagline)}\n${field('description', manip.description)}\n  },`;
let manipSrc = fs.readFileSync(MANIP_FILE, 'utf8');
const entryRe = /  \{\r?\n    id: "learning-clock",[\s\S]*?\r?\n  \},/;
if (entryRe.test(manipSrc)) { manipSrc = manipSrc.replace(entryRe, manipEntry.replace(/\$/g, '$$$$')); OK('manipulatives entry rebuilt in place (11 locales)'); }
else if (manipSrc.includes('id: "learning-clock"')) E('manipulatives.ts: entry present but the rebuild regex failed — never append a duplicate');
else {
  const anchor = manipSrc.lastIndexOf('\n];');
  if (anchor < 0) E('manipulatives.ts: array close not found');
  else { manipSrc = manipSrc.slice(0, anchor) + '\n' + manipEntry + manipSrc.slice(anchor); OK('manipulatives entry appended (11 locales)'); }
}

if (errors.length) { console.log(`\nFAIL — ${errors.length} error(s); nothing written`); process.exit(1); }
if (DRY) { console.log('\nDRY-RUN — no files written'); process.exit(0); }
fs.writeFileSync(TOOL_FILE, toolSrc);
fs.writeFileSync(GATE_FILE, gateSrc);
for (const [f, obj] of Object.entries(tcWrites)) fs.writeFileSync(f, JSON.stringify(obj, null, 2) + '\n');
fs.writeFileSync(MANIP_FILE, manipSrc);
console.log('\nAPPLIED — learning-clock.js, the gate, 10 tool-content files, manipulatives.ts');

/* ---- 6. post-check: the regression gate MUST pass ---- */
console.log('\n6. post-check: speech regression gate');
const r = cp.spawnSync('node', [GATE_FILE], { encoding: 'utf8' });
process.stdout.write(r.stdout || '');
if (r.status !== 0) { console.log('POST-CHECK FAIL — the applied rules break the gate'); process.exit(1); }
console.log('POST-CHECK PASS');
