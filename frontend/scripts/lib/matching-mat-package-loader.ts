/**
 * matching-mat-package-loader.ts — Pillar 5 Phase 1 F10 commission loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the matching-mat material configuration per package. Returns a map of
 * (packageSlug → MatchingMatPackage) for the matching-mat mass-run.
 *
 * Per materials-catalog.json matching-mat spec (lines 107-132):
 *   - imageSource: theme | vocabKeyList
 *   - themeName for theme mode (deterministic alphabetic-first pairCount images)
 *   - vocabKeys array for explicit list
 *   - pairCount (default 6; range 4-12) — number of image-word pairs
 *   - rightColumnContent: word | letter-only | image (default word)
 *   - labelCase: lowercase | Title Case | UPPERCASE (default lowercase)
 *   - colorMode: color | bw (default color; bw routes to *_bw theme variants)
 *
 * Mirrors picture-cards-package-loader.ts structure with adaptations for the
 * matching-mat's pairs shape. Duplicated rather than refactored per CLAUDE.md
 * §3.1 "add new files rather than modifying existing ones" — Phase 1 commits
 * stay isolated until shared pattern empirically warrants extraction.
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');

export type RightColumnContent = 'word' | 'letter-only' | 'image';
export type LabelCase = 'lowercase' | 'Title Case' | 'UPPERCASE';

export interface MatchingMatPackage {
  slug: string;
  imageFilenames: string[]; // image filenames (without .png), length = pairCount
  themeDir: string | null;
  pairCount: number;
  rightColumnContent: RightColumnContent;
  labelCase: LabelCase;
  colorMode: 'color' | 'bw';
  title: Record<string, string>; // localized title from package.yaml; e.g., {en: "Vowel Sounds...", de: "..."}
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    imageSource?: 'vocabKeyList' | 'theme';
    vocabKeys?: string[];
    themeName?: string;
    pairCount?: number;
    rightColumnContent?: RightColumnContent;
    labelCase?: LabelCase;
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

function pickThemeImages(themeName: string, pairCount: number): string[] {
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
  return files.slice(0, pairCount).map((f) => f.replace(/\.png$/i, ''));
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

function loadOnePackage(packageDir: string): MatchingMatPackage | null {
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

  const matchingMatMaterials = raw.materials.filter(
    (m) => m.materialSlug === 'matching-mat'
  );
  if (matchingMatMaterials.length === 0) return null;

  // Single matching-mat per package per pilot precedent. If a package
  // composes multiple, the first wins.
  const m = matchingMatMaterials[0];
  const cp = m.customizationParameters || {};
  const pairCount = cp.pairCount || 6;
  const rightColumnContent: RightColumnContent = cp.rightColumnContent || 'word';
  const labelCase: LabelCase = cp.labelCase || 'lowercase';
  const colorMode = cp.colorMode || 'color';

  let imageFilenames: string[] = [];
  let themeDir: string | null = null;

  if (cp.imageSource === 'vocabKeyList' && Array.isArray(cp.vocabKeys)) {
    imageFilenames = cp.vocabKeys.slice(0, pairCount);
  } else if (cp.themeName) {
    imageFilenames = pickThemeImages(cp.themeName, pairCount);
    themeDir = resolveThemeDir(cp.themeName);
  }

  if (imageFilenames.length === 0) {
    console.warn(`WARN no images resolved for matching-mat in '${packageDir}'`);
    return null;
  }

  return {
    slug: raw.targetSlug || packageDir,
    imageFilenames,
    themeDir,
    pairCount,
    rightColumnContent,
    labelCase,
    colorMode,
    title: raw.title || { en: raw.targetSlug || packageDir },
  };
}

export function loadAllMatchingMatPackages(): Map<string, MatchingMatPackage> {
  const out = new Map<string, MatchingMatPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadMatchingMatPackagesBySlugs(
  slugs: string[]
): Map<string, MatchingMatPackage> {
  const out = new Map<string, MatchingMatPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no matching-mat material for package '${slug}'`);
  }
  return out;
}

export interface ResolvedMatchingImage {
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

export function resolveImagesForMatchingMat(
  pkg: MatchingMatPackage
): ResolvedMatchingImage[] {
  const out: ResolvedMatchingImage[] = [];
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
