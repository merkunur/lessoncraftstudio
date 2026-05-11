#!/usr/bin/env node
/**
 * retrofit-mu-pre-migration-residue.js — (μ) Phase 2 (2a-revised) retrofit.
 *
 * Backfills title_hash + description_hash for pre-migration NULL Deck rows.
 *
 * Per (μ) Phase 1 diagnostic-revised (commit 0e51ba8d): the 1,483 NULL
 * title_hash decks (1,288 en + 195 Tier 3+4) were created BEFORE the
 * 2026-05-09 schema migration that added title_hash + description_hash
 * columns. Post-migration publishes (1,202+ new en decks) have 100%
 * backfill correct. The residue is pre-migration historical data, not
 * regression class.
 *
 * Verified at planning step: pre-migration deck.html <title> tags are
 * per-deck-unique (theme + educational_level included in title shape per
 * §17.8.1 buildSeoHead). Hash computation from deck.html <title> tag
 * produces collision-free unique values across pre-migration decks.
 *
 * Approach:
 *   1. Read all NULL title_hash decks from DB
 *   2. For each, fetch deck.html via CDN URL
 *   3. Extract <title> + <meta name="description"> content via regex
 *   4. Compute sha256 of each
 *   5. Bulk-update DB row with hashes
 *
 * USAGE:
 *   node retrofit-mu-pre-migration-residue.js --dry-run
 *   node retrofit-mu-pre-migration-residue.js --confirm
 *
 * EXIT CODES:
 *   0 — success
 *   1 — retrofit failure
 *   2 — usage / IO error
 */

'use strict';

var crypto = require('crypto');
var https = require('https');
var db = require('./db');

var DOMAIN = 'https://www.lessoncraftstudio.com';
var BATCH_SIZE = 50;
var CONCURRENT_FETCHES = 8;

function sha256(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex');
}

