/**
 * parent-letter-render.ts — Pillar 5 Phase 2 Sub-Phase 2.2 renderer.
 *
 * Single-page A4/Letter PDF for parent-take-home-letter material. Header +
 * tone-templated body prose (in homeLanguage) + picture-cue grid (with
 * labels in target language) + optional signature line.
 *
 * Reuses pickThemeImages helper duplicated from flashcard-package-loader
 * (4th consumer; §14.3a.3 DRY-extract deferred to separate refactor commission).
 */

import * as fs from 'fs';
import * as path from 'path';
import { chromium, type Browser } from 'playwright';
import type { ParentLetterPackage } from './parent-letter-package-loader';
import { localizedField } from './parent-letter-package-loader';
import { loadVocab, displayWord, type VocabEntry, type Locale } from './flashcard-data';
import { resolveParentLetterProse } from './parent-letter-tone-templates';

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

// ---- Theme image resolver (duplicate per CLAUDE.md §3.1; 4th consumer; DRY-refactor filed) ----

function themeNameCandidates(themeName: string): string[] {
  const spaced = themeName.replace(/[_-]/g, ' ');
  return [
    themeName,
    spaced,
    spaced.replace(/\b\w/g, (c) => c.toUpperCase()),
    themeName.toLowerCase(),
  ];
}

