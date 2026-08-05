#!/usr/bin/env node
/**
 * Retrofit: point the deck.html EMBED snippet's iframe at the playable deck.
 *
 * THE DEFECT. `buildEmbedAffordance` (REFERENCE TRANSLATIONS/catalog-export.js)
 * uses ONE `url` variable for two different things — the iframe `src` and the
 * visible backlink `<a href>` — and `substitute.js` gives it the same string as
 * the page canonical. So when `scripts/seo-landing/repoint-deck-canonical.js`
 * repointed canonicals to landing pages with a whole-file
 * `html.split(deckURL + '"').join(landingURL + '"')`, the baked line
 *
 *     var url="https://www.lessoncraftstudio.com/<loc>/decks/<slug>/";
 *
 * was a VERBATIM match and got dragged along. Every embed snippet copied since
 * then points its iframe at the deck's LANDING page.
 *
 * Measured on production, the landing is not a viable embed target:
 *   · it makes ZERO postMessage calls, so the snippet's own auto-resize
 *     listener never fires and the iframe is frozen at its fallback ratio;
 *   · it never detects being framed, so the FULL SITE HEADER AND FOOTER render
 *     inside the teacher's blog.
 * The deck directory does all of it correctly (verified with
 * scripts/publish-cli/probe-embed-runtime.js: 3 resize messages, height set
 * from them, body.lcs-embedded true, chrome present but hidden).
 *
 * THE FIX — one string. Replace the concatenation in the iframe tag with a
 * baked literal, so the src can never again be moved by a canonical rewrite:
 *
 *     src="'+url+'"   →   src="https://www.lessoncraftstudio.com/<loc>/<slug>/"
 *
 * MUST NOT touch:
 *   - the backlink `<a href="'+url+'"` — it SHOULD keep pointing at the
 *     landing, which is the rankable page. This mirrors the landing route's own
 *     builder (frontend/lib/seo/embed-snippet.ts: iframeUrl vs brandHref).
 *   - the SHARE affordance's `var url=` (the one followed by `var title=`).
 *     Sharing a landing page with a human is correct.
 *   - anything in <head>: canonical, og:url, JSON-LD, hreflang are untouched,
 *     which is why this is outside the §21.5a churn freeze (and it REPAIRS a
 *     broken signal, the freeze's own sanctioned exception).
 *
 * Applied UNIVERSALLY, including to decks whose `url` is already the deck dir:
 * there the emitted output is unchanged, and it makes them immune to the next
 * canonical repoint. One code path, no classification to get wrong.
 *
 * ⚠ Enumerates VERSIONED DIRS, not symlinks. ~8,500 slugs are aliases pointing
 * at a shared deck.html (de/es/fr/it/pt carry 1,296-2,285 each), so a file can
 * only carry ONE url — its own canonical slug, exactly what substitute.js:142
 * computed. Deriving from the symlink name would bake an alias's URL.
 *
 * Self-contained: no DB, no network. Atomic backup (.bak.embed-src) → temp →
 * rename(2). rewrite-deck-html-*.js family (§A.14.9 / §21.2). The forward fix
 * lives in catalog-export.js + substitute.js, so this is a one-shot heal and is
 * deliberately NOT wired into publish-wave.js.
 *
 * Usage (run on Hetzner):
 *   node scripts/publish-cli/rewrite-deck-html-embed-src.js --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-embed-src.js --dry-run --locales=no --sample=5
 *   node scripts/publish-cli/rewrite-deck-html-embed-src.js --confirm --locales=no
 */
'use strict';

var fs = require('fs');
var path = require('path');
var waveScope = require('./wave-scope');

var DEFAULT_DECKS_ROOT = '/var/www/lcs-media/decks';
var LOCALE_CHUNK_ORDER = ['no', 'da', 'fi', 'sv', 'nl', 'it', 'pt', 'es', 'fr', 'de', 'en'];
var CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com';

/* The needle. Verified present in 38,195 files = 100% of embed-bearing decks,
   across BOTH bake generations (only 20,297 carry the newer `iframeTitle`
   attribute, so the anchor deliberately mentions neither it nor `id`). */
var NEEDLE = 'src="\'+url+\'"';

/** The one true shape, identical to substitute.js:142. */
function deckDirUrl(locale, slug) {
  return CANONICAL_URL_BASE + '/' + locale + '/decks/' + slug + '/';
}

function parseArgs(argv) {
  var out = { dryRun: true, confirm: false, decksRoot: DEFAULT_DECKS_ROOT, locales: LOCALE_CHUNK_ORDER.slice(), sample: null, slugs: waveScope.loadSlugSet(argv) };
  argv.slice(2).forEach(function (a) {
    if (a === '--confirm') { out.confirm = true; out.dryRun = false; }
    else if (a === '--dry-run') { out.dryRun = true; out.confirm = false; }
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice(9), 10);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node rewrite-deck-html-embed-src.js [--dry-run|--confirm] [--locales=no,da] [--sample=N] [--decks-root=path]');
      process.exit(0);
    }
  });
  return out;
}

/**
 * Pure. Returns {html, hits}. `hits` is 0 when the file has no embed
 * affordance at all OR has already been rewritten — both are legitimately
 * "nothing to do", and the caller separates them by looking for the snippet.
 *
 * Exported so the verifier can drive it over in-memory strings.
 */
