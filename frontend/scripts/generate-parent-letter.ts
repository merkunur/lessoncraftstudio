#!/usr/bin/env node
/**
 * generate-parent-letter.ts — Pillar 5 Phase 2 Sub-Phase 2.2 entry point.
 *
 * Generates parent-take-home-letter PDFs per teaching package + locale. Each
 * iteration treats the requested locale as the homeLanguage (the parent's
 * reading language) override, regardless of the package's configured default.
 * Picture-cue labels stay in the package's `language` (target instruction
 * language).
 *
 * Output per (package, locale):
 *   /var/www/lcs-media/materials/parent-letter/<locale>/<package>/print-parent-letter.pdf
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  loadAllParentLetterPackages,
  loadParentLetterPackagesBySlugs,
  ParentLetterPackage,
} from './lib/parent-letter-package-loader';
import { closeBrowser, writePrintPdf } from './lib/parent-letter-render';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_OUTPUT = path.join(REPO_ROOT, 'frontend', '.scratch', 'parent-letter');

const PLATFORM_LOCALES: string[] = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

interface CliArgs {
  locales: string[];
  outDir: string;
  allPackages: boolean;
  packages: string[];
  resume: boolean;
  concurrency: number;
}

function parseArgs(): CliArgs {
  const args: CliArgs = {
    locales: [...PLATFORM_LOCALES],
    outDir: DEFAULT_OUTPUT,
    allPackages: false,
    packages: [],
    resume: false,
    concurrency: 4,
  };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--all-packages') args.allPackages = true;
    else if (a === '--package' && argv[i + 1]) {
      args.packages.push(argv[++i]);
    } else if (a === '--packages' && argv[i + 1]) {
      args.packages.push(...argv[++i].split(','));
    } else if (a === '--locale' && argv[i + 1]) {
      args.locales = [argv[++i]];
    } else if (a === '--locales' && argv[i + 1]) {
      args.locales = argv[++i].split(',');
    } else if (a === '--out' && argv[i + 1]) {
      args.outDir = argv[++i];
    } else if (a === '--resume') {
      args.resume = true;
    } else if (a === '--concurrency' && argv[i + 1]) {
      args.concurrency = parseInt(argv[++i], 10);
    } else if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    }
  }
  if (!args.allPackages && args.packages.length === 0) {
    console.error('ERR specify --all-packages or --package <slug> or --packages <list>');
    process.exit(1);
  }
  return args;
}

function printHelp(): void {
  console.log(`Usage: generate-parent-letter.ts [options]

Options:
  --all-packages              Generate for every package with parent-take-home-letter material
  --package <slug>            Generate for a single package
  --packages <list>           Comma-separated list of packages
  --locale <loc>              Single locale (e.g., en)
  --locales <list>            Comma-separated list of locales (default: all 11)
  --out <dir>                 Output directory (default: frontend/.scratch/parent-letter)
  --resume                    Skip existing PDFs
  --concurrency <n>           Parallel workers (default: 4)
  --help, -h                  Show this help`);
}

function outPathFor(pkg: ParentLetterPackage, locale: string, baseDir: string): string {
  return path.join(baseDir, locale, pkg.slug, 'print-parent-letter.pdf');
}

async function runJob(pkg: ParentLetterPackage, locale: string, outPath: string): Promise<void> {
  // Override homeLanguage to the iteration locale; keep all other package config.
  const localized: ParentLetterPackage = { ...pkg, homeLanguage: locale };
  await writePrintPdf(localized, outPath);
}

async function processQueue(
  jobs: Array<{ pkg: ParentLetterPackage; locale: string; outPath: string }>,
  concurrency: number
): Promise<{ done: number; failed: number }> {
  let idx = 0;
  let done = 0;
  let failed = 0;
  const total = jobs.length;
  async function worker(): Promise<void> {
    while (true) {
      const i = idx++;
      if (i >= total) return;
      const job = jobs[i];
      try {
        await runJob(job.pkg, job.locale, job.outPath);
        done++;
        if (done % 5 === 0 || done === total) {
          console.log(`  [${done}/${total}] ${job.locale}/${job.pkg.slug}`);
        }
      } catch (e: any) {
        failed++;
        console.error(`  FAIL ${job.locale}/${job.pkg.slug}: ${e.message}`);
      }
    }
  }
  const workers: Promise<void>[] = [];
  for (let w = 0; w < Math.max(1, concurrency); w++) workers.push(worker());
  await Promise.all(workers);
  return { done, failed };
}

async function main(): Promise<void> {
  const args = parseArgs();
  const packages = args.allPackages
    ? loadAllParentLetterPackages()
    : loadParentLetterPackagesBySlugs(args.packages);
  if (packages.size === 0) {
    console.error('ERR no packages with parent-take-home-letter material resolved');
    process.exit(1);
  }
  console.log(`Loaded ${packages.size} package(s) with parent-take-home-letter material`);

  const jobs: Array<{ pkg: ParentLetterPackage; locale: string; outPath: string }> = [];
  for (const pkg of packages.values()) {
    for (const locale of args.locales) {
      const outPath = outPathFor(pkg, locale, args.outDir);
      if (args.resume && fs.existsSync(outPath)) continue;
      jobs.push({ pkg, locale, outPath });
    }
  }
  if (jobs.length === 0) {
    console.log('Nothing to do.');
    process.exit(0);
  }
  console.log(`Generating ${jobs.length} PDF(s) with concurrency ${args.concurrency}...`);
  const start = Date.now();
  const result = await processQueue(jobs, args.concurrency);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  await closeBrowser();
  console.log(`Done. ${result.done} succeeded, ${result.failed} failed in ${elapsed}s.`);
  if (result.failed > 0) process.exit(2);
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
