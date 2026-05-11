/**
 * numeral-cards-render.ts — Pillar 5 Phase 1 Sub-Phase 1.2 renderer.
 *
 * Text-only numeral card grid. Each card renders large numeral + optional
 * localized number-word (via NUMBER_WORDS resource at REFERENCE TRANSLATIONS/
 * number-words.js).
 *
 * No Sharp / image preprocessing (unlike flashcards + picture-cards). Just
 * HTML template + Playwright PDF rendering.
 */

import * as fs from 'fs';
import * as path from 'path';
import { chromium, type Browser } from 'playwright';

// Load NUMBER_WORDS resource via CommonJS require. js-yaml + number-words
// follow the same require-with-cast pattern per CLAUDE.md JSON-import +
// Next.js TS-build avoidance discipline.
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const NUMBER_WORDS_PATH = path.join(REPO_ROOT, 'REFERENCE TRANSLATIONS', 'number-words.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NumberWords: {
  get: (numeral: number | string, locale: string, gender?: string) => string | null;
  hasGenderToggle: (numeral: number | string, locale: string) => boolean;
} = require(NUMBER_WORDS_PATH);

export interface NumeralCard {
  numeral: number;
  numberWord: string | null; // localized word; null if showNumberWord=false
}

const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Lexend+Deca:wght@400;500&display=swap" rel="stylesheet">`;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildCards(
  numerals: number[],
  locale: string,
  showNumberWord: boolean
): NumeralCard[] {
  return numerals.map((n) => ({
    numeral: n,
    numberWord: showNumberWord ? NumberWords.get(n, locale) : null,
  }));
}

function renderCard(card: NumeralCard, borderRadius: string, borderWidth: string): string {
  const wordHtml = card.numberWord
    ? `<div class="word">${escapeHtml(card.numberWord)}</div>`
    : '';
  return `
    <article class="card" style="border-radius:${borderRadius};border-width:${borderWidth}">
      <div class="numeral">${card.numeral}</div>
      ${wordHtml}
    </article>`;
}

const BASE_CSS = `
  :root {
    --card-border: #1f2937;
    --card-bg: #ffffff;
    --numeral-color: #1f2937;
    --word-color: #475569;
    --footer-color: #94a3b8;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Lexend Deca', system-ui, sans-serif; color: #222; }
  .card {
    aspect-ratio: 2 / 3;
    background: var(--card-bg);
    border-style: solid;
    border-color: var(--card-border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    container-type: inline-size;
  }
  .card .numeral {
    font-family: 'Fredoka', sans-serif;
    font-weight: 700;
    color: var(--numeral-color);
    font-size: clamp(48pt, 56cqw, 140pt);
    line-height: 1;
  }
  .card .word {
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 500;
    color: var(--word-color);
    font-size: clamp(11pt, 8cqw, 24pt);
    line-height: 1.1;
    margin-top: 0.4em;
    text-align: center;
    text-transform: lowercase;
    padding: 0 6%;
    word-break: break-word;
  }
`;

export async function renderPrintHtml(
  numerals: number[],
  opts: {
    cardsPerPage: number;
    locale: string;
    showNumberWord: boolean;
    borderStyle: 'thin' | 'thick' | 'rounded' | 'none';
    roundedCorners: boolean;
  }
): Promise<string> {
  const { cardsPerPage, locale, showNumberWord, borderStyle, roundedCorners } = opts;

  let cols = 3;
  let rows = Math.ceil(cardsPerPage / cols);
  if (cardsPerPage === 4) {
    cols = 2;
    rows = 2;
  }

  const borderWidth =
    borderStyle === 'thick' ? '3px' :
    borderStyle === 'none' ? '0' :
    '1.5px';
  const borderRadius = roundedCorners ? '12px' : '0';

  const cards = buildCards(numerals, locale, showNumberWord);

  // Pages of N cards each
  const pages: NumeralCard[][] = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    pages.push(cards.slice(i, i + cardsPerPage));
  }

  const css = `
    ${BASE_CSS}
    @page { size: A4; margin: 10mm; }
    body { background: #ffffff; }
    .grid {
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      grid-template-rows: repeat(${rows}, 1fr);
      gap: 4mm;
      width: 190mm;
      height: 277mm;
      page-break-after: always;
    }
    .grid:last-child { page-break-after: auto; }
    .card { position: relative; }
    .card::before, .card::after {
      content: '';
      position: absolute;
      width: 4mm; height: 4mm;
      pointer-events: none;
    }
    .card::before {
      top: -2mm; left: -2mm;
      border-top: 0.5px dashed #cbd2dc;
      border-left: 0.5px dashed #cbd2dc;
    }
    .card::after {
      bottom: -2mm; right: -2mm;
      border-bottom: 0.5px dashed #cbd2dc;
      border-right: 0.5px dashed #cbd2dc;
    }
  `;

  const pagesHtml = pages
    .map((pageCards) => {
      const cardCells = pageCards
        .map((c) => renderCard(c, borderRadius, borderWidth))
        .join('');
      const padding = Array(cardsPerPage - pageCards.length).fill('<div></div>').join('');
      return `<div class="grid">${cardCells}${padding}</div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <title>Numeral cards ${cardsPerPage}-up</title>
  ${FONT_LINK}
  <style>${css}</style>
</head>
<body>${pagesHtml}</body>
</html>`;
}

let _browserCache: Browser | null = null;
async function getBrowser(): Promise<Browser> {
  if (_browserCache) return _browserCache;
  _browserCache = await chromium.launch({ headless: true });
  return _browserCache;
}

export async function closeBrowser(): Promise<void> {
  if (_browserCache) {
    await _browserCache.close();
    _browserCache = null;
  }
}

export async function renderPdf(html: string, outPath: string): Promise<void> {
  const browser = await getBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => (document as any).fonts && (document as any).fonts.ready);
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });
  await context.close();
}

export async function writePrintPdf(
  numerals: number[],
  opts: {
    cardsPerPage: number;
    locale: string;
    showNumberWord: boolean;
    borderStyle: 'thin' | 'thick' | 'rounded' | 'none';
    roundedCorners: boolean;
  },
  outPath: string
): Promise<void> {
  const html = await renderPrintHtml(numerals, opts);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath);
}
