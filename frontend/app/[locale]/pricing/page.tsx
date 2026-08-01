import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import CheckoutButtons from '@/components/pricing/CheckoutButtons';
import { MAKER_COUNT } from '@/lib/seo/maker-content';

const baseUrl = 'https://www.lessoncraftstudio.com';

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'pricingPage' });

  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/pricing`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/pricing`;

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    // Pre-launch: noindex until the premium classes ship (PRICING_PUBLIC flip,
    // config/subscription-launch.ts). The flip also adds this route to sitemap
    // shard 3 and renders the nav/footer links.
    robots: PRICING_PUBLIC
      ? { index: true, follow: true }
      : { index: false, follow: true },
    alternates: {
      canonical: `${baseUrl}/${locale}/pricing`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      url: `${baseUrl}/${locale}/pricing`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
    },
  };
}

export default async function PricingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'pricingPage' });

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t('tier.name'),
    description: t('meta.description'),
    brand: { '@type': 'Brand', name: 'LessonCraftStudio' },
    offers: [
      {
        '@type': 'Offer',
        price: SUBSCRIPTION_PRODUCT.priceUsd.toFixed(2),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/${locale}/pricing`,
        category: 'subscription',
      },
    ],
  };

  const faqItems = [1, 2, 3, 4, 5].map((i) => ({
    q: t(`faq.q${i}`),
    a: t(`faq.a${i}`),
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="container mx-auto px-4 max-w-5xl py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="mb-12 text-center">
        <h1 className="font-display text-4xl font-semibold text-ink-900 mb-3">
          {t('hero.title')}
        </h1>
        <p className="text-ink-700 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* FREE column — the load-bearing reassurance */}
        <section className="rounded-xl border border-cream-300 bg-cream-50 p-8">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-1">
            {t('free.title')}
          </h2>
          <p className="text-ink-500 mb-6">{t('free.blurb')}</p>
          <ul className="space-y-3 text-ink-700">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true">✓</span>
                <span>{t(`free.item${i}`, { count: MAKER_COUNT })}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* TEACHER tier card */}
        <section className="rounded-xl border-2 border-terracotta-400 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-1">
            {t('tier.name')}
          </h2>
          <p className="mb-6">
            <span className="font-display text-4xl font-bold text-ink-900">
              ${SUBSCRIPTION_PRODUCT.priceUsd}
            </span>
            <span className="text-ink-500"> {t('tier.priceSuffix')}</span>
          </p>
          <h3 className="font-semibold text-ink-900 mb-3">{t('tier.includedTitle')}</h3>
          <ul className="space-y-3 text-ink-700 mb-8">
            {/* item0 = "Unlimited play and downloads" — the headline benefit
                the meter actually sells; was authored ×11 but never rendered. */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true">★</span>
                <span>{t(`tier.item${i}`, { count: MAKER_COUNT })}</span>
              </li>
            ))}
          </ul>
          <CheckoutButtons />
          {/* familyTeaser removed 2026-07-11 (launch-honesty pass — no Family
              plan exists; the key stays in messages for a future revival). */}
        </section>
      </div>

      <section className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">
          {t('faq.title')}
        </h2>
        <dl className="space-y-6">
          {faqItems.map((f, i) => (
            <div key={i}>
              <dt className="font-semibold text-ink-900 mb-1">{f.q}</dt>
              <dd className="text-ink-700">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
