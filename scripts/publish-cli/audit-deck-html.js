/**
 * Phase 1 per-deck audit for the en/es/pt SEO-100pct commission.
 *
 * Reads every published deck's deck.html + manifest.json directly off
 * /var/www/lcs-media/decks/<locale>/<slug>/{deck.html, manifest.json} and runs
 * 10 invariant checks per deck (the seven §17.8.17 invariants + §A.14.8 step 2b
 * seoMeta + §A.14.8 step 4 deckend strip + §A.10 canonical-host www-form).
 *
 * Read-only. Output:
 *   docs/audit-results/seo-100pct-curl-<utc>.json     per-deck JSON
 *   docs/audit-results/seo-100pct-curl-<utc>.md       aggregate summary
 *
 * Bypasses Cloudflare entirely — direct FS read off Hetzner. No rate limits.
 * Symlink `<locale>/<slug>` resolves to current published version.
 *
 * Usage:
 *   node scripts/publish-cli/audit-deck-html.js
 *   node scripts/publish-cli/audit-deck-html.js --baseline=docs/audit-results/seo-100pct-baseline-<stamp>.json
 *   node scripts/publish-cli/audit-deck-html.js --locales=en,es,pt
 *   node scripts/publish-cli/audit-deck-html.js --decks-root=/var/www/lcs-media/decks
 *   node scripts/publish-cli/audit-deck-html.js --sample=50  (audit first N per locale; for quick spot-check)
 */

'use strict';

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

var db = require('./db');
var seoReconciliation = require('./seo-reconciliation');
var countInboundMod = require('./count-inbound-surfaces');

var CANONICAL_URL_BASE = 'https://www.lessoncraftstudio.com';
var DECKS_ROOT_DEFAULT = '/var/www/lcs-media/decks';

// Two hash algorithms coexist in the catalog due to Phase 4a retrofit using
// SHA-1 normalized but new publishes via seo-reconciliation predicate using
// SHA-256 raw. Audit accepts either as a valid match and flags the algorithm
// inconsistency as a separate defect class for Phase 2.7 standardization.
function sha1Normalized(s) {
  var normalized = String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  return normalized ? crypto.createHash('sha1').update(normalized).digest('hex') : null;
}

function parseArgs(argv) {
  var out = {
    baseline: null,
    locales: ['en', 'es', 'pt'],
    outDir: path.resolve(__dirname, '..', '..', 'docs', 'audit-results'),
    decksRoot: DECKS_ROOT_DEFAULT,
    sample: null,
    concurrency: 16
  };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--baseline=') === 0) out.baseline = path.resolve(a.slice('--baseline='.length));
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice('--locales='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--out-dir=') === 0) out.outDir = path.resolve(a.slice('--out-dir='.length));
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice('--decks-root='.length);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice('--sample='.length), 10);
    else if (a.indexOf('--concurrency=') === 0) out.concurrency = parseInt(a.slice('--concurrency='.length), 10);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node audit-deck-html.js [--baseline=path] [--locales=en,es,pt] [--decks-root=path] [--sample=N] [--concurrency=N]');
      process.exit(0);
    }
  });
  return out;
}

function utcStamp() {
  var d = new Date();
  return d.toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
}

function sha256(str) {
  return crypto.createHash('sha256').update(String(str || ''), 'utf8').digest('hex');
}

// =====================================================================
// Per-deck checks
// =====================================================================

/**
 * Run all 10 checks against a single deck. Returns the per-deck result row.
 *
 * dbDeck: row from baseline JSON (or freshly-queried Prisma row)
 * htmlText: deck.html contents (string)
 * manifestObj: manifest.json parsed (object) or null if unreadable
 */
