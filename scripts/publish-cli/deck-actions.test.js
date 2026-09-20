#!/usr/bin/env node
/**
 * deck-actions.test.js — build-failing guard for the deck action strip
 * (scripts/lib/deck-actions.js + inject-deck-actions.js). Wired into deploy.sh
 * next to site-chrome.test.js.
 *
 * What it protects, and why each check exists:
 *  1. strings ×11 — a missing `deckActions.*` key would silently fall back to
 *     English on a non-English deck (the locale-contamination class).
 *  2. maker slugs ×11 × 29 interactive apps — a maker without a landing slug in
 *     some locale is not a build failure (the button is simply omitted), but a
 *     REGRESSION from "has one" to "has none" would silently drop the button
 *     from thousands of decks; the baseline is frozen here.
 *  3. route drift — `/<loc>/tools/<slug>` and `/api/quota/dl` are frozen into
 *     ~45k static files with no build-time reference.
 *  4. round trip on a REAL production deck.html (fixtures/deck-actions/) —
 *     inject → idempotent → 5× --rewrite byte-identical → --remove restores
 *     the original byte-for-byte. Both inverse defects site-chrome.js records
 *     (eaten newline / grown blank line) would fail here.
 *  5. poison — the anchor literal appears in <head> CSS too; injecting there
 *     would put a <nav> inside <head>. Prove the guard fires.
 *  6. the SoT is not duplicated.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var deckActions = require('../lib/deck-actions');
var injector = require('./inject-deck-actions');

var pass = 0, fail = 0;
function ok(cond, label, detail) {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail ? '  — ' + detail : '')); }
}

var INTERACTIVE_APPS = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count', 'code-addition', 'crossword',
  'cryptogram', 'find-and-count', 'find-objects', 'grid-match', 'matching', 'math-puzzle',
  'math-worksheet', 'missing-pieces', 'more-less', 'odd-one-out', 'pattern-train',
  'pattern-worksheet', 'picture-path', 'picture-sort', 'prepositions', 'shadow-match',
  'subtraction', 'sudoku', 'treasure-hunt', 'word-guess', 'word-scramble', 'wordsearch',
];

/* -- 1. strings --------------------------------------------------------------- */
console.log('\n[1] strings × 11 locales');
var enStrings = deckActions.strings('en');
deckActions.LOCALES.forEach(function (loc) {
  var raw = JSON.parse(fs.readFileSync(path.join(deckActions.MESSAGES_DIR, loc + '.json'), 'utf8'));
  var ns = raw.deckActions;
  ok(ns && typeof ns === 'object', loc + ': deckActions namespace present');
  Object.keys(deckActions.STRING_SPEC).forEach(function (k) {
    var v = ns && ns[k];
    ok(typeof v === 'string' && v.trim().length > 0, loc + '.' + k + ' is a non-empty string');
    ok(typeof v !== 'string' || !/[{}]/.test(v), loc + '.' + k + ' carries no {placeholder}');
    ok(typeof v !== 'string' || v.indexOf('deckActions.') === -1, loc + '.' + k + ' is not a raw dot-path');
  });
  if (loc !== 'en' && ns) {
    ok(ns.makeYourOwn !== enStrings.makeYourOwn, loc + '.makeYourOwn is not the English string');
    ok(ns.ariaLabel !== enStrings.ariaLabel, loc + '.ariaLabel is not the English string');
  }
});

/* -- 2. maker slugs ----------------------------------------------------------- */
console.log('\n[2] maker landing slugs × 11 locales × 29 interactive apps');
deckActions.LOCALES.forEach(function (loc) {
  var missing = INTERACTIVE_APPS.filter(function (app) { return !deckActions.makerSlug(loc, app); });
  ok(missing.length === 0, loc + ': every interactive app has a maker landing slug', 'missing: ' + missing.join(', '));
  var u = deckActions.makerUrl(loc, 'picture-trail');
  ok(u === deckActions.makerUrl(loc, 'picture-path') && !!u, loc + ': picture-trail aliases to picture-path');
  ok(!!u && !/\/$/.test(u) && u.indexOf(deckActions.CANONICAL_BASE + '/' + loc + '/tools/') === 0,
    loc + ': maker URL is absolute www, /tools/, no trailing slash', u);
});
ok(deckActions.makerUrl('en', 'counting-pictures') === null, 'a worksheet-gen family key (no maker) yields null');
ok(deckActions.makerUrl('en', null) === null, 'null app yields null');

