import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { baloo2, nunito } from '@/lib/fonts/direction-a-wide';
import MyTeaching from '@/components/my-teaching/MyTeaching';
import { myTeachingProps } from '@/lib/my-teaching-page';

// A look at "My teaching" without an account (Daily Teaching System, Part 11.3): the same view an account without the
// plan gets on /workspace, for checking the page at every width and for the operator. It shows only what is public
// (the live units of the language). Not for search engines and in no sitemap.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'My teaching (preview)', robots: { index: false, follow: false } };

export default async function MyTeachingPreview({ params }: { params: { locale: string } }) {
  const mine = await myTeachingProps(params.locale);
  if (!mine) notFound();
  return (
    <div className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-[#DDD4C2] min-h-[calc(100vh-200px)] px-4 py-8 md:px-8 md:py-12`}>
      <div className="mx-auto max-w-6xl">
        <MyTeaching locale={params.locale} plan={mine.plan} data={mine.data} gate={mine.gate} gradeLabels={mine.gradeLabels} subjectLabels={mine.subjectLabels} topicHrefs={mine.topicHrefs} />
      </div>
    </div>
  );
}
