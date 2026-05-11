/**
 * answer-key-render.ts — Pillar 5 Phase 2 Sub-Phase 2.1 renderer.
 *
 * Text-only teacher-reference PDF aggregating package metadata into structured
 * sections (header / pedagogical framing / exercises / materials / assessment
 * / standards). Sections gated by includeExerciseAnswers /
 * includeMaterialReference / includePedagogicalNotes flags.
 *
 * Sub-Phase 2.1.1 fix: per-material concrete-content resolver surfaces
 * actual vocabulary (themeName → vocab key list → localized singular forms)
 * and numeral references (numeralRange → localized number-words). Catalog
 * spec at materials-catalog.json:174 names includeMaterialReference as
 * "load-bearing value for non-native-speaker teachers — confirms vocabulary
 * forms in the target language." Pre-fix renderer surfaced metadata only.
 *
 * Multi-page A4 layout. No images. Playwright PDF rendering reused.
 */

import * as fs from 'fs';
import * as path from 'path';
import { chromium, type Browser } from 'playwright';
import type {
  AnswerKeyPackage,
  ComposedExercise,
  PackageMaterial,
} from './answer-key-package-loader';
import { localizedField } from './answer-key-package-loader';
import { loadVocab, displayWord, type VocabEntry, type Locale } from './flashcard-data';

// ---- Vocab/numeral resolution substrate (Sub-Phase 2.1.1 fix) ----

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');
const NUMBER_WORDS_PATH = path.join(REPO_ROOT, 'REFERENCE TRANSLATIONS', 'number-words.js');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NumberWords: {
  get: (numeral: number | string, locale: string, gender?: string) => string | null;
  hasGenderToggle: (numeral: number | string, locale: string) => boolean;
} = require(NUMBER_WORDS_PATH);

/**
 * Duplicate of pickThemeImages from flashcard-package-loader.ts.
 * Per CLAUDE.md §3.1 duplicate-before-premature-abstraction; 3rd consumer
 * (flashcards + picture-cards already duplicate). 4th-consumer DRY refactor
 * deferred to future-arc when ε parent-letter or δ sentence-strips ship per
 * §14.3a.3.
 */
function themeNameCandidates(themeName: string): string[] {
  const spaced = themeName.replace(/[_-]/g, ' ');
  return [
    themeName,
    spaced,
    spaced.replace(/\b\w/g, (c) => c.toUpperCase()),
    themeName.toLowerCase(),
  ];
}

function pickThemeImages(themeName: string, cardCount: number | null): string[] {
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
      // Image library not accessible (running outside repo tree); fall through.
    }
  }
  if (!actualDir) {
    console.warn(`WARN theme dir not found for themeName='${themeName}'; skipping content resolution`);
    return [];
  }
  const themePath = path.join(IMAGE_LIBRARY_ROOT, actualDir);
  const files = fs
    .readdirSync(themePath)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .sort();
  const slice = cardCount === null ? files : files.slice(0, cardCount);
  return slice.map((f) => f.replace(/\.png$/i, ''));
}

function normalizeKey(filename: string): string {
  const noExt = filename.replace(/\.\w+$/, '');
  const slugified = noExt.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase();
  return slugified.replace(/-\d+$/, '').replace(/-+$/, '');
}

