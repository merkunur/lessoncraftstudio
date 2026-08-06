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
     D3  free-shelf words === 10 EXACTLY; words.length === bank.targetTotal
         (a DECLARED per-locale figure, cross-checked against TARGETS);
         every non-free shelf holds 8-10. The old flat 38-44 forced Spanish
         and Italian to manufacture 40 irregular words out of orthographies
         that barely contain them — precisely the fabrication objection this
         gate raises against Finnish, applied inconsistently.
     D4  word ids + displays unique; 2 <= boxes.length <= 6
     D5  REASSEMBLY: join(boxes) + splitTail + silentTail === display
     D6  every multi-char box is in the locale's legal-grapheme whitelist
         (exempt on shelves flagged type:'syllables'), AND the gate's
         GRAPHEMES must deep-equal the tool's GRAPHEME_INVENTORY (drift)
     D7  adjacent single-char boxes must not form a known digraph
     D8  heart[] = non-empty, ascending, deduped, in range, and
         heart.length <= min(2, floor(boxes/2))  — and AT MOST 1 in the K
         band. The shipped `heart < boxes` was too loose: at 2-of-3 boxes
         hearted, two thirds of the word is "learn this by heart", which
         is whole-word memorisation wearing a heart-word costume. Measured
         against the shipped corpus the old rule passed 20 of 400 such
         words (en 3, de 3, sv 4, da 8, fr 1, no 1). In the Nordic cases
         the fix is CORRECT BOXING (`m|ig` not `m|i|g`) — the ratio rule
         forces it, which is why it is the right instrument.
     D14 PHASE COVERAGE: every UN-hearted box is decodable from the
         graphemes introduced at or before its shelf's `phase`. Catches
         "hearted too little" and "placed too early" in one predicate.
         Declared per locale in PHASES; a locale with no table is a
         recorded gap (PHASE_GAP), never a silent pass.
     D15 HEART JUSTIFICATION — the converse, and the more valuable half.
         a) a hearted box is not a plain grapheme already in its phase set
         b) it does not match a NEVER_HEART position rule (final s=/z/
            after a voiced box, soft c/g before e/i/y, final y=/iː/)
         c) it does not appear UN-hearted in >=2 other words of the same
            bank without an explicit heartOverride reason
         D15 alone catches was, does, once, because and goes — 5 of the 6
         substantive defects in the shipped English bank, WITHOUT an
         expert reading it.
     D16 NOTE/HEART AGREEMENT: `note` is required and `noteFocus[]` names
         the box indexes it explains; every one must be hearted. Catches
         have/give/live, where the note correctly described the final `e`
         while the heart sat on the vowel — the data recorded its own
         disagreement and nothing was reading it.
     D17 IMAGE COHERENCE: the image fields are all-present or all-absent.
         A function word (the, of, was, said) takes NO picture — a cat on
         the card for `the` teaches a pre-reader that `the` MEANS cat,
         the exact whole-word association SoR exists to prevent.
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
       /* heart-word additions */ 'oe','ere','oul','eo','our','eigh','eir','ear',
       /* `ve`: no English word ends in v, so a job-less e is added and it
          does NOT lengthen the vowel. That is the heart in have/give/live,
          and boxing it makes the rule visible instead of hiding it in a
          silent tail. ⚠ D6 deep-equals this against the tool's own
          GRAPHEME_INVENTORY — both halves move together or the build fails. */
       've'],
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

/* =====================================================================
   D3′ — DECLARED per-locale totals.

   Not uniform, and deliberately so. A transparent orthography has fewer
   genuinely irregular high-frequency words, and the honest answer is a
   smaller bank, not a padded one. English is the ceiling because English
   is the outlier: Fry 1-300's irregular residue is ~90-110 words, UFLI's
   K-2 heart-word sequence totals ~90-100, Really Great Reading's
   inventory 100-150. 120 sits inside all three. Past it you start
   hearting REGULAR words — which the shipped 40-word bank already does.
   ===================================================================== */
const TARGETS = {
  en: 120, fr: 100, da: 100, de: 80, sv: 80, nl: 70, no: 70, pt: 70, it: 50, es: 50
};

/* Bands. `band` is a curriculum position, not a locale label — the
   TEACHER-FACING band name is read from topics-taxonomy.json per §17.4.3
   (so de reads "1. Klasse", sv "åk 1"), never re-authored here. */
