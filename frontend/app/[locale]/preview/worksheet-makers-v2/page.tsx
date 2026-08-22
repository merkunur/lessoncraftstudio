import { Metadata } from 'next';
import PressHallPage from '@/components/worksheet-makers/PressHallPage';

// /[locale]/preview/worksheet-makers-v2 — noindex visual-diff route for the
// Press Hall redesign of /worksheet-makers (homepage-v10 preview precedent:
// build here, promote by import-swap, keep as the post-promotion safety net).

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Worksheet Makers Preview',
    description: 'Internal preview of the redesigned worksheet-makers hub. Not indexed.',
    robots: { index: false, follow: false },
  };
}

export default async function WorksheetMakersPreviewPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  return <PressHallPage locale={locale} />;
}