function parseNumeralRange(range: string): number[] {
  const m = range.match(/^(\d+)-(\d+)$/);
  if (!m) return [];
  const start = parseInt(m[1], 10);
  const end = parseInt(m[2], 10);
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return [];
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

interface ResolvedContent {
  /** Heading label key (vocabulary / numerals). */
  kind: 'vocab' | 'numerals';
  /** Display rows. For vocab: [vocabKey, target-locale singular, en singular]. For numerals: [numeral, target-locale word]. */
  rows: Array<[string, string, string?]>;
}

const VOCAB_BEARING_SLUGS = new Set([
  'flashcards',
  'picture-cards',
  'sentence-strips',
  'bingo',
  'manipulative-cut-outs',
  'parent-take-home-letter',
]);

function resolveMaterialContent(
  m: PackageMaterial,
  vocab: Record<string, VocabEntry>,
  locale: string
): ResolvedContent | null {
  const params = m.customizationParameters || {};

  if (m.materialSlug === 'numeral-cards') {
    const range = typeof params.numeralRange === 'string' ? (params.numeralRange as string) : '1-10';
    const numerals = parseNumeralRange(range);
    if (numerals.length === 0) return null;
    const rows: Array<[string, string, string?]> = [];
    for (const n of numerals) {
      const word = NumberWords.get(n, locale) || NumberWords.get(n, 'en') || String(n);
      rows.push([String(n), word]);
    }
    return { kind: 'numerals', rows };
  }

  if (!VOCAB_BEARING_SLUGS.has(m.materialSlug)) return null;

  let vocabKeys: string[] = [];
  const imageSource = typeof params.imageSource === 'string' ? (params.imageSource as string) : null;
  const themeName = typeof params.themeName === 'string' ? (params.themeName as string) : null;
  const explicitKeys = Array.isArray(params.vocabKeys) ? (params.vocabKeys as string[]) : null;

  if (imageSource === 'vocabKeyList' && explicitKeys && explicitKeys.length > 0) {
    vocabKeys = explicitKeys;
  } else if (themeName) {
    const cardCount = typeof params.cardCount === 'number' ? (params.cardCount as number) : null;
    const filenames = pickThemeImages(themeName, cardCount);
    vocabKeys = filenames.map(normalizeKey);
  }

  if (vocabKeys.length === 0) return null;

  // Dedupe preserving order.
  const seen = new Set<string>();
  vocabKeys = vocabKeys.filter((k) => (seen.has(k) ? false : (seen.add(k), true)));

  const rows: Array<[string, string, string?]> = [];
  for (const key of vocabKeys) {
    const entry = vocab[key];
    if (entry) {
      const localized = displayWord(key, entry, locale as Locale);
      const english = displayWord(key, entry, 'en');
      rows.push([key, localized, english]);
    } else {
      // No vocab entry — surface the key only.
      rows.push([key, key.replace(/-/g, ' ')]);
    }
  }
  return { kind: 'vocab', rows };
}

const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Lexend+Deca:wght@400;500;600&display=swap" rel="stylesheet">`;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatParameters(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  return Object.entries(params)
    .filter(([key]) => key !== 'languageSelect' && key !== 'exerciseMode')
    .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
    .join(' · ');
}

function summarizeMaterialParams(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  const highlights: string[] = [];
  if (typeof params.cardCount === 'number') highlights.push(`${params.cardCount} cards`);
  if (typeof params.itemCount === 'number') highlights.push(`${params.itemCount} items`);
  if (typeof params.stripCount === 'number') highlights.push(`${params.stripCount} strips`);
  if (typeof params.pairCount === 'number') highlights.push(`${params.pairCount} pairs`);
  if (typeof params.themeName === 'string') highlights.push(`theme: ${params.themeName}`);
  if (typeof params.numeralRange === 'string') highlights.push(`range: ${params.numeralRange}`);
  if (typeof params.framePreset === 'string') highlights.push(`frame: ${params.framePreset}`);
  if (typeof params.mode === 'string') highlights.push(`mode: ${params.mode}`);
  if (typeof params.itemSize === 'string') highlights.push(`size: ${params.itemSize}`);
  return highlights.join(' · ');
}

interface SectionLabels {
  eyebrow: string;
  duration: string;
  pedagogicalHeading: string;
  exercisesHeading: string;
  materialsHeading: string;
  assessmentHeading: string;
  standardsHeading: string;
  vocabularyReferenceHeading: string;
  numeralReferenceHeading: string;
  englishGlossLabel: string;
}

const SECTION_LABELS: Record<string, SectionLabels> = {
  en: {
    eyebrow: 'Teacher Reference',
    duration: '{minutes} min session',
    pedagogicalHeading: 'Pedagogical framing',
    exercisesHeading: 'Composed exercises',
    materialsHeading: 'Printable materials',
    assessmentHeading: 'Assessment criteria',
    standardsHeading: 'Curriculum standards',
    vocabularyReferenceHeading: 'Vocabulary reference',
    numeralReferenceHeading: 'Numeral reference',
    englishGlossLabel: 'en',
  },
  de: {
    eyebrow: 'Lehrkraft-Referenz',
    duration: '{minutes} Min. Einheit',
    pedagogicalHeading: 'Pädagogische Einordnung',
    exercisesHeading: 'Komponierte Übungen',
    materialsHeading: 'Druckmaterialien',
    assessmentHeading: 'Lernkontroll-Kriterien',
    standardsHeading: 'Curriculum-Standards',
    vocabularyReferenceHeading: 'Vokabel-Referenz',
    numeralReferenceHeading: 'Zahlen-Referenz',
    englishGlossLabel: 'en',
  },
  es: {
    eyebrow: 'Referencia del docente',
    duration: 'Sesión de {minutes} min',
    pedagogicalHeading: 'Marco pedagógico',
    exercisesHeading: 'Ejercicios compuestos',
    materialsHeading: 'Materiales imprimibles',
    assessmentHeading: 'Criterios de evaluación',
    standardsHeading: 'Estándares curriculares',
    vocabularyReferenceHeading: 'Referencia de vocabulario',
    numeralReferenceHeading: 'Referencia de numerales',
    englishGlossLabel: 'en',
  },
  nl: {
    eyebrow: 'Leerkrachtreferentie',
    duration: 'Sessie van {minutes} min',
    pedagogicalHeading: 'Pedagogisch kader',
    exercisesHeading: 'Samengestelde oefeningen',
    materialsHeading: 'Afdrukbare materialen',
    assessmentHeading: 'Evaluatiecriteria',
    standardsHeading: 'Curriculumstandaarden',
    vocabularyReferenceHeading: 'Vocabulair-referentie',
    numeralReferenceHeading: 'Cijfer-referentie',
    englishGlossLabel: 'en',
  },
};

