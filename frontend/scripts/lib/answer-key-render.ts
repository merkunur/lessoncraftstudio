/**
 * answer-key-render.ts — Pillar 5 Phase 2 Sub-Phase 2.1 renderer.
 *
 * Text-only teacher-reference PDF aggregating package metadata into structured
 * sections (header / pedagogical framing / exercises / materials / assessment
 * / standards). Sections gated by includeExerciseAnswers /
 * includeMaterialReference / includePedagogicalNotes flags.
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
  },
  de: {
    eyebrow: 'Lehrkraft-Referenz',
    duration: '{minutes} Min. Einheit',
    pedagogicalHeading: 'Pädagogische Einordnung',
    exercisesHeading: 'Komponierte Übungen',
    materialsHeading: 'Druckmaterialien',
    assessmentHeading: 'Lernkontroll-Kriterien',
    standardsHeading: 'Curriculum-Standards',
  },
  es: {
    eyebrow: 'Referencia del docente',
    duration: 'Sesión de {minutes} min',
    pedagogicalHeading: 'Marco pedagógico',
    exercisesHeading: 'Ejercicios compuestos',
    materialsHeading: 'Materiales imprimibles',
    assessmentHeading: 'Criterios de evaluación',
    standardsHeading: 'Estándares curriculares',
  },
  nl: {
    eyebrow: 'Leerkrachtreferentie',
    duration: 'Sessie van {minutes} min',
    pedagogicalHeading: 'Pedagogisch kader',
    exercisesHeading: 'Samengestelde oefeningen',
    materialsHeading: 'Afdrukbare materialen',
    assessmentHeading: 'Evaluatiecriteria',
    standardsHeading: 'Curriculumstandaarden',
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

function renderMaterial(m: PackageMaterial): string {
  const summary = summarizeMaterialParams(m.customizationParameters);
  return `
    <article class="entry">
      <header class="entry-header">
        <span class="entry-num">${m.ordering}.</span>
        <h3 class="entry-title">${escapeHtml(m.materialSlug)}</h3>
        <span class="entry-role">${escapeHtml(m.pedagogicalRole)}</span>
      </header>
      ${summary ? `<p class="entry-params">${escapeHtml(summary)}</p>` : ''}
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
`;

export async function renderPrintHtml(
  pkg: AnswerKeyPackage,
  locale: string
): Promise<string> {
  const labels = getSectionLabels(locale);
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
        ${sortedMaterials.map(renderMaterial).join('')}
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