function fetchHtml(url) {
  return new Promise(function (resolve, reject) {
    var req = https.get(url, function (res) {
      var chunks = [];
      res.on('data', function (c) { chunks.push(c); });
      res.on('end', function () {
        if (res.statusCode === 200) {
          resolve(Buffer.concat(chunks).toString('utf-8'));
        } else if (res.statusCode === 404) {
          resolve(null); // skip 404s
        } else {
          reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, function () { req.destroy(new Error('timeout')); });
  });
}

function extractTitleAndDescription(html) {
  var titleMatch = /<title>([^<]+)<\/title>/i.exec(html);
  var descMatch = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(html);
  return {
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null
  };
}

async function processBatch(rows, dryRun) {
  var results = [];
  // Process N concurrent fetches at a time
  for (var i = 0; i < rows.length; i += CONCURRENT_FETCHES) {
    var slice = rows.slice(i, i + CONCURRENT_FETCHES);
    var promises = slice.map(async function (row) {
      var url = DOMAIN + '/' + row.language + '/decks/' + row.slug + '/';
      try {
        var html = await fetchHtml(url);
        if (!html) {
          return { id: row.id, status: 'not-found', url: url };
        }
        var extracted = extractTitleAndDescription(html);
        if (!extracted.title) {
          return { id: row.id, status: 'no-title', url: url };
        }
        var titleHash = sha256(extracted.title);
        var descriptionHash = extracted.description ? sha256(extracted.description) : null;
        return {
          id: row.id,
          slug: row.slug,
          language: row.language,
          status: 'ok',
          titleHash: titleHash,
          descriptionHash: descriptionHash,
          title: extracted.title,
          description: extracted.description
        };
      } catch (e) {
        return { id: row.id, status: 'error', error: e.message, url: url };
      }
    });
    var batchResults = await Promise.all(promises);
    results.push.apply(results, batchResults);
  }

  // Apply updates (skip in dry-run)
  if (!dryRun) {
    var prisma = db.client();
    for (var j = 0; j < results.length; j++) {
      var r = results[j];
      if (r.status !== 'ok') continue;
      try {
        await prisma.deck.update({
          where: { id: r.id },
          data: {
            titleHash: r.titleHash,
            descriptionHash: r.descriptionHash
          }
        });
        r.updated = true;
      } catch (e) {
        r.updateError = e.message;
        r.status = 'update-failed';
      }
    }
  }

  return results;
}

async function main() {
  var argv = process.argv.slice(2);
  var dryRun = argv.indexOf('--dry-run') >= 0;
  var confirm = argv.indexOf('--confirm') >= 0;

  if (!dryRun && !confirm) {
    console.error('Usage: node retrofit-mu-pre-migration-residue.js [--dry-run | --confirm]');
    process.exit(2);
  }

  console.log('=== (μ) Phase 2 (2a-revised) retrofit ===');
  console.log('Mode: ' + (dryRun ? 'DRY-RUN (no DB writes)' : 'REAL (will write to DB)'));
  console.log('');

  var prisma = db.client();

  // Fetch all NULL title_hash decks
  console.log('Fetching NULL title_hash decks from DB...');
  var nullRows = await prisma.deck.findMany({
    where: { titleHash: null },
    select: { id: true, slug: true, language: true },
    orderBy: [{ language: 'asc' }, { createdAt: 'asc' }]
  });
  console.log('Found ' + nullRows.length + ' NULL title_hash decks');

  // Per-locale breakdown
  var perLocale = {};
  nullRows.forEach(function (r) {
    perLocale[r.language] = (perLocale[r.language] || 0) + 1;
  });
  console.log('Per-locale:');
  Object.keys(perLocale).sort().forEach(function (l) {
    console.log('  ' + l + ': ' + perLocale[l]);
  });
  console.log('');

  if (nullRows.length === 0) {
    console.log('No NULL rows to backfill. Exiting.');
    await db.disconnect();
    return;
  }

  // Process in batches
  var startTime = Date.now();
  var allResults = [];
  for (var i = 0; i < nullRows.length; i += BATCH_SIZE) {
    var batch = nullRows.slice(i, i + BATCH_SIZE);
    console.log('Batch ' + Math.floor(i / BATCH_SIZE + 1) + '/' + Math.ceil(nullRows.length / BATCH_SIZE) + ' (' + batch.length + ' decks, total ' + (i + batch.length) + ' of ' + nullRows.length + ')...');
    var batchResults = await processBatch(batch, dryRun);
    allResults.push.apply(allResults, batchResults);
  }
  var elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  // Tally results
  var ok = allResults.filter(function (r) { return r.status === 'ok'; });
  var updated = allResults.filter(function (r) { return r.updated; });
  var notFound = allResults.filter(function (r) { return r.status === 'not-found'; });
  var noTitle = allResults.filter(function (r) { return r.status === 'no-title'; });
  var errors = allResults.filter(function (r) { return r.status === 'error'; });
  var updateFailed = allResults.filter(function (r) { return r.status === 'update-failed'; });

  console.log('');
  console.log('=== Summary (' + elapsed + 's) ===');
  console.log('  Total processed:    ' + allResults.length);
  console.log('  OK (hash computed): ' + ok.length);
  if (!dryRun) console.log('  DB updated:         ' + updated.length);
  console.log('  Not found (404):    ' + notFound.length);
  console.log('  No <title>:         ' + noTitle.length);
  console.log('  Fetch errors:       ' + errors.length);
  if (!dryRun) console.log('  Update failures:    ' + updateFailed.length);

  if (notFound.length > 0 && notFound.length < 20) {
    console.log('');
    console.log('Not-found URLs:');
    notFound.forEach(function (r) { console.log('  - ' + r.url); });
  } else if (notFound.length >= 20) {
    console.log('');
    console.log('First 10 not-found URLs:');
    notFound.slice(0, 10).forEach(function (r) { console.log('  - ' + r.url); });
  }

  if (errors.length > 0) {
    console.log('');
    console.log('Errors:');
    errors.slice(0, 10).forEach(function (r) { console.log('  - ' + r.url + ': ' + r.error); });
  }

  if (updateFailed.length > 0) {
    console.log('');
    console.log('Update failures:');
    updateFailed.slice(0, 10).forEach(function (r) { console.log('  - ' + r.id + ' (' + r.language + '/' + r.slug + '): ' + r.updateError); });
  }

  if (dryRun) {
    console.log('');
    console.log('DRY-RUN COMPLETE. Sample of first 3 OK results:');
    ok.slice(0, 3).forEach(function (r) {
      console.log('  [' + r.language + '/' + r.slug + ']');
      console.log('    title:       ' + (r.title || '').slice(0, 80));
      console.log('    title_hash:  ' + r.titleHash);
      console.log('    desc_hash:   ' + r.descriptionHash);
    });
    console.log('');
    console.log('Run with --confirm to apply DB updates.');
  } else {
    console.log('');
    console.log('REAL-MODE COMPLETE. ' + updated.length + ' rows updated in DB.');
  }

  await db.disconnect();
}

main().catch(function (e) {
  console.error('Fatal:', e);
  process.exit(1);
});
