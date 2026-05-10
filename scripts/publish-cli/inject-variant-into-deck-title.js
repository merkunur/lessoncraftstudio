#!/usr/bin/env node
/**
 * In-ZIP deck.html title retrofitter: injects "— Set <variant_id>" into
 * <title>, <meta name="description">, Schema.org JSON-LD name + description
 * so each deck's title/desc hash is unique per Deck @@unique([language,
 * titleHash]) + @@unique([language, descriptionHash]) constraints.
 *
 * Companion to add-variant-ids.js (§11 active doctrine). add-variant-ids.js
 * assigns ordinal variant_ids in manifests; THIS script bakes those IDs into
 * the deck.html SEO surfaces so §17.8.17 invariants 1+2 don't halt publish.
 *
 * Origin: 2026-05-10 wave 4-app rescue. After rescue + add-variant-ids,
 * 143/335 ZIPs (find-objects 94 + picture-trail 49) failed publish on
 * TITLE_NON_UNIQUE / DESC_NON_UNIQUE because the apps' deck.html title was
 * baked at emit-time without variant_id (only treasure-hunt's app emits
 * "Set <id>" natively).
 *
 * Usage:
 *   node scripts/publish-cli/inject-variant-into-deck-title.js <directory> [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

var BRAND_SUFFIX = ' | LessonCraftStudio';
var SET_MARKER = ' — Set ';

// Existing-set-marker pattern: " — Set <token>" where <token> is non-whitespace.
// Used to REPLACE stuck native variant_ids (e.g., "Set 98be") with the
// canonical ordinal assigned by add-variant-ids.js.
var EXISTING_SET_RE = / — Set [^\s|.]+/;

function injectIntoTitle(html, variantId) {
  var marker = SET_MARKER + variantId;

  // 1. <title>...</title>
  html = html.replace(/<title>([^<]+)<\/title>/, function (_, inner) {
    var newInner;
    if (EXISTING_SET_RE.test(inner)) {
      // Replace existing "— Set <stuck>" with our canonical ordinal.
      newInner = inner.replace(EXISTING_SET_RE, marker);
    } else {
      var brandIdx = inner.lastIndexOf(BRAND_SUFFIX);
      if (brandIdx !== -1) {
        newInner = inner.slice(0, brandIdx) + marker + inner.slice(brandIdx);
      } else {
        newInner = inner + marker;
      }
    }
    return '<title>' + newInner + '</title>';
  });

  // 2. <meta name="description" content="...">
  html = html.replace(/<meta\s+name="description"\s+content="([^"]+)"\s*\/?>/, function (full, inner) {
    var newInner;
    if (EXISTING_SET_RE.test(inner)) {
      newInner = inner.replace(EXISTING_SET_RE, marker);
    } else {
      var printIdx = inner.lastIndexOf(' Print or play online');
      if (printIdx !== -1) {
        newInner = inner.slice(0, printIdx) + marker + '.' + inner.slice(printIdx);
      } else {
        newInner = inner.replace(/\.\s*$/, '') + marker + '.';
      }
    }
    return full.replace(inner, newInner);
  });

  // 3. Schema.org JSON-LD name + description (mirrors title + meta desc)
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, function (full, jsonStr) {
    try {
      var ld = JSON.parse(jsonStr);
      var changed = false;
      if (ld.name) {
        if (EXISTING_SET_RE.test(ld.name)) {
          ld.name = ld.name.replace(EXISTING_SET_RE, marker);
          changed = true;
        } else if (ld.name.indexOf(SET_MARKER) === -1) {
          var brandIdx = ld.name.lastIndexOf(BRAND_SUFFIX);
          if (brandIdx !== -1) {
            ld.name = ld.name.slice(0, brandIdx) + marker + ld.name.slice(brandIdx);
          } else {
            ld.name = ld.name + marker;
          }
          changed = true;
        }
      }
      if (ld.description) {
        if (EXISTING_SET_RE.test(ld.description)) {
          ld.description = ld.description.replace(EXISTING_SET_RE, marker);
          changed = true;
        } else if (ld.description.indexOf(SET_MARKER) === -1) {
          var printIdx = ld.description.lastIndexOf(' Print or play online');
          if (printIdx !== -1) {
            ld.description = ld.description.slice(0, printIdx) + marker + '.' + ld.description.slice(printIdx);
          } else {
            ld.description = ld.description.replace(/\.\s*$/, '') + marker + '.';
          }
          changed = true;
        }
      }
      if (!changed) return full;
      return '<script type="application/ld+json">' + JSON.stringify(ld) + '</script>';
    } catch (e) {
      return full;
    }
  });

  return html;
}

function processZip(zipPath, dryRun) {
  var zip = new AdmZip(zipPath);
  var manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) return { file: path.basename(zipPath), action: 'skip-no-manifest' };
  var manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  var variantId = manifest.variant_id;
  if (variantId == null || String(variantId).trim() === '') {
    return { file: path.basename(zipPath), action: 'skip-no-variant-id' };
  }
  var deckEntry = zip.getEntry('deck.html');
  if (!deckEntry) return { file: path.basename(zipPath), action: 'skip-no-deck-html' };

  var html = deckEntry.getData().toString('utf8');
  var newHtml = injectIntoTitle(html, String(variantId));
  if (newHtml === html) {
    return { file: path.basename(zipPath), action: 'skip-already-set', variantId: variantId };
  }
  if (dryRun) {
    return { file: path.basename(zipPath), action: 'would-rewrite', variantId: variantId };
  }

  var newBuf = Buffer.from(newHtml, 'utf8');
  if (typeof zip.updateFile === 'function') {
    zip.updateFile(deckEntry, newBuf);
  } else {
    zip.deleteFile('deck.html');
    zip.addFile('deck.html', newBuf);
  }
  var tmpPath = zipPath + '.tmp';
  zip.writeZip(tmpPath);
  fs.renameSync(tmpPath, zipPath);
  return { file: path.basename(zipPath), action: 'rewritten', variantId: variantId };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var workingDir = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (workingDir == null) { workingDir = args[i]; continue; }
  }
  if (!workingDir) {
    console.error('USAGE: node scripts/publish-cli/inject-variant-into-deck-title.js <directory> [--dry-run]');
    process.exit(2);
  }
  workingDir = path.resolve(workingDir);
  var files = fs.readdirSync(workingDir).filter(function (f) { return f.toLowerCase().endsWith('.zip'); }).sort();
  console.log('inject-variant-into-deck-title.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  working dir: ' + workingDir);
  console.log('  zip count:   ' + files.length);
  console.log('');

  var results = files.map(function (f) {
    return processZip(path.join(workingDir, f), dryRun);
  });

  var counts = {};
  results.forEach(function (r) { counts[r.action] = (counts[r.action] || 0) + 1; });
  console.log('=== Summary ===');
  Object.keys(counts).sort().forEach(function (k) {
    console.log('  ' + k + ': ' + counts[k]);
  });
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = { injectIntoTitle: injectIntoTitle, processZip: processZip };
