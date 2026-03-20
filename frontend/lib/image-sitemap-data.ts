/**
 * Image sitemap data helper.
 * Extracts image entries from showcase configs for use in image sitemaps.
 */

import { getLocalizedShowcaseConfig } from '@/app/[locale]/apps/[slug]/showcase/showcase-configs';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Slug-appId → WP-appId mapping (same as in apps/tools pages)
const slugAppToWpApp: Record<string, string> = {
  'word-search': 'wordsearch',
  'image-addition': 'addition',
  'matching-app': 'matching',
  'picture-bingo': 'bingo',
  'big-small-app': 'big-small',
  'chart-count-color': 'chart-count',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'writing-app': 'writing',
};

export interface ImageSitemapEntry {
  loc: string;
  title: string;
  caption: string;
  license: string;
}

/**
 * Get up to 5 image entries for a given app and locale.
 * Returns images from showcase hero + tiered + spotlight configs.
 */
export function getAppImageEntries(appId: string, locale: string): ImageSitemapEntry[] {
  const wpId = slugAppToWpApp[appId] || appId;
  const config = getLocalizedShowcaseConfig(wpId, locale === 'en' ? 'en' : locale);

  if (!config) return [];

  const images: ImageSitemapEntry[] = [];
  const seen = new Set<string>();
  const licenseUrl = `${baseUrl}/${locale}/license`;

  function addImage(src: string, alt: string) {
    if (images.length >= 5) return;
    // Showcase config paths are already URL-encoded by img()/imgUrl() — don't double-encode
    const fullUrl = `${baseUrl}${src}`;
    if (seen.has(fullUrl)) return;
    seen.add(fullUrl);
    images.push({
      loc: fullUrl,
      title: alt,
      caption: alt,
      license: licenseUrl,
    });
  }

  // Hero images (3)
  for (const img of config.hero.images) {
    addImage(img.src, img.alt);
  }

  // Spotlight image (1)
  if (config.spotlight?.image) {
    addImage(config.spotlight.image.src, config.spotlight.image.alt);
  }

  // Gallery items (up to 3)
  if (config.gallery?.items) {
    for (const item of config.gallery.items) {
      addImage(item.image.src, item.image.alt);
    }
  }

  return images;
}
