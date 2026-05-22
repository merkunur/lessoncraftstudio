#!/usr/bin/env node
/* =====================================================================
   build-inventory.js
   ---------------------------------------------------------------------
   Walks /var/www/lcs-media/audio/ (or --root <path>) and writes an
   inventory.json the runtime LCSAudio loader reads at activity-load
   time. Idempotent; safe to run after every operator upload batch.

   Shape (matches mini tools/lcs-shell.js LCSAudio expectations):
     {
       "schema_version": "1.0",
       "generated_at": "<iso>",
       "audio": {
         "<lang>": {
           "word":     ["casa","gato",...],
           "syllable": ["ca","sa",...],
           "ui":       ["haz-5","cuantos-hay",...],
           "number":   []
         },
         ...
       }
     }

   Each entry is the SLUG of the recorded text (filename without .mp3).
   The runtime constructs URLs as `/audio/<lang>/<type>/<slug>.mp3`.

   Usage (typically on Hetzner):
     node build-inventory.js --root /var/www/lcs-media/audio --out inventory.json

   Output `inventory.json` should be written into the audio root itself
   so it's served at `/audio/inventory.json` — that's where the runtime
   fetches it. nginx should serve it with Cache-Control: no-cache so
   newly-uploaded recordings appear after a soft refresh.

   Per CLAUDE.md §A.3, this script does NOT add audio files to git;
   it only reads the filesystem and writes inventory.json.
   ===================================================================== */
'use strict';

var fs   = require('fs');
var path = require('path');

var argv = process.argv.slice(2);
function arg(flag, fallback) {
  var i = argv.indexOf(flag);
  if (i >= 0 && i + 1 < argv.length) return argv[i + 1];
  return fallback;
}

var root = arg('--root', '/var/www/lcs-media/audio');
var out  = arg('--out',  path.join(root, 'inventory.json'));

if (!fs.existsSync(root)) {
  process.stderr.write('audio root does not exist: ' + root + '\n');
  process.stderr.write('create it with: mkdir -p ' + root + '\n');
  process.exit(1);
}

var LOCALES = ['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
var TYPES   = ['word','syllable','ui','number'];

function listDir(p) {
  try { return fs.readdirSync(p, { withFileTypes: true }); }
  catch (_) { return []; }
}

var audio = {};
var totals = { langs: 0, files: 0 };

LOCALES.forEach(function (lang) {
  var langDir = path.join(root, lang);
  if (!fs.existsSync(langDir)) return;
  var perType = {};
  var emptyLang = true;

  TYPES.forEach(function (type) {
    var typeDir = path.join(langDir, type);
    if (!fs.existsSync(typeDir)) { perType[type] = []; return; }
    var entries = listDir(typeDir)
      .filter(function (d) { return d.isFile() && /\.mp3$/i.test(d.name); })
      .map(function (d) { return d.name.replace(/\.mp3$/i, ''); })
      .sort();
    perType[type] = entries;
    if (entries.length > 0) { emptyLang = false; totals.files += entries.length; }
  });

  if (!emptyLang) {
    audio[lang] = perType;
    totals.langs++;
  }
});

var doc = {
  schema_version: '1.0',
  generated_at: new Date().toISOString(),
  audio: audio
};

fs.writeFileSync(out, JSON.stringify(doc, null, 2) + '\n', 'utf8');
process.stdout.write('Wrote inventory: ' + out + '\n');
process.stdout.write('  languages with recordings: ' + totals.langs + '\n');
process.stdout.write('  total recorded units:      ' + totals.files + '\n');
