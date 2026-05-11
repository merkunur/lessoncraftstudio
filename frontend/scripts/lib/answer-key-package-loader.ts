/**
 * answer-key-package-loader.ts — Pillar 5 Phase 2 Sub-Phase 2.1 loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the answer-key material configuration + full package metadata for teacher-
 * reference PDF rendering.
 *
 * Per materials-catalog.json answer-key spec (5 params; simplest of all 7):
 *   - includeExerciseAnswers / includeMaterialReference / includePedagogicalNotes
 *   - paperSize / language
 *
 * Text-only render (parallel to numeral-cards Sub-Phase 1.2 no-image pipeline).
 * No image-library or NUMBER_WORDS dependencies.
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');

export interface AnswerKeyPackage {
  slug: string;
  includeExerciseAnswers: boolean;
  includeMaterialReference: boolean;
  includePedagogicalNotes: boolean;
  title: Record<string, string>;
  durationMinutes: number;
  composedExercises: ComposedExercise[];
  materials: PackageMaterial[];
  compositionalRationale: Record<string, string>;
  assessmentCriteria: Record<string, string>;
  curriculumStandards: string[];
}

export interface ComposedExercise {
  appName: string;
  exerciseMode?: string;
  customizationParameters?: Record<string, unknown>;
  ordering: number;
  pedagogicalRole: string;
}

export interface PackageMaterial {
  materialSlug: string;
  customizationParameters?: Record<string, unknown>;
  ordering: number;
  pedagogicalRole: string;
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    includeExerciseAnswers?: boolean;
    includeMaterialReference?: boolean;
    includePedagogicalNotes?: boolean;
  };
}

interface RawPackage {
  targetSlug?: string;
  title?: Record<string, string>;
  durationMinutes?: number;
  materials?: RawMaterial[];
  composedExercises?: ComposedExercise[];
  compositionalRationale?: Record<string, string>;
  assessmentCriteria?: Record<string, string>;
  curriculumStandards?: string[];
}

function loadOnePackage(packageDir: string): AnswerKeyPackage | null {
  const yamlPath = path.join(PACKAGES_ROOT, packageDir, 'package.yaml');
  if (!fs.existsSync(yamlPath)) return null;
  let raw: RawPackage;
  try {
    raw = yaml.load(fs.readFileSync(yamlPath, 'utf-8')) as RawPackage;
  } catch (e: any) {
    console.warn(`WARN YAML parse failure for ${packageDir}: ${e.message}`);
    return null;
  }
  if (!raw.materials || !Array.isArray(raw.materials)) return null;
  const akMaterial = raw.materials.find((m) => m.materialSlug === 'answer-key');
  if (!akMaterial) return null;
  const cp = akMaterial.customizationParameters || {};
  return {
    slug: raw.targetSlug || packageDir,
    includeExerciseAnswers: cp.includeExerciseAnswers !== false,
    includeMaterialReference: cp.includeMaterialReference !== false,
    includePedagogicalNotes: cp.includePedagogicalNotes !== false,
    title: raw.title || {},
    durationMinutes: raw.durationMinutes || 30,
    composedExercises: (raw.composedExercises || []) as ComposedExercise[],
    materials: (raw.materials || []) as PackageMaterial[],
    compositionalRationale: raw.compositionalRationale || {},
    assessmentCriteria: raw.assessmentCriteria || {},
    curriculumStandards: raw.curriculumStandards || [],
  };
}

export function loadAllAnswerKeyPackages(): Map<string, AnswerKeyPackage> {
  const out = new Map<string, AnswerKeyPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadAnswerKeyPackagesBySlugs(
  slugs: string[]
): Map<string, AnswerKeyPackage> {
  const out = new Map<string, AnswerKeyPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no answer-key material for package '${slug}'`);
  }
  return out;
}

export function localizedField(
  field: Record<string, string>,
  locale: string
): string {
  if (field[locale]) return field[locale];
  if (field.en) return field.en;
  const firstKey = Object.keys(field)[0];
  return firstKey ? field[firstKey] : '';
}
