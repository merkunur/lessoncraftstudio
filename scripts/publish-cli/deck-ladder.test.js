#!/usr/bin/env node
/**
 * deck-ladder.test.js — build-failing guard for the deck-page ladder strip
 * (scripts/lib/deck-ladder.js + inject-deck-ladder.js). Wired into deploy.sh
 * next to deck-actions.test.js.
 *
 *  1. strings ×11 — every `deckLadder.*` + `levelSets.core/setWord/heading` key
 *     present and non-empty in every locale, and the easy/hard level words in
 *     the taxonomy (a miss would silently fall back to English on a non-English
 *     deck). No price claim in any of them.
 *  2. route drift — the set route (`/<loc>/worksheets/sets/<code>`) and the
 *     sets index page exist in frontend/app; the strip freezes the URL into
 *     ~100k static files.
 *  3. the model — variant ids, rungs, eligibility (≥2 pages), ordering, and
 *     parity with frontend/lib/level-sets.ts on the same facts.
 *  4. round trip on a synthetic worksheet-gen deck.html — inject → idempotent
 *     → changed siblings re-emit → 5× --rewrite byte-identical → --remove
 *     restores the original byte-for-byte; a deck with no ladder loses a stale
 *     block.
 *  5. poison — the anchor literal appears in <head> CSS too; injecting there
 *     would put a <nav> inside <head>. Prove the guard fires. And a deck whose
 *     slug is not in the ladder must be refused, not mis-labelled.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var lib = require('../lib/deck-ladder');
var injector = require('./inject-deck-ladder');

var pass = 0, fail = 0;
function ok(cond, label, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  — ' + detail : '')); }
}

/* 1. strings */
console.log('1. strings ×11');
var PRICE = /\b(free|gratis|gratuit|gratuito|grátis|kostenlos|ilmai)/i;
lib.LOCALES.forEach(function (loc) {
  var s = lib.strings(loc);
  var msgs = JSON.parse(fs.readFileSync(path.join(lib.MESSAGES_DIR, loc + '.json'), 'utf8'));
  var missing = Object.keys(lib.STRING_SPEC).filter(function (k) {
    var v = lib.STRING_SPEC[k].key.split('.').reduce(function (a, p) { return a && a[p]; }, msgs);
    return typeof v !== 'string' || !v;
  });
  ok(missing.length === 0, loc + ' has every strip string', missing.join(','));
  ok(!Object.keys(s).some(function (k) { return PRICE.test(s[k]); }), loc + ' strip strings carry no price claim');
  ok(/\{n\}/.test(s.levelOf) && /\{total\}/.test(s.levelOf), loc + ' levelOf carries {n} and {total}');
  ok(lib.rungWord('easy', loc) && lib.rungWord('hard', loc) && lib.rungWord('core', loc), loc + ' has all three level words');
});

/* 2. route drift */
console.log('2. route drift');
var APP = path.join(lib.REPO_ROOT, 'frontend', 'app', '[locale]', 'worksheets');
ok(fs.existsSync(path.join(APP, lib.SETS_SEGMENT, '[code]', 'page.tsx')), 'set page route exists at /worksheets/' + lib.SETS_SEGMENT + '/[code]');
ok(fs.existsSync(path.join(APP, lib.SETS_SEGMENT, 'page.tsx')), 'sets index route exists');
ok(lib.setUrl('de', 'g1245') === 'https://www.lessoncraftstudio.com/de/worksheets/sets/g1245', 'set URL is www + locale + no trailing slash');
ok(lib.deckUrl('de', 'x-g1245') === 'https://www.lessoncraftstudio.com/de/decks/x-g1245/', 'deck URL keeps the nginx trailing slash');

/* 3. the model */
console.log('3. the model');
ok(JSON.stringify(lib.parseVariantId('g1245-3')) === '{"code":"g1245","copy":3}', 'variant id with copy');
ok(JSON.stringify(lib.parseVariantId('k002')) === '{"code":"k002","copy":1}', 'variant id copy 1');
ok(lib.parseVariantId('find-addend') === null, 'an app mode is not a variant id');
ok(lib.parseSlugCode('alphabetical-order-easy-tools-g1245-3').code === 'g1245', 'slug tail fallback');
ok(lib.rungOf(null) === 'core' && lib.rungOf('easy') === 'easy' && lib.rungOf('hard') === 'hard' && lib.rungOf('find-addend') === null, 'rungs');
function mf(vid, mode, theme, idx) { return { language: 'en', exercise_type: 'alphabetical-order', exercise_mode: mode, variant_id: vid, theme: theme, indexable: idx, title: { en: 'ABC Order' } }; }
var facts = [
  lib.factsOf(mf('g1245', null, 'animals', true), 'abc-animals-g1245'),
  lib.factsOf(mf('g1245-3', null, 'camping', false), 'abc-camping-g1245-3'),
  lib.factsOf(mf('g1245', 'easy', 'tools', false), 'abc-easy-tools-g1245'),
  lib.factsOf(mf('g1245-5', 'easy', 'beach', false), 'abc-easy-beach-g1245-5'),
  lib.factsOf(mf('g1245-2', 'hard', 'fruits', false), 'abc-hard-fruits-g1245-2'),
  lib.factsOf(mf('g1262', null, 'animals', true), 'abc-number-animals-g1262'),   // lone page → no ladder
  lib.factsOf({ exercise_mode: 'find-addend', generator: { app: 'addition' } }, 'addition-find-addend-animals'),   // app → null
];
var ladders = lib.buildLadders(facts);
ok(ladders.size === 1 && ladders.has('g1245'), 'one ladder (lone page + app deck excluded)', 'size=' + ladders.size);
var L = ladders.get('g1245');
ok(L.pages.core[0].slug === 'abc-animals-g1245' && L.pages.core[1].slug === 'abc-camping-g1245-3', 'core: published first, then copies');
ok(L.pages.easy.map(function (p) { return p.copy; }).join() === '1,5' && L.pages.hard.length === 1, 'easy/hard by copy');
ok(lib.pageLabel(L.pages.easy[1], 'en') === 'Beach' && lib.pageLabel(L.pages.easy[1], 'de') === 'Strand', 'sibling label = localized theme');
ok(lib.pageLabel({ theme: null, copy: 7, pos: 3, rungSize: 5 }, 'de') === 'Set 3', 'themeless sibling label = Set N by POSITION in the level, not the generator copy number');
// Parity with the TypeScript model on the same inputs (same regexes, same eligibility).
var ts = fs.readFileSync(path.join(lib.REPO_ROOT, 'frontend', 'lib', 'level-sets.ts'), 'utf8');
ok(/\/-\(\(\?:k\|g\\d\)\\d\{3\}\)\(\?:-\\d\+\)\?\$\//.test(ts), 'TS model uses the same variation-code regex');
ok(/e\.pages\.length < 2\) continue/.test(ts), 'TS model uses the same ≥2-page eligibility');

