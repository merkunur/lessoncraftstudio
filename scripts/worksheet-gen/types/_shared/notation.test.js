#!/usr/bin/env node
/**
 * notation.test.js — the per-locale sign table + the two factories that read
 * it. Poison: a flipped set member must make the sv assertion FAIL.
 */
'use strict';
const assert = require('assert');
const { divGlyph, mulGlyph, DIV_SLASH, DIV_COLON } = require('./notation.js');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');

async function bodyOf(id, locale, theme) {
  const t = loadType(id);
  const rng = makeRng(instanceSeed({ typeId: id, theme, difficulty: 2, seedEpoch: 1 }));
  const b = await t.build({ theme, difficulty: 2, locale }, { rng });
  return b.bodyHtml;
}

function opCount(html, ch) {
  const re = new RegExp('color:#146B5E">' + ch.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '</span>', 'g');
  return (html.match(re) || []).length;
}

(async () => {
  let n = 0;
  const ok = (c, m) => { assert.ok(c, m); n++; };
  ok(divGlyph('sv') === '/', 'sv /');
  ok(divGlyph('sv-SE') === '/', 'sv-SE /');
  for (const l of ['de', 'it', 'nl', 'da', 'no', 'fi']) ok(divGlyph(l) === ':', l + ' :');
  for (const l of ['en', 'fr', 'es', 'pt', undefined]) ok(divGlyph(l) === '÷', String(l) + ' ÷');
  for (const l of ['de', 'sv', 'da', 'no', 'fi']) ok(mulGlyph(l) === '·', l + ' ·');
  for (const l of ['en', 'fr', 'es', 'pt', 'it', 'nl']) ok(mulGlyph(l) === '×', l + ' ×');

  // the factories: G2-216 share-bins · G2-217 group-rings · G3-311 fact-family (array-tasks) · G3-310 repeated-sub (number-line-tasks)
  const cases = [['G2-216', 'animals'], ['G2-217', 'animals'], ['G3-311', 'shapes'], ['G3-310', null]];
  for (const [id, theme] of cases) {
    for (const [loc, sign, forbidden] of [['sv', '/', ['÷', ':']], ['de', ':', ['÷', '/']], ['en', '÷', [':', '/']], ['da', ':', ['÷']], ['no', ':', ['÷']]]) {
      const html = await bodyOf(id, loc, theme);
      ok(opCount(html, sign) > 0, `${id}/${loc} prints ${sign}`);
      for (const f of forbidden) ok(opCount(html, f) === 0, `${id}/${loc} never prints ${f}`);
    }
  }
  // G3-369 still reads the same table (0 drift is proven by b3-baseline; this is the unit view)
  const g369sv = await bodyOf('G3-369', 'sv', null);
  ok(g369sv.includes('>/<') && !g369sv.includes('>÷<'), 'G3-369 sv /');

  // POISON: flip sv into the colon set → the sv assertions must fail
  DIV_SLASH.delete('sv'); DIV_COLON.add('sv');
  let fired = false;
  try { const h = await bodyOf('G2-216', 'sv', 'animals'); if (opCount(h, '/') === 0) fired = true; } catch (e) { fired = true; }
  DIV_COLON.delete('sv'); DIV_SLASH.add('sv');
  ok(fired, 'poison: flipped set member changes the sv sheet');

  console.log(`notation.test: ${n} assertions ok, poison KILLED`);
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
