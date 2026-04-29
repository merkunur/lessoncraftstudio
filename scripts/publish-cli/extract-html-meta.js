/**
 * Extract title + description from substituted deck.html.
 *
 * Per Brief B Phase 3 v4 Surface 4 (sourced from recon Item 7 verification PASS):
 *   - title       — first <h1>'s text content, trimmed
 *   - description — <meta name="description"> content attribute
 *
 * Both consumed AFTER Phase 2 substitution so __EDUCATIONAL_LEVEL_LOCALIZED__
 * etc. are already resolved. Format for DB write: { <language>: <text> }.
 *
 * Fallback paths (per recon Item 7 surfaced finding):
 *   - <h1> missing or empty after trim → fall back to manifest.exercise_type;
 *     warning surfaced
 *   - <meta description> missing → empty string + warning
 *
 * Implementation note (Phase 3 execution Hetzner runtime fix-up):
 * Originally written against cheerio (already in root deps), but cheerio@1.1.2
 * pulls undici@7 which requires Node 20+; Hetzner runs Node 18.20.8. Switched
 * to node-html-parser (also already in root deps; pure-JS; no undici). Same
 * extraction shape; trivial selectors.
 */

'use strict';

var HTMLParser = require('node-html-parser');

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
  var root = HTMLParser.parse(deckHtml);

  var h1Element = root.querySelector('h1');
  var titleRaw = h1Element ? h1Element.text.trim() : '';
  var title;
  if (titleRaw) {
    title = titleRaw;
  } else {
    title = manifest.exercise_type || '';
    warnings.push('extract-html-meta: <h1> missing or empty in deck.html; falling back to manifest.exercise_type "' + title + '"');
  }

  var descElement = root.querySelector('meta[name="description"]');
  var description = descElement ? descElement.getAttribute('content') : null;
  if (description == null || description === '') {
    description = '';
    warnings.push('extract-html-meta: <meta name="description"> missing or empty in deck.html; using empty string');
  }

  return { title: title, description: description, warnings: warnings };
}

module.exports = { extract: extract };
