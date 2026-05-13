/**
 * sentence-strips-render.ts — Pillar 5 Phase 2 Sub-Phase 2.3 renderer.
 *
 * Multi-page Playwright PDF for sentence-strips material. Each page: stripsPerPage
 * strips vertically stacked. Per strip: image (left, ~40mm) + filled sentence
 * (right, target language) + optional writing line below.
 *
 * Frame template chosen via FRAME_BY_LOCALE for the package's `language`; vocabulary
 * substitution via IMAGE_VOCABULARY (singular/plural/gender) per fillTemplate; article
 * auto-resolution per locale rules. HIGH-QC dimension per materials-catalog.json:154.
 */

import * as fs from 'fs';
import * as path from 'path';
import { chromium, type Browser } from 'playwright';
import type { SentenceStripsPackage } from './sentence-strips-package-loader';
import { loadVocab, type VocabEntry } from './flashcard-data';
import { chooseTemplate } from './sentence-frame-library';
import { fillTemplate } from './sentence-template-filler';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');

const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Lexend+Deca:wght@400;500;600&display=swap" rel="stylesheet">`;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---- Theme image resolver (5th consumer; DRY-extract still deferred) ----

function themeNameCandidates(themeName: string): string[] {
  const spaced = themeName.replace(/[_-]/g, ' ');
  return [
    themeName,
    spaced,
    spaced.replace(/\b\w/g, (c) => c.toUpperCase()),
    themeName.toLowerCase(),
  ];
}

function resolveThemeDirAbs(themeName: string): string | null {
  for (const candidate of themeNameCandidates(themeName)) {
    const tryPath = path.join(IMAGE_LIBRARY_ROOT, candidate);
    if (fs.existsSync(tryPath) && fs.statSync(tryPath).isDirectory()) return tryPath;
  }
  try {
    const dirs = fs.readdirSync(IMAGE_LIBRARY_ROOT);
    const lowerName = themeName.toLowerCase().replace(/[_-]/g, ' ');
    const match = dirs.find((d) => d.toLowerCase() === lowerName);
    return match ? path.join(IMAGE_LIBRARY_ROOT, match) : null;
  } catch {
    return null;
  }
}

