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
