#!/usr/bin/env node
/**
 * scaffold-i18n-keys — operator helper.
 *
 * Detects which locales in frontend/messages/ are missing the Brief B
 * Phase 2 keys (per i18n.REQUIRED_KEYS) and inserts placeholder English
 * text under each missing path. Operator then translates inline.
 *
 * Usage:
 *   node scripts/publish-cli/scaffold-i18n-keys.js                  # dry-run; shows what would change
 *   node scripts/publish-cli/scaffold-i18n-keys.js --apply          # writes the changes
 *
 * Will NOT overwrite existing keys (only inserts missing ones).
 * Preserves existing JSON structure + 2-space indent (matches existing convention).
 */

'use strict';

var fs = require('fs');
var path = require('path');
var i18n = require('./i18n');

// English seed values — Tier 1 EN authoring at scaffold time.
// Tier 2-4 get the same English seed inserted; operator then translates.
var EN_SEEDS = {
  'seo.educational_level.preschool':    'Preschool',
  'seo.educational_level.kindergarten': 'Kindergarten',
  'seo.educational_level.grade_1':      'Grade 1',
  'seo.educational_level.grade_2':      'Grade 2',
  'seo.educational_level.grade_3':      'Grade 3',
  'endDeck.heading':                    'Want more?',
  'endDeck.moreType':                   'More {type} worksheets',
  'endDeck.moreTheme':                  'More {theme}-themed worksheets',
  'endDeck.moreLevel':                  'More worksheets for {level}',
  'endDeck.browseAll':                  'Browse all worksheets'
};

function ensurePath(obj, dotPath, value) {
  var parts = dotPath.split('.');
  var cur = obj;
  for (var i = 0; i < parts.length - 1; i++) {
    if (cur[parts[i]] == null || typeof cur[parts[i]] !== 'object') {
      cur[parts[i]] = {};
    }
    cur = cur[parts[i]];
  }
  var leaf = parts[parts.length - 1];
  if (cur[leaf] == null) {
    cur[leaf] = value;
    return true;
  }
  return false;
}

function scaffoldLocale(locale, apply) {
  var file = path.join(i18n.MESSAGES_DIR, locale + '.json');
  if (!fs.existsSync(file)) {
    console.error('  [' + locale + '] SKIP — file missing: ' + file);
    return { locale: locale, inserted: 0, skipped: true };
  }
  var raw = fs.readFileSync(file, 'utf8');
  var data = JSON.parse(raw);
  var inserted = 0;
  var insertedPaths = [];
  Object.keys(EN_SEEDS).forEach(function (dotPath) {
    var seedValue = EN_SEEDS[dotPath];
    if (ensurePath(data, dotPath, seedValue)) {
      inserted++;
      insertedPaths.push(dotPath);
    }
  });
  if (apply && inserted > 0) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }
  return { locale: locale, inserted: inserted, insertedPaths: insertedPaths };
}

function main() {
  var apply = process.argv.indexOf('--apply') !== -1;
  console.log('scaffold-i18n-keys ' + (apply ? '[APPLY MODE]' : '[DRY-RUN — pass --apply to write]'));
  console.log('Seeds: ' + Object.keys(EN_SEEDS).length + ' keys');
  console.log('Locales: ' + i18n.SUPPORTED_LOCALES.length);
  console.log('---');
  var totalInserted = 0;
  i18n.SUPPORTED_LOCALES.forEach(function (locale) {
    var r = scaffoldLocale(locale, apply);
    if (r.skipped) return;
    if (r.inserted === 0) {
      console.log('  [' + locale + '] complete (0 inserts)');
    } else {
      console.log('  [' + locale + '] ' + r.inserted + ' inserts: ' + r.insertedPaths.join(', '));
      totalInserted += r.inserted;
    }
  });
  console.log('---');
  console.log('Total inserts: ' + totalInserted);
  if (!apply && totalInserted > 0) {
    console.log('(Re-run with --apply to write changes.)');
  }
}

if (require.main === module) main();

module.exports = { scaffoldLocale: scaffoldLocale, EN_SEEDS: EN_SEEDS };
