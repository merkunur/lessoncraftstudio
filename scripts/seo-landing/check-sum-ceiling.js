#!/usr/bin/env node
/* ≤N quantity-ceiling gate (Wave-3 ruling 4 doctrine instrument).
 * For grade-boundary modes where a generated quantity (not the mechanic) sets the grade, theme×mechanic validity
 * is necessary but NOT sufficient — a numeric ceiling check is required. READ-ONLY: scans each coordinate's deck
 * manifests on disk and flags any operation whose operand OR result exceeds the ceiling ("within N", e.g. Gr1=20).
 * Parses `exercises[].operations[].{text, solution}` (math-puzzle/code-addition shape).
 * MUST run on Hetzner. Usage: node check-sum-ceiling.js <coords.json> [--ceiling=20] [--locale=en]
 */
'use strict';
var fs = require('fs');
var argv = process.argv.slice(2);
var coordsPath = argv.find(function (a) { return a.indexOf('--') !== 0; });
var ceiling = parseInt((argv.find(function (a) { return a.indexOf('--ceiling=') === 0; }) || '--ceiling=20').split('=')[1], 10);
var locale = (argv.find(function (a) { return a.indexOf('--locale=') === 0; }) || '--locale=en').split('=')[1];
var _raw = JSON.parse(fs.readFileSync(coordsPath, 'utf8'));
var coords = _raw.coordinates || _raw.validCoordinates || _raw;

var RESULTS_ONLY = argv.indexOf('--results-only') !== -1;
var SOURCE = (argv.find(function (a) { return a.indexOf('--source=') === 0; }) || '--source=manifest').split('=')[1];
// code-addition shape: the legend values + per-equation sums are NOT in the manifest (render-time random) —
// they are baked into deck.html's bundle as "sum":N. Read those directly. "within 20" = max equation sum <= ceiling.
function maxNumInDeckHtml(slug) {
  var f = '/var/www/lcs-media/decks/' + locale + '/' + slug + '/deck.html';
  if (!fs.existsSync(f)) return { missing: true };
  var html; try { html = fs.readFileSync(f, 'utf8'); } catch (e) { return { parseErr: true }; }
  // the equation total is the sum-slot's answer: "slotType":"sum",...,"expected":"N"
  var m, re = /"slotType":"sum"[^}]*?"expected":"(\d+)"/g, max = 0, count = 0;
  while ((m = re.exec(html)) !== null) { count++; var n = parseInt(m[1], 10); if (n > max) max = n; }
  return { max: max, opCount: count };
}
function opNumbers(text, solution) {
  var nums = [];
  if (!RESULTS_ONLY) String(text || '').split(/[-+−×x*\/=]/).forEach(function (t) { var n = parseInt(t.trim(), 10); if (!isNaN(n)) nums.push(n); });
  if (typeof solution === 'number') nums.push(solution);
  return nums;
}
function maxNumInManifest(slug) {
  var f = '/var/www/lcs-media/decks/' + locale + '/' + slug + '/manifest.json';
  if (!fs.existsSync(f)) return { missing: true };
  var d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return { parseErr: true }; }
  var exs = Array.isArray(d.exercises) ? d.exercises : [];
  var max = 0, count = 0;
  exs.forEach(function (ex) {
    // shape 1 (math-puzzle / code-addition): ex.operations[].{text, solution}
    var ops = Array.isArray(ex.operations) ? ex.operations : (Array.isArray(ex) ? ex : []);
    if (ops.length) { ops.forEach(function (op) { count++; opNumbers(op.text, op.solution).forEach(function (n) { if (n > max) max = n; }); }); return; }
    // shape 2 (subtraction / addition): ex.{minuend, subtrahend} or ex.{addends:[...]}/{a,b,sum}
    var nums = [];
    if (!RESULTS_ONLY) {
      if (typeof ex.minuend === 'number') nums.push(ex.minuend);
      if (typeof ex.subtrahend === 'number') nums.push(ex.subtrahend);
      if (Array.isArray(ex.addends)) ex.addends.forEach(function (a) { if (typeof a === 'number') nums.push(a); });
      if (typeof ex.a === 'number') nums.push(ex.a);
      if (typeof ex.b === 'number') nums.push(ex.b);
      // addition.html shape: ex.{operandA, operandB} (the two pictured addends)
      if (typeof ex.operandA === 'number') nums.push(ex.operandA);
      if (typeof ex.operandB === 'number') nums.push(ex.operandB);
    }
    if (typeof ex.minuend === 'number' && typeof ex.subtrahend === 'number') nums.push(ex.minuend - ex.subtrahend);
    if (typeof ex.operandA === 'number' && typeof ex.operandB === 'number') nums.push(ex.operandA + ex.operandB); // addition total (the child-seen sum)
    if (typeof ex.sum === 'number') nums.push(ex.sum);
    if (typeof ex.answer === 'number') nums.push(ex.answer);
    if (typeof ex.total === 'number') nums.push(ex.total);
    if (nums.length) { count++; nums.forEach(function (n) { if (n > max) max = n; }); }
  });
  return { max: max, opCount: count };
}

var clean = [], breach = [], cleanCoords = [], breachCoords = [], problems = [];
coords.forEach(function (co) {
  var decks = (co.siblings && co.siblings.length) ? co.siblings : [co.canonical];
  var coMax = 0, anyMissing = false;
  decks.forEach(function (s) {
    var r = SOURCE === 'deck-html' ? maxNumInDeckHtml(s) : maxNumInManifest(s);
    if (r.missing || r.parseErr) { anyMissing = true; problems.push((co.mode || '') + '/' + co.theme + ':' + s + (r.missing ? ' MISSING' : ' PARSE-ERR')); return; }
    if (r.max > coMax) coMax = r.max;
  });
  var rec = (co.mode ? co.mode + '/' : '') + co.theme + ' (max=' + coMax + (anyMissing ? ', SOME-MANIFEST-MISSING' : '') + ')';
  if (coMax > ceiling) { breach.push(rec); breachCoords.push({ mode: co.mode, theme: co.theme, max: coMax }); }
  else { clean.push({ theme: co.theme, max: coMax }); cleanCoords.push({ mode: co.mode, theme: co.theme, max: coMax }); }
});

// distribution of breach severity
var sev = {};
breach.forEach(function (b) { var m = parseInt(b.match(/max=(\d+)/)[1], 10); var band = m <= 25 ? '21-25' : m <= 30 ? '26-30' : m <= 40 ? '31-40' : '41+'; sev[band] = (sev[band] || 0) + 1; });

console.log(JSON.stringify({
  ceiling: ceiling, totalCoords: coords.length,
  cleanCount: clean.length, breachCount: breach.length, problemCount: problems.length,
  maxCleanNumber: clean.reduce(function (m, c) { return Math.max(m, c.max); }, 0),
  breachSeverity: sev,
  breachList: breach,
  cleanThemes: clean.map(function (c) { return c.theme; }),
  cleanCoords: cleanCoords,
  breachCoords: breachCoords,
  problems: problems
}, null, 2));
