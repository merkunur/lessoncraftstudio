import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getBlogConfigBySlug,
  getAllBlogPageSlugs,
  getBlogAlternateUrls,
  getBlogSlugForLocale,
} from '@/config/blog-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap, generateFAQSchema, localizedHomeLabel, getHreflangCode } from '@/lib/schema-generator';
import { getBlogContent } from '@/config/blog-content';
import { getSectionLabel } from '@/config/section-labels';
import { isValidInternalLink, resolveInternalLinkSlug } from '@/lib/resolve-internal-link';
import ReadMoreText from '@/components/ReadMoreText';
import { getBlogVisualConfig } from '@/config/blog-visual-sections/blog-visual-map';
import { getSectionPlacements, buildInsertionMap } from '@/config/blog-visual-sections/section-placement';
import { BlogVisualSection } from '@/components/blog-showcase';
import { resolveBlogImageUrl } from '@/config/blog-visual-sections/image-resolver';

const baseUrl = 'https://www.lessoncraftstudio.com';

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllBlogPageSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;

    const config = getBlogConfigBySlug(slug);
    if (!config) return {};

    const content = await getBlogContent(config.blogId, locale);
    const alternateUrls = getBlogAlternateUrls(config.blogId, baseUrl);
    const localeSlug = getBlogSlugForLocale(config.blogId, locale);

    const title = content?.seo?.titleTag || `${config.blogId} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || '';

    const keywords = content?.seo?.primaryKeyword
      ? [content.seo.primaryKeyword, ...(content.seo.secondaryKeywords || []), ...(content.seo.lsiKeywords || [])]
      : undefined;

    // Use real sample worksheet image for og:image when visual config exists
    const visualConfig = getBlogVisualConfig(config.blogId);
    const ogImageUrl = visualConfig
      ? `${baseUrl}${resolveBlogImageUrl(visualConfig.heroImages[0].appKey, visualConfig.heroImages[0].idx, locale)}`
      : `${baseUrl}/api/og?locale=${locale}&type=blog&title=${encodeURIComponent(title)}`;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `${baseUrl}/${locale}/blog/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${baseUrl}/${locale}/blog/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
        alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
        images: [
          { url: ogImageUrl, width: 1200, height: 630, alt: title },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImageUrl],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const config = getBlogConfigBySlug(slug);
  if (!config) notFound();

  const content = await getBlogContent(config.blogId, locale);

  if (content) {
    const localeSlug = getBlogSlugForLocale(config.blogId, locale);
    const pageUrl = `${baseUrl}/${locale}/blog/${localeSlug || slug}`;

    // Visual sections config
    const visualConfig = getBlogVisualConfig(config.blogId);
    const schemaImages = visualConfig
      ? visualConfig.heroImages.map(ref =>
          `${baseUrl}${resolveBlogImageUrl(ref.appKey, ref.idx, locale)}`
        )
      : [`${baseUrl}/api/og?locale=${locale}&type=blog&title=${encodeURIComponent(content.hero.title)}`];

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: content.hero.title,
      description: content.seo?.metaDescription || content.hero.description,
      url: pageUrl,
      image: schemaImages,
      inLanguage: getHreflangCode(locale),
      publisher: { '@type': 'Organization', name: 'LessonCraftStudio', url: baseUrl, logo: { '@type': 'ImageObject', url: `${baseUrl}/logo-lcs-optimized.png` } },
      author: { '@type': 'Organization', name: 'LessonCraftStudio', url: baseUrl, logo: { '@type': 'ImageObject', url: `${baseUrl}/logo-lcs-optimized.png` } },
      datePublished: '2026-03-29',
      dateModified: '2026-04-09',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.speakable-headline', '.speakable-summary'] },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: localizedHomeLabel[locale] || 'Home', item: `${baseUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: getSectionLabel('blog', locale), item: `${baseUrl}/${locale}/blog` },
        { '@type': 'ListItem', position: 3, name: content.hero.title },
      ],
    };

    const schemas: object[] = [articleSchema, breadcrumbSchema];
    if (content.faq?.length) {
      schemas.push(generateFAQSchema(content.faq, locale, pageUrl));
    }

    // Compute visual section insertion points
    const placements = visualConfig
      ? getSectionPlacements(content.category, content.sections?.length || 0, visualConfig)
      : [];
    const insertionMap = buildInsertionMap(placements);

    return (
      <div className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />

        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href={`/${locale}/blog`} className="hover:text-emerald-600">{getSectionLabel('blog', locale)}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700">{content.hero.title}</span>
            </nav>
            <h1 className="speakable-headline text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            {content.hero.tagline && (
              <p className="text-lg text-emerald-700 font-medium mb-4">{content.hero.tagline}</p>
            )}
            <p className="speakable-summary text-lg text-gray-600">{content.hero.description}</p>
          </div>
        </section>

        {/* Visual Section A: Hero Banner (after hero text) */}
        {visualConfig && insertionMap.afterHero.map((p, i) => (
          <BlogVisualSection key={`ah-${i}`} type={p.type} config={visualConfig} content={content} locale={locale} />
        ))}

        {/* Introduction */}
        {content.introduction && (
          <section className="py-10 md:py-14">
            <div className="container mx-auto px-4 max-w-3xl">
              <ReadMoreText text={content.introduction} locale={locale} className="text-gray-700 leading-relaxed text-lg" preserveWhitespace lines={12} />
            </div>
          </section>
        )}

        {/* Main Content Sections — interleaved with visual sections */}
        {content.sections && content.sections.length > 0 && (
          <article className="py-8 md:py-12">
            {content.sections.map((section, i) => (
              <div key={i}>
                <div className="container mx-auto px-4 max-w-3xl mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                  <ReadMoreText text={section.content} locale={locale} className="text-gray-700 leading-relaxed" preserveWhitespace lines={15} />
                </div>
                {/* Visual sections inserted after this text section */}
                {visualConfig && insertionMap.afterSection.get(i)?.map((p, vi) => (
                  <BlogVisualSection key={`as-${i}-${vi}`} type={p.type} config={visualConfig} content={content} locale={locale} />
                ))}
              </div>
            ))}
          </article>
        )}

        {/* Visual Section J: CTA with Sample (before takeaways) */}
        {visualConfig && insertionMap.beforeTakeaways.map((p, i) => (
          <BlogVisualSection key={`bt-${i}`} type={p.type} config={visualConfig} content={content} locale={locale} />
        ))}

        {/* Key Takeaways */}
        {content.keyTakeaways && content.keyTakeaways.length > 0 && (
          <section className="py-10 md:py-14 bg-emerald-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('blogKeyTakeaways', locale)}</h2>
              <ul className="space-y-3">
                {content.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-sm font-bold mt-0.5">{i + 1}</span>
                    <span className="text-gray-700">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Original CTA (kept as fallback when no visual config, hidden when visual J replaces it) */}
        {content.cta && !visualConfig && (
          <section className="py-12 md:py-16 bg-emerald-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">{content.cta.heading}</h2>
              <p className="text-emerald-100 mb-8 max-w-lg mx-auto">{content.cta.description}</p>
              <Link
                href={`/${locale}${content.cta.buttonUrl}`}
                className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                {content.cta.buttonText}
              </Link>
            </div>
          </section>
        )}

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('faq', locale)}</h2>
              <div className="space-y-4">
                {content.faq.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-lg bg-white">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900">
                      {faq.question}
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4">
                      <ReadMoreText text={faq.answer} locale={locale} className="text-gray-600" lines={8} />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Posts */}
        {content.relatedPosts && content.relatedPosts.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('blogRelatedPosts', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.relatedPosts.map((post, i) => {
                  const postConfig = getBlogConfigBySlug(post.slug);
                  const resolvedSlug = postConfig ? (getBlogSlugForLocale(postConfig.blogId, locale) || post.slug) : post.slug;
                  return (
                    <Link
                      key={i}
                      href={`/${locale}/blog/${resolvedSlug}`}
                      className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links */}
        {content.internalLinks && content.internalLinks.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('relatedGuides', locale)}</h2>
              <div className="flex flex-wrap gap-3">
                {content.internalLinks.filter(link => isValidInternalLink(link.pageType, link.slug)).map((link, i) => {
                  const section = link.pageType === 'app' ? 'apps' : link.pageType === 'tool' ? 'tools' : link.pageType === 'bundle' ? 'bundles' : link.pageType === 'start' ? 'start' : link.pageType === 'guide' ? 'guides' : link.pageType === 'blog' ? 'blog' : 'ideas';
                  const resolvedSlug = resolveInternalLinkSlug(link.pageType, link.slug, locale) || link.slug;
                  return (
                    <Link
                      key={i}
                      href={`/${locale}/${section}/${resolvedSlug}`}
                      className="text-sm text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full"
                    >
                      {link.anchorText}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  // Fallback — content not yet available for this locale
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getSectionLabel('blog', locale)}</h1>
          <p className="text-gray-600 mb-8">{getSectionLabel('comingSoon', locale)}</p>
          <Link href={`/${locale}/blog`} className="text-emerald-600 hover:text-emerald-700 font-medium">
            {getSectionLabel('blog', locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
