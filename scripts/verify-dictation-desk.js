#!/usr/bin/env node
/* =====================================================================
   verify-dictation-desk.js — MEASURED build-gate for Dictation Desk
   (mini tools/dictation-desk.js). Fix the data, never the gate.

   Invariants (all measured, none asserted-by-construction):
     REASSEMBLY — for EVERY word in ALL ELEVEN shipped sound-boxes banks,
       the tool's own unitsFor()/reassemble() reproduces `display`
       exactly: boxes, with a split digraph `a_e` placing its vowel in
       position and its `e` at the end, plus `silentTail` last. 332/332 at
       time of writing. A bank edit therefore cannot silently break this
       tool — which matters because the bank belongs to Sound Boxes.
     SILENT TAIL — every declared `silentTail` agrees with the derivation,
       and every word whose boxes do not already spell `display` HAS one.
       ⚠ This is the load-bearing one. The bank is one box per SOUND, so
       `mouse` is m·ou·s and `hund` is h·u·n; revealing only the boxes
       would show a child "mous" and teach them their correct spelling was
       wrong. French carries 11 of the 15 silent tails.
     REVEAL — shownUnits is always a PREFIX of unitsFor, never re-ordered,
       never a partial unit; isComplete agrees with the unit count.
     UNIT KIND — a stage declaring type:'syllables' reports 'syllable'
       (es/pt/it/fi carry such stages); everything else reports 'sound'.
     NO CHILD INPUT — the model has no field that could hold an answer,
       and the child-facing render builds no text-entry affordance. The
       ONE input in the file is the premium, adult-facing word-list panel.
     NO LEAK — no word letters reach the DOM before the teacher reveals
       them, and no image is ever built (a picture would turn a dictation
       into copying).
     ANTI-GRADING / IDENTITY / NO-EXFIL / STRINGS / CSS — house gates.

   Usage: node scripts/verify-dictation-desk.js [--locales=en,de]
   Override for mutation testing: DD_TOOL_DIR
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const TOOL_DIR = process.env.DD_TOOL_DIR || TOOLS_DIR;

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

const VERDICT = {
  en: /\b(wrong|incorrect|bad|failed|try again)\b/i, de: /\b(falsch|fehler|leider)\b/i,
  fr: /\b(faux|fausse|erreur|raté)\b/i, it: /\b(sbagliato|errore)\b/i,
  es: /\b(incorrecto|mal hecho|error)\b/i, pt: /\b(errado|erro)\b/i,
  nl: /\b(fout|foutje|verkeerd)\b/i, sv: /\b(fel|felaktig)\b/i,
  da: /\b(forkert|fejl)\b/i, no: /\b(feil)\b/i, fi: /\b(väärin|virhe)\b/i
};
const SCORE_RE = /\b(score|scores|streak|poäng|poeng|punkte|punteggio|puntuación|pontuação|pisteet|badge|reward|countdown|timer)\b/i;

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

const SRC = fs.readFileSync(path.join(TOOL_DIR, 'dictation-desk.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

const box = sandbox();
vm.runInContext(SRC, box, { filename: 'dictation-desk.js' });
const T = box.DictationDesk || box.window.DictationDesk;
if (!T) { console.error('  ERROR could not load DictationDesk'); process.exit(1); }

/* the LIVE banks — always from the repo, never the mutation dir, because
   they are the thing being measured AGAINST */
const BANKS = {};
ALL.forEach((l) => {
  const p = path.join(TOOLS_DIR, 'sound-boxes-bank-' + l + '.json');
  if (fs.existsSync(p)) BANKS[l] = JSON.parse(fs.readFileSync(p, 'utf8'));
});

console.log('[reveal model]');

/* ---------- D1 reassembly over every shipped bank ---------- */
(function () {
  let checked = 0, silent = 0, split = 0;
  Object.keys(BANKS).forEach((l) => {
    (BANKS[l].words || []).forEach((w) => {
      checked++;
      if (w.silentTail) silent++;
      if ((w.boxes || []).some(b => /_/.test(b))) split++;
      const got = T.reassemble(w);
      if (String(got).toLowerCase() !== String(w.display).toLowerCase())
        err(`D1 ${l}/${w.id}: units reassemble to "${got}", printed word is "${w.display}"`);
    });
  });
  if (checked < 300) err(`D1 only ${checked} words seen — the banks did not load`);
  console.log(`  D1 reassembly ok (${checked} words across ${Object.keys(BANKS).length} banks, ${split} split-digraph, ${silent} silent-tail)`);
}());

