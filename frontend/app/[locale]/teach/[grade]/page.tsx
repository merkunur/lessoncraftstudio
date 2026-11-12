import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { baloo2, nunito } from '@/lib/fonts/direction-a-wide';
import MyTeaching from '@/components/my-teaching/MyTeaching';
import { myTeachingProps, teachSlugToGrade } from '@/lib/my-teaching-page';
import { canonicalUrl, localePath } from '@/lib/seo/url';

/* The grade page for everyone (Daily Teaching System, Part 11.4): /<language>/teach/<grade>.
 * The same view an account without the plan gets as "My teaching", for a visitor without an account: the units of
 * the grade in teaching order, its sub plans, unit checks and standards checklists, the worksheets of the grade, and
 * what the Teacher plan adds. <grade> is the level's own slug in the language (the one the topic pages use).
 *
 * NOT FOR SEARCH ENGINES YET (PLAN.md Part 11.4): it stands close to the topic pages of a grade, which carry most of
 * today's search traffic. It is noindex and in no sitemap until four weeks of data show it takes nothing from them.
 * A language without live units, and a grade without units, answers 404. */
export const dynamic = 'force-dynamic';

async function load(locale: string, slug: string) {
  const grade = teachSlugToGrade(locale, slug);
  if (!grade) return null;
  const mine = await myTeachingProps(locale);
  if (!mine || !mine.data.grades.some((g) => g.grade === grade) || !mine.hubTitle) return null;
  return { mine, grade, heading: `${mine.gradeLabels[grade]}: ${mine.hubTitle}` };
}

export async function generateMetadata({ params }: { params: { locale: string; grade: string } }): Promise<Metadata> {
  const x = await load(params.locale, params.grade);
  if (!x) return { robots: { index: false, follow: false } };
  return {
    title: x.heading,
    description: x.mine.data.ui.lead,
    alternates: { canonical: canonicalUrl(localePath(params.locale, 'teach', params.grade)) },
    robots: { index: false, follow: true },
  };
}

export default async function TeachGradePage({ params }: { params: { locale: string; grade: string } }) {
  const x = await load(params.locale, params.grade);
  if (!x) notFound();
  const { mine, grade, heading } = x;
  return (
    <div className={`${baloo2.variable} ${nunito.variable} font-lcsBody bg-[#DDD4C2] min-h-[calc(100vh-200px)] px-4 py-8 md:px-8 md:py-12`}>
      <main className="mx-auto max-w-6xl">
        <MyTeaching locale={params.locale} plan={mine.plan} data={mine.data} gate={mine.gate} gradeLabels={mine.gradeLabels} subjectLabels={mine.subjectLabels} topicHrefs={mine.topicHrefs} page={{ grade, heading, hrefs: mine.teachHrefs }} />
      </main>
    </div>
  );
}
