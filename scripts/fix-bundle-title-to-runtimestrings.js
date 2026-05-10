#!/usr/bin/env node
/**
 * Fix: replace hardcoded English `title: 'X Practice'` literal in bundle
 * return with `title: runtimeStrings.title` — Phase 3 fanout's regex missed
 * 22 of 28 apps due to indent variations.
 *
 * For each app:
 *   1. Locate the bundle return — the `return {` (or `var bundle = {`) whose
 *      body contains both `appType:` AND `runtimeStrings: runtimeStrings`.
 *   2. Within that return body, find the `title:` field with English literal
 *      value (`title: 'X'` or `title: "X"`).
 *   3. Replace with `title: runtimeStrings.title,`.
 *   4. Idempotent: skip if `title: runtimeStrings.title` already present in
 *      that bundle return.
 *
 * Usage: node scripts/fix-bundle-title-to-runtimestrings.js [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');

var APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');

function findBundleBody(html) {
  // Find the return statement (or var bundle = {) whose body contains BOTH
  // `appType:` AND `runtimeStrings: runtimeStrings`. Returns { start, end, indent }
  // where start = position of `{`, end = position of matching `}`.
  var starters = [
    /\n([ \t]*)return\s*\{/g,
    /\n([ \t]*)var\s+bundle\s*=\s*\{/g
  ];
  for (var s = 0; s < starters.length; s++) {
    var re = starters[s];
    var m;
    re.lastIndex = 0;
    while ((m = re.exec(html)) !== null) {
      var openBrace = html.indexOf('{', m.index);
      // Walk bracket-balanced to find matching close
      var depth = 0, inStr = false, esc = false;
      var closeIdx = -1;
      for (var i = openBrace; i < html.length; i++) {
        var c = html[i];
        if (esc) { esc = false; continue; }
        if (c === '\\') { esc = true; continue; }
        if (c === '"' || c === "'") { inStr = !inStr; continue; }
        if (inStr) continue;
        if (c === '{') depth++;
        else if (c === '}') { depth--; if (depth === 0) { closeIdx = i; break; } }
      }
      if (closeIdx === -1) continue;
      var body = html.slice(openBrace + 1, closeIdx);
      if (/appType\s*:/.test(body) && /runtimeStrings\s*:\s*runtimeStrings/.test(body)) {
        return { start: openBrace, end: closeIdx, body: body, indent: m[1], openBrace: openBrace };
      }
    }
  }
  return null;
}

function fixApp(appName, dryRun) {
  var filePath = path.join(APPS_DIR, appName + '.html');
  if (!fs.existsSync(filePath)) return { app: appName, action: 'skip-not-found' };
  var html = fs.readFileSync(filePath, 'utf8');

  var bundle = findBundleBody(html);
  if (!bundle) return { app: appName, action: 'skip-no-bundle' };

  var body = bundle.body;
  // Idempotent: skip if title: runtimeStrings.title already present
  if (/title\s*:\s*runtimeStrings\.title/.test(body)) {
    return { app: appName, action: 'skip-already-fixed' };
  }

  // Find title: 'X' or title: "X" line within bundle body. Single-quoted or double-quoted.
  // Match only top-level (depth 0) of the body.
  // Simpler: find first occurrence of the pattern within bundle body span.
  var bodyStartAbs = bundle.openBrace + 1;
  var titleRe = /(\n[ \t]+title\s*:\s*)(['"][^'"]*['"])(,?)/;
  var m = titleRe.exec(body);
  if (!m) return { app: appName, action: 'skip-no-title-literal' };

  // Compute absolute positions
  var matchStart = bodyStartAbs + m.index;
  var matchEnd = matchStart + m[0].length;
  var oldText = m[0];
  var newText = m[1] + 'runtimeStrings.title' + (m[3] || ',');

  var newHtml = html.slice(0, matchStart) + newText + html.slice(matchEnd);

  if (dryRun) {
    return { app: appName, action: 'would-fix', oldLine: oldText.trim(), newLine: newText.trim() };
  }

  fs.writeFileSync(filePath + '.tmp', newHtml, 'utf8');
  fs.renameSync(filePath + '.tmp', filePath);
  return { app: appName, action: 'fixed' };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.includes('--dry-run');
  var allApps = ['addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count',
    'code-addition', 'crossword', 'cryptogram', 'find-and-count', 'find-objects',
    'grid-match', 'matching', 'math-puzzle', 'math-worksheet', 'missing-pieces',
    'more-less', 'odd-one-out', 'pattern-train', 'pattern-worksheet', 'picture-path',
    'picture-sort', 'prepositions', 'shadow-match', 'subtraction', 'sudoku',
    'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch'];

  console.log('fix-bundle-title-to-runtimestrings — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  apps:', allApps.length);
  console.log('');

  var counts = {};
  allApps.forEach(function (a) {
    var r = fixApp(a, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    console.log('  ' + a.padEnd(22) + ' ' + r.action + (r.oldLine ? '  // ' + r.oldLine + ' → ' + r.newLine : ''));
  });
  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) { console.log('  ' + k + ': ' + counts[k]); });
}

if (require.main === module) main();
