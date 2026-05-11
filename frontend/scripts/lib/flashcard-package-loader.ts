/**
 * flashcard-package-loader.ts — Pillar 4 Arc 2 Phase 2 package loader.
 *
 * Reads master teaching packages from docs/lesson-plans/packages/ and extracts
 * the flashcard material configuration per package. Returns a map of
 * (packageSlug → list of vocabKeys) for the Phase 2 mass-run pipeline.
 *
 * Per Q1-(b) consolidated-triple lock + Q2 fixed-cardCount lock:
 * - multiple `materialSlug: flashcards` entries per package = print-format
 *   variants of SAME vocab set (cardsPerPage differs, vocabKeys identical)
 * - imageSource: vocabKeyList → use explicit vocabKeys array
 * - imageSource: theme → resolve themeName + cardCount → deterministic image
 *   selection (alphabetic-sorted first N from color theme dir)
 *
 * Per Arc 1's hardcoded --layouts 6,9 precedent (Q1-(b) "Arc 1's pattern is
 * established precedent"), Phase 2 standardizes on 6-up + 9-up print layouts
 * regardless of per-package cardsPerPage value. Per-package layout
 * customization (4/5/8/10) is deferred to future arc.
 *
 * Per Q3 master-inherit lock: locale-variant sparse-override YAML files
 * inherit master vocab_keys; material parameters default master-inherit.
 * Phase 2 loader reads master package.yaml only; locale-specific text content
 * comes from IMAGE_VOCABULARY at render time.
 */

import * as fs from 'fs';
import * as path from 'path';
// js-yaml has no bundled TypeScript types in the dependency tree; require()
// pattern with explicit `any` cast keeps Next.js TS-build clean without
// requiring an @types/js-yaml package install. Used only for yaml.load().
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: { load: (str: string) => unknown } = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const PACKAGES_ROOT = path.join(REPO_ROOT, 'docs', 'lesson-plans', 'packages');
const IMAGE_LIBRARY_ROOT = path.join(REPO_ROOT, 'image library');

export interface FlashcardPackage {
  slug: string;
  vocabKeys: string[];        // unique vocab keys (deduped across flashcards materials)
  themeDir: string | null;    // theme dir for accent color (from first theme reference; null for vocabKeyList-only)
}

interface RawFlashcardMaterial {
  materialSlug?: string;
  customizationParameters?: {
    imageSource?: 'vocabKeyList' | 'theme';
    vocabKeys?: string[];
    themeName?: string;
    cardCount?: number;
  };
}

interface RawPackage {
  targetSlug?: string;
  materials?: RawFlashcardMaterial[];
}

/**
 * Deterministically pick N color PNG filenames from a theme directory.
 * Alphabetic-sort + take first N. Filenames stripped of .png extension.
 */
function themeNameCandidates(themeName: string): string[] {
  // image_themes table uses underscore form (e.g., "at_the_supermarket");
  // package YAML sometimes uses hyphen form (e.g., "insects-and-bugs");
  // image library dir uses space form (e.g., "At the Supermarket"). Normalize.
  const spaced = themeName.replace(/[_-]/g, ' ');
  return [
    themeName,                                                  // exact match
    spaced,                                                     // separator → space
    spaced.replace(/\b\w/g, c => c.toUpperCase()),              // title-case
    themeName.toLowerCase(),                                    // lowercase variant
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
    // Try case-insensitive search across image library
    const dirs = fs.readdirSync(IMAGE_LIBRARY_ROOT);
    const lowerName = themeName.toLowerCase().replace(/[_-]/g, ' ');
    actualDir = dirs.find(d => d.toLowerCase() === lowerName) || null;
  }

  if (!actualDir) {
    console.warn(`WARN theme dir not found for themeName='${themeName}'; skipping`);
    return [];
  }

  const themePath = path.join(IMAGE_LIBRARY_ROOT, actualDir);
  const files = fs.readdirSync(themePath)
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort();

  return files.slice(0, cardCount).map(f => f.replace(/\.png$/i, ''));
}

/**
 * Theme dir name from themeName (image library form, e.g., "At the Supermarket"
 * for "at_the_supermarket"). Returns the actually-existing dir name on disk.
 */
function resolveThemeDir(themeName: string): string | null {
  for (const candidate of themeNameCandidates(themeName)) {
    const tryPath = path.join(IMAGE_LIBRARY_ROOT, candidate);
    if (fs.existsSync(tryPath) && fs.statSync(tryPath).isDirectory()) {
      return candidate;
    }
  }

  // Case-insensitive fallback
  try {
    const dirs = fs.readdirSync(IMAGE_LIBRARY_ROOT);
    const lowerName = themeName.toLowerCase().replace(/[_-]/g, ' ');
    return dirs.find(d => d.toLowerCase() === lowerName) || null;
  } catch {
    return null;
  }
}

/**
 * Convert a filename-style vocabKey (e.g., "cat 2", "alligator-3") to canonical
 * vocab-key form (matches resolveVocabKey at flashcard-data.ts:118).
 * Phase 2 uses this for theme-derived image filenames.
 */
function normalizeKey(filename: string): string {
  const noExt = filename.replace(/\.\w+$/, '');
  const slugified = noExt.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase();
  return slugified.replace(/-\d+$/, '').replace(/-+$/, '');
}

