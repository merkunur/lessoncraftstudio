import { getTranslations } from 'next-intl/server';
import SubscribeCTA from './SubscribeCTA';

// Section 5 — Subscription per HOMEPAGE-COPY.md + HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5.
// 2-pillar structure post lesson-plans-domain removal (2026-05-17): themed bundles
// + workspace tooling. Server-rendered shell with the SubscribeCTA as a client child.
//
// HOMEPAGE_SUBSCRIBE_MODE env var (read here at static-generation time, passed into
// SubscribeCTA as a prop because SubscribeCTA is a client component and can't read
// non-NEXT_PUBLIC env vars directly):
//   "subscribe"  → existing 3-state auth-aware Subscribe flow
//   "notify_me"  → email-capture Notify-me form (default; per T5 launch readiness)
// Per HOMEPAGE-IMPLEMENTATION-PROMPT.md §9 launch readiness item 1 + T5 default,
// notify_me is the production default until subscription content lands.

type SubscribeMode = 'subscribe' | 'notify_me';

function resolveSubscribeMode(): SubscribeMode {
  const raw = process.env.HOMEPAGE_SUBSCRIBE_MODE;
  return raw === 'subscribe' ? 'subscribe' : 'notify_me';
}

export default async function SubscriptionSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.subscription' });

  const pillars = [
    { key: 'themedBundles', title: t('themedBundles.title'), body: t('themedBundles.body') },
    { key: 'workspace', title: t('workspace.title'), body: t('workspace.body') },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-16">
          {pillars.map(pillar => (
            <div key={pillar.key}>
              <h3 className="font-display font-semibold text-xl text-ink-900 mb-3">
                {pillar.title}
              </h3>
              <p className="text-base text-ink-600 leading-relaxed">
                {pillar.body}
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
