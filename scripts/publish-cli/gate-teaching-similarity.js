#!/usr/bin/env node
/**
 * Near-duplicate gate for teaching blocks.
 *
 * WHY BOTH MEASUREMENTS
 * A block can be unique in isolation and still leave two pages near-identical, because the
 * rest of a deck page is ~130 words of shared chrome. And two blocks can be near-identical
 * while their pages differ, which is still a defect: the block is the only part of the page
 * a search engine has not already seen a thousand times. So this measures BOTH:
 *
 *   block-only   the rendered block text, block against block
 *   whole-page   the block appended to the page's existing visible text
 *
 * Metric is RAW word-3-gram Jaccard, the same one §22.1 uses for landing pages, at the same
 * thresholds: FAIL >= 0.80, WARN >= 0.65. Raw, not slot-normalised — the point here is what a
 * reader actually sees, and normalising away the numbers would hide exactly the duplication
 * this is looking for.
 *
 * Comparison is ALL-PAIRS WITHIN A SHAPE GROUP, not all-pairs globally. Two decks of different
 * modes are not at risk and comparing them wastes O(n^2) on a question nobody asked. Decks
 * sharing a (block1-shape, block3-shape) tuple are the ones the generator could have collided.
 *
 * READ-ONLY. Never writes a deck.
 *
 * Usage:
 *   node gate-teaching-similarity.js --blocks=<blocks.json> --locale=de [--pages] [--top=20]
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var FAIL = 0.80;
var WARN = 0.65;

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function grams(text) {
  var w = text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  var s = new Set();
  for (var i = 0; i + 2 < w.length; i++) s.add(w[i] + ' ' + w[i + 1] + ' ' + w[i + 2]);
  return s;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  var inter = 0;
  a.forEach(function (g) { if (b.has(g)) inter++; });
  return inter / (a.size + b.size - inter);
}

/** The page as it will exist AFTER injection: current visible text plus the new block. */
function pageTextWithBlock(locale, slug, blockHtml) {
  var link = path.join(DECKS_ROOT, locale, slug);
  var target;
  try { target = fs.readlinkSync(link); } catch (e) { return null; }
  var dir = path.isAbsolute(target) ? target : path.join(DECKS_ROOT, locale, target);
  var p = path.join(dir, 'deck.html');
  if (!fs.existsSync(p)) return null;
  var html = fs.readFileSync(p, 'utf8');
  // strip any block already there, so a re-run measures the NEW copy, not the old plus new
  var s = html.indexOf('<!-- TEACHING_BLOCK_START -->');
  var e = html.indexOf('<!-- TEACHING_BLOCK_END -->');
  if (s !== -1 && e > s) html = html.slice(0, s) + html.slice(e);
  return visibleText(html) + ' ' + visibleText(blockHtml);
}

function report(label, pairs, top) {
  var fails = pairs.filter(function (p) { return p.j >= FAIL; });
  var warns = pairs.filter(function (p) { return p.j >= WARN && p.j < FAIL; });
  pairs.sort(function (a, b) { return b.j - a.j; });
  console.log('  ' + label + ': ' + pairs.length + ' pairs compared   max ' +
    (pairs[0] ? pairs[0].j.toFixed(3) : 'n/a') + '   FAIL ' + fails.length + '   WARN ' + warns.length);
  pairs.slice(0, top).forEach(function (p) {
    if (p.j < WARN) return;
    console.log('     ' + p.j.toFixed(3) + '  ' + p.a + '  ~  ' + p.b);
  });
  return fails.length;
}

function main() {
  var argv = process.argv.slice(2);
  function arg(n, d) {
    var h = argv.find(function (a) { return a.indexOf('--' + n + '=') === 0; });
    return h ? h.split('=').slice(1).join('=') : d;
  }
  var locale = arg('locale', 'de');
  var blocksPath = arg('blocks', '/tmp/teaching-blocks-' + locale + '.json');
  var top = parseInt(arg('top', '10'), 10);
  var doPages = argv.indexOf('--pages') !== -1;

  var blocks = JSON.parse(fs.readFileSync(blocksPath, 'utf8'));
  var slugs = Object.keys(blocks);

  // group by generator shape: only same-shape decks could have collided
  var groups = {};
  slugs.forEach(function (s) {
    var sh = blocks[s].shapes || {};
    var key = (sh.block1 || '?') + '|' + (sh.block3 || '?');
    (groups[key] = groups[key] || []).push(s);
  });

  console.log(locale + ' — ' + slugs.length + ' blocks in ' + Object.keys(groups).length + ' shape groups');

  var blockPairs = [], pagePairs = [];
  Object.keys(groups).forEach(function (key) {
    var g = groups[key];
    var bg = g.map(function (s) { return grams(visibleText(blocks[s].html)); });
    var pg = doPages ? g.map(function (s) {
      var t = pageTextWithBlock(locale, s, blocks[s].html);
      return t ? grams(t) : null;
    }) : null;
    for (var i = 0; i < g.length; i++) {
      for (var k = i + 1; k < g.length; k++) {
        blockPairs.push({ a: g[i], b: g[k], j: jaccard(bg[i], bg[k]) });
        if (pg && pg[i] && pg[k]) pagePairs.push({ a: g[i], b: g[k], j: jaccard(pg[i], pg[k]) });
      }
    }
  });

  var failed = report('block-only', blockPairs, top);
  if (doPages) failed += report('whole-page', pagePairs, top);

  console.log(failed ? '  FAIL — ' + failed + ' pair(s) at or above ' + FAIL : '  PASS — no pair at or above ' + FAIL);
  process.exit(failed ? 1 : 0);
}

if (require.main === module) main();
module.exports = { grams: grams, jaccard: jaccard, visibleText: visibleText };
