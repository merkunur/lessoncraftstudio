/**
 * Bulk-update Deck.pdfUrl + Deck.answerKeyUrl in Postgres to reflect the
 * new slug-based PDF filename convention (post external SEO audit
 * 2026-05-27, third audit).
 *
 * Source pattern (legacy):
 *   https://www.lessoncraftstudio.com/<locale>/decks/<slug>/printable.pdf
 *   https://www.lessoncraftstudio.com/<locale>/decks/<slug>/answer-key.pdf
 *
 * Target pattern (new):
 *   https://www.lessoncraftstudio.com/<locale>/decks/<slug>/<slug>-printable.pdf
 *   https://www.lessoncraftstudio.com/<locale>/decks/<slug>/<slug>-answer-key.pdf
 *
 * Pairs with:
 *   - rename-pdf-files.js  (filesystem rename, must run BEFORE this)
 *   - nginx 301 redirect rule (server-side, redirects legacy URL → new)
 *   - publish.js forward-path change (new publishes write new pattern)
 *
 * Algorithm: find all published decks where pdfUrl ends in '/printable.pdf';
 * rewrite to slug-based form. Idempotent — re-running has no effect
 * (already-migrated rows don't match the legacy pattern).
 *
 * Usage:
 *   node scripts/publish-cli/migrate-pdf-urls.js --dry-run
 *   node scripts/publish-cli/migrate-pdf-urls.js --confirm
 *   node scripts/publish-cli/migrate-pdf-urls.js --locales=en,de --confirm
 *   node scripts/publish-cli/migrate-pdf-urls.js --reverse --confirm   (rollback)
 */

'use strict';

var db = require('./db');

var LEGACY_PRINTABLE_SUFFIX = '/printable.pdf';
var LEGACY_ANSWER_KEY_SUFFIX = '/answer-key.pdf';

function parseArgs(argv) {
  var out = {
    locales: null,
    dryRun: false,
    confirm: false,
    reverse: false,
    batchSize: 100,
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',').filter(Boolean);
    else if (a.indexOf('--batch-size=') === 0) out.batchSize = parseInt(a.slice('--batch-size='.length), 10) || 100;
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--confirm') out.confirm = true;
    else if (a === '--reverse') out.reverse = true;
  });
  return out;
}

/**
 * Compute new URL for a single field. Returns null if no rewrite needed.
 *
 * Forward direction:
 *   ../decks/<slug>/printable.pdf → ../decks/<slug>/<slug>-printable.pdf
 * Reverse direction:
 *   ../decks/<slug>/<slug>-printable.pdf → ../decks/<slug>/printable.pdf
 */
function rewriteUrl(url, slug, kind, reverse) {
  if (!url || typeof url !== 'string') return null;
  var legacySuffix = (kind === 'printable')
    ? LEGACY_PRINTABLE_SUFFIX
    : LEGACY_ANSWER_KEY_SUFFIX;
  var slugSuffix = '/' + slug + '-' + (kind === 'printable' ? 'printable' : 'answer-key') + '.pdf';
  if (reverse) {
    if (url.endsWith(slugSuffix)) {
      return url.slice(0, url.length - slugSuffix.length) + legacySuffix;
    }
    return null;
  }
  if (url.endsWith(legacySuffix)) {
    return url.slice(0, url.length - legacySuffix.length) + slugSuffix;
  }
  return null;
}