async function runChecksForDeck(dbDeck, htmlText, manifestObj, ctx) {
  var checks = {};
  var defects = [];

  // ===== Check 1: title uniqueness =====
  // The DB has TWO coexisting hash algorithms (legacy data-integrity defect):
  //   SHA-256 raw (predicate canonical, length 64)
  //   SHA-1 normalized (Phase 4a republish-seo, length 40)
  // We compute both, accept either as a match, and flag any deck whose DB
  // hash is SHA-1 as needing standardization (HASH_ALGORITHM_LEGACY).
  var titleTagMatch = /<title>([\s\S]*?)<\/title>/i.exec(htmlText);
  var renderedTitle = titleTagMatch ? titleTagMatch[1].trim() : '';
  var renderedTitleSha256 = renderedTitle ? sha256(renderedTitle) : null;
  var renderedTitleSha1Norm = renderedTitle ? sha1Normalized(renderedTitle) : null;
  if (!dbDeck.titleHash) {
    checks.titleUniqueness = { pass: false, category: 'TITLE_HASH_NULL', renderedTitle: renderedTitle.slice(0, 120), renderedTitleSha256: renderedTitleSha256 };
    defects.push('TITLE_HASH_NULL');
  } else {
    var dbHashLen = dbDeck.titleHash.length;
    var matchSha256 = dbDeck.titleHash === renderedTitleSha256;
    var matchSha1 = dbDeck.titleHash === renderedTitleSha1Norm;
    if (!matchSha256 && !matchSha1) {
      checks.titleUniqueness = { pass: false, category: 'TITLE_HASH_MISMATCH', renderedTitle: renderedTitle.slice(0, 120), dbHash: dbDeck.titleHash, renderedSha256: renderedTitleSha256, renderedSha1Norm: renderedTitleSha1Norm };
      defects.push('TITLE_HASH_MISMATCH');
    } else {
      // Collision detection within the same locale.
      var collisionSet = ctx.titleHashSetByLocale[dbDeck.language] || new Map();
      var prior = collisionSet.get(dbDeck.titleHash);
      if (prior && prior !== dbDeck.id) {
        checks.titleUniqueness = { pass: false, category: 'TITLE_HASH_COLLIDES_WITH', collidesWith: prior };
        defects.push('TITLE_NON_UNIQUE');
      } else {
        collisionSet.set(dbDeck.titleHash, dbDeck.id);
        ctx.titleHashSetByLocale[dbDeck.language] = collisionSet;
        // Track algorithm legacy class.
        if (dbHashLen === 40) {
          checks.titleUniqueness = { pass: true, algorithm: 'sha1-normalized', flag: 'LEGACY' };
          defects.push('HASH_ALGORITHM_LEGACY_TITLE');
        } else {
          checks.titleUniqueness = { pass: true, algorithm: 'sha256' };
        }
      }
    }
  }

  // ===== Check 2: description uniqueness =====
  var descMatch = /<meta\s+name="description"\s+content="([^"]*)"/i.exec(htmlText);
  var renderedDesc = descMatch ? descMatch[1] : '';
  var renderedDescSha256 = renderedDesc ? sha256(renderedDesc) : null;
  var renderedDescSha1Norm = renderedDesc ? sha1Normalized(renderedDesc) : null;
  if (!dbDeck.descriptionHash) {
    checks.descriptionUniqueness = { pass: false, category: 'DESCRIPTION_HASH_NULL', renderedDesc: renderedDesc.slice(0, 120) };
    defects.push('DESCRIPTION_HASH_NULL');
  } else {
    var dbDescLen = dbDeck.descriptionHash.length;
    var descMatchSha256 = dbDeck.descriptionHash === renderedDescSha256;
    var descMatchSha1 = dbDeck.descriptionHash === renderedDescSha1Norm;
    if (!descMatchSha256 && !descMatchSha1) {
      checks.descriptionUniqueness = { pass: false, category: 'DESCRIPTION_HASH_MISMATCH', dbHash: dbDeck.descriptionHash, renderedSha256: renderedDescSha256, renderedSha1Norm: renderedDescSha1Norm };
      defects.push('DESCRIPTION_HASH_MISMATCH');
    } else {
      var descSet = ctx.descriptionHashSetByLocale[dbDeck.language] || new Map();
      var priorDesc = descSet.get(dbDeck.descriptionHash);
      if (priorDesc && priorDesc !== dbDeck.id) {
        checks.descriptionUniqueness = { pass: false, category: 'DESCRIPTION_HASH_COLLIDES_WITH', collidesWith: priorDesc };
        defects.push('DESCRIPTION_NON_UNIQUE');
      } else {
        descSet.set(dbDeck.descriptionHash, dbDeck.id);
        ctx.descriptionHashSetByLocale[dbDeck.language] = descSet;
        if (dbDescLen === 40) {
          checks.descriptionUniqueness = { pass: true, algorithm: 'sha1-normalized', flag: 'LEGACY' };
          defects.push('HASH_ALGORITHM_LEGACY_DESC');
        } else {
          checks.descriptionUniqueness = { pass: true, algorithm: 'sha256' };
        }
      }
    }
  }

  // ===== Check 3: canonical URL pattern =====
  // Reuse reconcileCanonicalURLPattern. Manifest may be missing → fall back to a synthetic one.
  var synManifest = manifestObj || { language: dbDeck.language, exercise_type: dbDeck.exerciseType };
  var canonicalResult = seoReconciliation.reconcileCanonicalURLPattern(synManifest, htmlText, { slug: dbDeck.slug });
  if (canonicalResult.category === 'CLEAN') {
    checks.canonicalURL = { pass: true, value: canonicalResult.declared };
  } else {
    checks.canonicalURL = { pass: false, category: canonicalResult.category, declared: canonicalResult.declared, expected: canonicalResult.expected };
    defects.push('CANONICAL_' + canonicalResult.category.replace(/^CANONICAL_/, ''));
  }

  // ===== Check 4: OG tags (≥14 required) =====
  var ogResult = seoReconciliation.reconcileOGTags(htmlText, { deckId: dbDeck.id, app: dbDeck.exerciseType });
  if (ogResult.category === 'CLEAN' || ogResult.category === 'OG_IMAGE_FALLBACK_USED') {
    checks.ogTags = { pass: ogResult.category === 'CLEAN', category: ogResult.category };
    if (ogResult.category === 'OG_IMAGE_FALLBACK_USED') {
      defects.push('OG_IMAGE_FALLBACK_USED');
    }
  } else {
    checks.ogTags = { pass: false, category: ogResult.category, missing: ogResult.missing };
    defects.push('OG_TAG_MISSING');
  }

  // ===== Check 5: inbound-link count ≥3 =====
  // Uses count-inbound-surfaces over the real DB.
  try {
    var inbound = await countInboundMod.countInboundSurfacesForDeck(dbDeck.id, dbDeck.language);
    if (inbound.count >= 3) {
      checks.inboundLinks = { pass: true, count: inbound.count };
    } else {
      checks.inboundLinks = { pass: false, count: inbound.count, perSurface: inbound.perSurface };
      defects.push('INBOUND_LINK_COUNT_BELOW_TARGET');
    }
  } catch (e) {
    checks.inboundLinks = { pass: false, error: e.message };
    defects.push('INBOUND_LINK_QUERY_FAILED');
  }

  // ===== Check 6: locale residue (non-en only) =====
  if (dbDeck.language !== 'en') {
    var localeResult = seoReconciliation.reconcileLocaleResidue(synManifest, renderedTitle, renderedDesc, {});
    if (localeResult.category === 'CLEAN') {
      checks.localeResidue = { pass: true, path: localeResult.path };
    } else {
      checks.localeResidue = { pass: false, category: localeResult.category, englishWords: localeResult.englishWords, path: localeResult.path };
      defects.push('LOCALE_RESIDUE_DETECTED');
    }
  } else {
    checks.localeResidue = { pass: true, skip: 'en source-locale' };
  }

  // ===== Check 7: single h1 =====
  var h1Result = seoReconciliation.reconcileSingleH1(htmlText, { deckId: dbDeck.id, app: dbDeck.exerciseType });
  if (h1Result.category === 'CLEAN') {
    checks.singleH1 = { pass: true };
  } else {
    checks.singleH1 = { pass: false, category: h1Result.category, count: h1Result.count };
    defects.push('MULTIPLE_H1_DETECTED');
  }

  // ===== Check 8: seoMeta.themeName populated when manifest.theme non-null =====
  // §A.14.8 step 2b.
  var manifestTheme = manifestObj && manifestObj.theme;
  // Find seoMeta object in deck.html. The bundle's seoMeta lives within DECK_BUNDLE JSON.
  var seoMetaMatch = /"seoMeta"\s*:\s*\{[^}]*"themeName"\s*:\s*("([^"]*)"|null)/.exec(htmlText);
  var themeNameInHtml = null;
  if (seoMetaMatch) {
    themeNameInHtml = seoMetaMatch[1] === 'null' ? null : seoMetaMatch[2];
  }
  if (manifestTheme && !themeNameInHtml) {
    checks.seoMetaThemeName = { pass: false, category: 'SEO_META_THEME_NAME_NULL_WHILE_MANIFEST_THEME_NON_NULL', manifestTheme: manifestTheme };
    defects.push('SEO_META_THEME_NAME_MISSING');
  } else if (manifestTheme && themeNameInHtml) {
    checks.seoMetaThemeName = { pass: true, themeName: themeNameInHtml };
  } else {
    // manifest.theme null → themeless app or operator didn't set theme; HTML may or may not have themeName
    checks.seoMetaThemeName = { pass: true, skip: 'manifest theme is null', themeName: themeNameInHtml };
  }

  // ===== Check 9: deckend-suggestions strip ≥3 markers =====
  // §A.14.8 step 4. Need at least CSS + section + un-hide JS = 3 hits.
  var deckendCount = (htmlText.match(/lcs-deckend-suggestions/g) || []).length;
  // Tile count gives us info on whether the strip is functionally populated.
  var deckendTileCount = (htmlText.match(/lcs-deckend-tile/g) || []).length;
  if (deckendCount >= 3) {
    checks.deckendStrip = { pass: true, markers: deckendCount, tiles: deckendTileCount };
  } else {
    checks.deckendStrip = { pass: false, markers: deckendCount, tiles: deckendTileCount, mode: deckendCount === 1 ? 'A' : 'B' };
    defects.push('DECKEND_STRIP_STALE_EMIT');
  }

  // ===== Check 10: canonical host www-form =====
  // §A.10. var url=...  inside the deck.html runtime. Used by embed iframe auto-resize.
  var varUrlMatch = /var\s+url\s*=\s*["']([^"']+)["']/i.exec(htmlText);
  if (varUrlMatch) {
    var varUrl = varUrlMatch[1];
    if (varUrl.indexOf('https://www.lessoncraftstudio.com/') === 0) {
      checks.canonicalHostVarUrl = { pass: true, value: varUrl };
    } else if (varUrl.indexOf('https://lessoncraftstudio.com/') === 0) {
      checks.canonicalHostVarUrl = { pass: false, category: 'APEX_FORM', value: varUrl };
      defects.push('CANONICAL_HOST_APEX_VAR_URL');
    } else {
      checks.canonicalHostVarUrl = { pass: false, category: 'OTHER', value: varUrl };
      defects.push('CANONICAL_HOST_OTHER_VAR_URL');
    }
  } else {
    // Older deck.html shapes don't carry var url. Acceptable when canonical link is www-form per check 3.
    checks.canonicalHostVarUrl = { pass: true, skip: 'no var url found' };
  }

  return {
    id: dbDeck.id,
    language: dbDeck.language,
    slug: dbDeck.slug,
    exerciseType: dbDeck.exerciseType,
    exerciseMode: dbDeck.exerciseMode,
    ageRange: dbDeck.ageRange,
    version: dbDeck.version,
    htmlPath: ctx.htmlPath,
    manifestPath: ctx.manifestPath,
    checks: checks,
    defectClasses: defects,
    defectCount: defects.length,
    passAll: defects.length === 0
  };
}

