/**
 * manipulative-cut-outs-render.ts — Pillar 5 Phase 1 Sub-Phase 1.3 renderer.
 *
 * Image-tile grid with variable layout per itemSize:
 *   - small-1in (25.4mm) → ~7×10 grid (~70 tiles/page)
 *   - medium-1.5in (38.1mm) → ~4×6 grid (~24 tiles/page)
 *   - large-2in (50.8mm) → ~3×5 grid (~15 tiles/page)
 *
 * Multi-page when itemCount exceeds tiles-per-page. Each tile has dashed
 * cut-guide border for finger-friendly K-3 cutting. Mode-specific tile
 * sequencing:
 *   - single-repeat: 1 image × itemCount tiles
 *   - variety: N images, each repeated ⌈itemCount/N⌉ times
 *
 * Mirrors picture-cards-render Sharp + Playwright pipeline; flexible grid
 * is the key differentiator.
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { chromium, type Browser } from 'playwright';
import type { CutOutMode, ItemSize, ResolvedTile } from './manipulative-cut-outs-package-loader';

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

// A4 dimensions with 10mm margins: 190mm × 277mm usable
const PAGE_WIDTH_MM = 190;
const PAGE_HEIGHT_MM = 277;
const GAP_MM = 3;

const ITEM_SIZE_MM: Record<ItemSize, number> = {
  'small-1in': 25.4,
  'medium-1.5in': 38.1,
  'large-2in': 50.8,
};

interface GridLayout {
  cols: number;
  rows: number;
  tilesPerPage: number;
  tileSizeMm: number;
}

export function computeGridLayout(itemSize: ItemSize): GridLayout {
  const tileSizeMm = ITEM_SIZE_MM[itemSize];
  const cellMm = tileSizeMm + GAP_MM;
  const cols = Math.floor((PAGE_WIDTH_MM + GAP_MM) / cellMm);
  const rows = Math.floor((PAGE_HEIGHT_MM + GAP_MM) / cellMm);
  return {
    cols,
    rows,
    tilesPerPage: cols * rows,
    tileSizeMm,
  };
}

interface PreparedTile {
  filename: string;
  dataUrl: string;
}

async function prepareTiles(tiles: ResolvedTile[]): Promise<PreparedTile[]> {
  const out: PreparedTile[] = [];
  for (const t of tiles) {
    const dataUrl = await imageToDataUrl(t.imagePath);
    out.push({ filename: t.filename, dataUrl });
  }
  return out;
}

/**
 * Build the tile sequence (length = itemCount) per mode:
 *   - single-repeat: tiles[0] repeated itemCount times
 *   - variety: each tile repeated ⌈itemCount/N⌉ times (round-robin)
 */
function buildTileSequence(
  tiles: PreparedTile[],
  itemCount: number,
  mode: CutOutMode
): PreparedTile[] {
  if (tiles.length === 0) return [];
  if (mode === 'single-repeat') {
    return Array(itemCount).fill(tiles[0]);
  }
  // variety: round-robin distribute itemCount copies across tiles
  const out: PreparedTile[] = [];
  const perTile = Math.ceil(itemCount / tiles.length);
  for (const t of tiles) {
    for (let i = 0; i < perTile && out.length < itemCount * tiles.length; i++) {
      out.push(t);
    }
  }
  return out;
}

function renderTile(tile: PreparedTile): string {
  return `<article class="tile"><img src="${tile.dataUrl}" alt="${escapeHtml(tile.filename)}"></article>`;
}

export async function renderPrintHtml(
  tiles: ResolvedTile[],
  opts: {
    mode: CutOutMode;
    itemCount: number;
    itemSize: ItemSize;
    showCutGuides: boolean;
    locale: string;
  }
): Promise<string> {
  const { mode, itemCount, itemSize, showCutGuides, locale } = opts;
  const prepared = await prepareTiles(tiles);
  const sequence = buildTileSequence(prepared, itemCount, mode);
  const layout = computeGridLayout(itemSize);

  // Page-split
  const pages: PreparedTile[][] = [];
  for (let i = 0; i < sequence.length; i += layout.tilesPerPage) {
    pages.push(sequence.slice(i, i + layout.tilesPerPage));
  }

  const cutGuideCss = showCutGuides
    ? `
    .tile {
      border: 0.5px dashed #94a3b8;
    }
  `
    : '';

  const css = `
    * { box-sizing: border-box; }
    body { margin: 0; font-family: 'Lexend Deca', system-ui, sans-serif; }
    @page { size: A4; margin: 10mm; }
    .grid {
      display: grid;
      grid-template-columns: repeat(${layout.cols}, ${layout.tileSizeMm}mm);
      grid-template-rows: repeat(${layout.rows}, ${layout.tileSizeMm}mm);
      gap: ${GAP_MM}mm;
      width: 190mm;
      height: 277mm;
      align-content: start;
      justify-content: start;
      page-break-after: always;
    }
    .grid:last-child { page-break-after: auto; }
    .tile {
      width: ${layout.tileSizeMm}mm;
      height: ${layout.tileSizeMm}mm;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      background: #ffffff;
    }
    .tile img {
      max-width: 92%; max-height: 92%; object-fit: contain;
      image-rendering: -webkit-optimize-contrast;
    }
    ${cutGuideCss}
  `;

  const pagesHtml = pages
    .map((pageTiles) => {
      const cells = pageTiles.map((t) => renderTile(t)).join('');
      return `<div class="grid">${cells}</div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <title>Manipulative cut-outs (${mode}, ${itemSize})</title>
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
  tiles: ResolvedTile[],
  opts: {
    mode: CutOutMode;
    itemCount: number;
    itemSize: ItemSize;
    showCutGuides: boolean;
    locale: string;
  },
  outPath: string
): Promise<void> {
  const html = await renderPrintHtml(tiles, opts);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath);
}
