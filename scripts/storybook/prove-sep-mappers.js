#!/usr/bin/env node
/* =====================================================================
   prove-sep-mappers.js — unit proof for the SEP FAMILY_MAPPERS that the
   headless app harness can't drive live (matching/E + find-and-count/C,
   whose apps stall on generateInitialWorksheet under the static-server
   emulation). Feeds each mapper a REAL-SHAPED extractDeckBundle (the exact
   field structure from REFERENCE APPS, verbatim per recon) through the
   ACTUAL serializer (LCSCatalogExport._sepMapForTest), assembles a sep-1
   descriptor + a real transparent visual (sharp), places it in a scratch
   story, and runs the REAL validate-story SEP rules → 0 errors.

   (A/word-guess + F/grid-match are proven LIVE end-to-end by
   prove-sep-export.js; this closes E + C against real bundle shapes + the
   real validator.)
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const sharp = require('sharp');
global.window = global;
require(path.join('..', '..', 'REFERENCE TRANSLATIONS', 'catalog-export.js'));
const LCS = global.LCSCatalogExport;

const REPO = path.join(__dirname, '..', '..');
const STORIES = path.join(REPO, 'mini tools', 'stories');
const STORY = 'sep-mapper-proof';
const fails = [];
function assert(ok, msg) { console.log((ok ? '  PASS  ' : '  FAIL  ') + msg); if (!ok) fails.push(msg); }

/* ---- real-shaped bundles (verbatim field structure from REFERENCE APPS) ---- */
/* A — word-guess.html extractDeckBundle (:4025): slots {expected, rect(CENTER-based)} + caseValue */
const bundleA = {
  appType: 'word-guess', bundleVersion: '13.2.0', contentLanguage: 'en', caseValue: 'upper',
  page: { width: 850, height: 1100 },
  slots: (function () {
    var out = [], word = 'CAT', y = 300;
    for (var i = 0; i < word.length; i++) out.push({ problemIndex: 0, wordIndex: 0, letterIndex: i,
      slotType: 'letter', kind: 'letter', expected: word[i], rect: { x: 200 + i * 120, y: y, w: 90, h: 100 } });
    return out;   /* rect.x/y are CENTER (word-guess convention) */
  })(),
  imagePlacements: [{ key: 'cat', theme: 'animals', rect: { x: 425, y: 150, w: 200, h: 160 } }],
  runtimeStrings: {}, seoMeta: { themeName: 'animals' }
};

/* F — grid-match.html extractDeckBundle (:3706): gridCells + paletteTiles + solutionLabels + paletteReveals */
var _revealDataUrl = null;   /* filled in main() with a real tiny webp */
function bundleF() {
  return {
    appType: 'grid-match', bundleVersion: '22.5.0', contentLanguage: 'en',
    page: { width: 850, height: 1100 }, gridDims: { rows: 2, cols: 2 },
    gridCells: [
      { index: 0, row: 0, col: 0, isClue: true, rect: { x: 120, y: 200, w: 150, h: 150 } },
      { index: 1, row: 0, col: 1, isClue: false, rect: { x: 290, y: 200, w: 150, h: 150 } },
      { index: 2, row: 1, col: 0, isClue: false, rect: { x: 120, y: 370, w: 150, h: 150 } },
      { index: 3, row: 1, col: 1, isClue: false, rect: { x: 290, y: 370, w: 150, h: 150 } }
    ],
    paletteTiles: [
      { paletteNumber: 1, originalCellIndex: 1, rect: { x: 540, y: 210, w: 130, h: 130 } },
      { paletteNumber: 2, originalCellIndex: 2, rect: { x: 540, y: 350, w: 130, h: 130 } },
      { paletteNumber: 3, originalCellIndex: 3, rect: { x: 540, y: 490, w: 130, h: 130 } }
    ],
    solutionLabels: { 1: 1, 2: 2, 3: 3 },
    paletteReveals: [
      { paletteNumber: 1, imgDataUrl: _revealDataUrl },
      { paletteNumber: 2, imgDataUrl: _revealDataUrl },
      { paletteNumber: 3, imgDataUrl: _revealDataUrl }
    ],
    runtimeStrings: {}, seoMeta: { themeName: 'animals' }
  };
}