// =====================================================================
// FS reads (deck.html + manifest.json)
// =====================================================================

function readDeckFiles(decksRoot, locale, slug) {
  var localeDir = path.join(decksRoot, locale, slug);
  var htmlPath = path.join(localeDir, 'deck.html');
  var manifestPath = path.join(localeDir, 'manifest.json');
  var htmlText = null;
  var manifestObj = null;
  var errors = [];
  try {
    htmlText = fs.readFileSync(htmlPath, 'utf8');
  } catch (e) {
    errors.push({ file: 'deck.html', error: e.code || e.message });
  }
  try {
    var manifestRaw = fs.readFileSync(manifestPath, 'utf8');
    manifestObj = JSON.parse(manifestRaw);
  } catch (e) {
    errors.push({ file: 'manifest.json', error: e.code || e.message });
  }
  return { htmlText: htmlText, manifestObj: manifestObj, htmlPath: htmlPath, manifestPath: manifestPath, errors: errors };
}

// =====================================================================
// Concurrency-limited parallel runner
// =====================================================================

async function runWithConcurrency(items, concurrency, worker, onProgress) {
  var idx = 0;
  var inFlight = [];
  var results = new Array(items.length);
  var completed = 0;

  async function next() {
    while (idx < items.length) {
      var myIdx = idx++;
      try {
        results[myIdx] = await worker(items[myIdx], myIdx);
      } catch (e) {
        results[myIdx] = { error: e.message || String(e), idx: myIdx };
      }
      completed++;
      if (onProgress && completed % 200 === 0) onProgress(completed, items.length);
    }
  }

  for (var w = 0; w < concurrency; w++) {
    inFlight.push(next());
  }
  await Promise.all(inFlight);
  if (onProgress) onProgress(completed, items.length);
  return results;
}

