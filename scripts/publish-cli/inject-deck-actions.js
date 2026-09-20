#!/usr/bin/env node
/**
 * inject-deck-actions.js — bake the localized action strip
 *   [ Download PDF ] [ Answer key ] [ Make your own ]
 * into published deck.html files, directly under the title bar.
 *
 * WHY. A published deck is a self-contained static page served by nginx from
 * /var/www/lcs-media/decks/<locale>/<slug>-v<N>/deck.html. The 29 apps never
 * emit a link to the deck's own printable PDF / answer key, nor to the
 * generator that made it, so the ~10k decks without a landing page had no
 * download affordance anywhere on the page a teacher opens. Operator
 * commission 2026-09-20.
 *
 * SoT. Markup + CSS + strings live in scripts/lib/deck-actions.js, shared with
 * scripts/seo-landing/render-landing-html.js (the "Make your own" hero button).
 * Do NOT inline a second copy (CLAUDE.md §21.8-A).
 *
 * This is BOTH the retrofit and the forward path: publish-wave.js STEP 6d runs
 * it per locale on every wave, so newly published decks get the strip without
 * any edit to catalog-export.js or to the 29 app HTML files.
 *
 * Architectural sibling of inject-deck-site-chrome.js (identical symlink walk,
 * manifest/html/dir locale cross-check, atomic .tmp+rename, --rewrite,
 * per-locale summary, exit code). Differences:
 *   - physical files are processed ONCE: ~8,500 alias symlinks share one
 *     versioned dir (project_deck_embed_src_repair), so the walk dedupes on
 *     realpath and reports the aliases separately;
 *   - the deck's canonical slug comes from the `<slug>-printable.pdf` stem on
 *     disk (coherent with Deck.slug catalog-wide, §8.1) — never the symlink;
 *   - the answer-key button is emitted only when `<slug>-answer-key.pdf` exists
 *     (the /api/quota/dl proxy 404s otherwise);
 *   - printable-only worksheet-gen decks (manifest.printable_only, or a
 *     print-only exercise type) are SKIPPED: they already carry .lcs-download,
 *     have no answer key and no maker;
 *   - the "Make your own" button is emitted only when the deck's
 *     manifest.generator.app has a maker landing slug in this locale.
 *
 * Usage:
 *   node scripts/publish-cli/inject-deck-actions.js [--dry-run] [--rewrite] [--remove]
 *        [--locale=<code>] [--limit=N] [--slugs-file=<path>] [--decks-root=<dir>]
 *
 * ⚠ --dry-run means DO NOT WRITE. The default IS write (the `inject-*` family
 *   dialect; the `rewrite-deck-html-*` family is the opposite way round).
 *   --rewrite  strip + re-emit (after a string / maker-slug change).
 *   --remove   strip only (byte-exact inverse of inject).
 */

'use strict';

var fs = require('fs');
var path = require('path');
var waveScope = require('./wave-scope');
var deckActions = require('../lib/deck-actions');
var interactiveTypes = require('../lib/interactive-types');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = deckActions.LOCALES;

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var REWRITE = argv.includes('--rewrite');
var REMOVE = argv.includes('--remove');
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

/** Strip every block. Exact inverse of inject (one leading newline consumed). */
function stripBlock(content) {
  return content.replace(deckActions.STRIP_RE, '');
}

/**
 * Insert the block right before the worksheet wrapper, i.e. directly under
 * .lcs-bar. The anchor literal also appears inside the runtime CSS in <head>
 * (`.lcs-worksheet-wrap{display:flex…}` — different text, but guard anyway):
 * only an occurrence AFTER </head> is accepted.
 *
 * ALL-OR-NOTHING: any missing anchor → error, nothing written.
 *
 * @param {string} content  the deck.html
 * @param {{locale:string, slug:string, hasAnswerKey:boolean, appKey:string|null}} deck
 * @param {{rewrite?:boolean, remove?:boolean}} [opts]
 */
function injectIntoDeckHtml(content, deck, opts) {
  var rewrite = opts && typeof opts.rewrite === 'boolean' ? opts.rewrite : REWRITE;
  var remove = opts && typeof opts.remove === 'boolean' ? opts.remove : REMOVE;

  if (remove) {
    if (content.indexOf(deckActions.MARKER) === -1) return { alreadyApplied: true };
    return { changed: true, removed: true, content: stripBlock(content) };
  }
  if (rewrite) content = stripBlock(content);
  if (content.indexOf(deckActions.MARKER) !== -1) return { alreadyApplied: true };

  var headClose = content.indexOf('</head>');
  if (headClose === -1) return { error: 'no </head>' };
  var at = content.indexOf(deckActions.ANCHOR, headClose);
  if (at === -1) return { error: 'no ' + deckActions.ANCHOR + ' anchor after </head>' };
  var footAt = content.lastIndexOf('</body>');
  if (footAt !== -1 && footAt < at) return { error: 'anchor sits after </body> (malformed deck)' };

  var block;
  try { block = deckActions.block(deck); } catch (e) { return { error: e.message }; }
  // ⚠ Exactly ONE leading newline and NO trailing one — deckActions.STRIP_RE is
  // the exact inverse, so --rewrite is byte-idempotent.
  content = content.slice(0, at) + '\n' + block + content.slice(at);
  return { changed: true, content: content };
}

