import { cache } from 'react';
import { prisma } from './prisma';
import { getKeywordsForApp } from './internal-linking';

// Blog post metadata interface (matches BlogPageClient)
export interface BlogPostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage?: string | null;
  hasSampleWorksheets?: boolean;
}

// Category interface
export interface BlogCategory {
  id: string;
  label: string;
}

// Default categories with translations (fallback)
const DEFAULT_CATEGORIES = [
  {
    id: 'teaching-resources',
    translations: {
      en: 'Teaching Resources', de: 'Unterrichtsmaterialien', fr: 'Ressources p\u00e9dagogiques',
      es: 'Recursos did\u00e1cticos', pt: 'Recursos de ensino', it: 'Risorse didattiche',
      nl: 'Onderwijsmiddelen', sv: 'Undervisningsresurser', da: 'Undervisningsressourcer',
      no: 'Undervisningsressurser', fi: 'Opetusresurssit'
    }
  },
  {
    id: 'worksheet-tips',
    translations: {
      en: 'Worksheet Tips', de: 'Arbeitsblatt-Tipps', fr: 'Conseils sur les fiches',
      es: 'Consejos de hojas de trabajo', pt: 'Dicas de planilhas', it: 'Suggerimenti per fogli di lavoro',
      nl: 'Werkblad tips', sv: 'Arbetsbladstips', da: 'Arbejdsarkstips',
      no: 'Arbeidsarktips', fi: 'Ty\u00f6arkkivinkkej\u00e4'
    }
  },
  {
    id: 'educational-activities',
    translations: {
      en: 'Educational Activities', de: 'Bildungsaktivit\u00e4ten', fr: 'Activit\u00e9s \u00e9ducatives',
      es: 'Actividades educativas', pt: 'Atividades educacionais', it: 'Attivit\u00e0 educative',
      nl: 'Educatieve activiteiten', sv: 'Utbildningsaktiviteter', da: 'Uddannelsesaktiviteter',
      no: 'Utdanningsaktiviteter', fi: 'Koulutustoimintaa'
    }
  },
  {
    id: 'learning-strategies',
    translations: {
      en: 'Learning Strategies', de: 'Lernstrategien', fr: "Strat\u00e9gies d'apprentissage",
      es: 'Estrategias de aprendizaje', pt: 'Estrat\u00e9gias de aprendizagem', it: 'Strategie di apprendimento',
      nl: 'Leerstrategieën', sv: 'Inl\u00e4rningsstrategier', da: 'L\u00e6ringsstrategier',
      no: 'L\u00e6ringsstrategier', fi: 'Oppimisstrategiat'
    }
  },
  {
    id: 'curriculum-guides',
    translations: {
      en: 'Curriculum Guides', de: 'Lehrplan-Leitf\u00e4den', fr: 'Guides du programme',
      es: 'Gu\u00edas del curr\u00edculo', pt: 'Guias de curr\u00edculo', it: 'Guide del curriculum',
      nl: 'Curriculumgidsen', sv: 'L\u00e4roplansguider', da: 'L\u00e6seplansguider',
      no: 'L\u00e6replansveiledninger', fi: 'Opetussuunnitelmaoppaat'
    }
  },
  {
    id: 'parent-resources',
    translations: {
      en: 'Parent Resources', de: 'Elternressourcen', fr: 'Ressources pour les parents',
      es: 'Recursos para padres', pt: 'Recursos para pais', it: 'Risorse per i genitori',
      nl: 'Ouderhulpmiddelen', sv: 'F\u00f6r\u00e4ldraresurser', da: 'For\u00e6ldreressourcer',
      no: 'Foreldreressurser', fi: 'Vanhempien resurssit'
    }
  },
  {
    id: 'seasonal-content',
    translations: {
      en: 'Seasonal Content', de: 'Saisonale Inhalte', fr: 'Contenu saisonnier',
      es: 'Contenido estacional', pt: 'Conte\u00fado sazonal', it: 'Contenuti stagionali',
      nl: 'Seizoensgebonden inhoud', sv: 'S\u00e4songsinneh\u00e5ll', da: 'S\u00e6sonindhold',
      no: 'Sesonginnhold', fi: 'Kauden sis\u00e4lt\u00f6'
    }
  }
];

// ============================================================
// In-memory cache for blog listing (persists across requests on VPS/PM2)
// ============================================================
const LISTING_CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const listingCache = new Map<string, { data: BlogPostMetadata[]; timestamp: number }>();

/**
 * Invalidate the blog listing cache for all locales.
 * Call this after creating/updating/deleting blog posts via the CMS.
 */
export function invalidateBlogListingCache() {
  listingCache.clear();
}

/**
 * Estimate reading time from excerpt length (avoids loading full HTML content).
 * Blog posts in this CMS average 1000-2000 words = 5-10 min read.
 * Excerpt length loosely correlates with post length.
 */
