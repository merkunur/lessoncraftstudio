#!/usr/bin/env node
/**
 * Part 5 completion: after migrate-native-mode-slugs.js re-slugged each non-EN
 * deck (Deck.slug → native), the slug is ALSO embedded in five URL columns that
 * the slug-only migration left pointing at the old slug:
 *   htmlUrl, thumbnailUrl, pdfUrl, answerKeyUrl, manifestUrl
 * These feed rendered surfaces (deck-card thumbnails via topic-decks.ts;
 * deck-end suggestion tile images via deck-end-suggestions.js thumbnailUrl;
 * deck metadata). They still 200 via the old-URL redirect symlink, but they
 * are non-canonical (extra redirect hop + old-slug image URLs in cards).
 *
 * This pass rewrites the PATH segment `/decks/<oldSlug>/` → `/decks/<newSlug>/`
 * in all five columns. The old slug is parsed from htmlUrl (authoritative — it
 * always embeds `/decks/<oldSlug>/deck.html`); the new slug is Deck.slug.
 *
 * Asset FILENAMES (pdfUrl/answerKeyUrl embed `<oldSlug>-printable.pdf`) are NOT
 * renamed — the on-disk files keep their original names, so the URL keeps the
 * old filename but gains the new (canonical) path: `/decks/<new>/<old>-...pdf`.
 * That still 200s (new symlink → dir, file present) and the cosmetic old
 * filename on a non-indexed download URL is acceptable. htmlUrl/thumbnailUrl/
 * manifestUrl use GENERIC filenames (deck.html/thumbnail.png/manifest.json) so
 * they become fully native.
 *
 * DB-only; idempotent (skip when oldSlug === newSlug, i.e. already native or EN).
 *
 * Usage:
 *   node scripts/publish-cli/migrate-deck-url-columns.js --dry-run [--locale=de] [--limit=N]
 *   node scripts/publish-cli/migrate-deck-url-columns.js --confirm [--locale=de]
 */

'use strict';

var db = require('./db');

var NON_EN = ['de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
var URL_COLS = ['htmlUrl', 'thumbnailUrl', 'pdfUrl', 'answerKeyUrl', 'manifestUrl'];

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var CONFIRM = argv.includes('--confirm');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;

if (!DRY_RUN && !CONFIRM) { console.error('USAGE: --dry-run or --confirm required.'); process.exit(2); }
if (DRY_RUN && CONFIRM) { console.error('USAGE: --dry-run and --confirm are mutually exclusive.'); process.exit(2); }

// Parse the old slug from an htmlUrl: .../decks/<oldSlug>/deck.html
function oldSlugFromHtmlUrl(htmlUrl) {
  if (!htmlUrl) return null;
  var m = /\/decks\/([^/]+)\//.exec(htmlUrl);
  return m ? m[1] : null;
}

async function main() {
  console.log('=== migrate-deck-url-columns — ' + (DRY_RUN ? 'DRY-RUN' : 'WRITE') + ' ===');
  console.log('locale: ' + (TARGET_LOCALE || 'all non-EN') + '  limit: ' + (LIMIT === Infinity ? 'none' : LIMIT));
  console.log('');

  var p = db.client();
  var locales = TARGET_LOCALE ? [TARGET_LOCALE] : NON_EN;
  var grand = { updated: 0, alreadyNative: 0, noOldSlug: 0, mismatch: 0 };
  var samples = {};

  for (var li = 0; li < locales.length; li++) {
    var locale = locales[li];
    var rows = await p.deck.findMany({
      where: { language: locale, status: 'published' },
      select: { id: true, slug: true, htmlUrl: true, thumbnailUrl: true, pdfUrl: true, answerKeyUrl: true, manifestUrl: true }
    });
    var per = { updated: 0, alreadyNative: 0, noOldSlug: 0, mismatch: 0, processed: 0 };
    for (var i = 0; i < rows.length; i++) {
      if (per.processed >= LIMIT) break;
      per.processed++;
      var r = rows[i];
      var oldSlug = oldSlugFromHtmlUrl(r.htmlUrl);
      if (!oldSlug) { grand.noOldSlug++; per.noOldSlug++; continue; }
      if (oldSlug === r.slug) { grand.alreadyNative++; per.alreadyNative++; continue; }

      var oldFrag = '/decks/' + oldSlug + '/';
      var newFrag = '/decks/' + r.slug + '/';
      var data = {};
      var changedAny = false;
      for (var c = 0; c < URL_COLS.length; c++) {
        var col = URL_COLS[c];
        var val = r[col];
        if (typeof val === 'string' && val.indexOf(oldFrag) !== -1) {
          data[col] = val.split(oldFrag).join(newFrag);
          changedAny = true;
        }
      }
      if (!changedAny) { grand.mismatch++; per.mismatch++; continue; }

      if (!samples[locale]) samples[locale] = oldSlug + ' → ' + r.slug + '  (thumb: ' + (data.thumbnailUrl || r.thumbnailUrl) + ')';
      if (CONFIRM) {
        await p.deck.update({ where: { id: r.id }, data: data });
      }
      grand.updated++; per.updated++;
    }
    console.log('[' + locale + '] ' + rows.length + ' decks | update=' + per.updated + ' already-native=' + per.alreadyNative + ' no-oldslug=' + per.noOldSlug + ' mismatch=' + per.mismatch + (samples[locale] ? ('\n      e.g. ' + samples[locale]) : ''));
  }

  console.log('');
  console.log('=== TOTAL ===');
  console.log('  ' + (DRY_RUN ? 'would-update' : 'updated') + ': ' + grand.updated);
  console.log('  already-native:        ' + grand.alreadyNative);
  console.log('  no-old-slug (skipped): ' + grand.noOldSlug);
  console.log('  frag-mismatch:         ' + grand.mismatch);

  await db.disconnect();
}

main().catch(function (e) { console.error('FATAL: ' + e.message); if (e.stack) console.error(e.stack); process.exit(1); });
