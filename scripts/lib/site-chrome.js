/**
 * site-chrome.js — the SINGLE source of truth for the static site header +
 * footer that ship on the two nginx-served surfaces which live OUTSIDE the
 * Next.js app and therefore never inherit app/[locale]/layout.tsx chrome:
 *
 *   A. worksheet landings  /<loc>/worksheets/<slug>   (~30,078 pages)
 *      producer: scripts/seo-landing/render-landing-html.js
 *      served:   /var/www/lcs-media/landings/<loc>/<slug>/index.html
 *
 *   B. deck players        /<loc>/decks/<slug>/       (~9,752+ pages)
 *      producer: scripts/publish-cli/inject-deck-site-chrome.js (retrofit +
 *                publish-wave STEP 6c, so it is also the forward path)
 *      served:   /var/www/lcs-media/decks/<loc>/<slug>-v<N>/deck.html
 *
 * ⚠ WHY ONE MODULE. The dominant hazard in this area is the DUPLICATED
 * RENDERER: buildHreflangAlternates already exists twice (frontend/lib/seo/
 * hreflang.ts AND a hand-copied port inside render-landing-html.js), and
 * CLAUDE.md §21.8-A records a fix that shipped to the TS copy and changed
 * NOTHING on 30,078 live pages. Both producers here `require()` this file, so
 * that failure mode is structurally impossible. Do not inline a second copy of
 * this markup anywhere — not in catalog-export.js (a browser file that cannot
 * require), not in worksheet-gen (its ZIPs go through the same publish wave).
 *
 * Zero dependencies, plain CommonJS, safe to run from the repo root on the PC
 * and from /opt/lessoncraftstudio on Hetzner.
 *
 * ⚠ PRICING_PUBLIC coupling: the live footer flip-gates its /pricing link on
 * frontend/config/subscription-launch.ts PRICING_PUBLIC (currently true).
 * Baked static HTML cannot flip-gate. If that flag ever goes false, ~40k static
 * files link to a hidden page and need one `inject-deck-site-chrome --rewrite`
 * pass plus a redeploy (which regenerates the landings automatically).
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Repo root resolution — mirrors render-landing-html.js:36-46 so both callers
// resolve identically whether invoked from the repo root, from scripts/, or
// from /opt/lessoncraftstudio.
// ---------------------------------------------------------------------------
function findRepoRoot() {
  const candidates = [
    path.resolve(__dirname, '..', '..'),
    process.cwd(),
    '/opt/lessoncraftstudio',
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, 'frontend', 'messages', 'en.json'))) return c;
  }
  throw new Error('site-chrome: cannot locate repo root (no frontend/messages/en.json)');
}

const REPO_ROOT = findRepoRoot();
const MESSAGES_DIR = path.join(REPO_ROOT, 'frontend', 'messages');

const LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

const CANONICAL_BASE = 'https://www.lessoncraftstudio.com';

/**
 * Locale code → hreflang code, matching frontend/lib/seo/hreflang.ts and the
 * port in render-landing-html.js:292. `pt` emits `pt-BR` (Brazilian Portuguese
 * is canonical per §6); everything else maps 1:1. Used for the advisory
 * hreflang attribute on the footer's language links.
 */
const HREFLANG_CODE = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

/**
 * Native endonyms, verbatim from frontend/components/LanguageSelector.tsx:13-25.
 * Language names are correctly NOT translated — a Finn looking for German wants
 * to see "Deutsch", not "saksa".
 */
const ENDONYMS = {
  da: 'Dansk',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  nl: 'Nederlands',
  no: 'Norsk',
  pt: 'Português',
  fi: 'Suomi',
  sv: 'Svenska',
};

// ---------------------------------------------------------------------------
// Idempotence markers + strip regexes
// ---------------------------------------------------------------------------

/** Cheap indexOf probe — the `inject-*` family dialect. */
const MARKER = 'id="lcs-site-chrome"';
const CSS_MARKER = 'id="lcs-site-chrome-css"';
const FOOTER_MARKER = 'id="lcs-site-footer"';