/* E — matching.html extractDeckBundle (:3896): leftItems/rightItems {index,x,y,w,h,anchorX,anchorY} + pairs */
const bundleE = {
  appType: 'matching', bundleVersion: '21.2.0', contentLanguage: 'en',
  page: { width: 850, height: 1100 }, mode: 'imgname',
  leftItems: [
    { index: 0, x: 90, y: 200, w: 150, h: 120, anchorX: 245, anchorY: 260 },
    { index: 1, x: 90, y: 360, w: 150, h: 120, anchorX: 245, anchorY: 420 },
    { index: 2, x: 90, y: 520, w: 150, h: 120, anchorX: 245, anchorY: 580 }
  ],
  rightItems: [
    { index: 0, x: 560, y: 220, w: 150, h: 90, anchorX: 555, anchorY: 265 },
    { index: 1, x: 560, y: 380, w: 150, h: 90, anchorX: 555, anchorY: 425 },
    { index: 2, x: 560, y: 540, w: 150, h: 90, anchorX: 555, anchorY: 585 }
  ],
  pairs: [
    { leftIndex: 0, correctRightIndex: 2, acceptableRightIndices: [2] },
    { leftIndex: 1, correctRightIndex: 0, acceptableRightIndices: [0] },
    { leftIndex: 2, correctRightIndex: 1, acceptableRightIndices: [1] }
  ],
  runtimeStrings: {}, seoMeta: { themeName: 'animals' }
};

/* C — find-and-count.html extractDeckBundle (:4786): gridRect + gridDims + cells + targets + inputSlots */
const bundleC = {
  appType: 'find-and-count', bundleVersion: '19.3.0', contentLanguage: 'en',
  page: { width: 850, height: 1100 },
  gridRect: { x: 80, y: 180, w: 560, h: 560 },
  gridDims: { rows: 3, cols: 3, cellSize: 170, cellGap: 25 },
  cells: [
    { row: 0, col: 0, key: 'apple', isTarget: true }, { row: 0, col: 1, key: 'banana', isTarget: false }, { row: 0, col: 2, key: 'apple', isTarget: true },
    { row: 1, col: 0, key: 'hat', isTarget: false }, { row: 1, col: 1, key: 'apple', isTarget: true }, { row: 1, col: 2, key: 'banana', isTarget: false },
    { row: 2, col: 0, key: 'apple', isTarget: true }, { row: 2, col: 1, key: 'hat', isTarget: false }, { row: 2, col: 2, key: 'banana', isTarget: false }
  ],
  targets: [{ key: 'apple', totalCount: 4 }],
  inputSlots: [{ key: 'apple', rect: { x: 690, y: 320, w: 120, h: 90 } }],
  runtimeStrings: {}, seoMeta: { themeName: 'animals' }
};

