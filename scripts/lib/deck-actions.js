/**
 * deck-actions.js — the ONE place the deck action strip exists.
 *
 *   [ ⬇ Download PDF ]  [ ✓ Answer key ]  [ ✎ Make your own ]
 *
 * WHY. A published deck.html (nginx-served, /<locale>/decks/<slug>/) carried no
 * link to its own printable PDF, its answer key, or the worksheet generator that
 * made it — the 29 apps never emit one (catalog-export.js only names the PDFs
 * as ZIP artifacts). Deck CARDS and the deck LANDING hero have those buttons;
 * the ~10k decks without a landing had them nowhere on the page a teacher
 * actually opens. Operator commission 2026-09-20: put the buttons on the page,
 * and add "Make your own" everywhere (decks AND landings), opening the
 * generator's own landing in the page's language.
 *
 * ARCHITECTURE (the site-chrome rule, scripts/lib/site-chrome.js). Two
 * producers consume this module — scripts/publish-cli/inject-deck-actions.js
 * (the deck retrofit + the publish-wave forward path) and
 * scripts/seo-landing/render-landing-html.js (the static landings, for the
 * "Make your own" label). There is deliberately NO emitter in
 * catalog-export.js: a browser file cannot require(), so it would need a
 * byte-duplicated copy plus a placeholder group — the exact drift trap CLAUDE.md
 * §21.8-A records. Zero edits to the 29 app HTML files.
 *
 * STRINGS live in frontend/messages/<locale>.json under `deckActions.*`
 * (4 keys × 11 locales). `downloadPdf` / `answerKey` are verbatim the landing
 * hero's UI_STRINGS so the strip and the hero say the same thing.
 *
 * HREFS.
 *  - PDF / answer key go through the METERED proxy /api/quota/dl — the same href
 *    the static landings use (render-landing-html.js: dlHref). A raw file link
 *    would bypass the free tier's monthly download allowance (frontend/lib/quota.ts).
 *  - "Make your own" → https://www.lessoncraftstudio.com/<loc>/tools/<maker-slug>,
 *    the generator's public landing in the deck's language. Absolute www, NO
 *    trailing slash (frontend/next.config.js trailingSlash:false → 308).
 *    The maker slug is read from frontend/messages/maker-content/<locale>.json;
 *    no slug ⇒ no button — never a dead link.
 *
 * ONE marker pair, ONE anchor, ONE strip regex: the <style> rides inside the
 * block (the .lcs-deckend-suggestions strip already carries its <style> in
 * <body>), so `--remove` is a single non-greedy replace and `--rewrite` is
 * byte-idempotent (deck-actions.test.js proves the 5× round trip on a REAL
 * production deck.html).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const siteChrome = require('./site-chrome');

const REPO_ROOT = siteChrome.REPO_ROOT;
const LOCALES = siteChrome.LOCALES;
const CANONICAL_BASE = siteChrome.CANONICAL_BASE;
const MESSAGES_DIR = path.join(REPO_ROOT, 'frontend', 'messages');
const MAKER_CONTENT_DIR = path.join(MESSAGES_DIR, 'maker-content');

// ---------------------------------------------------------------------------
// Markers
// ---------------------------------------------------------------------------

/** Cheap indexOf probe — the `inject-*` family dialect. */
const MARKER = 'id="lcs-deck-actions"';
const START = '<!--LCS_DECK_ACTIONS_START-->';
const END = '<!--LCS_DECK_ACTIONS_END-->';

/**
 * ⚠ NON-GREEDY and anchored on BOTH sentinels; leading `\n?` ONLY. The injector
 * writes exactly one leading newline before the block and no trailing one, so
 * the strip consumes exactly that. (site-chrome.js records both ways this goes
 * wrong: a trailing `\n?` eats the document's own newline, no leading `\n?`
 * leaves a blank line behind — either compounds silently across ~45k files.)
 */
const STRIP_RE = /\n?<!--LCS_DECK_ACTIONS_START-->[\s\S]*?<!--LCS_DECK_ACTIONS_END-->/g;

/** The body anchor: uniform across all 29 apps (verified 2026-09-20). */
const ANCHOR = '<div class="lcs-worksheet-wrap">';

