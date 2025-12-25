import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import PricingCards from '@/components/PricingCards';

interface PricingPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
    alternates: {
      canonical: `${baseUrl}/${locale}/pricing`,
      languages: {
        'en': `${baseUrl}/en/pricing`,
        'de': `${baseUrl}/de/pricing`,
        'fr': `${baseUrl}/fr/pricing`,
        'es': `${baseUrl}/es/pricing`,
        'pt': `${baseUrl}/pt/pricing`,
        'it': `${baseUrl}/it/pricing`,
        'nl': `${baseUrl}/nl/pricing`,
        'sv': `${baseUrl}/sv/pricing`,
        'da': `${baseUrl}/da/pricing`,
        'no': `${baseUrl}/no/pricing`,
        'fi': `${baseUrl}/fi/pricing`,
        'x-default': `${baseUrl}/en/pricing`
      }
    },
    openGraph: {
      title: t('heroTitle'),
      description: t('heroSubtitle'),
      type: 'website',
      url: `${baseUrl}/${locale}/pricing`,
      siteName: 'LessonCraftStudio',
      locale: locale,
      alternateLocale: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].filter(l => l !== locale)
    }
  };
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default async function PricingPage({ params: { locale } }: PricingPageProps) {
  const t = await getTranslations({ locale, namespace: 'pricing' });

  // Helper functions to get array translations
  const getFeatures = (planKey: string) => {
    const features = [];
    for (let i = 0; i < 20; i++) {
      try {
        const key = `plans.${planKey}.features.${i}`;
        const feature = t(key);
        // Stop if we get back the key itself (translation missing)
        if (feature === key || feature.startsWith('pricing.plans.')) {
          break;
        }
        features.push(feature);
      } catch {
        break;
      }
    }
    return features;
  };

  const getLimitations = (planKey: string) => {
    const limitations = [];
    for (let i = 0; i < 10; i++) {
      try {
        const key = `plans.${planKey}.limitations.${i}`;
        const limitation = t(key);
        if (limitation === key || limitation.startsWith('pricing.plans.')) {
          break;
        }
        limitations.push(limitation);
      } catch {
        break;
      }
    }
    return limitations;
  };

  const getApps = (planKey: string) => {
    const apps = [];
    for (let i = 0; i < 35; i++) {
      try {
        const key = `plans.${planKey}.apps.${i}`;
        const app = t(key);
        if (app === key || app.startsWith('pricing.plans.')) {
          break;
        }
        apps.push(app);
      } catch {
        break;
      }
    }
    return apps;
  };

  const getNewApps = (planKey: string) => {
    const newApps = [];
    for (let i = 0; i < 5; i++) {
      try {
        const key = `plans.${planKey}.newApps.${i}`;
        const newApp = t(key);
        if (newApp === key || newApp.startsWith('pricing.plans.')) {
          break;
        }
        newApps.push(newApp);
      } catch {
        break;
      }
    }
    return newApps;
  };

  // Get FAQ items
  const getFAQItems = () => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      try {
        const question = t(`faq.items.${i}.question`);
        const answer = t(`faq.items.${i}.answer`);
        // Stop if we get back the key itself (translation missing)
        if (question.includes('faq.items.') || answer.includes('faq.items.')) {
          break;
        }
        items.push({ question, answer });
      } catch {
        break;
      }
    }
    return items;
  };

  // Build plans with translations
  const plans = [
    {
      name: t('plans.free.name'),
      price: t('plans.free.price'),
      period: t('plans.free.period'),
      description: t('plans.free.description'),
      features: getFeatures('free'),
      limitations: getLimitations('free'),
      apps: getApps('free'),
      cta: t('plans.free.cta'),
      ctaLink: `/${locale}/auth/signup`,
      variant: 'free'
    },
    {
      name: t('plans.core.name'),
      price: t('plans.core.price'),
      period: t('plans.core.period'),
      yearlyPrice: t('plans.core.yearlyPrice'),
      description: t('plans.core.description'),
      features: getFeatures('core'),
      apps: getApps('core'),
      cta: t('plans.core.cta'),
      ctaLink: `/${locale}/auth/signup?plan=core`,
      variant: 'core'
    },
    {
      name: t('plans.full.name'),
      price: t('plans.full.price'),
      period: t('plans.full.period'),
      yearlyPrice: t('plans.full.yearlyPrice'),
      description: t('plans.full.description'),
      features: getFeatures('full'),
      apps: getApps('full'),
      newApps: getNewApps('full'),
      cta: t('plans.full.cta'),
      ctaLink: `/${locale}/auth/signup?plan=full`,
      variant: 'full',
      popular: t('plans.full.popular')
    }
  ];

  // Get label translations
  const whatsIncluded = t('labels.whatsIncluded');
  const limitations = t('labels.limitations');
  const appsIncluded = t('labels.appsIncluded');
  const orYearly = t('labels.orYearly');
  const perYear = t('labels.perYear');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('heroSubtitle')}
            </p>

            {/* Billing toggle moved to PricingCards component */}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <PricingCards
          plans={plans}
          billingToggleLabels={{
            monthly: t('billingToggle.monthly'),
            yearly: t('billingToggle.yearly'),
            yearlyDiscount: t('billingToggle.yearlyDiscount')
          }}
          labels={{
            whatsIncluded,
            limitations,
            appsIncluded,
            orYearly,
            perYear
          }}
        />
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('comparison.title')}
          </h2>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">{t('comparison.features')}</th>
                  <th className="text-center py-4 px-6">
                    <div className="font-semibold text-gray-900">{t('plans.free.name')}</div>
                    <div className="text-sm text-gray-500">{t('plans.free.price')}</div>
                  </th>
                  <th className="text-center py-4 px-6 bg-blue-50">
                    <div className="font-semibold text-gray-900">{t('plans.core.name')}</div>
                    <div className="text-sm text-gray-500">{t('plans.core.price')}{t('plans.core.period')}</div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="font-semibold text-gray-900">{t('plans.full.name')}</div>
                    <div className="text-sm text-gray-500">{t('plans.full.price')}{t('plans.full.period')}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">{t('comparison.numberOfApps')}</td>
                  <td className="text-center py-4 px-6">1</td>
                  <td className="text-center py-4 px-6 bg-blue-50 font-semibold">10</td>
                  <td className="text-center py-4 px-6 font-semibold">33</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">{t('comparison.watermark')}</td>
                  <td className="py-4 px-6"><div className="flex justify-center"><XIcon /></div></td>
                  <td className="py-4 px-6 bg-blue-50"><div className="flex justify-center"><CheckIcon /></div></td>
                  <td className="py-4 px-6"><div className="flex justify-center"><CheckIcon /></div></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">{t('comparison.commercialLicense')}</td>
                  <td className="py-4 px-6"><div className="flex justify-center"><XIcon /></div></td>
                  <td className="py-4 px-6 bg-blue-50"><div className="flex justify-center"><CheckIcon /></div></td>
                  <td className="py-4 px-6"><div className="flex justify-center"><CheckIcon /></div></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">{t('comparison.imageLibrarySize')}</td>
                  <td className="text-center py-4 px-6">{t('comparison.imageLibrary.free')}</td>
                  <td className="text-center py-4 px-6 bg-blue-50">{t('comparison.imageLibrary.core')}</td>
                  <td className="text-center py-4 px-6">{t('comparison.imageLibrary.full')}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">{t('comparison.support')}</td>
                  <td className="text-center py-4 px-6">{t('comparison.supportTypes.free')}</td>
                  <td className="text-center py-4 px-6 bg-blue-50">{t('comparison.supportTypes.core')}</td>
                  <td className="text-center py-4 px-6">{t('comparison.supportTypes.full')}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-600">{t('comparison.earlyAccess')}</td>
                  <td className="py-4 px-6"><div className="flex justify-center"><XIcon /></div></td>
                  <td className="py-4 px-6 bg-blue-50"><div className="flex justify-center"><XIcon /></div></td>
                  <td className="py-4 px-6"><div className="flex justify-center"><CheckIcon /></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('faq.title')}
          </h2>

          <FAQAccordion items={getFAQItems()} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link href={`/${locale}/auth/signup`}>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('cta.button')}
            </button>
          </Link>
          <p className="text-white/80 text-sm mt-4">{t('cta.disclaimer')}</p>
        </div>
      </section>
    </div>
  );
}