import { getTranslations } from 'next-intl/server';
import SubscribeCTA from './SubscribeCTA';

// Section 5 — Subscription per HOMEPAGE-COPY.md + HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5
// + SUBSCRIPTION-SCOPE.md three-pillar structure (lesson plans, themed bundles,
// workspace tooling). Server-rendered shell with the SubscribeCTA as a client child.

export default async function SubscriptionSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.subscription' });

  const pillars = [
    { key: 'lessonPlans', title: t('lessonPlans.title'), body: t('lessonPlans.body') },
    { key: 'themedBundles', title: t('themedBundles.title'), body: t('themedBundles.body') },
    { key: 'workspace', title: t('workspace.title'), body: t('workspace.body') },
  ];

  return (
    <section id="subscription" className="container mx-auto px-4 max-w-6xl py-20 md:py-28">
      <div className="max-w-3xl mb-12">
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-gray-900 tracking-tight">
          {t('sectionTitle')}
        </h2>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          {t('intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
        {pillars.map(pillar => (
          <div key={pillar.key}>
            <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">
              {pillar.title}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-6 max-w-3xl">
        <p className="font-display font-semibold text-2xl text-gray-900">
          {t('price')}
        </p>
        <SubscribeCTA />
      </div>
    </section>
  );
}