/* -- 3. route drift ----------------------------------------------------------- */
console.log('\n[3] frozen routes still exist');
ok(fs.existsSync(path.join(deckActions.REPO_ROOT, 'frontend', 'app', '[locale]', deckActions.TOOLS_SEGMENT, '[tool]', 'page.tsx')),
  '/[locale]/' + deckActions.TOOLS_SEGMENT + '/[tool]/page.tsx exists (maker landings)');
ok(fs.existsSync(path.join(deckActions.REPO_ROOT, 'frontend', 'app', 'api', 'quota', 'dl', 'route.ts')),
  '/api/quota/dl/route.ts exists (metered download proxy)');
var dl = deckActions.dlHref('de', 'a-b', 'answer');
ok(dl === 'https://www.lessoncraftstudio.com/api/quota/dl?loc=de&slug=a-b&kind=answer', 'dlHref shape matches render-landing-html.js', dl);

/* -- 4. CSS + markup ---------------------------------------------------------- */
console.log('\n[4] CSS + markup');
var css = deckActions.cssRules();
ok(css.indexOf('@media print{#lcs-deck-actions{display:none!important}}') !== -1, 'hide-state: print');
ok(css.indexOf('body.lcs-embedded #lcs-deck-actions{display:none!important}') !== -1, 'hide-state: body.lcs-embedded');
ok(css.indexOf('body.lcs-worksheet-landscape #lcs-deck-actions{display:none!important}') !== -1
  && css.indexOf('(max-width:1024px) and (orientation:landscape)') !== -1,
  'hide-state: compact landscape-mobile fit mode');
ok(!/(^|[;}])\s*(a|ul|li|h2|p|nav|body|div|span|svg)\s*\{/.test(css), 'CSS has no bare element selectors');
ok(css.indexOf('min-height:40px') !== -1, 'tap target ≥ 40px');

var full = deckActions.block({ locale: 'de', slug: 'x-y', hasAnswerKey: true, appKey: 'addition' });
ok((full.match(/<a /g) || []).length === 3, 'de/addition with answer key → 3 anchors');
ok(full.indexOf('kind=pdf') !== -1 && full.indexOf('kind=answer') !== -1, 'both proxy kinds present');
ok(full.indexOf('&amp;slug=x-y&amp;') !== -1, 'href ampersands are entity-escaped');
ok(full.indexOf('>PDF herunterladen<') !== -1 && full.indexOf('>Lösungen<') !== -1 && full.indexOf('>Selbst erstellen<') !== -1,
  'German labels rendered');
ok(full.indexOf('rel="nofollow" target="_blank"') !== -1, 'download links are nofollow + new tab');
var noKey = deckActions.block({ locale: 'en', slug: 'x-y', hasAnswerKey: false, appKey: 'addition' });
ok(noKey.indexOf('kind=answer') === -1 && (noKey.match(/<a /g) || []).length === 2, 'no answer-key file → no answer-key anchor');
var noMaker = deckActions.block({ locale: 'en', slug: 'x-y', hasAnswerKey: true, appKey: 'counting-pictures' });
var noMakerNav = noMaker.slice(noMaker.indexOf('<nav')); // the CSS block names the class too — scope to the markup
ok(noMakerNav.indexOf('lcs-da-btn--make') === -1 && (noMakerNav.match(/<a /g) || []).length === 2, 'no maker slug → no maker anchor');
ok(full.indexOf(deckActions.START) === 0 && full.lastIndexOf(deckActions.END) === full.length - deckActions.END.length,
  'block is sentinel-wrapped, nothing outside');

