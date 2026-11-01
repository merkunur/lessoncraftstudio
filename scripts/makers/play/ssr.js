/**
 * The student play page, server side (INTERACTIVE-AND-SHARING §C.6, §C.9 — task 2 of the ten, 2026-11-01).
 *
 * /s/<linkId> is ONE static shell (scripts/makers/play/index.html) whose <head> and site chrome are filled PER LINK by
 * whoever serves it: the local preview server (scripts/makers/serve.js) and the website route
 * (frontend/app/s/[id]/route.ts) both call renderPlayHtml() here, so the page a chat app unfurls, the page a crawler
 * follows from a class blog and the page a child opens are the same bytes. Pure string functions — no fs, no DOM — so
 * the Next.js route can bundle this file as is (scripts/makers/play/ssr.d.ts types it).
 *
 *   renderPlayHtml({ template, base, lang, head, chrome, bar })   the shell with every marker filled
 *   headFor({ ... })                                               the per-link <title> / Open Graph / Twitter fields
 *   miniPage({ lang, title, lines, strings })                      the kid-safe "link does not exist" page (404, noindex)
 *
 * Markers in the template (every one must be present; a template without them is refused — a half-filled page would
 * ship an English <html lang> and no card):
 *   __LCS_LANG__              the recipe's language (the <html lang>, set before paint)
 *   __LCS_PLAY_BASE__         the play tree's URL prefix (/makers/play/<version>) for play.js / play.css / strings
 *   <!--LCS_PLAY_HEAD-->      title, description, robots, Open Graph, Twitter
 *   <!--LCS_PLAY_CHROME_CSS--> / <!--LCS_PLAY_HEADER--> / <!--LCS_PLAY_FOOTER-->   the site chrome (scripts/lib/site-chrome.js)
 *   <!--LCS_PLAY_BAR-->       the worksheet's title + "Make your own" (→ the maker's indexable landing) + "Made with" (→ the locale root)
 *
 * SEO rules baked in (§C.2): noindex (meta AND the X-Robots-Tag header the servers add), never a canonical, never hreflang,
 * never JSON-LD; every visible link targets an indexable page (the landing, the locale root, the chrome's own links).
 */
'use strict';

const MARKERS = ['__LCS_LANG__', '__LCS_PLAY_BASE__', '<!--LCS_PLAY_HEAD-->', '<!--LCS_PLAY_CHROME_CSS-->', '<!--LCS_PLAY_HEADER-->', '<!--LCS_PLAY_BAR-->', '<!--LCS_PLAY_FOOTER-->'];
const SITE = 'LessonCraftStudio';
const CANONICAL_BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
/** the Open Graph locale codes (the og:locale tag; pt is Brazilian, CLAUDE.md §6) */
const OG_LOCALE = { en: 'en_US', de: 'de_DE', fr: 'fr_FR', es: 'es_MX', pt: 'pt_BR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE', da: 'da_DK', no: 'nb_NO', fi: 'fi_FI' };

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const attr = (s) => esc(s).replace(/\r?\n/g, ' ');
const lang2 = (l) => (LOCALES.includes(l) ? l : 'en');

/** `{token}` → html, every other character escaped (the strings file's {brand} / {landing} tokens become links) */
function fill(template, parts) {
  return String(template).split(/(\{[a-z]+\})/i).map((seg) => { const m = /^\{([a-z]+)\}$/i.exec(seg); return m ? (parts[m[1]] != null ? parts[m[1]] : '') : esc(seg); }).join('');
}

/**
 * The per-link card fields. Nothing a teacher typed except the worksheet's own title (§C.8: no teacher name, mail or
 * class); the picture is the TEMPLATE's sample thumbnail in the page's language (never a page with the teacher's words).
 * @param {object} o { linkId, lang, title, makerName, templateTitle, level, levelWord, themeName, thumbUrl, origin }
 */
function headFor(o) {
  const lang = lang2(o.lang);
  const origin = o.origin || CANONICAL_BASE;
  const url = origin + '/s/' + encodeURIComponent(o.linkId);
  const bits = [o.makerName, o.templateTitle && o.templateTitle !== o.title ? o.templateTitle : null, o.level && o.levelWord ? o.levelWord.replace('{n}', String(o.level)) : null, o.themeName].filter(Boolean);
  const description = bits.join(' · ') || SITE;
  const image = o.thumbUrl ? (o.thumbUrl.startsWith('http') ? o.thumbUrl : origin + o.thumbUrl) : null;
  return { lang, url, title: o.title || o.templateTitle || SITE, description, image, imageAlt: o.templateTitle || o.title || SITE, siteName: SITE };
}

