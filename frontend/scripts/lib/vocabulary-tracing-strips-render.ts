/**
 * vocabulary-tracing-strips-render.ts — Pillar 5 F11 commission renderer.
 *
 * Per materials-catalog.json vocabulary-tracing-strips spec: horizontal strip
 * per row = [image-cell ~28%] + [traceable-word-cell ~50%] + [independent-line-
 * cell ~22%]. Kids trace the light-gray word in pencil + write it on the blank
 * line below.
 *
 * Tracing-font approach per catalog doctrine_notes (lines 272-273):
 * "True dotted-stroke handwriting font NOT loaded; v1 approximates via light-
 * gray fill (Fredoka @ ~48pt #d0d4dc) or thin outline." Fredoka is already
 * loaded by flashcards + numeral-cards renderers; reused here.
 *
 * Differentiation from sentence-strips: sentence-strips renders [image] +
 * [full sentence frame] for frame-pattern reading; vocabulary-tracing-strips
 * renders [image] + [traceable vocab word] + [independent writing line] for
 * letter-formation + word-recognition motor practice. Distinct K-3 workflows.
 *
 * Mirrors matching-mat-render.ts (F10) Sharp + Playwright pipeline.
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
import type {
  TraceStyle,
  LabelCase,
} from './vocabulary-tracing-strips-package-loader';

export interface TracingStripItem {
  filename: string;
  imagePath: string;
}

const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Fredoka:wght@500;600&family=Lexend+Deca:wght@400;500&display=swap" rel="stylesheet">`;
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

interface PreparedStrip {
  filename: string;
  dataUrl: string;
  word: string;
}

function applyLabelCase(s: string, mode: LabelCase): string {
  if (mode === 'lowercase') return s.toLowerCase();
  if (mode === 'UPPERCASE') return s.toUpperCase();
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

async function prepareStrips(
  items: TracingStripItem[],
  locale: Locale,
  labelCase: LabelCase,
  vocab: Record<string, VocabEntry>
): Promise<PreparedStrip[]> {
  const out: PreparedStrip[] = [];
  for (const it of items) {
    const dataUrl = await imageToDataUrl(it.imagePath);
    const vocabEntry = vocab[it.filename];
    const rawWord = vocabEntry ? displayWord(it.filename, vocabEntry, locale) : it.filename;
    const word = applyLabelCase(rawWord, labelCase);
    out.push({ filename: it.filename, dataUrl, word });
  }
  return out;
}

interface ChromeStrings {
  subtitle: string;
  instructions: string;
}

const CHROME_STRINGS: Record<string, ChromeStrings> = {
  en: {
    subtitle: 'VOCABULARY TRACING',
    instructions: 'Trace each word, then write it on the line below.',
  },
  de: {
    subtitle: 'WÖRTER NACHSPUREN',
    instructions: 'Spure jedes Wort nach und schreibe es auf die Linie darunter.',
  },
  es: {
    subtitle: 'TRAZAR VOCABULARIO',
    instructions: 'Traza cada palabra y luego escríbela en la línea de abajo.',
  },
  nl: {
    subtitle: 'WOORDEN OVERTREKKEN',
    instructions: 'Trek elk woord over en schrijf het op de lijn eronder.',
  },
};

function getChromeStrings(locale: string): ChromeStrings {
  return CHROME_STRINGS[locale] || CHROME_STRINGS.en;
}

const SHEET_CSS = `
  :root {
    --ink: #2E2A22;
    --ink-soft: #5A5345;
    --border-soft: #D4C9A8;
    --bg: #FBF8EE;
    --card-bg: #FFFFFF;
    --trace-fill: #d0d4dc;
    --trace-stroke: #94a3b8;
    --line-color: #B5A989;
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
    margin: 0 0 3mm 0;
    letter-spacing: 0.04em;
  }
  p.instructions {
    font-size: 10pt;
    color: var(--ink);
    margin: 0 0 5mm 0;
    font-style: italic;
  }
  .strips {
    display: flex;
    flex-direction: column;
    gap: 4mm;
  }
  .strip {
    background: var(--card-bg);
    border: 1.5px solid var(--border-soft);
    border-radius: 6px;
    display: grid;
    grid-template-columns: 28% 50% 22%;
    align-items: center;
    padding: 3mm;
    box-sizing: border-box;
  }
  .strip .image-cell {
    display: flex; align-items: center; justify-content: center;
  }
  .strip .image-cell img {
    max-width: 100%;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
  }
  .strip .word-cell {
    font-family: 'Fredoka', sans-serif;
    font-weight: 600;
    text-align: center;
    line-height: 1;
    padding: 0 4mm;
  }
  .strip .word-cell.dotted {
    color: var(--trace-fill);
  }
  .strip .word-cell.outline {
    color: transparent;
    -webkit-text-stroke: 1.5px var(--trace-stroke);
  }
  .strip .line-cell {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0 2mm 3mm 2mm;
  }
  .strip .writing-line {
    border-bottom: 0.7pt solid var(--line-color);
    width: 100%;
    height: 0;
  }
  .strip.no-line {
    grid-template-columns: 35% 65%;
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
  items: TracingStripItem[];
  locale: Locale;
  stripCount: number;
  stripsPerPage: number;
  labelCase: LabelCase;
  traceStyle: TraceStyle;
  includeIndependentLine: boolean;
  packageSlug: string;
  packageTitle?: string;
}): Promise<string> {
  const vocab = loadVocab(REPO_ROOT);
  const prepared = await prepareStrips(opts.items, opts.locale, opts.labelCase, vocab);

  // Compute strip height per stripsPerPage. A4 usable = 273mm; title-area ~28mm;
  // footer ~10mm; gap 4mm × (stripsPerPage-1). Strip height = remaining / stripsPerPage.
  const stripsPerPage = opts.stripsPerPage;
  const usableHeight = 273 - 28 - 10 - 4 * (stripsPerPage - 1);
  const stripHeight = Math.max(20, Math.floor((usableHeight / stripsPerPage) * 10) / 10);
  // Word size scales with strip height. ~50% of strip height feels right for K-3 tracing.
  const wordPt = Math.max(28, Math.floor(stripHeight * 1.4));
  const imgMaxHeight = Math.max(14, stripHeight - 8);

  const stripClass = opts.includeIndependentLine ? 'strip' : 'strip no-line';
  const wordClass = opts.traceStyle === 'dotted' ? 'word-cell dotted' : 'word-cell outline';

  const stripHtml = (p: PreparedStrip): string => {
    const lineHtml = opts.includeIndependentLine
      ? `<div class="line-cell"><div class="writing-line"></div></div>`
      : '';
    return `
      <article class="${stripClass}" style="height:${stripHeight}mm">
        <div class="image-cell"><img src="${p.dataUrl}" alt="${escapeHtml(p.filename)}" style="max-height:${imgMaxHeight}mm"></div>
        <div class="${wordClass}" style="font-size:${wordPt}pt">${escapeHtml(p.word)}</div>
        ${lineHtml}
      </article>`;
  };

  // Chunk strips into pages of stripsPerPage
  const pages: PreparedStrip[][] = [];
  for (let i = 0; i < prepared.length; i += stripsPerPage) {
    pages.push(prepared.slice(i, i + stripsPerPage));
  }

  const titleText = opts.packageTitle || opts.packageSlug;
  const chrome = getChromeStrings(opts.locale);

  const pagesHtml = pages
    .map((pageStrips, pageIdx) => {
      // Title section only on page 1; subsequent pages get strips only.
      const headerHtml = pageIdx === 0
        ? `<h1 class="title">${escapeHtml(titleText)}</h1>
           <p class="subtitle">${escapeHtml(chrome.subtitle)}</p>
           <p class="instructions">${escapeHtml(chrome.instructions)}</p>`
        : '';
      const pageBreakStyle = pageIdx < pages.length - 1 ? 'page-break-after: always;' : '';
      return `
        <section class="page" style="${pageBreakStyle}">
          ${headerHtml}
          <div class="strips">${pageStrips.map(stripHtml).join('')}</div>
        </section>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="${opts.locale}">
<head>
  <meta charset="UTF-8">
  <title>Vocabulary tracing — ${escapeHtml(titleText)}</title>
  ${FONT_LINK}
  <style>${SHEET_CSS}</style>
</head>
<body>
  ${pagesHtml}
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
    items: TracingStripItem[];
    locale: Locale;
    stripCount: number;
    stripsPerPage: number;
    labelCase: LabelCase;
    traceStyle: TraceStyle;
    includeIndependentLine: boolean;
    packageSlug: string;
    packageTitle?: string;
  },
  outPath: string
): Promise<void> {
  const html = await renderPrintHtml(opts);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath);
}