/** EN emits `picture-trail` for the picture-path app (§15.10). */
const MAKER_TYPE_ALIAS = { 'picture-trail': 'picture-path' };

/** Frozen route segment — deck-actions.test.js asserts the page.tsx still exists. */
const TOOLS_SEGMENT = 'tools';

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

const STRING_SPEC = {
  downloadPdf: { key: 'deckActions.downloadPdf', fallbackEn: 'Download PDF' },
  answerKey:   { key: 'deckActions.answerKey',   fallbackEn: 'Answer key' },
  makeYourOwn: { key: 'deckActions.makeYourOwn', fallbackEn: 'Make your own' },
  ariaLabel:   { key: 'deckActions.ariaLabel',   fallbackEn: 'Download this worksheet or make your own' },
};

const _msgCache = new Map();
function loadMessages(locale) {
  if (_msgCache.has(locale)) return _msgCache.get(locale);
  let obj = {};
  try { obj = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, locale + '.json'), 'utf8')); } catch (_e) { obj = {}; }
  _msgCache.set(locale, obj);
  return obj;
}
function dotGet(obj, dotPath) {
  return dotPath.split('.').reduce((a, k) => (a && typeof a === 'object' ? a[k] : undefined), obj);
}

const escapeHtml = siteChrome.escapeHtml;

const _stringsCache = new Map();
/** Every strip string for a locale, ALREADY HTML-ESCAPED. Fallback: locale → en → hardcoded EN. */
function strings(locale) {
  if (_stringsCache.has(locale)) return _stringsCache.get(locale);
  const msgs = loadMessages(locale);
  const en = locale === 'en' ? msgs : loadMessages('en');
  const out = {};
  for (const name of Object.keys(STRING_SPEC)) {
    const spec = STRING_SPEC[name];
    let v = dotGet(msgs, spec.key);
    if (typeof v !== 'string' || !v) v = dotGet(en, spec.key);
    if (typeof v !== 'string' || !v) v = spec.fallbackEn;
    out[name] = escapeHtml(v);
  }
  _stringsCache.set(locale, out);
  return out;
}

// ---------------------------------------------------------------------------
// Maker landing resolution
// ---------------------------------------------------------------------------

const _makerCache = new Map();
function loadMakerContent(locale) {
  if (_makerCache.has(locale)) return _makerCache.get(locale);
  let obj = null;
  try { obj = JSON.parse(fs.readFileSync(path.join(MAKER_CONTENT_DIR, locale + '.json'), 'utf8')); } catch (_e) { obj = null; }
  _makerCache.set(locale, obj);
  return obj;
}

/** manifest.generator.app → the canonical maker key (alias-folded), or null. */
function makerKeyFor(appKey) {
  if (!appKey || typeof appKey !== 'string') return null;
  return MAKER_TYPE_ALIAS[appKey] || appKey;
}

/** The native-language landing slug for (locale, app), or null when the locale has none. */
function makerSlug(locale, appKey) {
  const key = makerKeyFor(appKey);
  if (!key) return null;
  const file = loadMakerContent(locale);
  const entry = file && file[key];
  return entry && typeof entry.slug === 'string' && entry.slug ? entry.slug : null;
}

/** Absolute landing URL, or null. No trailing slash. */
function makerUrl(locale, appKey) {
  const slug = makerSlug(locale, appKey);
  return slug ? CANONICAL_BASE + '/' + locale + '/' + TOOLS_SEGMENT + '/' + slug : null;
}

/** Metered download href — byte-identical to render-landing-html.js: dlHref. */
function dlHref(locale, deckSlug, kind) {
  return CANONICAL_BASE + '/api/quota/dl?loc=' + encodeURIComponent(locale) +
    '&slug=' + encodeURIComponent(deckSlug) + '&kind=' + kind;
}

// ---------------------------------------------------------------------------
// CSS + markup
// ---------------------------------------------------------------------------

/**
 * Everything is namespaced under #lcs-deck-actions (1-0-0 outranks every deck
 * class rule; !important only in the three hide states). Palette = the landing
 * hero's secondary buttons (teal outline on white, hover #E3EEEB); the maker
 * button carries the coral accent so *create* reads differently from *download*.
 * min-height 40px matches the title bar's own 40px icon buttons.
 */
