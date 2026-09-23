/**
 * Page shell — wraps a worksheet body in the shared chrome (title bar,
 * instruction line, name/date, attribution footer) and emits a fully
 * self-contained HTML document (file:// fonts, inlined CSS, no network).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { esc } = require('../primitives/_svg.js');

const PAGE_CSS = fs.readFileSync(path.join(__dirname, 'page.css'), 'utf8');
const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts');
const FONTS_CSS = fs.readFileSync(path.join(FONTS_DIR, 'fonts.css'), 'utf8')
  // rewrite relative font urls to absolute file:// so setContent() resolves them
  .replace(/url\('([^']+\.woff2)'\)/g, (m, f) =>
    "url('" + 'file:///' + path.join(FONTS_DIR, f).replace(/\\/g, '/').replace(/^\//, '') + "')");

// Page-size geometry: content box 186×250mm centered on each paper size.
const PAGE_SIZES = {
  a4:     { w: '210mm', h: '297mm', mx: '12mm', my: '23.5mm' },
  letter: { w: '215.9mm', h: '279.4mm', mx: '14.95mm', my: '14.7mm' },
};

// chrome strings per locale (the only non-type text on a page)
const CHROME = {
  en: { name: 'Name', date: 'Date' },
  de: { name: 'Name', date: 'Datum' },
  fr: { name: 'Prénom', date: 'Date' },
  es: { name: 'Nombre', date: 'Fecha' },
  pt: { name: 'Nome', date: 'Data' },
  it: { name: 'Nome', date: 'Data' },
  nl: { name: 'Naam', date: 'Datum' },
  sv: { name: 'Namn', date: 'Datum' },
  da: { name: 'Navn', date: 'Dato' },
  no: { name: 'Navn', date: 'Dato' },
  fi: { name: 'Nimi', date: 'Päivämäärä' },
};

const ATTRIBUTION = 'Made with LessonCraftStudio.com';

// Small white star inside the coral instruction badge (a friendly "look here").
const INSTRUCTION_BADGE_SVG =
  '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.11l-4.94 2.6.94-5.5-4-3.9 5.53-.8z" fill="#FFFFFF"/></svg>';

/**
 * French typography AT RENDER TIME (nt10-E landing round 1, 2026-09-23, the fr panel: 7 titles wrapped so a line
 * STARTED with the colon, and "a-t-" / "elle" broke at the hyphen). The strings keep plain spaces (they also feed
 * the SEO titles); only the printed title / instruction change, and only in fr: a NO-BREAK space (U+00A0, inside
 * the fonts' latin range) before : ; ? ! and inside « », and the "-t-il / -t-elle / -t-on" inversions held
 * together by a WORD JOINER (U+2060, zero-width, default-ignorable) after each hyphen — no new element (qa/lints.js
 * reads an inline span as overflowing) and no glyph outside the font subset. Input is ALREADY escaped (esc()).
 */
function frTypo(html) {
  return html
    .replace(/[ \u202F]+([:;?!»])/g, '\u00A0$1')
    .replace(/«[ \u202F]+/g, '«\u00A0')
    .replace(/(^|[^\p{L}])(\p{L}+)-t-(il|elle|on|ils|elles)(?![\p{L}-])/gu, '$1$2-\u2060t-\u2060$3');
}
/** The same rules over a BODY's text nodes only (never inside a tag, a <style> or a <script>): the fr landing
 *  revision found riddles, sentences and field headers inside the cards still breaking before "?" / ":" and «aller»
 *  printed without its inner spaces. Also closes a « … » pair whose inner spaces were never typed. */
function frTypoHtml(html) {
  let inRaw = false;
  return String(html).split(/(<[^>]*>)/).map((seg) => {
    if (seg.startsWith('<')) {
      if (/^<(style|script)\b/i.test(seg)) inRaw = true;
      else if (/^<\/(style|script)/i.test(seg)) inRaw = false;
      return seg;
    }
    // "Qui suis-je ?" broke as "suis- / je ?": a WORD JOINER after the hyphen of every inverted pronoun
    return inRaw ? seg : frTypo(seg).replace(/(\p{L})-(je|tu|il|elle|on|nous|vous|ils|elles|moi|toi)(?![\p{L}⁠-])/gu, '$1-⁠$2').replace(/«(?=[^\s ])/g, '« ').replace(/([^\s ])(?=»)/g, '$1 ');
  }).join('');
}
const isFr = (locale) => String(locale || '').slice(0, 2) === 'fr';
const chromeText = (s, locale) => (isFr(locale) ? frTypo(esc(s)) : esc(s));

/**
 * buildPage({ title, instruction, bodyHtml, locale, pageSize }) → html string
 */
function buildPage({ title, instruction, bodyHtml, locale, pageSize }) {
  const size = PAGE_SIZES[pageSize || 'a4'];
  const chrome = CHROME[locale] || CHROME.en;
  return `<!DOCTYPE html>
<html lang="${esc(locale || 'en')}">
<head>
<meta charset="utf-8">
<style>
${FONTS_CSS}
${PAGE_CSS}
@page { size: ${size.w} ${size.h}; margin: ${size.my} ${size.mx}; }
</style>
</head>
<body>
<div class="ws-page" data-lcs-page>
  <header class="ws-head">
    <h1 class="ws-title" data-lcs-title>${chromeText(title, locale)}</h1>
    <div class="ws-namedate">
      <span>${esc(chrome.name)}${isFr(locale) ? ' ' : ''}: <span class="ws-blank"></span></span>
      <span>${esc(chrome.date)}${isFr(locale) ? ' ' : ''}: <span class="ws-blank ws-blank--short"></span></span>
    </div>
  </header>
  <div class="ws-instruction">
    <span class="ws-instruction-badge">${INSTRUCTION_BADGE_SVG}</span>
    <p data-lcs-instruction>${chromeText(instruction, locale)}</p>
  </div>
  <main class="ws-body" data-lcs-body>
${isFr(locale) ? frTypoHtml(bodyHtml) : bodyHtml}
  </main>
  <footer class="ws-foot">
    <span class="ws-foot-rule"></span>
    <span>${esc(ATTRIBUTION)}</span>
    <span class="ws-foot-rule"></span>
  </footer>
</div>
</body>
</html>`;
}

module.exports = { frTypo, frTypoHtml, buildPage, PAGE_SIZES, CHROME, ATTRIBUTION };
