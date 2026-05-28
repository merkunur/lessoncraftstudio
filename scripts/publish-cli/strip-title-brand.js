#!/usr/bin/env node
/**
 * Wave-2 Phase A: strip the embedded brand suffix from page-TITLE i18n strings
 * so the root layout template (`%s · LessonCraftStudio`, frontend/app/layout.tsx)
 * adds the brand exactly ONCE. Pre-fix, titles double-branded:
 *   "Addition worksheets | LessonCraftStudio · LessonCraftStudio".
 *
 * Targets ONLY string values whose TRAILING segment is a brand suffix
 * (` | LessonCraftStudio` / ` · LessonCraftStudio` / ` — LessonCraftStudio`),
 * which is the title-suffix shape — descriptions/body carry the brand mid-sentence
 * (e.g. "About LessonCraftStudio publishes…") or brand-initial (ogTitle) and are
 * NOT matched. Copyright "© 2026 LessonCraftStudio." has no separator → not matched.
 *
 * Minimal-diff: literal raw-text replacement of each JSON-encoded value (no
 * JSON.parse+stringify rewrite, which would reformat the whole hand-maintained file).
 *
 * Usage: node scripts/publish-cli/strip-title-brand.js [--apply]   (default dry-run)
 */
'use strict';
var fs = require('fs');
var path = require('path');

var APPLY = process.argv.includes('--apply');
var LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
var MSG_DIR = path.join(__dirname, '..', '..', 'frontend', 'messages');
var reBrand = /\s*[|·—]\s*LessonCraftStudio\s*$/;

function walk(obj, p, hits) {
  for (var k in obj) {
    var v = obj[k];
    var np = p ? p + '.' + k : k;
    if (typeof v === 'string') { if (reBrand.test(v)) hits.push([np, v]); }
    else if (v && typeof v === 'object') walk(v, np, hits);
  }
}

var totalChanged = 0;
LOCALES.forEach(function (loc) {
  var file = path.join(MSG_DIR, loc + '.json');
  var raw = fs.readFileSync(file, 'utf8');
  var json = JSON.parse(raw);
  var hits = [];
  walk(json, '', hits);
  if (!hits.length) { console.log('[' + loc + '] no brand-title strings'); return; }
  console.log('[' + loc + '] ' + hits.length + ' title strings:');
  hits.forEach(function (h) {
    var oldVal = h[1];
    var newVal = oldVal.replace(reBrand, '');
    console.log('    ' + h[0] + '\n      - ' + JSON.stringify(oldVal) + '\n      + ' + JSON.stringify(newVal));
    var oldEnc = JSON.stringify(oldVal);
    var newEnc = JSON.stringify(newVal);
    var before = raw;
    raw = raw.split(oldEnc).join(newEnc);
    if (raw === before) console.log('      !! WARN: literal not found in raw text (encoding mismatch?)');
    else totalChanged++;
  });
  if (APPLY) { fs.writeFileSync(file, raw, 'utf8'); console.log('    -> written'); }
});
console.log((APPLY ? '[APPLIED] ' : '[DRY-RUN] ') + totalChanged + ' value(s) ' + (APPLY ? 'stripped' : 'would be stripped') + '. Re-run with --apply to write.');
