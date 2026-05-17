import { getTranslations } from 'next-intl/server';
import SubscribeCTA from './SubscribeCTA';

// Section 5 — "Everything free with sign-up" per CLAUDE.md §7
// (post-subscription-pivot, 2026-05-17). 3-column capability block
// reframed: no $69, no payment partner, no notify-me. Just free for
// teachers with a sign-up.
//
// Server-rendered shell with SubscribeCTA as a client child (the latter
// branches on signed-in / signed-out via useAuth).

export default async function SubscriptionSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.subscription' });

  const columns = [
    { key: 'catalog', title: t('catalog.title'), body: t('catalog.body') },
    { key: 'creators', title: t('creators.title'), body: t('creators.body') },
    { key: 'assets', title: t('assets.title'), body: t('assets.body') },
  ];

  return (
    <section id="subscription" className="bg-terracotta-50 py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-3xl mb-12">
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink-900 tracking-tight">
            {t('sectionTitle')}
          </h2>
          <p className="mt-6 text-lg text-ink-600 leading-relaxed">
            {t('intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
          {columns.map(col => (
            <div key={col.key}>
              <h3 className="font-display font-semibold text-xl text-ink-900 mb-3">
                {col.title}
              </h3>
              <p className="text-base text-ink-600 leading-relaxed">
                {col.body}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-6 max-w-3xl">
          <p className="font-display font-semibold text-2xl text-ink-900">
            {t('price')}
          </p>
          <SubscribeCTA />
        </div>
      </div>
    </section>
  );
}
