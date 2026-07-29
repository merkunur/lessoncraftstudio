#!/usr/bin/env node
/* =====================================================================
   verify-syllable-splitter.js — build-gate for TOOL #22 Syllable Splitter:
   the per-locale decks (mini tools/syllable-splitter-<locale>.json) AND
   the tool source (mini tools/syllable-splitter.js).

   THE CENTRAL CLAIM THIS GATE PROTECTS:
     The syllable COUNT is inherited from the multi-source syllable
     pipeline (scripts/v2-data/verify-syllable-boundaries) and may never
     drift from it. The displayed BOUNDARY is native-ratified, not
     pipeline-verified — English boundaries in particular are typographic
     by design (rule-syllabifiers/en.js:9-14 "never renders a syllable
     boundary split (only counts)"), so this tool authors them. The gate
     lets a boundary be authored but NEVER lets authoring change how many
     claps a word has.

   ORAL vs WRITTEN (CLAUDE.md §20.9 deferred audit, folded in here):
     `chunks`      = written syllables — the rebuild/cards face.
     `oralChunks`  = what the class actually CLAPS — the arc face.
     Identical in 10 of 11 locales. French diverges systematically
     (mute-e: `pomme` is written pom-me but clapped once). A divergence
     must be DECLARED (`oralConvention`) and NOTED per word, so it can
     never be silent.

   MEASURED invariants (never loosen a threshold — FIX THE DATA):

   DATA (per locale deck)
     D1  locale matches filename; version numeric; oralConvention present
     D2  pens = ascending unique ints; shelf ids unique + labelled; >=1 free
     D3  50 <= words <= 70; free-shelf words >= 8
     D4  word ids + displays unique
     D5  join(chunks) === display        (written split spells the word)
     D6  chunks.length === count
     D7  join(oralChunks) === display    (oral split spells the word too)
     D8  oralChunks.length === oralCount
     D9  oralCount <= count AND oralCount >= 1
     D10 PROVENANCE: count === approved-words <locale> count for that key
         (skip-with-note when the pool is absent — de/nl/da/no pools are
         UNTRACKED, so a fresh clone must not fail the build)
     D11 every word's count is one of the locale's pens
     D12 noun in IMAGE_VOCABULARY; imageDir a real pww theme dir; that
         theme holds a card with .f===imageFile AND .k===noun
     D13 no (imageDir,imageFile) pair used more than 3x
     D14 DIVERGENCE AUDIT: oralChunks !== chunks  =>  the word carries a
         `note` AND the file declares a non-"same-as-written" oralConvention
     D15 no chunk is vowel-less (the Danish TeX artefact class:
         an-ti-l-ope / bul-l-dozer / søhe-st)

   TOOL (vm-loaded, DOM-free)
     T1  id / STORE_KEY / ENT_TRUST_DAYS / premium===false
     T2  strings.title + strings.instruction present for all 11 locales
     T3  strings completeness + {placeholder} parity against en
     T4  NO-SHAME: per-locale verdict regexes + score/timer/streak ban
     T5  every LCSAudio.speak passes lang: AND type in {word, syllable, ui}
         (a syllable is pronounceable; isolated PHONEMES stay banned)
     T6  CSS injector idempotent; @media print + reduced-motion; no .lcs-
     T7  STRUCTURAL GATE: locked shelf => wordsForShelf() returns []
     T8  resolveDeepLink refuses a locked shelf without premium
     T9  arcsFor(word) returns oralChunks; cardsFor(word) returns chunks
         (the two-convention contract, asserted on the pure functions)

   Usage: node scripts/verify-syllable-splitter.js [--locales=en,de]
   Data dir override (mutation testing): SS_DATA_DIR / SS_TOOL_DIR
   Exit 1 on any ERROR. WARNs never fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const DATA_DIR = process.env.SS_DATA_DIR || TOOLS_DIR;
const TOOL_DIR = process.env.SS_TOOL_DIR || TOOLS_DIR;
const POOL_DIR = path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output');

/* Syllable Splitter ships in ALL ELEVEN locales — fi has the largest
   approved pool (1120) and tavutus is central to Finnish literacy. */
const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;

const VOWELS = /[aeiouyàáâäãèéêëìíîïòóôöõùúûüåæøœ]/i;

