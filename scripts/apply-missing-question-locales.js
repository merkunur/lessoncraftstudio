/* =====================================================================
   apply-missing-question-locales.js — expand TOOL #55's English-only
   `strings` map to the eleven locales the native panels authored.
   Run:  node scripts/apply-missing-question-locales.js
         node scripts/apply-missing-question-locales.js --dry-run

   WHAT IT DOES
     For every key the TOOL declares, rewrites  `key: { en: 'X' }`  into
     `key: { en: 'X', de: '…', … , fi: '…' }`, taking every non-English
     value VERBATIM from `scripts/_missing-question-strings.js`.

   ⚠⚠ IT VERIFIES EVERY WRITE LANDED, BY RE-REQUIRING THE TOOL.
   A silent partial rewrite that reports success is a recorded defect on
   this shelf, so nothing here trusts its own regex: after the write the
   tool is re-required from disk with the module cache busted, and every
   (key × locale) is compared back against the source of truth — and,
   when the panel files are still on disk, against THOSE too, because the
   consolidation file is itself a copy and a copy can drift. Any mismatch
   exits 1.

   ⚠ IDEMPOTENT. The replacement text is computed and compared with what
   is already there; identical keys are not rewritten, so a second run
   leaves the file BYTE-IDENTICAL and reports every key as already done.
   (`TOOL_WRAPPER_VERSION`-style non-idempotent bumps are what this
   avoids: a second `register-`/`apply-` run must be a no-op.)

   ⚠ THE ENGLISH IS NEVER REGENERATED. The existing `en:` literal is
   carried across as a RAW SOURCE SLICE, not re-emitted from a parsed
   value, so no escaping convention can shift under it. It is then
   asserted unchanged.

   ⚠ A KEY THE PANELS DO NOT CARRY IS FATAL. A key the PANELS carry and
   the TOOL does not is REFUSED and reported — never silently written in,
   because a string with no state behind it is the #39 `hintMark` class.
   Newly-appearing extras are FATAL; the one known extra is acknowledged
   below WITH ITS REASON, and that list is a ratchet that may only shrink.
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

/* ⚠ OVERRIDABLE SO THE VERIFIER CAN BE POISONED. A gate that has never
   been shown to FAIL is indistinguishable from one that cannot. Both of
   these are pointed at scratch copies to prove the checks below fire on
   a write that did not land and on a drifted strings file. */
const TOOL = path.join(process.env.MISSING_QUESTION_TOOL_DIR || path.join(__dirname, '..', 'mini tools'),
  'missing-question.js');
const STRINGS = process.env.MISSING_QUESTION_STRINGS || path.join(__dirname, '_missing-question-strings.js');
/* the ten panel files, if they are still where the panels left them */
const PANEL_DIR = process.env.MQ_PANEL_DIR || path.join(
  process.env.LOCALAPPDATA || require('os').tmpdir(), 'Temp', 'claude',
  'C--Users-rkgen-lessoncraftstudio', '7ff223ef-444e-43b7-9051-4d8be79c24fc', 'scratchpad');

const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ⚠ A RATCHET, NOT AN EXCUSE — and it is now EMPTY, which is the point.
   It briefly held `tallyNone`: a key all ten panels wrote and the tool
   never declared, because `showTally()` refuses to open over nothing and
   `shut()` puts the tally away with the last shutter, so the state is
   unreachable (proven over all 714 button-reachable states, measured
   never-asked across 22 driven runs). That key has now been DROPPED from
   `_missing-question-strings.js` outright, so the acknowledgement has
   nothing left to acknowledge — and an empty list is strictly stronger
   than a populated one, because any undeclared key is now FATAL and
   cannot creep back in under an old exemption. It may only shrink. */
const ACKNOWLEDGED_EXTRA = {};

const DRY = process.argv.indexOf('--dry-run') >= 0;

let fails = [];
const bad = m => fails.push(m);

/* ---------------------------------------------------------------------
   a string- and comment-aware brace scanner. `{a}` `{b}` `{c}` live
   INSIDE string literals, so a naive depth counter walks straight past
   the closing brace of the object it is trying to find.
   ------------------------------------------------------------------ */
function matchBrace(src, openIdx) {
  if (src[openIdx] !== '{') throw new Error('matchBrace: not a brace at ' + openIdx);
  let depth = 0, i = openIdx;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2); if (i < 0) throw new Error('unterminated comment'); i += 2; continue; }
    if (ch === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i < 0) i = src.length; continue; }
    if (ch === "'" || ch === '"' || ch === '`') {
      const q = ch; i++;
      while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; }
      i++; continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) return i; }
    i++;
  }
  throw new Error('matchBrace: unbalanced from ' + openIdx);
}

