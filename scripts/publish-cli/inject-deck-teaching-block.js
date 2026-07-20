#!/usr/bin/env node
/**
 * Inject the per-deck teaching block into published deck.html files.
 *
 * A deck page carries ~130 visible words, of which the only real content is screen-reader
 * text reading `Frage 1: 4 + 4 Leerzeichen.` Nothing tells a teacher what the sheet
 * practises, what number range it stays inside, or how to use it. This writes that in.
 *
 * Architecturally a sibling of inject-deck-end-topic-links.js and inject-deck-end-strip.js:
 * same symlink walk, same atomic .tmp+rename, same idempotency, same per-locale summary,
 * NO DB dependency. Content comes from build-teaching-blocks.js, which has already been
 * fact-traced (verify-teaching-block.js) and similarity-gated — this script only writes.
 *
 * ADDITIVE ONLY. It touches no title, description, canonical, slug or URL, so it sits
 * outside the §21.5a churn freeze: the freeze exists because mass IDENTITY rewrites restart
 * Google's evaluation, and adding substance to a thin page is the opposite of that.
 *
 * REVERSIBLE TWO WAYS. The marker pair removes the block exactly (--remove), and a .bak is
 * written beside the file on first application.
 *
 * Usage:
 *   node inject-deck-teaching-block.js --blocks=<blocks.json> --locale=de [--dry-run]
 *                                      [--limit=N] [--remove] [--holdout=0.3] [--seed=N]
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var START = '<!-- TEACHING_BLOCK_START -->';
var END = '<!-- TEACHING_BLOCK_END -->';

/* Anchors, in preference order. The block belongs after the worksheet and its action bar,
 * before the outbound link sections — so a reader meets the sheet, then what it teaches,
 * then where to go next. `lcs-footer` is NOT an anchor: it is the Check/Reset action bar,
 * and inserting before it would split the worksheet from its own button. */
var ANCHORS = ['<aside class="lcs-end-deck"', '<section class="lcs-deckend-suggestions"', '</body>'];

function findAnchor(html) {
  for (var i = 0; i < ANCHORS.length; i++) {
    var at = html.indexOf(ANCHORS[i]);
    if (at !== -1) return { at: at, anchor: ANCHORS[i] };
  }
  return null;
}

/** Atomic: a half-written deck.html would be served to real visitors. */
function atomicWrite(filePath, content) {
  var tmp = filePath + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, filePath);
}

function stripBlock(html) {
  var s = html.indexOf(START);
  var e = html.indexOf(END);
  if (s === -1 || e === -1 || e < s) return null;
  var before = html.slice(0, s);
  var after = html.slice(e + END.length);
  // also drop the newline we inserted with it, so removal is byte-exact
  return before + after.replace(/^\n/, '');
}

/**
 * Returns { changed, content } | { alreadyApplied } | { error }.
 * Re-running with changed copy REPLACES the old block rather than stacking a second one.
 */
function injectIntoDeckHtml(html, blockHtml) {
  var existing = html.indexOf(START) !== -1;
  var base = html;
  if (existing) {
    var stripped = stripBlock(html);
    if (stripped === null) return { error: 'START marker present but END missing' };
    if (html.indexOf(blockHtml) !== -1) return { alreadyApplied: true };
    base = stripped;
  }
  var anchor = findAnchor(base);
  if (!anchor) return { error: 'no insertion anchor found' };
  var content = base.slice(0, anchor.at) + blockHtml + '\n' + base.slice(anchor.at);
  return { changed: true, content: content, replaced: existing };
}

/* Deterministic holdout so the effect can be measured rather than assumed. Hashing the slug
 * keeps membership stable across runs and independent of ordering. */
function inHoldout(slug, fraction, seed) {
  if (!fraction) return false;
  var h = seed || 0;
  for (var i = 0; i < slug.length; i++) { h = ((h * 31) + slug.charCodeAt(i)) >>> 0; }
  return (h % 1000) / 1000 < fraction;
}

