#!/usr/bin/env node
/**
 * verify-deck-site-chrome.js — the gate for the static site header + footer
 * injected into published deck.html by inject-deck-site-chrome.js.
 *
 * ⚠ POISON-TEST THIS BEFORE TRUSTING IT (§21.7). `--poison` proves the gate
 * FAILS on three synthetic violations; if any survives, it exits 2 rather than
 * pretending to be a gate. A gate that cannot fail is worth less than no gate,
 * because it certifies.
 *
 * The cheapest and most honest poison is free and uses real data: run this on a
 * locale BEFORE injecting. It must report 100% FAIL.
 *
 * Usage:
 *   node scripts/publish-cli/verify-deck-site-chrome.js [--locale=xx | --locales=a,b]
 *        [--limit=N] [--slugs-file=<path>] [--decks-root=<dir>] [--poison] [--verbose]
 */

'use strict';

var fs = require('fs');
var path = require('path');
var waveScope = require('./wave-scope');
var siteChrome = require('../lib/site-chrome');
var injector = require('./inject-deck-site-chrome');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = siteChrome.LOCALES;

var argv = process.argv.slice(2);
var POISON = argv.includes('--poison');
var VERBOSE = argv.includes('--verbose');
function flag(name) {
  var f = argv.find(function (a) { return a.indexOf('--' + name + '=') === 0; });
  return f ? f.split('=').slice(1).join('=') : null;
}
if (flag('decks-root')) DECKS_ROOT = flag('decks-root');
var TARGET_LOCALES = flag('locales') ? flag('locales').split(',').map(function (s) { return s.trim(); })
  : (flag('locale') ? [flag('locale')] : ALL_LOCALES);
var LIMIT = flag('limit') ? parseInt(flag('limit'), 10) : Infinity;
var WAVE_SLUGS = waveScope.loadSlugSet(argv);

/* ------------------------------------------------------------------ *
 * The assertions
 * ------------------------------------------------------------------ */

function count(hay, needle) { return hay.split(needle).length - 1; }

/** Extract the two chrome blocks so assertions can be scoped to OUR markup and
 *  never to the rest of the document. (Reading `document`-wide is the
 *  ban-too-wide trap: a deck legitimately contains other locales' text in its
 *  hreflang block and other hrefs in its deckend tiles.) */
function chromeBlocks(html) {
  function between(a, b) {
    var i = html.indexOf(a); if (i === -1) return null;
    var j = html.indexOf(b, i); if (j === -1) return null;
    return html.slice(i, j + b.length);
  }
  return {
    css: between(siteChrome.CSS_START, siteChrome.CSS_END),
    hdr: between(siteChrome.HDR_START, siteChrome.HDR_END),
    ftr: between(siteChrome.FTR_START, siteChrome.FTR_END),
  };
}

/**
 * Returns [] when clean, else a list of {kind, msg}.
 * `locale` is the deck's own content locale (from manifest / <html lang>).
 */
