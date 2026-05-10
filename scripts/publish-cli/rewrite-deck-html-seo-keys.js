#!/usr/bin/env node
/**
 * One-shot retrofit: replaces raw i18n key references (`seoFreeInteractive`,
 * `seoFor`, `seoPrintOrPlayOnline`) with localized strings in deck.html SEO
 * surfaces (<meta name="description">, <meta property="og:description">,
 * Schema.org JSON-LD `description`).
 *
 * Defect class: 3 of 29 catalog apps (find-objects, crossword, picture-path)
 * emit raw key references in `bundle.seoMeta.{freeInteractive, forWord,
 * printOrPlay}` instead of the resolved English text. treasure-hunt does it
 * correctly. Resolves to broken-looking Google search snippets:
 *   "seoFreeInteractive Find the Hidden Objects worksheet seoFor Kindergarten..."
 *
 * 2026-05-10 wave: 237 unique decks affected (96 find-objects + 44 crossword
 * + 97 picture-trail) × 2 dir-entries (symlink + -v1/) = 474 deck.html files.
 *
 * Compounded defect on picture-trail: 49 round-3 picture-trail decks have
 * `(Set 98be)` parenthetical AND `— Set 002` em-dash form coexisting in
 * descriptions because the inject-variant retrofit's regex matched only the
 * em-dash form. This script also strips the parenthetical `(Set 98be)`.
 *
 * Per §15.17 salvage scripts pattern. Idempotent + atomic via tmp + rename
 * per `rewrite-canonical-host.js` precedent.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-seo-keys.js <directory> [--dry-run]
 *
 *   <directory>  e.g., /var/www/lcs-media/decks/en (walks deck.html files
 *                in immediate subdirectories AND .archived/ subtrees)
 *
 *   --dry-run    classify each deck.html without writing
 */

'use strict';

var fs = require('fs');
var path = require('path');

// Substitution table — additive, English-only for v1. Future locales would
// extend this from `REFERENCE TRANSLATIONS/translations-shared.js`. For the
// 2026-05-10 wave all affected decks are language='en'.
var KEY_SUBSTITUTIONS = {
  'seoFreeInteractive': 'Free interactive',
  'seoFor':             'for',
  'seoPrintOrPlayOnline': 'Print or play online'
};

// Stuck variant_id parenthetical to strip from picture-trail decks
// (post-`inject-variant-into-deck-title` artifact).
var STUCK_SET_PARENS_RE = / \(Set 98be\)/g;

// Description regions to retrofit. Each entry: { regex, replacer }.
// Targets only string content; preserves surrounding HTML structure.
var DESC_REGIONS = [
  {
    name: 'meta-description',
    re: /(<meta name="description" content=")([^"]+)("[^>]*>)/g
  },
  {
    name: 'og-description',
    re: /(<meta property="og:description" content=")([^"]+)("[^>]*>)/g
  },
  {
    name: 'twitter-description',
    re: /(<meta name="twitter:description" content=")([^"]+)("[^>]*>)/g
  }
];

// JSON-LD targets `name` and `description` fields inside the LearningResource block.
var JSONLD_RE = /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/;

function substituteString(s) {
  var changed = false;
  var out = s;
  Object.keys(KEY_SUBSTITUTIONS).forEach(function (key) {
    if (out.indexOf(key) !== -1) {
      out = out.split(key).join(KEY_SUBSTITUTIONS[key]);
      changed = true;
    }
  });
  // Strip stuck variant_id parenthetical
  if (STUCK_SET_PARENS_RE.test(out)) {
    out = out.replace(STUCK_SET_PARENS_RE, '');
    changed = true;
  }
  return { out: out, changed: changed };
}

