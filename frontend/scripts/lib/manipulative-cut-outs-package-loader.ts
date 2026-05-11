/**
 * manipulative-cut-outs-package-loader.ts — Pillar 5 Phase 1 Sub-Phase 1.3 loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the manipulative-cut-outs material configuration per package.
 *
 * Per materials-catalog.json manipulative-cut-outs spec (lines 215-244):
 *   - imageSource: vocabKeyList | theme
 *   - mode: single-repeat | variety
 *     - single-repeat: one image × itemCount tiles (counting work)
 *     - variety: one image per vocabKey × itemCount copies each (sorting)
 *   - itemSize: small-1in | medium-1.5in | large-2in
 *   - itemCount: total tiles for single-repeat; copies per vocabKey for variety
 *   - imageSource (theme | vocabKeyList) + themeName + vocabKeys + colorMode
 *   - showCutGuides + paperSize + language
 *
 * Mirrors picture-cards-package-loader pattern; image resolution reused.
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');

export type ItemSize = 'small-1in' | 'medium-1.5in' | 'large-2in';
export type CutOutMode = 'single-repeat' | 'variety';

export interface ManipulativeCutOutsPackage {
  slug: string;
  mode: CutOutMode;
  itemCount: number;
  itemSize: ItemSize;
  imageFilenames: string[]; // 1 for single-repeat; N for variety
  themeDir: string | null;
  showCutGuides: boolean;
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    imageSource?: 'vocabKeyList' | 'theme';
    vocabKeys?: string[];
    themeName?: string;
    mode?: CutOutMode;
    itemCount?: number;
    itemSize?: ItemSize;
    showCutGuides?: boolean;
  };
}

interface RawPackage {
  targetSlug?: string;
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

function pickFirstThemeImage(themeName: string): { dir: string; filename: string } | null {
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
  if (!actualDir) return null;
  const themePath = path.join(IMAGE_LIBRARY_ROOT, actualDir);
  const files = fs
    .readdirSync(themePath)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .sort();
  if (files.length === 0) return null;
  return { dir: actualDir, filename: files[0].replace(/\.png$/i, '') };
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

function loadOnePackage(packageDir: string): ManipulativeCutOutsPackage | null {
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
  const material = raw.materials.find((m) => m.materialSlug === 'manipulative-cut-outs');
  if (!material) return null;
  const cp = material.customizationParameters || {};
  const mode: CutOutMode = cp.mode || 'single-repeat';
  const itemCount = cp.itemCount || 20;
  const itemSize: ItemSize = cp.itemSize || 'medium-1.5in';

  let imageFilenames: string[] = [];
  let themeDir: string | null = null;

  if (cp.imageSource === 'theme' && cp.themeName) {
    if (mode === 'single-repeat') {
      const picked = pickFirstThemeImage(cp.themeName);
      if (picked) {
        imageFilenames = [picked.filename];
        themeDir = picked.dir;
      }
    } else {
      // variety mode: pull multiple images from theme dir
      themeDir = resolveThemeDir(cp.themeName);
      if (themeDir) {
        const themePath = path.join(IMAGE_LIBRARY_ROOT, themeDir);
        const files = fs
          .readdirSync(themePath)
          .filter((f) => f.toLowerCase().endsWith('.png'))
          .sort()
          .slice(0, itemCount);
        imageFilenames = files.map((f) => f.replace(/\.png$/i, ''));
      }
    }
  } else if (cp.imageSource === 'vocabKeyList' && Array.isArray(cp.vocabKeys)) {
    imageFilenames = mode === 'single-repeat' ? cp.vocabKeys.slice(0, 1) : cp.vocabKeys;
  }

  if (imageFilenames.length === 0) {
    console.warn(`WARN no images resolved for manipulative-cut-outs in '${packageDir}'`);
    return null;
  }

  return {
    slug: raw.targetSlug || packageDir,
    mode,
    itemCount,
    itemSize,
    imageFilenames,
    themeDir,
    showCutGuides: cp.showCutGuides !== false,
  };
}

export function loadAllManipulativeCutOutsPackages(): Map<string, ManipulativeCutOutsPackage> {
  const out = new Map<string, ManipulativeCutOutsPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadManipulativeCutOutsPackagesBySlugs(
  slugs: string[]
): Map<string, ManipulativeCutOutsPackage> {
  const out = new Map<string, ManipulativeCutOutsPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no manipulative-cut-outs material for package '${slug}'`);
  }
  return out;
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
    if (fs.existsSync(tryPath)) return { themeDir, imagePath: tryPath };
  }
  for (const themeDir of ordered) {
    const themePath = path.join(IMAGE_LIBRARY_ROOT, themeDir);
    let files: string[];
    try {
      files = fs.readdirSync(themePath).filter((f) => f.toLowerCase().endsWith('.png'));
    } catch {
      continue;
    }
    const match = files.find(
      (f) => f.replace(/\.png$/i, '').toLowerCase() === filename.toLowerCase()
    );
    if (match) return { themeDir, imagePath: path.join(themePath, match) };
  }
  return null;
}

export interface ResolvedTile {
  filename: string;
  imagePath: string;
}

export function resolveImagesForCutOuts(pkg: ManipulativeCutOutsPackage): ResolvedTile[] {
  const out: ResolvedTile[] = [];
  for (const filename of pkg.imageFilenames) {
    const found = findImageForFilename(filename, pkg.themeDir);
    if (found) out.push({ filename, imagePath: found.imagePath });
    else console.warn(`WARN no image found for '${filename}' in package='${pkg.slug}'`);
  }
  return out;
}