function getSectionLabels(locale: string): SectionLabels {
  return SECTION_LABELS[locale] || SECTION_LABELS.en;
}

function renderExercise(ex: ComposedExercise): string {
  const params = formatParameters(ex.customizationParameters);
  return `
    <article class="entry">
      <header class="entry-header">
        <span class="entry-num">${ex.ordering}.</span>
        <h3 class="entry-title">${escapeHtml(ex.appName)}${
    ex.exerciseMode ? ` <span class="entry-mode">[${escapeHtml(ex.exerciseMode)}]</span>` : ''
  }</h3>
        <span class="entry-role">${escapeHtml(ex.pedagogicalRole)}</span>
      </header>
      ${params ? `<p class="entry-params">${escapeHtml(params)}</p>` : ''}
    </article>`;
}

function renderContentRows(content: ResolvedContent, labels: SectionLabels, locale: string): string {
  const heading =
    content.kind === 'vocab' ? labels.vocabularyReferenceHeading : labels.numeralReferenceHeading;
  const rowHtml = content.rows
    .map(([key, primary, english]) => {
      const hasGloss = english && english !== primary && locale !== 'en';
      const glossHtml = hasGloss
        ? `<span class="content-gloss">${escapeHtml(english!)}</span>`
        : '';
      return `
        <li class="content-row">
          <span class="content-key">${escapeHtml(key)}</span>
          <span class="content-primary">${escapeHtml(primary)}</span>
          ${glossHtml}
        </li>`;
    })
    .join('');
  return `
    <div class="content-block">
      <h4 class="content-heading">${escapeHtml(heading)}</h4>
      <ol class="content-list">${rowHtml}</ol>
    </div>`;
}