function estimateReadingTime(excerpt: string): number {
  if (!excerpt || excerpt.length < 50) return 5;
  if (excerpt.length < 150) return 5;
  if (excerpt.length < 300) return 7;
  return 8;
}

// Raw SQL result type
interface RawBlogListingRow {
  slug: string;
  category: string | null;
  featured_image: string | null;
  created_at: Date;
  pdf_count: number;
  t_slug: string | null;
  t_title: string | null;
  t_excerpt: string | null;
  t_author: string | null;
  t_featured_image: string | null;
}

/**
 * Fetch blog posts for a specific locale (server-side) - OPTIMIZED
 *
 * Optimizations over original:
 * 1. Raw SQL extracts only 5 small text fields per locale (not entire translations blob)
 * 2. In-memory cache with 30-min TTL (PM2 long-lived process)
 * 3. React.cache() deduplicates within same server request
 * 4. Estimated reading time (no HTML parsing)
 */
async function _getBlogPostsForLocale(locale: string): Promise<BlogPostMetadata[]> {
  // Check in-memory cache first
  const cached = listingCache.get(locale);
  if (cached && Date.now() - cached.timestamp < LISTING_CACHE_TTL) {
    return cached.data;
  }

  try {
    const rows = await prisma.$queryRaw<RawBlogListingRow[]>`
      SELECT
        bp.slug,
        bp.category,
        bp.featured_image,
        bp.created_at,
        (SELECT COUNT(*)::int FROM blog_pdfs WHERE post_id = bp.id) as pdf_count,
        jsonb_extract_path_text(bp.translations, ${locale}, 'slug') as t_slug,
        jsonb_extract_path_text(bp.translations, ${locale}, 'title') as t_title,
        jsonb_extract_path_text(bp.translations, ${locale}, 'excerpt') as t_excerpt,
        jsonb_extract_path_text(bp.translations, ${locale}, 'author') as t_author,
        jsonb_extract_path_text(bp.translations, ${locale}, 'featuredImage') as t_featured_image
      FROM blog_posts bp
      WHERE bp.status = 'published'
        AND jsonb_extract_path_text(bp.translations, ${locale}, 'title') IS NOT NULL
        AND jsonb_extract_path_text(bp.translations, ${locale}, 'content') IS NOT NULL
        AND jsonb_extract_path_text(bp.translations, ${locale}, 'slug') IS NOT NULL
      ORDER BY bp.created_at DESC
    `;

    const posts: BlogPostMetadata[] = rows.map(row => ({
      slug: row.t_slug!,
      title: row.t_title || row.slug,
      excerpt: row.t_excerpt || '',
      author: row.t_author || 'LessonCraftStudio Team',
      date: new Date(row.created_at).toISOString().split('T')[0],
      category: row.category || 'teaching-resources',
      readTime: `${estimateReadingTime(row.t_excerpt || '')} min read`,
      featuredImage: row.t_featured_image || row.featured_image,
      hasSampleWorksheets: row.pdf_count > 0
    }));

    // Store in cache
    listingCache.set(locale, { data: posts, timestamp: Date.now() });

    return posts;
  } catch (error) {
    console.error(`Error fetching blog posts for locale ${locale}:`, error);
    return [];
  }
}

// React.cache() wrapper - deduplicates within same server render
// (generateMetadata + page component share the same request)
export const getBlogPostsForLocale = cache(_getBlogPostsForLocale);

/**
 * Get blog categories for a specific locale (server-side)
 */
export function getBlogCategoriesForLocale(locale: string): BlogCategory[] {
  return DEFAULT_CATEGORIES.map(cat => ({
    id: cat.id,
    label: cat.translations[locale as keyof typeof cat.translations] || cat.translations.en
  }));
}

/**
 * Blog post summary for product page linking
 */
export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  category: string;
}

/**
 * Fetch recent blog posts for a locale (server-side)
 * Used as fallback when no keyword matches are found
 *
 * @param locale - Target locale
 * @param limit - Maximum number of posts to return (default: 3)
 * @returns Array of blog post summaries
 */
