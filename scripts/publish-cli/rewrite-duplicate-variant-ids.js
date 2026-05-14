#!/usr/bin/env node
/**
 * Re-roll variant_ids on staged ZIPs that have collided variant_ids
 * within a (language, theme) tuple. Fixes the §17.8.17 Invariant 1+2
 * (TITLE_NON_UNIQUE / DESC_NON_UNIQUE) HALT class for fresh-roll
 * duplicates whose authoring app re-uses variant_id when re-rolling
 * deck images at the same (exercise_type, exercise_mode, theme).
 *
 * Strategy:
 *   newVariantId = sha1(deck_id + saltOffset).substring(0, 4)
 * Where saltOffset increments until the new variant_id differs from the
 * old one. deck_id is unique per ZIP (carries the 14-char timestamp
 * suffix), so the resulting variant_ids are deterministic + collision-free.
 *
 * Per-ZIP rewrites:
 *   1. manifest.variant_id     ← newVariantId
 *   2. deck.html <title>        — replace " — Set <oldVid> | "  →  " — Set <newVid> | "
 *   3. deck.html <meta desc>    — replace "(Set <oldVid>)"     →  "(Set <newVid>)"
 *   4. deck.html JSON-LD name+desc — same patterns inside JSON
 *   5. deck.html share-affordance var url= — replace -<oldVid> in slug fragment
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-duplicate-variant-ids.js <directory> <failed-zips-list-file> [--dry-run]
 *
 * <failed-zips-list-file> is one ZIP filename per line (e.g., from
 * publish-cli's _failures/ listing).
 */

'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));

function sha1Hex(s) {
  return crypto.createHash('sha1').update(s).digest('hex');
}

function newVariantId(deckId, oldVid) {
  // Produce a 4-char hex variant_id distinct from oldVid by sha1(deckId + i).
  for (var i = 0; i < 100; i++) {
    var v = sha1Hex(deckId + ':v' + i).substring(0, 4);
    if (v !== oldVid) return v;
  }
  // Extreme fallback: 8-char.
  return sha1Hex(deckId + ':alt').substring(0, 8);
}

function patchZip(zipPath, dryRun) {
  var zip = new AdmZip(zipPath);
  var manifestEntry = zip.getEntry('manifest.json');
  var deckEntry = zip.getEntry('deck.html');
  if (!manifestEntry || !deckEntry) return { error: 'missing entries' };

  var manifest = JSON.parse(manifestEntry.getData().toString('utf8'));
  var oldVid = manifest.variant_id;
  var deckId = manifest.deck_id;
  if (!oldVid) return { error: 'no variant_id in manifest' };
  if (!deckId) return { error: 'no deck_id in manifest' };

  var newVid = newVariantId(deckId, oldVid);
  if (newVid === oldVid) return { error: 'newVid same as oldVid (?!)' };

  var html = deckEntry.getData().toString('utf8');
  var beforeOld = (html.match(new RegExp(oldVid, 'g')) || []).length;

  // Replace all occurrences of the variant_id in deck.html
  // (title "Set XXXX", meta desc "(Set XXXX)", JSON-LD same, share URL slug fragment, etc.)
  // Use word-boundary-ish replacement to avoid partial-match false positives on hex collisions.
  // The variant_id is 4 hex chars; use surrounding context patterns:
  //   " Set <vid> "  in title
  //   "(Set <vid>)"  in description
  //   "-<vid>"       in URL slug fragment (e.g., bingo-accesorios-98be)
  //   "Set <vid>"    in JSON-LD escaped strings
  //
  // Safest: replace " <oldVid>" / "<oldVid>)" / "-<oldVid>" patterns.
  var rewrites = [
    ['Set ' + oldVid, 'Set ' + newVid],   // "Set 98be" anywhere
    ['-' + oldVid + '/', '-' + newVid + '/'],  // slug "/bingo-accesorios-98be/"
    ['-' + oldVid + '"', '-' + newVid + '"'],  // slug "bingo-accesorios-98be" inside attribute
    ['"' + oldVid + '"', '"' + newVid + '"']   // bare quoted "98be" — JSON variant_id field
  ];
  for (var i = 0; i < rewrites.length; i++) {
    html = html.split(rewrites[i][0]).join(rewrites[i][1]);
  }

  manifest.variant_id = newVid;

  if (dryRun) {
    return { ok: true, dryRun: true, oldVid: oldVid, newVid: newVid, deckId: deckId, replacements: beforeOld };
  }

  var newHtml = Buffer.from(html, 'utf8');
  var newManifest = Buffer.from(JSON.stringify(manifest, null, 2), 'utf8');
  zip.updateFile(manifestEntry, newManifest);
  zip.updateFile(deckEntry, newHtml);
  var tmp = zipPath + '.tmp';
  zip.writeZip(tmp);
  fs.renameSync(tmp, zipPath);
  return { ok: true, oldVid: oldVid, newVid: newVid, deckId: deckId };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = false;
  var dir = null, listFile = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--dry-run') { dryRun = true; continue; }
    if (dir === null) { dir = args[i]; continue; }
    if (listFile === null) { listFile = args[i]; continue; }
  }
  if (!dir || !listFile) {
    console.error('USAGE: node ... <dir> <list-file> [--dry-run]');
    process.exit(2);
  }
  var zips = fs.readFileSync(listFile, 'utf8').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
  console.log('Mode:', dryRun ? 'DRY-RUN' : 'APPLY');
  console.log('Dir:', dir);
  console.log('ZIPs to patch:', zips.length);
  console.log('');
  var ok = 0, errored = 0;
  zips.forEach(function (f, idx) {
    var p = path.join(dir, f);
    if (!fs.existsSync(p)) { console.error('MISSING:', f); errored++; return; }
    var r = patchZip(p, dryRun);
    if (r.error) { console.error('ERROR ' + f + ':', r.error); errored++; return; }
    ok++;
    if ((idx + 1) % 20 === 0 || idx + 1 === zips.length) {
      console.log('[' + (idx + 1) + '/' + zips.length + '] ' + f + ' | ' + r.oldVid + ' → ' + r.newVid);
    }
  });
  console.log('');
  console.log('=== Summary ===');
  console.log('  patched: ' + ok);
  console.log('  errored: ' + errored);
}

if (require.main === module) main();