/* read one string literal verbatim, returning its raw source slice */
function readLiteral(src, i) {
  const q = src[i];
  if (q !== "'" && q !== '"') return null;
  let j = i + 1;
  while (j < src.length && src[j] !== q) { if (src[j] === '\\') j++; j++; }
  return src.slice(i, j + 1);
}

function q(s) { return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; }
function tokens(s) { return (String(s).match(/\{(\w+)\}/g) || []).sort().join(','); }

/* ------------------------------------------------------------------ */
console.log('#55 THE MISSING QUESTION — locale applier' + (DRY ? '  (dry run)' : ''));

const PANELS = require(STRINGS);
delete require.cache[require.resolve(TOOL)];
const before = require(TOOL).strings;
const KEYS = Object.keys(before);
const enBefore = {}; KEYS.forEach(k => { enBefore[k] = before[k].en; });

console.log('  tool declares ' + KEYS.length + ' keys; panel file carries ' + Object.keys(PANELS).length + ' locales');

/* ---- 1. key-set reconciliation, BEFORE a byte is written ---------- */
{
  const missingLocale = LOCALES.filter(L => !PANELS[L]);
  missingLocale.forEach(L => bad('⚠⚠ no panel block for locale `' + L + '`'));

  LOCALES.forEach(function (L) {
    if (!PANELS[L]) return;
    const have = Object.keys(PANELS[L]);
    KEYS.forEach(function (k) {
      if (have.indexOf(k) < 0) bad('⚠⚠ ' + L + ': MISSING `' + k + '` — the tool declares it and the panel did not write it');
    });
    have.forEach(function (k) {
      if (KEYS.indexOf(k) >= 0) return;
      if (ACKNOWLEDGED_EXTRA[k]) return;                       /* reported below */
      bad('⚠⚠ ' + L + ': UNEXPECTED key `' + k + '` — the tool does not declare it and it is not acknowledged');
    });
  });

  /* the acknowledged extras, reported loudly every single run */
  const extras = {};
  LOCALES.forEach(L => Object.keys(PANELS[L] || {}).forEach(k => {
    if (KEYS.indexOf(k) < 0 && ACKNOWLEDGED_EXTRA[k]) (extras[k] = extras[k] || []).push(L);
  }));
  Object.keys(extras).forEach(function (k) {
    console.log('\n  ⚠⚠ REFUSED — `' + k + '` authored by ' + extras[k].length + '/' + LOCALES.length +
      ' panels (' + extras[k].join(', ') + '), NOT declared by the tool.');
    console.log('     NOT WRITTEN IN. ' + ACKNOWLEDGED_EXTRA[k]);
    console.log('     It is kept in _missing-question-strings.js, which is the panels\' record.\n');
  });
}
if (fails.length) { fails.forEach(f => console.log('  ✗ ' + f)); console.log('\nFAIL  key-set reconciliation'); process.exit(1); }

/* ---- 2. the rewrite ---------------------------------------------- */
const ORIGINAL = fs.readFileSync(TOOL, 'utf8');
let src = ORIGINAL;

const blockStart = src.indexOf('\n    strings: {');
if (blockStart < 0) { console.log('FAIL  the `strings:` block was not found'); process.exit(1); }
const blockOpen = src.indexOf('{', blockStart);
const blockEnd = matchBrace(src, blockOpen);
console.log('  strings block: chars ' + blockOpen + '..' + blockEnd);
if (blockEnd - blockOpen < 500) { console.log('FAIL  non-vacuity: the strings block is implausibly small'); process.exit(1); }

let rewritten = 0, already = 0;

KEYS.forEach(function (k) {
  /* re-read the block bounds each time: earlier rewrites move everything */
  const bs = src.indexOf('\n    strings: {');
  const bo = src.indexOf('{', bs);
  const be = matchBrace(src, bo);
  const block = src.slice(bo, be);

  const re = new RegExp('\\n([ \\t]*)' + k + ':\\s*\\{');
  const m = re.exec(block);
  if (!m) { bad('⚠⚠ `' + k + '` was not found in the strings block — the rewrite cannot reach it'); return; }
  const ind = m[1];
  const objOpen = bo + m.index + m[0].length - 1;
  const objClose = matchBrace(src, objOpen);
  const objSrc = src.slice(objOpen, objClose + 1);

  /* the English, as a RAW SOURCE SLICE */
  const em = /\ben:\s*/.exec(objSrc);
  if (!em) { bad('⚠⚠ `' + k + '` carries no `en:` — refusing to guess one'); return; }
  const enRaw = readLiteral(objSrc, em.index + em[0].length);
  if (!enRaw) { bad('⚠⚠ `' + k + '`\'s English is not a plain string literal — refusing to touch it'); return; }

  const lines = [ind + '  en: ' + enRaw + ','];
  LOCALES.forEach(function (L, i) {
    lines.push(ind + '  ' + L + ': ' + q(PANELS[L][k]) + (i === LOCALES.length - 1 ? '' : ','));
  });
  const next = '{\n' + lines.join('\n') + '\n' + ind + '}';

  if (next === objSrc) { already++; return; }
  src = src.slice(0, objOpen) + next + src.slice(objClose + 1);
  rewritten++;
});