function renderMaterial(
  m: PackageMaterial,
  vocab: Record<string, VocabEntry>,
  locale: string,
  labels: SectionLabels
): string {
  const summary = summarizeMaterialParams(m.customizationParameters);
  const content = resolveMaterialContent(m, vocab, locale);
  const contentHtml = content && content.rows.length > 0 ? renderContentRows(content, labels, locale) : '';
  return `
    <article class="entry">
      <header class="entry-header">
        <span class="entry-num">${m.ordering}.</span>
        <h3 class="entry-title">${escapeHtml(m.materialSlug)}</h3>
        <span class="entry-role">${escapeHtml(m.pedagogicalRole)}</span>
      </header>
      ${summary ? `<p class="entry-params">${escapeHtml(summary)}</p>` : ''}
      ${contentHtml}
    </article>`;
}

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Lexend Deca', system-ui, sans-serif; color: #2E2A22; }
  @page { size: A4; margin: 18mm 16mm; }
  .eyebrow { font-size: 9pt; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 4mm; }
  h1.title {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 22pt;
    line-height: 1.2;
    margin: 0 0 4mm 0;
    color: #1A1814;
  }
  .duration {
    font-size: 10pt;
    color: #5A5345;
    margin-bottom: 8mm;
  }
  h2.section-heading {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 14pt;
    line-height: 1.3;
    margin: 8mm 0 3mm 0;
    color: #1A1814;
    border-bottom: 0.5pt solid #E8DFCB;
    padding-bottom: 1.5mm;
  }
  .prose {
    font-size: 10pt;
    line-height: 1.5;
    white-space: pre-line;
    color: #3A352B;
    margin-bottom: 4mm;
  }
  .entry {
    margin-bottom: 3mm;
    padding: 2mm 3mm;
    background: #FCFAF4;
    border-left: 2pt solid #A8B79B;
  }
  .entry-header {
    display: flex; align-items: baseline; gap: 2mm; flex-wrap: wrap;
    margin-bottom: 1mm;
  }
  .entry-num { font-family: 'Lexend Deca', monospace; color: #7A9A75; font-weight: 600; font-size: 10pt; }
  .entry-title { font-family: 'Lexend Deca', sans-serif; font-weight: 600; font-size: 10pt; margin: 0; color: #1A1814; }
  .entry-mode { font-size: 8.5pt; color: #5A5345; font-weight: 400; font-family: monospace; }
  .entry-role { font-size: 8pt; color: #A8472F; background: #FCEFEA; padding: 0.5mm 2mm; border-radius: 2mm; font-weight: 500; margin-left: auto; }
  .entry-params { font-size: 8.5pt; color: #5A5345; font-family: monospace; margin: 0; }
  .standards {
    display: flex; flex-wrap: wrap; gap: 2mm;
  }
  .standard {
    font-family: monospace;
    font-size: 8.5pt;
    background: #F5EFDF;
    color: #3A352B;
    padding: 1mm 2.5mm;
    border-radius: 2mm;
  }
  footer.brand {
    margin-top: 12mm;
    padding-top: 3mm;
    border-top: 0.5pt solid #E8DFCB;
    text-align: center;
    font-size: 8pt;
    color: #94a3b8;
    letter-spacing: 0.04em;
  }
  .content-block {
    margin-top: 2mm;
    padding-top: 2mm;
    border-top: 0.3pt solid #E8DFCB;
  }
  .content-heading {
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 600;
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #5F7D5C;
    margin: 0 0 1.5mm 0;
  }
  .content-list {
    list-style: none;
    margin: 0;
    padding: 0;
    columns: 2;
    column-gap: 6mm;
    font-size: 9pt;
  }
  .content-row {
    display: flex;
    gap: 1.5mm;
    align-items: baseline;
    padding: 0.4mm 0;
    break-inside: avoid;
    color: #2E2A22;
  }
  .content-key {
    font-family: monospace;
    font-size: 8pt;
    color: #94a3b8;
    min-width: 5em;
  }
  .content-primary {
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 500;
    color: #1A1814;
  }
  .content-gloss {
    font-size: 8pt;
    color: #5A5345;
    font-style: italic;
  }
`;

export async function renderPrintHtml(
  pkg: AnswerKeyPackage,
  locale: string
): Promise<string> {
  const labels = getSectionLabels(locale);
  const vocab = loadVocab(REPO_ROOT);
  const title = localizedField(pkg.title, locale);
  const compositionalRationale = localizedField(pkg.compositionalRationale, locale);
  const assessmentCriteria = localizedField(pkg.assessmentCriteria, locale);
  const sortedExercises = [...pkg.composedExercises].sort((a, b) => a.ordering - b.ordering);
  const sortedMaterials = [...pkg.materials].sort((a, b) => a.ordering - b.ordering);

  const sections: string[] = [];

  if (pkg.includePedagogicalNotes && compositionalRationale) {
    sections.push(`
      <section>
        <h2 class="section-heading">${escapeHtml(labels.pedagogicalHeading)}</h2>
        <div class="prose">${escapeHtml(compositionalRationale)}</div>
      </section>`);
  }

  if (pkg.includeExerciseAnswers && sortedExercises.length > 0) {
    sections.push(`
      <section>
        <h2 class="section-heading">${escapeHtml(labels.exercisesHeading)}</h2>
        ${sortedExercises.map(renderExercise).join('')}
      </section>`);
  }

  if (pkg.includeMaterialReference && sortedMaterials.length > 0) {
    sections.push(`
      <section>
        <h2 class="section-heading">${escapeHtml(labels.materialsHeading)}</h2>
        ${sortedMaterials.map((m) => renderMaterial(m, vocab, locale, labels)).join('')}
      </section>`);
  }

  if (pkg.includePedagogicalNotes && assessmentCriteria) {
    sections.push(`
      <section>
        <h2 class="section-heading">${escapeHtml(labels.assessmentHeading)}</h2>
        <div class="prose">${escapeHtml(assessmentCriteria)}</div>
      </section>`);
  }

  if (pkg.curriculumStandards.length > 0) {
    const standards = pkg.curriculumStandards
      .map((s) => `<span class="standard">${escapeHtml(s)}</span>`)
      .join('');
    sections.push(`
      <section>
        <h2 class="section-heading">${escapeHtml(labels.standardsHeading)}</h2>
        <div class="standards">${standards}</div>
      </section>`);
  }

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <title>Teacher reference · ${escapeHtml(title)}</title>
  ${FONT_LINK}
  <style>${CSS}</style>
</head>
<body>
  <p class="eyebrow">${escapeHtml(labels.eyebrow)}</p>
  <h1 class="title">${escapeHtml(title)}</h1>
  <p class="duration">${escapeHtml(labels.duration.replace('{minutes}', String(pkg.durationMinutes)))}</p>
  ${sections.join('')}
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
  pkg: AnswerKeyPackage,
  locale: string,
  outPath: string
): Promise<void> {
  const html = await renderPrintHtml(pkg, locale);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await renderPdf(html, outPath);
}
