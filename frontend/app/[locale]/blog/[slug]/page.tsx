import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { generateBlogSchemas, ogLocaleMap, getHreflangCode, generateImageGallerySchema } from '@/lib/schema-generator';
import { analyzeContent, generateFAQSchema, generateHowToSchema } from '@/lib/content-analyzer';
import Breadcrumb from '@/components/Breadcrumb';
import { SUPPORTED_LOCALES } from '@/config/locales';
import RelatedProducts from '@/components/blog/RelatedProducts';
import BlogSampleBanner from '@/components/blog/BlogSampleBanner';
import BlogSampleGallery from '@/components/blog/BlogSampleGallery';
import { discoverSamplesFromFilesystem, normalizeAppIdForSamples } from '@/lib/sample-utils';
import { getBlogSampleApps } from '@/lib/blog-topic-clusters';
import { transformBlogLinks, injectInternalLinks } from '@/lib/blog-link-transformer';
import { injectBlogLinks } from '@/lib/blog-internal-links';
import { generateSchemaDescription } from '@/lib/blog-schema-utils';
import type { SupportedLocale } from '@/config/product-page-slugs';

// Enable ISR - revalidate every 30 minutes (reduced from 1 hour for faster updates)
export const revalidate = 1800;

/**
 * Generate SEO-optimized alt text for images
 * Prioritizes: focusKeyword > title > category > generic fallback
 * @param title - The title of the content
 * @param focusKeyword - The SEO focus keyword (optional)
 * @param category - The content category (optional)
 * @param type - The type of image ('featured', 'pdf', 'related')
 * @returns SEO-optimized alt text
 */
function generateAltText(
  title: string,
  focusKeyword?: string,
  category?: string,
  type: 'featured' | 'pdf' | 'related' = 'featured'
): string {
  const siteName = 'LessonCraftStudio';
  const truncatedTitle = title.length > 50 ? title.slice(0, 50).trim() : title;

  if (focusKeyword) {
    switch (type) {
      case 'pdf':
        return `${focusKeyword} worksheet - ${truncatedTitle} | ${siteName}`;
      case 'related':
        return `${focusKeyword} - ${truncatedTitle} | ${siteName}`;
      default:
        return `${focusKeyword} - ${truncatedTitle} | ${siteName}`;
    }
  }

  if (category) {
    switch (type) {
      case 'pdf':
        return `${category} worksheet sample - ${truncatedTitle} | ${siteName}`;
      case 'related':
        return `${category} educational resource - ${truncatedTitle} | ${siteName}`;
      default:
        return `${category} worksheet guide - ${truncatedTitle} | ${siteName}`;
    }
  }

  // Generic fallback with type-specific descriptions
  switch (type) {
    case 'pdf':
      return `Printable worksheet - ${truncatedTitle} | ${siteName}`;
    case 'related':
      return `Educational resource - ${truncatedTitle} | ${siteName}`;
    default:
      return `Educational worksheet resource - ${truncatedTitle} | ${siteName}`;
  }
}

// Shared in-memory slug cache for fast lookups (maps any slug -> primary slug)
let slugCache: Map<string, string> | null = null;
let cacheTimestamp: number = 0;
const SLUG_CACHE_TTL = 30 * 60 * 1000; // 30 minutes (aligned with ISR revalidation)

/**
 * Build/refresh the slug cache
 * Maps all language-specific slugs to their primary slug
 * OPTIMIZED: Raw SQL extracts only slugs (~2KB) instead of full translations blob (~30MB)
 */
async function buildSlugCache(): Promise<Map<string, string>> {
  const rows = await prisma.$queryRaw<Array<{ primary_slug: string; locale_slug: string }>>`
    SELECT
      bp.slug as primary_slug,
      value->>'slug' as locale_slug
    FROM blog_posts bp, jsonb_each(bp.translations)
    WHERE bp.status = 'published' AND value->>'slug' IS NOT NULL
  `;

  const cache = new Map<string, string>();
  for (const row of rows) {
    // Primary slug maps to itself (dedup via Map)
    cache.set(row.primary_slug, row.primary_slug);
    // Locale-specific slug maps to primary slug
    if (row.locale_slug) {
      cache.set(row.locale_slug, row.primary_slug);
    }
  }
  return cache;
}

/**
 * Get the slug cache, building it if expired or not initialized
 */
async function getSlugCache(): Promise<Map<string, string>> {
  const now = Date.now();
  if (!slugCache || now - cacheTimestamp > SLUG_CACHE_TTL) {
    slugCache = await buildSlugCache();
    cacheTimestamp = now;
  }
  return slugCache;
}

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

interface BlogPDF {
  id: string;
  title: string;
  description: string;
  filename: string;
  filePath: string;
  fileSize: number;
  thumbnail: string | null;
  price: string;
  downloads: number;
}

interface BlogPost {
  id: string;
  slug: string;
  translations: any;
  category: string;
  keywords: string[];
  featuredImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  pdfs: BlogPDF[];
}

// All 11 supported locale codes for raw SQL iteration
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'] as const;

/**
 * Fetch blog post from database - OPTIMIZED VERSION
 * Uses React cache() for request deduplication between generateMetadata() and page component
 * OPTIMIZED: Raw SQL extracts only current locale + English (~50KB) instead of full blob (~300KB)
 * Other locales get lightweight summaries (slug + title + content existence) for hreflang
 */
