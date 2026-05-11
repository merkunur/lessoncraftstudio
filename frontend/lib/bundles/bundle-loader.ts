/**
 * bundle-loader.ts — Server-side loader for Pillar 2 themed bundle YAMLs.
 *
 * Reads docs/lesson-plans/bundles/<slug>/bundle.yaml at SSR time. Pillar 2
 * commission cycle CLOSED at 48 bundles spanning 48 of 50 canonical-color
 * themeAxisKeys (per docs/lesson-plans/pillar-2-cycle-close-out.md).
 *
 * Mirrors teaching-package-loader path-resolution strategy (process.cwd()-
 * based with fallback chain) for standalone production builds.
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const CANDIDATE_BUNDLES_ROOTS = [
  path.resolve(process.cwd(), '..', '..', '..', 'docs', 'lesson-plans', 'bundles'),
  path.resolve(process.cwd(), '..', 'docs', 'lesson-plans', 'bundles'),
  path.resolve(process.cwd(), 'docs', 'lesson-plans', 'bundles'),
  path.resolve(__dirname, '..', '..', '..', 'docs', 'lesson-plans', 'bundles'),
];

function resolveBundlesRoot(): string {
  for (const candidate of CANDIDATE_BUNDLES_ROOTS) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return CANDIDATE_BUNDLES_ROOTS[0];
}

const BUNDLES_ROOT = resolveBundlesRoot();

export interface ThemedBundle {
  bundleSlug: string;
  themeAxisKey: string;
  language: string;
  title: Record<string, string>;
  description: Record<string, string>;
  thumbnailUrl: string;
  status: string;
  teachingPackageSlugs: string[];
  deckIds: string[];
  lessonPlanIds: string[];
  thematicCoherence: Record<string, string>;
}

export function loadBundle(slug: string): ThemedBundle | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const yamlPath = path.join(BUNDLES_ROOT, slug, 'bundle.yaml');
  if (!fs.existsSync(yamlPath)) return null;
  const raw = fs.readFileSync(yamlPath, 'utf8');
  const parsed = yaml.load(raw) as Partial<ThemedBundle> | null;
  if (!parsed || typeof parsed !== 'object') return null;
  return {
    bundleSlug: parsed.bundleSlug ?? slug,
    themeAxisKey: parsed.themeAxisKey ?? '',
    language: parsed.language ?? 'en',
    title: parsed.title ?? {},
    description: parsed.description ?? {},
    thumbnailUrl: parsed.thumbnailUrl ?? '',
    status: parsed.status ?? 'draft',
    teachingPackageSlugs: parsed.teachingPackageSlugs ?? [],
    deckIds: parsed.deckIds ?? [],
    lessonPlanIds: parsed.lessonPlanIds ?? [],
    thematicCoherence: parsed.thematicCoherence ?? {},
  };
}

/**
 * Returns list of bundle slugs that compose the given teaching-package slug
 * in their teachingPackageSlugs array. Cross-reference for teaching-package
 * detail page "appears in N bundles" section.
 *
 * Single scan of all bundle directories; for 48 bundles this is bounded
 * I/O. Cache could be added if scan time surfaces; not warranted at current
 * scale.
 */
export function findBundlesForPackage(packageSlug: string): ThemedBundle[] {
  if (!fs.existsSync(BUNDLES_ROOT)) return [];
  const bundleDirs = fs.readdirSync(BUNDLES_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const matches: ThemedBundle[] = [];
  for (const bundleSlug of bundleDirs) {
    const bundle = loadBundle(bundleSlug);
    if (bundle && bundle.teachingPackageSlugs.includes(packageSlug)) {
      matches.push(bundle);
    }
  }
  return matches.sort((a, b) => a.bundleSlug.localeCompare(b.bundleSlug));
}

export function localizedBundleField(
  field: Record<string, string>,
  locale: string
): string {
  if (field[locale]) return field[locale];
  if (field.en) return field.en;
  const firstKey = Object.keys(field)[0];
  return firstKey ? field[firstKey] : '';
}
