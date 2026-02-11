import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getHreflangCode,
  ogLocaleMap,
  generateFAQSchema,
  localizedHomeLabel,
} from '@/lib/schema-generator';
import { productPageSlugs, getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import { themeSlugMap, getThemeIdFromSlug, getThemeSlug } from '@/config/theme-slugs';
import { themeContent, getThemeContent } from '@/config/theme-page-content';
import { getThemePreviewImages, getAppThumbnailMap, getLocalizedAppDisplayName } from '@/lib/theme-images';

export const revalidate = 3600;

// ── Static params ─────────────────────────────────────────────────

export function generateStaticParams() {
  const params: { locale: string; theme: string }[] = [];
  const themeIds = Object.keys(themeContent);

  for (const locale of SUPPORTED_LOCALES) {
    for (const themeId of themeIds) {
      const slug = getThemeSlug(themeId, locale);
      if (slug && themeContent[themeId]?.[locale]) {
        params.push({ locale, theme: slug });
      } else if (slug && themeContent[themeId]?.en) {
        // Use English fallback content with localized slug
        params.push({ locale, theme: slug });
      }
    }
  }
  return params;
}

// ── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { locale: string; theme: string };
}): Promise<Metadata> {
  const locale = params.locale || 'en';
  const themeId = getThemeIdFromSlug(locale, params.theme);
  const baseUrl = 'https://www.lessoncraftstudio.com';

  const notFoundMeta: Metadata = { title: 'Not Found', robots: { index: false, follow: false } };
  if (!themeId) return notFoundMeta;

  const content = getThemeContent(themeId, locale);
  if (!content) return notFoundMeta;

  const currentSlug = getThemeSlug(themeId, locale) || params.theme;

  // Build hreflang alternates with localized slugs
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    const langSlug = getThemeSlug(themeId, lang);
    if (langSlug) {
      hreflangAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/worksheets/${langSlug}`;
    }
  }
  const enSlug = getThemeSlug(themeId, 'en');
  if (enSlug) {
    hreflangAlternates['x-default'] = `${baseUrl}/en/worksheets/${enSlug}`;
  }

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/worksheets/${currentSlug}`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'website',
      url: `${baseUrl}/${locale}/worksheets/${currentSlug}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
    },
  };
}

// ── Localized UI labels ───────────────────────────────────────────

const worksheetsLabel: Record<string, string> = {
  en: 'Worksheets',
  de: 'Arbeitsbl\u00e4tter',
  fr: 'Fiches',
  es: 'Fichas',
  pt: 'Atividades',
  it: 'Schede',
  nl: 'Werkbladen',
  sv: 'Arbetsblad',
  da: 'Arbejdsark',
  no: 'Arbeidsark',
  fi: 'Ty\u00f6lehdet',
};

const tryNowLabel: Record<string, string> = {
  en: 'Create Now',
  de: 'Jetzt erstellen',
  fr: 'Cr\u00e9er',
  es: 'Crear ahora',
  pt: 'Criar agora',
  it: 'Crea ora',
  nl: 'Nu maken',
  sv: 'Skapa nu',
  da: 'Opret nu',
  no: 'Lag n\u00e5',
  fi: 'Luo nyt',
};

const faqHeading: Record<string, string> = {
  en: 'Frequently Asked Questions',
  de: 'H\u00e4ufig gestellte Fragen',
  fr: 'Questions fr\u00e9quentes',
  es: 'Preguntas frecuentes',
  pt: 'Perguntas frequentes',
  it: 'Domande frequenti',
  nl: 'Veelgestelde vragen',
  sv: 'Vanliga fr\u00e5gor',
  da: 'Ofte stillede sp\u00f8rgsm\u00e5l',
  no: 'Ofte stilte sp\u00f8rsm\u00e5l',
  fi: 'Usein kysytyt kysymykset',
};

const relatedThemesLabel: Record<string, string> = {
  en: 'Related Themes',
  de: 'Verwandte Themen',
  fr: 'Th\u00e8mes associ\u00e9s',
  es: 'Temas relacionados',
  pt: 'Temas relacionados',
  it: 'Temi correlati',
  nl: 'Gerelateerde thema\u2019s',
  sv: 'Relaterade teman',
  da: 'Relaterede temaer',
  no: 'Relaterte temaer',
  fi: 'Aiheeseen liittyv\u00e4t teemat',
};

const viewAllAppsLabel: Record<string, string> = {
  en: 'View All 33 Apps',
  de: 'Alle 33 Apps ansehen',
  fr: 'Voir les 33 applications',
  es: 'Ver las 33 aplicaciones',
  pt: 'Ver todos os 33 aplicativos',
  it: 'Vedi tutte le 33 app',
  nl: 'Bekijk alle 33 apps',
  sv: 'Visa alla 33 appar',
  da: 'Se alle 33 apps',
  no: 'Se alle 33 apper',
  fi: 'N\u00e4yt\u00e4 kaikki 33 sovellusta',
};

// ── Page component ────────────────────────────────────────────────

export default async function ThemePage({
  params,
}: {
  params: { locale: string; theme: string };
}) {
  const locale = params.locale || 'en';
  const themeId = getThemeIdFromSlug(locale, params.theme);

  if (!themeId) notFound();

  const content = getThemeContent(themeId, locale);
  if (!content) notFound();

  const currentSlug = getThemeSlug(themeId, locale) || params.theme;
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const pageUrl = `${baseUrl}/${locale}/worksheets/${currentSlug}`;

  // Fetch theme preview images and app thumbnails in parallel
  const [themeImages, thumbnailMap] = await Promise.all([
    getThemePreviewImages(themeId, 6),
    getAppThumbnailMap(content.appIds, locale),
  ]);

  // Build app cards
  const apps = content.appIds.map(appId => {
    const slug = getSlugForLocale(appId, locale as SupportedLocale) || appId;
    return { appId, slug };
  });

  // Build related theme links
  const relatedThemeLinks = content.relatedThemes
    .map(rtId => {
      const rtContent = getThemeContent(rtId, locale);
      const rtSlug = getThemeSlug(rtId, locale);
      if (!rtContent || !rtSlug) return null;
      return { id: rtId, name: rtContent.name, slug: rtSlug };
    })
    .filter(Boolean) as Array<{ id: string; name: string; slug: string }>;

  // JSON-LD schemas
  const faqSchema = generateFAQSchema(content.faq, locale, pageUrl);

  const themeImageUrls = themeImages.map(img => `${baseUrl}${img}`);

  const collectionSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.heading,
    description: content.description,
    url: pageUrl,
    inLanguage: getHreflangCode(locale),
    isPartOf: {
      '@type': 'WebSite',
      name: 'LessonCraftStudio',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: content.name,
    },
    hasPart: apps.slice(0, 10).map((app, i) => ({
      '@type': 'SoftwareApplication',
      name: getLocalizedAppDisplayName(app.appId, locale),
      url: `${baseUrl}/${locale}/apps/${app.slug}`,
      position: i + 1,
      applicationCategory: 'EducationalApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    })),
  };

  if (themeImageUrls.length > 0) {
    collectionSchema.image = themeImageUrls;
    collectionSchema.thumbnailUrl = themeImageUrls[0];
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: localizedHomeLabel[locale] || 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: worksheetsLabel[locale] || 'Worksheets',
        item: `${baseUrl}/${locale}/worksheets`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.name,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-600 to-purple-700 text-white py-14">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="text-purple-200 text-sm mb-4" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-white">
              {localizedHomeLabel[locale] || 'Home'}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/worksheets`} className="hover:text-white">
              {worksheetsLabel[locale] || 'Worksheets'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{content.name}</span>
          </nav>
          <div className={themeImages.length > 0 ? 'md:flex md:items-center md:gap-10' : ''}>
            <div className={themeImages.length > 0 ? 'md:flex-1' : ''}>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.heading}</h1>
              <p className="text-lg text-purple-100 max-w-3xl leading-relaxed">{content.intro}</p>
            </div>
            {themeImages.length > 0 && (
              <div className="mt-8 md:mt-0 md:flex-shrink-0">
                <div className="grid grid-cols-3 gap-2 w-fit mx-auto md:mx-0">
                  {themeImages.slice(0, 6).map((src, i) => (
                    <div key={i} className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shadow-lg bg-white/10">
                      <img
                        src={src}
                        alt={`${content.name} clipart ${i + 1}`}
                        width={96}
                        height={96}
                        loading="eager"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* App Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {apps.map(app => (
              <Link
                key={app.appId}
                href={`/${locale}/apps/${app.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                {thumbnailMap[app.appId] ? (
                  <div className="relative aspect-[3/4] bg-gray-50">
                    <Image
                      src={thumbnailMap[app.appId]}
                      alt={getLocalizedAppDisplayName(app.appId, locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center p-4">
                    <span className="text-white text-center font-semibold text-lg">
                      {getLocalizedAppDisplayName(app.appId, locale)}
                    </span>
                  </div>
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {getLocalizedAppDisplayName(app.appId, locale)}
                  </h3>
                  <span className="mt-auto inline-flex items-center text-purple-600 text-sm font-medium">
                    {tryNowLabel[locale] || tryNowLabel.en}
                    <span className="ml-1" aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/apps`}
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              {viewAllAppsLabel[locale] || viewAllAppsLabel.en}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {content.faq.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {faqHeading[locale] || faqHeading.en}
            </h2>
            <div className="space-y-4">
              {content.faq.map((item, i) => (
                <details key={i} className="group border border-gray-200 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900">
                    {item.question}
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                      &#9660;
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Themes */}
      {relatedThemeLinks.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {relatedThemesLabel[locale] || relatedThemesLabel.en}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {relatedThemeLinks.map(rt => (
                <Link
                  key={rt.id}
                  href={`/${locale}/worksheets/${rt.slug}`}
                  className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors"
                >
                  {rt.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
