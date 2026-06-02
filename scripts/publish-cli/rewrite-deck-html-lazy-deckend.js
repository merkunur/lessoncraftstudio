#!/usr/bin/env node
/**
 * Retrofit: three zero-quality-loss deck.html mobile-perf tweaks (page-speed audit
 * 2026-06, "decks ≥85 mobile" follow-on). R1 lazy-loads the deck-end thumbnails
 * (the LCP win); R2 keeps the font render-blocking (reverts an async build that
 * caused font-swap CLS); R3 un-hides the deck-end suggestions section so its
 * hidden→shown load transition stops shifting layout (the CLS win). See per-rule
 * notes by each regex below.
 *
 *   R1 — Lazy-load the end-of-deck suggestion thumbnails.
 *        The "try these next" strip renders 6 <img class="lcs-deckend-thumb">
 *        (~150KB PNGs each ≈ ~900KB) at the very bottom of the page, but they were
 *        EAGER-loaded (loading="lazy" appeared 0× in deck.html). That ~900KB was
 *        ~83% of a deck's 1,078KB mobile payload and starved the throttled mobile
 *        connection that the LCP backdrop needs. Add loading="lazy" decoding="async".
 *        The <a> links stay crawlable (SEO unaffected); only the <img> fetch defers.
 *
 *   R2 — KEEP the Fredoka stylesheet RENDER-BLOCKING (revert any async form).
 *        An earlier build of this script made the font async (media="print" onload=…)
 *        as an FCP optimization. It measurably regressed CLS on text-heavy decks via
 *        font-swap reflow (addition/wordsearch → ~0.31; image-heavy decks stayed
 *        0.001) — net-negative. R2 now reverts any async Fredoka link back to the
 *        plain render-blocking form (the known-good state, CLS ~0). The lazy-load
 *        (R1) is the real mobile win; the font stays blocking + display=swap.
 *
 * R1 is additive; R2 is a revert. Both idempotent + visually neutral. No DB/network.
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
// R2: KEEP the Fredoka stylesheet RENDER-BLOCKING. An earlier version of this
// script made it async (media="print" onload=…). That measurably regressed CLS on
// text-heavy decks (font-swap reflow: addition/wordsearch jumped to ~0.31 while
// image-heavy decks stayed 0.001) — net-negative despite the small FCP gain. So R2
// now REVERTS any async form back to the plain blocking link. Render-blocking +
// display=swap is the known-good state (CLS ~0); the lazy-load (R1) is the real
// mobile win. Forward path (apps + catalog-export) emits blocking already, so this
// is a no-op there; it only heals decks the async build touched.
var FREDOKA_ASYNC = /<link href="(https:\/\/fonts\.googleapis\.com\/css2\?family=Fredoka[^"]*)" rel="stylesheet" media="print" onload="this\.media='all'"><noscript><link href="[^"]*" rel="stylesheet"><\/noscript>/;

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

/** Apply R1 + R2. Returns {html, lazyAdded, fontReverted}. */
function rewriteHtml(html) {
  var lazyAdded = 0;
  var out = html.replace(DECKEND_THUMB_TAG, function (tag) {
    if (/\sloading=/.test(tag)) return tag;                 // idempotent
    lazyAdded++;
    return tag.replace(/^<img\s/, '<img loading="lazy" decoding="async" ');
  });

  // Revert any async Fredoka link back to the plain render-blocking form (see note
  // on FREDOKA_ASYNC). Idempotent: once reverted there is no async form to match.
  var fontReverted = false;
  if (FREDOKA_ASYNC.test(out)) {
    out = out.replace(FREDOKA_ASYNC, '<link href="$1" rel="stylesheet">');
    fontReverted = true;
  }

  // R3: drop the default `hidden` on the suggestions section (see note above).
  var hiddenRemoved = false;
  if (SUGGESTIONS_SECTION_HIDDEN.test(out)) {
    out = out.replace(SUGGESTIONS_SECTION_HIDDEN, '$1 ');
    hiddenRemoved = true;
  }
  return { html: out, lazyAdded: lazyAdded, fontReverted: fontReverted, hiddenRemoved: hiddenRemoved };
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
  if (r.lazyAdded === 0 && !r.fontReverted && !r.hiddenRemoved) return { status: 'idempotent' };
  if (opts.dryRun) return { status: 'would-rewrite', lazyAdded: r.lazyAdded, fontReverted: r.fontReverted, hiddenRemoved: r.hiddenRemoved };
  var bak = htmlPath + '.bak.lazy-deckend';
  var tmp = htmlPath + '.tmp.lazy-deckend';
  try {
    if (!fs.existsSync(bak)) fs.copyFileSync(htmlPath, bak);
    fs.writeFileSync(tmp, r.html, 'utf8');
    fs.renameSync(tmp, htmlPath);
  } catch (e) { return { status: 'fs-error', error: e.message }; }
  return { status: 'written', lazyAdded: r.lazyAdded, fontReverted: r.fontReverted, hiddenRemoved: r.hiddenRemoved };
}

function main() {
  var opts = parseArgs(process.argv);
  console.log('=== deck-end lazy-load + font-revert retrofit ===');
  console.log('mode:       ' + (opts.dryRun ? 'DRY-RUN (no writes)' : 'APPLY (--confirm)'));
  console.log('decks-root: ' + opts.decksRoot);
  console.log('locales:    ' + opts.locales.join(', '));
  console.log('sample:     ' + (opts.sample || 'all') + '\n');

  var grand = { total: 0, rewrite: 0, idempotent: 0, errors: 0, lazyImgs: 0, fonts: 0, unhid: 0 };
  opts.locales.forEach(function (locale) {
    var t = { total: 0, rewrite: 0, idempotent: 0, errors: 0, lazyImgs: 0, fonts: 0, unhid: 0 };
    listDeckDirs(opts.decksRoot, locale, opts.sample).forEach(function (deckDir) {
      var res = processDeck(deckDir, opts);
      t.total++;
      if (res.status === 'written' || res.status === 'would-rewrite') { t.rewrite++; t.lazyImgs += (res.lazyAdded || 0); if (res.fontReverted) t.fonts++; if (res.hiddenRemoved) t.unhid++; }
      else if (res.status === 'idempotent') t.idempotent++;
      else if (res.status === 'fs-error') { t.errors++; console.log('  ERROR ' + deckDir + ': ' + res.error); }
    });
    ['total', 'rewrite', 'idempotent', 'errors', 'lazyImgs', 'fonts', 'unhid'].forEach(function (k) { grand[k] += t[k]; });
    console.log('[' + locale + '] ' + t.total + ' decks; ' + (opts.dryRun ? t.rewrite + ' would-rewrite' : t.rewrite + ' written') +
      ' (' + t.lazyImgs + ' imgs lazied, ' + t.fonts + ' fonts reverted, ' + t.unhid + ' unhidden), ' + t.idempotent + ' idempotent, ' + t.errors + ' errors');
  });

  console.log('\n=== Summary ===');
  console.log('Total decks:   ' + grand.total);
  console.log((opts.dryRun ? 'Would rewrite: ' : 'Rewritten:     ') + grand.rewrite);
  console.log('Imgs lazied:   ' + grand.lazyImgs);
  console.log('Fonts reverted:' + grand.fonts);
  console.log('Unhidden strip:' + grand.unhid);
  console.log('Idempotent:    ' + grand.idempotent);
  console.log('Errors:        ' + grand.errors);
  process.exit(grand.errors > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { rewriteHtml: rewriteHtml };
