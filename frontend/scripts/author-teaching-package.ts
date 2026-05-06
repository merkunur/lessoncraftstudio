#!/usr/bin/env node
/**
 * Teaching package authoring CLI — validation only (no DB write).
 *
 * Validates a package.yaml definition against:
 *   - frontend/config/learning-targets.json (targetSlug must exist)
 *   - frontend/lib/exercise-palette.json (composedExercises must validate)
 *   - frontend/config/materials-catalog.json (materials must validate)
 *   - 11-locale set (language must be one of en/de/fr/es/pt/it/nl/sv/da/no/fi)
 *
 * Per docs/lesson-plans/existing-plan-substrate.md §7-8 Option B (TeachingPackage
 * sibling table). Phase 5 / Arc 2 will ship the DB-seed companion.
 *
 * Usage:
 *   npx tsx scripts/author-teaching-package.ts <path-to-package.yaml>
 *
 * Exit 0 on pass; 1 on validation failure; 2 on usage / IO error.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';

const FRONTEND_ROOT = path.resolve(__dirname, '..');
const LEARNING_TARGETS_PATH = path.join(FRONTEND_ROOT, 'config/learning-targets.json');
const EXERCISE_PALETTE_PATH = path.join(FRONTEND_ROOT, 'lib/exercise-palette.json');
const MATERIALS_CATALOG_PATH = path.join(FRONTEND_ROOT, 'config/materials-catalog.json');

const PLATFORM_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const PEDAGOGICAL_ROLES_EXERCISE = ['introduction', 'practice', 'consolidation', 'assessment'];
const PEDAGOGICAL_ROLES_MATERIAL = [
  'vocabulary-anchor',
  'vocabulary-game',
  'language-frame',
  'teacher-reference',
  'home-school-bridge',
  'production-prompt',
  'concrete-manipulative',
  'math-and-categorization-support',
];
const REQUIRED_TOP_LEVEL = [
  'targetSlug',
  'language',
  'title',
  'description',
  'durationMinutes',
  'structure',
  'composedExercises',
  'materials',
  'assessmentCriteria',
  'generatedBy',
];
const REQUIRED_STRUCTURE_SECTIONS = ['warmup', 'contentActivity', 'scaffold', 'closure'];

interface ValidationError {
  field: string;
  message: string;
}

function loadJson(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function collectTargetSlugs(taxonomy: any): Set<string> {
  const slugs = new Set<string>();
  for (const domain of taxonomy.domains ?? []) {
    for (const strand of domain.strands ?? []) {
      for (const target of strand.targets ?? []) {
        if (target?.slug) slugs.add(target.slug);
      }
    }
  }
  return slugs;
}

function validate(pkg: any): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const f of REQUIRED_TOP_LEVEL) {
    if (pkg[f] === undefined || pkg[f] === null) {
      errors.push({ field: f, message: 'required field is missing or null' });
    }
  }
  if (errors.length > 0) return errors;

  if (!PLATFORM_LOCALES.includes(pkg.language)) {
    errors.push({
      field: 'language',
      message: `must be one of ${PLATFORM_LOCALES.join(', ')}; got "${pkg.language}"`,
    });
  }

  const taxonomy = loadJson(LEARNING_TARGETS_PATH);
  const allTargetSlugs = collectTargetSlugs(taxonomy);
  if (!allTargetSlugs.has(pkg.targetSlug)) {
    errors.push({
      field: 'targetSlug',
      message: `"${pkg.targetSlug}" not found in frontend/config/learning-targets.json (no such pedagogical learning target)`,
    });
  }

  if (typeof pkg.durationMinutes !== 'number' || pkg.durationMinutes <= 0) {
    errors.push({ field: 'durationMinutes', message: 'must be a positive number' });
  }

  if (typeof pkg.structure === 'object' && pkg.structure !== null) {
    for (const sec of REQUIRED_STRUCTURE_SECTIONS) {
      const node = pkg.structure[sec];
      if (!node) {
        errors.push({ field: `structure.${sec}`, message: 'required section is missing' });
        continue;
      }
      if (typeof node.durationMinutes !== 'number' || node.durationMinutes < 0) {
        errors.push({
          field: `structure.${sec}.durationMinutes`,
          message: 'must be a non-negative number',
        });
      }
      if (typeof node.body !== 'string' || node.body.trim().length === 0) {
        errors.push({
          field: `structure.${sec}.body`,
          message: 'must be a non-empty string',
        });
      }
    }
  }

  const palette = loadJson(EXERCISE_PALETTE_PATH);
  const appsByName = new Map<string, any>();
  for (const a of palette.apps ?? []) appsByName.set(a.name, a);
  const universalKeys = new Set<string>();
  for (const p of palette.common_universal_parameters?.parameters ?? []) {
    universalKeys.add(p.key);
  }

  if (Array.isArray(pkg.composedExercises)) {
    pkg.composedExercises.forEach((ex: any, i: number) => {
      const at = `composedExercises[${i}]`;
      if (!ex || typeof ex !== 'object') {
        errors.push({ field: at, message: 'must be an object' });
        return;
      }
      const app = appsByName.get(ex.appName);
      if (!app) {
        errors.push({
          field: `${at}.appName`,
          message: `"${ex.appName}" not found in exercise palette (must be one of the 29 §14.10 apps)`,
        });
        return;
      }
      if (ex.exerciseMode !== null && ex.exerciseMode !== undefined) {
        if (!Array.isArray(app.exercise_modes) || !app.exercise_modes.includes(ex.exerciseMode)) {
          errors.push({
            field: `${at}.exerciseMode`,
            message: `"${ex.exerciseMode}" not a valid mode for app "${ex.appName}"; valid: ${(app.exercise_modes ?? []).join(', ')}`,
          });
        }
      }
      const validKeys = new Set<string>(universalKeys);
      for (const p of app.customization_parameters ?? []) validKeys.add(p.key);
      if (ex.customizationParameters && typeof ex.customizationParameters === 'object') {
        for (const k of Object.keys(ex.customizationParameters)) {
          if (!validKeys.has(k)) {
            errors.push({
              field: `${at}.customizationParameters.${k}`,
              message: `"${k}" not a valid customization parameter for app "${ex.appName}"`,
            });
          }
        }
      }
      if (ex.pedagogicalRole && !PEDAGOGICAL_ROLES_EXERCISE.includes(ex.pedagogicalRole)) {
        errors.push({
          field: `${at}.pedagogicalRole`,
          message: `"${ex.pedagogicalRole}" not a valid exercise pedagogical role; valid: ${PEDAGOGICAL_ROLES_EXERCISE.join(', ')}`,
        });
      }
      if (typeof ex.ordering !== 'number') {
        errors.push({ field: `${at}.ordering`, message: 'must be a number' });
      }
    });
  }

  const materialsCatalog = loadJson(MATERIALS_CATALOG_PATH);
  const materialsBySlug = new Map<string, any>();
  for (const m of materialsCatalog.materials ?? []) materialsBySlug.set(m.slug, m);

  if (Array.isArray(pkg.materials)) {
    pkg.materials.forEach((mat: any, i: number) => {
      const at = `materials[${i}]`;
      if (!mat || typeof mat !== 'object') {
        errors.push({ field: at, message: 'must be an object' });
        return;
      }
      const mDef = materialsBySlug.get(mat.materialSlug);
      if (!mDef) {
        errors.push({
          field: `${at}.materialSlug`,
          message: `"${mat.materialSlug}" not found in materials catalog; valid: ${[...materialsBySlug.keys()].join(', ')}`,
        });
        return;
      }
      const validKeys = new Set<string>();
      for (const p of mDef.customization_parameters ?? []) validKeys.add(p.key);
      if (mat.customizationParameters && typeof mat.customizationParameters === 'object') {
        for (const k of Object.keys(mat.customizationParameters)) {
          if (!validKeys.has(k)) {
            errors.push({
              field: `${at}.customizationParameters.${k}`,
              message: `"${k}" not a valid parameter for material "${mat.materialSlug}"`,
            });
          }
        }
      }
      if (mat.pedagogicalRole && !PEDAGOGICAL_ROLES_MATERIAL.includes(mat.pedagogicalRole)) {
        errors.push({
          field: `${at}.pedagogicalRole`,
          message: `"${mat.pedagogicalRole}" not a valid material pedagogical role; valid: ${PEDAGOGICAL_ROLES_MATERIAL.join(', ')}`,
        });
      }
      if (typeof mat.ordering !== 'number') {
        errors.push({ field: `${at}.ordering`, message: 'must be a number' });
      }
    });
  }

  if (pkg.title && typeof pkg.title === 'object' && !pkg.title[pkg.language]) {
    errors.push({
      field: `title.${pkg.language}`,
      message: `must include text for the package's language "${pkg.language}"`,
    });
  }
  if (
    pkg.assessmentCriteria &&
    typeof pkg.assessmentCriteria === 'object' &&
    !pkg.assessmentCriteria[pkg.language]
  ) {
    errors.push({
      field: `assessmentCriteria.${pkg.language}`,
      message: `must include text for the package's language "${pkg.language}"`,
    });
  }

  return errors;
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: author-teaching-package <path-to-package.yaml>');
    process.exit(2);
  }
  const yamlPath = path.resolve(args[0]);
  if (!fs.existsSync(yamlPath)) {
    console.error(`File not found: ${yamlPath}`);
    process.exit(2);
  }

  let pkg: any;
  try {
    const yamlText = fs.readFileSync(yamlPath, 'utf-8');
    pkg = YAML.parse(yamlText);
  } catch (e: any) {
    console.error(`YAML parse error: ${e.message}`);
    process.exit(1);
  }

  const errors = validate(pkg);

  if (errors.length === 0) {
    console.log(`PASS: ${path.basename(yamlPath)}`);
    console.log(`  targetSlug:        ${pkg.targetSlug}`);
    console.log(`  language:          ${pkg.language}`);
    console.log(`  durationMinutes:   ${pkg.durationMinutes}`);
    console.log(`  composedExercises: ${pkg.composedExercises?.length ?? 0}`);
    console.log(`  materials:         ${pkg.materials?.length ?? 0}`);
    process.exit(0);
  }

  console.error(`FAIL: ${path.basename(yamlPath)} (${errors.length} error${errors.length > 1 ? 's' : ''})`);
  for (const e of errors) {
    console.error(`  • ${e.field}: ${e.message}`);
  }
  process.exit(1);
}

// Run main() only when this file is the entry point — not when imported by tests.
// tsx/ts-node both expose process.argv[1] as the entry script path; comparing its
// basename to this filename keeps the guard portable across module systems.
if (
  process.argv[1] &&
  /author-teaching-package\.(ts|js)$/.test(process.argv[1])
) {
  main();
}

export { validate };
