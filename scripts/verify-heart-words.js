#!/usr/bin/env node
/* =====================================================================
   verify-heart-words.js — build-gate for TOOL #21 Heart Words:
   the per-locale banks (mini tools/heart-words-<locale>.json) AND the
   tool source (mini tools/heart-words.js).

   Heart Words ships in TEN locales — NOT Finnish. Finnish orthography is
   transparent and the platform already ruled it out of sight-word
   pedagogy on native evidence (mini tools/choice-board-activity.js:39-40,
   scripts/local-test-sight-word.js:25). Manufacturing 40 "irregular"
   Finnish words would be visible fabrication to a Finnish teacher.

   MEASURED invariants (never loosen a threshold — FIX THE DATA):

   DATA (per locale bank)
     D1  locale field matches filename; version numeric; kind valid
     D2  shelf ids unique + labelled; >=1 free; every word's shelf exists
     D3  free-shelf words === 10 EXACTLY; 38 <= total <= 44
     D4  word ids + displays unique; 2 <= boxes.length <= 6
     D5  REASSEMBLY: join(boxes) + splitTail + silentTail === display
     D6  every multi-char box is in the locale's legal-grapheme whitelist
         (exempt on shelves flagged type:'syllables'), AND the gate's
         GRAPHEMES must deep-equal the tool's GRAPHEME_INVENTORY (drift)
     D7  adjacent single-char boxes must not form a known digraph
     D8  heart[] = non-empty, ascending, deduped, in range, and
         heart.length < boxes.length  (a word where EVERY part is hearted
         is whole-word memorisation — the pedagogy SoR replaced)
     D9  heartKind valid; 'accent' => the hearted box carries a diacritic
     D10 sentence <=90 chars, ends . ! or ?, contains display on a word
         boundary, and carries NO ASCII apostrophe (fan-out killer)
     D11 sentenceNoun in IMAGE_VOCABULARY; imageDir is a real pww theme
         dir; that theme holds a card with .f===imageFile AND .k===sentenceNoun
     D12 nounForm appears in sentence (the picture must depict something
         actually in the sentence — inflected surface form, de/nl)
     D13 no (imageDir,imageFile) pair used more than 3x per locale

   TOOL (vm-loaded, DOM-free)
     T1  id / STORE_KEY / ENT_TRUST_DAYS / premium===false at rest
     T2  strings.title + strings.instruction present for all 10 locales
     T3  strings completeness + {placeholder} parity against en
     T4  NO-SHAME: per-locale verdict regexes + score/timer/streak ban
     T5  no {n} placeholder in any shelf/bookshelf string (no counting)
     T6  every LCSAudio.speak passes lang: AND type in {word, ui}
         (the no-isolated-phoneme lock)
     T7  the source never calls api.token(  — that is Sound Boxes'
         DECORATIVE heart chip; ours is a semantic outline stamp
     T8  CSS injector idempotent; has @media print + reduced-motion;
         no .lcs- selectors except the sanctioned body.hw-wide
     T9  STRUCTURAL GATE: premium=false => every locked shelf yields []
         and the free shelf yields 10; premium=true => real counts
     T10 resolveDeepLink returns null for a locked shelf without premium
     T11 isHeart(word,i) true exactly for i in word.heart
     T12 FALLBACK_BANK itself satisfies every DATA invariant

   Usage: node scripts/verify-heart-words.js [--locales=en,de]
   Data dir override (mutation testing): HW_DATA_DIR=/path/to/copy
   Exit 1 on any ERROR. WARNs never fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
/* Mutation testing points this at a scratchpad copy so the repo is never
   touched. The TOOL source always comes from the repo. */
const DATA_DIR = process.env.HW_DATA_DIR || TOOLS_DIR;
/* Same idea for the tool source, so the T-family checks can be mutation
   tested without ever writing to the repo. */
const TOOL_DIR = process.env.HW_TOOL_DIR || TOOLS_DIR;

/* Heart Words locales — TEN. No fi (see header). */
const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;

