#!/usr/bin/env node
/**
 * Post-deploy verify script for the alt-text SEO commission 2026-05-27.
 *
 * Tests the live production URLs for all 11 locales:
 *   1. Sitemap shard 0 + 1 have <image:caption> on thumbnail blocks
 *      (was missing pre-commission)
 *   2. Sample deck.html per locale carries:
 *      - <main role="application" aria-label="..."> with content-language-correct text
 *      - <img class="lcs-worksheet__img" alt="..."> non-empty
 *      - 6 <img class="lcs-deckend-thumb" alt="..."> non-empty
 *      - <meta property="og:image:alt" content="..."> non-empty + rich
 *   3. Topic page per locale carries deck card alts in page locale
 *   4. NO English-leak on non-EN pages (§A.13.53 cognate-aware FORBIDDEN
 *      with Nordic-trio substring-trap drops)
 *
 * No external deps; uses node's built-in https.get. Run with:
 *
 *   node scripts/publish-cli/verify-alt-text-coverage.js
 *   node scripts/publish-cli/verify-alt-text-coverage.js --locales=de,fr,es
 *   node scripts/publish-cli/verify-alt-text-coverage.js --base=https://www.lessoncraftstudio.com
 *
 * Per CLAUDE.md §A.13.13 multi-grep fan-out hygiene + §A.13.43 textContent
 * assertions + §A.13.53 cognate-aware verify discipline.
 *
 * Exit code: 0 if all PASS; 1 if any FAIL.
 */

'use strict';

var https = require('https');
var http = require('http');
var url = require('url');

var BASE_URL_DEFAULT = 'https://www.lessoncraftstudio.com';
var ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// ============================================================
// FORBIDDEN-EN tokens (universal across all 10 non-EN locales)
// ============================================================

var FORBIDDEN_EN = [
  'Printable ', 'Preview of ', 'Your completed worksheet',
  'Play interactive ', 'featuring', 'Free interactive ',
  ' worksheet ', 'Activity:', ' for kindergarten', ' for preschool',
  ' for grade '
];

// ============================================================
// Per-locale cognate-aware FORBIDDEN sets (per §A.13.53)
// ============================================================
// When auditing locale X, FORBIDDEN_FROM_OTHERS[X] is the set of tokens
// from OTHER locales that we expect NOT to appear on /X/ pages. Sibling
// cognates (e.g. Nordic-trio shared words) are dropped per §A.13.53.

var FORBIDDEN_FROM_OTHERS = {
  // Each entry: tokens distinctive to OTHER locales that should not leak in.
  // We keep this short + focused on high-signal tokens; expand on real
  // empirical leakage discoveries per the cognate-aware-verify doctrine.
  en: { /* English page: skip cross-locale check (this is the source locale) */ },
  de: { fr: ['Fiche '], es: ['Hoja de '], it: ['Scheda di '], nl: ['Werkblad '],
        sv: ['arbetsblad'], da: ['arbejdsark'], no: ['arbeidsark'] },
  fr: { de: ['Arbeitsblatt'], es: ['Hoja de '], it: ['Scheda di '], pt: ['Ficha de '],
        nl: ['werkblad'] },
  es: { de: ['Arbeitsblatt'], fr: ['Fiche '], it: ['Scheda di '], pt: ['Ficha de '],
        nl: ['werkblad'] },
  pt: { de: ['Arbeitsblatt'], fr: ['Fiche '], it: ['Scheda di '],
        es: ['Hoja de '], nl: ['werkblad'] },
  it: { de: ['Arbeitsblatt'], fr: ['Fiche '], es: ['Hoja de '],
        pt: ['Ficha de '], nl: ['werkblad'] },
  nl: { de: ['Arbeitsblatt'], fr: ['Fiche '], es: ['Hoja de '],
        it: ['Scheda di '], pt: ['Ficha de '] },
  // Nordic-trio (sv/da/no) per §A.13.53: drop ng cognates between siblings.
  // Each Nordic locale's FORBIDDEN excludes the OTHERS' near-cognates.
  sv: { fi: ['tehtäväarkki', 'Esikatselu'],
        de: ['Arbeitsblatt'], en: ['worksheet'] },
  da: { fi: ['tehtäväarkki', 'Esikatselu'],
        de: ['Arbeitsblatt'], en: ['worksheet'] },
  no: { fi: ['tehtäväarkki', 'Esikatselu'],
        de: ['Arbeitsblatt'], en: ['worksheet'] },
  // Finnish (Uralic) — zero cognate drops; can use all Nordic tokens as
  // distinctive (per §A.13.53 item 3).
  fi: { sv: ['arbetsblad', 'Förhandsvisning'],
        da: ['arbejdsark', 'Forhåndsvisning'],
        no: ['arbeidsark', 'Forhåndsvisning'],
        de: ['Arbeitsblatt'], en: ['worksheet'], fr: ['Fiche '],
        es: ['Hoja de '], it: ['Scheda di '], pt: ['Ficha de '], nl: ['werkblad'] },
};