function cssRules() {
  return [
    '#lcs-deck-actions{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;',
    'gap:8px;margin:0;padding:2px 4px 10px;font-family:inherit;box-sizing:border-box}',
    '#lcs-deck-actions .lcs-da-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;',
    'min-height:40px;padding:0 15px;border-radius:999px;border:2px solid #146B5E;background:#FFF;',
    'color:#146B5E;font-family:inherit;font-weight:700;font-size:14px;line-height:1.15;',
    'text-decoration:none;white-space:nowrap;box-sizing:border-box;',
    'transition:background-color .15s ease,border-color .15s ease,color .15s ease}',
    '#lcs-deck-actions .lcs-da-btn:hover{background:#E3EEEB}',
    '#lcs-deck-actions .lcs-da-btn:focus-visible{outline:3px solid #146B5E;outline-offset:2px}',
    '#lcs-deck-actions .lcs-da-btn svg{width:16px;height:16px;flex:0 0 auto;pointer-events:none}',
    '#lcs-deck-actions .lcs-da-btn--make{border-color:#F2784B;color:#9A4521}',
    '#lcs-deck-actions .lcs-da-btn--make:hover{background:#FBEDE6}',
    '#lcs-deck-actions .lcs-da-btn--make:focus-visible{outline-color:#F2784B}',
    '@media (prefers-reduced-motion:reduce){#lcs-deck-actions .lcs-da-btn{transition:none}}',
    /* ---- HIDE STATES (all three mandatory on deck pages; see site-chrome.js) ---- */
    '@media print{#lcs-deck-actions{display:none!important}}',
    'body.lcs-embedded #lcs-deck-actions{display:none!important}',
    '@media (max-width:1024px) and (orientation:landscape){',
    'body.lcs-worksheet-landscape #lcs-deck-actions{display:none!important}}',
  ].join('');
}

const ICONS = {
  download: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>',
  key: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5 9 17.5 20 6.5"/></svg>',
  make: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="m13.5 8.5 3 3"/></svg>',
};

/**
 * Build the sentinel-wrapped block.
 * @param {{locale:string, slug:string, hasAnswerKey:boolean, appKey:string|null}} o
 *   slug     = the deck's canonical slug (the `<slug>-printable.pdf` stem on disk)
 *   appKey   = manifest.generator.app (alias-folded here); null/unknown ⇒ no maker button
 * @returns {string}
 */
function block(o) {
  if (!o || !o.locale || !o.slug) throw new Error('deck-actions.block: locale and slug are required');
  const s = strings(o.locale);
  const parts = [];
  parts.push('<a class="lcs-da-btn lcs-da-btn--pdf" href="' + escapeHtml(dlHref(o.locale, o.slug, 'pdf')) +
    '" rel="nofollow" target="_blank">' + ICONS.download + '<span>' + s.downloadPdf + '</span></a>');
  if (o.hasAnswerKey) {
    parts.push('<a class="lcs-da-btn lcs-da-btn--key" href="' + escapeHtml(dlHref(o.locale, o.slug, 'answer')) +
      '" rel="nofollow" target="_blank">' + ICONS.key + '<span>' + s.answerKey + '</span></a>');
  }
  const mk = makerUrl(o.locale, o.appKey);
  if (mk) {
    parts.push('<a class="lcs-da-btn lcs-da-btn--make" href="' + escapeHtml(mk) + '">' +
      ICONS.make + '<span>' + s.makeYourOwn + '</span></a>');
  }
  return START +
    '<style id="lcs-deck-actions-css">' + cssRules() + '</style>' +
    '<nav id="lcs-deck-actions" aria-label="' + s.ariaLabel + '">' + parts.join('') + '</nav>' +
    END;
}

module.exports = {
  LOCALES,
  CANONICAL_BASE,
  REPO_ROOT,
  MESSAGES_DIR,
  MAKER_CONTENT_DIR,
  MARKER,
  START,
  END,
  STRIP_RE,
  ANCHOR,
  TOOLS_SEGMENT,
  MAKER_TYPE_ALIAS,
  STRING_SPEC,
  ICONS,
  escapeHtml,
  strings,
  makerKeyFor,
  makerSlug,
  makerUrl,
  dlHref,
  cssRules,
  block,
};
