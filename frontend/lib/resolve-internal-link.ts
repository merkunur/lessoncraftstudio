import { getAppConfigBySlug } from '@/config/product-page-slugs';
import { getGuideConfigBySlug } from '@/config/guide-page-slugs';
import { getToolConfigBySlug } from '@/config/tool-page-slugs';
import { getBundleConfigBySlug } from '@/config/bundle-page-slugs';
import { getStartConfigBySlug } from '@/config/start-page-slugs';
import { getIdeaConfigBySlug } from '@/config/idea-page-slugs';
import { getBlogConfigBySlug } from '@/config/blog-page-slugs';

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