const VERDICT = {
  en: /\b(correct|incorrect|wrong|oops|try again|test|quiz|drill|fail)\b/i,
  de: /\b(richtig|falsch|fehler|test)\b/i,
  fr: /\b(correct|correcte|faux|fausse|erreur)\b/i,
  it: /\b(giusto|sbagliato|errore)\b/i,
  es: /\b(correcto|incorrecto|error|equivocad)\b/i,
  pt: /\b(correto|errado|erro)\b/i,
  nl: /\b(goed antwoord|fout|foutje)\b/i,
  sv: /\b(rätt svar|fel|felaktig)\b/i,
  da: /\b(rigtigt svar|forkert|fejl)\b/i,
  no: /\b(riktig svar|feil)\b/i,
  fi: /\b(oikein|väärin|virhe)\b/i
};
const SCORE_RE = /\b(score|scores|timer|streak|poäng|poeng|punkte|punteggio|puntuación|pontuação|pisteet|niveau|level|badge|sticker|reward)\b/i;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

function loadImageVocabulary() {
  const src = fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
  return new Function(src + '; return IMAGE_VOCABULARY;')();
}
function loadPww(locale) {
  const f = path.join(TOOLS_DIR, `pww-index-${locale}.json`);
  if (!fs.existsSync(f)) return null;
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (_) { return null; }
}
/* The pipeline pool. de/nl/da/no pools are UNTRACKED in git, so absence is
   a WARN (provenance unverifiable here), never an ERROR. */
function loadPool(locale) {
  const f = path.join(POOL_DIR, `approved-words-${locale}.json`);
  if (!fs.existsSync(f)) return null;
  try {
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    const m = {};
    (j.entries || []).forEach(e => { m[e.key] = e; });
    return m;
  } catch (_) { return null; }
}

function loadTool(file, globalName) {
  const noop = () => {};
  const fakeEl = () => ({
    style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    appendChild: noop, addEventListener: noop, setAttribute: noop, removeAttribute: noop,
    innerHTML: '', textContent: '', children: [], dataset: {}, remove: noop
  });
  const sandbox = {
    window: {}, navigator: { language: 'en' }, console,
    document: {
      createElement: fakeEl, createElementNS: fakeEl, getElementById: () => null,
      querySelector: () => null, querySelectorAll: () => [],
      head: { appendChild: noop }, body: { classList: { add: noop, remove: noop } },
      addEventListener: noop, documentElement: fakeEl()
    },
    location: { search: '', hostname: 'gate' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    URLSearchParams, Intl, Date, Math, JSON,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  sandbox.global = sandbox; sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(TOOL_DIR, file), 'utf8'), sandbox, { filename: file });
  return { tool: sandbox[globalName], src: fs.readFileSync(path.join(TOOL_DIR, file), 'utf8') };
}

