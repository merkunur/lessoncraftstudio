#!/usr/bin/env node
/**
 * verify-deck-actions.js — the gate for the action strip
 *   [ Download PDF ] [ Answer key ] [ Make your own ]
 * injected into published deck.html by inject-deck-actions.js.
 *
 * ⚠ POISON-TEST THIS BEFORE TRUSTING IT (§21.7). `--poison` mutates a synthetic
 * injected deck once per assertion and requires every mutation to be CAUGHT,
 * plus a CONTROL proving a correct deck is CLEAN in all 11 locales. A gate that
 * cannot fail certifies; it exits 2 rather than pretend.
 *
 * Every assertion reads the FILESYSTEM as ground truth (the PDF names on disk,
 * the manifest's generator app, the locale's maker-content slug) — never the
 * strip's own text — so the gate does not mark its own homework (§23.4).
 *
 * Usage:
 *   node scripts/publish-cli/verify-deck-actions.js [--locale=xx | --locales=a,b]
 *        [--limit=N] [--sample=N] [--slugs-file=<path>] [--decks-root=<dir>] [--poison] [--verbose]
 *
 *   --sample=N  check every Nth deck (a cheap corpus-wide read; default 1 = all)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var waveScope = require('./wave-scope');
var deckActions = require('../lib/deck-actions');
var injector = require('./inject-deck-actions');
var interactiveTypes = require('../lib/interactive-types');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = deckActions.LOCALES;

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
var SAMPLE = flag('sample') ? Math.max(1, parseInt(flag('sample'), 10)) : 1;
var WAVE_SLUGS = waveScope.loadSlugSet(argv);

/* ------------------------------------------------------------------ *
 * The assertions
 * ------------------------------------------------------------------ */

function count(hay, needle) { return hay.split(needle).length - 1; }

/** Our block only — never the rest of the document (the ban-too-wide trap). */
function stripBlock(html) {
  var i = html.indexOf(deckActions.START); if (i === -1) return null;
  var j = html.indexOf(deckActions.END, i); if (j === -1) return null;
  return html.slice(i, j + deckActions.END.length);
}

function anchorsOf(nav) {
  var out = [];
  var re = /<a\s([^>]*)>/g, m;
  while ((m = re.exec(nav))) {
    var attrs = m[1];
    var href = (/href="([^"]*)"/.exec(attrs) || [])[1] || '';
    var cls = (/class="([^"]*)"/.exec(attrs) || [])[1] || '';
    out.push({ href: href.replace(/&amp;/g, '&'), cls: cls, attrs: attrs });
  }
  return out;
}

/**
 * @param {string} html      the deck.html
 * @param {string} locale    the directory locale
 * @param {{slug:string, hasAnswerKey:boolean, appKey:string|null}} truth  what the FILESYSTEM says
 * @returns {Array<{kind:string,msg:string}>}
 */