function processDeck(locale, slug, blockHtml, opts) {
  var symlinkPath = path.join(DECKS_ROOT, locale, slug);
  var stat;
  try { stat = fs.lstatSync(symlinkPath); } catch (e) { return { error: 'lstat: ' + e.message }; }
  if (!stat.isSymbolicLink()) return { error: 'not a symlink (skipped)' };

  var target = fs.readlinkSync(symlinkPath);
  var deckDir = path.isAbsolute(target) ? target : path.join(DECKS_ROOT, locale, target);
  var deckHtmlPath = path.join(deckDir, 'deck.html');
  if (!fs.existsSync(deckHtmlPath)) return { error: 'no deck.html at ' + deckHtmlPath };

  var html = fs.readFileSync(deckHtmlPath, 'utf8');

  if (opts.remove) {
    var stripped = stripBlock(html);
    if (stripped === null) return { alreadyApplied: true };  // nothing to remove
    if (!opts.dryRun) atomicWrite(deckHtmlPath, stripped);
    return { removed: true };
  }

  var result = injectIntoDeckHtml(html, blockHtml);
  if (result.error) return { error: result.error };
  if (result.alreadyApplied) return { alreadyApplied: true };

  if (!opts.dryRun) {
    var bak = deckHtmlPath + '.bak.teaching-block';
    if (!fs.existsSync(bak)) fs.copyFileSync(deckHtmlPath, bak);
    atomicWrite(deckHtmlPath, result.content);
  }
  return { applied: true, replaced: result.replaced };
}

function main() {
  var argv = process.argv.slice(2);
  function arg(n, d) {
    var h = argv.find(function (a) { return a.indexOf('--' + n + '=') === 0; });
    return h ? h.split('=').slice(1).join('=') : d;
  }
  var flag = function (n) { return argv.indexOf('--' + n) !== -1; };

  var locale = arg('locale', 'de');
  var blocksPath = arg('blocks', '/tmp/teaching-blocks-' + locale + '.json');
  var limit = parseInt(arg('limit', '0'), 10);
  var holdout = parseFloat(arg('holdout', '0')) || 0;
  var seed = parseInt(arg('seed', '1'), 10);
  var opts = { dryRun: flag('dry-run'), remove: flag('remove') };

  var blocks = JSON.parse(fs.readFileSync(blocksPath, 'utf8'));
  var slugs = Object.keys(blocks);
  if (limit) slugs = slugs.slice(0, limit);

  var applied = 0, already = 0, removed = 0, held = 0, failed = 0;
  var failures = [];
  var heldSlugs = [];

  slugs.forEach(function (slug) {
    if (!opts.remove && inHoldout(slug, holdout, seed)) { held++; heldSlugs.push(slug); return; }
    var r = processDeck(locale, slug, blocks[slug].html, opts);
    if (r.error) { failed++; failures.push(slug + ': ' + r.error); }
    else if (r.applied) applied++;
    else if (r.removed) removed++;
    else if (r.alreadyApplied) already++;
  });

  console.log((opts.dryRun ? '[DRY RUN] ' : '') + locale + ' — ' + slugs.length + ' decks');
  if (opts.remove) console.log('  removed:          ' + removed);
  else console.log('  applied:          ' + applied);
  console.log('  already current:  ' + already);
  if (holdout) console.log('  holdout (' + Math.round(holdout * 100) + '%): ' + held + ' left untouched for measurement');
  console.log('  failed:           ' + failed);
  failures.slice(0, 20).forEach(function (f) { console.log('    - ' + f); });

  if (heldSlugs.length) {
    /* The holdout list is keyed by the BLOCKS FILE, not just the locale.
     *
     * It was `/tmp/teaching-holdout-<locale>.json`, so injecting a second deck type for the
     * same locale silently overwrote the first type's record. Membership itself is a
     * deterministic hash of the slug and was never wrong, so nothing was mis-held — but the
     * measurement record is the whole point of holding decks back, and losing it would mean
     * discovering at week 8 that we cannot tell which pages were the control. */
    var tag = path.basename(blocksPath).replace(/\.json$/, '');
    var hp = '/tmp/teaching-holdout-' + tag + '.json';
    if (!opts.dryRun) fs.writeFileSync(hp, JSON.stringify(heldSlugs, null, 1));
    console.log('  holdout list -> ' + hp);
  }
  process.exit(failed ? 1 : 0);
}

if (require.main === module) main();
module.exports = { injectIntoDeckHtml: injectIntoDeckHtml, stripBlock: stripBlock, inHoldout: inHoldout };
