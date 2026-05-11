#!/usr/bin/env node
/**
 * generate-manipulative-cut-outs.ts — Pillar 5 Phase 1 Sub-Phase 1.3 entry point.
 *
 * Generates printable cut-out tile PDFs per teaching package + locale. Variant
 * of picture-cards generator; image-tile grid with variable layout per itemSize
 * + 2 modes (single-repeat / variety).
 *
 * Output per (package, locale): /var/www/lcs-media/materials/manipulative-cut-outs/
 *   <locale>/<package>/print-cut-outs.pdf
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  loadAllManipulativeCutOutsPackages,
  loadManipulativeCutOutsPackagesBySlugs,
  resolveImagesForCutOuts,
  ManipulativeCutOutsPackage,
} from './lib/manipulative-cut-outs-package-loader';
import { closeBrowser, writePrintPdf } from './lib/manipulative-cut-outs-render';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'frontend', '.scratch', 'manipulative-cut-outs');

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
  if (args.locales.length === 0) args.locales = PLATFORM_LOCALES;
  return args;
}

function printHelp() {
  console.log(`generate-manipulative-cut-outs.ts — Pillar 5 Phase 1 Sub-Phase 1.3

Usage:
  npx tsx frontend/scripts/generate-manipulative-cut-outs.ts --package <slug> --locale <loc>

Flags:
  --package <slug> / --packages <list> / --all-packages
  --locale <loc> / --locales <list> (default: all 11)
  --out <dir>
  --resume
  --concurrency <N> (default 4)
  --help
`);
}

interface PackageTask {
  pkg: ManipulativeCutOutsPackage;
  locale: string;
}

interface PackageResult {
  packageSlug: string;
  locale: string;
  itemCount: number;
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
  const printPath = path.join(outDir, 'print-cut-outs.pdf');

  if (args.resume && fs.existsSync(printPath)) {
    return {
      packageSlug: pkg.slug,
      locale,
      itemCount: pkg.itemCount,
      printOk: true,
      skipped: true,
    };
  }

  fs.mkdirSync(outDir, { recursive: true });
  const tiles = resolveImagesForCutOuts(pkg);
  if (tiles.length === 0) {
    return {
      packageSlug: pkg.slug,
      locale,
      itemCount: pkg.itemCount,
      printOk: false,
      skipped: false,
      error: 'no resolvable images',
    };
  }

  try {
    await writePrintPdf(
      tiles,
      {
        mode: pkg.mode,
        itemCount: pkg.itemCount,
        itemSize: pkg.itemSize,
        showCutGuides: pkg.showCutGuides,
        locale,
      },
      printPath
    );
    return {
      packageSlug: pkg.slug,
      locale,
      itemCount: pkg.itemCount,
      printOk: true,
      skipped: false,
    };
  } catch (e: any) {
    console.error(`FAIL print ${locale}/${pkg.slug}: ${e.message}`);
    return {
      packageSlug: pkg.slug,
      locale,
      itemCount: pkg.itemCount,
      printOk: false,
      skipped: false,
      error: e.message,
    };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(`generate-manipulative-cut-outs.ts — Pillar 5 Phase 1 Sub-Phase 1.3`);
  console.log(`Locales:     ${args.locales.join(', ')}`);
  console.log(`Out dir:     ${args.outDir}`);
  console.log(`Concurrency: ${args.concurrency}`);
  console.log(`Resume:      ${args.resume ? 'YES' : 'NO'}`);
  console.log('');

  let packages: Map<string, ManipulativeCutOutsPackage>;
  if (args.allPackages) {
    packages = loadAllManipulativeCutOutsPackages();
  } else if (args.packages.length > 0) {
    packages = loadManipulativeCutOutsPackagesBySlugs(args.packages);
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
  if (skipped > 0) console.log(`  Skip:  ${skipped}`);
  if (failed > 0) {
    console.log(`  FAIL:  ${failed}`);
    results
      .filter((r) => !r.printOk && !r.skipped)
      .forEach((r) => console.log(`    - ${r.locale}/${r.packageSlug}: ${r.error}`));
  }
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