/**
 * Resolve the deck's content locale. manifest.language is authoritative;
 * <html lang> and the walked directory are cross-checks. A disagreement is the
 * audit-cross-locale-contamination.js failure class — a /de/tools/ link on an
 * en deck — so we refuse rather than guess. (Verbatim from inject-deck-site-chrome.)
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

/**
 * What the versioned dir tells us about the deck: its canonical slug (from the
 * printable PDF's filename), whether an answer key exists, and — from
 * manifest.json — the generator app and the printable-only flag.
 *
 * Returns { skip: <reason> } for decks this strip is not for.
 */
function describeDeck(targetDir, manifest) {
  var entries;
  try { entries = fs.readdirSync(targetDir); } catch (e) { return { error: 'readdir: ' + e.message }; }
  var printable = entries.filter(function (n) { return /-printable\.pdf$/.test(n); });
  var answerKeys = entries.filter(function (n) { return /-answer-key\.pdf$/.test(n); });

  var app = manifest && manifest.generator && typeof manifest.generator.app === 'string'
    ? manifest.generator.app : null;
  if (manifest && manifest.printable_only === true) return { skip: 'printable-only (manifest)' };
  if (app && interactiveTypes.isPrintOnlyType(deckActions.makerKeyFor(app))) return { skip: 'printable-only type: ' + app };

  if (printable.length !== 1) {
    return { error: printable.length === 0 ? 'no *-printable.pdf in ' + path.basename(targetDir)
      : 'ambiguous printable PDFs: ' + printable.join(', ') };
  }
  var slug = printable[0].replace(/-printable\.pdf$/, '');
  var hasAnswerKey = answerKeys.indexOf(slug + '-answer-key.pdf') !== -1;
  return { slug: slug, hasAnswerKey: hasAnswerKey, appKey: app };
}

function atomicWrite(filePath, content) {
  var tmp = filePath + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, filePath);
}

/** realpath(versioned dir) → true once processed in this run (alias dedupe). */
var seenDirs = new Set();
/** Distinct maker URLs emitted — printed at the end for a live link sweep. */
var makerUrlsEmitted = new Set();

function processDeck(locale, slug) {
  var localeDir = path.join(DECKS_ROOT, locale);
  var symlinkPath = path.join(localeDir, slug);
  var stat;
  try { stat = fs.lstatSync(symlinkPath); } catch (e) { return { ok: false, error: 'lstat: ' + e.message }; }
  if (!stat.isSymbolicLink()) return { ok: false, error: 'not a symlink (skipped)' };
  var target = fs.readlinkSync(symlinkPath);
  // Resolve to the versioned dir and write THERE — never through the symlink.
  var targetDir = path.isAbsolute(target) ? target : path.join(localeDir, target);
  var real;
  try { real = fs.realpathSync(targetDir); } catch (e) { return { ok: false, error: 'dangling symlink → ' + target }; }
  if (seenDirs.has(real)) return { ok: true, alias: true, target: path.basename(real) };
  seenDirs.add(real);

  var deckHtmlPath = path.join(real, 'deck.html');
  var manifestPath = path.join(real, 'manifest.json');
  if (!fs.existsSync(deckHtmlPath)) return { ok: false, error: 'deck.html missing' };

  var content = fs.readFileSync(deckHtmlPath, 'utf8');
  var manifest = null;
  if (fs.existsSync(manifestPath)) {
    try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); }
    catch (e) { return { ok: false, error: 'manifest parse: ' + e.message }; }
  }

  var loc = resolveLocale(manifest, content, locale);
  if (loc.error) return { ok: false, error: loc.error };

  var desc = describeDeck(real, manifest);
  if (desc.error) return { ok: false, error: desc.error };
  if (desc.skip) {
    // A strip left on a deck that is now print-only would be a defect too.
    if (content.indexOf(deckActions.MARKER) !== -1) {
      if (!DRY_RUN) atomicWrite(deckHtmlPath, stripBlock(content));
      return { ok: true, applied: true, removed: true, skip: desc.skip };
    }
    return { ok: true, skip: desc.skip };
  }

  var deck = { locale: loc.locale, slug: desc.slug, hasAnswerKey: desc.hasAnswerKey, appKey: desc.appKey };
  var result = injectIntoDeckHtml(content, deck);
  if (result.error) return { ok: false, error: result.error };
  var mk = deckActions.makerUrl(deck.locale, deck.appKey);
  if (mk) makerUrlsEmitted.add(mk);
  if (result.alreadyApplied) return { ok: true, alreadyApplied: true, noMaker: !mk, noAnswerKey: !deck.hasAnswerKey };
  if (result.changed) {
    if (!DRY_RUN) atomicWrite(deckHtmlPath, result.content);
    return { ok: true, applied: true, removed: !!result.removed, noMaker: !mk, noAnswerKey: !deck.hasAnswerKey };
  }
  return { ok: false, error: 'unexpected result shape' };
}

