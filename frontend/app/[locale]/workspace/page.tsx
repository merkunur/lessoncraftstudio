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
// SURFACE SYSTEM — "desk & cards" (redesign 2026-08-22, supersedes the
// 2026-08-07 "marking pile" single-sheet system).
// The marking-pile sheet correctly killed the card-stack mush but over-corrected
// into ONE ~1700px panel where every landmark was the same 17px heading — the
// operator's verdict was "very tiring for the eye". Three fatigue sources:
// no landmarks, six identical filled Share pills, and a ground→sheet step
// (1.24:1) still below the ~1.4:1 threshold where a card visibly lifts.
//
//   desk  #DDD4C2  this element, full bleed — warm stone, deep enough that
//                  paper genuinely lifts off it (desk→card 1.43:1)
//   card  #FFFDF8  DISCRETE cards, one per section, plus a right rail
//                  (plan & usage, recent activity) on desktop. Solid border
//                  #CFC5AE + warm-umber shadow; alpha hairlines go greenish
//                  over stone, so borders are solid colors now.
//   well  #F5F1E6  recessed things inside cards — inputs, empty states,
//                  chips. Always paired with a solid #E3DCC9 border: the
//                  value step alone is sub-threshold by design (wells are
//                  containment, not landmarks).
//
// Cards HUG content — no min-heights, no filler. A teacher with three
// worksheets gets a short card and the desk shows through; sparseness reads as
// composed negative space instead of a mostly-empty panel.
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
      className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-[#DDD4C2] min-h-[calc(100vh-200px)] px-4 py-8 md:px-8 md:py-12`}
    >
      {/* max-w-6xl WITH the two-column split: the main column is ~8 of 12 cols
          (~736px), so a row's title-to-buttons gap stays short — the old
          "max-w-5xl or rows read as empty bars" concern is solved structurally
          by the rail, not by narrowing the page. */}
      <div className="mx-auto max-w-6xl">
        <WorkspaceClient locale={params.locale} />
      </div>
    </div>
  );
}
