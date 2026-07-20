#!/usr/bin/env node
/**
 * Harvest the child-facing instruction each deck already carries, per (type, mode, locale).
 *
 * WHY THIS IS WORTH HAVING
 * The picture-arithmetic sheets come in eight modes, and the mode names in the manifest
 * (`image-number`, `find-addend`, `cross-out`) do not say what the child actually DOES.
 * Guessing that from a label is the exact mistake that started this whole piece of work.
 *
 * But the product already knows. Every deck.html carries a one-line instruction, natively
 * localised in all 11 languages — `Streiche Bilder durch und finde die Antwort!`,
 * `Yliviivaa kuvat ja etsi vastaus!`. That is a native description of the task, written by
 * the people who built the worksheet, in the right language, for free.
 *
 * WHAT IT IS NOT
 * These are CHILD-facing imperatives ending in exclamation marks. Every practitioner in this
 * project banned exclamation marks and child register in teacher-facing copy. So this table
 * is GROUNDING for the native reviewers — it tells them (and me) exactly what each mode is —
 * and must never be pasted into a teaching block.
 *
 * READ-ONLY.
 *
 * Usage: node extract-mode-instructions.js [--out=/tmp/mode-instructions.json]
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DECKS = '/var/www/lcs-media/decks';
var LOCALES = ['en', 'de', 'nl', 'fr', 'es', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
var TYPES = ['addition', 'subtraction'];

/**
 * The instruction is a short sentence in the body. Everything that looks like machinery —
 * script fragments, the sr-only "Question 1: 5 minus 1 equals blank." rows, class names —
 * is excluded. The sr-row exclusion has to be language-aware, which is why the per-locale
 * question words are listed rather than matched loosely.
 */
var SR_ROW = /^(Question|Frage|Vraag|Question|Pregunta|Domanda|Pergunta|Fråga|Spørgsmål|Spørsmål|Kysymys)\b/i;

function readInstruction(deckHtmlPath) {
  var html;
  try { html = fs.readFileSync(deckHtmlPath, 'utf8'); } catch (e) { return null; }
  var body = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  var candidates = body.match(/>([^<>{}"]{15,140}[!.])</g) || [];
  for (var i = 0; i < candidates.length; i++) {
    var text = candidates[i].slice(1, -1).trim();
    if (/function|var |=>|lcs-|http|\{|\}/.test(text)) continue;
    if (SR_ROW.test(text)) continue;
    return text;
  }
  return null;
}

function main() {
  var args = process.argv.slice(2);
  var outFlag = args.find(function (a) { return a.indexOf('--out=') === 0; });
  var outPath = outFlag ? outFlag.split('=')[1] : '/tmp/mode-instructions.json';

  var table = {};
  var counts = {};

  LOCALES.forEach(function (locale) {
    table[locale] = {};
    counts[locale] = {};
    var dir = path.join(DECKS, locale);
    var entries;
    try { entries = fs.readdirSync(dir); } catch (e) { return; }
    entries.forEach(function (name) {
      if (!/-v\d+$/.test(name)) return;
      var manifestPath = path.join(dir, name, 'manifest.json');
      if (!fs.existsSync(manifestPath)) return;
      var m;
      try { m = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch (e) { return; }
      if (TYPES.indexOf(m.exercise_type) === -1) return;
      var key = m.exercise_type + '/' + (m.exercise_mode || 'null');
      counts[locale][key] = (counts[locale][key] || 0) + 1;
      if (table[locale][key]) return;
      var instruction = readInstruction(path.join(dir, name, 'deck.html'));
      if (instruction) table[locale][key] = instruction;
    });
  });

  fs.writeFileSync(outPath, JSON.stringify({ table: table, counts: counts }, null, 1));

  var modes = {};
  LOCALES.forEach(function (l) { Object.keys(counts[l] || {}).forEach(function (k) { modes[k] = true; }); });
  var modeList = Object.keys(modes).sort();
  console.log('modes found: ' + modeList.length);
  modeList.forEach(function (k) { console.log('   ' + k); });
  console.log('');
  console.log('instruction coverage per locale:');
  LOCALES.forEach(function (l) {
    var have = Object.keys(table[l] || {}).length;
    var total = Object.keys(counts[l] || {}).length;
    var decks = Object.keys(counts[l] || {}).reduce(function (a, k) { return a + counts[l][k]; }, 0);
    console.log('   ' + l + '  ' + have + '/' + total + ' modes    ' + decks + ' decks');
  });
  console.log('-> ' + outPath);
}

if (require.main === module) main();
module.exports = { readInstruction: readInstruction };
