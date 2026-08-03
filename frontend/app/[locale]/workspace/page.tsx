import { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import WorkspaceClient from './WorkspaceClient';
import '@/styles/catalog-cards.css';

// Tool 2A — Workspace home. Subscriber landing surface per
// docs/SUBSCRIPTION-SCOPE.md Pillar 3 Tool 2.
//
// Server-component shell: owns the noindex metadata, the Direction A <main>
// ground + container, and the per-route font declarations. The fonts MUST live
// here — next/font cannot be called from a 'use client' file, and every child
// below is client-side.
//
// SEO: noindex per CLAUDE.md §17.4 (subscriber-only surface; not crawlable, not
// in sitemap.ts). Subscription gating is client-side via useAuth +
// isLcsSubscriptionActive; server-side enforcement is at the API layer
// (lib/subscriber-api-gate.ts).

// Direction A typography pairing (CLAUDE.md §A.13.47) — loaded per route, as
// the worksheets/tools/activities hubs do. latin-ext covers all 11 locales.
const baloo2 = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
});
const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
});

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
  return (
    <main
      className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-lcs-cream min-h-[calc(100vh-200px)] py-6 px-3 md:py-10 md:px-6`}
    >
      <div className="mx-auto max-w-6xl">
        <WorkspaceClient locale={params.locale} />
      </div>
    </main>
  );
}
