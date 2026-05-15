#!/usr/bin/env node
/**
 * One-shot retrofit for the Spanish find-objects + treasure-hunt waves shipped
 * on 2026-05-15. The authoring apps' extractDeckBundle baked English mode-name
 * literals ("Find Odd" / "I Spy" / "Cardinal Arrows" / "Compass") into
 * manifest.seo_trace.title.modeName.value (claiming isLocalized=true). At
 * publish time the §17.8.17 invariant 6 (LOCALE_RESIDUE_DETECTED) trusted
 * the trace and didn't fire; the English residue shipped into 194 es decks'
 * <title> + <meta description> + og:* + twitter:* + JSON-LD + seoMeta.
 *
 * Per §A.13.5 Shape A authoring-side root cause is queued separately.
 * Per §15.17 salvage scripts pattern, this script patches the 194 already-
 * shipped deck.html files in-place + backfills Deck.titleHash /
 * descriptionHash so the §17.8.17 invariants 1+2 DB constraints stay valid.
 *
 * Substitutions sourced live from frontend/config/topics-taxonomy.json
 * (§A.13.32 canonical-artifact-grounding):
 *
 *   find-odd        : "Find Odd"        → "Encontrar el diferente"
 *   i-spy           : "I Spy"           → "Veo veo"
 *   cardinal-arrows : "Cardinal Arrows" → "Arriba/Abajo/Izq/Der"
 *   compass         : "Compass"         → "Puntos cardinales"
 *
 * Substitution is scoped to "<EN-mode> {worksheetWord}" patterns
 * (worksheetWord = "Ficha" for find-objects, "Actividad" for treasure-hunt)
 * to avoid colliding with anything outside the SEO surface, plus the seoMeta
 * JSON field "exerciseModeName":"<EN-mode>".
 *
 * Atomicity per §15.5: temp + rename(2). Backup-then-rewrite per §15.17
 * (original bytes copied to /var/www/lcs-media/decks/.archived/es/
 * <slug>-mode-name-retrofit-<utc>/deck.html.original before in-place rewrite).
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-mode-name-es.js --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-mode-name-es.js --confirm
 *   node scripts/publish-cli/rewrite-deck-html-mode-name-es.js --slug <slug> --dry-run
 */

'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var db = require('./db');

var DEFAULT_DECKS_DIR = '/var/www/lcs-media/decks';
var LOCALE = 'es';

// Slug-prefix → (modeKey, exerciseType, worksheetWord)
// worksheetWord per-app from observed deck.html state at retrofit time.
var SLUG_PREFIX_MAP = [
  { prefix: 'encuentra-los-objetos-find-odd-',     modeKey: 'find-odd',        exerciseType: 'find-objects',  worksheetWord: 'Ficha' },
  { prefix: 'encuentra-los-objetos-i-spy-',        modeKey: 'i-spy',           exerciseType: 'find-objects',  worksheetWord: 'Ficha' },
  { prefix: 'busqueda-del-tesoro-cardinal-arrows-', modeKey: 'cardinal-arrows', exerciseType: 'treasure-hunt', worksheetWord: 'Actividad' },
  { prefix: 'busqueda-del-tesoro-compass-',        modeKey: 'compass',         exerciseType: 'treasure-hunt', worksheetWord: 'Actividad' }
];

function loadTaxonomy() {
  var taxonomyPath = path.resolve(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
  return JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
}

function identifySlugMode(slug) {
  for (var i = 0; i < SLUG_PREFIX_MAP.length; i++) {
    if (slug.indexOf(SLUG_PREFIX_MAP[i].prefix) === 0) return SLUG_PREFIX_MAP[i];
  }
  return null;
}

// Mirrors republish-seo.js walkDecks(); restricted to LOCALE.
function walkEsDecks(rootDir, slugFilter) {
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
    var deckHtml = path.join(localeDir, versionDir, 'deck.html');
    if (fs.existsSync(deckHtml)) decks.push({ deckHtml: deckHtml, slug: slug, versionDir: versionDir });
  });
  return decks;
}

