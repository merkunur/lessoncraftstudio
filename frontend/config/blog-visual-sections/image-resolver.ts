/**
 * image-resolver.ts — Resolves blog image references to locale-correct URLs.
 *
 * Uses the same infrastructure as app detail pages:
 * - appData (English filenames) from guide-showcase-configs.ts
 * - Per-language showcase-images configs for de/fr/es/pt/it/nl/sv/da
 * - Falls back to English for no/fi (no showcase-images configs)
 */

import { appData } from '@/config/guide-showcase-configs';
import { imgUrl } from '@/config/showcase-i18n';
import { germanImages } from '@/config/german-showcase-images';
import { frenchImages } from '@/config/french-showcase-images';
import { spanishImages } from '@/config/spanish-showcase-images';
import { portugueseImages } from '@/config/portuguese-showcase-images';
import { italianImages } from '@/config/italian-showcase-images';
import { dutchImages } from '@/config/dutch-showcase-images';
import { swedishImages } from '@/config/swedish-showcase-images';
import { danishImages } from '@/config/danish-showcase-images';

interface LocaleImageSet {
  folder: string;
  imgs: string[];
  answerKey: string;
}

/** Get the locale-specific image set for an app, or fall back to English */
function getImageSet(appKey: string, locale: string): { folder: string; imgs: string[]; answerKey: string } {
  const en = appData[appKey];
  if (!en) return { folder: 'addition', imgs: ['Addition Fun 10.webp'], answerKey: 'Addition Fun 10 answer_key.webp' };

  let localeSet: LocaleImageSet | undefined;
  if (locale === 'de') localeSet = germanImages[appKey];
  else if (locale === 'fr') localeSet = frenchImages[appKey];
  else if (locale === 'es') localeSet = spanishImages[appKey];
  else if (locale === 'pt') localeSet = portugueseImages[appKey];
  else if (locale === 'it') localeSet = italianImages[appKey];
  else if (locale === 'nl') localeSet = dutchImages[appKey];
  else if (locale === 'sv') localeSet = swedishImages[appKey];
  else if (locale === 'da') localeSet = danishImages[appKey];

  if (localeSet) {
    return { folder: localeSet.folder, imgs: localeSet.imgs, answerKey: localeSet.answerKey };
  }

  // English / no / fi — use English appData
  return { folder: en.folder, imgs: en.imgs, answerKey: en.answerKey };
}

/** Resolve a blog image ref to a full URL for the given locale */
export function resolveBlogImageUrl(appKey: string, idx: number, locale: string): string {
  const set = getImageSet(appKey, locale);
  const safeIdx = idx % set.imgs.length;
  // For non-English locales with a showcase config, use that locale; otherwise English
  const effectiveLocale = (locale !== 'en' && locale !== 'no' && locale !== 'fi' && getImageSet(appKey, locale).imgs !== appData[appKey]?.imgs)
    ? locale
    : 'en';
  return imgUrl(set.folder, set.imgs[safeIdx], effectiveLocale);
}

/** Resolve an answer key image URL for the given locale */
export function resolveBlogAnswerKeyUrl(appKey: string, locale: string): string {
  const set = getImageSet(appKey, locale);
  const effectiveLocale = (locale !== 'en' && locale !== 'no' && locale !== 'fi' && getImageSet(appKey, locale).answerKey !== appData[appKey]?.answerKey)
    ? locale
    : 'en';
  return imgUrl(set.folder, set.answerKey, effectiveLocale);
}

/** Get the folder name for an app (for alt text purposes) */
export function getAppFolder(appKey: string): string {
  return appData[appKey]?.folder || appKey;
}

/** Get the display label for an app */
export function getAppLabel(appKey: string): string {
  return appData[appKey]?.label || appKey;
}