const KINDS = new Set(['irregular', 'accent', 'mixed']);
const HEART_KINDS = new Set(['irregular', 'accent', 'silent']);
const DIACRITIC = /[áéíóúàèìòùâêîôûäöüåãõñçøæÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄÖÜÅÃÕÑÇØÆ]/;

/* Legal multi-char graphemes per locale. Base rows are the Sound Boxes
   inventories (scripts/verify-sound-boxes-bank.js); the HEART-WORD
   additions are marked — they are exactly the graphemes that only ever
   turn up in irregular words, which is the point of this tool. */
const GRAPHEMES = {
  en: ['sh','ch','th','wh','ck','ng','ph','ee','oo','oa','ai','ay','ea','ie','ow','ou','oi','oy','aw','au','ew','ue','ar','or','er','ur','ir','igh','a_e','i_e','o_e','u_e','e_e','ll','ss','ff','zz','gg','tt','dd','nn','mm','bb','pp',
       /* heart-word additions */ 'oe','ere','oul','eo','our','eigh','eir','ear'],
  de: ['sch','ch','ck','ei','ie','au','eu','äu','ll','ss','ff','tt','nn','mm','pp','rr','tz','ng','sp','st','qu','ah','eh','ih','oh','uh','aa','ee','oo',
       /* heart-word additions */ 'ieh','äh','öh','üh'],
  fr: ['ch','ou','oi','on','an','en','in','un','ai','ei','au','eau','eu','oeu','gn','ph','ll','ss','tt','nn','mm','rr','pp','qu','é','è','ê',
       /* heart-word additions */ 'em','om','am','ien','oy','ay','aim','ein'],
  es: ['ch','ll','rr','qu','gu','ñ',
       /* heart-word additions (accent pivot) */ 'á','é','í','ó','ú','gü'],
  pt: ['ch','lh','nh','rr','ss','qu','gu','ão','ãe','õe',
       /* heart-word additions (accent pivot) */ 'á','é','í','ó','ú','â','ê','ô','ç','ã','õ'],
  it: ['ch','gh','gn','gl','sc','ci','gi','ll','tt','ss','nn','mm','rr','pp','cc','bb','zz','ff','gg','dd',
       /* heart-word additions */ 'sci','cqu','gli','à','è','é','ì','ò','ù'],
  /* nl: NO 'sch' — Dutch sch = s + ch = TWO klanken (opposite of German) */
  nl: ['aa','ee','oo','uu','oe','ie','ij','ei','ui','eu','ou','au','ch','ng','nk',
       /* heart-word additions */ 'eeu','ieu','aai','ooi','oei'],
  sv: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','ck','ng','sj','skj','stj','kj','tj','hj','lj','dj','gj',
       /* heart-word additions */ 'rs','rt','rd','rn','rl'],
  da: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','sk','sj','hj','aa',
       /* heart-word additions */ 'hv','ej','øj','av'],
  no: ['ll','tt','ss','nn','mm','pp','rr','kk','gg','dd','bb','ng','sj','skj','kj','gj','hj','øy','ei','au',
       /* heart-word additions */ 'hv','rs','rt','eg']
};

/* Digraphs that must NEVER appear as two adjacent single-letter boxes. */
const SPLIT_TRAPS = {
  en: ['sh','ch','th','ck','ng','wh','ph'],
  de: ['sc','ch','ck','ei','ie','au','eu'],
  fr: ['ch','ou','oi','gn','an','on','in'],
  es: ['ch','ll','rr','qu'],
  pt: ['ch','lh','nh','rr'],
  it: ['ch','gh','gn','gl','sc'],
  nl: ['oe','ie','ij','ei','ui','eu','ou','au','ch','ng','aa','ee','oo','uu'],
  sv: ['ng','sj','kj','tj','ck'],
  da: ['ng','sj','aa'],
  no: ['ng','sj','kj','gj','øy','ei']
};

/* No-shame lexical bans. Applied to the tool's `strings` only — the SEO
   body copy in tool-content/*.json legitimately uses discovery vocabulary
   ("sight words") that must never reach a child-facing surface. */
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
  no: /\b(riktig svar|feil)\b/i
};
const SCORE_RE = /\b(score|scores|timer|streak|poäng|poeng|punkte|punteggio|puntuación|pontuação|niveau|level|badge|sticker|reward)\b/i;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

