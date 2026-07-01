#!/usr/bin/env node
/* =====================================================================
   gen-sep-fixtures.js — hand-authored "Storybook Exercise Package" (sep-1)
   fixtures proving the worksheet-generator bridge INGESTION side.

   These stand in for what the generators' future exportStorybookExercise
   helper will emit (docs/storybook/sep-format.md): a transparent-alpha
   visual + a machine-readable interaction descriptor, all rects in
   crop space, top-left convention.

   Fixture 1 — Family A (tap-letter): spell CAT under a cat picture.
   Fixture 2 — Family F (drag):      2×2 fruit board; faint baked hints,
                                      drag the matching fruit tile in.

   Library images composited from image-library-webp (lossless-equivalent
   @2x lossy is fine for fixtures).

   USAGE: node scripts/storybook/gen-sep-fixtures.js --story pips-picnic
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const arg = (k, d) => {
  const eq = process.argv.find(a => a.startsWith('--' + k + '='));
  if (eq) return eq.split('=').slice(1).join('=');
  const i = process.argv.indexOf('--' + k);
  if (i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')) return process.argv[i + 1];
  return d;
};
const STORY = arg('story', 'pips-picnic');
const REPO = path.join(__dirname, '..', '..');
const LIB = p => path.join(REPO, 'image-library-webp', 'themes', p);
const OUT = id => path.join(REPO, 'mini tools', 'stories', STORY, 'exercises', id);

async function libPng(rel, size) {
  return sharp(LIB(rel)).resize(size, size, { fit: 'inside' }).png().toBuffer();
}
function box(w, h, r, stroke, dash) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
       <rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="${r}"
             fill="rgba(255,255,255,.72)" stroke="${stroke}" stroke-width="6"
             ${dash ? 'stroke-dasharray="14 10"' : ''}/>
     </svg>`);
}

/* -------- Fixture 1: Family A — spell CAT (crop 600×560) -------- */
async function familyA() {
  const dir = OUT('word-cat');
  fs.mkdirSync(dir, { recursive: true });
  const W = 600, H = 560;
  const cat = await libPng('animals/cat@2x.webp', 300);
  const catMeta = await sharp(cat).metadata();
  const slots = [
    { x: 90, y: 400, w: 120, h: 130 },
    { x: 240, y: 400, w: 120, h: 130 },
    { x: 390, y: 400, w: 120, h: 130 }
  ];
  const comps = [{ input: cat, left: Math.round((W - catMeta.width) / 2), top: 30 }];
  for (const s of slots) {
    comps.push({ input: box(s.w, s.h, 14, '#146B5E', true), left: s.x, top: s.y });
  }
  /* @2x visual */
  await sharp({ create: { width: W * 2, height: H * 2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(await Promise.all(comps.map(async c => ({
      input: await sharp(c.input).resize(null, null).metadata().then(m =>
        sharp(c.input).resize(m.width * 2).png().toBuffer()),
      left: c.left * 2, top: c.top * 2
    }))))
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(path.join(dir, 'visual@2x.webp'));

  const descriptor = {
    formatVersion: 'sep-1',
    appType: 'word-guess',
    family: 'A',
    sourceBundleVersion: 'fixture-hand-authored',
    createdAt: '2026-07-01T00:00:00Z',
    meta: { exerciseTypeSlug: 'word-guess', exerciseMode: null, theme: 'animals', ageBand: '5-7', contentLanguage: 'en' },
    page: { width: W, height: H },
    crop: { x: 0, y: 0, w: W, h: H, pad: 0 },
    visual: { file: 'visual@2x.webp', format: 'webp', scale: 2, width: W * 2, height: H * 2 },
    input: {
      policy: 'tap-palette',
      tapPalette: { case: 'upper', letters: ['A', 'B', 'C', 'M', 'S', 'T'], distractorCount: 3 }
    },
    elements: {
      slots: [
        { id: 's0', problemIndex: 0, wordIndex: 0, letterIndex: 0, expected: 'C', rect: slots[0] },
        { id: 's1', problemIndex: 0, wordIndex: 0, letterIndex: 1, expected: 'A', rect: slots[1] },
        { id: 's2', problemIndex: 0, wordIndex: 0, letterIndex: 2, expected: 'T', rect: slots[2] }
      ]
    },
    imageRefs: {},
    loadingMode: 'reference',
    locales: {
      en: { prompt: 'Spell the word!', success: 'You spelled it!', tryAgain: 'Try again!', hint: 'It says meow.' }
    },
    audio: { speakPromptOnMount: false, perElement: 'letter' }
  };
  fs.writeFileSync(path.join(dir, 'descriptor.json'), JSON.stringify(descriptor, null, 2));
  console.log('[sep] word-cat (Family A) written');
}

/* -------- Fixture 2: Family F — fruit board (crop 640×420) -------- */
async function familyF() {
  const dir = OUT('fruit-board');
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });
  const W = 640, H = 460;
  const CELL = 150;
  const cells = [
    { index: 0, row: 0, col: 0, isClue: true, rect: { x: 40, y: 40, w: CELL, h: CELL } },
    { index: 1, row: 0, col: 1, isClue: false, rect: { x: 210, y: 40, w: CELL, h: CELL } },
    { index: 2, row: 1, col: 0, isClue: false, rect: { x: 40, y: 210, w: CELL, h: CELL } },
    { index: 3, row: 1, col: 1, isClue: false, rect: { x: 210, y: 210, w: CELL, h: CELL } }
  ];
  const tiles = [
    { paletteNumber: 1, originalCellIndex: 1, rect: { x: 460, y: 20, w: 130, h: 130 }, revealFile: 'assets/reveal-1.webp', img: 'fruits/banana@2x.webp' },
    { paletteNumber: 2, originalCellIndex: 2, rect: { x: 460, y: 165, w: 130, h: 130 }, revealFile: 'assets/reveal-2.webp', img: 'fruits/grapefruit@2x.webp' },
    { paletteNumber: 3, originalCellIndex: 3, rect: { x: 460, y: 310, w: 130, h: 130 }, revealFile: 'assets/reveal-3.webp', img: 'fruits/apple@2x.webp' }
  ];

  const apple = await libPng('fruits/apple@2x.webp', 130);
  const comps = [];
  for (const c of cells) {
    comps.push({ input: box(c.rect.w, c.rect.h, 10, c.isClue ? '#146B5E' : '#8a6d5c', !c.isClue), left: c.rect.x, top: c.rect.y });
  }
  /* clue cell: baked apple */
  comps.push({ input: apple, left: cells[0].rect.x + 10, top: cells[0].rect.y + 10 });
  /* faint baked hints in fillable cells (25% alpha) */
  for (const t of tiles) {
    const cell = cells.find(c => c.index === t.originalCellIndex);
    const hint = await sharp(await libPng(t.img, 120))
      .composite([{ input: Buffer.from([0, 0, 0, 64]), raw: { width: 1, height: 1, channels: 4 }, tile: true, blend: 'dest-in' }])
      .png().toBuffer();
    comps.push({ input: hint, left: cell.rect.x + 15, top: cell.rect.y + 15 });
    /* reveal file */
    await sharp(await libPng(t.img, 260)).webp({ quality: 85, alphaQuality: 100 })
      .toFile(path.join(dir, t.revealFile));
  }

  await sharp({ create: { width: W * 2, height: H * 2, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(await Promise.all(comps.map(async c => ({
      input: await sharp(c.input).metadata().then(m => sharp(c.input).resize(m.width * 2).png().toBuffer()),
      left: c.left * 2, top: c.top * 2
    }))))
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(path.join(dir, 'visual@2x.webp'));

  const descriptor = {
    formatVersion: 'sep-1',
    appType: 'grid-match',
    family: 'F',
    sourceBundleVersion: 'fixture-hand-authored',
    createdAt: '2026-07-01T00:00:00Z',
    meta: { exerciseTypeSlug: 'grid-match', exerciseMode: null, theme: 'fruits', ageBand: '5-7', contentLanguage: 'en' },
    page: { width: W, height: H },
    crop: { x: 0, y: 0, w: W, h: H, pad: 0 },
    visual: { file: 'visual@2x.webp', format: 'webp', scale: 2, width: W * 2, height: H * 2 },
    input: { policy: 'drag' },
    elements: {
      gridDims: { rows: 2, cols: 2 },
      gridCells: cells.map(c => ({ index: c.index, row: c.row, col: c.col, isClue: c.isClue, rect: c.rect })),
      paletteTiles: tiles.map(t => ({ paletteNumber: t.paletteNumber, originalCellIndex: t.originalCellIndex, rect: t.rect, revealFile: t.revealFile })),
      solutionLabels: { 1: 1, 2: 2, 3: 3 }
    },
    imageRefs: {},
    loadingMode: 'reference',
    locales: {
      en: { prompt: 'Drag each fruit to its shadow!', success: 'The board is full!', tryAgain: 'Try again!', hint: null }
    },
    audio: { speakPromptOnMount: false, perElement: null }
  };
  fs.writeFileSync(path.join(dir, 'descriptor.json'), JSON.stringify(descriptor, null, 2));
  console.log('[sep] fruit-board (Family F) written');
}

(async () => {
  await familyA();
  await familyF();
  console.log('[sep] fixtures at mini tools/stories/' + STORY + '/exercises/');
})().catch(e => { console.error('[sep] FAIL: ' + e.message); process.exit(1); });