/* ---------- D2 the silent tail is present wherever it is needed ---------- */
(function () {
  let missing = 0, disagree = 0;
  Object.keys(BANKS).forEach((l) => {
    (BANKS[l].words || []).forEach((w) => {
      const sounded = T.unitsFor(w).filter(u => u.kind !== 'silent');
      let body = '', end = '';
      sounded.forEach(u => { if (u.kind === 'split') { body += u.text; end += u.endChar; } else body += u.text; });
      const derived = String(w.display).slice((body + end).length);
      if (derived && !w.silentTail) { missing++; err(`D2 ${l}/${w.id}: "${derived}" is unaccounted for and no silentTail is declared`); }
      if ((w.silentTail || '') !== derived) { disagree++; err(`D2 ${l}/${w.id}: silentTail "${w.silentTail}" vs derived "${derived}"`); }
    });
  });
  /* a silent unit must never be sounded — that is the whole distinction */
  const u = T.unitsFor({ display: 'mouse', boxes: ['m', 'ou', 's'], silentTail: 'e' });
  if (u.length !== 4 || u[3].kind !== 'silent') err('D2 the silent tail is not its own final unit');
  if (u[3].say !== '') err('D2 the silent unit carries a sound — it must be shown and never sounded');
  console.log(`  D2 silent tails ok (${missing} missing, ${disagree} disagreeing)`);
}());

/* ---------- D3 split digraph travels to the end ---------- */
(function () {
  const w = { display: 'cake', boxes: ['c', 'a_e', 'k'] };
  const u = T.unitsFor(w);
  if (u.length !== 3) err('D3 a split digraph must be ONE unit, not two');
  if (u[1].kind !== 'split' || u[1].text !== 'a' || u[1].endChar !== 'e') err('D3 split digraph not decomposed as vowel-in-place + travelling e');
  if (T.reassemble(w) !== 'cake') err('D3 split digraph does not reassemble');
  console.log('  D3 split digraph ok (one unit, vowel in place, e at the end)');
}());

/* ---------- D4 reveal is a strict prefix ---------- */
(function () {
  const w = { display: 'ship', boxes: ['sh', 'i', 'p'] };
  const all = T.unitsFor(w);
  for (let n = 0; n <= all.length + 2; n++) {
    const shown = T.shownUnits(w, n);
    const want = Math.max(0, Math.min(n, all.length));
    if (shown.length !== want) { err(`D4 shownUnits(${n}) has ${shown.length}, expected ${want}`); return; }
    for (let i = 0; i < shown.length; i++) if (shown[i].text !== all[i].text) { err('D4 reveal is not a prefix'); return; }
  }
  /* ⚠ The negative fixture must be one where an UNCLAMPED slice is
     observable. -3 on a 3-unit word gives slice(0,-3) === [] and passes
     by accident; -1 gives slice(0,-1) === 2 units, which is the actual
     bug. Same bad-fixture class as the sorted-order test on tool #1. */
  [-1, -2, -3].forEach(function (n) {
    if (T.shownUnits(w, n).length !== 0) err(`D4 shownUnits(${n}) is not clamped to empty`);
  });
  if (!T.isComplete(w, all.length) || T.isComplete(w, all.length - 1)) err('D4 isComplete disagrees with the unit count');
  console.log('  D4 reveal ok (prefix, clamped, complete at the last unit)');
}());

/* ---------- D5 the per-stage unit ruling is READ, not assumed ---------- */
(function () {
  let syl = 0;
  Object.keys(BANKS).forEach((l) => {
    (BANKS[l].stages || []).forEach((s) => {
      const got = T.unitKindFor(BANKS[l], s.id);
      const want = s.type === 'syllables' ? 'syllable' : 'sound';
      if (got !== want) err(`D5 ${l}/${s.id}: unitKindFor says "${got}", the stage declares "${want}"`);
      if (want === 'syllable') syl++;
    });
  });
  if (syl < 4) err(`D5 only ${syl} syllable stages seen — es/pt/it/fi each declare at least one`);
  console.log(`  D5 unit kind ok (${syl} syllable stages honoured across the banks)`);
}());