function rewriteHtml(html, locale, slug) {
  var repl = 'src="' + deckDirUrl(locale, slug) + '"';
  var parts = html.split(NEEDLE);
  var hits = parts.length - 1;
  if (hits === 0) return { html: html, hits: 0 };
  return { html: parts.join(repl), hits: hits };
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

function processDeck(deckDir, locale, opts) {
  var htmlPath = path.join(deckDir, 'deck.html');
  if (!fs.existsSync(htmlPath)) return { status: 'missing' };
  var slug = waveScope.baseSlug(path.basename(deckDir));
  var raw;
  try { raw = fs.readFileSync(htmlPath, 'utf8'); } catch (e) { return { status: 'fs-error', error: e.message }; }

  var r = rewriteHtml(raw, locale, slug);
  if (r.hits === 0) {
    // Distinguish "already done" from "never had an embed" so the summary
    // cannot quietly report a no-op run as success.
    return { status: raw.indexOf('lcs-embed-snippet') === -1 ? 'no-embed' : 'idempotent' };
  }
  if (r.hits > 1) return { status: 'fs-error', error: 'expected 1 needle, found ' + r.hits };
  if (opts.dryRun) return { status: 'would-rewrite', hits: r.hits };

  var bak = htmlPath + '.bak.embed-src';
  var tmp = htmlPath + '.tmp.embed-src';
  try {
    if (!fs.existsSync(bak)) fs.copyFileSync(htmlPath, bak);
    var st = fs.statSync(htmlPath);
    fs.writeFileSync(tmp, r.html, 'utf8');
    /* Preserve owner + mode. rename(2) keeps the TEMP file's ownership, and
       this runs as root on Hetzner while deck.html is lcs-media:lcs-media —
       so without this every retrofit in this family silently re-owns the file
       to root:root. Harmless for nginx (read-only) but wrong, and it accretes. */
    try { fs.chownSync(tmp, st.uid, st.gid); } catch (e) { /* non-root: leave as-is */ }
    try { fs.chmodSync(tmp, st.mode); } catch (e) { /* best-effort */ }
    fs.renameSync(tmp, htmlPath);
  } catch (e) {
    try { fs.unlinkSync(tmp); } catch (_) { /* nothing to clean */ }
    return { status: 'fs-error', error: e.message };
  }
  return { status: 'written', hits: r.hits };
}

function main() {
  var opts = parseArgs(process.argv);
  console.log('=== deck embed-src retrofit (iframe -> playable deck) ===');
  console.log('mode:       ' + (opts.dryRun ? 'DRY-RUN (no writes)' : 'APPLY (--confirm)'));
  console.log('decks-root: ' + opts.decksRoot);
  console.log('locales:    ' + opts.locales.join(', '));
  console.log('sample:     ' + (opts.sample || 'all') + '\n');

  var grand = { total: 0, rewrite: 0, idempotent: 0, noEmbed: 0, missing: 0, errors: 0 };
  var failures = [];

  opts.locales.forEach(function (locale) {
    var t = { total: 0, rewrite: 0, idempotent: 0, noEmbed: 0, missing: 0, errors: 0 };
    var dirs = listDeckDirs(opts.decksRoot, locale, opts.sample)
      .filter(function (d) { return waveScope.inSet(opts.slugs, path.basename(d)); });
    dirs.forEach(function (deckDir, idx) {
      var res = processDeck(deckDir, locale, opts);
      t.total++;
      if (res.status === 'written' || res.status === 'would-rewrite') t.rewrite++;
      else if (res.status === 'idempotent') t.idempotent++;
      else if (res.status === 'no-embed') t.noEmbed++;
      else if (res.status === 'missing') t.missing++;
      else if (res.status === 'fs-error') { t.errors++; failures.push(deckDir + ': ' + res.error); }
      if ((idx + 1) % 200 === 0) process.stdout.write('  [' + locale + '] ' + (idx + 1) + '/' + dirs.length + '\r');
    });
    Object.keys(t).forEach(function (k) { grand[k] += t[k]; });
    console.log('[' + locale + '] ' + t.total + ' dirs; ' +
      (opts.dryRun ? t.rewrite + ' would-rewrite' : t.rewrite + ' written') +
      ', ' + t.idempotent + ' already-done, ' + t.noEmbed + ' no-embed, ' +
      t.missing + ' no-deck.html, ' + t.errors + ' errors');
  });

  console.log('\n=== Summary ===');
  console.log('Version dirs scanned: ' + grand.total);
  console.log((opts.dryRun ? 'Would rewrite:        ' : 'Rewritten:            ') + grand.rewrite);
  console.log('Already done:         ' + grand.idempotent);
  console.log('No embed affordance:  ' + grand.noEmbed);
  console.log('No deck.html:         ' + grand.missing);
  console.log('Errors:               ' + grand.errors);
  if (failures.length) {
    console.log('\n=== failures (first 40) ===');
    failures.slice(0, 40).forEach(function (f) { console.log('  - ' + f); });
    console.log('  (' + failures.length + ' total)');
  }
  process.exit(grand.errors > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { rewriteHtml: rewriteHtml, deckDirUrl: deckDirUrl, NEEDLE: NEEDLE };
