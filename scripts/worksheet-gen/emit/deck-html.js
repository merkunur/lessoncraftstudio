/**
 * emit/deck-html.js — static printable-preview deck.html (no interactive
 * runtime; printable-by-design per Gate-1).
 *
 * The <head> SEO surface is the SERP source of truth: publish.js
 * extractMeta.extract() reads title + description FROM this file, and preband
 * skips printable_only ZIPs — so title + description are composed AND banded
 * here at emit time via publish-cli's build-seo-head.js (titleConfig budget +
 * resolved educational level → bandedDescription 120-170).
 *
 * Publish-time placeholders left for substitute.js: __CANONICAL_URL__,
 * __EDUCATIONAL_LEVEL__(+_LOCALIZED__), __OG_*__, __THUMBNAIL_URL__,
 * __DATE_PUBLISHED__, __AGE_RANGE__, __SEO_KEYWORDS__, __WORKSHEET_MAIN_ALT__,
 * __APP_ARIA_LABEL__, __PDF_URL__, the 4 __LINK_*__/__LINK_TEXT_*__ pairs,
 * __DECK_END_SUGGESTIONS_HEADER__, __SUGGESTION_N_{URL,THUMB,ALT,TITLE}__,
 * and the HREFLANG insertion marker (LAST in <head> per §17.8.1).
 *
 * Body shape mirrors the interactive-deck contract so every publish-wave
 * retrofit is an idempotent no-op: <main id="lcs-app" aria-label> (no
 * role="application" — static page, audit printable profile), single <h1>,
 * instruction <p>, <img id="lcs-worksheet-img"> with width/height + alt
 * placeholder, <aside class="lcs-end-deck"> + BreadcrumbList JSON-LD
 * (inject-deck-end-topic-links → alreadyApplied), the lcs-deckend-suggestions
 * strip (visible + guard script), and <style id="lcs-embed-hide"> baked.
 */
'use strict';
const path = require('path');
const seoHead = require('../../publish-cli/build-seo-head.js');
const i18n = require('../../publish-cli/i18n.js');
const taxonomy = require('../../publish-cli/taxonomy.js');
const TAXONOMY_JSON = require('../../../frontend/config/topics-taxonomy.json');
const TITLE_CONFIG = require('../../publish-cli/seo-title-config.json');

const CANONICAL_BASE = 'https://www.lessoncraftstudio.com';

function esc(s) { return seoHead.escapeHtml(s); }
function escAttr(s) { return seoHead.escapeAttr(s); }

function word(locale, key, fallback) {
  return i18n.resolve(locale, 'seo.words.' + key, fallback).value;
}

function themeNameFor(themeKey, locale) {
  if (!themeKey) return null;
  const entry = TAXONOMY_JSON.axes.theme[themeKey];
  if (!entry || !entry.name) return null;
  return entry.name[locale] || entry.name.en || null;
}

function typeAxisFor(familyKey, locale) {
  const entry = TAXONOMY_JSON.axes['exercise-type'][familyKey];
  if (!entry) throw new Error('deck-html: family key not in taxonomy: ' + familyKey);
  return {
    slug: (entry.slug && (entry.slug[locale] || entry.slug.en)) || familyKey,
    name: (entry.name && (entry.name[locale] || entry.name.en)) || familyKey,
  };
}

function levelFor(ageRange, locale) {
  const levelEn = taxonomy.AGE_RANGE_TO_LEVEL_EN[ageRange];
  const key = taxonomy.AGE_RANGE_TO_LEVEL_I18N_KEY[ageRange];
  if (!levelEn || !key) throw new Error('deck-html: age_range not in §17.8.6 mapping: ' + ageRange);
  return i18n.resolve(locale, 'seo.educational_level.' + key, levelEn).value;
}

function buildBreadcrumbLd(locale, typeAxis, title) {
  const homeLabel = i18n.resolve(locale, 'topicPage.breadcrumb.home', 'Home').value;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabel, item: CANONICAL_BASE + '/' + locale },
      { '@type': 'ListItem', position: 2, name: typeAxis.name, item: CANONICAL_BASE + '/' + locale + '/topic/' + typeAxis.slug },
      { '@type': 'ListItem', position: 3, name: title },
    ],
  });
}

