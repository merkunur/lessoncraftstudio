#!/usr/bin/env node
/**
 * One-shot retrofit for the Portuguese addition wave shipped on 2026-05-16.
 * The addition app's extractDeckBundle baked the raw snake_case theme axis-key
 * into manifest.seo_trace.title.themeName.value (claiming isLocalized=true,
 * source=metadata.theme) instead of looking up the pt display name. At publish
 * time the §17.8.17 invariant 6 (LOCALE_RESIDUE_DETECTED) trusted the trace
 * and didn't fire; the raw axis-keys shipped into 199 pt decks' <title>,
 * <meta description>, OG/Twitter, JSON-LD, and seoMeta.themeName fields.
 *
 * The slug, however, was correctly pt-localized (axes.theme.<key>.slug.pt
 * via slug.js), so URLs read e.g. /pt/decks/adicao-find-addend-animais-do-zoologico-6ba9/
 * while the title reads "Adição Divertida Find Addend Folha — zoo_animals
 * — Jardim de infância — Set 6ba9 | LessonCraftStudio". Cosmetic SEO defect
 * but visitor-visible; degrades pt-locale ranking.
 *
 * Per §A.13.5 Shape A authoring-side root cause is queued separately. Per
 * §15.17 salvage scripts pattern, this script patches the 199 already-shipped
 * deck.html files in-place + backfills Deck.titleHash / descriptionHash so
 * §17.8.17 invariants 1+2 DB uniqueness constraints stay valid.
 *
 * Substitutions sourced live from frontend/config/topics-taxonomy.json
 * (§A.13.32 canonical-artifact-grounding):
 *   <theme_axis_key>  →  axes.theme.<theme_axis_key>.name.pt
 *
 * e.g.:
 *   zoo_animals   → "Animais do zoológico"
 *   kitchen_tools → "Utensílios de cozinha"
 *   bakery        → "Padaria"
 *   4th_of_july   → "4 de Julho"
 *   farm_animals  → "Animais da fazenda"
 *
 * Substitution is scoped to contextual anchors that bound the SEO surface:
 *   1.  " — <axisKey> — "             (title segment with em-dash separators)
 *   2.  "(<axisKey>)"                 (meta description parenthetical)
 *   3.  "\"themeName\":\"<axisKey>\""  (seoMeta JSON + seo_trace JSON)
 *   4.  "content=\"<axisKey>\""       (OG image alt as bare-axis-key, defensive)
 *
 * Each addition deck has ONE theme axis-key (per bundle.imagePlacements[0].theme).
 * Substitutions are exact-string with `.split(from).join(to)` so multiple
 * occurrences across SEO surfaces all flip in one pass.
 *
 * Atomicity per §15.5: temp + rename(2). Backup-then-rewrite per §15.17
 * (original bytes copied to /var/www/lcs-media/decks/.archived/pt/
 * <slug>-theme-name-retrofit-<utc>/deck.html.original before in-place rewrite).
 *
 * Idempotent: skip-clean classification when the raw axis-key no longer appears
 * in the title's em-dash-bounded theme segment.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-theme-name-pt.js --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-theme-name-pt.js --confirm
 *   node scripts/publish-cli/rewrite-deck-html-theme-name-pt.js --slug <slug> --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-theme-name-pt.js --app-prefix <prefix> --dry-run
 *
 * The --app-prefix flag restricts to a slug-prefix (e.g., "adicao-" for addition);
 * defaults to all pt decks. The --slug flag operates on a single deck.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var db = require('./db');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var LOCALE = 'pt';

function loadTaxonomy() {
  var taxonomyPath = path.resolve(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
  return JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
}

function deriveThemeName(themeKey, taxonomy) {
  if (!themeKey) return null;
  var node = taxonomy.axes && taxonomy.axes.theme && taxonomy.axes.theme[themeKey];
  if (!node || !node.name) return null;
  return node.name.pt || node.name.en || null;
}

// Mirrors republish-seo.js walkDecks() + rewrite-deck-html-mode-name-es.js walkEsDecks().
function walkPtDecks(rootDir, slugFilter, appPrefix) {
  var localeDir = path.join(rootDir, LOCALE);
  if (!fs.existsSync(localeDir)) return [];
  var entries = fs.readdirSync(localeDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    var p = path.join(localeDir, n);
    var stat;
    try { stat = fs.lstatSync(p); } catch (e) { return false; }
    return stat.isDirectory() && /-v\d+$/.test(n);
  });
  var decks = [];
  entries.forEach(function (versionDir) {
    var slug = versionDir.replace(/-v\d+$/, '');
    if (slugFilter && slug !== slugFilter) return;
    if (appPrefix && slug.indexOf(appPrefix) !== 0) return;
    var deckHtml = path.join(localeDir, versionDir, 'deck.html');
    if (fs.existsSync(deckHtml)) decks.push({ deckHtml: deckHtml, slug: slug, versionDir: versionDir });
  });
  return decks;
}

// Extract theme axis-key from DECK_BUNDLE.imagePlacements[0].theme via regex.
// Defensive: fall back to scanning the title for the snake_case theme segment.
var BUNDLE_RE = /var\s+DECK_BUNDLE\s*=\s*(\{[\s\S]*?\});\s*<\/script>/;

// Raw snake_case axis-key: lowercase + digits + underscore only.
// Anything else (capitalized, accented, spaces, hyphens) = already pt-localized → skip.
function isRawSnakeCaseAxisKey(s) {
  return typeof s === 'string' && /^[a-z0-9_]+$/.test(s) && s.length > 0;
}

function extractThemeAxisKey(html) {
  // Primary: parse <title> for snake_case segment between em-dashes (most reliable;
  // already-fixed decks will have a pt-localized title segment that fails this match).
  var titleMatch = /<title>[^<]+— ([^<]+?) —/.exec(html);
  if (titleMatch && titleMatch[1] && isRawSnakeCaseAxisKey(titleMatch[1])) {
    return titleMatch[1];
  }
  // Secondary: extract from seoMeta.themeName in DECK_BUNDLE. Only return if
  // snake_case (raw axis-key); reject already-pt-localized values.
  var seoMatch = /"seoMeta"\s*:\s*\{[^}]*"themeName"\s*:\s*"([^"]+)"/.exec(html);
  if (seoMatch && seoMatch[1] && isRawSnakeCaseAxisKey(seoMatch[1])) {
    return seoMatch[1];
  }
  return null;
}

function countOccurrences(s, needle) {
  if (!needle) return 0;
  var c = 0, idx = 0;
  while ((idx = s.indexOf(needle, idx)) !== -1) { c++; idx += needle.length; }
  return c;
}

function patchHtml(html, axisKey, themeName) {
  var pairs = [
    // Title + JSON-LD + OG title + Twitter title segment
    { from: ' — ' + axisKey + ' — ',                                   to: ' — ' + themeName + ' — ' },
    // Meta description + JSON-LD description parenthetical
    { from: '(' + axisKey + ')',                                       to: '(' + themeName + ')' },
    // seoMeta JSON in DECK_BUNDLE + seo_trace.title.themeName.value + seo_trace.description.themeName.value
    { from: '"themeName":"' + axisKey + '"',                           to: '"themeName":"' + themeName + '"' },
    { from: '"value":"' + axisKey + '"',                               to: '"value":"' + themeName + '"' }
  ];

  var beforeCounts = pairs.map(function (p) { return countOccurrences(html, p.from); });
  var newHtml = html;
  pairs.forEach(function (p) {
    newHtml = newHtml.split(p.from).join(p.to);
  });
  var afterCounts = pairs.map(function (p) { return countOccurrences(newHtml, p.from); });

  return {
    html: newHtml,
    before: beforeCounts,
    after: afterCounts,
    totalSubstitutions: beforeCounts.reduce(function (a, b) { return a + b; }, 0)
  };
}

function normalizeForHash(s) {
  return String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function computeHashesFromHtml(html) {
  var titleMatch = /<title>([^<]+)<\/title>/i.exec(html);
  var descMatch = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(html);
  var renderedTitle = titleMatch ? titleMatch[1] : '';
  var renderedDescription = descMatch ? descMatch[1] : '';
  return {
    titleHash: renderedTitle ? crypto.createHash('sha1').update(normalizeForHash(renderedTitle)).digest('hex') : null,
    descriptionHash: renderedDescription ? crypto.createHash('sha1').update(normalizeForHash(renderedDescription)).digest('hex') : null,
    renderedTitle: renderedTitle,
    renderedDescription: renderedDescription
  };
}

function classifyDeck(entry, taxonomy) {
  var html;
  try {
    html = fs.readFileSync(entry.deckHtml, 'utf8');
  } catch (e) {
    return Object.assign({}, entry, { classification: 'halt-A-read-error', reason: e.message });
  }
  var axisKey = extractThemeAxisKey(html);
  if (!axisKey) {
    // No raw snake_case axis-key in title or seoMeta → already pt-localized OR themeless.
    return Object.assign({}, entry, { classification: 'skip-clean', html: html, axisKey: null });
  }
  // If the extracted "axis-key" doesn't contain underscore AND isn't a known
  // raw axis-key in topics-taxonomy, it's likely already pt-localized → skip-clean.
  // Test: does the title contain " — <axisKey> — "?
  var titleSegmentPattern = ' — ' + axisKey + ' — ';
  var hasTitleResidue = html.indexOf(titleSegmentPattern) !== -1;
  if (!hasTitleResidue) {
    return Object.assign({}, entry, { classification: 'skip-clean', html: html, axisKey: axisKey });
  }
  // Look up pt display name
  var themeName = deriveThemeName(axisKey, taxonomy);
  if (!themeName) {
    return Object.assign({}, entry, { classification: 'halt-C-no-display-name', html: html, axisKey: axisKey });
  }
  // Already-clean case: axis-key is the same string as the pt display name (rare)
  if (axisKey === themeName) {
    return Object.assign({}, entry, { classification: 'skip-clean', html: html, axisKey: axisKey });
  }
  return Object.assign({}, entry, { classification: 'rewrite', html: html, axisKey: axisKey, themeName: themeName });
}

async function rewriteOne(c, opts) {
  var patched = patchHtml(c.html, c.axisKey, c.themeName);

  if (patched.totalSubstitutions === 0) {
    return { ok: false, slug: c.slug, reason: 'no occurrences found post-classify (unexpected)' };
  }

  // Sanity: all after-counts should be 0
  if (patched.after.some(function (n) { return n > 0; })) {
    return { ok: false, slug: c.slug, reason: 'post-patch residue: ' + JSON.stringify(patched.after) };
  }

  // Backup
  if (opts.backupRoot) {
    var utc = new Date().toISOString().replace(/[:.]/g, '').replace(/T/, '-').slice(0, 15);
    var backupDir = path.join(opts.backupRoot, c.slug + '-theme-name-retrofit-' + utc);
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
    fs.writeFileSync(path.join(backupDir, 'deck.html.original'), c.html);
  }

  // Atomic write
  var tmpPath = c.deckHtml + '.new';
  fs.writeFileSync(tmpPath, patched.html);
  fs.renameSync(tmpPath, c.deckHtml);

  // Backfill DB hashes
  var hashes = computeHashesFromHtml(patched.html);
  var dbBackfill = 'skipped';
  if (hashes.titleHash || hashes.descriptionHash) {
    try {
      var deckRow = await db.findExistingBySlug(LOCALE, c.slug);
      if (deckRow) {
        await db.client().deck.update({
          where: { id: deckRow.id },
          data: { titleHash: hashes.titleHash, descriptionHash: hashes.descriptionHash }
        });
        dbBackfill = 'ok';
      } else {
        dbBackfill = 'no-db-row';
      }
    } catch (e) {
      dbBackfill = 'failed: ' + e.message;
    }
  }

  return {
    ok: true,
    slug: c.slug,
    axisKey: c.axisKey,
    themeName: c.themeName,
    substitutions: patched.totalSubstitutions,
    dbBackfill: dbBackfill,
    titleHash: hashes.titleHash,
    descriptionHash: hashes.descriptionHash,
    renderedTitle: hashes.renderedTitle.slice(0, 100)
  };
}

function parseArgs(argv) {
  var opts = { dryRun: false, confirm: false, slug: null, appPrefix: null, baseDir: DEFAULT_DECKS_DIR, backupRoot: null };
  for (var i = 2; i < argv.length; i++) {
    var a = argv[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--confirm') opts.confirm = true;
    else if (a === '--slug') opts.slug = argv[++i];
    else if (a === '--app-prefix') opts.appPrefix = argv[++i];
    else if (a === '--base-dir') opts.baseDir = argv[++i];
    else if (a === '--backup-root') opts.backupRoot = argv[++i];
    else {
      console.error('Unknown arg: ' + a);
      process.exit(2);
    }
  }
  return opts;
}

async function main() {
  var opts = parseArgs(process.argv);
  if (!opts.dryRun && !opts.confirm) {
    console.error('ERROR: must pass --dry-run or --confirm');
    process.exit(2);
  }
  if (opts.dryRun && opts.confirm) {
    console.error('ERROR: --dry-run and --confirm are mutually exclusive');
    process.exit(2);
  }

  if (opts.confirm && !opts.backupRoot) {
    opts.backupRoot = path.join(opts.baseDir, '.archived', LOCALE);
  }

  var taxonomy = loadTaxonomy();

  var entries = walkPtDecks(opts.baseDir, opts.slug, opts.appPrefix);
  console.log('[rewrite-theme-name-pt] scanned: ' + entries.length + ' deck.html files in ' + opts.baseDir + '/' + LOCALE + '/'
    + (opts.appPrefix ? ' (app-prefix=' + opts.appPrefix + ')' : '')
    + (opts.slug ? ' (slug=' + opts.slug + ')' : ''));

  var classifications = entries.map(function (e) { return classifyDeck(e, taxonomy); });

  var byClass = {};
  classifications.forEach(function (c) {
    byClass[c.classification] = (byClass[c.classification] || 0) + 1;
  });
  Object.keys(byClass).sort().forEach(function (k) {
    console.log('  ' + k + ': ' + byClass[k]);
  });

  var halts = classifications.filter(function (c) { return c.classification.indexOf('halt-') === 0; });
  if (halts.length) {
    console.error('[rewrite-theme-name-pt] HALT — ' + halts.length + ' halt-class entries:');
    halts.slice(0, 10).forEach(function (h) { console.error('  ' + h.slug + ': ' + h.classification + (h.reason ? ' — ' + h.reason : '')); });
    process.exit(4);
  }

  var rewrites = classifications.filter(function (c) { return c.classification === 'rewrite'; });
  console.log('[rewrite-theme-name-pt] rewrite-class: ' + rewrites.length);

  // Per-theme breakdown
  var byTheme = {};
  rewrites.forEach(function (c) {
    byTheme[c.axisKey] = (byTheme[c.axisKey] || 0) + 1;
  });
  if (rewrites.length > 0) {
    var themeKeys = Object.keys(byTheme).sort();
    console.log('  themes covered: ' + themeKeys.length);
    themeKeys.slice(0, 15).forEach(function (k) {
      console.log('    ' + k + ' → "' + deriveThemeName(k, taxonomy) + '" : ' + byTheme[k]);
    });
    if (themeKeys.length > 15) console.log('    ... + ' + (themeKeys.length - 15) + ' more themes');
  }

  if (opts.dryRun) {
    if (rewrites.length > 0) {
      console.log('[rewrite-theme-name-pt] DRY-RUN — sample rewrite preview:');
      var sample = rewrites[0];
      console.log('  slug:        ' + sample.slug);
      console.log('  axisKey:     ' + sample.axisKey);
      console.log('  themeName:   ' + sample.themeName);
      var patched = patchHtml(sample.html, sample.axisKey, sample.themeName);
      console.log('  substitutions count: ' + patched.totalSubstitutions);
      var newTitleMatch = /<title>([^<]+)<\/title>/i.exec(patched.html);
      if (newTitleMatch) console.log('  new title:   ' + newTitleMatch[1]);
    }
    console.log('[rewrite-theme-name-pt] no FS writes (dry-run)');
    return;
  }

  console.log('[rewrite-theme-name-pt] applying retrofit to ' + rewrites.length + ' decks...');
  if (opts.backupRoot && !fs.existsSync(opts.backupRoot)) fs.mkdirSync(opts.backupRoot, { recursive: true });

  var results = { ok: 0, failed: 0 };
  for (var i = 0; i < rewrites.length; i++) {
    var c = rewrites[i];
    var r = await rewriteOne(c, opts);
    if (r.ok) {
      results.ok++;
      if (results.ok % 25 === 0) console.log('  ' + results.ok + '/' + rewrites.length + ' retrofitted');
    } else {
      results.failed++;
      console.error('  FAIL ' + r.slug + ': ' + r.reason);
    }
  }

  console.log('');
  console.log('[rewrite-theme-name-pt] APPLY complete');
  console.log('  retrofitted: ' + results.ok);
  console.log('  failed:      ' + results.failed);
}

main().catch(function (e) {
  console.error('ERROR: ' + (e.stack || e.message));
  process.exit(99);
});
