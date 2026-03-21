/**
 * Image sitemap data helper.
 * Extracts image entries from showcase configs AND content visuals
 * for all 6 page types: apps, tools, guides, bundles, ideas, starts.
 */

import { getLocalizedShowcaseConfig } from '@/app/[locale]/apps/[slug]/showcase/showcase-configs';
import { getToolShowcaseConfig } from '@/config/tool-showcase-configs';
import { getPageShowcaseConfig } from '@/config/guide-showcase-configs';
import { getAppContent } from '@/config/app-content';
import { getToolContent } from '@/config/tool-content';
import { getGuideContent } from '@/config/guide-content';
import { getBundleContent } from '@/config/bundle-content';
import { getIdeaContent } from '@/config/idea-content';
import { getStartContent } from '@/config/start-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Slug-appId → WP-appId mapping (product-page-slugs use different IDs)
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

// ─── URL normalization ───
// Showcase paths are pre-encoded (/samples/english/addition/Addition%20Fun%201.webp)
// Content paths are raw (/samples/english/addition/Addition Fun 1.webp)
// This normalizes both to properly encoded absolute URLs.
function toAbsoluteUrl(path: string): string {
  return baseUrl + path
    .split('/')
    .map((seg, i) => (i === 0 ? seg : encodeURIComponent(decodeURIComponent(seg))))
    .join('/');
}

// ─── Shared showcase extractor ───
// Works with ShowcaseConfig, ToolShowcaseConfig, and PageShowcaseConfig
// since they all share the same hero/tiered/spotlight/gallery structure.
interface AnyShowcaseConfig {
  hero: { images: Array<{ src: string; alt: string }> };
  tiered: { tiers: Array<{ image: { src: string; alt: string } }> };
  spotlight: { image: { src: string; alt: string } };
  gallery: { items: Array<{ image: { src: string; alt: string } }> };
}

function extractShowcaseImages(
  config: AnyShowcaseConfig | null,
  seen: Set<string>,
  licenseUrl: string,
  entries: ImageSitemapEntry[],
): void {
  if (!config) return;

  function add(src: string, alt: string) {
    const loc = toAbsoluteUrl(src);
    if (seen.has(loc)) return;
    seen.add(loc);
    entries.push({ loc, title: alt, caption: alt, license: licenseUrl });
  }

  // Hero (3 images)
  for (const img of config.hero.images) add(img.src, img.alt);
  // Tiered (3 images)
  for (const tier of config.tiered.tiers) add(tier.image.src, tier.image.alt);
  // Spotlight (1 image)
  if (config.spotlight?.image) add(config.spotlight.image.src, config.spotlight.image.alt);
  // Gallery (3 images)
  if (config.gallery?.items) {
    for (const item of config.gallery.items) add(item.image.src, item.image.alt);
  }
}

// ─── Content visuals extractor (AppContent / ToolContent / BundleContent) ───
// These share: visuals.heroImages.primary + .secondary + sampleGallery[] + themeImages[]
function extractAppStyleVisuals(
  visuals: {
    heroImages: { primary: string; primaryAlt: string; secondary?: string; secondaryAlt?: string };
    sampleGallery: Array<{ src: string; alt: string }>;
  } | undefined,
  themeImages: Array<{ src: string; alt: string }> | undefined,
  seen: Set<string>,
  licenseUrl: string,
  entries: ImageSitemapEntry[],
): void {
  if (!visuals) return;

  function add(src: string, alt: string) {
    if (!src) return;
    const loc = toAbsoluteUrl(src);
    if (seen.has(loc)) return;
    seen.add(loc);
    entries.push({ loc, title: alt, caption: alt, license: licenseUrl });
  }

  add(visuals.heroImages.primary, visuals.heroImages.primaryAlt);
  if (visuals.heroImages.secondary) {
    add(visuals.heroImages.secondary, visuals.heroImages.secondaryAlt || visuals.heroImages.primaryAlt);
  }
  for (const img of visuals.sampleGallery) add(img.src, img.alt);
  if (themeImages) {
    for (const img of themeImages) add(img.src, img.alt);
  }
}

// ─── Content visuals extractor (GuideContent / StartContent) ───
// These share: visuals.heroImage + samples[] + themeImages[]
function extractGuideStyleVisuals(
  visuals: {
    heroImage: { src: string; alt: string };
    samples: Array<{ src: string; alt: string }>;
  } | undefined,
  themeImages: Array<{ src: string; alt: string }> | undefined,
  seen: Set<string>,
  licenseUrl: string,
  entries: ImageSitemapEntry[],
): void {
  if (!visuals) return;

  function add(src: string, alt: string) {
    if (!src) return;
    const loc = toAbsoluteUrl(src);
    if (seen.has(loc)) return;
    seen.add(loc);
    entries.push({ loc, title: alt, caption: alt, license: licenseUrl });
  }

  add(visuals.heroImage.src, visuals.heroImage.alt);
  for (const img of visuals.samples) add(img.src, img.alt);
  if (themeImages) {
    for (const img of themeImages) add(img.src, img.alt);
  }
}

// ═══════════════════════════════════════════════════════════════════
// PUBLIC API — one function per page type
// ═══════════════════════════════════════════════════════════════════

