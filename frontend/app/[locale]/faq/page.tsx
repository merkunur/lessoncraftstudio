import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FAQAccordion from '@/components/FAQAccordion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'faq' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('metaKeywords')
  };
}

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function FAQPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'faq' });
  const nav = await getTranslations({ locale, namespace: 'navigation' });

  // Dynamically import FAQ data based on locale
  let faqItems;
  try {
    faqItems = await import(`@/data/faq/${locale}`).then(mod => mod.faqData);
  } catch (e) {
    // Fallback to English if locale not found
    faqItems = await import('@/data/faq/en').then(mod => mod.faqData);
  }

  const faqCategories = [
    {
      title: t('categories.general'),
      items: faqItems.general
    },
    {
      title: t('categories.apps'),
      items: faqItems.apps
    },
    {
      title: t('categories.pricing'),
      items: faqItems.pricing
    },
    {
      title: t('categories.technical'),
      items: faqItems.technical
    },
    {
      title: t('categories.commercial'),
      items: faqItems.commercial
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/apps`}>
                <Button size="lg" variant="secondary">
                  {nav('apps')}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="ghost" className="bg-white/10 border-white/30 hover:bg-white/20">
                  {nav('contact')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-4 text-lg font-bold">
                    {idx + 1}
                  </span>
                  {category.title}
                </h2>
                <FAQAccordion items={category.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('cta.subtitle')}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg">
                {t('cta.button')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
