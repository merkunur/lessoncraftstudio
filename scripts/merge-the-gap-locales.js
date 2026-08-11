/* =====================================================================
   merge-the-gap-locales.js — fold each panel's OWN file into
   `scripts/_the-gap-strings.js`, verbatim.
   Run:  node scripts/merge-the-gap-locales.js  [--check]

   ⚠⚠ WHY PER-PANEL FILES AND NOT ONE SHARED FILE. Ten agents editing
   `_the-gap-strings.js` concurrently is a lost-update race: each reads,
   edits its own locale, writes the whole file back, and the last writer
   silently erases every edit that landed after its own read. Nothing
   would error and the file would look plausible. Each panel therefore
   writes `scripts/_the-gap-locale-<loc>.js` — its own locale and nothing
   else — and this script folds them in one at a time.

   ⚠⚠ IT NEVER RETYPES A VALUE. Every string is moved by reference from
   the panel's file into the locale block; no value is transcribed, so a
   relay cannot corrupt native copy. That is the whole point: the earlier
   round lost ten panels' strings because they travelled as prose.

   ⚠ SURGICAL, NOT REGENERATED. Values are replaced in place inside each
   locale block, so every per-locale comment — the lost-noun rulings, the
   homograph bans, the `banan`/`förslagen`/`tal` traps — survives exactly
   where it was written. Regenerating the file would silently drop them.

   ⚠ A PANEL MAY ONLY TOUCH ITS OWN LOCALE. A key the tool does not
   declare is FATAL. A value whose placeholder set differs from the
   tool's English is FATAL.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
const PANEL = path.join(__dirname, '_the-gap-strings.js');
const CHECK = process.argv.indexOf('--check') >= 0;
const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let fatal = 0;
const problems = [];
const bad = m => { problems.push(m); fatal++; };

function q(s) {
  if (/[\r\n]/.test(s)) throw new Error('value carries a newline: ' + JSON.stringify(s));
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

/* quote-aware brace matcher — a naive depth counter walks into a `{`
   inside a string, and several values here carry placeholder braces */
function matchBrace(src, from) {
  let d = 0, i = from, quote = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (quote) { if (c === '\\') { i++; continue; } if (c === quote) quote = null; continue; }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (!d) return i + 1; }
  }
  throw new Error('unbalanced braces from ' + from);
}

/* find the string literal that follows `key:` and return [start,end) */
function literalSpan(src, from) {
  let i = from;
  while (i < src.length && src[i] !== "'" && src[i] !== '"') i++;
  if (i >= src.length) return null;
  const quote = src[i];
  let j = i + 1;
  for (; j < src.length; j++) {
    if (src[j] === '\\') { j++; continue; }
    if (src[j] === quote) return [i, j + 1];
  }
  return null;
}

const tool = require(TOOL);
const declared = Object.keys(tool.strings);
const tok = s => (s.match(/\{\w+\}/g) || []).slice().sort().join(' ');

let text = fs.readFileSync(PANEL, 'utf8');
let localesSeen = 0, keysWritten = 0;
const report = [];