if (fails.length) { fails.forEach(f => console.log('  ✗ ' + f)); console.log('\nFAIL  rewrite'); process.exit(1); }

console.log('  ' + rewritten + ' key(s) rewritten, ' + already + ' already carried all ' + LOCALES.length + ' locales');

if (DRY) {
  console.log('\n(dry run — nothing written)');
  process.exit(0);
}
if (src !== ORIGINAL) fs.writeFileSync(TOOL, src, 'utf8');
else console.log('  file is byte-identical — nothing written (idempotent no-op)');

/* ---- 3. VERIFY EVERY WRITE LANDED -------------------------------- */
/* ⚠ from DISK, with the cache busted. Comparing the in-memory object we
   just built against the object we built it from is a gate marking its
   own homework. */
delete require.cache[require.resolve(TOOL)];
const after = require(TOOL).strings;

const orderBefore = KEYS.join('|');
const orderAfter = Object.keys(after).join('|');
if (orderBefore !== orderAfter) bad('⚠⚠ KEY ORDER CHANGED\n     was: ' + orderBefore + '\n     now: ' + orderAfter);

/* the panel files themselves, if they survived */
let panelFiles = null;
try {
  panelFiles = {};
  LOCALES.forEach(function (L) {
    const p = path.join(PANEL_DIR, 'mq-' + L + '.js');
    if (!fs.existsSync(p)) throw new Error('absent');
    panelFiles[L] = require(p);
  });
} catch (e) { panelFiles = null; }
console.log('  cross-check against the raw panel files: ' +
  (panelFiles ? 'ON (' + PANEL_DIR + ')' : 'OFF — they are no longer on disk; _missing-question-strings.js is the only source'));

let checked = 0;
KEYS.forEach(function (k) {
  const v = after[k];
  if (!v || typeof v !== 'object') { bad('⚠⚠ `' + k + '` is no longer a per-locale object — the shell would render the KEY'); return; }

  checked++;
  if (v.en !== enBefore[k]) bad('⚠⚠ `' + k + '`.en CHANGED\n     was: ' + JSON.stringify(enBefore[k]) + '\n     now: ' + JSON.stringify(v.en));

  const enTok = tokens(v.en);
  LOCALES.forEach(function (L) {
    checked++;
    const want = PANELS[L][k];
    if (v[L] !== want) {
      bad('⚠⚠ ' + L + '.' + k + ' DID NOT LAND\n     want: ' + JSON.stringify(want) + '\n     got : ' + JSON.stringify(v[L]));
      return;
    }
    if (panelFiles) {
      checked++;
      if (panelFiles[L][k] !== want) bad('⚠⚠ ' + L + '.' + k + ': _missing-question-strings.js has DRIFTED from the panel file\n     panel: ' +
        JSON.stringify(panelFiles[L][k]) + '\n     file : ' + JSON.stringify(want));
    }
    checked++;
    if (tokens(v[L]) !== enTok) bad('⚠ ' + L + '.' + k + ': placeholder set is ' + (tokens(v[L]) || '(none)') +
      ', English carries ' + (enTok || '(none)') + ' — a token the paint supplies has been dropped or invented');
  });

  Object.keys(v).forEach(function (L) {
    if (L !== 'en' && LOCALES.indexOf(L) < 0) bad('⚠ `' + k + '` carries an unknown locale `' + L + '`');
  });
  checked++;
  if (Object.keys(v).length !== LOCALES.length + 1) bad('⚠⚠ `' + k + '` carries ' + Object.keys(v).length +
    ' locales, expected ' + (LOCALES.length + 1));
});

/* non-vacuity: a verifier that checked nothing must not report success */
if (checked < KEYS.length * LOCALES.length) bad('⚠⚠ NON-VACUITY: only ' + checked + ' comparisons were made across ' +
  KEYS.length + ' keys × ' + LOCALES.length + ' locales — the verifier did not run');

console.log('  ' + checked + ' comparisons, ' + fails.length + ' failures');
if (fails.length) {
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  console.log('\nFAIL  the rewrite did NOT land cleanly — the tool on disk does not match the panels');
  process.exit(1);
}
console.log('\nPASS  every key carries all eleven locales, verbatim from the panels');