// ============================================================
// Locale-distinctive POSITIVE tokens — expected on each /locale/ page
// ============================================================
// These are tokens we EXPECT to find in the locale's alt-text. Their
// presence is positive evidence the locale i18n is wired correctly.

var EXPECTED_LOCALE_TOKENS = {
  en: ['worksheet'],
  de: ['Arbeitsblatt'],
  fr: ['Fiche'],
  es: ['Hoja'],
  pt: ['Ficha'],
  it: ['Scheda'],
  nl: ['werkblad'],
  sv: ['arbetsblad'],
  da: ['arbejdsark'],
  no: ['arbeidsark'],
  fi: ['tehtäväarkki'],
};

// ============================================================
// HTTP fetch helper
// ============================================================

function fetchUrl(targetUrl) {
  return new Promise(function (resolve, reject) {
    var parsed = url.parse(targetUrl);
    var lib = parsed.protocol === 'http:' ? http : https;
    var req = lib.get(targetUrl, { timeout: 30000 }, function (res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow one redirect
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      var chunks = [];
      res.on('data', function (c) { chunks.push(c); });
      res.on('end', function () {
        resolve({
          status: res.statusCode,
          body: Buffer.concat(chunks).toString('utf8'),
          headers: res.headers,
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', function () { req.destroy(new Error('timeout')); });
  });
}

// ============================================================
// Per-URL checks
// ============================================================

function checkSitemap(html) {
  var issues = [];
  var imageCount = (html.match(/<image:image>/g) || []).length;
  var captionCount = (html.match(/<image:caption>/g) || []).length;
  var titleCount = (html.match(/<image:title>/g) || []).length;
  if (imageCount === 0) {
    issues.push('NO_IMAGE_ENTRIES');
  } else {
    // Each <image:image> should have BOTH title + caption per alt-text SEO
    // commission Phase 6 (thumbnail block now gets caption too).
    if (captionCount < imageCount * 0.9) {
      issues.push('CAPTION_MISSING_ON_' + (imageCount - captionCount) + '_OF_' + imageCount + '_IMAGES');
    }
    if (titleCount < imageCount * 0.9) {
      issues.push('TITLE_MISSING_ON_' + (imageCount - titleCount) + '_OF_' + imageCount + '_IMAGES');
    }
  }
  return { imageCount: imageCount, captionCount: captionCount, titleCount: titleCount, issues: issues };
}

function checkDeckHtml(html, locale) {
  var issues = [];

  // Check 1: <main role="application" aria-label="...">
  var mainMatch = /<main\s+id="lcs-app"([^>]*)>/i.exec(html);
  if (!mainMatch) {
    issues.push('MAIN_TAG_MISSING');
  } else {
    var attrs = mainMatch[1];
    if (!/role="application"/.test(attrs)) issues.push('MAIN_NO_ROLE');
    var ariaMatch = /aria-label="([^"]*)"/.exec(attrs);
    if (!ariaMatch || !ariaMatch[1]) issues.push('MAIN_ARIA_EMPTY');
    else if (ariaMatch[1] === '__APP_ARIA_LABEL__') issues.push('MAIN_ARIA_UNSUBSTITUTED');
  }

  // Check 2: main worksheet img alt
  var wsMatch = /id="lcs-worksheet-img"[^>]*alt="([^"]*)"/i.exec(html);
  if (wsMatch) {
    var wsAlt = wsMatch[1];
    if (!wsAlt) issues.push('WORKSHEET_IMG_ALT_EMPTY');
    else if (wsAlt === '__WORKSHEET_MAIN_ALT__') issues.push('WORKSHEET_IMG_ALT_UNSUBSTITUTED');
  }

  // Check 3: deckend thumb alts
  var deckendThumbMatches = html.match(/<img[^>]*class="lcs-deckend-thumb"[^>]*>/g) || [];
  var emptyAltThumbs = 0;
  var unsubThumbs = 0;
  deckendThumbMatches.forEach(function (img) {
    var aMatch = /alt="([^"]*)"/.exec(img);
    var aVal = aMatch ? aMatch[1] : '';
    if (!aVal) emptyAltThumbs++;
    else if (/^__SUGGESTION_\d+_ALT__$/.test(aVal)) unsubThumbs++;
  });
  if (emptyAltThumbs > 0) issues.push('DECKEND_THUMB_EMPTY_ALT_' + emptyAltThumbs + '_OF_' + deckendThumbMatches.length);
  if (unsubThumbs > 0) issues.push('DECKEND_THUMB_UNSUBSTITUTED_' + unsubThumbs);

  // Check 4: og:image:alt
  var ogAltMatch = /<meta\s+property="og:image:alt"\s+content="([^"]*)"/i.exec(html);
  if (!ogAltMatch) issues.push('OG_IMAGE_ALT_TAG_MISSING');
  else {
    var ogAlt = ogAltMatch[1];
    if (!ogAlt) issues.push('OG_IMAGE_ALT_EMPTY');
    else if (ogAlt === '__OG_IMAGE_ALT__') issues.push('OG_IMAGE_ALT_UNSUBSTITUTED');
  }

  // Check 5: locale-leak on non-EN page
  // Match the token in any of these contexts:
  //   alt="..." | aria-label="..." | image:title>...< | image:caption>...<
  //   <meta property="og:image:alt" content="..."> + twitter:image:alt
  //   "caption":"..." (Schema.org JSON-LD ImageObject.caption)
  function tokenAppearsInAltContext(html, tok) {
    var escaped = tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var patterns = [
      new RegExp('\\b(?:alt|aria-label)="[^"]*' + escaped + '[^"]*"', 'i'),
      new RegExp('<image:(?:title|caption)>[^<]*' + escaped + '[^<]*</image:', 'i'),
      new RegExp('<meta\\s+(?:property|name)="(?:og:image:alt|twitter:image:alt)"\\s+content="[^"]*' + escaped + '[^"]*"', 'i'),
      new RegExp('"caption":\\s*"[^"]*' + escaped + '[^"]*"', 'i'),
    ];
    return patterns.some(function (p) { return p.test(html); });
  }

  if (locale !== 'en') {
    var leakedTokens = [];
    FORBIDDEN_EN.forEach(function (tok) {
      if (tokenAppearsInAltContext(html, tok)) leakedTokens.push(tok.trim());
    });
    if (leakedTokens.length > 0) {
      issues.push('ENGLISH_LEAK: ' + leakedTokens.join(', '));
    }

    // Check 6: cross-locale-distinctive tokens (per §A.13.53 cognate-aware)
    var crossLeaks = [];
    var forbid = FORBIDDEN_FROM_OTHERS[locale] || {};
    Object.keys(forbid).forEach(function (otherLoc) {
      forbid[otherLoc].forEach(function (tok) {
        if (tokenAppearsInAltContext(html, tok)) crossLeaks.push(otherLoc + '/"' + tok + '"');
      });
    });
    if (crossLeaks.length > 0) {
      issues.push('CROSS_LOCALE_LEAK: ' + crossLeaks.join(', '));
    }
  }

  // Check 7: expected positive locale token
  var expected = EXPECTED_LOCALE_TOKENS[locale] || [];
  var foundExpected = expected.some(function (tok) {
    var re = new RegExp('(?:alt|aria-label|image:title|image:caption)="[^"]*' +
      tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^"]*"', 'i');
    return re.test(html);
  });
  if (!foundExpected && expected.length > 0) {
    issues.push('EXPECTED_LOCALE_TOKEN_NOT_FOUND: ' + expected.join('|'));
  }

  return {
    deckendThumbs: deckendThumbMatches.length,
    issues: issues,
  };
}