const BANDS = ['k', 'g1', 'g2'];

/* =====================================================================
   D14 — cumulative grapheme sets per phase.

   Phase N's set is every grapheme introduced at or before N. An UN-hearted
   box must be decodable from it: that is what makes the word "temporarily
   irregular" (irregular RELATIVE TO THE CODE TAUGHT SO FAR) rather than a
   flashcard.

   ⚠ A locale with no table here is a RECORDED GAP, printed on every run,
   never a silent pass — a check that cannot fail is worth nothing.
   ===================================================================== */
const PHASES = {
  en: [
    /* phase 1 — single letters + the earliest consonant digraphs */
    ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
     'sh','ch','th','ck','ng','ll','ss','ff','zz'],
    /* phase 2 — vowel teams + r-controlled + split digraphs */
    ['wh','ph','ee','oo','oa','ai','ay','ea','ie','ow','ou','oi','oy','ar','or','er','ur','ir',
     'a_e','i_e','o_e','u_e','e_e','gg','tt','dd','nn','mm','bb','pp','ve'],
    /* phase 3 — the long tail */
    ['aw','au','ew','ue','igh','oe','ere','oul','eo','our','eigh','eir','ear']
  ]
};

/* =====================================================================
   D15b — NEVER-HEART position rules.

   Each entry is a predicate over (box, index, word). A hearted box that
   matches one is a POSITION RULE the child can learn once and apply
   everywhere, not a word-specific irregularity. Hearting it teaches that
   English is arbitrary where it is in fact regular.

   Each rule names what it caught in the shipped bank so a future session
   can see it was measured, not imagined.
   ===================================================================== */