function patchHtml(html, modeInfo, taxonomy) {
  var modeKey = modeInfo.modeKey;
  var enModeName = taxonomy.axes['exercise-mode'][modeKey].name.en; // "Find Odd" etc.
  var esModeName = taxonomy.axes['exercise-mode'][modeKey].name.es; // "Encontrar el diferente" etc.

  // The defective baked literal is the title-cased mode key, NOT taxonomy's
  // name.en (which is e.g. "Find the Odd One"). Build the actual baked literal
  // from the modeKey directly: split on '-', title-case each word.
  var bakedLiteral = modeKey.split('-').map(function (w) {
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' '); // "find-odd" → "Find Odd"

  // Primary substitution: "<bakedLiteral> <worksheetWord>" anchors the SEO
  // surface contexts (title, meta description, og:*, twitter:*, JSON-LD).
  var fromContextual = bakedLiteral + ' ' + modeInfo.worksheetWord;
  var toContextual = esModeName + ' ' + modeInfo.worksheetWord;

  // Secondary substitution: seoMeta JSON exerciseModeName field
  var fromSeoMeta = '"exerciseModeName":"' + bakedLiteral + '"';
  var toSeoMeta = '"exerciseModeName":"' + esModeName + '"';

  // Tertiary substitution: manifest.seo_trace.title.modeName / description.modeName
  // .value fields (if present in inlined seo_trace; defensive — present in
  // post-Phase-3b ZIPs). The trace JSON nests {"value":"Find Odd","source":"..."}
  // patterns. Same exact replacement covers both occurrences.
  var fromTraceValue = '"value":"' + bakedLiteral + '"';
  var toTraceValue = '"value":"' + esModeName + '"';

  var beforeCounts = {
    contextual: countOccurrences(html, fromContextual),
    seoMeta: countOccurrences(html, fromSeoMeta),
    traceValue: countOccurrences(html, fromTraceValue)
  };

  var newHtml = html;
  newHtml = newHtml.split(fromContextual).join(toContextual);
  newHtml = newHtml.split(fromSeoMeta).join(toSeoMeta);
  newHtml = newHtml.split(fromTraceValue).join(toTraceValue);

  var afterCounts = {
    contextual: countOccurrences(newHtml, fromContextual),
    seoMeta: countOccurrences(newHtml, fromSeoMeta),
    traceValue: countOccurrences(newHtml, fromTraceValue)
  };

  return {
    html: newHtml,
    bakedLiteral: bakedLiteral,
    esModeName: esModeName,
    before: beforeCounts,
    after: afterCounts
  };
}

function countOccurrences(s, needle) {
  if (!needle) return 0;
  var c = 0, idx = 0;
  while ((idx = s.indexOf(needle, idx)) !== -1) { c++; idx += needle.length; }
  return c;
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
  var modeInfo = identifySlugMode(entry.slug);
  if (!modeInfo) {
    return Object.assign({}, entry, { classification: 'skip-not-affected', modeInfo: null });
  }
  var html;
  try {
    html = fs.readFileSync(entry.deckHtml, 'utf8');
  } catch (e) {
    return Object.assign({}, entry, { classification: 'halt-A-read-error', reason: e.message });
  }
  var bakedLiteral = modeInfo.modeKey.split('-').map(function (w) {
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
  var anchor = bakedLiteral + ' ' + modeInfo.worksheetWord;
  var anchorCount = countOccurrences(html, anchor);
  if (anchorCount === 0) {
    return Object.assign({}, entry, { classification: 'skip-clean', modeInfo: modeInfo, html: html });
  }
  return Object.assign({}, entry, { classification: 'rewrite', modeInfo: modeInfo, html: html, anchorCount: anchorCount });
}

async function rewriteOne(c, taxonomy, opts) {
  var patched = patchHtml(c.html, c.modeInfo, taxonomy);

  // Sanity: after substitution, contextual + seoMeta should be 0
  if (patched.after.contextual !== 0 || patched.after.seoMeta !== 0) {
    return { ok: false, slug: c.slug, reason: 'post-patch occurrences non-zero: ' + JSON.stringify(patched.after) };
  }

  // Backup
  if (opts.backupRoot) {
    var utc = new Date().toISOString().replace(/[:.]/g, '').replace(/T/, '-').slice(0, 15);
    var backupDir = path.join(opts.backupRoot, c.slug + '-mode-name-retrofit-' + utc);
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
    bakedLiteral: patched.bakedLiteral,
    esModeName: patched.esModeName,
    dbBackfill: dbBackfill,
    titleHash: hashes.titleHash,
    descriptionHash: hashes.descriptionHash,
    renderedTitle: hashes.renderedTitle.slice(0, 80)
  };
}

function parseArgs(argv) {
  var opts = { dryRun: false, confirm: false, slug: null, baseDir: DEFAULT_DECKS_DIR, backupRoot: null };
  for (var i = 2; i < argv.length; i++) {
    var a = argv[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--confirm') opts.confirm = true;
    else if (a === '--slug') opts.slug = argv[++i];
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

  // Validate taxonomy has all 4 mode entries with name.es
  var missing = SLUG_PREFIX_MAP.filter(function (m) {
    var entry = taxonomy.axes && taxonomy.axes['exercise-mode'] && taxonomy.axes['exercise-mode'][m.modeKey];
    return !entry || !entry.name || !entry.name.es;
  });
  if (missing.length) {
    console.error('ERROR: taxonomy missing name.es for: ' + missing.map(function (m) { return m.modeKey; }).join(', '));
    process.exit(3);
  }

  var entries = walkEsDecks(opts.baseDir, opts.slug);
  var classifications = entries.map(function (e) { return classifyDeck(e, taxonomy); });

  var byClass = {};
  classifications.forEach(function (c) {
    byClass[c.classification] = (byClass[c.classification] || 0) + 1;
  });

  console.log('[rewrite-mode-name-es] scanned: ' + classifications.length + ' deck.html files in ' + opts.baseDir + '/' + LOCALE + '/');
  Object.keys(byClass).sort().forEach(function (k) {
    console.log('  ' + k + ': ' + byClass[k]);
  });

  var halts = classifications.filter(function (c) { return c.classification.indexOf('halt-') === 0; });
  if (halts.length) {
    console.error('[rewrite-mode-name-es] HALT — ' + halts.length + ' halt-class entries:');
    halts.forEach(function (h) { console.error('  ' + h.slug + ': ' + h.classification + ' — ' + (h.reason || '')); });
    process.exit(4);
  }

  var rewrites = classifications.filter(function (c) { return c.classification === 'rewrite'; });
  console.log('[rewrite-mode-name-es] rewrite-class: ' + rewrites.length);

  // Per-mode breakdown
  var byMode = {};
  rewrites.forEach(function (c) {
    var k = c.modeInfo.modeKey;
    byMode[k] = (byMode[k] || 0) + 1;
  });
  Object.keys(byMode).sort().forEach(function (k) {
    console.log('    ' + k + ': ' + byMode[k]);
  });

  if (opts.dryRun) {
    if (rewrites.length > 0) {
      console.log('[rewrite-mode-name-es] DRY-RUN — sample rewrite preview:');
      var sample = rewrites[0];
      console.log('  slug:          ' + sample.slug);
      console.log('  modeKey:       ' + sample.modeInfo.modeKey);
      var bakedLiteral = sample.modeInfo.modeKey.split('-').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
      console.log('  EN literal:    ' + bakedLiteral);
      console.log('  ES taxonomy:   ' + taxonomy.axes['exercise-mode'][sample.modeInfo.modeKey].name.es);
      console.log('  anchorCount:   ' + sample.anchorCount + ' (occurrences of "' + bakedLiteral + ' ' + sample.modeInfo.worksheetWord + '")');
    }
    console.log('[rewrite-mode-name-es] no FS writes (dry-run)');
    return;
  }

  // Real mode
  console.log('[rewrite-mode-name-es] applying retrofit to ' + rewrites.length + ' decks...');
  if (opts.backupRoot && !fs.existsSync(opts.backupRoot)) fs.mkdirSync(opts.backupRoot, { recursive: true });

  var outcomes = [];
  for (var i = 0; i < rewrites.length; i++) {
    var c = rewrites[i];
    try {
      var out = await rewriteOne(c, taxonomy, opts);
      outcomes.push(out);
      if (!out.ok) {
        console.error('  FAIL ' + c.slug + ': ' + out.reason);
      } else if ((i + 1) % 25 === 0 || i + 1 === rewrites.length) {
        console.log('  progress: ' + (i + 1) + '/' + rewrites.length);
      }
    } catch (e) {
      console.error('  EXCEPTION ' + c.slug + ': ' + e.message);
      outcomes.push({ ok: false, slug: c.slug, reason: 'exception: ' + e.message });
    }
  }

  var ok = outcomes.filter(function (o) { return o.ok; }).length;
  var fail = outcomes.filter(function (o) { return !o.ok; }).length;
  var dbOk = outcomes.filter(function (o) { return o.ok && o.dbBackfill === 'ok'; }).length;
  console.log('[rewrite-mode-name-es] done. ok=' + ok + ' fail=' + fail + ' dbBackfillOk=' + dbOk);

  if (fail > 0) process.exit(5);
}

main().then(function () { process.exit(0); }).catch(function (e) {
  console.error('FATAL: ' + e.message);
  console.error(e.stack);
  process.exit(99);
});
