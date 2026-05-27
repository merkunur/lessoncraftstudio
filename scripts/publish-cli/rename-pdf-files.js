/**
 * Atomically rename legacy PDF filenames to slug-based filenames on the
 * Hetzner asset filesystem — retrofit for the PDF-SEO commission's Phase 2
 * (external audit 2026-05-27, third audit).
 *
 * Walks /var/www/lcs-media/decks/<locale>/<slug>-vN/ for the requested
 * locales. For each version dir:
 *   - printable.pdf       → <slug>-printable.pdf
 *   - answer-key.pdf      → <slug>-answer-key.pdf
 *
 * Uses fs.renameSync — atomic on POSIX filesystems per §15.5. If the
 * slug-based file already exists, the legacy file is left in place
 * (idempotent re-run).
 *
 * Concurrent pool default --concurrency=16 bounds wall-clock to ~5 min
 * for ~16,664 deck versions.
 *
 * Pairs with migrate-pdf-urls.js (DB-side URL update) + the nginx 301
 * redirect rule that maps old URLs → new filenames so any
 * Google-indexed / teacher-embedded links to `printable.pdf` keep
 * working transparently.
 *
 * Usage:
 *   node scripts/publish-cli/rename-pdf-files.js --locales=en,de,es
 *   node scripts/publish-cli/rename-pdf-files.js --dry-run
 *   node scripts/publish-cli/rename-pdf-files.js --sample=10
 *   node scripts/publish-cli/rename-pdf-files.js --reverse   (slug → legacy for rollback)
 */

'use strict';

var fs = require('fs');
var path = require('path');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var DEFAULT_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function parseArgs(argv) {
  var out = {
    locales: DEFAULT_LOCALES.slice(),
    decksRoot: DEFAULT_DECKS_DIR,
    sample: 0,
    dryRun: false,
    reverse: false,
    concurrency: 16,
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',').filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice('--decks-root='.length);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice('--sample='.length), 10) || 0;
    else if (a.indexOf('--concurrency=') === 0) out.concurrency = parseInt(a.slice('--concurrency='.length), 10) || 16;
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--reverse') out.reverse = true;
  });
  return out;
}

function walkDecks(rootDir, locale) {
  var localeDir = path.join(rootDir, locale);
  if (!fs.existsSync(localeDir)) return [];
  var entries = fs.readdirSync(localeDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    var p = path.join(localeDir, n);
    var stat;
    try { stat = fs.lstatSync(p); } catch (e) { return false; }
    return stat.isDirectory() && /-v\d+$/.test(n);
  });
  return entries.map(function (n) {
    return {
      versionDirName: n,
      slug: n.replace(/-v\d+$/, ''),
      versionDir: path.join(localeDir, n),
    };
  });
}

/**
 * Atomic rename: if `from` exists AND `to` doesn't, do the rename.
 * If `to` already exists (idempotent re-run), skip.
 * If `from` doesn't exist (already renamed or never present), skip.
 */
function atomicRename(from, to, dryRun) {
  if (!fs.existsSync(from)) return 'not-present';
  if (fs.existsSync(to)) return 'already-renamed';
  if (dryRun) return 'would-rename';
  fs.renameSync(from, to);
  return 'renamed';
}

function processOneDeck(entry, args) {
  var versionDir = entry.versionDir;
  var slug = entry.slug;
  var slugPrintable = path.join(versionDir, slug + '-printable.pdf');
  var legacyPrintable = path.join(versionDir, 'printable.pdf');
  var slugAnswerKey = path.join(versionDir, slug + '-answer-key.pdf');
  var legacyAnswerKey = path.join(versionDir, 'answer-key.pdf');

  var pFrom, pTo, akFrom, akTo;
  if (args.reverse) {
    pFrom = slugPrintable; pTo = legacyPrintable;
    akFrom = slugAnswerKey; akTo = legacyAnswerKey;
  } else {
    pFrom = legacyPrintable; pTo = slugPrintable;
    akFrom = legacyAnswerKey; akTo = slugAnswerKey;
  }
  var pResult = atomicRename(pFrom, pTo, args.dryRun);
  var akResult = atomicRename(akFrom, akTo, args.dryRun);
  return { ok: true, slug: slug, printable: pResult, answerKey: akResult };
}

