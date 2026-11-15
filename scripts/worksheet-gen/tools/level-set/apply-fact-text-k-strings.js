#!/usr/bin/env node
/**
 * Writes the page text of the two Kindergarten fact-text pages (types/_shared/fact-text-k.js; English literacy year,
 * 2026-11-15) into i18n/strings.en.json (title and the instruction of level 2) and i18n/level-instructions.json (the
 * instructions of levels 1 and 3). English only. Run again after a wording change; it replaces its own entries.
 *
 *   node tools/level-set/apply-fact-text-k-strings.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', '..', 'i18n');
const CHECK = process.argv.includes('--check');

const TEXT = {
  'K-645': {
    title: 'Find the Facts',
    1: 'Listen to the text and read along. Listen to each question. Circle the picture that answers it.',
    2: 'Listen to the text and read along. Listen to each question. Draw the answer in the box.',
    3: 'Listen to the text and read along. Draw the answer to each question. Then draw one more fact and ask your own question.',
  },
  'K-646': {
    title: 'What Is It All About?',
    1: 'Listen to the text and read along. Circle the picture that shows what the whole text is about. Then circle one thing the text tells about it.',
    2: 'Listen to the text and read along. Circle the picture that shows what the whole text is about. Then draw two things the text tells about it.',
    3: 'Listen to the text and read along. Circle the picture that shows what the whole text is about. Then draw two things the text tells about it and write a word for each.',
  },
};

function edit(file, fn) {
  const raw = fs.readFileSync(file, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const j = JSON.parse(raw);
  fn(j);
  const m = raw.match(/\n([ \t]+)"/);
  let out = JSON.stringify(j, null, m ? m[1].length : 2);
  if (eol === '\r\n') out = out.replace(/\n/g, '\r\n');
  if (/\r?\n$/.test(raw)) out += eol;
  if (out === raw) return false;
  if (!CHECK) fs.writeFileSync(file, out);
  return true;
}

const a = edit(path.join(I18N, 'strings.en.json'), (j) => { for (const [id, t] of Object.entries(TEXT)) j[id] = { title: t.title, instruction: t[2] }; });
const b = edit(path.join(I18N, 'level-instructions.json'), (j) => { for (const [id, t] of Object.entries(TEXT)) { const lv = {}; for (const n of [1, 3]) if (t[n] !== t[2]) lv[n] = { en: t[n] }; j[id] = lv; } });
if (CHECK && (a || b)) { console.error('fact-text-k strings: the i18n files do not hold the text of this script'); process.exit(1); }
console.log('fact-text-k strings: ' + (a || b ? 'written' : 'already there') + ' (' + Object.keys(TEXT).join(', ') + ')');
