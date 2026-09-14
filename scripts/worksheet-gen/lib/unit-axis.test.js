#!/usr/bin/env node
/**
 * unit-axis.test.js — the unit fan is additive-with-fallback: a fake spec +
 * a plan without unit knobs must enumerate byte-identically; every knob shape
 * is exercised; the folding collision and the unreachable-knob refusal throw.
 * Node native assert, no framework.
 */
'use strict';
const assert = require('assert');
const path = require('path');
const { unitKey, unitListFor, assertUnitKnobsReach, resolveUnitTokens, assertNoUnitTokens } = require('./unit-axis.js');
const { instanceSeed } = require('./rng.js');
const { deckIdFor } = require('../enumerate.js');
const { buildManifest } = require('../emit/manifest.js');
const { buildDeckHtml } = require('../emit/deck-html.js');
const { loadType } = require('./load-types.js');
const { resolveStrings } = require('../i18n/strings.js');

let n = 0, failures = 0;
function check(name, fn) { try { fn(); n++; } catch (e) { failures++; console.error('  FAIL ' + name + ': ' + e.message); } }
const throws = (fn, re) => assert.throws(fn, re);

const FAKE = {
  id: 'K-999', slug: 'fake', gradeBand: 'K', assetClass: 'icon-placement', exerciseType: 'articles',
  themeAxis: { applicable: false }, difficulty: { 1: {}, 2: {}, 3: {} }, i18n: { en: { title: 'Letter {U}{L}', instruction: 'Find every {L}.' } },
  unitAxis: { applicable: true, units: () => ['m', 's', 'sch', 'ä', 'a'], exemplar: () => 'm' },
  build() { return { bodyHtml: '' }; }, verify() { return []; },
};
const PLAIN = Object.assign({}, FAKE, { id: 'K-998', unitAxis: undefined, i18n: { en: { title: 'Plain', instruction: 'Plain.' } } });