function pickThemeFilenames(themeName: string, count: number): string[] {
  const dir = resolveThemeDirAbs(themeName);
  if (!dir) {
    console.warn(`WARN theme dir not found for themeName='${themeName}'`);
    return [];
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .sort();
  return files.slice(0, count).map((f) => f.replace(/\.png$/i, ''));
}

function normalizeKey(filename: string): string {
  const noExt = filename.replace(/\.\w+$/, '');
  const slugified = noExt.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase();
  return slugified.replace(/-\d+$/, '').replace(/-+$/, '');
}

function imageToDataUri(absPath: string): string {
  const buf = fs.readFileSync(absPath);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

// ---- Per-strip data ----

interface Strip {
  imageDataUri: string;
  sentence: string;
  count: number; // F6: count parameter passed to fillTemplate for `{count}` substitution
  imageCount: number; // F6 Sub-Phase 1.4 fix: per-strip image count (1 for count-free frames; matches count for count-bearing frames)
}

function resolveStripCount(pkg: SentenceStripsPackage, index: number): number {
  if (pkg.countMode === 'varying') {
    return index + 1; // 1..stripCount
  }
  if (pkg.countMode === 'explicit' && pkg.countList && pkg.countList.length > 0) {
    return pkg.countList[index % pkg.countList.length] || 1;
  }
  // 'fixed' default: 3 for count-bearing frames (matches pre-F6 behavior);
  // count-free frames don't use the count param at fillTemplate either way.
  return 3;
}

// F6 Sub-Phase 1.4 fix: image count is independent of text count.
// Count-bearing frame (`there-are-count-plural`): image count matches stated
// count for visual verification ("There are 5 dogs" shows 5 dog images).
// Count-free frames (`this-is-a`, `i-see-a`, `i-have-a`, `i-like-plural`,
// `the-item-is-color`, `the-item-says`, `custom`): single image per strip
// regardless of count param (the count value is unused by these templates
// at fillTemplate and would visually misrepresent the singular framing).
function resolveImageCount(framePreset: string, count: number): number {
  if (framePreset === 'there-are-count-plural') return count;
  return 1;
}

function buildStrips(pkg: SentenceStripsPackage, vocab: Record<string, VocabEntry>): Strip[] {
  const themeDirAbs = pkg.themeName ? resolveThemeDirAbs(pkg.themeName) : null;
  let filenames: string[] = [];
  if (pkg.imageSource === 'vocabKeyList' && pkg.vocabKeys && pkg.vocabKeys.length > 0) {
    filenames = pkg.vocabKeys.slice(0, pkg.stripCount);
  } else if (pkg.imageSource === 'theme' && pkg.themeName) {
    filenames = pickThemeFilenames(pkg.themeName, pkg.stripCount);
  }

  const strips: Strip[] = [];
  filenames.forEach((filename, idx) => {
    const vocabKey = normalizeKey(filename);
    const entry = vocab[vocabKey];
    const count = resolveStripCount(pkg, idx);
    // F6: per-strip template resolution so N=1 strips use locale singular variant
    // of there-are-count-plural per chooseTemplate's count-aware dispatch.
    const template = chooseTemplate(pkg.framePreset, pkg.language, pkg.frameTemplate, count);
    const sentence = fillTemplate(template, entry, vocabKey, pkg.language, count);
    let imageDataUri = '';
    if (themeDirAbs) {
      const pngPath = path.join(themeDirAbs, `${filename}.png`);
      if (fs.existsSync(pngPath)) {
        imageDataUri = imageToDataUri(pngPath);
      }
    }
    const imageCount = resolveImageCount(pkg.framePreset, count);
    strips.push({ imageDataUri, sentence, count, imageCount });
  });
  return strips;
}

// ---- CSS ----

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Lexend Deca', system-ui, sans-serif; color: #2E2A22; }
  @page { size: A4; margin: 14mm 14mm; }
  .page {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    gap: 5mm;
  }
  .page:last-child { page-break-after: auto; }
  .strip {
    display: flex;
    align-items: center;
    gap: 6mm;
    padding: 5mm;
    border: 0.6pt solid #C2D0B8;
    border-radius: 2mm;
    background: #FCFAF4;
    break-inside: avoid;
  }
  .strip-image {
    flex: 0 0 38mm;
    height: 38mm;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5mm;
    flex-wrap: wrap;
  }
  .strip-image img {
    max-width: 38mm;
    max-height: 38mm;
    object-fit: contain;
  }
  /* F6: multi-image strip widening + per-count image sizing. Image-row
     widens for higher counts; per-image max-width shrinks so all N images
     fit. Single-image strip (default count=1) renders unchanged. */
  .strip-image.count-2 { flex: 0 0 50mm; }
  .strip-image.count-2 img { max-width: 22mm; max-height: 36mm; }
  .strip-image.count-3 { flex: 0 0 60mm; }
  .strip-image.count-3 img { max-width: 17mm; max-height: 30mm; }
  .strip-image.count-4 { flex: 0 0 68mm; }
  .strip-image.count-4 img { max-width: 14mm; max-height: 28mm; }
  .strip-image.count-5 { flex: 0 0 76mm; }
  .strip-image.count-5 img { max-width: 13mm; max-height: 26mm; }
  /* N≥6: 2-row layout in 76mm-wide row. Images at ~11mm fit 6-10 per cell. */
  .strip-image.count-6, .strip-image.count-7, .strip-image.count-8,
  .strip-image.count-9, .strip-image.count-10 { flex: 0 0 76mm; }
  .strip-image.count-6 img, .strip-image.count-7 img, .strip-image.count-8 img,
  .strip-image.count-9 img, .strip-image.count-10 img {
    max-width: 11mm; max-height: 14mm;
  }
  .strip-image.no-image {
    background: #F5EFDF;
    border: 0.4pt dashed #B5A989;
    border-radius: 2mm;
  }
  .strip-content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 3mm;
    justify-content: center;
  }
  .sentence {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    font-size: 18pt;
    line-height: 1.3;
    color: #1A1814;
  }
  .writing-line {
    border-bottom: 0.6pt solid #B5A989;
    height: 8mm;
    width: 100%;
  }
  footer.brand {
    margin-top: 4mm;
    text-align: center;
    font-size: 7pt;
    color: #94a3b8;
    letter-spacing: 0.04em;
  }
`;

function renderStripHtml(strip: Strip, includeWritingLine: boolean): string {
  let imgPart: string;
  if (strip.imageDataUri) {
    // F6: render imageCount copies of the image. For count-bearing frames
    // (`there-are-count-plural`), imageCount === count for visual alignment.
    // For count-free frames (this-is-a, i-see-a, i-have-a, i-like-plural,
    // etc.), imageCount === 1 regardless of count, since the singular/plural
    // framing is carried by the sentence text, not by image multiplicity.
    const imagesHtml = Array.from({ length: strip.imageCount }, () =>
      `<img src="${strip.imageDataUri}" alt="">`
    ).join('');
    imgPart = `<div class="strip-image count-${strip.imageCount}">${imagesHtml}</div>`;
  } else {
    imgPart = `<div class="strip-image no-image"></div>`;
  }
  const writingPart = includeWritingLine ? `<div class="writing-line"></div>` : '';
  return `
    <article class="strip">
      ${imgPart}
      <div class="strip-content">
        <div class="sentence">${escapeHtml(strip.sentence)}</div>
        ${writingPart}
      </div>
    </article>`;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function renderPrintHtml(pkg: SentenceStripsPackage): Promise<string> {
  const vocab = loadVocab(REPO_ROOT);
  const strips = buildStrips(pkg, vocab);
  const pages = chunk(strips, Math.max(1, pkg.stripsPerPage));
  const pagesHtml = pages
    .map(
      (pageStrips) => `
    <section class="page">
      ${pageStrips.map((s) => renderStripHtml(s, pkg.includeWritingLine)).join('')}
    </section>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="${pkg.language}">
<head>
  <meta charset="UTF-8">
  <title>Sentence strips · ${escapeHtml(pkg.slug)}</title>
  ${FONT_LINK}
  <style>${CSS}</style>
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

export async function renderPdf(html: string, outPath: string, paperSize: 'a4' | 'letter'): Promise<void> {
  const browser = await getBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => (document as any).fonts && (document as any).fonts.ready);
  await page.pdf({
    path: outPath,
    format: paperSize === 'letter' ? 'Letter' : 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });
  await context.close();
}

export async function writePrintPdf(pkg: SentenceStripsPackage, outPath: string): Promise<void> {
  const html = await renderPrintHtml(pkg);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath, pkg.paperSize);
}
