import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';

/**
 * Maps WarriorPlus appId -> slug-config appId
 * (inverse of slugAppToWpApp in apps/[slug]/page.tsx)
 */
const wpAppToSlugApp: Record<string, string> = {
  'wordsearch': 'word-search',
  'addition': 'image-addition',
  'matching': 'matching-app',
  'bingo': 'picture-bingo',
  'big-small': 'big-small-app',
  'chart-count': 'chart-count-color',
  'crossword': 'image-crossword',
  'cryptogram': 'image-cryptogram',
  'writing': 'writing-app',
};

/**
 * Resolve a WarriorPlus appId to the correct locale-specific URL slug.
 * Falls back to the input appId if no mapping is found.
 */
export function resolveWpAppIdToSlug(wpAppId: string, locale: SupportedLocale): string {
  const slugAppId = wpAppToSlugApp[wpAppId] || wpAppId;
  return getSlugForLocale(slugAppId, locale) || wpAppId;
}
