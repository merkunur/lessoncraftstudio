/**
 * matching-mat-render.ts — Pillar 5 Phase 1 F10 commission renderer.
 *
 * Per materials-catalog.json matching-mat spec: single-page A4 mat with N
 * images on the left column + N corresponding words on the right column (in
 * target language; right column shuffled relative to left). Kid draws lines
 * OR places counters to match pairs.
 *
 * Differentiation from existing matching app PDF (per catalog doctrine_notes):
 * matching-mat is carpet/table-mat scale with larger cells for manipulative-
 * token-placement workflow. The matching app PDF is individual-table
 * worksheet-scale.
 *
 * Mirrors picture-cards-render.ts Sharp + Playwright pipeline. Single-page
 * output per package + locale.
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { chromium, type Browser } from 'playwright';
import {
  loadVocab,
  displayWord,
  type VocabEntry,
  type Locale,
} from './flashcard-data';
import type { RightColumnContent, LabelCase } from './matching-mat-package-loader';

export interface MatchingMatItem {
  filename: string;        // vocab key (also used as image filename stem)
  imagePath: string;       // absolute path to PNG
}

const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Lexend+Deca:wght@400;500&display=swap" rel="stylesheet">`;
const MAX_DIM = 600;
const _imageCache = new Map<string, string>();
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

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

interface PreparedPair {
  filename: string;
  dataUrl: string;
  word: string;       // localized word with labelCase applied
}

async function prepareItems(
  items: MatchingMatItem[],
  locale: Locale,
  labelCase: LabelCase,
  rightColumnContent: RightColumnContent,
  vocab: Record<string, VocabEntry>
): Promise<PreparedPair[]> {
  const out: PreparedPair[] = [];
  for (const it of items) {
    const dataUrl = await imageToDataUrl(it.imagePath);
    let word = '';
    if (rightColumnContent === 'word' || rightColumnContent === 'letter-only') {
      const vocabEntry = vocab[it.filename];
      const rawWord = vocabEntry ? displayWord(it.filename, vocabEntry, locale) : it.filename;
      const cased = applyLabelCase(rawWord, labelCase);
      word = rightColumnContent === 'letter-only' ? cased.charAt(0) : cased;
    }
    out.push({ filename: it.filename, dataUrl, word });
  }
  return out;
}

function applyLabelCase(s: string, mode: LabelCase): string {
  if (mode === 'lowercase') return s.toLowerCase();
  if (mode === 'UPPERCASE') return s.toUpperCase();
  // Title Case
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

interface ChromeStrings {
  subtitle: string;
  instructions: string;
}

/**
 * Chrome strings per locale. Tier 1+2 (en/de/es/nl) authored at F10 ship.
 * Tier 3+4 (fr/it/pt/sv/da/no/fi) fall back to en until Wave 3 backlog ships.
 * Mirrors parent-letter-render.ts META_LABELS pattern (per-locale labels
 * hardcoded in the renderer rather than threaded through messages/*.json
 * which is consumed by Next.js UI surfaces, not Pillar 5 PDF renderers).
 */
const CHROME_STRINGS: Record<string, ChromeStrings> = {
  en: {
    subtitle: 'MATCHING MAT',
    instructions: 'Draw a line from each picture on the left to its match on the right.',
  },
  de: {
    subtitle: 'ZUORDNUNGSMATTE',
    instructions: 'Verbinde jedes Bild auf der linken Seite mit dem passenden Wort auf der rechten Seite.',
  },
  es: {
    subtitle: 'TABLERO DE EMPAREJAMIENTO',
    instructions: 'Traza una línea desde cada imagen de la izquierda hasta su pareja a la derecha.',
  },
  nl: {
    subtitle: 'VERBINDINGSMAT',
    instructions: 'Trek een lijn van elke afbeelding aan de linkerkant naar het bijpassende woord aan de rechterkant.',
  },
};

function getChromeStrings(locale: string): ChromeStrings {
  return CHROME_STRINGS[locale] || CHROME_STRINGS.en;
}

/**
 * Deterministic Fisher-Yates shuffle seeded by (packageSlug + locale). Same
 * input always produces the same shuffled output — reproducibility across
 * package re-renders, locale variants share order within a (package, locale)
 * pair but differ across packages.
 */