function processHtml(html) {
  var anyChange = false;

  DESC_REGIONS.forEach(function (region) {
    html = html.replace(region.re, function (match, pre, content, post) {
      var r = substituteString(content);
      if (r.changed) {
        anyChange = true;
        return pre + r.out + post;
      }
      return match;
    });
  });

  // Title doesn't carry seoXxx keys (per audit), but does carry stuck "(Set 98be)"
  // OR " — Set 98be" forms in some descriptions. Only the parens form is
  // stripped — em-dash form was already replaced by inject-variant-into-deck-title.
  // Apply title-only stuck-set strip too as a safety net.
  html = html.replace(/(<title>)([^<]+)(<\/title>)/, function (match, pre, content, post) {
    if (STUCK_SET_PARENS_RE.test(content)) {
      anyChange = true;
      return pre + content.replace(STUCK_SET_PARENS_RE, '') + post;
    }
    return match;
  });

  // Schema.org JSON-LD: parse + substitute name + description fields.
  html = html.replace(JSONLD_RE, function (match, pre, jsonStr, post) {
    try {
      var ld = JSON.parse(jsonStr);
      var ldChanged = false;
      ['name', 'description'].forEach(function (k) {
        if (typeof ld[k] === 'string') {
          var r = substituteString(ld[k]);
          if (r.changed) {
            ld[k] = r.out;
            ldChanged = true;
          }
        }
      });
      if (!ldChanged) return match;
      anyChange = true;
      return pre + JSON.stringify(ld) + post;
    } catch (e) {
      return match;
    }
  });

  return { html: html, changed: anyChange };
}

function processFile(filePath, dryRun) {
  var html;
  try {
    html = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return { file: filePath, action: 'skip-read-error', note: e.message };
  }

  var hasKey = false;
  Object.keys(KEY_SUBSTITUTIONS).forEach(function (k) {
    if (html.indexOf(k) !== -1) hasKey = true;
  });
  var hasStuckParens = STUCK_SET_PARENS_RE.test(html);
  // Reset regex state for fresh use later
  STUCK_SET_PARENS_RE.lastIndex = 0;

  if (!hasKey && !hasStuckParens) {
    return { file: filePath, action: 'skip-clean' };
  }

  var result = processHtml(html);
  if (!result.changed) {
    return { file: filePath, action: 'skip-no-effect' };
  }

  if (dryRun) {
    return { file: filePath, action: 'would-rewrite' };
  }

  var tmp = filePath + '.tmp';
  try {
    fs.writeFileSync(tmp, result.html, 'utf8');
    fs.renameSync(tmp, filePath);
  } catch (e) {
    try { fs.unlinkSync(tmp); } catch (_) {}
    return { file: filePath, action: 'write-error', note: e.message };
  }
  return { file: filePath, action: 'rewritten' };
}

function walkDeckHtml(rootDir) {
  // Find all `deck.html` files: immediate subdirs of rootDir AND .archived/ subtree.
  var results = [];
  function walk(dir, depth) {
    var entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    entries.forEach(function (e) {
      var fp = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (depth < 4) walk(fp, depth + 1);
      } else if (e.isFile() && e.name === 'deck.html') {
        results.push(fp);
      }
    });
  }
  walk(rootDir, 0);
  return results;
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var rootDir = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (args[i].indexOf('--') === 0) {
      console.error('ERROR: unknown flag "' + args[i] + '"');
      process.exit(2);
    }
    if (rootDir == null) { rootDir = args[i]; continue; }
    console.error('ERROR: unexpected positional argument "' + args[i] + '"');
    process.exit(2);
  }
  if (!rootDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-deck-html-seo-keys.js <directory> [--dry-run]');
    process.exit(2);
  }
  rootDir = path.resolve(rootDir);
  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    console.error('ERROR: not a directory: ' + rootDir);
    process.exit(2);
  }

  console.log('rewrite-deck-html-seo-keys.js — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  root: ' + rootDir);

  var files = walkDeckHtml(rootDir);
  console.log('  deck.html files found: ' + files.length);
  console.log('');

  var counts = { 'rewritten': 0, 'would-rewrite': 0, 'skip-clean': 0, 'skip-no-effect': 0, 'skip-read-error': 0, 'write-error': 0 };
  var errors = [];
  files.forEach(function (f, idx) {
    var r = processFile(f, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    if (r.action === 'write-error' || r.action === 'skip-read-error') errors.push(r);
    if ((idx + 1) % 100 === 0) {
      console.log('  ' + (idx + 1) + '/' + files.length + ' processed');
    }
  });

  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) {
    if (counts[k] > 0) console.log('  ' + k + ': ' + counts[k]);
  });
  if (errors.length > 0) {
    console.log('');
    console.log('=== Errors ===');
    errors.slice(0, 10).forEach(function (e) {
      console.log('  ' + e.action + '  ' + e.file + '  // ' + e.note);
    });
  }
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = {
  KEY_SUBSTITUTIONS: KEY_SUBSTITUTIONS,
  substituteString: substituteString,
  processHtml: processHtml,
  processFile: processFile
};
