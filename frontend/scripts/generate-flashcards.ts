#!/usr/bin/env node
/**
 * generate-flashcards.ts — Pillar 4 Arc 1 Phase 2 pipeline entry point.
 *
 * Generates Sky+v2 flashcards (per docs/lesson-plans/flashcard-design-exploration.md)
 * from the image library + IMAGE_VOCABULARY substrate.
 *
 * Output formats per (image, locale):
 *   - deck.html         — digital viewer (single-card-focus modal + deck overview)
 *   - print-6up.pdf     — A4 6-per-page (primary print layout)
 *   - print-9up.pdf     — A4 9-per-page (secondary; take-home packs)
 *
 * Color-mode images only (Pillar 4 scope-correction at Phase 1 ratification).
 *
 * USAGE
 *   # Validation batch (Phase 3)
 *   npx tsx frontend/scripts/generate-flashcards.ts --validation-batch
 *
 *   # Single-image preview
 *   npx tsx frontend/scripts/generate-flashcards.ts --image animals/cat --locale en
 *
 *   # Custom selection (multiple images, multiple locales)
 *   npx tsx frontend/scripts/generate-flashcards.ts \
 *     --images "animals/cat,fruits/apple,vehicles/airplane" \
 *     --locales "en,de,fi" \
 *     --out docs/lesson-plans/flashcard-validation-batch
 *
 * EXIT CODES
 *   0 — success
 *   1 — validation batch generation failure
 *   2 — usage / IO error
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  PLATFORM_LOCALES,
  Locale,
  loadVocab,
  resolveVocabKey,
} from './lib/flashcard-data';
import {
  FlashcardCard,
  closeBrowser,
  writeDigitalViewer,
  writePrintPdf,
} from './lib/flashcard-render';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'flashcard-validation-batch');

// ----- Args -----

interface CliArgs {
  validationBatch: boolean;
  images: string[];                 // each "themeDir/filename"; filename without .png
  locales: Locale[];
  outDir: string;
  layouts: (6 | 9)[];               // print layouts to emit
  digitalOnly: boolean;
  printOnly: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    validationBatch: false,
    images: [],
    locales: [],
    outDir: DEFAULT_OUTPUT,
    layouts: [6, 9],
    digitalOnly: false,
    printOnly: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--validation-batch') args.validationBatch = true;
    else if (a === '--image' || a === '--images') args.images.push(...argv[++i].split(',').map(s => s.trim()).filter(Boolean));
    else if (a === '--locale' || a === '--locales') args.locales.push(...argv[++i].split(',').map(s => s.trim()) as Locale[]);
    else if (a === '--out' || a === '--out-dir') args.outDir = path.resolve(argv[++i]);
    else if (a === '--layouts') args.layouts = argv[++i].split(',').map(s => parseInt(s.trim(), 10) as 6 | 9);
    else if (a === '--digital-only') args.digitalOnly = true;
    else if (a === '--print-only') args.printOnly = true;
    else if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

function printHelp() {
  console.log(`generate-flashcards.ts — Pillar 4 Arc 1 Phase 2 pipeline

Usage:
  npx tsx frontend/scripts/generate-flashcards.ts --validation-batch
  npx tsx frontend/scripts/generate-flashcards.ts --image <theme>/<file> --locale <loc>
  npx tsx frontend/scripts/generate-flashcards.ts --images <list> --locales <list> --out <dir>

Flags:
  --validation-batch   Run Phase 3 validation batch (CC-curated selection)
  --image <ref>        Single image reference: "themeDir/filename" (no .png)
  --images <list>      Comma-separated image references
  --locale <loc>       Single platform locale (en|de|es|nl|fr|it|pt|sv|da|no|fi)
  --locales <list>     Comma-separated locales
  --out <dir>          Output directory (default: ${DEFAULT_OUTPUT})
  --layouts <6,9>      Print layouts to emit (default: 6,9)
  --digital-only       Skip print PDFs
  --print-only         Skip digital viewer HTML
  --help               Show this message
`);
}

// ----- Validation batch curation -----
// Per Phase 3 spec: ~50-60 flashcards × 5-6 locales × 7-10 themes.
// Selection criteria: maximize text-length variance + cross-locale grammatical-
// gender variance + cognate-richness diversity.

const VALIDATION_BATCH_IMAGES = [
  'animals/cat',                       // baseline; cognate-rich; short word
  'animals/elephant',                  // longer compound across locales
  'fruits/apple',                      // universal cognate
  'fruits/strawberry',                 // longer; gendered (es/it/fr)
  'vehicles/airplane',                 // de Flugzeug stress-test
  'vehicles/ambulance',                // soft-hyphen stress in fi/sv
  'body parts/ankle',                  // de Knöchel umlaut
  'occupations/actor',                 // gender-marked across Romance
  'shapes/hexagon',                    // technical vocab; fi kuusikulmio long
  'colors/red',                        // very short; cross-locale color names
  'emotions/angry',                    // adjective; productively-difficult
  'clothing/shirt',                    // common vocab; gendered
];

// CC-locked locale picks per ratification §7 constraint (must include en + de OR fi + 1+ Romance):
//   en (canonical reference), de (long-word stress + Germanic gendered),
//   fi (longest-word stress + agglutinative + simplified frame), es (Romance gendered),
//   it (Romance gendered + elision), nl (Germanic uniform article)
const VALIDATION_BATCH_LOCALES: Locale[] = ['en', 'de', 'fi', 'es', 'it', 'nl'];

// ----- Image resolution -----

interface ResolvedImage {
  vocabKey: string;
  imagePath: string;
  themeDir: string;
  imageRef: string;          // "themeDir/filename" original ref
}

function resolveImage(ref: string): ResolvedImage | null {
  // Accept "themeDir/filename" or "themeDir/filename.png"
  const cleanRef = ref.replace(/\.png$/i, '');
  const lastSlash = cleanRef.lastIndexOf('/');
  if (lastSlash < 0) return null;
  const themeDir = cleanRef.slice(0, lastSlash);
  const filename = cleanRef.slice(lastSlash + 1);
  const imagePath = path.join(IMAGE_LIBRARY_ROOT, themeDir, `${filename}.png`);
  if (!fs.existsSync(imagePath)) return null;
  const vocabKey = resolveVocabKey(filename, themeDir);
  return { vocabKey, imagePath, themeDir, imageRef: cleanRef };
}

// ----- Pipeline -----

interface RenderResult {
  imageRef: string;
  locale: Locale;
  vocabKey: string;
  digitalOk: boolean;
  printOk: { 6: boolean; 9: boolean };
  error?: string;
}

async function generateBatch(args: CliArgs): Promise<RenderResult[]> {
  const vocab = loadVocab(REPO_ROOT);
  const results: RenderResult[] = [];

  // Resolve images
  const resolved: ResolvedImage[] = [];
  const unresolved: string[] = [];
  for (const ref of args.images) {
    const r = resolveImage(ref);
    if (r) resolved.push(r);
    else unresolved.push(ref);
  }
  if (unresolved.length > 0) {
    console.warn(`WARN ${unresolved.length} image refs unresolved: ${unresolved.slice(0, 5).join(', ')}${unresolved.length > 5 ? '...' : ''}`);
  }

  // For validation batch: group cards into ONE deck per locale (visualization
  // cleanest), so output is ~1 deck.html per locale + ~1 print-Nup.pdf per locale.
  // For single-image preview: still group as 1-card decks per locale.
  const cardsByLocale = new Map<Locale, FlashcardCard[]>();
  for (const r of resolved) {
    const v = vocab[r.vocabKey];
    if (!v) {
      console.warn(`WARN no vocab for "${r.vocabKey}" (image ${r.imageRef}); skipping`);
      continue;
    }
    for (const locale of args.locales) {
      const card: FlashcardCard = {
        vocabKey: r.vocabKey,
        imagePath: r.imagePath,
        themeDir: r.themeDir,
        vocab: v,
        locale,
      };
      const arr = cardsByLocale.get(locale) ?? [];
      arr.push(card);
      cardsByLocale.set(locale, arr);
    }
  }

  // Render per locale
  for (const [locale, cards] of cardsByLocale) {
    if (cards.length === 0) continue;
    const localeDir = path.join(args.outDir, locale);
    fs.mkdirSync(localeDir, { recursive: true });

    const meta = {
      title: `Flashcards · ${locale.toUpperCase()}`,
      locale,
    };

    // Digital viewer
    let digitalOk = false;
    if (!args.printOnly) {
      try {
        await writeDigitalViewer(cards, meta, path.join(localeDir, 'deck.html'));
        digitalOk = true;
      } catch (e: any) {
        console.error(`FAIL digital viewer ${locale}: ${e.message}`);
      }
    }

    // Print PDFs (skip in --digital-only)
    const printOk: { 6: boolean; 9: boolean } = { 6: false, 9: false };
    if (!args.digitalOnly) {
      for (const perPage of args.layouts) {
        try {
          const pdfPath = path.join(localeDir, `print-${perPage}up.pdf`);
          await writePrintPdf(cards, { perPage, locale }, pdfPath);
          printOk[perPage] = true;
        } catch (e: any) {
          console.error(`FAIL print-${perPage}up ${locale}: ${e.message}`);
        }
      }
    }

    // One result per (image, locale) — but here we report per-locale (whole deck)
    for (const c of cards) {
      results.push({
        imageRef: `${c.themeDir}/${path.basename(c.imagePath, '.png')}`,
        locale,
        vocabKey: c.vocabKey,
        digitalOk,
        printOk,
      });
    }

    console.log(`  OK  ${locale}: deck.html=${digitalOk ? 'Y' : 'N'} 6up=${printOk[6] ? 'Y' : 'N'} 9up=${printOk[9] ? 'Y' : 'N'} (${cards.length} cards)`);
  }

  return results;
}

// ----- Validation batch README -----

function writeValidationReadme(args: CliArgs, results: RenderResult[]): void {
  const successCount = results.filter(r => r.digitalOk).length;
  const totalCards = results.length;
  const localesIncluded = Array.from(new Set(results.map(r => r.locale))).sort();
  const imagesIncluded = Array.from(new Set(results.map(r => r.imageRef))).sort();

  const readme = `# Flashcard validation batch — Pillar 4 Arc 1 Phase 3

**Generated:** ${new Date().toISOString().slice(0, 10)}
**Pipeline:** \`frontend/scripts/generate-flashcards.ts\`
**Design canonical:** Sky+v2 (per docs/lesson-plans/flashcard-design-exploration.md)
**Total cards rendered:** ${totalCards} (${successCount} digital + print PDFs successful)

## Locales sampled (${localesIncluded.length})

${localesIncluded.map(l => `- **${l}** — ${l === 'fi' ? 'longest-word + agglutinative + simplified frame' : l === 'de' ? 'long-word stress + gendered articles' : l === 'es' ? 'Romance gendered (un/una)' : l === 'it' ? 'Romance gendered + vowel elision' : l === 'nl' ? 'Germanic uniform article (een)' : l === 'en' ? 'canonical reference' : ''}`).join('\n')}

## Images sampled (${imagesIncluded.length})

${imagesIncluded.map(r => `- \`${r}\``).join('\n')}

## Directory structure

\`\`\`
flashcard-validation-batch/
${localesIncluded.map(l => `  ${l}/\n    deck.html      — digital viewer (open in browser)\n    print-6up.pdf  — A4 6-per-page print layout\n    print-9up.pdf  — A4 9-per-page print layout`).join('\n')}
\`\`\`

## How to validate

### Digital viewer (\`deck.html\`)

Open in browser. Defaults to deck-overview (horizontal-scroll strip). Click any card → single-card-focus modal (per Sky+v2 ratified architecture).

**Modal navigation:**
- Click cards or arrows (← →) for prev/next
- Keyboard: arrow keys + space (next) + ESC (close)
- Mobile: swipe left/right; tap close

**Validation focus areas:**
- Card composition — image + word + sentence layout balance
- Theme-color top accent rule visible at top of card
- Sentence frame: non-italic + curly-quoted + 6% indent + left-rule (NOT italic per Plan-agent review)
- Cross-locale typography — German/Finnish/Swedish words fit without distortion
- Touch responsiveness on mobile (test at 375px viewport)

### Print PDFs

\`print-6up.pdf\` — primary K-3 classroom-display layout. Print at 100% scale on A4. Cut along faint dashed corner guides.

\`print-9up.pdf\` — secondary take-home pack layout. Smaller cards; verify K-3 readability at intended use distance.

**Validation focus areas:**
- Card legibility at print scale
- Cut-line guides visible but unobtrusive
- Color reproduction (theme accent rule + image)
- Typography crispness (Fredoka + Lexend Deca render correctly)
- Cross-locale text-length: long words fit within reserved word-band

## Plan-agent independent review (post-Phase-3)

Submit batch to Plan-agent (or design-specialist agent if available) for independent review per Pillar 4 spec §Phase 4.

CC adjudicates pass/iterate based on combined operator + agent findings.

## Iteration cycles

Maximum 2 iteration cycles before architectural-finding surface per Pillar 4 spec §Phase 4.
`;

  fs.writeFileSync(path.join(args.outDir, 'README.md'), readme, 'utf-8');
}

// ----- Main -----

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  // Resolve --validation-batch
  if (args.validationBatch) {
    if (args.images.length === 0) args.images = [...VALIDATION_BATCH_IMAGES];
    if (args.locales.length === 0) args.locales = [...VALIDATION_BATCH_LOCALES];
  }

  // Defaults if nothing specified
  if (args.images.length === 0) {
    console.error('No images specified. Use --image, --images, or --validation-batch.');
    process.exit(2);
  }
  if (args.locales.length === 0) args.locales = ['en'];

  // Validate locales
  const allowed = new Set(PLATFORM_LOCALES as readonly string[]);
  for (const l of args.locales) {
    if (!allowed.has(l)) {
      console.error(`Invalid locale: ${l}`);
      process.exit(2);
    }
  }

  console.log('=== generate-flashcards.ts ===');
  console.log(`mode:    ${args.validationBatch ? 'validation-batch' : 'custom'}`);
  console.log(`images:  ${args.images.length}`);
  console.log(`locales: ${args.locales.join(', ')}`);
  console.log(`out:     ${args.outDir}`);
  console.log('');

  fs.mkdirSync(args.outDir, { recursive: true });

  let results: RenderResult[] = [];
  let failed = 0;
  try {
    results = await generateBatch(args);
    if (args.validationBatch) writeValidationReadme(args, results);
  } catch (e: any) {
    console.error(`pipeline failure: ${e.message}`);
    failed = 1;
  } finally {
    await closeBrowser();
  }

  console.log('');
  console.log('=== summary ===');
  console.log(`  total cards:    ${results.length}`);
  console.log(`  digital ok:     ${results.filter(r => r.digitalOk).length}`);
  console.log(`  print 6up ok:   ${results.filter(r => r.printOk[6]).length}`);
  console.log(`  print 9up ok:   ${results.filter(r => r.printOk[9]).length}`);
  console.log(`  output dir:     ${args.outDir}`);

  process.exit(failed);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
