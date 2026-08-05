#!/usr/bin/env node
'use strict';
/**
 * Poison + control for audit-deck-html.js Check 18 (embed iframe src).
 *
 * Drives the REAL runChecksForDeck() in memory — no database, no filesystem —
 * so the assertion is proven on the actual code path a wave runs, not on a
 * reimplementation of it. A gate that has never been observed failing is
 * indistinguishable from one that cannot fail.
 *
 * Usage: node scripts/publish-cli/test-audit-embed-check.js
 * Exit 0 all pass · 1 a poison survived.
 */
var audit = require('./audit-deck-html');
var crypto = require('crypto');

var LOC = 'en', SLUG = 'addition-animals';
var DECK = 'https://www.lessoncraftstudio.com/' + LOC + '/decks/' + SLUG + '/';

function sha1n(s) {
  var n = String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  return n ? crypto.createHash('sha1').update(n).digest('hex') : null;
}

var TITLE = 'Addition Worksheet';
var DESC = 'A description that is long enough to be plausible for a deck page meta description field here.';

/** Minimal deck.html carrying the fragments Check 18 reads. */
function deckHtml(iframeSrc, extra) {
  return '<!doctype html><html lang="' + LOC + '"><head>' +
    '<title>' + TITLE + '</title>' +
    '<meta name="description" content="' + DESC + '">' +
    '<link rel="canonical" href="' + DECK + '">' +
    '</head><body>' +
    (extra || '') +
    '<script>(function(){' +
    'var snippet=document.getElementById("lcs-embed-snippet");' +
    'function buildSnippet(){var lines=[];' +
    "lines.push('  <iframe id=\"'+iframeId+'\" src=\"" + iframeSrc + "\" frameborder=\"0\"></iframe>');" +
    '}})();</script></body></html>';
}

function newCtx() {
  return { titleHashSetByLocale: {}, descriptionHashSetByLocale: {}, taxonomy: null };
}
var dbDeck = {
  id: 'deck-1', slug: SLUG, language: LOC,
  titleHash: sha1n(TITLE), descriptionHash: sha1n(DESC),
};

var fails = [];
function run(name, html, wantDefect) {
  return audit.runChecksForDeck(dbDeck, html, null, newCtx()).then(function (row) {
    // ⚠ The field is `defectClasses`, not `defects`. Reading the wrong one made
    // every poison look like a survivor while check 18 was firing perfectly.
    var has = (row.defectClasses || []).indexOf('EMBED_IFRAME_SRC_NOT_DECK_URL') !== -1;
    var ok = wantDefect ? has : !has;
    console.log('  ' + (ok ? 'pass ' : 'FAIL ') + name +
      '  [check18=' + JSON.stringify(row.checks && row.checks.embedIframeSrc) + ']');
    if (!ok) fails.push(name);
  });
}

(async function () {
  console.log('=== controls: valid shapes must NOT fire ===');
  // (a) retrofitted deck: baked literal
  await run('literal deck-dir src is clean', deckHtml(DECK), false);
  // (b) newly generated deck: resolved via its own var
  await run("'+embedSrc+' resolved to the deck dir is clean",
    deckHtml("'+embedSrc+'", '<script>var embedSrc="' + DECK + '";</script>'), false);
  // (c) a deck with no embed affordance at all must SKIP, not fail
  await run('no embed affordance skips cleanly',
    '<!doctype html><html lang="en"><head><title>' + TITLE + '</title>' +
    '<meta name="description" content="' + DESC + '"></head><body>nothing</body></html>', false);

  console.log('=== poison: each way it can be wrong must fire ===');
  await run('src still follows the canonical (the shipped defect)', deckHtml("'+url+'"), true);
  await run('src points at the landing page',
    deckHtml('https://www.lessoncraftstudio.com/en/worksheets/addition-animals'), true);
  await run('src points at a DIFFERENT deck',
    deckHtml('https://www.lessoncraftstudio.com/en/decks/some-other-deck/'), true);
  await run("'+embedSrc+' whose var holds the wrong deck",
    deckHtml("'+embedSrc+'", '<script>var embedSrc="https://www.lessoncraftstudio.com/en/decks/wrong/";</script>'), true);
  await run("'+embedSrc+' with no var to resolve",
    deckHtml("'+embedSrc+'"), true);
  // The decoy: a correct-looking deck URL EARLIER in the document must not
  // rescue a wrong iframe src.
  await run('wrong src hidden behind an earlier correct-looking URL',
    deckHtml('https://www.lessoncraftstudio.com/en/decks/decoy/', '<img src="' + DECK + 'thumbnail.png">'), true);

  console.log('');
  if (fails.length) { console.log('POISON FAILED — ' + fails.length + ' survived: ' + fails.join(' | ')); process.exit(1); }
  console.log('CHECK 18 POISON PASSED — fires on every wrong shape, silent on both valid ones.');
})().catch(function (e) { console.error('harness error: ' + e.message); process.exit(2); });
