/**
 * bulk.pruneStagingExtractions — unit test.
 *
 * Node native `assert` — no test-framework dep. Run: node scripts/publish-cli/bulk-staging-prune.test.js
 *
 * Origin: 2026-09-11 disk audit — 123 batch dirs / 13 GB of per-deck extraction
 * output that no code path ever read after the real publish. The prune must
 * remove exactly the <deck_id>/ dirs and keep every _* report + _failures/.
 */
'use strict';

var assert = require('assert');
var fs = require('fs');
var os = require('os');
var path = require('path');
var bulk = require('./bulk');

function mkBatch() {
  var root = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-bulk-prune-'));
  var batch = path.join(root, 'batch-20260911000000');
  fs.mkdirSync(batch);
  // three per-deck extraction dirs, each with the four files dry-run.writeDeck emits
  ['addition-en-1', 'addition-de-2', 'sudoku-fi-3'].forEach(function (id) {
    var d = path.join(batch, id);
    fs.mkdirSync(d);
    fs.writeFileSync(path.join(d, 'manifest.json'), '{}');
    fs.writeFileSync(path.join(d, 'deck.html'), '<html>' + 'x'.repeat(1000) + '</html>');
    fs.writeFileSync(path.join(d, 'deck.html.diff'), '--- a\n+++ b\n');
    fs.writeFileSync(path.join(d, 'substitution-report.json'), '{}');
  });
  // reports + failures dir (must survive)
  ['_summary.txt', '_results.txt', '_collisions.txt', '_errors.txt', '_reconciliation.txt'].forEach(function (f) {
    fs.writeFileSync(path.join(batch, f), 'report\n');
  });
  fs.mkdirSync(path.join(batch, '_failures'));
  fs.writeFileSync(path.join(batch, '_failures', 'bad.zip.stderr'), 'boom\n');
  return { root: root, batch: batch };
}

// 1. Prune removes exactly the extraction dirs and keeps the audit trail.
(function () {
  var t = mkBatch();
  var before = fs.readdirSync(t.batch).sort();
  assert.deepStrictEqual(before, ['_collisions.txt', '_errors.txt', '_failures', '_reconciliation.txt', '_results.txt', '_summary.txt', 'addition-de-2', 'addition-en-1', 'sudoku-fi-3']);

  var r = bulk.pruneStagingExtractions(t.batch);
  assert.strictEqual(r.removed, 3, 'removes the three extraction dirs');
  assert.strictEqual(r.kept, 6, 'keeps 5 reports + _failures/');
  assert.ok(r.bytes > 3000, 'counts the bytes it freed (' + r.bytes + ')');

  var after = fs.readdirSync(t.batch).sort();
  assert.deepStrictEqual(after, ['_collisions.txt', '_errors.txt', '_failures', '_reconciliation.txt', '_results.txt', '_summary.txt']);
  assert.strictEqual(fs.readFileSync(path.join(t.batch, '_failures', 'bad.zip.stderr'), 'utf8'), 'boom\n', '_failures content untouched');
  fs.rmSync(t.root, { recursive: true, force: true });
})();

// 2. Idempotent: a second prune removes nothing and changes nothing.
(function () {
  var t = mkBatch();
  bulk.pruneStagingExtractions(t.batch);
  var r2 = bulk.pruneStagingExtractions(t.batch);
  assert.strictEqual(r2.removed, 0);
  assert.strictEqual(r2.kept, 6);
  fs.rmSync(t.root, { recursive: true, force: true });
})();

// 3. Missing dir is a no-op, not a throw (a batch that aborted before staging).
(function () {
  var r = bulk.pruneStagingExtractions(path.join(os.tmpdir(), 'lcs-bulk-prune-does-not-exist-' + Date.now()));
  assert.deepStrictEqual(r, { removed: 0, kept: 0, bytes: 0 });
})();

// 4. POISON (control): a deck dir that happens to start with '_' is NOT an extraction
//    dir by convention and must be kept — proves the keep rule is the underscore, not
//    "directory vs file". And a plain file with a deck-like name is kept too.
(function () {
  var t = mkBatch();
  fs.mkdirSync(path.join(t.batch, '_manual-notes'));
  fs.writeFileSync(path.join(t.batch, 'stray-file.txt'), 'x');
  var r = bulk.pruneStagingExtractions(t.batch);
  assert.strictEqual(r.removed, 3);
  assert.ok(fs.existsSync(path.join(t.batch, '_manual-notes')), 'underscore dir kept');
  assert.ok(fs.existsSync(path.join(t.batch, 'stray-file.txt')), 'plain file kept');
  fs.rmSync(t.root, { recursive: true, force: true });
})();

console.log('bulk-staging-prune.test.js: 4 cases passed');