const getBlogPost = cache(async (slug: string, locale: string): Promise<BlogPost | null> => {
  try {
    // Step 1: Resolve slug to primary slug (for language-specific slugs)
    let lookupSlug = slug;
    const slugCacheMap = await getSlugCache();
    const primarySlug = slugCacheMap.get(slug);
    if (primarySlug) {
      lookupSlug = primarySlug;
    }

    // Step 2: Raw SQL - fetch scalar fields + targeted locale extractions
    // Uses jsonb_extract_path() for parameterized locale keys (safe with Prisma $queryRaw)
    const rows = await prisma.$queryRaw<Array<{
      id: string;
      slug: string;
      category: string;
      keywords: string[];
      featured_image: string | null;
      created_at: Date;
      updated_at: Date;
      locale_translation: any;
      en_translation: any;
      locale_summaries: any;
    }>>`
      SELECT
        bp.id,
        bp.slug,
        bp.category,
        bp.keywords,
        bp.featured_image,
        bp.created_at,
        bp.updated_at,
        jsonb_extract_path(bp.translations, ${locale}) as locale_translation,
        jsonb_extract_path(bp.translations, 'en') as en_translation,
        (SELECT jsonb_object_agg(
          key,
          jsonb_build_object(
            'slug', value->>'slug',
            'title', value->>'title',
            'content', CASE WHEN value->>'content' IS NOT NULL THEN '1' ELSE NULL END
          )
        ) FROM jsonb_each(bp.translations)) as locale_summaries
      FROM blog_posts bp
      WHERE bp.status = 'published'
        AND bp.slug = ${lookupSlug}
      LIMIT 1
    `;

    if (rows.length === 0) {
      console.log(`Blog post not found: slug="${slug}", locale="${locale}", lookupSlug="${lookupSlug}"`);
      return null;
    }

    const row = rows[0];

    // Step 3: Fetch PDFs for this locale (separate query - small result set)
    const pdfs = await prisma.blogPDF.findMany({
      where: { postId: row.id, language: locale },
      orderBy: { sortOrder: 'asc' }
    });

    // Step 4: Reconstruct compatible translations object
    // Full translation for current locale and English; lightweight summaries for others
    const translations: Record<string, any> = {};

    // Parse locale summaries (slug + title + content placeholder for all locales)
    const summaries = row.locale_summaries || {};
    for (const loc of ALL_LOCALES) {
      if (summaries[loc]) {
        translations[loc] = summaries[loc];
      }
    }

    // Override with full translations for current locale and English
    if (row.en_translation) {
      translations['en'] = row.en_translation;
    }
    if (row.locale_translation) {
      translations[locale] = row.locale_translation;
    }

    return {
      id: row.id,
      slug: row.slug,
      translations,
      category: row.category,
      keywords: row.keywords || [],
      featuredImage: row.featured_image,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      pdfs: pdfs.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        filename: p.filename,
        filePath: p.filePath,
        fileSize: p.fileSize,
        thumbnail: p.thumbnail,
        price: p.price,
        downloads: p.downloads,
      })),
    };
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
});

/**
 * Search all blog posts to find which language a slug belongs to.
 * Used for redirecting when a slug is accessed with the wrong language prefix.
 * Returns the correct locale if found, null otherwise.
 * OPTIMIZED: Raw SQL extracts only slug fields per locale instead of full blob
 */
async function findSlugLanguage(slug: string): Promise<string | null> {
  try {
    // Use slug cache to find the primary slug
    const slugCacheMap = await getSlugCache();
    const primarySlug = slugCacheMap.get(slug);

    if (!primarySlug) {
      return null; // Slug doesn't exist anywhere
    }

    // If slug is the primary slug, it's English
    if (slug === primarySlug) {
      return 'en';
    }

    // Raw SQL: extract only slug per locale for this one post
    const rows = await prisma.$queryRaw<Array<{ locale: string; locale_slug: string }>>`
      SELECT key as locale, value->>'slug' as locale_slug
      FROM blog_posts bp, jsonb_each(bp.translations)
      WHERE bp.status = 'published' AND bp.slug = ${primarySlug} AND value->>'slug' = ${slug}
      LIMIT 1
    `;

    if (rows.length > 0) {
      return rows[0].locale;
    }

    return 'en'; // Default to English if found in cache but not in translations
  } catch (error) {
    console.error('Error finding slug language:', error);
    return null;
  }
}

// Generate static params for all existing blog posts
// FIXED: Only generates routes for locales with actual translations to prevent 404 errors
// (Google Search Console reported 131+ 404 errors from generated routes for non-existent translations)
// OPTIMIZED: Raw SQL extracts only slug/title/content-existence per locale (~5KB) instead of full blob (~30MB)
export async function generateStaticParams() {
  try {
    const rows = await prisma.$queryRaw<Array<{
      primary_slug: string;
      locale: string;
      locale_slug: string | null;
      has_title: boolean;
      has_content: boolean;
    }>>`
      SELECT
        bp.slug as primary_slug,
        key as locale,
        value->>'slug' as locale_slug,
        (value->>'title' IS NOT NULL) as has_title,
        (value->>'content' IS NOT NULL) as has_content
      FROM blog_posts bp, jsonb_each(bp.translations)
      WHERE bp.status = 'published'
    `;

    const params = [];
    const seenEnglish = new Set<string>();

    for (const row of rows) {
      if (row.has_title && row.has_content) {
        const localeSlug = row.locale_slug || row.primary_slug;
        params.push({ locale: row.locale, slug: localeSlug });
        if (row.locale === 'en') {
          seenEnglish.add(row.primary_slug);
        }
      }
    }

    // Ensure English is always included for all posts
    const allSlugs = new Set(rows.map(r => r.primary_slug));
    for (const slug of allSlugs) {
      if (!seenEnglish.has(slug)) {
        params.push({ locale: 'en', slug });
      }
    }

    return params;
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return [];
  }
}

/**
 * Get related blog posts with cross-category support
 * Algorithm:
 * 1. 2 posts from same category (most relevant)
 * 2. 1 post from different category with keyword overlap (discovery)
 * 3. Fallback to recent posts if needed
 */
/**
 * Simple hash function for deterministic rotation based on slug.
 * Returns a positive integer derived from the input string.
 */
function slugHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

