import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TeachingBand from '@/components/topic/TeachingBand';
import TeachingLook from '@/components/topic/TeachingLook';
import { teachingForTopic } from '@/lib/topic-teaching';

// A look at the teaching band of the topic pages without the page around it (Daily Teaching System, Part 11.6):
// /<loc>/preview/teaching-band?axis=educational-level&key=grade-1  or  ?axis=exercise-type&key=addition
// For checking the band at every width where there is no database, and for the operator. Not for search engines
// and in no sitemap. A language or a topic without live lessons answers 404, as the band itself shows nothing there.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Teaching band (preview)', robots: { index: false, follow: false } };

export default async function TeachingBandPreview({ params, searchParams }: { params: { locale: string }; searchParams?: { axis?: string; key?: string } }) {
  const data = await teachingForTopic(params.locale, searchParams?.axis || 'educational-level', searchParams?.key || 'grade-1');
  if (!data) notFound();
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <TeachingBand locale={params.locale} data={data} />
      <TeachingLook locale={params.locale} data={data} />
    </main>
  );
}
