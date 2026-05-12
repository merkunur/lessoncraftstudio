#!/usr/bin/env node
/**
 * generate-matching-mat.ts — Pillar 5 Phase 1 F10 commission entry point.
 *
 * Generates matching-mat PDFs per teaching package + locale. Single-page A4
 * mat with N images on left + N corresponding words on right (shuffled). Kid
 * draws lines or places counters to match pairs.
 *
 * Output per (package, locale):
 *   /var/www/lcs-media/materials/matching-mat/<locale>/<package>/print-matching-mat.pdf
 *
 * USAGE
 *   # Single-package render
 *   npx tsx frontend/scripts/generate-matching-mat.ts \
 *     --package identify-letter-sounds-vowels --locale en
 *
 *   # Mass-run for F10 pilot packages × Tier 1+2 locales
 *   npx tsx frontend/scripts/generate-matching-mat.ts \
 *     --packages identify-letter-sounds-vowels,identify-living-vs-nonliving \
 *     --locales en,de,es,nl
 *
 * EXIT CODES
 *   0 — success
 *   1 — generation failure
 *   2 — usage / IO error
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  loadAllMatchingMatPackages,
  loadMatchingMatPackagesBySlugs,
  resolveImagesForMatchingMat,
  MatchingMatPackage,
} from './lib/matching-mat-package-loader';
import { closeBrowser, writePrintPdf } from './lib/matching-mat-render';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'frontend', '.scratch', 'matching-mat');

const PLATFORM_LOCALES: string[] = [
  'en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi',
];

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
  console.log(`generate-matching-mat.ts — Pillar 5 Phase 1 F10 commission

Usage:
  npx tsx frontend/scripts/generate-matching-mat.ts --package <slug> --locale <loc>
  npx tsx frontend/scripts/generate-matching-mat.ts --all-packages --locales en,de,es,nl

Flags:
  --package <slug>     Render single package
  --packages <list>    Comma-separated package slugs
  --all-packages       Iterate all packages with matching-mat material
  --locale <loc>       Single platform locale
  --locales <list>     Comma-separated locales (default: all 11)
  --out <dir>          Output directory (default: ${DEFAULT_OUTPUT})
  --resume             Skip tasks whose outputs already exist
  --concurrency <N>    Parallel worker count (default: 4)
  --help               Show this message
`);
}

interface PackageTask {
  pkg: MatchingMatPackage;
  locale: string;
}

interface PackageResult {
  packageSlug: string;
  locale: string;
  pairCount: number;
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
  const printPath = path.join(outDir, 'print-matching-mat.pdf');

  if (args.resume && fs.existsSync(printPath)) {
    return {
      packageSlug: pkg.slug,
      locale,
      pairCount: pkg.imageFilenames.length,
      printOk: true,
      skipped: true,
    };
  }

  fs.mkdirSync(outDir, { recursive: true });

  const resolved = resolveImagesForMatchingMat(pkg);
  const items = resolved.map((r) => ({ filename: r.filename, imagePath: r.imagePath }));

  if (items.length === 0) {
    return {
      packageSlug: pkg.slug,
      locale,
      pairCount: 0,
      printOk: false,
      skipped: false,
      error: 'no resolvable images',
    };
  }

  try {
    await writePrintPdf(
      {
        items,
        locale: locale as any,
        pairCount: pkg.pairCount,
        rightColumnContent: pkg.rightColumnContent,
        labelCase: pkg.labelCase,
        packageSlug: pkg.slug,
        packageTitle: pkg.title[locale] || pkg.title.en || pkg.slug,
      },
      printPath
    );
    return {
      packageSlug: pkg.slug,
      locale,
      pairCount: items.length,
      printOk: true,
      skipped: false,
    };
  } catch (e: any) {
    console.error(`FAIL print ${locale}/${pkg.slug}: ${e.message}`);
    return {
      packageSlug: pkg.slug,
      locale,
      pairCount: items.length,
      printOk: false,
      skipped: false,
      error: e.message,
    };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(`generate-matching-mat.ts — Pillar 5 Phase 1 F10 commission`);
  console.log(`Locales:     ${args.locales.join(', ')}`);
  console.log(`Out dir:     ${args.outDir}`);
  console.log(`Concurrency: ${args.concurrency}`);
  console.log(`Resume:      ${args.resume ? 'YES' : 'NO'}`);
  console.log('');

  let packages: Map<string, MatchingMatPackage>;
  if (args.allPackages) {
    packages = loadAllMatchingMatPackages();
  } else if (args.packages.length > 0) {
    packages = loadMatchingMatPackagesBySlugs(args.packages);
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
