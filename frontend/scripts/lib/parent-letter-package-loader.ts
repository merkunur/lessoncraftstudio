/**
 * parent-letter-package-loader.ts — Pillar 5 Phase 2 Sub-Phase 2.2 loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the parent-take-home-letter material configuration + package metadata needed
 * for parent-letter PDF rendering.
 *
 * Per materials-catalog.json parent-take-home-letter spec (10 params):
 *   - tone (warm/formal/playful) / imageSource / themeName / vocabKeys
 *   - pictureCueCount / homeLanguage / language / colorMode
 *   - signatureLine / paperSize
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');

export type Tone = 'warm' | 'formal' | 'playful';

export interface ParentLetterPackage {
  slug: string;
  tone: Tone;
  imageSource: 'theme' | 'vocabKeyList' | null;
  themeName: string | null;
  vocabKeys: string[] | null;
  pictureCueCount: number;
  homeLanguage: string;
  language: string;
  colorMode: 'color' | 'bw';
  signatureLine: boolean;
  paperSize: 'a4' | 'letter';
  title: Record<string, string>;
  durationMinutes: number;
  compositionalRationale: Record<string, string>;
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    tone?: string;
    imageSource?: string;
    themeName?: string;
    vocabKeys?: string[];
    pictureCueCount?: number;
    homeLanguage?: string;
    language?: string;
    colorMode?: string;
    signatureLine?: boolean;
    paperSize?: string;
  };
}

interface RawPackage {
  targetSlug?: string;
  title?: Record<string, string>;
  durationMinutes?: number;
  materials?: RawMaterial[];
  compositionalRationale?: Record<string, string>;
}

function loadOnePackage(packageDir: string): ParentLetterPackage | null {
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
  const plMaterial = raw.materials.find((m) => m.materialSlug === 'parent-take-home-letter');
  if (!plMaterial) return null;
  const cp = plMaterial.customizationParameters || {};

  const tone: Tone = (cp.tone === 'formal' || cp.tone === 'playful') ? cp.tone : 'warm';
  const colorMode: 'color' | 'bw' = cp.colorMode === 'bw' ? 'bw' : 'color';
  const paperSize: 'a4' | 'letter' = cp.paperSize === 'letter' ? 'letter' : 'a4';
  const imageSource: 'theme' | 'vocabKeyList' | null =
    cp.imageSource === 'vocabKeyList' ? 'vocabKeyList' :
    cp.imageSource === 'theme' ? 'theme' : null;

  return {
    slug: raw.targetSlug || packageDir,
    tone,
    imageSource,
    themeName: typeof cp.themeName === 'string' ? cp.themeName : null,
    vocabKeys: Array.isArray(cp.vocabKeys) ? cp.vocabKeys : null,
    pictureCueCount: typeof cp.pictureCueCount === 'number' ? cp.pictureCueCount : 6,
    homeLanguage: typeof cp.homeLanguage === 'string' ? cp.homeLanguage : 'en',
    language: typeof cp.language === 'string' ? cp.language : 'en',
    colorMode,
    signatureLine: cp.signatureLine !== false,
    paperSize,
    title: raw.title || {},
    durationMinutes: raw.durationMinutes || 30,
    compositionalRationale: raw.compositionalRationale || {},
  };
}

export function loadAllParentLetterPackages(): Map<string, ParentLetterPackage> {
  const out = new Map<string, ParentLetterPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadParentLetterPackagesBySlugs(
  slugs: string[]
): Map<string, ParentLetterPackage> {
  const out = new Map<string, ParentLetterPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no parent-take-home-letter material for package '${slug}'`);
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
