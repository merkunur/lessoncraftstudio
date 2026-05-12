/**
 * vocabulary-tracing-strips-package-loader.ts — Pillar 5 F11 commission loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the vocabulary-tracing-strips material configuration per package. Returns a
 * map of (packageSlug → VocabularyTracingStripsPackage).
 *
 * Per materials-catalog.json vocabulary-tracing-strips spec (lines 247-277):
 *   - imageSource: theme | manualSelection | vocabKeyList (default theme)
 *   - themeName + stripCount for theme mode
 *   - vocabKeys array for explicit list
 *   - stripCount (default 6; range 4-12)
 *   - stripsPerPage (default 6; 4/5/6/8)
 *   - labelCase (default lowercase)
 *   - traceStyle: dotted | outline (default dotted)
 *   - includeIndependentLine (default true)
 *   - colorMode, paperSize, language
 *
 * Mirrors matching-mat-package-loader.ts (F10) structure with adaptations for
 * the tracing-strip shape. 5th theme-image-resolver consumer; DRY-extract
 * candidate filed at next [DOCS] cycle.
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');

export type TraceStyle = 'dotted' | 'outline';
export type LabelCase = 'lowercase' | 'Title Case' | 'UPPERCASE';

export interface VocabularyTracingStripsPackage {
  slug: string;
  imageFilenames: string[]; // length = stripCount
  themeDir: string | null;
  stripCount: number;
  stripsPerPage: number;
  labelCase: LabelCase;
  traceStyle: TraceStyle;
  includeIndependentLine: boolean;
  colorMode: 'color' | 'bw';
  title: Record<string, string>;
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    imageSource?: 'vocabKeyList' | 'theme' | 'manualSelection';
    vocabKeys?: string[];
    themeName?: string;
    stripCount?: number;
    stripsPerPage?: number;
    labelCase?: LabelCase;
    traceStyle?: TraceStyle;
    includeIndependentLine?: boolean;
    colorMode?: 'color' | 'bw';
  };
}

interface RawPackage {
  targetSlug?: string;
  title?: Record<string, string>;
  materials?: RawMaterial[];
}

function themeNameCandidates(themeName: string): string[] {
  const spaced = themeName.replace(/[_-]/g, ' ');
  return [
    themeName,
    spaced,
    spaced.replace(/\b\w/g, (c) => c.toUpperCase()),
    themeName.toLowerCase(),
  ];
}

function pickThemeImages(themeName: string, stripCount: number): string[] {
  const candidates = themeNameCandidates(themeName);
  let actualDir: string | null = null;
  for (const candidate of candidates) {
    const tryPath = path.join(IMAGE_LIBRARY_ROOT, candidate);
    if (fs.existsSync(tryPath) && fs.statSync(tryPath).isDirectory()) {
      actualDir = candidate;
      break;
    }
  }
  if (!actualDir) {
    try {
      const dirs = fs.readdirSync(IMAGE_LIBRARY_ROOT);
      const lowerName = themeName.toLowerCase().replace(/[_-]/g, ' ');
      actualDir = dirs.find((d) => d.toLowerCase() === lowerName) || null;
    } catch {
      /* no-op */
    }
  }
  if (!actualDir) {
    console.warn(`WARN theme dir not found for themeName='${themeName}'`);
    return [];
  }
  const themePath = path.join(IMAGE_LIBRARY_ROOT, actualDir);
  const files = fs
    .readdirSync(themePath)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .sort();
  return files.slice(0, stripCount).map((f) => f.replace(/\.png$/i, ''));
}

function resolveThemeDir(themeName: string): string | null {
  for (const candidate of themeNameCandidates(themeName)) {
    const tryPath = path.join(IMAGE_LIBRARY_ROOT, candidate);
    if (fs.existsSync(tryPath) && fs.statSync(tryPath).isDirectory()) {
      return candidate;
    }
  }
  try {
    const dirs = fs.readdirSync(IMAGE_LIBRARY_ROOT);
    const lowerName = themeName.toLowerCase().replace(/[_-]/g, ' ');
    return dirs.find((d) => d.toLowerCase() === lowerName) || null;
  } catch {
    return null;
  }
}