function checkDeck(locale, deck, vocab, pww, pool) {
  const tag = (w) => `[${locale}:${(w && w.id) || '?'}]`;

  /* D1 */
  if (deck.locale !== locale) err(`[${locale}] D1 locale field "${deck.locale}" != "${locale}"`);
  if (typeof deck.version !== 'number') err(`[${locale}] D1 version must be a number`);
  if (!deck.oralConvention) err(`[${locale}] D1 oralConvention must be declared`);

  /* D2 */
  const pens = deck.pens;
  if (!Array.isArray(pens) || !pens.length) err(`[${locale}] D2 pens[] missing`);
  else {
    for (let i = 0; i < pens.length; i++) {
      if (!Number.isInteger(pens[i]) || pens[i] < 1) err(`[${locale}] D2 pen "${pens[i]}" not a positive int`);
      if (i && pens[i] <= pens[i - 1]) err(`[${locale}] D2 pens must be ascending + unique`);
    }
  }
  const shelfIds = new Set(); const freeShelves = new Set();
  if (!Array.isArray(deck.shelves) || !deck.shelves.length) err(`[${locale}] D2 shelves[] missing`);
  for (const s of deck.shelves || []) {
    if (!s.id || !s.label) err(`[${locale}] D2 shelf missing id/label`);
    if (shelfIds.has(s.id)) err(`[${locale}] D2 duplicate shelf id ${s.id}`);
    shelfIds.add(s.id);
    if (s.free) freeShelves.add(s.id);
  }
  if (!freeShelves.size) err(`[${locale}] D2 no free shelf`);

  const words = deck.words || [];
  const ids = new Set(), displays = new Set(), imgUse = {};
  let freeWords = 0, diverged = 0, provChecked = 0;

  let byDir = null;
  if (pww) {
    byDir = new Map();
    for (const t of pww.themes || []) {
      const m = new Map();
      for (const c of t.c || []) m.set(c.f, c.k);
      byDir.set(t.d, m);
    }
  }

  for (const w of words) {
    /* D4 */
    if (!w.id) { err(`${tag(w)} D4 missing id`); continue; }
    if (ids.has(w.id)) err(`${tag(w)} D4 duplicate id`);
    ids.add(w.id);
    if (!w.display) { err(`${tag(w)} D4 missing display`); continue; }
    if (displays.has(w.display.toLowerCase())) err(`${tag(w)} D4 duplicate display`);
    displays.add(w.display.toLowerCase());
    if (!shelfIds.has(w.shelf)) err(`${tag(w)} D2 shelf "${w.shelf}" not declared`);
    if (freeShelves.has(w.shelf)) freeWords++;

    const ch = w.chunks, och = w.oralChunks;
    if (!Array.isArray(ch) || !ch.length) { err(`${tag(w)} D5 chunks[] missing`); continue; }
    if (!Array.isArray(och) || !och.length) { err(`${tag(w)} D7 oralChunks[] missing`); continue; }

    /* D5 / D6 */
    if (ch.join('').toLowerCase() !== String(w.display).toLowerCase())
      err(`${tag(w)} D5 chunks "${ch.join('-')}" do not spell "${w.display}"`);
    if (ch.length !== w.count)
      err(`${tag(w)} D6 chunks.length ${ch.length} != count ${w.count}`);

    /* D7 / D8 / D9 */
    if (och.join('').toLowerCase() !== String(w.display).toLowerCase())
      err(`${tag(w)} D7 oralChunks "${och.join('-')}" do not spell "${w.display}"`);
    if (och.length !== w.oralCount)
      err(`${tag(w)} D8 oralChunks.length ${och.length} != oralCount ${w.oralCount}`);
    if (!(w.oralCount >= 1)) err(`${tag(w)} D9 oralCount must be >= 1`);
    if (w.oralCount > w.count)
      err(`${tag(w)} D9 oralCount ${w.oralCount} > written count ${w.count} — a word cannot be clapped more times than it is written`);

    /* D10 provenance — the load-bearing claim */
    if (pool) {
      const p = pool[w.id];
      if (!p) err(`${tag(w)} D10 "${w.id}" is not in the approved-words pool for ${locale}`);
      else {
        provChecked++;
        if (p.count !== w.count)
          err(`${tag(w)} D10 count ${w.count} != pipeline count ${p.count} — the count may never be re-authored`);
      }
    }

    /* D11 */
    if (Array.isArray(pens) && pens.indexOf(w.count) < 0)
      err(`${tag(w)} D11 count ${w.count} is not one of this locale's pens [${pens}]`);

    /* D12 */
    if (vocab && !vocab[w.noun]) err(`${tag(w)} D12 noun "${w.noun}" not in IMAGE_VOCABULARY`);
    if (!w.imageDir || !w.imageFile) err(`${tag(w)} D12 imageDir/imageFile missing`);
    else if (byDir) {
      const theme = byDir.get(w.imageDir);
      if (!theme) err(`${tag(w)} D12 imageDir "${w.imageDir}" is not a theme dir`);
      else {
        const k = theme.get(w.imageFile);
        if (k === undefined) err(`${tag(w)} D12 "${w.imageDir}/${w.imageFile}" not a card in that theme`);
        else if (k !== w.noun) err(`${tag(w)} D12 "${w.imageDir}/${w.imageFile}" is "${k}", not "${w.noun}"`);
      }
    }
    if (w.imageDir && w.imageFile) {
      const dir = path.join(ROOT, 'image-library-webp', 'themes');
      if (fs.existsSync(dir) && !fs.existsSync(path.join(dir, w.imageDir, w.imageFile + '@2x.webp')))
        err(`${tag(w)} D12 missing image ${w.imageDir}/${w.imageFile}@2x.webp`);
    }
    const pair = w.imageDir + '/' + w.imageFile;
    imgUse[pair] = (imgUse[pair] || 0) + 1;

    /* D14 divergence audit — an oral divergence can never be silent */
    const same = ch.length === och.length && ch.every((c, i) => c === och[i]);
    if (!same) {
      diverged++;
      if (!w.note) err(`${tag(w)} D14 oral split differs from written but carries no note`);
      if (deck.oralConvention === 'same-as-written')
        err(`${tag(w)} D14 word diverges but the deck declares oralConvention "same-as-written"`);
    }

    /* D15 vowel-less chunk (the Danish TeX artefact class) */
    for (const c of ch.concat(och)) {
      if (!VOWELS.test(c)) err(`${tag(w)} D15 chunk "${c}" has no vowel — not a syllable`);
    }
  }

  /* D3 */
  if (words.length < 50 || words.length > 70)
    err(`[${locale}] D3 ${words.length} words, must be 50-70`);
  if (freeWords < 8) err(`[${locale}] D3 free-shelf words = ${freeWords}, need >= 8`);

  /* D13 */
  for (const p of Object.keys(imgUse)) {
    if (imgUse[p] > 3) err(`[${locale}] D13 image "${p}" used ${imgUse[p]}x (max 3)`);
  }

  if (!pool) warn(`[${locale}] D10 provenance UNVERIFIED — approved-words-${locale}.json absent (the de/nl/da/no pools are untracked)`);
  return { n: words.length, diverged, provChecked };
}

