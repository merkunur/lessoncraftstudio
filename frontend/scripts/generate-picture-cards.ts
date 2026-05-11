#!/usr/bin/env node
/**
 * generate-picture-cards.ts — Pillar 5 Phase 1 Sub-Phase 1.1 entry point.
 *
 * Generates image-only print PDFs per teaching package + locale. Variant of
 * the Pillar 4 Arc 2 flashcards pipeline; image grid with no word labels.
 *
 * Output per (package, locale):
 *   /var/www/lcs-media/materials/picture-cards/<locale>/<package>/print-{N}up.pdf
 *
 * USAGE
 *   # Single-package render
 *   npx tsx frontend/scripts/generate-picture-cards.ts \
 *     --package count-objects-1-to-10 --locale en
 *
 *   # Mass-run for C5 free-tier 3 packages × 11 locales
 *   npx tsx frontend/scripts/generate-picture-cards.ts \
 *     --packages count-objects-1-to-10,identify-letter-sounds-vowels,identify-living-vs-nonliving \
 *     --locales en,de,es,nl,fr,it,pt,sv,da,no,fi
 *
 * EXIT CODES
 *   0 — success
 *   1 — generation failure
 *   2 — usage / IO error
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  loadAllPictureCardsPackages,
  loadPictureCardsPackagesBySlugs,
  resolveImagesForPictureCards,
  PictureCardsPackage,
} from './lib/picture-cards-package-loader';
import {
  PictureCard,
  closeBrowser,
  writePrintPdf,
} from './lib/picture-cards-render';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'frontend', '.scratch', 'picture-cards');

const PLATFORM_LOCALES: string[] = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

interface CliArgs {
  locales: string[];
  outDir: string;
  allPackages: boolean;
  packages: string[];
  resume: boolean;
  concurrency: number;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    locales: [],
    outDir: DEFAULT_OUTPUT,
    allPackages: false,
    packages: [],
    resume: false,
    concurrency: 4,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--locale' || a === '--locales') {
      args.locales.push(...argv[++i].split(',').map((s) => s.trim()).filter(Boolean));
    } else if (a === '--out' || a === '--out-dir') {
      args.outDir = path.resolve(argv[++i]);
    } else if (a === '--all-packages') {
      args.allPackages = true;
    } else if (a === '--package' || a === '--packages') {
      args.packages.push(...argv[++i].split(',').map((s) => s.trim()).filter(Boolean));
    } else if (a === '--resume') {
      args.resume = true;
    } else if (a === '--concurrency') {
      args.concurrency = parseInt(argv[++i], 10) || 4;
    } else if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${a}`);
      process.exit(2);
    }
  }
  if (args.locales.length === 0) {
    args.locales = PLATFORM_LOCALES;
  }
  return args;
}

function printHelp() {
  console.log(`generate-picture-cards.ts — Pillar 5 Phase 1 Sub-Phase 1.1

Usage:
  npx tsx frontend/scripts/generate-picture-cards.ts --package <slug> --locale <loc>
  npx tsx frontend/scripts/generate-picture-cards.ts --all-packages --locales en,de,es

Flags:
  --package <slug>     Render single package
  --packages <list>    Comma-separated package slugs
  --all-packages       Iterate all packages with picture-cards material
  --locale <loc>       Single platform locale
  --locales <list>     Comma-separated locales (default: all 11)
  --out <dir>          Output directory (default: ${DEFAULT_OUTPUT})
  --resume             Skip tasks whose outputs already exist
  --concurrency <N>    Parallel worker count (default: 4)
  --help               Show this message
`);
}

interface PackageTask {
  pkg: PictureCardsPackage;
  locale: string;
}

interface PackageResult {
  packageSlug: string;
  locale: string;
  cardCount: number;
  printOk: boolean;
  skipped: boolean;
  error?: string;
}

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

async function runPackageTask(task: PackageTask, args: CliArgs): Promise<PackageResult> {
  const { pkg, locale } = task;
  const outDir = path.join(args.outDir, locale, pkg.slug);
  const printPath = path.join(outDir, `print-${pkg.cardsPerPage}up.pdf`);

  if (args.resume && fs.existsSync(printPath)) {
    return {
      packageSlug: pkg.slug,
      locale,
      cardCount: pkg.imageFilenames.length,
      printOk: true,
      skipped: true,
    };
  }

  fs.mkdirSync(outDir, { recursive: true });

  const resolved = resolveImagesForPictureCards(pkg);
  const cards: PictureCard[] = resolved.map((r) => ({
    filename: r.filename,
    imagePath: r.imagePath,
  }));

  if (cards.length === 0) {
    return {
      packageSlug: pkg.slug,
      locale,
      cardCount: 0,
      printOk: false,
      skipped: false,
      error: 'no resolvable images',
    };
  }

  try {
    await writePrintPdf(cards, { cardsPerPage: pkg.cardsPerPage, locale }, printPath);
    return {
      packageSlug: pkg.slug,
      locale,
      cardCount: cards.length,
      printOk: true,
      skipped: false,
    };
  } catch (e: any) {
    console.error(`FAIL print ${locale}/${pkg.slug}: ${e.message}`);
    return {
      packageSlug: pkg.slug,
      locale,
      cardCount: cards.length,
      printOk: false,
      skipped: false,
      error: e.message,
    };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(`generate-picture-cards.ts — Pillar 5 Phase 1 Sub-Phase 1.1`);
  console.log(`Locales:     ${args.locales.join(', ')}`);
  console.log(`Out dir:     ${args.outDir}`);
  console.log(`Concurrency: ${args.concurrency}`);
  console.log(`Resume:      ${args.resume ? 'YES' : 'NO'}`);
  console.log('');

  let packages: Map<string, PictureCardsPackage>;
  if (args.allPackages) {
    packages = loadAllPictureCardsPackages();
  } else if (args.packages.length > 0) {
    packages = loadPictureCardsPackagesBySlugs(args.packages);
  } else {
    console.error('Missing --package, --packages, or --all-packages');
    process.exit(2);
    return;
  }

  if (packages.size === 0) {
    console.error('No packages loaded.');
    process.exit(1);
    return;
  }

  console.log(`Packages: ${packages.size}`);

  const tasks: PackageTask[] = [];
  for (const pkg of packages.values()) {
    for (const locale of args.locales) {
      tasks.push({ pkg, locale });
    }
  }
  console.log(`Total tasks: ${tasks.length}`);
  console.log('');

  const startTime = Date.now();
  let completed = 0;
  const results = await runWithConcurrency(tasks, args.concurrency, async (task) => {
    const r = await runPackageTask(task, args);
    completed++;
    if (completed % 10 === 0 || completed === tasks.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  progress: ${completed}/${tasks.length} (${elapsed}s elapsed)`);
    }
    return r;
  });

  await closeBrowser();

  const ok = results.filter((r) => r.printOk).length;
  const failed = results.filter((r) => !r.printOk && !r.skipped).length;
  const skipped = results.filter((r) => r.skipped).length;

  console.log('');
  console.log(`=== Summary ===`);
  console.log(`  Total: ${results.length}`);
  console.log(`  OK:    ${ok}`);
  if (skipped > 0) console.log(`  Skip:  ${skipped} (already existed)`);
  if (failed > 0) {
    console.log(`  FAIL:  ${failed}`);
    results.filter((r) => !r.printOk && !r.skipped).forEach((r) => {
      console.log(`    - ${r.locale}/${r.packageSlug}: ${r.error}`);
    });
  }
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