async function main() {
  var args = parseArgs(process.argv);
  var direction = args.reverse ? 'REVERSE (new → legacy)' : 'FORWARD (legacy → new)';
  console.log('[migrate-pdf-urls] ' + direction +
    (args.locales ? ' locales=' + args.locales.join(',') : ' (all locales)') +
    (args.dryRun ? ' [DRY-RUN]' : (args.confirm ? ' [CONFIRM]' : ' [NO-FLAG → DRY-RUN BY DEFAULT]')));

  if (!args.dryRun && !args.confirm) {
    console.log('[migrate-pdf-urls] Neither --dry-run nor --confirm — defaulting to DRY-RUN.');
    args.dryRun = true;
  }

  var c = db.client();
  var whereClause = { status: 'published' };
  if (args.locales) whereClause.language = { in: args.locales };

  console.log('[migrate-pdf-urls] querying decks ...');
  var t0 = Date.now();
  var decks = await c.deck.findMany({
    where: whereClause,
    select: { id: true, slug: true, language: true, pdfUrl: true, answerKeyUrl: true },
  });
  console.log('[migrate-pdf-urls] ' + decks.length + ' deck rows found in ' +
    ((Date.now() - t0) / 1000).toFixed(1) + 's');

  var stats = {
    examined: decks.length,
    pdfUrlRewrites: 0,
    answerKeyUrlRewrites: 0,
    pdfUrlAlreadyNew: 0,
    answerKeyUrlAlreadyNew: 0,
    pdfUrlMissing: 0,
    answerKeyUrlMissing: 0,
    updates: 0,
    errors: [],
  };

  for (var i = 0; i < decks.length; i++) {
    var d = decks[i];
    var newPdfUrl = rewriteUrl(d.pdfUrl, d.slug, 'printable', args.reverse);
    var newAnswerKeyUrl = d.answerKeyUrl
      ? rewriteUrl(d.answerKeyUrl, d.slug, 'answer-key', args.reverse)
      : null;

    if (!d.pdfUrl) {
      stats.pdfUrlMissing++;
    } else if (newPdfUrl) {
      stats.pdfUrlRewrites++;
    } else {
      stats.pdfUrlAlreadyNew++;
    }
    if (!d.answerKeyUrl) {
      stats.answerKeyUrlMissing++;
    } else if (newAnswerKeyUrl) {
      stats.answerKeyUrlRewrites++;
    } else {
      stats.answerKeyUrlAlreadyNew++;
    }

    if (!newPdfUrl && !newAnswerKeyUrl) continue;

    if (args.dryRun) {
      stats.updates++;
      continue;
    }

    try {
      var updateData = {};
      if (newPdfUrl) updateData.pdfUrl = newPdfUrl;
      if (newAnswerKeyUrl) updateData.answerKeyUrl = newAnswerKeyUrl;
      await c.deck.update({ where: { id: d.id }, data: updateData });
      stats.updates++;
    } catch (e) {
      stats.errors.push({
        id: d.id,
        slug: d.slug,
        language: d.language,
        reason: e.message || String(e),
      });
    }

    if ((i + 1) % 500 === 0) {
      var elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      console.log('[migrate-pdf-urls] progress ' + (i + 1) + '/' + decks.length +
        ' (' + elapsed + 's elapsed) updates=' + stats.updates);
    }
  }

  var totalElapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('');
  console.log('[migrate-pdf-urls] ============ SUMMARY ============');
  console.log('[migrate-pdf-urls] direction:             ' + direction);
  console.log('[migrate-pdf-urls] rows examined:         ' + stats.examined);
  console.log('[migrate-pdf-urls] pdfUrl needs rewrite:    ' + stats.pdfUrlRewrites);
  console.log('[migrate-pdf-urls] pdfUrl already new:      ' + stats.pdfUrlAlreadyNew);
  console.log('[migrate-pdf-urls] pdfUrl missing:          ' + stats.pdfUrlMissing);
  console.log('[migrate-pdf-urls] answerKey needs rewrite: ' + stats.answerKeyUrlRewrites);
  console.log('[migrate-pdf-urls] answerKey already new:   ' + stats.answerKeyUrlAlreadyNew);
  console.log('[migrate-pdf-urls] answerKey missing:       ' + stats.answerKeyUrlMissing);
  console.log('[migrate-pdf-urls] rows updated:            ' + stats.updates +
    (args.dryRun ? ' (would-update; --dry-run did not write)' : ''));
  console.log('[migrate-pdf-urls] errors:                  ' + stats.errors.length);
  console.log('[migrate-pdf-urls] elapsed:                 ' + totalElapsed + 's');
  if (stats.errors.length > 0) {
    var sample = stats.errors.slice(0, 20);
    console.log('[migrate-pdf-urls] error sample (first ' + sample.length + ' of ' + stats.errors.length + '):');
    sample.forEach(function (e) { console.log('  ' + e.language + '/' + e.slug + ' (' + e.id + '): ' + e.reason); });
  }

  await db.disconnect();
}

main().catch(function (err) {
  console.error('[migrate-pdf-urls] FATAL:', err && err.stack || err);
  process.exit(1);
});
