#!/usr/bin/env node
/**
 * Corrects the sentences that say playing, printing or downloading needs no account (no-account-lib.js: the OPEN
 * ones), by the rewrite rules of no-account-rules.js. A rule takes the claim OUT of its sentence, or says what is
 * true ("with a free account"); it never writes a new claim.
 *
 *   node scripts/teacher-gate/fix-no-account.js [--locs=de,fr]            dry run: what would change, what is left
 *   node scripts/teacher-gate/fix-no-account.js --pairs=<file>             the before/after of every changed sentence (JSON), for the native reader
 *   node scripts/teacher-gate/fix-no-account.js --write                    change the files
 *
 * A file is changed in its own text: the old sentence is replaced where it stands (JSON-encoded as the file has it),
 * so a file keeps its formatting and only the corrected sentences show in a diff. A sentence the rules leave
 * unchanged, or that still says it after them, is LEFT and listed: it needs a rule or a line in no-account-keep.json.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const L = require('./no-account-lib.js');
const RULES = require('./no-account-rules.js');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const LOCS = arg('locs', L.LOCALES.join(',')).split(',');
const WRITE = process.argv.includes('--write');

const compiled = {};
for (const loc of LOCS) compiled[loc] = (RULES[loc] || []).map(([re, to]) => [new RegExp(re instanceof RegExp ? re.source : re, 'gu' + (re instanceof RegExp && re.flags.includes('i') ? 'i' : '')), to]);
/** the sentence after the rules of its language */
const fix = (loc, text) => {
  let t = text;
  for (let pass = 0; pass < 3; pass++) { const was = t; for (const [re, to] of compiled[loc]) t = t.replace(re, to); if (t === was) break; }
  // what a cut can leave behind: two spaces, a space before a full stop or a comma, a space at the end. NOT a space
  // before ; : ! ? — French sets one there on purpose ("en ligne : ajouter"); the first version of this step took
  // them out of 84 French descriptions (seen on the live pages the same day, restored).
  return t === text ? t : t.replace(/ {2,}/g, ' ').replace(/ ([.,])/g, '$1').replace(/ +$/, '');
};

const pairs = [], left = [];
const open = L.collect(LOCS).filter((h) => h.cls === 'open');
const byFile = new Map();
for (const h of open) { const a = byFile.get(h.file) || []; a.push(h); byFile.set(h.file, a); }
let files = 0;
for (const [file, hits] of byFile) {
  const abs = path.join(L.FRONT, file);
  let raw = fs.readFileSync(abs, 'utf8'); const before = raw;
  for (const h of hits) {
    // a line of code is read in every language (a Norwegian line also matches the Danish wording): all rules, then all patterns
    const code = !/.json$/.test(file);
    const after = code ? LOCS.reduce((t, l) => fix(l, t), h.text) : fix(h.loc, h.text);
    if (code && !raw.includes(h.text) && raw.includes(after) && after !== h.text) continue;      // the line was corrected under another language
    if (after === h.text || (code ? LOCS.some((l) => L.matches(l, after).length) : L.matches(h.loc, after).length)) { left.push(h); continue; }
    if (/\.json$/.test(file)) {
      // the sentence as the file writes it: JSON-encoded, with or without \u escapes for non-ASCII
      const enc = (s) => JSON.stringify(s).slice(1, -1);
      const esc = (s) => enc(s).replace(/[\u0080-￿]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
      const form = [enc, esc].find((f) => raw.includes('"' + f(h.text) + '"'));
      if (!form) { if ([enc, esc].some((f) => raw.includes('"' + f(after) + '"'))) { pairs.push({ loc: h.loc, file, key: h.key, before: h.text, after }); continue; }   // the same sentence stood earlier in the file: corrected with it
        left.push(Object.assign({ why: 'the sentence is not found in the file as written' }, h)); continue; }
      raw = raw.split('"' + form(h.text) + '"').join('"' + form(after) + '"');
    } else {
      if (!raw.includes(h.text)) { left.push(Object.assign({ why: 'the line is not found in the file' }, h)); continue; }
      raw = raw.split(h.text).join(after);
    }
    pairs.push({ loc: h.loc, file, key: h.key, before: h.text, after });
  }
  if (raw !== before) { files++; if (WRITE) fs.writeFileSync(abs, raw); }
}
if (arg('pairs', '')) fs.writeFileSync(arg('pairs', ''), JSON.stringify(pairs, null, 1));
const per = (list) => LOCS.map((l) => l + ' ' + list.filter((x) => x.loc === l).length).join(', ');
console.log((WRITE ? 'changed ' : 'would change ') + pairs.length + ' sentence(s) in ' + files + ' file(s): ' + per(pairs));
console.log('left ' + left.length + ': ' + per(left));
if (process.argv.includes('--left')) for (const h of left) { const m = L.matches(h.loc, h.text)[0]; console.log('  [' + h.loc + '] ' + h.file.replace(/^(messages|content)\//, '') + ' :: ' + h.key.slice(0, 40) + (h.why ? ' (' + h.why + ')' : '') + '\n      …' + h.text.slice(Math.max(0, m.index - 80), m.index + m[0].length + 60).replace(/\s+/g, ' ') + '…'); }