async function pool(tasks, n, worker) {
  var results = [];
  var idx = 0;
  async function runOne() {
    while (idx < tasks.length) {
      var myIdx = idx++;
      try {
        results[myIdx] = await worker(tasks[myIdx]);
      } catch (e) {
        results[myIdx] = { ok: false, error: e.message || String(e) };
      }
    }
  }
  var runners = [];
  for (var i = 0; i < Math.min(n, tasks.length); i++) runners.push(runOne());
  await Promise.all(runners);
  return results;
}

async function main() {
  var args = parseArgs(process.argv);
  var t0 = Date.now();
  var direction = args.reverse ? 'REVERSE (slug → legacy)' : 'FORWARD (legacy → slug)';
  console.log('[rename-pdf] ' + direction +
    ' locales=' + args.locales.join(',') +
    ' decksRoot=' + args.decksRoot +
    ' concurrency=' + args.concurrency +
    (args.dryRun ? ' (dry-run)' : '') +
    (args.sample ? ' sample=' + args.sample : ''));

  var totals = {
    decksTouched: 0,
    printableRenamed: 0,
    printableSkippedAlready: 0,
    printableNotPresent: 0,
    answerKeyRenamed: 0,
    answerKeySkippedAlready: 0,
    answerKeyNotPresent: 0,
    errors: [],
  };

  for (var li = 0; li < args.locales.length; li++) {
    var loc = args.locales[li];
    var entries = walkDecks(args.decksRoot, loc);
    if (args.sample) entries = entries.slice(0, args.sample);
    console.log('[rename-pdf] ' + loc + ': ' + entries.length + ' deck versions');

    var lt0 = Date.now();
    var results = await pool(entries, args.concurrency, function (entry) {
      return Promise.resolve(processOneDeck(entry, args));
    });

    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      totals.decksTouched++;
      if (r && r.ok) {
        if (r.printable === 'renamed' || r.printable === 'would-rename') totals.printableRenamed++;
        else if (r.printable === 'already-renamed') totals.printableSkippedAlready++;
        else if (r.printable === 'not-present') totals.printableNotPresent++;
        if (r.answerKey === 'renamed' || r.answerKey === 'would-rename') totals.answerKeyRenamed++;
        else if (r.answerKey === 'already-renamed') totals.answerKeySkippedAlready++;
        else if (r.answerKey === 'not-present') totals.answerKeyNotPresent++;
      } else {
        totals.errors.push({
          locale: loc,
          slug: (entries[i] && entries[i].slug) || '?',
          reason: (r && r.error) || 'unknown',
        });
      }
    }
    var lElapsed = ((Date.now() - lt0) / 1000).toFixed(1);
    console.log('[rename-pdf] ' + loc + ' done in ' + lElapsed + 's');
  }

  var elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('');
  console.log('[rename-pdf] ============ SUMMARY ============');
  console.log('[rename-pdf] direction:        ' + direction);
  console.log('[rename-pdf] decks touched:    ' + totals.decksTouched);
  console.log('[rename-pdf] printable renamed:    ' + totals.printableRenamed);
  console.log('[rename-pdf] printable already:    ' + totals.printableSkippedAlready);
  console.log('[rename-pdf] printable absent:     ' + totals.printableNotPresent);
  console.log('[rename-pdf] answer-key renamed:   ' + totals.answerKeyRenamed);
  console.log('[rename-pdf] answer-key already:   ' + totals.answerKeySkippedAlready);
  console.log('[rename-pdf] answer-key absent:    ' + totals.answerKeyNotPresent);
  console.log('[rename-pdf] errors:               ' + totals.errors.length);
  console.log('[rename-pdf] elapsed:              ' + elapsed + 's');
  if (totals.errors.length > 0) {
    var sample = totals.errors.slice(0, 20);
    console.log('[rename-pdf] error sample (first ' + sample.length + ' of ' + totals.errors.length + '):');
    sample.forEach(function (e) { console.log('  ' + e.locale + '/' + e.slug + ': ' + e.reason); });
  }
}

main().catch(function (err) {
  console.error('[rename-pdf] FATAL:', err && err.stack || err);
  process.exit(1);
});
