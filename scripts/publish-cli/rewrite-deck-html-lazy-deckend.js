#!/usr/bin/env node
/**
 * Retrofit: four zero-quality-loss deck.html mobile-perf tweaks (page-speed audit
 * 2026-06, "decks ≥85 mobile" follow-on). R1 lazy-loads the deck-end thumbnails
 * (the LCP win); R2 makes the font non-render-blocking (safe once R4 pins the bar — the
 * earlier "font CLS" was the bar-wrap, not font-swap); R3 un-hides the deck-end suggestions section so its
 * hidden→shown load transition stops shifting layout; R4 sets the .lcs-bar to
 * flex-wrap:nowrap so it can't wrap to 2 lines and shove the worksheet down (the
 * intermittent-CLS win). See per-rule notes by each regex below.
 *
 *   R1 — Lazy-load the end-of-deck suggestion thumbnails.
 *        The "try these next" strip renders 6 <img class="lcs-deckend-thumb">
 *        (~150KB PNGs each ≈ ~900KB) at the very bottom of the page, but they were
 *        EAGER-loaded (loading="lazy" appeared 0× in deck.html). That ~900KB was
 *        ~83% of a deck's 1,078KB mobile payload and starved the throttled mobile
 *        connection that the LCP backdrop needs. Add loading="lazy" decoding="async".
 *        The <a> links stay crawlable (SEO unaffected); only the <img> fetch defers.
 *
 *   R2 — Make the Fredoka stylesheet NON-render-blocking (media="print" onload +
 *        <noscript>). It was the FCP bottleneck (~3.2s → ~1.6s mobile). Safe ONLY
 *        because R4 pins the bar to one line — an earlier async attempt without R4
 *        seemed to cause CLS, but that was the bar-wrap, not font-swap. With R4,
 *        async font is pure win: CLS ~0.001 (sudoku 97, addition 98-100, stable).
 *
 * All four idempotent + visually neutral. No DB/network.
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
// R3: the suggestions <section> is emitted `hidden` (display:none) and only
// revealed on the completion celebration. That hidden→shown transition during
// load caused a large CLS on some decks (wordsearch 0.37, find-and-count) with no
// final-state difference (the strip is below the fold; screenshots identical). The
// section now renders in normal flow from the start — CLS ~0.01, above-fold
// unchanged, embeds still hide it via the body.lcs-embedded CSS, and the
// celebration's mi.appendChild(stripEl) still pulls it into the modal on finish.
var SUGGESTIONS_SECTION_HIDDEN = /(<section class="lcs-deckend-suggestions") hidden /g;
// R4: the .lcs-bar uses flex-wrap:wrap. When a bar text element widens at load
// (e.g. the progress counter populating), a 40x40 button wraps to a 2nd line, the
// sticky bar grows ~52px, and the worksheet below shifts down 52px → large,
// INTERMITTENT mobile CLS (trace-attributed; addition/wordsearch ~0.37 on ~1/3 of
// runs). nowrap keeps the bar one line — the title already has min-width:0 +
// ellipsis so it shrinks instead (verified: bar renders on one line, all buttons
// visible). Anchored on `align-items:center;gap:12px` so it ONLY touches .lcs-bar,
// never the footer/other centered flex rows (which SHOULD wrap on narrow screens).
var BAR_FLEX_WRAP = /(align-items:center;gap:12px;)flex-wrap:wrap/g;
// R2: make the Fredoka Google-Fonts stylesheet NON-render-blocking. It is the deck's
// only external render-blocking request and was the FCP bottleneck (mobile FCP ~3.2s
// → ~1.6s when async). Inline deck styles are separate, so async is safe (text paints
// immediately via display=swap; Fredoka swaps in when ready; deck.html has no CSP so
// the inline onload runs). NOTE: an earlier attempt at this seemed to cause CLS, but
// that was actually the .lcs-bar WRAP (R4) being exposed by the changed paint timing —
// once R4 pins the bar to one line, async font is pure win with CLS ~0.001 (verified:
// sudoku 97, addition 98-100, both stable). Standard media="print" onload + <noscript>.
var FREDOKA_BLOCKING = /<link href="(https:\/\/fonts\.googleapis\.com\/css2\?family=Fredoka[^"]*)" rel="stylesheet">/;

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

  // Make the Fredoka link async (see note on FREDOKA_BLOCKING). Idempotency guard:
  // skip if already async — otherwise the <noscript> fallback we inject (itself a
  // rel="stylesheet"> Fredoka link) would re-match and nest on every re-run.
  var fontAsync = false;
  if (out.indexOf("onload=\"this.media='all'\"") === -1 && FREDOKA_BLOCKING.test(out)) {
    out = out.replace(FREDOKA_BLOCKING,
      '<link href="$1" rel="stylesheet" media="print" onload="this.media=\'all\'">' +
      '<noscript><link href="$1" rel="stylesheet"></noscript>');
    fontAsync = true;
  }

  // R3: drop the default `hidden` on the suggestions section (see note above).
  var hiddenRemoved = false;
  if (SUGGESTIONS_SECTION_HIDDEN.test(out)) {
    out = out.replace(SUGGESTIONS_SECTION_HIDDEN, '$1 ');
    hiddenRemoved = true;
  }

  // R4: stop the .lcs-bar from wrapping (see note on BAR_FLEX_WRAP).
  var barFixed = false;
  if (BAR_FLEX_WRAP.test(out)) {
    out = out.replace(BAR_FLEX_WRAP, '$1flex-wrap:nowrap');
    barFixed = true;
  }
  return { html: out, lazyAdded: lazyAdded, fontAsync: fontAsync, hiddenRemoved: hiddenRemoved, barFixed: barFixed };
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
  if (r.lazyAdded === 0 && !r.fontAsync && !r.hiddenRemoved && !r.barFixed) return { status: 'idempotent' };
  if (opts.dryRun) return { status: 'would-rewrite', lazyAdded: r.lazyAdded, fontAsync: r.fontAsync, hiddenRemoved: r.hiddenRemoved, barFixed: r.barFixed };
  var bak = htmlPath + '.bak.lazy-deckend';
  var tmp = htmlPath + '.tmp.lazy-deckend';
  try {
    if (!fs.existsSync(bak)) fs.copyFileSync(htmlPath, bak);
    fs.writeFileSync(tmp, r.html, 'utf8');
    fs.renameSync(tmp, htmlPath);
  } catch (e) { return { status: 'fs-error', error: e.message }; }
  return { status: 'written', lazyAdded: r.lazyAdded, fontAsync: r.fontAsync, hiddenRemoved: r.hiddenRemoved, barFixed: r.barFixed };
}

function main() {
  var opts = parseArgs(process.argv);
  console.log('=== deck-end lazy-load + font-revert retrofit ===');
  console.log('mode:       ' + (opts.dryRun ? 'DRY-RUN (no writes)' : 'APPLY (--confirm)'));
  console.log('decks-root: ' + opts.decksRoot);
  console.log('locales:    ' + opts.locales.join(', '));
  console.log('sample:     ' + (opts.sample || 'all') + '\n');

  var grand = { total: 0, rewrite: 0, idempotent: 0, errors: 0, lazyImgs: 0, fonts: 0, unhid: 0, bars: 0 };
  opts.locales.forEach(function (locale) {
    var t = { total: 0, rewrite: 0, idempotent: 0, errors: 0, lazyImgs: 0, fonts: 0, unhid: 0, bars: 0 };
    listDeckDirs(opts.decksRoot, locale, opts.sample).forEach(function (deckDir) {
      var res = processDeck(deckDir, opts);
      t.total++;
      if (res.status === 'written' || res.status === 'would-rewrite') { t.rewrite++; t.lazyImgs += (res.lazyAdded || 0); if (res.fontAsync) t.fonts++; if (res.hiddenRemoved) t.unhid++; if (res.barFixed) t.bars++; }
      else if (res.status === 'idempotent') t.idempotent++;
      else if (res.status === 'fs-error') { t.errors++; console.log('  ERROR ' + deckDir + ': ' + res.error); }
    });
    ['total', 'rewrite', 'idempotent', 'errors', 'lazyImgs', 'fonts', 'unhid', 'bars'].forEach(function (k) { grand[k] += t[k]; });
    console.log('[' + locale + '] ' + t.total + ' decks; ' + (opts.dryRun ? t.rewrite + ' would-rewrite' : t.rewrite + ' written') +
      ' (' + t.lazyImgs + ' imgs lazied, ' + t.fonts + ' fonts async, ' + t.unhid + ' unhidden, ' + t.bars + ' bars nowrap), ' + t.idempotent + ' idempotent, ' + t.errors + ' errors');
  });

  console.log('\n=== Summary ===');
  console.log('Total decks:   ' + grand.total);
  console.log((opts.dryRun ? 'Would rewrite: ' : 'Rewritten:     ') + grand.rewrite);
  console.log('Imgs lazied:   ' + grand.lazyImgs);
  console.log('Fonts async:   ' + grand.fonts);
  console.log('Unhidden strip:' + grand.unhid);
  console.log('Bars nowrapped:' + grand.bars);
  console.log('Idempotent:    ' + grand.idempotent);
  console.log('Errors:        ' + grand.errors);
  process.exit(grand.errors > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { rewriteHtml: rewriteHtml };
