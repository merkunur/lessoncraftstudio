#!/usr/bin/env node
/**
 * Writes the page text of the three information-text pages (types/_shared/info-text.js; English literacy year,
 * 2026-11-15) into i18n/strings.en.json (title and the instruction of level 2) and i18n/level-instructions.json (the
 * instructions of levels 1 and 3). English only: the texts are English texts. Run again after a wording change; it
 * replaces its own entries and touches no other.
 *
 *   node tools/level-set/apply-info-text-strings.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', '..', 'i18n');
const CHECK = process.argv.includes('--check');

const TEXT = {
  'G1-575': {
    title: 'Read the Facts',
    1: 'Read the text. Circle the answer to each question.',
    2: 'Read the text. Write the answer to each question. Finish the sentence.',
    3: 'Read the text. Write the answer to each question. Then underline the sentence in the text that tells you the answer.',
  },
  'G1-576': {
    title: 'Main Topic and Key Details',
    1: 'Read the text. Circle what the text is mostly about. Then copy one key detail from the text.',
    2: 'Read the text. Write the main topic. Then write two key details from the text.',
    3: 'Read the text. Write the main topic. Then write three key details in your own words.',
  },
  'G1-577': {
    title: 'Use the Text Features',
    1: 'Read the text. Use the headings, the bold words, the caption, and the glossary. Circle each answer.',
    2: 'Read the text. Use the headings, the bold words, the caption, and the glossary to write each answer.',
    3: 'Read the text. Use the headings, the bold words, the caption, and the glossary to write each answer. Then write a caption for the second picture.',
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
const b = edit(path.join(I18N, 'level-instructions.json'), (j) => { for (const [id, t] of Object.entries(TEXT)) j[id] = { 1: { en: t[1] }, 3: { en: t[3] } }; });
if (CHECK && (a || b)) { console.error('info-text strings: the i18n files do not hold the text of this script'); process.exit(1); }
console.log('info-text strings: ' + (a || b ? 'written' : 'already there') + ' (' + Object.keys(TEXT).join(', ') + ')');
