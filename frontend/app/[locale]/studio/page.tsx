import { Metadata } from 'next';
import StudioDashboardClient from './StudioDashboardClient';
import { studioStrings } from './studio-strings';

// Story Studio — "My Stories" dashboard (premium class #3).
// Server shell carries noindex metadata (subscriber-only surface, not
// crawlable, not in the sitemap — the workspace/collections precedent);
// gating is client-side via useAuth + isLcsSubscriptionActive, server
// enforcement at the /api/studio layer (requireStudioSubscriber).

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const s = studioStrings(params.locale);
  return {
    title: s.metaTitle + ' | LessonCraftStudio',
    robots: { index: false, follow: false },
  };
}

export default function StudioPage({ params }: { params: { locale: string } }) {
  return <StudioDashboardClient locale={params.locale} />;
}
