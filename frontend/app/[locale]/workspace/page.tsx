import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import WorkspaceClient from './WorkspaceClient';

// Tool 2A — Workspace home (sans favorites). Subscriber landing surface
// per docs/SUBSCRIPTION-SCOPE.md Pillar 3 Tool 2 + locked sequencing.
// Server-component shell carrying the noindex metadata + i18n title;
// client child owns interactive UI per the established Tool 1A pattern.
//
// SEO: noindex per CLAUDE.md §17.4 (subscriber-only surface; not crawlable;
// not in sitemap.ts). Subscription gating happens client-side via
// useAuth + isLcsSubscriptionActive; server-side enforcement is at the
// API layer (lib/subscriber-api-gate.ts via /api/workspace).

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'workspace.metadata' });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default function WorkspacePage({ params }: { params: { locale: string } }) {
  return <WorkspaceClient locale={params.locale} />;
}