const CSS_START = '<!--LCS_CHROME_CSS_START-->';
const CSS_END = '<!--LCS_CHROME_CSS_END-->';
const HDR_START = '<!--LCS_CHROME_HDR_START-->';
const HDR_END = '<!--LCS_CHROME_HDR_END-->';
const FTR_START = '<!--LCS_CHROME_FTR_START-->';
const FTR_END = '<!--LCS_CHROME_FTR_END-->';

/**
 * ⚠ NON-GREEDY, and anchored on BOTH literal sentinels. A greedy `[\s\S]*`
 * here would delete everything between the FIRST CSS_START and the LAST
 * FTR_END — i.e. the entire document body — atomically, across 9,752 files.
 * verify-deck-site-chrome.js asserts each sentinel occurs exactly once, which
 * is what keeps --rewrite provably bounded.
 *
 * ⚠ STRIP AND INJECT MUST BE EXACTLY SYMMETRIC. The injector writes exactly one
 * LEADING newline before each block and no trailing one, so the strip consumes
 * exactly one leading newline and no trailing one. Get this wrong in either
 * direction and `--rewrite` is not byte-idempotent:
 *   - trailing `\n?` here ate the DOCUMENT'S OWN newline after <head> and
 *     <body>, so every rewrite cycle shrank the file by 2 bytes;
 *   - no leading `\n?` would leave our newline behind, so every rewrite cycle
 *     would GROW the file by a blank line per block, forever.
 * Both were caught by the round-trip check — which is why that check exists.
 */
const STRIP_RES = [
  /\n?<!--LCS_CHROME_CSS_START-->[\s\S]*?<!--LCS_CHROME_CSS_END-->/g,
  /\n?<!--LCS_CHROME_HDR_START-->[\s\S]*?<!--LCS_CHROME_HDR_END-->/g,
  /\n?<!--LCS_CHROME_FTR_START-->[\s\S]*?<!--LCS_CHROME_FTR_END-->/g,
];

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

const _msgCache = new Map();

function loadMessages(locale) {
  if (_msgCache.has(locale)) return _msgCache.get(locale);
  let obj = {};
  try {
    obj = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, locale + '.json'), 'utf8'));
  } catch (_e) {
    obj = {};
  }
  _msgCache.set(locale, obj);
  return obj;
}