// =====================================================================
// Aggregate summarization
// =====================================================================

function aggregateDefects(perDeckResults, locales) {
  var perLocale = {};
  locales.forEach(function (loc) {
    perLocale[loc] = {
      total: 0,
      passAll: 0,
      defectsByClass: {},
      defectsByApp: {},
      sampleFailures: {}
    };
  });
  perDeckResults.forEach(function (r) {
    if (!r || !r.language) return;
    var s = perLocale[r.language];
    if (!s) return;
    s.total += 1;
    if (r.passAll) s.passAll += 1;
    (r.defectClasses || []).forEach(function (dc) {
      s.defectsByClass[dc] = (s.defectsByClass[dc] || 0) + 1;
      s.defectsByApp[dc] = s.defectsByApp[dc] || {};
      var ax = r.exerciseType + (r.exerciseMode ? '/' + r.exerciseMode : '');
      s.defectsByApp[dc][ax] = (s.defectsByApp[dc][ax] || 0) + 1;
      // Capture a few example IDs per defect class
      s.sampleFailures[dc] = s.sampleFailures[dc] || [];
      if (s.sampleFailures[dc].length < 5) {
        s.sampleFailures[dc].push({ id: r.id, slug: r.slug, app: ax });
      }
    });
  });
  return perLocale;
}

