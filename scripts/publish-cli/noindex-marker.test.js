#!/usr/bin/env node
/**
 * noindex-marker.test.js — the do-not-index marker's contract (2026-09-27).
 * Browser-free and DB-free, so it can run inside deploy.sh.
 *   node scripts/publish-cli/noindex-marker.test.js
 */
'use strict';
var assert = require('assert');
var fs = require('fs');
var os = require('os');
var path = require('path');
var AdmZip = require('adm-zip');
var m = require('./noindex-marker');
var markZip = require('./mark-zips-noindex').markZip;

var n = 0;
function t(name, fn) { fn(); n++; console.log('  PASS ' + name); }

var INDEXABLE_HEAD = '<!doctype html><html><head><meta charset="utf-8">' +
  '<meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1">' +
  '<title>x</title></head><body></body></html>';

t('manifestWantsNoindex only on an explicit false', function () {
  assert.strictEqual(m.manifestWantsNoindex({ indexable: false }), true);
  assert.strictEqual(m.manifestWantsNoindex({ indexable: true }), false);
  assert.strictEqual(m.manifestWantsNoindex({}), false);          // every existing ZIP
  assert.strictEqual(m.manifestWantsNoindex(null), false);
  assert.strictEqual(m.manifestWantsNoindex({ indexable: 'false' }), false); // strings never count
});

t('replaces the existing robots meta (one robots meta remains)', function () {
  var out = m.applyNoindexToDeckHtml(INDEXABLE_HEAD);
  assert.ok(m.isNoindexDeckHtml(out));
  assert.strictEqual((out.match(/<meta\s+name="robots"/g) || []).length, 1);
  assert.ok(out.indexOf('max-image-preview') === -1);
});

t('inserts a robots meta right after <head> when none exists', function () {
  var out = m.applyNoindexToDeckHtml('<html><head><title>x</title></head></html>');
  assert.ok(/<head>\n<meta name="robots" content="noindex, follow"/.test(out));
});

t('idempotent', function () {
  var once = m.applyNoindexToDeckHtml(INDEXABLE_HEAD);
  assert.strictEqual(m.applyNoindexToDeckHtml(once), once);
});

t('an ordinary deck is NOT read as do-not-index (control)', function () {
  assert.strictEqual(m.isNoindexDeckHtml(INDEXABLE_HEAD), false);
  assert.strictEqual(m.isNoindexDeckHtml('<html><head></head></html>'), false);
});

t('mark-zips-noindex stamps a ZIP, then leaves it byte-identical', function () {
  var dir = fs.mkdtempSync(path.join(os.tmpdir(), 'noindex-'));
  var file = path.join(dir, 'a.zip');
  var z = new AdmZip();
  z.addFile('manifest.json', Buffer.from(JSON.stringify({ deck_id: 'a', language: 'en' })));
  z.addFile('deck.html', Buffer.from(INDEXABLE_HEAD));
  z.writeZip(file);
  assert.strictEqual(markZip(file, true), 'would-mark');           // dry-run touches nothing
  assert.strictEqual(JSON.parse(new AdmZip(file).readAsText('manifest.json')).indexable, undefined);
  assert.strictEqual(markZip(file, false), 'marked');
  var after = new AdmZip(file);
  assert.strictEqual(JSON.parse(after.readAsText('manifest.json')).indexable, false);
  assert.strictEqual(after.readAsText('deck.html'), INDEXABLE_HEAD); // other entries intact
  var bytes = fs.readFileSync(file);
  assert.strictEqual(markZip(file, false), 'already');
  assert.ok(bytes.equals(fs.readFileSync(file)));
  fs.rmSync(dir, { recursive: true, force: true });
});

console.log('noindex-marker.test.js: ' + n + ' passed');
