'use strict';

/**
 * page-content.js — single source of truth for crawlable-word extraction from
 * a rendered catalog page's HTML. Imported by both audit-thin-pages.js (Part 1
 * thin-page audit) and the future reconcileThinPage predicate (Phase 5 gate),
 * so the word-count definition can never drift between audit and enforcement.
 *
 * "Crawlable words" = visible editorial text in the page's main content region
 * after stripping <script>/<style>/<noscript>, collapsing tags to spaces, and
 * decoding HTML entities. For topic + intersection pages we isolate the
 * EDITORIAL region (the <h1>, the topic-prose section, and the Phase-1 FAQ /
 * usage sections) so that deck-grid tiles, filter sidebars, variety strips,
 * breadcrumbs, nav and footer boilerplate do NOT inflate the count — that
 * editorial region is what Google weighs for "thin content" per CLAUDE.md
 * §17.4 (200-400 words). For activity / standards / hub pages we count the
 * whole <main> region (coarse) since their editorial text is small and not
 * wrapped in a distinct prose section.
 *
 * Read-only / pure. No I/O.
 */

function stripNonContent(html) {
  return String(html || '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, function (_, h) { return String.fromCharCode(parseInt(h, 16)); })
    .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(parseInt(n, 10)); })
    .replace(/&[a-z]+;/gi, ' ');
}

function tagsToText(htmlFragment) {
  var noTags = String(htmlFragment || '').replace(/<[^>]+>/g, ' ');
  return decodeEntities(noTags).replace(/\s+/g, ' ').trim();
}

function countWords(text) {
  var t = String(text || '').trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

// Editorial-region selectors for topic + intersection pages. Each is matched
// non-greedily to its first matching close tag; the topic-prose / faq / usage
// sections never nest a child <section>, so non-greedy is safe. The FAQ +
// page-usage sections do not exist until Phase 1 ships — the patterns simply
// match nothing until then, which correctly reflects the current thin state.
var TOPIC_EDITORIAL_PATTERNS = [
  /<h1\b[^>]*>[\s\S]*?<\/h1>/i,
  /<section\b[^>]*class="[^"]*topic-prose[^"]*"[^>]*>[\s\S]*?<\/section>/i,
  /<section\b[^>]*class="[^"]*topic-faq[^"]*"[^>]*>[\s\S]*?<\/section>/i,
  /<section\b[^>]*class="[^"]*page-usage[^"]*"[^>]*>[\s\S]*?<\/section>/i,
];

var MAIN_PATTERN = /<main\b[^>]*>([\s\S]*?)<\/main>/i;

function extractEditorial(cleanHtml) {
  var parts = [];
  TOPIC_EDITORIAL_PATTERNS.forEach(function (re) {
    var m = re.exec(cleanHtml);
    if (m) parts.push(m[0]);
  });
  return parts.join(' ');
}

function extractMain(cleanHtml) {
  var m = MAIN_PATTERN.exec(cleanHtml);
  return m ? m[1] : '';
}

/**
 * countRenderedWords(htmlText, pageType) -> { words, region, preview }
 *
 * pageType:
 *   'topic-single' | 'topic-intersection' -> editorial region (prose + h1 + faq + usage)
 *   'activity' | 'standards' | 'hub' | (anything else) -> whole <main> (coarse)
 *
 * region records which extraction path ran ('editorial' | 'main-coarse' |
 * 'fallback-body'); preview is the first ~200 chars of extracted text.
 */
function countRenderedWords(htmlText, pageType) {
  var clean = stripNonContent(htmlText);
  var region;
  var fragment;

  if (pageType === 'topic-single' || pageType === 'topic-intersection') {
    fragment = extractEditorial(clean);
    region = 'editorial';
    // If editorial extraction found nothing (unexpected markup), fall back to
    // <main> so we never silently report 0 for a page that actually renders.
    if (!fragment) {
      fragment = extractMain(clean);
      region = 'fallback-body';
    }
  } else {
    fragment = extractMain(clean);
    region = 'main-coarse';
    if (!fragment) {
      fragment = clean;
      region = 'fallback-body';
    }
  }

  var text = tagsToText(fragment);
  return { words: countWords(text), region: region, preview: text.slice(0, 200) };
}

/**
 * Band a word count per the locked thin-page thresholds.
 * CRITICAL_THIN < critical (default 50) | THIN < floor (default 200) |
 * RICH <= over (default 600) | OVER > over.
 */
function bandWordCount(words, opts) {
  var critical = (opts && opts.criticalFloor) || 50;
  var floor = (opts && opts.thinFloor) || 200;
  var over = (opts && opts.overCeiling) || 600;
  if (words < critical) return 'CRITICAL_THIN';
  if (words < floor) return 'THIN';
  if (words <= over) return 'RICH';
  return 'OVER';
}

// Per-locale RICH word-count floor (morphological calibration). The same
// structural floor (FAQ + usage + intro) renders far fewer word-TOKENS in
// agglutinative / compound-heavy languages than in English for equivalent
// content — e.g. fi single-axis median 173w vs en 235w (~0.74). A raw 200-word
// bar under-measures those locales. CRITICAL stays absolute (a sub-50-word page
// is thin in ANY language); only the RICH bar is calibrated:
//   Romance + English (analytic; token counts ≈ or > en): 200
//   Germanic compounding (de/nl/sv/da/no): 175
//   Finnic agglutinative (fi): 150
// Empirically grounded in the 2026-05-29 11-locale single-axis medians. Shared
// SoT so both audit-thin-pages.js and the Phase-5 reconcileThinPage gate band
// pages identically.
var LOCALE_RICH_FLOOR = {
  en: 200, fr: 200, es: 200, pt: 200, it: 200,
  de: 175, nl: 175, sv: 175, da: 175, no: 175,
  fi: 150,
};
function richFloorFor(locale) {
  return LOCALE_RICH_FLOOR[locale] != null ? LOCALE_RICH_FLOOR[locale] : 200;
}

module.exports = {
  stripNonContent: stripNonContent,
  decodeEntities: decodeEntities,
  tagsToText: tagsToText,
  countWords: countWords,
  countRenderedWords: countRenderedWords,
  bandWordCount: bandWordCount,
  LOCALE_RICH_FLOOR: LOCALE_RICH_FLOOR,
  richFloorFor: richFloorFor,
};
