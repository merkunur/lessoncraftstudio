#!/usr/bin/env node
/**
 * site-chrome.test.js — guards for the static site chrome that is baked into
 * ~40,000 files across two surfaces.
 *
 * The two failure modes this exists for:
 *
 *  1. ROUTE DRIFT. Nine path segments are frozen into ~40k static HTML files
 *     with NO build-time reference — nothing in `next build` knows they exist.
 *     A future route rename would leave ~40k dead links and no signal. So we
 *     assert every baked segment still resolves to a page.tsx: a rename fails
 *     THIS instead of the corpus.
 *
 *  2. LOCALE INTEGRITY. Every chrome string must be present, escaped, and
 *     actually localized in all 11 locales.
 *
 * Run: node scripts/publish-cli/site-chrome.test.js
 */

'use strict';

var fs = require('fs');
var path = require('path');
var siteChrome = require('../lib/site-chrome');

var pass = 0, fail = 0;
function ok(cond, label, detail) {
  if (cond) { pass++; }
  else { fail++; console.log('  FAIL  ' + label + (detail ? ' — ' + detail : '')); }
}

console.log('=== site-chrome.test ===\n');

/* -- 1. route drift -------------------------------------------------------- */
var APP_DIR = path.join(siteChrome.REPO_ROOT, 'frontend', 'app', '[locale]');
Object.keys(siteChrome.ROUTE_SEGMENTS).forEach(function (name) {
  var seg = siteChrome.ROUTE_SEGMENTS[name];
  var p = path.join(APP_DIR, seg, 'page.tsx');
  ok(fs.existsSync(p), 'route[' + name + '] frontend/app/[locale]/' + seg + '/page.tsx exists',
    'the chrome links ' + seg + ' from ~40k static files; a rename orphans them all');
});
// The locale root itself.
ok(fs.existsSync(path.join(APP_DIR, 'page.tsx')), 'route[home] frontend/app/[locale]/page.tsx exists');

/* -- 2. per-locale string integrity ---------------------------------------- */
var en = siteChrome.strings('en');
siteChrome.LOCALES.forEach(function (l) {
  var t = siteChrome.strings(l);
  Object.keys(siteChrome.STRING_SPEC).forEach(function (k) {
    ok(typeof t[k] === 'string' && t[k].length > 0, 'strings[' + l + '].' + k + ' is non-empty');
    // Escaping happens once at resolve time; nothing may carry a raw < > or ".
    ok(!/[<>]/.test(t[k]) && t[k].indexOf('"') === -1, 'strings[' + l + '].' + k + ' is HTML-escaped',
      JSON.stringify(t[k]));
  });
  if (l !== 'en') {
    var differing = ['worksheets', 'activities', 'tools', 'makers', 'about', 'contact', 'terms', 'privacy', 'byLanguage', 'browseAll']
      .filter(function (k) { return t[k] !== en[k]; });
    ok(differing.length >= 5, 'strings[' + l + '] is genuinely localized (>=5 labels differ from en)',
      'only ' + differing.length + ' differ — a message-file regression would look exactly like this');
  }
});

/* -- 3. rendered markup invariants ----------------------------------------- */
siteChrome.LOCALES.forEach(function (l) {
  ['landing', 'deck'].forEach(function (variant) {
    var h = siteChrome.header(l, variant);
    var f = siteChrome.footer(l, variant);
    ok(h.indexOf(siteChrome.HDR_START) === 0 && h.slice(-siteChrome.HDR_END.length) === siteChrome.HDR_END,
      l + '/' + variant + ' header is sentinel-wrapped');
    ok(f.indexOf(siteChrome.FTR_START) === 0 && f.slice(-siteChrome.FTR_END.length) === siteChrome.FTR_END,
      l + '/' + variant + ' footer is sentinel-wrapped');
    ok(!/<h1\b/i.test(h) && !/<h1\b/i.test(f), l + '/' + variant + ' chrome contains no <h1>');
    ok(!/__[A-Z][A-Z0-9_]*__/.test(h + f), l + '/' + variant + ' chrome has no placeholder residue');
    // Every deeper href must carry THIS locale. The footer's language row links
    // to all 11 locale ROOTS by design, so only deeper paths are policed.
    var re = /https:\/\/www\.lessoncraftstudio\.com\/([a-z]{2})\/[^"']+/g, m;
    while ((m = re.exec(h + f)) !== null) {
      ok(m[1] === l, l + '/' + variant + ' href carries the right locale', m[0]);
    }
    // trailingSlash:false — a trailing slash 308-redirects.
    (h + f).match(/href="([^"]+)"/g).forEach(function (raw) {
      var u = raw.slice(6, -1);
      ok(u.indexOf('https://www.lessoncraftstudio.com/') === 0, l + '/' + variant + ' href is absolute', u);
      ok(!/\/$/.test(u), l + '/' + variant + ' href has no trailing slash', u);
    });
  });
  // Landings get the real contentinfo landmark; decks must NOT, because
  // deck.html already has <footer class="lcs-footer"> as a body child.
  ok(siteChrome.footer(l, 'landing').indexOf('<footer id="lcs-site-footer" role="contentinfo">') !== -1,
    l + ' landing footer is a <footer role="contentinfo">');
  ok(siteChrome.footer(l, 'deck').indexOf('<div id="lcs-site-footer"') !== -1
    && siteChrome.footer(l, 'deck').indexOf('<footer') === -1,
    l + ' deck footer is a <div> (no duplicate contentinfo next to .lcs-footer)');
});