function checkOne(html, locale, truth) {
  var f = [];
  var add = function (kind, msg) { f.push({ kind: kind, msg: msg }); };

  // 1. exactly one block, one nav
  var nStart = count(html, deckActions.START), nEnd = count(html, deckActions.END), nMarker = count(html, deckActions.MARKER);
  if (nStart !== 1 || nEnd !== 1 || nMarker !== 1) {
    add(nMarker === 0 ? 'marker' : 'sentinel-count', 'START=' + nStart + ' END=' + nEnd + ' nav=' + nMarker);
    return f;
  }
  var block = stripBlock(html);
  if (!block) { add('marker', 'sentinels out of order'); return f; }

  // 2. placement — in <body>, immediately before the worksheet wrapper, below the bar
  var headClose = html.indexOf('</head>');
  var start = html.indexOf(deckActions.START);
  if (headClose === -1 || start < headClose) add('placement', 'block is inside <head>');
  var end = html.indexOf(deckActions.END) + deckActions.END.length;
  if (html.slice(end, end + deckActions.ANCHOR.length) !== deckActions.ANCHOR) add('placement', 'block is not immediately before ' + deckActions.ANCHOR);
  var bar = html.indexOf('<div class="lcs-bar"');
  if (bar !== -1 && bar > start) add('placement', 'block sits above the title bar');
  var bodyClose = html.lastIndexOf('</body>');
  if (bodyClose !== -1 && bodyClose < start) add('placement', 'block after </body>');

  // 3-5. anchors vs the filesystem truth
  var nav = block.slice(block.indexOf('<nav'));
  var anchors = anchorsOf(nav);
  if (anchors.length < 1 || anchors.length > 3) add('anchor-count', anchors.length + ' anchors');
  var pdf = anchors.filter(function (a) { return /lcs-da-btn--pdf/.test(a.cls); });
  var key = anchors.filter(function (a) { return /lcs-da-btn--key/.test(a.cls); });
  var make = anchors.filter(function (a) { return /lcs-da-btn--make/.test(a.cls); });

  var wantPdf = deckActions.dlHref(locale, truth.slug, 'pdf');
  if (pdf.length !== 1) add('pdf', pdf.length + ' pdf anchors');
  else if (pdf[0].href !== wantPdf) add('pdf', 'href ' + pdf[0].href + ' ≠ ' + wantPdf);
  else if (!/rel="nofollow"/.test(pdf[0].attrs) || !/target="_blank"/.test(pdf[0].attrs)) add('pdf', 'download link is not nofollow + _blank');

  var wantKey = deckActions.dlHref(locale, truth.slug, 'answer');
  if (truth.hasAnswerKey) {
    if (key.length !== 1) add('answer-key', 'answer key exists on disk but ' + key.length + ' anchors');
    else if (key[0].href !== wantKey) add('answer-key', 'href ' + key[0].href + ' ≠ ' + wantKey);
  } else if (key.length !== 0) add('answer-key', 'answer-key anchor on a deck with no answer-key PDF');

  var wantMake = deckActions.makerUrl(locale, truth.appKey);
  if (wantMake) {
    if (make.length !== 1) add('maker', 'maker landing exists but ' + make.length + ' anchors');
    else if (make[0].href !== wantMake) add('maker', 'href ' + make[0].href + ' ≠ ' + wantMake);
  } else if (make.length !== 0) add('maker', 'maker anchor on a deck whose app has no maker landing in ' + locale);
  anchors.forEach(function (a) {
    if (/\/tools\/[^"]*\/$/.test(a.href)) add('links', 'trailing slash on a Next route (308): ' + a.href);
  });

  // 6. labels are THIS locale's — the contamination class
  var s = deckActions.strings(locale);
  var en = deckActions.strings('en');
  function labelOf(a) { var m = /<span>([^<]*)<\/span>/.exec(a); return m ? m[1] : null; }
  var spans = (nav.match(/<span>[^<]*<\/span>/g) || []).map(labelOf);
  var expected = [s.downloadPdf].concat(truth.hasAnswerKey ? [s.answerKey] : []).concat(wantMake ? [s.makeYourOwn] : []);
  if (spans.join('|') !== expected.join('|')) add('i18n', 'labels ' + JSON.stringify(spans) + ' ≠ ' + JSON.stringify(expected));
  if (locale !== 'en' && spans.some(function (x) { return x === en.makeYourOwn || x === en.ariaLabel; })) add('i18n', 'English label on a ' + locale + ' deck');
  var aria = (/<nav[^>]*aria-label="([^"]*)"/.exec(nav) || [])[1];
  if (aria !== s.ariaLabel) add('i18n', 'aria-label ' + JSON.stringify(aria) + ' ≠ ' + JSON.stringify(s.ariaLabel));

  // 7. the three hide states
  var css = block.slice(block.indexOf('<style'), block.indexOf('</style>'));
  if (css.indexOf('@media print{#lcs-deck-actions{display:none!important}}') === -1) add('hide-print', 'no print hide');
  if (css.indexOf('body.lcs-embedded #lcs-deck-actions{display:none!important}') === -1) add('hide-embed', 'no embed hide');
  if (css.indexOf('body.lcs-worksheet-landscape #lcs-deck-actions{display:none!important}') === -1) add('hide-landscape', 'no landscape hide');

  // 8. document integrity
  if (html.indexOf('\u0000') !== -1) add('integrity', 'NUL byte');
  if (count(html, '</body>') > 1 || count(html, '</html>') > 1) add('integrity', 'duplicated document tail');
  if (count(html, '<h1') !== count(html, '</h1>')) add('integrity', 'unbalanced <h1>');

  return f;
}

/** What the version dir says — the ground truth the assertions compare against. */
function truthFor(dir) {
  var manifest = null;
  try { manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8')); } catch (_e) { manifest = null; }
  var d = injector.describeDeck(dir, manifest);
  if (d.error) return { error: d.error };
  if (d.skip) return { skip: d.skip };
  return { slug: d.slug, hasAnswerKey: d.hasAnswerKey, appKey: d.appKey };
}

/* ------------------------------------------------------------------ *
 * Poison
 * ------------------------------------------------------------------ */

function syntheticDeck(locale, deck) {
  var raw =
    '<!DOCTYPE html><html lang="' + locale + '"><head>' +
    '<meta charset="utf-8"><title>T | LessonCraftStudio</title>' +
    '<style>.lcs-worksheet-wrap{display:flex}</style>' +
    '<!-- HREFLANG_INSERTION_POINT --></head><body>' +
    '<main id="lcs-app"><div class="lcs-bar"><h1 class="lcs-title">T</h1></div>' +
    '<div class="lcs-worksheet-wrap"><div class="lcs-worksheet"></div></div></main>' +
    '<footer class="lcs-footer"><button>Check</button></footer>' +
    '<script>var X=1;</script></body></html>';
  var r = injector.injectIntoDeckHtml(raw, deck, { rewrite: false, remove: false });
  if (r.error) throw new Error('poison setup failed: ' + r.error);
  return { raw: raw, injected: r.content };
}

function runPoison() {
  console.log('=== POISON TEST (every mode must be CAUGHT; the control must be CLEAN) ===\n');
  var truth = { slug: 'addition-find-addend-animals', hasAnswerKey: true, appKey: 'addition' };
  var modes = [];
  function poison(name, wantKind, locale, t, mutate) {
    var d = syntheticDeck(locale, Object.assign({ locale: locale }, t));
    var f = checkOne(mutate(d.injected, d), locale, t);
    modes.push({ name: name, caught: f.some(function (x) { return x.kind === wantKind; }), f: f, wantKind: wantKind });
  }

  poison('missing', 'marker', 'en', truth, function (h) { return injector.stripBlock(h); });
  poison('double', 'sentinel-count', 'en', truth, function (h) { return h + stripBlock(h); });
  poison('in-head', 'placement', 'en', truth, function (h) {
    var b = stripBlock(h); return h.replace('\n' + b, '').replace('</head>', b + '</head>');
  });
  poison('above-bar', 'placement', 'en', truth, function (h) {
    var b = stripBlock(h); return h.replace('\n' + b, '').replace('<main id="lcs-app">', '<main id="lcs-app">' + b);
  });
  poison('not-before-wrap', 'placement', 'en', truth, function (h) {
    var b = stripBlock(h); return h.replace('\n' + b, '').replace('<footer class="lcs-footer">', b + '<footer class="lcs-footer">');
  });
  poison('wrong-slug', 'pdf', 'en', truth, function (h) { return h.replace(/slug=addition-find-addend-animals&amp;kind=pdf/, 'slug=some-other-deck&amp;kind=pdf'); });
  poison('wrong-locale-in-proxy', 'pdf', 'de', truth, function (h) { return h.replace(/loc=de&amp;slug=addition-find-addend-animals&amp;kind=pdf/, 'loc=en&amp;slug=addition-find-addend-animals&amp;kind=pdf'); });
  poison('raw-pdf-link', 'pdf', 'en', truth, function (h) { return h.replace(/https:\/\/www\.lessoncraftstudio\.com\/api\/quota\/dl\?loc=en&amp;slug=addition-find-addend-animals&amp;kind=pdf/, 'https://www.lessoncraftstudio.com/en/decks/addition-find-addend-animals/addition-find-addend-animals-printable.pdf'); });
  poison('not-nofollow', 'pdf', 'en', truth, function (h) { return h.replace('class="lcs-da-btn lcs-da-btn--pdf" href="' + deckActions.escapeHtml(deckActions.dlHref('en', truth.slug, 'pdf')) + '" rel="nofollow" target="_blank"', 'class="lcs-da-btn lcs-da-btn--pdf" href="' + deckActions.escapeHtml(deckActions.dlHref('en', truth.slug, 'pdf')) + '"'); });
  poison('answer-key-without-file', 'answer-key', 'en', { slug: truth.slug, hasAnswerKey: false, appKey: 'addition' }, function (h) {
    // the strip was built for hasAnswerKey:false; swap in one built WITH the key
    var withKey = deckActions.block({ locale: 'en', slug: truth.slug, hasAnswerKey: true, appKey: 'addition' });
    return h.replace(stripBlock(h), withKey);
  });
  poison('missing-answer-key', 'answer-key', 'en', truth, function (h) {
    return h.replace(stripBlock(h), deckActions.block({ locale: 'en', slug: truth.slug, hasAnswerKey: false, appKey: 'addition' }));
  });
  poison('maker-wrong-locale', 'maker', 'de', truth, function (h) { return h.replace('/de/tools/', '/en/tools/'); });
  poison('maker-wrong-app', 'maker', 'en', truth, function (h) {
    return h.replace(stripBlock(h), deckActions.block({ locale: 'en', slug: truth.slug, hasAnswerKey: true, appKey: 'wordsearch' }));
  });
  poison('maker-on-no-maker-deck', 'maker', 'en', { slug: truth.slug, hasAnswerKey: true, appKey: 'counting-pictures' }, function (h) {
    return h.replace(stripBlock(h), deckActions.block({ locale: 'en', slug: truth.slug, hasAnswerKey: true, appKey: 'addition' }));
  });
  poison('maker-trailing-slash', 'links', 'en', truth, function (h) { return h.replace('/tools/addition-worksheet-maker"', '/tools/addition-worksheet-maker/"'); });
  poison('english-label-on-de', 'i18n', 'de', truth, function (h) { return h.replace('<span>Selbst erstellen</span>', '<span>Make your own</span>'); });
  poison('english-aria-on-fi', 'i18n', 'fi', truth, function (h) { return h.replace('aria-label="' + deckActions.strings('fi').ariaLabel + '"', 'aria-label="' + deckActions.strings('en').ariaLabel + '"'); });
  poison('no-print-hide', 'hide-print', 'en', truth, function (h) { return h.replace('@media print{#lcs-deck-actions{display:none!important}}', ''); });
  poison('no-embed-hide', 'hide-embed', 'en', truth, function (h) { return h.replace('body.lcs-embedded #lcs-deck-actions{display:none!important}', ''); });
  poison('no-landscape-hide', 'hide-landscape', 'en', truth, function (h) { return h.replace('body.lcs-worksheet-landscape #lcs-deck-actions{display:none!important}', ''); });
  poison('nul-byte', 'integrity', 'en', truth, function (h) { return h.replace('<script>var X=1;</script>', '<script>var X=1;\u0000</script>'); });
  poison('duplicated-tail', 'integrity', 'en', truth, function (h) { return h + '</body></html>'; });

  var allCaught = true;
  modes.forEach(function (m) {
    console.log('  ' + (m.caught ? 'PASS' : 'FAIL') + '  poison[' + m.name + '] — ' +
      (m.caught ? 'caught as ' + m.wantKind : 'NOT CAUGHT (findings: ' + JSON.stringify(m.f.map(function (x) { return x.kind; })) + ')'));
    if (!m.caught) allCaught = false;
  });

  // CONTROL: a correct deck must be CLEAN in every locale, in all three shapes.
  var controlClean = true;
  ALL_LOCALES.forEach(function (loc) {
    [truth, { slug: 'x-y', hasAnswerKey: false, appKey: 'wordsearch' }, { slug: 'x-y', hasAnswerKey: true, appKey: 'counting-pictures' }].forEach(function (t) {
      var d = syntheticDeck(loc, Object.assign({ locale: loc }, t));
      var f = checkOne(d.injected, loc, t);
      if (f.length) { controlClean = false; console.log('  FAIL  control[' + loc + '/' + t.appKey + '] — ' + f[0].kind + ': ' + f[0].msg); }
    });
  });
  console.log('  ' + (controlClean ? 'PASS' : 'FAIL') + '  control — correct decks are clean in all 11 locales × 3 shapes');

  if (!allCaught || !controlClean) { console.log('\nGATE IS NOT TRUSTWORTHY.'); process.exit(2); }
  console.log('\nAll ' + modes.length + ' poisons caught, and correct decks pass. The gate is live.');
  process.exit(0);
}

/* ------------------------------------------------------------------ *
 * Corpus walk
 * ------------------------------------------------------------------ */

function main() {
  if (POISON) return runPoison();

  console.log('=== verify-deck-actions ===');
  console.log('locales: ' + TARGET_LOCALES.join(','));
  console.log('root:    ' + DECKS_ROOT);
  console.log('sample:  every ' + SAMPLE + (SAMPLE === 1 ? ' (all)' : ''));
  console.log('');

  var processed = 0, clean = 0, skipped = 0;
  var byKind = {};
  var failures = [];
  var perLocale = {};
  var seen = new Set();

  for (var li = 0; li < TARGET_LOCALES.length; li++) {
    var locale = TARGET_LOCALES[li];
    var localeDir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(localeDir)) { console.log('[' + locale + '] no directory — skipped'); continue; }
    var slugs = fs.readdirSync(localeDir).filter(function (n) {
      return !n.startsWith('.') && !/-v\d+$/.test(n);
    }).filter(function (n) { return waveScope.inSet(WAVE_SLUGS, n); });
    perLocale[locale] = { total: 0, clean: 0, failed: 0, skipped: 0 };

    for (var si = 0; si < slugs.length; si += SAMPLE) {
      if (processed >= LIMIT) break;
      var slug = slugs[si];
      var link = path.join(localeDir, slug);
      var html, dir;
      try {
        var st = fs.lstatSync(link);
        if (!st.isSymbolicLink()) continue;
        var tgt = fs.readlinkSync(link);
        dir = fs.realpathSync(path.isAbsolute(tgt) ? tgt : path.join(localeDir, tgt));
        if (seen.has(dir)) continue; // alias of an already-checked physical file
        seen.add(dir);
        html = fs.readFileSync(path.join(dir, 'deck.html'), 'utf8');
      } catch (e) { continue; }

      var truth = truthFor(dir);
      if (truth.skip) {
        // a print-only deck must carry NO strip
        if (html.indexOf(deckActions.MARKER) !== -1) {
          processed++; perLocale[locale].total++; perLocale[locale].failed++;
          byKind['strip-on-print-only'] = (byKind['strip-on-print-only'] || 0) + 1;
          if (failures.length < 40) failures.push(locale + '/' + slug + ': strip-on-print-only — ' + truth.skip);
        } else { skipped++; perLocale[locale].skipped++; }
        continue;
      }
      processed++; perLocale[locale].total++;
      var f = truth.error ? [{ kind: 'fs', msg: truth.error }] : checkOne(html, locale, truth);
      if (f.length === 0) { clean++; perLocale[locale].clean++; }
      else {
        perLocale[locale].failed++;
        f.forEach(function (x) { byKind[x.kind] = (byKind[x.kind] || 0) + 1; });
        if (failures.length < 40) failures.push(locale + '/' + slug + ': ' + f[0].kind + ' — ' + f[0].msg);
        if (VERBOSE) f.forEach(function (x) { console.log('    ' + locale + '/' + slug + ': ' + x.kind + ' — ' + x.msg); });
      }
    }
    console.log('[' + locale + '] ' + perLocale[locale].clean + '/' + perLocale[locale].total + ' clean' +
      (perLocale[locale].skipped ? ' (+' + perLocale[locale].skipped + ' print-only, correctly without a strip)' : ''));
    if (processed >= LIMIT) break;
  }

  console.log('');
  console.log('=== summary ===');
  console.log('  checked: ' + processed);
  console.log('  clean:   ' + clean);
  console.log('  failed:  ' + (processed - clean));
  console.log('  print-only (no strip, correct): ' + skipped);
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

module.exports = { checkOne: checkOne, truthFor: truthFor };

if (require.main === module) main();
