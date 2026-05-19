#!/usr/bin/env node
/**
 * One-shot salvage: reassign unique variant_id to shadow-match-make-whole pt
 * ZIPs whose generator emitted a constant variant_id=5d83 across the entire
 * wave. With 2 decks per theme, the (typeName, modeName, themeName, level,
 * variantId) tuple collides → titleHash collision → INSERT rejected at
 * §17.8.17 invariant 1 gate.
 *
 * Strategy: derive new variant_id = sha1(deck_id).slice(0,4) — deterministic
 * + unique per deck_id (each deck_id has a unique timestamp). Mirrors
 * disambiguate-titles-finalize.js (§A.13.17 μ-close) approach.
 *
 * Pipeline per ZIP (only failed-class ZIPs by deck_id, passed as --deck-ids):
 *   1. Open ZIP, read manifest.json + deck.html
 *   2. OLD = manifest.variant_id (e.g., "5d83")
 *   3. NEW = sha1(manifest.deck_id).slice(0,4)
 *   4. Skip if OLD === NEW (defensive)
 *   5. Patch manifest.variant_id = NEW
 *   6. Substitute OLD → NEW in deck.html:
 *        - "Set OLD" → "Set NEW" (title + description)
 *        - canonical URL slug component
 *        - JSON-LD url
 *        - og:url / twitter:url
 *        - og:title / twitter:title (if they contain "Set OLD")
 *   7. Write ZIP atomically (in-place; backup at <dir>.smm-variant-original/)
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-shadow-match-make-whole-pt-variant.js \
 *     <directory> --failed-list <failures-dir> [--dry-run]
 *
 *   --failed-list  Path to dir of <deck_id>.zip.stderr files (publish-bulk
 *                  _failures/ output). Script extracts deck_ids and only
 *                  patches those ZIPs.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

function parseArgs(argv) {
  var args = { dir: null, failedList: null, dryRun: false };
  for (var i = 2; i < argv.length; i++) {
    var a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--failed-list') args.failedList = argv[++i];
    else if (!args.dir) args.dir = a;
  }
  return args;
}

function deriveVariantId(deckId) {
  return crypto.createHash('sha1').update(deckId, 'utf8').digest('hex').slice(0, 4);
}

function patchDeckHtml(deckHtml, oldId, newId) {
  var escapedOld = oldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Patterns to substitute:
  //   "Set 5d83" → "Set <new>"  (title + description + og + twitter)
  //   "-5d83/"   → "-<new>/"    (canonical URL slug + JSON-LD url + og:url + twitter:url)
  //   "-5d83\""  → "-<new>\""   (trailing-slash absent variants — defensive)
  var subs = [
    [new RegExp('Set ' + escapedOld, 'g'), 'Set ' + newId],
    [new RegExp('-' + escapedOld + '/', 'g'), '-' + newId + '/'],
    [new RegExp('-' + escapedOld + '"', 'g'), '-' + newId + '"'],
    [new RegExp('-' + escapedOld + '<', 'g'), '-' + newId + '<']
  ];
  var out = deckHtml;
  var changed = false;
  subs.forEach(function (pair) {
    if (pair[0].test(out)) {
      out = out.replace(pair[0], pair[1]);
      changed = true;
    }
  });
  return changed ? out : null;
}

function loadFailedDeckIds(failedListDir) {
  if (!failedListDir || !fs.existsSync(failedListDir)) {
    console.error('Failed-list dir missing:', failedListDir);
    process.exit(2);
  }
  var entries = fs.readdirSync(failedListDir);
  var deckIds = entries
    .filter(function (n) { return n.endsWith('.zip.stderr'); })
    .map(function (n) { return n.replace(/\.zip\.stderr$/, ''); });
  return new Set(deckIds);
}

function main() {
  var args = parseArgs(process.argv);
  if (!args.dir) {
    console.error('Usage: ... <directory> --failed-list <dir> [--dry-run]');
    process.exit(2);
  }
  if (!args.failedList) {
    console.error('Missing --failed-list <dir>');
    process.exit(2);
  }

  var failed = loadFailedDeckIds(args.failedList);
  console.log('[failed-list] Loaded ' + failed.size + ' deck_ids');

  var dir = path.resolve(args.dir);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.error('Not a directory:', dir);
    process.exit(2);
  }

  var entries = fs.readdirSync(dir).filter(function (n) {
    return n.toLowerCase().endsWith('.zip') && !n.startsWith('.');
  });

  var stats = { scanned: 0, candidate: 0, rewritten: 0, skipNotFailed: 0, skipClean: 0, errored: 0 };

  if (!args.dryRun) {
    var backupDir = dir + '.smm-variant-original';
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log('[backup] Created', backupDir);
    }
  }

  entries.forEach(function (name) {
    var deckIdFromFilename = name.replace(/\.zip$/, '');
    stats.scanned++;

    if (!failed.has(deckIdFromFilename)) {
      stats.skipNotFailed++;
      return;
    }

    var zipPath = path.join(dir, name);
    try {
      var zip = new AdmZip(zipPath);
      var manifestEntry = zip.getEntry('manifest.json');
      if (!manifestEntry) {
        stats.errored++;
        console.error('[err]', name, 'missing manifest.json');
        return;
      }
      var manifest = JSON.parse(zip.readAsText(manifestEntry));
      stats.candidate++;

      var oldVariant = manifest.variant_id;
      var deckId = manifest.deck_id;
      if (!oldVariant || !deckId) {
        console.error('[err]', name, 'missing variant_id or deck_id');
        stats.errored++;
        return;
      }

      var newVariant = deriveVariantId(deckId);
      if (newVariant === oldVariant) {
        stats.skipClean++;
        return;
      }

      var deckEntry = zip.getEntry('deck.html');
      if (!deckEntry) {
        stats.errored++;
        console.error('[err]', name, 'missing deck.html');
        return;
      }
      var originalHtml = zip.readAsText(deckEntry);
      var patchedHtml = patchDeckHtml(originalHtml, oldVariant, newVariant);
      if (patchedHtml === null) {
        console.warn('[warn]', name, 'no Set ' + oldVariant + ' pattern in deck.html');
      }

      if (args.dryRun) {
        stats.rewritten++;
        console.log('[would-rewrite]', name, oldVariant, '→', newVariant);
        return;
      }

      // backup
      fs.copyFileSync(zipPath, path.join(dir + '.smm-variant-original', name));

      manifest.variant_id = newVariant;
      zip.updateFile(manifestEntry, Buffer.from(JSON.stringify(manifest, null, 2), 'utf8'));
      if (patchedHtml !== null) {
        zip.updateFile(deckEntry, Buffer.from(patchedHtml, 'utf8'));
      }

      var tmpPath = zipPath + '.tmp';
      zip.writeZip(tmpPath);
      fs.renameSync(tmpPath, zipPath);
      stats.rewritten++;
      console.log('[rewrite]', name, oldVariant, '→', newVariant);
    } catch (e) {
      stats.errored++;
      console.error('[err]', name, e.message);
    }
  });

  console.log('');
  console.log('Stats:');
  Object.keys(stats).forEach(function (k) {
    console.log('  ' + k + ':', stats[k]);
  });

  if (stats.errored > 0) process.exit(1);
}

main();