// Deck-end suggestion strip — placeholder shape verbatim per
// REFERENCE TRANSLATIONS/catalog-export.js buildDeckEndSuggestionsPlaceholder,
// but VISIBLE (no interactive celebration to un-hide it) with a guard script
// hiding any tile whose href still carries an unsubstituted placeholder.
function buildSuggestionsStrip() {
  const slots = [];
  for (let i = 1; i <= 6; i++) {
    slots.push(
      '    <li><a href="__SUGGESTION_' + i + '_URL__" class="lcs-deckend-tile">' +
      '<img src="__SUGGESTION_' + i + '_THUMB__" alt="__SUGGESTION_' + i + '_ALT__" loading="lazy" decoding="async" class="lcs-deckend-thumb">' +
      '<span class="lcs-deckend-title">__SUGGESTION_' + i + '_TITLE__</span>' +
      '</a></li>'
    );
  }
  return [
    '<section class="lcs-deckend-suggestions" aria-label="__DECK_END_SUGGESTIONS_HEADER__">',
    '  <h2>__DECK_END_SUGGESTIONS_HEADER__</h2>',
    '  <ul>',
    slots.join('\n'),
    '  </ul>',
    '</section>',
    '<script>(function(){var t=document.querySelectorAll(".lcs-deckend-tile");var v=0;for(var i=0;i<t.length;i++){var h=t[i].getAttribute("href")||"";if(h.indexOf("__SUGGESTION_")!==-1){t[i].parentNode.style.display="none"}else{v++}}if(!v){var s=document.querySelector(".lcs-deckend-suggestions");if(s)s.hidden=true}})();</script>',
  ].join('\n');
}

const PAGE_CSS = [
  ':root{--cream:#FBF3E4;--teal:#146B5E;--coral:#F2784B;--ink:#1C1C1E}',
  '*{box-sizing:border-box}',
  'body{margin:0;background:var(--cream);font-family:Nunito,system-ui,sans-serif;color:var(--ink)}',
  'main#lcs-app{max-width:880px;margin:0 auto;padding:28px 16px 8px}',
  'h1{font-family:"Baloo 2",Nunito,system-ui,sans-serif;color:var(--teal);font-size:1.9rem;margin:0 0 6px;text-align:center}',
  '.lcs-instruction{text-align:center;font-size:1.05rem;margin:0 0 18px;color:#3D3D3F}',
  '.lcs-worksheet{display:block;margin:0 auto 20px;max-width:720px}',
  '.lcs-worksheet__img{display:block;width:100%;height:auto;border-radius:14px;box-shadow:0 4px 18px rgba(20,107,94,.16);background:#FFF}',
  '.lcs-download{display:flex;justify-content:center;margin:0 0 26px}',
  '.lcs-download-cta{display:inline-flex;align-items:center;gap:10px;background:var(--coral);color:#FFF;text-decoration:none;font-family:"Baloo 2",Nunito,sans-serif;font-size:1.15rem;font-weight:600;padding:13px 30px;border-radius:999px;box-shadow:0 3px 10px rgba(242,120,75,.35);transition:transform .15s,box-shadow .15s}',
  '.lcs-download-cta:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(242,120,75,.45)}',
  '.lcs-end-deck{max-width:880px;margin:0 auto;padding:0 16px}',
  '.end-deck-links{background:#FFF;border:2px solid #DCE1E6;border-radius:14px;padding:18px 20px;margin:0 0 20px}',
  '.end-deck-links h2{font-size:1.1rem;margin:0 0 10px;color:var(--ink)}',
  '.end-deck-links ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px 20px}',
  '.end-deck-links a{color:#4E5FE8;text-decoration:none;font-weight:600}',
  '.end-deck-links a:hover{text-decoration:underline}',
  '.lcs-footer{text-align:center;font-size:.85rem;color:#6B6B6E;padding:10px 0 28px}',
  '.lcs-footer a{color:var(--teal);font-weight:600;text-decoration:none}',
  // deckend-suggestions CSS verbatim per catalog-export.js (showreel design)
  '.lcs-deckend-suggestions{margin:24px 16px 96px;padding:18px 12px;background:#FFF;border:2px solid #DCE1E6;border-radius:14px;overflow:hidden}',
  '.lcs-deckend-suggestions[hidden]{display:none}',
  '.lcs-deckend-suggestions h2{font-size:1.1rem;margin:0 0 14px;color:#1C1C1E;text-align:center}',
  '.lcs-deckend-suggestions ul{list-style:none;padding:4px 4px 12px;margin:0;display:grid;grid-auto-flow:column;grid-auto-columns:140px;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scroll-padding-left:4px;scrollbar-color:#C9CFD6 transparent}',
  '.lcs-deckend-tile{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px 8px;border-radius:12px;background:#F4F6FB;color:#4E5FE8;text-decoration:none;font-weight:500;transition:transform .15s,box-shadow .15s,background-color .15s;scroll-snap-align:start;box-shadow:0 1px 3px rgba(0,0,0,0.05)}',
  '.lcs-deckend-tile:hover{background:#E8ECF7;transform:translateY(-3px);box-shadow:0 6px 14px rgba(78,95,232,0.18)}',
  '.lcs-deckend-thumb{display:block;width:100%;height:155px;object-fit:cover;object-position:center top;border-radius:8px;background:#FFF;box-shadow:0 1px 4px rgba(0,0,0,0.08)}',
  '.lcs-deckend-title{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-align:center;font-size:.825rem;line-height:1.3;width:100%}',
  '@media print{.lcs-deckend-suggestions,.lcs-end-deck,.lcs-download,.lcs-footer{display:none !important}}',
].join('\n');

