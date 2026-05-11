/**
 * teaching-package-loader.ts — Server-side loader for teaching-package YAMLs.
 *
 * Reads `docs/lesson-plans/packages/<slug>/package.yaml` at SSR time and
 * exposes the parsed shape for TeachingPackageDetail page rendering.
 *
 * Per Pillar 1 + Pillar 2 + Pillar 4 evaluation-surface commission Phase 2:
 * surfaces the canonical teaching-package schema (composedExercises +
 * materials + structure + assessmentCriteria) for operator quality evaluation.
 *
 * Mirrors `frontend/scripts/lib/flashcard-package-loader.ts` js-yaml pattern
 * (require() with explicit cast; no @types/js-yaml).
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

// Resolves to <repo-root>/docs/lesson-plans/packages/. Robust across:
//   - Next.js standalone production builds: PM2 launches node server.js from
//     .next/standalone/; process.cwd() = /opt/lessoncraftstudio/frontend/
//     .next/standalone/. Repo root is 3 levels up.
//   - Dev mode (npm run dev): cwd = frontend/. Repo root is 1 level up.
//   - Alt dev launch: cwd = repo root.
// docs/ directory is NOT bundled into .next/standalone/; it lives at repo
// root and is readable at filesystem level by the standalone process.
const CANDIDATE_PACKAGES_ROOTS = [
  path.resolve(process.cwd(), '..', '..', '..', 'docs', 'lesson-plans', 'packages'), // standalone (cwd=.next/standalone)
  path.resolve(process.cwd(), '..', 'docs', 'lesson-plans', 'packages'),             // dev (cwd=frontend)
  path.resolve(process.cwd(), 'docs', 'lesson-plans', 'packages'),                   // cwd=repo-root
  path.resolve(__dirname, '..', '..', '..', 'docs', 'lesson-plans', 'packages'),     // __dirname-based fallback
];

function resolvePackagesRoot(): string {
  for (const candidate of CANDIDATE_PACKAGES_ROOTS) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return CANDIDATE_PACKAGES_ROOTS[0];
}

const PACKAGES_ROOT = resolvePackagesRoot();

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

export interface StructurePhase {
  durationMinutes: number;
  body: string;
}

export interface PackageStructure {
  warmup?: StructurePhase;
  contentActivity?: StructurePhase;
  scaffold?: StructurePhase;
  closure?: StructurePhase;
}

export interface TeachingPackage {
  targetSlug: string;
  language: string;
  title: Record<string, string>;
  description: Record<string, string>;
  durationMinutes: number;
  structure: PackageStructure;
  composedExercises: ComposedExercise[];
  materials: PackageMaterial[];
  compositionalRationale: Record<string, string>;
  curriculumStandards: string[];
  assessmentCriteria: Record<string, string>;
  recommendedDeckIds: string[];
  recommendedPdfDeckIds: string[];
  lessonPlanId: string | null;
  generatedBy: string;
}

/**
 * Loads a teaching package by slug + optional locale. Returns null if package
 * doesn't exist (caller should 404 for unknown packages).
 *
 * Locale-variant sparse-override pattern (per Arc 3 Phase 2):
 *   docs/lesson-plans/packages/<slug>/package.yaml       — master (en)
 *   docs/lesson-plans/packages/<slug>/package.<loc>.yaml — sparse override
 *
 * Sparse-override files provide title/description/structure body texts in
 * target locale; composedExercises + materials inherit from master.
 */
export function loadTeachingPackage(slug: string, locale: string = 'en'): TeachingPackage | null {
  // Defend against directory-traversal in slug. Slugs are kebab-case
  // [a-z0-9-]+; anything else is rejected.
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return null;
  }

  const yamlPath = path.join(PACKAGES_ROOT, slug, 'package.yaml');
  if (!fs.existsSync(yamlPath)) {
    return null;
  }

  const raw = fs.readFileSync(yamlPath, 'utf8');
  const parsed = yaml.load(raw) as Partial<TeachingPackage> | null;
  if (!parsed || typeof parsed !== 'object') {
    return null;
  }

  // Default-fill required fields to canonical shapes (defensive against
  // YAML authoring variance).
  const master: TeachingPackage = {
    targetSlug: parsed.targetSlug ?? slug,
    language: parsed.language ?? 'en',
    title: parsed.title ?? {},
    description: parsed.description ?? {},
    durationMinutes: parsed.durationMinutes ?? 0,
    structure: parsed.structure ?? {},
    composedExercises: parsed.composedExercises ?? [],
    materials: parsed.materials ?? [],
    compositionalRationale: parsed.compositionalRationale ?? {},
    curriculumStandards: parsed.curriculumStandards ?? [],
    assessmentCriteria: parsed.assessmentCriteria ?? {},
    recommendedDeckIds: parsed.recommendedDeckIds ?? [],
    recommendedPdfDeckIds: parsed.recommendedPdfDeckIds ?? [],
    lessonPlanId: parsed.lessonPlanId ?? null,
    generatedBy: parsed.generatedBy ?? 'manual',
  };

  // If non-en locale + sparse-override file exists, merge text fields.
  if (locale !== 'en') {
    const overridePath = path.join(PACKAGES_ROOT, slug, `package.${locale}.yaml`);
    if (fs.existsSync(overridePath)) {
      const overrideRaw = fs.readFileSync(overridePath, 'utf8');
      const override = yaml.load(overrideRaw) as Partial<TeachingPackage> | null;
      if (override && typeof override === 'object') {
        master.title = { ...master.title, ...(override.title ?? {}) };
        master.description = { ...master.description, ...(override.description ?? {}) };
        master.compositionalRationale = {
          ...master.compositionalRationale,
          ...(override.compositionalRationale ?? {}),
        };
        master.assessmentCriteria = {
          ...master.assessmentCriteria,
          ...(override.assessmentCriteria ?? {}),
        };
        // Structure: merge per-phase body if override provides it
        if (override.structure) {
          const mergedStructure = { ...master.structure };
          for (const phase of ['warmup', 'contentActivity', 'scaffold', 'closure'] as const) {
            const overridePhase = override.structure[phase];
            const masterPhase = mergedStructure[phase];
            if (overridePhase && masterPhase) {
              mergedStructure[phase] = {
                durationMinutes: masterPhase.durationMinutes,
                body: overridePhase.body ?? masterPhase.body,
              };
            }
          }
          master.structure = mergedStructure;
        }
      }
    }
  }

  return master;
}

/**
 * Returns list of locales for which a sparse-override file exists for the
 * given package slug. Always includes 'en' (master) as available.
 */
export function listAvailableLocales(slug: string): string[] {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return [];
  }
  const dir = path.join(PACKAGES_ROOT, slug);
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir);
  const locales: string[] = ['en'];
  for (const entry of entries) {
    const match = /^package\.([a-z]{2})\.yaml$/.exec(entry);
    if (match) locales.push(match[1]);
  }
  return locales;
}

/**
 * Picks the locale-keyed value with en fallback. For string-valued fields
 * keyed by locale (title / description / compositionalRationale /
 * assessmentCriteria), prefer the page's locale; fall back to en.
 */
export function localizedField(
  field: Record<string, string>,
  locale: string
): string {
  if (field[locale]) return field[locale];
  if (field.en) return field.en;
  const firstKey = Object.keys(field)[0];
  return firstKey ? field[firstKey] : '';
}