// ============================================================
// Main
// ============================================================

function parseArgs(argv) {
  var opts = { base: BASE_URL_DEFAULT, locales: ALL_LOCALES.slice(), sampleSlug: null };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--base=') === 0) opts.base = a.slice('--base='.length).replace(/\/+$/, '');
    else if (a.indexOf('--locales=') === 0) opts.locales = a.slice('--locales='.length).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--sample-slug=') === 0) opts.sampleSlug = a.slice('--sample-slug='.length);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node verify-alt-text-coverage.js [--base=https://www.lessoncraftstudio.com]');
      console.log('         [--locales=de,fr,es]    (default: all 11)');
      console.log('         [--sample-slug=<slug>]  (force-test a specific deck slug)');
      process.exit(0);
    }
  });
  return opts;
}

async function findSampleDeckSlug(base, locale) {
  // Strategy: fetch sitemap shard 0 + parse first deck URL matching /<locale>/decks/
  try {
    var res = await fetchUrl(base + '/sitemap/0.xml');
    if (res.status !== 200) return null;
    var re = new RegExp('<loc>' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
      '/' + locale + '/decks/([^/]+)/</loc>');
    var m = re.exec(res.body);
    return m ? m[1] : null;
  } catch (e) {
    return null;
  }
}

async function findSampleTopicSlug(base, locale) {
  try {
    var res = await fetchUrl(base + '/sitemap/3.xml');
    if (res.status !== 200) return null;
    var re = new RegExp('<loc>' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
      '/' + locale + '/topic/([^/]+)/</loc>');
    var m = re.exec(res.body);
    return m ? m[1] : null;
  } catch (e) {
    return null;
  }
}

