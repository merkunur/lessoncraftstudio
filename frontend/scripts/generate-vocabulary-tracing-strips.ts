#!/usr/bin/env node
/**
 * generate-vocabulary-tracing-strips.ts — Pillar 5 F11 commission entry point.
 *
 * Generates vocabulary-tracing-strips PDFs per teaching package + locale.
 * Image + traceable vocabulary word (Fredoka light-gray fill / outline) +
 * independent writing line. K-Grade-1 motor practice + vocabulary acquisition.
 *
 * Output per (package, locale):
 *   /var/www/lcs-media/materials/vocabulary-tracing-strips/<locale>/<package>/print-vocabulary-tracing-strips.pdf
 *
 * USAGE
 *   npx tsx frontend/scripts/generate-vocabulary-tracing-strips.ts \
 *     --package identify-letter-sounds-vowels --locale en
 *
 *   npx tsx frontend/scripts/generate-vocabulary-tracing-strips.ts \
 *     --package identify-letter-sounds-vowels --locales en,de,es,nl
 *
 * EXIT CODES
 *   0 — success
 *   1 — generation failure
 *   2 — usage / IO error
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  loadAllVocabularyTracingStripsPackages,
  loadVocabularyTracingStripsPackagesBySlugs,
  resolveImagesForVocabularyTracingStrips,
  VocabularyTracingStripsPackage,
} from './lib/vocabulary-tracing-strips-package-loader';
import { closeBrowser, writePrintPdf } from './lib/vocabulary-tracing-strips-render';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'frontend', '.scratch', 'vocabulary-tracing-strips');

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
  console.log(`generate-vocabulary-tracing-strips.ts — Pillar 5 F11 commission

Usage:
  npx tsx frontend/scripts/generate-vocabulary-tracing-strips.ts --package <slug> --locale <loc>
  npx tsx frontend/scripts/generate-vocabulary-tracing-strips.ts --all-packages --locales en,de,es,nl

Flags:
  --package <slug>     Render single package
  --packages <list>    Comma-separated package slugs
  --all-packages       Iterate all packages with vocabulary-tracing-strips material
  --locale <loc>       Single platform locale
  --locales <list>     Comma-separated locales (default: all 11)
  --out <dir>          Output directory (default: ${DEFAULT_OUTPUT})
  --resume             Skip tasks whose outputs already exist
  --concurrency <N>    Parallel worker count (default: 4)
  --help               Show this message
`);
}

interface PackageTask {
  pkg: VocabularyTracingStripsPackage;
  locale: string;
}

interface PackageResult {
  packageSlug: string;
  locale: string;
  stripCount: number;
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
  const printPath = path.join(outDir, 'print-vocabulary-tracing-strips.pdf');

  if (args.resume && fs.existsSync(printPath)) {
    return {
      packageSlug: pkg.slug,
      locale,
      stripCount: pkg.imageFilenames.length,
      printOk: true,
      skipped: true,
    };
  }

  fs.mkdirSync(outDir, { recursive: true });

  const resolved = resolveImagesForVocabularyTracingStrips(pkg);
  const items = resolved.map((r) => ({ filename: r.filename, imagePath: r.imagePath }));

  if (items.length === 0) {
    return {
      packageSlug: pkg.slug,
      locale,
      stripCount: 0,
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
        stripCount: pkg.stripCount,
        stripsPerPage: pkg.stripsPerPage,
        labelCase: pkg.labelCase,
        traceStyle: pkg.traceStyle,
        includeIndependentLine: pkg.includeIndependentLine,
        packageSlug: pkg.slug,
        packageTitle: pkg.title[locale] || pkg.title.en || pkg.slug,
      },
      printPath
    );
    return {
      packageSlug: pkg.slug,
      locale,
      stripCount: items.length,
      printOk: true,
      skipped: false,
    };
  } catch (e: any) {
    console.error(`FAIL print ${locale}/${pkg.slug}: ${e.message}`);
    return {
      packageSlug: pkg.slug,
      locale,
      stripCount: items.length,
      printOk: false,
      skipped: false,
      error: e.message,
    };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(`generate-vocabulary-tracing-strips.ts — Pillar 5 F11 commission`);
  console.log(`Locales:     ${args.locales.join(', ')}`);
  console.log(`Out dir:     ${args.outDir}`);
  console.log(`Concurrency: ${args.concurrency}`);
  console.log(`Resume:      ${args.resume ? 'YES' : 'NO'}`);
  console.log('');

  let packages: Map<string, VocabularyTracingStripsPackage>;
  if (args.allPackages) {
    packages = loadAllVocabularyTracingStripsPackages();
  } else if (args.packages.length > 0) {
    packages = loadVocabularyTracingStripsPackagesBySlugs(args.packages);
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
