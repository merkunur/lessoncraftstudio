import { Metadata } from 'next';
import StudioEditorClient from './StudioEditorClient';
import { studioStrings } from '../studio-strings';

// Story Studio — the editor wrapper. Full-viewport same-origin iframe onto
// the static studio client (?mode=teacher flips it into tenant mode: Bearer
// auth against /api/studio/*, operator affordances hidden). The iframe
// shares localStorage with the app, so the studio reads accessToken itself.

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

export default function StudioEditorPage({
  params,
}: {
  params: { locale: string; storyId: string };
}) {
  return <StudioEditorClient locale={params.locale} storyId={params.storyId} />;
}
