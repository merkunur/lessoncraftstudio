#!/usr/bin/env node
/**
 * Bundle authoring CLI — validation only (no DB write).
 *
 * Validates a bundle.yaml definition against:
 *   - frontend/config/topics-taxonomy.json (themeAxisKey must exist in axes.theme)
 *   - 11-locale set (language must be one of en/de/fr/es/pt/it/nl/sv/da/no/fi)
 *   - docs/lesson-plans/packages/<slug>/package.yaml (each teachingPackageSlug
 *     must reference an existing package)
 *   - title + description + thematicCoherence have entry for `language`
 *
 * Per Pillar 2 commission spec at docs/lesson-plans/bundles/pillar-2-commission-spec.md.
 * Validator-only at Phase 1; DB-seed companion follows in Pillar 2 Phase 2.
 *
 * Usage:
 *   npx tsx scripts/author-teaching-bundle.ts <path-to-bundle.yaml>
 *
 * Exit 0 on pass; 1 on validation failure; 2 on usage / IO error.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FRONTEND_ROOT = path.resolve(__dirname, '..');
const TOPICS_TAXONOMY_PATH = path.join(FRONTEND_ROOT, 'config/topics-taxonomy.json');
const PACKAGES_DIR = path.join(REPO_ROOT, 'docs/lesson-plans/packages');

const PLATFORM_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const REQUIRED_TOP_LEVEL = [
  'bundleSlug',
  'themeAxisKey',
  'language',
  'title',
  'description',
  'thumbnailUrl',
  'status',
  'teachingPackageSlugs',
  'thematicCoherence',
];
const VALID_STATUSES = ['draft', 'published', 'archived'];

interface ValidationError {
  field: string;
  message: string;
}

function loadJson(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function validate(bundlePath: string): { passed: boolean; errors: ValidationError[]; meta?: any } {
  const errors: ValidationError[] = [];

  if (!fs.existsSync(bundlePath)) {
    errors.push({ field: '<file>', message: `Bundle YAML not found: ${bundlePath}` });
    return { passed: false, errors };
  }

  let bundle: any;
  try {
    const raw = fs.readFileSync(bundlePath, 'utf-8');
    bundle = YAML.parse(raw);
  } catch (e: any) {
    errors.push({ field: '<file>', message: `YAML parse error: ${e.message}` });
    return { passed: false, errors };
  }

  // Required top-level fields
  for (const field of REQUIRED_TOP_LEVEL) {
    if (!(field in bundle)) {
      errors.push({ field, message: `Required field missing` });
    }
  }
  if (errors.length > 0) return { passed: false, errors };

  // language ∈ 11 platform locales
  if (!PLATFORM_LOCALES.includes(bundle.language)) {
    errors.push({ field: 'language', message: `"${bundle.language}" not a valid platform locale; valid: ${PLATFORM_LOCALES.join(', ')}` });
  }

  // status ∈ valid
  if (!VALID_STATUSES.includes(bundle.status)) {
    errors.push({ field: 'status', message: `"${bundle.status}" not a valid status; valid: ${VALID_STATUSES.join(', ')}` });
  }

  // themeAxisKey must exist in topics-taxonomy.json axes.theme.<key>
  const taxonomy = loadJson(TOPICS_TAXONOMY_PATH);
  const themeKeys = Object.keys((taxonomy.axes?.theme) || {});
  if (!themeKeys.includes(bundle.themeAxisKey)) {
    errors.push({
      field: 'themeAxisKey',
      message: `"${bundle.themeAxisKey}" not found in topics-taxonomy.json axes.theme. Sample valid: ${themeKeys.slice(0, 6).join(', ')}${themeKeys.length > 6 ? ` (+${themeKeys.length - 6} more)` : ''}`,
    });
  }

  // title.<language> + description.<language> + thematicCoherence.<language>
  for (const localeField of ['title', 'description', 'thematicCoherence']) {
    if (!bundle[localeField] || typeof bundle[localeField] !== 'object') {
      errors.push({ field: localeField, message: `Must be a per-locale object (e.g., {en: "..."})` });
      continue;
    }
    if (!bundle[localeField][bundle.language]) {
      errors.push({ field: `${localeField}.${bundle.language}`, message: `Missing entry for declared language "${bundle.language}"` });
    }
  }

  // teachingPackageSlugs[] non-empty array of strings; each slug must have docs/lesson-plans/packages/<slug>/package.yaml
  if (!Array.isArray(bundle.teachingPackageSlugs) || bundle.teachingPackageSlugs.length === 0) {
    errors.push({ field: 'teachingPackageSlugs', message: 'Must be a non-empty array of package-slug strings' });
  } else {
    for (const slug of bundle.teachingPackageSlugs) {
      if (typeof slug !== 'string') {
        errors.push({ field: 'teachingPackageSlugs', message: `Non-string entry: ${JSON.stringify(slug)}` });
        continue;
      }
      const pkgYaml = path.join(PACKAGES_DIR, slug, 'package.yaml');
      if (!fs.existsSync(pkgYaml)) {
        errors.push({ field: `teachingPackageSlugs`, message: `Slug "${slug}" — no package.yaml at ${pkgYaml}` });
      }
    }
  }

  // deckIds + lessonPlanIds optional; if present, must be arrays
  if ('deckIds' in bundle && !Array.isArray(bundle.deckIds)) {
    errors.push({ field: 'deckIds', message: 'If present, must be an array' });
  }
  if ('lessonPlanIds' in bundle && !Array.isArray(bundle.lessonPlanIds)) {
    errors.push({ field: 'lessonPlanIds', message: 'If present, must be an array' });
  }

  // bundleSlug + thumbnailUrl: simple type checks
  if (typeof bundle.bundleSlug !== 'string' || !/^[a-z0-9-]+$/.test(bundle.bundleSlug)) {
    errors.push({ field: 'bundleSlug', message: `Must be lowercase-kebab-case string` });
  }
  if (typeof bundle.thumbnailUrl !== 'string') {
    errors.push({ field: 'thumbnailUrl', message: `Must be a string (path to thumbnail image)` });
  }

  return {
    passed: errors.length === 0,
    errors,
    meta: errors.length === 0
      ? {
          bundleSlug: bundle.bundleSlug,
          themeAxisKey: bundle.themeAxisKey,
          language: bundle.language,
          status: bundle.status,
          packageCount: bundle.teachingPackageSlugs.length,
        }
      : undefined,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: npx tsx scripts/author-teaching-bundle.ts <path-to-bundle.yaml>');
    process.exit(2);
  }
  const bundlePath = path.resolve(args[0]);
  const filename = path.basename(bundlePath);

  const result = validate(bundlePath);
  if (result.passed) {
    console.log(`PASS: ${filename}`);
    if (result.meta) {
      console.log(`  bundleSlug:        ${result.meta.bundleSlug}`);
      console.log(`  themeAxisKey:      ${result.meta.themeAxisKey}`);
      console.log(`  language:          ${result.meta.language}`);
      console.log(`  status:            ${result.meta.status}`);
      console.log(`  packageCount:      ${result.meta.packageCount}`);
    }
    process.exit(0);
  } else {
    console.log(`FAIL: ${filename} (${result.errors.length} error${result.errors.length === 1 ? '' : 's'})`);
    for (const err of result.errors) {
      console.log(`  • ${err.field}: ${err.message}`);
    }
    process.exit(1);
  }
}

main();