/* ---------- loaders ---------- */

function loadImageVocabulary() {
  const src = fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
  return new Function(src + '; return IMAGE_VOCABULARY;')();
}

function loadPwwIndex(locale) {
  const f = path.join(TOOLS_DIR, `pww-index-${locale}.json`);
  if (!fs.existsSync(f)) return null;
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (_) { return null; }
}

/* vm sandbox: the tool is plain ES5 with no module system, so we run it in
   a fake-DOM context and read the global back out. */
function loadTool(file, globalName) {
  const noop = () => {};
  const fakeEl = () => ({
    style: { setProperty: noop }, classList: { add: noop, remove: noop, contains: () => false },
    appendChild: noop, addEventListener: noop, setAttribute: noop, removeAttribute: noop,
    innerHTML: '', textContent: '', children: [], dataset: {}
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
    fetch: () => ({ then: function () { return this; }, catch: function () { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  sandbox.global = sandbox;
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  const src = fs.readFileSync(path.join(TOOL_DIR, file), 'utf8');
  vm.runInContext(src, sandbox, { filename: file });
  return { tool: sandbox[globalName], src };
}

/* ---------- shared helpers ---------- */

function reassemble(word) {
  let out = '', tail = '', splits = 0;
  for (const box of word.boxes || []) {
    const m = /^(.+)_(.+)$/.exec(box);
    if (m) { splits++; out += m[1]; tail += m[2]; }
    else out += box;
  }
  return { text: out + tail + (word.silentTail || ''), splits };
}

function deepEqualArrays(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  const sa = a.slice().sort(), sb = b.slice().sort();
  return sa.every((v, i) => v === sb[i]);
}

/* Word-boundary containment that survives sentence-initial capitalisation
   and locale letters (\b is ASCII-only in JS regex). */
function containsWord(sentence, word) {
  /* ¿ and ¡ MUST be stripped too: without them a Spanish question written
     naturally ("¿Qué comes?") would fail the containment check, which
     silently pushes the Spanish bank away from correct orthography.
     Surfaced by the native es ensemble. */
  const s = ' ' + sentence.toLowerCase().replace(/[.,!?;:"“”„«»()¿¡—–…]/g, ' ') + ' ';
  return s.indexOf(' ' + word.toLowerCase() + ' ') >= 0;
}

/* ---------- DATA checks ---------- */

/* opts.skipCounts — D3 is a CURRICULUM-COMPLETENESS invariant for a shipped
   bank, not a structural one. The inline FALLBACK_BANK is an emergency net
   for a 404 (a working FREE tool, nothing more); forcing it to duplicate 40
   words inline would double the tool file for no pedagogical gain. Every
   STRUCTURAL invariant (reassembly, heart validity, graphemes, sentences,
   images) still applies to it. */
function checkBank(locale, bank, vocab, pww, graphemeInventory, label, opts) {
  opts = opts || {};
  const tag = (w) => `[${label}:${locale}:${w && (w.id || w.display) || '?'}]`;

  /* D1 */
  if (bank.locale !== locale) err(`[${label}:${locale}] D1 locale field "${bank.locale}" != "${locale}"`);
  if (typeof bank.version !== 'number') err(`[${label}:${locale}] D1 version must be a number`);
  if (!KINDS.has(bank.kind)) err(`[${label}:${locale}] D1 kind "${bank.kind}" not in {irregular,accent,mixed}`);

  /* D2 */
  const shelfIds = new Set(), syllableShelves = new Set(), freeShelves = new Set();
  if (!Array.isArray(bank.shelves) || !bank.shelves.length) err(`[${label}:${locale}] D2 shelves[] missing/empty`);
  for (const s of bank.shelves || []) {
    if (!s.id || !s.label) err(`[${label}:${locale}] D2 shelf missing id/label: ${JSON.stringify(s)}`);
    if (shelfIds.has(s.id)) err(`[${label}:${locale}] D2 duplicate shelf id ${s.id}`);
    shelfIds.add(s.id);
    if (s.type === 'syllables') syllableShelves.add(s.id);
    if (s.free) freeShelves.add(s.id);
  }
  if (!freeShelves.size) err(`[${label}:${locale}] D2 no free shelf (need >=1)`);

  const words = bank.words || [];
  const legal = new Set(graphemeInventory || []);
  const traps = SPLIT_TRAPS[locale] || [];
  const ids = new Set(), displays = new Set(), imgUse = {};
  let freeWords = 0;

  /* pww lookup: theme dir -> Map(file -> key) */
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
    if (ids.has(w.id)) err(`${tag(w)} D4 duplicate word id`);
    ids.add(w.id);
    if (!w.display) err(`${tag(w)} D4 missing display`);
    else if (displays.has(w.display.toLowerCase())) err(`${tag(w)} D4 duplicate display "${w.display}"`);
    else displays.add(w.display.toLowerCase());
    if (!Array.isArray(w.boxes) || w.boxes.length < 2 || w.boxes.length > 6)
      err(`${tag(w)} D4 boxes must be 2-6, got ${w.boxes ? w.boxes.length : 'none'}`);

    /* D2 shelf membership */
    if (!shelfIds.has(w.shelf)) err(`${tag(w)} D2 shelf "${w.shelf}" not declared`);
    if (freeShelves.has(w.shelf)) freeWords++;

    /* D5 reassembly */
    const r = reassemble(w);
    if (w.display && r.text.toLowerCase() !== String(w.display).toLowerCase())
      err(`${tag(w)} D5 reassembly "${r.text}" != display "${w.display}"`);
    if (r.splits > 1) err(`${tag(w)} D5 more than one split-digraph token`);

    /* D6 / D7 — skipped on syllable shelves */
    if (!syllableShelves.has(w.shelf)) {
      for (const b of w.boxes || []) {
        const core = /^(.+)_(.+)$/.test(b) ? b : b;
        if (core.length > 1 && !legal.has(core.toLowerCase()))
          err(`${tag(w)} D6 box "${b}" not in ${locale} grapheme whitelist`);
      }
      for (let i = 0; i + 1 < (w.boxes || []).length; i++) {
        const a = String(w.boxes[i]).toLowerCase(), b = String(w.boxes[i + 1]).toLowerCase();
        if (a.length === 1 && b.length === 1 && traps.indexOf(a + b) >= 0)
          err(`${tag(w)} D7 adjacent boxes "${a}","${b}" form the digraph "${a + b}"`);
      }
    }

    /* D8 heart */
    const h = w.heart;
    if (!Array.isArray(h) || !h.length) err(`${tag(w)} D8 heart[] missing/empty`);
    else {
      const n = (w.boxes || []).length;
      for (let i = 0; i < h.length; i++) {
        if (!Number.isInteger(h[i])) err(`${tag(w)} D8 heart[${i}] not an integer`);
        else if (h[i] < 0 || h[i] >= n) err(`${tag(w)} D8 heart index ${h[i]} out of range 0..${n - 1}`);
        if (i && h[i] <= h[i - 1]) err(`${tag(w)} D8 heart[] must be ascending + deduped`);
      }
      if (h.length >= n)
        err(`${tag(w)} D8 heart covers every box (${h.length}/${n}) — that is whole-word memorisation, not a heart word`);
    }

    /* D9 heartKind */
    if (!HEART_KINDS.has(w.heartKind)) err(`${tag(w)} D9 heartKind "${w.heartKind}" invalid`);
    if (w.heartKind === 'accent' && Array.isArray(h)) {
      for (const i of h) {
        const box = (w.boxes || [])[i];
        if (box && !DIACRITIC.test(box))
          err(`${tag(w)} D9 heartKind 'accent' but hearted box "${box}" has no diacritic`);
      }
    }

    /* D10 sentence */
    const s = w.sentence;
    if (!s) err(`${tag(w)} D10 sentence missing`);
    else {
      if (s.length > 90) err(`${tag(w)} D10 sentence ${s.length} chars (max 90)`);
      if (!/[.!?]$/.test(s.trim())) err(`${tag(w)} D10 sentence must end in . ! or ?`);
      if (s.indexOf("'") >= 0) err(`${tag(w)} D10 sentence carries an ASCII apostrophe (use the typographic one)`);
      if (w.display && !containsWord(s, w.display))
        err(`${tag(w)} D10 sentence does not contain "${w.display}" as a whole word`);
    }

    /* D11 illustration */
    if (!w.sentenceNoun) err(`${tag(w)} D11 sentenceNoun missing`);
    else if (vocab && !vocab[w.sentenceNoun])
      err(`${tag(w)} D11 sentenceNoun "${w.sentenceNoun}" not in IMAGE_VOCABULARY`);
    if (!w.imageDir || !w.imageFile) err(`${tag(w)} D11 imageDir/imageFile missing`);
    else if (byDir) {
      const theme = byDir.get(w.imageDir);
      if (!theme) err(`${tag(w)} D11 imageDir "${w.imageDir}" is not a theme dir in pww-index-${locale}`);
      else {
        const key = theme.get(w.imageFile);
        if (key === undefined) err(`${tag(w)} D11 "${w.imageDir}/${w.imageFile}" not a card in that theme`);
        else if (key !== w.sentenceNoun)
          err(`${tag(w)} D11 "${w.imageDir}/${w.imageFile}" is noun "${key}", not "${w.sentenceNoun}"`);
      }
    }
    /* on-disk check only when the (gitignored) image tree is present */
    if (w.imageDir && w.imageFile) {
      const dir = path.join(ROOT, 'image-library-webp', 'themes');
      if (fs.existsSync(dir)) {
        const f = path.join(dir, w.imageDir, w.imageFile + '@2x.webp');
        if (!fs.existsSync(f)) err(`${tag(w)} D11 missing image file ${w.imageDir}/${w.imageFile}@2x.webp`);
      }
    }

    /* D12 nounForm appears in the sentence */
    const form = w.nounForm || (w.sentenceNoun || '');
    if (s && form && s.toLowerCase().indexOf(form.toLowerCase()) < 0)
      err(`${tag(w)} D12 nounForm "${form}" does not appear in the sentence`);

    /* D13 image reuse */
    const pair = w.imageDir + '/' + w.imageFile;
    imgUse[pair] = (imgUse[pair] || 0) + 1;
  }

  /* D3 — shipped banks only (see opts.skipCounts rationale above) */
  if (!opts.skipCounts) {
    if (freeWords !== 10) err(`[${label}:${locale}] D3 free-shelf words = ${freeWords}, must be exactly 10`);
    if (words.length < 38 || words.length > 44)
      err(`[${label}:${locale}] D3 total words = ${words.length}, must be 38-44`);
  } else if (!freeWords) {
    /* a fallback that is not fully free would strand an offline visitor */
    err(`[${label}:${locale}] D3 fallback bank has no free words`);
  }

  /* D13 */
  for (const p of Object.keys(imgUse)) {
    if (imgUse[p] > 3) err(`[${label}:${locale}] D13 image "${p}" used ${imgUse[p]}x (max 3)`);
  }

  return words.length;
}

/* ---------- TOOL checks ---------- */

function checkTool(tool, src) {
  /* T1 */
  if (tool.id !== 'heart-words') err(`T1 id "${tool.id}" != heart-words`);
  if (tool.STORE_KEY !== 'lcs:heart-words:v1') err(`T1 STORE_KEY "${tool.STORE_KEY}" wrong`);
  if (tool.ENT_TRUST_DAYS !== 14) err(`T1 ENT_TRUST_DAYS "${tool.ENT_TRUST_DAYS}" != 14`);
  if (tool.premium !== false) err('T1 premium must default to false');

  /* T2 / T3 */
  const S = tool.strings || {};
  if (!S.title || !S.instruction) err('T2 strings.title and strings.instruction are shell-mandatory');
  const keys = Object.keys(S);
  for (const k of keys) {
    const row = S[k];
    if (!row || typeof row !== 'object') { err(`T3 strings.${k} is not a locale map`); continue; }
    for (const L of ALL) {
      if (typeof row[L] !== 'string' || !row[L].length) { err(`T3 strings.${k}.${L} missing`); continue; }
      /* T3 placeholder parity vs en */
      const pe = (row.en.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
      const pl = (row[L].match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
      if (pe !== pl) err(`T3 strings.${k}.${L} placeholders "${pl}" != en "${pe}"`);
      /* T4 no-shame */
      if (VERDICT[L] && VERDICT[L].test(row[L])) err(`T4 strings.${k}.${L} carries verdict vocabulary: "${row[L]}"`);
      if (SCORE_RE.test(row[L])) err(`T4 strings.${k}.${L} carries score/timer vocabulary: "${row[L]}"`);
      if (/common core/i.test(row[L])) err(`T4 strings.${k}.${L} leaks "Common Core"`);
    }
    /* T5 no counting in shelf/bookshelf strings */
    if (/^(shelf|book|known)/i.test(k)) {
      for (const L of ALL) if (typeof row[L] === 'string' && /\{n\}/.test(row[L]))
        err(`T5 strings.${k}.${L} carries a {n} count placeholder — the bookshelf never counts`);
    }
  }

  /* T6 speech lock */
  const speakCalls = src.match(/LCSAudio\.speak\(\s*\{[^}]*\}/g) || [];
  if (!speakCalls.length) warn('T6 no LCSAudio.speak call found in source');
  for (const c of speakCalls) {
    if (!/\blang\s*:/.test(c)) err(`T6 LCSAudio.speak without lang: -> ${c.slice(0, 80)}`);
    const m = /\btype\s*:\s*'([a-z]+)'/.exec(c);
    if (!m) err(`T6 LCSAudio.speak without a literal type: -> ${c.slice(0, 80)}`);
    else if (m[1] !== 'word' && m[1] !== 'ui')
      err(`T6 LCSAudio.speak type '${m[1]}' — Heart Words is locked to word|ui (no isolated phonemes)`);
  }

  /* T7 no decorative token heart */
  if (/api\.token\s*\(/.test(src))
    err('T7 source calls api.token( — that is Sound Boxes decorative chip; use the local _heartSVG');

  /* T8 CSS injector */
  if (!/function\s+injectHeartWordsCSS\s*\(/.test(src)) err('T8 injectHeartWordsCSS() not defined');
  if (!/getElementById\(\s*['"]hw-style['"]\s*\)/.test(src)) err('T8 CSS injector is not idempotent on #hw-style');
  if (!/@media print/.test(src)) err('T8 injected CSS has no @media print block');
  if (!/prefers-reduced-motion/.test(src)) err('T8 injected CSS has no reduced-motion block');
  const lcsSel = (src.match(/['"][^'"]*\.lcs-[a-z-]+[^'"]*['"]/g) || [])
    .filter(s => !/hw-wide/.test(s));
  if (lcsSel.length) err(`T8 tool writes protected .lcs- selectors: ${lcsSel.slice(0, 3).join(' ')}`);

  /* T9 / T10 / T11 need a bank loaded into the tool */
  const bankFile = path.join(DATA_DIR, 'heart-words-en.json');
  if (fs.existsSync(bankFile)) {
    const bank = JSON.parse(fs.readFileSync(bankFile, 'utf8'));
    tool.bank = bank;
    const free = (bank.shelves || []).filter(s => s.free).map(s => s.id);
    const locked = (bank.shelves || []).filter(s => !s.free).map(s => s.id);

    tool.premium = false;
    for (const id of locked) {
      const got = tool.wordsForShelf(id);
      if (!Array.isArray(got) || got.length !== 0)
        err(`T9 wordsForShelf("${id}") returned ${got && got.length} items while free — premium words must never reach the DOM`);
    }
    for (const id of free) {
      const got = tool.wordsForShelf(id);
      if (!Array.isArray(got) || got.length !== 10)
        err(`T9 free shelf "${id}" returned ${got && got.length} items, expected 10`);
    }
    /* T10 */
    if (locked.length) {
      if (tool.resolveDeepLink({ shelf: locked[0] }, false) !== null)
        err('T10 resolveDeepLink resolved a locked shelf without premium');
      if (tool.resolveDeepLink({ shelf: locked[0] }, true) === null)
        err('T10 resolveDeepLink refused a locked shelf WITH premium');
    }
    tool.premium = true;
    for (const id of locked) {
      const got = tool.wordsForShelf(id);
      if (!Array.isArray(got) || !got.length)
        err(`T9 wordsForShelf("${id}") empty even with premium`);
    }
    tool.premium = false;

    /* T11 */
    const w = (bank.words || [])[0];
    if (w) {
      for (let i = 0; i < w.boxes.length; i++) {
        const expect = w.heart.indexOf(i) >= 0;
        if (tool.isHeart(w, i) !== expect) err(`T11 isHeart(${w.id},${i}) != ${expect}`);
      }
    }
  }

  /* T6-adjacent: GRAPHEME_INVENTORY drift (D6) */
  const inv = tool.GRAPHEME_INVENTORY || {};
  for (const L of ALL) {
    if (!inv[L]) { err(`D6 tool GRAPHEME_INVENTORY missing locale ${L}`); continue; }
    if (!deepEqualArrays(inv[L], GRAPHEMES[L]))
      err(`D6 GRAPHEME_INVENTORY.${L} has drifted from the gate's GRAPHEMES.${L}`);
  }
  if (inv.fi) err('D6 GRAPHEME_INVENTORY carries fi — Heart Words does not ship Finnish');
}

/* ---------- run ---------- */

console.log(`verify-heart-words — locales: ${LOCALES.join(',')}${DATA_DIR !== TOOLS_DIR ? `  (data: ${DATA_DIR})` : ''}`);

for (const L of LOCALES) {
  if (ALL.indexOf(L) < 0) { err(`unknown locale "${L}" (Heart Words ships ${ALL.join(',')} — no fi)`); continue; }
}

let vocab = null;
try { vocab = loadImageVocabulary(); } catch (e) { warn('IMAGE_VOCABULARY unavailable: ' + e.message); }

/* tool source (always from the repo, never the mutation copy) */
let tool = null, src = '';
const toolPath = path.join(TOOL_DIR, 'heart-words.js');
if (fs.existsSync(toolPath)) {
  try { const r = loadTool('heart-words.js', 'HeartWords'); tool = r.tool; src = r.src; }
  catch (e) { err('tool failed to load in the vm sandbox: ' + e.message); }
  if (!tool) err('global HeartWords not found after evaluating heart-words.js');
} else {
  warn('mini tools/heart-words.js not present yet — DATA checks only');
}

for (const L of LOCALES) {
  const f = path.join(DATA_DIR, `heart-words-${L}.json`);
  console.log(`\n[${L}]`);
  if (!fs.existsSync(f)) { err(`missing bank ${f}`); continue; }
  let bank;
  try { bank = JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { err(`JSON parse: ${e.message}`); continue; }
  const inv = (tool && tool.GRAPHEME_INVENTORY && tool.GRAPHEME_INVENTORY[L]) || GRAPHEMES[L];
  const n = checkBank(L, bank, vocab, loadPwwIndex(L), inv, 'bank');
  console.log(`  ${n} words, ${(bank.shelves || []).length} shelves`);
}

if (tool) {
  console.log('\n[tool]');
  checkTool(tool, src);
  /* T12 — the inline fallback must satisfy the same data invariants */
  if (tool.FALLBACK_BANK) {
    checkBank('en', tool.FALLBACK_BANK, vocab, loadPwwIndex('en'),
      (tool.GRAPHEME_INVENTORY && tool.GRAPHEME_INVENTORY.en) || GRAPHEMES.en, 'FALLBACK',
      { skipCounts: true });
  } else err('T12 FALLBACK_BANK missing');
}

console.log(`\n${ERRORS ? 'FAIL' : 'PASS'} — ${ERRORS} error(s), ${WARNS} warn(s)`);
process.exit(ERRORS ? 1 : 0);