function renderSummaryMd(perLocale, locales, runStamp, totalDecks) {
  var lines = [];
  lines.push('# SEO-100pct Phase 1 Per-Deck Audit — ' + runStamp);
  lines.push('');
  lines.push('Direct-FS read of `/var/www/lcs-media/decks/<locale>/<slug>/deck.html` + sibling `manifest.json`.');
  lines.push('Bypasses Cloudflare. ' + totalDecks + ' decks audited across `' + locales.join(', ') + '`.');
  lines.push('');
  lines.push('Run 10 checks per deck (§17.8.17 invariants 1–7 + §A.14.8 step 2b + step 4 + §A.10).');
  lines.push('');

  locales.forEach(function (loc) {
    var s = perLocale[loc] || {};
    lines.push('## ' + loc.toUpperCase() + ' — ' + (s.total || 0) + ' decks');
    lines.push('');
    var passRate = s.total ? ((s.passAll * 100) / s.total).toFixed(2) : '0';
    lines.push('All-pass: **' + (s.passAll || 0) + ' / ' + (s.total || 0) + '** (' + passRate + '%)');
    lines.push('');
    lines.push('### Defect classes');
    lines.push('');
    var classKeys = Object.keys(s.defectsByClass || {}).sort(function (a, b) { return s.defectsByClass[b] - s.defectsByClass[a]; });
    if (classKeys.length === 0) {
      lines.push('✅ Zero defects.');
    } else {
      lines.push('| Defect class | Decks |');
      lines.push('|---|---:|');
      classKeys.forEach(function (k) {
        lines.push('| ' + k + ' | ' + s.defectsByClass[k] + ' |');
      });
      lines.push('');
      lines.push('### Per-defect app breakdown');
      lines.push('');
      classKeys.forEach(function (k) {
        lines.push('**' + k + ':**');
        var apps = s.defectsByApp[k] || {};
        var appKeys = Object.keys(apps).sort(function (a, b) { return apps[b] - apps[a]; });
        appKeys.forEach(function (a) {
          lines.push('- `' + a + '` — ' + apps[a]);
        });
        lines.push('');
        var samples = s.sampleFailures[k] || [];
        if (samples.length) {
          lines.push('  Sample IDs:');
          samples.forEach(function (sf) {
            lines.push('  - `' + sf.id + '` (' + sf.slug + ', ' + sf.app + ')');
          });
          lines.push('');
        }
      });
    }
    lines.push('');
  });
  return lines.join('\n') + '\n';
}

// =====================================================================
// Main
// =====================================================================

