import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CollectionsListClient from './CollectionsListClient';

// Tool 1A — subscriber's collections list. Server-component shell carrying
// the noindex metadata + i18n title; client child owns interactive UI per
// the established homepage v2 pattern.
//
// SEO: noindex per CLAUDE.md §17.4 (subscriber-only surface; not crawlable;
// not in sitemap.ts). hreflang alternates omitted — subscriber-scoped pages
// don't carry public language coverage.
//
// Subscription gating happens client-side via useAuth + isLcsSubscriptionActive.
// Server-side enforcement is at the API layer (lib/subscriber-api-gate.ts —
// 401 if unauthenticated, 403 if not subscribed).

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'collections.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default function CollectionsPage({ params }: { params: { locale: string } }) {
  return <CollectionsListClient locale={params.locale} />;
}