/** App detail pages — showcase (11 apps) + content visuals (all 33 apps) */
export async function getAppImageEntries(appId: string, locale: string): Promise<ImageSitemapEntry[]> {
  const wpId = slugAppToWpApp[appId] || appId;
  const licenseUrl = `${baseUrl}/${locale}/license`;
  const entries: ImageSitemapEntry[] = [];
  const seen = new Set<string>();

  // Showcase images (covers apps that have showcase configs)
  const showcase = getLocalizedShowcaseConfig(wpId, locale);
  extractShowcaseImages(showcase as AnyShowcaseConfig | null, seen, licenseUrl, entries);

  // Content visuals (covers all 33 apps × 11 locales)
  const content = await getAppContent(wpId, locale);
  if (content?.visuals) {
    extractAppStyleVisuals(content.visuals, content.visuals.themeImages, seen, licenseUrl, entries);
  }

  return entries;
}

/** Tool detail pages — tool showcase (all 33 tools) + content visuals */
export async function getToolImageEntries(toolId: string, locale: string): Promise<ImageSitemapEntry[]> {
  const licenseUrl = `${baseUrl}/${locale}/license`;
  const entries: ImageSitemapEntry[] = [];
  const seen = new Set<string>();

  const showcase = getToolShowcaseConfig(toolId, locale);
  extractShowcaseImages(showcase as AnyShowcaseConfig | null, seen, licenseUrl, entries);

  const content = await getToolContent(toolId, locale);
  if (content?.visuals) {
    extractAppStyleVisuals(
      { heroImages: { primary: content.visuals.heroImages.primary, primaryAlt: content.visuals.heroImages.primaryAlt }, sampleGallery: content.visuals.sampleGallery },
      undefined,
      seen, licenseUrl, entries,
    );
  }

  return entries;
}

/** Guide pages — page showcase + content visuals */
export async function getGuideImageEntries(guideId: string, locale: string): Promise<ImageSitemapEntry[]> {
  const licenseUrl = `${baseUrl}/${locale}/license`;
  const entries: ImageSitemapEntry[] = [];
  const seen = new Set<string>();

  const showcase = getPageShowcaseConfig('guide', guideId, locale);
  extractShowcaseImages(showcase as AnyShowcaseConfig | null, seen, licenseUrl, entries);

  const content = await getGuideContent(guideId, locale);
  if (content?.visuals) {
    extractGuideStyleVisuals(content.visuals, content.themeImages, seen, licenseUrl, entries);
  }

  return entries;
}

/** Bundle pages — page showcase + content visuals */
export async function getBundleImageEntries(bundleId: string, locale: string): Promise<ImageSitemapEntry[]> {
  const licenseUrl = `${baseUrl}/${locale}/license`;
  const entries: ImageSitemapEntry[] = [];
  const seen = new Set<string>();

  const showcase = getPageShowcaseConfig('bundle', bundleId, locale);
  extractShowcaseImages(showcase as AnyShowcaseConfig | null, seen, licenseUrl, entries);

  const content = await getBundleContent(bundleId, locale);
  if (content?.visuals) {
    extractAppStyleVisuals(content.visuals, content.themeImages, seen, licenseUrl, entries);
  }

  return entries;
}

/** Idea pages — page showcase + themeImages only */
export async function getIdeaImageEntries(ideaId: string, locale: string): Promise<ImageSitemapEntry[]> {
  const licenseUrl = `${baseUrl}/${locale}/license`;
  const entries: ImageSitemapEntry[] = [];
  const seen = new Set<string>();

  const showcase = getPageShowcaseConfig('idea', ideaId, locale);
  extractShowcaseImages(showcase as AnyShowcaseConfig | null, seen, licenseUrl, entries);

  const content = await getIdeaContent(ideaId, locale);
  if (content?.themeImages) {
    for (const img of content.themeImages) {
      if (!img.src) continue;
      const loc = toAbsoluteUrl(img.src);
      if (seen.has(loc)) continue;
      seen.add(loc);
      entries.push({ loc, title: img.alt, caption: img.alt, license: licenseUrl });
    }
  }

  return entries;
}

/** Start pages — page showcase + content visuals */
export async function getStartImageEntries(startId: string, locale: string): Promise<ImageSitemapEntry[]> {
  const licenseUrl = `${baseUrl}/${locale}/license`;
  const entries: ImageSitemapEntry[] = [];
  const seen = new Set<string>();

  const showcase = getPageShowcaseConfig('start', startId, locale);
  extractShowcaseImages(showcase as AnyShowcaseConfig | null, seen, licenseUrl, entries);

  const content = await getStartContent(startId, locale);
  if (content?.visuals) {
    extractGuideStyleVisuals(content.visuals, content.themeImages, seen, licenseUrl, entries);
  }

  return entries;
}

// ═══════════════════════════════════════════════════════════════════
// URL-only variants for Next.js sitemap `images` field (string[])
// ═══════════════════════════════════════════════════════════════════

export async function getAppImageUrls(appId: string, locale: string): Promise<string[]> {
  return (await getAppImageEntries(appId, locale)).map(e => e.loc);
}

export async function getToolImageUrls(toolId: string, locale: string): Promise<string[]> {
  return (await getToolImageEntries(toolId, locale)).map(e => e.loc);
}

export async function getGuideImageUrls(guideId: string, locale: string): Promise<string[]> {
  return (await getGuideImageEntries(guideId, locale)).map(e => e.loc);
}

export async function getBundleImageUrls(bundleId: string, locale: string): Promise<string[]> {
  return (await getBundleImageEntries(bundleId, locale)).map(e => e.loc);
}

export async function getIdeaImageUrls(ideaId: string, locale: string): Promise<string[]> {
  return (await getIdeaImageEntries(ideaId, locale)).map(e => e.loc);
}

export async function getStartImageUrls(startId: string, locale: string): Promise<string[]> {
  return (await getStartImageEntries(startId, locale)).map(e => e.loc);
}