function main() {
  console.log('=== inject-deck-actions ===');
  console.log('mode:   ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE') + (REWRITE ? ' (rewrite=ON)' : '') + (REMOVE ? ' (REMOVE)' : ''));
  console.log('locale: ' + (TARGET_LOCALE || 'all 11'));
  console.log('limit:  ' + (TARGET_LIMIT === Infinity ? 'no limit' : TARGET_LIMIT));
  console.log('root:   ' + DECKS_ROOT);
  console.log('');

  var locales = TARGET_LOCALE ? [TARGET_LOCALE] : ALL_LOCALES;
  var totalProcessed = 0, totalApplied = 0, totalAlready = 0, totalAlias = 0, totalSkipped = 0, totalFailed = 0;
  var totalNoMaker = 0, totalNoAnswerKey = 0;
  var failures = [];
  var skipReasons = {};
  var perLocale = {};

  for (var li = 0; li < locales.length; li++) {
    var locale = locales[li];
    var localeDir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(localeDir)) continue;
    var slugs = fs.readdirSync(localeDir).filter(function (name) {
      if (name.startsWith('.')) return false;
      return !/-v\d+$/.test(name);
    }).filter(function (name) { return waveScope.inSet(WAVE_SLUGS, name); });
    perLocale[locale] = { total: slugs.length, applied: 0, already: 0, alias: 0, skipped: 0, failed: 0, noMaker: 0, noAnswerKey: 0 };
    console.log('[' + locale + '] ' + slugs.length + ' deck symlinks');
    for (var si = 0; si < slugs.length; si++) {
      if (totalProcessed >= TARGET_LIMIT) break;
      var slug = slugs[si];
      totalProcessed++;
      try {
        var r = processDeck(locale, slug);
        if (!r.ok) { totalFailed++; perLocale[locale].failed++; failures.push(locale + '/' + slug + ': ' + r.error); }
        else if (r.alias) { totalAlias++; perLocale[locale].alias++; }
        else if (r.skip && !r.applied) { totalSkipped++; perLocale[locale].skipped++; skipReasons[r.skip] = (skipReasons[r.skip] || 0) + 1; }
        else if (r.alreadyApplied) { totalAlready++; perLocale[locale].already++; }
        else { totalApplied++; perLocale[locale].applied++; if (r.skip) skipReasons[r.skip + ' (strip removed)'] = (skipReasons[r.skip + ' (strip removed)'] || 0) + 1; }
        if (r.ok && !r.alias && !r.skip) {
          if (r.noMaker) { totalNoMaker++; perLocale[locale].noMaker++; }
          if (r.noAnswerKey) { totalNoAnswerKey++; perLocale[locale].noAnswerKey++; }
        }
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
  console.log('  alias (shared):  ' + totalAlias);
  console.log('  skipped:         ' + totalSkipped);
  console.log('  failed:          ' + totalFailed);
  console.log('  without maker button:      ' + totalNoMaker);
  console.log('  without answer-key button: ' + totalNoAnswerKey);
  if (Object.keys(skipReasons).length) {
    console.log('');
    console.log('=== skip reasons ===');
    Object.keys(skipReasons).sort().forEach(function (k) { console.log('  ' + skipReasons[k] + '  ' + k); });
  }
  console.log('');
  console.log('=== per-locale ===');
  Object.keys(perLocale).forEach(function (loc) {
    var s = perLocale[loc];
    console.log('  ' + loc + ':  total=' + s.total + ' applied=' + s.applied + ' already=' + s.already +
      ' alias=' + s.alias + ' skipped=' + s.skipped + ' failed=' + s.failed +
      ' noMaker=' + s.noMaker + ' noAnswerKey=' + s.noAnswerKey);
  });
  if (makerUrlsEmitted.size) {
    console.log('');
    console.log('=== distinct maker URLs emitted (' + makerUrlsEmitted.size + ') — sweep these live ===');
    Array.from(makerUrlsEmitted).sort().forEach(function (u) { console.log('  ' + u); });
  }
  if (failures.length > 0) {
    console.log('');
    console.log('=== failures (first 40) ===');
    failures.slice(0, 40).forEach(function (f) { console.log('  - ' + f); });
    console.log('  (' + failures.length + ' total failures)');
  }
  process.exit(failures.length > 0 ? 1 : 0);
}

module.exports = {
  injectIntoDeckHtml: injectIntoDeckHtml,
  stripBlock: stripBlock,
  resolveLocale: resolveLocale,
  describeDeck: describeDeck,
};

if (require.main === module) main();
