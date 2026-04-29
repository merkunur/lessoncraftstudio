/**
 * Dry-run output writer per Brief B Phase 2 Surface 4.
 *
 * Per ZIP processed, write to:
 *   <staging-root>/<deck-id>/
 *     manifest.json              (pass-through copy)
 *     deck.html                  (post-substitution)
 *     deck.html.diff             (line-diff vs pre-substitution)
 *     substitution-report.json   (structured)
 *     substitution-report.txt    (human-readable)
 *     warnings.txt               (one warning per line; empty if none)
 *
 * Plus a top-level <staging-root>/_summary.txt aggregating across decks.
 *
 * NO DB writes, NO asset uploads, NO nginx-touchable filesystem changes.
 */

'use strict';

var fs = require('fs');
var path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeDeck(stagingRoot, deckId, opts) {
  var dir = path.join(stagingRoot, deckId);
  ensureDir(dir);

  // manifest.json — pass-through
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(opts.manifest, null, 2), 'utf8');

  // deck.html — post-substitution
  fs.writeFileSync(path.join(dir, 'deck.html'), opts.substitutedHtml, 'utf8');

  // deck.html.diff — naive line-diff
  fs.writeFileSync(path.join(dir, 'deck.html.diff'), buildDiff(opts.originalHtml, opts.substitutedHtml), 'utf8');

  // substitution-report.json — structured
  fs.writeFileSync(path.join(dir, 'substitution-report.json'),
    JSON.stringify({
      deckId: deckId,
      language: opts.manifest.language,
      slug: opts.resolved.slug,
      canonicalURL: opts.resolved.canonicalURL,
      report: opts.report,
      warnings: opts.warnings,
      errors: opts.errors
    }, null, 2), 'utf8');

  // substitution-report.txt — human-readable
  fs.writeFileSync(path.join(dir, 'substitution-report.txt'), buildReportText(deckId, opts), 'utf8');

  // warnings.txt
  fs.writeFileSync(path.join(dir, 'warnings.txt'),
    (opts.warnings && opts.warnings.length ? opts.warnings.join('\n') + '\n' : ''), 'utf8');

  return dir;
}

function buildDiff(before, after) {
  // Naive line-by-line diff: any line where before != after gets shown.
  var beforeLines = before.split('\n');
  var afterLines = after.split('\n');
  var max = Math.max(beforeLines.length, afterLines.length);
  var out = [];
  for (var i = 0; i < max; i++) {
    var b = beforeLines[i];
    var a = afterLines[i];
    if (b === a) continue;
    if (b !== undefined) out.push('- L' + (i + 1) + ': ' + b);
    if (a !== undefined) out.push('+ L' + (i + 1) + ': ' + a);
  }
  return out.length === 0 ? '(no differences)\n' : out.join('\n') + '\n';
}

function buildReportText(deckId, opts) {
  var lines = [];
  lines.push('Deck: ' + deckId);
  lines.push('Language: ' + opts.manifest.language);
  lines.push('Predicted slug: ' + opts.resolved.slug);
  lines.push('Predicted canonical URL: ' + opts.resolved.canonicalURL);
  lines.push('Theme: ' + (opts.manifest.theme || '(null — theme link skipped)'));
  lines.push('');
  lines.push('Substitutions (' + opts.report.length + '):');
  lines.push(''.padStart(72, '-'));
  opts.report.forEach(function (r) {
    lines.push('  ' + r.placeholder);
    lines.push('    source:        ' + r.source);
    lines.push('    value:         ' + truncate(r.value, 100));
    lines.push('    fallbackFired: ' + r.fallbackFired);
    if (r.warning) lines.push('    warning:       ' + r.warning);
  });
  lines.push('');
  if (opts.warnings && opts.warnings.length) {
    lines.push('Warnings (' + opts.warnings.length + '):');
    opts.warnings.forEach(function (w) { lines.push('  - ' + w); });
  } else {
    lines.push('Warnings: (none)');
  }
  if (opts.errors && opts.errors.length) {
    lines.push('');
    lines.push('Errors (' + opts.errors.length + ') — DECK NOT PUBLISHABLE AT PHASE 3:');
    opts.errors.forEach(function (e) { lines.push('  - ' + e); });
  } else {
    lines.push('Errors: (none)');
  }
  lines.push('');
  lines.push('NOTE: Phase 2 dry-run does NOT query the DB for slug collisions.');
  lines.push('      Slug collision check happens at Phase 3 publish time.');
  return lines.join('\n') + '\n';
}

function truncate(s, n) {
  s = String(s == null ? '' : s);
  return s.length > n ? s.slice(0, n - 3) + '...' : s;
}

function writeSummary(stagingRoot, decks) {
  var lines = [];
  lines.push('Brief B Phase 2 dry-run summary');
  lines.push('Generated: ' + new Date().toISOString());
  lines.push('Staging root: ' + stagingRoot);
  lines.push('Decks processed: ' + decks.length);
  lines.push('');
  lines.push(''.padStart(72, '-'));
  decks.forEach(function (d) {
    lines.push(
      d.deckId +
      '  language=' + d.language +
      '  slug=' + d.slug +
      '  canonical=' + d.canonicalURL +
      '  warnings=' + d.warnings +
      '  errors=' + d.errors
    );
  });
  fs.writeFileSync(path.join(stagingRoot, '_summary.txt'), lines.join('\n') + '\n', 'utf8');
}

module.exports = {
  ensureDir: ensureDir,
  writeDeck: writeDeck,
  writeSummary: writeSummary,
  buildDiff: buildDiff,
  buildReportText: buildReportText
};