/* 4. round trip */
console.log('4. round trip');
var HEAD = '<!doctype html><html lang="en"><head><title>t</title><style>.lcs-worksheet{display:block}' + lib.ANCHOR.replace('<', '\\3c ') + '</style></head>';
var BODY = '<body><main id="lcs-app"><h1>ABC Order — Tools</h1>\n<p class="lcs-instruction">Do it</p>\n' + lib.ANCHOR + '<img></div><div class="lcs-download"></div></main></body></html>';
var original = HEAD + BODY;
var deck = { locale: 'en', slug: 'abc-easy-tools-g1245' };
var r1 = injector.injectIntoDeckHtml(original, deck, L, { rewrite: false, remove: false });
ok(r1.changed && r1.content.indexOf(lib.MARKER) !== -1, 'inject applies');
ok(r1.content.indexOf(lib.START) > r1.content.indexOf('</head>'), 'block is in <body>, not <head>');
ok(/aria-current="true"[^>]*><b>1<\/b>Easy<i>2<\/i>/.test(r1.content), 'own rung marked current with its count');
ok(/Level Sets · Level 1 of 3/.test(r1.content), 'level N of total');
ok(/More pages at this level: <a href="https:\/\/www\.lessoncraftstudio\.com\/en\/decks\/abc-easy-beach-g1245-5\/">Beach<\/a>/.test(r1.content), 'sibling link + label');
ok(/#level-core"><b>2<\/b>Core<i>2<\/i>/.test(r1.content), 'core rung links to the set page section');
var r2 = injector.injectIntoDeckHtml(r1.content, deck, L, { rewrite: false, remove: false });
ok(r2.alreadyApplied === true, 'idempotent (identical block → no change)');
// a sibling was added → the strip must re-emit
var L2 = lib.buildLadders(facts.concat([lib.factsOf(mf('g1245-6', 'easy', 'shapes', false), 'abc-easy-shapes-g1245-6')]));
var r3 = injector.injectIntoDeckHtml(r1.content, deck, L2.get('g1245'), { rewrite: false, remove: false });
ok(r3.changed && r3.reemitted && /<b>1<\/b>Easy<i>3<\/i>/.test(r3.content), 'changed siblings → re-emitted with the new count');
var c = r3.content;
for (var i = 0; i < 5; i++) c = injector.injectIntoDeckHtml(c, deck, L2.get('g1245'), { rewrite: true, remove: false }).content;
ok(c === r3.content, '5× --rewrite byte-identical');
var r4 = injector.injectIntoDeckHtml(c, deck, L2.get('g1245'), { rewrite: false, remove: true });
ok(r4.removed && r4.content === original, '--remove restores the original byte-for-byte');
var r5 = injector.injectIntoDeckHtml(r1.content, deck, null, { rewrite: false, remove: false });
ok(r5.removed && r5.content === original, 'a deck with no ladder loses its stale block');
ok(injector.injectIntoDeckHtml(original, deck, null, {}).alreadyApplied === true, 'no ladder + no block → untouched');

/* 5. poison */
console.log('5. poison');
var headOnly = '<!doctype html><html><head>' + lib.ANCHOR + '</head><body><main></main></body></html>';
var p1 = injector.injectIntoDeckHtml(headOnly, deck, L, {});
ok(!!p1.error && /anchor/.test(p1.error), 'anchor only in <head> → refused', p1.error);
var p2 = injector.injectIntoDeckHtml(original, { locale: 'en', slug: 'not-in-ladder-g1245-9' }, L, {});
ok(!!p2.error && /not a page of ladder/.test(p2.error), 'a slug outside the ladder is refused');
var p3 = injector.injectIntoDeckHtml(original.replace('</body>', '') + '</body>', deck, L, {});
ok(p3.changed === true, 'control: a well-formed deck still injects');
ok(/^<!--LCS_DECK_LADDER_START--><style id="lcs-deck-ladder-css">/.test(lib.block(deck, L)), 'block starts with the sentinel + its own <style>');
ok(/@media print\{#lcs-deck-ladder\{display:none!important\}\}/.test(lib.cssRules()) && /body\.lcs-embedded #lcs-deck-ladder/.test(lib.cssRules()) && /lcs-worksheet-landscape #lcs-deck-ladder/.test(lib.cssRules()), 'all three hide states present');

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
