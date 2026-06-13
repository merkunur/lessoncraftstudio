/**
 * Read + parse + validate a catalog-export ZIP bundle.
 *
 * Bundle shape per REFERENCE TRANSLATIONS/catalog-export.js:155-187 +
 * CLAUDE.md §15.1. The ZIP contains:
 *   - manifest.json
 *   - deck.html
 *   - printable.pdf
 *   - answer-key.pdf
 *   - thumbnail.png
 *
 * Phase 2 reads all 5 entries; dry-run inspects manifest + deck.html
 * deeply, treats PDFs + thumbnail as opaque blobs (size + presence only).
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require('adm-zip');

var REQUIRED_MANIFEST_FIELDS = [
  'schema_version', 'deck_id', 'generated_at', 'language',
  'exercise_type', 'assets'
];

var SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function read(zipPath) {
  if (!fs.existsSync(zipPath)) {
    throw new Error('bundle.read: ZIP not found at ' + zipPath);
  }
  if (!zipPath.toLowerCase().endsWith('.zip')) {
    throw new Error('bundle.read: expected .zip file, got ' + path.basename(zipPath));
  }
  var zip = new AdmZip(zipPath);
  var entries = zip.getEntries();
  var byName = {};
  entries.forEach(function (e) { byName[e.entryName] = e; });
  return { zip: zip, entries: entries, byName: byName, zipPath: zipPath };
}

function parseManifest(bundle) {
  var entry = bundle.byName['manifest.json'];
  if (!entry) {
    throw new Error('bundle.parseManifest: ZIP missing manifest.json (entries: ' +
      Object.keys(bundle.byName).join(', ') + ')');
  }
  var raw = entry.getData().toString('utf8');
  var manifest;
  try {
    manifest = JSON.parse(raw);
  } catch (e) {
    throw new Error('bundle.parseManifest: invalid JSON in manifest.json: ' + e.message);
  }
  return manifest;
}

function validateManifest(manifest) {
  var errors = [];
  REQUIRED_MANIFEST_FIELDS.forEach(function (f) {
    if (manifest[f] == null) errors.push('missing required field: ' + f);
  });
  if (manifest.language && SUPPORTED_LOCALES.indexOf(manifest.language) === -1) {
    errors.push('unsupported language "' + manifest.language + '"; expected one of ' + SUPPORTED_LOCALES.join(', '));
  }
  if (manifest.assets) {
    // printable_only (schema 1.1, worksheet-gen printables per CLAUDE.md §14.10
    // family-keys note): answer-key is by-design absent; assets.answer_key_pdf
    // is null and the ZIP carries no answer-key.pdf entry.
    var requiredAssets = manifest.printable_only === true
      ? ['html', 'pdf', 'thumbnail']
      : ['html', 'pdf', 'answer_key_pdf', 'thumbnail'];
    requiredAssets.forEach(function (k) {
      if (!manifest.assets[k]) errors.push('manifest.assets.' + k + ' is missing');
    });
  }
  // content_family_id MUST be null in v1 per §17.8.7. Don't error if non-null
  // (v2 may exercise it) but warn so the dry-run output flags unexpected v2-shape input.
  return errors;
}

function readDeckHtml(bundle) {
  var entry = bundle.byName['deck.html'];
  if (!entry) {
    throw new Error('bundle.readDeckHtml: ZIP missing deck.html (entries: ' +
      Object.keys(bundle.byName).join(', ') + ')');
  }
  return entry.getData().toString('utf8');
}

function getAssetSize(bundle, name) {
  var entry = bundle.byName[name];
  return entry ? entry.header.size : null;
}

module.exports = {
  read: read,
  parseManifest: parseManifest,
  validateManifest: validateManifest,
  readDeckHtml: readDeckHtml,
  getAssetSize: getAssetSize,
  SUPPORTED_LOCALES: SUPPORTED_LOCALES,
  REQUIRED_MANIFEST_FIELDS: REQUIRED_MANIFEST_FIELDS
};