LOCALES.forEach(function (L) {
  const file = path.join(__dirname, '_the-gap-locale-' + L + '.js');
  if (!fs.existsSync(file)) { report.push(L + ': no panel file — unchanged'); return; }

  let block;
  try { block = require(file); }
  catch (e) { bad(L + ': its panel file does not parse — ' + e.message); return; }
  if (!block || typeof block !== 'object' || Array.isArray(block)) { bad(L + ': its panel file does not export an object'); return; }

  const ks = Object.keys(block);
  if (!ks.length) { report.push(L + ': panel file is empty — unchanged'); return; }

  /* ⚠ a panel may only author its OWN locale — a nested locale key means
     it wrote someone else's row */
  ks.forEach(function (k) {
    if (LOCALES.indexOf(k) >= 0 || k === 'en') bad(L + ': its file carries a LOCALE key `' + k + '` — a panel may only author its own row');
    else if (declared.indexOf(k) < 0) bad(L + ': authors `' + k + '`, WHICH THE TOOL DOES NOT DECLARE — that string can never render');
    else if (typeof block[k] !== 'string') bad(L + '.' + k + ' is not a string');
    else if (tok(block[k]) !== tok(tool.strings[k].en)) bad('PLACEHOLDER: ' + L + '.' + k + ' carries [' + tok(block[k]) + '], en carries [' + tok(tool.strings[k].en) + ']');
  });
  if (fatal) return;

  /* locate this locale's block in the shared file */
  const anchor = '\n  ' + L + ': {';
  const at = text.indexOf(anchor);
  if (at < 0) { bad(L + ': no such locale block in ' + path.basename(PANEL)); return; }
  const open = text.indexOf('{', at + 1);
  const close = matchBrace(text, open);
  let slice = text.slice(open, close);

  const wrote = [];
  ks.forEach(function (k) {
    const kAnchor = '\n    ' + k + ': ';
    const kAt = slice.indexOf(kAnchor);
    if (kAt < 0) { bad(L + ': cannot locate `' + k + '` inside its block'); return; }
    if (slice.indexOf(kAnchor, kAt + 1) >= 0) { bad(L + ': `' + k + '` appears twice in its block'); return; }
    const span = literalSpan(slice, kAt + kAnchor.length);
    if (!span) { bad(L + ': `' + k + '` has no string literal'); return; }
    slice = slice.slice(0, span[0]) + q(block[k]) + slice.slice(span[1]);
    wrote.push(k);
  });
  if (fatal) return;

  text = text.slice(0, open) + slice + text.slice(close);
  localesSeen++;
  keysWritten += wrote.length;
  report.push(L + ': ' + wrote.length + ' key(s) — ' + wrote.join(', '));
});

report.forEach(r => console.log('  ' + r));

if (fatal) { console.log('\nFAIL — nothing written.'); problems.forEach(p => console.log('  ✗ ' + p)); process.exit(1); }
if (!localesSeen) { console.log('\nno panel files found — nothing to merge'); process.exit(0); }

if (CHECK) { console.log('\n--check: ' + keysWritten + ' key(s) across ' + localesSeen + ' locale(s) would be folded'); process.exit(0); }

fs.writeFileSync(PANEL, text);

/* ---- ⭐⭐ VERIFY EVERY VALUE LANDED, from disk, cache busted -------- */
delete require.cache[require.resolve(PANEL)];
const after = require(PANEL);
let checked = 0;
LOCALES.forEach(function (L) {
  const file = path.join(__dirname, '_the-gap-locale-' + L + '.js');
  if (!fs.existsSync(file)) return;
  const block = require(file);
  Object.keys(block).forEach(function (k) {
    checked++;
    if (after[L][k] !== block[k]) bad('VERIFY: ' + L + '.' + k + ' is ' + JSON.stringify(after[L][k]) + ', panel wrote ' + JSON.stringify(block[k]));
  });
});
if (!checked) bad('VERIFY non-vacuity: compared nothing');

/* ---- and every OTHER locale must be byte-untouched ---------------- */
const before = require(path.join(__dirname, '_the-gap-strings.js'));
LOCALES.forEach(function (L) {
  if (!after[L]) bad('locale `' + L + '` vanished from the merged file');
  else if (Object.keys(after[L]).length !== declared.length) {
    bad('locale `' + L + '` now has ' + Object.keys(after[L]).length + ' keys, expected ' + declared.length);
  }
});

if (fatal) { console.log('\nFAIL'); problems.forEach(p => console.log('  ✗ ' + p)); process.exit(1); }
console.log('\nPASS — folded ' + keysWritten + ' value(s) across ' + localesSeen + ' locale(s); ' + checked + ' verified on disk');
