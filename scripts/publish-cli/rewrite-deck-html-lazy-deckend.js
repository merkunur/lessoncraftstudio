#!/usr/bin/env node
/**
 * Retrofit: two zero-quality-loss deck.html mobile-perf tweaks (page-speed audit
 * 2026-06, "decks ≥85 mobile" follow-on).
 *
 *   R1 — Lazy-load the end-of-deck suggestion thumbnails.
 *        The "try these next" strip renders 6 <img class="lcs-deckend-thumb">
 *        (~150KB PNGs each ≈ ~900KB) at the very bottom of the page, but they were
 *        EAGER-loaded (loading="lazy" appeared 0× in deck.html). That ~900KB was
 *        ~83% of a deck's 1,078KB mobile payload and starved the throttled mobile
 *        connection that the LCP backdrop needs. Add loading="lazy" decoding="async".
 *        The <a> links stay crawlable (SEO unaffected); only the <img> fetch defers.
 *
 *   R2 — Make the Fredoka Google-Fonts stylesheet non-render-blocking.
 *        It is the deck's only external render-blocking request. Inline deck styles
 *        are separate, so async-loading is safe (text already paints via display=swap;
 *        Fredoka swaps in when ready). Rewrite to the standard
 *        media="print" onload="this.media='all'" pattern + a <noscript> fallback.
 *        (Verified: deck.html has no CSP, so the inline onload runs.)
 *
 * Both are purely additive, idempotent, and visually neutral. No DB/network.
 * Atomicity: backup (.bak.lazy-deckend) → temp → rename(2) per §15.5.
 * rewrite-deck-html-*.js family (§A.14.9 / §21.2).
 *
 * Usage (run on Hetzner):
 *   node scripts/publish-cli/rewrite-deck-html-lazy-deckend.js --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-lazy-deckend.js --dry-run --locales=no,da --sample=5
 *   node scripts/publish-cli/rewrite-deck-html-lazy-deckend.js --confirm --locales=no
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DEFAULT_DECKS_ROOT = '/var/www/lcs-media/decks';
var LOCALE_CHUNK_ORDER = ['no', 'da', 'fi', 'sv', 'nl', 'it', 'pt', 'es', 'fr', 'de', 'en'];

// R1: any <img …class="lcs-deckend-thumb"…> tag (alt may be filled or empty).
var DECKEND_THUMB_TAG = /<img\s[^>]*class="lcs-deckend-thumb"[^>]*>/g;
// R2: the Fredoka stylesheet link in its render-blocking form (closing '>' right
// after rel="stylesheet"; the rewritten form has media=… after it, so this never
// re-matches → idempotent by construction).
var FREDOKA_LINK = /<link href="(https:\/\/fonts\.googleapis\.com\/css2\?family=Fredoka[^"]*)" rel="stylesheet">/;

function parseArgs(argv) {
  var out = { dryRun: true, confirm: false, decksRoot: DEFAULT_DECKS_ROOT, locales: LOCALE_CHUNK_ORDER.slice(), sample: null };
  argv.slice(2).forEach(function (a) {
    if (a === '--confirm') { out.confirm = true; out.dryRun = false; }
    else if (a === '--dry-run') { out.dryRun = true; out.confirm = false; }
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice(9), 10);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node rewrite-deck-html-lazy-deckend.js [--dry-run|--confirm] [--locales=no,da] [--sample=N] [--decks-root=path]');
      process.exit(0);
    }
  });
  return out;
}

/** Apply R1 + R2. Returns {html, lazyAdded, fontAsync}. */
function rewriteHtml(html) {
  var lazyAdded = 0;
  var out = html.replace(DECKEND_THUMB_TAG, function (tag) {
    if (/\sloading=/.test(tag)) return tag;                 // idempotent
    lazyAdded++;
    return tag.replace(/^<img\s/, '<img loading="lazy" decoding="async" ');
  });

  // Idempotency guard: if the async form already exists, skip — otherwise the
  // <noscript> fallback we inject (which itself contains a rel="stylesheet">
  // Fredoka link) would re-match FREDOKA_LINK and nest on every re-run.
  var fontAsync = false;
  if (out.indexOf("onload=\"this.media='all'\"") === -1 && FREDOKA_LINK.test(out)) {
    out = out.replace(FREDOKA_LINK,
      '<link href="$1" rel="stylesheet" media="print" onload="this.media=\'all\'">' +
      '<noscript><link href="$1" rel="stylesheet"></noscript>');
    fontAsync = true;
  }
  return { html: out, lazyAdded: lazyAdded, fontAsync: fontAsync };
}

