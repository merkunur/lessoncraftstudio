#!/usr/bin/env node
/*
 * gen-old-slug-redirects.js — recover the old→new deck-slug map from the live
 * symlink layout under /var/www/lcs-media/decks/ and emit an nginx map file.
 *
 * After the native-slug migration each version dir `<new>-vN` has TWO symlinks:
 * the NEW native slug (self: name === new) and the OLD English-token slug
 * (re-pointed: name !== new). This walks every locale dir and, for each symlink
 * whose name !== its target's `-vN`-stripped slug AND whose new slug resolves,
 * emits a 301 mapping old→new (both trailing-slash and no-slash key forms).
 *
 * Read-only against the catalog; writes only the two artifact files below.
 *   /opt/lessoncraftstudio/old-slug-redirects.map   (nginx `map $uri` body)
 *   /opt/lessoncraftstudio/old-slug-pairs.txt        (loc|old|new, for sampling)
 *
 * Usage (on Hetzner):  node scripts/publish-cli/gen-old-slug-redirects.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = '/var/www/lcs-media/decks';
const HOST = 'https://www.lessoncraftstudio.com';
const MAP_OUT = '/opt/lessoncraftstudio/old-slug-redirects.map';
const PAIRS_OUT = '/opt/lessoncraftstudio/old-slug-pairs.txt';

function isDir(p) { try { return fs.statSync(p).isDirectory(); } catch (e) { return false; } }

const locales = fs.readdirSync(ROOT).filter(function (l) { return l[0] !== '.' && isDir(path.join(ROOT, l)); });
const mapLines = [];
const pairs = [];
const perLocale = {};
let dangling = 0;

locales.forEach(function (loc) {
  const dir = path.join(ROOT, loc);
  let entries;
  try { entries = fs.readdirSync(dir); } catch (e) { return; }
  let n = 0;
  entries.forEach(function (name) {
    if (name[0] === '.') return;
    const p = path.join(dir, name);
    let st;
    try { st = fs.lstatSync(p); } catch (e) { return; }
    if (!st.isSymbolicLink()) return;
    let target;
    try { target = fs.readlinkSync(p); } catch (e) { return; }
    const newSlug = target.replace(/\/+$/, '').replace(/-v\d+$/, '');
    if (name === newSlug) return;                 // self (new native slug)
    if (!fs.existsSync(path.join(dir, newSlug))) { dangling++; return; } // target gone → skip
    const newUrl = HOST + '/' + loc + '/decks/' + newSlug + '/';
    mapLines.push('"/' + loc + '/decks/' + name + '/" "' + newUrl + '";');
    mapLines.push('"/' + loc + '/decks/' + name + '" "' + newUrl + '";');
    pairs.push(loc + '|' + name + '|' + newSlug);
    n++;
  });
  perLocale[loc] = n;
});

fs.writeFileSync(MAP_OUT, mapLines.join('\n') + '\n');
fs.writeFileSync(PAIRS_OUT, pairs.join('\n') + '\n');
console.log('per-locale old-slug count: ' + JSON.stringify(perLocale));
console.log('total old slugs: ' + pairs.length + ' | map lines: ' + mapLines.length + ' | skipped dangling: ' + dangling);
console.log('wrote: ' + MAP_OUT + ' , ' + PAIRS_OUT);