/**
 * @param {object} o {manifest, spec, strings {title, instruction}, locale,
 *   preview {dataUri, width, height}}
 * @returns {string} deck.html
 */
function buildDeckHtml(o) {
  const { manifest, spec, strings, locale, preview } = o;
  const themeKey = manifest.theme;
  const typeAxis = typeAxisFor(spec.exerciseType, locale);
  const themeName = themeNameFor(themeKey, locale);
  const levelLocalized = levelFor(manifest.age_range, locale);
  const modeName = seoHead.deriveExerciseModeName(manifest.exercise_mode, locale, TAXONOMY_JSON);

  const seoBlock = seoHead.buildSeoHead({
    language: locale,
    exerciseTypeName: strings.title,
    exerciseTypeSlug: spec.exerciseType,
    themeName: themeName,
    exerciseModeName: modeName,
    exerciseModeKey: manifest.exercise_mode,
    worksheetWord: word(locale, 'worksheet', 'Worksheet'),
    instruction: strings.instruction,
    freeInteractive: word(locale, 'free_printable', 'Free printable'),
    forWord: word(locale, 'for', 'for'),
    printOrPlay: word(locale, 'download_pdf', 'Download the free PDF'),
    educationalLevelLocalized: levelLocalized,
    titleConfig: TITLE_CONFIG[locale] || TITLE_CONFIG._default,
  });

  const downloadLabel = word(locale, 'download_pdf', 'Download the free PDF');
  const breadcrumbLd = buildBreadcrumbLd(locale, typeAxis, strings.title);

  return [
    '<!DOCTYPE html>',
    '<html lang="' + locale + '">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<style id="lcs-embed-hide">body.lcs-embedded .lcs-end-deck,body.lcs-embedded .lcs-deckend-suggestions{display:none!important}</style>',
    seoBlock,
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" media="print" onload="this.media=\'all\'">',
    '<style>' + PAGE_CSS + '</style>',
    '<script type="application/ld+json">' + breadcrumbLd + '</script>',
    '<!-- HREFLANG_INSERTION_POINT -->',
    '</head>',
    '<body>',
    '<main id="lcs-app" aria-label="__APP_ARIA_LABEL__">',
    '  <h1>' + esc(strings.title) + (themeName ? ' — ' + esc(themeName) : '') + '</h1>',
    '  <p class="lcs-instruction">' + esc(strings.instruction) + '</p>',
    '  <div class="lcs-worksheet">',
    '    <img class="lcs-worksheet__img" id="lcs-worksheet-img" alt="__WORKSHEET_MAIN_ALT__" width="' + preview.width + '" height="' + preview.height + '" src="' + preview.dataUri + '">',
    '  </div>',
    '  <div class="lcs-download">',
    '    <a class="lcs-download-cta" href="__PDF_URL__">⬇ ' + esc(downloadLabel) + '</a>',
    '  </div>',
    '</main>',
    '<aside class="lcs-end-deck">',
    '  <div class="end-deck-links">',
    '    <h2>__END_DECK_HEADING__</h2>',
    '    <ul>',
    '      <li><a href="__LINK_MORE_TYPE__">__LINK_TEXT_MORE_TYPE__</a></li>',
    '      <li><a href="__LINK_MORE_THEME__">__LINK_TEXT_MORE_THEME__</a></li>',
    '      <li><a href="__LINK_MORE_LEVEL__">__LINK_TEXT_MORE_LEVEL__</a></li>',
    '      <li><a href="__LINK_BROWSE_ALL__">__LINK_TEXT_BROWSE_ALL__</a></li>',
    '    </ul>',
    '  </div>',
    '</aside>',
    buildSuggestionsStrip(),
    '<footer class="lcs-footer">Made with <a href="https://www.lessoncraftstudio.com">LessonCraftStudio.com</a></footer>',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

module.exports = { buildDeckHtml, themeNameFor, typeAxisFor, levelFor };
