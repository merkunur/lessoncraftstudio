/**
 * picture-cards-render.ts — Pillar 5 Phase 1 Sub-Phase 1.1 renderer.
 *
 * Image-only print PDF (no word-band; no digital viewer). Sky+v2 card aspect
 * preserved but text-band removed per materials-catalog.json picture-cards
 * spec ("image library; one image per card; no label text").
 *
 * Mirrors flashcard-render.ts Sharp + Playwright pipeline; image preprocessing
 * + print-grid layout + cut-guides reused. Word-band CSS dropped; image-band
 * expanded to fill more of card; brand attribution moved to small footer.
 *
 * Output formats: print-{cardsPerPage}up.pdf per locale-package.
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { chromium, type Browser } from 'playwright';

export interface PictureCard {
  filename: string;
  imagePath: string;
}

const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500&display=swap" rel="stylesheet">`;
const MAX_DIM = 600;
const _imageCache = new Map<string, string>();

async function imageToDataUrl(imagePath: string): Promise<string> {
  const stat = fs.statSync(imagePath);
  const cacheKey = `${imagePath}:${stat.mtimeMs}:${stat.size}`;
  const cached = _imageCache.get(cacheKey);
  if (cached) return cached;
  const buf = await sharp(imagePath)
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
  const dataUrl = `data:image/png;base64,${buf.toString('base64')}`;
  _imageCache.set(cacheKey, dataUrl);
  return dataUrl;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface PreparedCard extends PictureCard {
  dataUrl: string;
}

async function prepareCards(cards: PictureCard[]): Promise<PreparedCard[]> {
  const out: PreparedCard[] = [];
  for (const c of cards) {
    const dataUrl = await imageToDataUrl(c.imagePath);
    out.push({ ...c, dataUrl });
  }
  return out;
}

function renderCard(card: PreparedCard): string {
  return `
    <article class="card">
      <div class="image-band"><img src="${card.dataUrl}" alt="${escapeHtml(card.filename)}"></div>
      <div class="footer">LessonCraftStudio</div>
    </article>`;
}

const CARD_CSS = `
  :root {
    --card-border: #e1e4eb;
    --card-bg: #ffffff;
    --card-corner: 8px;
    --footer-color: #94a3b8;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Lexend Deca', system-ui, sans-serif; color: #222; }
  .card {
    aspect-ratio: 2 / 3;
    background: var(--card-bg);
    border: 2px solid var(--card-border);
    border-radius: var(--card-corner);
    overflow: hidden;
    display: grid;
    /* Picture-cards: image fills card; small brand footer. No accent stripe,
       no word-band. Image gets ~92% of card height; footer ~6%. */
    grid-template-rows: 92% 1fr;
    container-type: inline-size;
  }
  .card .image-band {
    display: flex; align-items: center; justify-content: center;
    padding: 6% 8%;
  }
  .card .image-band img {
    max-width: 100%; max-height: 100%; object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
  }
  .card .footer {
    text-align: center;
    font-size: 7pt;
    color: var(--footer-color);
    letter-spacing: 0.04em;
    padding-top: 1mm;
  }
`;

export async function renderPrintHtml(
  cards: PictureCard[],
  opts: { cardsPerPage: number; locale: string }
): Promise<string> {
  const { cardsPerPage, locale } = opts;
  const prepared = await prepareCards(cards);
  // Layout grid per cardsPerPage: 4 → 2×2; 6 → 3×2; 9 → 3×3; 12 → 3×4
  let cols = 3;
  let rows = Math.ceil(cardsPerPage / cols);
  if (cardsPerPage === 4) { cols = 2; rows = 2; }

  const css = `
    ${CARD_CSS}
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
    .card .footer { font-size: ${cardsPerPage <= 6 ? 7 : 6}pt; }
  `;

  const pages: PreparedCard[][] = [];
  for (let i = 0; i < prepared.length; i += cardsPerPage) {
    pages.push(prepared.slice(i, i + cardsPerPage));
  }

  const pagesHtml = pages
    .map((pageCards) => {
      const cardCells = pageCards.map((c) => renderCard(c)).join('');
      const padding = Array(cardsPerPage - pageCards.length).fill('<div></div>').join('');
      return `<div class="grid">${cardCells}${padding}</div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <title>Picture cards ${cardsPerPage}-up</title>
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
  cards: PictureCard[],
  opts: { cardsPerPage: number; locale: string },
  outPath: string
): Promise<void> {
  const html = await renderPrintHtml(cards, opts);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath);
}