function listDeckDirs(decksRoot, locale, sampleN) {
  var d = path.join(decksRoot, locale);
  if (!fs.existsSync(d)) return [];
  var dirs = fs.readdirSync(d, { withFileTypes: true })
    .filter(function (e) { return e.isDirectory() && !e.name.startsWith('.'); })
    .map(function (e) { return path.join(d, e.name); });
  if (sampleN && sampleN > 0 && dirs.length > sampleN) dirs = dirs.slice(0, sampleN);
  return dirs;
}

function processDeck(deckDir, opts) {
  var htmlPath = path.join(deckDir, 'deck.html');
  if (!fs.existsSync(htmlPath)) return { status: 'missing' };
  var raw = fs.readFileSync(htmlPath, 'utf8');
  var r = rewriteHtml(raw);
  if (r.lazyAdded === 0 && !r.fontAsync) return { status: 'idempotent' };
  if (opts.dryRun) return { status: 'would-rewrite', lazyAdded: r.lazyAdded, fontAsync: r.fontAsync };
  var bak = htmlPath + '.bak.lazy-deckend';
  var tmp = htmlPath + '.tmp.lazy-deckend';
  try {
    if (!fs.existsSync(bak)) fs.copyFileSync(htmlPath, bak);
    fs.writeFileSync(tmp, r.html, 'utf8');
    fs.renameSync(tmp, htmlPath);
  } catch (e) { return { status: 'fs-error', error: e.message }; }
  return { status: 'written', lazyAdded: r.lazyAdded, fontAsync: r.fontAsync };
}

function main() {
  var opts = parseArgs(process.argv);
  console.log('=== deck-end lazy-load + font-async retrofit ===');
  console.log('mode:       ' + (opts.dryRun ? 'DRY-RUN (no writes)' : 'APPLY (--confirm)'));
  console.log('decks-root: ' + opts.decksRoot);
  console.log('locales:    ' + opts.locales.join(', '));
  console.log('sample:     ' + (opts.sample || 'all') + '\n');

  var grand = { total: 0, rewrite: 0, idempotent: 0, errors: 0, lazyImgs: 0, fonts: 0 };
  opts.locales.forEach(function (locale) {
    var t = { total: 0, rewrite: 0, idempotent: 0, errors: 0, lazyImgs: 0, fonts: 0 };
    listDeckDirs(opts.decksRoot, locale, opts.sample).forEach(function (deckDir) {
      var res = processDeck(deckDir, opts);
      t.total++;
      if (res.status === 'written' || res.status === 'would-rewrite') { t.rewrite++; t.lazyImgs += (res.lazyAdded || 0); if (res.fontAsync) t.fonts++; }
      else if (res.status === 'idempotent') t.idempotent++;
      else if (res.status === 'fs-error') { t.errors++; console.log('  ERROR ' + deckDir + ': ' + res.error); }
    });
    ['total', 'rewrite', 'idempotent', 'errors', 'lazyImgs', 'fonts'].forEach(function (k) { grand[k] += t[k]; });
    console.log('[' + locale + '] ' + t.total + ' decks; ' + (opts.dryRun ? t.rewrite + ' would-rewrite' : t.rewrite + ' written') +
      ' (' + t.lazyImgs + ' imgs lazied, ' + t.fonts + ' fonts async), ' + t.idempotent + ' idempotent, ' + t.errors + ' errors');
  });

  console.log('\n=== Summary ===');
  console.log('Total decks:   ' + grand.total);
  console.log((opts.dryRun ? 'Would rewrite: ' : 'Rewritten:     ') + grand.rewrite);
  console.log('Imgs lazied:   ' + grand.lazyImgs);
  console.log('Fonts async:   ' + grand.fonts);
  console.log('Idempotent:    ' + grand.idempotent);
  console.log('Errors:        ' + grand.errors);
  process.exit(grand.errors > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { rewriteHtml: rewriteHtml };