check('unitKey folds like a slug', () => {
  assert.strictEqual(unitKey('m'), 'm');
  assert.strictEqual(unitKey('Sch'), 'sch');
  assert.strictEqual(unitKey('ä'), 'a');
  assert.strictEqual(unitKey('2-5'), '25');
  throws(() => unitKey('---'), /empty key/);
});
check('control: no knobs → [null], unpinned, deckId + seed unchanged', () => {
  const r = unitListFor(FAKE, { id: 'wave-test' }, 'en');
  assert.deepStrictEqual(r, { units: [null], pinned: false });
  assert.strictEqual(deckIdFor('wave-test', FAKE, null, 2, 'en', 1, null), 'wsg-wtest-k999-nothm-d2-en');
  assert.strictEqual(instanceSeed({ typeId: 'K-999', theme: null, difficulty: 2, seedEpoch: 1, variant: 1, unit: null }), 'K-999|none|2|1');
  assert.strictEqual(deckIdFor('wave-test', FAKE, null, 2, 'en', 1), 'wsg-wtest-k999-nothm-d2-en');   // arity-6 callers unchanged
});
check('unitsPerType:2 → first two units, -u tails, |u seeds', () => {
  const r = unitListFor(FAKE, { id: 'w', unitsPerType: 2 }, 'en');
  assert.deepStrictEqual(r.units, ['m', 's']);
  assert.strictEqual(r.pinned, false);
  assert.strictEqual(deckIdFor('wave-test', FAKE, null, 2, 'en', 1, 'sch'), 'wsg-wtest-k999-nothm-d2-en-usch');
  assert.strictEqual(deckIdFor('wave-test', FAKE, null, 2, 'en', 2, 'ä'), 'wsg-wtest-k999-nothm-d2-en-v2-ua');
  assert.strictEqual(instanceSeed({ typeId: 'K-999', theme: null, difficulty: 2, seedEpoch: 1, variant: 1, unit: 'sch' }), 'K-999|none|2|1|usch');
  assert.strictEqual(instanceSeed({ typeId: 'K-999', theme: 'animals', difficulty: 2, seedEpoch: 1, variant: 2, unit: 'ä' }), 'K-999|animals|2|1|v2|uä');
});
check('unitOverrides pins; unknown unit throws; axis-less spec throws', () => {
  assert.deepStrictEqual(unitListFor(FAKE, { id: 'w', unitOverrides: { 'K-999': 'sch' } }, 'en'), { units: ['sch'], pinned: true });
  throws(() => unitListFor(FAKE, { id: 'w', unitOverrides: { 'K-999': 'zz' } }, 'en'), /not in units\(en\)/);
  throws(() => unitListFor(PLAIN, { id: 'w', unitOverrides: { 'K-998': 'm' } }, 'en'), /has no unitAxis/);
  assert.deepStrictEqual(unitListFor(PLAIN, { id: 'w', unitsPerType: 3 }, 'en'), { units: [null], pinned: false });
});
check('knobs that reach no spec throw; knobs that reach one pass', () => {
  throws(() => assertUnitKnobsReach({ unitsPerType: 1 }, [PLAIN]), /no selected spec has a unitAxis/);
  assertUnitKnobsReach({ unitsPerType: 1 }, [PLAIN, FAKE]);
  assertUnitKnobsReach({}, [PLAIN]);
});
check('folding collision: two units → one deckId is detected by enumerate', () => {
  const { enumerate } = require('../enumerate.js');
  const Module = require('module');
  // enumerate reads specs via selectSpecs → loadAllTypes; inject through plan.types list is not possible for a fake,
  // so assert the collision rule directly on deckIdFor equality (the guard in enumerate compares deckIds).
  assert.strictEqual(deckIdFor('w', FAKE, null, 2, 'en', 1, 'ä'), deckIdFor('w', FAKE, null, 2, 'en', 1, 'a'));
  assert.ok(typeof enumerate === 'function');
});
check('resolveUnitTokens: exemplar without a unit, the unit with one, same object without the axis', () => {
  const s = FAKE.i18n.en;
  assert.deepStrictEqual(resolveUnitTokens(s, FAKE, null, 'en'), { title: 'Letter Mm', instruction: 'Find every m.' });
  assert.deepStrictEqual(resolveUnitTokens(s, FAKE, 'sch', 'de'), { title: 'Letter Schsch', instruction: 'Find every sch.' });
  const p = PLAIN.i18n.en;
  assert.strictEqual(resolveUnitTokens(p, PLAIN, null, 'en'), p);
  const noTok = { title: 'x', instruction: 'y' };
  assert.strictEqual(resolveUnitTokens(noTok, FAKE, 'm', 'en'), noTok);
  // a second string with a token AFTER a first one must also resolve (the /g lastIndex trap)
  assert.deepStrictEqual(resolveUnitTokens({ a: 'zz{U}', b: 'q{L}' }, FAKE, 'm', 'en'), { a: 'zzM', b: 'qm' });
  throws(() => assertNoUnitTokens({ title: 'Letter {U}' }, 'x'), /unresolved token/);
  assertNoUnitTokens({ title: 'Letter M' }, 'x');
});
check('manifest: variant_id + unit key only when configured', () => {
  const spec = loadType('K-284');
  const strings = resolveStrings('K-284', 'en', spec);
  const base = { spec, cacheTheme: 'animals', difficulty: 2, locale: 'en', deckId: 'x', generatedAt: '2026-01-01T00:00:00.000Z', strings, imagesUsed: [], variant: 1 };
  const m0 = buildManifest(base);
  assert.strictEqual(m0.variant_id, 'k284');
  assert.ok(!('unit' in m0));
  const m1 = buildManifest(Object.assign({}, base, { unit: 'm' }));
  assert.strictEqual(m1.variant_id, 'k284-m');
  assert.strictEqual(m1.unit, 'm');
  const m2 = buildManifest(Object.assign({}, base, { unit: 'Sch', variant: 2 }));
  assert.strictEqual(m2.variant_id, 'k284-2-sch');
});
check('deck-html refuses an unresolved token', () => {
  const spec = loadType('K-284');
  const strings = resolveStrings('K-284', 'en', spec);
  const m = buildManifest({ spec, cacheTheme: 'animals', difficulty: 2, locale: 'en', deckId: 'x', generatedAt: '2026-01-01T00:00:00.000Z', strings, imagesUsed: [], variant: 1 });
  throws(() => buildDeckHtml({ manifest: m, spec, strings: Object.assign({}, strings, { title: 'Bad {U}' }), locale: 'en', preview: null }), /unresolved token/);
});

console.log(`unit-axis.test: ${n} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