const VOICED_FINALS = /[aeiouybdglmnrvwz]$/i;
const NEVER_HEART = {
  en: [
    { id: 'final-s-voiced',
      why: 'final s = /z/ after a voiced sound is a position rule (is, has, dogs)',
      caught: 'was, does, because, goes',
      test: (box, i, w) => box.toLowerCase() === 's' && i === w.boxes.length - 1 &&
                           i > 0 && VOICED_FINALS.test(String(w.boxes[i - 1])) },
    { id: 'soft-c',
      why: 'c = /s/ before e, i or y is the soft-c rule, taught in Grade 1',
      caught: 'once',
      test: (box, i, w) => box.toLowerCase() === 'c' &&
                           /^[eiy]/i.test(String(w.boxes[i + 1] || '') + String(w.silentTail || '')) },
    { id: 'soft-g',
      why: 'g = /dʒ/ before e, i or y is the soft-g rule',
      caught: '(none in the shipped bank — the guard is prospective)',
      test: (box, i, w) => box.toLowerCase() === 'g' && i > 0 &&
                           /^[eiy]/i.test(String(w.boxes[i + 1] || '') + String(w.silentTail || '')) },
    { id: 'final-y-ee',
      why: 'final y = /iː/ in a two-syllable word is regular (many, any, only, happy)',
      caught: '(correctly avoided throughout — the guard keeps it that way)',
      test: (box, i, w) => box.toLowerCase() === 'y' && i === w.boxes.length - 1 && w.boxes.length >= 3 }
  ]
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

/* ⚠ `\b` IS ASCII-ONLY, and that makes it the wrong tool for a ban applied
   across ten languages. `\bquiz\b` MATCHES inside the Spanish `quizá`,
   because `á` is not an ASCII word character so the engine reads a
   boundary there — it condemned a correct native sentence
   ("… quizá le vayan mejor") the moment the English ban was widened to
   every locale. Unicode lookaround is the fix; the ban is unchanged, only
   its idea of where a word ends. */
const VERDICT_EN_ANYLOCALE =
  /(?<!\p{L})(correct|incorrect|wrong|oops|try again|test|quiz|drill|fail)(?!\p{L})/iu;

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
  const shelfMeta = new Map();
  if (!Array.isArray(bank.shelves) || !bank.shelves.length) err(`[${label}:${locale}] D2 shelves[] missing/empty`);
  for (const s of bank.shelves || []) {
    if (!s.id || !s.label) err(`[${label}:${locale}] D2 shelf missing id/label: ${JSON.stringify(s)}`);
    if (shelfIds.has(s.id)) err(`[${label}:${locale}] D2 duplicate shelf id ${s.id}`);
    shelfIds.add(s.id);
    shelfMeta.set(s.id, s);
    if (s.type === 'syllables') syllableShelves.add(s.id);
    if (s.free) freeShelves.add(s.id);
    if (!opts.skipCounts) {
      if (BANDS.indexOf(s.band) < 0)
        err(`[${label}:${locale}] D2 shelf "${s.id}" band "${s.band}" not in {${BANDS.join(',')}}`);
      if (!Number.isInteger(s.phase) || s.phase < 1)
        err(`[${label}:${locale}] D2 shelf "${s.id}" needs an integer phase >= 1`);
      if (!s.teachingPoint)
        err(`[${label}:${locale}] D2 shelf "${s.id}" has no teachingPoint — a shelf a teacher cannot rank ` +
            `is a conversion defect on top of a teaching one`);
    }
  }
  if (!freeShelves.size) err(`[${label}:${locale}] D2 no free shelf (need >=1)`);

  /* D14/D15 substrate. A locale with no phase table is a RECORDED gap. */
  const phaseTable = PHASES[locale] || null;
  if (!phaseTable && !opts.skipCounts)
    warn(`[${label}:${locale}] PHASE_GAP — no PHASES table, so D14/D15a cannot run for this locale`);
  const neverHeart = NEVER_HEART[locale] || [];
  if (!neverHeart.length && !opts.skipCounts)
    warn(`[${label}:${locale}] NEVER_HEART_GAP — no position rules declared, so D15b cannot run`);
  const heartSuspect = [], boxUse = {};

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

    /* D8′ heart — shape, range, AND the over-hearting ratio */
    const h = w.heart;
    const shelfOf = shelfMeta.get(w.shelf) || {};
    if (!Array.isArray(h) || !h.length) err(`${tag(w)} D8 heart[] missing/empty`);
    else {
      const n = (w.boxes || []).length;
      for (let i = 0; i < h.length; i++) {
        if (!Number.isInteger(h[i])) err(`${tag(w)} D8 heart[${i}] not an integer`);
        else if (h[i] < 0 || h[i] >= n) err(`${tag(w)} D8 heart index ${h[i]} out of range 0..${n - 1}`);
        if (i && h[i] <= h[i - 1]) err(`${tag(w)} D8 heart[] must be ascending + deduped`);
      }
      /* the ratio. `heart < boxes` passed 2-of-3, which is the defect. */
      const cap = Math.min(2, Math.floor(n / 2));
      if (h.length > cap)
        err(`${tag(w)} D8 heart covers ${h.length} of ${n} boxes (max ${cap}) — at that ratio the child ` +
            `learns the SHAPE, which is the whole-word memorisation SoR replaced`);
      /* the K band gets ONE heart. A five-year-old holding two arbitrary
         parts of one word is holding the word. */
      if (shelfOf.band === 'k' && h.length > 1)
        err(`${tag(w)} D8 ${h.length} hearts on a K-band shelf — the K band allows exactly one`);
    }

    /* ---- the phase set this word is decoded against (D14/D15a) ---- */
    let phaseSet = null;
    if (phaseTable && Number.isInteger(shelfOf.phase)) {
      phaseSet = new Set();
      for (let p = 0; p < Math.min(shelfOf.phase, phaseTable.length); p++)
        for (const g of phaseTable[p]) phaseSet.add(g);
    }

    /* D14 phase coverage — every UN-hearted box must be readable by now */
    if (phaseSet && Array.isArray(h)) {
      for (let i = 0; i < (w.boxes || []).length; i++) {
        if (h.indexOf(i) >= 0) continue;
        const core = String(w.boxes[i]).toLowerCase();
        if (!phaseSet.has(core))
          err(`${tag(w)} D14 un-hearted box "${w.boxes[i]}" is not decodable at phase ${shelfOf.phase} — ` +
              `either the word is placed too early, or that box IS part of the irregularity and is un-hearted`);
      }
    }

    /* D15a — a hearted box that the phase already taught is not irregular */
    if (phaseSet && Array.isArray(h)) {
      for (const i of h) {
        const core = String((w.boxes || [])[i] || '').toLowerCase();
        if (!core) continue;
        if (phaseSet.has(core) && !w.heartOverride)
          heartSuspect.push({ w, i, core, why: `D15a "${core}" is already in the phase-${shelfOf.phase} set` });
      }
    }

    /* D15b — never-heart position rules.
       ⚠ heartOverride does NOT excuse this check, and that is deliberate.
       An override is a claim that a box is IRREGULAR for this word; it is
       not a licence to heart a POSITION RULE that holds language-wide.
       The distinction matters because D15a fires on every single-letter
       heart (single letters are all in phase 1), so nearly every word in a
       real bank carries an override — and when D15b honoured it too, the
       position rules were unenforced across 99 of 120 words while the gate
       reported PASS. Found by poison-testing each invariant family
       separately: eight died, this one survived. A gate you help past is
       not a gate. */
    if (Array.isArray(h) && neverHeart.length) {
      for (const i of h) {
        const box = String((w.boxes || [])[i] || '');
        if (!box) continue;
        for (const rule of neverHeart) {
          if (!rule.test(box, i, w)) continue;
          err(`${tag(w)} D15b heart on box "${box}" breaks the never-heart rule "${rule.id}" — ${rule.why}`);
        }
      }
    }

    /* D15c bookkeeping — same box, hearted here, plain elsewhere */
    for (let i = 0; i < (w.boxes || []).length; i++) {
      const core = String(w.boxes[i]).toLowerCase();
      const slot = boxUse[core] || (boxUse[core] = { hearted: [], plain: [] });
      (Array.isArray(h) && h.indexOf(i) >= 0 ? slot.hearted : slot.plain).push(w.id);
    }

    /* D16 note / heart agreement */
    if (!w.note) err(`${tag(w)} D16 note missing — it is the answer to "why is THAT the heart?"`);
    if (!Array.isArray(w.noteFocus) || !w.noteFocus.length)
      err(`${tag(w)} D16 noteFocus[] missing — name the box indexes the note explains`);
    else {
      for (const i of w.noteFocus) {
        if (!Number.isInteger(i) || i < 0 || i >= (w.boxes || []).length)
          err(`${tag(w)} D16 noteFocus index ${i} out of range`);
        else if (Array.isArray(h) && h.indexOf(i) < 0)
          err(`${tag(w)} D16 the note explains box ${i} ("${w.boxes[i]}") but that box is NOT hearted — ` +
              `the data is disagreeing with itself in writing`);
      }
    }

    /* D17 image coherence — all present or all absent, never half */
    const imgFields = ['sentenceNoun', 'imageDir', 'imageFile'];
    const present = imgFields.filter(f => !!w[f]);
    if (present.length && present.length !== imgFields.length)
      err(`${tag(w)} D17 image fields half-specified (${present.join(',')}) — all three or none`);
    if (w.noImage && present.length)
      err(`${tag(w)} D17 noImage is set but image fields are present`);
    if (!present.length && !w.noImage)
      err(`${tag(w)} D17 no picture and no noImage flag — a function word takes noImage:true deliberately, ` +
          `it is never an omission`);

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

    /* D11 illustration — only for words that HAVE one (see D17) */
    if (w.imageDir && w.imageFile) {
      if (vocab && !vocab[w.sentenceNoun])
        err(`${tag(w)} D11 sentenceNoun "${w.sentenceNoun}" not in IMAGE_VOCABULARY`);
      if (byDir) {
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
      const dir = path.join(ROOT, 'image-library-webp', 'themes');
      if (fs.existsSync(dir)) {
        const f = path.join(dir, w.imageDir, w.imageFile + '@2x.webp');
        if (!fs.existsSync(f)) err(`${tag(w)} D11 missing image file ${w.imageDir}/${w.imageFile}@2x.webp`);
      }

      /* D12 nounForm appears in the sentence — the picture must depict
         something actually IN the sentence, in its inflected surface form */
      const form = w.nounForm || w.sentenceNoun;
      if (s && form && s.toLowerCase().indexOf(form.toLowerCase()) < 0)
        err(`${tag(w)} D12 nounForm "${form}" does not appear in the sentence`);

      /* D13 image reuse */
      const pair = w.imageDir + '/' + w.imageFile;
      imgUse[pair] = (imgUse[pair] || 0) + 1;
    }
  }

  /* ---- D15c: the same box hearted here and plain elsewhere ----
     A grapheme cannot be both "un-derivable from the code" in one word and
     ordinary in two others. Either the heart is wrong or the word needs an
     explicit heartOverride saying why THIS one differs. */
  for (const core of Object.keys(boxUse)) {
    const u = boxUse[core];
    if (!u.hearted.length || u.plain.length < 2) continue;
    for (const id of u.hearted) {
      const w = words.find(x => x.id === id);
      if (w && w.heartOverride) continue;
      err(`[${label}:${locale}:${id}] D15c box "${core}" is hearted here but plain in ` +
          `${u.plain.length} other words (${u.plain.slice(0, 3).join(', ')}) — ` +
          `add heartOverride with a reason, or the heart is wrong`);
    }
  }
  /* D15a suspects are reported after D15c so the two read together */
  for (const s of heartSuspect) err(`[${label}:${locale}:${s.w.id}] ${s.why}`);

  /* D3′ — shipped banks only (see opts.skipCounts rationale above) */
  if (!opts.skipCounts) {
    if (freeWords !== 10) err(`[${label}:${locale}] D3 free-shelf words = ${freeWords}, must be exactly 10`);
    const target = TARGETS[locale];
    if (!Number.isInteger(bank.targetTotal))
      err(`[${label}:${locale}] D3 bank.targetTotal missing — the size of a bank is DECLARED, not discovered`);
    else if (bank.targetTotal !== target)
      err(`[${label}:${locale}] D3 bank.targetTotal ${bank.targetTotal} != the declared ${target} for ${locale}`);
    if (Number.isInteger(bank.targetTotal) && words.length !== bank.targetTotal)
      err(`[${label}:${locale}] D3 ${words.length} words against a declared target of ${bank.targetTotal}`);
    /* every non-free shelf holds 8-10. A shelf of eight good words beats
       ten with two the class will never meet. */
    const perShelf = {};
    for (const w of words) perShelf[w.shelf] = (perShelf[w.shelf] || 0) + 1;
    for (const s of bank.shelves || []) {
      if (s.free) continue;
      const n = perShelf[s.id] || 0;
      if (n < 8 || n > 10)
        err(`[${label}:${locale}] D3 shelf "${s.id}" holds ${n} words (8-10)`);
    }
  } else if (!freeWords) {
    /* a fallback that is not fully free would strand an offline visitor */
    err(`[${label}:${locale}] D3 fallback bank has no free words`);
  }

  /* D13 — the cap is re-derived for the new bank size, not loosened by
     taste: 3x encoded the variety intent of a 40-word bank; at 120 the
     same intent is 6x, and reusing one cat across six sentences is
     pedagogically inert because the picture decorates, never answers. */
  const reuseCap = (bank.targetTotal || words.length) > 60 ? 6 : 3;
  for (const p of Object.keys(imgUse)) {
    if (imgUse[p] > reuseCap) err(`[${label}:${locale}] D13 image "${p}" used ${imgUse[p]}x (max ${reuseCap})`);
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
      /* T4 no-shame.
         ⚠ EVERY locale is checked against the English ban as well as its
         own. Each locale used to be tested only against its own language's
         verdict words, so "Test: correct or incorrect?" dropped into the
         Italian string sailed through — seven mutations survived on exactly
         that. English verdict vocabulary in a non-English string is BOTH a
         no-shame breach and a locale leak, and neither is acceptable.
         Poison-tested in both directions: it fires on the injected string
         and passes every authored one. */
      if (VERDICT[L] && VERDICT[L].test(row[L])) err(`T4 strings.${k}.${L} carries verdict vocabulary: "${row[L]}"`);
      if (L !== 'en' && VERDICT_EN_ANYLOCALE.test(row[L]))
        err(`T4 strings.${k}.${L} carries ENGLISH verdict vocabulary: "${row[L]}"`);
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
  /* ⚠ Scan the CODE, not the prose. Comments legitimately NAME protected
     selectors in order to explain a constraint ("the iframe height is
     content-driven by a ResizeObserver on .lcs-app"), and an apostrophe
     anywhere in that sentence makes the quoted-string pattern match a
     paragraph of English. Stripping comments narrows WHAT is measured; it
     does not weaken the rule — a real `.lcs-` selector in a real string
     still fires, which the poison test below proves. */
  const srcNoComments = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '');

  /* ⚠ THE BAN IS SCOPED BY REGION, NOT BY EXCEPTION.
     On SCREEN the tool may not touch a shell selector — that is the real
     invariant and it stays absolute. INSIDE `@media print` it must, because
     the shell header and control bar have to come off the paper, and every
     sibling tool that prints does exactly this (ten-frame, money-mat,
     fraction-kitchen). A blanket ban made the correct print rule
     unshippable and the print gate caught the consequence: the shell header
     was landing on the printed card. Widening an exemption list would have
     been the loose fix; splitting the region is the true one. */
  const PRINT_AT = srcNoComments.indexOf('@media print{');
  const SCREEN = PRINT_AT > 0 ? srcNoComments.slice(0, PRINT_AT) : srcNoComments;
  const PRINT = PRINT_AT > 0 ? srcNoComments.slice(PRINT_AT) : '';
  if (PRINT_AT < 0) err('T8 no @media print block found — the print region scan below would be vacuous');

  const lcsSel = (SCREEN.match(/['"][^'"\n]*\.lcs-[a-z-]+[^'"\n]*['"]/g) || [])
    .filter(s => !/hw-wide/.test(s));
  if (lcsSel.length) err(`T8 tool writes protected .lcs- selectors ON SCREEN: ${lcsSel.slice(0, 3).join(' ')}`);

  /* And in the print region, only NEUTRALISING is allowed.
     ⚠ EVERY declaration is checked, not "does the rule contain one of
     them". The first version asked whether an allowed property appeared
     anywhere in the rule, so a rule that added `color:red` alongside a
     legitimate `box-shadow:none` passed — the poison test did not fire,
     which is the only reason this is right now. A check that is satisfied
     by one good declaration cannot see the bad one next to it. */
  const NEUTRALISING = { 'display': ['none'], 'background': ['none', '#fff', 'transparent'],
                         'box-shadow': ['none'], 'max-width': ['none'], 'max-height': ['none'],
                         'height': ['auto'], 'padding': ['0'], 'margin': ['0'] };
  const printLcs = (PRINT.match(/['"][^'"\n]*\.lcs-[a-z-]+[^'"\n]*['"]/g) || []);
  for (const rule of printLcs) {
    const body = /\{([^}]*)\}/.exec(rule);
    if (!body) { err(`T8 print rule names a shell selector with no declaration block: ${rule}`); continue; }
    for (const decl of body[1].split(';')) {
      const d = decl.trim();
      if (!d) continue;
      const m = /^([a-z-]+)\s*:\s*(.+?)(\s*!important)?$/.exec(d);
      if (!m) { err(`T8 unparseable print declaration on a shell selector: "${d}"`); continue; }
      const allowed = NEUTRALISING[m[1]];
      if (!allowed || allowed.indexOf(m[2].trim()) < 0)
        err(`T8 print rule RESTYLES a shell selector ("${d}") — in print the tool may only neutralise the shell, never redraw it`);
    }
  }

  /* =================================================================
     T13 — THE PURE ENGINE, exercised directly against the gate's OWN
     ground truth.

     Every function below is DOM-free and was, until the mutation harness
     said so, invisible to every gate in the suite: mutating `reassemble`
     to drop the silent tail, `boxFace` to show the whole split token,
     `cutsToBoxes` to lose the last letter, or `_sanitiseCustom` to trust
     an untrusted URL payload all SURVIVED. The banks happen to contain no
     split-digraph word, so the browser gate could not see it either —
     which is exactly why these use SYNTHETIC inputs rather than the
     shipped data. A check that only fires on data you happen to ship is a
     check that stops working the day the data changes.
     ================================================================= */
  {
    const W = { boxes: ['m', 'a_e', 'k'], silentTail: '' };
    /* the gate computes the expectation itself, by a different route */
    if (tool.reassemble(W) !== 'make')
      err(`T13 reassemble(m|a_e|k) = "${tool.reassemble(W)}", expected "make" — the split-digraph tail is lost`);
    if (tool.tailText(W) !== 'e')
      err(`T13 tailText(m|a_e|k) = "${tool.tailText(W)}", expected "e"`);
    if (tool.boxFace('a_e') !== 'a')
      err(`T13 boxFace("a_e") = "${tool.boxFace('a_e')}" — the box must show only its main letter`);
    if (tool.boxFace('th') !== 'th') err('T13 boxFace mangles an ordinary digraph');

    const S = { boxes: ['c', 'o', 'm'], silentTail: 'e' };
    if (tool.reassemble(S) !== 'come') err(`T13 reassemble drops silentTail ("${tool.reassemble(S)}")`);
    if (tool.tailText(S) !== 'e') err('T13 tailText drops silentTail');

    /* the ratio the editor enforces must be the SAME rule as D8' */
    for (const [n, want] of [[2, 1], [3, 1], [4, 2], [5, 2], [6, 2]]) {
      if (tool.heartCap(n) !== want)
        err(`T13 heartCap(${n}) = ${tool.heartCap(n)}, expected ${want} — the editor would allow a shape-learning word`);
    }

    /* the seam editor's two conversions must round-trip EXACTLY, or a
       teacher's correction silently changes the word */
    for (const boxes of [['sh', 'o', 'n', 'e'], ['b', 'u', 'i', 'l', 'd'], ['th', 'e']]) {
      const word = boxes.join('');
      const back = tool.cutsToBoxes(word.split(''), tool.boxesToCuts(boxes));
      if (back.join('|') !== boxes.join('|'))
        err(`T13 seam round-trip broke ${boxes.join('|')} -> ${back.join('|')}`);
      if (back.join('') !== word)
        err(`T13 seam round-trip no longer spells "${word}" (got "${back.join('')}")`);
    }

    /* the segmenter must REFUSE, never weld */
    if (tool.segment('strengths', 'en') !== null)
      err('T13 segment() did not refuse an over-long word — it must never silently weld the overflow into the last box');
    const seg = tool.segment('shone', 'en');
    if (!Array.isArray(seg) || seg.join('') !== 'shone') err('T13 segment() does not reassemble');
    if (!seg || seg[0] !== 'sh') err('T13 segment() is not greedy-longest-match over the locale inventory');

    /* ⚠ the shared-list ingest is UNTRUSTED INPUT and had no gate at all */
    const bad = [
      [{ display: 'cat', boxes: ['c', 'a'], heart: [0] }, 'boxes that do not spell the word'],
      [{ display: 'cat', boxes: ['c', 'a', 't'], heart: [0, 1, 2] }, 'a fully-hearted word'],
      [{ display: 'cat', boxes: ['c', 'a', 't'], heart: [] }, 'no heart at all'],
      [{ display: 'cat', boxes: ['c', 'a', 't'], heart: [9] }, 'a heart index out of range'],
      [{ display: 'c4t<script>', boxes: ['c', '4', 't'], heart: [0] }, 'non-letters'],
      /* ⚠ this one is the subtle case: strip the digit and the boxes still
         JOIN to "cat" and still equal the display, so a reassembly check
         alone waves it through and the child gets a blank tile to map */
      [{ display: 'ca4t', boxes: ['c', 'a', '4', 't'], heart: [0] }, 'a box that strips to empty'],
      [{ display: 'antidisestablishment', boxes: ['a', 'b'], heart: [0] }, 'a word past the letter cap'],
      [{ display: 'cat', boxes: ['cat'], heart: [0] }, 'a single box'],
      ['not an object', 'a non-object'],
      [null, 'null']
    ];
    for (const [payload, why] of bad) {
      if (tool._sanitiseCustom(payload) !== null)
        err(`T13 _sanitiseCustom accepted ${why} — never trust a URL to write a shelf`);
    }
    /* ⚠ The display strip is load-bearing in the PERMISSIVE direction, and
       that is the only reason a needle removing it survived at first:
       dropping it makes the tool STRICTER, so it admits nothing unsafe —
       it just silently discards a colleague's hyphenated word. Measured,
       not reasoned: with the strip `ca-t` normalises to `cat`; without it
       the boxes no longer equal the display and the word vanishes. The
       same normalisation runs on typed input, so the two paths agree. */
    const norm = tool._sanitiseCustom({ display: 'ca-t', boxes: ['c', 'a', 't'], heart: [0] });
    if (!norm || norm.display !== 'cat')
      err('T13 _sanitiseCustom silently DROPS a punctuated word instead of normalising it — a shared list would lose words with no signal');

    const good = tool._sanitiseCustom({ display: 'Shone', boxes: ['SH', 'o', 'n', 'e'], heart: [0], sentence: 'x' });
    if (!good) err('T13 _sanitiseCustom REFUSED a legitimate shared word — the check is too wide');
    else {
      if (good.id.indexOf('my:') !== 0)
        err(`T13 a shared word must be namespaced (got "${good.id}") or a ?word= link can resolve into the curated set`);
      if (good.display !== 'shone' || good.boxes.join('') !== 'shone')
        err('T13 _sanitiseCustom did not normalise case');
    }
  }

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