function loadOnePackage(packageDir: string): VocabularyTracingStripsPackage | null {
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

  const vtsMaterials = raw.materials.filter(
    (m) => m.materialSlug === 'vocabulary-tracing-strips'
  );
  if (vtsMaterials.length === 0) return null;

  const m = vtsMaterials[0];
  const cp = m.customizationParameters || {};
  const stripCount = cp.stripCount || 6;
  const stripsPerPage = cp.stripsPerPage || 6;
  const labelCase: LabelCase = cp.labelCase || 'lowercase';
  const traceStyle: TraceStyle = cp.traceStyle || 'dotted';
  const includeIndependentLine =
    cp.includeIndependentLine !== undefined ? cp.includeIndependentLine : true;
  const colorMode = cp.colorMode || 'color';

  let imageFilenames: string[] = [];
  let themeDir: string | null = null;

  if (cp.imageSource === 'vocabKeyList' && Array.isArray(cp.vocabKeys)) {
    imageFilenames = cp.vocabKeys.slice(0, stripCount);
  } else if (cp.themeName) {
    imageFilenames = pickThemeImages(cp.themeName, stripCount);
    themeDir = resolveThemeDir(cp.themeName);
  }

  if (imageFilenames.length === 0) {
    console.warn(`WARN no images resolved for vocabulary-tracing-strips in '${packageDir}'`);
    return null;
  }

  return {
    slug: raw.targetSlug || packageDir,
    imageFilenames,
    themeDir,
    stripCount,
    stripsPerPage,
    labelCase,
    traceStyle,
    includeIndependentLine,
    colorMode,
    title: raw.title || { en: raw.targetSlug || packageDir },
  };
}

export function loadAllVocabularyTracingStripsPackages(): Map<string, VocabularyTracingStripsPackage> {
  const out = new Map<string, VocabularyTracingStripsPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadVocabularyTracingStripsPackagesBySlugs(
  slugs: string[]
): Map<string, VocabularyTracingStripsPackage> {
  const out = new Map<string, VocabularyTracingStripsPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no vocabulary-tracing-strips material for package '${slug}'`);
  }
  return out;
}

export interface ResolvedTracingImage {
  filename: string;
  imagePath: string;
  themeDir: string;
}

const _themeDirCache: Map<string, string[]> = new Map();
function listColorThemeDirs(): string[] {
  if (_themeDirCache.has('all')) return _themeDirCache.get('all')!;
  const dirs = fs
    .readdirSync(IMAGE_LIBRARY_ROOT)
    .filter((d) => {
      try {
        return fs.statSync(path.join(IMAGE_LIBRARY_ROOT, d)).isDirectory();
      } catch {
        return false;
      }
    })
    .filter((d) => !/(bw|^BORDERS$|^BACKGROUNDS$)/i.test(d));
  _themeDirCache.set('all', dirs);
  return dirs;
}

function findImageForFilename(
  filename: string,
  preferredThemeDir: string | null = null
): { themeDir: string; imagePath: string } | null {
  const themeDirs = listColorThemeDirs();
  const ordered = preferredThemeDir
    ? [preferredThemeDir, ...themeDirs.filter((d) => d !== preferredThemeDir)]
    : themeDirs;
  for (const themeDir of ordered) {
    const themePath = path.join(IMAGE_LIBRARY_ROOT, themeDir);
    const tryPath = path.join(themePath, `${filename}.png`);
    if (fs.existsSync(tryPath)) {
      return { themeDir, imagePath: tryPath };
    }
  }
  for (const themeDir of ordered) {
    const themePath = path.join(IMAGE_LIBRARY_ROOT, themeDir);
    let files: string[];
    try {
      files = fs.readdirSync(themePath).filter((f) => f.toLowerCase().endsWith('.png'));
    } catch {
      continue;
    }
    const match = files.find((f) => f.replace(/\.png$/i, '').toLowerCase() === filename.toLowerCase());
    if (match) {
      return { themeDir, imagePath: path.join(themePath, match) };
    }
  }
  return null;
}

export function resolveImagesForVocabularyTracingStrips(
  pkg: VocabularyTracingStripsPackage
): ResolvedTracingImage[] {
  const out: ResolvedTracingImage[] = [];
  for (const filename of pkg.imageFilenames) {
    const found = findImageForFilename(filename, pkg.themeDir);
    if (found) {
      out.push({ filename, imagePath: found.imagePath, themeDir: found.themeDir });
    } else {
      console.warn(`WARN no image found for filename='${filename}' in package='${pkg.slug}'`);
    }
  }
  return out;
}
