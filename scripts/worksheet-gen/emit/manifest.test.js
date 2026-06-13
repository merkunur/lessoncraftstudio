#!/usr/bin/env node
/**
 * emit/manifest.test.js — emitted manifests must satisfy the REAL publish-cli
 * contract: bundle.validateManifest, reconcileManifestTheme,
 * reconcileExerciseMode, deriveSeedFromManifest.
 * Node native assert; no framework (publish-cli *.test.js style).
 */
'use strict';
const assert = require('assert');
const { buildManifest, scrapeImagesUsed, themeAxisKey, ageRangeForSpec, variantIdForSpec } = require('./manifest.js');
const { loadType } = require('../lib/load-types.js');
const { resolveStrings } = require('../i18n/strings.js');
const slug = require('../../publish-cli/slug.js');
const bundle = require('../../publish-cli/bundle.js');

let failures = 0;
function check(name, fn) {
  try { fn(); console.log('  PASS ' + name); }
  catch (e) { failures++; console.error('  FAIL ' + name + ': ' + e.message); }
}

const IMAGES = [
  { theme: 'animals', noun: 'sheep', vocabKey: 'sheep' },
  { theme: 'animals', noun: 'duck', vocabKey: 'duck' },
];

function makeManifest(typeId, opts) {
  const spec = loadType(typeId);
  const strings = resolveStrings(typeId, 'en', spec);
  return buildManifest(Object.assign({
    spec, strings,
    cacheTheme: 'animals', difficulty: 2, locale: 'en',
    deckId: 'wsg-test-' + variantIdForSpec(spec), generatedAt: '2026-06-13T00:00:00Z',
    imagesUsed: IMAGES,
  }, opts || {}));
}

console.log('emit/manifest.test.js');

check('themed d2 manifest passes validateManifest + both recon gates CLEAN', function () {
  const m = makeManifest('K-002');
  assert.deepStrictEqual(bundle.validateManifest(m), []);
  assert.strictEqual(slug.reconcileManifestTheme(m).category, 'CLEAN');
  assert.strictEqual(slug.reconcileExerciseMode(m).category, 'CLEAN');
  assert.strictEqual(m.printable_only, true);
  assert.strictEqual(m.schema_version, '1.1');
  assert.strictEqual(m.assets.answer_key_pdf, null);
});

check('slug seed = family + theme + variant (d2 mode null)', function () {
  const m = makeManifest('K-002');
  assert.strictEqual(m.exercise_mode, null);
  assert.strictEqual(slug.deriveSeedFromManifest(m), 'counting-pictures animals k002');
});

check('d1 → easy mode in slug seed', function () {
  const m = makeManifest('K-002', { difficulty: 1 });
  assert.strictEqual(m.exercise_mode, 'easy');
  assert.strictEqual(slug.deriveSeedFromManifest(m), 'counting-pictures easy animals k002');
});

check('themeless type → theme null + exercises [] + recon CLEAN', function () {
  const m = makeManifest('K-005', { cacheTheme: null, imagesUsed: [] });
  assert.strictEqual(m.theme, null);
  assert.deepStrictEqual(m.exercises, []);
  assert.strictEqual(slug.reconcileManifestTheme(m).category, 'CLEAN');
});

check('age_range from id prefix (K/G1/G2/G3)', function () {
  assert.strictEqual(ageRangeForSpec({ id: 'K-002' }), '5-7');
  assert.strictEqual(ageRangeForSpec({ id: 'G1-118' }), '6-8');
  assert.strictEqual(ageRangeForSpec({ id: 'G2-235' }), '7-9');
  assert.strictEqual(ageRangeForSpec({ id: 'G3-341' }), '8-10');
  const m = makeManifest('K-002');
  assert.strictEqual(m.age_range, '5-7');
  assert.strictEqual(m.metadata.age_range, '5-7');
});

check('BW cache theme maps to underscore axis key + all 3 theme signals agree', function () {
  assert.strictEqual(themeAxisKey('animals bw'), 'animals_bw');
  const m = makeManifest('K-002', {
    cacheTheme: 'animals bw',
    imagesUsed: [{ theme: 'animals bw', noun: 'cat', vocabKey: 'cat' }],
  });
  assert.strictEqual(m.theme, 'animals_bw');
  assert.strictEqual(m.exercises[0].image.theme, 'animals_bw');
  assert.ok(m.exercises[0].image.path.indexOf('/images/animals_bw/') === 0);
  assert.strictEqual(slug.reconcileManifestTheme(m).category, 'CLEAN');
});

check('scrapeImagesUsed resolves themes-512 + silhouettes paths with %20 decoding', function () {
  const cacheManifest = {
    themes: { 'animals bw': { nouns: { cat: { vocabKey: 'cat' } } }, animals: { nouns: { dog: { vocabKey: 'dog' } } } },
  };
  const html = '<img src="file:///C:/x/cache/themes-512/animals%20bw/cat@3x.webp">' +
    '<img src="file:///C:/x/cache/silhouettes/animals/dog.png">' +
    '<img src="file:///C:/x/cache/themes-512/animals%20bw/cat@3x.webp">';
  const got = scrapeImagesUsed(html, cacheManifest);
  assert.deepStrictEqual(got, [
    { theme: 'animals bw', noun: 'cat', vocabKey: 'cat' },
    { theme: 'animals', noun: 'dog', vocabKey: 'dog' },
  ]);
});

if (failures) { console.error(failures + ' failure(s)'); process.exit(1); }
console.log('All emit/manifest.test.js cases passed.');
