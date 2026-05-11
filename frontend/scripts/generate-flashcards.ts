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
import {
  loadAllPackages,
  loadPackagesBySlugs,
  resolveImagesForPackage,
  FlashcardPackage,
} from './lib/flashcard-package-loader';

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
  // Arc 2 Phase 2 additions per Q1-(b) consolidated-triple lock:
  allPackages: boolean;              // iterate all packages with flashcards material
  packages: string[];                // subset of package slugs
  resume: boolean;                   // skip when destination files already exist
  concurrency: number;               // parallel worker count (default 4)
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
    allPackages: false,
    packages: [],
    resume: false,
    concurrency: 4,
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
    else if (a === '--all-packages') args.allPackages = true;
    else if (a === '--package' || a === '--packages') args.packages.push(...argv[++i].split(',').map(s => s.trim()).filter(Boolean));
    else if (a === '--resume') args.resume = true;
    else if (a === '--concurrency') args.concurrency = parseInt(argv[++i], 10) || 4;
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
  --all-packages       Arc 2 Phase 2: iterate all packages with flashcards material
  --package <slug>     Arc 2 Phase 2: render single package
  --packages <list>    Arc 2 Phase 2: comma-separated package slugs
  --locale <loc>       Single platform locale (en|de|es|nl|fr|it|pt|sv|da|no|fi)
  --locales <list>     Comma-separated locales
  --out <dir>          Output directory (default: ${DEFAULT_OUTPUT})
  --layouts <6,9>      Print layouts to emit (default: 6,9)
  --resume             Skip (locale, package) tasks whose outputs already exist
  --concurrency <N>    Parallel worker count (default: 4)
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

// ----- Arc 2 Phase 2 per-package mass-run -----

interface PackageTask {
  pkg: FlashcardPackage;
  locale: Locale;
}

interface PackageResult {
  packageSlug: string;
  locale: Locale;
  cardCount: number;
  digitalOk: boolean;
  printOk: Record<number, boolean>;
  skipped: boolean;
  error?: string;
}

/**
 * Run async tasks with bounded concurrency.
 * Simple worker-pool: spawns N parallel chains processing tasks until exhausted.
 */