async function main() {
  var args = parseArgs(process.argv);
  if (!fs.existsSync(args.outDir)) {
    fs.mkdirSync(args.outDir, { recursive: true });
  }

  // Load baseline (preferred) or query DB fresh.
  var baselineDecks = null;
  if (args.baseline) {
    console.log('[audit-deck-html] loading baseline: ' + args.baseline);
    var baselineRaw = JSON.parse(fs.readFileSync(args.baseline, 'utf8'));
    baselineDecks = baselineRaw.decks;
  } else {
    console.log('[audit-deck-html] no baseline supplied; querying DB');
    baselineDecks = await db.client().deck.findMany({
      where: { status: 'published', language: { in: args.locales } },
      select: {
        id: true, slug: true, exerciseType: true, exerciseMode: true,
        language: true, subjectTags: true, ageRange: true,
        titleHash: true, descriptionHash: true, contentFamilyId: true,
        version: true, status: true, publishedAt: true
      }
    });
    console.log('[audit-deck-html] DB fetch: ' + baselineDecks.length + ' rows');
  }

  // Filter to requested locales (baseline may carry others).
  var decks = baselineDecks.filter(function (d) { return args.locales.indexOf(d.language) !== -1; });

  // If sampling, take first N per locale.
  if (args.sample) {
    var sampled = [];
    args.locales.forEach(function (loc) {
      var locDecks = decks.filter(function (d) { return d.language === loc; }).slice(0, args.sample);
      sampled = sampled.concat(locDecks);
    });
    decks = sampled;
    console.log('[audit-deck-html] sampling ' + args.sample + ' per locale → ' + decks.length + ' total');
  }

  console.log('[audit-deck-html] auditing ' + decks.length + ' decks (concurrency=' + args.concurrency + ')');
  var t0 = Date.now();

  // Shared context for cross-deck collision tracking.
  var ctx = {
    titleHashSetByLocale: {},
    descriptionHashSetByLocale: {}
  };

  var fsErrorCount = 0;
  var perDeck = await runWithConcurrency(decks, args.concurrency, async function (dbDeck) {
    var fileBundle = readDeckFiles(args.decksRoot, dbDeck.language, dbDeck.slug);
    if (!fileBundle.htmlText) {
      fsErrorCount++;
      return {
        id: dbDeck.id,
        language: dbDeck.language,
        slug: dbDeck.slug,
        exerciseType: dbDeck.exerciseType,
        exerciseMode: dbDeck.exerciseMode,
        ageRange: dbDeck.ageRange,
        htmlPath: fileBundle.htmlPath,
        manifestPath: fileBundle.manifestPath,
        checks: {},
        defectClasses: ['DECK_HTML_UNREADABLE'],
        defectCount: 1,
        passAll: false,
        fsErrors: fileBundle.errors
      };
    }
    var perDeckCtx = { htmlPath: fileBundle.htmlPath, manifestPath: fileBundle.manifestPath };
    Object.assign(perDeckCtx, ctx);
    var row = await runChecksForDeck(dbDeck, fileBundle.htmlText, fileBundle.manifestObj, perDeckCtx);
    if (fileBundle.errors.length) {
      row.fsErrors = fileBundle.errors;
    }
    return row;
  }, function (done, total) {
    console.log('[audit-deck-html] progress ' + done + '/' + total);
  });

  console.log('[audit-deck-html] audit complete in ' + ((Date.now() - t0) / 1000).toFixed(1) + 's; FS errors: ' + fsErrorCount);

  var aggregated = aggregateDefects(perDeck, args.locales);

  var stamp = utcStamp();
  var jsonOut = path.join(args.outDir, 'seo-100pct-curl-' + stamp + '.json');
  var mdOut = path.join(args.outDir, 'seo-100pct-curl-' + stamp + '.md');

  fs.writeFileSync(jsonOut, JSON.stringify({
    runStamp: stamp,
    runAt: new Date().toISOString(),
    locales: args.locales,
    sample: args.sample,
    decksRoot: args.decksRoot,
    totalDecks: perDeck.length,
    aggregated: aggregated,
    decks: perDeck
  }, null, 2));
  console.log('[audit-deck-html] wrote JSON: ' + jsonOut);

  fs.writeFileSync(mdOut, renderSummaryMd(aggregated, args.locales, stamp, perDeck.length));
  console.log('[audit-deck-html] wrote summary: ' + mdOut);

  // Print quick summary.
  console.log('');
  console.log('--- summary ---');
  args.locales.forEach(function (loc) {
    var s = aggregated[loc] || {};
    var defectsByClass = s.defectsByClass || {};
    var keys = Object.keys(defectsByClass).sort(function (a, b) { return defectsByClass[b] - defectsByClass[a]; });
    console.log('  ' + loc + ': ' + (s.passAll || 0) + '/' + (s.total || 0) + ' clean');
    keys.slice(0, 5).forEach(function (k) {
      console.log('    - ' + k + ': ' + defectsByClass[k]);
    });
  });

  await db.disconnect();
}

main().catch(function (err) {
  console.error('[audit-deck-html] FATAL:', err && err.stack || err);
  process.exit(1);
});
