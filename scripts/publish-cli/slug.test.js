#!/usr/bin/env node
/**
 * Unit tests for slug.js per Brief B Phase 2 Surface 2.
 * Node native `assert` — no test-framework dep.
 *
 * Coverage table (per the Phase 2 brief):
 *   Tier 1 EN + DE + edge cases (4 + 3 + 3 = 10)
 *   Tier 2 ES + NL (2 + 1 = 3)
 *   Tier 3 SV + FI + NO (1 + 1 + 1 = 3)
 *   Tier 4 DA + FR + IT + PT (1 + 1 + 1 + 1 = 4)
 *   Polish edge (Łukasz) = 1
 *   Total: 21 cases
 */

'use strict';

var assert = require('assert');
var slug = require('./slug');

var cases = [
  // Tier 1 EN
  { locale: 'en', input: 'Addition Practice',          expected: 'addition-practice' },
  { locale: 'en', input: 'Picture Sudoku',             expected: 'picture-sudoku' },
  { locale: 'en', input: 'Cryptogram Practice',        expected: 'cryptogram-practice' },
  { locale: 'en', input: 'Picture Path',               expected: 'picture-path' },

  // Tier 1 DE
  { locale: 'de', input: 'Mathe für Kindergarten',     expected: 'mathe-fur-kindergarten' },
  { locale: 'de', input: 'Übungen mit Tieren',         expected: 'ubungen-mit-tieren' },
  { locale: 'de', input: 'Straße der Zahlen',          expected: 'strasse-der-zahlen' },

  // Tier 2 ES
  { locale: 'es', input: 'Suma para niños',            expected: 'suma-para-ninos' },
  { locale: 'es', input: 'Práctica de matemáticas',    expected: 'practica-de-matematicas' },

  // Tier 2 NL
  { locale: 'nl', input: 'Optellen oefenen',           expected: 'optellen-oefenen' },

  // Tier 3 SV / FI / NO
  { locale: 'sv', input: 'Räkneövningar för förskola', expected: 'rakneovningar-for-forskola' },
  { locale: 'fi', input: 'Yhteenlasku eläimillä',      expected: 'yhteenlasku-elaimilla' },
  { locale: 'no', input: 'Telle dyr',                  expected: 'telle-dyr' },

  // Tier 4 DA / FR / IT / PT
  { locale: 'da', input: 'Tælle dyr',                  expected: 'taelle-dyr' },
  // Apostrophes per §17.8.5 conservative rule: ANY non-[a-z0-9-] becomes a hyphen.
  // Romance contractions with apostrophes (l'addition, dell'addizione) split at
  // the apostrophe rather than collapsing. URL-valid; slightly less idiomatic but
  // matches the spec's literal interpretation. Special-casing apostrophe stripping
  // would be a behavioral choice the spec doesn't authorize.
  { locale: 'fr', input: 'Maîtrise de l\'addition',    expected: 'maitrise-de-l-addition' },
  { locale: 'it', input: 'Pratica dell\'addizione',    expected: 'pratica-dell-addizione' },
  { locale: 'pt', input: 'Prática de adição',          expected: 'pratica-de-adicao' },

  // Polish edge
  { locale: 'pl-edge', input: 'Łukasz',                expected: 'lukasz' },

  // Edge cases
  { label: 'punctuation-only strips to empty', input: '???',          expected: '' },
  { label: 'all non-ASCII (CJK) strips to empty', input: '日本語',     expected: '' },
  { label: 'whitespace + leading/trailing hyphens', input: '  Hello world!  ', expected: 'hello-world' }
];

var failed = 0;
var passed = 0;

cases.forEach(function (c, i) {
  var actual = slug.slugify(c.input);
  try {
    assert.strictEqual(actual, c.expected);
    passed++;
    console.log('  PASS [' + (i + 1).toString().padStart(2, '0') + '] ' +
      (c.locale || c.label || '') + ' "' + c.input + '" → "' + actual + '"');
  } catch (e) {
    failed++;
    console.log('  FAIL [' + (i + 1).toString().padStart(2, '0') + '] ' +
      (c.locale || c.label || '') + ' "' + c.input + '"');
    console.log('         expected: "' + c.expected + '"');
    console.log('         actual:   "' + actual + '"');
  }
});

console.log('---');
console.log('slug tests: ' + passed + ' passed, ' + failed + ' failed (of ' + cases.length + ')');

// Collision suffix smoke tests.
console.log('');
console.log('resolveCollision smoke tests:');
var taken = { 'addition-practice': true, 'addition-practice-2': true };
var r1 = slug.resolveCollision('addition-practice', function (s) { return !!taken[s]; });
console.log('  candidate "addition-practice" → ' + r1 + ' (expect "addition-practice-3")');
assert.strictEqual(r1, 'addition-practice-3', 'collision suffix should advance to next free');
var r2 = slug.resolveCollision('picture-sudoku', function (s) { return !!taken[s]; });
console.log('  candidate "picture-sudoku" (no collision) → ' + r2 + ' (expect "picture-sudoku")');
assert.strictEqual(r2, 'picture-sudoku', 'no collision returns candidate as-is');

console.log('');
console.log('All collision tests PASS.');

process.exit(failed === 0 ? 0 : 1);
