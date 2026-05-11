/**
 * picture-cards-package-loader.ts — Pillar 5 Phase 1 Sub-Phase 1.1 loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the picture-cards material configuration per package. Returns a map of
 * (packageSlug → list of image filenames) for the picture-cards mass-run.
 *
 * Per materials-catalog.json picture-cards spec (lines 80-104):
 *   - imageSource: vocabKeyList | theme | manualSelection
 *   - themeName + cardCount for theme mode (deterministic alphabetic-first N)
 *   - vocabKeys array for explicit list
 *   - No label text (key differentiator from flashcards)
 *
 * Mirrors flashcard-package-loader.ts structure; filter on
 * `materialSlug === 'picture-cards'` instead of 'flashcards'. Duplicated rather
 * than refactored per CLAUDE.md §3.1 "add new files rather than modifying
 * existing ones" — Phase 1 commits stay isolated until shared pattern
 * empirically warrants extraction.
 */

import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');

export interface PictureCardsPackage {
  slug: string;
  imageFilenames: string[]; // image filenames (without .png) deduped across material entries
  themeDir: string | null;  // first theme dir referenced
  cardsPerPage: number;     // first cardsPerPage from material spec (defaults 6 if absent)
}

interface RawMaterial {
  materialSlug?: string;
  customizationParameters?: {
    imageSource?: 'vocabKeyList' | 'theme' | 'manualSelection';
    vocabKeys?: string[];
    themeName?: string;
    cardCount?: number;
    cardsPerPage?: number;
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

function pickThemeImages(themeName: string, cardCount: number): string[] {
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
  return files.slice(0, cardCount).map((f) => f.replace(/\.png$/i, ''));
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

function loadOnePackage(packageDir: string): PictureCardsPackage | null {
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

  const pictureCardsMaterials = raw.materials.filter(
    (m) => m.materialSlug === 'picture-cards'
  );
  if (pictureCardsMaterials.length === 0) return null;

  const filenamesSet = new Set<string>();
  let firstThemeDir: string | null = null;
  let firstCardsPerPage = 6;

  for (const m of pictureCardsMaterials) {
    const cp = m.customizationParameters || {};
    if (cp.cardsPerPage && firstCardsPerPage === 6) {
      firstCardsPerPage = cp.cardsPerPage;
    }
    if (cp.imageSource === 'vocabKeyList' && Array.isArray(cp.vocabKeys)) {
      cp.vocabKeys.forEach((k) => filenamesSet.add(k));
    } else if (cp.imageSource === 'theme' && cp.themeName) {
      const cardCount = cp.cardCount || 10;
      const themeImages = pickThemeImages(cp.themeName, cardCount);
      themeImages.forEach((f) => filenamesSet.add(f));
      if (!firstThemeDir) {
        firstThemeDir = resolveThemeDir(cp.themeName);
      }
    }
  }

  if (filenamesSet.size === 0) {
    console.warn(`WARN no images resolved for picture-cards in '${packageDir}'`);
    return null;
  }

  return {
    slug: raw.targetSlug || packageDir,
    imageFilenames: Array.from(filenamesSet),
    themeDir: firstThemeDir,
    cardsPerPage: firstCardsPerPage,
  };
}

export function loadAllPictureCardsPackages(): Map<string, PictureCardsPackage> {
  const out = new Map<string, PictureCardsPackage>();
  const dirs = fs
    .readdirSync(PACKAGES_ROOT)
    .filter((d) => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());
  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }
  return out;
}

export function loadPictureCardsPackagesBySlugs(
  slugs: string[]
): Map<string, PictureCardsPackage> {
  const out = new Map<string, PictureCardsPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no picture-cards material for package '${slug}'`);
  }
  return out;
}

/**
 * Resolve filenames to absolute image paths. For theme-mode entries, files
 * live directly in the resolved theme dir. For vocabKey-mode entries, search
 * across theme dirs for matching filename. Returns (filename, imagePath,
 * themeDir) tuples; skips unresolvable filenames with warning.
 */
export interface ResolvedPictureImage {
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

  // Try exact filename match first
  for (const themeDir of ordered) {
    const themePath = path.join(IMAGE_LIBRARY_ROOT, themeDir);
    const tryPath = path.join(themePath, `${filename}.png`);
    if (fs.existsSync(tryPath)) {
      return { themeDir, imagePath: tryPath };
    }
  }
  // Fallback: case-insensitive search per theme dir
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

export function resolveImagesForPictureCards(
  pkg: PictureCardsPackage
): ResolvedPictureImage[] {
  const out: ResolvedPictureImage[] = [];
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
