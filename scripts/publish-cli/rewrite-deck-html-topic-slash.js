#!/usr/bin/env node
/**
 * Retrofit: strip trailing slashes off deck.html INTERNAL topic links (SEO —
 * internal redirects). The end-of-deck "Want more?" aside links to Next.js topic
 * routes as `/<locale>/topic/<slug>/`, but Next is `trailingSlash:false` so each
 * one 308-redirects to the no-slash form. ~2-3 per deck × ~19,500 decks ≈ 40-60k
 * redirecting internal links — wasted crawl budget + diluted link equity. Same
 * trailing slash also appears in the BreadcrumbList JSON-LD `item` URLs (the home
 * `/<locale>/` and the type `/<locale>/topic/<slug>/`), which point at redirects too.
 *
 * Fixes three things, all idempotent + visually neutral (same destination, one
 * fewer hop):
 *   R1 — <a href="/<loc>/topic/<slug>/">                    → drop trailing slash
 *   R2 — JSON-LD "item":"https://www…/<loc>/topic/<slug>/"  → drop trailing slash
 *   R3 — JSON-LD "item":"https://www…/<loc>/"  (breadcrumb home) → drop trailing slash
 *
 * MUST NOT touch:
 *   - deck-suggestion links `/<loc>/decks/<slug>/` (nginx REQUIRES the slash; no-slash 404s)
 *   - the `/<loc>/worksheets` browse-all link (already no-slash)
 *   - canonical/og:url/hreflang (deck URLs, correct slash)
 * R1/R2 use `[^"/]+` = a SINGLE path segment, so they only match single-axis topic
 * links (decks have no intersection topic links) and can't match `/decks/...`.
 *
 * Self-contained: no DB/network. Atomic backup (.bak.topic-slash) → temp → rename(2)
 * per §15.5. rewrite-deck-html-*.js family (§A.14.9 / §21.2). Forward fix lives in
 * substitute.js + inject-deck-end-topic-links.js.
 *
 * Usage (run on Hetzner):
 *   node scripts/publish-cli/rewrite-deck-html-topic-slash.js --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-topic-slash.js --dry-run --locales=no --sample=5
 *   node scripts/publish-cli/rewrite-deck-html-topic-slash.js --confirm --locales=no
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DEFAULT_DECKS_ROOT = '/var/www/lcs-media/decks';
var LOCALE_CHUNK_ORDER = ['no', 'da', 'fi', 'sv', 'nl', 'it', 'pt', 'es', 'fr', 'de', 'en'];

// R1: <a href> to a single-segment topic route with trailing slash.
var TOPIC_HREF_SLASH = /href="(\/[a-z]{2}\/topic\/[^"\/]+)\/"/g;
// R2: BreadcrumbList JSON-LD type item (full www host) with trailing slash.
var ITEM_TOPIC_SLASH = /"item":"(https:\/\/www\.lessoncraftstudio\.com\/[a-z]{2}\/topic\/[^"\/]+)\/"/g;
// R3: BreadcrumbList JSON-LD home item `/<loc>/` with trailing slash.
var ITEM_HOME_SLASH = /"item":"(https:\/\/www\.lessoncraftstudio\.com\/[a-z]{2})\/"/g;

function parseArgs(argv) {
  var out = { dryRun: true, confirm: false, decksRoot: DEFAULT_DECKS_ROOT, locales: LOCALE_CHUNK_ORDER.slice(), sample: null };
  argv.slice(2).forEach(function (a) {
    if (a === '--confirm') { out.confirm = true; out.dryRun = false; }
    else if (a === '--dry-run') { out.dryRun = true; out.confirm = false; }
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice(9), 10);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node rewrite-deck-html-topic-slash.js [--dry-run|--confirm] [--locales=no,da] [--sample=N] [--decks-root=path]');
      process.exit(0);
    }
  });
  return out;
}

/** Returns {html, links, itemsTopic, itemsHome} counts of slashes removed. */
function rewriteHtml(html) {
  var links = 0, itemsTopic = 0, itemsHome = 0;
  var out = html.replace(TOPIC_HREF_SLASH, function (_, p1) { links++; return 'href="' + p1 + '"'; });
  out = out.replace(ITEM_TOPIC_SLASH, function (_, p1) { itemsTopic++; return '"item":"' + p1 + '"'; });
  out = out.replace(ITEM_HOME_SLASH, function (_, p1) { itemsHome++; return '"item":"' + p1 + '"'; });
  return { html: out, links: links, itemsTopic: itemsTopic, itemsHome: itemsHome };
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
  var changed = r.links + r.itemsTopic + r.itemsHome;
  if (changed === 0) return { status: 'idempotent' };
  if (opts.dryRun) return { status: 'would-rewrite', r: r };
  var bak = htmlPath + '.bak.topic-slash';
  var tmp = htmlPath + '.tmp.topic-slash';
  try {
    if (!fs.existsSync(bak)) fs.copyFileSync(htmlPath, bak);
    fs.writeFileSync(tmp, r.html, 'utf8');
    fs.renameSync(tmp, htmlPath);
  } catch (e) { return { status: 'fs-error', error: e.message }; }
  return { status: 'written', r: r };
}

function main() {
  var opts = parseArgs(process.argv);
  console.log('=== deck topic-link trailing-slash retrofit ===');
  console.log('mode:       ' + (opts.dryRun ? 'DRY-RUN (no writes)' : 'APPLY (--confirm)'));
  console.log('decks-root: ' + opts.decksRoot);
  console.log('locales:    ' + opts.locales.join(', '));
  console.log('sample:     ' + (opts.sample || 'all') + '\n');

  var grand = { total: 0, rewrite: 0, idempotent: 0, errors: 0, links: 0, itemsTopic: 0, itemsHome: 0 };
  opts.locales.forEach(function (locale) {
    var t = { total: 0, rewrite: 0, idempotent: 0, errors: 0, links: 0, itemsTopic: 0, itemsHome: 0 };
    listDeckDirs(opts.decksRoot, locale, opts.sample).forEach(function (deckDir) {
      var res = processDeck(deckDir, opts);
      t.total++;
      if (res.status === 'written' || res.status === 'would-rewrite') { t.rewrite++; t.links += res.r.links; t.itemsTopic += res.r.itemsTopic; t.itemsHome += res.r.itemsHome; }
      else if (res.status === 'idempotent') t.idempotent++;
      else if (res.status === 'fs-error') { t.errors++; console.log('  ERROR ' + deckDir + ': ' + res.error); }
    });
    ['total', 'rewrite', 'idempotent', 'errors', 'links', 'itemsTopic', 'itemsHome'].forEach(function (k) { grand[k] += t[k]; });
    console.log('[' + locale + '] ' + t.total + ' decks; ' + (opts.dryRun ? t.rewrite + ' would-rewrite' : t.rewrite + ' written') +
      ' (' + t.links + ' links, ' + t.itemsTopic + ' bc-type, ' + t.itemsHome + ' bc-home), ' + t.idempotent + ' idempotent, ' + t.errors + ' errors');
  });

  console.log('\n=== Summary ===');
  console.log('Total decks:    ' + grand.total);
  console.log((opts.dryRun ? 'Would rewrite:  ' : 'Rewritten:      ') + grand.rewrite);
  console.log('Topic links:    ' + grand.links);
  console.log('BC type items:  ' + grand.itemsTopic);
  console.log('BC home items:  ' + grand.itemsHome);
  console.log('Idempotent:     ' + grand.idempotent);
  console.log('Errors:         ' + grand.errors);
  process.exit(grand.errors > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { rewriteHtml: rewriteHtml };