/* -- 5. round trip on a REAL production deck --------------------------------- */
console.log('\n[5] round trip on fixtures/deck-actions/deck.html (real production file)');
var FIX = path.join(__dirname, 'fixtures', 'deck-actions');
var raw = fs.readFileSync(path.join(FIX, 'deck.html'), 'utf8');
var manifest = JSON.parse(fs.readFileSync(path.join(FIX, 'manifest.json'), 'utf8'));
ok(raw.indexOf(deckActions.MARKER) === -1, 'fixture is pristine (no strip yet)');
var deck = { locale: manifest.language.slice(0, 2), slug: 'addition-find-addend-accessories', hasAnswerKey: true, appKey: manifest.generator.app };
var a = injector.injectIntoDeckHtml(raw, deck, { rewrite: false, remove: false });
ok(!a.error && a.changed, 'round-trip: injection succeeds', a.error);
if (a.changed) {
  var again = injector.injectIntoDeckHtml(a.content, deck, { rewrite: false, remove: false });
  ok(again.alreadyApplied === true, 'round-trip: re-injecting is a no-op (idempotent)');

  var c = a.content;
  for (var i = 0; i < 5; i++) c = injector.injectIntoDeckHtml(c, deck, { rewrite: true, remove: false }).content;
  ok(c === a.content, 'round-trip: 5x --rewrite is byte-identical', 'drift of ' + (c.length - a.content.length) + ' bytes per 5 cycles');

  var removed = injector.injectIntoDeckHtml(a.content, deck, { rewrite: false, remove: true });
  ok(removed.changed && removed.content === raw, 'round-trip: --remove restores the original byte-for-byte',
    'drift of ' + ((removed.content || '').length - raw.length) + ' bytes');

  var headClose = a.content.indexOf('</head>');
  var start = a.content.indexOf(deckActions.START);
  ok(start > headClose, 'block sits in <body>, after </head>');
  var end = a.content.indexOf(deckActions.END) + deckActions.END.length;
  ok(a.content.slice(end, end + deckActions.ANCHOR.length) === deckActions.ANCHOR, 'block sits immediately before the worksheet wrapper');
  ok(a.content.indexOf('<div class="lcs-bar"') < start, 'block sits below the title bar');
  ok((a.content.match(/id="lcs-deck-actions"/g) || []).length === 1, 'exactly one strip');
  ok(a.content.indexOf('\u0000') === -1, 'no NUL bytes');
  ok(a.content.indexOf('slug=addition-find-addend-accessories&amp;kind=pdf') !== -1, 'fixture: proxy href carries the canonical slug');
  ok(a.content.indexOf('https://www.lessoncraftstudio.com/en/tools/addition-worksheet-maker"') !== -1, 'fixture: maker href resolves to the en addition maker');
}
// CRLF variant (a Windows checkout normalises the fixture): anchors are unaffected.
var crlf = raw.replace(/\r?\n/g, '\r\n');
var ac = injector.injectIntoDeckHtml(crlf, deck, { rewrite: false, remove: false });
ok(!ac.error && ac.changed && injector.injectIntoDeckHtml(ac.content, deck, { rewrite: false, remove: true }).content === crlf,
  'round-trip holds on a CRLF copy too');

/* -- 6. poison ---------------------------------------------------------------- */
console.log('\n[6] poison');
var headOnly = '<!DOCTYPE html><html lang="en"><head><style>' + deckActions.ANCHOR + '</style></head><body><main id="lcs-app"><div class="lcs-bar"></div></main></body></html>';
var p1 = injector.injectIntoDeckHtml(headOnly, deck, { rewrite: false, remove: false });
ok(!!p1.error, 'poison: anchor only inside <head> → refused (nothing injected into <head>)', JSON.stringify(p1).slice(0, 80));
var noHead = '<html><body>' + deckActions.ANCHOR + '</body></html>';
ok(!!injector.injectIntoDeckHtml(noHead, deck, { rewrite: false, remove: false }).error, 'poison: no </head> → refused');
var bad = injector.injectIntoDeckHtml(raw, { locale: 'en', slug: '', hasAnswerKey: false, appKey: null }, { rewrite: false, remove: false });
ok(!!bad.error, 'poison: empty slug → refused (no proxy link without a slug)');
var d1 = injector.describeDeck(FIX, { printable_only: true, generator: { app: 'addition' } });
ok(d1.skip && /printable-only/.test(d1.skip), 'describeDeck: printable_only manifest → skip');
var d2 = injector.describeDeck(FIX, { generator: { app: 'counting-pictures' } });
ok(d2.skip && /printable-only type/.test(d2.skip), 'describeDeck: print-only exercise type → skip');
var d3 = injector.describeDeck(FIX, manifest);
ok(d3.error && /no \*-printable\.pdf/.test(d3.error), 'describeDeck: a dir without a printable PDF is an ERROR, not a silent link');
var loc1 = injector.resolveLocale({ language: 'de' }, raw, 'en');
ok(!!loc1.error, 'resolveLocale: manifest/dir disagreement → refused');

/* -- 7. the SoT is not duplicated -------------------------------------------- */
console.log('\n[7] single source of truth');
['scripts/seo-landing/render-landing-html.js', 'scripts/publish-cli/inject-deck-actions.js'].forEach(function (rel) {
  var src = fs.readFileSync(path.join(deckActions.REPO_ROOT, rel), 'utf8');
  ok(/require\(['"][^'"]*deck-actions['"]\)/.test(src), rel + ' requires the shared deck-actions module');
  ok(src.indexOf('id="lcs-deck-actions"') === -1, rel + ' does not inline its own copy of the strip markup');
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail === 0 ? 0 : 1);
