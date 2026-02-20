/**
 * Cross-theme grade-level linking.
 *
 * Given a theme + grade, returns links to the SAME grade page of
 * other themes — split into "same category" and "other categories".
 * Fills the SEO gap where grade pages only link within their own theme.
 */

import { THEME_CATEGORIES, getCategoryForTheme } from '@/config/theme-categories';
import { getThemeSlug } from '@/config/theme-slugs';
import { getGradeSlug } from '@/config/grade-slugs';
import { getThemeContentWithFallback } from '@/content/themes/index';
import type { ThemeId } from '@/content/themes/types';

export interface CrossThemeLink {
  themeId: string;
  themeName: string;
  href: string;
  categoryId: string;
  categoryLabel: string;
}

export interface CrossThemeGradeLinks {
  sameCategory: CrossThemeLink[];
  otherCategories: CrossThemeLink[];
}

/**
 * Get cross-theme links for a grade page.
 *
 * @param currentThemeId  - Current theme (excluded from results)
 * @param gradeId         - Grade level to link to
 * @param locale          - Current locale
 * @param maxSameCategory - Max links from the same category (default 4)
 * @param maxOtherCategories - Max links from other categories, one per cat (default 4)
 */
export function getCrossThemeGradeLinks(
  currentThemeId: string,
  gradeId: string,
  locale: string,
  maxSameCategory = 4,
  maxOtherCategories = 4,
): CrossThemeGradeLinks {
  const currentCategory = getCategoryForTheme(currentThemeId);
  const gradeSlug = getGradeSlug(gradeId, locale);
  if (!gradeSlug) return { sameCategory: [], otherCategories: [] };

  // Gather relatedThemes to exclude (already linked by the hand-picked section)
  const currentContent = getThemeContentWithFallback(currentThemeId, locale);
  const excludeSet = new Set<string>([currentThemeId]);
  if (currentContent) {
    for (const rt of currentContent.relatedThemes) {
      excludeSet.add(rt);
    }
  }

  const sameCategory: CrossThemeLink[] = [];
  const otherCategories: CrossThemeLink[] = [];

  // Same-category themes first
  if (currentCategory) {
    for (const themeId of currentCategory.themes) {
      if (excludeSet.has(themeId) || sameCategory.length >= maxSameCategory) continue;
      const link = buildLink(themeId as ThemeId, gradeSlug, locale, currentCategory.id, currentCategory.label[locale] || currentCategory.label.en);
      if (link) sameCategory.push(link);
    }
  }

  // One theme per OTHER category (round-robin)
  let collected = 0;
  for (const cat of THEME_CATEGORIES) {
    if (collected >= maxOtherCategories) break;
    if (cat.id === currentCategory?.id) continue;

    for (const themeId of cat.themes) {
      if (excludeSet.has(themeId)) continue;
      const link = buildLink(themeId as ThemeId, gradeSlug, locale, cat.id, cat.label[locale] || cat.label.en);
      if (link) {
        otherCategories.push(link);
        collected++;
        break; // one per category
      }
    }
  }

  return { sameCategory, otherCategories };
}

function buildLink(
  themeId: ThemeId,
  gradeSlug: string,
  locale: string,
  categoryId: string,
  categoryLabel: string,
): CrossThemeLink | null {
  const themeSlug = getThemeSlug(themeId, locale);
  const content = getThemeContentWithFallback(themeId, locale);
  if (!themeSlug || !content) return null;

  return {
    themeId,
    themeName: content.name,
    href: `/${locale}/worksheets/${themeSlug}/${gradeSlug}`,
    categoryId,
    categoryLabel,
  };
}
