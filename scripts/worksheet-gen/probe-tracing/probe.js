/**
 * probe.js — PART 1 capability probe (scratch / additive; not a worksheet-gen type).
 *
 * Renders one representative tracing sheet per language, each loaded with that
 * language's HARDEST characters (upper + lower of every special + a few base
 * letters for contrast), through the existing page shell + Puppeteer pipeline.
 *
 *   node scripts/worksheet-gen/probe-tracing/probe.js
 *
 * Output: scripts/worksheet-gen/out/probe/probe-<locale>.{html,pdf,png}
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const puppeteer = require('puppeteer');
const { buildPage } = require('../page/shell.js');
const { esc } = require('../primitives/_svg.js');
const { traceGroup, arrowsDemo } = require('./trace-glyph.js');

const splitChars = (s) => s.split('');
const BASE_CONTRAST = ['A', 'a', 'E', 'e', 'O', 'o', 'N', 'n'];

// Per the commission table — each sheet exercises the language's hardest glyphs.
const SHEETS = [
  {
    locale: 'en', title: 'Tracing Probe — English', instruction: 'Trace each dotted letter.',
    groups: [
      { h: 'Uppercase A–Z', chars: splitChars('ABCDEFGHIJKLMNOPQRSTUVWXYZ') },
      { h: 'Lowercase a–z', chars: splitChars('abcdefghijklmnopqrstuvwxyz') },
      { h: 'Numbers 0–9', chars: splitChars('0123456789') },
      { h: 'Stroke-order arrows — AUTHORED demo (not font-derived)', arrows: true },
    ],
  },
  {
    locale: 'de', title: 'Tracing Probe — Deutsch', instruction: 'Zeichne jeden Buchstaben nach.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Special: ß ẞ Ä ä Ö ö Ü ü', chars: ['ß', 'ẞ', 'Ä', 'ä', 'Ö', 'ö', 'Ü', 'ü'] },
    ],
  },
  {
    locale: 'es', title: 'Tracing Probe — Español', instruction: 'Repasa cada letra punteada.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Special: Ñ Á Í Ú Ü + ¿ ¡', chars: ['Ñ', 'ñ', 'Á', 'á', 'Í', 'í', 'Ú', 'ú', 'Ü', 'ü', '¿', '¡'] },
    ],
  },
  {
    locale: 'fr', title: 'Tracing Probe — Français', instruction: 'Repasse chaque lettre en pointillés.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Accents', chars: ['É', 'é', 'È', 'è', 'Ê', 'ê', 'Ë', 'ë', 'À', 'à', 'Â', 'â', 'Ç', 'ç', 'Î', 'î', 'Ï', 'ï', 'Ô', 'ô', 'Ù', 'ù', 'Û', 'û'] },
      { h: 'Ligature: Œ œ', chars: ['Œ', 'œ'] },
    ],
  },
  {
    locale: 'it', title: 'Tracing Probe — Italiano', instruction: 'Ripassa ogni lettera tratteggiata.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Grave / acute set', chars: ['À', 'à', 'È', 'è', 'É', 'é', 'Ì', 'ì', 'Ò', 'ò', 'Ù', 'ù'] },
    ],
  },
  {
    locale: 'pt', title: 'Tracing Probe — Português (BR)', instruction: 'Cubra cada letra pontilhada.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Tildes & accents', chars: ['Ã', 'ã', 'Õ', 'õ', 'Á', 'á', 'Â', 'â', 'À', 'à', 'É', 'é', 'Ê', 'ê', 'Í', 'í', 'Ó', 'ó', 'Ô', 'ô', 'Ú', 'ú', 'Ç', 'ç'] },
    ],
  },
  {
    locale: 'nl', title: 'Tracing Probe — Nederlands', instruction: 'Trek elke gestippelde letter over.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Digraph IJ + diaeresis', chars: ['IJ', 'ij', 'Ĳ', 'ĳ', 'Ë', 'ë', 'Ï', 'ï', 'É', 'é'] },
    ],
  },
  {
    locale: 'sv', title: 'Tracing Probe — Svenska', instruction: 'Spåra varje prickad bokstav.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Special: Å å Ä ä Ö ö', chars: ['Å', 'å', 'Ä', 'ä', 'Ö', 'ö'] },
    ],
  },
  {
    locale: 'no', title: 'Tracing Probe — Norsk', instruction: 'Spor hver prikkete bokstav.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Special: Æ æ Ø ø Å å', chars: ['Æ', 'æ', 'Ø', 'ø', 'Å', 'å'] },
    ],
  },
  {
    locale: 'da', title: 'Tracing Probe — Dansk', instruction: 'Tegn hver prikket bogstav.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Special: Æ æ Ø ø Å å', chars: ['Æ', 'æ', 'Ø', 'ø', 'Å', 'å'] },
    ],
  },
  {
    locale: 'fi', title: 'Tracing Probe — Suomi', instruction: 'Piirrä jokainen pisteviiva-kirjain.',
    groups: [
      { h: 'Base letters (contrast)', chars: BASE_CONTRAST },
      { h: 'Special: Ä ä Ö ö + Å å (loan)', chars: ['Ä', 'ä', 'Ö', 'ö', 'Å', 'å'] },
    ],
  },
];

function perRowFor(len) {
  return len <= 13 ? len : Math.ceil(len / 2);
}

function buildBody(groups) {
  return groups.map((g) => {
    const heading = `<div style="font-family:'Nunito';font-weight:700;font-size:12px;color:#146B5E;letter-spacing:.04em;text-transform:uppercase;margin:12px 0 2px;">${esc(g.h)}</div>`;
    const svg = g.arrows ? arrowsDemo() : traceGroup(g.chars, { perRow: perRowFor(g.chars.length), label: g.h });
    return heading + svg;
  }).join('\n');
}

(async () => {
  const outDir = path.join(__dirname, '..', 'out', 'probe');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    for (const s of SHEETS) {
      const html = buildPage({
        title: s.title,
        instruction: s.instruction,
        bodyHtml: buildBody(s.groups),
        locale: s.locale,
        pageSize: s.locale === 'en' ? 'letter' : 'a4',
      });
      const base = path.join(outDir, `probe-${s.locale}`);
      fs.writeFileSync(base + '.html', html, 'utf8');
      await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
      await page.goto(pathToFileURL(base + '.html').href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      await page.pdf({ path: base + '.pdf', printBackground: true, preferCSSPageSize: true });
      const el = await page.$('[data-lcs-page]');
      await el.screenshot({ path: base + '.png' });
      console.log('rendered', s.locale, '→', base + '.png');
    }
  } finally {
    await browser.close();
  }
  console.log('done →', outDir);
})();