async function buildPackage(family, bundle) {
  const crop = LCS._sepDefaultCropForTest(bundle, family);
  const pad = 16;
  const c = {
    x: Math.max(0, Math.round(crop.x - pad)), y: Math.max(0, Math.round(crop.y - pad)),
    w: Math.round(crop.w + pad * 2), h: Math.round(crop.h + pad * 2)
  };
  c.w = Math.min(c.w, bundle.page.width - c.x); c.h = Math.min(c.h, bundle.page.height - c.y);
  const mapped = LCS._sepMapForTest(family, bundle, c);
  /* a real transparent-alpha visual at crop×2 (sharp — stands in for the
     browser toDataURL crop; the descriptor's geometry is the real mapper output) */
  const vw = c.w * 2, vh = c.h * 2;
  const dir = path.join(STORIES, STORY, 'exercises', family.toLowerCase() + '-ex');
  fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });
  await sharp({ create: { width: vw, height: vh, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${vw}" height="${vh}"><rect x="2" y="2" width="${vw - 4}" height="${vh - 4}" fill="rgba(255,255,255,0.4)" stroke="#146B5E" stroke-width="4"/></svg>`), top: 0, left: 0 }])
    .webp({ quality: 88, alphaQuality: 100 }).toFile(path.join(dir, 'visual@2x.webp'));
  /* Family F reveal assets: the mapper splits paletteReveals → assets{rel:dataUrl} */
  if (mapped.assets) {
    for (const rel of Object.keys(mapped.assets)) {
      const b64 = mapped.assets[rel].split(',')[1];
      fs.writeFileSync(path.join(dir, rel), Buffer.from(b64, 'base64'));
    }
    delete mapped.assets;
  }
  const descriptor = {
    formatVersion: 'sep-1', appType: bundle.appType, family: family,
    sourceBundleVersion: bundle.bundleVersion, createdAt: '2026-07-02T00:00:00Z',
    meta: { exerciseTypeSlug: bundle.appType, exerciseMode: null, theme: 'animals', ageBand: '5-7', contentLanguage: 'en' },
    page: bundle.page, crop: { x: c.x, y: c.y, w: c.w, h: c.h, pad: pad },
    visual: { file: 'visual@2x.webp', format: 'webp', scale: 2, width: vw, height: vh },
    input: mapped.input, elements: mapped.elements, imageRefs: {}, loadingMode: 'reference',
    locales: { en: { prompt: 'Do the exercise!', success: 'Great!', tryAgain: 'Try again!', hint: null } },
    audio: { speakPromptOnMount: false, perElement: null }
  };
  fs.writeFileSync(path.join(dir, 'descriptor.json'), JSON.stringify(descriptor, null, 2));
  return { family, exId: family.toLowerCase() + '-ex', mapped };
}

(async () => {
  fs.rmSync(path.join(STORIES, STORY), { recursive: true, force: true });
  fs.mkdirSync(path.join(STORIES, STORY), { recursive: true });

  /* a real tiny transparent webp dataURL for Family F reveal assets */
  _revealDataUrl = 'data:image/webp;base64,' + (await sharp({ create: { width: 32, height: 32, channels: 4, background: { r: 240, g: 120, b: 75, alpha: 1 } } }).webp().toBuffer()).toString('base64');

  const placed = [];
  for (const [family, bundle] of [['A', bundleA], ['F', bundleF()], ['E', bundleE], ['C', bundleC]]) {
    const p = await buildPackage(family, bundle);
    /* structural sanity on the mapper output */
    if (family === 'A') {
      assert(p.mapped.elements.slots.length === 3, 'A: 3 letter slots (CAT)');
      assert(p.mapped.elements.slots.every(s => s.rect.x >= 0 && s.expected.length === 1), 'A: rects top-left-rebased + single-char expected');
      assert(p.mapped.input.tapPalette.letters.length > 3 && p.mapped.input.tapPalette.letters.indexOf('C') >= 0, 'A: tap-palette = expected + distractors');
    } else if (family === 'F') {
      assert(p.mapped.elements.gridCells.length === 4, 'F: 4 grid cells');
      assert(p.mapped.elements.paletteTiles.every(t => t.revealFile), 'F: every tile has a reveal asset');
      assert(Object.keys(p.mapped.elements.solutionLabels).length === 3, 'F: 3 solution labels');
    } else if (family === 'E') {
      assert(p.mapped.elements.pairs.length === 3, 'E: 3 pairs mapped');
      assert(p.mapped.elements.leftItems.every(x => x.anchor && typeof x.anchor.x === 'number'), 'E: anchors rebased on every left item');
      assert(p.mapped.elements.leftItems.every(x => x.rect.x >= -2), 'E: rects rebased into crop space');
    } else {
      assert(p.mapped.elements.targets.filter(t => t.isTarget).length === 4, 'C: 4 apple targets');
      assert(p.mapped.elements.countBlanks.length === 1 && p.mapped.elements.countBlanks[0].expected === 4, 'C: count blank expects 4');
      assert(p.mapped.input.numberPalette.max >= 4, 'C: number palette covers the count');
    }
    placed.push(p);
  }

  /* place into a story + run the REAL validator (applies the SEP E/C rules) */
  const story = {
    schemaVersion: 'sb-1', id: STORY, title: '@t', locales: ['en'],
    theme: { letterboxColor: '#FBF3E4', transition: 'crossfade' },
    cast: [{ id: 'pip', name: '@n', role: 'guide', atlasBase: 'a', poses: ['neutral'] }],
    assets: { a: { kind: 'atlas', src: '/mini-tools/stories/pips-picnic/cast/pip/pip.base.json' },
      s: { kind: 'image', src: '/mini-tools/stories/pips-picnic/scenes/page-01.webp', size: { w: 1600, h: 1000 } } },
    reward: { id: 'story.' + STORY, label: { en: 'x' }, emoji: '📄' },
    pages: placed.map((pl, i) => ({
      id: 'p0' + (i + 1), scene: { image: 's' },
      characters: [{ characterId: 'pip', pose: 'neutral', anchor: { x: 200, y: 890 }, scale: 0.7, flip: false }],
      narration: { gate: 'end', cues: [] },
      interaction: { moduleType: 'sb-worksheet-exercise', zone: { x: 400, y: 150, w: 800, h: 720 }, completionMode: 'check', taskData: { package: 'exercises/' + pl.exId } },
      success: { celebration: 'burst', holdMs: 800 }
    }))
  };
  fs.writeFileSync(path.join(STORIES, STORY, 'story.json'), JSON.stringify(story, null, 2));
  fs.writeFileSync(path.join(STORIES, STORY, 'strings.json'), JSON.stringify({ t: { en: 'Mapper Proof' }, n: { en: 'Pip' } }, null, 2));

  let vOut = '';
  try { vOut = execFileSync(process.execPath, [path.join(__dirname, 'validate-story.js'), STORY], { cwd: REPO, encoding: 'utf8' }); }
  catch (e) { vOut = (e.stdout || '') + (e.stderr || ''); }
  const vErr = (vOut.match(/(\d+) error/) || [])[1];
  assert(vErr === '0', 'validate-story SEP rules (E + C): 0 errors (' + vOut.trim().split('\n').pop() + ')');
  if (vErr !== '0') console.log(vOut.split('\n').filter(l => /ERROR/.test(l)).join('\n'));

  fs.rmSync(path.join(STORIES, STORY), { recursive: true, force: true });
  console.log('\n[prove-sep-mappers] ' + fails.length + ' failure(s)');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('crashed: ' + e.stack); process.exit(1); });
