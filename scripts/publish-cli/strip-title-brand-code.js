#!/usr/bin/env node
/**
 * Wave-2 Phase A (code half): strip the embedded brand suffix from hardcoded
 * page-TITLE strings in .tsx/.ts (LANDING_STRINGS metaTitle, fallback
 * `${t('title')} | LessonCraftStudio` concatenations, auth/404/legacy title
 * literals). Companion to strip-title-brand.js (which did the i18n JSON half).
 * Root layout template (`%s · LessonCraftStudio`) then adds the brand once.
 *
 * Precise: matches a brand suffix (` | / · / — LessonCraftStudio`) ONLY when
 * immediately followed by a closing quote/backtick. This never touches
 * `siteName: 'LessonCraftStudio'` (no separator) or `alt: 'LessonCraftStudio — …'`
 * / `en: 'LessonCraftStudio - …'` (brand-INITIAL) — the brand there is not
 * preceded by a separator-immediately-before-quote.
 *
 * Usage: node scripts/publish-cli/strip-title-brand-code.js [--apply]
 */
'use strict';
var fs = require('fs');
var path = require('path');

var APPLY = process.argv.includes('--apply');
var ROOTS = [
  path.join(__dirname, '..', '..', 'frontend', 'app', '[locale]'),
  path.join(__dirname, '..', '..', 'frontend', 'lib'),
];
var EXT = /\.(tsx?|ts)$/;
var re = /\s*[|·—]\s*LessonCraftStudio(?=["'`])/g;

function walk(dir, out) {
  var ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  ents.forEach(function (e) {
    var fp = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== '.next') walk(fp, out); }
    else if (EXT.test(e.name)) out.push(fp);
  });
}

var files = [];
ROOTS.forEach(function (r) { walk(r, files); });
var totalHits = 0, totalFiles = 0;
function isComment(line) {
  var t = line.trim();
  return t.indexOf('//') === 0 || t.indexOf('*') === 0 || t.indexOf('/*') === 0;
}
files.forEach(function (fp) {
  var raw = fs.readFileSync(fp, 'utf8');
  var lines = raw.split('\n');
  var fileHits = 0;
  var sampleCount = 0;
  var newLines = lines.map(function (ln) {
    re.lastIndex = 0;
    if (isComment(ln)) return ln;          // never touch comment lines (false-positive guard)
    var m = ln.match(re);
    if (!m) return ln;
    fileHits += m.length;
    if (sampleCount < 2) { console.log('    ' + ln.trim().slice(0, 110)); sampleCount++; }
    return ln.replace(re, '');
  });
  if (!fileHits) return;
  totalFiles++;
  totalHits += fileHits;
  var rel = fp.replace(path.join(__dirname, '..', '..') + path.sep, '');
  console.log('[' + rel + '] ' + fileHits + ' brand suffix(es)');
  if (APPLY) { fs.writeFileSync(fp, newLines.join('\n'), 'utf8'); console.log('    -> written'); }
});
console.log((APPLY ? '[APPLIED] ' : '[DRY-RUN] ') + totalHits + ' suffix(es) across ' + totalFiles + ' files ' + (APPLY ? 'stripped' : 'would be stripped') + '.');