/**
 * Load one package.yaml from disk. Returns null if no flashcards material.
 */
function loadOnePackage(packageDir: string): FlashcardPackage | null {
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

  const flashcardMaterials = raw.materials.filter(m => m.materialSlug === 'flashcards');
  if (flashcardMaterials.length === 0) return null;

  // Collect unique vocab keys across all flashcards materials.
  // Per Q1-(b) verification: multiple flashcards entries typically have identical
  // vocabKeys (print-format variants of same vocab set). Union semantics handle
  // any edge cases where entries differ.
  const vocabKeysSet = new Set<string>();
  let firstThemeDir: string | null = null;

  for (const m of flashcardMaterials) {
    const cp = m.customizationParameters || {};
    if (cp.imageSource === 'vocabKeyList' && Array.isArray(cp.vocabKeys)) {
      cp.vocabKeys.forEach(k => vocabKeysSet.add(k));
    } else if (cp.imageSource === 'theme' && cp.themeName) {
      const cardCount = cp.cardCount || 10;
      const themeImages = pickThemeImages(cp.themeName, cardCount);
      themeImages.forEach(filename => vocabKeysSet.add(normalizeKey(filename)));
      if (!firstThemeDir) {
        firstThemeDir = resolveThemeDir(cp.themeName);
      }
    }
  }

  if (vocabKeysSet.size === 0) {
    console.warn(`WARN no vocab keys resolved for package '${packageDir}'`);
    return null;
  }

  return {
    slug: raw.targetSlug || packageDir,
    vocabKeys: Array.from(vocabKeysSet),
    themeDir: firstThemeDir,
  };
}

/**
 * Load all packages with flashcards material from PACKAGES_ROOT.
 * Returns map of slug → FlashcardPackage.
 */
export function loadAllPackages(): Map<string, FlashcardPackage> {
  const out = new Map<string, FlashcardPackage>();
  const dirs = fs.readdirSync(PACKAGES_ROOT)
    .filter(d => fs.statSync(path.join(PACKAGES_ROOT, d)).isDirectory());

  for (const dir of dirs) {
    const pkg = loadOnePackage(dir);
    if (pkg) out.set(pkg.slug, pkg);
  }

  return out;
}

/**
 * Load specific packages by slug list.
 */
export function loadPackagesBySlugs(slugs: string[]): Map<string, FlashcardPackage> {
  const out = new Map<string, FlashcardPackage>();
  for (const slug of slugs) {
    const pkg = loadOnePackage(slug);
    if (pkg) out.set(pkg.slug, pkg);
    else console.warn(`WARN no flashcards material for package '${slug}'`);
  }
  return out;
}

/**
 * Resolve vocab keys to image file paths for the render pipeline.
 * Looks in image library theme dirs for matching filenames.
 * Returns (key, imagePath, themeDir) tuples; skips unresolvable keys with warning.
 */
export interface ResolvedImage {
  vocabKey: string;
  imagePath: string;
  themeDir: string;
}

const _themeDirCache: Map<string, string[]> = new Map();
function listThemeDirs(): string[] {
  if (_themeDirCache.has('all')) return _themeDirCache.get('all')!;
  const dirs = fs.readdirSync(IMAGE_LIBRARY_ROOT)
    .filter(d => {
      try { return fs.statSync(path.join(IMAGE_LIBRARY_ROOT, d)).isDirectory(); }
      catch { return false; }
    })
    .filter(d => !/(bw|^BORDERS$|^BACKGROUNDS$)/i.test(d)); // color only
  _themeDirCache.set('all', dirs);
  return dirs;
}

/**
 * Find an image file matching the given vocab key across color theme dirs.
 * Returns the first match (theme dir + image path).
 * Vocab key in canonical form (e.g., "cat"); image filenames may have variant
 * suffixes (e.g., "cat 2.png") which normalize to the same key.
 */
function findImageForVocabKey(vocabKey: string, preferredThemeDir: string | null = null): { themeDir: string; imagePath: string } | null {
  const themeDirs = listThemeDirs();
  // Prefer the package's theme dir if specified
  const ordered = preferredThemeDir
    ? [preferredThemeDir, ...themeDirs.filter(d => d !== preferredThemeDir)]
    : themeDirs;

  for (const themeDir of ordered) {
    const themePath = path.join(IMAGE_LIBRARY_ROOT, themeDir);
    let files: string[];
    try {
      files = fs.readdirSync(themePath).filter(f => f.toLowerCase().endsWith('.png'));
    } catch {
      continue;
    }
    // Match: filename normalizes to vocabKey, OR exact match after stripping .png
    for (const file of files) {
      const norm = normalizeKey(file);
      if (norm === vocabKey) {
        return { themeDir, imagePath: path.join(themePath, file) };
      }
    }
  }
  return null;
}

export function resolveImagesForPackage(pkg: FlashcardPackage): ResolvedImage[] {
  const out: ResolvedImage[] = [];
  for (const vocabKey of pkg.vocabKeys) {
    const found = findImageForVocabKey(vocabKey, pkg.themeDir);
    if (found) {
      out.push({ vocabKey, imagePath: found.imagePath, themeDir: found.themeDir });
    } else {
      console.warn(`WARN no image found for vocabKey='${vocabKey}' in package='${pkg.slug}'`);
    }
  }
  return out;
}
