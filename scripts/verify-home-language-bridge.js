#!/usr/bin/env node
/* =====================================================================
   verify-home-language-bridge.js — MEASURED build-gate for the Home-
   Language Bridge (mini tools/home-language-bridge.js).
   Fix the data, never the gate.

   Invariants (all measured):
     THE FENCE — this tool must NEVER read pww-index or build an image
       URL. The bilingual word list was cut because
       picture-word-wall.js already takes locale as an argument
       (`compose(loc, card, plural)`) and already ships "Our words". The
       gate makes that separation structural rather than a promise.
     ICON-FIRST — every phrase has a drawn icon, and the board is
       COMPLETE with no home language at all, because the child who
       actually arrives speaks Ukrainian, Arabic, Turkish or Somali and
       none of those is in our eleven. It must never invent a home line.
     PHRASE BOARD — 12 first-person child utterances complete in all 11
       locales, distinct within each locale, no placeholders.
     ENDONYMS / NO FLAGS — a language is named in itself; a flag is a
       country, not a language.
     PARITY — one text class for both lines, home emitted first, so
       neither language can be styled as the secondary one.
     NO ASSESSMENT — no level/score/progress field or vocabulary.
     VOICE GUARD — honest per language, permissive when the device
       reports none, and actually consulted before speaking.
     IDENTITY / NO-EXFIL / STRINGS / CSS — house gates.

   Usage: node scripts/verify-home-language-bridge.js [--locales=en,de]
   Override for mutation testing: HLB_TOOL_DIR
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const TOOL_DIR = process.env.HLB_TOOL_DIR || TOOLS_DIR;

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

const VERDICT = {
  en: /\b(wrong|incorrect|bad|failed)\b/i, de: /\b(falsch|fehler)\b/i,
  fr: /\b(faux|erreur)\b/i, it: /\b(sbagliato|errore)\b/i,
  es: /\b(incorrecto|error)\b/i, pt: /\b(errado|erro)\b/i,
  nl: /\b(fout|verkeerd)\b/i, sv: /\b(fel)\b/i,
  da: /\b(forkert|fejl)\b/i, no: /\b(feil)\b/i, fi: /\b(väärin|virhe)\b/i
};
/* the harmful pattern this tool refuses: measuring the newcomer */
const ASSESS_RE = /\b(level|score|progress|beginner|fluency|proficien\w*|niveau|nivå|niveles|nivel|punkte|poäng|poeng|pisteet|taso|stufe)\b/i;