/* -- 4. the three hide states are present ---------------------------------- */
var css = siteChrome.cssRules();
ok(css.indexOf('@media print{#lcs-site-chrome,#lcs-site-footer{display:none!important}}') !== -1,
  'hide-state: print');
ok(css.indexOf('body.lcs-embedded #lcs-site-chrome') !== -1, 'hide-state: body.lcs-embedded');
ok(css.indexOf('body.lcs-worksheet-landscape #lcs-site-chrome') !== -1
  && css.indexOf('(max-width:1024px) and (orientation:landscape)') !== -1,
  'hide-state: compact landscape-mobile fit mode (the highest-severity one)');
// No bare element selectors: deck.html resets only box-sizing, the landing has
// a full * reset — a bare rule would behave differently on each host.
ok(!/(^|[;}])\s*(a|ul|li|h2|p|body|header|footer)\s*\{/.test(css),
  'CSS has no bare element selectors');

/* -- 4b. --rewrite must be BYTE-IDEMPOTENT --------------------------------- *
 * Inject and strip have to be exact inverses. Two real defects were caught
 * here: a trailing `\n?` in STRIP_RES ate the document's own newline after
 * <head>/<body> (every rewrite shrank the file by 2 bytes), and dropping the
 * leading `\n?` would make every rewrite grow it by a blank line per block.
 * Either one compounds silently across 9,752 files. */
(function () {
  var injector = require('./inject-deck-site-chrome');
  var raw =
    '<!DOCTYPE html><html lang="de"><head>\n<meta charset="utf-8">\n' +
    '<!-- HREFLANG_INSERTION_POINT --></head>\n<body>\n' +
    '<main id="lcs-app"><div class="lcs-bar"></div></main>\n' +
    '<footer class="lcs-footer"></footer>\n<script>var x=1;</script>\n</body>\n</html>\n';
  var a = injector.injectIntoDeckHtml(raw, 'de', { rewrite: false });
  ok(!a.error && a.changed, 'round-trip: injection succeeds', a.error);
  if (a.changed) {
    var again = injector.injectIntoDeckHtml(a.content, 'de', { rewrite: false });
    ok(again.alreadyApplied === true, 'round-trip: re-injecting is a no-op (idempotent)');

    var c = a.content;
    for (var i = 0; i < 5; i++) c = injector.injectIntoDeckHtml(c, 'de', { rewrite: true }).content;
    ok(c === a.content, 'round-trip: 5x --rewrite is byte-identical',
      'drift of ' + (c.length - a.content.length) + ' bytes per 5 cycles');

    var stripped = a.content;
    siteChrome.STRIP_RES.forEach(function (re) { stripped = stripped.replace(re, ''); });
    ok(stripped === raw, 'round-trip: a full strip restores the original byte-for-byte',
      'drift of ' + (stripped.length - raw.length) + ' bytes');
  }
})();

/* -- 5. the SoT is not duplicated ------------------------------------------ */
// The whole point of scripts/lib/site-chrome.js is that the markup exists once.
// If someone later inlines a copy, this catches it.
['scripts/seo-landing/render-landing-html.js', 'scripts/publish-cli/inject-deck-site-chrome.js'].forEach(function (rel) {
  var src = fs.readFileSync(path.join(siteChrome.REPO_ROOT, rel), 'utf8');
  ok(/require\(['"][^'"]*site-chrome['"]\)/.test(src), rel + ' requires the shared site-chrome module');
  ok(src.indexOf('id="lcs-site-chrome"') === -1 || rel.indexOf('inject-deck') !== -1,
    rel + ' does not inline its own copy of the chrome markup');
});

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail === 0 ? 0 : 1);
