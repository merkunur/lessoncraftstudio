#!/usr/bin/env node
/**
 * inject-deck-site-chrome.js — bake the localized static site header + footer
 * into published deck.html files.
 *
 * WHY. A published deck is a self-contained static page served by nginx from
 * /var/www/lcs-media/decks/<locale>/<slug>-v<N>/deck.html. It never touches
 * app/[locale]/layout.tsx, so it carries no site nav and no site footer — a
 * visitor arriving from Google gets a worksheet with a Check button and no way
 * into the rest of the site. (`<footer class="lcs-footer">` already in the file
 * is the worksheet's own Check/Reset bar, not site chrome.)
 *
 * SoT. All markup + CSS lives in scripts/lib/site-chrome.js, shared with
 * scripts/seo-landing/render-landing-html.js. Do NOT inline a second copy —
 * CLAUDE.md §21.8-A records a hreflang fix that shipped to a duplicated copy
 * and changed nothing on 30,078 live pages.
 *
 * This is BOTH the retrofit and the forward path: publish-wave.js STEP 6c runs
 * it per locale on every wave, so newly published decks get chrome without any
 * edit to catalog-export.js or to the 29 app HTML files.
 *
 * Architectural sibling of inject-deck-end-topic-links.js (identical symlink
 * walk, atomic .tmp+rename, --rewrite, per-locale summary, exit code) and of
 * inject-embed-hide-style.js (top-of-<head> CSS insertion so the hreflang block
 * stays LAST in <head> per §17.8.1).
 *
 * ⚠ PRICING_PUBLIC coupling: the footer's /pricing link is baked. If
 * frontend/config/subscription-launch.ts PRICING_PUBLIC ever flips false, run
 * this with --rewrite to re-emit.
 *
 * Usage:
 *   node scripts/publish-cli/inject-deck-site-chrome.js [--dry-run] [--rewrite]
 *        [--locale=<code>] [--limit=N] [--slugs-file=<path>]
 *
 * ⚠ --dry-run means DO NOT WRITE. The default IS write (the `inject-*` family
 *   dialect; the `rewrite-deck-html-*` family is the opposite way round).
 */

'use strict';

var fs = require('fs');
var path = require('path');
var waveScope = require('./wave-scope');
var siteChrome = require('../lib/site-chrome');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = siteChrome.LOCALES;

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var REWRITE = argv.includes('--rewrite');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var TARGET_LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;
var rootFlag = argv.find(function (a) { return a.indexOf('--decks-root=') === 0; });
if (rootFlag) DECKS_ROOT = rootFlag.split('=')[1];
var WAVE_SLUGS = waveScope.loadSlugSet(argv);

/* ------------------------------------------------------------------ *
 * The injection core — exported so the verifier and the unit test can
 * drive it on in-memory strings without touching /var/www.
 * ------------------------------------------------------------------ */

/**
 * Insert the chrome CSS at the top of <head>, the header right after <body>,
 * and the footer right before </body>.
 *
 * ⚠ FOOTER ANCHOR IS `</body>`, NOT `.lcs-deckend-suggestions`. The sibling
 * script anchors on the suggestions/celebration blocks, but the oldest deck
 * vintage on disk (.publish-cli-staging/sudoku-en-20260429083212/deck.html)
 * has NONE of .lcs-end-deck / .lcs-deckend-suggestions / .lcs-celebration.
 * `</body>` is present in every vintage and is by construction after all of
 * them. lastIndexOf (not indexOf) makes it immune to any '</body>' that
 * appears inside a baked JS string.
 *
 * ALL-OR-NOTHING: if any of the three anchors is missing we return an error and
 * write nothing. A deck.html without </body> is truncated, and half-injecting
 * it would make the corruption harder to see.
 */
