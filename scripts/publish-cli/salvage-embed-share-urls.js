#!/usr/bin/env node
/**
 * One-shot salvage for already-published deck.html files whose embed +
 * share affordances baked the wrong canonical URL at generation time.
 *
 * Root cause (catalog-export.js v26 and earlier): buildShareAffordance +
 * buildEmbedAffordance fell through to a "predicted slug" derived from
 * `slugify(bundle.title)` whenever no real `canonicalURL` was passed —
 * which was always, because the apps don't pass canonicalURL. The
 * predicted slug is `slugify("More or Less Practice")` → `more-or-less-
 * practice`, which has no relationship to publish-cli's actual slug
 * derivation (`<exercise-type>-<exercise-mode>-<theme>`). Result: every
 * catalog-published deck's embed snippet has an iframe src pointing at a
 * URL that 404s.
 *
 * Source-code fix (catalog-export.js v27, this commission): helpers now
 * emit the `__CANONICAL_URL__` placeholder when no real URL is provided;
 * publish-cli's existing §17.8.5 substitution lands the correct URL at
 * upload time. Future publishes are clean by construction.
 *
 * This script salvages the existing deck.html files on Hetzner. For each
 * published deck row in the DB, it computes the correct canonical URL,
 * scans the on-disk deck.html (latest version per the symlink), and
 * regex-replaces every `var url="https://www.lessoncraftstudio.com/<loc>/
 * decks/<wrong-slug>/"` occurrence with `var url="<correct-url>"`. Atomic
 * via temp-file + renameSync.
 *
 * Run from /opt/lessoncraftstudio (relative paths assume that cwd).
 *
 * Usage:
 *   node scripts/publish-cli/salvage-embed-share-urls.js [--dry-run]
 *
 * --dry-run scans + reports counts; no FS writes.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var { Client } = require(path.resolve(process.cwd(), 'frontend', 'node_modules', 'pg'));

var DECKS_ROOT = '/var/www/lcs-media/decks';
var BAD_URL_PATTERN = /var url="https:\/\/www\.lessoncraftstudio\.com\/[a-z]{2}\/decks\/[^"]+\/"/g;

async function main() {
  var dryRun = process.argv.includes('--dry-run');
  var dbUrl = (process.env.DATABASE_URL || '').replace(/\?.*$/, '');
  if (!dbUrl) {
    console.error('ERROR: DATABASE_URL not set (source frontend/.env.production first)');
    process.exit(2);
  }

  var client = new Client({ connectionString: dbUrl });
  await client.connect();

  var rows = (await client.query(
    "SELECT id, slug, language FROM decks WHERE status='published' ORDER BY language, slug"
  )).rows;
  await client.end();

  console.log('=== Salvage scope ===');
  console.log('  Published decks:', rows.length);
  console.log('  Mode:           ', dryRun ? 'DRY-RUN' : 'APPLY');
  console.log('');

  var stats = {
    scanned: 0,
    written: 0,
    notFound: 0,
    alreadyClean: 0,
    occurrencesReplaced: 0,
    errors: 0,
  };
  var perLocale = {};
  var sampleFixes = [];
  var sampleErrors = [];

  for (var row of rows) {
    stats.scanned++;
    perLocale[row.language] = (perLocale[row.language] || 0) + 1;
    var deckHtmlPath = path.join(DECKS_ROOT, row.language, row.slug, 'deck.html');
    if (!fs.existsSync(deckHtmlPath)) {
      stats.notFound++;
      if (sampleErrors.length < 5) sampleErrors.push('NOT FOUND: ' + deckHtmlPath);
      continue;
    }
    try {
      var html = fs.readFileSync(deckHtmlPath, 'utf8');
      var correctURL = 'https://www.lessoncraftstudio.com/' + row.language + '/decks/' + row.slug + '/';
      var correctVarLine = 'var url="' + correctURL + '"';

      // Count occurrences of BAD pattern; replace with correctVarLine.
      // Regex global match counts: use a separate matchAll for accurate count.
      var matches = html.match(BAD_URL_PATTERN) || [];
      // Of the matches, how many were already the correct URL? (idempotent)
      var alreadyCorrect = matches.filter(function (m) {
        return m === correctVarLine;
      }).length;
      var needFix = matches.length - alreadyCorrect;

      if (needFix === 0) {
        stats.alreadyClean++;
        continue;
      }

      stats.occurrencesReplaced += needFix;

      if (sampleFixes.length < 5) {
        sampleFixes.push(row.language + '/' + row.slug + ' — ' + needFix + ' occurrence(s)');
      }

      if (!dryRun) {
        var fixed = html.replace(BAD_URL_PATTERN, correctVarLine);
        var tmpPath = deckHtmlPath + '.salvage.tmp';
        fs.writeFileSync(tmpPath, fixed, 'utf8');
        fs.renameSync(tmpPath, deckHtmlPath);
        stats.written++;
      }
    } catch (e) {
      stats.errors++;
      if (sampleErrors.length < 5) sampleErrors.push('ERR ' + deckHtmlPath + ': ' + e.message);
    }
  }

  console.log('=== Per-locale deck distribution ===');
  Object.keys(perLocale).sort().forEach(function (k) {
    console.log('  ' + k + ': ' + perLocale[k]);
  });
  console.log('');
  console.log('=== Stats ===');
  console.log('  scanned:                ' + stats.scanned);
  console.log('  needed fix (rewritten): ' + (dryRun ? '(dry-run) ' : '') + (stats.written || stats.occurrencesReplaced));
  console.log('  already-clean:          ' + stats.alreadyClean);
  console.log('  not-found on disk:      ' + stats.notFound);
  console.log('  errors:                 ' + stats.errors);
  console.log('  total occurrences:      ' + stats.occurrencesReplaced);
  console.log('');
  if (sampleFixes.length > 0) {
    console.log('=== Sample fixes ===');
    sampleFixes.forEach(function (s) { console.log('  ' + s); });
  }
  if (sampleErrors.length > 0) {
    console.log('');
    console.log('=== Sample errors ===');
    sampleErrors.forEach(function (s) { console.log('  ' + s); });
  }
  console.log('');
  console.log(dryRun ? 'DRY-RUN complete; no FS state changed.' : 'APPLY complete.');
}

main().catch(function (e) {
  console.error('FATAL:', e.message);
  process.exit(1);
});
