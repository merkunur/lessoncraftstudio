#!/usr/bin/env node
/**
 * Unit tests for bundle.js validateManifest — the printable_only (schema 1.1)
 * answer-key relaxation per the worksheet-gen emission commission.
 * Node native `assert` — no test-framework dep (slug.test.js style).
 */

'use strict';

var assert = require('assert');
var bundle = require('./bundle');

function baseManifest(overrides) {
  var m = {
    schema_version: '1.0',
    deck_id: 'test-deck',
    generated_at: '2026-06-13T00:00:00Z',
    language: 'en',
    exercise_type: 'addition',
    assets: {
      html: 'deck.html',
      pdf: 'printable.pdf',
      answer_key_pdf: 'answer-key.pdf',
      thumbnail: 'thumbnail.png'
    }
  };
  return Object.assign(m, overrides || {});
}

var failures = 0;
function check(name, fn) {
  try { fn(); console.log('  PASS ' + name); }
  catch (e) { failures++; console.error('  FAIL ' + name + ': ' + e.message); }
}

console.log('bundle.test.js — validateManifest printable_only relaxation');

check('legacy interactive manifest validates clean', function () {
  assert.deepStrictEqual(bundle.validateManifest(baseManifest()), []);
});

check('legacy manifest with null answer_key_pdf still errors', function () {
  var m = baseManifest();
  m.assets.answer_key_pdf = null;
  var errors = bundle.validateManifest(m);
  assert.ok(errors.some(function (e) { return e.indexOf('answer_key_pdf') !== -1; }),
    'expected answer_key_pdf error, got: ' + JSON.stringify(errors));
});

check('printable_only=true with null answer_key_pdf validates clean', function () {
  var m = baseManifest({ schema_version: '1.1', printable_only: true });
  m.assets.answer_key_pdf = null;
  assert.deepStrictEqual(bundle.validateManifest(m), []);
});

check('printable_only=true still requires pdf', function () {
  var m = baseManifest({ schema_version: '1.1', printable_only: true });
  m.assets.answer_key_pdf = null;
  m.assets.pdf = null;
  var errors = bundle.validateManifest(m);
  assert.ok(errors.some(function (e) { return e.indexOf('assets.pdf') !== -1; }),
    'expected assets.pdf error, got: ' + JSON.stringify(errors));
});

check('printable_only=true still requires thumbnail + html', function () {
  var m = baseManifest({ schema_version: '1.1', printable_only: true });
  m.assets = { html: null, pdf: 'printable.pdf', answer_key_pdf: null, thumbnail: null };
  var errors = bundle.validateManifest(m);
  assert.ok(errors.some(function (e) { return e.indexOf('assets.html') !== -1; }));
  assert.ok(errors.some(function (e) { return e.indexOf('assets.thumbnail') !== -1; }));
});

check('printable_only must be === true (truthy string does not relax)', function () {
  var m = baseManifest({ printable_only: 'yes' });
  m.assets.answer_key_pdf = null;
  var errors = bundle.validateManifest(m);
  assert.ok(errors.some(function (e) { return e.indexOf('answer_key_pdf') !== -1; }));
});

check('printable_only manifest missing required top-level fields still errors', function () {
  var m = baseManifest({ schema_version: '1.1', printable_only: true });
  delete m.exercise_type;
  var errors = bundle.validateManifest(m);
  assert.ok(errors.some(function (e) { return e.indexOf('exercise_type') !== -1; }));
});

if (failures) { console.error(failures + ' failure(s)'); process.exit(1); }
console.log('All bundle.test.js cases passed.');
