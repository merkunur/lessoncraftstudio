#!/usr/bin/env node
/**
 * render-exemplar.js — render ONE science/literacy exemplar to a PNG for the
 * Gate-2 design ruling, bypassing the wave/manifest/taxonomy scaffolding.
 *
 *   node scripts/worksheet-gen/tools/render-exemplar.js <exemplar-key> [difficulty] [locale]
 *
 * Writes out/exemplars/<key>-d<diff>-<locale>.png (+ .html) and prints QA.
 * Each exemplar wires a factory + curated data + EN strings inline below.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');

const { makeScienceCategorySort } = require('../types/_shared/science-category-sort.js');
const { makeScienceSequence } = require('../types/_shared/science-sequence.js');
const { makeSciencePairMatch } = require('../types/_shared/science-pair-match.js');
const { makeLitSoundMatch } = require('../types/_shared/lit-sound-match.js');
const { makeLitLetterKnowledge } = require('../types/_shared/lit-letter-knowledge.js');
const { makeLitWordBuild } = require('../types/_shared/lit-word-build.js');
const { makeLitVocabMatch } = require('../types/_shared/lit-vocab-match.js');

function loadData(rel) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', rel), 'utf8'));
}

// --- exemplar registry ---
const EXEMPLARS = {
  'animal-classification': () => ({
    spec: makeScienceCategorySort({
      id: 'SCI-EX-001', slug: 'animal-classification', gradeBand: 'K',
      exerciseType: 'science-sort',
      data: loadData('science/animal-classification.json'),
      i18n: { en: { title: 'Sort the Animals', instruction: 'Draw a line from each animal to the group it belongs to.' } },
    }),
  }),
  'chicken-life-cycle': () => ({
    spec: makeScienceSequence({
      id: 'SCI-EX-002', slug: 'chicken-life-cycle', gradeBand: 'K',
      exerciseType: 'science-sequence',
      data: loadData('science/chicken-life-cycle.json'),
      i18n: { en: { title: 'The Life Cycle of a Chicken', instruction: 'Write 1, 2, 3 to put the pictures in the right order.' } },
    }),
  }),
  'baby-animals': () => ({
    spec: makeSciencePairMatch({
      id: 'SCI-EX-003', slug: 'baby-animals', gradeBand: 'K',
      exerciseType: 'science-match',
      data: loadData('science/baby-animals.json'),
      i18n: { en: { title: 'Animal Babies', instruction: 'Draw a line from each grown-up animal to its baby.' } },
    }),
  }),
  'beginning-sounds': () => ({
    spec: makeLitSoundMatch({
      id: 'LIT-EX-001', slug: 'beginning-sounds', gradeBand: 'K',
      exerciseType: 'beginning-sounds', mode: 'beginning',
      data: loadData('literacy/beginning-sounds.json'),
      i18n: {
        en: { title: 'Beginning Sounds', instruction: 'Write the letter that each picture begins with.' },
        de: { title: 'Anlaute', instruction: 'Schreibe den Anlaut (Anfangsbuchstaben) zu jedem Bild.' },
      },
    }),
  }),
  'upper-lower': () => ({
    spec: makeLitLetterKnowledge({
      id: 'LIT-EX-002', slug: 'uppercase-lowercase', gradeBand: 'K',
      exerciseType: 'letter-knowledge', mode: 'upper-lower',
      data: loadData('literacy/letter-knowledge.json'),
      i18n: {
        en: { title: 'Capital & Small Letters', instruction: 'Draw a line from each capital letter to its small letter.' },
        de: { title: 'Groß- und Kleinbuchstaben', instruction: 'Verbinde jeden Großbuchstaben mit seinem Kleinbuchstaben.' },
      },
    }),
  }),
  'missing-alphabet': () => ({
    spec: makeLitLetterKnowledge({
      id: 'LIT-EX-003', slug: 'missing-letters-abc', gradeBand: 'K',
      exerciseType: 'letter-knowledge', mode: 'missing-alphabet',
      data: loadData('literacy/letter-knowledge.json'),
      i18n: {
        en: { title: 'Missing Letters', instruction: 'Write the missing letters to finish the alphabet.' },
        de: { title: 'Fehlende Buchstaben', instruction: 'Schreibe die fehlenden Buchstaben ins Alphabet.' },
      },
    }),
  }),
  'cvc-missing': () => ({
    spec: makeLitWordBuild({
      id: 'LIT-EX-004', slug: 'cvc-missing-letter', gradeBand: 'K',
      exerciseType: 'word-building', mode: 'cvc-missing',
      data: loadData('literacy/word-build.json'),
      i18n: {
        en: { title: 'Missing Sound', instruction: 'Write the missing letter to finish each word.' },
      },
    }),
  }),
  'word-picture': () => ({
    spec: makeLitVocabMatch({
      id: 'LIT-EX-005', slug: 'match-word-picture', gradeBand: 'K',
      exerciseType: 'picture-vocabulary', mode: 'word-picture',
      data: loadData('literacy/vocab-match.json'),
      i18n: {
        en: { title: 'Match Word to Picture', instruction: 'Draw a line from each word to the picture it names.' },
      },
    }),
  }),
  'find-letter': () => ({
    spec: makeLitLetterKnowledge({
      id: 'LIT-EX-006', slug: 'find-the-letter', gradeBand: 'K',
      exerciseType: 'letter-knowledge', mode: 'find-letter-grid',
      data: loadData('literacy/letter-knowledge.json'),
      i18n: { en: { title: 'Find the Letter', instruction: 'Circle every letter that matches the one in the box.' } },
    }),
  }),
  'vowel-consonant': () => ({
    spec: makeLitLetterKnowledge({
      id: 'LIT-EX-007', slug: 'vowels-and-consonants', gradeBand: 'K',
      exerciseType: 'letter-knowledge', mode: 'vowel-consonant',
      data: loadData('literacy/letter-knowledge.json'),
      i18n: { en: { title: 'Vowels and Consonants', instruction: 'Sort each letter into the vowels or the consonants.' } },
    }),
  }),
  'build-word': () => ({
    spec: makeLitWordBuild({
      id: 'LIT-EX-008', slug: 'build-the-word', gradeBand: 'K',
      exerciseType: 'word-building', mode: 'build-the-word',
      data: loadData('literacy/build-word.json'),
      i18n: { en: { title: 'Build the Word', instruction: 'Use the letters to build the word for each picture.' } },
    }),
  }),
};

async function main() {
  const key = process.argv[2];
  const difficulty = Number(process.argv[3] || 2);
  const locale = process.argv[4] || 'en';
  if (!EXEMPLARS[key]) {
    console.error('unknown exemplar: ' + key + '\n  known: ' + Object.keys(EXEMPLARS).join(', '));
    process.exit(2);
  }
  const { spec } = EXEMPLARS[key]();
  const outDir = path.join(__dirname, '..', 'out', 'exemplars');
  fs.mkdirSync(outDir, { recursive: true });
  const baseName = `${key}-d${difficulty}-${locale}`;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    const r = await renderInstance({
      type: spec, theme: null, difficulty, locale, variant: 1,
      page, outDir, baseName, seedEpoch: 1,
    });
    const fails = [].concat(r.qa.lints || [], r.qa.verify || []);
    console.log('PNG : ' + r.pngPath);
    console.log('PDF : ' + r.pdfPath);
    console.log('QA  : ' + (fails.length ? JSON.stringify(fails) : 'clean (0 lints, 0 verify fails)'));
    console.log('META: ' + JSON.stringify(r.meta));
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
