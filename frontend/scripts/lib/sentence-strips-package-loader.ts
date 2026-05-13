/**
 * sentence-strips-package-loader.ts — Pillar 5 Phase 2 Sub-Phase 2.3 loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the sentence-strips material configuration + package metadata.
 *
 * Per materials-catalog.json sentence-strips spec.
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');

export type CountMode = 'fixed' | 'varying' | 'explicit';

export interface SentenceStripsPackage {
  slug: string;
  framePreset: string;
  frameTemplate: string | null;
  imageSource: 'theme' | 'vocabKeyList' | null;
  themeName: string | null;
  vocabKeys: string[] | null;
  stripCount: number;
  stripsPerPage: number;
  colorMode: 'color' | 'bw';
  includeWritingLine: boolean;
  paperSize: 'a4' | 'letter';
  language: string;
  title: Record<string, string>;
  /**
   * F6: count parameter resolution per strip. When framePreset is count-bearing
   * (currently only `there-are-count-plural`), this determines how counts vary
   * across strips. Defaults to "varying" for count-bearing presets, "fixed" for
   * count-free presets — packages can override via explicit YAML param.
   */
  countMode: CountMode;
  /**
   * F6: explicit count list per strip when countMode === "explicit". Length
   * cycles if shorter than stripCount. Null for "fixed" + "varying" modes.
   */
  countList: number[] | null;
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    framePreset?: string;
    frameTemplate?: string;
    imageSource?: string;
    themeName?: string;
    vocabKeys?: string[];
    stripCount?: number;
    stripsPerPage?: number;
    colorMode?: string;
    includeWritingLine?: boolean;
    paperSize?: string;
    language?: string;
    countMode?: string;
    countList?: number[];
  };
}

interface RawPackage {
  targetSlug?: string;
  title?: Record<string, string>;
  materials?: RawMaterial[];
}

function loadOnePackage(packageDir: string): SentenceStripsPackage | null {
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
  const ssMaterial = raw.materials.find((m) => m.materialSlug === 'sentence-strips');
  if (!ssMaterial) return null;
  const cp = ssMaterial.customizationParameters || {};

  const colorMode: 'color' | 'bw' = cp.colorMode === 'bw' ? 'bw' : 'color';
  const paperSize: 'a4' | 'letter' = cp.paperSize === 'letter' ? 'letter' : 'a4';
  const imageSource: 'theme' | 'vocabKeyList' | null =
    cp.imageSource === 'vocabKeyList' ? 'vocabKeyList' :
    cp.imageSource === 'theme' ? 'theme' : null;

  // F6: countMode resolution — explicit YAML override OR default-by-framePreset
  const framePreset = typeof cp.framePreset === 'string' ? cp.framePreset : 'i-see-a';
  const explicitCountMode =
    typeof cp.countMode === 'string' && ['fixed', 'varying', 'explicit'].includes(cp.countMode)
      ? (cp.countMode as CountMode)
      : undefined;
  // Default: count-bearing framePreset → "varying"; count-free → "fixed".
  // Currently only `there-are-count-plural` is count-bearing (per
  // sentence-frame-library.ts inspection); other 7 framePresets have no
  // {count} placeholder so countMode is effectively unused at fillTemplate.
  const countMode: CountMode =
    explicitCountMode ?? (framePreset === 'there-are-count-plural' ? 'varying' : 'fixed');
  const countList: number[] | null =
    Array.isArray(cp.countList) && cp.countList.every((n) => typeof n === 'number')
      ? cp.countList
      : null;

  return {
    slug: raw.targetSlug || packageDir,
    framePreset,
    frameTemplate: typeof cp.frameTemplate === 'string' ? cp.frameTemplate : null,
    imageSource,
    themeName: typeof cp.themeName === 'string' ? cp.themeName : null,
    vocabKeys: Array.isArray(cp.vocabKeys) ? cp.vocabKeys : null,
    stripCount: typeof cp.stripCount === 'number' ? cp.stripCount : 6,
    stripsPerPage: typeof cp.stripsPerPage === 'number' ? cp.stripsPerPage : 3,
    colorMode,
    includeWritingLine: cp.includeWritingLine !== false,
    paperSize,
    language: typeof cp.language === 'string' ? cp.language : 'en',
    title: raw.title || {},
    countMode,
    countList,
  };
}

export function loadAllSentenceStripsPackages(): Map<string, SentenceStripsPackage> {
  const out = new Map<string, SentenceStripsPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadSentenceStripsPackagesBySlugs(
  slugs: string[]
): Map<string, SentenceStripsPackage> {
  const out = new Map<string, SentenceStripsPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no sentence-strips material for package '${slug}'`);
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
