import { getTranslations } from 'next-intl/server';
import SubscribeCTA from './SubscribeCTA';

// Section 5 — Subscription per homepage-restructure 2026-05-17 commission.
// Post lesson-plans-domain removal: 3-column capability block (catalog +
// creators + assets). Replaced the prior 2-pillar (themedBundles + workspace)
// structure per Variant A ratification.
//
// Server-rendered shell with the SubscribeCTA as a client child.
//
// HOMEPAGE_SUBSCRIBE_MODE env var (read here at static-generation time, passed
// into SubscribeCTA as a prop because SubscribeCTA is a client component and
// can't read non-NEXT_PUBLIC env vars directly):
//   "subscribe"  → 3-state auth-aware Subscribe flow → LS hosted checkout
//   "notify_me"  → email-capture NotifyMe form (rollback default)
// Operator flips to "subscribe" once LS variant 1595188 is published in the
// LS dashboard (variant currently in "pending" status per LS API).

type SubscribeMode = 'subscribe' | 'notify_me';

function resolveSubscribeMode(): SubscribeMode {
  const raw = process.env.HOMEPAGE_SUBSCRIBE_MODE;
  return raw === 'subscribe' ? 'subscribe' : 'notify_me';
}

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
          <SubscribeCTA mode={resolveSubscribeMode()} />
        </div>
      </div>
    </section>
  );
}
