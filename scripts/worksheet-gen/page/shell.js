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
    <h1 class="ws-title" data-lcs-title>${esc(title)}</h1>
    <div class="ws-namedate">
      <span>${esc(chrome.name)}: <span class="ws-blank"></span></span>
      <span>${esc(chrome.date)}: <span class="ws-blank ws-blank--short"></span></span>
    </div>
  </header>
  <div class="ws-instruction">
    <span class="ws-instruction-badge">${INSTRUCTION_BADGE_SVG}</span>
    <p data-lcs-instruction>${esc(instruction)}</p>
  </div>
  <main class="ws-body" data-lcs-body>
${bodyHtml}
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

module.exports = { buildPage, PAGE_SIZES, CHROME, ATTRIBUTION };