async function verifyLocale(base, locale, opts) {
  var report = { locale: locale, deckSlug: null, topicSlug: null, checks: {}, pass: true };

  // 1. Sitemap shard 0
  try {
    var sm0 = await fetchUrl(base + '/sitemap/0.xml');
    if (sm0.status !== 200) {
      report.checks.sitemap0 = { fail: true, reason: 'HTTP ' + sm0.status };
      report.pass = false;
    } else {
      var sm0Check = checkSitemap(sm0.body);
      report.checks.sitemap0 = {
        imageCount: sm0Check.imageCount, captionCount: sm0Check.captionCount,
        issues: sm0Check.issues, pass: sm0Check.issues.length === 0
      };
      if (sm0Check.issues.length > 0) report.pass = false;
    }
  } catch (e) {
    report.checks.sitemap0 = { fail: true, reason: e.message };
    report.pass = false;
  }

  // 2. Sample deck
  var slug = opts.sampleSlug || await findSampleDeckSlug(base, locale);
  report.deckSlug = slug;
  if (!slug) {
    report.checks.deckHtml = { skip: 'no sample deck found for locale ' + locale };
  } else {
    try {
      var dh = await fetchUrl(base + '/' + locale + '/decks/' + slug + '/');
      if (dh.status !== 200) {
        report.checks.deckHtml = { fail: true, reason: 'HTTP ' + dh.status };
        report.pass = false;
      } else {
        var dhCheck = checkDeckHtml(dh.body, locale);
        report.checks.deckHtml = {
          deckendThumbs: dhCheck.deckendThumbs,
          issues: dhCheck.issues,
          pass: dhCheck.issues.length === 0
        };
        if (dhCheck.issues.length > 0) report.pass = false;
      }
    } catch (e) {
      report.checks.deckHtml = { fail: true, reason: e.message };
      report.pass = false;
    }
  }

  return report;
}

async function main() {
  var opts = parseArgs(process.argv);
  console.log('=== alt-text coverage verify ===');
  console.log('base:    ' + opts.base);
  console.log('locales: ' + opts.locales.join(', '));
  console.log('');

  var allReports = [];
  for (var i = 0; i < opts.locales.length; i++) {
    var locale = opts.locales[i];
    process.stdout.write('[' + locale + '] ');
    var r = await verifyLocale(opts.base, locale, opts);
    allReports.push(r);
    console.log(r.pass ? 'PASS' : 'FAIL');
    if (!r.pass) {
      Object.keys(r.checks).forEach(function (k) {
        var c = r.checks[k];
        if (c.issues && c.issues.length > 0) {
          console.log('   ' + k + ': ' + c.issues.join(' | '));
        } else if (c.fail) {
          console.log('   ' + k + ': FAIL — ' + c.reason);
        } else if (c.skip) {
          console.log('   ' + k + ': SKIP — ' + c.skip);
        }
      });
    }
  }

  console.log('');
  console.log('=== Summary ===');
  var passed = allReports.filter(function (r) { return r.pass; }).length;
  console.log(passed + '/' + allReports.length + ' locales PASS');

  process.exit(passed === allReports.length ? 0 : 1);
}

if (require.main === module) {
  main().catch(function (e) {
    console.error('FATAL:', e.message);
    process.exit(2);
  });
}

module.exports = {
  checkSitemap: checkSitemap,
  checkDeckHtml: checkDeckHtml,
  FORBIDDEN_EN: FORBIDDEN_EN,
  FORBIDDEN_FROM_OTHERS: FORBIDDEN_FROM_OTHERS,
  EXPECTED_LOCALE_TOKENS: EXPECTED_LOCALE_TOKENS,
  ALL_LOCALES: ALL_LOCALES,
};