function injectIntoDeckHtml(content, locale, opts) {
  var rewrite = opts && typeof opts.rewrite === 'boolean' ? opts.rewrite : REWRITE;
  if (rewrite) {
    siteChrome.STRIP_RES.forEach(function (re) { content = content.replace(re, ''); });
  }
  if (content.indexOf(siteChrome.MARKER) !== -1) return { alreadyApplied: true };

  var headOpen = /<head\b[^>]*>/i.exec(content);
  if (!headOpen) return { error: 'no <head> for chrome CSS insertion' };
  var headClose = content.indexOf('</head>');
  if (headClose === -1) return { error: 'no </head>' };

  // --- header anchor chain ---
  var headerAt = -1;
  var bodyOpen = /<body\b[^>]*>/i.exec(content);
  // Guard: only accept a <body> tag that sits AFTER </head>. A literal "<body"
  // inside a head <script> string would otherwise win.
  if (bodyOpen && bodyOpen.index > headClose) headerAt = bodyOpen.index + bodyOpen[0].length;
  if (headerAt === -1) {
    var mainId = content.indexOf('<main id="lcs-app"');
    if (mainId !== -1) headerAt = mainId;
  }
  if (headerAt === -1) {
    var anyMain = content.search(/<main\b/i);
    if (anyMain !== -1) headerAt = anyMain;
  }
  if (headerAt === -1) return { error: 'no <body>/<main> anchor for site header' };

  // --- footer anchor chain ---
  var footAt = content.lastIndexOf('</body>');
  if (footAt === -1) footAt = content.lastIndexOf('</html>');
  if (footAt === -1) return { error: 'no </body>/</html> anchor for site footer' };

  if (footAt < headerAt) return { error: 'footer anchor precedes header anchor (malformed deck)' };

  // ⚠ SPLICE BACK-TO-FRONT (footer → header → head CSS) so the earlier offsets
  // computed against the ORIGINAL string stay valid.
  // ⚠ Exactly ONE leading newline per block and NO trailing one — siteChrome
  // .STRIP_RES is the exact inverse, so --rewrite is byte-idempotent.
  content = content.slice(0, footAt) + '\n' + siteChrome.footer(locale, 'deck') + content.slice(footAt);
  content = content.slice(0, headerAt) + '\n' + siteChrome.header(locale, 'deck') + content.slice(headerAt);
  var cssAt = headOpen.index + headOpen[0].length;
  content = content.slice(0, cssAt) + '\n' + siteChrome.cssBlock() + content.slice(cssAt);

  return { changed: true, content: content };
}

/**
 * Resolve the deck's content locale. manifest.language is authoritative;
 * <html lang> and the walked directory are cross-checks. A disagreement is the
 * audit-cross-locale-contamination.js failure class — putting /en/ links on a
 * de deck is exactly the defect that audit exists for — so we refuse rather
 * than guess.
 */
function resolveLocale(manifest, content, dirLocale) {
  var fromManifest = manifest && typeof manifest.language === 'string' ? manifest.language.slice(0, 2) : null;
  var htmlLang = null;
  var m = /<html[^>]*\blang\s*=\s*"([^"]+)"/i.exec(content);
  if (m) htmlLang = m[1].slice(0, 2).toLowerCase();

  var locale = fromManifest || htmlLang || dirLocale;
  if (ALL_LOCALES.indexOf(locale) === -1) return { error: 'unresolvable locale: ' + JSON.stringify(locale) };
  if (locale !== dirLocale) {
    return { error: 'locale disagreement: manifest/html=' + locale + ' but directory=' + dirLocale };
  }
  return { locale: locale };
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
  // Resolve to the versioned dir and write THERE — never through the symlink.
  var targetDir = path.isAbsolute(target) ? target : path.join(localeDir, target);
  var deckHtmlPath = path.join(targetDir, 'deck.html');
  var manifestPath = path.join(targetDir, 'manifest.json');
  if (!fs.existsSync(deckHtmlPath)) return { ok: false, error: 'deck.html missing' };

  var content = fs.readFileSync(deckHtmlPath, 'utf8');
  var manifest = null;
  if (fs.existsSync(manifestPath)) {
    try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); }
    catch (e) { return { ok: false, error: 'manifest parse: ' + e.message }; }
  }

  var loc = resolveLocale(manifest, content, locale);
  if (loc.error) return { ok: false, error: loc.error };

  var result = injectIntoDeckHtml(content, loc.locale);
  if (result.error) return { ok: false, error: result.error };
  if (result.alreadyApplied) return { ok: true, alreadyApplied: true };
  if (result.changed) {
    if (!DRY_RUN) atomicWrite(deckHtmlPath, result.content);
    return { ok: true, applied: true };
  }
  return { ok: false, error: 'unexpected result shape' };
}

function main() {
  console.log('=== inject-deck-site-chrome ===');
  console.log('mode:   ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE') + (REWRITE ? ' (rewrite=ON)' : ''));
  console.log('locale: ' + (TARGET_LOCALE || 'all 11'));
  console.log('limit:  ' + (TARGET_LIMIT === Infinity ? 'no limit' : TARGET_LIMIT));
  console.log('root:   ' + DECKS_ROOT);
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
    }).filter(function (name) { return waveScope.inSet(WAVE_SLUGS, name); });
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

module.exports = { injectIntoDeckHtml: injectIntoDeckHtml, resolveLocale: resolveLocale };

if (require.main === module) main();
