#!/usr/bin/env node
/**
 * Analytics-beacon retrofit (commission #8, 2026-07-03): inject the first-party
 * Umami tracker into every published deck.html.
 *
 * Why: deck pages are nginx-served static files that bypass Next.js entirely, so
 * the root-layout <UmamiBeacon/> never reaches them — yet they are the largest
 * page population. One idempotent <script> line per deck closes the gap. The src
 * is ABSOLUTE (www) so the beacon also fires when a deck is embedded on a
 * third-party site (embed analytics: Umami records the embedder's hostname) and
 * fails silently for offline/downloaded copies.
 *
 * Privacy: cookieless, no PII, EU-self-hosted (see UmamiBeacon.tsx notes).
 * The website id is public by nature (it appears in page source site-wide).
 *
 * Sibling of inject-embed-hide-style.js (same symlink walk / atomic write /
 * idempotency marker / per-locale summary). Inserted at the TOP of <head> so the
 * hreflang block stays last (§17.8.1). Re-run per wave via publish-wave.js.
 *
 * Usage:
 *   node scripts/publish-cli/inject-analytics-beacon.js [--dry-run] [--locale=<code>] [--limit=<N>]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var waveScope = require('./wave-scope');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
var WEBSITE_ID = 'd88b3d75-2b0d-4db9-a434-170589c70e1d';

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var TARGET_LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;
var WAVE_SLUGS = waveScope.loadSlugSet(argv);

var MARKER = 'id="lcs-insights"';
var SCRIPT = '<script id="lcs-insights" defer src="https://www.lessoncraftstudio.com/lcs-insights.js" data-website-id="' + WEBSITE_ID + '"></script>\n';

function injectIntoDeckHtml(content) {
  if (content.indexOf(MARKER) !== -1) return { alreadyApplied: true };
  var m = /<head\b[^>]*>/i.exec(content);
  if (!m) return { error: 'no <head> for beacon insertion' };
  var at = m.index + m[0].length;
  var next = content.slice(0, at) + '\n' + SCRIPT + content.slice(at);
  return { changed: true, content: next };
}

function atomicWrite(filePath, content) {
  var tmp = filePath + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, filePath);
}

function processDeck(locale, slug) {
  var localeDir = path.join(DECKS_ROOT, locale);
  var symlinkPath = path.join(localeDir, slug);
  var stat;
  try { stat = fs.lstatSync(symlinkPath); } catch (e) { return { ok: false, error: 'lstat: ' + e.message }; }
  if (!stat.isSymbolicLink()) return { ok: false, error: 'not a symlink (skipped)' };
  var target = fs.readlinkSync(symlinkPath);
  var targetDir = path.isAbsolute(target) ? target : path.join(localeDir, target);
  var deckHtmlPath = path.join(targetDir, 'deck.html');
  if (!fs.existsSync(deckHtmlPath)) return { ok: false, error: 'deck.html missing' };

  var content = fs.readFileSync(deckHtmlPath, 'utf8');
  var result = injectIntoDeckHtml(content);
  if (result.error) return { ok: false, error: result.error };
  if (result.alreadyApplied) return { ok: true, alreadyApplied: true };
  if (!DRY_RUN) atomicWrite(deckHtmlPath, result.content);
  return { ok: true, applied: true };
}

function main() {
  console.log('=== inject-analytics-beacon ===');
  console.log('mode:   ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE'));
  console.log('locale: ' + (TARGET_LOCALE || 'all 11'));
  console.log('');

  var locales = TARGET_LOCALE ? [TARGET_LOCALE] : ALL_LOCALES;
  var totalProcessed = 0, totalApplied = 0, totalAlready = 0, totalFailed = 0;
  var failures = [];

  for (var li = 0; li < locales.length; li++) {
    var locale = locales[li];
    var localeDir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(localeDir)) continue;
    var slugs = fs.readdirSync(localeDir).filter(function (name) {
      if (name.startsWith('.')) return false;
      return !/-v\d+$/.test(name);
    }).filter(function (name) { return waveScope.inSet(WAVE_SLUGS, name); });
    console.log('[' + locale + '] ' + slugs.length + ' deck symlinks');
    for (var si = 0; si < slugs.length; si++) {
      if (totalProcessed >= TARGET_LIMIT) break;
      totalProcessed++;
      try {
        var r = processDeck(locale, slugs[si]);
        if (!r.ok) { totalFailed++; failures.push(locale + '/' + slugs[si] + ': ' + r.error); }
        else if (r.alreadyApplied) { totalAlready++; }
        else { totalApplied++; }
      } catch (e) {
        totalFailed++; failures.push(locale + '/' + slugs[si] + ': ' + e.message);
      }
    }
    if (totalProcessed >= TARGET_LIMIT) break;
  }

  console.log('');
  console.log('=== summary ===');
  console.log('  processed:       ' + totalProcessed);
  console.log('  applied:         ' + totalApplied);
  console.log('  already-applied: ' + totalAlready);
  console.log('  failed:          ' + totalFailed);
  if (failures.length) {
    console.log('=== failures (first 20) ===');
    failures.slice(0, 20).forEach(function (f) { console.log('  ' + f); });
  }
  process.exit(totalFailed > 0 ? 1 : 0);
}

main();
