#!/usr/bin/env node
/**
 * Writes the page text of the information-text pages (types/_shared/info-text.js; English literacy year,
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
  'G1-578': {
    title: 'Name the Text Features',
    1: "Look at the text. Each numbered dot is on one part of the text. Write the dot's number in the box next to the name of that part.",
    2: "Look at the text. Each numbered dot is on one part of the text. Write the dot's number in the box next to the name of that part.",
    3: "Look at the text. Each numbered dot is on one part of the text. Write the dot's number in the box next to the name of that part. Then read each job and write the number of the part that does it.",
  },
  'G2-519': {
    title: "Main Topic and Paragraphs",
    1: "Read the text. Circle the main topic. Then write the number of the paragraph next to what it is mostly about.",
    2: "Read the text. Write the main topic of the whole text. Then write what each paragraph is mostly about.",
    3: "Read the text. Write the main topic. Then write a heading for each paragraph and what the paragraph is mostly about.",
  },
  'G2-520': {
    title: "Glossary and Index",
    1: "Read the text. Use the headings, the bold words, the captions, the glossary, and the index. Circle each answer.",
    2: "Read the text. Use the headings, the bold words, the captions, the glossary, and the index to write each answer.",
    3: "Read the text. Use the text features to write each answer. Then add a word to the index and a word to the glossary.",
  },
  'G2-521': {
    title: "What the Diagram Shows",
    1: "Read the text and study the diagram. Circle each answer. Questions 1 to 4 ask about the diagram. Question 5 asks about the text and the diagram.",
    2: "Read the text and study the diagram. Write each answer. Questions 1 to 3 ask about the diagram. Questions 4 and 5 ask about the text and the diagram.",
    3: "Read the text and study the diagram. One label and one arrow are missing. Add them. Then write each answer.",
  },
  'G2-522': {
    title: "Steps in Order",
    1: "Read the text. Put the four steps in order. Then circle each answer.",
    2: "Read the text. Write the four steps in order. The first word of each step is given.",
    3: "Read the text. Write the four steps in order. Use the words first, next, then, and finally. Then answer the question.",
  },
  'G2-523': {
    title: "Name the Text Features",
    1: "Each dot with a letter is on one part of the text. Write the letter of the dot next to the name of the part. Then write the letter of the part that does each job.",
    2: "Each dot with a letter is on one part of the text. Write the letter of the dot next to the name of the part. Then write the letter of the part that does each job.",
    3: "Each dot with a letter is on one part of the text. Write the letter of the dot next to the name of the part. Then write the name of the part that does each job.",
  },
  'G2-524': {
    title: "Text or Diagram?",
    1: "Read the text and study the diagram. Where do you learn each fact? Make a check mark under \"in the text\" or under \"in the diagram.\"",
    2: "Read the text and study the diagram. Where do you learn each fact? Make a check mark under \"in the text\" or under \"in the diagram.\"",
    3: "Read the text and study the diagram. Make a check mark under \"in the text\" or under \"in the diagram.\" Then write your answers.",
  },
  'G2-525': {
    title: "Before and After",
    1: "Read the text. Then read each sentence about two steps. Circle before or after.",
    2: "Read the text. Answer questions 1 and 2 with a whole sentence. Then write before or after.",
    3: "Read the text. Finish each sentence. Then write a sentence of your own.",
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
if (CHECK && (a || b)) { console.error('info-text strings: the i18n files do not hold the text of this script'); process.exit(1); }
console.log('info-text strings: ' + (a || b ? 'written' : 'already there') + ' (' + Object.keys(TEXT).join(', ') + ')');
