#!/usr/bin/env node
/**
 * seed-teaching-bundles.ts — Pillar 2 Arc 2 Phase 1 DB-seed companion.
 *
 * Reads bundle.yaml definitions from docs/lesson-plans/bundles/<slug>/
 * (operator-authored content via author-teaching-bundle.ts validation).
 * Upserts Bundle rows + (re)links BundleTeachingPackage join rows.
 * Optional dry-run flag; per-bundle status report.
 *
 * Bundle Prisma schema (already shipped at v3 SUBSCRIPTION-SCOPE.md merge):
 *   model Bundle {
 *     id           String    @id @default(cuid())
 *     slug         String
 *     themeAxisKey String    @map("theme_axis_key")
 *     language     String
 *     title        Json
 *     description  Json
 *     thumbnailUrl String    @map("thumbnail_url")
 *     status       String    @default("draft")
 *     ...
 *     @@unique([themeAxisKey, language])
 *     @@unique([language, slug])
 *   }
 *
 * Idempotency contract:
 *   - Bundle row upsert keyed on (themeAxisKey, language) compound unique.
 *   - BundleTeachingPackage rows fully replaced per Bundle (delete + insert)
 *     so package-membership additions/removals reflect bundle.yaml authoritative state.
 *
 * Cross-arc coordination:
 *   - TeachingPackage rows must exist (FK target). Script LOOKS UP each
 *     teachingPackageSlug; missing packages logged + skipped without
 *     failing the bundle insert. Bundle inserts even if some packages
 *     missing (graceful degradation; operator runs seed-teaching-packages
 *     when ready then re-runs bundle seed for full coverage).
 *
 * Usage:
 *   npx tsx frontend/scripts/seed-teaching-bundles.ts                 # dry-run
 *   npx tsx frontend/scripts/seed-teaching-bundles.ts --confirm      # real-mode
 *   npx tsx frontend/scripts/seed-teaching-bundles.ts --file path/to/bundle.yaml  # single
 *   npx tsx frontend/scripts/seed-teaching-bundles.ts --dir docs/lesson-plans/bundles  # all
 *
 * Exit 0 on success; 1 on validation/insert failure; 2 on usage/IO error.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import { PrismaClient } from '@prisma/client';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_BUNDLES_DIR = path.join(REPO_ROOT, 'docs/lesson-plans/bundles');
const PLATFORM_LOCALES = new Set(['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']);

interface BundleYAML {
  bundleSlug: string;
  themeAxisKey: string;
  language: string;
  title: Record<string, string>;
  description: Record<string, string>;
  thumbnailUrl: string;
  status: string;
  teachingPackageSlugs: string[];
  thematicCoherence: Record<string, string>;
  deckIds?: string[];
  lessonPlanIds?: string[];
}

interface SeedResult {
  bundleSlug: string;
  themeAxisKey: string;
  language: string;
  status: 'PASS' | 'FAIL' | 'DRY-RUN';
  packagesLinked: number;
  packagesSkipped: string[];
  error?: string;
}

function loadBundle(filePath: string): BundleYAML | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return YAML.parse(raw) as BundleYAML;
  } catch (e: any) {
    console.error(`  Failed to parse ${filePath}: ${e.message}`);
    return null;
  }
}

function discoverBundles(dir: string): string[] {
  const paths: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const yamlPath = path.join(dir, entry.name, 'bundle.yaml');
    if (fs.existsSync(yamlPath)) paths.push(yamlPath);
  }
  return paths;
}

async function seedOne(prisma: PrismaClient, bundle: BundleYAML, dryRun: boolean): Promise<SeedResult> {
  const result: SeedResult = {
    bundleSlug: bundle.bundleSlug,
    themeAxisKey: bundle.themeAxisKey,
    language: bundle.language,
    status: dryRun ? 'DRY-RUN' : 'PASS',
    packagesLinked: 0,
    packagesSkipped: [],
  };

  // Validate locale
  if (!PLATFORM_LOCALES.has(bundle.language)) {
    result.status = 'FAIL';
    result.error = `Invalid language "${bundle.language}"`;
    return result;
  }

  // Resolve teachingPackageSlugs to TeachingPackage IDs.
  // Missing packages logged + skipped (graceful degradation).
  const packageRecords = await prisma.teachingPackage.findMany({
    where: { targetSlug: { in: bundle.teachingPackageSlugs }, language: bundle.language },
    select: { id: true, targetSlug: true },
  });
  const slugToId = new Map<string, string>();
  for (const r of packageRecords) {
    slugToId.set(r.targetSlug, r.id);
  }
  for (const slug of bundle.teachingPackageSlugs) {
    if (!slugToId.has(slug)) {
      result.packagesSkipped.push(slug);
    }
  }
  const linkedCount = bundle.teachingPackageSlugs.length - result.packagesSkipped.length;
  result.packagesLinked = linkedCount;

  if (dryRun) {
    return result;
  }

  // Upsert Bundle row
  try {
    const bundleRecord = await prisma.bundle.upsert({
      where: { themeAxisKey_language: { themeAxisKey: bundle.themeAxisKey, language: bundle.language } },
      create: {
        slug: bundle.bundleSlug,
        themeAxisKey: bundle.themeAxisKey,
        language: bundle.language,
        title: bundle.title,
        description: bundle.description,
        thumbnailUrl: bundle.thumbnailUrl,
        status: bundle.status,
      },
      update: {
        slug: bundle.bundleSlug,
        title: bundle.title,
        description: bundle.description,
        thumbnailUrl: bundle.thumbnailUrl,
        status: bundle.status,
      },
    });

    // Replace BundleTeachingPackage rows fully (idempotent).
    await prisma.bundleTeachingPackage.deleteMany({ where: { bundleId: bundleRecord.id } });
    if (linkedCount > 0) {
      await prisma.bundleTeachingPackage.createMany({
        data: Array.from(slugToId.values()).map(packageId => ({
          bundleId: bundleRecord.id,
          teachingPackageId: packageId,
        })),
      });
    }
  } catch (e: any) {
    result.status = 'FAIL';
    result.error = e.message;
  }

  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--confirm');
  let dir = DEFAULT_BUNDLES_DIR;
  let singleFile: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file') {
      singleFile = path.resolve(args[++i]);
    } else if (args[i] === '--dir') {
      dir = path.resolve(args[++i]);
    }
  }

  console.log('=== seed-teaching-bundles.ts ===');
  console.log(`mode: ${dryRun ? 'DRY-RUN' : 'WRITE'}`);
  console.log(`dir:  ${singleFile ? '(single file)' : dir}`);
  console.log('');

  const bundlePaths = singleFile ? [singleFile] : discoverBundles(dir);
  if (bundlePaths.length === 0) {
    console.log('No bundle.yaml files found.');
    process.exit(2);
  }

  const prisma = new PrismaClient();
  const results: SeedResult[] = [];
  let failed = 0;

  for (const bundlePath of bundlePaths) {
    const bundle = loadBundle(bundlePath);
    if (!bundle) {
      failed++;
      continue;
    }
    const result = await seedOne(prisma, bundle, dryRun);
    results.push(result);

    const statusBadge = result.status === 'FAIL' ? 'FAIL' : (dryRun ? 'DRY' : 'OK');
    const skipNote = result.packagesSkipped.length > 0
      ? `  (${result.packagesSkipped.length} skipped: ${result.packagesSkipped.slice(0, 3).join(', ')}${result.packagesSkipped.length > 3 ? '...' : ''})`
      : '';
    console.log(`  ${statusBadge}  ${result.bundleSlug} (${result.themeAxisKey}/${result.language})  packages-linked=${result.packagesLinked}${skipNote}`);
    if (result.error) {
      console.log(`    error: ${result.error}`);
      failed++;
    }
  }

  console.log('');
  console.log('=== summary ===');
  console.log(`  total bundles: ${bundlePaths.length}`);
  console.log(`  succeeded:     ${results.length - failed}`);
  console.log(`  failed:        ${failed}`);

  await prisma.$disconnect();
  process.exit(failed > 0 ? 1 : 0);
}

main();