function pickThemeImages(themeName: string, count: number): string[] {
  const candidates = themeNameCandidates(themeName);
  let actualDir: string | null = null;
  for (const candidate of candidates) {
    const tryPath = path.join(IMAGE_LIBRARY_ROOT, candidate);
    if (fs.existsSync(tryPath) && fs.statSync(tryPath).isDirectory()) {
      actualDir = candidate;
      break;
    }
  }
  if (!actualDir) {
    try {
      const dirs = fs.readdirSync(IMAGE_LIBRARY_ROOT);
      const lowerName = themeName.toLowerCase().replace(/[_-]/g, ' ');
      actualDir = dirs.find((d) => d.toLowerCase() === lowerName) || null;
    } catch {
      /* no-op */
    }
  }
  if (!actualDir) {
    console.warn(`WARN theme dir not found for themeName='${themeName}'`);
    return [];
  }
  const themePath = path.join(IMAGE_LIBRARY_ROOT, actualDir);
  const files = fs
    .readdirSync(themePath)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .sort();
  return files.slice(0, count).map((f) => f.replace(/\.png$/i, ''));
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

function normalizeKey(filename: string): string {
  const noExt = filename.replace(/\.\w+$/, '');
  const slugified = noExt.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase();
  return slugified.replace(/-\d+$/, '').replace(/-+$/, '');
}

// ---- Picture-cue data ----

interface PictureCue {
  imageDataUri: string; // base64 PNG
  label: string;        // localized singular name in target `language`
  vocabKey: string;
}

function imageToDataUri(absPath: string): string {
  const buf = fs.readFileSync(absPath);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function buildPictureCues(
  pkg: ParentLetterPackage,
  vocab: Record<string, VocabEntry>
): PictureCue[] {
  const cues: PictureCue[] = [];
  const themeDirAbs = pkg.themeName ? resolveThemeDirAbs(pkg.themeName) : null;
  let filenames: string[] = [];

  if (pkg.imageSource === 'vocabKeyList' && pkg.vocabKeys && pkg.vocabKeys.length > 0) {
    filenames = pkg.vocabKeys.slice(0, pkg.pictureCueCount);
  } else if (pkg.imageSource === 'theme' && pkg.themeName) {
    filenames = pickThemeImages(pkg.themeName, pkg.pictureCueCount);
  }

  for (const filename of filenames) {
    const vocabKey = normalizeKey(filename);
    const entry = vocab[vocabKey];
    const label = entry
      ? displayWord(vocabKey, entry, pkg.language as Locale)
      : vocabKey.replace(/-/g, ' ');

    let imageDataUri = '';
    if (themeDirAbs) {
      const pngPath = path.join(themeDirAbs, `${filename}.png`);
      if (fs.existsSync(pngPath)) {
        imageDataUri = imageToDataUri(pngPath);
      }
    }
    cues.push({ imageDataUri, label, vocabKey });
  }
  return cues;
}

// ---- Page CSS ----

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Lexend Deca', system-ui, sans-serif; color: #2E2A22; }
  @page { size: A4; margin: 18mm 16mm; }
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 6mm;
    padding-bottom: 3mm;
    border-bottom: 0.5pt solid #E8DFCB;
  }
  .school-brand {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 12pt;
    color: #1A1814;
    letter-spacing: 0.02em;
  }
  .meta-fields {
    font-size: 8.5pt;
    color: #5A5345;
    line-height: 1.6;
    text-align: right;
  }
  .meta-fields .meta-line { display: block; }
  .meta-fields .meta-label { color: #94a3b8; margin-right: 1.5mm; }
  .meta-fields .meta-blank {
    display: inline-block;
    min-width: 35mm;
    border-bottom: 0.4pt solid #B5A989;
    padding-bottom: 0.5mm;
  }
  .greeting {
    font-family: 'Fraunces', serif;
    font-size: 14pt;
    font-weight: 500;
    margin: 4mm 0 4mm 0;
    color: #1A1814;
  }
  .prose-block {
    font-size: 10.5pt;
    line-height: 1.55;
    color: #2E2A22;
    margin-bottom: 4mm;
  }
  .prose-block p { margin: 0 0 2.5mm 0; }
  .pictures-intro {
    margin-top: 3mm;
    font-size: 10pt;
    color: #3A352B;
    border-top: 0.5pt solid #E8DFCB;
    padding-top: 3mm;
  }
  .picture-grid {
    display: grid;
    gap: 4mm;
    margin: 3mm 0 6mm 0;
  }
  .picture-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
  .picture-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
  .picture-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
  .picture-cue {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5mm;
    padding: 2mm;
    background: #FCFAF4;
    border: 0.5pt solid #E8DFCB;
    border-radius: 2mm;
  }
  .picture-cue img {
    width: 28mm;
    height: 28mm;
    object-fit: contain;
  }
  .picture-cue .label {
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 500;
    font-size: 10pt;
    color: #1A1814;
    text-align: center;
  }
  .picture-cue.no-image {
    background: #F5EFDF;
    min-height: 32mm;
    justify-content: center;
  }
  .closing-row {
    margin-top: 6mm;
    padding-top: 3mm;
    border-top: 0.5pt solid #E8DFCB;
  }
  .closing-text {
    font-size: 10.5pt;
    color: #2E2A22;
    margin-bottom: 6mm;
  }
  .signature-block {
    margin-top: 4mm;
  }
  .signature-line {
    display: inline-block;
    min-width: 60mm;
    border-bottom: 0.5pt solid #B5A989;
    padding-bottom: 0.5mm;
    margin-right: 3mm;
  }
  .signature-label {
    font-size: 8.5pt;
    color: #5A5345;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  footer.brand {
    margin-top: 8mm;
    padding-top: 2.5mm;
    border-top: 0.5pt solid #E8DFCB;
    text-align: center;
    font-size: 8pt;
    color: #94a3b8;
    letter-spacing: 0.04em;
  }
`;

// ---- Render ----

function pictureGridCols(count: number): number {
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  if (count <= 8) return 4;
  return 4;
}

interface MetaLabels {
  childLabel: string;
  dateLabel: string;
}

const META_LABELS: Record<string, MetaLabels> = {
  en: { childLabel: 'Child', dateLabel: 'Date' },
  de: { childLabel: 'Kind', dateLabel: 'Datum' },
  es: { childLabel: 'Niño/a', dateLabel: 'Fecha' },
  nl: { childLabel: 'Kind', dateLabel: 'Datum' },
  fr: { childLabel: 'Enfant', dateLabel: 'Date' },
  it: { childLabel: 'Bambino/a', dateLabel: 'Data' },
  pt: { childLabel: 'Criança', dateLabel: 'Data' },
  sv: { childLabel: 'Barn', dateLabel: 'Datum' },
  da: { childLabel: 'Barn', dateLabel: 'Dato' },
  no: { childLabel: 'Barn', dateLabel: 'Dato' },
  fi: { childLabel: 'Lapsi', dateLabel: 'Päivämäärä' },
};

function getMetaLabels(homeLanguage: string): MetaLabels {
  return META_LABELS[homeLanguage] || META_LABELS.en;
}

export async function renderPrintHtml(pkg: ParentLetterPackage): Promise<string> {
  const vocab = loadVocab(REPO_ROOT);
  const homeLanguage = pkg.homeLanguage;
  const title = localizedField(pkg.title, homeLanguage);
  const prose = resolveParentLetterProse(pkg.tone, homeLanguage, {
    packageTitle: title || pkg.slug,
    durationMinutes: pkg.durationMinutes,
    pictureCueCount: pkg.pictureCueCount,
    language: pkg.language,
  });
  const meta = getMetaLabels(homeLanguage);

  const cues = buildPictureCues(pkg, vocab);
  const cols = pictureGridCols(cues.length);

  const cueHtml = cues
    .map((c) => {
      const imgPart = c.imageDataUri
        ? `<img src="${c.imageDataUri}" alt="${escapeHtml(c.label)}">`
        : '';
      const className = c.imageDataUri ? 'picture-cue' : 'picture-cue no-image';
      return `
        <div class="${className}">
          ${imgPart}
          <div class="label">${escapeHtml(c.label)}</div>
        </div>`;
    })
    .join('');

  const signatureHtml = pkg.signatureLine
    ? `
        <div class="signature-block">
          <span class="signature-line">&nbsp;</span>
          <span class="signature-label">${escapeHtml(prose.signature)}</span>
        </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="${homeLanguage}">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(prose.greeting)} · ${escapeHtml(title)}</title>
  ${FONT_LINK}
  <style>${CSS}</style>
</head>
<body>
  <div class="header-row">
    <div class="school-brand"></div>
    <div class="meta-fields">
      <span class="meta-line"><span class="meta-label">${escapeHtml(meta.childLabel)}:</span><span class="meta-blank">&nbsp;</span></span>
      <span class="meta-line"><span class="meta-label">${escapeHtml(meta.dateLabel)}:</span><span class="meta-blank">&nbsp;</span></span>
    </div>
  </div>
  <h1 class="greeting">${escapeHtml(prose.greeting)}</h1>
  <div class="prose-block">
    <p>${escapeHtml(prose.opening)}</p>
    <p>${escapeHtml(prose.body)}</p>
  </div>
  <div class="pictures-intro">${escapeHtml(prose.picturesIntro)}</div>
  <div class="picture-grid cols-${cols}">${cueHtml}</div>
  <div class="closing-row">
    <p class="closing-text">${escapeHtml(prose.closing)}</p>
    ${signatureHtml}
  </div>
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

export async function writePrintPdf(pkg: ParentLetterPackage, outPath: string): Promise<void> {
  const html = await renderPrintHtml(pkg);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath, pkg.paperSize);
}
