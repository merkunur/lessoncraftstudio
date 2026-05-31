#!/usr/bin/env node
/**
 * Embed-hide retrofit: inject an idempotent <style id="lcs-embed-hide"> into every
 * published deck.html so the in-deck INTERNAL link sections do NOT render when the
 * deck is loaded inside an embed iframe on a third-party site.
 *
 * Why: the same deck.html is served both standalone AND inside an <iframe>. Its
 * baked embed-context JS adds `body.lcs-embedded` when window.parent !== window
 * (catalog-export.js buildEmbedAffordance) and tightens chrome paddings, but it
 * does NOT hide the two internal-navigation sections:
 *   - <aside class="lcs-end-deck">          ("Want more?" topic links)
 *   - <section class="lcs-deckend-suggestions"> ("Try one of these next" reel)
 * Those are LCS-internal links that shouldn't appear on someone else's page. We
 * hide BOTH in embed context only; the standalone deck page keeps them (good for
 * SEO — the links stay in the DOM, just display:none inside an iframe).
 *
 * Mechanism: a tiny static <style> keyed on `body.lcs-embedded` (the class every
 * published deck already adds at runtime inside an iframe). Because it keys on that
 * runtime class, one static rule works on ALL existing + future decks regardless of
 * what the baked embed-JS block contains. No catalog-export.js change is needed.
 *
 * Architecturally a sibling of inject-deck-end-topic-links.js / inject-deck-end-strip.js
 * (same symlink walk / atomic .tmp+rename / idempotency / per-locale summary). NO DB
 * dependency. Per CLAUDE.md §15.17 salvage pattern + §17.8.16 atomic rewrite.
 *
 * Usage:
 *   node scripts/publish-cli/inject-embed-hide-style.js [--dry-run] [--locale=<code>] [--limit=<N>]
 *
 * Exit: 0 = all processed (skip-or-success); 1 = any deck failed.
 */

'use strict';

var fs = require('fs');
var path = require('path');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var TARGET_LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;

// Idempotency marker + the injected style. display:none!important defeats any
// per-app inline CSS via cascade; keyed on body.lcs-embedded so it ONLY fires
// inside an iframe.
var MARKER = 'id="lcs-embed-hide"';
var STYLE = '<style id="lcs-embed-hide">body.lcs-embedded .lcs-end-deck,body.lcs-embedded .lcs-deckend-suggestions{display:none!important}</style>\n';

// Returns { changed, content } | { alreadyApplied } | { error }.
// Insert at the TOP of <head> (right after the opening tag) so the style never
// lands after the hreflang block (which must stay last in <head> per §17.8.1.5).
function injectIntoDeckHtml(content) {
  if (content.indexOf(MARKER) !== -1) return { alreadyApplied: true };
  var m = /<head\b[^>]*>/i.exec(content);
  if (!m) return { error: 'no <head> for embed-hide style insertion' };
  var at = m.index + m[0].length;
  var next = content.slice(0, at) + '\n' + STYLE + content.slice(at);
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
  if (result.changed) {
    if (!DRY_RUN) atomicWrite(deckHtmlPath, result.content);
    return { ok: true, applied: true };
  }
  return { ok: false, error: 'unexpected result shape' };
}

function main() {
  console.log('=== inject-embed-hide-style ===');
  console.log('mode:   ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE'));
  console.log('locale: ' + (TARGET_LOCALE || 'all 11'));
  console.log('limit:  ' + (TARGET_LIMIT === Infinity ? 'no limit' : TARGET_LIMIT));
  console.log('');

  var locales = TARGET_LOCALE ? [TARGET_LOCALE] : ALL_LOCALES;
  var totalProcessed = 0, totalApplied = 0, totalAlready = 0, totalFailed = 0;
  var failures = [];
  var perLocale = {};

  for (var li = 0; li < locales.length; li++) {
    var locale = locales[li];
    var localeDir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(localeDir)) continue;
    var slugs = fs.readdirSync(localeDir).filter(function (name) {
      if (name.startsWith('.')) return false;
      return !/-v\d+$/.test(name);
    });
    perLocale[locale] = { total: slugs.length, applied: 0, already: 0, failed: 0 };
    console.log('[' + locale + '] ' + slugs.length + ' deck symlinks');
    for (var si = 0; si < slugs.length; si++) {
      if (totalProcessed >= TARGET_LIMIT) break;
      var slug = slugs[si];
      totalProcessed++;
      try {
        var r = processDeck(locale, slug);
        if (!r.ok) { totalFailed++; perLocale[locale].failed++; failures.push(locale + '/' + slug + ': ' + r.error); }
        else if (r.alreadyApplied) { totalAlready++; perLocale[locale].already++; }
        else { totalApplied++; perLocale[locale].applied++; }
      } catch (e) {
        totalFailed++; perLocale[locale].failed++; failures.push(locale + '/' + slug + ': ' + e.message);
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
  console.log('');
  console.log('=== per-locale ===');
  Object.keys(perLocale).forEach(function (loc) {
    var s = perLocale[loc];
    console.log('  ' + loc + ':  total=' + s.total + ' applied=' + s.applied + ' already=' + s.already + ' failed=' + s.failed);
  });
  if (failures.length > 0) {
    console.log('');
    console.log('=== failures (first 40) ===');
    failures.slice(0, 40).forEach(function (f) { console.log('  - ' + f); });
    console.log('  (' + failures.length + ' total failures)');
  }
  process.exit(failures.length > 0 ? 1 : 0);
}

main();
