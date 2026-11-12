import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { baloo2, nunito } from '@/lib/fonts/direction-a-wide';
import MyTeaching from '@/components/my-teaching/MyTeaching';
import { myTeachingProps } from '@/lib/my-teaching-page';
import VerifyEmailBanner from '@/components/verify-email/VerifyEmailBanner';

// A look at "My teaching" without an account (Daily Teaching System, Part 11.3): the same view an account without the
// plan gets on /workspace, for checking the page at every width and for the operator. It shows only what is public
// (the live units of the language). Not for search engines and in no sitemap.
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'My teaching (preview)', robots: { index: false, follow: false } };

// ?verify=1 puts the confirm-your-e-mail notice of an unconfirmed account above the view (a sample address);
// ?verify=only shows the notice alone, in every language of the site.
export default async function MyTeachingPreview({ params, searchParams }: { params: { locale: string }; searchParams?: { verify?: string } }) {
  const notice = searchParams?.verify ? <VerifyEmailBanner locale={params.locale} userId="preview" email="teacher@example.com" /> : null;
  if (searchParams?.verify === 'only') {
    return <div className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-[#DDD4C2] px-4 py-8 md:px-8 md:py-12`}><div className="mx-auto max-w-6xl">{notice}</div></div>;
  }
  const mine = await myTeachingProps(params.locale);
  if (!mine) notFound();
  return (
    <div className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-[#DDD4C2] min-h-[calc(100vh-200px)] px-4 py-8 md:px-8 md:py-12`}>
      <div className="mx-auto max-w-6xl">
        {notice}
        <MyTeaching locale={params.locale} plan={mine.plan} data={mine.data} gate={mine.gate} gradeLabels={mine.gradeLabels} subjectLabels={mine.subjectLabels} topicHrefs={mine.topicHrefs} />
      </div>
    </div>
  );
}