function checkTool(tool, src) {
  if (tool.id !== 'syllable-splitter') err(`T1 id "${tool.id}" != syllable-splitter`);
  if (tool.STORE_KEY !== 'lcs:syllable-splitter:v1') err(`T1 STORE_KEY "${tool.STORE_KEY}" wrong`);
  if (tool.ENT_TRUST_DAYS !== 14) err(`T1 ENT_TRUST_DAYS != 14`);
  if (tool.premium !== false) err('T1 premium must default to false');

  const S = tool.strings || {};
  if (!S.title || !S.instruction) err('T2 strings.title and .instruction are shell-mandatory');
  for (const k of Object.keys(S)) {
    const row = S[k];
    if (!row || typeof row !== 'object') { err(`T3 strings.${k} not a locale map`); continue; }
    for (const L of ALL) {
      if (typeof row[L] !== 'string' || !row[L].length) { err(`T3 strings.${k}.${L} missing`); continue; }
      const pe = (row.en.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
      const pl = (row[L].match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
      if (pe !== pl) err(`T3 strings.${k}.${L} placeholders "${pl}" != en "${pe}"`);
      if (VERDICT[L] && VERDICT[L].test(row[L])) err(`T4 strings.${k}.${L} verdict vocabulary: "${row[L]}"`);
      if (SCORE_RE.test(row[L])) err(`T4 strings.${k}.${L} score/timer vocabulary: "${row[L]}"`);
    }
  }

  /* T5 — speech lock. A SYLLABLE is pronounceable so it is allowed here;
     isolated phonemes remain banned platform-wide. */
  const calls = src.match(/LCSAudio\.speak\(\s*\{[^}]*\}/g) || [];
  if (!calls.length) warn('T5 no LCSAudio.speak call found');
  for (const c of calls) {
    if (!/\blang\s*:/.test(c)) err(`T5 speak without lang: -> ${c.slice(0, 80)}`);
    const m = /\btype\s*:\s*'([a-z]+)'/.exec(c);
    if (!m) err(`T5 speak without a literal type: -> ${c.slice(0, 80)}`);
    else if (['word', 'syllable', 'ui'].indexOf(m[1]) < 0)
      err(`T5 speak type '${m[1]}' — locked to word|syllable|ui`);
  }

  if (!/function\s+injectSyllableSplitterCSS\s*\(/.test(src)) err('T6 injectSyllableSplitterCSS() not defined');
  if (!/getElementById\(\s*['"]ss-style['"]\s*\)/.test(src)) err('T6 CSS injector not idempotent on #ss-style');
  if (!/@media print/.test(src)) err('T6 no @media print block');
  if (!/prefers-reduced-motion/.test(src)) err('T6 no reduced-motion block');
  const lcsSel = (src.match(/['"][^'"]*\.lcs-[a-z-]+[^'"]*['"]/g) || []).filter(s => !/ss-wide/.test(s));
  if (lcsSel.length) err(`T6 tool writes protected .lcs- selectors: ${lcsSel.slice(0, 3).join(' ')}`);

  /* T7 / T8 / T9 — pure functions, measured */
  const f = path.join(DATA_DIR, 'syllable-splitter-en.json');
  if (fs.existsSync(f)) {
    const deck = JSON.parse(fs.readFileSync(f, 'utf8'));
    tool.deck = deck;
    const locked = deck.shelves.filter(s => !s.free).map(s => s.id);
    const free = deck.shelves.filter(s => s.free).map(s => s.id);

    tool.premium = false;
    for (const id of locked) {
      const got = tool.wordsForShelf(id);
      if (!Array.isArray(got) || got.length !== 0)
        err(`T7 wordsForShelf("${id}") returned ${got && got.length} while free — premium words must never reach the DOM`);
    }
    for (const id of free) {
      if (!tool.wordsForShelf(id).length) err(`T7 free shelf "${id}" is empty`);
    }
    if (locked.length) {
      /* Use the tool's REAL param name (?set=). Probing with a name the
         tool does not read makes the negative assertion pass for the
         wrong reason — it would return null because the param was
         unrecognised, not because premium was enforced. */
      if (tool.resolveDeepLink({ set: locked[0] }, true) === null)
        err('T8 resolveDeepLink refused a locked set WITH premium (is the param name right?)');
      if (tool.resolveDeepLink({ set: locked[0] }, false) !== null)
        err('T8 resolveDeepLink resolved a locked set without premium');
      /* and the same via the word-only form, which infers the set */
      const lockedWord = deck.words.find(w => w.shelf === locked[0]);
      if (lockedWord) {
        if (tool.resolveDeepLink({ word: lockedWord.id }, false) !== null)
          err('T8 resolveDeepLink resolved a locked word without premium');
        if (tool.resolveDeepLink({ word: lockedWord.id }, true) === null)
          err('T8 resolveDeepLink refused a locked word WITH premium');
      }
      /* sort mode must never survive for a free visitor */
      if ((tool.resolveDeepLink({ set: free[0], mode: 'sort' }, false) || {}).mode === 'sort')
        err('T8 deep link handed sort mode to a free visitor');
    }
    tool.premium = true;
    for (const id of locked) if (!tool.wordsForShelf(id).length) err(`T7 "${id}" empty even with premium`);
    tool.premium = false;

    /* T9 — the two-convention contract.
       MUST be probed with a word whose two splits DIFFER. English has zero
       divergence (chunks === oralChunks everywhere), so a real deck word
       cannot distinguish arcsFor from cardsFor at all — swapping them would
       be invisible. Use a synthetic divergent word, the way French behaves. */
    const probe = { display: 'pomme', count: 2, chunks: ['pom', 'me'], oralCount: 1, oralChunks: ['pomme'] };
    if (JSON.stringify(tool.arcsFor(probe)) !== JSON.stringify(probe.oralChunks))
      err('T9 arcsFor() must return oralChunks — arcs are what the class CLAPS');
    if (JSON.stringify(tool.cardsFor(probe)) !== JSON.stringify(probe.chunks))
      err('T9 cardsFor() must return chunks — cards are how the word is WRITTEN');
    if (tool.wordDiverges(probe) !== true)
      err('T9 wordDiverges() must detect a word whose clap split differs from its written split');
    if (tool.wordDiverges({ chunks: ['ba', 'by'], oralChunks: ['ba', 'by'] }) !== false)
      err('T9 wordDiverges() false-positives on an identical pair');
  }
}

console.log(`verify-syllable-splitter — locales: ${LOCALES.join(',')}`);
let vocab = null;
try { vocab = loadImageVocabulary(); } catch (e) { warn('IMAGE_VOCABULARY unavailable: ' + e.message); }

let tool = null, src = '';
const tp = path.join(TOOL_DIR, 'syllable-splitter.js');
if (fs.existsSync(tp)) {
  try { const r = loadTool('syllable-splitter.js', 'SyllableSplitter'); tool = r.tool; src = r.src; }
  catch (e) { err('tool failed to load in the vm sandbox: ' + e.message); }
  if (!tool) err('global SyllableSplitter not found');
} else warn('mini tools/syllable-splitter.js not present yet — DATA checks only');

for (const L of LOCALES) {
  if (ALL.indexOf(L) < 0) { err(`unknown locale "${L}"`); continue; }
  const f = path.join(DATA_DIR, `syllable-splitter-${L}.json`);
  console.log(`\n[${L}]`);
  if (!fs.existsSync(f)) { err(`missing deck ${f}`); continue; }
  let deck;
  try { deck = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { err(`JSON parse: ${e.message}`); continue; }
  const r = checkDeck(L, deck, vocab, loadPww(L), loadPool(L));
  console.log(`  ${r.n} words, ${(deck.shelves || []).length} shelves, ${r.diverged} oral-divergent, ${r.provChecked} provenance-checked`);
}

if (tool) { console.log('\n[tool]'); checkTool(tool, src); }

console.log(`\n${ERRORS ? 'FAIL' : 'PASS'} — ${ERRORS} error(s), ${WARNS} warn(s)`);
process.exit(ERRORS ? 1 : 0);
