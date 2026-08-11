/* =====================================================================
   _pgt-fold-locales.js — fold the ten native panels' output into
   `mini tools/pair-gate.js`, by LINE SURGERY inside each key's block so
   the strings comments survive.

   Inputs: <scratch>/pgt-locales/<loc>.json, each shaped
     { locale, strings: {15 keys}, corrections?: {key: text},
       sheetNote?: "final", landing: {...}, card: {...} }
   (the follow-up runs updated the files in place; top-level
   `corrections` overlays KEPT keys, and a top-level `sheetNote`, when
   present, is the FINAL sheetNote superseding strings.sheetNote).

   ⚠ EVERY anchor miss THROWS. A fold that silently skips a locale is
   how a stale string ships under a green gate.
   ⚠ Token parity is checked against the EN of each key BEFORE writing.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'mini tools', 'pair-gate.js');
const SCRATCH = process.argv[2];
if (!SCRATCH) { console.log('usage: node _pgt-fold-locales.js <dir-with-locale-jsons>'); process.exit(1); }

const LOCS = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NEW_KEYS = ['sizeAsk', 'sizeChip', 'predAsk', 'predChip', 'saidParade', 'saidPredN',
  'saidPred2', 'saidPredSill', 'saidSecondClear', 'saidMarchOn', 'saidSecondHere',
  'saidChooseFirst', 'printAsk'];
const REPLACED_KEYS = ['instruction', 'sheetNote'];

let src = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
const T = require(SRC);

function esc(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
/* a SET, not a multiset — "de {k} en {k}" repeats a token legitimately,
   and _fmt replaces every occurrence */
function tokensOf(s) {
  const seen = {};
  (String(s).match(/\{\w+\}/g) || []).forEach(t => { seen[t] = 1; });
  return Object.keys(seen).sort().join(',');
}

/* find the block for `key` and return [start, end) of its inner body */
function blockOf(key) {
  const anchor = '      ' + key + ': {\n';
  const at = src.indexOf(anchor);
  if (at === -1) throw new Error('no block for `' + key + '`');
  if (src.indexOf(anchor, at + 1) !== -1) throw new Error('`' + key + '` anchors twice');
  const bodyStart = at + anchor.length;
  const end = src.indexOf('\n      }', bodyStart);
  if (end === -1) throw new Error('`' + key + '` block unterminated');
  return [bodyStart, end];
}

/* set strings[key][loc] = text by line surgery */
function setLocale(key, loc, text) {
  const en = T.strings[key] && T.strings[key].en;
  if (!en) throw new Error('key `' + key + '` has no EN — refusing to fold');
  if (!text || typeof text !== 'string') throw new Error(key + '.' + loc + ' is empty');
  if (tokensOf(text) !== tokensOf(en)) {
    throw new Error('token mismatch on ' + key + '.' + loc + ': [' + tokensOf(text) + '] vs EN [' + tokensOf(en) + ']');
  }
  const [s, e] = blockOf(key);
  const body = src.slice(s, e);
  const lineRe = new RegExp('^(\\s+)' + loc + ": '((?:[^'\\\\]|\\\\.)*)'(,?)$", 'm');
  const m = body.match(lineRe);
  let newBody;
  if (m) {
    newBody = body.replace(lineRe, m[1] + loc + ": '" + esc(text) + "'" + m[3]);
  } else {
    /* append after the last line; keep comma discipline */
    const lines = body.split('\n');
    let last = lines.length - 1;
    while (last >= 0 && !lines[last].trim()) last--;
    if (last < 0) throw new Error(key + ' has an empty body');
    if (!/,$/.test(lines[last])) lines[last] += ',';
    const indent = (lines[last].match(/^\s*/) || ['        '])[0];
    lines.splice(last + 1, 0, indent + loc + ": '" + esc(text) + "'");
    newBody = lines.join('\n');
  }
  src = src.slice(0, s) + newBody + src.slice(e);
}

let folded = 0;
for (const loc of LOCS) {
  const fp = path.join(SCRATCH, loc + '.json');
  if (!fs.existsSync(fp)) throw new Error('missing panel file ' + fp);
  const j = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (!j.strings) throw new Error(loc + ': no strings block');
  for (const k of NEW_KEYS.concat(REPLACED_KEYS)) {
    if (!j.strings[k]) throw new Error(loc + ': panel missing `' + k + '`');
    setLocale(k, loc, j.strings[k]); folded++;
  }
  /* the follow-up's FINAL sheetNote supersedes strings.sheetNote */
  if (j.sheetNote && typeof j.sheetNote === 'string') { setLocale('sheetNote', loc, j.sheetNote); }
  const corr = j.corrections || {};
  for (const k of Object.keys(corr)) {
    if (k.charAt(0) === '_') continue;               /* audit notes ride along */
    if (!T.strings[k]) throw new Error(loc + ': correction for unknown key `' + k + '`');
    setLocale(k, loc, corr[k]); folded++;
  }
}

fs.writeFileSync(SRC, src, 'utf8');
console.log('folded ' + folded + ' locale strings into pair-gate.js');
