import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LessonPlanReader from '@/components/lesson-plan-reader/LessonPlanReader';

// Pillar 1 Phase 1b — Standalone subscriber-gated lesson-plan reader.
// Mirror Tool 1A/2A noindex pattern (subscriber-only surface; not crawlable;
// not in sitemap.ts). Subscription gating happens client-side in
// LessonPlanReader via useAuth + isLcsSubscriptionActive; server-side
// enforcement is at the API layer (lib/subscriber-api-gate.ts via
// /api/lesson-plans/[slug]).
//
// Slug is the per-locale topic-page slug (e.g., /nl/lesson-plans/optellen for
// the addition lesson plan in Dutch). The reader resolves slug → axis-key
// internally via /api/lesson-plans/[slug] which calls resolveTopicSlug.

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'lessonPlanReader.metadata',
  });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default function LessonPlanPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  return <LessonPlanReader locale={params.locale} slug={params.slug} />;
}