/* ---------- D6 locked stages are ABSENT for free visitors ---------- */
(function () {
  const bank = BANKS.en || T.FALLBACK;
  const free = T.stagesFor(bank, false);
  const paid = T.stagesFor(bank, true);
  if (!free.length) err('D6 a free visitor gets no stage at all');
  if (free.some(s => !s.free)) err('D6 a locked stage is present for a free visitor — it must be absent, not disabled');
  if (paid.length <= free.length) warn('D6 there is nothing behind the paywall in this bank');
  console.log(`  D6 stage gating ok (free ${free.length} of ${paid.length})`);
}());

/* ---------- D7 the teacher's own segmentation ---------- */
(function () {
  if (T.customUnits('ship', { 0: true }).join('|') !== 'sh|i|p') err('D7 joining letters 0-1 did not fuse them');
  if (T.customUnits('cat', {}).join('|') !== 'c|a|t') err('D7 unjoined letters are not one unit each');
  const w = T.customToWord('Schiff', { 0: true, 1: true, 4: true });
  if (T.reassemble(w) !== 'Schiff') err('D7 a teacher-marked word does not reassemble');
  if (w.boxes.join('|') !== 'Sch|i|ff') err(`D7 teacher joins produced ${w.boxes.join('|')}`);
  console.log('  D7 custom segmentation ok (the teacher owns it; the tool never guesses)');
}());

console.log('[surface]');

/* ---------- D8 NO CHILD INPUT, and no leak ---------- */
(function () {
  /* the model has no answer-shaped field */
  ['answer', 'typed', 'entry', 'guess', 'response'].forEach((f) => {
    if (new RegExp('\\b(this\\.)?' + f + '\\s*[=:]').test(SRC_NC)) err(`D8 the model carries an answer-shaped field: ${f}`);
  });
  /* exactly one input in the whole file, and it is the premium panel's */
  const inputs = SRC_NC.match(/createElement\('input'\)/g) || [];
  if (inputs.length > 1) err(`D8 ${inputs.length} text inputs — only the adult word-list panel may have one`);
  if (inputs.length === 1 && !/_buildPanel[\s\S]{0,1400}createElement\('input'\)/.test(SRC_NC))
    err('D8 the one input is not inside the premium word-list panel');
  if (/contentEditable/i.test(SRC_NC)) err('D8 a contenteditable surface exists');
  ['isCorrect', 'answerKey', 'readOnly', 'checkAnswer'].forEach((k) => {
    if (typeof T[k] === 'function') err(`D8 the engine exposes ${k}() — this tool has nothing to check`);
  });
  /* ⚠ WHOLE WORDS ONLY. The platform bans isolated-phoneme TTS
     (sound-boxes.js:18) and a synthesiser reads "c" as "see". Every
     speak() in this file must carry type:'word'. */
  const speaks = SRC_NC.match(/LCSAudio\.speak\(\{[^}]*\}/g) || [];
  if (!speaks.length) err('D8 the tool never speaks at all');
  speaks.forEach((c) => {
    if (!/type:\s*'word'/.test(c)) err(`D8 a speak() does not use type:'word' — isolated-phoneme TTS is banned: ${c.slice(0, 60)}`);
  });
  /* no picture, ever — an image before the word is written is copying */
  if (/createElement\('img'\)|<img/i.test(SRC_NC)) err('D8 an image is built — a picture turns a dictation into copying');
  if (/image-library|themeDir\s*\+|\.webp/.test(SRC_NC)) err('D8 an image URL is constructed');
  console.log('  D8 surface ok (no child input, no answer field, no picture)');
}());

