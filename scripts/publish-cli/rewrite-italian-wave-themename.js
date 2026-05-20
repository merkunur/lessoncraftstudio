#!/usr/bin/env node
/**
 * One-shot salvage for the Italian math-cluster wave 2026-05-19.
 *
 * Defect class: 196 of 1033 ZIPs across 6 apps were generated on an operator
 * PC running pre-`41da4ce2` versions of code-addition.html + more-less.html.
 * The dual-themeSelect anti-pattern §A.13.5 + Shape A defect surfaced at the
 * `seoMeta.themeName` emit-site even though `dbeb1058` had closed it at
 * `buildCatalogManifestSettings`. Result: manifest.theme is correct (e.g.,
 * `ocean_life`) but every SEO surface inside deck.html — title, meta
 * description, JSON-LD, og:* / twitter:*, DECK_BUNDLE.seoMeta.themeName,
 * manifest.seo_trace.title.themeName.value — has a WRONG localized theme
 * name (e.g., "4 luglio" instead of "Vita oceanica") that the operator's
 * stagnant dictionary filter element happened to hold.
 *
 * Distinct from `rewrite-deck-html-theme-name-pt.js`:
 *  - pt salvage replaced raw `snake_case` axis-key residue in already-deployed
 *    deck.html files at `/var/www/lcs-media/decks/pt/<slug>/deck.html`. Source
 *    of correct value: taxonomy.axes.theme.<axisKey>.name.pt.
 *  - this it salvage operates on pre-publish ZIPs at `decks/Italian/<app>/*.zip`
 *    (local PC). Source of correct value: taxonomy.axes.theme.<manifest.theme>.name.it.
 *    Replaces a WRONG localized name (e.g., "4 luglio") with the CORRECT
 *    localized name (e.g., "Vita oceanica") — both are already it-localized
 *    strings; only the choice of theme is wrong.
 *
 * Repairs BOTH:
 *   - deck.html  (7 occurrences per defective deck: 4 inside SEO_INSERTION_POINT
 *                 marker region; 3 outside in DECK_BUNDLE.seoMeta + DECK_BUNDLE.seoTrace)
 *   - manifest.json  (seo_trace.title.themeName.value + seo_trace.description.themeName.value)
 *
 * Per §15.17 salvage-script pattern:
 *   1. Phase 1 classification (pure; no FS writes; pre-pass)
 *   2. Halt-class detection (gate before any side-effect)
 *   3. Backup-then-rewrite (per-zip atomicity via .tmp + rename)
 *   4. Verification gate-rerun post-apply
 *
 * Idempotent: re-running on already-clean ZIPs surfaces as skip-clean.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-italian-wave-themename.js --root="path/to/decks/Italian" --dry-run
 *   node scripts/publish-cli/rewrite-italian-wave-themename.js --root="path/to/decks/Italian" --confirm
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));
var topicsTaxonomy = require(path.resolve(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json'));

var LOCALE = 'it';

// ============================================================
// Taxonomy lookup
// ============================================================

function correctItNameFromTheme(themeKey) {
  if (!themeKey) return null;
  var node = topicsTaxonomy.axes && topicsTaxonomy.axes.theme && topicsTaxonomy.axes.theme[themeKey];
  if (!node || !node.name) return null;
  return node.name[LOCALE] || null;
}

// ============================================================
// IT SEO word lexicon — values sourced from translations-shared.js
// (REFERENCE TRANSLATIONS/translations-shared.js, "it" block lines 329-332).
// Fallback English baked when per-app _ct() helper found neither
// CODE_ADDITION_TRANSLATIONS.it.<key> nor translations.it.<key> (translations
// global was undefined — translations-code-addition.js line 2234 referenced
// undeclared `translations`; fixed at commit follow-on to 41da4ce2).
// ============================================================

var IT_SEO_WORDS = [
  { field: 'worksheetWord',   en: 'Worksheet',             it: 'Scheda',                      seoTraceKey: 'worksheetWord',  fallbackSource: 'fallback.en.worksheet',             cleanSource: 'shared-translations.it.worksheet' },
  { field: 'freeInteractive', en: 'Free interactive',      it: 'Scheda interattiva gratuita', seoTraceKey: 'freeInteractive',fallbackSource: 'fallback.en.seoFreeInteractive',    cleanSource: 'shared-translations.it.seoFreeInteractive' },
  { field: 'forWord',         en: 'for',                   it: 'per',                         seoTraceKey: 'forWord',        fallbackSource: 'fallback.en.seoFor',                cleanSource: 'shared-translations.it.seoFor' },
  { field: 'printOrPlay',     en: 'Print or play online',  it: 'Stampa o gioca online',       seoTraceKey: 'printOrPlay',    fallbackSource: 'fallback.en.seoPrintOrPlayOnline',  cleanSource: 'shared-translations.it.seoPrintOrPlayOnline' }
];

// ============================================================
// ZIP discovery
// ============================================================

function walkZips(rootDir) {
  if (!fs.existsSync(rootDir)) return [];
  var appDirs = fs.readdirSync(rootDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    var p = path.join(rootDir, n);
    var st;
    try { st = fs.lstatSync(p); } catch (e) { return false; }
    return st.isDirectory();
  });
  var zips = [];
  appDirs.forEach(function (app) {
    var appDir = path.join(rootDir, app);
    var entries = fs.readdirSync(appDir).filter(function (n) { return /\.zip$/i.test(n); });
    entries.forEach(function (z) {
      zips.push({ zipPath: path.join(appDir, z), app: app, basename: z });
    });
  });
  return zips;
}

// ============================================================
// Per-ZIP classification
// ============================================================

function classifyZip(entry) {
  var zip, manifest, htmlBuf;
  try {
    zip = new AdmZip(entry.zipPath);
  } catch (e) {
    return Object.assign({}, entry, { classification: 'halt-zip-open-failed', reason: e.message });
  }
  var manifestEntry = zip.getEntry('manifest.json');
  var deckEntry = zip.getEntry('deck.html');
  if (!manifestEntry) return Object.assign({}, entry, { classification: 'halt-missing-manifest' });
  if (!deckEntry) return Object.assign({}, entry, { classification: 'halt-missing-deck-html' });
  try {
    manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  } catch (e) {
    return Object.assign({}, entry, { classification: 'halt-manifest-parse-failed', reason: e.message });
  }
  htmlBuf = deckEntry.getData().toString('utf8');

  var themeKey = manifest.theme;
  if (!themeKey) {
    // Themeless deck — no theme to reconcile. Skip-clean.
    return Object.assign({}, entry, { classification: 'skip-clean-themeless', manifest: manifest, html: htmlBuf, zip: zip });
  }

  var correctIt = correctItNameFromTheme(themeKey);
  if (!correctIt) {
    return Object.assign({}, entry, {
      classification: 'halt-taxonomy-name-it-missing',
      reason: 'theme=' + themeKey + ' has no axes.theme.' + themeKey + '.name.it'
    });
  }

  // Extract baked themeName from deck.html (first match in seoMeta JSON block)
  var bakedMatch = /"themeName"\s*:\s*"([^"]+)"/.exec(htmlBuf);
  if (!bakedMatch) {
    return Object.assign({}, entry, {
      classification: 'halt-baked-themename-missing',
      reason: 'no "themeName":"..." regex match in deck.html'
    });
  }
  var currentBaked = bakedMatch[1];

  // Sanity-check: scan for OTHER "themeName" occurrences. They should all be
  // identical to currentBaked (3 in deck.html: DECK_BUNDLE.seoMeta + seoTrace.title +
  // seoTrace.description; plus JSON-LD name from SEO marker region). If we find
  // an inconsistent value, that's a halt-class.
  var allBaked = htmlBuf.match(/"themeName"\s*:\s*"([^"]+)"/g) || [];
  var bakedValues = allBaked.map(function (m) { return /:\s*"([^"]+)"/.exec(m)[1]; });
  var inconsistent = bakedValues.filter(function (v) { return v !== currentBaked; });
  if (inconsistent.length) {
    return Object.assign({}, entry, {
      classification: 'halt-inconsistent-baked-themename',
      reason: 'multiple distinct themeName values: ' + JSON.stringify(Array.from(new Set(bakedValues)))
    });
  }

  // Detect English SEO word residue (separate defect class — IT decks where _ct()
  // fell through to enFallback because window.translations was undefined).
  // Inspect manifest.seo_trace for any of the 4 SEO words flagged isLocalized=false.
  var hasSeoWordResidue = false;
  if (manifest.seo_trace) {
    ['title', 'description'].forEach(function (segment) {
      var node = manifest.seo_trace[segment];
      if (!node) return;
      IT_SEO_WORDS.forEach(function (w) {
        var field = node[w.seoTraceKey];
        if (field && field.value === w.en && field.isLocalized === false) {
          hasSeoWordResidue = true;
        }
      });
    });
  }

  var themeClean = (currentBaked === correctIt);
  if (themeClean && !hasSeoWordResidue) {
    return Object.assign({}, entry, { classification: 'skip-clean', manifest: manifest, html: htmlBuf, zip: zip, themeKey: themeKey });
  }

  return Object.assign({}, entry, {
    classification: 'rewrite',
    manifest: manifest,
    html: htmlBuf,
    zip: zip,
    themeKey: themeKey,
    currentBaked: currentBaked,
    correctIt: correctIt,
    rewriteTheme: !themeClean,
    rewriteSeoWords: hasSeoWordResidue
  });
}

// ============================================================
// Bounded-anchor replacement on deck.html (mirrors pt salvage line 137-160)
// ============================================================

function countOccurrences(s, needle) {
  if (!needle) return 0;
  var c = 0, idx = 0;
  while ((idx = s.indexOf(needle, idx)) !== -1) { c++; idx += needle.length; }
  return c;
}

function patchHtml(html, currentBaked, correctIt, alsoSeoWords) {
  var pairs = [];

  // Theme-name pass — skip when themeClean (currentBaked === correctIt)
  if (currentBaked && correctIt && currentBaked !== correctIt) {
    pairs.push(
      // Title segment + JSON-LD name + og:title + twitter:title bound by em-dashes
      { from: ' — ' + currentBaked + ' — ',           to: ' — ' + correctIt + ' — ' },
      // Meta description + JSON-LD description parenthetical
      { from: '(' + currentBaked + ')',               to: '(' + correctIt + ')' },
      // seoMeta JSON in DECK_BUNDLE + seoTrace fields
      { from: '"themeName":"' + currentBaked + '"',   to: '"themeName":"' + correctIt + '"' },
      // seoTrace.themeName.value (embedded inside larger object)
      { from: '"value":"' + currentBaked + '","source":"metadata.theme"',  to: '"value":"' + correctIt + '","source":"metadata.theme"' },
      // og:image alt attribute defensive — content="<themeName>"
      { from: 'content="' + currentBaked + '"',       to: 'content="' + correctIt + '"' }
    );
  }

  // SEO words pass — replace 4 English SEO words with Italian
  if (alsoSeoWords) {
    IT_SEO_WORDS.forEach(function (w) {
      pairs.push(
        // seoMeta JSON in DECK_BUNDLE: "worksheetWord":"Worksheet" → "worksheetWord":"Scheda"
        { from: '"' + w.field + '":"' + w.en + '"',   to: '"' + w.field + '":"' + w.it + '"' },
        // seoTrace value+source+isLocalized triplet
        { from: '"value":"' + w.en + '","source":"' + w.fallbackSource + '","isLocalized":false',
          to:   '"value":"' + w.it + '","source":"' + w.cleanSource + '","isLocalized":true' }
      );
    });

    // Bounded contextual replacements in title + meta description + JSON-LD
    // Note: "Worksheet" appears in title as `<typeName> Worksheet — ` so bound by space + em-dash.
    // "Free interactive" appears at start of meta description after `content="`.
    // "for" appears in meta description between level placeholder + instruction.
    // "Print or play online" appears in meta description before `(Set <variant>)`.
    pairs.push(
      // Title pattern: `Codice Segreto Addizione Worksheet — `
      { from: ' Worksheet — ',                        to: ' Scheda — ' },
      // Meta description start: `Free interactive Codice Segreto Addizione Worksheet`
      { from: '"Free interactive ',                   to: '"Scheda interattiva gratuita ' },
      { from: 'description":"Free interactive ',      to: 'description":"Scheda interattiva gratuita ' },
      // After Worksheet (or its replacement) — `Worksheet (4 luglio)` context already replaced; defensive: ` Worksheet (` → ` Scheda (`
      { from: ' Worksheet (',                         to: ' Scheda (' },
      // ` for __EDUCATIONAL_LEVEL_LOCALIZED__` pattern
      { from: ') for __EDUCATIONAL_LEVEL_LOCALIZED__', to: ') per __EDUCATIONAL_LEVEL_LOCALIZED__' },
      // `Print or play online (Set xxxx)` — anchored by space + parenthesis only
      // (instruction-end punctuation varies: `.`, `!`, `?`, etc., so we can't
      // bound on the preceding punctuation).
      { from: ' Print or play online (',             to: ' Stampa o gioca online (' }
    );
  }

  var beforeCounts = pairs.map(function (p) { return countOccurrences(html, p.from); });
  var newHtml = html;
  pairs.forEach(function (p) { newHtml = newHtml.split(p.from).join(p.to); });

  // Verify residue: count from-needles in patched html (must all be 0)
  var residue = pairs.map(function (p) { return countOccurrences(newHtml, p.from); });

  return {
    html: newHtml,
    before: beforeCounts,
    afterResidue: residue,
    totalSubstitutions: beforeCounts.reduce(function (a, b) { return a + b; }, 0)
  };
}

// ============================================================
// Manifest seo_trace patch
// ============================================================

function patchManifest(manifest, currentBaked, correctIt, alsoSeoWords) {
  var changed = false;
  var trace = manifest.seo_trace;
  if (!trace) return { manifest: manifest, changed: false };

  function maybeFixTheme(node) {
    if (node && typeof node === 'object' && node.themeName && typeof node.themeName === 'object') {
      if (currentBaked && correctIt && node.themeName.value === currentBaked && currentBaked !== correctIt) {
        node.themeName.value = correctIt;
        changed = true;
      }
    }
  }
  function maybeFixSeoWords(node) {
    if (!node || typeof node !== 'object') return;
    IT_SEO_WORDS.forEach(function (w) {
      var field = node[w.seoTraceKey];
      if (field && field.value === w.en && field.isLocalized === false) {
        field.value = w.it;
        field.source = w.cleanSource;
        field.isLocalized = true;
        changed = true;
      }
    });
  }
  if (trace.title) {
    maybeFixTheme(trace.title);
    if (alsoSeoWords) maybeFixSeoWords(trace.title);
  }
  if (trace.description) {
    maybeFixTheme(trace.description);
    if (alsoSeoWords) maybeFixSeoWords(trace.description);
  }
  return { manifest: manifest, changed: changed };
}

// ============================================================
// Atomic ZIP repack with backup
// ============================================================

function rewriteZip(c, opts) {
  var patched = patchHtml(c.html, c.currentBaked, c.correctIt, c.rewriteSeoWords);
  if (patched.totalSubstitutions === 0) {
    return { ok: false, reason: 'no occurrences found post-classify (unexpected)', zipPath: c.zipPath };
  }
  if (patched.afterResidue.some(function (n) { return n > 0; })) {
    return { ok: false, reason: 'post-patch residue: ' + JSON.stringify(patched.afterResidue), zipPath: c.zipPath };
  }

  // Patch manifest seo_trace
  var manifestPatch = patchManifest(c.manifest, c.currentBaked, c.correctIt, c.rewriteSeoWords);

  // Backup original ZIP before any write
  if (opts.backupRoot) {
    var relativeApp = c.app;  // already the app folder name
    var backupAppDir = path.join(opts.backupRoot, relativeApp);
    if (!fs.existsSync(backupAppDir)) fs.mkdirSync(backupAppDir, { recursive: true });
    var backupZipPath = path.join(backupAppDir, c.basename);
    if (!fs.existsSync(backupZipPath)) {
      fs.copyFileSync(c.zipPath, backupZipPath);
    }
  }

  // Update entries inside adm-zip in-memory
  var newHtmlBuf = Buffer.from(patched.html, 'utf8');
  var newManifestBuf = Buffer.from(JSON.stringify(manifestPatch.manifest, null, 2), 'utf8');
  var deckEntry = c.zip.getEntry('deck.html');
  var manifestEntry = c.zip.getEntry('manifest.json');
  if (typeof c.zip.updateFile === 'function') {
    c.zip.updateFile(deckEntry, newHtmlBuf);
    c.zip.updateFile(manifestEntry, newManifestBuf);
  } else {
    c.zip.deleteFile('deck.html');
    c.zip.addFile('deck.html', newHtmlBuf);
    c.zip.deleteFile('manifest.json');
    c.zip.addFile('manifest.json', newManifestBuf);
  }

  // Atomic write: .tmp then rename
  var tmpPath = c.zipPath + '.tmp';
  c.zip.writeZip(tmpPath);
  fs.renameSync(tmpPath, c.zipPath);

  return {
    ok: true,
    zipPath: c.zipPath,
    themeKey: c.themeKey,
    currentBaked: c.currentBaked,
    correctIt: c.correctIt,
    substitutions: patched.totalSubstitutions,
    manifestChanged: manifestPatch.changed
  };
}

// ============================================================
// CLI
// ============================================================

function parseArgs(argv) {
  var opts = { root: null, dryRun: false, confirm: false, backupRoot: null };
  for (var i = 2; i < argv.length; i++) {
    var a = argv[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--confirm') opts.confirm = true;
    else if (a === '--root') opts.root = argv[++i];
    else if (a.indexOf('--root=') === 0) opts.root = a.slice('--root='.length);
    else if (a === '--backup-root') opts.backupRoot = argv[++i];
    else {
      console.error('Unknown arg: ' + a);
      process.exit(2);
    }
  }
  return opts;
}

function main() {
  var opts = parseArgs(process.argv);
  if (!opts.root) {
    console.error('ERROR: --root <path> required');
    process.exit(2);
  }
  if (!opts.dryRun && !opts.confirm) {
    console.error('ERROR: must pass --dry-run or --confirm');
    process.exit(2);
  }
  if (opts.dryRun && opts.confirm) {
    console.error('ERROR: --dry-run and --confirm are mutually exclusive');
    process.exit(2);
  }

  if (opts.confirm && !opts.backupRoot) {
    var utc = new Date().toISOString().replace(/[:.]/g, '').replace(/T/, '-').slice(0, 15);
    opts.backupRoot = path.join(opts.root, '.original-themename-' + utc);
  }

  var zips = walkZips(opts.root);
  console.log('[rewrite-italian-wave-themename] scanned: ' + zips.length + ' ZIPs in ' + opts.root);

  var classifications = zips.map(classifyZip);

  var byClass = {};
  classifications.forEach(function (c) {
    byClass[c.classification] = (byClass[c.classification] || 0) + 1;
  });
  Object.keys(byClass).sort().forEach(function (k) {
    console.log('  ' + k + ': ' + byClass[k]);
  });

  var halts = classifications.filter(function (c) { return c.classification.indexOf('halt-') === 0; });
  if (halts.length) {
    console.error('[rewrite-italian-wave-themename] HALT — ' + halts.length + ' halt-class entries:');
    halts.slice(0, 10).forEach(function (h) {
      console.error('  ' + h.app + '/' + h.basename + ': ' + h.classification +
        (h.reason ? ' — ' + h.reason : ''));
    });
    process.exit(4);
  }

  var rewrites = classifications.filter(function (c) { return c.classification === 'rewrite'; });
  console.log('[rewrite-italian-wave-themename] rewrite-class: ' + rewrites.length);

  // Per (app, currentBaked → correctIt) breakdown
  var transitionTally = {};
  rewrites.forEach(function (c) {
    var key = c.app + ' | "' + c.currentBaked + '" → "' + c.correctIt + '"';
    transitionTally[key] = (transitionTally[key] || 0) + 1;
  });
  console.log('[rewrite-italian-wave-themename] transition tally (top 20):');
  Object.keys(transitionTally).sort(function (a, b) { return transitionTally[b] - transitionTally[a]; }).slice(0, 20).forEach(function (k) {
    console.log('  ' + transitionTally[k] + '  ' + k);
  });

  if (opts.dryRun) {
    if (rewrites.length > 0) {
      console.log('[rewrite-italian-wave-themename] DRY-RUN — sample rewrite preview:');
      var sample = rewrites[0];
      console.log('  zip:          ' + sample.zipPath);
      console.log('  themeKey:     ' + sample.themeKey);
      console.log('  currentBaked: "' + sample.currentBaked + '"');
      console.log('  correctIt:    "' + sample.correctIt + '"');
      console.log('  rewriteTheme: ' + sample.rewriteTheme + ', rewriteSeoWords: ' + sample.rewriteSeoWords);
      var patched = patchHtml(sample.html, sample.currentBaked, sample.correctIt, sample.rewriteSeoWords);
      console.log('  substitutions: ' + patched.totalSubstitutions);
      console.log('  per-anchor counts: ' + JSON.stringify(patched.before));
      var newTitleMatch = /<title>([^<]+)<\/title>/i.exec(patched.html);
      if (newTitleMatch) console.log('  new title:    ' + newTitleMatch[1]);
      var newMetaMatch = /<meta\s+name="description"\s+content="([^"]+)"/i.exec(patched.html);
      if (newMetaMatch) console.log('  new meta:     ' + newMetaMatch[1].slice(0, 180));
    }
    console.log('[rewrite-italian-wave-themename] no FS writes (dry-run)');
    return;
  }

  // Real run
  console.log('[rewrite-italian-wave-themename] backup root: ' + opts.backupRoot);
  if (!fs.existsSync(opts.backupRoot)) fs.mkdirSync(opts.backupRoot, { recursive: true });

  var results = { ok: 0, failed: 0, failures: [] };
  rewrites.forEach(function (c, idx) {
    if ((idx + 1) % 20 === 0 || idx === 0) {
      console.log('[rewrite-italian-wave-themename] (' + (idx + 1) + '/' + rewrites.length + ') ' + c.app + '/' + c.basename);
    }
    var r = rewriteZip(c, opts);
    if (r.ok) results.ok++;
    else { results.failed++; results.failures.push(r); }
  });

  console.log('[rewrite-italian-wave-themename] DONE — ok=' + results.ok + ' failed=' + results.failed);
  if (results.failures.length) {
    results.failures.forEach(function (f) { console.error('  FAIL ' + f.zipPath + ': ' + f.reason); });
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
