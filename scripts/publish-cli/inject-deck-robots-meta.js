#!/usr/bin/env node
/*
 * inject-deck-robots-meta.js — retrofit the rich-result robots meta into existing
 * baked deck.html files so the indexed (landing-less, self-canonical) deck pages
 * tell Google to show the LARGE worksheet thumbnail in SERP + full text snippet.
 *
 * SEO program Part 1 (2026-06-25): build-seo-head.js now bakes
 *   <meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1">
 * for NEW decks; this backfills the ~45k already-published decks. Harmless on
 * non-canonical decks (Google consolidates to their landing); load-bearing for the
 * ~13k landing-less self-canonical decks (the literal "deck shown with image" case).
 *
 * Inserts the meta immediately AFTER the deck.html's `<link rel="canonical">` line.
 * Idempotent (skips any deck.html already containing name="robots"). Atomic
 * temp+rename. Backing-dir-driven (skips symlink aliases → each deck touched once).
 *
 * Usage (Hetzner):
 *   node scripts/publish-cli/inject-deck-robots-meta.js                 # dry-run
 *   node scripts/publish-cli/inject-deck-robots-meta.js --apply
 *   node scripts/publish-cli/inject-deck-robots-meta.js --locales=en,de --apply
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
var META = '<meta name="robots" content="max-image-preview:large, max-snippet:-1, max-video-preview:-1">';
var CANON_RE = /<link rel="canonical"[^>]*>/;

function main() {
  var apply = process.argv.indexOf('--apply') !== -1;
  var locales = ALL;
  process.argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  });

  var grand = { scanned: 0, injected: 0, already: 0, nocanon: 0 };
  console.log('MODE: ' + (apply ? 'APPLY' : 'DRY-RUN') + '   locales: ' + locales.join(','));

  locales.forEach(function (loc) {
    var dir = path.join(DECKS_ROOT, loc);
    if (!fs.existsSync(dir)) return;
    var c = { scanned: 0, injected: 0, already: 0, nocanon: 0 };
    fs.readdirSync(dir).forEach(function (name) {
      if (name.charAt(0) === '.') return;
      var p = path.join(dir, name);
      var st;
      try { st = fs.lstatSync(p); } catch (e) { return; }
      if (st.isSymbolicLink() || !st.isDirectory()) return; // backing dirs only
      var dh = path.join(p, 'deck.html');
      if (!fs.existsSync(dh)) return;
      c.scanned++;
      var html;
      try { html = fs.readFileSync(dh, 'utf8'); } catch (e) { return; }
      if (html.indexOf('name="robots"') !== -1) { c.already++; return; }
      var m = html.match(CANON_RE);
      if (!m) { c.nocanon++; return; }
      var newHtml = html.replace(m[0], m[0] + '\n  ' + META);
      if (apply) {
        var tmp = dh + '.robots-tmp';
        fs.writeFileSync(tmp, newHtml, 'utf8');
        fs.renameSync(tmp, dh);
      }
      c.injected++;
    });
    ['scanned', 'injected', 'already', 'nocanon'].forEach(function (k) { grand[k] += c[k]; });
    console.log(loc.padEnd(3) + ' scanned=' + c.scanned + ' injected=' + c.injected + ' already=' + c.already + ' no-canonical=' + c.nocanon);
  });

  console.log('TOTAL injected=' + grand.injected + ' already=' + grand.already + ' no-canonical=' + grand.nocanon + ' scanned=' + grand.scanned);
  if (!apply) console.log('(dry-run — re-run with --apply)');
}

main();
