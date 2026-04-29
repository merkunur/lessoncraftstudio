/**
 * --updates-manifest JSON parser + validator per Brief B Phase 4 Surface 3.
 *
 * Format: { "<filename>": "<existing-slug>", ... }
 *   - keys: ZIP filenames (basename only, no path) that exist in the input folder
 *   - values: existing slugs that exist in the DB for the matching ZIP's language
 *
 * Validation runs at parse time. If any key references a ZIP not in the input
 * folder OR any value references a slug+language combination not in the DB,
 * parse throws with the full list of issues (so operator gets a complete
 * picture rather than a one-at-a-time fix loop).
 */

'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Read + JSON.parse the manifest file. Throws on missing file / invalid JSON.
 * Returns the raw object.
 */
function read(manifestPath) {
  if (!fs.existsSync(manifestPath)) {
    throw new Error('updates-manifest: file not found at "' + manifestPath + '"');
  }
  var raw = fs.readFileSync(manifestPath, 'utf8');
  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error('updates-manifest: invalid JSON in "' + manifestPath + '": ' + e.message);
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('updates-manifest: expected JSON object {filename: slug, ...} in "' + manifestPath + '"');
  }
  // Reject empty manifest — operator probably meant something.
  if (Object.keys(parsed).length === 0) {
    throw new Error('updates-manifest: manifest at "' + manifestPath + '" is empty (no entries)');
  }
  // Reject non-string values.
  Object.keys(parsed).forEach(function (k) {
    if (typeof parsed[k] !== 'string' || !parsed[k].length) {
      throw new Error('updates-manifest: entry "' + k + '" must map to a non-empty slug string');
    }
  });
  return parsed;
}

/**
 * Validate manifest against the input folder + DB.
 *
 * opts:
 *   manifest        — parsed manifest object
 *   inputFolder     — absolute path to ZIP folder (basenames in keys must exist here)
 *   resolveLanguage — async function (zipPath) → language string (used to look up DB rows)
 *   findExistingBySlug — async function (language, slug) → row | null
 *
 * Returns: array of validation errors (empty if all pass).
 */
async function validate(opts) {
  var manifest = opts.manifest;
  var inputFolder = opts.inputFolder;
  var resolveLanguage = opts.resolveLanguage;
  var findExistingBySlug = opts.findExistingBySlug;
  var errors = [];

  var keys = Object.keys(manifest);
  for (var i = 0; i < keys.length; i++) {
    var filename = keys[i];
    var slug = manifest[filename];

    // Key check: filename must exist in input folder.
    var zipPath = path.join(inputFolder, filename);
    if (!fs.existsSync(zipPath)) {
      errors.push('manifest key "' + filename + '" — file not found at ' + zipPath);
      continue;
    }

    // Resolve language for the ZIP (caller does bundle.parseManifest internally).
    var language;
    try {
      language = await resolveLanguage(zipPath);
    } catch (e) {
      errors.push('manifest key "' + filename + '" — could not resolve language: ' + e.message);
      continue;
    }

    // Value check: (language, slug) must exist in DB.
    var row;
    try {
      row = await findExistingBySlug(language, slug);
    } catch (e) {
      errors.push('manifest entry "' + filename + ' -> ' + slug + '" — DB lookup failed: ' + e.message);
      continue;
    }
    if (!row) {
      errors.push('manifest entry "' + filename + ' -> ' + slug + '" — no deck row found in (language=' + language + ', slug=' + slug + ')');
    }
  }

  return errors;
}

/**
 * Lookup helper: given a manifest + ZIP basename, return the existing slug or
 * null if the ZIP is not in the manifest (i.e., this ZIP is INSERT not UPDATE).
 */
function lookupExistingSlug(manifest, zipBasename) {
  if (!manifest) return null;
  return manifest[zipBasename] || null;
}

module.exports = {
  read: read,
  validate: validate,
  lookupExistingSlug: lookupExistingSlug
};