function seededShuffle<T>(items: T[], seed: string): T[] {
  // Simple deterministic PRNG: mulberry32 with hashed seed.
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  let a = h >>> 0;
  function rand(): number {
    a = (a + 0x6D2B79F5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const SHEET_CSS = `
  :root {
    --ink: #2E2A22;
    --ink-soft: #5A5345;
    --border: #B5A989;
    --border-soft: #D4C9A8;
    --bg: #FBF8EE;
    --card-bg: #FFFFFF;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Lexend Deca', system-ui, sans-serif;
    color: var(--ink);
    background: var(--bg);
  }
  @page { size: A4; margin: 12mm; }
  h1.title {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 18pt;
    margin: 0 0 2mm 0;
    color: #1A1814;
  }
  p.subtitle {
    font-size: 9pt;
    color: var(--ink-soft);
    margin: 0 0 4mm 0;
    letter-spacing: 0.02em;
  }
  p.instructions {
    font-size: 10pt;
    color: var(--ink);
    margin: 0 0 5mm 0;
    font-style: italic;
  }
  .mat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30mm;
    width: 100%;
  }
  .col {
    display: flex;
    flex-direction: column;
    gap: 4mm;
  }
  .cell {
    background: var(--card-bg);
    border: 1.5px solid var(--border-soft);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5mm;
    box-sizing: border-box;
  }
  .cell.image-cell img {
    max-width: 100%;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
  }
  .cell.word-cell {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    font-size: 16pt;
    color: var(--ink);
    text-align: center;
  }
  .cell.letter-cell {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 32pt;
    color: var(--ink);
    text-align: center;
  }
  footer.brand {
    margin-top: 6mm;
    text-align: center;
    font-size: 7pt;
    color: #94a3b8;
    letter-spacing: 0.04em;
  }
`;

export async function renderPrintHtml(opts: {
  items: MatchingMatItem[];
  locale: Locale;
  pairCount: number;
  rightColumnContent: RightColumnContent;
  labelCase: LabelCase;
  packageSlug: string;
  packageTitle?: string;
}): Promise<string> {
  const vocab = loadVocab(REPO_ROOT);
  const prepared = await prepareItems(
    opts.items,
    opts.locale,
    opts.labelCase,
    opts.rightColumnContent,
    vocab
  );

  // Right column shuffled relative to left column. Seed includes package slug
  // + locale + pairCount so re-renders are reproducible per (package, locale).
  const rightOrder = seededShuffle(prepared, `${opts.packageSlug}|${opts.locale}|${prepared.length}`);

  // Compute fixed cell height per pairCount so layout fits single A4.
  // A4 = 297mm; @page margin 12mm × 2 = 24mm → 273mm usable height.
  // Title-area: ~28mm (title + subtitle + instructions + spacing).
  // Footer: ~10mm. Row gap: 4mm × (N-1).
  // Cell-only budget: 273 - 28 - 10 - 4*(N-1) mm. Per-pair height:
  // budget / N. Cells use box-sizing border-box; padding 2.5mm × 2 included.
  const usableHeight = 273 - 28 - 10 - 4 * (opts.pairCount - 1);
  const cellHeight = Math.max(16, Math.floor((usableHeight / opts.pairCount) * 10) / 10);
  const imgMaxHeight = Math.max(12, cellHeight - 6); // padding allowance

  const leftCells = prepared
    .map(
      (p) =>
        `<div class="cell image-cell" style="height:${cellHeight}mm"><img src="${p.dataUrl}" alt="${escapeHtml(p.filename)}" style="max-height:${imgMaxHeight}mm"></div>`
    )
    .join('');

  const rightCells = rightOrder
    .map((p) => {
      if (opts.rightColumnContent === 'image') {
        return `<div class="cell image-cell" style="height:${cellHeight}mm"><img src="${p.dataUrl}" alt="${escapeHtml(p.filename)}" style="max-height:${imgMaxHeight}mm"></div>`;
      }
      const cellClass = opts.rightColumnContent === 'letter-only' ? 'cell letter-cell' : 'cell word-cell';
      return `<div class="${cellClass}" style="height:${cellHeight}mm">${escapeHtml(p.word)}</div>`;
    })
    .join('');

  const titleText = opts.packageTitle || opts.packageSlug;
  const chrome = getChromeStrings(opts.locale);
  const instructions = chrome.instructions;
  const subtitleText = chrome.subtitle;

  return `<!DOCTYPE html>
<html lang="${opts.locale}">
<head>
  <meta charset="UTF-8">
  <title>Matching mat — ${escapeHtml(titleText)}</title>
  ${FONT_LINK}
  <style>${SHEET_CSS}</style>
</head>
<body>
  <h1 class="title">${escapeHtml(titleText)}</h1>
  <p class="subtitle">${escapeHtml(subtitleText)}</p>
  <p class="instructions">${escapeHtml(instructions)}</p>
  <div class="mat-grid">
    <div class="col">${leftCells}</div>
    <div class="col">${rightCells}</div>
  </div>
  <footer class="brand">LessonCraftStudio</footer>
</body>
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
  opts: {
    items: MatchingMatItem[];
    locale: Locale;
    pairCount: number;
    rightColumnContent: RightColumnContent;
    labelCase: LabelCase;
    packageSlug: string;
    packageTitle?: string;
  },
  outPath: string
): Promise<void> {
  const html = await renderPrintHtml(opts);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath);
}