/** the <head> tags of one link (robots meta included; the card tags only where there is a value) */
function headTags(h) {
  const t = [];
  t.push('<title>' + esc(h.title) + ' | ' + SITE + '</title>');
  t.push('<meta name="description" content="' + attr(h.description) + '">');
  t.push('<meta name="robots" content="noindex">');
  t.push('<meta property="og:type" content="website">');
  t.push('<meta property="og:site_name" content="' + SITE + '">');
  t.push('<meta property="og:locale" content="' + (OG_LOCALE[h.lang] || 'en_US') + '">');
  t.push('<meta property="og:url" content="' + attr(h.url) + '">');
  t.push('<meta property="og:title" content="' + attr(h.title) + '">');
  t.push('<meta property="og:description" content="' + attr(h.description) + '">');
  if (h.image) {
    t.push('<meta property="og:image" content="' + attr(h.image) + '">');
    t.push('<meta property="og:image:alt" content="' + attr(h.imageAlt) + '">');
    t.push('<meta name="twitter:image" content="' + attr(h.image) + '">');
    t.push('<meta name="twitter:image:alt" content="' + attr(h.imageAlt) + '">');
  }
  // a 320 px sample thumbnail: the small card (summary_large_image wants 1200 × 630 — a build-time composite, not done)
  t.push('<meta name="twitter:card" content="summary">');
  t.push('<meta name="twitter:title" content="' + attr(h.title) + '">');
  t.push('<meta name="twitter:description" content="' + attr(h.description) + '">');
  return t.join('\n');
}

/**
 * The bar under the chrome: the worksheet's title (the page's one h1), "Make your own worksheet" → the maker's landing
 * (the indexable page), "Made with LessonCraftStudio" → the locale root. Server-rendered so a crawler that follows a
 * pasted link from a public page finds real <a href>s without running the shell.
 * @param {object} b { title, landingUrl, homeUrl, makeYourOwn, madeWith }  (madeWith carries {brand})
 */
function barHtml(b) {
  return '<header class="pl-bar" id="pl-bar">\n'
    + '<h1 class="pl-title" id="pl-title">' + esc(b.title) + '</h1>\n'
    + '<p class="pl-links"><a class="pl-make" id="pl-make" href="' + attr(b.landingUrl) + '">' + esc(b.makeYourOwn) + '</a>'
    + '<span class="pl-made" id="pl-made">' + fill(b.madeWith, { brand: '<a class="pl-brand" id="pl-brand" href="' + attr(b.homeUrl) + '">' + SITE + '</a>' }) + '</span></p>\n'
    + '</header>';
}

/**
 * @param {object} o { template (the shell html), base (the play tree URL prefix), lang, head (headFor()),
 *                     chrome: { css, header, footer } (html strings; '' = none), bar (barHtml() input) }
 */
function renderPlayHtml(o) {
  const tpl = String(o.template || '');
  for (const m of MARKERS) if (!tpl.includes(m)) throw new Error('play shell template: marker ' + m + ' missing');
  const chrome = o.chrome || { css: '', header: '', footer: '' };
  return tpl
    .split('__LCS_LANG__').join(lang2(o.lang))
    .split('__LCS_PLAY_BASE__').join(String(o.base || '/makers/play').replace(/\/$/, ''))
    .replace('<!--LCS_PLAY_HEAD-->', headTags(o.head))
    .replace('<!--LCS_PLAY_CHROME_CSS-->', chrome.css || '')
    .replace('<!--LCS_PLAY_HEADER-->', chrome.header || '')
    .replace('<!--LCS_PLAY_BAR-->', barHtml(o.bar))
    .replace('<!--LCS_PLAY_FOOTER-->', chrome.footer || '');
}

/** A kid-safe one-card page (a link that does not exist / was taken back). The caller sends it with 404 + noindex. */
function miniPage(o) {
  const lang = lang2(o.lang);
  const lines = (o.lines || []).map((l, i, a) => '<p' + (i === a.length - 1 && a.length > 1 && o.lastIsTeacher ? ' class="t"' : '') + '>' + esc(l) + '</p>').join('');
  return '<!doctype html><html lang="' + lang + '"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + esc(o.title) + ' | ' + SITE + '</title>'
    + "<style>body{font-family:'Nunito',system-ui,sans-serif;background:#FBF3E4;color:#146B5E;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;text-align:center}main{max-width:480px}h1{font-size:1.6rem;font-family:'Baloo 2','Nunito',sans-serif}p{font-size:1.05rem;line-height:1.5}.t{margin-top:2rem;font-size:.85rem;opacity:.75}</style></head>"
    + '<body><main><h1>' + esc(o.title) + '</h1>' + lines + '</main></body></html>';
}

/** the words of the play page in one language (play-strings.json `play` block → flat) */
function playStrings(all, lang) {
  const out = {};
  for (const [k, by] of Object.entries(all.play || {})) out[k] = by[lang] || by.en;
  return out;
}

module.exports = { renderPlayHtml, headFor, headTags, barHtml, miniPage, playStrings, fill, MARKERS, LOCALES, CANONICAL_BASE, SITE };