async function getRelatedPosts(currentSlug: string, category: string, keywords: string[] = [], limit: number = 3, locale: string = 'en') {
  try {
    // Raw SQL: extract only the fields rendering needs (~500 bytes/row vs ~300KB/row with full translations)
    type RelatedPostRow = {
      id: string;
      slug: string;
      featured_image: string | null;
      locale_slug: string | null;
      locale_title: string | null;
      locale_excerpt: string | null;
      locale_focus_keyword: string | null;
      en_slug: string | null;
      en_title: string | null;
      en_excerpt: string | null;
      en_focus_keyword: string | null;
    };

    function mapRow(row: RelatedPostRow) {
      return {
        id: row.id,
        slug: row.slug,
        featuredImage: row.featured_image,
        translations: {
          [locale]: { slug: row.locale_slug, title: row.locale_title, excerpt: row.locale_excerpt, focusKeyword: row.locale_focus_keyword },
          en: { slug: row.en_slug, title: row.en_title, excerpt: row.en_excerpt, focusKeyword: row.en_focus_keyword }
        }
      };
    }

    // Run all 3 queries in parallel (each limited to 20 rows)
    const [allSameCategoryPosts, crossCategoryPosts, fallbackPosts] = await Promise.all([
      // Query 1: Same category posts
      prisma.$queryRaw<RelatedPostRow[]>`
        SELECT bp.id, bp.slug, bp.featured_image,
          jsonb_extract_path_text(bp.translations, ${locale}, 'slug') as locale_slug,
          jsonb_extract_path_text(bp.translations, ${locale}, 'title') as locale_title,
          jsonb_extract_path_text(bp.translations, ${locale}, 'excerpt') as locale_excerpt,
          jsonb_extract_path_text(bp.translations, ${locale}, 'focusKeyword') as locale_focus_keyword,
          jsonb_extract_path_text(bp.translations, 'en', 'slug') as en_slug,
          jsonb_extract_path_text(bp.translations, 'en', 'title') as en_title,
          jsonb_extract_path_text(bp.translations, 'en', 'excerpt') as en_excerpt,
          jsonb_extract_path_text(bp.translations, 'en', 'focusKeyword') as en_focus_keyword
        FROM blog_posts bp
        WHERE bp.status = 'published' AND bp.slug != ${currentSlug}
          AND bp.category = ${category}
        ORDER BY bp.created_at DESC
        LIMIT 20
      `.then(rows => rows.map(mapRow)),
      // Query 2: Cross-category with keyword overlap
      keywords.length > 0
        ? prisma.$queryRaw<RelatedPostRow[]>`
            SELECT bp.id, bp.slug, bp.featured_image,
              jsonb_extract_path_text(bp.translations, ${locale}, 'slug') as locale_slug,
              jsonb_extract_path_text(bp.translations, ${locale}, 'title') as locale_title,
              jsonb_extract_path_text(bp.translations, ${locale}, 'excerpt') as locale_excerpt,
              jsonb_extract_path_text(bp.translations, ${locale}, 'focusKeyword') as locale_focus_keyword,
              jsonb_extract_path_text(bp.translations, 'en', 'slug') as en_slug,
              jsonb_extract_path_text(bp.translations, 'en', 'title') as en_title,
              jsonb_extract_path_text(bp.translations, 'en', 'excerpt') as en_excerpt,
              jsonb_extract_path_text(bp.translations, 'en', 'focusKeyword') as en_focus_keyword
            FROM blog_posts bp
            WHERE bp.status = 'published' AND bp.slug != ${currentSlug}
              AND bp.category != ${category}
              AND bp.keywords && ${keywords}::text[]
            ORDER BY bp.created_at DESC
            LIMIT 20
          `.then(rows => rows.map(mapRow))
        : Promise.resolve([]),
      // Query 3: Fallback from any category
      prisma.$queryRaw<RelatedPostRow[]>`
        SELECT bp.id, bp.slug, bp.featured_image,
          jsonb_extract_path_text(bp.translations, ${locale}, 'slug') as locale_slug,
          jsonb_extract_path_text(bp.translations, ${locale}, 'title') as locale_title,
          jsonb_extract_path_text(bp.translations, ${locale}, 'excerpt') as locale_excerpt,
          jsonb_extract_path_text(bp.translations, ${locale}, 'focusKeyword') as locale_focus_keyword,
          jsonb_extract_path_text(bp.translations, 'en', 'slug') as en_slug,
          jsonb_extract_path_text(bp.translations, 'en', 'title') as en_title,
          jsonb_extract_path_text(bp.translations, 'en', 'excerpt') as en_excerpt,
          jsonb_extract_path_text(bp.translations, 'en', 'focusKeyword') as en_focus_keyword
        FROM blog_posts bp
        WHERE bp.status = 'published' AND bp.slug != ${currentSlug}
        ORDER BY bp.created_at DESC
        LIMIT 20
      `.then(rows => rows.map(mapRow)),
    ]);

    // Post-process: pick deterministically with deduplication
    const relatedPosts: any[] = [];
    const usedSlugs = new Set([currentSlug]);

    // Step 1: Pick 2 from same category
    if (allSameCategoryPosts.length > 0) {
      const offset = slugHash(currentSlug) % allSameCategoryPosts.length;
      for (let i = 0; i < Math.min(2, allSameCategoryPosts.length); i++) {
        const idx = (offset + i) % allSameCategoryPosts.length;
        relatedPosts.push(allSameCategoryPosts[idx]);
        usedSlugs.add(allSameCategoryPosts[idx].slug);
      }
    }

    // Step 2: Pick 1 from cross-category (filter out usedSlugs)
    if (relatedPosts.length < limit && crossCategoryPosts.length > 0) {
      const filtered = crossCategoryPosts.filter(p => !usedSlugs.has(p.slug));
      if (filtered.length > 0) {
        const idx = slugHash(currentSlug + 'cross') % filtered.length;
        relatedPosts.push(filtered[idx]);
        usedSlugs.add(filtered[idx].slug);
      }
    }

    // Step 3: Fill remaining from fallback (filter out usedSlugs)
    if (relatedPosts.length < limit) {
      const remainingNeeded = limit - relatedPosts.length;
      const filtered = fallbackPosts.filter(p => !usedSlugs.has(p.slug));
      if (filtered.length > 0) {
        const offset = slugHash(currentSlug + 'fallback') % filtered.length;
        for (let i = 0; i < Math.min(remainingNeeded, filtered.length); i++) {
          const idx = (offset + i) % filtered.length;
          relatedPosts.push(filtered[idx]);
        }
      }
    }

    return relatedPosts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export default async function BlogPostPage({
  params
}: BlogPostPageProps) {
  const pageStart = performance.now();
  const { locale, slug } = params;

  let post: BlogPost | null;
  try {
    const t0 = performance.now();
    post = await getBlogPost(slug, locale);
    console.log(`[blog-perf] getBlogPost(${slug}, ${locale}): ${(performance.now() - t0).toFixed(0)}ms`);
  } catch (err) {
    console.error(`Blog post page error (slug=${slug}, locale=${locale}):`, err);
    notFound();
  }

  if (!post) {
    // Post not found for this locale - check if slug exists in another language
    const correctLocale = await findSlugLanguage(slug);

    if (correctLocale && correctLocale !== locale) {
      // Slug belongs to a different language - redirect with 301
      permanentRedirect(`/${correctLocale}/blog/${slug}`);
    }

    // Slug doesn't exist anywhere - show 404
    notFound();
  }

  const translations = post.translations as any;
  const translation = translations[locale] || translations['en'] || {};

  // SEO FIX: Redirect if slug doesn't match expected slug for this locale
  // This handles two cases:
  // 1. Cross-locale: Swedish slug under /fi/blog/ -> redirect to /sv/blog/
  // 2. Old slug -> redirect to new slug (handled by static redirects, but fallback here)
  const localeSlug = translation.slug || post.slug;
  if (slug !== localeSlug) {
    // Check if this slug belongs to a different locale
    const correctLocale = await findSlugLanguage(slug);
    if (correctLocale && correctLocale !== locale) {
      // Cross-locale access: redirect to correct locale with this slug
      permanentRedirect(`/${correctLocale}/blog/${slug}`);
    }
    // Slug doesn't match locale but isn't found in other locales either
    // This could be an old slug - redirect to the correct slug for this locale
    permanentRedirect(`/${locale}/blog/${localeSlug}`);
  }

  let htmlContent = translation.content || '';

  // Extract styles and body content from the complete HTML page
  const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  const styles = styleMatch ? styleMatch.join('\n') : '';

  // Extract body content (everything between <body> and </body>)
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

  // SEO FIX: Verify H1 tag exists - inject one if missing for proper SEO
  const hasH1 = /<h1[^>]*>/i.test(bodyContent);
  if (!hasH1 && translation.title) {
    const h1Tag = `<h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a2e;">${translation.title}</h1>`;
    // Insert H1 at the beginning of body content
    bodyContent = h1Tag + bodyContent;
  }

  // Extract header (navigation) from body content
  const headerMatch = bodyContent.match(/(<nav[^>]*>[\s\S]*?<\/nav>)/i);
  const headerContent = headerMatch ? headerMatch[1] : '';

  // Remove header from body content to insert PDFs after it
  if (headerContent) {
    bodyContent = bodyContent.replace(headerContent, '');
  }

  // Transform internal links to include locale prefix and strip duplicate footer (sync)
  bodyContent = transformBlogLinks(bodyContent, locale);

  // Inject contextual internal links - product page links within body text (sync)
  bodyContent = injectInternalLinks(bodyContent, locale);

  // Prepare sample apps list (sync) for parallel sample discovery
  const enTitle = (translations['en']?.title as string) || translation.title || '';
  const sampleApps = getBlogSampleApps(
    enTitle,
    post.slug,
    translation.focusKeyword,
    locale as SupportedLocale,
    3
  );

  // Run 3 independent async operations in parallel:
  // A) Related posts (DB queries)
  // B) Blog-to-blog link injection (DB query + HTML processing)
  // C) Sample discovery (filesystem reads)
  const parallelStart = performance.now();
  const [relatedPosts, processedBodyContent, discoveredSamplesArr] = await Promise.all([
    // A: Related posts
    (async () => {
      const t = performance.now();
      const result = await getRelatedPosts(post.slug, post.category, post.keywords || [], 3, locale).catch(err => {
        console.error(`Related posts error (slug=${slug}):`, err);
        return [] as any[];
      });
      console.log(`[blog-perf] getRelatedPosts: ${(performance.now() - t).toFixed(0)}ms`);
      return result;
    })(),
    // B: Blog-to-blog contextual links (up to 3 links to other blog posts)
    (async () => {
      const t = performance.now();
      const result = await injectBlogLinks(bodyContent, locale, localeSlug);
      console.log(`[blog-perf] injectBlogLinks: ${(performance.now() - t).toFixed(0)}ms`);
      return result;
    })(),
    // C: Sample discovery - run all app discoveries in parallel
    (async () => {
      const t = performance.now();
      const result = await Promise.all(
        sampleApps.map(async (app) => {
          const normalizedId = normalizeAppIdForSamples(app.appId);
          const discovered = await discoverSamplesFromFilesystem(normalizedId, locale);
          return { app, discovered };
        })
      );
      console.log(`[blog-perf] discoverSamples: ${(performance.now() - t).toFixed(0)}ms`);
      return result;
    })(),
  ]);
  console.log(`[blog-perf] parallel total: ${(performance.now() - parallelStart).toFixed(0)}ms`);

  // Use processed body content from parallel operation B
  bodyContent = processedBodyContent;

  // Build blog samples from parallel operation C results
  const blogSamples: Array<{
    worksheetSrc: string;
    thumbSrc: string;
    productUrl: string;
    productName: string;
    appId: string;
  }> = [];

  for (const { app, discovered } of discoveredSamplesArr) {
    if (discovered.length > 0) {
      // Deterministic sample selection based on blog slug + appId
      let hash = 0;
      const key = localeSlug + app.appId;
      for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
      }
      const idx = Math.abs(hash) % discovered.length;
      const sample = discovered[idx];
      const thumbSrc = sample.worksheetSrc.replace(/\.(jpeg|jpg)$/i, '_thumb.webp');
      blogSamples.push({
        worksheetSrc: sample.worksheetSrc,
        thumbSrc,
        productUrl: app.productUrl,
        productName: app.productName,
        appId: app.appId,
      });
    }
  }

  const hasBlogSamples = blogSamples.length > 0;

  // Generate SEO Schema Markup (AUTOMATED)
  // Pass sample image URLs to enrich LearningResource schema with image references
  const sampleImageUrls = hasBlogSamples ? blogSamples.map(s => s.worksheetSrc) : undefined;
  const schemas = generateBlogSchemas({
    slug: localeSlug,
    title: translation.title || '',
    metaTitle: translation.metaTitle,
    metaDescription: translation.metaDescription,
    excerpt: translation.excerpt,
    content: htmlContent,
    featuredImage: post.featuredImage,
    focusKeyword: translation.focusKeyword,
    keywords: post.keywords,
    category: post.category,
    author: translation.author,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  }, locale, undefined, sampleImageUrls);

  // SEO FIX: Expand BlogPosting image field to include gallery samples as @id references
  // This cross-references the BlogPosting schema with the standalone ImageObject schemas
  if (hasBlogSamples && schemas.length > 0) {
    const blogPostingSchema = schemas.find((s: any) => s['@type'] === 'BlogPosting');
    if (blogPostingSchema) {
      const baseUrl = 'https://www.lessoncraftstudio.com';
      const existingImage = blogPostingSchema.image;
      const sampleImageRefs = blogSamples.map(s => ({
        '@id': `${baseUrl}${s.worksheetSrc}#imageobject`
      }));
      blogPostingSchema.image = existingImage
        ? [existingImage, ...sampleImageRefs]
        : sampleImageRefs;
    }
  }

  // SEO: Add ImageGallery schema wrapping the sample images
  if (hasBlogSamples) {
    const baseUrl = 'https://www.lessoncraftstudio.com';
    const sectionTitles: Record<string, string> = {
      en: 'Worksheet Samples', de: 'Arbeitsblatt-Beispiele', fr: 'Exemples de fiches',
      es: 'Ejemplos de fichas', pt: 'Exemplos de fichas', it: 'Esempi di schede',
      nl: 'Werkblad-voorbeelden', sv: 'Arbetsbladsexempel', da: 'Arbejdsark-eksempler',
      no: 'Arbeidsark-eksempler', fi: 'Teht\u00e4v\u00e4esimerkit',
    };
    const galleryImages = blogSamples.map(s => ({
      src: s.worksheetSrc,
      name: s.productName,
      description: generateSchemaDescription(s.productName, locale, translation.focusKeyword),
      caption: s.productName,
      width: 2480,
      height: 3508,
      thumbnailSrc: s.thumbSrc,
      imageId: `${baseUrl}${s.worksheetSrc}#imageobject`,
    }));
    const gallerySchema = generateImageGallerySchema(
      galleryImages,
      sectionTitles[locale] || sectionTitles.en,
      `${baseUrl}/${locale}/blog/${localeSlug}`,
      locale,
      baseUrl
    );
    schemas.push(gallerySchema);
  }

  // AUTO-DETECT FAQ and HowTo patterns for rich snippets
  const contentAnalysis = analyzeContent(htmlContent, translation.title || '');

  // Generate FAQ schema if Q&A patterns detected (with locale for inLanguage)
  const faqSchema = contentAnalysis.hasFAQ
    ? generateFAQSchema(contentAnalysis.faqItems, locale)
    : null;

  // Generate HowTo schema if step-by-step patterns detected (with locale for inLanguage)
  const howToSchema = contentAnalysis.hasHowTo && contentAnalysis.howToName
    ? generateHowToSchema(
        contentAnalysis.howToName,
        contentAnalysis.howToDescription || '',
        contentAnalysis.howToSteps,
        locale
      )
    : null;

  // Localized breadcrumb labels
  const breadcrumbLabels: Record<string, string> = {
    en: 'Blog',
    de: 'Blog',
    fr: 'Blog',
    es: 'Blog',
    pt: 'Blog',
    it: 'Blog',
    nl: 'Blog',
    sv: 'Blogg',
    da: 'Blog',
    no: 'Blogg',
    fi: 'Blogi'
  };

  // Localized category display names for breadcrumb (hub-and-spoke SEO)
  const CATEGORY_DISPLAY_NAMES: Record<string, Record<string, string>> = {
    en: {
      'teaching-resources': 'Teaching Resources',
      'worksheet-tips': 'Worksheet Tips',
      'educational-activities': 'Educational Activities',
      'learning-strategies': 'Learning Strategies',
      'curriculum-guides': 'Curriculum Guides',
      'parent-resources': 'Parent Resources',
      'seasonal-content': 'Seasonal Content',
    },
    de: {
      'teaching-resources': 'Unterrichtsmaterialien',
      'worksheet-tips': 'Arbeitsblatt-Tipps',
      'educational-activities': 'Lernaktivit\u00e4ten',
      'learning-strategies': 'Lernstrategien',
      'curriculum-guides': 'Lehrplanf\u00fchrer',
      'parent-resources': 'Elternressourcen',
      'seasonal-content': 'Saisonale Inhalte',
    },
    fr: {
      'teaching-resources': 'Ressources P\u00e9dagogiques',
      'worksheet-tips': 'Conseils Fiches',
      'educational-activities': 'Activit\u00e9s \u00c9ducatives',
      'learning-strategies': 'Strat\u00e9gies d\'Apprentissage',
      'curriculum-guides': 'Guides de Programme',
      'parent-resources': 'Ressources Parents',
      'seasonal-content': 'Contenu Saisonnier',
    },
    es: {
      'teaching-resources': 'Recursos Did\u00e1cticos',
      'worksheet-tips': 'Consejos de Fichas',
      'educational-activities': 'Actividades Educativas',
      'learning-strategies': 'Estrategias de Aprendizaje',
      'curriculum-guides': 'Gu\u00edas Curriculares',
      'parent-resources': 'Recursos para Padres',
      'seasonal-content': 'Contenido Estacional',
    },
    pt: {
      'teaching-resources': 'Recursos Did\u00e1ticos',
      'worksheet-tips': 'Dicas de Fichas',
      'educational-activities': 'Atividades Educativas',
      'learning-strategies': 'Estrat\u00e9gias de Aprendizagem',
      'curriculum-guides': 'Guias Curriculares',
      'parent-resources': 'Recursos para Pais',
      'seasonal-content': 'Conte\u00fado Sazonal',
    },
    it: {
      'teaching-resources': 'Risorse Didattiche',
      'worksheet-tips': 'Consigli Schede',
      'educational-activities': 'Attivit\u00e0 Educative',
      'learning-strategies': 'Strategie di Apprendimento',
      'curriculum-guides': 'Guide al Programma',
      'parent-resources': 'Risorse per Genitori',
      'seasonal-content': 'Contenuti Stagionali',
    },
    nl: {
      'teaching-resources': 'Leermiddelen',
      'worksheet-tips': 'Werkblad Tips',
      'educational-activities': 'Educatieve Activiteiten',
      'learning-strategies': 'Leerstrategieën',
      'curriculum-guides': 'Leerplangidsen',
      'parent-resources': 'Hulpbronnen voor Ouders',
      'seasonal-content': 'Seizoensinhoud',
    },
    sv: {
      'teaching-resources': 'Undervisningsresurser',
      'worksheet-tips': 'Arbetsbladstips',
      'educational-activities': 'Pedagogiska Aktiviteter',
      'learning-strategies': 'L\u00e4rstrategier',
      'curriculum-guides': 'L\u00e4roplansuider',
      'parent-resources': 'F\u00f6r\u00e4ldraresurser',
      'seasonal-content': 'S\u00e4songsinneh\u00e5ll',
    },
    da: {
      'teaching-resources': 'Undervisningsressourcer',
      'worksheet-tips': 'Arbejdsarktips',
      'educational-activities': 'P\u00e6dagogiske Aktiviteter',
      'learning-strategies': 'L\u00e6ringsstrategier',
      'curriculum-guides': 'L\u00e6seplansvejledninger',
      'parent-resources': 'For\u00e6ldreressourcer',
      'seasonal-content': 'S\u00e6sonindhold',
    },
    no: {
      'teaching-resources': 'Undervisningsressurser',
      'worksheet-tips': 'Arbeidsarktips',
      'educational-activities': 'Pedagogiske Aktiviteter',
      'learning-strategies': 'L\u00e6ringsstrategier',
      'curriculum-guides': 'L\u00e6replanveiledninger',
      'parent-resources': 'Foreldreressurser',
      'seasonal-content': 'Sesonginnhold',
    },
    fi: {
      'teaching-resources': 'Opetusresurssit',
      'worksheet-tips': 'Ty\u00f6arkkivinkit',
      'educational-activities': 'Opetusaktiviteetit',
      'learning-strategies': 'Oppimisstrategiat',
      'curriculum-guides': 'Opetussuunnitelmaoppaat',
      'parent-resources': 'Vanhempien Resurssit',
      'seasonal-content': 'Kausiluontoinen Sis\u00e4lt\u00f6',
    },
  };

  // Localized "Related Articles" labels
  const relatedArticlesLabels: Record<string, string> = {
    en: 'Related Articles',
    de: 'Ähnliche Artikel',
    fr: 'Articles Connexes',
    es: 'Artículos Relacionados',
    pt: 'Artigos Relacionados',
    it: 'Articoli Correlati',
    nl: 'Gerelateerde Artikelen',
    sv: 'Relaterade Artiklar',
    da: 'Relaterede Artikler',
    no: 'Relaterte Artikler',
    fi: 'Aiheeseen Liittyvät Artikkelit'
  };

  // Localized "Read More" labels
  const readMoreLabels: Record<string, string> = {
    en: 'Read More →',
    de: 'Weiterlesen →',
    fr: 'Lire Plus →',
    es: 'Leer Más →',
    pt: 'Ler Mais →',
    it: 'Leggi di Più →',
    nl: 'Lees Meer →',
    sv: 'Läs Mer →',
    da: 'Læs Mere →',
    no: 'Les Mer →',
    fi: 'Lue Lisää →'
  };

  console.log(`[blog-perf] TOTAL page render (${locale}/${slug}): ${(performance.now() - pageStart).toFixed(0)}ms`);

  // Render the extracted content with inline styles, PDFs after header, and related posts before footer
  return (
    <>
      {/* AUTOMATED: Schema Markup Injection for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* AUTO-DETECTED: FAQ Schema for Q&A rich snippets */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* AUTO-DETECTED: HowTo Schema for step-by-step rich snippets */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      {/* Breadcrumb Navigation (4-level: Home > Blog > Category > Post) */}
      <Breadcrumb
        locale={locale}
        suppressSchema
        items={[
          { label: breadcrumbLabels[locale] || 'Blog', href: `/${locale}/blog` },
          { label: CATEGORY_DISPLAY_NAMES[locale]?.[post.category] || post.category, href: `/${locale}/blog/category/${post.category}` },
          { label: translation.title || slug }
        ]}
      />

      {/* Worksheet Sample Banner - shows when matching product samples exist */}
      {hasBlogSamples && (
        <BlogSampleBanner locale={locale} appsUrl={`/${locale}/apps`} />
      )}

      <div dangerouslySetInnerHTML={{ __html: styles }} />

      {/* PDF Section Styling - Uses ID selector for maximum specificity to override blog CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* PDF Card Container */
        #pdf-downloads-section {
          max-width: 1200px !important;
          margin: 48px auto 80px !important;
          padding: 0 24px !important;
        }

        /* PDF Cards - Override any blog CSS */
        #pdf-downloads-section .pdf-card {
          cursor: pointer !important;
          transform: scale(1) !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          border: none !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          border-radius: 8px !important;
          background-color: #FFFFFF !important;
        }

        #pdf-downloads-section .pdf-card:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }

        /* PDF Price Badges - Force green for Free, orange for Premium */
        #pdf-downloads-section .pdf-card .pdf-price-badge-free {
          background-color: #10B981 !important;
          color: #FFFFFF !important;
        }

        #pdf-downloads-section .pdf-card .pdf-price-badge-premium {
          background-color: #F59E0B !important;
          color: #FFFFFF !important;
        }

        /* PDF Download Buttons - Modern Professional Design */
        #pdf-downloads-section .pdf-download-button {
          background: linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%) !important;
          color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: none !important;
          font-weight: 600 !important;
          letter-spacing: 0.3px !important;
        }

        #pdf-downloads-section .pdf-download-button:hover {
          background: linear-gradient(135deg, #2563EB 0%, #6D28D9 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4) !important;
        }

        #pdf-downloads-section .pdf-download-button:active {
          transform: translateY(0) !important;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3) !important;
        }
      ` }} />

      {/* CSS for hover effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pdf-card-hover:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
        .pdf-download-button-hover:hover {
          background-color: #1d4ed8 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
      ` }} />

      {/* Header/Navigation */}
      {headerContent && (
        <div dangerouslySetInnerHTML={{ __html: headerContent }} />
      )}

      {/* Sample Worksheets - Right after header */}
      {post.pdfs && post.pdfs.length > 0 && (
        <div id="pdf-downloads-section" style={{
          maxWidth: '1200px',
          margin: '48px auto 80px',
          padding: '0 24px'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '12px',
            textAlign: 'center',
            color: '#1a1a1a',
            letterSpacing: '-0.5px'
          }}>
            {translation.pdfSectionTitle || 'Sample Worksheets'}
          </h2>
          {translation.pdfSectionDescription && (
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              textAlign: 'center',
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px'
            }}>
              {translation.pdfSectionDescription}
            </p>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1152px',
            margin: '0 auto'
          }}>
            {post.pdfs.map((pdf) => {
            // PDFs are now language-specific in the database
            const pdfTitle = pdf.title;
            const pdfDescription = pdf.description;
            const pdfThumbnail = pdf.thumbnail;

            return (
              <div key={pdf.id} className="pdf-card-hover" style={{
                borderRadius: '8px',
                padding: '0',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              } as React.CSSProperties}>
                {pdfThumbnail ? (
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '75%',
                    backgroundColor: '#F3F4F6',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={pdfThumbnail}
                      alt={generateAltText(pdfTitle, translation.focusKeyword, post.category, 'pdf')}
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ) : (
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '75%',
                    backgroundColor: '#F3F4F6',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}
                <div style={{
                  padding: '16px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: '0 0 4px 0'
                  }}>
                    {pdfTitle}
                  </h3>
                  <span
                    className={pdf.price === 'Free' ? 'pdf-price-badge-free' : 'pdf-price-badge-premium'}
                    style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#FFFFFF',
                      backgroundColor: pdf.price === 'Free' ? '#10B981' : '#F59E0B',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '12px'
                    }}>
                    {pdf.price === 'Free'
                      ? (translation.pdfFreeLabel || 'Free')
                      : (translation.pdfPremiumLabel || 'Premium')}
                  </span>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: '#6B7280',
                    margin: '0 0 16px 0'
                  }}>
                    {pdfDescription}
                  </p>
                  <div style={{ textAlign: 'center' }}>
                    <a
                      href={pdf.filePath}
                      download={pdf.filename}
                      className="pdf-download-button pdf-download-button-hover"
                      style={{
                        display: 'inline-block',
                        padding: '12px 32px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontSize: '15px',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      {(translation.pdfDownloadButton || 'Download')
                        .replace(/[📥📄📋⬇️↓→➜➔➡]/g, '')
                        .replace(/\s+/g, ' ')
                        .trim()}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* Main body content */}
      <div
        dangerouslySetInnerHTML={{ __html: bodyContent }}
        style={{
          width: '100%',
          margin: 0,
          padding: 0
        }}
      />

      {/* Worksheet Sample Gallery - shows 3 relevant sample images */}
      {hasBlogSamples && (
        <BlogSampleGallery
          locale={locale}
          samples={blogSamples}
          blogSlug={localeSlug}
          focusKeyword={translation.focusKeyword}
          category={post.category}
        />
      )}

      {/* Related Worksheet Generators - SEO internal linking */}
      <RelatedProducts
        locale={locale as SupportedLocale}
        category={post.category}
        htmlContent={htmlContent}
        keywords={post.keywords || []}
        limit={4}
      />

      {/* Related Blog Posts - Before footer */}
      {relatedPosts.length > 0 && (
        <div style={{
          maxWidth: '1200px',
          margin: '64px auto',
          padding: '0 24px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '32px',
            textAlign: 'center',
            color: '#480005'
          }}>
            {relatedArticlesLabels[locale] || 'Related Articles'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {relatedPosts.map((relatedPost) => {
              const relatedTranslations = relatedPost.translations as any;
              const relatedTranslation = relatedTranslations[locale] || relatedTranslations['en'] || {};
              const relatedSlug = relatedTranslation.slug || relatedPost.slug;

              return (
                <article
                  key={relatedPost.id}
                  style={{
                    border: '2px solid #480005',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <Link
                    href={`/${locale}/blog/${relatedSlug}`}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      color: 'inherit'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '250px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5',
                      overflow: 'hidden'
                    }}>
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={generateAltText(relatedTranslation.title || relatedPost.slug, relatedTranslation.focusKeyword, undefined, 'related')}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '64px', opacity: 0.3 }}>📝</span>
                      )}
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#480005'
                      }}>
                        {relatedTranslation.title || relatedPost.slug}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#480005',
                        opacity: 0.8,
                        marginBottom: '16px'
                      }}>
                        {relatedTranslation.excerpt || ''}
                      </p>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#D6AC47'
                      }}>
                        {readMoreLabels[locale] || 'Read More →'}
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// Metadata generation (ENHANCED WITH AUTOMATED SEO)
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = params;
  const baseUrl = 'https://www.lessoncraftstudio.com';

  try {
    const post = await getBlogPost(slug, locale);

    if (!post) {
      // Check if this slug exists in another language - if so, we'll redirect in the page
      const correctLocale = await findSlugLanguage(slug);
      if (correctLocale && correctLocale !== locale) {
        // Return minimal metadata - page will redirect
        return {
          title: 'Redirecting...',
          robots: { index: false, follow: false }
        };
      }
      // Slug doesn't exist anywhere - return 404 metadata
      // The page component will call notFound() to trigger proper 404 status
      return {
        title: 'Page Not Found',
        description: 'The requested blog post could not be found.',
        robots: { index: false, follow: false }
      };
    }

    const translations = post.translations as any;
    const translation = translations[locale] || translations['en'] || {};
    const title = translation.metaTitle || translation.title || slug.replace(/-/g, ' ');
    // OG title can be longer (~95 chars) so use full post title for social sharing
    const ogTitle = translation.title || title;
    // Truncate description at word boundary (160 chars max) — no "..." suffix
    // Google/Facebook handle their own truncation display
    const rawDescription = translation.metaDescription || translation.excerpt || '';
    const description = rawDescription.length > 160
      ? rawDescription.substring(0, 160).replace(/\s+\S*$/, '')
      : rawDescription;
    // Use language-specific focusKeyword first, then fall back to general keywords
    const focusKeyword = translation.focusKeyword || '';
    const generalKeywords = post.keywords?.join(', ') || '';
    const keywords = focusKeyword
      ? (generalKeywords ? `${focusKeyword}, ${generalKeywords}` : focusKeyword)
      : generalKeywords;
    // Use translation slug for canonical URL (Bug 3 fix)
    const localeSlug = translation.slug || post.slug;
    const canonicalUrl = `${baseUrl}/${locale}/blog/${localeSlug}`;

    // Discover sample images for og:image enrichment
    const enTitle = (translations['en']?.title as string) || translation.title || '';
    const metaSampleApps = getBlogSampleApps(
      enTitle,
      post.slug,
      translation.focusKeyword,
      locale as SupportedLocale,
      3
    );
    const sampleOgImages: Array<{ url: string; alt: string }> = [];
    for (const app of metaSampleApps) {
      const normalizedId = normalizeAppIdForSamples(app.appId);
      const discovered = await discoverSamplesFromFilesystem(normalizedId, locale);
      if (discovered.length > 0) {
        let hash = 0;
        const key = localeSlug + app.appId;
        for (let i = 0; i < key.length; i++) {
          hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
        }
        const idx = Math.abs(hash) % discovered.length;
        const sample = discovered[idx];
        const thumbSrc = sample.worksheetSrc.replace(/\.(jpeg|jpg)$/i, '_thumb.webp');
        sampleOgImages.push({
          url: `${baseUrl}${thumbSrc}`,
          alt: `${app.productName} - worksheet sample`,
        });
      }
    }

    // Generate hreflang alternates for all available translations
    // This ensures proper bidirectional linking as required by Google
    // Blog posts ARE translations (shared database record, same metadata)
    // Hreflang helps Google serve the right language version to each user
    // SEO FIX: Include language versions that have at least a slug OR title
    // This ensures bidirectional linking is complete (Google requires all languages to link to each other)
    const languageAlternates: Record<string, string> = {};
    for (const lang of SUPPORTED_LOCALES) {
      const langTranslation = translations[lang];
      // Include languages that have a slug, title, or content - any indicates translation exists
      if (langTranslation?.slug || langTranslation?.title || langTranslation?.content) {
        const langSlug = langTranslation.slug || post.slug;
        const hreflangCode = getHreflangCode(lang);
        languageAlternates[hreflangCode] = `${baseUrl}/${lang}/blog/${langSlug}`;
      }
    }
    // Add x-default pointing to English version
    languageAlternates['x-default'] = `${baseUrl}/en/blog/${translations['en']?.slug || post.slug}`;

    // Build og:image array: featured image first, then sample thumbnails
    const ogImages = [
      ...(post.featuredImage ? [{
        url: `${baseUrl}${post.featuredImage}`,
        alt: translation.featuredImageAlt || generateAltText(title, focusKeyword, post.category, 'featured')
      }] : []),
      ...sampleOgImages,
    ];

    // Build twitter:images array
    const twitterImages = [
      ...(post.featuredImage ? [`${baseUrl}${post.featuredImage}`] : []),
      ...sampleOgImages.map(img => img.url),
    ];

    return {
      title,
      description,
      keywords,
      // AUTOMATED: Canonical URL and hreflang alternates
      // Hreflang ensures bidirectional linking for proper multilingual SEO
      alternates: {
        canonical: canonicalUrl,
        languages: languageAlternates,
      },
      // AUTOMATED: Open Graph tags (Facebook, LinkedIn, etc.)
      openGraph: {
        title: ogTitle,
        description,
        type: 'article',
        url: canonicalUrl,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
        // AUTOMATED: Article dates (content freshness signal)
        publishedTime: post.createdAt.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
        authors: [translation.author || 'LessonCraftStudio'],
        section: post.category || 'Education',
        tags: post.keywords || [],
        images: ogImages,
      },
      // AUTOMATED: Twitter Card tags
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description,
        images: twitterImages,
        creator: '@LessonCraftStudio', // TODO: Replace with actual Twitter handle
      },
      // AUTOMATED: Robots directives
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      // AUTOMATED: Additional meta tags (E-A-T signals)
      other: {
        'article:author': translation.author || 'LessonCraftStudio',
        'article:published_time': post.createdAt.toISOString(),
        'article:modified_time': post.updatedAt.toISOString(),
        'article:section': post.category || 'Education',
        'article:tag': post.keywords?.join(',') || '',
        // E-A-T: Author and publisher link hints for crawlers
        'author': 'LessonCraftStudio Team',
        'publisher': 'LessonCraftStudio',
        'copyright': `© ${new Date().getFullYear()} LessonCraftStudio`,
      },
      // AUTOMATED: Authors metadata (E-A-T signals)
      authors: [
        { name: translation.author || 'LessonCraftStudio Team', url: `${baseUrl}/${locale}` }
      ],
      creator: 'LessonCraftStudio',
      publisher: 'LessonCraftStudio',
    };
  } catch (error) {
    console.error(`Error generating metadata for blog post ${slug}:`, error);
    return {
      title: 'Page Not Found',
      description: 'The requested blog post could not be found.',
      robots: { index: false, follow: false }
    };
  }
}