/* ---------- D9 identity + no exfil ---------- */
(function () {
  if (T.id !== 'dictation-desk') err('D9 id');
  if (T.STORE_KEY !== 'lcs:dictation-desk:v1') err('D9 STORE_KEY literal');
  if (T.premium !== false) err('D9 premium must default false');
  if (T.ENT_TRUST_DAYS !== 14) err('D9 ENT_TRUST_DAYS must be 14');
  if (!T.FALLBACK || !T.FALLBACK.words || !T.FALLBACK.words.length) err('D9 no offline fallback bank');
  const fetches = SRC_NC.match(/fetch\s*\(/g) || [];
  if (fetches.length !== 2) err(`D9 expected exactly two fetch( — auth and the bank — found ${fetches.length}`);
  if (!/fetch\('\/api\/auth\/me'/.test(SRC_NC)) err('D9 the auth fetch is missing');
  if (!/sound-boxes-bank-/.test(SRC_NC)) err('D9 the bank fetch is missing');
  if (/fetch\([^)]*body\s*:/.test(SRC_NC)) err('D9 a fetch carries a body');
  [/XMLHttpRequest/, /sendBeacon/, /WebSocket/, /RTCPeerConnection/, /MediaRecorder/].forEach((re) => {
    if (re.test(SRC_NC)) err(`D9 network surface ${re}`);
  });
  console.log('  D9 identity + no-exfil ok');
}());

console.log('[l10n]');

/* ---------- D10 strings ---------- */
(function () {
  const keys = Object.keys(T.strings);
  if (keys.length < 20) err(`D10 only ${keys.length} strings`);
  keys.forEach((k) => {
    const enV = T.strings[k].en;
    if (!enV) { err(`D10 ${k}: no en`); return; }
    const enPh = (enV.match(/\{[a-z]+\}/g) || []).sort().join(',');
    LOCALES.forEach((loc) => {
      const v = T.strings[k][loc];
      if (!v) { err(`D10 ${k}.${loc} missing`); return; }
      if ((v.match(/\{[a-z]+\}/g) || []).sort().join(',') !== enPh) err(`D10 ${k}.${loc} placeholder parity`);
      if (/'/.test(v)) err(`D10 ${k}.${loc} straight apostrophe`);
      if (VERDICT[loc] && VERDICT[loc].test(v)) err(`D10 ${k}.${loc} verdict vocabulary: "${v}"`);
      if (SCORE_RE.test(v)) err(`D10 ${k}.${loc} score/timer vocabulary: "${v}"`);
      if (/common core/i.test(v)) err(`D10 ${k}.${loc} names Common Core`);
    });
  });
  console.log(`  D10 strings ok (${keys.length} keys x ${LOCALES.length} locales)`);
}());

/* ---------- D11 dead strings ---------- */
(function () {
  const body = SRC.split('\n').filter(l => !/^\s{4}[a-zA-Z]+:\s*\{en:/.test(l)).join('\n');
  Object.keys(T.strings).forEach((k) => {
    if (k === 'title' || k === 'instruction') return;
    if (!new RegExp(`['"\`]${k}['"\`]`).test(body)) err(`D11 dead string: ${k} is never used`);
  });
  console.log('  D11 no dead strings');
}());

/* ---------- D12 CSS ---------- */
(function () {
  if (!/getElementById\('dd-style'\)/.test(SRC_NC)) err('D12 the CSS injector is not idempotent');
  if (!/@media print/.test(SRC)) err('D12 no print stylesheet');
  if (!/prefers-reduced-motion/.test(SRC)) err('D12 no reduced-motion block');
  const lcsSel = SRC_NC.match(/\.lcs-[a-z-]+/g) || [];
  lcsSel.forEach((s) => { if (s !== '.lcs-header') err(`D12 writes a shell selector: ${s}`); });
  if (lcsSel.length && !/body\.dd-wide \.lcs-header/.test(SRC_NC)) err('D12 .lcs-header is not scoped to body.dd-wide');
  const printBlock = (SRC.match(/@media print\{[\s\S]*?\n\s*\+ '\}';/) || [''])[0];
  ['dd-printhead', 'dd-printrow', 'dd-printnum', 'dd-printrule'].forEach((cls) => {
    if (!new RegExp('\\.' + cls + '\\s*[{,:]').test(printBlock))
      err(`D12 print block does not tone .${cls} — it will print near-blank`);
  });
  /* the slate must NOT print: a printed answer key defeats a dictation */
  if (!/\.dd-desk[^}]*display:none/.test(printBlock.replace(/'\s*\+\s*'/g, '')))
    err('D12 the slate prints — a printed answer key defeats the dictation');
  console.log('  D12 css ok (idempotent, print toned, slate withheld, no shell bleed)');
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
