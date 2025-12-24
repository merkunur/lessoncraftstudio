import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import WorksheetSamples from '@/components/WorksheetSamples';
import { getTranslations } from 'next-intl/server';
import { homepageContentManager } from '@/lib/homepage-content-manager';
import { generateHomepageSchemas } from '@/lib/schema-generator';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

async function getHomepageContent(locale: string) {
  try {
    // Call content manager directly - no HTTP fetch to avoid SSR deadlock
    const rawContent = await homepageContentManager.getHomepageContent(locale);

    if (!rawContent || !rawContent.hero) {
      return null; // Fallback to static content
    }

    // Transform multilingual data to locale-specific data
    return {
      seo: {
        title: rawContent.seo?.title?.[locale] || rawContent.seo?.title?.en,
        description: rawContent.seo?.description?.[locale] || rawContent.seo?.description?.en,
        keywords: rawContent.seo?.keywords?.[locale] || rawContent.seo?.keywords?.en
      },
      hero: {
        title: rawContent.hero.title[locale] || rawContent.hero.title.en,
        subtitle: rawContent.hero.subtitle[locale] || rawContent.hero.subtitle.en,
        ctaButtons: {
          tryFree: rawContent.hero.cta_primary_text[locale] || rawContent.hero.cta_primary_text.en,
          viewApps: rawContent.hero.cta_secondary_text[locale] || rawContent.hero.cta_secondary_text.en
        }
      },
      features: {
        title: rawContent.featuresSection?.title[locale] || rawContent.featuresSection?.title.en,
        items: rawContent.features?.map((f: any) => ({
          icon: f.icon,
          title: f.title[locale] || f.title.en,
          description: f.description[locale] || f.description.en
        }))
      },
      pricing: rawContent.pricing ? {
        title: rawContent.pricingSection?.title[locale] || rawContent.pricingSection?.title.en,
        free: {
          name: rawContent.pricing.find((p: any) => p.name.en === 'Free' || p.name.en === 'Free Tier')?.name[locale],
          price: rawContent.pricing.find((p: any) => p.name.en === 'Free' || p.name.en === 'Free Tier')?.price,
          features: rawContent.pricing.find((p: any) => p.name.en === 'Free' || p.name.en === 'Free Tier')?.features[locale] || [],
          cta: (rawContent.pricing.find((p: any) => p.name.en === 'Free' || p.name.en === 'Free Tier') as any)?.cta?.[locale] || (rawContent.pricing.find((p: any) => p.name.en === 'Free' || p.name.en === 'Free Tier') as any)?.cta?.en
        },
        core: {
          name: rawContent.pricing.find((p: any) => p.name.en === 'Core Bundle')?.name[locale],
          price: rawContent.pricing.find((p: any) => p.name.en === 'Core Bundle')?.price,
          features: rawContent.pricing.find((p: any) => p.name.en === 'Core Bundle')?.features[locale] || [],
          cta: (rawContent.pricing.find((p: any) => p.name.en === 'Core Bundle') as any)?.cta?.[locale] || (rawContent.pricing.find((p: any) => p.name.en === 'Core Bundle') as any)?.cta?.en
        },
        full: {
          name: rawContent.pricing.find((p: any) => p.name.en === 'Full Access')?.name[locale],
          price: rawContent.pricing.find((p: any) => p.name.en === 'Full Access')?.price,
          features: rawContent.pricing.find((p: any) => p.name.en === 'Full Access')?.features[locale] || [],
          cta: (rawContent.pricing.find((p: any) => p.name.en === 'Full Access') as any)?.cta?.[locale] || (rawContent.pricing.find((p: any) => p.name.en === 'Full Access') as any)?.cta?.en
        }
      } : null,
      samplesSection: rawContent.samples && rawContent.samplesSection ? {
        samples: rawContent.samples.map((sample: any, index: number) => ({
          id: sample.id || sample.image_url || `sample-${index}`,
          name: (typeof sample.name === 'object' ? (sample.name[locale] || sample.name.en) : sample.name) || 'Untitled',
          category: (typeof sample.category === 'string' ? sample.category.toLowerCase() : sample.category) || 'general',
          image: sample.image || sample.image_url || '/worksheet-samples/placeholder.png',
          description: (typeof sample.description === 'object' ? (sample.description[locale] || sample.description.en) : sample.description) || 'No description available',
          difficulty: sample.difficulty || 'Easy',
          ageRange: (typeof sample.age_range === 'object' ? (sample.age_range[locale] || sample.age_range.en) : sample.age_range) || '5-7 years'
        })),
        sectionTitle: rawContent.samplesSection.title[locale] || rawContent.samplesSection.title.en,
        sectionSubtitle: rawContent.samplesSection.subtitle[locale] || rawContent.samplesSection.subtitle.en,
        ctaText: rawContent.samplesSection.cta?.[locale] || rawContent.samplesSection.cta?.en || 'Explore All Generators →',
        ctaUrl: `/${locale}/dashboard`,
        categories: rawContent.samplesSection.categories
          ? Object.keys(rawContent.samplesSection.categories).reduce((acc: Record<string, string>, key: string) => {
              const categoryKey = key as keyof typeof rawContent.samplesSection.categories;
              const value = rawContent.samplesSection.categories[categoryKey];
              acc[key.toLowerCase()] = (typeof value === 'object' ? (value[locale] || value.en) : value) || key;
              return acc;
            }, {})
          : {},
        difficulties: rawContent.samplesSection.difficulties
          ? Object.keys(rawContent.samplesSection.difficulties).reduce((acc: Record<string, string>, key: string) => {
              const difficultyKey = key as keyof typeof rawContent.samplesSection.difficulties;
              const value = rawContent.samplesSection.difficulties[difficultyKey];
              acc[key] = (typeof value === 'object' ? (value[locale] || value.en) : value) || key;
              return acc;
            }, {})
          : {},
        modalLabels: {
          ageRange: (typeof (rawContent.samplesSection as any).modalLabels?.ageRange === 'object' ? ((rawContent.samplesSection as any).modalLabels.ageRange[locale] || (rawContent.samplesSection as any).modalLabels.ageRange.en) : (rawContent.samplesSection as any).modalLabels?.ageRange) || 'Age Range',
          difficulty: (typeof (rawContent.samplesSection as any).modalLabels?.difficulty === 'object' ? ((rawContent.samplesSection as any).modalLabels.difficulty[locale] || (rawContent.samplesSection as any).modalLabels.difficulty.en) : (rawContent.samplesSection as any).modalLabels?.difficulty) || 'Difficulty',
          category: (typeof (rawContent.samplesSection as any).modalLabels?.category === 'object' ? ((rawContent.samplesSection as any).modalLabels.category[locale] || (rawContent.samplesSection as any).modalLabels.category.en) : (rawContent.samplesSection as any).modalLabels?.category) || 'Category'
        }
      } : null
    };
  } catch (error) {
    console.error('Failed to load homepage content from database:', error);
    return null; // Fallback to static translations
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const content = await getHomepageContent(locale);
  const baseUrl = 'https://lessoncraftstudio.com';

  // Use API content for SEO, with fallback defaults
  const seo = {
    title: content?.seo?.title || 'LessonCraftStudio - Professional Worksheet Generator',
    description: content?.seo?.description || '33 powerful worksheet generators with 100+ themed images',
    keywords: content?.seo?.keywords || 'worksheet generator, educational resources, printable worksheets'
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'de': `${baseUrl}/de`,
        'fr': `${baseUrl}/fr`,
        'es': `${baseUrl}/es`,
        'pt': `${baseUrl}/pt`,
        'it': `${baseUrl}/it`,
        'nl': `${baseUrl}/nl`,
        'sv': `${baseUrl}/sv`,
        'da': `${baseUrl}/da`,
        'no': `${baseUrl}/no`,
        'fi': `${baseUrl}/fi`,
        'x-default': `${baseUrl}/en`
      }
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: `${baseUrl}/${locale}`,
      siteName: 'LessonCraftStudio',
      locale: locale,
      alternateLocale: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].filter(l => l !== locale),
      images: [{
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'LessonCraftStudio - Professional Worksheet Generators'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${baseUrl}/opengraph-image.png`]
    }
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage' });
  const content = await getHomepageContent(locale);

  // Use API content first, fallback to static translations
  const hero = {
    title: content?.hero?.title || t('hero.title'),
    subtitle: content?.hero?.subtitle || t('hero.subtitle'),
    ctaButtons: {
      tryFree: content?.hero?.ctaButtons?.tryFree || t('hero.cta.tryFree'),
      viewApps: content?.hero?.ctaButtons?.viewApps || t('hero.cta.viewApps')
    }
  };

  // Use API content for features, fallback to static translations
  const features = {
    title: content?.features?.title || t('features.title'),
    items: content?.features?.items || [
      {
        icon: 'apps',
        title: t('features.items.apps.title'),
        description: t('features.items.apps.description')
      },
      {
        icon: 'images',
        title: t('features.items.images.title'),
        description: t('features.items.images.description')
      },
      {
        icon: 'languages',
        title: t('features.items.languages.title'),
        description: t('features.items.languages.description')
      },
      {
        icon: 'pod',
        title: t('features.items.pod.title'),
        description: t('features.items.pod.description')
      }
    ]
  };

  // Use API content for pricing, fallback to static translations
  const pricing = content?.pricing ? {
    title: content.pricing.title || t('pricing.title'),
    free: {
      name: content.pricing.free.name || t('pricing.free.name'),
      price: content.pricing.free.price || t('pricing.free.price'),
      features: content.pricing.free.features.length > 0 ? content.pricing.free.features : [
        t('pricing.free.features.0'),
        t('pricing.free.features.1'),
        t('pricing.free.features.2'),
        t('pricing.free.features.3')
      ],
      cta: content.pricing.free.cta || t('pricing.free.cta')
    },
    core: {
      name: content.pricing.core.name || t('pricing.core.name'),
      price: content.pricing.core.price || t('pricing.core.price'),
      features: content.pricing.core.features.length > 0 ? content.pricing.core.features : [
        t('pricing.core.features.0'),
        t('pricing.core.features.1'),
        t('pricing.core.features.2'),
        t('pricing.core.features.3'),
        t('pricing.core.features.4')
      ],
      cta: content.pricing.core.cta || t('pricing.core.cta')
    },
    full: {
      name: content.pricing.full.name || t('pricing.full.name'),
      price: content.pricing.full.price || t('pricing.full.price'),
      popular: (content.pricing.full as any).popular || t('pricing.full.popular'),
      features: content.pricing.full.features.length > 0 ? content.pricing.full.features : [
        t('pricing.full.features.0'),
        t('pricing.full.features.1'),
        t('pricing.full.features.2'),
        t('pricing.full.features.3'),
        t('pricing.full.features.4'),
        t('pricing.full.features.5')
      ],
      cta: content.pricing.full.cta || t('pricing.full.cta')
    }
  } : {
    title: t('pricing.title'),
    free: {
      name: t('pricing.free.name'),
      price: t('pricing.free.price'),
      features: [
        t('pricing.free.features.0'),
        t('pricing.free.features.1'),
        t('pricing.free.features.2'),
        t('pricing.free.features.3')
      ],
      cta: t('pricing.free.cta')
    },
    core: {
      name: t('pricing.core.name'),
      price: t('pricing.core.price'),
      features: [
        t('pricing.core.features.0'),
        t('pricing.core.features.1'),
        t('pricing.core.features.2'),
        t('pricing.core.features.3'),
        t('pricing.core.features.4')
      ],
      cta: t('pricing.core.cta')
    },
    full: {
      name: t('pricing.full.name'),
      price: t('pricing.full.price'),
      popular: t('pricing.full.popular'),
      features: [
        t('pricing.full.features.0'),
        t('pricing.full.features.1'),
        t('pricing.full.features.2'),
        t('pricing.full.features.3'),
        t('pricing.full.features.4'),
        t('pricing.full.features.5')
      ],
      cta: t('pricing.full.cta')
    }
  };

  // Icon components for features
  const IconComponents: Record<string, JSX.Element> = {
    apps: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    images: (
      <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    languages: (
      <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    pod: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  };

  const getIconColor = (icon: string) => {
    switch(icon) {
      case 'apps': return 'bg-primary-100';
      case 'images': return 'bg-secondary-100';
      case 'languages': return 'bg-accent-100';
      case 'pod': return 'bg-green-100';
      default: return 'bg-gray-100';
    }
  };

  // Generate JSON-LD schemas for SEO
  const schemas = generateHomepageSchemas(locale);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display mb-6 text-gray-900">
              {hero.title}
            </h1>
            <p className="text-body-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" href={`/${locale}/auth/signup`}>
                {hero.ctaButtons.tryFree}
              </Button>
              <Button size="lg" variant="ghost" href={`/${locale}/apps`}>
                {hero.ctaButtons.viewApps}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Worksheet Samples Gallery */}
      <WorksheetSamples locale={locale} initialContent={content?.samplesSection || undefined} />

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-h1 text-center mb-12 text-gray-900">
            {features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.items.map((item: any, index: number) => (
              <Card key={index} hoverable>
                <div className="text-center">
                  <div className={`w-16 h-16 ${getIconColor(item.icon)} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    {IconComponents[item.icon] || IconComponents.apps}
                  </div>
                  <h3 className="text-h3 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-h1 text-center mb-12 text-gray-900">
            {pricing.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card padding="large">
              <div className="text-center">
                <h3 className="text-h2 mb-2">{pricing.free.name}</h3>
                <p className="text-display mb-6">{pricing.free.price}</p>
                <ul className="space-y-3 mb-8 text-left">
                  {pricing.free.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button fullWidth variant="ghost" href={`/${locale}/auth/signup`}>
                  {pricing.free.cta}
                </Button>
              </div>
            </Card>

            {/* Core Bundle */}
            <Card padding="large">
              <div className="text-center">
                <h3 className="text-h2 mb-2">{pricing.core.name}</h3>
                <p className="text-display mb-6">
                  {pricing.core.price}
                  {(pricing.core as any).period && (
                    <span className="text-body text-gray-600">{(pricing.core as any).period}</span>
                  )}
                </p>
                <ul className="space-y-3 mb-8 text-left">
                  {pricing.core.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button fullWidth variant="secondary" href={`/${locale}/pricing`}>
                  {pricing.core.cta}
                </Button>
              </div>
            </Card>

            {/* Full Access */}
            <Card padding="large" className="relative">
              {(pricing.full as any).popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                    {(pricing.full as any).popular}
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-h2 mb-2">{pricing.full.name}</h3>
                <p className="text-display mb-6">
                  {pricing.full.price}
                  {(pricing.full as any).period && (
                    <span className="text-body text-gray-600">{(pricing.full as any).period}</span>
                  )}
                </p>
                <ul className="space-y-3 mb-8 text-left">
                  {pricing.full.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button fullWidth href={`/${locale}/pricing`}>
                  {pricing.full.cta}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}