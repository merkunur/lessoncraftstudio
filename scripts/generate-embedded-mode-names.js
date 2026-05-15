#!/usr/bin/env node
/**
 * One-shot regenerator for the EMBEDDED_EXERCISE_MODE_NAMES constant in
 * REFERENCE TRANSLATIONS/catalog-export.js.
 *
 * Reads frontend/config/topics-taxonomy.json axes.exercise-mode.<key>.name.<locale>
 * and emits a compact JS literal suitable for paste-into-place. Re-run whenever
 * the taxonomy's exercise-mode entries change (new modes, new locale names, etc.).
 *
 * Per CLAUDE.md §A.13.32 canonical-artifact-grounding: catalog-export.js's
 * embedded table is a derived snapshot of the taxonomy. The taxonomy stays
 * the SoT; this script keeps the snapshot in sync.
 *
 * Usage:
 *   node scripts/generate-embedded-mode-names.js          # print to stdout
 *   node scripts/generate-embedded-mode-names.js > out.js # capture
 */

'use strict';

var fs = require('fs');
var path = require('path');

var TAXONOMY_PATH = path.resolve(__dirname, '..', 'frontend', 'config', 'topics-taxonomy.json');
// Locales currently populated in taxonomy axes.exercise-mode.<key>.name.<locale>
// (verified at 11-locale extension commission: en + de + es + nl + it + fr + pt
// + sv + da + no + fi all have 49/49 coverage). The 4 Nordic+Finnic locales
// shipped with [NSR-flag] per §17.5.1 — values functional immediately, native-
// speaker review batched later per project_k3_phrasing_native_speaker_review.md.
var EMBEDDED_LOCALES = ['en', 'de', 'es', 'nl', 'it', 'fr', 'pt', 'sv', 'da', 'no', 'fi'];

function generate() {
  var taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
  var modes = taxonomy.axes && taxonomy.axes['exercise-mode'];
  if (!modes) {
    console.error('ERROR: taxonomy missing axes.exercise-mode');
    process.exit(1);
  }
  var keys = Object.keys(modes).filter(function (k) { return k.charAt(0) !== '$'; }).sort();

  var lines = [];
  lines.push('  // ------------------------------------------------------------------');
  lines.push('  // EMBEDDED_EXERCISE_MODE_NAMES — snapshot of topics-taxonomy.json');
  lines.push('  // axes.exercise-mode.<key>.name.<locale> for locales currently populated');
  lines.push('  // (' + EMBEDDED_LOCALES.join(' + ') + '). Refresh via:');
  lines.push('  //   node scripts/generate-embedded-mode-names.js');
  lines.push('  // Other locales fall through to .en or to title-case slug per the');
  lines.push('  // deriveExerciseModeName fallback chain. See CLAUDE.md §16.6.1 for the');
  lines.push('  // substrate-honesty discipline on Tier 2-4 locale expansion.');
  lines.push('  // ------------------------------------------------------------------');
  lines.push('  var EMBEDDED_EXERCISE_MODE_NAMES = {');

  keys.forEach(function (k, idx) {
    var entry = modes[k];
    if (!entry || !entry.name) return;
    var parts = [];
    EMBEDDED_LOCALES.forEach(function (loc) {
      if (entry.name[loc]) {
        parts.push(loc + ': ' + JSON.stringify(entry.name[loc]));
      }
    });
    if (!parts.length) return;
    var trailing = (idx === keys.length - 1) ? '' : ',';
    lines.push('    ' + JSON.stringify(k) + ': { ' + parts.join(', ') + ' }' + trailing);
  });

  lines.push('  };');
  return lines.join('\n');
}

console.log(generate());
