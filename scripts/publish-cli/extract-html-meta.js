/**
 * Extract title + description from substituted deck.html.
 *
 * Per Brief B Phase 3 v4 Surface 4 (sourced from recon Item 7 verification PASS):
 *   - title       — $('h1').first().text().trim()
 *   - description — $('meta[name="description"]').attr('content')
 *
 * Both consumed AFTER Phase 2 substitution so __EDUCATIONAL_LEVEL_LOCALIZED__
 * etc. are already resolved. Format for DB write: { <language>: <text> }.
 *
 * Fallback paths (per recon Item 7 surfaced finding):
 *   - <h1> missing or empty after trim → fall back to manifest.exercise_type;
 *     dry-run-style warning surfaced
 *   - <meta description> missing → empty string + warning
 */

'use strict';

var cheerio = require('cheerio');

/**
 * Extract title + description from the post-substitution deck.html.
 *
 * Returns:
 *   { title, description, warnings: [...] }
 * where title/description are plain strings (caller wraps in
 * { <language>: <string> } per Phase 3 Surface 4 schema).
 */
function extract(deckHtml, manifest) {
  var warnings = [];
  var $ = cheerio.load(deckHtml);

  var titleRaw = $('h1').first().text().trim();
  var title;
  if (titleRaw) {
    title = titleRaw;
  } else {
    title = manifest.exercise_type || '';
    warnings.push('extract-html-meta: <h1> missing or empty in deck.html; falling back to manifest.exercise_type "' + title + '"');
  }

  var description = $('meta[name="description"]').attr('content');
  if (description == null || description === '') {
    description = '';
    warnings.push('extract-html-meta: <meta name="description"> missing or empty in deck.html; using empty string');
  }

  return { title: title, description: description, warnings: warnings };
}

module.exports = { extract: extract };
