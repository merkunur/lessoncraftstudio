import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolvePlayLink } from '@/lib/studio/story-gate';

// Accountless student play page for teacher-authored Story Studio stories.
// The link IS the capability (CLAUDE.md §4.4 precedent): no sign-in, no
// student accounts, noindex. Revoked/deleted → 404. Full-viewport player
// iframe onto the static storybook.html with the tokened ?src= base.

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; linkId: string };
}): Promise<Metadata> {
  const link = await resolvePlayLink(params.linkId);
  return {
    title: (link ? link.story.title : 'Story') + ' | LessonCraftStudio',
    robots: { index: false, follow: false },
  };
}

export default async function PlayStoryPage({
  params,
}: {
  params: { locale: string; linkId: string };
}) {
  const link = await resolvePlayLink(params.linkId);
  if (!link) notFound();

  const src =
    '/mini-tools/storybook.html?src=' +
    encodeURIComponent('/api/play/' + params.linkId + '/') +
    '&lang=' +
    encodeURIComponent(link.story.locale || params.locale) +
    '&embed=1';

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#FBF3E4' }}>
      <iframe
        src={src}
        title={link.story.title}
        style={{ width: '100%', height: '100%', border: 0 }}
        allow="autoplay"
      />
    </div>
  );
}
