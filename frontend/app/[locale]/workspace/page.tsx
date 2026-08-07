import { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import WorkspaceClient from './WorkspaceClient';

// Tool 2A — Workspace home. Subscriber landing surface per
// docs/SUBSCRIPTION-SCOPE.md Pillar 3 Tool 2.
//
// Server-component shell: owns the noindex metadata, the page ground +
// container, and the per-route font declarations. The fonts MUST live here —
// next/font cannot be called from a 'use client' file, and every child below is
// client-side.
//
// SURFACE SYSTEM — "the marking pile" (redesign 2026-08-07).
// The catalog hubs are objects on a table; the workspace IS the table. Three
// surfaces, and the nesting runs DARKER inward, which is the inversion of the
// catalog vocabulary:
//
//   desk  #E7E1D2  this element, full bleed
//   sheet #FFFDF8  ONE panel (WorkspaceShell) holding tabs + every section
//   well  #F5F1E6  recessed things inside the sheet — inputs, empty states,
//                  collection cards, the billing strip
//
// Raised paper is for objects you pick up; a working surface has wells cut into
// it. The old ground was cream #FBF3E4 under #FFFDF8 cards — a 1.09:1 luminance
// step, which is why the page read as one undifferentiated beige mass. #E7E1D2
// is that cream pulled ~9% down: the step becomes ~1.24:1 and it still reads as
// the same family.
//
// `catalog-cards.css` is deliberately NOT imported. `.actcat-card`'s fractal
// paper grain is fine behind a 300px marketing card and is grain-over-body-text
// at 1000px, and its translateY hover-lift is a false affordance on rows that
// are not clickable. The file itself is untouched — the catalog hubs still use
// it.
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
    // div, not main: LocaleLayoutClient already wraps children in <main>, and
    // two nested <main> elements is a landmark defect. app/[locale]/page.tsx
    // carries the same note.
    <div
      // Stable QA scope hook. scripts/visual-qa-workspace.js measures INSIDE
      // this element only — its first run queried the whole document and
      // reported the site header's nav controls as workspace defects, then
      // drove a site-nav button while trying to click a workspace tab.
      data-workspace-root=""
      className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-[#E7E1D2] min-h-[calc(100vh-200px)] px-4 py-8 md:px-8 md:py-12`}
    >
      {/* max-w-5xl, not 6xl: a single-column row list at 1152px puts a mile of
          dead space between a row's title and its buttons, which is much of why
          the rows read as empty bars. The 3-col collection grid still yields
          ~310px cards at 1024. */}
      <div className="mx-auto max-w-5xl">
        <WorkspaceClient locale={params.locale} />
      </div>
    </div>
  );
}