async function runWithConcurrency<T, R>(
  tasks: T[],
  concurrency: number,
  worker: (t: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let cursor = 0;
  async function chain(): Promise<void> {
    while (cursor < tasks.length) {
      const idx = cursor++;
      try {
        const r = await worker(tasks[idx]);
        results[idx] = r;
      } catch (e: any) {
        console.error(`worker chain error at task ${idx}:`, e.message);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => chain()));
  return results;
}

async function runPackageTask(
  task: PackageTask,
  args: CliArgs,
  vocab: ReturnType<typeof loadVocab>
): Promise<PackageResult> {
  const { pkg, locale } = task;
  const outDir = path.join(args.outDir, locale, pkg.slug);
  const deckPath = path.join(outDir, 'deck.html');
  const layoutPaths: Record<number, string> = {};
  for (const layout of args.layouts) {
    layoutPaths[layout] = path.join(outDir, `print-${layout}up.pdf`);
  }

  // --resume: skip if all expected outputs exist
  if (args.resume) {
    const wantDigital = !args.printOnly;
    const wantPrint = !args.digitalOnly;
    let allExist = true;
    if (wantDigital && !fs.existsSync(deckPath)) allExist = false;
    if (wantPrint) {
      for (const layout of args.layouts) {
        if (!fs.existsSync(layoutPaths[layout])) { allExist = false; break; }
      }
    }
    if (allExist) {
      return {
        packageSlug: pkg.slug,
        locale,
        cardCount: pkg.vocabKeys.length,
        digitalOk: true,
        printOk: Object.fromEntries(args.layouts.map(l => [l, true])),
        skipped: true,
      };
    }
  }

  fs.mkdirSync(outDir, { recursive: true });

  // Resolve images for the package's vocab keys
  const resolved = resolveImagesForPackage(pkg);

  // Build FlashcardCard list for this locale; skip cards lacking vocab entries
  const cards: FlashcardCard[] = [];
  for (const r of resolved) {
    const v = vocab[r.vocabKey];
    if (!v) continue; // silently skip; warning was issued at loader time if needed
    cards.push({
      vocabKey: r.vocabKey,
      imagePath: r.imagePath,
      themeDir: r.themeDir,
      vocab: v,
      locale,
    });
  }

  if (cards.length === 0) {
    return {
      packageSlug: pkg.slug,
      locale,
      cardCount: 0,
      digitalOk: false,
      printOk: {},
      skipped: false,
      error: 'no resolvable cards',
    };
  }

  const meta = {
    title: `Flashcards · ${pkg.slug} · ${locale.toUpperCase()}`,
    locale,
    packageSlug: pkg.slug,
  };

  let digitalOk = false;
  if (!args.printOnly) {
    try {
      await writeDigitalViewer(cards, meta, deckPath);
      digitalOk = true;
    } catch (e: any) {
      console.error(`FAIL digital ${locale}/${pkg.slug}: ${e.message}`);
    }
  }

  const printOk: Record<number, boolean> = {};
  if (!args.digitalOnly) {
    for (const perPage of args.layouts) {
      try {
        await writePrintPdf(cards, { perPage, locale }, layoutPaths[perPage]);
        printOk[perPage] = true;
      } catch (e: any) {
        console.error(`FAIL print-${perPage}up ${locale}/${pkg.slug}: ${e.message}`);
        printOk[perPage] = false;
      }
    }
  }

  return {
    packageSlug: pkg.slug,
    locale,
    cardCount: cards.length,
    digitalOk,
    printOk,
    skipped: false,
  };
}

async function generatePackagesBatch(args: CliArgs): Promise<PackageResult[]> {
  const vocab = loadVocab(REPO_ROOT);

  // Load packages
  let packages: Map<string, FlashcardPackage>;
  if (args.allPackages) {
    packages = loadAllPackages();
  } else {
    packages = loadPackagesBySlugs(args.packages);
  }

  if (packages.size === 0) {
    console.error('No packages loaded. Check --all-packages or --packages list.');
    return [];
  }

  console.log(`Packages: ${packages.size}`);
  console.log(`Locales:  ${args.locales.join(', ')}`);
  console.log(`Concurrency: ${args.concurrency}`);
  console.log(`Resume:   ${args.resume ? 'YES' : 'NO'}`);

  // Build task list: (package, locale) pairs
  const tasks: PackageTask[] = [];
  for (const pkg of packages.values()) {
    for (const locale of args.locales) {
      tasks.push({ pkg, locale });
    }
  }
  console.log(`Total tasks: ${tasks.length}`);
  console.log('');

  // Run with concurrency
  let completed = 0;
  const startTime = Date.now();
  const results = await runWithConcurrency(tasks, args.concurrency, async (task) => {
    const r = await runPackageTask(task, args, vocab);
    completed++;
    if (completed % 50 === 0 || completed === tasks.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  progress: ${completed}/${tasks.length} (${elapsed}s elapsed)`);
    }
    return r;
  });

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

${localesIncluded.map(l => `- **${l}** — ${l === 'fi' ? 'longest-word + agglutinative compound stress' : l === 'de' ? 'long-word + Germanic compound stress (e.g., Krankenwagen + Schauspieler)' : l === 'es' ? 'Romance text-length baseline' : l === 'it' ? 'Romance text-length baseline' : l === 'nl' ? 'Germanic short-word baseline' : l === 'en' ? 'canonical reference' : ''}`).join('\n')}

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

**Validation focus areas (post-iteration-2 two-element layout):**
- Card composition — image + word balance (sentence-frame DROPPED at Phase 4 iteration 2)
- Theme-color top accent rule visible at top of card
- Word-band legibility — expanded to 30% (was 18%); short words render larger; long-word locales soft-wrap via U+00AD soft-hyphen substrate
- Cross-locale typography — German/Finnish/Swedish words fit without distortion
- Touch responsiveness on mobile (test at 375px viewport)

### Print PDFs

\`print-6up.pdf\` — primary K-3 classroom-display layout. Print at 100% scale on A4. Cut along faint dashed corner guides.

\`print-9up.pdf\` — secondary take-home pack layout. Smaller cards; verify K-3 readability at intended use distance.

**Validation focus areas:**
- Card legibility at print scale (word-band 30% gives large word rendering at 6-up)
- Cut-line guides visible but unobtrusive
- Color reproduction (theme accent rule + image)
- Typography crispness (Fredoka renders correctly; sentence-band Lexend Deca usage no longer in scope)
- Cross-locale text-length: long words fit within reserved word-band

## Plan-agent independent review (Phase 3 + Phase 4)

Plan-agent reviewed at Phase 3 (implementation against Sky+v2 spec). Findings absorbed at iteration 1 (soft-hyphen substrate extension + Sharp palette mode change).

Phase 4 iteration 2 absorbs operator composition revision (sentence-frame drop). No additional Plan-agent review required for the simpler two-element layout — the dropped element was the source of multiple Plan-agent findings (italic concern, scaffolding rule).

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

  // Per-package mode default (Arc 2 Phase 2): if --all-packages or --packages,
  // default locales to all platform locales unless overridden.
  const packageMode = args.allPackages || args.packages.length > 0;
  if (packageMode && args.locales.length === 0) {
    args.locales = [...PLATFORM_LOCALES];
  }

  // Defaults if nothing specified
  if (!packageMode && args.images.length === 0) {
    console.error('No images specified. Use --image, --images, --validation-batch, --all-packages, or --packages.');
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
  console.log(`mode:    ${packageMode ? 'package' : args.validationBatch ? 'validation-batch' : 'custom'}`);
  if (!packageMode) console.log(`images:  ${args.images.length}`);
  console.log(`locales: ${args.locales.join(', ')}`);
  console.log(`out:     ${args.outDir}`);
  console.log('');

  fs.mkdirSync(args.outDir, { recursive: true });

  let results: RenderResult[] = [];
  let packageResults: PackageResult[] = [];
  let failed = 0;
  try {
    if (packageMode) {
      packageResults = await generatePackagesBatch(args);
    } else {
      results = await generateBatch(args);
      if (args.validationBatch) writeValidationReadme(args, results);
    }
  } catch (e: any) {
    console.error(`pipeline failure: ${e.message}`);
    failed = 1;
  } finally {
    await closeBrowser();
  }

  console.log('');
  console.log('=== summary ===');
  if (packageMode) {
    const skipped = packageResults.filter(r => r.skipped).length;
    const digitalOk = packageResults.filter(r => r.digitalOk).length;
    const print6Ok = packageResults.filter(r => r.printOk[6]).length;
    const print9Ok = packageResults.filter(r => r.printOk[9]).length;
    console.log(`  total tasks:    ${packageResults.length}`);
    console.log(`  skipped (resume):${skipped}`);
    console.log(`  digital ok:     ${digitalOk}`);
    console.log(`  print 6up ok:   ${print6Ok}`);
    console.log(`  print 9up ok:   ${print9Ok}`);
    console.log(`  output dir:     ${args.outDir}`);
  } else {
    console.log(`  total cards:    ${results.length}`);
    console.log(`  digital ok:     ${results.filter(r => r.digitalOk).length}`);
    console.log(`  print 6up ok:   ${results.filter(r => r.printOk[6]).length}`);
    console.log(`  print 9up ok:   ${results.filter(r => r.printOk[9]).length}`);
    console.log(`  output dir:     ${args.outDir}`);
  }

  process.exit(failed);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
