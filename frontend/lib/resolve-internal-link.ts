import { getAppConfigBySlug, getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import { getGuideConfigBySlug, getGuideSlugForLocale } from '@/config/guide-page-slugs';
import { getToolConfigBySlug, getToolSlugForLocale } from '@/config/tool-page-slugs';
import { getBundleConfigBySlug, getBundleSlugForLocale } from '@/config/bundle-page-slugs';
import { getStartConfigBySlug, getStartSlugForLocale } from '@/config/start-page-slugs';
import { getIdeaConfigBySlug, getIdeaSlugForLocale } from '@/config/idea-page-slugs';
import { getBlogConfigBySlug, getBlogSlugForLocale } from '@/config/blog-page-slugs';

/**
 * Validates that an internal link slug exists in the corresponding page config.
 * Used as a safety net to prevent 404 links from appearing on pages.
 */
export function isValidInternalLink(pageType: string, slug: string): boolean {
  switch (pageType) {
    case 'app': return !!getAppConfigBySlug(slug);
    case 'guide': return !!getGuideConfigBySlug(slug);
    case 'tool': return !!getToolConfigBySlug(slug);
    case 'bundle': return !!getBundleConfigBySlug(slug);
    case 'start': return !!getStartConfigBySlug(slug);
    case 'idea': return !!getIdeaConfigBySlug(slug);
    case 'blog': return !!getBlogConfigBySlug(slug);
    default: return false;
  }
}

/**
 * Resolves an internal link slug to the locale-specific slug.
 * Returns the localized slug, or undefined if not found.
 */
export function resolveInternalLinkSlug(pageType: string, slug: string, locale: string): string | undefined {
  const loc = locale as SupportedLocale;
  switch (pageType) {
    case 'app': {
      const c = getAppConfigBySlug(slug);
      return c ? getSlugForLocale(c.appId, loc) : undefined;
    }
    case 'guide': {
      const c = getGuideConfigBySlug(slug);
      return c ? getGuideSlugForLocale(c.guideId, loc) : undefined;
    }
    case 'tool': {
      const c = getToolConfigBySlug(slug);
      return c ? getToolSlugForLocale(c.toolId, loc) : undefined;
    }
    case 'bundle': {
      const c = getBundleConfigBySlug(slug);
      return c ? getBundleSlugForLocale(c.bundleId, loc) : undefined;
    }
    case 'start': {
      const c = getStartConfigBySlug(slug);
      return c ? getStartSlugForLocale(c.startId, loc) : undefined;
    }
    case 'idea': {
      const c = getIdeaConfigBySlug(slug);
      return c ? getIdeaSlugForLocale(c.ideaId, loc) : undefined;
    }
    case 'blog': {
      const c = getBlogConfigBySlug(slug);
      return c ? getBlogSlugForLocale(c.blogId, loc) : undefined;
    }
    default: return undefined;
  }
}