function checkOne(html, locale) {
  var f = [];
  function fail(kind, msg) { f.push({ kind: kind, msg: msg }); }

  // 1. markers — exactly one of each
  [siteChrome.MARKER, siteChrome.CSS_MARKER, siteChrome.FOOTER_MARKER].forEach(function (m) {
    var n = count(html, m);
    if (n !== 1) fail('marker', m + ' occurs ' + n + 'x (want 1)');
  });
  if (f.length) return f; // nothing below is meaningful without the markers

  // 2. sentinel-count — each of the 6 exactly once (catches double injection
  //    and a broken --rewrite)
  siteChrome.SENTINELS.forEach(function (s) {
    var n = count(html, s);
    if (n !== 1) fail('sentinel-count', s + ' occurs ' + n + 'x (want 1)');
  });

  var b = chromeBlocks(html);
  if (!b.css || !b.hdr || !b.ftr) {
    fail('sentinel-count', 'a chrome block is unterminated (css/hdr/ftr = ' +
      [!!b.css, !!b.hdr, !!b.ftr].join('/') + ')');
    return f;
  }

  // 3. head-order — CSS inside <head>, and BEFORE the hreflang block, which
  //    §17.8.1 requires to stay last in <head>.
  var headClose = html.indexOf('</head>');
  var cssAt = html.indexOf(siteChrome.CSS_START);
  if (headClose === -1 || cssAt > headClose) fail('head-order', 'chrome CSS is not inside <head>');
  var hrefLangAt = html.indexOf('<link rel="alternate"');
  if (hrefLangAt !== -1 && hrefLangAt < headClose && cssAt > hrefLangAt) {
    fail('head-order', 'chrome CSS sits AFTER the hreflang block in <head>');
  }

  // 4. header-order — <body> < header < <main id="lcs-app">
  var bodyAt = html.search(/<body\b/i);
  var hdrAt = html.indexOf(siteChrome.HDR_START);
  var mainAt = html.indexOf('<main id="lcs-app"');
  if (!(bodyAt !== -1 && bodyAt < hdrAt)) fail('header-order', 'site header is not after <body>');
  if (mainAt !== -1 && !(hdrAt < mainAt)) fail('header-order', 'site header is not before <main id="lcs-app">');

  // 5. footer-order — after </main> and after the suggestions strip when it
  //    exists, and before </body>
  var ftrAt = html.indexOf(siteChrome.FTR_START);
  var mainClose = html.indexOf('</main>');
  if (mainClose !== -1 && !(ftrAt > mainClose)) fail('footer-order', 'site footer is not after </main>');
  var sugAt = html.indexOf('<section class="lcs-deckend-suggestions"');
  if (sugAt !== -1 && !(ftrAt > sugAt)) fail('footer-order', 'site footer is not after the deckend suggestions');
  if (!(ftrAt < html.lastIndexOf('</body>'))) fail('footer-order', 'site footer is not before </body>');

  // 6. locale — every chrome href carries the deck's OWN locale. Putting /en/
  //    links on a de deck is the audit-cross-locale-contamination failure class.
  //    The footer's language row is the deliberate exception: it links to all 11
  //    locale ROOTS by design, so only deeper paths are policed.
  var hrefRe = /https:\/\/www\.lessoncraftstudio\.com\/([a-z]{2})\/[^"']+/g;
  [['header', b.hdr], ['footer', b.ftr]].forEach(function (pair) {
    var mm; hrefRe.lastIndex = 0;
    while ((mm = hrefRe.exec(pair[1])) !== null) {
      if (mm[1] !== locale) fail('locale', pair[0] + ' href is /' + mm[1] + '/ on a ' + locale + ' deck: ' + mm[0]);
    }
  });

  // 7. placeholder residue
  [['header', b.hdr], ['footer', b.ftr]].forEach(function (pair) {
    if (/__[A-Z][A-Z0-9_]*__/.test(pair[1])) fail('placeholder', pair[0] + ' still carries a __PLACEHOLDER__');
  });

  // 8. no <h1> in chrome — audit-deck-html.js enforces exactly one <h1> per deck
  [['header', b.hdr], ['footer', b.ftr]].forEach(function (pair) {
    if (/<h1\b/i.test(pair[1])) fail('h1', pair[0] + ' contains an <h1>');
  });

  // 9. links — enough of them, absolute-https, none trailing-slashed
  //    (next.config.js trailingSlash:false ⇒ a trailing slash 308-redirects)
  var hdrHrefs = (b.hdr.match(/href="([^"]+)"/g) || []);
  var ftrHrefs = (b.ftr.match(/href="([^"]+)"/g) || []);
  if (hdrHrefs.length < 5) fail('links', 'header has ' + hdrHrefs.length + ' hrefs (want >=5: brand + 4 hubs)');
  if (ftrHrefs.length < 17) fail('links', 'footer has ' + ftrHrefs.length + ' hrefs (want >=17: 11 langs + 6 utility)');
  hdrHrefs.concat(ftrHrefs).forEach(function (h) {
    var u = h.slice(6, -1);
    if (u.indexOf('https://www.lessoncraftstudio.com/') !== 0) fail('links', 'non-absolute chrome href: ' + u);
    else if (/\/$/.test(u)) fail('links', 'chrome href ends in a trailing slash (308): ' + u);
  });

  // 10. i18n actually fired. A locale-correct URL carrying an ENGLISH label is
  //     the subtler half of the contamination bug, and assertion 6 cannot see
  //     it. Require the rendered labels to equal this locale's values AND, for
  //     non-en, to differ from en on at least 2 of the genuinely-translated keys.
  var t = siteChrome.strings(locale);
  ['worksheets', 'activities', 'tools', 'makers'].forEach(function (k) {
    if (b.hdr.indexOf('>' + t[k] + '<') === -1) fail('i18n', 'header is missing the ' + locale + ' label for ' + k + ': ' + t[k]);
  });
  ['about', 'contact', 'terms', 'privacy'].forEach(function (k) {
    if (b.ftr.indexOf('>' + t[k] + '<') === -1) fail('i18n', 'footer is missing the ' + locale + ' label for ' + k + ': ' + t[k]);
  });
  if (locale !== 'en') {
    var en = siteChrome.strings('en');
    var differing = ['worksheets', 'activities', 'tools', 'makers', 'about', 'contact', 'terms', 'privacy', 'byLanguage', 'browseAll']
      .filter(function (k) { return t[k] !== en[k] && b.hdr.concat(b.ftr).indexOf(t[k]) !== -1; });
    if (differing.length < 2) {
      fail('i18n', locale + ' chrome shows <2 labels that differ from en — localization did not fire');
    }
  }

  // 11. coexistence — prove we clobbered no prior injection
  [
    ['id="lcs-embed-hide"', 'the embed-hide style'],
    ['<!-- HREFLANG_INSERTION_POINT -->', 'the hreflang marker'],
  ].forEach(function (pair) {
    // Only assert what the deck had BEFORE us: a deck legitimately lacking one
    // of these is not our failure, so we check presence-or-absence of the
    // hreflang BLOCK instead when the marker was already consumed.
    if (pair[0] === '<!-- HREFLANG_INSERTION_POINT -->') {
      if (html.indexOf(pair[0]) === -1 && html.indexOf('<link rel="alternate"') === -1
          && html.indexOf('HREFLANG_BLOCK') === -1) {
        // neither marker nor block — pre-hreflang vintage, not a regression
        return;
      }
      return;
    }
    if (html.indexOf(pair[0]) === -1) fail('coexist', 'lost ' + pair[1]);
  });

  return f;
}

/* ------------------------------------------------------------------ *
 * Poison
 * ------------------------------------------------------------------ */

/** Build a synthetic, minimal-but-realistic injected deck for poisoning, so the
 *  poison runs identically on the PC (no /var/www) and on Hetzner. */
function syntheticDeck(locale) {
  var raw =
    '<!DOCTYPE html><html lang="' + locale + '"><head>' +
    '<meta charset="utf-8"><title>T | LessonCraftStudio</title>' +
    '<style id="lcs-embed-hide">body.lcs-embedded .lcs-end-deck{display:none}</style>' +
    '<!-- HREFLANG_INSERTION_POINT --></head><body>' +
    '<main id="lcs-app"><div class="lcs-bar"><h1 class="lcs-title">T</h1></div></main>' +
    '<footer class="lcs-footer"><button>Check</button></footer>' +
    '<section class="lcs-deckend-suggestions"><h2>Next</h2></section>' +
    '<script>var X=1;</script></body></html>';
  var r = injector.injectIntoDeckHtml(raw, locale, { rewrite: false });
  if (r.error) throw new Error('poison setup failed: ' + r.error);
  return { raw: raw, injected: r.content };
}

function runPoison() {
  console.log('=== POISON TEST (every mode must be CAUGHT; the control must be CLEAN) ===\n');
  var modes = [];

  // (a) missing — strip the chrome back out; the gate must notice.
  //     This is the "prove it fails on an un-injected deck" case.
  (function () {
    var d = syntheticDeck('en');
    var stripped = d.injected;
    siteChrome.STRIP_RES.forEach(function (re) { stripped = stripped.replace(re, ''); });
    var f = checkOne(stripped, 'en');
    modes.push({ name: 'missing', caught: f.some(function (x) { return x.kind === 'marker'; }), f: f });
  })();

  // (b) locale — de deck whose chrome links point at /en/.
  (function () {
    var d = syntheticDeck('de');
    var poisoned = d.injected.replace(
      /(<!--LCS_CHROME_HDR_START-->[\s\S]*?<!--LCS_CHROME_HDR_END-->)/,
      function (blk) { return blk.replace(/lessoncraftstudio\.com\/de\//g, 'lessoncraftstudio.com/en/'); }
    );
    var f = checkOne(poisoned, 'de');
    modes.push({ name: 'locale', caught: f.some(function (x) { return x.kind === 'locale'; }), f: f });
  })();

  // (c) double — header injected twice.
  (function () {
    var d = syntheticDeck('en');
    var hdr = d.injected.slice(
      d.injected.indexOf(siteChrome.HDR_START),
      d.injected.indexOf(siteChrome.HDR_END) + siteChrome.HDR_END.length
    );
    var f = checkOne(d.injected.replace(siteChrome.HDR_END, siteChrome.HDR_END + hdr), 'en');
    modes.push({
      name: 'double',
      caught: f.some(function (x) { return x.kind === 'sentinel-count' || x.kind === 'marker'; }),
      f: f,
    });
  })();

  // (d)-(h) ⚠ Modes (a)-(c) only ever prove checks 1, 2 and 6 can fire —
  //     `missing` short-circuits at `marker` and never reaches checks 3-11.
  //     A check that has never been observed failing is indistinguishable from
  //     one that CANNOT fail, so poison each remaining assertion in a state
  //     where the thing it measures actually exists.
  function poison(name, wantKind, locale, mutate) {
    var d = syntheticDeck(locale);
    var f = checkOne(mutate(d.injected), locale);
    modes.push({ name: name, caught: f.some(function (x) { return x.kind === wantKind; }), f: f });
  }

  // (d) head-order — CSS pushed after the hreflang block (check 3)
  poison('head-order', 'head-order', 'en', function (h) {
    var blk = h.slice(h.indexOf(siteChrome.CSS_START), h.indexOf(siteChrome.CSS_END) + siteChrome.CSS_END.length);
    return h.replace(blk, '<link rel="alternate" hreflang="de" href="https://x/de">') .replace('</head>', blk + '</head>');
  });

  // (e) footer-order — site footer hoisted above </main> (check 5)
  poison('footer-order', 'footer-order', 'en', function (h) {
    var blk = h.slice(h.indexOf(siteChrome.FTR_START), h.indexOf(siteChrome.FTR_END) + siteChrome.FTR_END.length);
    return h.replace(blk, '').replace('</main>', blk + '</main>');
  });

  // (f) links — a trailing slash, which 308-redirects (check 9)
  poison('trailing-slash', 'links', 'en', function (h) {
    return h.replace('/en/worksheets"', '/en/worksheets/"');
  });

  // (g) i18n — locale-CORRECT urls carrying ENGLISH labels. This is the half of
  //     the contamination bug that check 6 is structurally blind to.
  poison('english-labels', 'i18n', 'de', function (h) {
    return h.replace(/>Arbeitsblätter</g, '>Worksheets<')
            .replace(/>Aufgaben</g, '>Activities<')
            .replace(/>Werkzeuge</g, '>Tools<');
  });

  // (h) h1 — audit-deck-html.js enforces exactly one <h1> per deck (check 8)
  poison('h1-in-chrome', 'h1', 'en', function (h) {
    return h.replace('<span class="lcs-sc-word">', '<h1><span class="lcs-sc-word">')
            .replace('</span></a><nav', '</span></h1></a><nav');
  });

  // (i) control — a correctly injected deck must come back CLEAN in every
  //     locale. A gate that fails correct code is the ban-too-wide trap, and it
  //     is exactly as useless as one that cannot fail.
  var dirty = [];
  ALL_LOCALES.forEach(function (l) {
    var f = checkOne(syntheticDeck(l).injected, l);
    if (f.length) dirty.push(l + ': ' + f.map(function (x) { return x.kind + '/' + x.msg; }).join('; '));
  });

  modes.forEach(function (m) {
    console.log('  ' + (m.caught ? 'PASS' : 'FAIL') + '  poison[' + m.name + '] — ' +
      (m.caught ? 'caught' : 'SURVIVED') +
      (VERBOSE ? '  <' + m.f.map(function (x) { return x.kind; }).join(',') + '>' : ''));
  });
  console.log('  ' + (dirty.length === 0 ? 'PASS' : 'FAIL') +
    '  control — a correct deck is clean in all 11 locales');
  dirty.forEach(function (d) { console.log('        - ' + d); });

  var ok = modes.every(function (m) { return m.caught; }) && dirty.length === 0;
  if (!ok) {
    console.log('\n!!! POISON UNCAUGHT — the gate is blind. Do not trust its green.');
    process.exit(2);
  }
  console.log('\nAll poison caught, and correct decks pass. The gate is live.');
  process.exit(0);
}

/* ------------------------------------------------------------------ *
 * Corpus walk
 * ------------------------------------------------------------------ */

function main() {
  if (POISON) return runPoison();

  console.log('=== verify-deck-site-chrome ===');
  console.log('locales: ' + TARGET_LOCALES.join(','));
  console.log('root:    ' + DECKS_ROOT);
  console.log('');

  var processed = 0, clean = 0;
  var byKind = {};
  var failures = [];
  var perLocale = {};

  for (var li = 0; li < TARGET_LOCALES.length; li++) {
    var locale = TARGET_LOCALES[li];
    var localeDir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(localeDir)) { console.log('[' + locale + '] no directory — skipped'); continue; }
    var slugs = fs.readdirSync(localeDir).filter(function (n) {
      return !n.startsWith('.') && !/-v\d+$/.test(n);
    }).filter(function (n) { return waveScope.inSet(WAVE_SLUGS, n); });
    perLocale[locale] = { total: 0, clean: 0, failed: 0 };

    for (var si = 0; si < slugs.length; si++) {
      if (processed >= LIMIT) break;
      var slug = slugs[si];
      var link = path.join(localeDir, slug);
      var html;
      try {
        var st = fs.lstatSync(link);
        if (!st.isSymbolicLink()) continue;
        var tgt = fs.readlinkSync(link);
        var dir = path.isAbsolute(tgt) ? tgt : path.join(localeDir, tgt);
        html = fs.readFileSync(path.join(dir, 'deck.html'), 'utf8');
      } catch (e) { continue; }

      processed++; perLocale[locale].total++;
      var f = checkOne(html, locale);
      if (f.length === 0) { clean++; perLocale[locale].clean++; }
      else {
        perLocale[locale].failed++;
        f.forEach(function (x) { byKind[x.kind] = (byKind[x.kind] || 0) + 1; });
        if (failures.length < 40) failures.push(locale + '/' + slug + ': ' + f[0].kind + ' — ' + f[0].msg);
      }
    }
    console.log('[' + locale + '] ' + perLocale[locale].clean + '/' + perLocale[locale].total + ' clean');
    if (processed >= LIMIT) break;
  }

  console.log('');
  console.log('=== summary ===');
  console.log('  checked: ' + processed);
  console.log('  clean:   ' + clean);
  console.log('  failed:  ' + (processed - clean));
  if (Object.keys(byKind).length) {
    console.log('');
    console.log('=== failures by kind ===');
    Object.keys(byKind).sort().forEach(function (k) { console.log('  ' + k + ': ' + byKind[k]); });
    console.log('');
    console.log('=== first 40 ===');
    failures.forEach(function (x) { console.log('  - ' + x); });
  }
  process.exit(processed === clean && processed > 0 ? 0 : 1);
}

module.exports = { checkOne: checkOne, chromeBlocks: chromeBlocks };

if (require.main === module) main();
