import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { generateBlogSchemas, ogLocaleMap, getHreflangCode } from '@/lib/schema-generator';
import { analyzeContent, generateFAQSchema, generateHowToSchema } from '@/lib/content-analyzer';
import Breadcrumb from '@/components/Breadcrumb';
import { SUPPORTED_LOCALES } from '@/config/locales';
import RelatedProducts from '@/components/blog/RelatedProducts';
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
 */
async function buildSlugCache(): Promise<Map<string, string>> {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, translations: true }
  });

  const cache = new Map<string, string>();
  for (const post of posts) {
    // Primary slug maps to itself
    cache.set(post.slug, post.slug);
    // All translated slugs map to primary slug
    const translations = post.translations as Record<string, { slug?: string }>;
    for (const translation of Object.values(translations)) {
      if (translation?.slug) {
        cache.set(translation.slug, post.slug);
      }
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

/**
 * Fetch blog post from database - OPTIMIZED VERSION
 * Uses React cache() for request deduplication between generateMetadata() and page component
 * Uses direct indexed lookup instead of loading ALL posts (O(1) instead of O(n))
 */
const getBlogPost = cache(async (slug: string, locale: string): Promise<BlogPost | null> => {
  try {
    // Step 1: Try direct primary slug lookup (indexed, fast - O(1))
    let post = await prisma.blogPost.findFirst({
      where: {
        status: 'published',
        slug: slug
      },
      include: {
        pdfs: {
          where: { language: locale },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    if (post) {
      return post;
    }

    // Step 2: Use slug cache to find primary slug (for language-specific slugs)
    const slugCacheMap = await getSlugCache();
    const primarySlug = slugCacheMap.get(slug);

    if (primarySlug && primarySlug !== slug) {
      // Found mapping - fetch by primary slug (indexed, fast)
      post = await prisma.blogPost.findFirst({
        where: {
          status: 'published',
          slug: primarySlug
        },
        include: {
          pdfs: {
            where: { language: locale },
            orderBy: { sortOrder: 'asc' }
          }
        }
      });

      if (post) {
        return post;
      }
    }

    // Log for debugging when slug is not found
    console.log(`Blog post not found: slug="${slug}", locale="${locale}", primarySlug="${primarySlug || 'none'}"`);
    return null;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
});

/**
 * Search all blog posts to find which language a slug belongs to.
 * Used for redirecting when a slug is accessed with the wrong language prefix.
 * Returns the correct locale if found, null otherwise.
 * OPTIMIZED: Uses slug cache instead of loading all posts
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

    // Otherwise, find which language this slug belongs to
    // We need to fetch just this one post to check translations
    const post = await prisma.blogPost.findFirst({
      where: { status: 'published', slug: primarySlug },
      select: { translations: true }
    });

    if (!post) {
      return null;
    }

    const translations = post.translations as Record<string, { slug?: string }>;
    for (const [locale, translation] of Object.entries(translations)) {
      if (translation?.slug === slug) {
        return locale;
      }
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
export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, translations: true }
    });

    // Generate params ONLY for locales that have actual translated content
    const locales = [...SUPPORTED_LOCALES];
    const params = [];

    for (const post of posts) {
      const translations = post.translations as any;

      for (const locale of locales) {
        const translation = translations[locale];

        // CRITICAL FIX: Only generate route if translation exists AND has content
        // This prevents 404 pages from being generated for non-translated posts
        if (translation && translation.title && translation.content) {
          // Use language-specific slug if available, otherwise fallback to primary slug
          const localeSlug = translation.slug || post.slug;
          params.push({
            locale,
            slug: localeSlug
          });
        } else if (locale === 'en') {
          // Always include English with primary slug (English is always available)
          params.push({
            locale: 'en',
            slug: post.slug
          });
        }
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
async function getRelatedPosts(currentSlug: string, category: string, keywords: string[] = [], limit: number = 3) {
  try {
    const relatedPosts: any[] = [];
    const usedSlugs = new Set([currentSlug]);

    // Step 1: Get 2 posts from same category
    const sameCategoryPosts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        slug: { not: currentSlug },
        category: category
      },
      select: {
        id: true,
        slug: true,
        featuredImage: true,
        keywords: true,
        translations: true,
        createdAt: true
      },
      take: 2,
      orderBy: { createdAt: 'desc' }
    });

    for (const post of sameCategoryPosts) {
      relatedPosts.push(post);
      usedSlugs.add(post.slug);
    }

    // Step 2: Get 1 post from different category with keyword overlap
    if (relatedPosts.length < limit && keywords.length > 0) {
      // Find posts from other categories that share keywords
      const crossCategoryPost = await prisma.blogPost.findFirst({
        where: {
          status: 'published',
          slug: { notIn: Array.from(usedSlugs) },
          category: { not: category },
          // Match any of the current post's keywords
          keywords: { hasSome: keywords }
        },
        select: {
          id: true,
          slug: true,
          featuredImage: true,
          keywords: true,
          translations: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' }
      });

      if (crossCategoryPost) {
        relatedPosts.push(crossCategoryPost);
        usedSlugs.add(crossCategoryPost.slug);
      }
    }

    // Step 3: If still need more posts, get recent posts from any category
    if (relatedPosts.length < limit) {
      const remainingNeeded = limit - relatedPosts.length;
      const recentPosts = await prisma.blogPost.findMany({
        where: {
          status: 'published',
          slug: { notIn: Array.from(usedSlugs) }
        },
        select: {
          id: true,
          slug: true,
          featuredImage: true,
          keywords: true,
          translations: true,
          createdAt: true
        },
        take: remainingNeeded,
        orderBy: { createdAt: 'desc' }
      });

      for (const post of recentPosts) {
        relatedPosts.push(post);
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
  const { locale, slug } = params;
  const post = await getBlogPost(slug, locale);

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

  // Get related posts (with cross-category keyword overlap)
  const relatedPosts = await getRelatedPosts(post.slug, post.category, post.keywords || []);

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

  // Generate SEO Schema Markup (AUTOMATED)
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
  }, locale);

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

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        locale={locale}
        items={[
          { label: breadcrumbLabels[locale] || 'Blog', href: `/${locale}/blog` },
          { label: translation.title || slug }
        ]}
      />

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
    // SEO FIX: Truncate description to max 160 chars for optimal SERP display
    const rawDescription = translation.metaDescription || translation.excerpt || '';
    const description = rawDescription.length > 160
      ? rawDescription.substring(0, 157).replace(/\s+\S*$/, '') + '...'
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

    // Generate hreflang alternates for all available translations
    // This ensures proper bidirectional linking as required by Google
    // Blog posts ARE translations (shared database record, same metadata)
    // Hreflang helps Google serve the right language version to each user
    const languageAlternates: Record<string, string> = {};
    for (const lang of SUPPORTED_LOCALES) {
      const langTranslation = translations[lang];
      // Only include languages that have actual translated content
      if (langTranslation?.title && langTranslation?.content) {
        const langSlug = langTranslation.slug || post.slug;
        const hreflangCode = getHreflangCode(lang);
        languageAlternates[hreflangCode] = `${baseUrl}/${lang}/blog/${langSlug}`;
      }
    }
    // Add x-default pointing to English version
    languageAlternates['x-default'] = `${baseUrl}/en/blog/${translations['en']?.slug || post.slug}`;

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
        title,
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
        // SEO FIX: Remove hardcoded dimensions (let browser/crawler determine actual size)
        // SEO FIX: Use keyword-rich alt text for better image search visibility
        images: post.featuredImage ? [{
          url: `${baseUrl}${post.featuredImage}`,
          alt: translation.featuredImageAlt || generateAltText(title, focusKeyword, post.category, 'featured')
        }] : [],
      },
      // AUTOMATED: Twitter Card tags
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: post.featuredImage ? [`${baseUrl}${post.featuredImage}`] : [],
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