function dotGet(obj, dotPath) {
  return dotPath.split('.').reduce((a, k) => (a && typeof a === 'object' ? a[k] : undefined), obj);
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * The 13 chrome strings. Every key below was verified present in all 11 locale
 * files; `fallbackEn` exists only so a future message-file regression degrades
 * to English instead of emitting a raw dot-path.
 *
 * Note `tools` reads nav.categories.manipulatives (the CATEGORY label, "Tools"/
 * "Werkzeuge") rather than navigation.tools ("Free Tools"/"Kostenlose Tools"):
 * this is a category nav row and must match the live CategoryNav wording.
 */
const STRING_SPEC = {
  worksheets:   { key: 'nav.categories.worksheets',     fallbackEn: 'Worksheets' },
  activities:   { key: 'nav.categories.activities',     fallbackEn: 'Activities' },
  tools:        { key: 'nav.categories.manipulatives',  fallbackEn: 'Tools' },
  makers:       { key: 'nav.categories.apps',           fallbackEn: 'Worksheet creators' },
  browseAll:    { key: 'endDeck.browseAll',             fallbackEn: 'Browse all worksheets' },
  byLanguage:   { key: 'footer.byLanguage',             fallbackEn: 'Worksheets by language' },
  about:        { key: 'footer.about',                  fallbackEn: 'About' },
  contact:      { key: 'footer.contact',                fallbackEn: 'Contact' },
  pricing:      { key: 'navigation.pricing',            fallbackEn: 'Pricing' },
  terms:        { key: 'footer.terms',                  fallbackEn: 'Terms' },
  privacy:      { key: 'footer.privacy',                fallbackEn: 'Privacy' },
  copyright:    { key: 'footer.copyright',              fallbackEn: '© 2026 LessonCraftStudio.' },
  siteNav:      { key: '__literal__',                   fallbackEn: 'LessonCraftStudio' },
};

const _stringsCache = new Map();

/**
 * Resolve every chrome string for a locale, ALREADY HTML-ESCAPED. Escaping
 * happens once, here, so no call site can forget it — and it genuinely matters:
 * fr renders "Conditions d'utilisation" (apostrophe) and several locales carry
 * &-joined labels.
 *
 * Fallback chain: locale → en → hardcoded English.
 */
function strings(locale) {
  if (_stringsCache.has(locale)) return _stringsCache.get(locale);
  const msgs = loadMessages(locale);
  const en = locale === 'en' ? msgs : loadMessages('en');
  const out = {};
  for (const name of Object.keys(STRING_SPEC)) {
    const spec = STRING_SPEC[name];
    let v;
    if (spec.key === '__literal__') {
      v = spec.fallbackEn;
    } else {
      v = dotGet(msgs, spec.key);
      if (typeof v !== 'string' || !v) v = dotGet(en, spec.key);
      if (typeof v !== 'string' || !v) v = spec.fallbackEn;
    }
    out[name] = escapeHtml(v);
  }
  _stringsCache.set(locale, out);
  return out;
}

// ---------------------------------------------------------------------------
// URLs
// ---------------------------------------------------------------------------

/**
 * Absolute, and with NO trailing slash: frontend/next.config.js sets
 * `trailingSlash: false`, so a trailing slash 308-redirects — the exact defect
 * scripts/publish-cli/rewrite-deck-html-topic-slash.js exists to undo. Absolute
 * (rather than root-relative) matches the existing deckend-tile precedent and
 * keeps a downloaded/offline copy of a deck working.
 *
 * ⚠ These path segments are frozen into ~40k static files with no build-time
 * reference. site-chrome.test.js asserts each still has a page.tsx, so a route
 * rename fails a test instead of leaving ~40k dead links.
 */
const ROUTE_SEGMENTS = {
  worksheets: 'worksheets',
  activities: 'activities',
  tools: 'tools',
  makers: 'worksheet-makers',
  about: 'about',
  contact: 'contact',
  pricing: 'pricing',
  terms: 'terms',
  privacy: 'privacy',
};

function urls(locale) {
  const base = CANONICAL_BASE + '/' + locale;
  const out = { home: base };
  for (const name of Object.keys(ROUTE_SEGMENTS)) {
    out[name] = base + '/' + ROUTE_SEGMENTS[name];
  }
  return out;
}

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------

/**
 * Everything is namespaced under #lcs-site-chrome / #lcs-site-footer / .lcs-sc-*.
 * No bare element selectors anywhere: deck.html resets ONLY box-sizing (no
 * margin/padding reset, no bare a{}/ul{}), while the landing PAGE_CSS has a full
 * `*{margin:0;padding:0}` reset AND a bare `a{color:inherit}`. So the chrome
 * zeroes its own margins and sets every colour explicitly, or it inherits
 * differently on each host.
 *
 * An ID selector is 1-0-0, which outranks every class rule in either host, so
 * !important is confined to the three hide states.
 */
function cssRules() {
  return [
    /* ---- shared tokens + reset (scoped) ---- */
    '#lcs-site-chrome,#lcs-site-footer{',
    '--lcs-sc-paper:#FFFFFF;--lcs-sc-cream:#FCFAF4;--lcs-sc-rule:#E8DFCB;',
    '--lcs-sc-ink-500:#5A5345;--lcs-sc-ink-700:#2E2A22;--lcs-sc-ink-900:#1A1814;',
    '--lcs-sc-teal:#146B5E;--lcs-sc-teal-deep:#0E544A;--lcs-sc-coral:#F2784B;',
    // Font STACKS only — no @import, no new Google Fonts request. Resolves to
    // Nunito/Fraunces on landings and Fredoka on decks, both already loaded.
    "font-family:'Nunito','Fredoka',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
    'line-height:1.4;text-align:left;-webkit-font-smoothing:antialiased;box-sizing:border-box}',
    '#lcs-site-chrome *,#lcs-site-footer *{box-sizing:border-box}',
    '#lcs-site-chrome p,#lcs-site-footer p,#lcs-site-chrome h2,#lcs-site-footer h2,',
    '#lcs-site-chrome ul,#lcs-site-footer ul,#lcs-site-chrome li,#lcs-site-footer li',
    '{margin:0;padding:0;list-style:none}',

    /* ---- shared shell: usable at 320px, capped at 72rem so nothing stretches at 2560 ---- */
    '#lcs-site-chrome .lcs-sc-in,#lcs-site-footer .lcs-sc-in{',
    'width:100%;max-width:72rem;margin:0 auto;',
    'padding-left:clamp(12px,3vw,24px);padding-right:clamp(12px,3vw,24px)}',

    /* ---- HEADER ----------------------------------------------------------
     * STATIC and z-index:1 on purpose. deck.html's .lcs-bar is
     * position:sticky;top:0;z-index:10 — the worksheet's own title strip must
     * always win, and the site header is meant to scroll away on first swipe.
     * White + a 3px teal top rule reads as site chrome, visually distinct from
     * the deck's cream bar and its indigo/grey palette.
     */
    '#lcs-site-chrome{position:relative;z-index:1;display:block;',
    'background:var(--lcs-sc-paper);border-top:3px solid var(--lcs-sc-teal);',
    'border-bottom:1px solid var(--lcs-sc-rule);color:var(--lcs-sc-ink-700);margin:0;padding:0}',
    '#lcs-site-chrome .lcs-sc-in{display:flex;align-items:center;flex-wrap:wrap;',
    'gap:4px 18px;min-height:48px;padding-top:7px;padding-bottom:7px}',

    '#lcs-site-chrome .lcs-sc-brand{display:inline-flex;align-items:center;gap:8px;',
    'flex:0 0 auto;text-decoration:none;color:var(--lcs-sc-ink-900);border-radius:6px}',
    // width/height are on the <img> so the intrinsic ratio is known before load
    // (zero CLS); height here + width:auto renders it at the size we want.
    '#lcs-site-chrome .lcs-sc-logo{display:block;height:30px;width:auto;max-width:none;',
    'object-fit:contain;border:0}',
    "#lcs-site-chrome .lcs-sc-word{font-family:'Fraunces','Nunito','Fredoka',Georgia,serif;",
    'font-weight:700;font-size:16px;letter-spacing:-.01em;color:var(--lcs-sc-ink-900);white-space:nowrap}',
    '#lcs-site-chrome .lcs-sc-brand:hover .lcs-sc-word{color:var(--lcs-sc-teal-deep)}',

    '#lcs-site-chrome .lcs-sc-nav{display:flex;align-items:center;flex-wrap:wrap;',
    'gap:0 2px;flex:1 1 auto;min-width:0}',
    '#lcs-site-chrome .lcs-sc-nav ul{display:flex;align-items:center;flex-wrap:wrap;gap:0 2px}',
    // min-height 40px: these are the primary orientation controls and are tapped
    // on a phone. inline-flex + align-items:center keeps the label centred as the
    // box grows, so the underline sweep stays put.
    '#lcs-site-chrome .lcs-sc-link{position:relative;display:inline-flex;align-items:center;',
    'min-height:40px;padding:6px 9px;',
    'border-radius:7px;font-size:13.5px;font-weight:700;line-height:1.25;',
    'color:var(--lcs-sc-ink-500);text-decoration:none;white-space:nowrap;',
    'transition:color .15s ease,background-color .15s ease}',
    '#lcs-site-chrome .lcs-sc-link::after{content:"";position:absolute;left:9px;right:9px;',
    'bottom:6px;height:2px;border-radius:2px;background:var(--lcs-sc-coral);',
    'transform:scaleX(0);transform-origin:left;transition:transform .18s ease}',
    '#lcs-site-chrome .lcs-sc-link:hover{color:var(--lcs-sc-teal-deep);background:rgba(20,107,94,.06)}',
    '#lcs-site-chrome .lcs-sc-link:hover::after{transform:scaleX(1)}',
    '#lcs-site-chrome.lcs-sc--deck .lcs-sc-logo{height:26px}',
    '#lcs-site-chrome.lcs-sc--deck .lcs-sc-word{font-size:15px}',
    '#lcs-site-chrome.lcs-sc--deck .lcs-sc-link{font-size:12.5px;padding:5px 7px}',
    '@media (min-width:768px){#lcs-site-chrome .lcs-sc-nav{justify-content:flex-end;gap:0 4px}',
    '#lcs-site-chrome .lcs-sc-link{font-size:14px}',
    '#lcs-site-chrome.lcs-sc--deck .lcs-sc-link{font-size:13px}}',

    /* ---- FOOTER ---------------------------------------------------------- */
    '#lcs-site-footer{display:block;background:var(--lcs-sc-cream);',
    'border-top:1px solid var(--lcs-sc-rule);color:var(--lcs-sc-ink-500);',
    'margin:0;padding:26px 0 30px;font-size:13px;line-height:1.5}',
    '#lcs-site-footer .lcs-sc-in{display:flex;flex-direction:column;gap:16px}',

    '#lcs-site-footer .lcs-sc-head{font-family:\'Fraunces\',\'Nunito\',\'Fredoka\',Georgia,serif;',
    'font-size:14px;font-weight:700;color:var(--lcs-sc-ink-900);line-height:1.3;margin:0 0 8px;',
    'text-align:center}',
    '#lcs-site-footer .lcs-sc-langs{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 14px}',
    '#lcs-site-footer .lcs-sc-utils{display:flex;flex-wrap:wrap;align-items:center;',
    'justify-content:center;gap:4px 12px;padding-top:14px;border-top:1px solid var(--lcs-sc-rule)}',
    // Footer links are also tap targets — min-height 40px, and the horizontal
    // padding is inside the flex gap so the rows do not visually loosen.
    '#lcs-site-footer .lcs-sc-link{display:inline-flex;align-items:center;min-height:40px;',
    'padding:2px 2px;font-size:13px;',
    'color:var(--lcs-sc-ink-500);text-decoration:none;transition:color .15s ease}',
    '#lcs-site-footer .lcs-sc-link:hover{color:var(--lcs-sc-teal-deep);text-decoration:underline}',
    '#lcs-site-footer .lcs-sc-cta{font-weight:700;color:var(--lcs-sc-teal)}',
    '#lcs-site-footer .lcs-sc-cta:hover{color:var(--lcs-sc-teal-deep)}',
    '#lcs-site-footer .lcs-sc-sep{color:var(--lcs-sc-rule);-webkit-user-select:none;user-select:none}',
    '#lcs-site-footer .lcs-sc-strip{display:flex;flex-wrap:wrap;align-items:center;',
    'justify-content:center;gap:6px 10px;font-size:12px;color:var(--lcs-sc-ink-500);text-align:center}',
    '#lcs-site-footer .lcs-sc-brand{display:inline-flex;align-items:center;gap:8px;',
    'text-decoration:none;color:var(--lcs-sc-ink-700)}',
    '#lcs-site-footer .lcs-sc-logo{display:block;height:22px;width:auto;max-width:none;',
    'object-fit:contain;border:0}',
    "#lcs-site-footer .lcs-sc-word{font-family:'Fraunces','Nunito','Fredoka',Georgia,serif;",
    'font-weight:700;font-size:13px;color:var(--lcs-sc-ink-700);white-space:nowrap}',
    /* deck.html's .lcs-footer is position:sticky;bottom:0;z-index:10 and covers
     * the last ~108px of viewport for the whole document. The existing markup
     * already compensates via .lcs-deckend-suggestions{margin:24px 16px 96px};
     * mirror that so the site footer is not permanently occluded. */
    '#lcs-site-footer.lcs-sc--deck{padding-bottom:132px}',

    /* ---- focus: neither host surface defines any ---- */
    '#lcs-site-chrome a:focus-visible,#lcs-site-footer a:focus-visible',
    '{outline:2px solid var(--lcs-sc-teal);outline-offset:2px;border-radius:5px}',
    '@media (prefers-reduced-motion:reduce){#lcs-site-chrome .lcs-sc-link,',
    '#lcs-site-chrome .lcs-sc-link::after,#lcs-site-footer .lcs-sc-link{transition:none}}',

    /* ---- HIDE STATES (all three mandatory on deck pages) ----------------- */
    /* (a) print — the core artifact of this product is a printable worksheet;
     *     a nav bar on every teacher's printout would be a regression. The
     *     deck's own print rule is a FIXED class list we do not edit, so we
     *     carry our own. */
    '@media print{#lcs-site-chrome,#lcs-site-footer{display:none!important}}',
    /* (b) embed iframe — the auto-resize postMessage reports
     *     document.body.scrollHeight, and the static aspect-ratio fallback bakes
     *     a chrome=200 constant assuming exactly .lcs-bar + wrap + .lcs-footer.
     *     Same mechanism as inject-embed-hide-style.js. */
    'body.lcs-embedded #lcs-site-chrome,body.lcs-embedded #lcs-site-footer{display:none!important}',
    /* (c) ⚠ HIGHEST SEVERITY — compact landscape-mobile fit mode.
     *     catalog-export.js buildResponsiveFitSnippet() sets
     *     body.lcs-worksheet-landscape{overflow:hidden} and JS-sizes the
     *     worksheet to the full visual viewport. A header in normal flow would
     *     push the worksheet down inside an overflow:hidden body and CLIP IT
     *     UNREACHABLY on a phone, mid-exercise. That block gives .lcs-bar /
     *     .lcs-end-deck / .lcs-sr exactly this treatment. */
    '@media (max-width:1024px) and (orientation:landscape){',
    'body.lcs-worksheet-landscape #lcs-site-chrome,',
    'body.lcs-worksheet-landscape #lcs-site-footer{display:none!important}}',
  ].join('');
}

/** The full <style> element, sentinel-wrapped. Insert at the TOP of <head>. */
function cssBlock() {
  return CSS_START + '<style ' + CSS_MARKER + '>' + cssRules() + '</style>' + CSS_END;
}

// ---------------------------------------------------------------------------
// Markup
// ---------------------------------------------------------------------------

/**
 * The brand mark. alt="" because the adjacent wordmark is the accessible name.
 * width/height are the intrinsic dimensions of logo-lcs-optimized.png (242x313)
 * so the aspect ratio is known before the image loads => zero CLS.
 */
function brandMark(homeUrl, cls) {
  return (
    '<a class="lcs-sc-brand" href="' + homeUrl + '">' +
    '<picture><source srcset="/logo-lcs.webp" type="image/webp">' +
    '<img class="lcs-sc-logo" src="/logo-lcs-optimized.png" alt="" width="242" height="313" ' +
    'decoding="async"' + (cls === 'footer' ? ' loading="lazy"' : '') + '></picture>' +
    '<span class="lcs-sc-word">LessonCraftStudio</span></a>'
  );
}

/**
 * Site header. `variant` is 'landing' | 'deck' (deck gets a slightly tighter
 * scale via .lcs-sc--deck).
 *
 * No <h1> anywhere in the chrome — scripts/publish-cli/audit-deck-html.js
 * enforces exactly one <h1> per deck, and the landing already has its own.
 * aria-label is the proper noun "LessonCraftStudio", so it needs no i18n key.
 */
function header(locale, variant) {
  const t = strings(locale);
  const u = urls(locale);
  const deck = variant === 'deck';
  return (
    HDR_START +
    '<header id="lcs-site-chrome"' + (deck ? ' class="lcs-sc--deck"' : '') +
    (deck ? '' : ' role="banner"') + '>' +
    '<div class="lcs-sc-in">' +
    brandMark(u.home, 'header') +
    '<nav class="lcs-sc-nav" aria-label="LessonCraftStudio">' +
    '<ul>' +
    '<li><a class="lcs-sc-link" href="' + u.worksheets + '">' + t.worksheets + '</a></li>' +
    '<li><a class="lcs-sc-link" href="' + u.activities + '">' + t.activities + '</a></li>' +
    '<li><a class="lcs-sc-link" href="' + u.tools + '">' + t.tools + '</a></li>' +
    '<li><a class="lcs-sc-link" href="' + u.makers + '">' + t.makers + '</a></li>' +
    '</ul></nav></div></header>' +
    HDR_END
  );
}

/**
 * Site footer.
 *
 * ⚠ ELEMENT DIFFERS BY SURFACE. deck.html already has
 * `<footer class="lcs-footer">` (the Check/Reset bar) as a body child, which is
 * an implicit `contentinfo` landmark — a second <footer> would duplicate it.
 * So the deck variant is a <div>. Landings have no footer at all, so they get
 * the real <footer role="contentinfo">.
 */
function footer(locale, variant) {
  const t = strings(locale);
  const u = urls(locale);
  const deck = variant === 'deck';
  const tag = deck ? 'div' : 'footer';

  const langs = LOCALES.map(
    (l) =>
      '<li><a class="lcs-sc-link" href="' + CANONICAL_BASE + '/' + l + '"' +
      (l === locale ? ' aria-current="true"' : '') +
      ' hreflang="' + (HREFLANG_CODE[l] || l) + '">' +
      escapeHtml(ENDONYMS[l]) + '</a></li>'
  ).join('');

  const util = [
    ['<a class="lcs-sc-link lcs-sc-cta" href="' + u.worksheets + '">' + t.browseAll + '</a>'],
    ['<a class="lcs-sc-link" href="' + u.about + '">' + t.about + '</a>'],
    ['<a class="lcs-sc-link" href="' + u.contact + '">' + t.contact + '</a>'],
    ['<a class="lcs-sc-link" href="' + u.pricing + '">' + t.pricing + '</a>'],
    ['<a class="lcs-sc-link" href="' + u.terms + '">' + t.terms + '</a>'],
    ['<a class="lcs-sc-link" href="' + u.privacy + '">' + t.privacy + '</a>'],
  ]
    .map((x) => '<li>' + x[0] + '</li>')
    .join('<li class="lcs-sc-sep" aria-hidden="true">&middot;</li>');

  return (
    FTR_START +
    '<' + tag + ' id="lcs-site-footer"' + (deck ? ' class="lcs-sc--deck"' : ' role="contentinfo"') + '>' +
    '<div class="lcs-sc-in">' +
    '<nav aria-label="' + t.byLanguage + '">' +
    '<h2 class="lcs-sc-head">' + t.byLanguage + '</h2>' +
    '<ul class="lcs-sc-langs">' + langs + '</ul>' +
    '</nav>' +
    '<ul class="lcs-sc-utils">' + util + '</ul>' +
    '<div class="lcs-sc-strip">' +
    brandMark(u.home, 'footer') +
    '<span class="lcs-sc-sep" aria-hidden="true">&middot;</span>' +
    '<span>' + t.copyright + '</span>' +
    '</div>' +
    '</div></' + tag + '>' +
    FTR_END
  );
}

module.exports = {
  LOCALES,
  ENDONYMS,
  HREFLANG_CODE,
  CANONICAL_BASE,
  REPO_ROOT,
  ROUTE_SEGMENTS,
  STRING_SPEC,
  MARKER,
  CSS_MARKER,
  FOOTER_MARKER,
  CSS_START, CSS_END, HDR_START, HDR_END, FTR_START, FTR_END,
  SENTINELS: [CSS_START, CSS_END, HDR_START, HDR_END, FTR_START, FTR_END],
  STRIP_RES,
  escapeHtml,
  strings,
  urls,
  cssRules,
  cssBlock,
  header,
  footer,
};