function sandbox() {
  const noop = () => {};
  const fakeEl = () => ({
    style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    appendChild: noop, append: noop, addEventListener: noop, setAttribute: noop, removeAttribute: noop,
    insertAdjacentElement: noop, getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }),
    innerHTML: '', textContent: '', children: [], dataset: {}, remove: noop,
    querySelector: () => null, querySelectorAll: () => []
  });
  const box = {
    window: { addEventListener: noop, removeEventListener: noop, location: { search: '' } },
    navigator: { language: 'en' }, console,
    document: {
      createElement: fakeEl, createElementNS: fakeEl, getElementById: () => null,
      querySelector: () => null, querySelectorAll: () => [],
      head: { appendChild: noop }, body: { classList: { add: noop, remove: noop } },
      addEventListener: noop, documentElement: fakeEl(), hidden: false
    },
    location: { search: '', hostname: 'gate' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    URLSearchParams, Intl, Date, Math, JSON,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    requestAnimationFrame: () => 0,
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  box.globalThis = box;
  vm.createContext(box);
  return box;
}

const SRC = fs.readFileSync(path.join(TOOL_DIR, 'home-language-bridge.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

const box = sandbox();
vm.runInContext(SRC, box, { filename: 'home-language-bridge.js' });
const T = box.HomeLanguageBridge || box.window.HomeLanguageBridge;
if (!T) { console.error('  ERROR could not load HomeLanguageBridge'); process.exit(1); }

console.log('[the fence]');

/* ---------- H1 THE STRUCTURAL FENCE: this tool never reads pww-index ----------
   The words half of this tool was CUT because picture-word-wall.js already
   takes locale as an argument (`compose(loc, card, plural)`) and already
   ships "Our words" — a pinned wall whose placeholder reads "Name this wall
   (e.g. Week 12 — On the farm)". A bilingual word list is ~80 lines inside
   THAT tool. This gate makes the separation structural: if this file ever
   fetches the vocabulary index again, the build fails. */
(function () {
  if (/pww-index/.test(SRC_NC)) err('H1 this tool reads pww-index — that belongs in Picture Word Wall, not here');
  if (/image-library|\.webp|themeDir/.test(SRC_NC)) err('H1 this tool builds an image URL — the board is icon-first and offline');
  if (/themes?\s*[:.]/.test(SRC_NC) && /\bthemes\b/.test(SRC_NC)) warn('H1 the word "themes" appears — check it is not a vocabulary wall');
  const fetches = SRC_NC.match(/fetch\s*\(/g) || [];
  if (fetches.length !== 1) err(`H1 expected exactly ONE fetch (auth only), found ${fetches.length}`);
  console.log('  H1 fence ok (no vocabulary index, no images, one fetch)');
}());

/* ---------- H2 every phrase has an icon that exists ---------- */
(function () {
  T.PHRASES.forEach((p) => {
    if (!p.icon) { err(`H2 ${p.id} has no icon`); return; }
    const d = T.ICONS[p.icon];
    if (!d) { err(`H2 ${p.id}: icon "${p.icon}" is not drawn`); return; }
    if (!/^[Mm]/.test(d)) err(`H2 ${p.id}: icon path does not start with a move`);
    if (d.length < 12) err(`H2 ${p.id}: icon path is too short to be a drawing`);
  });
  Object.keys(T.ICONS).forEach((k) => {
    if (!T.PHRASES.some(p => p.icon === k)) warn(`H2 icon "${k}" is drawn but never used`);
  });
  console.log(`  H2 icons ok (${T.PHRASES.length} phrases, all drawn)`);
}());

/* ---------- H3 the board works with NO home language ----------
   The point of an icon board: it must serve a child whose language we do
   not have. Ukrainian, Arabic, Turkish and Somali are not in our eleven. */
(function () {
  const none = T.boardFor('de', null);
  if (none.length !== T.PHRASES.length) err('H3 the board is incomplete without a home language');
  none.forEach((c) => {
    if (!c.classroom) err(`H3 ${c.id}: no classroom line`);
    if (c.home !== null) err(`H3 ${c.id}: invented a home line when there is no home language`);
    if (!c.icon) err(`H3 ${c.id}: no icon`);
  });
  const withHome = T.boardFor('de', 'es');
  withHome.forEach((c) => { if (!c.home) err(`H3 ${c.id}: home line missing when a home language IS set`); });
  /* an unsupported language must degrade to pictures, never to English
     pretending to be the child's language */
  const bogus = T.boardFor('de', 'uk');
  bogus.forEach((c) => { if (c.home) err(`H3 ${c.id}: invented a line for a language we do not have`); });
  console.log('  H3 icon-first ok (works with no home language; never invents one)');
}());

console.log('[the board]');

/* ---------- H4 phrases complete across all 110 pairs ---------- */
(function () {
  if (T.PHRASES.length < 10) err(`H4 only ${T.PHRASES.length} phrases`);
  const ids = new Set();
  T.PHRASES.forEach((p) => {
    if (ids.has(p.id)) err(`H4 duplicate phrase id ${p.id}`);
    ids.add(p.id);
    ALL.forEach((l) => {
      const v = p.t[l];
      if (!v) { err(`H4 ${p.id}.${l} missing`); return; }
      if (/\{|\}/.test(v)) err(`H4 ${p.id}.${l} carries a placeholder`);
      if (/'/.test(v)) err(`H4 ${p.id}.${l} straight apostrophe`);
    });
    /* within a locale, two phrases must not read the same or the child
       cannot tell the buttons apart */
    ALL.forEach((l) => {
      const same = T.PHRASES.filter(q => q.t[l] === p.t[l]);
      if (same.length > 1) err(`H4 ${l}: "${p.t[l]}" is used by ${same.length} phrases`);
    });
  });
  let resolved = 0;
  ALL.forEach(h => ALL.forEach(c => {
    if (h === c) return;
    T.PHRASES.forEach((p) => {
      const r = T.cardFor(p.id, c, h);
      if (!r || !r.home || !r.classroom) err(`H4 ${p.id} ${h}->${c} did not resolve`); else resolved++;
    });
  }));
  console.log(`  H4 phrase board ok (${T.PHRASES.length} phrases × 110 pairs = ${resolved} resolved)`);
}());

/* ---------- H5 endonyms, and NO FLAGS ---------- */
(function () {
  ALL.forEach((l) => {
    const e = T.ENDONYM[l];
    if (!e) { err(`H5 no endonym for ${l}`); return; }
    if (e === l || /^[a-z]{2}$/.test(e)) err(`H5 ${l}: "${e}" is a code, not a language name`);
  });
  /* the endonym must be the language's OWN name, not the English one */
  [['de', 'German'], ['fr', 'French'], ['es', 'Spanish'], ['fi', 'Finnish'], ['sv', 'Swedish'],
   ['nl', 'Dutch'], ['it', 'Italian'], ['pt', 'Portuguese'], ['da', 'Danish'], ['no', 'Norwegian']]
    .forEach(([l, exonym]) => { if (T.ENDONYM[l] === exonym) err(`H5 ${l} uses the English exonym "${exonym}"`); });
  /* ⚠ NO FLAGS. A flag is a country, not a language.
     Scanned on the RUNTIME values, not only on the source text: a source
     scan alone misses '\u{1F1E9}\u{1F1EA}', which is a flag by the time a
     child sees it. Mutation M11 survived the source-only check. */
  const FLAG = /[\u{1F1E6}-\u{1F1FF}]/u;
  const seen = [];
  (function walk(v, at) {
    if (typeof v === 'string') { if (FLAG.test(v)) seen.push(`${at} = ${JSON.stringify(v)}`); return; }
    if (Array.isArray(v)) { v.forEach((x, i) => walk(x, `${at}[${i}]`)); return; }
    if (v && typeof v === 'object') { Object.keys(v).forEach((k) => walk(v[k], `${at}.${k}`)); }
  }({ ENDONYM: T.ENDONYM, PHRASES: T.PHRASES, strings: T.strings, ICONS: T.ICONS }, 'tool'));
  seen.forEach((s) => err(`H5 a regional-indicator (flag) codepoint is present: ${s}`));
  if (FLAG.test(SRC)) err('H5 a regional-indicator (flag) codepoint is present in the source');
  if (/\bflag\b/i.test(SRC_NC)) err('H5 the source refers to a flag');
  console.log('  H5 endonyms ok, no flags');
}());

console.log('[stance]');

/* ---------- H6 one text class, home line FIRST ---------- */
(function () {
  const board = (SRC_NC.match(/_buildBoard:[\s\S]*?\n  \},/) || [''])[0];
  const home = board.indexOf('c.home'), cls = board.indexOf('c.classroom');
  if (home === -1 || cls === -1) err('H6 could not find both lines in _buildBoard');
  else if (home > cls) err('H6 the classroom line is emitted before the home line — home comes FIRST');
  /* both lines must use the SAME class, so neither can be styled down */
  const uses = (board.match(/'hlb-text'/g) || []).length;
  if (uses < 2) err(`H6 the two lines do not share one text class (found ${uses})`);
  if (/\.hlb-(home|second|minor)\b/.test(SRC)) err('H6 a per-side text class exists — the lines must look identical');
  if (/\.hlb-text[^{]*\{[^}]*opacity/.test(SRC)) err('H6 the shared text class carries an opacity');
  console.log('  H6 parity ok (one text class, home line first)');
}());

/* ---------- H7 no assessment of the child ---------- */
(function () {
  ['level', 'score', 'progress', 'proficiency'].forEach((f) => {
    if (new RegExp('\\bthis\\.' + f + '\\s*[=:]').test(SRC_NC)) err(`H7 the model carries "${f}"`);
  });
  Object.keys(T.strings).forEach((k) => {
    LOCALES.forEach((loc) => {
      const v = T.strings[k][loc];
      if (!v) return;
      if (ASSESS_RE.test(v)) err(`H7 ${k}.${loc} uses assessment vocabulary: "${v}"`);
    });
  });
  console.log('  H7 no assessment surface');
}());

/* ---------- H8 the voice guard is honest ---------- */
(function () {
  const V = (arr) => arr.map(l => ({ lang: l }));
  if (T.hasVoice('fi', V(['de-DE', 'en-US'])) !== false) err('H8 claims a Finnish voice where there is none');
  if (T.hasVoice('de', V(['de-DE', 'en-US'])) !== true) err('H8 misses a present German voice');
  if (T.hasVoice('no', V(['nb-NO'])) !== true) err('H8 no/nb mapping broken');
  if (T.hasVoice('no', V(['no-NO'])) !== true) err('H8 the no- prefix fallback is missing');
  if (T.hasVoice('fi', []) !== true) err('H8 must be permissive when the device reports no voices at all');
  /* and the tool must actually consult it before speaking */
  if (!/_canSpeak\([^)]*\)/.test(SRC_NC)) err('H8 _canSpeak is never called');
  if (!/if \(!this\._canSpeak\(lang\)\) return;/.test(SRC_NC)) err('H8 _say does not refuse an unsupported language');
  console.log('  H8 voice guard ok (never speaks a language the device lacks)');
}());

/* ---------- H9 identity + no exfil ---------- */
(function () {
  if (T.id !== 'home-language-bridge') err('H9 id');
  if (T.STORE_KEY !== 'lcs:home-language-bridge:v1') err('H9 STORE_KEY literal');
  if (T.premium !== false) err('H9 premium must default false');
  if (T.ENT_TRUST_DAYS !== 14) err('H9 ENT_TRUST_DAYS must be 14');
  /* exactly ONE fetch: entitlement. The board itself is offline by
     construction — icons are drawn here and phrases are inline, so a
     child on a school tablet with no network still has a voice. */
  const fetches = SRC_NC.match(/fetch\s*\(/g) || [];
  if (fetches.length !== 1) err(`H9 expected exactly one fetch (auth), found ${fetches.length}`);
  if (!/fetch\('\/api\/auth\/me'/.test(SRC_NC)) err('H9 the auth fetch is missing');
  if (/fetch\([^)]*body\s*:/.test(SRC_NC)) err('H9 a fetch carries a body');
  [/XMLHttpRequest/, /sendBeacon/, /WebSocket/, /RTCPeerConnection/, /MediaRecorder/].forEach((re) => {
    if (re.test(SRC_NC)) err(`H9 network surface ${re}`);
  });
  console.log('  H9 identity + no-exfil ok');
}());

console.log('[l10n + css]');

/* ---------- H10 strings ---------- */
(function () {
  const keys = Object.keys(T.strings);
  if (keys.length < 13) err(`H10 only ${keys.length} strings`);
  keys.forEach((k) => {
    const enV = T.strings[k].en;
    if (!enV) { err(`H10 ${k}: no en`); return; }
    const enPh = (enV.match(/\{[a-z]+\}/g) || []).sort().join(',');
    LOCALES.forEach((loc) => {
      const v = T.strings[k][loc];
      if (!v) { err(`H10 ${k}.${loc} missing`); return; }
      if ((v.match(/\{[a-z]+\}/g) || []).sort().join(',') !== enPh) err(`H10 ${k}.${loc} placeholder parity`);
      if (/'/.test(v)) err(`H10 ${k}.${loc} straight apostrophe`);
      if (VERDICT[loc] && VERDICT[loc].test(v)) err(`H10 ${k}.${loc} verdict vocabulary`);
      if (/common core/i.test(v)) err(`H10 ${k}.${loc} names Common Core`);
    });
  });
  console.log(`  H10 strings ok (${keys.length} keys x ${LOCALES.length} locales)`);
}());

/* ---------- H11 dead strings ---------- */
(function () {
  const body = SRC.split('\n').filter(l => !/^\s{4}[a-zA-Z]+:\s*\{en:/.test(l)).join('\n');
  Object.keys(T.strings).forEach((k) => {
    if (k === 'title' || k === 'instruction') return;
    if (!new RegExp(`['"\`]${k}['"\`]`).test(body)) err(`H11 dead string: ${k} is never used`);
  });
  console.log('  H11 no dead strings');
}());

/* ---------- H12 CSS ---------- */
(function () {
  if (!/getElementById\('hlb-style'\)/.test(SRC_NC)) err('H12 the CSS injector is not idempotent');
  if (!/@media print/.test(SRC)) err('H12 no print stylesheet');
  if (!/prefers-reduced-motion/.test(SRC)) err('H12 no reduced-motion block');
  const lcsSel = SRC_NC.match(/\.lcs-[a-z-]+/g) || [];
  lcsSel.forEach((s) => { if (s !== '.lcs-header') err(`H12 writes a shell selector: ${s}`); });
  if (lcsSel.length && !/body\.hlb-wide \.lcs-header/.test(SRC_NC)) err('H12 .lcs-header is not scoped to body.hlb-wide');
  const printBlock = (SRC.match(/@media print\{[\s\S]*?\n\s*\+ '\}';/) || [''])[0];
  ['hlb-printhead', 'hlb-printrow', 'hlb-printcell'].forEach((cls) => {
    if (!new RegExp('\\.' + cls + '\\s*[{,:]').test(printBlock)) err(`H12 print block does not tone .${cls}`);
  });
  console.log('  H12 css ok');
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
