import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import WorksheetSamples from '@/components/WorksheetSamples';
import { getTranslations } from 'next-intl/server';

async function getHomepageContent(locale: string) {
  // For now, just return null to use default content
  // This avoids API fetch issues during development
  return null;
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const content = await getHomepageContent(locale);

  const seo = content?.seo || {
    title: 'LessonCraftStudio - Professional Worksheet Generator',
    description: '33 powerful worksheet generators with 100+ themed images',
    keywords: 'worksheet generator, educational resources, printable worksheets'
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage' });
  const content = await getHomepageContent(locale);

  // Use translations from messages files
  const hero = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    ctaButtons: {
      tryFree: t('hero.cta.tryFree'),
      viewApps: t('hero.cta.viewApps')
    }
  };

  const features = {
    title: t('features.title'),
    items: [
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

  const pricing = {
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

  return (
    <>
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
      <WorksheetSamples locale={locale} />

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
                  {pricing.core.period && (
                    <span className="text-body text-gray-600">{pricing.core.period}</span>
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
              {pricing.full.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                    {pricing.full.popular}
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-h2 mb-2">{pricing.full.name}</h3>
                <p className="text-display mb-6">
                  {pricing.full.price}
                  {pricing.full.period && (
                    <span className="text-body text-gray-600">{pricing.full.period}</span>
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