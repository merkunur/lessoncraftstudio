import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CollectionDetailClient from './CollectionDetailClient';

// Tool 1A — single-collection detail view. Server-component shell + client child.
// SEO: noindex per CLAUDE.md §17.4 (subscriber-only surface). Generic title here;
// client component dynamically updates document title with the collection name
// after fetch (per existing dashboard pages' pattern).

export async function generateMetadata({
  params,
}: {
  params: { locale: string; collectionId: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'collections.meta' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default function CollectionDetailPage({
  params,
}: {
  params: { locale: string; collectionId: string };
}) {
  return <CollectionDetailClient locale={params.locale} collectionId={params.collectionId} />;
}