export async function getRecentBlogPosts(
  locale: string,
  limit: number = 3
): Promise<BlogPostSummary[]> {
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      take: limit * 2 // Fetch extra to account for filtering
    });

    const posts: BlogPostSummary[] = dbPosts
      .filter(post => {
        const translations = post.translations as any;
        const translation = translations[locale];
        return translation && translation.title && translation.content && translation.slug;
      })
      .slice(0, limit)
      .map(post => {
        const translations = post.translations as any;
        const translation = translations[locale];
        const categoryData = DEFAULT_CATEGORIES.find(c => c.id === post.category);
        const categoryLabel = categoryData
          ? categoryData.translations[locale as keyof typeof categoryData.translations] || categoryData.translations.en
          : post.category || 'Teaching Resources';

        return {
          slug: translation.slug,
          title: translation.title || post.slug,
          excerpt: translation.excerpt || '',
          featuredImage: translation.featuredImage || post.featuredImage,
          category: categoryLabel
        };
      });

    return posts;
  } catch (error) {
    console.error(`Error fetching recent blog posts for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Fetch related blog posts for a product page (server-side)
 * Matches blog posts by keywords that are relevant to the app
 *
 * @param appKeywords - Keywords associated with the app/product
 * @param locale - Target locale
 * @param limit - Maximum number of posts to return (default: 3)
 * @returns Array of blog post summaries
 */
export async function getRelatedBlogPostsForProduct(
  appKeywords: string[],
  locale: string,
  limit: number = 3
): Promise<BlogPostSummary[]> {
  try {
    // If no keywords provided, return recent posts as fallback
    if (!appKeywords || appKeywords.length === 0) {
      return getRecentBlogPosts(locale, limit);
    }

    // Fetch published blog posts that have any of the app keywords
    const dbPosts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        keywords: { hasSome: appKeywords }
      },
      orderBy: { createdAt: 'desc' },
      take: limit * 2 // Fetch extra to account for filtering
    });

    const posts: BlogPostSummary[] = dbPosts
      .filter(post => {
        const translations = post.translations as any;
        const translation = translations[locale];
        // Only include posts with translations AND a locale-specific slug
        return translation && translation.title && translation.content && translation.slug;
      })
      .slice(0, limit)
      .map(post => {
        const translations = post.translations as any;
        const translation = translations[locale];
        const categoryData = DEFAULT_CATEGORIES.find(c => c.id === post.category);
        const categoryLabel = categoryData
          ? categoryData.translations[locale as keyof typeof categoryData.translations] || categoryData.translations.en
          : post.category || 'Teaching Resources';

        return {
          slug: translation.slug,
          title: translation.title || post.slug,
          excerpt: translation.excerpt || '',
          featuredImage: translation.featuredImage || post.featuredImage,
          category: categoryLabel
        };
      });

    // If not enough posts from keyword match, get recent posts as fallback
    if (posts.length < limit) {
      const existingSlugs = posts.map(p => p.slug);
      const fallbackPosts = await prisma.blogPost.findMany({
        where: {
          status: 'published',
          slug: { notIn: existingSlugs.length > 0 ? existingSlugs : ['_none_'] }
        },
        orderBy: { createdAt: 'desc' },
        take: limit - posts.length
      });

      for (const post of fallbackPosts) {
        const translations = post.translations as any;
        const translation = translations[locale];
        if (translation && translation.title && translation.content && translation.slug) {
          const categoryData = DEFAULT_CATEGORIES.find(c => c.id === post.category);
          const categoryLabel = categoryData
            ? categoryData.translations[locale as keyof typeof categoryData.translations] || categoryData.translations.en
            : post.category || 'Teaching Resources';

          posts.push({
            slug: translation.slug,
            title: translation.title || post.slug,
            excerpt: translation.excerpt || '',
            featuredImage: translation.featuredImage || post.featuredImage,
            category: categoryLabel
          });
        }

        if (posts.length >= limit) break;
      }
    }

    return posts;
  } catch (error) {
    console.error(`Error fetching related blog posts for product:`, error);
    return [];
  }
}

/**
 * Fetch related blog posts for a theme page (server-side)
 * Aggregates keywords from the theme's curated apps, then delegates
 * to getRelatedBlogPostsForProduct() for the actual DB query.
 *
 * @param themeId - The theme identifier (e.g. 'animals', 'food')
 * @param appIds - App IDs belonging to this theme (passed from caller to avoid circular deps)
 * @param locale - Target locale
 * @param limit - Maximum number of posts to return (default: 3)
 * @returns Array of blog post summaries
 */
export async function getRelatedBlogPostsForTheme(
  themeId: string,
  appIds: string[],
  locale: string,
  limit: number = 3
): Promise<BlogPostSummary[]> {
  // Aggregate keywords from all apps, counting frequency
  const keywordFreq = new Map<string, number>();

  for (const appId of appIds) {
    const appKeywords = getKeywordsForApp(appId);
    for (const kw of appKeywords) {
      keywordFreq.set(kw, (keywordFreq.get(kw) || 0) + 1);
    }
  }

  // Add the themeId itself as a high-weight keyword
  keywordFreq.set(themeId, (keywordFreq.get(themeId) || 0) + 5);

  // Take top 15 keywords by frequency
  const themeKeywords = Array.from(keywordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([kw]) => kw);

  return getRelatedBlogPostsForProduct(themeKeywords, locale, limit);
}
