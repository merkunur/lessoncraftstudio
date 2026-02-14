import fs from 'fs/promises';
import path from 'path';
import { getLocalizedDisplayName } from '@/lib/homepage-samples-data';

// ── Image library base path ──────────────────────────────────────
// Production: isolated storage at /var/www/lcs-media/image-library/
// Dev: public/image-library/ fallback (optional)
const IMAGE_LIBRARY_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/image-library'
  : path.join(process.cwd(), 'public', 'image-library');

// Samples base path (same as homepage-samples-data.ts)
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Locale to language folder mapping (mirrors homepage-samples-data.ts)
const localeToFolder: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// Theme page app IDs → sample thumbnail app IDs
// Some app IDs differ between theme-page-content.ts and sample filenames
const themeAppToSampleApp: Record<string, string> = {
  'image-addition': 'addition',
  'chart-count-color': 'chart-count',
  'writing-app': 'writing',
  'word-search': 'wordsearch',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'matching-app': 'matching',
  'picture-bingo': 'bingo',
  'big-small-app': 'big-small',
};

// Theme ID → image library folder name mapping
// Most themes use themeId directly as folder name; these 13 differ
const themeToImageFolder: Record<string, string> = {
  body: 'body parts',
  xmas: 'christmas',
  school: 'classroom',
  farm: 'farm animals',
  forest: 'forest creatures',
  insects: 'insects and bugs',
  jobs: 'occupations',
  ocean: 'ocean life',
  transportation: 'vehicles',
  zoo: 'zoo animals',
  household: 'around the house',
  cooking: 'kitchen tools',
  construction: 'tools',
};

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get theme preview images from the image library.
 * Reads /var/www/lcs-media/image-library/{themeId}/ and returns up to `count` PNG URLs.
 * Returns empty array if directory doesn't exist (dev fallback).
 */
export async function getThemePreviewImages(themeId: string, count: number = 6): Promise<string[]> {
  const folderName = themeToImageFolder[themeId] || themeId;
  const dir = path.join(IMAGE_LIBRARY_BASE, folderName);

  try {
    const exists = await fileExists(dir);
    if (!exists) return [];

    const files = await fs.readdir(dir);
    const pngs = files
      .filter(f => f.toLowerCase().endsWith('.png'))
      .sort() // deterministic order
      .slice(0, count);

    const urlFolder = encodeURIComponent(folderName);
    return pngs.map(f => `/image-library/${urlFolder}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

/**
 * Get app thumbnail URLs for a list of theme-page app IDs.
 * Checks if each thumbnail exists on the filesystem and returns a map of appId → URL.
 * Uses the locale-specific sample folder.
 */
export async function getAppThumbnailMap(
  appIds: string[],
  locale: string,
): Promise<Record<string, string>> {
  const language = localeToFolder[locale];
  if (!language) return {};

  const dir = path.join(SAMPLES_BASE, language, 'homepage');
  const result: Record<string, string> = {};

  const checks = await Promise.all(
    appIds.map(async (appId) => {
      // Map theme-page app ID to sample filename app ID
      const sampleAppId = themeAppToSampleApp[appId] || appId;
      const thumbFile = `${sampleAppId}-thumbnail_thumb.webp`;
      const thumbPath = path.join(dir, thumbFile);
      const exists = await fileExists(thumbPath);
      return { appId, sampleAppId, exists };
    }),
  );

  for (const { appId, sampleAppId, exists } of checks) {
    if (exists) {
      result[appId] = `/samples/${language}/homepage/${sampleAppId}-thumbnail_thumb.webp`;
    }
  }

  return result;
}

/**
 * Get localized display name for a theme-page app ID.
 * Maps theme-page IDs to sample IDs, then looks up the localized name.
 */
export function getLocalizedAppDisplayName(themeAppId: string, locale: string): string {
  const sampleAppId = themeAppToSampleApp[themeAppId] || themeAppId;
  return getLocalizedDisplayName(sampleAppId, locale);
}
